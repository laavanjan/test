import "server-only";

import {
  supabasePatch,
  supabaseSelect,
  supabaseUpsert,
} from "@/lib/supabase-admin";

export type InvitationStatus = "pending" | "signed_up";

export type CustomerInvitation = {
  accepted_at: string | null;
  id: string;
  invitee_email: string;
  inviter_id: string;
  message: string | null;
  sent_at: string;
  status: InvitationStatus;
};

export function getReferralCode(accountId: string): string {
  return accountId.replace(/-/g, "");
}

export async function listInvitationsByInviter(inviterId: string): Promise<CustomerInvitation[]> {
  const rows = await supabaseSelect<CustomerInvitation[]>(
    `customer_invitations?select=*&inviter_id=eq.${encodeURIComponent(inviterId)}&order=sent_at.desc`,
  );
  return rows ?? [];
}

export async function recordInvitations(
  inviterId: string,
  emails: string[],
  message: string | null,
): Promise<void> {
  if (!emails.length) {
    return;
  }

  const now = new Date().toISOString();

  await supabaseUpsert(
    "customer_invitations",
    emails.map((email) => ({
      invitee_email: email,
      inviter_id: inviterId,
      message: message || null,
      sent_at: now,
      status: "pending",
    })),
    "inviter_id,invitee_email",
  );
}

export async function markInvitationAccepted(inviteeEmail: string): Promise<void> {
  const normalized = inviteeEmail.trim().toLowerCase();

  await supabasePatch(
    `customer_invitations?invitee_email=eq.${encodeURIComponent(normalized)}&status=eq.pending`,
    {
      accepted_at: new Date().toISOString(),
      status: "signed_up",
    },
  );
}
