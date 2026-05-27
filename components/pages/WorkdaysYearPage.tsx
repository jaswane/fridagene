import Link from "next/link";
import {
  dateOf,
  publicHolidays,
  workdaysBetween,
  workdaysInYear,
} from "@/lib/holidays";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const MONTHS_NB = [
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

export function WorkdaysYearPage({ year }: { year: number }) {
  const total = workdaysInYear(year);
  const holidaysOnWeekday = publicHolidays(year).filter((h) => {
    const d = new Date(h.date + "T00:00:00Z");
    const w = d.getUTCDay();
    return w >= 1 && w <= 5;
  }).length;

  const monthly: { month: string; days: number }[] = MONTHS_NB.map((name, i) => {
    const start = dateOf(year, i + 1, 1);
    const end = i === 11 ? dateOf(year, 12, 31) : dateOf(year, i + 2, 0);
    return { month: name, days: workdaysBetween(start, end) };
  });

  // Kvartal-fordeling
  const quarters = [
    { q: "Q1", days: monthly.slice(0, 3).reduce((a, b) => a + b.days, 0) },
    { q: "Q2", days: monthly.slice(3, 6).reduce((a, b) => a + b.days, 0) },
    { q: "Q3", days: monthly.slice(6, 9).reduce((a, b) => a + b.days, 0) },
    { q: "Q4", days: monthly.slice(9, 12).reduce((a, b) => a + b.days, 0) },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/arbeidsdager-${year}`,
            name: `Arbeidsdager i ${year}`,
            description: `Antall arbeidsdager i Norge i ${year}, fordelt på måneder og kvartal.`,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: `Arbeidsdager ${year}`,
              url: `${SITE.url}/arbeidsdager-${year}`,
            },
          ]),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Arbeidsdager"
          title={`Arbeidsdager i Norge ${year}`}
          lede={`Arbeidsdager regnet som mandag–fredag minus de ${holidaysOnWeekday} offentlige helligdagene som faller på en hverdag. Julaften og nyttårsaften regnes som arbeidsdager — de er ikke offisielt fri.`}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Arbeidsdager ${year}` },
          ]}
        />

        <section className="mt-8 card p-6">
          <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
            Totalt i {year}
          </div>
          <div className="big-number text-ink mt-1">{total}</div>
          <p className="text-muted mt-2">arbeidsdager</p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink mb-3">Per kvartal</h2>
            <ul className="card divide-y divide-line/70">
              {quarters.map((q) => (
                <li
                  key={q.q}
                  className="flex items-baseline justify-between px-4 py-3"
                >
                  <span className="text-ink">{q.q}</span>
                  <span className="text-ink font-medium">{q.days}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink mb-3">Per måned</h2>
            <ul className="card divide-y divide-line/70">
              {monthly.map((m) => (
                <li
                  key={m.month}
                  className="flex items-baseline justify-between px-4 py-2.5"
                >
                  <span className="text-ink capitalize">{m.month}</span>
                  <span className="text-ink font-medium">{m.days}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Andre år og verktøy
          </h2>
          <p className="mt-2">
            <Link href={`/arbeidsdager-${year - 1}`}>
              Arbeidsdager {year - 1}
            </Link>
            {" · "}
            <Link href={`/arbeidsdager-${year + 1}`}>
              Arbeidsdager {year + 1}
            </Link>
            {" · "}
            <Link href="/arbeidsdager">Kalkulator mellom datoer</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}
