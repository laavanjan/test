"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchProducts } from "@/data/products";

export function SearchBox() {
  const router = useRouter();
  const rootRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results[0]) {
      router.push(`/urun/${results[0].slug}`);
      setOpen(false);
    }
  }

  return (
    <form
      className={`search-box${open && query ? " open" : ""}`}
      onSubmit={handleSubmit}
      ref={rootRef}
    >
      <input
        aria-label="Ürün ara"
        placeholder="Hangi ürünü arıyorsun?"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      <button aria-label="Ara" type="submit">
        <Search size={26} strokeWidth={1.8} />
      </button>
      {open && query.trim() ? (
        <div className="search-suggestions" role="listbox" aria-label="Arama önerileri">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                href={`/urun/${product.slug}`}
                key={product.slug}
                onClick={() => setOpen(false)}
                role="option"
              >
                <span className="search-suggestion-image">
                  <Image src={product.image} alt="" width={44} height={44} />
                </span>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </span>
              </Link>
            ))
          ) : (
            <p className="search-empty">Eşleşen ürün bulunamadı.</p>
          )}
        </div>
      ) : null}
    </form>
  );
}
