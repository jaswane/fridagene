import type { MetadataRoute } from "next";
import { SITE, SUPPORTED_YEARS } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/neste-fridag",
  "/arbeidsdager",
  "/om",
  "/kontakt",
  "/personvern",
  "/ansvarsfraskrivelse",
];

const FEATURED_YEARS = [2026, 2027, 2028] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const yearEntries: MetadataRoute.Sitemap = [];
  for (const y of SUPPORTED_YEARS) {
    yearEntries.push({
      url: `${SITE.url}/helligdager-${y}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
    yearEntries.push({
      url: `${SITE.url}/arbeidsdager-${y}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  for (const y of [2026, 2027, 2028, 2029, 2030] as const) {
    yearEntries.push({
      url: `${SITE.url}/langhelger-${y}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
    yearEntries.push({
      url: `${SITE.url}/inneklemte-dager-${y}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  const seasonEntries: MetadataRoute.Sitemap = [];
  for (const y of FEATURED_YEARS) {
    for (const slug of ["paske", "pinse", "jul", "mai"]) {
      seasonEntries.push({
        url: `${SITE.url}/${slug}-${y}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return [...staticEntries, ...yearEntries, ...seasonEntries];
}
