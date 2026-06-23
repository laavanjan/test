import { formatKurusAsCurrency, parseTurkishLiraToKurus } from "@/lib/money";
import { listRentalOrders, type RentalOrderStatus } from "@/lib/rental-orders";
import {
  getSupabaseAdminMetrics,
  listSupabaseAdminOrdersPage,
  listSupabaseAdminUsersPage,
  upsertSupabaseAdminOrders,
  upsertSupabaseAdminUsers,
} from "@/lib/supabase-admin";

export type AdminUser = {
  city: string;
  createdAt: string;
  email: string;
  id: string;
  lastOrderAt?: string;
  name: string;
  phone: string;
  rentals: number;
  source: "mock" | "ideasoft" | "paytr";
  storedCard: "none" | "verified" | "pending";
};

export type AdminOrder = {
  amountKurus: number;
  city: string;
  createdAt: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  id: string;
  ownerApproval: "pending" | "approved" | "rejected" | "not_required";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  platformOrderNo: string;
  productName: string;
  rentalEnd: string;
  rentalStart: string;
  source: "mock" | "ideasoft" | "paytr";
  status: string;
};

export type AdminImportKind = "orders" | "users";

export type AdminDashboard = {
  metrics: {
    failedPayments: number;
    importedOrders: number;
    orders: number;
    pendingOwnerApproval: number;
    revenue: string;
    users: number;
  };
  orders: AdminOrder[];
  pagination: {
    orders: AdminPagination;
    users: AdminPagination;
  };
  users: AdminUser[];
};

export type AdminPagination = {
  page: number;
  pageSize: number;
  query: string;
  total: number;
  totalPages: number;
};

export type AdminDashboardParams = {
  ordersPage?: number;
  pageSize?: number;
  query?: string;
  usersPage?: number;
};

type ImportedAdminState = {
  orders: AdminOrder[];
  users: AdminUser[];
};

type ParsedRow = Record<string, string>;

const globalForAdmin = globalThis as typeof globalThis & {
  __varsappAdminImports?: ImportedAdminState;
};

const seedUsers: AdminUser[] = [
  {
    city: "Istanbul",
    createdAt: "2026-05-28T10:20:00.000Z",
    email: "sandbox@varsapp.local",
    id: "USR-1001",
    lastOrderAt: "2026-06-12T09:30:00.000Z",
    name: "Varsapp Sandbox",
    phone: "05555555555",
    rentals: 3,
    source: "mock",
    storedCard: "pending",
  },
  {
    city: "Ankara",
    createdAt: "2026-05-30T14:35:00.000Z",
    email: "elif.demo@example.com",
    id: "USR-1002",
    lastOrderAt: "2026-06-08T12:15:00.000Z",
    name: "Elif Demo",
    phone: "05320000000",
    rentals: 1,
    source: "mock",
    storedCard: "none",
  },
  {
    city: "Izmir",
    createdAt: "2026-06-01T08:05:00.000Z",
    email: "mert.demo@example.com",
    id: "USR-1003",
    name: "Mert Demo",
    phone: "05440000000",
    rentals: 0,
    source: "mock",
    storedCard: "none",
  },
];

const seedOrders: AdminOrder[] = [
  {
    amountKurus: 135000,
    city: "Istanbul",
    createdAt: "2026-06-12T09:30:00.000Z",
    customerEmail: "sandbox@varsapp.local",
    customerName: "Varsapp Sandbox",
    customerPhone: "05555555555",
    id: "ORD-1001",
    ownerApproval: "pending",
    paymentStatus: "pending",
    platformOrderNo: "VAR-DEMO-1001",
    productName: "DECATHLON Sisme Stand Up Paddle Seti",
    rentalEnd: "2026-06-18",
    rentalStart: "2026-06-15",
    source: "mock",
    status: "Odeme bekleniyor",
  },
  {
    amountKurus: 198000,
    city: "Ankara",
    createdAt: "2026-06-08T12:15:00.000Z",
    customerEmail: "elif.demo@example.com",
    customerName: "Elif Demo",
    customerPhone: "05320000000",
    id: "ORD-1002",
    ownerApproval: "approved",
    paymentStatus: "paid",
    platformOrderNo: "IDEA-DEMO-5521",
    productName: "DECATHLON BUNDLE - Sisme Kano",
    rentalEnd: "2026-06-13",
    rentalStart: "2026-06-10",
    source: "mock",
    status: "Teslimat hazirlaniyor",
  },
];

