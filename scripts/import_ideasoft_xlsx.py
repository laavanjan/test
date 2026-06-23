#!/usr/bin/env python3
import argparse
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.request
from collections import Counter, defaultdict

import pandas as pd


SENSITIVE_KEY_PARTS = (
    "tc kimlik",
    "t c kimlik",
    "vergi no",
    "vergi dairesi",
    "adres",
    "dogum tarihi",
)

RENTAL_RANGE_RE = re.compile(
    r"kiralama\s+suresi\s+(\d{2})\s+(\d{2})\s+(\d{4})\s+(\d{2})\s+(\d{2})\s+(\d{4})"
)


def main():
    parser = argparse.ArgumentParser(description="Import IdeaSoft member and order XLSX files.")
    parser.add_argument("--users", required=True)
    parser.add_argument("--orders", required=True)
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--config-stdin", action="store_true")
    args = parser.parse_args()

    config = read_config(args.config_stdin) if args.write else None
    users_df = pd.read_excel(args.users, dtype=str).fillna("")
    orders_df = pd.read_excel(args.orders, dtype=str).fillna("")

    users_records = normalize_records(users_df)
    orders_records = normalize_records(orders_df)

    users, users_by_email = build_users(users_records)
    orders, items = build_orders(orders_records, users_by_email)
    apply_order_metrics_to_users(users, orders)

    summary = build_summary(users_df, orders_df, users, orders, items, users_by_email)

    if not args.write:
      print(json.dumps(summary, ensure_ascii=False, indent=2))
      return

    summary["dry_run"] = False
    client = SupabaseRestClient(config["url"], config["key"])
    batch_id = client.create_import_batch(
        "orders",
        "ideasoft_xlsx_bulk_import",
        int(len(users_df) + len(orders_df)),
        int(len(users) + len(orders)),
        summary,
    )

    for row in users:
        row["import_batch_id"] = batch_id
    for row in orders:
        row["import_batch_id"] = batch_id
    for row in items:
        row["import_batch_id"] = batch_id

    client.upsert("admin_users", users)
    client.upsert("admin_orders", orders)
    client.upsert("admin_order_items", items)
    summary["write"] = {
        "batch_id": batch_id,
        "users_upserted": len(users),
        "orders_upserted": len(orders),
        "items_upserted": len(items),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


class SupabaseRestClient:
    def __init__(self, url, key):
        self.url = url.rstrip("/")
        self.key = key

    def create_import_batch(self, kind, file_name, row_count, imported_count, metadata):
        rows = self.request(
            "admin_import_batches",
            method="POST",
            body={
                "kind": kind,
                "file_name": file_name,
                "row_count": row_count,
                "imported_count": imported_count,
                "metadata": metadata,
            },
            prefer="return=representation",
        )
        return rows[0]["id"]

    def upsert(self, table, rows):
        chunk_size = 500
        for index in range(0, len(rows), chunk_size):
            self.request(
                f"{table}?on_conflict=id",
                method="POST",
                body=rows[index : index + chunk_size],
                prefer="resolution=merge-duplicates,return=minimal",
            )

    def request(self, path, method="GET", body=None, prefer=None):
        data = None if body is None else json.dumps(body, ensure_ascii=False).encode("utf-8")
        headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
        }
        if prefer:
            headers["Prefer"] = prefer
        request = urllib.request.Request(
            f"{self.url}/rest/v1/{path}",
            data=data,
            headers=headers,
            method=method,
        )
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                payload = response.read().decode("utf-8")
                return json.loads(payload) if payload else None
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8")
            raise RuntimeError(f"Supabase {method} {path} failed: {error.code} {detail}") from error


