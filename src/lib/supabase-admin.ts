import "server-only";

import { createHash } from "crypto";
import type { AdminOrder, AdminUser } from "@/lib/admin-store";
import {
  createKolayBiAssociate,
  createKolayBiInvoice,
  createKolayBiProduct,
  listKolayBiAssociates,
  listKolayBiProducts,
  type KolayBiAssociate,
  type KolayBiInvoice,
} from "@/lib/kolaybi";
import type {
  PaytrCallbackRecord,
  RentalCart,
  RentalOrder,
  RentalOrderStatus,
} from "@/lib/rental-orders";

type SupabaseConfig = {
  key: string;
  url: string;
};

type SupabaseUserRow = {
  city: string | null;
  created_at: string | null;
  email: string | null;
  id: string;
  last_order_at: string | null;
  name: string | null;
  phone: string | null;
  rentals: number | null;
  source: AdminUser["source"];
  stored_card: AdminUser["storedCard"] | null;
};

type SupabaseOrderRow = {
  amount_kurus: number | null;
  city: string | null;
  created_at: string | null;
  customer_email: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  id: string;
  owner_approval: AdminOrder["ownerApproval"] | null;
  payment_status: AdminOrder["paymentStatus"] | null;
  platform_order_no: string | null;
  product_name: string | null;
  rental_end: string | null;
  rental_start: string | null;
  source: AdminOrder["source"];
  status: string | null;
};

type SupabaseMutationRow = Record<string, unknown>;

type SupabasePage<T> = {
  count: number | null;
  rows: T[];
};

type SupabaseAdminMetricsRow = {
  failed_payments: number | null;
  imported_orders: number | null;
  orders: number | null;
  pending_owner_approval: number | null;
  revenue_kurus: number | null;
  users: number | null;
};

type SupabaseRentalOrderRow = {
  callback_received_at: string | null;
  card_storage: Record<string, unknown> | null;
  card_storage_requested: boolean | null;
  created_at: string | null;
  customer: Record<string, unknown> | null;
  customer_account_id: string | null;
  days: number | null;
  end_date: string | null;
  invoice_error: string | null;
  invoice_status: string | null;
  kolaybi_invoice: Record<string, unknown> | null;
  kolaybi_invoice_id: string | null;
  merchant_oid: string;
  owner_approval: AdminOrder["ownerApproval"] | null;
  paytr: Record<string, unknown> | null;
  product: Record<string, unknown> | null;
  shipping_kurus: number | null;
  start_date: string | null;
  status: RentalOrderStatus | null;
  subtotal_kurus: number | null;
  total_kurus: number | null;
  unit_price_kurus: number | null;
  updated_at: string | null;
};

type SupabaseCustomerAccountRow = {
  city: string | null;
  created_at: string | null;
  email: string;
  id: string;
  name: string | null;
  phone: string | null;
};

type SupabaseProductOverrideRow = {
  data: Record<string, unknown> | null;
  slug: string;
  updated_at: string | null;
};

export function isSupabaseAdminConfigured() {
  return Boolean(getSupabaseConfig());
}

export async function listSupabaseAdminUsers() {
  const rows = await supabaseRequest<SupabaseUserRow[]>(
    "admin_users?select=id,city,created_at,email,last_order_at,name,phone,rentals,source,stored_card&order=created_at.desc",
    { method: "GET" },
  );

  return rows?.map(mapSupabaseUser) ?? null;
}

export async function listSupabaseAdminUsersPage({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query?: string;
}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const filter = buildAdminUserSearchFilter(query);
  const result = await supabasePageRequest<SupabaseUserRow>(
    `admin_users?select=id,city,created_at,email,last_order_at,name,phone,rentals,source,stored_card${filter}&order=created_at.desc`,
    { from, to },
  );

  return {
    count: result?.count ?? null,
    rows: result?.rows.map(mapSupabaseUser) ?? [],
  };
}

export async function listSupabaseAdminOrders() {
  const rows = await supabaseRequest<SupabaseOrderRow[]>(
    "admin_orders?select=id,amount_kurus,city,created_at,customer_email,customer_name,customer_phone,owner_approval,payment_status,platform_order_no,product_name,rental_end,rental_start,source,status&order=created_at.desc",
    { method: "GET" },
  );

  return rows?.map(mapSupabaseOrder) ?? null;
}

