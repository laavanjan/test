export function parseTurkishLiraToKurus(value: string) {
  const normalized = value
    .replace(/\s*TL\s*/i, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const amount = Number.parseFloat(normalized);

  if (!Number.isFinite(amount)) {
    throw new Error(`Gecersiz fiyat formati: ${value}`);
  }

  return Math.round(amount * 100);
}

export function formatKurusAsPaytrPrice(kurus: number) {
  return (kurus / 100).toFixed(2);
}

export function formatKurusAsCurrency(kurus: number) {
  return new Intl.NumberFormat("tr-TR", {
    currency: "TRY",
    style: "currency",
  }).format(kurus / 100);
}
