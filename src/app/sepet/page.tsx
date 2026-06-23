import { PageShell } from "@/components/PageShell";
import { CartPageClient } from "@/components/CartPageClient";

export const dynamic = "force-dynamic";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;

  return (
    <PageShell>
      <CartPageClient initialProductSlug={productSlug} />
    </PageShell>
  );
}
