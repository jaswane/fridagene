import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  HOLIDAY_GUIDE_SLUGS,
  getHolidayGuide,
  type HolidayGuide,
} from "@/lib/holidayGuides";
import {
  publicHolidays,
  todayInOslo,
  parseIso,
  formatNorwegianDate,
  formatNorwegianWeekday,
  type Holiday,
} from "@/lib/holidays";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Bruker "i år"/"neste år"-datoer — må ikke fryses ved build.
export const revalidate = 3600;

export function generateStaticParams() {
  return HOLIDAY_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getHolidayGuide(slug);
  if (!guide) return { title: "Ikke funnet" };
  return pageMetadata({
    title: `${guide.name} — dato, hva det er og om butikkene har åpent`,
    description: guide.shortAnswer,
    path: `/helligdager/${guide.slug}`,
  });
}

function holidayForYear(guide: HolidayGuide, year: number): Holiday | undefined {
  return publicHolidays(year).find((h) => h.id === guide.holidayId);
}

export default async function HolidayGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getHolidayGuide(slug);
  if (!guide) notFound();

  const today = todayInOslo();
  const cy = today.getUTCFullYear();
  const thisYear = holidayForYear(guide, cy);
  const nextYear = holidayForYear(guide, cy + 1);

  const faqs = guide.faq ?? [];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/helligdager/${guide.slug}`,
            name: guide.name,
            description: guide.shortAnswer,
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: `Helligdager ${cy}`, url: `${SITE.url}/helligdager-${cy}` },
            { name: guide.name, url: `${SITE.url}/helligdager/${guide.slug}` },
          ]),
          ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Offentlig helligdag"
          title={guide.name}
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: `Helligdager ${cy}`, href: `/helligdager-${cy}` },
            { name: guide.name },
          ]}
        />

        <section className="mt-6 card p-6">
          <p className="text-ink/90 leading-relaxed">{guide.shortAnswer}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {thisYear && (
              <Fact
                k={`Dato i ${cy}`}
                v={`${cap(formatNorwegianWeekday(parseIso(thisYear.date)))} ${formatNorwegianDate(parseIso(thisYear.date))}`}
              />
            )}
            {nextYear && (
              <Fact
                k={`Dato i ${cy + 1}`}
                v={`${cap(formatNorwegianWeekday(parseIso(nextYear.date)))} ${formatNorwegianDate(parseIso(nextYear.date))}`}
              />
            )}
            <Fact k="Offentlig helligdag" v="Ja (rød dag)" />
          </dl>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Hva markerer dagen?</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">{guide.marks}</p>

          <h2 className="font-display text-2xl text-ink mt-8">
            Er butikkene åpne?
          </h2>
          <p className="mt-2 text-ink/85 leading-relaxed">{guide.practical}</p>
          <p className="mt-3 text-sm">
            <Link href="/er-det-apent-i-dag">Sjekk dagstatus for i dag →</Link>
          </p>
        </section>

        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-ink mb-3">
              Vanlige spørsmål
            </h2>
            <div className="grid gap-3">
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
        )}

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Se også</h2>
          <p className="mt-2">
            <Link href={`/helligdager-${cy}`}>Alle helligdager {cy}</Link>
            {" · "}
            <Link href="/neste-fridag">Neste fridag</Link>
            {" · "}
            <Link href="/er-det-apent-i-dag">Er det åpent i dag?</Link>
            {guide.relatedSeason && (
              <>
                {" · "}
                <Link href={`/${guide.relatedSeason}-${cy}`}>
                  {seasonLabel(guide.relatedSeason)} {cy}
                </Link>
              </>
            )}
          </p>
        </section>

        <Disclaimer>
          Fridagene.no viser generell veiledning, ikke sanntids åpningstider.
          Arbeid, skole og åpningstider kan variere etter avtale, bransje og
          lokal praksis. Sjekk lokalt ved tvil.
        </Disclaimer>
      </div>
    </>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg/40 px-4 py-3">
      <dt className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        {k}
      </dt>
      <dd className="text-ink mt-1">{v}</dd>
    </div>
  );
}

function cap(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function seasonLabel(s: string): string {
  switch (s) {
    case "paske":
      return "Påsken";
    case "pinse":
      return "Pinse";
    case "jul":
      return "Jul";
    case "mai":
      return "Mai";
    default:
      return s;
  }
}
