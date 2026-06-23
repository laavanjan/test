import Link from "next/link";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import {
  AlertCircle,
  Banknote,
  CreditCard,
  Database,
  PackageCheck,
  UsersRound,
} from "lucide-react";
import { AdminImportPanel } from "@/components/AdminImportPanel";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import {
  getAdminDashboard,
  type AdminOrder,
  type AdminPagination,
  type AdminUser,
} from "@/lib/admin-store";
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

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <p>Varsapp operasyon</p>
          <h1>Admin Panel</h1>
        </div>
        <nav>
          {isAdminAuthConfigured() ? <span>Yetkili oturum</span> : <span>Demo erisim</span>}
          <Link href="/">Magaza</Link>
          <Link href="/odeme">Odeme testi</Link>
          {isAdminAuthConfigured() ? <a href="/api/admin/logout">Cikis</a> : null}
        </nav>
      </header>

      <section className="admin-metrics" aria-label="Operasyon ozeti">
        <Metric icon={<UsersRound size={20} />} label="Kullanici" value={dashboard.metrics.users} />
        <Metric icon={<PackageCheck size={20} />} label="Siparis" value={dashboard.metrics.orders} />
        <Metric icon={<CreditCard size={20} />} label="Onay bekleyen" value={dashboard.metrics.pendingOwnerApproval} />
        <Metric icon={<Banknote size={20} />} label="Odenen toplam" value={dashboard.metrics.revenue} />
        <Metric icon={<Database size={20} />} label="IdeaSoft import" value={dashboard.metrics.importedOrders} />
        <Metric icon={<AlertCircle size={20} />} label="Basarisiz odeme" value={dashboard.metrics.failedPayments} />
      </section>

      <div className="admin-workspace">
        <AdminImportPanel />

        <form className="admin-search" action="/admin">
          <input
            defaultValue={query}
            name="q"
            placeholder="Siparis no, musteri, e-posta, telefon veya urun ara"
          />
          <button type="submit">Ara</button>
          {query ? <Link href="/admin">Temizle</Link> : null}
        </form>

        <section className="admin-panel">
          <div className="admin-section-heading">
            <div>
              <p>Siparisler</p>
              <h2>Tum kiralama siparisleri</h2>
              <span>{dashboard.pagination.orders.total} kayit</span>
            </div>
            <a href={`/api/admin/orders?${buildApiParams(dashboard.pagination.orders)}`} target="_blank">JSON</a>
          </div>
          <OrdersTable orders={dashboard.orders} />
          <AdminPager pagination={dashboard.pagination.orders} pageKey="ordersPage" />
        </section>

        <section className="admin-panel">
          <div className="admin-section-heading">
            <div>
              <p>Kullanicilar</p>
              <h2>Musteri listesi</h2>
              <span>{dashboard.pagination.users.total} kayit</span>
            </div>
            <a href={`/api/admin/users?${buildApiParams(dashboard.pagination.users)}`} target="_blank">JSON</a>
          </div>
          <UsersTable users={dashboard.users} />
          <AdminPager pagination={dashboard.pagination.users} pageKey="usersPage" />
        </section>
      </div>
    </main>
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
    <nav className="admin-pager" aria-label="Sayfalama">
      <span>
        Sayfa {pagination.page} / {pagination.totalPages}
      </span>
      <div>
        <Link
          aria-disabled={pagination.page <= 1}
          href={buildAdminHref({ page: previousPage, pageKey, pagination })}
        >
          Onceki
        </Link>
        <Link
          aria-disabled={pagination.page >= pagination.totalPages}
          href={buildAdminHref({ page: nextPage, pageKey, pagination })}
        >
          Sonraki
        </Link>
      </div>
    </nav>
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

function AdminLocked({ failed }: { failed: boolean }) {
  return (
    <main className="admin-page">
      <section className="admin-locked">
        <p>Admin Panel</p>
        <h1>Giris yap</h1>
        <span>Admin panelini acmak icin demo admin bilgilerini gir.</span>
        <form action="/api/admin/login" className="admin-login-form" method="post">
          <label>
            Kullanici adi
            <input autoComplete="username" name="username" required />
          </label>
          <label>
            Parola
            <input autoComplete="current-password" name="password" required type="password" />
          </label>
          {failed ? <strong>Kullanici adi veya parola hatali.</strong> : null}
          <button type="submit">Admin paneline gir</button>
        </form>
      </section>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <article>
      <span>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Siparis</th>
            <th>Musteri</th>
            <th>Urun</th>
            <th>Kiralama</th>
            <th>Odeme</th>
            <th>Tutar</th>
            <th>Kaynak</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={`${order.source}-${order.id}`}>
              <td>
                <strong>{order.platformOrderNo}</strong>
                <span>{order.status}</span>
              </td>
              <td>
                <strong>{order.customerName}</strong>
                <span>{order.customerEmail}</span>
              </td>
              <td>{order.productName}</td>
              <td>
                <span>{formatShortDate(order.rentalStart)}</span>
                <span>{formatShortDate(order.rentalEnd)}</span>
              </td>
              <td>
                <StatusBadge status={order.paymentStatus} />
              </td>
              <td>{formatKurusAsCurrency(order.amountKurus)}</td>
              <td><SourceBadge source={order.source} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Kullanici</th>
            <th>Telefon</th>
            <th>Sehir</th>
            <th>Kiralama</th>
            <th>Kart</th>
            <th>Kayıt</th>
            <th>Kaynak</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={`${user.source}-${user.id}`}>
              <td>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </td>
              <td>{user.phone}</td>
              <td>{user.city}</td>
              <td>{user.rentals}</td>
              <td><StoredCardBadge status={user.storedCard} /></td>
              <td>{formatShortDate(user.createdAt)}</td>
              <td><SourceBadge source={user.source} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: AdminOrder["paymentStatus"] }) {
  const labels: Record<AdminOrder["paymentStatus"], string> = {
    failed: "Basarisiz",
    paid: "Odendi",
    pending: "Bekliyor",
    refunded: "Iade",
  };

  return <span className={`admin-badge ${status}`}>{labels[status]}</span>;
}

function SourceBadge({ source }: { source: AdminOrder["source"] | AdminUser["source"] }) {
  return <span className="admin-source">{source}</span>;
}

function StoredCardBadge({ status }: { status: AdminUser["storedCard"] }) {
  const labels: Record<AdminUser["storedCard"], string> = {
    none: "Yok",
    pending: "Bekliyor",
    verified: "Kayitli",
  };

  return <span className={`admin-badge ${status}`}>{labels[status]}</span>;
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
