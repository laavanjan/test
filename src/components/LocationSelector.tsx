"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LocateFixed } from "lucide-react";

const CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Gaziantep",
  "Kocaeli",
  "Mersin",
];

const STORAGE_KEY = "varsapp-city";

export function LocationSelector() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [city, setCity] = useState("İstanbul");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedCity = window.localStorage.getItem(STORAGE_KEY);

      if (storedCity) {
        setCity(storedCity);
      }
    }, 0);

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function selectCity(nextCity: string) {
    setCity(nextCity);
    window.localStorage.setItem(STORAGE_KEY, nextCity);
    setOpen(false);
  }

  return (
    <div className={`location-selector${open ? " open" : ""}`} ref={rootRef}>
      <button className="location-button" type="button" onClick={() => setOpen((value) => !value)}>
        <LocateFixed size={20} />
        <span>{city}</span>
        <ChevronDown size={16} />
      </button>
      {open ? (
        <div className="location-menu" role="listbox" aria-label="Şehir seç">
          {CITIES.map((item) => (
            <button
              key={item}
              type="button"
              className={item === city ? "active" : undefined}
              onClick={() => selectCity(item)}
              role="option"
              aria-selected={item === city}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
