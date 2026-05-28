import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { getCurrentYear } from "@/lib/currentYear";

export const revalidate = 86400;

export const metadata: Metadata = pageMetadata({
  title: "Religiøse høytider i Norge – rett til fri og markeringer",
  description:
    "Se eksempler på religiøse høytider som feires i Norge, og les kort om retten til fri ved andre religiøse høytidsdager enn offentlige helligdager.",
  path: "/religiose-hoytider",
});

const GROUPS: { tradition: string; intro: string; days: string[] }[] = [
  {
    tradition: "Muslimske høytider",
    intro:
      "Markeres av muslimer i Norge. Tidspunktet følger den islamske månekalenderen og flytter seg gjennom året.",
    days: [
      "Eid al-fitr (id al-fitr) — feiringen ved slutten av fastemåneden ramadan.",
      "Eid al-adha (id al-adha) — offerfesten.",
      "Ramadan er en fastemåned (en periode), ikke én enkelt fridag.",
    ],
  },
  {
    tradition: "Jødiske høytider",
    intro:
      "Markeres av jøder i Norge. Tidspunktet følger den jødiske kalenderen.",
    days: [
      "Rosh hashana — det jødiske nyttåret.",
      "Yom kippur — forsoningsdagen.",
      "Pesach — påskehøytiden.",
      "Hanukka — lysfesten.",
    ],
  },
  {
    tradition: "Hinduistiske høytider",
    intro: "Markeres av hinduer i Norge. Tidspunktet kan variere etter tradisjon og kalender.",
    days: [
      "Diwali — lysfesten.",
      "Holi — vårfesten.",
    ],
  },
  {
    tradition: "Sikh-høytider",
    intro: "Markeres av sikher i Norge. Tidspunktet kan variere etter tradisjon og kalender.",
    days: [
      "Vaisakhi — vårfest og en sentral markering.",
      "Guru Nanaks fødselsdag (gurpurab).",
    ],
  },
  {
    tradition: "Buddhistiske høytider",
    intro: "Markeres av buddhister i Norge. Tidspunktet kan variere etter tradisjon og kalender.",
    days: ["Vesak — markering av Buddhas fødsel, oppvåkning og bortgang."],
  },
  {
    tradition: "Ortodokse kristne høytider",
    intro:
      "Markeres av ortodokse kristne i Norge. Datoene følger ofte en annen kalender enn de norske offentlige helligdagene.",
    days: [
      "Ortodoks jul.",
      "Ortodoks påske.",
    ],
  },
];

const FAQS = [
  {
    q: "Er eid en offentlig helligdag i Norge?",
    a: "Nei. Eid al-fitr og eid al-adha er ikke offentlige helligdager (røde dager) i Norge. De markeres av muslimer, men gir ikke automatisk fri for alle.",
  },
  {
    q: "Har man rett til fri på religiøse høytider?",
    a: "Personer som har andre religiøse høytidsdager enn de offentlige helligdagene, har etter trossamfunnsloven § 18 rett til fri i opptil to selvvalgte dager hvert år i forbindelse med høytider etter sin religion. Arbeidsmiljøloven § 12-15 viser til denne regelen for arbeidstakere.",
  },
  {
    q: "Hvor mange religiøse fridager kan man ta?",
    a: "Loven gir rett til inntil to selvvalgte dager per år i forbindelse med egne religiøse høytider. Hvordan dette håndteres med lønn eller innarbeiding kan variere etter avtale, tariff eller arbeidsgiver.",
  },
  {
    q: "Gjelder dette skole og studier også?",
    a: "Fri ved religiøse høytider på skole og utdanningssted håndteres lokalt. Sjekk skolens eller utdanningsstedets regler, og gi beskjed i god tid.",
  },
  {
    q: "Hvorfor varierer datoene for noen religiøse høytider?",
    a: "Mange religiøse høytider følger måne- eller andre kalendere enn den norske almanakken, og kan derfor flytte seg fra år til år. Vi oppgir derfor ikke faste datoer her.",
  },
];

