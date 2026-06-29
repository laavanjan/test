import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Gamepad2,
  Heart,
  Home,
  Laptop,
  LogIn,
  ShoppingCart,
  TentTree,
  UserPlus,
  UserCircle,
} from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { HeaderClient } from "@/components/HeaderClient";
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

        {/* <LocationSelector /> */}

        <SearchBox />

        <div className="header-actions">
          {account ? (
            <>
              <Link className="icon-only" href="/hesabim/favorilerim" aria-label="Favoriler">
                <Heart size={20} />
              </Link>
              <Link className="icon-only" href="/sepet" aria-label="Sepet">
                <ShoppingCart size={20} />
              </Link>
              <HeaderClient account={account} />
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
