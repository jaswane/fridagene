import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: "Alkoholsalg på helligdager — øl i butikk og Vinmonopolet",
  description:
    "Generell veiledning om alkoholsalg på helligdager og dagen før: øl i dagligvarebutikk, Vinmonopolet og lokale forskjeller. Sjekk alltid lokalt.",
  path: "/alkoholsalg-helligdager",
});

const FAQS = [
  {
    q: "Kan man kjøpe øl på helligdager?",
    a: "Som hovedregel er salg av alkoholholdig drikk i dagligvarebutikk ikke tillatt på søn- og helligdager. Selve butikken kan holde åpent (f.eks. søndagsåpne butikker), men ølsalget er normalt stengt. Reglene er fastsatt i alkoholloven § 3-7 og kan ha lokale tilpasninger.",
  },
  {
    q: "Når stenger ølsalget dagen før helligdag?",
    a: "På dager før søn- og helligdager stopper salg av alkoholholdig drikk gruppe 1 (øl o.l.) i butikk normalt senest kl. 18.00. På vanlige hverdager er grensen normalt kl. 20.00. Kommunen kan sette kortere tider, så sjekk lokalt.",
  },
  {
    q: "Gjelder dagen før Kristi himmelfartsdag, 1. mai og 17. mai?",
    a: "Nei. Dagen før Kristi himmelfartsdag, dagen før 1. mai og dagen før 17. mai regnes ikke som «dag før søn-/helligdag» i denne sammenhengen, og har derfor normalt den vanlige hverdagsgrensen (kl. 20.00) — med mindre dagen uansett er en lørdag eller dag før en søndag.",
  },
  {
    q: "Gjelder samme regler for Vinmonopolet?",
    a: "Nei. Vinmonopolet har egne regler (alkoholloven § 3-4) og utsalgsspesifikke åpningstider. Sjekk alltid vinmonopolet.no eller ditt lokale utsalg for nøyaktig tid.",
  },
  {
    q: "Hvor sjekker jeg lokale tider?",
    a: "Maksimaltidene er nasjonale, men kommunen kan vedta kortere salgstider. Sjekk kommunens nettsider for lokale salgstider, og butikken du skal handle i. For brennevin/vin: vinmonopolet.no.",
  },
];

export default function AlcoholHolidaysPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/alkoholsalg-helligdager`,
            name: "Alkoholsalg på helligdager",
            description:
              "Generell veiledning om alkoholsalg på helligdager og dagen før. Butikk, Vinmonopolet og lokale forskjeller.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: "Alkoholsalg på helligdager",
              url: `${SITE.url}/alkoholsalg-helligdager`,
            },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Alkoholsalg"
          title="Alkoholsalg på helligdager"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Alkoholsalg på helligdager" },
          ]}
        />

        <section className="mt-6 card p-6">
          <p className="text-ink/90 leading-relaxed">
            Salg av alkohol i dagligvarebutikk er regulert lokalt av kommunen
            innenfor nasjonale maksimaltider. Tidene under er <strong>generelle
            hovedregler</strong> — de kan være kortere lokalt, så sjekk alltid
            kommunen og butikken du skal handle i.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl text-ink mb-3">
            Hovedregler for øl i butikk (gruppe 1)
          </h2>
          <ul className="card divide-y divide-line/70">
            <Row
              k="Vanlig hverdag"
              v="Salg normalt senest kl. 20.00."
            />
            <Row
              k="Dag før søn-/helligdag (inkl. lørdag)"
              v="Salg normalt senest kl. 18.00."
            />
            <Row
              k="Søn- og helligdager"
              v="Salg i butikk som hovedregel ikke tillatt."
            />
            <Row
              k="Dag før Kr. himmelfart / 1. mai / 17. mai"
              v="Regnes ikke som dag før helligdag — normalt kl. 20.00."
            />
          </ul>
          <p className="mt-3 text-sm text-muted">
            «Gruppe 1» er alkoholholdig drikk med lavere alkoholinnhold, som øl.
            Tidene gjelder salg i dagligvarebutikk og er nasjonale
            maksimaltider; kommunen kan sette kortere tider.
          </p>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Vinmonopolet</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            Vinmonopolet har egne regler (alkoholloven § 3-4) og
            utsalgsspesifikke åpningstider, særlig rundt helligdager. Vi oppgir
            ikke konkrete tider her — sjekk alltid{" "}
            <a
              href="https://www.vinmonopolet.no/"
              target="_blank"
              rel="noopener nofollow"
            >
              vinmonopolet.no
            </a>{" "}
            eller ditt lokale utsalg.
          </p>

          <h2 className="font-display text-2xl text-ink mt-8">Lokale forskjeller</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            Kommunen vedtar salgstider innenfor de nasjonale rammene, og kan
            sette kortere tider enn maksimaltidene. På dager som julaften og
            nyttårsaften har mange steder kortere salgstid enn ellers. Sjekk
            kommunens nettsider og den aktuelle butikken.
          </p>

          <h2 className="font-display text-2xl text-ink mt-8">Kilder</h2>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            <li>
              <a
                href="https://www.helsedirektoratet.no/rundskriv/alkoholloven-med-kommentarer"
                target="_blank"
                rel="noopener nofollow"
              >
                Helsedirektoratet — alkoholloven med kommentarer (§ 3-7)
              </a>
            </li>
            <li>
              <a
                href="https://lovdata.no/lov/1989-06-02-27/§3-4"
                target="_blank"
                rel="noopener nofollow"
              >
                Lovdata — alkoholloven § 3-4 (Vinmonopolet)
              </a>
            </li>
            <li>
              <a
                href="https://www.vinmonopolet.no/"
                target="_blank"
                rel="noopener nofollow"
              >
                vinmonopolet.no — åpningstider for lokale utsalg
              </a>
            </li>
          </ul>

          <p className="mt-4">
            Se også:{" "}
            <Link href="/er-det-apent-i-dag">Er det åpent i dag?</Link>
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
          Dette er generell veiledning basert på alkoholloven, ikke lokale
          fasittider. Salgstider kan variere etter kommune og butikk, og
          Vinmonopolet har egne åpningstider. Sjekk alltid lokalt ved tvil.
        </Disclaimer>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
      <span className="sm:w-72 shrink-0 text-ink font-medium">{k}</span>
      <span className="text-muted">{v}</span>
    </li>
  );
}
