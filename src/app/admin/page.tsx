import Link from "next/link";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  CreditCard,
  Database,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { AdminImportPanel } from "@/components/AdminImportPanel";
import { AdminOrderSearch } from "@/components/AdminOrderSearch";
import { AdminShell } from "@/components/AdminShell";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import {
  getAdminDashboard,
  type AdminOrder,
  type AdminPagination,
  type AdminUser,
} from "@/lib/admin-store";
import { AdminLocked } from "@/components/AdminLocked";
import { formatKurusAsCurrency } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string; ordersPage?: string; q?: string; usersPage?: string }>;
}) {
  const params = await searchParams;
  const authorized = isAdminRequestAuthorized(await headers());

  if (!authorized) {
    return <AdminLocked failed={params.auth === "failed"} />;
  }

  const query = params.q?.trim() || "";
  const dashboard = await getAdminDashboard({
    ordersPage: parsePage(params.ordersPage),
    query,
    usersPage: parsePage(params.usersPage),
  });
  const recentOrders = dashboard.orders.slice(0, 6);
  const paidOrders = dashboard.orders.filter((order) => order.paymentStatus === "paid").length;
  const failedOrders = dashboard.orders.filter((order) => order.paymentStatus === "failed").length;
  const importShare = dashboard.metrics.orders
    ? Math.round((dashboard.metrics.importedOrders / dashboard.metrics.orders) * 100)
    : 0;

  return (
    <AdminShell authConfigured={isAdminAuthConfigured()}>
      <main className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Varsapp operasyon</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">Finans ve Kiralama Paneli</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Sipariş, kullanıcı, PayTR ve IdeaSoft akışlarını tek ekranda izle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              href="/"
              style={{ color: "#334155" }}
            >
              Mağaza
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
              href="/odeme"
              style={{ color: "#ffffff" }}
            >
              Ödeme testi
              <CreditCard className="h-4 w-4" />
            </Link>
            <a
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              href="/admin"
              style={{ color: "#334155" }}
            >
              Yenile
              <RefreshCw className="h-4 w-4" />
            </a>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Operasyon özeti">
          <MetricCard
            icon={<Banknote className="h-5 w-5" />}
            label="Ödenen toplam"
            sub="PayTR ve import satışları"
            tone="indigo"
            value={dashboard.metrics.revenue}
          />
          <MetricCard
            icon={<ShoppingCart className="h-5 w-5" />}
            label="Toplam sipariş"
            sub={`${paidOrders} ödendi, ${failedOrders} başarısız`}
            tone="emerald"
            value={dashboard.metrics.orders}
          />
          <MetricCard
            icon={<UsersRound className="h-5 w-5" />}
            label="Kullanıcı"
            sub="Kayıtlı ve import edilen"
            tone="blue"
            value={dashboard.metrics.users}
          />
          <MetricCard
            icon={<AlertCircle className="h-5 w-5" />}
            label="Aksiyon bekleyen"
            sub="Ürün sahibi/onay takibi"
            tone="amber"
            value={dashboard.metrics.pendingOwnerApproval}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Durum dağılımı</p>
                <h2 className="mt-1 text-lg font-black text-slate-900">Sipariş sağlığı</h2>
              </div>
              <TrendingUp className="h-5 w-5 text-rose-500" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatusTile label="Onay bekleyen" tone="amber" value={dashboard.metrics.pendingOwnerApproval} />
              <StatusTile label="Başarısız ödeme" tone="rose" value={dashboard.metrics.failedPayments} />
              <StatusTile label="Import payı" tone="slate" value={`%${importShare}`} />
            </div>
            <div className="mt-5 grid gap-2">
              {recentOrders.slice(0, 5).map((order, index) => (
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2" key={`${order.source}-${order.id}-${index}`}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-xs font-black text-slate-500 shadow-sm">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-800">{order.platformOrderNo}</p>
                    <p className="truncate text-xs font-semibold text-slate-400">{order.customerName}</p>
                  </div>
                  <PaymentBadge status={order.paymentStatus} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-950 p-5 text-white shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Veri kapsamı</p>
                <h2 className="mt-1 text-lg font-black">Kaynak özeti</h2>
              </div>
              <Database className="h-5 w-5 text-rose-300" />
            </div>
            <div className="grid gap-3">
              <SourceRow label="IdeaSoft import" value={dashboard.metrics.importedOrders} />
              <SourceRow label="PayTR / canli akış" value={dashboard.orders.filter((order) => order.source === "paytr").length} />
              <SourceRow label="Demo/mock kayıt" value={dashboard.orders.filter((order) => order.source === "mock").length} />
            </div>
          </div>
        </section>

        <AdminImportPanel />

        <AdminOrderSearch query={query} />

        <section className="grid gap-6">
          <AdminPanel
            count={dashboard.pagination.orders.total}
            eyebrow="Siparişler"
            href={`/api/admin/orders?${buildApiParams(dashboard.pagination.orders)}`}
            id="orders"
            title="Tüm kiralama siparişleri"
          >
            <OrdersTable orders={dashboard.orders} />
            <AdminPager pagination={dashboard.pagination.orders} pageKey="ordersPage" />
          </AdminPanel>

          <AdminPanel
            count={dashboard.pagination.users.total}
            eyebrow="Kullanıcılar"
            href={`/api/admin/users?${buildApiParams(dashboard.pagination.users)}`}
            id="users"
            title="Müşteri listesi"
          >
            <UsersTable users={dashboard.users} />
            <AdminPager pagination={dashboard.pagination.users} pageKey="usersPage" />
          </AdminPanel>
        </section>
      </main>
    </AdminShell>
  );
}

function AdminPanel({
  children,
  count,
  eyebrow,
  href,
  id,
  title,
}: {
  children: ReactNode;
  count: number;
  eyebrow: string;
  href: string;
  id: string;
  title: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" id={id}>
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
          <h2 className="mt-1 text-lg font-black text-slate-900">{title}</h2>
          <span className="mt-1 block text-sm font-semibold text-slate-500">{count} kayıt</span>
        </div>
        <a
          className="inline-flex h-9 w-fit items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-black text-slate-600 transition hover:bg-white"
          href={href}
          target="_blank"
        >
          JSON
        </a>
      </div>
      {children}
    </section>
  );
}

function AdminPager({
  pageKey,
  pagination,
}: {
  pageKey: "ordersPage" | "usersPage";
  pagination: AdminPagination;
}) {
  const previousPage = Math.max(1, pagination.page - 1);
  const nextPage = Math.min(pagination.totalPages, pagination.page + 1);

  return (
    <nav className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Sayfalama">
      <span className="text-sm font-black text-slate-500">
        Sayfa {pagination.page} / {pagination.totalPages}
      </span>
      <div className="flex gap-2">
          <Link
            aria-disabled={pagination.page <= 1}
            className="inline-flex h-9 min-w-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
            href={buildAdminHref({ page: previousPage, pageKey, pagination })}
            style={{ color: "#475569" }}
          >
          Önceki
        </Link>
          <Link
            aria-disabled={pagination.page >= pagination.totalPages}
            className="inline-flex h-9 min-w-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
            href={buildAdminHref({ page: nextPage, pageKey, pagination })}
            style={{ color: "#475569" }}
          >
          Sonraki
        </Link>
      </div>
    </nav>
  );
}

function MetricCard({
  icon,
  label,
  sub,
  tone,
  value,
}: {
  icon: ReactNode;
  label: string;
  sub: string;
  tone: "amber" | "blue" | "emerald" | "indigo";
  value: number | string;
}) {
  const tones = {
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <article className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <span className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
        <strong className="mt-1 block truncate text-xl font-black text-slate-900">{value}</strong>
        <span className="mt-1 block truncate text-xs font-semibold text-slate-400">{sub}</span>
      </div>
    </article>
  );
}

function StatusTile({
  label,
  tone,
  value,
}: {
  label: string;
  tone: "amber" | "rose" | "slate";
  value: number | string;
}) {
  const tones = {
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
    slate: "border-slate-100 bg-slate-50 text-slate-700",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${tones[tone]}`}>
      <p className="text-xs font-bold opacity-75">{label}</p>
      <strong className="mt-1 block text-2xl font-black">{value}</strong>
    </div>
  );
}

function SourceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm font-bold text-slate-300">{label}</span>
      <strong className="text-lg font-black text-white">{value}</strong>
    </div>
  );
}

function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1040px] w-full text-left text-sm">
        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3">Sipariş</th>
            <th className="px-5 py-3">Müşteri</th>
            <th className="px-5 py-3">Ürün</th>
            <th className="px-5 py-3">Kiralama</th>
            <th className="px-5 py-3">Ödeme</th>
            <th className="px-5 py-3">Tutar</th>
            <th className="px-5 py-3">Kaynak</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order, index) => (
            <tr className="transition hover:bg-slate-50/60" key={`${order.source}-${order.id}-${index}`}>
              <td className="px-5 py-4 align-top">
                <strong className="block font-black text-slate-900">{order.platformOrderNo}</strong>
                <span className="mt-1 block text-xs font-semibold text-slate-400">{order.status}</span>
              </td>
              <td className="px-5 py-4 align-top">
                <strong className="block font-black text-slate-800">{order.customerName}</strong>
                <span className="mt-1 block text-xs font-semibold text-slate-400">{order.customerEmail}</span>
              </td>
              <td className="max-w-[260px] px-5 py-4 align-top font-semibold text-slate-600">{order.productName}</td>
              <td className="px-5 py-4 align-top">
                <span className="block font-bold text-slate-700">{formatShortDate(order.rentalStart)}</span>
                <span className="mt-1 block text-xs font-semibold text-slate-400">{formatShortDate(order.rentalEnd)}</span>
              </td>
              <td className="px-5 py-4 align-top">
                <PaymentBadge status={order.paymentStatus} />
              </td>
              <td className="px-5 py-4 align-top font-black text-slate-900">{formatKurusAsCurrency(order.amountKurus)}</td>
              <td className="px-5 py-4 align-top">
                <SourceBadge source={order.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-5 py-3">Kullanıcı</th>
            <th className="px-5 py-3">Telefon</th>
            <th className="px-5 py-3">Şehir</th>
            <th className="px-5 py-3">Kiralama</th>
            <th className="px-5 py-3">Kart</th>
            <th className="px-5 py-3">Kayıt</th>
            <th className="px-5 py-3">Kaynak</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr className="transition hover:bg-slate-50/60" key={`${user.source}-${user.id}`}>
              <td className="px-5 py-4 align-top">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <strong className="block truncate font-black text-slate-900">{user.name}</strong>
                    <span className="mt-1 block truncate text-xs font-semibold text-slate-400">{user.email}</span>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 align-top font-semibold text-slate-600">{user.phone}</td>
              <td className="px-5 py-4 align-top font-semibold text-slate-600">{user.city}</td>
              <td className="px-5 py-4 align-top font-black text-slate-900">{user.rentals}</td>
              <td className="px-5 py-4 align-top">
                <StoredCardBadge status={user.storedCard} />
              </td>
              <td className="px-5 py-4 align-top font-semibold text-slate-600">{formatShortDate(user.createdAt)}</td>
              <td className="px-5 py-4 align-top">
                <SourceBadge source={user.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentBadge({ status }: { status: AdminOrder["paymentStatus"] }) {
  const labels: Record<AdminOrder["paymentStatus"], string> = {
    failed: "Basarisiz",
    paid: "Odendi",
    pending: "Bekliyor",
    refunded: "Iade",
  };
  const classes: Record<AdminOrder["paymentStatus"], string> = {
    failed: "border-rose-100 bg-rose-50 text-rose-700",
    paid: "border-emerald-100 bg-emerald-50 text-emerald-700",
    pending: "border-amber-100 bg-amber-50 text-amber-700",
    refunded: "border-slate-100 bg-slate-50 text-slate-600",
  };

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-black ${classes[status]}`}>
      {labels[status]}
    </span>
  );
}

function StoredCardBadge({ status }: { status: AdminUser["storedCard"] }) {
  const labels: Record<AdminUser["storedCard"], string> = {
    none: "Yok",
    pending: "Bekliyor",
    verified: "Kayitli",
  };
  const classes: Record<AdminUser["storedCard"], string> = {
    none: "border-slate-100 bg-slate-50 text-slate-600",
    pending: "border-amber-100 bg-amber-50 text-amber-700",
    verified: "border-emerald-100 bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-black ${classes[status]}`}>
      {labels[status]}
    </span>
  );
}

function SourceBadge({ source }: { source: AdminOrder["source"] | AdminUser["source"] }) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 text-xs font-black text-indigo-700">
      {source}
    </span>
  );
}

function buildAdminHref({
  page,
  pageKey,
  pagination,
}: {
  page: number;
  pageKey: "ordersPage" | "usersPage";
  pagination: AdminPagination;
}) {
  const params = new URLSearchParams();

  if (pagination.query) {
    params.set("q", pagination.query);
  }

  params.set(pageKey, String(page));

  return `/admin?${params.toString()}`;
}

function buildApiParams(pagination: AdminPagination) {
  const params = new URLSearchParams({
    page: String(pagination.page),
    pageSize: String(pagination.pageSize),
  });

  if (pagination.query) {
    params.set("q", pagination.query);
  }

  return params.toString();
}

function parsePage(value?: string) {
  const parsed = Number.parseInt(value || "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function formatShortDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}