export async function listSupabaseAdminOrdersPage({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query?: string;
}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const filter = buildAdminOrderSearchFilter(query);
  const result = await supabasePageRequest<SupabaseOrderRow>(
    `admin_orders?select=id,amount_kurus,city,created_at,customer_email,customer_name,customer_phone,owner_approval,payment_status,platform_order_no,product_name,rental_end,rental_start,source,status${filter}&order=created_at.desc`,
    { from, to },
  );

  return {
    count: result?.count ?? null,
    rows: result?.rows.map(mapSupabaseOrder) ?? [],
  };
}

export async function getSupabaseAdminMetrics() {
  const rows = await supabaseRequest<SupabaseAdminMetricsRow[]>(
    "admin_dashboard_metrics?select=*&limit=1",
    { method: "GET" },
  );
  const row = rows?.[0];

  if (!row) {
    return null;
  }

  return {
    failedPayments: row.failed_payments || 0,
    importedOrders: row.imported_orders || 0,
    orders: row.orders || 0,
    pendingOwnerApproval: row.pending_owner_approval || 0,
    revenueKurus: row.revenue_kurus || 0,
    users: row.users || 0,
  };
}

export async function persistSupabaseRentalOrder(order: RentalOrder) {
  const customerAccountId = await upsertCustomerAccountForRentalOrder(order);

  await supabaseUpsert(
    "rental_orders",
    [mapRentalOrderRow(order, { customerAccountId })],
    "merchant_oid",
  );
  await Promise.all([
    persistSupabaseRentalOrderItems(order),
    supabaseUpsert("admin_orders", [mapRentalOrderAdminRow(order)]),
    upsertAdminUserForRentalOrder(order),
  ]);
}

export async function getSupabaseRentalOrder(merchantOid: string) {
  const rows = await supabaseRequest<SupabaseRentalOrderRow[]>(
    `rental_orders?select=*&merchant_oid=eq.${encodeURIComponent(merchantOid)}&limit=1`,
    { method: "GET" },
  );

  return rows?.[0] ? mapSupabaseRentalOrder(rows[0]) : null;
}

export async function recordSupabasePaymentCallback({
  callback,
  order,
}: {
  callback: PaytrCallbackRecord;
  order: RentalOrder | null;
}) {
  const existing = order || (await getSupabaseRentalOrder(callback.merchantOid));
  const status: RentalOrderStatus =
    callback.status === "success" ? "paid_pending_owner_approval" : "payment_failed";
  const ownerApproval: AdminOrder["ownerApproval"] =
    callback.status === "success" ? "pending" : "not_required";
  const now = new Date().toISOString();

  await supabaseInsert("payment_callbacks", [
    {
      merchant_oid: callback.merchantOid,
      raw: callback,
      status: callback.status,
      total_amount: callback.totalAmount,
    },
  ]);

  await supabasePatch(
    `rental_orders?merchant_oid=eq.${encodeURIComponent(callback.merchantOid)}`,
    {
      callback_received_at: now,
      card_storage: {
        ...(existing?.cardStorage.token || {}),
        ...(callback.cardStorage || {}),
      },
      paytr: {
        currency: callback.currency,
        failedReasonCode: callback.failedReasonCode,
        failedReasonMessage: callback.failedReasonMessage,
        installmentCount: callback.installmentCount,
        paymentAmount: callback.paymentAmount,
        paymentType: callback.paymentType,
        status: callback.status,
        testMode: callback.testMode,
        totalAmount: callback.totalAmount,
      },
      owner_approval: ownerApproval,
      status,
      updated_at: now,
    },
  );

  if (existing) {
    await supabaseUpsert("admin_orders", [
      mapRentalOrderAdminRow({
        ...existing,
        callbackReceivedAt: now,
        paytr: {
          currency: callback.currency,
          failedReasonCode: callback.failedReasonCode,
          failedReasonMessage: callback.failedReasonMessage,
          installmentCount: callback.installmentCount,
          paymentAmount: callback.paymentAmount,
          paymentType: callback.paymentType,
          status: callback.status,
          testMode: callback.testMode,
          totalAmount: callback.totalAmount,
        },
        status,
        updatedAt: now,
      }),
    ]);

    if (callback.status === "success") {
      await finalizePaidSupabaseRentalOrder({
        order: {
          ...existing,
          callbackReceivedAt: now,
          status,
          updatedAt: now,
        },
      });
    }
  }
}

