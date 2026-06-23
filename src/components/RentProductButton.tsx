"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { addProductToCart } from "@/lib/cart-storage";
import { validateRentalDates } from "@/lib/rental-dates";

type RentProductButtonProps = {
  className?: string;
  dates?: { startDate: string; endDate: string; days: number };
  label?: string;
  product: Product;
};

export function RentProductButton({
  className = "rent-button",
  dates,
  label = "Hemen Kirala",
  product,
}: RentProductButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (dates) {
      const validationError = validateRentalDates({
        startDate: dates.startDate,
        endDate: dates.endDate,
        minDays: product.minDays,
      });

      if (validationError) {
        setError(validationError);
        return;
      }
    }

    addProductToCart(product, dates);
    router.push("/sepet");
  }

  return (
    <div className="rent-action">
      <button className={className} type="button" onClick={handleClick}>
        {label}
      </button>
      {error ? <p className="rent-action-error">{error}</p> : null}
    </div>
  );
}
