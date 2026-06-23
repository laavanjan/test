"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  mode: "login" | "register";
};

type AuthState =
  | { status: "idle" }
  | { status: "loading" }
  | { message: string; status: "error" }
  | { message: string; status: "success" };

export function AuthForm({ mode }: AuthFormProps) {
  const [state, setState] = useState<AuthState>({ status: "idle" });
  const router = useRouter();
  const isRegister = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setState({ status: "loading" });

    const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
      body: JSON.stringify(
        isRegister
          ? {
              email: formData.get("email"),
              firstName: formData.get("firstName"),
              lastName: formData.get("lastName"),
              password: formData.get("password"),
              phone: formData.get("phone"),
            }
          : {
              email: formData.get("email"),
              password: formData.get("password"),
            },
      ),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await response.json();

    if (!response.ok) {
      setState({
        message:
          result.code === "password_required"
            ? "Bu e-posta sistemde mevcut. Güvenlik için Üye Ol ekranından kendine şifre belirleyebilirsin."
            : result.error || "İşlem tamamlanamadı.",
        status: "error",
      });
      return;
    }

    setState({
      message: isRegister ? "Hesabın hazırlandı." : "Giriş başarılı.",
      status: "success",
    });
    router.refresh();
    router.push("/");
  }

  return (
    <form onSubmit={submit}>
      {isRegister ? (
        <div className="two-cols">
          <label>
            Ad
            <input name="firstName" placeholder="Adınız" required />
          </label>
          <label>
            Soyad
            <input name="lastName" placeholder="Soyadınız" required />
          </label>
        </div>
      ) : null}
      <label>
        E-posta
        <input name="email" type="email" placeholder="ornek@mail.com" required />
      </label>
      {isRegister ? (
        <label>
          Cep Telefonu
          <input name="phone" placeholder="05xx xxx xx xx" required />
        </label>
      ) : null}
      <label>
        Şifre
        <input
          minLength={8}
          name="password"
          placeholder="En az 8 karakter"
          required
          type="password"
        />
      </label>
      {isRegister ? (
        <label className="check-label">
          <input name="marketing" type="checkbox" /> Kampanya ve bilgilendirmeleri almak istiyorum.
        </label>
      ) : (
        <div className="auth-row">
          <label className="check-label">
            <input type="checkbox" /> Beni Hatırla
          </label>
          <span>Şifremi Unuttum</span>
        </div>
      )}
      <button disabled={state.status === "loading"} type="submit">
        {state.status === "loading" ? "İşleniyor..." : isRegister ? "Üye Ol" : "Giriş Yap"}
      </button>
      {state.status === "error" || state.status === "success" ? (
        <p className={`auth-message ${state.status}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
