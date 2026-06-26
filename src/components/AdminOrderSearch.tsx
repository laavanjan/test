"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export function AdminOrderSearch({ query }: { query: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim() || "";
    const url = q ? `/admin?q=${encodeURIComponent(q)}` : "/admin";
    router.push(url, { scroll: false });
  }

  return (
    <form className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
        <label className="relative block min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
            defaultValue={query}
            name="q"
            placeholder="Sipariş no, müşteri, e-posta, telefon veya ürün ara"
            ref={inputRef}
          />
        </label>
        <button
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
          type="submit"
        >
          Ara
        </button>
        {query ? (
          <Link
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50"
            href="/admin"
            onClick={(e) => { e.preventDefault(); router.push("/admin", { scroll: false }); }}
          >
            Temizle
          </Link>
        ) : null}
      </div>
    </form>
  );
}
