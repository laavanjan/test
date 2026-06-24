import "server-only";

type KolayBiConfig = {
  apiKey: string;
  baseUrl: string;
  channel: string;
};

type KolayBiEnvelope<T> = {
  data?: T;
  description?: string;
  message?: string;
  success?: boolean;
};

type KolayBiTokenCache = {
  expiresAt: number;
  value: string;
};

type KolayBiRequestOptions = {
  body?: URLSearchParams;
  method?: "GET" | "POST";
  query?: Record<string, boolean | number | string | undefined>;
};

const TOKEN_TTL_MS = 23 * 60 * 60 * 1000;
const API_PATH_PREFIX = "/kolaybi/v1";

const globalForKolayBi = globalThis as typeof globalThis & {
  __varsappKolayBiToken?: KolayBiTokenCache;
};

export class KolayBiError extends Error {
  details: unknown;
  status: number;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "KolayBiError";
    this.status = status;
    this.details = details;
  }
}

export type KolayBiAddress = {
  address?: string;
  address_type?: string;
  city?: string;
  country_name?: string;
  coutry_name?: string;
  district?: string;
  id?: number;
};

export type KolayBiAssociate = {
  address?: KolayBiAddress[];
  email?: string;
  full_name?: string;
  id?: number;
  name?: string;
  phone?: string;
  surname?: string;
};

export type KolayBiProduct = {
  code?: string;
  id?: number;
  name?: string;
  sale_price?: number;
  total_stock_quantity?: number;
};

export type KolayBiInvoice = {
  document_id?: number;
  id?: number;
  serial_no?: string;
  uuid?: string;
};

export async function getKolayBiAccessToken({ forceRefresh = false } = {}) {
  const cached = globalForKolayBi.__varsappKolayBiToken;

  if (!forceRefresh && cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.value;
  }

  const config = getKolayBiConfig();
  const response = await fetch(buildKolayBiUrl("/access_token", config), {
    body: JSON.stringify({ api_key: config.apiKey }),
    headers: {
      Channel: config.channel,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const json = await readKolayBiJson<string>(response);
  const token = json.data;

  if (!token) {
    throw new KolayBiError("KolayBi access token response is missing data.", response.status, json);
  }

  globalForKolayBi.__varsappKolayBiToken = {
    expiresAt: Date.now() + TOKEN_TTL_MS,
    value: token,
  };

  return token;
}

export async function listKolayBiAssociates(
  filters: Record<string, boolean | number | string | undefined> = {},
) {
  return kolayBiRequest<KolayBiAssociate[]>("/associates", { query: filters });
}

export async function listKolayBiProducts(
  filters: Record<string, boolean | number | string | undefined> = {},
) {
  return kolayBiRequest<KolayBiProduct[]>("/products", { query: filters });
}

export async function listKolayBiInvoices() {
  return kolayBiRequest<KolayBiInvoice[]>("/invoices");
}

export async function createKolayBiAssociate(
  data: Record<string, boolean | number | string | undefined>,
) {
  return kolayBiRequest<KolayBiAssociate>("/associates", {
    body: toFormBody(data),
    method: "POST",
  });
}

export async function createKolayBiProduct(
  data: Record<string, boolean | number | string | undefined>,
) {
  return kolayBiRequest<KolayBiProduct>("/products", {
    body: toFormBody(data),
    method: "POST",
  });
}

export async function createKolayBiInvoice(
  data: Record<string, boolean | number | string | undefined>,
) {
  return kolayBiRequest<KolayBiInvoice>("/invoices", {
    body: toFormBody(data),
    method: "POST",
  });
}

export async function checkKolayBiConnection() {
  const token = await getKolayBiAccessToken();
  const [associates, products, invoices] = await Promise.all([
    listKolayBiAssociates(),
    listKolayBiProducts(),
    listKolayBiInvoices(),
  ]);

  return {
    associates: summarizeKolayBiData(associates),
    invoices: summarizeKolayBiData(invoices),
    products: summarizeKolayBiData(products),
    tokenReceived: token.length > 20,
  };
}

async function kolayBiRequest<T>(path: string, options: KolayBiRequestOptions = {}) {
  const config = getKolayBiConfig();
  const token = await getKolayBiAccessToken();
  const response = await fetch(buildKolayBiUrl(path, config, options.query), {
    body: options.body,
    headers: {
      Authorization: `Bearer ${token}`,
      Channel: config.channel,
      ...(options.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    method: options.method || "GET",
  });
  const json = await readKolayBiJson<T>(response);

  if (json.data === undefined) {
    throw new KolayBiError("KolayBi API response is missing data.", response.status, json);
  }

  return json.data;
}

async function readKolayBiJson<T>(response: Response): Promise<KolayBiEnvelope<T>> {
  const text = await response.text();
  let json: KolayBiEnvelope<T>;

  try {
    json = JSON.parse(text) as KolayBiEnvelope<T>;
  } catch {
    json = { description: text };
  }

  if (!response.ok) {
    throw new KolayBiError("KolayBi API request failed.", response.status, json);
  }

  return json;
}

function buildKolayBiUrl(
  path: string,
  config: KolayBiConfig,
  query?: Record<string, boolean | number | string | undefined>,
) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${config.baseUrl}${API_PATH_PREFIX}${normalizedPath}`);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function getKolayBiConfig(): KolayBiConfig {
  const apiKey = process.env.KOLAYBI_API_KEY?.trim();
  const channel = process.env.KOLAYBI_CHANNEL?.trim();
  const baseUrl = (process.env.KOLAYBI_API_BASE_URL || "https://ofis-sandbox-api.kolaybi.com")
    .trim()
    .replace(/\/$/, "");

  if (!apiKey || !channel) {
    throw new Error("KolayBi environment variables are missing.");
  }

  return { apiKey, baseUrl, channel };
}

function summarizeKolayBiData(data: unknown) {
  return {
    count: Array.isArray(data) ? data.length : null,
    type: Array.isArray(data) ? "array" : typeof data,
  };
}

function toFormBody(data: Record<string, boolean | number | string | undefined>) {
  const body = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      body.set(key, String(value));
    }
  });

  return body;
}
