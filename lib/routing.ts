import { SUPPORTED_YEARS, type SupportedYear } from "./site";

export type YearPageKind =
  | "helligdager"
  | "arbeidsdager"
  | "langhelger"
  | "inneklemte-dager"
  | "paske"
  | "pinse"
  | "jul"
  | "mai";

export interface YearSlug {
  kind: YearPageKind;
  year: SupportedYear;
}

const LANGHELG_YEARS: readonly number[] = [
  2025, 2026, 2027, 2028, 2029, 2030,
];
const INNEKLEMT_YEARS: readonly number[] = [
  2025, 2026, 2027, 2028, 2029, 2030,
];
const SEASON_YEARS: readonly number[] = [2025, 2026, 2027, 2028];

const YEARS_BY_KIND: Record<YearPageKind, readonly number[]> = {
  helligdager: SUPPORTED_YEARS,
  arbeidsdager: SUPPORTED_YEARS,
  langhelger: LANGHELG_YEARS,
  "inneklemte-dager": INNEKLEMT_YEARS,
  paske: SEASON_YEARS,
  pinse: SEASON_YEARS,
  jul: SEASON_YEARS,
  mai: SEASON_YEARS,
};

const KINDS: YearPageKind[] = [
  "helligdager",
  "arbeidsdager",
  "langhelger",
  "inneklemte-dager",
  "paske",
  "pinse",
  "jul",
  "mai",
];

export function parseYearSlug(slug: string): YearSlug | null {
  for (const kind of KINDS) {
    const prefix = `${kind}-`;
    if (!slug.startsWith(prefix)) continue;
    const tail = slug.slice(prefix.length);
    const year = Number(tail);
    if (!Number.isInteger(year)) return null;
    if (!YEARS_BY_KIND[kind].includes(year)) return null;
    if (!(SUPPORTED_YEARS as readonly number[]).includes(year)) return null;
    return { kind, year: year as SupportedYear };
  }
  return null;
}

export function allYearSlugs(): { slug: string }[] {
  const out: { slug: string }[] = [];
  for (const kind of KINDS) {
    for (const y of YEARS_BY_KIND[kind]) {
      out.push({ slug: `${kind}-${y}` });
    }
  }
  return out;
}
