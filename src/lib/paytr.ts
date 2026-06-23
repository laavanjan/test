import { createHmac, timingSafeEqual } from "crypto";
import type { RentalOrder } from "@/lib/rental-orders";
import { buildPaytrBasket } from "@/lib/rental-orders";
import { formatKurusAsPaytrPrice } from "@/lib/money";

const PAYTR_DIRECT_URL = "https://www.paytr.com/odeme";

type HeaderReader = {
  get(name: string): string | null;
};

type PaytrConfig = {
  debugOn: "0" | "1";
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: "0" | "1";
};

export type PaytrDirectForm = {
  action: string;
  cardStorageEnabled: boolean;
  fields: Array<{ name: string; value: string }>;
  method: "post";
  testMode: boolean;
};

export function getPaytrConfig(): PaytrConfig {
  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

  if (!merchantId || !merchantKey || !merchantSalt) {
    throw new Error(
      "PayTR env eksik: PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY ve PAYTR_MERCHANT_SALT girilmeli.",
    );
  }

  return {
    debugOn: process.env.PAYTR_DEBUG_ON === "0" ? "0" : "1",
    merchantId,
    merchantKey,
    merchantSalt,
    testMode: process.env.PAYTR_TEST_MODE === "0" ? "0" : "1",
  };
}

export function getRequestIpFromHeaders(headers: HeaderReader): string {
  const sandboxIp = process.env.PAYTR_TEST_USER_IP;

  if (sandboxIp) {
    return sandboxIp;
  }

  const forwardedFor = headers.get("x-forwarded-for");
  const forwarded = headers.get("forwarded");
  const realIp = headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "127.0.0.1";
  }

  if (realIp) {
    return realIp;
  }

  if (forwarded) {
    const match = forwarded.match(/for="?([^;,"]+)/i);
    if (match?.[1]) {
      return match[1];
    }
  }

  return "127.0.0.1";
}

export function getAppBaseUrl(headers: HeaderReader) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  const host = headers.get("host") || "localhost:3000";
  const proto = headers.get("x-forwarded-proto") || "http";

  return `${proto}://${host}`;
}

export function isPaytrCardStorageEnabled() {
  return process.env.PAYTR_ENABLE_CARD_STORAGE === "1";
}

export function createPaytrDirectPaymentForm({
  baseUrl,
  order,
  requestIp,
}: {
  baseUrl: string;
  order: RentalOrder;
  requestIp: string;
}): PaytrDirectForm {
  const config = getPaytrConfig();
  const paymentAmount = formatKurusAsPaytrPrice(order.totalKurus);
  const paymentType = "card";
  const installmentCount = "0";
  const currency = "TL";
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const non3d = "0";
  const hashStr =
    config.merchantId +
    requestIp +
    order.merchantOid +
    order.customer.email +
    paymentAmount +
    paymentType +
    installmentCount +
    currency +
    config.testMode +
    non3d;

  const paytrToken = createPaytrHash(
    hashStr + config.merchantSalt,
    config.merchantKey,
  );

  return {
    action: PAYTR_DIRECT_URL,
    cardStorageEnabled: isPaytrCardStorageEnabled(),
    fields: [
      { name: "merchant_id", value: config.merchantId },
      { name: "paytr_token", value: paytrToken },
      { name: "user_ip", value: requestIp },
      { name: "merchant_oid", value: order.merchantOid },
      { name: "email", value: order.customer.email },
      { name: "payment_amount", value: paymentAmount },
      { name: "payment_type", value: paymentType },
      { name: "installment_count", value: installmentCount },
      { name: "card_type", value: "" },
      { name: "currency", value: currency },
      { name: "client_lang", value: "tr" },
      { name: "test_mode", value: config.testMode },
      { name: "non_3d", value: non3d },
      { name: "non3d_test_failed", value: "0" },
      {
        name: "merchant_ok_url",
        value: `${normalizedBaseUrl}/odeme/basarili?oid=${order.merchantOid}`,
      },
      {
        name: "merchant_fail_url",
        value: `${normalizedBaseUrl}/odeme/basarisiz?oid=${order.merchantOid}`,
      },
      { name: "user_name", value: order.customer.name },
      { name: "user_address", value: order.customer.address },
      { name: "user_phone", value: order.customer.phone },
      { name: "user_basket", value: buildPaytrBasket(order) },
      { name: "debug_on", value: config.debugOn },
    ],
    method: "post",
    testMode: config.testMode === "1",
  };
}

export function createPaytrCallbackRecord(formData: FormData) {
  return {
    cardStorage: {
      ctoken: getOptionalFormValue(formData, "ctoken"),
      lastFour: getOptionalFormValue(formData, "last_4"),
      maskedCard: getOptionalFormValue(formData, "masked_card"),
      utoken: getOptionalFormValue(formData, "utoken"),
    },
    currency: getOptionalFormValue(formData, "currency"),
    failedReasonCode: getOptionalFormValue(formData, "failed_reason_code"),
    failedReasonMessage: getOptionalFormValue(formData, "failed_reason_msg"),
    installmentCount: getOptionalFormValue(formData, "installment_count"),
    merchantOid: String(formData.get("merchant_oid") ?? ""),
    paymentAmount: getOptionalFormValue(formData, "payment_amount"),
    paymentType: getOptionalFormValue(formData, "payment_type"),
    status: String(formData.get("status") ?? ""),
    testMode: getOptionalFormValue(formData, "test_mode"),
    totalAmount: String(formData.get("total_amount") ?? ""),
  };
}

export function verifyPaytrCallbackHash({
  hash,
  merchantOid,
  status,
  totalAmount,
}: {
  hash: string;
  merchantOid: string;
  status: string;
  totalAmount: string;
}): boolean {
  const config = getPaytrConfig();
  const expected = createPaytrHash(
    merchantOid + config.merchantSalt + status + totalAmount,
    config.merchantKey,
  );

  return safeEqual(expected, hash);
}

function createPaytrHash(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("base64");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function getOptionalFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return value ? String(value) : undefined;
}
