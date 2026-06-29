"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CustomerAccount } from "@/lib/customer-auth";

interface UserSidebarProps {
  account: CustomerAccount;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Siparişlerim", href: "/hesabim?tab=siparisler" },
  { label: "Favorilerim", href: "/hesabim/favorilerim" },
  { label: "Profilim", href: "/hesabim?tab=profil" },
  { label: "İndirim Kuponlarım", href: "/hesabim?tab=kuponlarim" },
  { label: "İlanlarım", href: "/hesabim?tab=ilanlarim" },
];

export function UserSidebar({ account, isOpen, onClose }: UserSidebarProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    onClose();
    router.push("/");
    router.refresh();
  }

  if (!mounted) return null;

  return createPortal(
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`user-sidebar${isOpen ? " open" : ""}`}>
        <button className="sidebar-close" onClick={onClose} aria-label="Kapat">
          <X size={22} />
        </button>

        <div className="sidebar-header">
          <h2>Merhaba,</h2>
          <p className="sidebar-username">{account.name}</p>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={onClose}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            Çıkış
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}
