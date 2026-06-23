import { headers } from "next/headers";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { importAdminRecords, type AdminImportKind } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!isAdminRequestAuthorized(await headers())) {
      return adminUnauthorizedResponse();
    }

    const formData = await request.formData();
    const kind = String(formData.get("kind") ?? "");
    const file = formData.get("file");

    if (kind !== "users" && kind !== "orders") {
      return Response.json({ error: "Import tipi users veya orders olmali." }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "Import dosyasi bulunamadi." }, { status: 400 });
    }

    const result = await importAdminRecords({
      fileName: file.name,
      kind: kind as AdminImportKind,
      text: await file.text(),
    });

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Import sirasinda beklenmeyen hata olustu.",
      },
      { status: 500 },
    );
  }
}
