import Link from "next/link";
import {
  addDays,
  dateOf,
  easterSunday,
  formatNorwegianDate,
  formatNorwegianWeekday,
  fridayAfterAscension,
  type Holiday,
  isoDate,
  parseIso,
  publicHolidays,
} from "@/lib/holidays";
import { PageHeader } from "@/components/PageHeader";
import { HolidayList } from "@/components/HolidayList";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

export type Season = "paske" | "pinse" | "jul" | "mai";

const META: Record<
  Season,
  {
    label: string;
    title: (y: number) => string;
    description: (y: number) => string;
    kicker: string;
  }
> = {
  paske: {
    label: "Påsken",
    kicker: "Påsken",
    title: (y) => `Påsken ${y} — datoer og helligdager`,
    description: (y) =>
      `Når er påsken ${y}? Se palmesøndag, skjærtorsdag, langfredag, påskeaften og 1. og 2. påskedag.`,
  },
  pinse: {
    label: "Pinse",
    kicker: "Pinse",
    title: (y) => `Pinse ${y} — datoer og helligdager`,
    description: (y) =>
      `Når er pinsen ${y}? Se pinseaften, 1. pinsedag og 2. pinsedag, og hvordan pinsehelgen blir en langhelg.`,
  },
  jul: {
    label: "Jul",
    kicker: "Jul",
    title: (y) => `Jul ${y} — helligdager i romjulen`,
    description: (y) =>
      `Helligdager og fridager i julen ${y}: julaften, 1. og 2. juledag, romjulshelger og nyttårsaften.`,
  },
  mai: {
    label: "Mai",
    kicker: "Mai",
    title: (y) => `Mai ${y} — 1. mai, 17. mai og Kristi himmelfartsdag`,
    description: (y) =>
      `Mai ${y} har flere helligdager: 1. mai, Kristi himmelfartsdag og 17. mai. Se datoer, ukedager og langhelger.`,
  },
};

