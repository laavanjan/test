import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter, Package, Search, Sparkles } from "lucide-react";
import { AdminLocked } from "@/components/AdminLocked";
import { AdminShell } from "@/components/AdminShell";
import { AdminProductCreateDrawer } from "@/components/AdminProductCreateDrawer";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getAdminCatalogProducts, listAdminCategories } from "@/lib/admin-catalog";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string; status?: string }>;
}) {
  const authorized = isAdminRequestAuthorized(await headers());

  if (!authorized) {
    return <AdminLocked />;
  }

  const params = await searchParams;
  const page = readPositiveInt(params.page, 1);
  const query = params.q?.trim() || "";
  const category = params.category || "";
  const status = params.status || "";
  const [catalog, categories] = await Promise.all([
    getAdminCatalogProducts({ categorySlug: category, page, query, status }),
    listAdminCategories(),
  ]);
  const redirectTo = buildProductsHref({ category, page, query, status });

  return (
    <AdminShell authConfigured={isAdminAuthConfigured()}>
      <main className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Katalog</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">Ürün yönetimi</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Statik katalogdaki ürünleri yönet, fiyat ve indirim override&apos;larını kaydet.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AdminProductCreateDrawer />
            <Link
              className="inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
              href="/admin/categories"
              style={{ color: "#ffffff" }}
            >
              Kategoriler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <Metric label="Toplam ürün" value={catalog.metrics.total} />
          <Metric label="Aktif" value={catalog.metrics.active} />
          <Metric label="Pasif" value={catalog.metrics.inactive} />
          <Metric label="İndirimli" value={catalog.metrics.discounted} />
        </section>

        <form className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm" action="/admin/products">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_170px_auto] lg:items-center">
            <label className="relative block min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                defaultValue={query}
                name="q"
                placeholder="Ürün adı, SKU, kategori veya slug ara"
              />
            </label>
            <select
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              defaultValue={category}
              name="category"
            >
              <option value="">Tüm kategoriler</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none focus:border-slate-400 focus:bg-white"
              defaultValue={status}
              name="status"
            >
              <option value="">Tüm durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="discounted">İndirimli</option>
            </select>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-black text-white shadow-lg shadow-slate-200" type="submit">
              <Filter className="h-4 w-4" />
              Filtrele
            </button>
          </div>
        </form>

        <section className="grid gap-4">
          {catalog.products.map((product) => (
            <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm" key={product.slug}>
              <form action="/api/admin/catalog/products" className="grid gap-4 xl:grid-cols-[92px_minmax(240px,1fr)_minmax(0,2fr)_auto] xl:items-start" method="post">
                <input name="slug" type="hidden" value={product.slug} />
                <input name="redirectTo" type="hidden" value={redirectTo} />
                <Image
                  alt=""
                  className="h-24 w-24 rounded-2xl border border-slate-100 object-contain"
                  height={96}
                  src={product.image}
                  width={96}
                />
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-black text-slate-500">
                      <Package className="h-3 w-3" />
                      {product.sku}
                    </span>
                    {product.discountPercent > 0 || product.discountPrice ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-black text-rose-600">
                        <Sparkles className="h-3 w-3" />
                        İndirimli
                      </span>
                    ) : null}
                  </div>
                  <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                    Ürün adı
                    <input
                      className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
                      defaultValue={product.name}
                      name="name"
                    />
                  </label>
                  <p className="mt-2 truncate text-xs font-semibold text-slate-400">{product.slug}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <AdminInput label="Günlük fiyat" name="price" value={product.price} />
                  <AdminInput label="Eski fiyat" name="oldPrice" value={product.oldPrice || ""} />
                  <AdminInput label="İndirim %" name="discountPercent" type="number" value={String(product.discountPercent)} />
                  <AdminInput label="İndirimli fiyat" name="discountPrice" value={product.discountPrice} />
                  <AdminInput label="Stok" name="stock" type="number" value={String(product.stock)} />
                  <AdminInput label="Min gün" name="minDays" type="number" value={String(product.minDays)} />
                  <AdminInput label="Badge" name="badge" value={product.badge || ""} />
                  <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                    Durum
                    <select className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={product.isActive ? "true" : "false"} name="isActive">
                      <option value="true">Aktif</option>
                      <option value="false">Pasif</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400 md:col-span-3">
                    Admin notu
                    <input
                      className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white"
                      defaultValue={product.adminNote}
                      name="adminNote"
                      placeholder="İç operasyon notu"
                    />
                  </label>
                </div>
                <div className="flex gap-2 xl:flex-col">
                  <button className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600" type="submit">
                    Kaydet
                  </button>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50"
                    href={`/urun/${product.slug}`}
                    style={{ color: "#475569" }}
                  >
                    Gör
                  </Link>
                </div>
              </form>
            </article>
          ))}
        </section>

        <nav className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-black text-slate-500">
            Sayfa {catalog.pagination.page} / {catalog.pagination.totalPages} - {catalog.pagination.total} sonuç
          </span>
          <div className="flex gap-2">
            <Link
              aria-disabled={catalog.pagination.page <= 1}
              className="inline-flex h-10 min-w-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
              href={buildProductsHref({ category, page: Math.max(1, page - 1), query, status })}
              style={{ color: "#475569" }}
            >
              Önceki
            </Link>
            <Link
              aria-disabled={catalog.pagination.page >= catalog.pagination.totalPages}
              className="inline-flex h-10 min-w-24 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
              href={buildProductsHref({ category, page: Math.min(catalog.pagination.totalPages, page + 1), query, status })}
              style={{ color: "#475569" }}
            >
              Sonraki
            </Link>
          </div>
        </nav>
      </main>
    </AdminShell>
  );
}

function AdminInput({
  label,
  name,
  type = "text",
  value,
}: {
  label: string;
  name: string;
  type?: "number" | "text";
  value: string;
}) {
  return (
    <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
      {label}
      <input
        className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white"
        defaultValue={value}
        name={name}
        type={type}
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <strong className="mt-2 block text-2xl font-black text-slate-900">{value}</strong>
    </article>
  );
}

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildProductsHref({
  category,
  page,
  query,
  status,
}: {
  category: string;
  page: number;
  query: string;
  status: string;
}) {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (category) params.set("category", category);
  if (status) params.set("status", status);
  if (page > 1) params.set("page", String(page));

  const queryString = params.toString();
  return queryString ? `/admin/products?${queryString}` : "/admin/products";
}
