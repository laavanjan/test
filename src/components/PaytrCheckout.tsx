import { CalendarDays, CreditCard, PackageCheck, ShieldCheck } from "lucide-react";
import type { PaytrDirectForm } from "@/lib/paytr";
import type { RentalOrder } from "@/lib/rental-orders";
import { formatKurusAsCurrency } from "@/lib/money";

type PaytrCheckoutProps = {
  form: PaytrDirectForm;
  order: RentalOrder;
};

export function PaytrCheckout({ form, order }: PaytrCheckoutProps) {
  const basketItems = order.basketItems?.length ? order.basketItems : [order];

  return (
    <div className="checkout-direct">
      <div className="checkout-main">
        <div className="checkout-heading">
          <div>
            <p>Kiralama ödemesi</p>
            <h1>PayTR 3D Secure ile tamamla</h1>
          </div>
          {form.testMode ? <span>Test modu</span> : null}
        </div>

        <form
          acceptCharset="UTF-8"
          action={form.action}
          className="direct-payment-form"
          method={form.method}
        >
          {form.fields.map((field) => (
            <input
              key={`${field.name}-${field.value}`}
              name={field.name}
              type="hidden"
              value={field.value}
            />
          ))}

          <div className="payment-field full">
            <label htmlFor="cc_owner">Kart üzerindeki ad soyad</label>
            <input
              autoComplete="cc-name"
              id="cc_owner"
              maxLength={50}
              name="cc_owner"
              placeholder="Ad Soyad"
              required
            />
          </div>

          <div className="payment-field full">
            <label htmlFor="card_number">Kart numarası</label>
            <input
              autoComplete="cc-number"
              id="card_number"
              inputMode="numeric"
              maxLength={16}
              name="card_number"
              pattern="[0-9]{13,16}"
              placeholder="0000000000000000"
              required
            />
          </div>

          <div className="payment-field">
            <label htmlFor="expiry_month">Ay</label>
            <input
              autoComplete="cc-exp-month"
              id="expiry_month"
              inputMode="numeric"
              maxLength={2}
              name="expiry_month"
              pattern="0?[1-9]|1[0-2]"
              placeholder="12"
              required
            />
          </div>

          <div className="payment-field">
            <label htmlFor="expiry_year">Yıl</label>
            <input
              autoComplete="cc-exp-year"
              id="expiry_year"
              inputMode="numeric"
              maxLength={2}
              name="expiry_year"
              pattern="[0-9]{2}"
              placeholder="30"
              required
            />
          </div>

          <div className="payment-field">
            <label htmlFor="cvv">CVV</label>
            <input
              autoComplete="cc-csc"
              id="cvv"
              inputMode="numeric"
              maxLength={4}
              name="cvv"
              pattern="[0-9]{3,4}"
              placeholder="000"
              required
            />
          </div>

          {form.cardStorageEnabled ? (
            <label className="store-card-choice">
              <input defaultChecked name="store_card" type="checkbox" value="1" />
              <span>Kartımı PayTR’da güvenli şekilde sakla</span>
            </label>
          ) : null}

          <button className="rent-button" type="submit">
            Ödemeye devam et
          </button>
        </form>
      </div>

      <aside className="checkout-side">
        <div className="checkout-summary compact">
          <div>
            <span>Sipariş No</span>
            <strong>{order.merchantOid}</strong>
          </div>
          <div>
            <span>Ürün</span>
            <strong>
              {basketItems.length > 1 ? `${basketItems.length} ürünlü kiralama` : order.product.name}
            </strong>
          </div>
          {basketItems.length > 1 ? (
            <div className="checkout-items">
              {basketItems.map((item) => (
                <p key={item.product.slug}>
                  <span>{item.product.name}</span>
                  <small>
                    {formatDate(item.startDate)} - {formatDate(item.endDate)} · {item.days} gün
                  </small>
                </p>
              ))}
            </div>
          ) : null}
          <div>
            <span>Kiralama</span>
            <strong>{formatDate(order.startDate)} - {formatDate(order.endDate)}</strong>
          </div>
          <div>
            <span>Tutar</span>
            <strong>{formatKurusAsCurrency(order.totalKurus)}</strong>
          </div>
        </div>

        <div className="checkout-flow">
          <p><CalendarDays size={18} /> Tarih ve stok kontrolü</p>
          <p><CreditCard size={18} /> PayTR kart doğrulama</p>
          <p><ShieldCheck size={18} /> Callback ile kesin ödeme sonucu</p>
          <p><PackageCheck size={18} /> Ürün sahibi onayına hazırlık</p>
        </div>
      </aside>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