export function SeasonPage({ season, year }: { season: Season; year: number }) {
  const easter = easterSunday(year);
  const meta = META[season];

  const days: Holiday[] = buildDays(season, year, easter);

  const faq = buildFaq(season, year, days);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/${season}-${year}`,
            name: meta.title(year),
            description: meta.description(year),
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `${meta.label} ${year}`,
              url: `${SITE.url}/${season}-${year}`,
            },
          ]),
          faqSchema(faq),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker={meta.kicker}
          title={meta.title(year)}
          lede={meta.description(year)}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `${meta.label} ${year}` },
          ]}
        />

        <section className="mt-8">
          <h2 className="font-display text-2xl text-ink mb-3">Dager og datoer</h2>
          <HolidayList holidays={days} />
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink mb-3">Vanlige spørsmål</h2>
          <div className="grid gap-3">
            {faq.map((f) => (
              <details key={f.q} className="card-soft px-4 py-3">
                <summary className="cursor-pointer text-ink font-medium">{f.q}</summary>
                <p className="text-muted mt-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Mer om {year}</h2>
          <p className="mt-2">
            <Link href={`/helligdager-${year}`}>Alle helligdager {year}</Link>
            {" · "}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link>
            {" · "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
            {" · "}
            <Link href={`/${season}-${year + 1}`}>
              {meta.label} {year + 1}
            </Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}

function buildDays(season: Season, year: number, easter: Date): Holiday[] {
  switch (season) {
    case "paske": {
      return [
        {
          id: "palmesondag",
          name: "Palmesøndag",
          date: isoDate(addDays(easter, -7)),
          kind: "practical",
          note: "Ikke offentlig helligdag, men en kirkelig merkedag.",
        },
        {
          id: "skjaertorsdag",
          name: "Skjærtorsdag",
          date: isoDate(addDays(easter, -3)),
          kind: "public",
        },
        {
          id: "langfredag",
          name: "Langfredag",
          date: isoDate(addDays(easter, -2)),
          kind: "public",
        },
        {
          id: "paskeaften",
          name: "Påskeaften",
          date: isoDate(addDays(easter, -1)),
          kind: "practical",
          note: "Lørdag før påske. Butikker har redusert åpningstid.",
        },
        {
          id: "1-paskedag",
          name: "1. påskedag",
          date: isoDate(easter),
          kind: "public",
        },
        {
          id: "2-paskedag",
          name: "2. påskedag",
          date: isoDate(addDays(easter, 1)),
          kind: "public",
        },
      ];
    }
    case "pinse": {
      return [
        {
          id: "pinseaften",
          name: "Pinseaften",
          date: isoDate(addDays(easter, 48)),
          kind: "practical",
        },
        {
          id: "1-pinsedag",
          name: "1. pinsedag",
          date: isoDate(addDays(easter, 49)),
          kind: "public",
        },
        {
          id: "2-pinsedag",
          name: "2. pinsedag",
          date: isoDate(addDays(easter, 50)),
          kind: "public",
        },
      ];
    }
    case "jul": {
      return [
        {
          id: "julaften",
          name: "Julaften",
          date: isoDate(dateOf(year, 12, 24)),
          kind: "practical",
          note: "Ikke offentlig helligdag. Mange arbeidsplasser stenger tidlig eller helt, men det varierer.",
        },
        {
          id: "1-juledag",
          name: "1. juledag",
          date: isoDate(dateOf(year, 12, 25)),
          kind: "public",
        },
        {
          id: "2-juledag",
          name: "2. juledag",
          date: isoDate(dateOf(year, 12, 26)),
          kind: "public",
        },
        {
          id: "nyttarsaften",
          name: "Nyttårsaften",
          date: isoDate(dateOf(year, 12, 31)),
          kind: "practical",
          note: "Ikke offentlig helligdag. Halv arbeidsdag for mange.",
        },
        {
          id: "1-nyttarsdag",
          name: "1. nyttårsdag",
          date: isoDate(dateOf(year + 1, 1, 1)),
          kind: "public",
          note: "Selv om det tilhører neste år, regnes nyttårsdag som en del av jule-/nyttårshelgen.",
        },
      ];
    }
    case "mai": {
      const ascension = publicHolidays(year).find(
        (h) => h.id === "kristi-himmelfart"
      )!;
      const fri = fridayAfterAscension(year);
      return [
        {
          id: "arbeidernes-dag",
          name: "Arbeidernes dag",
          date: isoDate(dateOf(year, 5, 1)),
          kind: "public",
        },
        {
          id: "kristi-himmelfart",
          name: "Kristi himmelfartsdag",
          date: ascension.date,
          kind: "public",
        },
        {
          id: "fredag-etter-kristi-himmelfart",
          name: "Fredag etter Kristi himmelfartsdag",
          date: isoDate(fri),
          kind: "practical",
          note: "Klassisk inneklemt dag. Ikke fri, men mange velger å ta dagen for langhelg.",
        },
        {
          id: "grunnlovsdag",
          name: "Grunnlovsdag (17. mai)",
          date: isoDate(dateOf(year, 5, 17)),
          kind: "public",
        },
      ];
    }
  }
}

function buildFaq(season: Season, year: number, days: Holiday[]): { q: string; a: string }[] {
  const dateOfId = (id: string) => {
    const d = days.find((x) => x.id === id);
    return d ? formatNorwegianDate(parseIso(d.date)) : "";
  };
  const weekdayOfId = (id: string) => {
    const d = days.find((x) => x.id === id);
    return d ? formatNorwegianWeekday(parseIso(d.date)) : "";
  };

  switch (season) {
    case "paske":
      return [
        {
          q: `Når er påsken ${year}?`,
          a: `1. påskedag er ${dateOfId("1-paskedag")} (${weekdayOfId("1-paskedag")}). Skjærtorsdag er ${dateOfId("skjaertorsdag")}, langfredag ${dateOfId("langfredag")}, og 2. påskedag ${dateOfId("2-paskedag")}.`,
        },
        {
          q: "Er påskeaften en helligdag?",
          a: "Påskeaften (lørdag før påske) er ikke en offentlig helligdag, men butikker har som regel redusert åpningstid og mange tar fri.",
        },
        {
          q: "Hvor mange røde dager er det i påsken?",
          a: "Påsken har fire offentlige helligdager: skjærtorsdag, langfredag, 1. påskedag og 2. påskedag. Sammen med påskeaften og søndagen blir det en sammenhengende langhelg på flere dager.",
        },
      ];
    case "pinse":
      return [
        {
          q: `Når er pinse ${year}?`,
          a: `1. pinsedag er ${dateOfId("1-pinsedag")} (${weekdayOfId("1-pinsedag")}) og 2. pinsedag er ${dateOfId("2-pinsedag")}. Pinseaften er ${dateOfId("pinseaften")}.`,
        },
        {
          q: "Er pinseaften en helligdag?",
          a: "Pinseaften er ikke en offentlig helligdag. Den faller alltid på en lørdag.",
        },
        {
          q: "Blir pinsen en langhelg?",
          a: "Ja. Med 1. pinsedag på en søndag og 2. pinsedag på mandag, blir det automatisk tre sammenhengende fridager for de fleste.",
        },
      ];
    case "jul":
      return [
        {
          q: "Er julaften en rød dag?",
          a: "Nei. Julaften (24. desember) er ikke en offentlig helligdag i Norge. Mange arbeidsplasser stenger likevel tidlig eller hele dagen, men det er ikke en lovpålagt fridag.",
        },
        {
          q: "Er nyttårsaften en rød dag?",
          a: "Nei. Nyttårsaften (31. desember) er ikke en offentlig helligdag. Mange har halv dag eller fri, men det varierer.",
        },
        {
          q: `Når faller 1. og 2. juledag i ${year}?`,
          a: `1. juledag (25. desember) er ${weekdayOfId("1-juledag")} ${year}, og 2. juledag (26. desember) er ${weekdayOfId("2-juledag")}.`,
        },
      ];
    case "mai":
      return [
        {
          q: `Hvilke helligdager er i mai ${year}?`,
          a: `1. mai (${weekdayOfId("arbeidernes-dag")}), Kristi himmelfartsdag (${dateOfId("kristi-himmelfart")}) og 17. mai (${weekdayOfId("grunnlovsdag")}).`,
        },
        {
          q: "Er fredag etter Kristi himmelfartsdag fri?",
          a: "Nei, det er ikke en offentlig helligdag — men det er den klassiske inneklemte dagen i Norge. Mange tar dagen fri for å lage en lang fire-dagers helg.",
        },
      ];
  }
}
