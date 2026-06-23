"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    alt: "+2 gün bizden hediye kampanyası",
    src: "/assets/ui/hero-1.png",
  },
  {
    alt: "Varsapp ile güvenli kiralama",
    src: "/assets/ui/hero-2.png",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function goTo(nextIndex: number) {
    setIndex((nextIndex + slides.length) % slides.length);
  }

  return (
    <section className="hero shell">
      <button
        className="hero-arrow left"
        aria-label="Önceki kampanya"
        type="button"
        onClick={() => goTo(index - 1)}
      >
        <ChevronLeft size={34} />
      </button>
      <Image src={slide.src} alt={slide.alt} fill priority sizes="100vw" />
      <button
        className="hero-arrow right"
        aria-label="Sonraki kampanya"
        type="button"
        onClick={() => goTo(index + 1)}
      >
        <ChevronRight size={34} />
      </button>
      <div className="hero-dots" aria-hidden="true">
        {slides.map((item, dotIndex) => (
          <button
            key={item.src}
            type="button"
            className={dotIndex === index ? "active" : undefined}
            onClick={() => goTo(dotIndex)}
            aria-label={`Kampanya ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