export default function ReligiousHolidaysPage() {
  const year = getCurrentYear();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: `${SITE.url}/religiose-hoytider`,
            name: "Religiøse høytider i Norge",
            description:
              "Eksempler på religiøse høytider som feires i Norge, og kort om retten til fri ved andre religiøse høytidsdager enn offentlige helligdager.",
          }),
          breadcrumbSchema([
            { name: "Forsiden", url: SITE.url },
            {
              name: "Religiøse høytider",
              url: `${SITE.url}/religiose-hoytider`,
            },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="site-container pb-12">
        <PageHeader
          kicker="Høytider"
          title="Religiøse høytider i Norge"
          crumbs={[
            { name: "Forsiden", href: "/" },
            { name: "Religiøse høytider" },
          ]}
        />

        <section className="mt-6 card p-6">
          <p className="text-ink/90 leading-relaxed">
            Flere religiøse høytider feires i Norge uten å være offentlige
            helligdager. De gir ikke automatisk fri for alle, men personer som
            har andre religiøse høytidsdager enn de offentlige helligdagene, kan
            ha rett til fri i opptil to selvvalgte dager hvert år i forbindelse
            med høytider etter sin religion.
          </p>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">
            Hva er forskjellen?
          </h2>
          <ul className="mt-3 space-y-2 text-ink/85 list-disc pl-5">
            <li>
              <strong>Offentlig helligdag / rød dag:</strong> lovbestemte
              fridager som gjelder bredt, f.eks. 1. juledag, langfredag og 17.
              mai.
            </li>
            <li>
              <strong>Religiøs høytid:</strong> dager som markeres av enkelte
              trosretninger. Disse er <em>ikke</em> offentlige helligdager og
              gir ikke automatisk fri for alle.
            </li>
            <li>
              <strong>Rett til fri etter trossamfunnsloven:</strong> inntil to
              selvvalgte dager per år i forbindelse med egne religiøse høytider.
            </li>
            <li>
              <strong>Fri etter avtale:</strong> utover lovens hovedregel kan fri
              avtales med arbeidsgiver, skole eller utdanningssted.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink mb-1">
            Eksempler på religiøse høytider
          </h2>
          <p className="text-sm text-muted mb-4 max-w-2xl">
            Dette er eksempler, ikke en komplett kalender. Tidspunktet kan
            variere etter kalender og tradisjon, så vi oppgir ikke faste datoer
            her.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <div key={g.tradition} className="card p-5">
                <h3 className="text-ink font-medium">{g.tradition}</h3>
                <p className="text-sm text-muted mt-1">{g.intro}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink/85 list-disc pl-5">
                  {g.days.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Kan man få fri?</h2>
          <p className="mt-2 text-ink/85 leading-relaxed">
            Etter <strong>trossamfunnsloven § 18</strong> har personer som har
            andre religiøse høytidsdager enn de offentlige helligdagene, rett til
            fri i <strong>opptil to selvvalgte dager</strong> hvert år i
            forbindelse med høytider etter sin religion. For arbeidstakere viser{" "}
            <strong>arbeidsmiljøloven § 12-15</strong> til denne regelen.
          </p>
          <ul className="mt-3 space-y-2 text-ink/85 list-disc pl-5">
            <li>Dette er ikke en automatisk offentlig fridag for alle.</li>
            <li>Arbeidsgiver, skole eller utdanningssted bør varsles i god tid.</li>
            <li>
              Hvordan lønn, innarbeiding eller fravær håndteres kan variere etter
              avtale, tariff, skole/utdanningssted eller arbeidsgiver.
            </li>
            <li>Sjekk arbeidsgiver, skole eller relevant regelverk ved tvil.</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            Kilder:{" "}
            <a
              href="https://lovdata.no/lov/2020-04-24-31/§18"
              target="_blank"
              rel="noopener nofollow"
            >
              Trossamfunnsloven § 18 (Lovdata)
            </a>
            {" · "}
            <a
              href="https://lovdata.no/lov/2005-06-17-62/§12-15"
              target="_blank"
              rel="noopener nofollow"
            >
              Arbeidsmiljøloven § 12-15 (Lovdata)
            </a>
            {" · "}
            <a
              href="https://www.arbeidstilsynet.no/"
              target="_blank"
              rel="noopener nofollow"
            >
              Arbeidstilsynet
            </a>
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

        <section className="mt-10 narrow-container prose-soft px-0">
          <h2 className="font-display text-2xl text-ink">Se også</h2>
          <p className="mt-2">
            <Link href={`/helligdager-${year}`}>Helligdager {year}</Link>
            {" · "}
            <Link href={`/flaggdager-${year}`}>Flaggdager {year}</Link>
            {" · "}
            <Link href="/neste-fridag">Neste fridag</Link>
            {" · "}
            <Link href="/er-det-apent-i-dag">Er det åpent i dag?</Link>
          </p>
        </section>

        <Disclaimer>
          Dette er generell veiledning, ikke juridisk rådgivning. Retten til fri
          ved religiøse høytider følger trossamfunnsloven § 18, men praktiske
          forhold kan variere etter avtale, tariff, skole/utdanningssted og
          arbeidsgiver. Sjekk relevant regelverk ved tvil.
        </Disclaimer>
      </div>
    </>
  );
}
