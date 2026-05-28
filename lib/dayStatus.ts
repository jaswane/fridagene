/**
 * Dagstatus for Fridagene.no — "hva slags dag er dette?".
 *
 * Bygger på den deterministiske datomotoren (helligdager, praktiske
 * fridager, inneklemte dager, flaggdager). Gir GENERELL veiledning om
 * butikker/åpningstider med forsiktige formuleringer — aldri sanntid og
 * aldri påstand om at en konkret butikk er åpen.
 */

import {
  bridgeDays,
  formatNorwegianDate,
  formatNorwegianWeekday,
  isWeekend,
  isoDate,
  practicalDays,
  publicHolidays,
  type Holiday,
} from "./holidays";
import { flagDays, type FlagDay } from "./flagDays";

export type DayCategory =
  | "helligdag"
  | "praktisk-fridag"
  | "soendag"
  | "loerdag"
  | "inneklemt"
  | "hverdag";

export interface DayStatus {
  /** ISO-dato yyyy-mm-dd */
  date: string;
  /** Formatert norsk dato, f.eks. "14. mai 2026" */
  formatted: string;
  /** Ukedag, f.eks. "torsdag" */
  weekday: string;
  isWeekend: boolean;
  isPublicHoliday: boolean;
  publicHolidayName?: string;
  isFlagDay: boolean;
  flagDayName?: string;
  /** Praktisk fridag = julaften/nyttårsaften/påskeaften/pinseaften */
  isPracticalDay: boolean;
  practicalDayName?: string;
  isBridgeDay: boolean;
  /** Rød dag = søndag eller offentlig helligdag */
  isRedDay: boolean;
  category: DayCategory;
  /** Kort hva-slags-dag-setning */
  summary: string;
  /** Forsiktig generell vurdering av butikker/åpningstider */
  openingGuidance: string;
}

function findByDate<T extends { date: string }>(
  list: T[],
  iso: string
): T | undefined {
  return list.find((x) => x.date === iso);
}

export function getDayStatus(date: Date): DayStatus {
  const year = date.getUTCFullYear();
  const iso = isoDate(date);
  const weekday = formatNorwegianWeekday(date);
  const weekend = isWeekend(date);
  const dow = date.getUTCDay(); // 0 = søndag, 6 = lørdag

  const publicHoliday: Holiday | undefined = findByDate(
    publicHolidays(year),
    iso
  );
  const practical: Holiday | undefined = findByDate(practicalDays(year), iso);
  const flag: FlagDay | undefined = findByDate(flagDays(year), iso);
  const bridge = findByDate(bridgeDays(year), iso);

  const isPublicHoliday = Boolean(publicHoliday);
  const isPracticalDay = Boolean(practical);
  const isFlagDay = Boolean(flag);
  const isBridgeDay = Boolean(bridge);
  const isRedDay = isPublicHoliday || dow === 0; // søndag eller helligdag

  let category: DayCategory;
  if (isPublicHoliday) category = "helligdag";
  else if (isPracticalDay) category = "praktisk-fridag";
  else if (dow === 0) category = "soendag";
  else if (dow === 6) category = "loerdag";
  else if (isBridgeDay) category = "inneklemt";
  else category = "hverdag";

  const summary = buildSummary({
    category,
    weekday,
    publicHolidayName: publicHoliday?.name,
    practicalDayName: practical?.name,
    flagDayName: flag?.name,
    isFlagDay,
  });

  const openingGuidance = buildOpeningGuidance(category, practical?.name);

  return {
    date: iso,
    formatted: formatNorwegianDate(date),
    weekday,
    isWeekend: weekend,
    isPublicHoliday,
    publicHolidayName: publicHoliday?.name,
    isFlagDay,
    flagDayName: flag?.name,
    isPracticalDay,
    practicalDayName: practical?.name,
    isBridgeDay,
    isRedDay,
    category,
    summary,
    openingGuidance,
  };
}

function buildSummary(args: {
  category: DayCategory;
  weekday: string;
  publicHolidayName?: string;
  practicalDayName?: string;
  flagDayName?: string;
  isFlagDay: boolean;
}): string {
  const { category, weekday, publicHolidayName, practicalDayName } = args;
  const flagSuffix =
    args.isFlagDay && category !== "helligdag"
      ? ` Det er også offisiell flaggdag${args.flagDayName ? ` (${args.flagDayName})` : ""}.`
      : "";

  switch (category) {
    case "helligdag":
      return `Det er ${publicHolidayName} og offentlig helligdag (rød dag).`;
    case "praktisk-fridag":
      return `Det er ${practicalDayName}. Dette er ikke en offentlig helligdag, men mange har redusert dag.${flagSuffix}`;
    case "soendag":
      return `Det er søndag (rød dag).${flagSuffix}`;
    case "loerdag":
      return `Det er lørdag.${flagSuffix}`;
    case "inneklemt":
      return `Det er en vanlig ${weekday}, men en inneklemt dag mellom helligdag og helg.${flagSuffix}`;
    case "hverdag":
    default:
      return `Det er en vanlig ${weekday}.${flagSuffix}`;
  }
}

function buildOpeningGuidance(
  category: DayCategory,
  practicalName?: string
): string {
  switch (category) {
    case "helligdag":
      return "Dette er en offentlig helligdag. Mange butikker holder stengt, men enkelte kiosker, bensinstasjoner og helligdagsåpne butikker kan ha åpent. Sjekk lokal åpningstid hvis du skal handle.";
    case "praktisk-fridag": {
      const navn = (practicalName ?? "Dagen").toLowerCase();
      if (navn.includes("julaften")) {
        return "Dette er julaften. Det er ikke en offentlig helligdag, men mange butikker og tjenester har reduserte åpningstider eller holder stengt. Sjekk lokal butikk.";
      }
      if (navn.includes("nyttårsaften")) {
        return "Dette er nyttårsaften. Det er ikke en offentlig helligdag, men mange butikker har kortere åpningstid. Sjekk lokal butikk.";
      }
      return "Dette er en aften før en helligdag. Det er ikke en offentlig helligdag, men mange butikker kan ha kortere åpningstid. Sjekk lokal butikk.";
    }
    case "soendag":
      return "Dette er søndag. Butikker er som hovedregel stengt, men søndagsåpne butikker og enkelte bransjer kan ha unntak.";
    case "loerdag":
      return "Dette er lørdag. De fleste butikker har åpent, men ofte med kortere åpningstid enn på hverdager. Lokale avvik kan forekomme.";
    case "inneklemt":
      return "Dette er en inneklemt dag — en vanlig arbeidsdag. De fleste butikker følger normalt vanlige åpningstider, men noen kan ha redusert bemanning. Lokale avvik kan forekomme.";
    case "hverdag":
    default:
      return "Dette er en vanlig hverdag. De fleste butikker følger normalt vanlige åpningstider, men lokale avvik kan forekomme.";
  }
}
