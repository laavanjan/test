import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { AdvantagesRow } from "@/components/AdvantagesRow";
import { products, type Product } from "@/data/products";

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

      <AdvantagesRow />

      <ProductSection
        title="En Çok Kiralanan Ürünler ⭐"
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

      <section className="faq-section shell">
        <h2>Sıkça Sorulan Sorular</h2>
        <div className="faq-list">
          <details>
            <summary>Varsapp'tan nasıl kiralama yapabilirim?</summary>
            <p>Beğendiğiniz ürünü seçip, kiralama tarihlerinizi belirledikten sonra güvenli ödeme adımını tamamlayarak kolayca kiralama talebi oluşturabilirsiniz.</p>
          </details>
          <details>
            <summary>Kargo ve teslimat süreci nasıl işliyor?</summary>
            <p>Tüm kiralama siparişlerinizde gidiş ve dönüş kargo süreçleri tamamen ücretsizdir. Ürününüz kargo ile kapınıza teslim edilir.</p>
          </details>
          <details>
            <summary>Kiralama süresi bittiğinde ürünü nasıl teslim edeceğim?</summary>
            <p>Kiralama süreniz bittiğinde, size verilen ücretsiz kargo gönderim kodu ile en yakın kargo şubesine teslim edebilir ya da kapıdan teslim alma talebi oluşturabilirsiniz.</p>
          </details>
          <details>
            <summary>Kiralama süresini uzatabilir miyim?</summary>
            <p>Evet! Kiralama süreniz dolmadan önce üye panelinizden ya da müşteri hizmetlerimizle iletişime geçerek kiralama sürenizi kolayca uzatabilirsiniz.</p>
          </details>
          <details>
            <summary>Kiraladığım üründe hasar oluşursa ne olur?</summary>
            <p>Varsapp güvence kapsamındaki ürünlerimizde, normal kullanım kaynaklı oluşabilecek hafif çizik ve yıpranmalar güvencemiz altındadır.</p>
          </details>
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