async function finalizePaidSupabaseRentalOrder({ order }: { order: RentalOrder }) {
  await upsertAdminUserForRentalOrder(order, { paid: true });
  await persistSupabaseRentalBookings(order);
  await decrementCatalogStockForOrder(order);
  await syncKolayBiInvoiceForOrder(order);
}

async function upsertCustomerAccountForRentalOrder(order: RentalOrder) {
  const email = normalizeEmail(order.customer.email);

  if (!email) {
    return null;
  }

  await upsertAdminUserForRentalOrder(order);

  await supabaseUpsert(
    "customer_accounts",
    [
      {
        admin_user_id: makePaytrAdminUserId(email),
        city: "Istanbul",
        email,
        last_login_at: null,
        metadata: {
          lastMerchantOid: order.merchantOid,
          source: "paytr_checkout",
        },
        name: order.customer.name || "Isimsiz Musteri",
        phone: order.customer.phone || "-",
        source: "paytr",
        status: "active",
        updated_at: new Date().toISOString(),
      },
    ],
    "email",
  );

  return (await findCustomerAccountByEmail(email))?.id || null;
}

async function findCustomerAccountByEmail(email: string) {
  const normalized = normalizeEmail(email);

  if (!normalized) {
    return null;
  }

  const rows = await supabaseSelect<SupabaseCustomerAccountRow[]>(
    `customer_accounts?select=id,city,created_at,email,name,phone&email=eq.${encodeURIComponent(
      normalized,
    )}&limit=1`,
  );

  return rows?.[0] || null;
}

async function upsertAdminUserForRentalOrder(
  order: RentalOrder,
  options: { paid?: boolean } = {},
) {
  const email = normalizeEmail(order.customer.email);
  const id = makePaytrAdminUserId(email || order.merchantOid);
  const existingRows = await supabaseSelect<SupabaseUserRow[]>(
    `admin_users?select=id,city,created_at,email,last_order_at,name,phone,rentals,source,stored_card&id=eq.${encodeURIComponent(
      id,
    )}&limit=1`,
  );
  const existing = existingRows?.[0];
  const storedCard: AdminUser["storedCard"] = order.cardStorage.token
    ? "verified"
    : order.cardStorage.requested
      ? "pending"
      : existing?.stored_card || "none";

  await supabaseUpsert("admin_users", [
    {
      city: existing?.city || "Istanbul",
      created_at: existing?.created_at || order.createdAt,
      email: email || order.customer.email || "-",
      id,
      last_order_at: options.paid ? order.updatedAt : existing?.last_order_at || null,
      name: order.customer.name || existing?.name || "Isimsiz Musteri",
      phone: order.customer.phone || existing?.phone || "-",
      rentals: options.paid ? Math.max(existing?.rentals || 0, 1) : existing?.rentals || 0,
      source: "paytr",
      stored_card: storedCard,
    },
  ]);
}

async function persistSupabaseRentalOrderItems(order: RentalOrder) {
  await supabaseUpsert("rental_order_items", mapRentalOrderItemRows(order), "id");
}

async function persistSupabaseRentalBookings(order: RentalOrder) {
  await supabaseUpsert("rental_bookings", mapRentalBookingRows(order), "id");
}