def build_users(records):
    users = []
    users_by_email = {}

    for normalized in records:
        user_id = pick(normalized, "id") or f"ROW-{len(users) + 1}"
        email = normalize_email(pick(normalized, "email"))
        first_name = pick(normalized, "adi")
        last_name = pick(normalized, "soyadi")
        name = " ".join(part for part in [first_name, last_name] if part).strip() or "Isimsiz Musteri"
        phone = pick(normalized, "mobil telefon") or pick(normalized, "sabit telefon") or "-"
        created_at = parse_datetime(pick(normalized, "kayit tarihi")) or now_iso()
        user = {
            "id": f"IDEA-USR-{user_id}",
            "city": pick(normalized, "sehir") or "-",
            "created_at": created_at,
            "email": email,
            "last_order_at": None,
            "name": name,
            "phone": phone,
            "rentals": 0,
            "source": "ideasoft",
            "stored_card": "none",
            "raw": sanitize_raw(normalized),
        }
        users.append(user)
        users_by_email[email] = user

    return users, users_by_email


def build_orders(records, users_by_email):
    grouped = defaultdict(list)
    for normalized in records:
        order_id = pick(normalized, "id")
        if order_id:
            grouped[order_id].append(normalized)

    orders = []
    items = []

    for order_id, rows in grouped.items():
        first = merged_first_values(rows)
        email = normalize_email(pick(first, "email"))
        user = users_by_email.get(email)
        created_at = parse_datetime(pick(first, "siparis tarihi")) or now_iso()
        rental_start, rental_end = extract_rental_range(rows)
        products = [pick(row, "urun adi") for row in rows if pick(row, "urun adi")]
        product_name = summarize_products(products)
        order_row = {
            "id": f"IDEA-ORD-{order_id}",
            "amount_kurus": parse_amount_to_kurus(pick(first, "genel toplam")),
            "city": user["city"] if user else "-",
            "created_at": created_at,
            "customer_email": email or "-",
            "customer_name": pick(first, "adi soyadi") or (user["name"] if user else "Isimsiz Musteri"),
            "customer_phone": user["phone"] if user else "-",
            "owner_approval": "not_required",
            "payment_status": map_payment_status(pick(first, "siparis durumu")),
            "platform_order_no": order_id,
            "product_name": product_name,
            "rental_end": rental_end,
            "rental_start": rental_start,
            "source": "ideasoft",
            "status": pick(first, "siparis durumu") or "IdeaSoft import",
            "raw": sanitize_raw(first),
        }
        orders.append(order_row)

        for item_index, item_row in enumerate(rows, start=1):
            item = {
                "id": f"IDEA-ITEM-{order_id}-{item_index}",
                "order_id": order_row["id"],
                "product_name": pick(item_row, "urun adi") or "IdeaSoft urun",
                "stock_code": pick(item_row, "stok kodu"),
                "quantity": parse_quantity(pick(item_row, "miktar")),
                "quantity_text": pick(item_row, "miktar"),
                "line_total_kurus": parse_amount_to_kurus(pick(item_row, "toplam")),
                "source": "ideasoft",
                "raw": sanitize_raw(item_row),
            }
            items.append(item)

    return orders, items


def apply_order_metrics_to_users(users, orders):
    rentals_by_email = Counter()
    last_order_by_email = {}

    for order in orders:
        email = normalize_email(order["customer_email"])
        if not email or email == "-":
            continue
        rentals_by_email[email] += 1
        last_order = last_order_by_email.get(email)
        if not last_order or order["created_at"] > last_order:
            last_order_by_email[email] = order["created_at"]

    for user in users:
        email = normalize_email(user["email"])
        user["rentals"] = int(rentals_by_email[email])
        user["last_order_at"] = last_order_by_email.get(email)


def build_summary(users_df, orders_df, users, orders, items, users_by_email):
    order_emails = {normalize_email(order["customer_email"]) for order in orders if order["customer_email"] != "-"}
    user_emails = set(users_by_email.keys())
    statuses = Counter(order["status"] for order in orders)
    payment_statuses = Counter(order["payment_status"] for order in orders)

    return {
        "dry_run": True,
        "orders_source_rows": int(len(orders_df)),
        "users_source_rows": int(len(users_df)),
        "users_ready": int(len(users)),
        "orders_ready": int(len(orders)),
        "order_items_ready": int(len(items)),
        "order_emails_found_in_users": int(len(order_emails & user_emails)),
        "order_emails_missing_in_users": int(len(order_emails - user_emails)),
        "orders_with_rental_range": int(sum(1 for order in orders if order["rental_start"] and order["rental_end"])),
        "order_statuses": dict(statuses.most_common(20)),
        "payment_statuses": dict(payment_statuses.most_common()),
    }


