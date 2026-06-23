import Link from "next/link";
import { headers } from "next/headers";
import { PageShell } from "@/components/PageShell";
import { PaytrCheckout } from "@/components/PaytrCheckout";
import { findProduct, type Product } from "@/data/products";
import { getCurrentCustomerAccount } from "@/lib/customer-auth";
import {
  createPaytrDirectPaymentForm,
  getAppBaseUrl,
  getRequestIpFromHeaders,
  isPaytrCardStorageEnabled,
} from "@/lib/paytr";
import { createRentalOrderDraft } from "@/lib/rental-orders";
import { persistSupabaseRentalOrder } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{
    days?: string;
    endDate?: string;
    items?: string;
    product?: string;
    startDate?: string;
  }>;
}) {
  const prepared = await prepareCheckout(await searchParams);

  return (
    <PageShell>
      <section className="checkout-page shell">
        <div className="breadcrumbs">
          <Link href="/">Anasayfa</Link>
          <span>-</span>
          <Link href="/sepet">Sepetim</Link>
          <span>-</span>
          <strong>Ödeme</strong>
        </div>
        {prepared.status === "ready" ? (
          <PaytrCheckout form={prepared.form} order={prepared.order} />
        ) : (
          <div className="checkout-state error">
            <strong>PayTR ödeme formu hazırlanamadı.</strong>
            <p>{prepared.message}</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}

async function prepareCheckout(searchParams: {
  days?: string;
  endDate?: string;
  items?: string;
  product?: string;
  startDate?: string;
}) {
  try {
    const headerList = await headers();
    const account = await getCurrentCustomerAccount();
    const product = searchParams.product ? findProduct(searchParams.product) : undefined;
    const cartItems = parseCheckoutItems(searchParams.items);
    const order = createRentalOrderDraft({
      cardStorageRequested: isPaytrCardStorageEnabled(),
      cartItems,
      customer: account
        ? {
            address: "Varsapp teslimat adresi daha sonra alinacak",
            email: account.email,
            name: account.name,
            phone: account.phone,
          }
        : undefined,
      product,
      rentalDates: {
        days: searchParams.days ? Number.parseInt(searchParams.days, 10) : undefined,
        endDate: searchParams.endDate,
        startDate: searchParams.startDate,
      },
    });
    await persistSupabaseRentalOrder(order);
    const form = createPaytrDirectPaymentForm({
      baseUrl: getAppBaseUrl(headerList),
      order,
      requestIp: getRequestIpFromHeaders(headerList),
    });

    return { form, order, status: "ready" as const };
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Beklenmeyen bir ödeme hazırlama hatası oluştu.",
      status: "error" as const,
    };
  }
}

function parseCheckoutItems(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return undefined;
    }

    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") {
          return null;
        }

        const candidate = item as {
          days?: unknown;
          endDate?: unknown;
          productSlug?: unknown;
          startDate?: unknown;
        };
        const product = findProduct(String(candidate.productSlug || ""));

        if (!product) {
          return null;
        }

        return {
          product,
          rentalDates: {
            days:
              typeof candidate.days === "number"
                ? candidate.days
                : Number.parseInt(String(candidate.days || ""), 10),
            endDate: String(candidate.endDate || ""),
            startDate: String(candidate.startDate || ""),
          },
        } satisfies {
          product: Product;
          rentalDates: { days?: number; endDate?: string; startDate?: string };
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  } catch {
    return undefined;
  }
}
