import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import {
  isoWeekMonday,
  addDays,
  formatNorwegianDate,
  todayInOslo,
} from "@/lib/holidays";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Når er fellesferien? Uker, datoer og hva det betyr",
  description:
    "Fellesferien er vanligvis uke 28, 29 og 30 i juli. Se datoer, forklaring og hva som gjelder for jobb, ferie og planlegging.",
  path: "/fellesferien",
});

const FAQS = [
  {
    q: "Hvilke uker er fellesferien?",
    a: "Fellesferien legges vanligvis til uke 28, 29 og 30 i juli. Det er ingen lovbestemt regel om akkurat disse ukene — det er en innarbeidet praksis i mange bransjer.",
  },
  {
    q: "Har alle fri i fellesferien?",
    a: "Nei. Fellesferien er ikke en offentlig helligdag eller en lovpålagt fri for alle. Mange bedrifter holder helt eller delvis åpent, og om du har fri avhenger av arbeidsgiver, bransje, tariff og avtale.",
  },
  {
    q: "Er fellesferien det samme som skoleferien?",
    a: "Nei. Skolenes sommerferie og fellesferien overlapper ofte, men er ikke det samme. Skoleruta fastsettes lokalt og kan ha andre datoer enn fellesferien.",
  },
  {
    q: "Hvorfor heter det fellesferie?",
    a: "Begrepet stammer historisk fra blant annet bygningsbransjen, der mange tok ferie samtidig. I dag brukes «fellesferie» bredt om den vanlige sommerferieperioden i juli.",
  },
];

export default function CommonHolidayPage() {
  const year = todayInOslo().getUTCFullYear();
  const start = isoWeekMonday(year, 28); // mandag uke 28
  const end = addDays(isoWeekMonday(year, 30), 4); // fredag uke 30

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/fellesferien`,
            name: "Når er fellesferien?",
            description:
              "Fellesferien er vanligvis uke 28, 29 og 30 i juli. Datoer, forklaring og hva som gjelder.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Fellesferien", url: `${SITE.url}/fellesferien` },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Sommerferie"
          title="Når er fellesferien?"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Fellesferien" },
          ]}
        />

        <section className="mt-6 card p-6">
          <p className="text-ink/90 leading-relaxed">
            Fellesferien legges vanligvis til <strong>uke 28, 29 og 30</strong> i
            juli. Den gjelder ikke automatisk for alle, men er en vanlig
            ferieperiode i mange bransjer.
          </p>
          <div className="mt-4 rounded-xl bg-accent-soft/60 px-4 py-3">
            <div className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              Fellesferien {year} (uke 28–30)
            </div>
            <div className="font-display text-xl text-ink mt-1">
              {formatNorwegianDate(start)} – {formatNorwegianDate(end)}
            </div>
            <p className="text-sm text-muted mt-1">
              Mandag i uke 28 til fredag i uke 30.
            </p>
          </div>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Hva er fellesferien?</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            «Fellesferie» er et innarbeidet begrep for den vanlige
            sommerferieperioden i juli. Historisk var den særlig knyttet til
            bygningsbransjen, der mange tok ferie samtidig, men i dag brukes
            begrepet bredt.
          </p>
          <p className="mt-3 text-ink/85 leading-relaxed">
            Fellesferien er <strong>ikke</strong> en offentlig helligdag eller en
            lovbestemt fridag for alle. Om du faktisk har fri — og når — avhenger
            av arbeidsgiver, bransje, tariff og individuell avtale. Mange
            virksomheter holder helt eller delvis åpent gjennom hele sommeren.
          </p>
          <h2 className="font-display text-2xl text-ink mt-8">
            Fellesferie og skoleferie
          </h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            Skolenes sommerferie overlapper ofte med fellesferien, men er ikke det
            samme. Skoleruta fastsettes lokalt og kan ha andre start- og
            sluttdatoer enn fellesferien.
          </p>
          <p className="mt-4">
            Se også:{" "}
            <Link href="/arbeidsdager">Arbeidsdager-kalkulator</Link>
            {" · "}
            <Link href={`/fa-mest-fri-${year}`}>Få mest fri i {year}</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
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
          Fellesferien er en vanlig praksis, ikke en lovbestemt fri for alle.
          Ferie kan variere etter arbeidsgiver, bransje, tariff og avtale — sjekk
          med din arbeidsgiver.
        </Disclaimer>
      </div>
    </>
  );
}
