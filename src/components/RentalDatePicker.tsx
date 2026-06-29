"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  addDaysToDateValue,
  countRentalDays,
  formatDateDisplay,
  getTodayDateValue,
  validateRentalDates,
} from "@/lib/rental-dates";

type RentalDatePickerProps = {
  minDays: number;
  onChange?: (value: { startDate: string; endDate: string; days: number }) => void;
};

export function RentalDatePicker({ minDays, onChange }: RentalDatePickerProps) {
  const today = getTodayDateValue();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(addDaysToDateValue(today, minDays));
  const days = useMemo(() => countRentalDays(startDate, endDate), [startDate, endDate]);
  const error = validateRentalDates({ startDate, endDate, minDays });

  function updateDates(nextStart: string, nextEnd: string) {
    setStartDate(nextStart);
    setEndDate(nextEnd);
    onChange?.({
      startDate: nextStart,
      endDate: nextEnd,
      days: countRentalDays(nextStart, nextEnd),
    });
  }

  function handleStartChange(value: string) {
    const nextEnd =
      value >= endDate || countRentalDays(value, endDate) < minDays
        ? addDaysToDateValue(value, minDays)
        : endDate;
    updateDates(value, nextEnd);
  }

  function handleEndChange(value: string) {
    updateDates(startDate, value);
  }

  return (
    <div className="date-picker-mock">
      <div className="date-picker-heading">
        <h2>Kiralama tarihleri</h2>
        <span>{minDays} gün min.</span>
      </div>
      <div className="date-grid">
        <label>
          <span>Başlangıç</span>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(event) => handleStartChange(event.target.value)}
          />
          <CalendarDays size={18} />
        </label>
        <label>
          <span>Bitiş</span>
          <input
            type="date"
            value={endDate}
            min={addDaysToDateValue(startDate, minDays)}
            onChange={(event) => handleEndChange(event.target.value)}
          />
          <CalendarDays size={18} />
        </label>
      </div>
      <p className={`date-picker-summary${error ? " error" : ""}`}>
        {error ?? `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)} (${days} gün)`}
      </p>
    </div>
  );
}
