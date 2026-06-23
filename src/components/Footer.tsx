import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { categories } from "@/data/products";

const STORE_LINKS = {
  appStore: "https://apps.apple.com/tr/app/varsapp/id1592552648",
  playStore: "https://play.google.com/store/apps/details?id=com.rzmobile.varsapp",
};

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/varsapp/", label: "Instagram" },
  { href: "https://twitter.com/varsapp", label: "X" },
  { href: "https://www.tiktok.com/@varsapp", label: "TikTok" },
  { href: "https://www.linkedin.com/company/varsapp/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-app">
        <div>
          <h2>Kiralama deneyimine mobilde devam et!</h2>
          <p>
            Satın almadan önce denemek ve ihtiyaç duyduğun tüm ürünler için
            mobil uygulamamızı hemen indir!
          </p>
          <div className="store-buttons">
            <a
              href={STORE_LINKS.playStore}
              target="_blank"
              rel="noreferrer"
              aria-label="Varsapp Google Play sayfasını aç"
            >
              <Image src="/assets/ui/playstore.png" alt="Google Play" width={160} height={48} />
            </a>
            <a
              href={STORE_LINKS.appStore}
              target="_blank"
              rel="noreferrer"
              aria-label="Varsapp App Store sayfasını aç"
            >
              <Image src="/assets/ui/appstore.png" alt="App Store" width={160} height={48} />
            </a>
          </div>
        </div>
      </div>

      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/assets/ui/footer-logo.png" alt="Varsapp Logo" width={126} height={30} />
          <a href="mailto:info@varsapp.com">
            <Mail size={18} /> info@varsapp.com
          </a>
          <p>Pazartesi - Cumartesi: 9:00 - 17:00</p>
          <div className="socials">
            {SOCIAL_LINKS.map((item) => (
              <a href={item.href} key={item.label} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <FooterColumn
          title="Hakkımızda"
          links={[
            { href: "/", label: "Basında Biz" },
            { href: "/", label: "Hakkımızda" },
            { href: "https://www.varsapp.com/blog", label: "Blog Yazıları" },
            { href: "/", label: "İletişim" },
          ]}
        />
        <FooterColumn
          title="Kategoriler"
          links={[
            { href: "/kategori/tum-kategoriler", label: "Tüm Kategoriler" },
            ...categories.map((category) => ({
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
            { href: "/", label: "Sıkça Sorulan Sorular" },
            { href: "/", label: "Puan Sistemi Nedir?" },
            { href: "/", label: "Ürün Kullanım Bilgilendirmeleri" },
          ]}
        />
      </div>
      <div className="shell footer-bottom">
        <span>Copyright © 2024 varsapp.com - Tüm Hakları Saklıdır.</span>
        <Image src="/assets/ui/ssl-banka-logolar.png" alt="ssl-banka-logo" width={230} height={74} />
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
