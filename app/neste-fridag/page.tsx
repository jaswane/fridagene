import Link from "next/link";
import type { Metadata } from "next";
import {
  formatNorwegianDate,
  formatNorwegianWeekday,
  nextPublicHoliday,
  publicHolidays,
  todayInOslo,
  parseIso,
} from "@/lib/holidays";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Neste fridag i Norge — Når har jeg fri?",
  description:
    "Se neste offentlige helligdag i Norge med dato, ukedag og hvor mange dager det er til.",
  path: "/neste-fridag",
});

export default function NextHolidayPage() {
  const today = todayInOslo();
  const next = nextPublicHoliday(today);
  const year = today.getUTCFullYear();
  const remainingThisYear = publicHolidays(year).filter(
    (h) => h.date > next.holiday.date
  );

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/neste-fridag`,
            name: "Neste fridag i Norge",
            description: "Neste offentlige helligdag i Norge med dato og ukedag.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Neste fridag", url: `${SITE.url}/neste-fridag` },
          ]),
        ]}
      />

      <div className="site-container py-8 sm:py-12">
        <Breadcrumbs
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Neste fridag" },
          ]}
        />

        <section className="card mt-6 p-8 sm:p-10 hero-soft">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
            Neste offentlige helligdag
          </p>
          <h1 className="mt-3 font-display tracking-display text-ink text-4xl sm:text-5xl">
            {next.holiday.name}
          </h1>
          <p className="big-date text-ink mt-3">
            {formatNorwegianDate(next.date)}
          </p>
          <p className="mt-2 text-lg text-muted capitalize">
            {formatNorwegianWeekday(next.date)} ·{" "}
            <span className="normal-case">
              {next.isToday
                ? "det er i dag"
                : next.daysUntil === 1
                ? "i morgen"
                : `om ${next.daysUntil} dager`}
            </span>
          </p>
        </section>

        {remainingThisYear.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-ink">
              Resten av helligdagene i {year}
            </h2>
            <ul className="card divide-y divide-line/70 mt-4">
              {remainingThisYear.map((h) => {
                const d = parseIso(h.date);
                return (
                  <li key={h.id} className="flex items-baseline gap-3 px-4 py-2.5">
                    <span className="w-44 shrink-0 text-sm text-muted capitalize">
                      {formatNorwegianWeekday(d)} {formatNorwegianDate(d).replace(` ${year}`, "")}
                    </span>
                    <span className="text-ink">{h.name}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Om offentlige helligdager
          </h2>
          <p className="text-ink/85 leading-relaxed mt-2">
            Norge har 12 offentlige helligdager i året. På disse dagene er det
            lovbestemt fri for de fleste, butikker har som regel stengt og
            offentlige tjenester er redusert. Julaften, nyttårsaften, påskeaften
            og pinseaften er <em>ikke</em> offentlige helligdager — mange har
            likevel fri, men det varierer etter arbeidsavtale og arbeidsgiver.
          </p>
          <p className="mt-4">
            Se også:{" "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link> ·{" "}
            <Link href={`/langhelger-${year}`}>Langhelger {year}</Link> ·{" "}
            <Link href={`/inneklemte-dager-${year}`}>
              Inneklemte dager {year}
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
