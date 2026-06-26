import { getCurrentCustomerAccount, updateCustomerAccount } from "@/lib/customer-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    account: await getCurrentCustomerAccount(),
  });
}

export async function PATCH(request: Request) {
  const account = await getCurrentCustomerAccount();

  if (!account) {
    return Response.json({ error: "Oturum bulunamadı." }, { status: 401 });
  }

  let body: {
    city?: string;
    currentPassword?: string;
    email?: string;
    name?: string;
    newPassword?: string;
    phone?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (typeof body.name === "string" && !body.name.trim()) {
    return Response.json({ error: "İsim boş olamaz." }, { status: 400 });
  }

  if (typeof body.email === "string" && !body.email.trim()) {
    return Response.json({ error: "E-posta boş olamaz." }, { status: 400 });
  }

  let updated;
  try {
    updated = await updateCustomerAccount(account.id, {
      city: body.city,
      currentPassword: body.currentPassword,
      email: body.email,
      name: body.name,
      newPassword: body.newPassword,
      phone: body.phone,
    });
  } catch (err: unknown) {
    const status = err instanceof Error && "status" in err ? (err as { status: number }).status : 400;
    const message = err instanceof Error ? err.message : "Profil güncellenemedi.";
    return Response.json({ error: message }, { status });
  }

  return Response.json({ account: updated });
}
