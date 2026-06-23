import { clearAdminSessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return redirectTo(request, "/admin");
}

export async function POST(request: Request) {
  return redirectTo(request, "/admin");
}

function redirectTo(request: Request, pathname: string) {
  return new Response(null, {
    headers: {
      Location: new URL(pathname, request.url).toString(),
      "Set-Cookie": clearAdminSessionCookie(),
    },
    status: 303,
  });
}
