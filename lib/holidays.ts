/**
 * Norske helligdager og fridager — deterministisk beregning for 2025–2035.
 *
 * Konvensjoner:
 *  - Datoer representeres som UTC-Date kl. 00:00 for å unngå tidssone-feil.
 *  - Visning skjer via formatNorwegianDate / formatNorwegianWeekday som bruker
 *    UTC-feltene direkte, så ingen drift mellom server og klient.
 *  - "Offentlig helligdag" er lovbestemte fridager. "Praktisk fridag" er dager
 *    som julaften/nyttårsaften der mange har fri men det varierer.
 */

export type HolidayKind = "public" | "practical";

export interface Holiday {
  /** ISO-dato yyyy-mm-dd */
  date: string;
  /** Norsk navn */
  name: string;
  /** "public" = offentlig helligdag, "practical" = praktisk fridag */
  kind: HolidayKind;
  /** Stabilt id-slug per dag (f.eks. "1-juledag") */
  id: string;
  /** Valgfri ekstra forklaring */
  note?: string;
}

export interface BridgeDay {
  /** Arbeidsdag som ligger inneklemt */
  date: string;
  /** Hva som ligger på dagen før og dagen etter */
  between: { before: string; after: string };
  /** Forklaring: hvilke dager på hver side */
  description: string;
}

export interface LongWeekend {
  /** Første dag i sammenhengende fri-strekk */
  start: string;
  /** Siste dag i strekket */
  end: string;
  /** Antall sammenhengende fridager */
  days: number;
  /** Hva strekket inneholder */
  includes: { holidays: string[]; bridges: string[] };
  /**
   * Antall feriedager du må ta for å få hele strekket = antall inneklemte
   * dager som inngår. 0 = "gratis langhelg".
   */
  vacationDaysNeeded: number;
}

// ---------------------------------------------------------------------------
// Dato-helpere (alle i UTC)
// ---------------------------------------------------------------------------

export function dateOf(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function addDays(d: Date, n: number): Date {
  const out = new Date(d.getTime());
  out.setUTCDate(out.getUTCDate() + n);
  return out;
}

export function isoDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseIso(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return dateOf(y, m, d);
}

/** 0 = søndag … 6 = lørdag (matcher getUTCDay) */
export function dayOfWeek(d: Date): number {
  return d.getUTCDay();
}

export function isWeekend(d: Date): boolean {
  const w = d.getUTCDay();
  return w === 0 || w === 6;
}

const NB_WEEKDAYS = [
  "søndag",
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];
const NB_WEEKDAYS_SHORT = ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."];
const NB_MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

export function formatNorwegianWeekday(d: Date, short = false): string {
  const w = d.getUTCDay();
  return short ? NB_WEEKDAYS_SHORT[w] : NB_WEEKDAYS[w];
}

export function formatNorwegianDate(d: Date, opts?: { withWeekday?: boolean }): string {
  const day = d.getUTCDate();
  const month = NB_MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const base = `${day}. ${month} ${year}`;
  if (opts?.withWeekday) {
    return `${formatNorwegianWeekday(d)} ${day}. ${month} ${year}`;
  }
  return base;
}

export function formatNorwegianDateShort(d: Date): string {
  const day = d.getUTCDate();
  const month = NB_MONTHS[d.getUTCMonth()];
  return `${day}. ${month}`;
}

/** Dager mellom to datoer (a tidligst). Negativ hvis a > b. */
export function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86_400_000);
}

/** Returnerer dagens dato i Europe/Oslo-tid som UTC-midnatt. */
export function todayInOslo(now: Date = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = Number(parts.find((p) => p.type === "year")?.value);
  const m = Number(parts.find((p) => p.type === "month")?.value);
  const d = Number(parts.find((p) => p.type === "day")?.value);
  return dateOf(y, m, d);
}

// ---------------------------------------------------------------------------
// Påske-beregning (Gauss/Anonymous Gregorian)
// ---------------------------------------------------------------------------

/** Returnerer 1. påskedag (Easter Sunday) for år `y`. */
export function easterSunday(y: number): Date {
  const a = y % 19;
  const b = Math.floor(y / 100);
  const c = y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;
  return dateOf(y, month, day);
}

// ---------------------------------------------------------------------------
// Offentlige helligdager
// ---------------------------------------------------------------------------

