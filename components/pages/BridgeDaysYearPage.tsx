import Link from "next/link";
import {
  bridgeDays,
  formatNorwegianDate,
  formatNorwegianWeekday,
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
          lede="En inneklemt dag er en vanlig arbeidsdag som ligger mellom en helligdag og en helg. Det er ikke en automatisk fridag — men en dag mange velger å ta fri for å lage langhelg."
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
                return (
                  <li key={b.date} className="card p-5">
                    <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                      Inneklemt
                    </div>
                    <div className="font-display text-xl text-ink mt-1 capitalize">
                      {formatNorwegianWeekday(d)} {formatNorwegianDate(d)}
                    </div>
                    <p className="text-sm text-muted mt-1">{b.description}</p>
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
            Mange arbeidsgivere lar ansatte ta dagen fri, men det varierer.
            Sjekk arbeidsavtalen din.
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link>
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
