"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Loader2, PackageCheck, UsersRound } from "lucide-react";
import type { AdminImportKind } from "@/lib/admin-store";

type ImportState =
  | { status: "idle" }
  | { status: "loading" }
  | { message: string; status: "error" }
  | { imported: number; kind: AdminImportKind; status: "success"; total: number };

export function AdminImportPanel() {
  const [kind, setKind] = useState<AdminImportKind>("orders");
  const [state, setState] = useState<ImportState>({ status: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function submitImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileRef.current?.files?.[0];

    if (!file) {
      setState({ message: "Bir CSV veya JSON dosyasi sec.", status: "error" });
      return;
    }

    setState({ status: "loading" });

    const formData = new FormData();
    formData.set("kind", kind);
    formData.set("file", file);

    const response = await fetch("/api/admin/import", {
      body: formData,
      method: "POST",
    });
    const payload = await response.json();

    if (!response.ok) {
      setState({
        message: payload.error || "Import tamamlanamadi.",
        status: "error",
      });
      return;
    }

    setState({
      imported: payload.imported,
      kind: payload.kind,
      status: "success",
      total: payload.total,
    });
    router.refresh();
  }

  return (
    <section
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
      id="import"
    >
      <div className="mb-5 flex flex-col gap-1">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">IdeaSoft import</p>
        <h2 className="text-lg font-black tracking-tight text-slate-900">CSV veya JSON aktar</h2>
      </div>

      <form className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center" onSubmit={submitImport}>
        <div className="inline-grid h-10 grid-cols-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Import tipi">
          <button
            className={[
              "inline-flex items-center justify-center gap-2 rounded-lg px-3 text-sm font-black transition",
              kind === "orders" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-900",
            ].join(" ")}
            onClick={() => setKind("orders")}
            type="button"
          >
            <PackageCheck size={17} />
            Siparisler
          </button>
          <button
            className={[
              "inline-flex items-center justify-center gap-2 rounded-lg px-3 text-sm font-black transition",
              kind === "users" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-900",
            ].join(" ")}
            onClick={() => setKind("users")}
            type="button"
          >
            <UsersRound size={17} />
            Kullanicilar
          </button>
        </div>

        <label className="grid min-h-11 cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm font-bold text-slate-500 transition hover:border-slate-400 hover:bg-white">
          <FileUp className="h-4 w-4 text-slate-400" />
          <input
            accept=".csv,.json,text/csv,application/json"
            className="min-w-0 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-black file:text-slate-700"
            ref={fileRef}
            type="file"
          />
          <span className="hidden whitespace-nowrap text-xs font-black uppercase tracking-wide text-slate-400 sm:inline">
            Dosya sec
          </span>
        </label>

        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-rose-100 transition hover:bg-rose-600 disabled:cursor-wait disabled:opacity-70"
          disabled={state.status === "loading"}
          type="submit"
        >
          {state.status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
          Import et
        </button>
      </form>

      {state.status === "success" ? (
        <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {state.imported} kayit alindi. Toplam {state.total} {state.kind === "orders" ? "siparis" : "kullanici"}.
        </p>
      ) : null}
      {state.status === "error" ? (
        <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{state.message}</p>
      ) : null}
    </section>
  );
}
