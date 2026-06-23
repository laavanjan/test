import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, Percent, Sparkles, Trash2 } from "lucide-react";
import { AdminLocked } from "@/components/AdminLocked";
import { AdminShell } from "@/components/AdminShell";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import {
  listAdminCatalogProducts,
  listAdminCategories,
  listAdminDiscounts,
  type AdminDiscount,
} from "@/lib/admin-catalog";

export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  const authorized = isAdminRequestAuthorized(await headers());

  if (!authorized) {
    return <AdminLocked />;
  }

  const [discounts, categories, products] = await Promise.all([
    listAdminDiscounts(),
    listAdminCategories(),
    listAdminCatalogProducts(),
  ]);

  return (
    <AdminShell authConfigured={isAdminAuthConfigured()}>
      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Katalog</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">İndirim yönetimi</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Genel, kategori veya ürün bazlı indirim kuralları oluştur.
            </p>
          </div>
          <Link
            className="inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            href="/admin/products?status=discounted"
            style={{ color: "#ffffff" }}
          >
            İndirimli ürünler
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Metric label="İndirim kuralı" value={discounts.length} />
          <Metric label="Aktif" value={discounts.filter((discount) => discount.isActive).length} />
          <Metric label="Hedefli" value={discounts.filter((discount) => discount.target !== "all").length} />
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-500">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Yeni kural</p>
              <h2 className="text-lg font-black text-slate-900">İndirim oluştur</h2>
            </div>
          </div>
          <DiscountForm categories={categories} products={products} />
        </section>

        <section className="grid gap-4">
          {discounts.length ? (
            discounts.map((discount) => (
              <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" key={discount.id}>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{discount.id}</p>
                    <h2 className="text-lg font-black text-slate-900">{discount.name}</h2>
                  </div>
                  <form action="/api/admin/catalog/discounts" method="post">
                    <input name="action" type="hidden" value="delete" />
                    <input name="id" type="hidden" value={discount.id} />
                    <input name="redirectTo" type="hidden" value="/admin/discounts" />
                    <button className="inline-flex h-9 items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 text-xs font-black text-rose-600 transition hover:bg-rose-100" type="submit">
                      <Trash2 className="h-4 w-4" />
                      Sil
                    </button>
                  </form>
                </div>
                <DiscountForm categories={categories} discount={discount} products={products} />
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <Percent className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-black text-slate-500">Henüz indirim kuralı yok.</p>
            </div>
          )}
        </section>
      </main>
    </AdminShell>
  );
}

function DiscountForm({
  categories,
  discount,
  products,
}: {
  categories: Awaited<ReturnType<typeof listAdminCategories>>;
  discount?: AdminDiscount;
  products: Awaited<ReturnType<typeof listAdminCatalogProducts>>;
}) {
  return (
    <form action="/api/admin/catalog/discounts" className="grid gap-3 md:grid-cols-2 xl:grid-cols-12 xl:items-end" method="post">
      <input name="redirectTo" type="hidden" value="/admin/discounts" />
      {discount ? <input name="id" type="hidden" value={discount.id} /> : null}
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-3">
        Ad
        <input
          className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
          defaultValue={discount?.name || ""}
          name="name"
          placeholder="Haziran kampanyası"
        />
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Tip
        <select className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={discount?.type || "percentage"} name="type">
          <option value="percentage">Yüzde</option>
          <option value="fixed">Sabit</option>
        </select>
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Değer
        <input
          className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
          defaultValue={discount?.value ?? ""}
          min="0"
          name="value"
          step="0.01"
          type="number"
        />
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Hedef
        <select className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={discount?.target || "all"} name="target">
          <option value="all">Tüm katalog</option>
          <option value="category">Kategori</option>
          <option value="product">Ürün</option>
        </select>
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-3">
        Hedef değeri
        <select className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={discount?.targetValue || ""} name="targetValue">
          <option value="">Tüm / seçilmedi</option>
          <optgroup label="Kategoriler">
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Ürünler">
            {products.slice(0, 120).map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </optgroup>
        </select>
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Başlangıç
        <input className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={discount?.startsAt || ""} name="startsAt" type="date" />
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Bitiş
        <input className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={discount?.endsAt || ""} name="endsAt" type="date" />
      </label>
      <label className="grid min-w-0 gap-1 text-xs font-black uppercase tracking-wide text-slate-400 xl:col-span-2">
        Durum
        <select className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={(discount?.isActive ?? true) ? "true" : "false"} name="isActive">
          <option value="true">Aktif</option>
          <option value="false">Pasif</option>
        </select>
      </label>
      <button className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600 md:col-span-2 xl:col-span-2" type="submit">
        Kaydet
      </button>
    </form>
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
