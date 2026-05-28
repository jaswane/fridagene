import Link from "next/link";
import { flagDays } from "@/lib/flagDays";
import {
  formatNorwegianDate,
  formatNorwegianWeekday,
  parseIso,
} from "@/lib/holidays";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { HistoricalNote } from "@/components/HistoricalNote";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

export function FlagDaysYearPage({ year }: { year: number }) {
  const days = flagDays(year);

  const faqs = [
    {
      q: "Er en flaggdag det samme som en fridag?",
      a: "Nei. En flaggdag er en dag det skal flagges fra statens bygninger. Det er ikke automatisk fri. Noen flaggdager faller sammen med offentlige helligdager (som 1. mai, 17. mai og 1. juledag), og da gir helligdag-statusen fri — ikke flaggdag-statusen.",
    },
    {
      q: "Hvem må flagge på offisielle flaggdager?",
      a: "Statlige virksomheter er pålagt å flagge på offisielle flaggdager. Kommuner og private aktører kan ha egne flaggregler, og mange velger å flagge på de samme dagene.",
    },
    {
      q: "Er 17. mai både helligdag og flaggdag?",
      a: "Ja. Grunnlovsdagen 17. mai er både offentlig helligdag (lovbestemt fri) og offisiell flaggdag. Det samme gjelder 1. mai og 1. juledag.",
    },
    {
      q: "Hvorfor er kongefamiliens fødselsdager flaggdager?",
      a: "Kongefamiliens fødselsdager — kongen, dronningen, kronprinsen, kronprinsessen og prinsesse Ingrid Alexandra — er offisielle flaggdager som markering av kongehuset. Det gir ikke fri.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/flaggdager-${year}`,
            name: `Flaggdager i Norge ${year}`,
            description: `Komplett oversikt over offisielle norske flaggdager i ${year}, med dato og ukedag. Flaggdag er ikke automatisk fridag.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `Flaggdager ${year}`,
              url: `${SITE.url}/flaggdager-${year}`,
            },
          ]),
          itemListSchema({
            name: `Flaggdager i Norge ${year}`,
            items: days.map((f) => ({
              name: `${formatNorwegianDate(parseIso(f.date))} — ${f.name}`,
              description: f.alsoPublicHoliday
                ? "Også offentlig helligdag."
                : "Flaggdag (ikke automatisk fridag).",
            })),
          }),
          faqSchema(faqs),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Flaggdager"
          title={`Flaggdager i Norge ${year}`}
          lede="En flaggdag er ikke nødvendigvis en fridag. Offisielle flaggdager gjelder særlig flagging fra statlige virksomheter — kommuner og private kan ha egne rutiner."
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Flaggdager ${year}` },
          ]}
        />

        <HistoricalNote year={year} />

        <section className="mt-8">
          <ul className="card divide-y divide-line/70">
            {days.map((f) => {
              const d = parseIso(f.date);
              return (
                <li
                  key={f.id + f.date}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3"
                >
                  <div className="sm:w-44 shrink-0">
                    <div className="text-ink font-medium">
                      {formatNorwegianDate(d)}
                    </div>
                    <div className="text-xs text-muted capitalize">
                      {formatNorwegianWeekday(d)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-ink font-medium">{f.name}</span>
                      {f.alsoPublicHoliday && (
                        <span className="chip-tag">Også offentlig helligdag</span>
                      )}
                      {f.kind === "bevegelig" && !f.alsoPublicHoliday && (
                        <span className="chip-tag chip-tag--practical">
                          Bevegelig
                        </span>
                      )}
                      {f.kind === "betinget" && (
                        <span className="chip-tag chip-tag--practical">
                          Ved valg
                        </span>
                      )}
                    </div>
                    {f.note && (
                      <p className="text-sm text-muted mt-1">{f.note}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted mt-3">
            Basert på offisiell oversikt over norske flaggdager. Ved stortings-
            og sametingsvalg er valgdagen også flaggdag — vises kun for år
            hvor datoen er offisielt fastsatt.
          </p>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Flaggdag, helligdag, fridag — hva er forskjellen?
          </h2>
          <p className="mt-2">
            En <strong>offentlig helligdag</strong> er en lovbestemt fridag (12
            stk. i Norge). En <strong>flaggdag</strong> er en dag det skal
            flagges fra statlige bygninger — det gir ikke fri i seg selv. En{" "}
            <strong>praktisk fridag</strong> (som julaften og nyttårsaften) er
            ikke offentlig helligdag, men mange har fri eller halv dag etter
            avtale.
          </p>
          <p className="mt-3">
            Noen dager overlapper alle tre. 17. mai er for eksempel både
            offentlig helligdag, flaggdag og en tradisjonell merkedag.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">Vanlige spørsmål</h2>
          <div className="mt-3 grid gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="card-soft px-4 py-3">
                <summary className="cursor-pointer text-ink font-medium">
                  {f.q}
                </summary>
                <p className="text-muted mt-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Mer for {year}</h2>
          <p className="mt-2">
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link>
            {" · "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
            {" · "}
            <Link href={`/fa-mest-fri-${year}`}>Få mest fri i {year}</Link>
            {" · "}
            <Link href={`/flaggdager-${year + 1}`}>
              Flaggdager {year + 1}
            </Link>
          </p>
        </section>

        <Disclaimer>
          Flaggdager gir ikke automatisk fri. Statlige virksomheter er pålagt å
          flagge — kommuner og private kan ha egne rutiner. Sjekk arbeidsgivers
          praksis.
        </Disclaimer>
      </div>
    </>
  );
}
