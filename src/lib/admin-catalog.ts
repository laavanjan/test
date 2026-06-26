import "server-only";

import { categories, products, type Product } from "@/data/products";
import {
  supabaseDelete,
  supabaseSelect,
  supabaseUpsert,
} from "@/lib/supabase-admin";

export type AdminCatalogProduct = Product & {
  adminNote: string;
  discountPercent: number;
  discountPrice: string;
  isActive: boolean;
  source: "override" | "static" | "custom";
  stock: number;
  updatedAt: string;
};

export type AdminCatalogProductPage = {
  metrics: {
    active: number;
    discounted: number;
    inactive: number;
    total: number;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  products: AdminCatalogProduct[];
};

export type AdminCatalogCategory = {
  activeProducts: number;
  isActive: boolean;
  name: string;
  productCount: number;
  slug: string;
  sortOrder: number;
  updatedAt: string;
};

export type AdminDiscount = {
  endsAt: string;
  id: string;
  isActive: boolean;
  name: string;
  startsAt: string;
  target: "all" | "category" | "product";
  targetValue: string;
  type: "fixed" | "percentage";
  updatedAt: string;
  value: number;
};

export type AdminCatalogSettings = {
  adminNotes: string;
  defaultMinDays: number;
  freeCargo: boolean;
  storeEditMode: "live" | "preview";
};

type ProductOverrideData = Partial<
  Pick<Product, "badge" | "category" | "categorySlug" | "minDays" | "name" | "oldPrice" | "price">
> & {
  adminNote?: string;
  discountPercent?: number;
  discountPrice?: string;
  isActive?: boolean;
  stock?: number;
};

type ProductOverrideRow = {
  data: ProductOverrideData | null;
  slug: string;
  updated_at: string | null;
};

type CategoryOverrideData = {
  isActive?: boolean;
  name?: string;
  sortOrder?: number;
};

type CategoryOverrideRow = {
  data: CategoryOverrideData | null;
  slug: string;
  updated_at: string | null;
};

type DiscountRow = {
  ends_at: string | null;
  id: string;
  is_active: boolean | null;
  name: string | null;
  starts_at: string | null;
  target: AdminDiscount["target"] | null;
  target_value: string | null;
  type: AdminDiscount["type"] | null;
  updated_at: string | null;
  value: number | null;
};

type SettingRow = {
  key: string;
  value: Partial<AdminCatalogSettings> | null;
};

const DEFAULT_PRODUCT_PAGE_SIZE = 24;
const DEFAULT_SETTINGS: AdminCatalogSettings = {
  adminNotes: "",
  defaultMinDays: 3,
  freeCargo: true,
  storeEditMode: "preview",
};

const globalForCatalog = globalThis as typeof globalThis & {
  __varsappAdminCategoryOverrides?: Map<string, CategoryOverrideRow>;
  __varsappAdminCatalogWarnings?: Set<string>;
  __varsappAdminDiscounts?: Map<string, AdminDiscount>;
  __varsappAdminProductOverrides?: Map<string, ProductOverrideRow>;
  __varsappAdminSettings?: AdminCatalogSettings;
};

export async function getAdminCatalogProducts({
  categorySlug = "",
  page = 1,
  pageSize = DEFAULT_PRODUCT_PAGE_SIZE,
  query = "",
  status = "",
}: {
  categorySlug?: string;
  page?: number;
  pageSize?: number;
  query?: string;
  status?: string;
} = {}): Promise<AdminCatalogProductPage> {
  const allProducts = await listAdminCatalogProducts();
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const filtered = allProducts.filter((product) => {
    const matchesQuery = normalizedQuery
      ? `${product.name} ${product.sku} ${product.category} ${product.slug}`
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedQuery)
      : true;
    const matchesCategory = categorySlug ? product.categorySlug === categorySlug : true;
    const matchesStatus =
      status === "active"
        ? product.isActive
        : status === "inactive"
          ? !product.isActive
          : status === "discounted"
            ? product.discountPercent > 0 || Boolean(product.discountPrice)
            : true;

    return matchesQuery && matchesCategory && matchesStatus;
  });
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * pageSize;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return {
    metrics: {
      active: allProducts.filter((product) => product.isActive).length,
      discounted: allProducts.filter(
        (product) => product.discountPercent > 0 || Boolean(product.discountPrice),
      ).length,
      inactive: allProducts.filter((product) => !product.isActive).length,
      total: allProducts.length,
    },
    pagination: {
      page: safePage,
      pageSize,
      total: filtered.length,
      totalPages,
    },
    products: filtered.slice(from, from + pageSize),
  };
}

