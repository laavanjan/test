import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { AccountPageClient } from "@/components/AccountPageClient";
import { getCurrentCustomerAccount } from "@/lib/customer-auth";
import { getReferralCode } from "@/lib/customer-invitations";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const account = await getCurrentCustomerAccount();

  if (!account) {
    redirect("/giris-yap");
  }

  const referralCode = getReferralCode(account.id);

  return (
    <PageShell>
      <AccountPageClient account={account} referralCode={referralCode} />
    </PageShell>
  );
}
