import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getAdminOrdersPage } from "@/lib/admin-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 250;

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const page = readPositiveInt(request.nextUrl.searchParams.get("page"), 1);
  const pageSize = Math.min(
    readPositiveInt(request.nextUrl.searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  const result = await getAdminOrdersPage({ page, pageSize, query });

  return Response.json({
    orders: result.rows,
    page,
    pageSize,
    query,
    total: result.total,
  });
}

function readPositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value || "", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
