import {
  AuthError,
  createCustomerSession,
  loginCustomerAccount,
  publicAccount,
  setCustomerSessionCookie,
} from "@/lib/customer-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const account = await loginCustomerAccount(
      String(body.email || ""),
      String(body.password || ""),
    );
    const session = await createCustomerSession(account.id);
    await setCustomerSessionCookie(session.token, session.expiresAt);

    return Response.json({ account: publicAccount(account) });
  } catch (error) {
    if (error instanceof AuthError) {
      return Response.json(
        { code: error.code, error: error.message },
        { status: error.status },
      );
    }

    return Response.json({ error: "Giris tamamlanamadi." }, { status: 500 });
  }
}
