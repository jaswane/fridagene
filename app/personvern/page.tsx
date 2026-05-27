import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Personvern",
  description:
    "Personvernerklæring for Fridagene.no — vi samler ikke inn personopplysninger.",
  path: "/personvern",
});

export default function PersonvernPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/personvern`,
            name: "Personvern",
            description: "Personvernerklæring for Fridagene.no.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Personvern", url: `${SITE.url}/personvern` },
          ]),
        ]}
      />

      <div className="narrow-container pb-12">
        <PageHeader
          title="Personvern"
          crumbs={[{ name: "Forsiden", href: "/" }, { name: "Personvern" }]}
        />

        <section className="mt-6 prose-soft text-ink/85 leading-relaxed space-y-4">
          <p>
            Fridagene.no er et statisk informasjonsverktøy som ikke krever
            innlogging eller registrering. Vi samler ikke aktivt inn
            personopplysninger om besøkende.
          </p>

          <h2 className="font-display text-xl text-ink mt-6">Informasjonskapsler</h2>
          <p>
            Vi bruker ikke informasjonskapsler (cookies) for sporing. Tjenesten
            kan bruke teknisk nødvendige informasjonskapsler for grunnleggende
            funksjonalitet.
          </p>

          <h2 className="font-display text-xl text-ink mt-6">Logger</h2>
          <p>
            Webserveren kan logge teknisk informasjon som IP-adresse, nettleser
            og hvilke sider som besøkes — dette brukes utelukkende til drift,
            sikkerhet og feilsøking, og lagres ikke lenger enn nødvendig.
          </p>

          <h2 className="font-display text-xl text-ink mt-6">Ansvarlig</h2>
          <p>
            Behandlingsansvarlig er{" "}
            <a href={SITE.company.url} target="_blank" rel="noopener noreferrer">
              Swane Creative
            </a>
            . For spørsmål om personvern, se <Link href="/kontakt">kontakt</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
