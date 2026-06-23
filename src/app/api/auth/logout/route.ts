import { clearCustomerSession } from "@/lib/customer-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearCustomerSession();

  return Response.json({ ok: true });
}