const DEFAULT_ADMIN_PAGE_SIZE = 50;

export async function getAdminDashboard({
  ordersPage = 1,
  pageSize = DEFAULT_ADMIN_PAGE_SIZE,
  query = "",
  usersPage = 1,
}: AdminDashboardParams = {}): Promise<AdminDashboard> {
  const [usersResult, ordersResult, metrics] = await Promise.all([
    getAdminUsersPage({ page: usersPage, pageSize, query }),
    getAdminOrdersPage({ page: ordersPage, pageSize, query }),
    getPersistedMetrics(),
  ]);
  const users = usersResult.rows;
  const orders = ordersResult.rows;
  const revenueKurus = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((total, order) => total + order.amountKurus, 0);

  return {
    metrics: {
      failedPayments:
        metrics?.failedPayments ??
        orders.filter((order) => order.paymentStatus === "failed").length,
      importedOrders:
        metrics?.importedOrders ??
        orders.filter((order) => order.source === "ideasoft").length,
      orders: metrics?.orders ?? ordersResult.total,
      pendingOwnerApproval:
        metrics?.pendingOwnerApproval ??
        orders.filter(
          (order) => order.ownerApproval === "pending",
        ).length,
      revenue: formatKurusAsCurrency(metrics?.revenueKurus ?? revenueKurus),
      users: metrics?.users ?? usersResult.total,
    },
    orders,
    pagination: {
      orders: buildPagination({
        page: ordersPage,
        pageSize,
        query,
        total: ordersResult.total,
      }),
      users: buildPagination({
        page: usersPage,
        pageSize,
        query,
        total: usersResult.total,
      }),
    },
    users,
  };
}

export async function getAdminUsers() {
  return (await getAdminUsersPage({ page: 1, pageSize: DEFAULT_ADMIN_PAGE_SIZE })).rows;
}

export async function getAdminUsersPage({
  page,
  pageSize,
  query = "",
}: {
  page: number;
  pageSize: number;
  query?: string;
}) {
  const persisted = await getPersistedUsersPage({ page, pageSize, query });
  const runtimeUsers = listRentalOrders().map((order): AdminUser => ({
    city: "Istanbul",
    createdAt: order.createdAt,
    email: order.customer.email,
    id: `PAYTR-${order.customer.email}`,
    lastOrderAt: order.createdAt,
    name: order.customer.name,
    phone: order.customer.phone,
    rentals: 1,
    source: "paytr",
    storedCard: order.cardStorage.token ? "verified" : order.cardStorage.requested ? "pending" : "none",
  }));
  const fallbackUsers = [...getImportedState().users, ...seedUsers];
  const rows = persisted?.rows || fallbackUsers;
  const includeRuntime = page === 1 && !query.trim();

  return {
    rows: mergeUsers([...(includeRuntime ? runtimeUsers : []), ...rows]).slice(0, pageSize),
    total: (persisted?.total ?? fallbackUsers.length) + (includeRuntime ? runtimeUsers.length : 0),
  };
}

export async function getAdminOrders() {
  return (await getAdminOrdersPage({ page: 1, pageSize: DEFAULT_ADMIN_PAGE_SIZE })).rows;
}

export async function getAdminOrdersPage({
  page,
  pageSize,
  query = "",
}: {
  page: number;
  pageSize: number;
  query?: string;
}) {
  const persisted = await getPersistedOrdersPage({ page, pageSize, query });
  const runtimeOrders = listRentalOrders().map(mapRentalOrderToAdminOrder);
  const fallbackOrders = [...getImportedState().orders, ...seedOrders];
  const rows = persisted?.rows || fallbackOrders;
  const includeRuntime = page === 1 && !query.trim();

  return {
    rows: [...(includeRuntime ? runtimeOrders : []), ...rows]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, pageSize),
    total: (persisted?.total ?? fallbackOrders.length) + (includeRuntime ? runtimeOrders.length : 0),
  };
}

