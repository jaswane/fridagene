# Fridagene.no

Norsk utility-side som svarer på «når har jeg fri?». Viser norske offentlige
helligdager, langhelger, inneklemte dager og arbeidsdager — uten å blande
sammen røde dager og praktiske fridager.

- **Live (etter deploy):** https://www.fridagene.no
- **Repo:** https://github.com/jaswane/fridagene
- **Eier:** [Swane Creative](https://www.swanecreative.no)

## Posisjonering

- «Offentlig helligdag» = lovbestemt fri (12 i Norge).
- «Praktisk fridag» = julaften, nyttårsaften, påskeaften, pinseaften — mange
  har fri, men det varierer.
- «Inneklemt dag» = vanlig arbeidsdag mellom helligdag og helg, ikke
  automatisk fri.

Disse skillene er bevisste og kjørt konsekvent i tekst, JSON-LD og UI-tags.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict
- Tailwind 3.4 (lett, nordisk paletti, dark-mode klargjort)
- Inter (sans) + Fraunces (display) via `next/font/google`
- `lucide-react` for ikoner
- `next/og` for OG-bilde og apple touch icon (genereres ved build)
- Statisk eksport av alle ruter, med `revalidate` (`1h` for tidssensitive,
  `1d` for resten) så header/footer-året holder seg ferskt uten ny deploy

## Kommandoer

```bash
npm install        # første gang
npm run dev        # lokal utviklingsserver (port 3000)
npm run lint
npm run typecheck  # tsc --noEmit
npm run build      # produksjonsbygg
npm run start      # serve produksjonsbygg
```

## Environment-variabler

Alle env-variabler er valgfrie — appen bygger og kjører uten dem.

| Variabel | Bruk | Når | Eksempel |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Overstyrer canonical/OG-domene i `lib/site.ts`. Default er `https://www.fridagene.no`. | Sett på preview-deploys hvis du vil ha riktig canonical mot preview-URL. | `https://fridagene-preview.vercel.app` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. `components/Analytics.tsx` rendrer GA-scriptet KUN når denne er satt OG `NODE_ENV === "production"`. | Sett i Vercel Production for å aktivere GA4. | `G-XXXXXXXXXX` |

**Anbefalt Vercel Production env:**

```env
NEXT_PUBLIC_SITE_URL=https://www.fridagene.no
NEXT_PUBLIC_GA_ID=<din GA4 measurement id>
```

Ingen ekte GA-ID er hardkodet i koden — sett den i Vercel-dashbordet.

## Deploy til Vercel

1. **Importer GitHub-repoet** i Vercel (`jaswane/fridagene`).
2. Framework: Vercel oppdager Next.js automatisk. Default build (`next build`)
   og output er riktig — ikke endre.
3. **Sett env-variablene** under «Settings → Environment Variables» for
   Production (se tabell over).
4. Trigger deploy fra `main`.

### Domenekonfigurasjon

I Vercel under «Settings → Domains»:

- Legg til `www.fridagene.no` og sett den som **Primary Domain** (production).
- Legg til `fridagene.no` og la Vercel automatisk redirecte til
  `www.fridagene.no` (308 permanent).

I Domeneshop (eller DNS-leverandøren) skal du sette pekere som Vercel angir:

- `www.fridagene.no` → CNAME til `cname.vercel-dns.com.`
- `fridagene.no` (apex) → A-record(er) til Vercels apex-IPer (Vercel oppgir
  dem når du legger til domenet), ELLER ALIAS/ANAME hvis leverandøren støtter
  det (Domeneshop støtter ALIAS-record som apex-alias).

Etter at DNS er propagert, sjekk at `fridagene.no` redirecter til
`https://www.fridagene.no/`.

## Google Search Console

Etter første vellykkede produksjonsdeploy:

1. Legg til **Domain property** for `fridagene.no` (krever DNS TXT-verifisering
   — Domeneshop støtter dette). Domain property dekker både `fridagene.no` og
   `www.fridagene.no`.
2. Send inn sitemap: `https://www.fridagene.no/sitemap.xml`.
3. Sjekk «Indeksdekning» et par dager etter — det skal være ca. 57 URLer (alle
   sider + årssider for støttede år).
4. Bruk «URL Inspection» på `https://www.fridagene.no/` for å bekrefte at den
   er indekserbar og at canonical er www.

Ingen verifikasjonsmeta er hardkodet — håndtér via DNS TXT eller egen
verifikasjonsfil i `public/` ved behov.

## Etter deploy

Se [docs/launch-checklist.md](docs/launch-checklist.md) for smoke-test.

## Lisens / opphav

© Swane Creative. Innhold på siden er generell veiledning; arbeidstid og
fridager kan variere etter tariff, arbeidsavtale og arbeidsgiver.