/** Alle offentlige helligdager i Norge for år `y`, sortert kronologisk. */
export function publicHolidays(y: number): Holiday[] {
  const easter = easterSunday(y);
  const list: Holiday[] = [
    { id: "1-nyttarsdag", name: "1. nyttårsdag", date: isoDate(dateOf(y, 1, 1)), kind: "public" },
    { id: "skjaertorsdag", name: "Skjærtorsdag", date: isoDate(addDays(easter, -3)), kind: "public" },
    { id: "langfredag", name: "Langfredag", date: isoDate(addDays(easter, -2)), kind: "public" },
    { id: "1-paskedag", name: "1. påskedag", date: isoDate(easter), kind: "public" },
    { id: "2-paskedag", name: "2. påskedag", date: isoDate(addDays(easter, 1)), kind: "public" },
    { id: "arbeidernes-dag", name: "Arbeidernes dag", date: isoDate(dateOf(y, 5, 1)), kind: "public" },
    { id: "grunnlovsdag", name: "Grunnlovsdag", date: isoDate(dateOf(y, 5, 17)), kind: "public" },
    { id: "kristi-himmelfart", name: "Kristi himmelfartsdag", date: isoDate(addDays(easter, 39)), kind: "public" },
    { id: "1-pinsedag", name: "1. pinsedag", date: isoDate(addDays(easter, 49)), kind: "public" },
    { id: "2-pinsedag", name: "2. pinsedag", date: isoDate(addDays(easter, 50)), kind: "public" },
    { id: "1-juledag", name: "1. juledag", date: isoDate(dateOf(y, 12, 25)), kind: "public" },
    { id: "2-juledag", name: "2. juledag", date: isoDate(dateOf(y, 12, 26)), kind: "public" },
  ];
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

/** Praktiske fridager (mange har fri, men ikke offentlige helligdager). */
export function practicalDays(y: number): Holiday[] {
  const easter = easterSunday(y);
  const list: Holiday[] = [
    {
      id: "paskeaften",
      name: "Påskeaften",
      date: isoDate(addDays(easter, -1)),
      kind: "practical",
      note: "Lørdag før påske. Mange butikker har redusert åpningstid.",
    },
    {
      id: "pinseaften",
      name: "Pinseaften",
      date: isoDate(addDays(easter, 48)),
      kind: "practical",
      note: "Lørdag før pinse.",
    },
    {
      id: "julaften",
      name: "Julaften",
      date: isoDate(dateOf(y, 12, 24)),
      kind: "practical",
      note: "Ikke offentlig helligdag. Mange arbeidsplasser stenger tidlig eller helt, men det varierer.",
    },
    {
      id: "nyttarsaften",
      name: "Nyttårsaften",
      date: isoDate(dateOf(y, 12, 31)),
      kind: "practical",
      note: "Ikke offentlig helligdag. Mange har halv dag, men det varierer.",
    },
  ];
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

/** Alle dager (offentlige + praktiske) sortert kronologisk. */
export function allFridager(y: number): Holiday[] {
  return [...publicHolidays(y), ...practicalDays(y)].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

// ---------------------------------------------------------------------------
// Neste offentlige helligdag fra en gitt dato
// ---------------------------------------------------------------------------

export interface NextHolidayResult {
  holiday: Holiday;
  date: Date;
  daysUntil: number;
  isToday: boolean;
}

/** Neste offentlige helligdag på eller etter `from`. Søker opptil 2 år frem. */
export function nextPublicHoliday(from: Date): NextHolidayResult {
  const fromIso = isoDate(from);
  const y = from.getUTCFullYear();
  const candidates = [...publicHolidays(y), ...publicHolidays(y + 1), ...publicHolidays(y + 2)];
  const next = candidates.find((h) => h.date >= fromIso);
  if (!next) {
    throw new Error(`Fant ingen helligdag etter ${fromIso}`);
  }
  const date = parseIso(next.date);
  const daysUntil = daysBetween(from, date);
  return { holiday: next, date, daysUntil, isToday: daysUntil === 0 };
}

// ---------------------------------------------------------------------------
// Inneklemte dager (bridge days)
// ---------------------------------------------------------------------------

/**
 * Inneklemt dag = en vanlig arbeidsdag (man–fre, ikke helligdag) som ligger
 * mellom to ikke-arbeidsdager (helligdag eller helg).
 *
 * Eksempel: Mandag mellom en søndag-helligdag og en tirsdag-helligdag.
 * Eller fredag etter Kristi himmelfartsdag (torsdag) — fredag er da inneklemt
 * mellom torsdag-helligdag og lørdag.
 */
export function bridgeDays(y: number): BridgeDay[] {
  const holidaySet = new Set(publicHolidays(y).map((h) => h.date));
  const holidaysByDate = new Map(publicHolidays(y).map((h) => [h.date, h]));
  const result: BridgeDay[] = [];

  // Sjekk hver dag i året
  const start = dateOf(y, 1, 1);
  const end = dateOf(y, 12, 31);

  for (let d = new Date(start.getTime()); d <= end; d = addDays(d, 1)) {
    if (isWeekend(d)) continue;
    if (holidaySet.has(isoDate(d))) continue;

    const prev = addDays(d, -1);
    const next = addDays(d, 1);
    const prevIsOff = isWeekend(prev) || holidaySet.has(isoDate(prev));
    const nextIsOff = isWeekend(next) || holidaySet.has(isoDate(next));

    if (prevIsOff && nextIsOff) {
      const beforeName = labelForOffDay(prev, holidaysByDate);
      const afterName = labelForOffDay(next, holidaysByDate);
      result.push({
        date: isoDate(d),
        between: { before: beforeName, after: afterName },
        description: `Mellom ${beforeName} og ${afterName}`,
      });
    }
  }

  return result;
}

function labelForOffDay(d: Date, holidays: Map<string, Holiday>): string {
  const iso = isoDate(d);
  const h = holidays.get(iso);
  if (h) return h.name;
  const w = d.getUTCDay();
  if (w === 6) return "lørdag";
  if (w === 0) return "søndag";
  return formatNorwegianWeekday(d);
}

// ---------------------------------------------------------------------------
// Langhelger
// ---------------------------------------------------------------------------

/**
 * Langhelg = et sammenhengende strekk av ≥3 fridager (helligdag eller helg),
 * eventuelt forlenget av en inneklemt dag som vi antar man tar fri.
 *
 * Vi går gjennom året og slår sammen alle strekk av off-dager, der "off" =
 * helg + offentlig helligdag + valgfri inneklemt dag. Strekk på 3+ dager
 * regnes som langhelg.
 */
export function longWeekends(y: number): LongWeekend[] {
  const holidaysByDate = new Map(publicHolidays(y).map((h) => [h.date, h]));
  const bridgeSet = new Set(bridgeDays(y).map((b) => b.date));

  // Søk litt utover årsslutt for å fange langhelger som krysser nyttår
  const start = dateOf(y, 1, 1);
  const end = dateOf(y, 12, 31);

  const isOff = (d: Date): { off: boolean; isBridge: boolean } => {
    if (isWeekend(d)) return { off: true, isBridge: false };
    const iso = isoDate(d);
    if (holidaysByDate.has(iso)) return { off: true, isBridge: false };
    if (bridgeSet.has(iso)) return { off: true, isBridge: true };
    return { off: false, isBridge: false };
  };

  const result: LongWeekend[] = [];
  let cursor = new Date(start.getTime());

  while (cursor <= end) {
    const status = isOff(cursor);
    if (!status.off) {
      cursor = addDays(cursor, 1);
      continue;
    }
    // Vi har starten på et off-strekk
    const runStart = new Date(cursor.getTime());
    let runEnd = new Date(cursor.getTime());
    const holidays: string[] = [];
    const bridges: string[] = [];
    while (true) {
      const s = isOff(runEnd);
      if (!s.off) break;
      const iso = isoDate(runEnd);
      const h = holidaysByDate.get(iso);
      if (h) holidays.push(h.name);
      if (s.isBridge) bridges.push(iso);
      const next = addDays(runEnd, 1);
      if (next > addDays(end, 7)) break;
      const sn = isOff(next);
      if (!sn.off) break;
      runEnd = next;
    }
    const days = daysBetween(runStart, runEnd) + 1;
    // Langhelg krever ≥3 dager OG minst én helligdag (ellers er det bare en
    // vanlig helg) ELLER en inneklemt dag.
    if (days >= 3 && (holidays.length > 0 || bridges.length > 0)) {
      result.push({
        start: isoDate(runStart),
        end: isoDate(runEnd),
        days,
        includes: { holidays, bridges },
        vacationDaysNeeded: bridges.length,
      });
    }
    cursor = addDays(runEnd, 1);
  }

  return result.filter((lw) => lw.start.startsWith(String(y)));
}

// ---------------------------------------------------------------------------
// Arbeidsdager
// ---------------------------------------------------------------------------

/**
 * Arbeidsdager mellom to datoer, inklusiv begge endepunkter.
 * Arbeidsdag = mandag–fredag som ikke er offentlig helligdag.
 * (Vi regner ikke julaften/nyttårsaften som arbeidsfri her — det varierer
 *  etter arbeidsavtale.)
 */
export function workdaysBetween(from: Date, to: Date): number {
  if (from > to) return 0;
  let count = 0;
  const yearsSeen = new Set<number>();
  const holidaySet = new Set<string>();
  for (let d = new Date(from.getTime()); d <= to; d = addDays(d, 1)) {
    const y = d.getUTCFullYear();
    if (!yearsSeen.has(y)) {
      yearsSeen.add(y);
      for (const h of publicHolidays(y)) holidaySet.add(h.date);
    }
    if (isWeekend(d)) continue;
    if (holidaySet.has(isoDate(d))) continue;
    count++;
  }
  return count;
}

/** Antall arbeidsdager i et helt år. */
export function workdaysInYear(y: number): number {
  return workdaysBetween(dateOf(y, 1, 1), dateOf(y, 12, 31));
}

/** Arbeidsdager fra og med `from` ut året. */
export function workdaysRemainingInYear(from: Date): number {
  const y = from.getUTCFullYear();
  return workdaysBetween(from, dateOf(y, 12, 31));
}

// ---------------------------------------------------------------------------
// "Fredag etter Kristi himmelfart" — alltid en inneklemt dag
// ---------------------------------------------------------------------------

export function fridayAfterAscension(y: number): Date {
  const easter = easterSunday(y);
  // Kristi himmelfart = easter + 39 (torsdag) → +1 = fredag
  return addDays(easter, 40);
}

// ---------------------------------------------------------------------------
// Planlegging: "få mest fri med færrest feriedager"
// ---------------------------------------------------------------------------

/**
 * En enkelt planleggings-tips: gitt et langhelg-strekk, beskriv hvor mange
 * feriedager du må ta og hva du får igjen.
 */
export interface PlanningPick {
  /** Underliggende langhelg */
  longWeekend: LongWeekend;
  /** Antall feriedager du må ta for å låse opp hele strekket */
  vacationDays: number;
  /** Antall fridager du får totalt */
  totalDaysOff: number;
  /** Effektivitet: fridager per feriedag (∞ hvis 0 feriedager) */
  efficiency: number;
  /** Kort overskrift, f.eks. "Påske" eller "Kristi himmelfart" */
  label: string;
  /** Lengre forklaring, klar for visning */
  description: string;
}

function labelForLongWeekend(lw: LongWeekend): string {
  const h = lw.includes.holidays;
  if (h.some((n) => /påskedag|langfredag|skjær/i.test(n))) return "Påsken";
  if (h.some((n) => /pinsedag/i.test(n))) return "Pinse";
  if (h.some((n) => /Kristi himmelfart/i.test(n))) return "Kristi himmelfart";
  if (h.some((n) => /Grunnlovsdag/i.test(n)) && h.some((n) => /Arbeidernes dag/i.test(n))) return "Mai-helgen";
  if (h.some((n) => /Grunnlovsdag/i.test(n))) return "17. mai";
  if (h.some((n) => /Arbeidernes dag/i.test(n))) return "1. mai";
  if (h.some((n) => /juledag/i.test(n))) return "Jul";
  if (h.some((n) => /nyttårsdag/i.test(n))) return "Nyttår";
  return h[0] ?? "Langhelg";
}

/**
 * Rangerte planleggings-tips for et år: hvilke perioder gir mest
 * sammenhengende fri med færrest feriedager?
 *
 * Sortering: først etter færrest feriedager (0 = "gratis"), så etter
 * lengst strekk. Returnerer alle langhelger med ferdig-formaterte
 * beskrivelser klare for visning.
 */
export function planningPicks(y: number): PlanningPick[] {
  return longWeekends(y)
    .map((lw): PlanningPick => {
      const label = labelForLongWeekend(lw);
      const vac = lw.vacationDaysNeeded;
      const eff = vac === 0 ? Infinity : lw.days / vac;
      const description = buildPickDescription(label, lw);
      return {
        longWeekend: lw,
        vacationDays: vac,
        totalDaysOff: lw.days,
        efficiency: eff,
        label,
        description,
      };
    })
    .sort((a, b) => {
      if (a.vacationDays !== b.vacationDays) return a.vacationDays - b.vacationDays;
      return b.totalDaysOff - a.totalDaysOff;
    });
}

function buildPickDescription(label: string, lw: LongWeekend): string {
  const vac = lw.vacationDaysNeeded;
  if (vac === 0) {
    return `${label} gir ${lw.days} sammenhengende fridager uten å bruke feriedag.`;
  }
  if (vac === 1) {
    return `Tar du fri den inneklemte dagen, får du ${lw.days} sammenhengende fridager i ${label.toLowerCase()}.`;
  }
  return `Tar du fri de ${vac} inneklemte dagene, får du ${lw.days} sammenhengende fridager i ${label.toLowerCase()}.`;
}
