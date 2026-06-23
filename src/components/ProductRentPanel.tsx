"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { RentalDatePicker } from "@/components/RentalDatePicker";
import { RentProductButton } from "@/components/RentProductButton";
import { addDaysToDateValue, getTodayDateValue } from "@/lib/rental-dates";

type ProductRentPanelProps = {
  product: Product;
};

export function ProductRentPanel({ product }: ProductRentPanelProps) {
  const today = getTodayDateValue();
  const [dates, setDates] = useState({
    startDate: today,
    endDate: addDaysToDateValue(today, product.minDays),
    days: product.minDays,
  });

  const estimatedTotal = useMemo(
    () => formatRentalTotal(product.price, dates.days),
    [product.price, dates.days],
  );

  return (
    <>
      <RentalDatePicker minDays={product.minDays} onChange={setDates} />

      <div className="rental-total-card">
        <span>Ücretsiz kargo dahil toplam</span>
        <strong>{estimatedTotal}</strong>
        <small>
          {dates.days} gün x {product.price} / gün
        </small>
      </div>

      <RentProductButton product={product} dates={dates} />
    </>
  );
}

function formatRentalTotal(price: string, days: number) {
  const normalized = price
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");
  const amount = Number(normalized);

  if (!Number.isFinite(amount)) {
    return price;
  }

  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount * days)} TL`;
}
