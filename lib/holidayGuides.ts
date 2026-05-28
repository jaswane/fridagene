/**
 * Forklaringssider for de 12 offentlige helligdagene i Norge.
 *
 * Hver guide kobles til en Holiday.id fra lib/holidays.ts, slik at
 * dato beregnes deterministisk per år av datomotoren. Tekstene er korte,
 * presise og bruker forsiktige formuleringer om butikker/arbeid/skole —
 * aldri konkrete åpningstider.
 */

import type { Season } from "@/components/pages/SeasonPage";

export interface HolidayGuideFaq {
  q: string;
  a: string;
}

export interface HolidayGuide {
  /** URL-slug under /helligdager/ */
  slug: string;
  /** Matcher Holiday.id i lib/holidays.ts */
  holidayId: string;
  /** Visningsnavn (H1) */
  name: string;
  /** Kort svar først */
  shortAnswer: string;
  /** Hva dagen markerer */
  marks: string;
  /** Praktisk info: butikker/arbeid/skole, forsiktig formulert */
  practical: string;
  /** Relatert høytidsside for krysslenke (valgfri) */
  relatedSeason?: Season;
  faq?: HolidayGuideFaq[];
}

const STORE_CLOSED =
  "Som regel holder mange butikker stengt på denne offentlige helligdagen, men enkelte kiosker, bensinstasjoner og helligdagsåpne butikker kan ha åpent. De fleste har fri fra jobb og skole. Sjekk lokalt ved tvil.";

