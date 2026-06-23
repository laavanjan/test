import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getRentalOrder } from "@/lib/rental-orders";
import { getSupabaseRentalOrder } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ oid?: string }>;
}) {
  const { oid } = await searchParams;
  const order = oid ? getRentalOrder(oid) || (await getSupabaseRentalOrder(oid)) : null;

  return (
    <PageShell>
      <section className="payment-result shell">
        <p>Ödeme yönlendirmesi tamamlandı</p>
        <h1>Sipariş ödeme kontrolüne alındı.</h1>
        <span>
          Siparişin kesin durumu PayTR callback bildirimi doğrulandıktan sonra
          güncellenir.
        </span>
        {oid ? (
          <span>
            Sipariş No: <strong>{oid}</strong>
          </span>
        ) : null}
        {order ? <span>Mevcut durum: {formatStatus(order.status)}</span> : null}
        <Link href="/">Ana sayfaya dön</Link>
      </section>
    </PageShell>
  );
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    paid_pending_owner_approval: "Ödeme alındı, ürün sahibi onayı bekleniyor",
    payment_failed: "Ödeme başarısız",
    payment_pending: "PayTR callback bekleniyor",
  };

  return labels[status] || status;
}
