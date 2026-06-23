import { createHmac, timingSafeEqual } from "crypto";

type HeaderReader = {
  get(name: string): string | null;
};

const ADMIN_SESSION_COOKIE = "varsapp-admin-session";
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_BASIC_USER && process.env.ADMIN_BASIC_PASS);
}

export function isAdminRequestAuthorized(headers: HeaderReader) {
  const user = process.env.ADMIN_BASIC_USER;
  const pass = process.env.ADMIN_BASIC_PASS;

  if (!user || !pass) {
    return true;
  }

  const authorization = headers.get("authorization") || "";
  const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;

  return safeEqual(authorization, expected) || isValidAdminSession(headers, user);
}

export function isAdminCredentialValid(username: string, password: string) {
  const user = process.env.ADMIN_BASIC_USER;
  const pass = process.env.ADMIN_BASIC_PASS;

  if (!user || !pass) {
    return true;
  }

  return safeEqual(username, user) && safeEqual(password, pass);
}

export function createAdminSessionCookie(username: string) {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ expiresAt, username })).toString("base64url");
  const signature = signAdminSession(payload);

  return serializeCookie(ADMIN_SESSION_COOKIE, `${payload}.${signature}`, {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearAdminSessionCookie() {
  return serializeCookie(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function adminUnauthorizedResponse() {
  return Response.json(
    { error: "Admin yetkisi gerekli." },
    {
      headers: {
        "www-authenticate": 'Basic realm="Varsapp Admin"',
      },
      status: 401,
    },
  );
}

function isValidAdminSession(headers: HeaderReader, expectedUser: string) {
  const cookieValue = readCookie(headers.get("cookie") || "", ADMIN_SESSION_COOKIE);

  if (!cookieValue) {
    return false;
  }

  const [payload, signature] = cookieValue.split(".");

  if (!payload || !signature || !safeEqual(signature, signAdminSession(payload))) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      expiresAt?: unknown;
      username?: unknown;
    };

    return (
      session.username === expectedUser &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}

function signAdminSession(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_BASIC_PASS || "varsapp-admin";

  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function readCookie(cookieHeader: string, name: string) {
  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const match = cookies.find((cookie) => cookie.startsWith(prefix));

  return match ? match.slice(prefix.length) : null;
}

function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
  },
) {
  const parts = [`${name}=${value}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.path) {
    parts.push(`Path=${options.path}`);
  }

  if (options.httpOnly) {
    parts.push("HttpOnly");
  }

  if (options.secure) {
    parts.push("Secure");
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.join("; ");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}
