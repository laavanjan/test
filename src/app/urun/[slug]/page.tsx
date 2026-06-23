import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPinned,
  PackageCheck,
  RotateCcw,
  Tag,
  Truck,
  UserRound,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductRentPanel } from "@/components/ProductRentPanel";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { RentProductButton } from "@/components/RentProductButton";
import { findProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <section className="product-detail-page">
        <div className="shell breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <Link href={`/kategori/${product.categorySlug}`}>{product.category}</Link>
          <span>-</span>
          <strong>{product.name}</strong>
        </div>

        <div className="shell product-panel">
          <ProductGallery images={product.gallery} name={product.name} />

          <aside className="product-summary">
            <div className="product-summary-topline">
              <span>{product.category}</span>
              <span>SKU {product.sku}</span>
            </div>
            <h1>{product.name}</h1>
            <div className="favorite-line">
              <Heart size={18} /> <span>1 Favori</span>
            </div>
            <div className="price-row">
              <strong>{product.price}</strong>
              <span>
                <Tag size={19} /> Günlük Fiyat
              </span>
            </div>

            <ul className="rental-promises">
              <li>
                <Truck size={20} /> Ücretsiz kargo ve kontrollü teslimat
              </li>
              <li>
                <CalendarDays size={20} /> İhtiyaç halinde süreni uzat
              </li>
              <li>
                <RotateCcw size={20} /> Kiralama süren bittikten bir gün sonra iade et
              </li>
            </ul>

            <ProductRentPanel product={product} />

            <div className="availability-strip">
              <CheckCircle2 size={18} />
              <span>Seçilen tarihler için ön rezervasyon alınabilir.</span>
            </div>

            <div className="rental-timeline" aria-label="Kiralama adımları">
              <p><span>1</span>Tarih</p>
              <p><span>2</span>Ödeme</p>
              <p><span>3</span>Teslimat</p>
              <p><span>4</span>İade</p>
            </div>

            <div className="seller-notes">
              <p>
                <CalendarDays size={19} /> Minimum kiralama süresi bu ürün için{" "}
                {product.minDays} gündür.
              </p>
              <p>
                <UserRound size={19} /> {product.owner}
              </p>
              <p>
                <MapPinned size={19} /> {product.location}
              </p>
              <p>
                <PackageCheck size={19} /> Temizlik ve kalite kontrolünden geçti.
              </p>
            </div>
          </aside>
        </div>

        <section className="shell product-info">
          <h2>Ürün Bilgisi</h2>
          <div>
            {product.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="shell faq-strip">
          <details open>
            <summary>Teslimat nasıl gerçekleşir?</summary>
            <p>
              Ürün, seçtiğiniz tarihte adresinize teslim edilir. Kiralama süresi
              bittikten +1 gün sonra ürün kapınızdan teslim alınabilir ya da
              size en yakın kargo şubesine ücretsiz gönderim kodu ile teslim
              edebilirsiniz.
            </p>
          </details>
          <details>
            <summary>Varsapp güvenli kiralama sistemi nedir?</summary>
            <p>
              Kiraladığınız ürünlerin güvenli bir şekilde sizlere ulaşmasını ve
              kullanılmasını sağlayan mock rezervasyon sistemidir.
            </p>
          </details>
        </section>

        <section className="shell related">
          <h2>Bu Ürünü Kiralayanlar Bunları da Kiraladı</h2>
          <div className="product-grid">
            {products
              .filter((item) => item.slug !== product.slug)
              .slice(0, 4)
              .map((item) => (
                <ProductCard product={item} key={item.slug} />
              ))}
          </div>
        </section>
        <RentProductButton
          className="mobile-rent-bar"
          label={`${product.price} / gün - Hemen Kirala`}
          product={product}
        />
      </section>
    </PageShell>
  );
}
