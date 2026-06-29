import { headers } from "next/headers";
import { isAdminRequestAuthorized, adminUnauthorizedResponse } from "@/lib/admin-auth";
import { supabaseDelete, supabaseInsert, supabaseSelect } from "@/lib/supabase-admin";

export type CustomProductRow = {
  badge: string | null;
  category: string;
  category_slug: string;
  created_at: string;
  description: string;
  featured: boolean;
  id: string;
  image: string;
  location: string;
  min_days: number;
  name: string;
  old_price: string | null;
  owner: string;
  price: string;
  slug: string;
};

export async function GET() {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  try {
    const rows = await supabaseSelect<CustomProductRow[]>("custom_products?order=created_at.desc");
    return Response.json({ rows: rows ?? [] });
  } catch {
    return Response.json({ rows: [] });
  }
}

export async function POST(req: Request) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const body = await req.json();
  const { name, category, categorySlug, price, oldPrice, minDays, image, owner, location, description, badge, featured } = body;

  if (!name || !category || !categorySlug || !price || !image || !owner || !location) {
    return Response.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const slug = slugify(name) + "-" + Date.now();
  const row: Omit<CustomProductRow, "id"> = {
    badge: badge || null,
    category,
    category_slug: categorySlug,
    created_at: new Date().toISOString(),
    description: description || "",
    featured: Boolean(featured),
    image,
    location,
    min_days: Math.max(3, Number(minDays) || 3),
    name,
    old_price: oldPrice || null,
    owner,
    price,
    slug,
  };

  try {
    await supabaseInsert("custom_products", [row]);
    return Response.json({ ok: true, slug });
  } catch (error) {
    return Response.json({ error: "Ürün kaydedilemedi.", detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isAdminRequestAuthorized(await headers())) {
    return adminUnauthorizedResponse();
  }

  const { slug } = await req.json();

  if (!slug) {
    return Response.json({ error: "Slug gerekli." }, { status: 400 });
  }

  try {
    await supabaseDelete(`custom_products?slug=eq.${encodeURIComponent(slug)}`);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Ürün silinemedi.", detail: String(error) }, { status: 500 });
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
