import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PressCard } from "@/components/PressCard";
import { pressArticles } from "@/data/press-articles";

export const dynamic = "force-dynamic";

export default function BasindaBizPage() {
  return (
    <PageShell>
      <section className="static-page shell basinda-biz-page">
        <div className="breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <Link href="/sayfa">Sayfalar</Link>
          <span>-</span>
          <strong>Basında Biz</strong>
        </div>

        <div className="press-hero">
          <h1>Basında Biz</h1>
          <p>Varsapp hakkında basında çıkan haberleri ve yazıları burada bulabilirsiniz</p>
        </div>

        <div className="press-grid">
          {pressArticles.map((article) => (
            <PressCard key={article.id} article={article} />
          ))}
        </div>

        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
          <a href="/sayfa" className="tum-sayfalar-btn">
            Tüm Sayfalar
          </a>
        </div>
      </section>
    </PageShell>
  );
}
