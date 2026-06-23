import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import {
  getAdminCatalogSettings,
  updateAdminCatalogSettings,
  type AdminCatalogSettings,
} from "@/lib/admin-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  return Response.json({ settings: await getAdminCatalogSettings() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const formData = await request.formData();

  await updateAdminCatalogSettings({
    adminNotes: String(formData.get("adminNotes") || ""),
    defaultMinDays: readNumber(formData.get("defaultMinDays"), 3),
    freeCargo: String(formData.get("freeCargo") || "false") === "true",
    storeEditMode: readMode(formData.get("storeEditMode")),
  });

  return NextResponse.redirect(new URL(String(formData.get("redirectTo") || "/admin/settings"), request.url), {
    status: 303,
  });
}

function readMode(value: FormDataEntryValue | null): AdminCatalogSettings["storeEditMode"] {
  return String(value || "") === "live" ? "live" : "preview";
}

function readNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}
