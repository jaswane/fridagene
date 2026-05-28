import { getSupportedYears, isSupportedYear } from "./years";

export type YearPageKind =
  | "helligdager"
  | "arbeidsdager"
  | "langhelger"
  | "inneklemte-dager"
  | "fa-mest-fri"
  | "flaggdager"
  | "paske"
  | "pinse"
  | "jul"
  | "mai";

export interface YearSlug {
  kind: YearPageKind;
  year: number;
}

// Alle år-spesifikke sidetyper deler samme årsvindu (2025 .. inneværende
// år + 10). Datomotoren er deterministisk for alle disse årene, så det er
// ingen grunn til å begrense enkelte sidetyper til et kortere spenn.
//
// Sortert lengst-prefiks først, slik at f.eks. "inneklemte-dager-2026" og
// "fa-mest-fri-2026" matches før kortere prefikser.
const KINDS: YearPageKind[] = [
  "inneklemte-dager",
  "fa-mest-fri",
  "flaggdager",
  "helligdager",
  "arbeidsdager",
  "langhelger",
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
    if (!/^\d{4}$/.test(tail)) return null;
    const year = Number(tail);
    if (!isSupportedYear(year)) return null;
    return { kind, year };
  }
  return null;
}

/** Alle slugs som prebuilds. Beregnes ved build mot inneværende årsvindu. */
export function allYearSlugs(): { slug: string }[] {
  const years = getSupportedYears();
  const out: { slug: string }[] = [];
  for (const kind of KINDS) {
    for (const y of years) {
      out.push({ slug: `${kind}-${y}` });
    }
  }
  return out;
}