def read_config(from_stdin):
    if from_stdin:
        raw = sys.stdin.readline()
        config = json.loads(raw)
    else:
        config = {
            "url": os.environ.get("SUPABASE_URL", ""),
            "key": os.environ.get("SUPABASE_SERVICE_ROLE_KEY", ""),
        }
    if not config.get("url") or not config.get("key"):
        raise RuntimeError(
            "Config must include url and key, or set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
        )
    return config


def normalize_records(df):
    normalized = df.copy()
    normalized.columns = [normalize_key(column) for column in normalized.columns]
    return [
        {key: clean(value) for key, value in record.items()}
        for record in normalized.to_dict(orient="records")
    ]


def merged_first_values(rows):
    merged = {}
    keys = {key for row in rows for key in row.keys()}
    for key in keys:
        merged[key] = next((row.get(key, "") for row in rows if row.get(key, "")), "")
    return merged


def sanitize_raw(row):
    return {
        key: value
        for key, value in row.items()
        if value and not any(part in key for part in SENSITIVE_KEY_PARTS)
    }


def pick(row, key):
    return clean(row.get(normalize_key(key), ""))


def clean(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def normalize_key(value):
    replacements = str.maketrans("ığüşöçİĞÜŞÖÇ", "igusocIGUSOC")
    value = clean(value).translate(replacements).lower()
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def normalize_email(value):
    return clean(value).lower()


def parse_datetime(value):
    value = clean(value)
    if not value:
        return None
    for date_format in (
        "%d-%m-%Y %H:%M:%S",
        "%Y-%m-%d %H:%M:%S",
        "%d.%m.%Y %H:%M:%S",
        "%d-%m-%Y",
        "%Y-%m-%d",
        "%d.%m.%Y",
    ):
        try:
            return dt.datetime.strptime(value, date_format).isoformat()
        except ValueError:
            pass
    return None


def parse_date(value):
    value = clean(value)
    if not value:
        return None
    for date_format in ("%d.%m.%Y", "%d-%m-%Y", "%Y-%m-%d"):
        try:
            return dt.datetime.strptime(value, date_format).date().isoformat()
        except ValueError:
            pass
    return None


def now_iso():
    return dt.datetime.now(dt.timezone.utc).isoformat()


def parse_amount_to_kurus(value):
    value = clean(value)
    if not value:
        return 0
    value = re.sub(r"[^\d,.-]", "", value)
    if "," in value and "." in value:
        value = value.replace(".", "").replace(",", ".")
    elif "," in value:
        value = value.replace(",", ".")
    try:
        return int(round(float(value) * 100))
    except ValueError:
        return 0


def parse_quantity(value):
    match = re.search(r"\d+", clean(value))
    return int(match.group(0)) if match else None


def extract_rental_range(rows):
    starts = []
    ends = []
    for row in rows:
        product = normalize_key(pick(row, "urun adi"))
        match = RENTAL_RANGE_RE.search(product)
        if not match:
            continue
        start_day, start_month, start_year, end_day, end_month, end_year = match.groups()
        starts.append(f"{start_year}-{start_month}-{start_day}")
        ends.append(f"{end_year}-{end_month}-{end_day}")
    starts = [value for value in starts if value]
    ends = [value for value in ends if value]
    if not starts or not ends:
        return None, None
    return min(starts), max(ends)


def summarize_products(products):
    products = [product for product in products if product]
    if not products:
        return "IdeaSoft siparis"
    if len(products) == 1:
        return products[0]
    first_two = " + ".join(products[:2])
    extra = len(products) - 2
    return first_two if extra <= 0 else f"{first_two} + {extra} urun"


def map_payment_status(status):
    normalized = normalize_key(status)
    if "iade" in normalized:
        return "refunded"
    if "iptal" in normalized or "basarisiz" in normalized or "failed" in normalized:
        return "failed"
    if any(token in normalized for token in ("onay", "teslim", "kargo", "hazir", "tedarik", "odendi", "paid")):
        return "paid"
    return "pending"


if __name__ == "__main__":
    main()
