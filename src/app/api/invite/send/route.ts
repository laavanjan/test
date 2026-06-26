import { getCurrentCustomerAccount } from "@/lib/customer-auth";
import { recordInvitations } from "@/lib/customer-invitations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAILS = 10;
const MAX_MESSAGE_LENGTH = 1000;

export async function POST(request: Request) {
  const account = await getCurrentCustomerAccount();

  if (!account) {
    return Response.json({ error: "Oturum bulunamadı." }, { status: 401 });
  }

  let body: { emails?: unknown; message?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const rawEmails = Array.isArray(body.emails) ? body.emails : [];
  const emails = rawEmails
    .map((e) => String(e).trim().toLowerCase())
    .filter((e) => EMAIL_RE.test(e));

  if (!emails.length) {
    return Response.json({ error: "Geçerli e-posta adresi giriniz." }, { status: 400 });
  }

  if (emails.length > MAX_EMAILS) {
    return Response.json(
      { error: `En fazla ${MAX_EMAILS} e-posta adresi girebilirsiniz.` },
      { status: 400 },
    );
  }

  const message =
    typeof body.message === "string"
      ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) || null
      : null;

  try {
    await recordInvitations(account.id, emails, message);
  } catch (error) {
    console.error("Invitation record error:", error);
    return Response.json({ error: "Davet kaydedilemedi." }, { status: 500 });
  }

  // TODO: Send invitation emails via your email provider (Resend, SendGrid, etc.)
  // Example payload available: { emails, inviterName: account.name, message, referralLink }

  return Response.json({ ok: true, sent: emails.length });
}
