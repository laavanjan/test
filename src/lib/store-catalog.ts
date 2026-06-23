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

export async function getStoreProducts(): Promise<Product[]> {
  const products = await listAdminCatalogProducts();

  return products.filter((product) => product.isActive);
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
  const activeProducts = await getStoreProducts();

  if (slug === "tum-kategoriler") {
    return activeProducts;
  }

  const activeBySlug = new Map(activeProducts.map((product) => [product.slug, product]));

  return staticProductsByCategory(slug)
    .map((product) => activeBySlug.get(product.slug))
    .filter((product): product is Product => Boolean(product));
}