export async function importAdminRecords({
  fileName,
  kind,
  text,
}: {
  fileName: string;
  kind: AdminImportKind;
  text: string;
}) {
  const rows = parseImportRows(text);
  const imported =
    kind === "users"
      ? rows.map((row, index) => mapImportedUser(row, index))
      : mapImportedOrders(rows);
  const state = getImportedState();

  if (kind === "users") {
    const users = imported as AdminUser[];
    state.users = mergeUsers([...state.users, ...users]);
    await upsertSupabaseAdminUsers(users);
  } else {
    const orders = imported as AdminOrder[];
    state.orders = mergeOrders([...state.orders, ...orders]);
    await upsertSupabaseAdminOrders(orders);
  }

  return {
    fileName,
    imported: imported.length,
    kind,
    sample: imported.slice(0, 3),
    total: kind === "users" ? state.users.length : state.orders.length,
  };
}

async function getPersistedUsersPage({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query: string;
}) {
  try {
    const result = await listSupabaseAdminUsersPage({ page, pageSize, query });

    return {
      rows: result.rows,
      total: result.count ?? result.rows.length,
    };
  } catch (error) {
    console.warn("Supabase admin users could not be loaded.", error);
    return null;
  }
}

async function getPersistedOrdersPage({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query: string;
}) {
  try {
    const result = await listSupabaseAdminOrdersPage({ page, pageSize, query });

    return {
      rows: result.rows,
      total: result.count ?? result.rows.length,
    };
  } catch (error) {
    console.warn("Supabase admin orders could not be loaded.", error);
    return null;
  }
}

async function getPersistedMetrics() {
  try {
    return await getSupabaseAdminMetrics();
  } catch (error) {
    console.warn("Supabase admin metrics could not be loaded.", error);
    return null;
  }
}

