export function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function getTodayDateValue() {
  return formatDateInputValue(new Date());
}

export function addDaysToDateValue(value: string, days: number) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);

  return formatDateInputValue(date);
}

export function countRentalDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);

  return diff;
}

export function validateRentalDates({
  startDate,
  endDate,
  minDays,
}: {
  startDate: string;
  endDate: string;
  minDays: number;
}) {
  const today = getTodayDateValue();

  if (!startDate || !endDate) {
    return "Başlangıç ve bitiş tarihlerini seçmelisin.";
  }

  if (startDate < today) {
    return "Başlangıç tarihi bugünden önce olamaz.";
  }

  if (endDate <= startDate) {
    return "Bitiş tarihi başlangıç tarihinden sonra olmalı.";
  }

  const days = countRentalDays(startDate, endDate);

  if (days < minDays) {
    return `Bu ürün için minimum kiralama süresi ${minDays} gündür.`;
  }

  return null;
}
