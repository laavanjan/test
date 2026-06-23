import { NextRequest } from "next/server";
import { recordPaytrCallback, type PaytrCallbackRecord } from "@/lib/rental-orders";
import { recordSupabasePaymentCallback } from "@/lib/supabase-admin";
import {
  createPaytrCallbackRecord,
  verifyPaytrCallbackHash,
} from "@/lib/paytr";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const callback = createPaytrCallbackRecord(formData);
  const hash = String(formData.get("hash") ?? "");

  if (!callback.merchantOid || !callback.status || !callback.totalAmount || !hash) {
    return plainText("PAYTR notification failed: missing fields", 400);
  }

  if (callback.status !== "success" && callback.status !== "failed") {
    return plainText("PAYTR notification failed: bad status", 400);
  }

  if (
    !verifyPaytrCallbackHash({
      hash,
      merchantOid: callback.merchantOid,
      status: callback.status,
      totalAmount: callback.totalAmount,
    })
  ) {
    return plainText("PAYTR notification failed: bad hash", 400);
  }

  const result = recordPaytrCallback(callback as PaytrCallbackRecord);
  await recordSupabasePaymentCallback({
    callback: callback as PaytrCallbackRecord,
    order: result.order,
  });

  if (callback.status === "success") {
    console.info("[paytr] payment success", {
      knownOrder: result.knownOrder,
      merchantOid: callback.merchantOid,
      totalAmount: callback.totalAmount,
    });
  } else {
    console.info("[paytr] payment failed", {
      failedReasonCode: callback.failedReasonCode,
      failedReasonMessage: callback.failedReasonMessage,
      knownOrder: result.knownOrder,
      merchantOid: callback.merchantOid,
      totalAmount: callback.totalAmount,
    });
  }

  return plainText("OK");
}

function plainText(body: string, status = 200) {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
    status,
  });
}
