import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allYearSlugs } from "@/lib/routing";

const STATIC_ROUTES = [
  "",
  "/neste-fridag",
  "/arbeidsdager",
  "/om",
  "/kontakt",
  "/personvern",
  "/ansvarsfraskrivelse",
];

function priorityFor(slug: string): number {
  if (slug.startsWith("helligdager-")) return 0.8;
  if (slug.startsWith("arbeidsdager-")) return 0.7;
  if (slug.startsWith("langhelger-")) return 0.7;
  if (slug.startsWith("inneklemte-dager-")) return 0.7;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Alle år-spesifikke sider — kilden er routing.ts så sitemap og faktiske
  // ruter holder seg synkronisert automatisk.
  const yearEntries: MetadataRoute.Sitemap = allYearSlugs().map(({ slug }) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: priorityFor(slug),
  }));

  return [...staticEntries, ...yearEntries];
}
