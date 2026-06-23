"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export function FavoritesPageClient() {
  const favorites = products.filter((product) => product.featured).slice(0, 12);

  return (
    <section className="favorites-page shell">
      <div className="breadcrumbs">
        <Link href="/">Anasayfa</Link>
        <span>-</span>
        <strong>Beğendiklerim</strong>
      </div>
      <div className="favorites-heading">
        <Heart size={22} />
        <div>
          <h1>Beğendiklerim</h1>
          <p>Favori ürünlerin burada listelenir. Giriş yaptığında tüm cihazlarda senkronize edilir.</p>
        </div>
      </div>
      {favorites.length > 0 ? (
        <div className="product-grid">
          {favorites.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="cart-empty">
          <p>Henüz favori ürünün yok.</p>
          <Link className="rent-button" href="/">
            Ürünleri keşfet
          </Link>
        </div>
      )}
    </section>
  );
}
