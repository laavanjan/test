import { randomBytes } from "crypto";
import { products, type Product } from "@/data/products";
import { formatKurusAsPaytrPrice, parseTurkishLiraToKurus } from "@/lib/money";
import {
  addDaysToDateValue,
  countRentalDays,
  getEarliestStartDate,
  validateRentalDates,
} from "@/lib/rental-dates";

export type RentalOrderStatus =
  | "draft"
  | "payment_pending"
  | "paid_pending_owner_approval"
  | "payment_failed"
  | "owner_approved"
  | "owner_rejected"
  | "refunded";

export type RentalCustomer = {
  address: string;
  email: string;
  name: string;
  phone: string;
};

export type RentalCart = {
  days: number;
  endDate: string;
  product: Product;
  shippingKurus: number;
  startDate: string;
  subtotalKurus: number;
  totalKurus: number;
  unitPriceKurus: number;
};

export type PaytrStoredCardSnapshot = {
  ctoken?: string;
  lastFour?: string;
  maskedCard?: string;
  utoken?: string;
};

export type RentalOrder = RentalCart & {
  basketItems?: RentalCart[];
  callbackReceivedAt?: string;
  cardStorage: {
    requested: boolean;
    token?: PaytrStoredCardSnapshot;
  };
  createdAt: string;
  customer: RentalCustomer;
  merchantOid: string;
  paytr: {
    currency?: string;
    failedReasonCode?: string;
    failedReasonMessage?: string;
    installmentCount?: string;
    paymentAmount?: string;
    paymentType?: string;
    status?: string;
    testMode?: string;
    totalAmount?: string;
  };
  status: RentalOrderStatus;
  updatedAt: string;
};

export type PaytrCallbackRecord = {
  cardStorage?: PaytrStoredCardSnapshot;
  currency?: string;
  failedReasonCode?: string;
  failedReasonMessage?: string;
  installmentCount?: string;
  merchantOid: string;
  paymentAmount?: string;
  paymentType?: string;
  status: "success" | "failed";
  testMode?: string;
  totalAmount: string;
};

const defaultCustomer: RentalCustomer = {
  address: "Varsapp Sandbox Adresi, Istanbul",
  email: "sandbox@varsapp.local",
  name: "Varsapp Sandbox",
  phone: "05555555555",
};

const globalForOrders = globalThis as typeof globalThis & {
  __varsappRentalOrders?: Map<string, RentalOrder>;
};

export function getMockRentalCart(
  product = products[0],
  dates?: { days?: number; endDate?: string; startDate?: string },
): RentalCart {
  const startDate = dates?.startDate || getEarliestStartDate();
  const endDate = dates?.endDate || addDaysToDateValue(startDate, product.minDays);
  const days = dates?.days || countRentalDays(startDate, endDate);
  const error = validateRentalDates({ startDate, endDate, minDays: product.minDays });

  if (error) {
    throw new Error(error);
  }

  const unitPriceKurus = parseTurkishLiraToKurus(product.price);
  const subtotalKurus = unitPriceKurus * days;
  const shippingKurus = 0;

  return {
    days,
    endDate,
    product,
    shippingKurus,
    startDate,
    subtotalKurus,
    totalKurus: subtotalKurus + shippingKurus,
    unitPriceKurus,
  };
}

export function createRentalOrderDraft({
  cardStorageRequested = false,
  customer = defaultCustomer,
  product = products[0],
  rentalDates,
  cartItems,
}: {
  cardStorageRequested?: boolean;
  cartItems?: Array<{ product: Product; rentalDates?: { days?: number; endDate?: string; startDate?: string } }>;
  customer?: RentalCustomer;
  product?: Product;
  rentalDates?: { days?: number; endDate?: string; startDate?: string };
} = {}): RentalOrder {
  const now = new Date().toISOString();
  const basketItems = cartItems?.length
    ? cartItems.map((item) => getMockRentalCart(item.product, item.rentalDates))
    : undefined;
  const primaryCart = basketItems?.[0] || getMockRentalCart(product, rentalDates);
  const subtotalKurus = basketItems
    ? basketItems.reduce((sum, item) => sum + item.subtotalKurus, 0)
    : primaryCart.subtotalKurus;
  const totalKurus = basketItems
    ? basketItems.reduce((sum, item) => sum + item.totalKurus, 0)
    : primaryCart.totalKurus;
  const displayProduct =
    basketItems && basketItems.length > 1
      ? {
          ...primaryCart.product,
          name: `${basketItems.length} ürünlü kiralama sepeti`,
          slug: `coklu-sepet-${primaryCart.product.slug}`,
        }
      : primaryCart.product;
  const order: RentalOrder = {
    ...primaryCart,
    basketItems,
    cardStorage: {
      requested: cardStorageRequested,
    },
    createdAt: now,
    customer,
    merchantOid: createMerchantOid(),
    paytr: {},
    product: displayProduct,
    subtotalKurus,
    status: "payment_pending",
    totalKurus,
    updatedAt: now,
  };

  getOrderStore().set(order.merchantOid, order);

  return order;
}

export function getRentalOrder(merchantOid: string) {
  return getOrderStore().get(merchantOid);
}

export function listRentalOrders() {
  return Array.from(getOrderStore().values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function recordPaytrCallback(callback: PaytrCallbackRecord) {
  const store = getOrderStore();
  const existing = store.get(callback.merchantOid);

  if (!existing) {
    return { knownOrder: false, order: null };
  }

  if (isFinalPaymentStatus(existing.status)) {
    return { knownOrder: true, order: existing };
  }

  const nextStatus: RentalOrderStatus =
    callback.status === "success"
      ? "paid_pending_owner_approval"
      : "payment_failed";
  const updated: RentalOrder = {
    ...existing,
    callbackReceivedAt: new Date().toISOString(),
    cardStorage: {
      ...existing.cardStorage,
      token: callback.cardStorage?.utoken
        ? {
            ...existing.cardStorage.token,
            ...callback.cardStorage,
          }
        : existing.cardStorage.token,
    },
    paytr: {
      currency: callback.currency,
      failedReasonCode: callback.failedReasonCode,
      failedReasonMessage: callback.failedReasonMessage,
      installmentCount: callback.installmentCount,
      paymentAmount: callback.paymentAmount,
      paymentType: callback.paymentType,
      status: callback.status,
      testMode: callback.testMode,
      totalAmount: callback.totalAmount,
    },
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };

  store.set(callback.merchantOid, updated);

  return { knownOrder: true, order: updated };
}

export function buildPaytrBasket(order: RentalCart) {
  const basketItems =
    "basketItems" in order && Array.isArray(order.basketItems) && order.basketItems.length
      ? order.basketItems
      : [order];

  return JSON.stringify(
    basketItems.map((item) => [
      item.product.name,
      formatKurusAsPaytrPrice(item.unitPriceKurus),
      item.days,
    ]),
  );
}

function createMerchantOid() {
  const suffix = randomBytes(4).toString("hex").toUpperCase();

  return `VAR${Date.now()}${suffix}`;
}

function getOrderStore() {
  if (!globalForOrders.__varsappRentalOrders) {
    globalForOrders.__varsappRentalOrders = new Map<string, RentalOrder>();
  }

  return globalForOrders.__varsappRentalOrders;
}

function isFinalPaymentStatus(status: RentalOrderStatus) {
  return status === "paid_pending_owner_approval" || status === "payment_failed";
}
