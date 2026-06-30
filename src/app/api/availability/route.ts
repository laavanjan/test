import { listRentalOrders } from "@/lib/rental-orders";
import { getStoreProduct } from "@/lib/store-catalog";
import { countRentalDays } from "@/lib/rental-dates";
import { listAdminCatalogProducts } from "@/lib/admin-catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "slug parameter required" }, { status: 400 });
  }

  const product = await getStoreProduct(slug);
  if (!product) {
    return Response.json({ error: "product not found" }, { status: 404 });
  }

  const adminProducts = await listAdminCatalogProducts();
  const adminProduct = adminProducts.find((p) => p.slug === slug);
  const stock = adminProduct?.stock ?? 1;

  const orders = listRentalOrders();
  const bookingCounts = new Map<string, number>();

  for (const order of orders) {
    if (order.product.slug !== slug) continue;

    const statuses = ["paid_pending_owner_approval", "owner_approved"];
    if (!statuses.includes(order.status)) continue;

    const startDate = new Date(`${order.startDate}T00:00:00`);
    const days = countRentalDays(order.startDate, order.endDate);

    for (let i = 0; i < days; i++) {
      const current = new Date(startDate);
      current.setDate(current.getDate() + i);
      const dateStr = current.toISOString().split("T")[0];
      const count = bookingCounts.get(dateStr) ?? 0;
      bookingCounts.set(dateStr, count + 1);
    }
  }

  const fullyBookedDates = Array.from(bookingCounts.entries())
    .filter(([_, count]) => count >= stock)
    .map(([date]) => date);

  return Response.json({
    fullyBookedDates,
    stock,
  });
}
