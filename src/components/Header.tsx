import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Gamepad2,
  Heart,
  Home,
  Laptop,
  LogIn,
  TentTree,
  UserPlus,
} from "lucide-react";
import { CartBadge } from "@/components/CartBadge";
import { LocationSelector } from "@/components/LocationSelector";
import { LogoutButton } from "@/components/LogoutButton";
import { SearchBox } from "@/components/SearchBox";
import { getCurrentCustomerAccount } from "@/lib/customer-auth";
import { getStoreCategories } from "@/lib/store-catalog";

const iconMap = {
  "ev-yasam": Home,
  "ses-ve-kamera": Camera,
  "monitor-ve-laptop": Laptop,
  decathlon: TentTree,
  "oyun-ve-hobi": Gamepad2,
};

export async function Header() {
  const [account, categories] = await Promise.all([
    getCurrentCustomerAccount(),
    getStoreCategories(),
  ]);

  return (
    <header className="site-header">
      <div className="topbar shell">
        <Link className="logo-link" href="/" aria-label="Varsapp ana sayfa">
          <Image
            src="/assets/ui/logo.png"
            alt="varsapp"
            width={116}
            height={116}
            priority
          />
        </Link>

        <LocationSelector />

        <SearchBox />

        <div className="header-actions">
          {account ? (
            <>
              <Link className="icon-only" href="/hesabim/favorilerim" aria-label="Favoriler">
                <Heart size={20} />
              </Link>
              <span className="header-account">{account.name}</span>
              <LogoutButton />
              <CartBadge />
            </>
          ) : (
            <>
              <Link className="header-button primary" href="/uye-ol">
                <UserPlus size={16} />
                <span>Üye Ol</span>
              </Link>
              <Link className="header-button muted" href="/giris-yap">
                <LogIn size={16} />
                <span>Giriş Yap</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="category-nav" aria-label="Ana kategoriler">
        <div className="shell category-scroll">
          {categories.map((category) => {
            const Icon = iconMap[category.slug as keyof typeof iconMap];

            return (
              <Link href={`/kategori/${category.slug}`} key={category.slug}>
                <Icon size={22} strokeWidth={1.7} />
                <span>{category.name}</span>
              </Link>
            );
          })}
          <Link href="/sayfa/varsapp-teslimat-sureci-nasil-yapiliyor">
            Teslimat Süreci Nasıl Yapılıyor?
          </Link>
          <Link href="/sayfa/varsapp-kullanici-yorumlari">
            Kullanıcılarımızın Yorumları
          </Link>
        </div>
      </nav>
    </header>
  );
}
