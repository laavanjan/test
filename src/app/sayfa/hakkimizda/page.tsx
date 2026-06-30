import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PressCard } from "@/components/PressCard";
import { pressArticles } from "@/data/press-articles";
import { hakkimzdaQuotes } from "@/data/hakkimizda-quotes";

export const dynamic = "force-dynamic";

export default function HakkimzdaPage() {
  return (
    <PageShell>
      <section className="static-page shell hakkimizda-page">
        <div className="breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <Link href="/sayfa">Sayfalar</Link>
          <span>-</span>
          <strong>Hakkımızda</strong>
        </div>

        <h1 className="hakkimizda-title">Hakkımızda</h1>

        <div className="hakkimizda-hero">
          <Image
            src="/assets/ui/hakkimizda.png"
            alt="Hakkımızda"
            width={1200}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>

        <div className="hakkimizda-quotes">
          {hakkimzdaQuotes.map((quote) => (
            <div key={quote.id} className="hakkimizda-quote-card">
              <h3>{quote.title}</h3>
              <p>{quote.description}</p>
            </div>
          ))}
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
