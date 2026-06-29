import "server-only";

import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import {
  supabaseDelete,
  supabaseInsert,
  supabasePatch,
  supabaseSelect,
} from "@/lib/supabase-admin";

export type CustomerAccount = {
  address: string;
  city: string;
  country: string;
  created_at: string;
  district: string;
  email: string;
  iban: string;
  id: string;
  last_login_at?: string | null;
  mobile_phone: string;
  name: string;
  phone: string;
  referral_source: string;
  source: "ideasoft" | "self_signup" | "paytr" | "manual";
  status: "imported" | "active" | "disabled";
  surname: string;
  tax_number: string;
  tax_office: string;
  tr_identity_number: string;
};

type CustomerAccountRow = CustomerAccount & {
  metadata: Record<string, unknown> | null;
  password_hash: string | null;
  password_salt: string | null;
};

type CustomerSessionRow = {
  account_id: string;
  customer_accounts: CustomerAccountRow | null;
  expires_at: string;
  id: string;
  token_hash: string;
};

const SESSION_COOKIE = "varsapp_session";
const SESSION_DAYS = 30;

export function normalizeCustomerEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function registerCustomerAccount({
  city = "-",
  email,
  name,
  password,
  phone = "-",
}: {
  city?: string;
  email: string;
  name: string;
  password: string;
  phone?: string;
}) {
  const normalizedEmail = normalizeCustomerEmail(email);
  assertPassword(password);
  const existing = await findCustomerAccountByEmail(normalizedEmail);
  const passwordRecord = hashPassword(password);
  const now = new Date().toISOString();

  if (existing?.status === "active" && existing.password_hash) {
    throw new AuthError("Bu e-posta ile aktif bir hesap var.", "email_exists", 409);
  }

  if (existing) {
    await supabasePatch(
      `customer_accounts?id=eq.${encodeURIComponent(existing.id)}`,
      {
        city: city || existing.city || "-",
        name: name || existing.name,
        password_hash: passwordRecord.hash,
        password_salt: passwordRecord.salt,
        phone: phone || existing.phone || "-",
        status: "active",
        updated_at: now,
      },
    );

    const updated = await findCustomerAccountByEmail(normalizedEmail);
    return updated || existing;
  }

  const rows = await supabaseInsert<CustomerAccountRow[]>("customer_accounts", [
    {
      city,
      email: normalizedEmail,
      name,
      password_hash: passwordRecord.hash,
      password_salt: passwordRecord.salt,
      phone,
      source: "self_signup",
      status: "active",
    },
  ]);

  if (!rows?.[0]) {
    throw new AuthError("Hesap olusturulamadi.", "register_failed", 500);
  }

  return rows[0];
}

