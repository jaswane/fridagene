import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WorkdaysCalculator } from "@/components/WorkdaysCalculator";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { getCurrentYear } from "@/lib/currentYear";

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: "Arbeidsdager-kalkulator — Regn ut arbeidsdager mellom datoer",
  description:
    "Regn ut antall arbeidsdager mellom to datoer i Norge. Tar hensyn til de 12 offentlige helligdagene og helger.",
  path: "/arbeidsdager",
});

export default function WorkdaysPage() {
  const year = getCurrentYear();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/arbeidsdager`,
            name: "Arbeidsdager-kalkulator",
            description:
              "Regn ut antall arbeidsdager mellom to datoer i Norge.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Arbeidsdager", url: `${SITE.url}/arbeidsdager` },
          ]),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Arbeidsdager"
          title="Arbeidsdager mellom to datoer"
          lede="Velg fra- og til-dato. Vi teller mandag–fredag minus norske offentlige helligdager i perioden."
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Arbeidsdager" },
          ]}
        />

        <section className="mt-8">
          <WorkdaysCalculator />
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Slik regner vi arbeidsdager
          </h2>
          <p className="mt-2">
            En arbeidsdag er en mandag, tirsdag, onsdag, torsdag eller fredag
            som ikke faller på en offentlig helligdag. Helger og helligdager
            telles som fridager.
          </p>
          <p className="mt-3">
            Julaften og nyttårsaften regnes <strong>som arbeidsdager</strong>{" "}
            her, fordi de ikke er offentlige helligdager. Mange har likevel fri
            eller halv dag — det avhenger av arbeidsavtalen.
          </p>
          <p className="mt-3">
            Se også:{" "}
            <Link href={`/arbeidsdager-${year}`}>Arbeidsdager {year}</Link>
            {" · "}
            <Link href={`/arbeidsdager-${year + 1}`}>
              Arbeidsdager {year + 1}
            </Link>
            {" · "}
            <Link href="/fellesferien">Når er fellesferien?</Link>
            {" · "}
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
          </p>
        </section>

        <Disclaimer />
      </div>
    </>
  );
}
