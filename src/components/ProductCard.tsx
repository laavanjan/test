import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Crown, Heart, Map, ShoppingCart, Truck, User } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-media" href={`/urun/${product.slug}`}>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        {product.featured ? (
          <span className="rented-badge">
            <Crown size={14} fill="currentColor" />
            En Çok Kiralanan
          </span>
        ) : null}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>
      <div className="product-card-body">
        <Link className="product-card-title" href={`/urun/${product.slug}`}>
          {product.name}
        </Link>
        <div className="card-price">
          <div>
            <strong>{product.price}</strong>
            <span>/gün</span>
          </div>
          <Link className="card-cta" href={`/urun/${product.slug}`} aria-label={`${product.name} ürününü kirala`}>
            Kirala <ArrowRight size={14} />
          </Link>
        </div>
        <div className="product-meta-row" aria-label="Kiralama bilgileri">
          {/* <span>
            <CalendarDays size={13} />
            {product.minDays} gün min.
          </span> */}
          <span>
            <Truck size={13} />
            Kargo ücretsiz
          </span>
        </div>
        <div className="product-bottom-row">
          <div className="product-bottom-info">
            <span className="product-owner">
              <User size={14} />
              {product.owner}
            </span>
            <span className="product-location">
              <Map size={14} />
              {product.location}
            </span>
          </div>
        </div>
      </div>
      <div className="product-icon-actions">
        <button className="product-icon-btn" type="button" aria-label="Favorilere ekle">
          <Heart size={17} />
        </button>
        <button className="product-icon-btn" type="button" aria-label="Sepete ekle">
          <ShoppingCart size={17} />
        </button>
      </div>
    </article>
  );
}
