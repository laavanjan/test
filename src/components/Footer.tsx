import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { SOCIAL_LINKS } from "@/lib/social-links";

const STORE_LINKS = {
  appStore: "https://apps.apple.com/tr/app/varsapp/id1592552648",
  playStore: "https://play.google.com/store/apps/details?id=com.rzmobile.varsapp",
};

const CATEGORY_ORDER = [
  "oyun-ve-hobi",
  "ses-ve-kamera",
  "monitor-ve-laptop",
  "ev-yasam",
];

const orderedCategories = CATEGORY_ORDER
  .map((slug) => categories.find((category) => category.slug === slug))
  .filter((category): category is (typeof categories)[number] => Boolean(category));

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/assets/ui/footer-logo.png" alt="Varsapp Logo" width={126} height={30} />
          <a href="mailto:info@varsapp.com">info@varsapp.com</a>
          <p>Pazartesi - Cumartesi: 9:00 - 17:00</p>
          <div className="socials">
            {SOCIAL_LINKS.map(({ href, label, svg }) => (
              <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}>
                {svg}
              </a>
            ))}
          </div>
          <div className="store-buttons">
            <a
              href={STORE_LINKS.playStore}
              target="_blank"
              rel="noreferrer"
              aria-label="Varsapp Google Play sayfasını aç"
            >
              <Image src="/assets/ui/playstore.png" alt="Google Play" width={140} height={42} />
            </a>
            <a
              href={STORE_LINKS.appStore}
              target="_blank"
              rel="noreferrer"
              aria-label="Varsapp App Store sayfasını aç"
            >
              <Image src="/assets/ui/appstore.png" alt="App Store" width={140} height={42} />
            </a>
          </div>
        </div>
        <FooterColumn
          title="Hakkımızda"
          links={[
            { href: "/", label: "Basında Biz" },
            { href: "/", label: "Hakkımızda" },
            { href: "https://www.varsapp.com/blog", label: "Blog Yazıları" },
            { href: "/sayfa/iletisim", label: "İletişim" },
          ]}
        />
        <FooterColumn
          title="Kategoriler"
          links={[
            { href: "/kategori/tum-kategoriler", label: "Tüm Kategoriler" },
            ...orderedCategories.map((category) => ({
              href: `/kategori/${category.slug}`,
              label: category.name,
            })),
          ]}
        />
        <FooterColumn
          title="Daha Fazlası"
          links={[
            {
              href: "/sayfa/varsapp-teslimat-sureci-nasil-yapiliyor",
              label: "Teslimat Süreci Nasıl Yapılır?",
            },
            { href: "/sayfa/sikca-sorulan-sorular", label: "Sıkça Sorulan Sorular" },
            { href: "/sayfa/puan-sistemi-nedir", label: "Puan Sistemi Nedir?" },
            { href: "/sayfa/urun-kullanim-bilgilendirmeleri", label: "Ürün Kullanım Bilgilendirmeleri" },
          ]}
        />
      </div>
      <div className="footer-bottom-wrap">
        <div className="shell footer-bottom">
          <span>Copyright © 2024 varsapp.com - Tüm Hakları Saklıdır.</span>
          <div className="footer-bottom-images">
            <Image src="/assets/ui/ssl-banka-logolar.png" alt="ssl-banka-logo" width={460} height={148} />
            <a href="https://etbis.eticaret.gov.tr/sitedogrulama/4814540232075570" target="_blank" rel="noreferrer" aria-label="ETBİS Site Doğrulama">
              <Image src="/assets/ui/QR code.jpg" alt="QR Code" width={148} height={148} />
            </a>
          </div>
        </div>
        {/* <div className="footer-credit">
          <a href="https://www.ideasoft.com.tr/?utm_source=www.varsapp.com&utm_medium=referral" target="_blank" rel="noreferrer">
            ideasoft e-ticaret paketleri ile hazırlandı.
          </a>
        </div> */}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <Link href={link.href} key={link.label}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
