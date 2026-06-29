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

const TR_CITIES = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin",
  "Aydın","Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale",
  "Çankırı","Çorum","Denizli","Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum",
  "Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Isparta","Mersin",
  "İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli",
  "Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş",
  "Nevşehir","Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas",
  "Tekirdağ","Tokat","Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak",
  "Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan",
  "Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce",
];

const REFERRAL_OPTIONS = [
  { label: "Select", value: "" },
  { label: "Social Media", value: "social_media" },
  { label: "Friend Recommendation", value: "friend" },
  { label: "Google / Search Engine", value: "google" },
  { label: "TV / Radio", value: "tv_radio" },
  { label: "Advertisement", value: "advertisement" },
  { label: "Other", value: "other" },
];

function ProfileTab({ account }: { account: CustomerAccount }) {
  const router = useRouter();

  const [name, setName] = useState(account.name);
  const [surname, setSurname] = useState(account.surname);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone === "-" ? "" : account.phone);
  const [mobilePhone, setMobilePhone] = useState(account.mobile_phone);
  const [trId, setTrId] = useState(account.tr_identity_number);
  const [referralSource, setReferralSource] = useState(account.referral_source);

  const [country, setCountry] = useState(account.country || "Turkey");
  const [city, setCity] = useState(account.city === "-" ? "" : account.city);
  const [district, setDistrict] = useState(account.district);
  const [address, setAddress] = useState(account.address);
  const [iban, setIban] = useState(account.iban);
  const [taxNumber, setTaxNumber] = useState(account.tax_number);
  const [taxOffice, setTaxOffice] = useState(account.tax_office);

  const [wantNewPassword, setWantNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    if (wantNewPassword && newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const body: Record<string, string> = {
        address,
        city,
        country,
        district,
        email,
        iban,
        mobile_phone: mobilePhone,
        name,
        phone,
        referral_source: referralSource,
        surname,
        tax_number: taxNumber,
        tax_office: taxOffice,
        tr_identity_number: trId,
      };

      if (wantNewPassword && newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const response = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Profile could not be updated.");
      setMessage({ text: "Your profile has been updated.", type: "success" });
      if (wantNewPassword) {
        setWantNewPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      router.refresh();
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Profile could not be updated.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="profile-page">
      <h1 className="profile-page-title">Update My Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-section-header">My Member Information</div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-name">Name <span className="req">*</span></label>
          <input id="pf-name" className="profile-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-surname">Surname <span className="req">*</span></label>
          <input id="pf-surname" className="profile-input" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-email">Email <span className="req">*</span></label>
          <input id="pf-email" className="profile-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-phone">Phone</label>
          <input id="pf-phone" className="profile-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XXX) XXX XX XX" />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-mobile">Mobile Phone <span className="req">*</span></label>
          <input id="pf-mobile" className="profile-input" type="tel" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} placeholder="+90 (XXX) XXX XX XX" required />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-trid">TR Identity Number <span className="req">*</span></label>
          <input id="pf-trid" className="profile-input" type="text" value={trId} onChange={(e) => setTrId(e.target.value)} required maxLength={11} />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-referral">Welcome! Can we find out where he heard us?</label>
          <select id="pf-referral" className="profile-input" value={referralSource} onChange={(e) => setReferralSource(e.target.value)}>
            {REFERRAL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="profile-section-header">Edit Address</div>

        <div className="profile-row">
          <label className="profile-label">Country / City</label>
          <div className="profile-input-group">
            <select className="profile-input" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="Turkey">Turkey</option>
            </select>
            <select className="profile-input" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select city</option>
              {TR_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-district">District</label>
          <input id="pf-district" className="profile-input" type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-address">Address</label>
          <textarea id="pf-address" className="profile-input profile-textarea" value={address} onChange={(e) => setAddress(e.target.value)} rows={4} />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-iban">IBAN</label>
          <input id="pf-iban" className="profile-input" type="text" value={iban} onChange={(e) => setIban(e.target.value)} />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-taxno">Tax Number</label>
          <input id="pf-taxno" className="profile-input" type="text" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
        </div>

        <div className="profile-row">
          <label className="profile-label" htmlFor="pf-taxoffice">Tax Office</label>
          <input id="pf-taxoffice" className="profile-input" type="text" value={taxOffice} onChange={(e) => setTaxOffice(e.target.value)} />
        </div>

        <div className="profile-section-header">Password Change</div>

        <div className="profile-row">
          <label className="profile-label" />
          <label className="profile-checkbox-label">
            <input type="checkbox" checked={wantNewPassword} onChange={(e) => setWantNewPassword(e.target.checked)} />
            I Want to Set a New Password
          </label>
        </div>

        {wantNewPassword && (
          <>
            <div className="profile-row">
              <label className="profile-label" htmlFor="pf-curpw">Current Password</label>
              <input id="pf-curpw" className="profile-input" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required={wantNewPassword} />
            </div>
            <div className="profile-row">
              <label className="profile-label" htmlFor="pf-newpw">New Password</label>
              <input id="pf-newpw" className="profile-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required={wantNewPassword} minLength={8} />
            </div>
            <div className="profile-row">
              <label className="profile-label" htmlFor="pf-confirmpw">New Password (Again)</label>
              <input id="pf-confirmpw" className="profile-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={wantNewPassword} minLength={8} />
            </div>
          </>
        )}

        {message && (
          <div className="profile-row">
            <label className="profile-label" />
            <p className={`auth-message ${message.type}`}>{message.text}</p>
          </div>
        )}

        <div className="profile-form-actions">
          <button type="button" className="profile-btn-back" onClick={() => router.push("/")}>Back</button>
          <button type="submit" className="profile-btn-save" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
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
