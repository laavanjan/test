"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { getCartCount } from "@/lib/cart-storage";

export function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function refresh() {
      setCount(getCartCount());
    }

    refresh();
    window.addEventListener("varsapp-cart-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("varsapp-cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Link className="cart-pill" href="/sepet" aria-label="Sepet">
      <ShoppingBag size={18} />
      <span>{count}</span>
    </Link>
  );
}
