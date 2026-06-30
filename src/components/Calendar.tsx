"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateInputValue } from "@/lib/rental-dates";

const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

type CalendarProps = {
  blockedDates?: string[];
  minDate: string;
  onSelect: (date: string) => void;
  value: string;
};

export function Calendar({ blockedDates = [], minDate, onSelect, value }: CalendarProps) {
  const initial = new Date(`${value}T12:00:00`);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: Array<number | null> = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function dateStrFor(day: number) {
    return formatDateInputValue(new Date(viewYear, viewMonth, day, 12));
  }

  function goPrevMonth() {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function goNextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  return (
    <div className="custom-calendar" onClick={(event) => event.stopPropagation()}>
      <div className="custom-calendar-header">
        <button type="button" onClick={goPrevMonth} aria-label="Önceki ay">
          <ChevronLeft size={16} />
        </button>
        <strong>
          {MONTHS[viewMonth]} {viewYear}
        </strong>
        <button type="button" onClick={goNextMonth} aria-label="Sonraki ay">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="custom-calendar-weekdays">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="custom-calendar-grid">
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} className="custom-calendar-empty" />;
          }

          const dateStr = dateStrFor(day);
          const isBlocked = blockedDates.includes(dateStr);
          const isPast = dateStr < minDate;
          const isDisabled = isBlocked || isPast;
          const isSelected = dateStr === value;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              title={isBlocked ? "Bu tarih dolu" : undefined}
              className={[
                "custom-calendar-day",
                isSelected ? "selected" : "",
                isBlocked ? "blocked" : "",
                isPast ? "past" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSelect(dateStr)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
