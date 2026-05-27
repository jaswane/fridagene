import Link from "next/link";
import {
  formatNorwegianDate,
  formatNorwegianWeekday,
  parseIso,
  planningPicks,
} from "@/lib/holidays";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

export function FaMestFriYearPage({ year }: { year: number }) {
  const picks = planningPicks(year);
  const freebies = picks.filter((p) => p.vacationDays === 0);
  const oneDay = picks.filter((p) => p.vacationDays === 1);
  const more = picks.filter((p) => p.vacationDays >= 2);

  const faqs = [
    {
      q: `Hvilke langhelger i ${year} gir mest fri uten å bruke feriedag?`,
      a:
        freebies.length === 0
          ? `Ingen langhelger i ${year} faller helt gratis — alle krever minst én feriedag for å bli sammenhengende.`
          : `Det er ${freebies.length} langhelger i ${year} som gir minst tre sammenhengende fridager uten at du må bruke feriedager: ${freebies
              .map((p) => `${p.label} (${p.totalDaysOff} dager)`)
              .join(", ")}.`,
    },
    {
      q: "Er inneklemte dager garantert fri?",
      a: "Nei. En inneklemt dag er en vanlig arbeidsdag som ligger mellom helligdag og helg. Du må ta dagen som feriedag (eller avspasering) for å låse opp den lengre sammenhengende perioden.",
    },
    {
      q: "Hvordan beregner dere antall feriedager?",
      a: "Vi teller hvor mange arbeidsdager (mandag–fredag, ikke offentlig helligdag) som ligger inne i selve fri-strekket. Hvert slikt klemtdag-tilfelle krever én feriedag for at strekket skal bli sammenhengende.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/fa-mest-fri-${year}`,
            name: `Få mest fri i ${year} — planlegging av feriedager`,
            description: `Hvilke perioder i ${year} gir mest sammenhengende fri med færrest feriedager? Rangerte tips basert på norske helligdager.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `Få mest fri i ${year}`,
              url: `${SITE.url}/fa-mest-fri-${year}`,
            },
          ]),
          itemListSchema({
            name: `Planleggingstips for ${year}`,
            items: picks.map((p) => ({
              name: `${p.label} — ${p.totalDaysOff} dager (${p.vacationDays} feriedager)`,
              description: p.description,
            })),
          }),
          faqSchema(faqs),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Planlegging"
          title={`Få mest fri i ${year}`}
          lede={`${freebies.length} langhelger i ${year} kommer helt uten feriedager, og ${oneDay.length} blir låst opp av én enkelt feriedag. Her er periodene som gir mest sammenhengende fri.`}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Få mest fri i ${year}` },
          ]}
        />

        {freebies.length > 0 && (
          <Section
            heading="Helt gratis langhelger"
            sub="Disse strekkene består av helligdag + helg — du trenger ikke å bruke en eneste feriedag."
            picks={freebies}
            year={year}
            tone="accent"
          />
        )}

        {oneDay.length > 0 && (
          <Section
            heading="Lås opp med én feriedag"
            sub="En enkelt feriedag binder sammen helligdag og helg til en lengre periode."
            picks={oneDay}
            year={year}
            tone="warm"
          />
        )}

        {more.length > 0 && (
          <Section
            heading="Krever flere feriedager"
            sub="Disse strekkene har to eller flere inneklemte dager. Hvis ferien tillater det, gir de lengst sammenhengende fri."
            picks={more}
            year={year}
            tone="muted"
          />
        )}

        <section className="mt-12 narrow-container prose-soft px-0">
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
          <h2 className="font-display text-2xl text-ink">Mer planlegging</h2>
          <p className="mt-2">
            <Link href={`/langhelger-${year}`}>Alle langhelger {year}</Link>
            {" · "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href="/arbeidsdager">Arbeidsdager-kalkulator</Link>
            {" · "}
            <Link href={`/fa-mest-fri-${year + 1}`}>
              Få mest fri i {year + 1}
            </Link>
          </p>
        </section>

        <Disclaimer>
          Inneklemte dager er vanlige arbeidsdager. Tallene viser hvor mye
          sammenhengende fri du kan få <em>hvis</em> du tar dem som feriedag —
          det er ingen automatisk fri, og må avtales med arbeidsgiver.
        </Disclaimer>
      </div>
    </>
  );
}

function Section({
  heading,
  sub,
  picks,
  year,
  tone,
}: {
  heading: string;
  sub: string;
  picks: ReturnType<typeof planningPicks>;
  year: number;
  tone: "accent" | "warm" | "muted";
}) {
  const chipClass =
    tone === "accent"
      ? "chip-tag"
      : tone === "warm"
      ? "chip-tag chip-tag--practical"
      : "chip-tag";
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <p className="text-muted text-sm mt-1 max-w-2xl">{sub}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {picks.map((p) => {
          const start = parseIso(p.longWeekend.start);
          const end = parseIso(p.longWeekend.end);
          return (
            <li key={p.longWeekend.start} className="card p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                  {p.label}
                </div>
                <span className={chipClass}>
                  {p.vacationDays === 0
                    ? "0 feriedager"
                    : p.vacationDays === 1
                    ? "1 feriedag"
                    : `${p.vacationDays} feriedager`}
                </span>
              </div>
              <div className="font-display text-xl text-ink mt-1">
                {p.totalDaysOff} sammenhengende dager
              </div>
              <div className="text-sm text-muted mt-1">
                {formatNorwegianDate(start).replace(` ${year}`, "")} –{" "}
                {formatNorwegianDate(end)} ·{" "}
                <span className="capitalize">{formatNorwegianWeekday(start)}</span>{" "}
                til {formatNorwegianWeekday(end)}
              </div>
              <p className="mt-3 text-sm text-ink/85">{p.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
