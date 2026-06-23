"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, LocateFixed } from "lucide-react";

const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman",
  "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne",
  "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
  "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir",
  "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri",
  "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya",
  "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun",
  "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
];

const STORAGE_KEY = "varsapp-city";

export function LocationSelector() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [city, setCity] = useState("İstanbul");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("tr-TR");

    if (!query) {
      return CITIES;
    }

    return CITIES.filter((item) =>
      item.toLocaleLowerCase("tr-TR").includes(query),
    );
  }, [search]);

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
    setSearch("");
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
          <input
            className="location-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Şehir ara..."
            aria-label="Şehir ara"
            autoFocus
          />
          <div className="location-options">
            {filteredCities.map((item) => (
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
            {filteredCities.length === 0 ? (
              <p className="location-empty">Şehir bulunamadı</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
