import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Product } from "@/data/products";

const features = [
  { label: "100.000+ Kullanıcı", icon: Users, image: "/assets/ui/feature-users.png" },
  { label: "Depozito Yok", icon: WalletCards, image: "/assets/ui/feature-deposit.png" },
  { label: "Güvenli Kiralama", icon: ShieldCheck, image: "/assets/ui/feature-safe.png" },
  { label: "Ücretsiz Kargo", icon: Truck, image: "/assets/ui/feature-cargo.png" },
];

const steps = [
  ["Denemek istediğin ürünü seç", "Kategorileri gez, ihtiyacına uygun ürünü bul."],
  ["Sana uygun tarihleri belirle", "Kiralama başlangıç ve bitiş tarihlerini seç."],
  ["Siparişin kargolansın", "Ürün seçtiğin tarihte adresine teslim edilir."],
  ["İster süreni uzat", "Kiralama bitince ücretsiz iade süreci başlar."],
];

const comments = [
  ["Merve E.", "PlayStation 5 Oyun Konsolu", "Oğlumun doğum günü için kiraladım. Arkadaşları ile içinde bulunan ücretsiz oyunlar sayesinde çok eğlendiler."],
  ["Sibel Y.", "Halı ve Koltuk Yıkama Makinesi", "Üç gün çok olur diye düşünmüştüm, ama kullanınca ideal olduğunu anlıyorsunuz. Kargolama aşaması da çok kolay oldu."],
  ["Tuğba E.", "Halı ve Koltuk Yıkama Makinesi + SC3 Buharlı Temizlik", "İlk defa kiralama yaptım ve 3 gün daha dursa mı diye düşündüm. Bu ikili gayet güzel."],
];

const quickUseCases = [
  { label: "Hafta sonu planları", value: "Kano, kamera, oyun konsolu" },
  { label: "Ev ihtiyaçları", value: "Temizlik ve bakım ekipmanları" },
  { label: "Denemeden alma", value: "Teknoloji ve hobi ürünleri" },
];

export default function Home() {
  return (
    <PageShell>
      <HeroSlider />

      <section className="rental-planner shell" aria-label="Kiralama planlayıcısı">
        <div className="planner-heading">
          <p>Hızlı kiralama</p>
          <h2>Ne zaman, nerede, neye ihtiyacın var?</h2>
        </div>
        <div className="planner-grid">
          <label>
            <span>Ürün veya kategori</span>
            <input readOnly placeholder="Kamera, kano, temizlik..." />
          </label>
          <label>
            <span>Başlangıç</span>
            <input readOnly placeholder="Bugün" />
          </label>
          <label>
            <span>Bitiş</span>
            <input readOnly placeholder="3 gün sonra" />
          </label>
          <label>
            <span>Şehir</span>
            <input readOnly placeholder="İstanbul" />
          </label>
          <Link href="/kategori/ev-yasam">Uygun ürünleri bul</Link>
        </div>
        <div className="planner-categories">
          {categories.map((category) => (
            <Link href={`/kategori/${category.slug}`} key={category.slug}>
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-row shell" aria-label="Varsapp avantajları">
        {features.map(({ label, icon: Icon, image }) => (
          <button type="button" className="feature-card" key={label}>
            <span className="feature-visual">
              <Image src={image} alt="" width={28} height={28} />
              <Icon size={20} />
            </span>
            <strong>{label}</strong>
            <ChevronDown size={18} />
          </button>
        ))}
      </section>

      <ProductSection
        title="En Çok Kiralanan Ürünler"
        subtitle="Hafta sonu, tatil ve ev ihtiyaçları için hızlı teslim edilen seçenekler."
        marker="/assets/ui/feature-safe.png"
        products={products.slice(0, 8)}
      />

      <section className="how shell">
        <h2>
          <strong>Varsapp</strong> Nasıl Çalışır?
        </h2>
        <button className="tab-button" type="button">Kiralayan için</button>
        <div className="step-grid">
          {steps.map(([title, text], index) => (
            <article className="step-card" key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductSection
        title="Popüler Ürünler"
        subtitle="Temizlik, teknoloji ve hobi ekipmanlarında sık tercih edilenler."
        marker="/assets/ui/feature-cargo.png"
        products={products.slice(0, 10)}
      />

      <section className="use-case-strip shell" aria-label="Kullanım senaryoları">
        {quickUseCases.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="comments shell">
        <div className="comments-heading">
          <h2>Kullanıcı Yorumları</h2>
          <Image src="/assets/ui/comments-banner.png" alt="" width={190} height={114} />
        </div>
        <div className="comment-grid">
          {comments.map(([name, product, quote]) => (
            <article className="comment-card" key={name}>
              <p>{quote}</p>
              <h3>{name}</h3>
              <span>{product}</span>
            </article>
          ))}
        </div>
      </section>

      <Link className="whatsapp" href="/" aria-label="WhatsApp ile iletişime geç">
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </Link>
    </PageShell>
  );
}

function ProductSection({
  title,
  subtitle,
  marker,
  products,
}: {
  title: string;
  subtitle: string;
  marker: string;
  products: Product[];
}) {
  return (
    <section className="product-section shell">
      <div className="section-title">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <Image src={marker} alt="" width={34} height={34} />
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={`${title}-${product.slug}`} />
        ))}
      </div>
    </section>
  );
}
