"use client";

import { useState } from "react";
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
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="advantages-section shell" aria-label="Varsapp avantajları">
      <div className="feature-row">
        {features.map(({ id, label, image, description }) => {
          const isActive = activeId === id;
          const descriptionId = `advantage-description-${id}`;

          return (
            <div className="feature-card-wrapper" key={id}>
              <button
                type="button"
                className={`feature-card${isActive ? " active" : ""}`}
                onClick={() => setActiveId((prev) => (prev === id ? null : id))}
                aria-expanded={isActive}
                aria-controls={descriptionId}
              >
                <span className="feature-visual">
                  <Image src={image} alt="" width={28} height={28} />
                </span>
                <span className="feature-copy">
                  <strong className="feature-title">{label}</strong>
                  <span className="feature-description-inline" id={descriptionId}>
                    {description}
                  </span>
                </span>
                <ChevronDown size={18} className={`arrow-icon${isActive ? " rotated" : ""}`} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
