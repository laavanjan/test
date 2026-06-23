import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { listAdminCategories, updateAdminCategoryOverride } from "@/lib/admin-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  return Response.json({ categories: await listAdminCategories() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const formData = await request.formData();

  await updateAdminCategoryOverride(String(formData.get("slug") || ""), {
    isActive: String(formData.get("isActive") || "true") === "true",
    name: String(formData.get("name") || ""),
    sortOrder: readNumber(formData.get("sortOrder"), 1),
  });

  return NextResponse.redirect(new URL(String(formData.get("redirectTo") || "/admin/categories"), request.url), {
    status: 303,
  });
}

function readNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}