export async function listAdminCatalogProducts() {
  const [overrides, categoryOverrides, customRows] = await Promise.all([
    readProductOverrides(),
    readCategoryOverrides(),
    supabaseSelect<{ badge: string | null; category: string; category_slug: string; created_at: string; description: string; featured: boolean; id: string; image: string; location: string; min_days: number; name: string; old_price: string | null; owner: string; price: string; slug: string }[]>(
      "custom_products?order=created_at.desc"
    ).catch(() => [] as never[]),
  ]);

  const now = new Date().toISOString();

  const staticProducts = products.map((product): AdminCatalogProduct => {
    const override = overrides.get(product.slug);
    const categoryOverride = categoryOverrides.get(product.categorySlug);
    const data = override?.data || {};
    const categoryData = categoryOverride?.data || {};
    const isCategoryActive = categoryData.isActive ?? true;

    return {
      ...product,
      badge: data.badge ?? product.badge,
      category: data.category ?? categoryData.name ?? product.category,
      categorySlug: data.categorySlug ?? product.categorySlug,
      minDays: data.minDays ?? product.minDays,
      name: data.name ?? product.name,
      oldPrice: data.oldPrice ?? product.oldPrice,
      price: data.price ?? product.price,
      adminNote: data.adminNote || "",
      discountPercent: data.discountPercent || 0,
      discountPrice: data.discountPrice || "",
      isActive: (data.isActive ?? true) && isCategoryActive,
      source: override ? "override" : "static",
      stock: data.stock ?? 1,
      updatedAt: override?.updated_at || now,
    };
  });

  const staticSlugs = new Set(staticProducts.map((p) => p.slug));

  const customProducts: AdminCatalogProduct[] = (customRows ?? [])
    .filter((row) => !staticSlugs.has(row.slug))
    .map((row) => ({
      adminNote: "",
      badge: row.badge ?? undefined,
      category: row.category,
      categorySlug: row.category_slug,
      description: row.description ? row.description.split("\n").filter(Boolean) : [],
      discountPercent: 0,
      discountPrice: "",
      featured: row.featured,
      gallery: [row.image],
      image: row.image,
      isActive: true,
      location: row.location,
      minDays: row.min_days,
      name: row.name,
      oldPrice: row.old_price ?? undefined,
      owner: row.owner,
      price: row.price,
      sku: row.id,
      slug: row.slug,
      source: "custom",
      stock: 1,
      updatedAt: row.created_at,
    }));

  return [...staticProducts, ...customProducts];
}

export async function updateAdminProductOverride(
  slug: string,
  patch: ProductOverrideData,
) {
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error("Ürün bulunamadı.");
  }

  const overrides = await readProductOverrides();
  const existing = overrides.get(slug)?.data || {};
  const now = new Date().toISOString();
  const row: ProductOverrideRow = {
    data: normalizeProductPatch({ ...existing, ...patch }),
    slug,
    updated_at: now,
  };

  overrides.set(slug, row);
  writeProductFallback(overrides);

  try {
    await supabaseUpsert("admin_product_overrides", [row], "slug");
  } catch (error) {
    warnCatalogFallbackOnce(
      "product-override-persist",
      "Product override could not be persisted; using in-memory fallback.",
      error,
    );
  }

  return row;
}

export async function listAdminCategories() {
  const overrides = await readCategoryOverrides();
  const activeProducts = await listAdminCatalogProducts();
  const now = new Date().toISOString();

  return categories
    .map((category, index): AdminCatalogCategory => {
      const override = overrides.get(category.slug);
      const data = override?.data || {};
      const categoryProducts = products.filter((product) => product.categorySlug === category.slug);

      return {
        activeProducts: activeProducts.filter(
          (product) => product.categorySlug === category.slug && product.isActive,
        ).length,
        isActive: data.isActive ?? true,
        name: data.name || category.name,
        productCount: categoryProducts.length,
        slug: category.slug,
        sortOrder: data.sortOrder ?? index + 1,
        updatedAt: override?.updated_at || now,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "tr"));
}

export async function updateAdminCategoryOverride(
  slug: string,
  patch: CategoryOverrideData,
) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error("Kategori bulunamadı.");
  }

  const overrides = await readCategoryOverrides();
  const existing = overrides.get(slug)?.data || {};
  const now = new Date().toISOString();
  const row: CategoryOverrideRow = {
    data: {
      isActive: patch.isActive ?? existing.isActive ?? true,
      name: patch.name?.trim() || existing.name || category.name,
      sortOrder: patch.sortOrder ?? existing.sortOrder,
    },
    slug,
    updated_at: now,
  };

  overrides.set(slug, row);
  writeCategoryFallback(overrides);

  try {
    await supabaseUpsert("admin_category_overrides", [row], "slug");
  } catch (error) {
    warnCatalogFallbackOnce(
      "category-override-persist",
      "Category override could not be persisted; using in-memory fallback.",
      error,
    );
  }

  return row;
}