function buildPagination({
  page,
  pageSize,
  query,
  total,
}: {
  page: number;
  pageSize: number;
  query: string;
  total: number;
}): AdminPagination {
  return {
    page,
    pageSize,
    query,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

function mapRentalOrderToAdminOrder(order: ReturnType<typeof listRentalOrders>[number]): AdminOrder {
  return {
    amountKurus: order.totalKurus,
    city: "Istanbul",
    createdAt: order.createdAt,
    customerEmail: order.customer.email,
    customerName: order.customer.name,
    customerPhone: order.customer.phone,
    id: order.merchantOid,
    ownerApproval:
      order.status === "paid_pending_owner_approval" ? "pending" : "not_required",
    paymentStatus: mapPaymentStatus(order.status),
    platformOrderNo: order.merchantOid,
    productName: order.product.name,
    rentalEnd: order.endDate,
    rentalStart: order.startDate,
    source: "paytr",
    status: statusLabels[order.status] || order.status,
  };
}

function mapPaymentStatus(status: RentalOrderStatus): AdminOrder["paymentStatus"] {
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

const statusLabels: Record<RentalOrderStatus, string> = {
  draft: "Taslak",
  owner_approved: "Urun sahibi onayladi",
  owner_rejected: "Urun sahibi reddetti",
  paid_pending_owner_approval: "Odeme alindi, onay bekliyor",
  payment_failed: "Odeme basarisiz",
  payment_pending: "PayTR callback bekleniyor",
  refunded: "Iade edildi",
};

function mapImportedUser(row: ParsedRow, index: number): AdminUser {
  const email = pick(row, ["email", "eposta", "e posta", "mail"]);

  return {
    city: pick(row, ["city", "sehir", "il", "teslimat ili"]) || "-",
    createdAt: normalizeDate(
      pick(row, ["created_at", "createdat", "kayit tarihi", "uyelik tarihi"]),
    ),
    email: email || `ideasoft-user-${index + 1}@import.local`,
    id: pick(row, ["id", "uye id", "musteri id", "customer id"]) || `IDEA-USR-${index + 1}`,
    lastOrderAt: normalizeDate(pick(row, ["son siparis", "last order"])),
    name:
      pick(row, ["name", "ad soyad", "musteri", "musteri adi", "uye adi"]) ||
      "Isimsiz Musteri",
    phone: pick(row, ["phone", "telefon", "gsm", "cep telefonu"]) || "-",
    rentals: parseInteger(pick(row, ["rentals", "siparis sayisi", "orders"])),
    source: "ideasoft",
    storedCard: "none",
  };
}

function mapImportedOrders(rows: ParsedRow[]): AdminOrder[] {
  const grouped = new Map<string, ParsedRow[]>();

  rows.forEach((row, index) => {
    const key =
      pick(row, ["id", "siparis id", "order id", "siparis no", "order no"]) ||
      `IDEA-ORD-${index + 1}`;
    grouped.set(key, [...(grouped.get(key) || []), row]);
  });

  return Array.from(grouped.entries()).map(([key, group], index) =>
    mapImportedOrder(mergeFirstValues(group), index, group, key),
  );
}

function mapImportedOrder(
  row: ParsedRow,
  index: number,
  lineRows: ParsedRow[] = [row],
  fallbackId?: string,
): AdminOrder {
  const amount = pick(row, [
    "amount",
    "total",
    "toplam",
    "siparis tutari",
    "genel toplam",
    "odenen tutar",
  ]);

  return {
    amountKurus: parseAmountToKurus(amount),
    city: pick(row, ["city", "sehir", "il", "teslimat ili"]) || "-",
    createdAt: normalizeDate(
      pick(row, ["created_at", "createdat", "siparis tarihi", "tarih"]),
    ),
    customerEmail: pick(row, ["email", "eposta", "e posta", "mail"]) || "-",
    customerName:
      pick(row, ["customer", "musteri", "musteri adi", "ad soyad"]) ||
      "Isimsiz Musteri",
    customerPhone: pick(row, ["phone", "telefon", "gsm", "cep telefonu"]) || "-",
    id:
      pick(row, ["id", "siparis id", "order id", "siparis no", "order no"]) ||
      fallbackId ||
      `IDEA-ORD-${index + 1}`,
    ownerApproval: "not_required",
    paymentStatus: mapImportedPaymentStatus(
      pick(row, [
        "payment",
        "odeme durumu",
        "payment status",
        "status",
        "durum",
        "siparis durumu",
      ]),
    ),
    platformOrderNo:
      pick(row, ["siparis no", "order no", "platform no", "id"]) ||
      fallbackId ||
      `IDEA-${index + 1}`,
    productName: summarizeImportedProducts(lineRows),
    rentalEnd: getImportedRentalDate(lineRows, "end"),
    rentalStart: getImportedRentalDate(lineRows, "start"),
    source: "ideasoft",
    status: pick(row, ["status", "durum", "siparis durumu"]) || "IdeaSoft import",
  };
}

function mergeFirstValues(rows: ParsedRow[]) {
  const merged: ParsedRow = {};
  const keys = new Set(rows.flatMap((row) => Object.keys(row)));

  keys.forEach((key) => {
    merged[key] = rows.find((row) => row[key])?.[key] || "";
  });

  return merged;
}

function summarizeImportedProducts(rows: ParsedRow[]) {
  const products = rows
    .map((row) => pick(row, ["product", "urun", "urun adi", "urunler", "products", "siparis urunleri"]))
    .filter(Boolean);

  if (!products.length) {
    return "IdeaSoft siparis";
  }

  if (products.length === 1) {
    return products[0];
  }

  const visible = products.slice(0, 2).join(" + ");
  const extra = products.length - 2;

  return extra > 0 ? `${visible} + ${extra} urun` : visible;
}

function getImportedRentalDate(rows: ParsedRow[], type: "end" | "start") {
  const explicit = pick(mergeFirstValues(rows), [
    type === "start" ? "rental_start" : "rental_end",
    type === "start" ? "kiralama baslangic" : "kiralama bitis",
    type === "start" ? "baslangic tarihi" : "bitis tarihi",
  ]);

  if (explicit) {
    return normalizeDate(explicit).slice(0, 10);
  }

  const dates = rows
    .map((row) =>
      parseRentalRange(
        pick(row, ["product", "urun", "urun adi", "urunler", "products", "siparis urunleri"]),
      ),
    )
    .filter((range): range is { end: string; start: string } => Boolean(range))
    .map((range) => range[type])
    .sort();

  if (!dates.length) {
    return "";
  }

  return type === "start" ? dates[0] : dates[dates.length - 1];
}

function parseRentalRange(value: string) {
  const normalized = normalizeHeader(value);
  const match = normalized.match(
    /kiralama suresi (\d{2}) (\d{2}) (\d{4}) (\d{2}) (\d{2}) (\d{4})/,
  );

  if (!match) {
    return null;
  }

  const [, startDay, startMonth, startYear, endDay, endMonth, endYear] = match;

  return {
    end: `${endYear}-${endMonth}-${endDay}`,
    start: `${startYear}-${startMonth}-${startDay}`,
  };
}

function parseImportRows(text: string): ParsedRow[] {
  const trimmed = text.trim();

  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    const parsed = JSON.parse(trimmed) as unknown;
    const rows = Array.isArray(parsed) ? parsed : [parsed];

    return rows.map((row) => normalizeObjectRow(row));
  }

  return parseCsv(trimmed);
}

function parseCsv(text: string): ParsedRow[] {
  const delimiter = detectCsvDelimiter(text);
  const rows = splitCsvRows(text, delimiter);
  const headers = rows[0]?.map(normalizeHeader) || [];

  return rows.slice(1).map((values) => {
    const row: ParsedRow = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || "";
    });

    return row;
  });
}

