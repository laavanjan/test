"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";
import { findProduct } from "@/data/products";
import {
  createDefaultCartItem,
  hydrateCartItems,
  readCartItems,
  removeCartItem,
  updateCartItemDays,
  type CartLine,
} from "@/lib/cart-storage";
import { formatDateDisplay } from "@/lib/rental-dates";
import { formatKurusAsCurrency } from "@/lib/money";

type CartPageClientProps = {
  initialProductSlug?: string;
};

export function CartPageClient({ initialProductSlug }: CartPageClientProps) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readCartItems();

      if (initialProductSlug && !stored.some((item) => item.productSlug === initialProductSlug)) {
        const product = findProduct(initialProductSlug);
        if (product) {
          stored.push(createDefaultCartItem(product));
          window.localStorage.setItem("varsapp-cart-v1", JSON.stringify(stored));
          window.dispatchEvent(new Event("varsapp-cart-updated"));
        }
      }

      setLines(hydrateCartItems(readCartItems()));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialProductSlug]);

  const totals = useMemo(() => {
    const subtotalKurus = lines.reduce((sum, line) => sum + line.subtotalKurus, 0);
    return {
      subtotalKurus,
      totalKurus: subtotalKurus,
    };
  }, [lines]);

  function refresh() {
    setLines(hydrateCartItems(readCartItems()));
  }

  function handleDaysChange(productSlug: string, nextDays: number, minDays: number) {
    updateCartItemDays(productSlug, nextDays, minDays);
    refresh();
  }

  function handleRemove(productSlug: string) {
    removeCartItem(productSlug);
    refresh();
  }

  function buildCheckoutHref() {
    const params = new URLSearchParams({
      items: JSON.stringify(
        lines.map((line) => ({
          days: line.days,
          endDate: line.endDate,
          productSlug: line.product.slug,
          startDate: line.startDate,
        })),
      ),
      product: lines[0].product.slug,
    });

    return `/odeme?${params.toString()}`;
  }

  if (lines.length === 0) {
    return (
      <section className="cart-page shell">
        <div className="breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <strong>Sepetim</strong>
        </div>
        <h1>Sepetim</h1>
        <div className="cart-empty">
          <p>Sepetinizde ürün bulunmuyor.</p>
          <Link className="rent-button" href="/">
            Ürünleri keşfet
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page shell">
      <div className="breadcrumbs">
        <Link href="/">Anasayfa</Link>
        <span>-</span>
        <strong>Sepetim</strong>
      </div>
      <h1>Sepetim</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {lines.map((line) => (
            <article className="cart-item" key={line.productSlug}>
              <div className="cart-image">
                <Image src={line.product.image} alt={line.product.name} fill sizes="160px" />
              </div>
              <div>
                <h2>{line.product.name}</h2>
                <p>
                  Kiralama: {formatDateDisplay(line.startDate)} - {formatDateDisplay(line.endDate)}
                </p>
                <span>Günlük Fiyat: {formatKurusAsCurrency(line.unitPriceKurus)}</span>
              </div>
              <div className="rental-days-control" aria-label="Kiralama süresi">
                <span>Kiralama süresi</span>
                <div className="qty-control">
                  <button
                    type="button"
                    aria-label="Kiralama süresini azalt"
                    onClick={() =>
                      handleDaysChange(line.productSlug, line.days - 1, line.product.minDays)
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <strong>{line.days} gün</strong>
                  <button
                    type="button"
                    aria-label="Kiralama süresini artır"
                    onClick={() =>
                      handleDaysChange(line.productSlug, line.days + 1, line.product.minDays)
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                className="delete-button"
                type="button"
                aria-label="Sepetten sil"
                onClick={() => handleRemove(line.productSlug)}
              >
                <Trash2 size={20} />
              </button>
            </article>
          ))}

          <div className="cart-benefits">
            <p>
              <Truck size={18} /> Ücretsiz kargo
            </p>
            <p>
              <ShieldCheck size={18} /> Güvenli kiralama
            </p>
          </div>
        </div>

        <aside className="cart-summary">
          <h2>Sipariş Özeti</h2>
          <div>
            <span>Ürün Toplamı ({lines.length} ürün)</span>
            <strong>{formatKurusAsCurrency(totals.subtotalKurus)}</strong>
          </div>
          <div>
            <span>Kargo</span>
            <strong>Ücretsiz</strong>
          </div>
          <div className="total">
            <span>Genel Toplam</span>
            <strong>{formatKurusAsCurrency(totals.totalKurus)}</strong>
          </div>
          <Link
            className="rent-button"
            href={buildCheckoutHref()}
          >
            Alışverişi Tamamla
          </Link>
        </aside>
      </div>
    </section>
  );
}
