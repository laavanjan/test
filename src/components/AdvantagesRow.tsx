"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const features = [
  {
    id: "users",
    label: "300.000+ Kullanıcı",
    image: "/assets/ui/feature-users.png",
    description: "300.000'den fazla kiralama ve mutlu müşteri ile her geçen gün birlikte büyüyoruz.",
  },
  {
    id: "deposit",
    label: "Depozito Yok",
    image: "/assets/ui/feature-deposit.png",
    description: "Kredi kartınızdan kiralama ücreti haricinde herhangi bir bedel almıyoruz.",
  },
  {
    id: "safe",
    label: "Güvenli Kiralama",
    image: "/assets/ui/feature-safe.png",
    description: "Kiralama süreçlerinizde eşya kiralama sigortamız ve güvenli kiralama sistemimizle yanınızdayız.",
  },
  {
    id: "cargo",
    label: "Ücretsiz Kargo",
    image: "/assets/ui/feature-cargo.png",
    description: "Şehir farketmeksizin tüm lojistik süreçlerinizde kargo her zaman ücretsiz!",
  },
];

export function AdvantagesRow() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close locked description
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setClickedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeId = hoveredId || clickedId;

  return (
    <section className="advantages-section shell" aria-label="Varsapp avantajları">
      <div className="feature-row" ref={containerRef}>
        {features.map(({ id, label, image, description }) => {
          const isActive = activeId === id;
          return (
            <div
              className="feature-card-wrapper"
              key={id}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                type="button"
                className={`feature-card${isActive ? " active" : ""}`}
                onClick={() => setClickedId((prev) => (prev === id ? null : id))}
                aria-expanded={isActive}
              >
                <span className="feature-visual">
                  <Image src={image} alt="" width={28} height={28} />
                </span>
                <strong>{label}</strong>
                <ChevronDown size={18} className={`arrow-icon${isActive ? " rotated" : ""}`} />
              </button>
              {isActive && (
                <div className="feature-description-bubble">
                  {description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
