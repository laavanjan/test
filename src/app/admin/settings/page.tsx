import { headers } from "next/headers";
import { Settings } from "lucide-react";
import { AdminLocked } from "@/components/AdminLocked";
import { AdminShell } from "@/components/AdminShell";
import { isAdminAuthConfigured, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getAdminCatalogSettings } from "@/lib/admin-catalog";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const authorized = isAdminRequestAuthorized(await headers());

  if (!authorized) {
    return <AdminLocked />;
  }

  const settings = await getAdminCatalogSettings();

  return (
    <AdminShell authConfigured={isAdminAuthConfigured()}>
      <main className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-4 py-6 pt-16 md:px-8 md:pt-8">
        <header className="border-b border-slate-100 pb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-500">Sistem</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">Katalog ayarları</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Admin katalog davranışını ve varsayılan kiralama kurallarını yönet.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
              <Settings className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Genel</p>
              <h2 className="text-lg font-black text-slate-900">Kiralama ve vitrin modu</h2>
            </div>
          </div>

          <form action="/api/admin/catalog/settings" className="grid gap-5" method="post">
            <input name="redirectTo" type="hidden" value="/admin/settings" />
            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                Varsayılan min gün
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:bg-white"
                  defaultValue={settings.defaultMinDays}
                  min="1"
                  name="defaultMinDays"
                  type="number"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                Ücretsiz kargo
                <select className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={settings.freeCargo ? "true" : "false"} name="freeCargo">
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
              </label>
              <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
                Edit modu
                <select className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold normal-case tracking-normal text-slate-700 outline-none focus:bg-white" defaultValue={settings.storeEditMode} name="storeEditMode">
                  <option value="preview">Preview</option>
                  <option value="live">Canlı</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide text-slate-400">
              Admin notları
              <textarea
                className="min-h-36 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold normal-case tracking-normal text-slate-800 outline-none focus:bg-white"
                defaultValue={settings.adminNotes}
                name="adminNotes"
                placeholder="Operasyon ekibi için katalog notları"
              />
            </label>
            <button className="inline-flex h-11 w-fit items-center justify-center rounded-xl bg-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600" type="submit">
              Ayarları kaydet
            </button>
          </form>
        </section>
      </main>
    </AdminShell>
  );
}
