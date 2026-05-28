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

// Årsvindu/year-strategi er flyttet til lib/years.ts (rullerende, Oslo-basert).
