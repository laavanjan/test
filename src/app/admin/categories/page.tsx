import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { AdminLocked } from "@/components/AdminLocked";
import { AdminShell } from "@/components/AdminShell";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { listAdminCategories } from "@/lib/admin-catalog";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const authorized = isAdminRequestAuthorized(await headers());

  if (!authorized) {
    return <AdminLocked />;
  }

  const categories = await listAdminCategories();

  return (
    <AdminShell authConfigured={isAdminAuthConfigured()}>
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Katalog</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">Kategori yönetimi</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Kategori adlarını, sıralamayı ve vitrin aktifliğini yönet.
            </p>
          </div>
          <Link
            className="inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            href="/admin/products"
            style={{ color: "#ffffff" }}
          >
            Ürünlere dön
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="Kategori" value={categories.length} />
          <Metric label="Aktif kategori" value={categories.filter((category) => category.isActive).length} />
          <Metric label="Aktif ürün" value={categories.reduce((total, category) => total + category.activeProducts, 0)} />
        </section>

        <section className="grid gap-4">
          {categories.map((category) => (
            <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" key={category.slug}>
              <form action="/api/admin/catalog/categories" className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_120px_150px_auto] lg:items-end" method="post">
                <input name="slug" type="hidden" value={category.slug} />
                <input name="redirectTo" type="hidden" value="/admin/categories" />
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                  Kategori adı
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
                    defaultValue={category.name}
                    name="name"
                  />
                  <span className="normal-case tracking-normal text-slate-400">{category.slug}</span>
                </label>
                <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                  Sıra
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
                    defaultValue={category.sortOrder}
                    name="sortOrder"
                    type="number"
                  />
                </label>
                <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                  Durum
                  <select
                    className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white"
                    defaultValue={category.isActive ? "true" : "false"}
                    name="isActive"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                  <span className="normal-case tracking-normal text-slate-400">
                    {category.activeProducts} / {category.productCount} ürün aktif
                  </span>
                </label>
                <button className="inline-flex h-11 items-center justify-center rounded-xl bg-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600" type="submit">
                  Kaydet
                </button>
              </form>
            </article>
          ))}
        </section>
      </main>
    </AdminShell>
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
