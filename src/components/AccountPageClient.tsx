"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  Gift,
  Link2,
  LogOut,
  Mail,
  Package,
  Send,
  ShoppingCart,
  UserCircle,
  UserPlus,
} from "lucide-react";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import {
  hydrateCartItems,
  readCartItems,
  type CartLine,
} from "@/lib/cart-storage";
import { formatDateDisplay } from "@/lib/rental-dates";
import { formatKurusAsCurrency } from "@/lib/money";
import type { CustomerAccount } from "@/lib/customer-auth";

type TabKey = "profil" | "siparisler" | "sepet" | "davet" | "cikis";

const tabs: { icon: typeof UserCircle; key: TabKey; label: string }[] = [
  { icon: UserCircle, key: "profil", label: "Profilim" },
  { icon: Package, key: "siparisler", label: "Siparişlerim" },
  { icon: ShoppingCart, key: "sepet", label: "Sepetim" },
  { icon: UserPlus, key: "davet", label: "Arkadaşını Davet Et" },
  { icon: LogOut, key: "cikis", label: "Çıkış Yap" },
];

export function AccountPageClient({
  account,
  referralCode,
}: {
  account: CustomerAccount;
  referralCode: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("profil");
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <section className="account-page shell">
      <div className="breadcrumbs">
        <Link href="/">Anasayfa</Link>
        <span>-</span>
        <strong>Hesabım</strong>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-user">
            <UserCircle size={28} />
            <strong>{account.name}</strong>
          </div>
          <nav className="account-nav">
            {tabs.map(({ icon: Icon, key, label }) => (
              <button
                key={key}
                type="button"
                className={`account-nav-item${activeTab === key ? " active" : ""}`}
                onClick={() => {
                  if (key === "cikis") {
                    handleLogout();
                    return;
                  }
                  setActiveTab(key);
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="account-content">
          {activeTab === "profil" && (
            <ProfileTab account={account} />
          )}
          {activeTab === "siparisler" && <OrdersTab />}
          {activeTab === "sepet" && <ShoppingTab />}
          {activeTab === "davet" && (
            <InviteTab accountId={account.id} referralCode={referralCode} />
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileTab({ account }: { account: CustomerAccount }) {
  const router = useRouter();

  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone === "-" ? "" : account.phone);
  const [city, setCity] = useState(account.city === "-" ? "" : account.city);
  const [saving, setSaving] = useState(false);
  const [infoMessage, setInfoMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function handleInfoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setInfoMessage(null);

    try {
      const response = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, email, name, phone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Profil güncellenemedi.");
      setInfoMessage({ text: "Profiliniz güncellendi.", type: "success" });
      router.refresh();
    } catch (error) {
      setInfoMessage({
        text: error instanceof Error ? error.message : "Profil güncellenemedi.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingPassword) return;

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: "Yeni şifreler eşleşmiyor.", type: "error" });
      return;
    }

    setSavingPassword(true);
    setPasswordMessage(null);

    try {
      const response = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Şifre değiştirilemedi.");
      setPasswordMessage({ text: "Şifreniz güncellendi.", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordMessage({
        text: error instanceof Error ? error.message : "Şifre değiştirilemedi.",
        type: "error",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="account-panel">
      <h1>Üyelik Bilgilerim</h1>

      <form className="account-form" onSubmit={handleInfoSubmit}>
        <label>
          <span>Ad Soyad</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          <span>E-posta</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          <span>Telefon</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(5XX) XXX XX XX"
          />
        </label>
        <label>
          <span>Şehir</span>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Şehir"
          />
        </label>

        {infoMessage && (
          <p className={`auth-message ${infoMessage.type}`}>{infoMessage.text}</p>
        )}

        <button className="rent-button" type="submit" disabled={saving}>
          {saving ? "Kaydediliyor..." : "Bilgileri Güncelle"}
        </button>
      </form>

      <div className="account-section-divider">
        <h2>Şifre Değiştir</h2>
      </div>

      <form className="account-form" onSubmit={handlePasswordSubmit}>
        <label>
          <span>Mevcut Şifre</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </label>
        <div />
        <label>
          <span>Yeni Şifre</span>
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={8}
          />
        </label>
        <label>
          <span>Yeni Şifre (Tekrar)</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={8}
          />
        </label>

        {passwordMessage && (
          <p className={`auth-message ${passwordMessage.type}`}>{passwordMessage.text}</p>
        )}

        <button className="rent-button" type="submit" disabled={savingPassword}>
          {savingPassword ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </form>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="account-panel">
      <h1>Siparişlerim</h1>
      <div className="account-empty">
        <Package size={36} />
        <p>Henüz bir siparişiniz bulunmuyor.</p>
        <Link className="rent-button" href="/">
          Ürünleri keşfet
        </Link>
      </div>
    </div>
  );
}

function ShoppingTab() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function refresh() {
      setLines(hydrateCartItems(readCartItems()));
      setReady(true);
    }

    const timer = window.setTimeout(refresh, 0);
    window.addEventListener("varsapp-cart-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("varsapp-cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const totalKurus = useMemo(
    () => lines.reduce((sum, line) => sum + line.subtotalKurus, 0),
    [lines],
  );

  if (ready && lines.length === 0) {
    return (
      <div className="account-panel">
        <h1>Sepetim</h1>
        <div className="account-empty">
          <ShoppingCart size={36} />
          <p>Sepetinizde ürün bulunmuyor.</p>
          <Link className="rent-button" href="/">
            Ürünleri keşfet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-panel">
      <h1>Sepetim</h1>
      <div className="account-cart-list">
        {lines.map((line) => (
          <article className="account-cart-item" key={line.productSlug}>
            <div className="account-cart-image">
              <Image src={line.product.image} alt={line.product.name} fill sizes="96px" />
            </div>
            <div className="account-cart-info">
              <h2>{line.product.name}</h2>
              <p>
                {formatDateDisplay(line.startDate)} - {formatDateDisplay(line.endDate)} ({line.days} gün)
              </p>
              <span>{formatKurusAsCurrency(line.unitPriceKurus)} / gün</span>
            </div>
            <strong className="account-cart-subtotal">
              {formatKurusAsCurrency(line.subtotalKurus)}
            </strong>
          </article>
        ))}
      </div>
      <div className="account-cart-footer">
        <div>
          <span>Genel Toplam</span>
          <strong>{formatKurusAsCurrency(totalKurus)}</strong>
        </div>
        <Link className="rent-button" href="/sepet">
          Sepete Git
        </Link>
      </div>
    </div>
  );
}

type Invitation = {
  accepted_at: string | null;
  id: string;
  invitee_email: string;
  message: string | null;
  sent_at: string;
  status: "pending" | "signed_up";
};

const MAX_MESSAGE = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function InviteTab({
  accountId,
  referralCode,
}: {
  accountId: string;
  referralCode: string;
}) {
  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/uye-ol?rmi=${referralCode}`
      : `/uye-ol?rmi=${referralCode}`;

  const [subTab, setSubTab] = useState<"list" | "send">("list");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [emailsInput, setEmailsInput] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchInvitations() {
      try {
        const response = await fetch("/api/invite/list");
        const data = await response.json();
        if (cancelled) return;
        if (!response.ok) throw new Error(data?.error || "Davetler yüklenemedi.");
        setInvitations(data.invitations ?? []);
      } catch (error) {
        if (!cancelled) {
          setListError(error instanceof Error ? error.message : "Davetler yüklenemedi.");
        }
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    }

    fetchInvitations();
    return () => { cancelled = true; };
  }, [accountId]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the input
    }
  }

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const emails = emailsInput
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => EMAIL_RE.test(e));

    if (!emails.length) {
      setSendResult({ text: "Lütfen geçerli bir e-posta adresi girin.", type: "error" });
      return;
    }

    if (emails.length > 10) {
      setSendResult({ text: "En fazla 10 e-posta adresi girebilirsiniz.", type: "error" });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const response = await fetch("/api/invite/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, message: message || null }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Davet gönderilemedi.");

      setSendResult({ text: `${data.sent} kişiye davet gönderildi.`, type: "success" });
      setEmailsInput("");
      setMessage("");

      // Refresh the list so newly sent invites appear
      const listRes = await fetch("/api/invite/list");
      const listData = await listRes.json();
      if (listRes.ok) setInvitations(listData.invitations ?? []);
    } catch (error) {
      setSendResult({
        text: error instanceof Error ? error.message : "Davet gönderilemedi.",
        type: "error",
      });
    } finally {
      setSending(false);
    }
  }

  const shareText = encodeURIComponent("Varsapp'te kiralama fırsatlarını keşfet!");
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referralLink)}`;

  const acceptedCount = invitations.filter((i) => i.status === "signed_up").length;
  const pendingCount = invitations.filter((i) => i.status === "pending").length;

  return (
    <div className="invite-root">
      {/* Hero banner */}
      <div className="inv-hero">
        <div className="inv-hero-left">
          <div className="inv-hero-badge">
            <Gift size={22} />
          </div>
          <div>
            <h1 className="inv-hero-title">Invite a Friend</h1>
            <p className="inv-hero-desc">
              Share your link  earn rewards together when friends join Varsapp.
            </p>
          </div>
        </div>
        <div className="inv-stats">
          <div className="inv-stat">
            <strong>{invitations.length}</strong>
            <span>Sent</span>
          </div>
          <div className="inv-stat-divider" />
          <div className="inv-stat">
            <strong>{acceptedCount}</strong>
            <span>Joined</span>
          </div>
          <div className="inv-stat-divider" />
          <div className="inv-stat">
            <strong>{pendingCount}</strong>
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Referral link */}
      <div className="inv-link-section">
        <p className="inv-link-label">
          <Link2 size={14} />
          Your invitation link
        </p>
        <div className="inv-link-row">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="inv-link-input"
            onFocus={(e) => e.currentTarget.select()}
          />
          <button
            type="button"
            className={`inv-copy-btn${copied ? " copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="inv-tabs">
        <button
          type="button"
          className={`inv-tab${subTab === "list" ? " active" : ""}`}
          onClick={() => setSubTab("list")}
        >
          <Mail size={15} />
          My Invitations
        </button>
        <button
          type="button"
          className={`inv-tab${subTab === "send" ? " active" : ""}`}
          onClick={() => setSubTab("send")}
        >
          <Send size={15} />
          Send Invite
        </button>
      </div>

      {/* Tab content */}
      <div className="inv-body">
        {subTab === "list" && (
          <>
            {loadingList && <p className="inv-loading">Loading…</p>}
            {listError && <p className="auth-message error">{listError}</p>}
            {!loadingList && !listError && invitations.length === 0 && (
              <div className="inv-empty">
                <UserPlus size={40} />
                <p>You haven&apos;t sent any invitations yet.</p>
                <button type="button" className="inv-cta" onClick={() => setSubTab("send")}>
                  Send your first invite
                </button>
              </div>
            )}
            {!loadingList && invitations.length > 0 && (
              <div className="inv-table-wrap">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Sent</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitations.map((inv) => (
                      <tr key={inv.id}>
                        <td>
                          <span className="inv-email-cell">
                            <Mail size={13} />
                            {inv.invitee_email}
                          </span>
                        </td>
                        <td>{new Date(inv.sent_at).toLocaleDateString("tr-TR")}</td>
                        <td>
                          <span className={`inv-badge ${inv.status}`}>
                            {inv.status === "signed_up" ? "Joined" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {subTab === "send" && (
          <div className="inv-send">
            <form className="inv-form" onSubmit={handleSend}>
              <div className="inv-field">
                <label htmlFor="inv-emails">Recipient Emails</label>
                <span className="inv-field-hint">Separate multiple addresses with commas (max 10)</span>
                <textarea
                  id="inv-emails"
                  value={emailsInput}
                  onChange={(e) => setEmailsInput(e.target.value)}
                  placeholder="friend@example.com, another@example.com"
                  rows={3}
                  required
                />
              </div>
              <div className="inv-field">
                <label htmlFor="inv-message">Personal Message <span className="inv-optional">(optional)</span></label>
                <textarea
                  id="inv-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
                  placeholder="Write a personal message to your friends…"
                  rows={4}
                />
                <span className="inv-char">{MAX_MESSAGE - message.length} chars left</span>
              </div>
              {sendResult && (
                <p className={`auth-message ${sendResult.type}`}>{sendResult.text}</p>
              )}
              <button className="inv-submit" type="submit" disabled={sending}>
                <Send size={15} />
                {sending ? "Sending…" : "Send Invite"}
              </button>
            </form>

            <div className="inv-share">
              <p className="inv-share-title">Or share on social</p>
              <div className="inv-share-btns">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inv-share-btn inv-fb"
                >
                  <FacebookIcon size={17} />
                  Facebook
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inv-share-btn inv-x"
                >
                  <XIcon size={17} />
                  X / Twitter
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
