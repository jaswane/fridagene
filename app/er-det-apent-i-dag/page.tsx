import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { getDayStatus } from "@/lib/dayStatus";
import { guideSlugForHolidayId } from "@/lib/holidayGuides";
import {
  todayInOslo,
  formatNorwegianWeekday,
  nextPublicHoliday,
  formatNorwegianDate,
} from "@/lib/holidays";

// Bruker dagens dato (Europe/Oslo) — må ikke fryses ved build.
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Er det åpent i dag? Butikker, helligdager og praktisk dagstatus",
  description:
    "Se om i dag er vanlig hverdag, helligdag, flaggdag eller spesiell dag, og få generell veiledning om butikker og åpningstider.",
  path: "/er-det-apent-i-dag",
});

const FAQS = [
  {
    q: "Er butikkene åpne i dag?",
    a: "Det kommer an på hva slags dag det er. På vanlige hverdager og lørdager har de fleste butikker åpent. På søndager er butikker som hovedregel stengt, med unntak for søndagsåpne butikker. På offentlige helligdager holder mange stengt. Sjekk alltid din lokale butikk ved tvil.",
  },
  {
    q: "Hva er forskjellen på rød dag og vanlig fridag?",
    a: "En rød dag er en søndag eller en offentlig helligdag. Dager som julaften og nyttårsaften er ikke røde dager, men mange har likevel fri eller kortere dag etter avtale.",
  },
  {
    q: "Hvorfor kan åpningstidene variere lokalt?",
    a: "Kjøpesentre, kjeder og enkeltbutikker setter egne åpningstider. Spesielt rundt helligdager og høytider kan tidene avvike fra det normale. Derfor bør du alltid sjekke butikken du skal besøke.",
  },
];

export default function OpenTodayPage() {
  const today = todayInOslo();
  const status = getDayStatus(today);
  const year = today.getUTCFullYear();
  const next = nextPublicHoliday(today);
  const todayGuideSlug = status.publicHolidayId
    ? guideSlugForHolidayId(status.publicHolidayId)
    : undefined;

  const shortAnswer = status.isRedDay
    ? "Som hovedregel: mange butikker holder stengt eller har redusert åpningstid i dag."
    : status.category === "praktisk-fridag"
    ? "Mange butikker kan ha kortere åpningstid i dag."
    : "De fleste butikker følger normalt vanlige åpningstider i dag.";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/er-det-apent-i-dag`,
            name: "Er det åpent i dag?",
            description:
              "Generell dagstatus og praktisk veiledning om butikker og åpningstider for dagens dato.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Er det åpent i dag?", url: `${SITE.url}/er-det-apent-i-dag` },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Dagstatus"
          title="Er det åpent i dag?"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Er det åpent i dag?" },
          ]}
        />

        <section className="mt-6 card p-6 sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
            I dag
          </p>
          <p className="big-number text-ink mt-2 capitalize">
            {formatNorwegianWeekday(today)} {status.formatted}
          </p>
          <p className="mt-3 text-lg text-ink/90">{status.summary}</p>
          <p className="mt-2 text-ink/85">{shortAnswer}</p>
          <p className="mt-4 text-sm text-muted">{status.openingGuidance}</p>
          {todayGuideSlug && (
            <p className="mt-3 text-sm">
              <Link href={`/helligdager/${todayGuideSlug}`}>
                Mer om {status.publicHolidayName} →
              </Link>
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className={status.isRedDay ? "chip-tag chip-tag--practical" : "chip-tag"}>
              {status.isRedDay ? "Rød dag" : "Ikke rød dag"}
            </span>
            {status.isPublicHoliday && <span className="chip-tag">Offentlig helligdag</span>}
            {status.isFlagDay && <span className="chip-tag">Flaggdag</span>}
            {status.isPracticalDay && (
              <span className="chip-tag chip-tag--practical">Praktisk fridag</span>
            )}
            {status.isBridgeDay && (
              <span className="chip-tag chip-tag--practical">Inneklemt dag</span>
            )}
          </div>
        </section>

        <section className="mt-8 card p-6">
          <h2 className="font-display text-xl text-ink">Alkoholsalg i dag</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            {status.alcoholGuidance}
          </p>
          <p className="mt-3 text-sm text-muted">
            Kilder og mer info:{" "}
            <a
              href="https://www.helsedirektoratet.no/rundskriv/alkoholloven-med-kommentarer"
              target="_blank"
              rel="noopener nofollow"
            >
              Helsedirektoratet om alkoholloven (§ 3-7)
            </a>
            {" · "}
            <a
              href="https://lovdata.no/lov/1989-06-02-27/§3-4"
              target="_blank"
              rel="noopener nofollow"
            >
              Lovdata § 3-4 (Vinmonopolet)
            </a>
            {" · "}
            <a
              href="https://www.vinmonopolet.no/"
              target="_blank"
              rel="noopener nofollow"
            >
              vinmonopolet.no
            </a>
            {" · "}
            <Link href="/alkoholsalg-helligdager">Alkoholsalg på helligdager</Link>
          </p>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Hva påvirker åpningstidene?
          </h2>
          <ul className="mt-3 space-y-2 text-ink/85 list-disc pl-5">
            <li>
              <strong>Offentlig helligdag:</strong> mange butikker stengt; enkelte
              helligdagsåpne butikker, kiosker og bensinstasjoner kan ha åpent.
            </li>
            <li>
              <strong>Søndag:</strong> butikker som hovedregel stengt, men
              søndagsåpne butikker og enkelte bransjer kan ha unntak.
            </li>
            <li>
              <strong>Julaften og nyttårsaften:</strong> ikke offentlige
              helligdager, men ofte reduserte åpningstider eller stengt.
            </li>
            <li>
              <strong>Påskeaften og pinseaften:</strong> ikke offentlige
              helligdager, men mange butikker kan ha kortere åpningstid.
            </li>
            <li>
              <strong>Lokale avvik:</strong> kjøpesentre og kjeder kan ha egne
              tider — sjekk lokal butikk ved tvil.
            </li>
          </ul>
          <p className="mt-4">
            Neste offentlige helligdag er{" "}
            <Link href="/neste-fridag">
              {next.holiday.name} {formatNorwegianDate(next.date)}
            </Link>
            .
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href="/neste-fridag">Neste fridag</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href={`/flaggdager-${year}`}>Flaggdager {year}</Link>
            {" · "}
            <Link href="/nar-stenger-butikkene-pinseaften">
              Når stenger butikkene pinseaften?
            </Link>
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
          Fridagene.no viser generell dagstatus og praktiske planleggingstips —
          ikke sanntids åpningstider. Vi kan ikke garantere at en konkret butikk
          er åpen eller stengt. Sjekk alltid din lokale butikk ved tvil.
        </Disclaimer>
      </div>
    </>
  );
}
