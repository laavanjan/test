import Link from "next/link";
import { CalendarDays, ChevronDown, PackageCheck, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { categories, productsByCategory } from "@/data/products";

export function generateStaticParams() {
  return [
    { slug: "tum-kategoriler" },
    ...categories.map((category) => ({ slug: category.slug })),
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category =
    slug === "tum-kategoriler"
      ? { name: "Tüm Kategoriler", slug: "tum-kategoriler" }
      : categories.find((item) => item.slug === slug);
  const list = productsByCategory(slug);

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
            <span>{list.length} ürün, minimum 3 günlük kiralama ve ücretsiz kargo seçenekleri.</span>
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
              <button type="button">Temizle</button>
            </div>
            <fieldset>
              <legend>Kiralama tarihi</legend>
              <label>
                <CalendarDays size={15} />
                Bu hafta müsait
              </label>
              <label>
                <CalendarDays size={15} />
                Hafta sonu
              </label>
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
              <button type="button">
                <CalendarDays size={16} />
                Tarih seç
              </button>
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

            {list.length > 0 ? (
              <div className="product-grid category-grid">
                {list.map((product) => (
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
