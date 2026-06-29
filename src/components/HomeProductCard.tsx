import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import type { Product } from "@/data/products";

export function HomeProductCard({ product }: { product: Product }) {
  return (
    <article className="home-product-card">
      <Link className="product-media" href={`/urun/${product.slug}`}>
        {product.badge ? <span className="badge">{product.badge}</span> : null}
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
         <div className="product-meta-row">
          <span>
            <Truck size={13} />
            Kargo ücretsiz
          </span>
        </div>
        <div className="home-card-price">
          <strong>{product.price}</strong>
          <span>/gün</span>
        </div>
      </div>
    </article>
  );
}
