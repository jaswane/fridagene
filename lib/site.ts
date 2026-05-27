export const SITE = {
  name: "Fridagene.no",
  domain: "fridagene.no",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.fridagene.no",
  description:
    "Norske helligdager, røde dager, inneklemte dager og langhelger — enkelt forklart.",
  tagline:
    "Når har du fri? Se neste fridag, helligdager og langhelger i Norge.",
  contactEmail: "kontakt@swanecreative.no",
  company: {
    name: "Swane Creative",
    url: "https://www.swanecreative.no/",
  },
} as const;

export const SUPPORTED_YEARS = [
  2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
] as const;

export type SupportedYear = (typeof SUPPORTED_YEARS)[number];

export function isSupportedYear(n: number): n is SupportedYear {
  return (SUPPORTED_YEARS as readonly number[]).includes(n);
}
