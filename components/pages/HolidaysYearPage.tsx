import Link from "next/link";
import {
  publicHolidays,
  practicalDays,
  formatNorwegianDate,
  formatNorwegianWeekday,
  parseIso,
  workdaysInYear,
} from "@/lib/holidays";
import { HolidayList } from "@/components/HolidayList";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";
import { isSupportedYear } from "@/lib/years";
import { HistoricalNote } from "@/components/HistoricalNote";

export function HolidaysYearPage({ year }: { year: number }) {
  const officials = publicHolidays(year);
  const practical = practicalDays(year);
  const workdays = workdaysInYear(year);

  const itemList = itemListSchema({
    name: `Offentlige helligdager i Norge ${year}`,
    items: officials.map((h) => ({
      name: h.name,
      description: `${formatNorwegianWeekday(parseIso(h.date))} ${formatNorwegianDate(parseIso(h.date))}`,
    })),
  });

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/helligdager-${year}`,
            name: `Helligdager ${year} — Norske røde dager`,
            description: `Alle offentlige helligdager i Norge i ${year} med dato og ukedag.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `Helligdager ${year}`,
              url: `${SITE.url}/helligdager-${year}`,
            },
          ]),
          itemList,
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Helligdager"
          title={`Helligdager i Norge ${year}`}
          lede={`Komplett oversikt over de ${officials.length} offentlige helligdagene i Norge i ${year}, med dato og ukedag. ${workdays} arbeidsdager i året totalt.`}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Helligdager ${year}` },
          ]}
        />

        <HistoricalNote year={year} />

        <section className="mt-8">
          <h2 className="font-display text-2xl text-ink mb-3">
            Offentlige helligdager
          </h2>
          <HolidayList holidays={officials} showKind={false} />
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink mb-2">
            Praktiske fridager
          </h2>
          <p className="text-muted text-sm mb-3 max-w-2xl">
            Disse er <strong>ikke</strong> offentlige helligdager, men mange har
            fri eller halv dag. Det varierer etter arbeidsavtale.
          </p>
          <HolidayList holidays={practical} showKind={false} />
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Andre år og oversikter
          </h2>
          <p className="mt-2">
            {isSupportedYear(year - 1) && (
              <>
                <Link href={`/helligdager-${year - 1}`}>
                  Helligdager {year - 1}
                </Link>
                {" · "}
              </>
            )}
            {isSupportedYear(year + 1) && (
              <>
                <Link href={`/helligdager-${year + 1}`}>
                  Helligdager {year + 1}
                </Link>
                {" · "}
              </>
            )}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link>
            {" · "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
            {" · "}
            <Link href={`/arbeidsdager-${year}`}>Arbeidsdager {year}</Link>
            {" · "}
            <Link href={`/flaggdager-${year}`}>Flaggdager</Link>
          </p>
          <p className="mt-3">
            Tematiske sider:{" "}
            <Link href={`/paske-${year}`}>Påsken</Link>
            {" · "}
            <Link href={`/pinse-${year}`}>Pinse</Link>
            {" · "}
            <Link href={`/jul-${year}`}>Jul</Link>
            {" · "}
            <Link href={`/mai-${year}`}>Mai</Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}
