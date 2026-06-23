"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { addProductToCart, createDefaultCartItem } from "@/lib/cart-storage";
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
    const rentalDates = dates ?? createDefaultCartItem(product);
    const validationError = validateRentalDates({
      startDate: rentalDates.startDate,
      endDate: rentalDates.endDate,
      minDays: product.minDays,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    addProductToCart(product, rentalDates);
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
