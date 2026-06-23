"use client";

import { findProduct, type Product } from "@/data/products";
import { addDaysToDateValue, countRentalDays, getTodayDateValue } from "@/lib/rental-dates";
import { parseTurkishLiraToKurus } from "@/lib/money";

export type StoredCartItem = {
  days: number;
  endDate: string;
  productSlug: string;
  startDate: string;
};

export type CartLine = StoredCartItem & {
  product: Product;
  subtotalKurus: number;
  unitPriceKurus: number;
};

const CART_STORAGE_KEY = "varsapp-cart-v1";

export function readCartItems(): StoredCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as StoredCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCartItems(items: StoredCartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("varsapp-cart-updated"));
}

export function createDefaultCartItem(product: Product): StoredCartItem {
  const startDate = getTodayDateValue();
  const endDate = addDaysToDateValue(startDate, product.minDays);

  return {
    days: product.minDays,
    endDate,
    productSlug: product.slug,
    startDate,
  };
}

export function addProductToCart(product: Product, dates?: Pick<StoredCartItem, "startDate" | "endDate" | "days">) {
  const items = readCartItems();
  const existingIndex = items.findIndex((item) => item.productSlug === product.slug);
  const nextItem: StoredCartItem = dates
    ? {
        days: dates.days,
        endDate: dates.endDate,
        productSlug: product.slug,
        startDate: dates.startDate,
      }
    : createDefaultCartItem(product);

  if (existingIndex >= 0) {
    items[existingIndex] = nextItem;
  } else {
    items.push(nextItem);
  }

  writeCartItems(items);
  return items;
}

export function updateCartItemDays(productSlug: string, days: number, minDays: number) {
  const items = readCartItems();
  const index = items.findIndex((item) => item.productSlug === productSlug);

  if (index < 0) {
    return items;
  }

  const item = items[index];
  const nextDays = Math.max(minDays, days);
  items[index] = {
    ...item,
    days: nextDays,
    endDate: addDaysToDateValue(item.startDate, nextDays),
  };

  writeCartItems(items);
  return items;
}

export function removeCartItem(productSlug: string) {
  const items = readCartItems().filter((item) => item.productSlug !== productSlug);
  writeCartItems(items);
  return items;
}

export function hydrateCartItems(items: StoredCartItem[]): CartLine[] {
  return items
    .map((item) => {
      const product = findProduct(item.productSlug);
      if (!product) {
        return null;
      }

      const unitPriceKurus = parseTurkishLiraToKurus(product.price);
      const days = item.days || countRentalDays(item.startDate, item.endDate);

      return {
        ...item,
        days,
        product,
        subtotalKurus: unitPriceKurus * days,
        unitPriceKurus,
      };
    })
    .filter((item): item is CartLine => item !== null);
}

export function getCartCount() {
  return readCartItems().length;
}
