/**
 * Offisielle norske flaggdager.
 *
 * Kilde: basert på offisiell oversikt over norske flaggdager (Forskrift om
 * flagging fra statens bygninger m.v. og offisielle bevegelige flaggdager).
 *
 * En flaggdag er IKKE automatisk en fridag. Statlige virksomheter skal flagge,
 * mens kommuner og private kan ha egne rutiner. Noen flaggdager faller sammen
 * med offentlige helligdager (f.eks. 1. juledag, 1. mai, 17. mai) — det er
 * helligdag-statusen som gir fri, ikke flaggdag-statusen.
 */

import {
  addDays,
  dateOf,
  easterSunday,
  isoDate,
  publicHolidays,
  type Holiday,
} from "./holidays";

export type FlagDayKind = "fast" | "bevegelig" | "betinget";

export interface FlagDay {
  /** ISO-dato yyyy-mm-dd */
  date: string;
  /** Norsk navn / anledning */
  name: string;
  /** Hvordan dagen bestemmes */
  kind: FlagDayKind;
  /** Stabilt id-slug per anledning */
  id: string;
  /** Hvis dagen også er offentlig helligdag */
  alsoPublicHoliday?: boolean;
  /** Valgfri ekstra forklaring */
  note?: string;
}

/** Faste flaggdager (samme dato hvert år). */
const FIXED: Omit<FlagDay, "date">[] = [
  { id: "1-nyttarsdag", name: "1. nyttårsdag", kind: "fast" },
  {
    id: "prinsesse-ingrid-alexandra",
    name: "H.K.H. Prinsesse Ingrid Alexandras fødselsdag",
    kind: "fast",
  },
  { id: "samefolkets-dag", name: "Samefolkets dag", kind: "fast" },
  {
    id: "kong-harald",
    name: "H.M. Kong Harald Vs fødselsdag",
    kind: "fast",
  },
  { id: "arbeidernes-dag", name: "Offentlig høytidsdag (1. mai)", kind: "fast" },
  { id: "frigjoringsdagen", name: "Frigjøringsdagen 1945", kind: "fast" },
  { id: "grunnlovsdagen", name: "Grunnlovsdagen", kind: "fast" },
  {
    id: "unionsopplosningen",
    name: "Unionsoppløsningen 1905",
    kind: "fast",
  },
  {
    id: "dronning-sonja",
    name: "H.M. Dronning Sonjas fødselsdag",
    kind: "fast",
  },
  {
    id: "kronprins-haakon",
    name: "H.K.H. Kronprins Haakon Magnus' fødselsdag",
    kind: "fast",
  },
  { id: "olsokdagen", name: "Olsokdagen", kind: "fast" },
  {
    id: "kronprinsesse-mette-marit",
    name: "H.K.H. Kronprinsesse Mette-Marits fødselsdag",
    kind: "fast",
  },
  { id: "1-juledag", name: "1. juledag", kind: "fast" },
];

/** Dato (måned/dag) for de faste flaggdagene, i samme rekkefølge som FIXED. */
const FIXED_DATES: { m: number; d: number }[] = [
  { m: 1, d: 1 },
  { m: 1, d: 21 },
  { m: 2, d: 6 },
  { m: 2, d: 21 },
  { m: 5, d: 1 },
  { m: 5, d: 8 },
  { m: 5, d: 17 },
  { m: 6, d: 7 },
  { m: 7, d: 4 },
  { m: 7, d: 20 },
  { m: 7, d: 29 },
  { m: 8, d: 19 },
  { m: 12, d: 25 },
];

/**
 * Kjente stortingsvalg-dager (mandag i september hvert 4. år). Vi tar BARE
 * med dager som er offisielt fastsatt — ikke gjett fremtidige år.
 */
const STORTINGSVALG: Record<number, string> = {
  2021: "2021-09-13",
  2025: "2025-09-08",
};

/**
 * Returnerer alle offisielle flaggdager for året, sortert kronologisk.
 * Markerer hvilke som også er offentlige helligdager.
 */
export function flagDays(y: number): FlagDay[] {
  const easter = easterSunday(y);
  const publicSet = new Set(publicHolidays(y).map((h) => h.date));

  const list: FlagDay[] = FIXED.map((f, i) => {
    const { m, d } = FIXED_DATES[i];
    const iso = isoDate(dateOf(y, m, d));
    return { ...f, date: iso };
  });

  // Bevegelige flaggdager
  list.push({
    id: "1-paskedag",
    name: "1. påskedag",
    date: isoDate(easter),
    kind: "bevegelig",
  });
  list.push({
    id: "1-pinsedag",
    name: "1. pinsedag",
    date: isoDate(addDays(easter, 49)),
    kind: "bevegelig",
  });

  // Stortingsvalg — kun for år der datoen er kjent og fastsatt
  if (STORTINGSVALG[y]) {
    list.push({
      id: "stortingsvalg",
      name: "Stortingsvalg (valgdagen)",
      date: STORTINGSVALG[y],
      kind: "betinget",
      note: "Flaggdag ved stortings- og sametingsvalg.",
    });
  }

  for (const f of list) {
    if (publicSet.has(f.date)) f.alsoPublicHoliday = true;
  }

  return list.sort((a, b) => a.date.localeCompare(b.date));
}

/** Henter den offentlige helligdagen som matcher en gitt flaggdag (om noen). */
export function publicHolidayForFlagDay(f: FlagDay, y: number): Holiday | undefined {
  return publicHolidays(y).find((h) => h.date === f.date);
}
