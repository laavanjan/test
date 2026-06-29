"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, X } from "lucide-react";
import { categories } from "@/data/products";

type FormState = {
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  oldPrice: string;
  minDays: string;
  image: string;
  owner: string;
  location: string;
  description: string;
  badge: string;
  featured: boolean;
};

const EMPTY: FormState = {
  name: "",
  category: "",
  categorySlug: "",
  price: "",
  oldPrice: "",
  minDays: "3",
  image: "",
  owner: "Varsapp",
  location: "81 İl ve Tüm İlçelerinde!",
  description: "",
  badge: "",
  featured: false,
};

export function AdminProductCreateDrawer() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleCategoryChange(slug: string) {
    const cat = categories.find((c) => c.slug === slug);
    setForm((f) => ({ ...f, categorySlug: slug, category: cat?.name ?? "" }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleClose() {
    setOpen(false);
    setError(null);
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/custom-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          categorySlug: form.categorySlug,
          price: form.price.trim(),
          oldPrice: form.oldPrice.trim() || undefined,
          minDays: Number(form.minDays) || 3,
          image: form.image.trim(),
          owner: form.owner.trim(),
          location: form.location.trim(),
          description: form.description.trim(),
          badge: form.badge.trim() || undefined,
          featured: form.featured,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Bir hata oluştu.");
      } else {
        setSuccess(true);
        setForm(EMPTY);
        setTimeout(() => {
          setSuccess(false);
          setOpen(false);
          router.refresh();
        }, 1500);
      }
    } catch {
      setError("Sunucu bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-500 px-4 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="text-base leading-none">+</span> Yeni Ürün
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            aria-label="Kapat"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={handleClose}
            type="button"
          />

          {/* Modal */}
          <div className="relative z-10 flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl" style={{ maxHeight: "90vh" }}>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Yeni Ürün Ekle</h2>
                <p className="text-xs font-semibold text-slate-400">Tüm zorunlu alanları doldurun</p>
              </div>
              <button
                className="ml-auto grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                onClick={handleClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form className="flex flex-col overflow-hidden" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">

                {/* Product name - full width */}
                <Field label="Ürün Adı" required>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="ör: Arzum AR6001 Steamforce Buhar İstasyonlu Ütü"
                    className={inputCls}
                  />
                </Field>

                {/* Category + Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Kategori" required>
                    <select
                      name="categorySlug"
                      value={form.categorySlug}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      required
                      className={inputCls}
                    >
                      <option value="">Seçin...</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Rozet" hint="opsiyonel">
                    <input
                      name="badge"
                      value={form.badge}
                      onChange={handleChange}
                      placeholder="ör: Yeni, Çok Satan"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Price + Old price + Min days */}
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Günlük Fiyat" required hint="ör: 420,00 TL">
                    <input name="price" value={form.price} onChange={handleChange} required placeholder="420,00 TL" className={inputCls} />
                  </Field>
                  <Field label="Eski Fiyat" hint="opsiyonel">
                    <input name="oldPrice" value={form.oldPrice} onChange={handleChange} placeholder="600,00 TL" className={inputCls} />
                  </Field>
                  <Field label="Min. Gün" required>
                    <input name="minDays" type="number" min="3" max="365" value={form.minDays} onChange={handleChange} required className={inputCls} />
                  </Field>
                </div>

                {/* Image URL */}
                <Field label="Görsel URL" required>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                    placeholder="https://www.varsapp.com/idea/iq/19/myassets/..."
                    className={inputCls}
                  />
                </Field>

                {/* Owner + Location */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Satıcı" required>
                    <input name="owner" value={form.owner} onChange={handleChange} required className={inputCls} />
                  </Field>
                  <Field label="Konum" required>
                    <input name="location" value={form.location} onChange={handleChange} required className={inputCls} />
                  </Field>
                </div>

                {/* Description */}
                <Field label="Ürün Açıklaması" hint="her satır ayrı paragraf olur">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Ürün hakkında açıklama yazın..."
                    className={inputCls + " h-auto resize-none py-3"}
                  />
                </Field>

                {/* Featured checkbox */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-rose-200 hover:bg-rose-50">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded accent-rose-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">En Çok Kiralanan</p>
                    <p className="text-xs text-slate-400">Ana sayfada öne çıkar</p>
                  </div>
                </label>

                {error ? (
                  <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
                    <span className="text-lg">⚠️</span>
                    <p className="text-sm font-semibold text-red-600">{error}</p>
                  </div>
                ) : null}

                {success ? (
                  <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
                    <span className="text-lg">✅</span>
                    <p className="text-sm font-semibold text-green-700">Ürün başarıyla eklendi! Yönlendiriliyorsunuz...</p>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 border-t border-slate-100 px-6 py-4">
                <button
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
                  onClick={handleClose}
                  type="button"
                >
                  İptal
                </button>
                <button
                  className="h-11 flex-1 rounded-xl bg-rose-500 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600 disabled:opacity-50"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Kaydediliyor..." : "Ürünü Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</span>
        {required ? <span className="text-xs font-black text-rose-500">*</span> : null}
        {hint ? <span className="text-xs font-semibold text-slate-400">— {hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

const inputCls = "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-50";
