import Link from "next/link";
import { CalendarDays, ChevronDown, PackageCheck, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { getStoreCategories, getStoreProductsByCategory } from "@/lib/store-catalog";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tarih?: string }>;
}) {
  const { slug } = await params;
  const { tarih } = await searchParams;
  const [storeCategories, list] = await Promise.all([
    getStoreCategories(),
    getStoreProductsByCategory(slug),
  ]);
  const category =
    slug === "tum-kategoriler"
      ? { name: "Tüm Kategoriler", slug: "tum-kategoriler" }
      : storeCategories.find((item) => item.slug === slug);
  const activeDateFilter =
    tarih === "bu-hafta" || tarih === "hafta-sonu" ? tarih : undefined;
  const filteredList = activeDateFilter
    ? list.filter((product) =>
        activeDateFilter === "hafta-sonu" ? product.minDays <= 3 : product.minDays <= 7,
      )
    : list;
  const baseHref = `/kategori/${category?.slug ?? slug}`;
  const dateFilters = [
    { href: `${baseHref}?tarih=bu-hafta`, icon: CalendarDays, label: "Bu hafta müsait", value: "bu-hafta" },
    { href: `${baseHref}?tarih=hafta-sonu`, icon: CalendarDays, label: "Hafta sonu", value: "hafta-sonu" },
  ] as const;

  if (!category) {
    return (
      <PageShell>
        <section className="category-page shell">
          <div className="cart-empty">
            <p>Kategori bulunamadı.</p>
            <Link className="rent-button" href="/kategori/tum-kategoriler">
              Tüm ürünleri gör
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="category-page shell">
        <div className="breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <strong>{category.name}</strong>
        </div>

        <div className="category-toolbar">
          <div>
            <p className="section-kicker">Kiralık ürünler</p>
            <h1>{category.name}</h1>
            <span>
              {filteredList.length} ürün, minimum 3 günlük kiralama ve ücretsiz kargo seçenekleri.
              {activeDateFilter ? " Tarih filtresi aktif." : ""}
            </span>
          </div>
          <button type="button">
            Önerilen sıralama <ChevronDown size={18} />
          </button>
        </div>

        <div className="category-layout">
          <aside className="filter-sidebar" aria-label="Ürün filtreleri">
            <div>
              <p>
                <SlidersHorizontal size={16} />
                Filtreler
              </p>
              <Link className="clear-filter" href={baseHref}>Temizle</Link>
            </div>
            <fieldset>
              <legend>Kiralama tarihi</legend>
              {dateFilters.map(({ href, icon: Icon, label, value }) => (
                <Link
                  className={`filter-option${activeDateFilter === value ? " active" : ""}`}
                  href={href}
                  key={value}
                  aria-current={activeDateFilter === value ? "true" : undefined}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              ))}
            </fieldset>
            <fieldset>
              <legend>Güvence</legend>
              <label>
                <Truck size={15} />
                Kargo dahil
              </label>
              <label>
                <ShieldCheck size={15} />
                Güvenli kiralama
              </label>
              <label>
                <PackageCheck size={15} />
                Stokta
              </label>
            </fieldset>
          </aside>

          <div className="category-results">
            <div className="category-filterbar" aria-label="Aktif filtreler">
              <Link
                className={activeDateFilter ? "active" : undefined}
                href={`${baseHref}?tarih=bu-hafta`}
              >
                <CalendarDays size={16} />
                Tarih seç
              </Link>
              <button type="button">
                <Truck size={16} />
                Kargo dahil
              </button>
              <button type="button">
                <ShieldCheck size={16} />
                Güvenli kiralama
              </button>
              <button type="button">
                <PackageCheck size={16} />
                Stokta
              </button>
            </div>

            {filteredList.length > 0 ? (
              <div className="product-grid category-grid">
                {filteredList.map((product) => (
                  <ProductCard product={product} key={product.slug} />
                ))}
              </div>
            ) : (
              <div className="cart-empty category-empty">
                <p>Bu kategoride henüz ürün yok. Ürün importu tamamlandığında burada listelenecek.</p>
                <Link className="rent-button" href="/kategori/tum-kategoriler">
                  Tüm ürünleri gör
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
