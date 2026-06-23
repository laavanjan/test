"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="primary-product-image">
        <Image src={active} alt={name} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
      </div>
      <div className="thumb-row">
        {images.map((image) => (
          <button
            className={active === image ? "active" : ""}
            key={image}
            onClick={() => setActive(image)}
            type="button"
          >
            <Image src={image} alt="" fill sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
