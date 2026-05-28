import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import {
  addDays,
  easterSunday,
  formatNorwegianDate,
  formatNorwegianWeekday,
  isoDate,
  todayInOslo,
} from "@/lib/holidays";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Når stenger butikkene pinseaften?",
  description:
    "Pinseaften er ikke en offentlig helligdag, men mange butikker kan ha kortere åpningstid. Se datoer for pinse og generell veiledning.",
  path: "/nar-stenger-butikkene-pinseaften",
});

const FAQS = [
  {
    q: "Er pinseaften en helligdag?",
    a: "Nei. Pinseaften er ikke en offentlig helligdag i Norge. Den faller alltid på en lørdag, dagen før 1. pinsedag. Mange butikker har likevel kortere åpningstid.",
  },
  {
    q: "Er butikkene åpne pinseaften?",
    a: "Som regel ja, men ofte med kortere åpningstid enn en vanlig lørdag. Kjøpesentre, dagligvarebutikker og lokale butikker kan ha ulike tider, så sjekk alltid butikken du skal besøke.",
  },
  {
    q: "Har Vinmonopolet åpent pinseaften?",
    a: "Vinmonopolet kan ha egne åpningstider rundt helligdager. Sjekk alltid vinmonopolet.no eller ditt lokale utsalg for nøyaktig tid.",
  },
  {
    q: "Er 2. pinsedag rød dag?",
    a: "Ja. Både 1. pinsedag og 2. pinsedag er offentlige helligdager (røde dager). Pinseaften (lørdagen før) er det ikke.",
  },
];

export default function PentecostEvePage() {
  const today = todayInOslo();
  // Vis kommende pinse: inneværende år hvis pinseaften ikke er passert,
  // ellers neste år.
  const yearNow = today.getUTCFullYear();
  const eveThisYear = addDays(easterSunday(yearNow), 48);
  const year = isoDate(eveThisYear) >= isoDate(today) ? yearNow : yearNow + 1;

  const easter = easterSunday(year);
  const pinseaften = addDays(easter, 48); // lørdag
  const pinsedag1 = addDays(easter, 49); // søndag
  const pinsedag2 = addDays(easter, 50); // mandag

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/nar-stenger-butikkene-pinseaften`,
            name: "Når stenger butikkene pinseaften?",
            description:
              "Pinseaften er ikke en offentlig helligdag, men mange butikker kan ha kortere åpningstid.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: "Når stenger butikkene pinseaften?",
              url: `${SITE.url}/nar-stenger-butikkene-pinseaften`,
            },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Åpningstider"
          title="Når stenger butikkene pinseaften?"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Pinseaften" },
          ]}
        />

        <section className="mt-6 card p-6">
          <p className="text-ink/90 leading-relaxed">
            Pinseaften er <strong>ikke</strong> en offentlig helligdag, men mange
            butikker kan ha kortere åpningstid. Kjøpesentre, dagligvarebutikker og
            lokale butikker kan ha ulike tider, så sjekk alltid butikken du skal
            besøke.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl text-ink mb-3">Datoer for pinse {year}</h2>
          <ul className="card divide-y divide-line/70">
            {[
              { d: pinseaften, name: "Pinseaften", tag: "Ikke offentlig helligdag" },
              { d: pinsedag1, name: "1. pinsedag", tag: "Offentlig helligdag" },
              { d: pinsedag2, name: "2. pinsedag", tag: "Offentlig helligdag" },
            ].map((row) => (
              <li
                key={row.name}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3"
              >
                <div className="sm:w-48 shrink-0">
                  <div className="text-ink font-medium">{formatNorwegianDate(row.d)}</div>
                  <div className="text-xs text-muted capitalize">
                    {formatNorwegianWeekday(row.d)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-ink">{row.name}</span>
                  <span
                    className={
                      row.tag === "Offentlig helligdag"
                        ? "chip-tag"
                        : "chip-tag chip-tag--practical"
                    }
                  >
                    {row.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Pinseaften, 1. og 2. pinsedag
          </h2>
          <p className="mt-2">
            <strong>Pinseaften</strong> er lørdagen før pinse — en vanlig lørdag i
            lovens forstand, men mange butikker stenger tidligere. <strong>1.
            pinsedag</strong> (søndag) og <strong>2. pinsedag</strong> (mandag) er
            offentlige helligdager, og da holder de fleste butikker stengt.
          </p>
          <p className="mt-3">
            Vinmonopolet kan ha egne åpningstider rundt helligdager. Sjekk alltid{" "}
            <a
              href="https://www.vinmonopolet.no/"
              target="_blank"
              rel="noopener nofollow"
            >
              vinmonopolet.no
            </a>{" "}
            eller ditt lokale utsalg for nøyaktig tid.
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href={`/pinse-${year}`}>Pinse {year}</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href="/er-det-apent-i-dag">Er det åpent i dag?</Link>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink mb-3">Vanlige spørsmål</h2>
          <div className="grid gap-3">
            {FAQS.map((f) => (
              <details key={f.q} className="card-soft px-4 py-3">
                <summary className="cursor-pointer text-ink font-medium">{f.q}</summary>
                <p className="text-muted mt-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Disclaimer>
          Fridagene.no viser generell veiledning, ikke sanntids åpningstider. Vi
          kan ikke garantere åpningstidene til en konkret butikk eller
          Vinmonopolet — sjekk alltid offisiell kilde.
        </Disclaimer>
      </div>
    </>
  );
}
