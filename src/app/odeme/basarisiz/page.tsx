import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ oid?: string }>;
}) {
  const { oid } = await searchParams;

  return (
    <PageShell>
      <section className="payment-result shell failed">
        <p>Ödeme tamamlanamadı</p>
        <h1>PayTR işlemi başarısız oldu.</h1>
        <span>Sepete dönerek bilgileri kontrol edebilir ve tekrar deneyebilirsin.</span>
        {oid ? (
          <span>
            Sipariş No: <strong>{oid}</strong>
          </span>
        ) : null}
        <Link href="/sepet">Sepete dön</Link>
      </section>
    </PageShell>
  );
}
