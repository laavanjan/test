import {
  AuthError,
  createCustomerSession,
  publicAccount,
  registerCustomerAccount,
  setCustomerSessionCookie,
} from "@/lib/customer-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const account = await registerCustomerAccount({
      city: String(body.city || "-"),
      email: String(body.email || ""),
      name: `${String(body.firstName || "").trim()} ${String(body.lastName || "").trim()}`
        .trim()
        || String(body.name || "Isimsiz Musteri"),
      password: String(body.password || ""),
      phone: String(body.phone || "-"),
    });
    const session = await createCustomerSession(account.id);
    await setCustomerSessionCookie(session.token, session.expiresAt);

    return Response.json({ account: publicAccount(account) });
  } catch (error) {
    return authErrorResponse(error);
  }
}

function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return Response.json(
      { code: error.code, error: error.message },
      { status: error.status },
    );
  }

  return Response.json({ error: "Hesap islemi tamamlanamadi." }, { status: 500 });
}
