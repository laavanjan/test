"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Camera,
  Gamepad2,
  Home,
  Laptop,
  Menu,
  TentTree,
} from "lucide-react";

const iconMap = {
  "ev-yasam": Home,
  "ses-ve-kamera": Camera,
  "monitor-ve-laptop": Laptop,
  decathlon: TentTree,
  "oyun-ve-hobi": Gamepad2,
};

interface CategoryDrawerProps {
  categories: { slug: string; name: string }[];
}

export function CategoryDrawer({ categories }: CategoryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="hamburger-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Kategorileri aç"
      >
        <Menu size={22} />
      </button>

      {mounted
        ? createPortal(
            <>
              {isOpen ? (
                <div className="sidebar-overlay" onClick={close} aria-hidden="true" />
              ) : null}

              <aside className={`category-drawer${isOpen ? " open" : ""}`}>
                <nav className="category-drawer-nav">
                  {categories.map((category) => {
                    const Icon = iconMap[category.slug as keyof typeof iconMap];

                    return (
                      <Link
                        href={`/kategori/${category.slug}`}
                        key={category.slug}
                        onClick={close}
                      >
                        {Icon ? <Icon size={20} strokeWidth={1.7} /> : null}
                        <span>{category.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/sayfa/varsapp-teslimat-sureci-nasil-yapiliyor"
                    onClick={close}
                  >
                    Teslimat Süreci Nasıl Yapılıyor?
                  </Link>
                  <Link href="/sayfa/varsapp-kullanici-yorumlari" onClick={close}>
                    Kullanıcılarımızın Yorumları
                  </Link>
                </nav>
              </aside>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
