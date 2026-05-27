import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allYearSlugs, parseYearSlug } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";
import { HolidaysYearPage } from "@/components/pages/HolidaysYearPage";
import { LongWeekendsYearPage } from "@/components/pages/LongWeekendsYearPage";
import { BridgeDaysYearPage } from "@/components/pages/BridgeDaysYearPage";
import { WorkdaysYearPage } from "@/components/pages/WorkdaysYearPage";
import { SeasonPage } from "@/components/pages/SeasonPage";

export const dynamicParams = false;
// Daglig revalidering så header/footer holder seg ferskt på årets skifte —
// selve innholdet er deterministisk per år.
export const revalidate = 86400;

export function generateStaticParams() {
  return allYearSlugs();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseYearSlug(slug);
  if (!parsed) return { title: "Ikke funnet" };
  const { kind, year } = parsed;
  switch (kind) {
    case "helligdager":
      return pageMetadata({
        title: `Helligdager ${year} — Norske røde dager`,
        description: `Alle offentlige helligdager i Norge i ${year} med dato og ukedag.`,
        path: `/helligdager-${year}`,
      });
    case "arbeidsdager":
      return pageMetadata({
        title: `Arbeidsdager ${year} — Antall arbeidsdager i Norge`,
        description: `Antall arbeidsdager i Norge i ${year}, fordelt på måneder og kvartal.`,
        path: `/arbeidsdager-${year}`,
      });
    case "langhelger":
      return pageMetadata({
        title: `Langhelger ${year} — Lange helger i Norge`,
        description: `Alle langhelger i Norge i ${year}, og hvor inneklemte dager kan forlenge fri-strekket.`,
        path: `/langhelger-${year}`,
      });
    case "inneklemte-dager":
      return pageMetadata({
        title: `Inneklemte dager ${year} — Norge`,
        description: `Inneklemte dager i Norge i ${year} — vanlige arbeidsdager mellom helligdag og helg.`,
        path: `/inneklemte-dager-${year}`,
      });
    case "paske":
      return pageMetadata({
        title: `Påsken ${year} — datoer og helligdager`,
        description: `Når er påsken ${year}? Se skjærtorsdag, langfredag, påskeaften og 1. og 2. påskedag.`,
        path: `/paske-${year}`,
      });
    case "pinse":
      return pageMetadata({
        title: `Pinse ${year} — datoer og helligdager`,
        description: `Når er pinsen ${year}? Datoer for pinseaften, 1. pinsedag og 2. pinsedag.`,
        path: `/pinse-${year}`,
      });
    case "jul":
      return pageMetadata({
        title: `Jul ${year} — helligdager og fridager`,
        description: `Julens helligdager og fridager i ${year}: julaften, 1. og 2. juledag, og nyttårsaften.`,
        path: `/jul-${year}`,
      });
    case "mai":
      return pageMetadata({
        title: `Mai ${year} — 1. mai, 17. mai og Kristi himmelfartsdag`,
        description: `Mai-helligdagene ${year}: 1. mai, Kristi himmelfartsdag og 17. mai.`,
        path: `/mai-${year}`,
      });
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseYearSlug(slug);
  if (!parsed) notFound();
  const { kind, year } = parsed;
  switch (kind) {
    case "helligdager":
      return <HolidaysYearPage year={year} />;
    case "arbeidsdager":
      return <WorkdaysYearPage year={year} />;
    case "langhelger":
      return <LongWeekendsYearPage year={year} />;
    case "inneklemte-dager":
      return <BridgeDaysYearPage year={year} />;
    case "paske":
    case "pinse":
    case "jul":
    case "mai":
      return <SeasonPage season={kind} year={year} />;
  }
}
