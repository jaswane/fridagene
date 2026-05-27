import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Om Fridagene.no",
  description:
    "Fridagene.no er et enkelt norsk verktøy som svarer på når du har fri — helligdager, langhelger, inneklemte dager og arbeidsdager.",
  path: "/om",
});

export default function OmPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/om`,
            name: "Om Fridagene.no",
            description: "Hvem står bak Fridagene.no og hva siden er til for.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            { name: "Om", url: `${SITE.url}/om` },
          ]),
        ]}
      />

      <div className="narrow-container pb-12">
        <PageHeader
          title="Om Fridagene.no"
          crumbs={[{ name: "Forsiden", href: "/" }, { name: "Om" }]}
        />

        <section className="mt-6 prose-soft text-ink/85 leading-relaxed space-y-4">
          <p>
            Fridagene.no er et rolig norsk verktøy som svarer på spørsmålet:{" "}
            <em>«når har jeg fri?»</em>. Vi viser offentlige helligdager,
            langhelger, inneklemte dager og hjelper deg å regne ut arbeidsdager.
          </p>
          <p>
            Vi skiller tydelig mellom offentlige helligdager — som er lovbestemt
            fri — og praktiske fridager som julaften og nyttårsaften, der mange
            har fri men det avhenger av arbeidsavtale.
          </p>
          <p>
            Siden eies og drives av{" "}
            <a
              href={SITE.company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Swane Creative
            </a>
            . Spørsmål eller tilbakemeldinger? Se{" "}
            <Link href="/kontakt">kontakt</Link>.
          </p>
          <p>
            Les også:{" "}
            <Link href="/personvern">personvern</Link> ·{" "}
            <Link href="/ansvarsfraskrivelse">ansvarsfraskrivelse</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