async function decrementCatalogStockForOrder(order: RentalOrder) {
  const quantities = getRentalOrderCarts(order).reduce((map, item) => {
    map.set(item.product.slug, (map.get(item.product.slug) || 0) + 1);
    return map;
  }, new Map<string, number>());

  for (const [slug, quantity] of quantities) {
    try {
      const rows = await supabaseSelect<SupabaseProductOverrideRow[]>(
        `admin_product_overrides?select=slug,data,updated_at&slug=eq.${encodeURIComponent(
          slug,
        )}&limit=1`,
      );
      const existing = rows?.[0];
      const data = existing?.data || {};
      const currentStock = typeof data.stock === "number" ? data.stock : 1;
      const nextStock = Math.max(0, currentStock - quantity);

      await supabaseUpsert(
        "admin_product_overrides",
        [
          {
            data: {
              ...data,
              stock: nextStock,
            },
            slug,
            updated_at: new Date().toISOString(),
          },
        ],
        "slug",
      );
    } catch (error) {
      console.warn("Catalog stock could not be decremented.", {
        error: formatSupabaseAdminError(error),
        slug,
      });
    }
  }
}

async function syncKolayBiInvoiceForOrder(order: RentalOrder) {
  if (!isKolayBiAutoInvoiceEnabled()) {
    await updateInvoiceStatus(order.merchantOid, {
      invoice_error: null,
      invoice_status: "skipped",
      kolaybi_invoice: {
        reason: "KOLAYBI_AUTO_INVOICE is not enabled.",
      },
    });
    return;
  }

  const invoiceMeta = await getRentalOrderInvoiceMeta(order.merchantOid);

  if (invoiceMeta?.invoice_status === "created" && invoiceMeta.kolaybi_invoice_id) {
    return;
  }

  try {
    await updateInvoiceStatus(order.merchantOid, {
      invoice_error: null,
      invoice_status: "creating",
    });

    const associate = await findOrCreateKolayBiAssociate(order);
    const contactId = associate.id;
    const addressId = getKolayBiInvoiceAddressId(associate);

    if (!contactId || !addressId) {
      throw new Error("KolayBi associate or invoice address is missing.");
    }

    const invoiceItems = [];

    for (const item of getRentalOrderCarts(order)) {
      const product = await findOrCreateKolayBiProduct(item);

      if (!product.id) {
        throw new Error(`KolayBi product id is missing for ${item.product.slug}.`);
      }

      invoiceItems.push({ item, productId: product.id });
    }

    const invoice = await createKolayBiInvoice(
      buildKolayBiInvoicePayload({ addressId, contactId, invoiceItems, order }),
    );
    const invoiceId = getKolayBiInvoiceId(invoice);

    await updateInvoiceStatus(order.merchantOid, {
      invoice_error: null,
      invoice_status: "created",
      kolaybi_invoice: {
        invoice,
        provider: "kolaybi",
      },
      kolaybi_invoice_id: invoiceId,
    });
  } catch (error) {
    const message = formatSupabaseAdminError(error);
    await updateInvoiceStatus(order.merchantOid, {
      invoice_error: message,
      invoice_status: "failed",
      kolaybi_invoice: {
        error: message,
        provider: "kolaybi",
      },
    });
    console.warn("KolayBi invoice could not be created.", {
      error: message,
      merchantOid: order.merchantOid,
    });
  }
}

async function getRentalOrderInvoiceMeta(merchantOid: string) {
  const rows = await supabaseSelect<
    Array<{
      invoice_status: string | null;
      kolaybi_invoice_id: string | null;
    }>
  >(
    `rental_orders?select=invoice_status,kolaybi_invoice_id&merchant_oid=eq.${encodeURIComponent(
      merchantOid,
    )}&limit=1`,
  );

  return rows?.[0] || null;
}

async function updateInvoiceStatus(
  merchantOid: string,
  row: {
    invoice_error?: string | null;
    invoice_status: string;
    kolaybi_invoice?: Record<string, unknown>;
    kolaybi_invoice_id?: string;
  },
) {
  await Promise.all([
    supabasePatch(`rental_orders?merchant_oid=eq.${encodeURIComponent(merchantOid)}`, row),
    supabasePatch(`admin_orders?id=eq.${encodeURIComponent(merchantOid)}`, {
      invoice_reference: row.kolaybi_invoice_id || null,
      invoice_status: row.invoice_status,
      raw_metadata: {
        invoice: row.kolaybi_invoice || {},
      },
    }),
  ]);
}