export const HOLIDAY_GUIDES: HolidayGuide[] = [
  {
    slug: "forste-nyttarsdag",
    holidayId: "1-nyttarsdag",
    name: "1. nyttårsdag",
    shortAnswer:
      "1. nyttårsdag (1. januar) er en offentlig helligdag og rød dag i Norge.",
    marks:
      "1. nyttårsdag markerer den første dagen i det nye året. Den har lange tradisjoner som en rolig fridag etter nyttårsfeiringen.",
    practical: STORE_CLOSED,
    faq: [
      {
        q: "Er 1. nyttårsdag en rød dag?",
        a: "Ja. 1. nyttårsdag er en offentlig helligdag og regnes som rød dag.",
      },
      {
        q: "Er nyttårsaften også fri?",
        a: "Nyttårsaften (31. desember) er ikke en offentlig helligdag, men mange har kortere dag. Det er først 1. nyttårsdag som er rød dag.",
      },
    ],
  },
  {
    slug: "skjaertorsdag",
    holidayId: "skjaertorsdag",
    name: "Skjærtorsdag",
    shortAnswer:
      "Skjærtorsdag er en offentlig helligdag og rød dag, torsdagen før påske.",
    marks:
      "Skjærtorsdag markerer det siste måltidet (nattverden) i påskefortellingen. Den er en bevegelig helligdag som følger påsken.",
    practical: STORE_CLOSED,
    relatedSeason: "paske",
    faq: [
      {
        q: "Er skjærtorsdag rød dag?",
        a: "Ja. Skjærtorsdag er en offentlig helligdag og rød dag.",
      },
    ],
  },
  {
    slug: "langfredag",
    holidayId: "langfredag",
    name: "Langfredag",
    shortAnswer:
      "Langfredag er en offentlig helligdag og rød dag, fredagen før påske.",
    marks:
      "Langfredag markerer korsfestelsen i påskefortellingen og er tradisjonelt en stille dag. Den følger påsken.",
    practical:
      "Langfredag er en av de roligste helligdagene. Som regel holder de aller fleste butikker stengt, men enkelte nødvendige tilbud kan ha åpent. Sjekk lokalt ved tvil.",
    relatedSeason: "paske",
  },
  {
    slug: "forste-paskedag",
    holidayId: "1-paskedag",
    name: "1. påskedag",
    shortAnswer:
      "1. påskedag er en offentlig helligdag og rød dag, alltid en søndag.",
    marks:
      "1. påskedag er selve påskedagen og markerer oppstandelsen i påskefortellingen.",
    practical: STORE_CLOSED,
    relatedSeason: "paske",
  },
  {
    slug: "andre-paskedag",
    holidayId: "2-paskedag",
    name: "2. påskedag",
    shortAnswer:
      "2. påskedag er en offentlig helligdag og rød dag, mandagen etter påske.",
    marks:
      "2. påskedag er en ekstra helligdag etter påskehelgen og gir for mange en lang påskeferie sammen med skjærtorsdag og langfredag.",
    practical: STORE_CLOSED,
    relatedSeason: "paske",
  },
  {
    slug: "forste-mai",
    holidayId: "arbeidernes-dag",
    name: "1. mai (Arbeidernes dag)",
    shortAnswer:
      "1. mai er en offentlig høytidsdag og rød dag i Norge.",
    marks:
      "1. mai er arbeidernes internasjonale kampdag og markeres med tog og arrangementer. Den er fast på samme dato hvert år.",
    practical: STORE_CLOSED,
    relatedSeason: "mai",
    faq: [
      {
        q: "Er 1. mai rød dag?",
        a: "Ja. 1. mai er en offentlig høytidsdag og regnes som rød dag.",
      },
    ],
  },
  {
    slug: "syttende-mai",
    holidayId: "grunnlovsdag",
    name: "17. mai (Grunnlovsdagen)",
    shortAnswer:
      "17. mai er Norges grunnlovsdag, offentlig helligdag, rød dag og flaggdag.",
    marks:
      "17. mai feirer Grunnloven av 1814 og er Norges nasjonaldag, med barnetog og feiring over hele landet.",
    practical:
      "17. mai er både offentlig helligdag og flaggdag. Som regel holder de fleste butikker stengt, men kiosker og enkelte utsalg kan ha åpent rundt feiringen. Sjekk lokalt ved tvil.",
    relatedSeason: "mai",
    faq: [
      {
        q: "Er 17. mai både helligdag og flaggdag?",
        a: "Ja. 17. mai er offentlig helligdag (rød dag) og offisiell flaggdag.",
      },
    ],
  },
  {
    slug: "kristi-himmelfartsdag",
    holidayId: "kristi-himmelfart",
    name: "Kristi himmelfartsdag",
    shortAnswer:
      "Kristi himmelfartsdag er en offentlig helligdag og rød dag, alltid en torsdag.",
    marks:
      "Kristi himmelfartsdag markerer himmelfarten i den kristne fortellingen, 39 dager etter 1. påskedag. Den faller alltid på en torsdag.",
    practical:
      "Som regel holder mange butikker stengt. Fordi dagen alltid er en torsdag, tar mange fri fredagen etter (en inneklemt dag) for en lang helg. Sjekk lokalt ved tvil.",
    relatedSeason: "mai",
    faq: [
      {
        q: "Hvorfor faller Kristi himmelfartsdag alltid på en torsdag?",
        a: "Den er beregnet til 39 dager etter 1. påskedag, som alltid er en søndag. 39 dager senere blir alltid en torsdag.",
      },
      {
        q: "Er fredagen etter fri?",
        a: "Fredagen etter er en inneklemt dag — en vanlig arbeidsdag, ikke automatisk fri. Mange velger likevel å ta den som feriedag.",
      },
    ],
  },
  {
    slug: "forste-pinsedag",
    holidayId: "1-pinsedag",
    name: "1. pinsedag",
    shortAnswer:
      "1. pinsedag er en offentlig helligdag og rød dag, alltid en søndag.",
    marks:
      "1. pinsedag markerer pinsen, 49 dager etter 1. påskedag, og regnes som kirkens fødselsdag i kristen tradisjon.",
    practical: STORE_CLOSED,
    relatedSeason: "pinse",
  },
  {
    slug: "andre-pinsedag",
    holidayId: "2-pinsedag",
    name: "2. pinsedag",
    shortAnswer:
      "2. pinsedag er en offentlig helligdag og rød dag, mandagen etter pinse.",
    marks:
      "2. pinsedag er en ekstra helligdag etter pinsehelgen og gir for mange en lang helg.",
    practical: STORE_CLOSED,
    relatedSeason: "pinse",
  },
  {
    slug: "forste-juledag",
    holidayId: "1-juledag",
    name: "1. juledag",
    shortAnswer:
      "1. juledag (25. desember) er en offentlig helligdag, rød dag og flaggdag.",
    marks:
      "1. juledag er selve juledagen og markerer julefeiringen. Den er fast på 25. desember.",
    practical:
      "Som regel holder de aller fleste butikker stengt 1. juledag. Enkelte nødvendige tilbud kan ha åpent. De fleste har fri fra jobb og skole. Sjekk lokalt ved tvil.",
    relatedSeason: "jul",
    faq: [
      {
        q: "Er julaften også rød dag?",
        a: "Nei. Julaften (24. desember) er ikke en offentlig helligdag, men mange har redusert dag eller fri. Det er 1. og 2. juledag som er røde dager.",
      },
    ],
  },
  {
    slug: "andre-juledag",
    holidayId: "2-juledag",
    name: "2. juledag",
    shortAnswer:
      "2. juledag (26. desember) er en offentlig helligdag og rød dag.",
    marks:
      "2. juledag er en ekstra helligdag etter jul og brukes ofte til besøk og romjulsro. Den er fast på 26. desember.",
    practical: STORE_CLOSED,
    relatedSeason: "jul",
  },
];

export const HOLIDAY_GUIDE_SLUGS = HOLIDAY_GUIDES.map((g) => g.slug);

export function getHolidayGuide(slug: string): HolidayGuide | undefined {
  return HOLIDAY_GUIDES.find((g) => g.slug === slug);
}

/** Slug for en Holiday.id, hvis det finnes en guide. */
export function guideSlugForHolidayId(id: string): string | undefined {
  return HOLIDAY_GUIDES.find((g) => g.holidayId === id)?.slug;
}
