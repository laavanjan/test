"use client";

import { useState } from "react";
import { UserCircle } from "lucide-react";
import { UserSidebar } from "@/components/UserSidebar";
import type { Customer } from "@/lib/customer-auth";

interface HeaderClientProps {
  account: Customer;
}

export function HeaderClient({ account }: HeaderClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        className="user-menu-trigger"
        onClick={() => setSidebarOpen(true)}
        aria-label="Hesabım"
      >
        <span className="user-icon-btn">
          <UserCircle size={20} />
        </span>
        <span className="user-name">{account.name}</span>
      </button>

      <UserSidebar
        account={account}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