async function findOrCreateKolayBiAssociate(order: RentalOrder) {
  const email = normalizeEmail(order.customer.email);
  const existing = email ? (await listKolayBiAssociates({ email })) ?? [] : [];
  const matched = existing.find((associate) => normalizeEmail(associate.email || "") === email);

  if (matched?.id) {
    return matched;
  }

  const { name, surname } = splitCustomerName(order.customer.name);

  return createKolayBiAssociate({
    "addresses[address]": order.customer.address || "Varsapp online kiralama",
    "addresses[address_type]": "invoice",
    "addresses[city]": "Istanbul",
    "addresses[country]": "Türkiye",
    "addresses[district]": "Kadikoy",
    associate_type: "customer",
    code: `VAR-${order.merchantOid.slice(-10)}`,
    email,
    identity_no: createDeterministicTurkishIdentityNo(email || order.merchantOid),
    is_corporate: false,
    name,
    phone: normalizePhoneForKolayBi(order.customer.phone),
    surname,
  });
}

async function findOrCreateKolayBiProduct(item: RentalCart) {
  const existing = (await listKolayBiProducts({ code: item.product.sku })) ?? [];
  const matched = existing.find((product) => product.code === item.product.sku);

  if (matched?.id) {
    return matched;
  }

  return createKolayBiProduct({
    code: item.product.sku,
    description: item.product.description.join(" "),
    name: item.product.name,
    price: formatKurusAsDecimal(item.unitPriceKurus),
    price_currency: "try",
    quantity: 9999,
    sale_price_vat_included: true,
    vat_rate: 20,
  });
}

export async function upsertSupabaseAdminUsers(users: AdminUser[]) {
  await bulkUpsert(
    "admin_users",
    users.map((user) => ({
      city: user.city,
      created_at: user.createdAt,
      email: user.email,
      id: user.id,
      last_order_at: user.lastOrderAt || null,
      name: user.name,
      phone: user.phone,
      rentals: user.rentals,
      source: user.source,
      stored_card: user.storedCard,
    })),
  );
}

export async function upsertSupabaseAdminOrders(orders: AdminOrder[]) {
  await bulkUpsert(
    "admin_orders",
    orders.map((order) => ({
      amount_kurus: order.amountKurus,
      city: order.city,
      created_at: order.createdAt,
      customer_email: order.customerEmail,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      id: order.id,
      owner_approval: order.ownerApproval,
      payment_status: order.paymentStatus,
      platform_order_no: order.platformOrderNo,
      product_name: order.productName,
      rental_end: order.rentalEnd || null,
      rental_start: order.rentalStart || null,
      source: order.source,
      status: order.status,
    })),
  );
}

async function bulkUpsert(table: string, rows: SupabaseMutationRow[]) {
  if (!rows.length) {
    return;
  }

  const chunkSize = 500;

  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize);
    await supabaseUpsert(table, chunk);
  }
}

export async function supabaseSelect<T>(path: string) {
  return supabaseRequest<T>(path, { method: "GET" });
}

export async function supabaseInsert<T = unknown>(table: string, rows: SupabaseMutationRow[]) {
  return supabaseRequest<T>(table, {
    body: JSON.stringify(rows),
    headers: {
      Prefer: "return=representation",
    },
    method: "POST",
  });
}

export async function supabaseUpsert<T = unknown>(
  table: string,
  rows: SupabaseMutationRow[],
  onConflict = "id",
) {
  return supabaseRequest<T>(`${table}?on_conflict=${onConflict}`, {
    body: JSON.stringify(rows),
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    method: "POST",
  });
}

export async function supabasePatch<T = unknown>(path: string, row: SupabaseMutationRow) {
  return supabaseRequest<T>(path, {
    body: JSON.stringify(row),
    headers: {
      Prefer: "return=minimal",
    },
    method: "PATCH",
  });
}

export async function supabaseDelete(path: string) {
  return supabaseRequest(path, { method: "DELETE" });
}

async function supabasePageRequest<T>(
  path: string,
  range: { from: number; to: number },
): Promise<SupabasePage<T> | null> {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    cache: "no-store",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      Prefer: "count=exact",
      Range: `${range.from}-${range.to}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${text}`);
  }

  return {
    count: parseContentRangeCount(response.headers.get("content-range")),
    rows: (await response.json()) as T[],
  };
}

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    key,
    url: url.replace(/\/$/, ""),
  };
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit & { headers?: Record<string, string> },
) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

