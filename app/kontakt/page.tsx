import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt Fridagene.no — send oss en e-post for spørsmål eller tilbakemeldinger.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/kontakt`,
            name: "Kontakt Fridagene.no",
            description: "Kontaktinformasjon for Fridagene.no.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Kontakt", url: `${SITE.url}/kontakt` },
          ]),
        ]}
      />

      <div className="narrow-container pb-12">
        <PageHeader
          title="Kontakt"
          crumbs={[{ name: "Forsiden", href: "/" }, { name: "Kontakt" }]}
        />

        <section className="mt-6 prose-soft text-ink/85 leading-relaxed space-y-4">
          <p>
            Spørsmål, tilbakemeldinger eller feil på siden? Send oss en e-post:
          </p>
          <p className="card p-4 inline-block">
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-display text-xl text-accent hover:underline"
            >
              {SITE.contactEmail}
            </a>
          </p>
          <p>
            Fridagene.no eies og drives av{" "}
            <a href={SITE.company.url} target="_blank" rel="noopener noreferrer">
              Swane Creative
            </a>
            .
          </p>
          <p>
            Se også <Link href="/om">om siden</Link> og{" "}
            <Link href="/personvern">personvern</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
