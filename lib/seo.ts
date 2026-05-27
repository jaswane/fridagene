import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path uten domene, f.eks. "/helligdager-2026" */
  path: string;
  noindex?: boolean;
}

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
    },
    twitter: {
      card: "summary",
      title: input.title,
      description: input.description,
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
