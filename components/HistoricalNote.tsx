import { getCurrentYear } from "@/lib/currentYear";

/**
 * Diskret merknad på årssider for år som allerede er passert. Rendrer
 * ingenting for inneværende eller fremtidige år.
 */
export function HistoricalNote({ year }: { year: number }) {
  if (year >= getCurrentYear()) return null;
  return (
    <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-muted">
      Dette er en historisk oversikt for {year}.
    </p>
  );
}
