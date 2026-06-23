import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PageShell } from "@/components/PageShell";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <PageShell>
      <section className="auth-page shell">
        <div className="auth-card">
          <p>Merhaba,</p>
          <h1>Varsapp&apos;e giriş yap fırsatları kaçırma!</h1>
          <AuthForm mode="login" />
        </div>
        <div className="auth-side">
          <h2>Henüz üye değil misiniz?</h2>
          <p>Kolayca üye olabilir, kiralama takibini tek panelden yapabilirsiniz.</p>
          <Link href="/uye-ol">Hemen Üye Ol</Link>
        </div>
      </section>
    </PageShell>
  );
}
