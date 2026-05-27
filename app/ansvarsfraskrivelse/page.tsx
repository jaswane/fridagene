import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: "Ansvarsfraskrivelse",
  description:
    "Ansvarsfraskrivelse for Fridagene.no — informasjonen er generell veiledning.",
  path: "/ansvarsfraskrivelse",
});

export default function AnsvarPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/ansvarsfraskrivelse`,
            name: "Ansvarsfraskrivelse",
            description: "Ansvarsfraskrivelse for Fridagene.no.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: "Ansvarsfraskrivelse",
              url: `${SITE.url}/ansvarsfraskrivelse`,
            },
          ]),
        ]}
      />

      <div className="narrow-container pb-12">
        <PageHeader
          title="Ansvarsfraskrivelse"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Ansvarsfraskrivelse" },
          ]}
        />

        <section className="mt-6 prose-soft text-ink/85 leading-relaxed space-y-4">
          <p>
            Informasjonen på Fridagene.no er ment som generell veiledning om
            norske helligdager, fridager og arbeidsdager. Vi bestreber oss på å
            holde innholdet korrekt og oppdatert, men kan ikke garantere at all
            informasjon til enhver tid er feilfri.
          </p>
          <p>
            <strong>Arbeidstid og fridager kan variere etter tariff,
            arbeidsavtale og arbeidsgiver.</strong> Det som vises her er
            offentlige helligdager (lovbestemte) og praktiske planleggingstips —
            ikke en juridisk vurdering av din konkrete arbeidssituasjon.
          </p>
          <p>
            Dager som julaften, nyttårsaften, påskeaften og pinseaften er{" "}
            <em>ikke</em> offentlige helligdager i Norge. Mange har likevel fri
            eller halv dag, men det kommer an på arbeidsforholdet. Inneklemte
            dager er heller ikke automatisk fri.
          </p>
          <p>
            For konkrete spørsmål om dine fridager, kontakt arbeidsgiver,
            tillitsvalgt eller fagforening.
          </p>
          <p>
            Se også: <Link href="/personvern">personvern</Link> ·{" "}
            <Link href="/kontakt">kontakt</Link>.
          </p>
        </section>

        <p className="mt-8 text-xs text-muted">
          Fridagene.no er et prosjekt fra{" "}
          <a href={SITE.company.url} target="_blank" rel="noopener noreferrer">
            Swane Creative
          </a>
          .
        </p>
      </div>
    </>
  );
}