export async function listAdminDiscounts() {
  const fallback = getDiscountFallback();

  try {
    const rows = await supabaseSelect<DiscountRow[]>(
      "admin_discounts?select=id,name,type,value,target,target_value,is_active,starts_at,ends_at,updated_at&order=updated_at.desc",
    );

    if (rows) {
      const mapped = rows.map(mapDiscountRow);
      fallback.clear();
      mapped.forEach((discount) => fallback.set(discount.id, discount));
    }
  } catch (error) {
    warnCatalogFallbackOnce(
      "discounts-load",
      "Discounts could not be loaded; using in-memory fallback.",
      error,
    );
  }

  return Array.from(fallback.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function upsertAdminDiscount(discount: Partial<AdminDiscount> & { id?: string }) {
  const fallback = getDiscountFallback();
  const now = new Date().toISOString();
  const id = discount.id || `DISC-${Date.now().toString(36).toUpperCase()}`;
  const existing = fallback.get(id);
  const next: AdminDiscount = {
    endsAt: discount.endsAt ?? existing?.endsAt ?? "",
    id,
    isActive: discount.isActive ?? existing?.isActive ?? true,
    name: discount.name?.trim() || existing?.name || "Yeni indirim",
    startsAt: discount.startsAt ?? existing?.startsAt ?? "",
    target: discount.target || existing?.target || "all",
    targetValue: discount.targetValue?.trim() || existing?.targetValue || "",
    type: discount.type || existing?.type || "percentage",
    updatedAt: now,
    value: discount.value ?? existing?.value ?? 0,
  };

  fallback.set(id, next);

  try {
    await supabaseUpsert("admin_discounts", [mapDiscountMutation(next)], "id");
  } catch (error) {
    warnCatalogFallbackOnce(
      "discount-persist",
      "Discount could not be persisted; using in-memory fallback.",
      error,
    );
  }

  return next;
}

export async function deleteAdminDiscount(id: string) {
  getDiscountFallback().delete(id);

  try {
    await supabaseDelete(`admin_discounts?id=eq.${encodeURIComponent(id)}`);
  } catch (error) {
    warnCatalogFallbackOnce(
      "discount-delete",
      "Discount could not be deleted from Supabase; in-memory fallback was updated.",
      error,
    );
  }
}

export async function getAdminCatalogSettings() {
  const fallback = getSettingsFallback();

  try {
    const rows = await supabaseSelect<SettingRow[]>(
      "admin_settings?select=key,value&key=eq.catalog&limit=1",
    );
    const value = rows?.[0]?.value;

    if (value) {
      const next = normalizeSettings({ ...fallback, ...value });
      globalForCatalog.__varsappAdminSettings = next;
      return next;
    }
  } catch (error) {
    warnCatalogFallbackOnce(
      "settings-load",
      "Catalog settings could not be loaded; using default fallback.",
      error,
    );
  }

  return fallback;
}

export async function updateAdminCatalogSettings(patch: Partial<AdminCatalogSettings>) {
  const next = normalizeSettings({ ...(await getAdminCatalogSettings()), ...patch });
  globalForCatalog.__varsappAdminSettings = next;

  try {
    await supabaseUpsert("admin_settings", [{ key: "catalog", value: next }], "key");
  } catch (error) {
    warnCatalogFallbackOnce(
      "settings-persist",
      "Catalog settings could not be persisted; using in-memory fallback.",
      error,
    );
  }

  return next;
}

async function readProductOverrides() {
  const fallback = getProductFallback();

  try {
    const rows = await supabaseSelect<ProductOverrideRow[]>(
      "admin_product_overrides?select=slug,data,updated_at",
    );

    if (rows) {
      const next = new Map<string, ProductOverrideRow>();
      rows.forEach((row) => {
        next.set(row.slug, { ...row, data: normalizeProductPatch(row.data || {}) });
      });
      writeProductFallback(next);
      return next;
    }
  } catch (error) {
    warnCatalogFallbackOnce(
      "product-overrides-load",
      "Product overrides could not be loaded; using static catalog fallback.",
      error,
    );
  }

  return fallback;
}

async function readCategoryOverrides() {
  const fallback = getCategoryFallback();

  try {
    const rows = await supabaseSelect<CategoryOverrideRow[]>(
      "admin_category_overrides?select=slug,data,updated_at",
    );

    if (rows) {
      const next = new Map<string, CategoryOverrideRow>();
      rows.forEach((row) => next.set(row.slug, row));
      writeCategoryFallback(next);
      return next;
    }
  } catch (error) {
    warnCatalogFallbackOnce(
      "category-overrides-load",
      "Category overrides could not be loaded; using static category fallback.",
      error,
    );
  }

  return fallback;
}

function getProductFallback() {
  if (!globalForCatalog.__varsappAdminProductOverrides) {
    globalForCatalog.__varsappAdminProductOverrides = new Map();
  }

  return globalForCatalog.__varsappAdminProductOverrides;
}

function writeProductFallback(value: Map<string, ProductOverrideRow>) {
  globalForCatalog.__varsappAdminProductOverrides = value;
}

function getCategoryFallback() {
  if (!globalForCatalog.__varsappAdminCategoryOverrides) {
    globalForCatalog.__varsappAdminCategoryOverrides = new Map();
  }

  return globalForCatalog.__varsappAdminCategoryOverrides;
}

function writeCategoryFallback(value: Map<string, CategoryOverrideRow>) {
  globalForCatalog.__varsappAdminCategoryOverrides = value;
}

function getDiscountFallback() {
  if (!globalForCatalog.__varsappAdminDiscounts) {
    globalForCatalog.__varsappAdminDiscounts = new Map();
  }

  return globalForCatalog.__varsappAdminDiscounts;
}

function getSettingsFallback() {
  if (!globalForCatalog.__varsappAdminSettings) {
    globalForCatalog.__varsappAdminSettings = DEFAULT_SETTINGS;
  }

  return globalForCatalog.__varsappAdminSettings;
}

function normalizeProductPatch(data: ProductOverrideData) {
  return {
    ...data,
    adminNote: data.adminNote?.trim() || "",
    discountPercent: clampNumber(data.discountPercent, 0, 100),
    discountPrice: data.discountPrice?.trim() || "",
    minDays: clampNumber(data.minDays, 1, 365),
    stock: clampNumber(data.stock, 0, 9999),
  };
}

function normalizeSettings(value: Partial<AdminCatalogSettings>): AdminCatalogSettings {
  return {
    adminNotes: value.adminNotes?.trim() || "",
    defaultMinDays: clampNumber(value.defaultMinDays, 1, 365),
    freeCargo: value.freeCargo ?? true,
    storeEditMode: value.storeEditMode === "live" ? "live" : "preview",
  };
}

function clampNumber(value: unknown, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number.parseInt(String(value || ""), 10);

  if (!Number.isFinite(parsed)) {
    return min;
  }

  return Math.min(max, Math.max(min, parsed));
}

function mapDiscountRow(row: DiscountRow): AdminDiscount {
  return {
    endsAt: row.ends_at || "",
    id: row.id,
    isActive: row.is_active ?? true,
    name: row.name || "İndirim",
    startsAt: row.starts_at || "",
    target: row.target || "all",
    targetValue: row.target_value || "",
    type: row.type || "percentage",
    updatedAt: row.updated_at || new Date().toISOString(),
    value: row.value || 0,
  };
}

function warnCatalogFallbackOnce(key: string, message: string, error: unknown) {
  if (!globalForCatalog.__varsappAdminCatalogWarnings) {
    globalForCatalog.__varsappAdminCatalogWarnings = new Set();
  }

  if (globalForCatalog.__varsappAdminCatalogWarnings.has(key)) {
    return;
  }

  globalForCatalog.__varsappAdminCatalogWarnings.add(key);
  console.warn(`${message} ${formatCatalogError(error)}`);
}

function formatCatalogError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/^Supabase request failed \((\d+)\): (.*)$/);

  if (!match) {
    return message;
  }

  try {
    const payload = JSON.parse(match[2]) as { message?: string };
    return `Supabase ${match[1]}: ${payload.message || match[2]}`;
  } catch {
    return `Supabase ${match[1]}: ${match[2]}`;
  }
}

function mapDiscountMutation(discount: AdminDiscount) {
  return {
    ends_at: discount.endsAt || null,
    id: discount.id,
    is_active: discount.isActive,
    name: discount.name,
    starts_at: discount.startsAt || null,
    target: discount.target,
    target_value: discount.targetValue || null,
    type: discount.type,
    updated_at: discount.updatedAt,
    value: discount.value,
  };
}
