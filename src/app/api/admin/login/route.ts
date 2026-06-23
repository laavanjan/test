import {
  createAdminSessionCookie,
  isAdminCredentialValid,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!isAdminCredentialValid(username, password)) {
    return redirectTo(request, "/admin?auth=failed");
  }

  return redirectTo(request, "/admin", createAdminSessionCookie(username));
}

function redirectTo(request: Request, pathname: string, cookie?: string) {
  const headers = new Headers({
    Location: new URL(pathname, request.url).toString(),
  });

  if (cookie) {
    headers.set("Set-Cookie", cookie);
  }

  return new Response(null, {
    headers,
    status: 303,
  });
}
