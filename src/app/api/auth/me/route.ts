import { getCurrentCustomerAccount } from "@/lib/customer-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    account: await getCurrentCustomerAccount(),
  });
}