export async function updateCustomerAccount(
  id: string,
  updates: {
    address?: string;
    city?: string;
    country?: string;
    currentPassword?: string;
    district?: string;
    email?: string;
    iban?: string;
    mobile_phone?: string;
    name?: string;
    newPassword?: string;
    phone?: string;
    referral_source?: string;
    surname?: string;
    tax_number?: string;
    tax_office?: string;
    tr_identity_number?: string;
  },
) {
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (typeof updates.name === "string" && updates.name.trim()) {
    patch.name = updates.name.trim();
  }
  if (typeof updates.phone === "string") {
    patch.phone = updates.phone.trim() || "-";
  }
  if (typeof updates.city === "string") {
    patch.city = updates.city.trim() || "-";
  }
  if (typeof updates.email === "string" && updates.email.trim()) {
    const normalizedEmail = normalizeCustomerEmail(updates.email);
    const existing = await findCustomerAccountByEmail(normalizedEmail);
    if (existing && existing.id !== id) {
      throw new AuthError("Bu e-posta zaten kullanılıyor.", "email_exists", 409);
    }
    patch.email = normalizedEmail;
  }

  const metaKeys = ["address", "country", "district", "iban", "mobile_phone", "referral_source", "surname", "tax_number", "tax_office", "tr_identity_number"] as const;
  const hasMetaUpdate = metaKeys.some((k) => typeof updates[k] === "string");

  if (typeof updates.newPassword === "string" && updates.newPassword || hasMetaUpdate) {
    const rows = await supabaseSelect<CustomerAccountRow[]>(
      `customer_accounts?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    );
    const account = rows?.[0];

    if (typeof updates.newPassword === "string" && updates.newPassword) {
      assertPassword(updates.newPassword);
      if (account?.password_hash && account?.password_salt) {
        if (!updates.currentPassword) {
          throw new AuthError("Mevcut şifrenizi girin.", "current_password_required", 400);
        }
        if (!verifyPassword(updates.currentPassword, account.password_salt, account.password_hash)) {
          throw new AuthError("Mevcut şifre hatalı.", "invalid_current_password", 401);
        }
      }
      const passwordRecord = hashPassword(updates.newPassword);
      patch.password_hash = passwordRecord.hash;
      patch.password_salt = passwordRecord.salt;
    }

    if (hasMetaUpdate) {
      const currentMeta: Record<string, unknown> = (account?.metadata as Record<string, unknown>) ?? {};
      const newMeta = { ...currentMeta };
      for (const key of metaKeys) {
        if (typeof updates[key] === "string") {
          newMeta[key] = updates[key];
        }
      }
      patch.metadata = newMeta;
    }
  }

  await supabasePatch(`customer_accounts?id=eq.${encodeURIComponent(id)}`, patch);

  const rows = await supabaseSelect<CustomerAccountRow[]>(
    `customer_accounts?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
  );

  return rows?.[0] ? publicAccount(rows[0]) : null;
}

export async function loginCustomerAccount(email: string, password: string) {
  const account = await findCustomerAccountByEmail(email);

  if (!account) {
    throw new AuthError("E-posta veya sifre hatali.", "invalid_credentials", 401);
  }

  if (account.status === "disabled") {
    throw new AuthError("Bu hesap pasif durumda.", "account_disabled", 403);
  }

  if (!account.password_hash || !account.password_salt) {
    throw new AuthError(
      "Bu hesap IdeaSoft importundan geldi. Guvenlik icin once sifre belirlenmeli.",
      "password_required",
      409,
    );
  }

  if (!verifyPassword(password, account.password_salt, account.password_hash)) {
    throw new AuthError("E-posta veya sifre hatali.", "invalid_credentials", 401);
  }

  await supabasePatch(`customer_accounts?id=eq.${encodeURIComponent(account.id)}`, {
    last_login_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return account;
}

export async function createCustomerSession(accountId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await supabaseInsert("customer_sessions", [
    {
      account_id: accountId,
      expires_at: expiresAt.toISOString(),
      token_hash: hashSessionToken(token),
    },
  ]);

  return {
    expiresAt,
    token,
  };
}

export async function getCurrentCustomerAccount() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const rows = await supabaseSelect<CustomerSessionRow[]>(
    `customer_sessions?select=id,account_id,expires_at,token_hash,customer_accounts(*)&token_hash=eq.${encodeURIComponent(hashSessionToken(token))}&limit=1`,
  );
  const session = rows?.[0];

  if (!session || new Date(session.expires_at).valueOf() < Date.now()) {
    return null;
  }

  return session.customer_accounts ? publicAccount(session.customer_accounts) : null;
}

export async function setCustomerSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearCustomerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await supabaseDelete(
      `customer_sessions?token_hash=eq.${encodeURIComponent(hashSessionToken(token))}`,
    );
  }

  cookieStore.delete(SESSION_COOKIE);
}

export function publicAccount(account: CustomerAccountRow): CustomerAccount {
  const meta = (account.metadata as Record<string, unknown>) ?? {};
  const s = (k: string) => (typeof meta[k] === "string" ? (meta[k] as string) : "");
  return {
    address: s("address"),
    city: account.city,
    country: s("country") || "Turkey",
    created_at: account.created_at,
    district: s("district"),
    email: account.email,
    iban: s("iban"),
    id: account.id,
    last_login_at: account.last_login_at,
    mobile_phone: s("mobile_phone"),
    name: account.name,
    phone: account.phone,
    referral_source: s("referral_source"),
    source: account.source,
    status: account.status,
    surname: s("surname"),
    tax_number: s("tax_number"),
    tax_office: s("tax_office"),
    tr_identity_number: s("tr_identity_number"),
  };
}

export class AuthError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function findCustomerAccountByEmail(email: string) {
  const normalizedEmail = normalizeCustomerEmail(email);
  const rows = await supabaseSelect<CustomerAccountRow[]>(
    `customer_accounts?select=*&email=eq.${encodeURIComponent(normalizedEmail)}&limit=1`,
  );

  return rows?.[0] || null;
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return {
    hash: scryptSync(password, salt, 64).toString("hex"),
    salt,
  };
}

function verifyPassword(password: string, salt: string, expectedHash: string) {
  const actual = Buffer.from(hashPassword(password, salt).hash, "hex");
  const expected = Buffer.from(expectedHash, "hex");

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function assertPassword(password: string) {
  if (password.length < 8) {
    throw new AuthError("Sifre en az 8 karakter olmali.", "weak_password", 400);
  }
}
