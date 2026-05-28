import { getCurrentYear } from "./currentYear";

/**
 * Sentral årsstrategi for hele Fridagene.no.
 *
 * Årsvinduet er relativt til inneværende år (Europe/Oslo), slik at siden
 * følger med over årsskifter uten manuell opprydding:
 *
 *  - FIRST_SUPPORTED_YEAR holder historiske årssider tilgjengelige for alltid
 *    (SEO/historikk: /helligdager-2025 fungerer videre).
 *  - FUTURE_YEARS_AHEAD bestemmer hvor langt fram vi publiserer/aksepterer år.
 *
 * Eksempel: er året 2026 → 2025–2036. Blir det 2027 → 2025–2037.
 *
 * Husk: sider som leser dette MÅ ha `revalidate` satt, ellers fryses
 * årsvinduet på build-tidspunktet. Catch-all-ruten bruker i tillegg
 * `dynamicParams = true` slik at år innenfor vinduet kan rendres on-demand
 * etter et årsskifte selv uten ny deploy.
 */

export const FIRST_SUPPORTED_YEAR = 2025;
export const FUTURE_YEARS_AHEAD = 10;

/** Inneværende år i Europe/Oslo. */
export function currentYear(): number {
  return getCurrentYear();
}

/** Øvre grense: inneværende år + FUTURE_YEARS_AHEAD. */
export function maxSupportedYear(cy: number = getCurrentYear()): number {
  return cy + FUTURE_YEARS_AHEAD;
}

/** Alle støttede år: FIRST_SUPPORTED_YEAR .. inneværende år + 10. */
export function getSupportedYears(cy: number = getCurrentYear()): number[] {
  const max = maxSupportedYear(cy);
  const years: number[] = [];
  for (let y = FIRST_SUPPORTED_YEAR; y <= max; y++) years.push(y);
  return years;
}

/**
 * Inneværende år + de neste `count` årene. Brukes til kompakt navigasjon
 * (f.eks. footer) der vi ikke vil liste hele spennet.
 */
export function getCurrentAndFutureYears(
  count = 2,
  cy: number = getCurrentYear()
): number[] {
  const years: number[] = [];
  for (let i = 0; i <= count; i++) years.push(cy + i);
  return years;
}

/** Et gyldig år (ikke 404), beregnet ved kalltidspunkt. */
export function isSupportedYear(
  year: number,
  cy: number = getCurrentYear()
): boolean {
  return (
    Number.isInteger(year) &&
    year >= FIRST_SUPPORTED_YEAR &&
    year <= maxSupportedYear(cy)
  );
}
