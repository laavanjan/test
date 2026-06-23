import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getAdminCatalogProducts, updateAdminProductOverride } from "@/lib/admin-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const params = request.nextUrl.searchParams;
  const page = readPositiveInt(params.get("page"), 1);
  const pageSize = Math.min(readPositiveInt(params.get("pageSize"), 24), 100);
  const result = await getAdminCatalogProducts({
    categorySlug: params.get("category") || "",
    page,
    pageSize,
    query: params.get("q") || "",
    status: params.get("status") || "",
  });

  return Response.json(result);
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");

  await updateAdminProductOverride(slug, {
    adminNote: String(formData.get("adminNote") || ""),
    badge: optionalString(formData.get("badge")),
    discountPercent: readNumber(formData.get("discountPercent"), 0),
    discountPrice: String(formData.get("discountPrice") || ""),
    isActive: String(formData.get("isActive") || "true") === "true",
    minDays: readNumber(formData.get("minDays"), 3),
    name: optionalString(formData.get("name")),
    oldPrice: optionalString(formData.get("oldPrice")),
    price: optionalString(formData.get("price")),
    stock: readNumber(formData.get("stock"), 1),
  });

  return redirectBack(request, formData, "/admin/products");
}

function redirectBack(request: NextRequest, formData: FormData, fallback: string) {
  const redirectTo = String(formData.get("redirectTo") || fallback);
  return NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 });
}

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || undefined;
}

function readNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readPositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