function detectCsvDelimiter(text: string) {
  const firstLine = text.split(/\r?\n/, 1)[0] || "";
  const semicolons = countDelimiter(firstLine, ";");
  const commas = countDelimiter(firstLine, ",");

  return semicolons >= commas ? ";" : ",";
}

function countDelimiter(value: string, delimiter: "," | ";") {
  let count = 0;
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const next = value[index + 1];

    if (char === '"' && next === '"') {
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      count += 1;
    }
  }

  return count;
}

function splitCsvRows(text: string, delimiter: "," | ";") {
  const rows: string[][] = [];
  let cell = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);

  return rows.filter((item) => item.some((value) => value.trim()));
}

function normalizeObjectRow(row: unknown): ParsedRow {
  if (!row || typeof row !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      normalizeHeader(key),
      value == null ? "" : String(value),
    ]),
  );
}

function pick(row: ParsedRow, keys: string[]) {
  for (const key of keys) {
    const value = row[normalizeHeader(key)];

    if (value) {
      return value.trim();
    }
  }

  return "";
}

function normalizeHeader(value: string) {
  return value
    .replaceAll("İ", "I")
    .replaceAll("Ğ", "G")
    .replaceAll("Ü", "U")
    .replaceAll("Ş", "S")
    .replaceAll("Ö", "O")
    .replaceAll("Ç", "C")
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeDate(value: string) {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.valueOf())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function parseInteger(value: string) {
  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

function parseAmountToKurus(value: string) {
  if (!value) {
    return 0;
  }

  try {
    return parseTurkishLiraToKurus(value);
  } catch {
    const parsed = Number.parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));

    return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
  }
}

function mapImportedPaymentStatus(value: string): AdminOrder["paymentStatus"] {
  const normalized = normalizeHeader(value);

  if (normalized.includes("basarisiz") || normalized.includes("failed")) {
    return "failed";
  }

  if (normalized.includes("iade") || normalized.includes("refund")) {
    return "refunded";
  }

  if (
    normalized.includes("odendi") ||
    normalized.includes("onaylandi") ||
    normalized.includes("tedarik") ||
    normalized.includes("teslim") ||
    normalized.includes("kargo") ||
    normalized.includes("hazirlaniyor") ||
    normalized.includes("paid") ||
    normalized.includes("tamam")
  ) {
    return "paid";
  }

  return "pending";
}

function mergeUsers(users: AdminUser[]) {
  const merged = new Map<string, AdminUser>();

  for (const user of users) {
    merged.set(user.email || user.id, user);
  }

  return Array.from(merged.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function mergeOrders(orders: AdminOrder[]) {
  const merged = new Map<string, AdminOrder>();

  for (const order of orders) {
    merged.set(order.platformOrderNo || order.id, order);
  }

  return Array.from(merged.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function getImportedState() {
  if (!globalForAdmin.__varsappAdminImports) {
    globalForAdmin.__varsappAdminImports = {
      orders: [],
      users: [],
    };
  }

  return globalForAdmin.__varsappAdminImports;
}
