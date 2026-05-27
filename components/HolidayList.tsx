import type { Holiday } from "@/lib/holidays";
import { formatNorwegianDate, formatNorwegianWeekday, parseIso } from "@/lib/holidays";

export function HolidayList({
  holidays,
  showKind = true,
}: {
  holidays: Holiday[];
  showKind?: boolean;
}) {
  return (
    <ul className="card divide-y divide-line/70">
      {holidays.map((h) => {
        const d = parseIso(h.date);
        const weekday = formatNorwegianWeekday(d);
        return (
          <li
            key={h.id + h.date}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3"
          >
            <div className="sm:w-44 shrink-0">
              <div className="text-ink font-medium">{formatNorwegianDate(d)}</div>
              <div className="text-xs text-muted capitalize">{weekday}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-ink font-medium">{h.name}</span>
                {showKind && (
                  <span
                    className={
                      h.kind === "public"
                        ? "chip-tag"
                        : "chip-tag chip-tag--practical"
                    }
                  >
                    {h.kind === "public" ? "Offentlig helligdag" : "Praktisk fridag"}
                  </span>
                )}
              </div>
              {h.note && (
                <p className="text-sm text-muted mt-1">{h.note}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
