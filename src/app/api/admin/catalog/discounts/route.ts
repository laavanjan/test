import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import {
  deleteAdminDiscount,
  listAdminDiscounts,
  upsertAdminDiscount,
  type AdminDiscount,
} from "@/lib/admin-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  return Response.json({ discounts: await listAdminDiscounts() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const formData = await request.formData();
  const action = String(formData.get("action") || "save");

  if (action === "delete") {
    await deleteAdminDiscount(String(formData.get("id") || ""));
  } else {
    await upsertAdminDiscount({
      endsAt: String(formData.get("endsAt") || ""),
      id: optionalString(formData.get("id")),
      isActive: String(formData.get("isActive") || "true") === "true",
      name: String(formData.get("name") || ""),
      startsAt: String(formData.get("startsAt") || ""),
      target: readEnum<AdminDiscount["target"]>(formData.get("target"), ["all", "category", "product"], "all"),
      targetValue: String(formData.get("targetValue") || ""),
      type: readEnum<AdminDiscount["type"]>(formData.get("type"), ["fixed", "percentage"], "percentage"),
      value: readNumber(formData.get("value"), 0),
    });
  }

  return NextResponse.redirect(new URL(String(formData.get("redirectTo") || "/admin/discounts"), request.url), {
    status: 303,
  });
}

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || undefined;
}

function readNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number.parseFloat(String(value || "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readEnum<T extends string>(value: FormDataEntryValue | null, allowed: T[], fallback: T) {
  const text = String(value || "") as T;
  return allowed.includes(text) ? text : fallback;
}
