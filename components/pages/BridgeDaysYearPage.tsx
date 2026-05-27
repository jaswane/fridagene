import Link from "next/link";
import {
  bridgeDays,
  formatNorwegianDate,
  formatNorwegianWeekday,
  longWeekends,
  parseIso,
} from "@/lib/holidays";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";

export function BridgeDaysYearPage({ year }: { year: number }) {
  const bridges = bridgeDays(year);
  const longs = longWeekends(year);

  // For hver inneklemt dag: hvilken langhelg ligger den i? Hvor mye fri får
  // du om du tar dagen?
  const longWeekendForBridge = (iso: string) =>
    longs.find((lw) => lw.includes.bridges.includes(iso));

  const itemList = itemListSchema({
    name: `Inneklemte dager i Norge ${year}`,
    items: bridges.map((b) => ({
      name: `${formatNorwegianWeekday(parseIso(b.date))} ${formatNorwegianDate(
        parseIso(b.date)
      )}`,
      description: b.description,
    })),
  });

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/inneklemte-dager-${year}`,
            name: `Inneklemte dager ${year}`,
            description: `Inneklemte dager i Norge i ${year} — arbeidsdager mellom helligdager og helger.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `Inneklemte dager ${year}`,
              url: `${SITE.url}/inneklemte-dager-${year}`,
            },
          ]),
          itemList,
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Inneklemte dager"
          title={`Inneklemte dager i Norge ${year}`}
          lede="En inneklemt dag er en vanlig arbeidsdag som ligger mellom en helligdag og en helg. Den er ikke automatisk fri — men hvis du tar den som feriedag låser du opp en lengre sammenhengende periode med fri."
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Inneklemte dager ${year}` },
          ]}
        />

        <section className="mt-8">
          {bridges.length === 0 ? (
            <p className="text-muted">
              Ingen inneklemte dager i {year} (helligdagene faller gunstig).
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {bridges.map((b) => {
                const d = parseIso(b.date);
                const lw = longWeekendForBridge(b.date);
                const start = lw ? parseIso(lw.start) : null;
                const end = lw ? parseIso(lw.end) : null;
                return (
                  <li key={b.date} className="card p-5">
                    <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                      Inneklemt arbeidsdag
                    </div>
                    <div className="font-display text-xl text-ink mt-1">
                      <span className="capitalize">
                        {formatNorwegianWeekday(d)}
                      </span>{" "}
                      {formatNorwegianDate(d)}
                    </div>
                    <p className="text-sm text-muted mt-1">{b.description}</p>
                    {lw && start && end && (
                      <div className="mt-3 rounded-xl bg-accent-soft/60 px-3 py-2 text-sm text-ink">
                        Tar du fri denne dagen, får du{" "}
                        <strong>{lw.days} sammenhengende fridager</strong> fra{" "}
                        {formatNorwegianDate(start).replace(` ${year}`, "")}{" "}
                        til {formatNorwegianDate(end)}.
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Hva er en inneklemt dag?
          </h2>
          <p className="mt-2">
            En inneklemt dag er en vanlig arbeidsdag (mandag–fredag) som ligger
            mellom to ikke-arbeidsdager. Det mest klassiske eksempelet i Norge
            er fredagen etter Kristi himmelfartsdag — torsdag er helligdag, og
            lørdag er helg, så fredagen blir «klemt inne».
          </p>
          <p className="mt-3">
            Det er <strong>ikke</strong> automatisk fri på inneklemte dager.
            Mange arbeidsgivere lar ansatte ta dagen fri, men det varierer
            etter tariff og arbeidsavtale. Sjekk med arbeidsgiver før du
            planlegger.
          </p>
          <p className="mt-3">
            Vil du se hvilke inneklemte dager som gir mest sammenhengende fri
            for færrest feriedager? Se{" "}
            <Link href={`/fa-mest-fri-${year}`}>Få mest fri i {year}</Link>.
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href="/arbeidsdager">Arbeidsdager-kalkulator</Link>
            {" · "}
            <Link href={`/inneklemte-dager-${year + 1}`}>
              Inneklemte dager {year + 1}
            </Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}
