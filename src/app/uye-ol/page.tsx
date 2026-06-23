import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PageShell } from "@/components/PageShell";

export default function RegisterPage() {
  return (
    <PageShell>
      <section className="auth-page shell">
        <div className="auth-card wide">
          <p>Yeni Üyelik</p>
          <h1>Varsapp hesabını oluştur</h1>
          <AuthForm mode="register" />
        </div>
        <div className="auth-side">
          <h2>Zaten üye misiniz?</h2>
          <p>Hesabınıza giriş yaparak siparişlerinizi görüntüleyebilirsiniz.</p>
          <Link href="/giris-yap">Giriş Yap</Link>
        </div>
      </section>
    </PageShell>
  );
}
