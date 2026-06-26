"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

type AdminShellProps = {
  authConfigured: boolean;
  children: ReactNode;
};

type AdminNavItem = {
  disabled?: boolean;
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
};

type AdminNavGroup = {
  items: AdminNavItem[];
  title: string;
};

const navGroups: AdminNavGroup[] = [
  {
    items: [
      { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin#orders", icon: ShoppingCart, label: "Siparisler" },
      { href: "/admin#users", icon: UsersRound, label: "Kullanıcılar" },
    ],
    title: "Operasyon",
  },
  {
    items: [
      { href: "/admin#import", icon: Database, label: "IdeaSoft Import" },
      { href: "/admin/products", icon: Package, label: "Ürünler" },
      { href: "/admin/categories", icon: Database, label: "Kategoriler" },
      { href: "/admin/discounts", icon: Sparkles, label: "İndirimler" },
    ],
    title: "Katalog",
  },
  {
    items: [
      { href: "/", icon: Home, label: "Mağaza" },
      { href: "/odeme", icon: Search, label: "Ödeme Testi" },
      { href: "/admin/settings", icon: Settings, label: "Ayarlar" },
    ],
    title: "Sistem",
  },
];

export function AdminShell({ authConfigured, children }: AdminShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    window.localStorage.setItem("varsapp-admin-sidebar-collapsed", isCollapsed ? "1" : "0");
  }, [isCollapsed]);

  useEffect(() => {
    if (!activeHref.startsWith(pathname + "#")) {
      setActiveHref(pathname);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <button
        aria-label="Menuyu ac"
        className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isSidebarOpen ? (
        <button
          aria-label="Menuyu kapat"
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={[
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-100 bg-white shadow-sm transition-all duration-300",
          isCollapsed ? "md:w-20" : "md:w-64",
          isSidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-black text-white shadow-lg shadow-rose-100">
            V
          </div>
          <div className={isCollapsed ? "hidden md:hidden" : "min-w-0"}>
            <p className="truncate text-sm font-black leading-none text-slate-950">Varsapp</p>
            <span className="text-[11px] font-semibold text-slate-400">Admin panel</span>
          </div>
          <button
            aria-label={isCollapsed ? "Sidebar genişlet" : "Sidebar daralt"}
            className="ml-auto hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 md:inline-flex"
            onClick={() => setIsCollapsed((value) => !value)}
            title={isCollapsed ? "Sidebar genişlet" : "Sidebar daralt"}
            type="button"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            aria-label="Menuyu kapat"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div className="mb-6" key={group.title}>
              <h4
                className={[
                  "mb-2 px-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400",
                  isCollapsed ? "md:hidden" : "",
                ].join(" ")}
              >
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = !item.disabled && item.href === activeHref;
                  const classes = [
                    "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-bold transition",
                    isActive
                      ? "border border-rose-100 bg-rose-50 text-rose-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                    item.disabled ? "pointer-events-none opacity-40" : "",
                    isCollapsed ? "md:justify-center md:px-0" : "",
                  ].join(" ");

                  return (
                    <Link
                      aria-disabled={item.disabled ? "true" : undefined}
                      className={classes}
                      href={item.href}
                      key={item.href}
                      onClick={() => { setIsSidebarOpen(false); setActiveHref(item.href); }}
                      style={{ color: item.disabled ? "#94a3b8" : isActive ? "#e11d48" : "#475569" }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={[
                          "h-4 w-4 shrink-0",
                          isActive ? "text-rose-500" : "text-slate-400 group-hover:text-slate-700",
                        ].join(" ")}
                      />
                      <span className={isCollapsed ? "md:hidden" : ""}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-3">
          {authConfigured ? (
            <a
              className={[
                "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950",
                isCollapsed ? "md:justify-center md:px-0" : "",
              ].join(" ")}
              href="/api/admin/logout"
              style={{ color: "#475569" }}
              title={isCollapsed ? "Çıkış" : undefined}
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              <span className={isCollapsed ? "md:hidden" : ""}>Çıkış</span>
            </a>
          ) : (
            <span className="block rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700">
              Demo erişim
            </span>
          )}
        </div>
      </aside>

      <div className={["min-h-screen transition-all duration-300", isCollapsed ? "md:ml-20" : "md:ml-64"].join(" ")}>
        {children}
      </div>
    </div>
  );
}
