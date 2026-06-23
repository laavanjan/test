import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  return (
    <PageShell>
      <FavoritesPageClient />
    </PageShell>
  );
}
