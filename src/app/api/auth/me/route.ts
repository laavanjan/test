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
    address?: string;
    city?: string;
    country?: string;
    currentPassword?: string;
    district?: string;
    email?: string;
    iban?: string;
    mobile_phone?: string;
    name?: string;
    newPassword?: string;
    phone?: string;
    referral_source?: string;
    surname?: string;
    tax_number?: string;
    tax_office?: string;
    tr_identity_number?: string;
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
      address: body.address,
      city: body.city,
      country: body.country,
      currentPassword: body.currentPassword,
      district: body.district,
      email: body.email,
      iban: body.iban,
      mobile_phone: body.mobile_phone,
      name: body.name,
      newPassword: body.newPassword,
      phone: body.phone,
      referral_source: body.referral_source,
      surname: body.surname,
      tax_number: body.tax_number,
      tax_office: body.tax_office,
      tr_identity_number: body.tr_identity_number,
    });
  } catch (err: unknown) {
    const status = err instanceof Error && "status" in err ? (err as { status: number }).status : 400;
    const message = err instanceof Error ? err.message : "Profil güncellenemedi.";
    return Response.json({ error: message }, { status });
  }

  return Response.json({ account: updated });
}
