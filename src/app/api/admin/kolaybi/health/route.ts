import { headers } from "next/headers";
import { adminUnauthorizedResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { checkKolayBiConnection, KolayBiError } from "@/lib/kolaybi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  try {
    const result = await checkKolayBiConnection();

    return Response.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    if (error instanceof KolayBiError) {
      return Response.json(
        {
          details: error.details,
          error: error.message,
          ok: false,
          status: error.status,
        },
        { status: 502 },
      );
    }

    return Response.json(
      {
        error: error instanceof Error ? error.message : "KolayBi connection failed.",
        ok: false,
      },
      { status: 500 },
    );
  }
}
