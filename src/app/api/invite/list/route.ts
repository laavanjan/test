import { getCurrentCustomerAccount } from "@/lib/customer-auth";
import { listInvitationsByInviter } from "@/lib/customer-invitations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const account = await getCurrentCustomerAccount();

  if (!account) {
    return Response.json({ error: "Oturum bulunamadı." }, { status: 401 });
  }

  try {
    const invitations = await listInvitationsByInviter(account.id);
    return Response.json({ invitations });
  } catch (error) {
    console.error("Invitation list error:", error);
    return Response.json({ error: "Davetler yüklenemedi." }, { status: 500 });
  }
}
