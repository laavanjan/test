"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "", label: "Önerilen sıralama" },
  { value: "en-dusuk-fiyat", label: "En düşük fiyat" },
  { value: "en-yuksek-fiyat", label: "En yüksek fiyat" },
  { value: "yeni-eklenenler", label: "Yeni eklenenler" },
  { value: "a-dan-z-ye", label: "A'dan Z'ye" },
  { value: "z-den-a-ya", label: "Z'den A'ya" },
] as const;

export function SortDropdown({ current, tarih }: { current: string; tarih?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === current)?.label ?? "Önerilen sıralama";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(value: string) {
    const params = new URLSearchParams();
    if (tarih) params.set("tarih", tarih);
    if (value) params.set("sirala", value);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    setOpen(false);
  }

  return (
    <div className="sort-dropdown" ref={ref}>
      <button
        type="button"
        className="sort-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {currentLabel} <ChevronDown size={18} />
      </button>
      {open && (
        <div className="sort-menu" role="listbox">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={current === option.value}
              className={`sort-option${current === option.value ? " active" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