function mapSupabaseUser(row: SupabaseUserRow): AdminUser {
  return {
    city: row.city || "-",
    createdAt: row.created_at || new Date().toISOString(),
    email: row.email || "-",
    id: row.id,
    lastOrderAt: row.last_order_at || undefined,
    name: row.name || "Isimsiz Musteri",
    phone: row.phone || "-",
    rentals: row.rentals || 0,
    source: row.source,
    storedCard: row.stored_card || "none",
  };
}

function mapSupabaseOrder(row: SupabaseOrderRow): AdminOrder {
  return {
    amountKurus: row.amount_kurus || 0,
    city: row.city || "-",
    createdAt: row.created_at || new Date().toISOString(),
    customerEmail: row.customer_email || "-",
    customerName: row.customer_name || "Isimsiz Musteri",
    customerPhone: row.customer_phone || "-",
    id: row.id,
    ownerApproval: row.owner_approval || "not_required",
    paymentStatus: row.payment_status || "pending",
    platformOrderNo: row.platform_order_no || row.id,
    productName: row.product_name || "IdeaSoft siparis",
    rentalEnd: row.rental_end || "",
    rentalStart: row.rental_start || "",
    source: row.source,
    status: row.status || "IdeaSoft import",
  };
}

function buildAdminUserSearchFilter(query?: string) {
  const value = query?.trim();

  if (!value) {
    return "";
  }

  const pattern = `*${escapePostgrestPattern(value)}*`;

  return `&or=(email.ilike.${pattern},name.ilike.${pattern},phone.ilike.${pattern},city.ilike.${pattern})`;
}

function buildAdminOrderSearchFilter(query?: string) {
  const value = query?.trim();

  if (!value) {
    return "";
  }

  const pattern = `*${escapePostgrestPattern(value)}*`;

  return `&or=(platform_order_no.ilike.${pattern},customer_email.ilike.${pattern},customer_name.ilike.${pattern},product_name.ilike.${pattern})`;
}

function escapePostgrestPattern(value: string) {
  return encodeURIComponent(value.replace(/[(),]/g, " "));
}

