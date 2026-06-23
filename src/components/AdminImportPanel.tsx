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
    <section className="admin-import-panel">
      <div>
        <p>IdeaSoft import</p>
        <h2>CSV veya JSON aktar</h2>
      </div>

      <form onSubmit={submitImport}>
        <div className="admin-segmented" aria-label="Import tipi">
          <button
            className={kind === "orders" ? "active" : ""}
            onClick={() => setKind("orders")}
            type="button"
          >
            <PackageCheck size={17} />
            Siparisler
          </button>
          <button
            className={kind === "users" ? "active" : ""}
            onClick={() => setKind("users")}
            type="button"
          >
            <UsersRound size={17} />
            Kullanicilar
          </button>
        </div>

        <label className="admin-file-input">
          <FileUp size={18} />
          <input accept=".csv,.json,text/csv,application/json" ref={fileRef} type="file" />
          <span>Dosya sec</span>
        </label>

        <button className="admin-action-button" disabled={state.status === "loading"} type="submit">
          {state.status === "loading" ? <Loader2 size={17} /> : <FileUp size={17} />}
          Import et
        </button>
      </form>

      {state.status === "success" ? (
        <p className="admin-import-result">
          {state.imported} kayit alindi. Toplam {state.total} {state.kind === "orders" ? "siparis" : "kullanici"}.
        </p>
      ) : null}
      {state.status === "error" ? (
        <p className="admin-import-result error">{state.message}</p>
      ) : null}
    </section>
  );
}
