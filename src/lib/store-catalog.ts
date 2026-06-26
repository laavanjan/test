import "server-only";

import {
  categories,
  productsByCategory as staticProductsByCategory,
  type Product,
} from "@/data/products";
import {
  listAdminCatalogProducts,
  listAdminCategories,
} from "@/lib/admin-catalog";
import { supabaseSelect } from "@/lib/supabase-admin";
import type { CustomProductRow } from "@/app/api/admin/custom-products/route";

async function getCustomProducts(): Promise<Product[]> {
  try {
    const rows = await supabaseSelect<CustomProductRow[]>("custom_products?order=created_at.desc");
    if (!rows?.length) return [];

    return rows.map((row) => ({
      badge: row.badge ?? undefined,
      category: row.category,
      categorySlug: row.category_slug,
      description: row.description ? row.description.split("\n").filter(Boolean) : [],
      featured: row.featured,
      gallery: [row.image],
      image: row.image,
      location: row.location,
      minDays: row.min_days,
      name: row.name,
      oldPrice: row.old_price ?? undefined,
      owner: row.owner,
      price: row.price,
      sku: row.id,
      slug: row.slug,
    }));
  } catch {
    return [];
  }
}

export async function getStoreProducts(): Promise<Product[]> {
  const [catalogProducts, customProducts] = await Promise.all([
    listAdminCatalogProducts(),
    getCustomProducts(),
  ]);

  const staticActive = catalogProducts.filter((product) => product.isActive);
  const staticSlugs = new Set(staticActive.map((p) => p.slug));
  const uniqueCustom = customProducts.filter((p) => !staticSlugs.has(p.slug));

  return [...staticActive, ...uniqueCustom];
}

export async function getStoreProduct(slug: string) {
  const products = await getStoreProducts();

  return products.find((product) => product.slug === slug);
}

export async function getStoreCategories() {
  const adminCategories = await listAdminCategories();
  const activeBySlug = new Map(adminCategories.map((category) => [category.slug, category]));

  return categories
    .map((category) => activeBySlug.get(category.slug) || {
      isActive: true,
      name: category.name,
      slug: category.slug,
      sortOrder: categories.findIndex((item) => item.slug === category.slug) + 1,
    })
    .filter((category) => category.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "tr"))
    .map((category) => ({
      name: category.name,
      slug: category.slug,
    }));
}

export async function getStoreProductsByCategory(slug: string) {
  const allProducts = await getStoreProducts();

  if (slug === "tum-kategoriler") {
    return allProducts;
  }

  return allProducts.filter((product) => product.categorySlug === slug);
}