function parseContentRangeCount(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/\/(\d+|\*)$/);

  if (!match || match[1] === "*") {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function mapRentalOrderRow(
  order: RentalOrder,
  { customerAccountId }: { customerAccountId?: string | null } = {},
) {
  return {
    callback_received_at: order.callbackReceivedAt || null,
    card_storage: order.cardStorage.token || {},
    card_storage_requested: order.cardStorage.requested,
    created_at: order.createdAt,
    customer: order.customer,
    customer_account_id: customerAccountId || null,
    days: order.days,
    end_date: order.endDate,
    invoice_status: "not_requested",
    merchant_oid: order.merchantOid,
    owner_approval:
      order.status === "paid_pending_owner_approval" ? "pending" : "not_required",
    paytr: order.paytr,
    product: {
      category: order.product.category,
      categorySlug: order.product.categorySlug,
      image: order.product.image,
      name: order.product.name,
      sku: order.product.sku,
      slug: order.product.slug,
    },
    shipping_kurus: order.shippingKurus,
    start_date: order.startDate,
    status: order.status,
    subtotal_kurus: order.subtotalKurus,
    total_kurus: order.totalKurus,
    unit_price_kurus: order.unitPriceKurus,
    updated_at: order.updatedAt,
  };
}

function mapRentalOrderItemRows(order: RentalOrder) {
  return getRentalOrderCarts(order).map((item, index) => ({
    days: item.days,
    end_date: item.endDate,
    id: makeRentalOrderLineId(order.merchantOid, index),
    line_index: index,
    merchant_oid: order.merchantOid,
    product: mapProductSnapshot(item),
    product_name: item.product.name,
    product_sku: item.product.sku,
    product_slug: item.product.slug,
    quantity: item.days,
    start_date: item.startDate,
    subtotal_kurus: item.subtotalKurus,
    total_kurus: item.totalKurus,
    unit_price_kurus: item.unitPriceKurus,
    updated_at: order.updatedAt,
  }));
}

function mapRentalBookingRows(order: RentalOrder) {
  return getRentalOrderCarts(order).map((item, index) => ({
    customer_email: normalizeEmail(order.customer.email) || order.customer.email,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    end_date: item.endDate,
    id: makeRentalOrderLineId(order.merchantOid, index),
    line_item_id: makeRentalOrderLineId(order.merchantOid, index),
    merchant_oid: order.merchantOid,
    product_name: item.product.name,
    product_sku: item.product.sku,
    product_slug: item.product.slug,
    start_date: item.startDate,
    status: "active",
    updated_at: order.updatedAt,
  }));
}

function mapRentalOrderAdminRow(order: RentalOrder) {
  return {
    amount_kurus: order.totalKurus,
    city: "Istanbul",
    created_at: order.createdAt,
    customer_email: order.customer.email,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    id: order.merchantOid,
    owner_approval:
      order.status === "paid_pending_owner_approval" ? "pending" : "not_required",
    payment_status: mapRentalPaymentStatus(order.status),
    platform_order_no: order.merchantOid,
    product_name: order.product.name,
    rental_end: order.endDate,
    rental_start: order.startDate,
    source: "paytr",
    status: mapRentalStatusLabel(order.status),
  };
}

function mapSupabaseRentalOrder(row: SupabaseRentalOrderRow): RentalOrder | null {
  const product = row.product;
  const customer = row.customer;

  if (!product || !customer) {
    return null;
  }

  return {
    callbackReceivedAt: row.callback_received_at || undefined,
    cardStorage: {
      requested: Boolean(row.card_storage_requested),
      token: row.card_storage || undefined,
    },
    createdAt: row.created_at || new Date().toISOString(),
    customer: {
      address: String(customer.address || ""),
      email: String(customer.email || ""),
      name: String(customer.name || ""),
      phone: String(customer.phone || ""),
    },
    days: row.days || 0,
    endDate: row.end_date || "",
    merchantOid: row.merchant_oid,
    paytr: row.paytr || {},
    product: {
      badge: undefined,
      category: String(product.category || ""),
      categorySlug: String(product.categorySlug || ""),
      description: [],
      gallery: [String(product.image || "")],
      image: String(product.image || ""),
      location: "",
      minDays: row.days || 0,
      name: String(product.name || ""),
      owner: "",
      price: "",
      sku: String(product.sku || ""),
      slug: String(product.slug || ""),
    },
    shippingKurus: row.shipping_kurus || 0,
    startDate: row.start_date || "",
    status: row.status || "payment_pending",
    subtotalKurus: row.subtotal_kurus || 0,
    totalKurus: row.total_kurus || 0,
    unitPriceKurus: row.unit_price_kurus || 0,
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

function getRentalOrderCarts(order: RentalOrder): RentalCart[] {
  return order.basketItems?.length
    ? order.basketItems
    : [
        {
          days: order.days,
          endDate: order.endDate,
          product: order.product,
          shippingKurus: order.shippingKurus,
          startDate: order.startDate,
          subtotalKurus: order.subtotalKurus,
          totalKurus: order.totalKurus,
          unitPriceKurus: order.unitPriceKurus,
        },
      ];
}

function mapProductSnapshot(item: RentalCart) {
  return {
    category: item.product.category,
    categorySlug: item.product.categorySlug,
    image: item.product.image,
    name: item.product.name,
    sku: item.product.sku,
    slug: item.product.slug,
  };
}

function buildKolayBiInvoicePayload({
  addressId,
  contactId,
  invoiceItems,
  order,
}: {
  addressId: number;
  contactId: number;
  invoiceItems: Array<{ item: RentalCart; productId: number }>;
  order: RentalOrder;
}) {
  const paidAt = order.callbackReceivedAt || order.updatedAt;
  const orderDate = paidAt.slice(0, 10);
  const payload: Record<string, boolean | number | string | undefined> = {
    "internet_sale[payment_date]": orderDate,
    "internet_sale[payment_platform]": "PayTR",
    "internet_sale[payment_type]": "credit-card",
    "internet_sale[url]": "https://varsapp-live.vercel.app",
    "order_reference[issue_date]": orderDate,
    "order_reference[serial_no]": order.merchantOid,
    address_id: addressId,
    contact_id: contactId,
    currency: "try",
    description: `Varsapp kiralama siparisi ${order.merchantOid}`,
    document_scenario: "TICARIFATURA",
    document_type: "SATIS",
    due_date: orderDate,
    order_date: orderDate,
    receiver_email: normalizeEmail(order.customer.email),
    tracking_currency: "try",
    type: "sale_invoice",
  };

  invoiceItems.forEach(({ item, productId }, index) => {
    payload[`items[${index}][description]`] =
      `${item.product.name} kiralama (${item.startDate} - ${item.endDate})`;
    payload[`items[${index}][product_id]`] = productId;
    payload[`items[${index}][quantity]`] = `${item.days}.00`;
    payload[`items[${index}][unit_price]`] = formatKurusAsDecimal(item.unitPriceKurus);
    payload[`items[${index}][vat_rate]`] = 20;
  });

  return payload;
}

function getKolayBiInvoiceAddressId(associate: KolayBiAssociate) {
  return associate.address?.find((address) => address.address_type === "invoice")?.id
    || associate.address?.[0]?.id
    || null;
}

function getKolayBiInvoiceId(invoice: KolayBiInvoice) {
  const id = invoice.id || invoice.document_id;

  return id ? String(id) : undefined;
}

function makeRentalOrderLineId(merchantOid: string, index: number) {
  return `${merchantOid}-${index + 1}`;
}

function splitCustomerName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const name = parts.shift() || "Varsapp";
  const surname = parts.join(" ") || "Musteri";

  return {
    name: name.length >= 2 ? name : "Varsapp",
    surname: surname.length >= 2 ? surname : "Musteri",
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLocaleLowerCase("tr-TR");
}

function makePaytrAdminUserId(value: string) {
  return `PAYTR-${normalizeEmail(value).replace(/[^a-z0-9._-]+/gi, "-")}`;
}

function normalizePhoneForKolayBi(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("90")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+9${digits}`;
  }

  if (digits.length === 10) {
    return `+90${digits}`;
  }

  return phone || "05555555555";
}

function createDeterministicTurkishIdentityNo(seed: string) {
  const hash = createHash("sha1").update(seed).digest("hex");
  const digits = Array.from({ length: 9 }, (_, index) =>
    Number.parseInt(hash[index], 16) % 10,
  );

  digits[0] = (digits[0] % 9) + 1;

  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const tenth = (((oddSum * 7 - evenSum) % 10) + 10) % 10;
  const eleventh = [...digits, tenth].reduce((sum, digit) => sum + digit, 0) % 10;

  return [...digits, tenth, eleventh].join("");
}

function formatKurusAsDecimal(kurus: number) {
  return (kurus / 100).toFixed(2);
}

function isKolayBiAutoInvoiceEnabled() {
  return (
    process.env.KOLAYBI_AUTO_INVOICE === "1" &&
    Boolean(process.env.KOLAYBI_API_KEY?.trim()) &&
    Boolean(process.env.KOLAYBI_CHANNEL?.trim())
  );
}

function formatSupabaseAdminError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function mapRentalPaymentStatus(status: RentalOrderStatus): AdminOrder["paymentStatus"] {
  if (
    status === "paid_pending_owner_approval" ||
    status === "owner_approved" ||
    status === "owner_rejected"
  ) {
    return "paid";
  }

  if (status === "payment_failed") {
    return "failed";
  }

  if (status === "refunded") {
    return "refunded";
  }

  return "pending";
}

function mapRentalStatusLabel(status: RentalOrderStatus) {
  const labels: Record<RentalOrderStatus, string> = {
    draft: "Taslak",
    owner_approved: "Urun sahibi onayladi",
    owner_rejected: "Urun sahibi reddetti",
    paid_pending_owner_approval: "Odeme alindi, onay bekliyor",
    payment_failed: "Odeme basarisiz",
    payment_pending: "PayTR callback bekleniyor",
    refunded: "Iade edildi",
  };

  return labels[status] || status;
}
