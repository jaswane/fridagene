import Link from "next/link";
import {
  longWeekends,
  parseIso,
  formatNorwegianDate,
  formatNorwegianWeekday,
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

export function LongWeekendsYearPage({ year }: { year: number }) {
  const longs = longWeekends(year);
  const freebies = longs.filter((lw) => lw.vacationDaysNeeded === 0).length;
  const itemList = itemListSchema({
    name: `Langhelger i Norge ${year}`,
    items: longs.map((lw) => ({
      name: `${formatNorwegianDate(parseIso(lw.start))} – ${formatNorwegianDate(
        parseIso(lw.end)
      )}`,
      description: `${lw.days} dager sammenhengende fri. ${
        lw.vacationDaysNeeded === 0
          ? "Uten feriedager."
          : `${lw.vacationDaysNeeded} feriedag${lw.vacationDaysNeeded > 1 ? "er" : ""} kreves.`
      } ${lw.includes.holidays.join(", ") || "helg"}.`,
    })),
  });

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/langhelger-${year}`,
            name: `Langhelger ${year}`,
            description: `Alle langhelger i Norge i ${year} — strekk på tre eller flere sammenhengende fridager.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: `Langhelger ${year}`, url: `${SITE.url}/langhelger-${year}` },
          ]),
          itemList,
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Langhelger"
          title={`Langhelger i Norge ${year}`}
          lede={`${longs.length} langhelger i ${year}, hvorav ${freebies} kommer uten å bruke en eneste feriedag. Langhelger oppstår når en helligdag faller på fredag eller mandag, eller når en helligdag på torsdag kan kombineres med én feriedag på fredag.`}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Langhelger ${year}` },
          ]}
        />

        <section className="mt-8">
          {longs.length === 0 ? (
            <p className="text-muted">Ingen langhelger funnet i {year}.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {longs.map((lw) => {
                const start = parseIso(lw.start);
                const end = parseIso(lw.end);
                const vac = lw.vacationDaysNeeded;
                return (
                  <li key={lw.start} className="card p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                        {lw.days} sammenhengende dager
                      </div>
                      <span
                        className={
                          vac === 0
                            ? "chip-tag"
                            : "chip-tag chip-tag--practical"
                        }
                      >
                        {vac === 0
                          ? "Uten feriedag"
                          : vac === 1
                          ? "1 feriedag"
                          : `${vac} feriedager`}
                      </span>
                    </div>
                    <div className="font-display text-xl text-ink mt-1">
                      {formatNorwegianDate(start).replace(` ${year}`, "")} –{" "}
                      {formatNorwegianDate(end)}
                    </div>
                    <div className="text-sm text-muted mt-1">
                      <span className="capitalize">
                        {formatNorwegianWeekday(start)}
                      </span>{" "}
                      til {formatNorwegianWeekday(end)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lw.includes.holidays.map((h) => (
                        <span key={h} className="chip-tag">{h}</span>
                      ))}
                    </div>
                    {vac > 0 && (
                      <p className="mt-3 text-sm text-muted">
                        Tar du fri {vac === 1 ? "den inneklemte dagen" : `de ${vac} inneklemte dagene`}, får du hele
                        strekket sammenhengende.
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Slik leser du listen</h2>
          <p className="mt-2">
            Vi regner et strekk som langhelg når det er minst tre sammenhengende
            dager der minst én er offentlig helligdag. «Uten feriedag» betyr at
            hele strekket dekkes av helligdag + helg. «1 feriedag» betyr at det
            ligger én inneklemt dag i strekket som du må ta fri for å låse opp
            hele perioden — det er ingen automatisk fridag.
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
            {" · "}
            <Link href={`/fa-mest-fri-${year}`}>Få mest fri i {year}</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href="/arbeidsdager">Arbeidsdager-kalkulator</Link>
            {" · "}
            <Link href={`/langhelger-${year + 1}`}>
              Langhelger {year + 1}
            </Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}
