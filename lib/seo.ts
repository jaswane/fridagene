import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path uten domene, f.eks. "/helligdager-2026" */
  path: string;
  noindex?: boolean;
}

// Når en side definerer `openGraph`/`twitter`, overstyrer Next.js det
// fil-baserte `opengraph-image.tsx` istedenfor å arve det. Vi peker derfor
// eksplisitt til OG-ruten med fullt bilde-objekt (type/width/height/alt)
// så hver side får samme rike OG-tagger som forsiden.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Fridagene.no — finn helligdager, fridager og langhelger i Norge",
  type: "image/png",
} as const;

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE.url}${input.path === "/" ? "" : input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path === "/" ? "/" : input.path },
    openGraph: {
      type: "website",
      locale: "nb_NO",
      url,
      siteName: SITE.name,
      title: input.title,
      description: input.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [OG_IMAGE.url],
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
