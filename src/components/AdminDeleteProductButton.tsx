"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function AdminDeleteProductButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/custom-products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <button
          className="inline-flex h-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 text-xs font-black text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          disabled={loading}
          onClick={handleDelete}
          type="button"
        >
          {loading ? "..." : "Evet, sil"}
        </button>
        <button
          className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition hover:bg-slate-50"
          onClick={() => setConfirming(false)}
          type="button"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <button
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-400 transition hover:border-red-300 hover:bg-red-100 hover:text-red-600"
      onClick={() => setConfirming(true)}
      title="Ürünü sil"
      type="button"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
