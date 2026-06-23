"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button className="header-button muted" onClick={logout} type="button">
      <LogOut size={16} />
      <span>Çıkış</span>
    </button>
  );
}
