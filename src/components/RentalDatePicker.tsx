"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/Calendar";
import {
  addDaysToDateValue,
  countRentalDays,
  formatDateDisplay,
  getEarliestStartDate,
  validateRentalDates,
} from "@/lib/rental-dates";

type RentalDatePickerProps = {
  minDays: number;
  onChange?: (value: { startDate: string; endDate: string; days: number }) => void;
  productSlug?: string;
};

export function RentalDatePicker({ minDays, onChange, productSlug }: RentalDatePickerProps) {
  const earliestStart = getEarliestStartDate();
  const [startDate, setStartDate] = useState(earliestStart);
  const [endDate, setEndDate] = useState(addDaysToDateValue(earliestStart, minDays));
  const [fullyBookedDates, setFullyBookedDates] = useState<string[]>([]);
  const [openField, setOpenField] = useState<"start" | "end" | null>(null);
  const days = useMemo(() => countRentalDays(startDate, endDate), [startDate, endDate]);
  const error = validateRentalDates({ startDate, endDate, minDays });
  const bookingError = checkBookingConflict(startDate, endDate, fullyBookedDates);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productSlug) return;

    fetch(`/api/availability?slug=${encodeURIComponent(productSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.fullyBookedDates) {
          setFullyBookedDates(data.fullyBookedDates);
        }
      })
      .catch(() => {
        // silently fail - booking will still work without availability info
      });
  }, [productSlug]);

  useEffect(() => {
    if (!openField) return;

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenField(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openField]);

  function updateDates(nextStart: string, nextEnd: string) {
    setStartDate(nextStart);
    setEndDate(nextEnd);
    onChange?.({
      startDate: nextStart,
      endDate: nextEnd,
      days: countRentalDays(nextStart, nextEnd),
    });
  }

  function handleStartSelect(value: string) {
    const clampedStart = value < earliestStart ? earliestStart : value;
    const nextEnd =
      clampedStart >= endDate || countRentalDays(clampedStart, endDate) < minDays
        ? addDaysToDateValue(clampedStart, minDays)
        : endDate;
    updateDates(clampedStart, nextEnd);
    setOpenField(null);
  }

  function handleEndSelect(value: string) {
    updateDates(startDate, value);
    setOpenField(null);
  }

  const endMinDate = addDaysToDateValue(startDate, minDays);

  return (
    <div className="date-picker-mock" ref={wrapperRef}>
      <div className="date-picker-heading">
        <h2>Kiralama tarihleri</h2>
        <span>{minDays} gün min.</span>
      </div>
      <div className="date-grid">
        <div className="date-field">
          <label>
            <span>Başlangıç</span>
            <button
              type="button"
              className="date-field-trigger"
              onClick={() => setOpenField(openField === "start" ? null : "start")}
            >
              {formatDateDisplay(startDate)}
            </button>
            <CalendarDays
              size={18}
              onClick={() => setOpenField(openField === "start" ? null : "start")}
              style={{ cursor: "pointer" }}
            />
          </label>
          {openField === "start" && (
            <div className="custom-calendar-popover">
              <Calendar
                value={startDate}
                minDate={earliestStart}
                blockedDates={fullyBookedDates}
                onSelect={handleStartSelect}
              />
            </div>
          )}
        </div>
        <div className="date-field">
          <label>
            <span>Bitiş</span>
            <button
              type="button"
              className="date-field-trigger"
              onClick={() => setOpenField(openField === "end" ? null : "end")}
            >
              {formatDateDisplay(endDate)}
            </button>
            <CalendarDays
              size={18}
              onClick={() => setOpenField(openField === "end" ? null : "end")}
              style={{ cursor: "pointer" }}
            />
          </label>
          {openField === "end" && (
            <div className="custom-calendar-popover">
              <Calendar
                value={endDate}
                minDate={endMinDate}
                blockedDates={fullyBookedDates}
                onSelect={handleEndSelect}
              />
            </div>
          )}
        </div>
      </div>
      <p className={`date-picker-summary${error || bookingError ? " error" : ""}`}>
        {error || bookingError || `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)} (${days} gün)`}
      </p>
    </div>
  );
}

function checkBookingConflict(startDate: string, endDate: string, fullyBookedDates: string[]): string | null {
  if (!fullyBookedDates.length) return null;

  const days = countRentalDays(startDate, endDate);
  const start = new Date(`${startDate}T00:00:00`);

  for (let i = 0; i < days; i++) {
    const current = new Date(start);
    current.setDate(current.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];
    if (fullyBookedDates.includes(dateStr)) {
      return `${formatDateDisplay(dateStr)} tarihinde ürün tamamen dolu. Lütfen başka tarih seçiniz.`;
    }
  }

  return null;
}
