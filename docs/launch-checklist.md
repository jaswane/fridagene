# Lanseringssjekkliste — Fridagene.no

Kjør gjennom denne etter første produksjonsdeploy på Vercel. Alt skal være
grønt før vi sender sitemap til Search Console.

## Domene og redirect

- [ ] `https://www.fridagene.no` åpner forsiden med HTTP 200.
- [ ] `https://fridagene.no` (apex uten www) redirecter 308 til
      `https://www.fridagene.no/`.
- [ ] `http://www.fridagene.no` redirecter til `https://www.fridagene.no` (HSTS
      via Vercel default).

## Statiske ressurser

- [ ] `https://www.fridagene.no/sitemap.xml` returnerer 200 og inneholder
      `https://www.fridagene.no` (ikke localhost, ikke apex). Bør liste ca.
      57 URLer (statiske + alle år-spesifikke).
- [ ] `https://www.fridagene.no/robots.txt` returnerer 200. Inneholder
      `Allow: /`, `Disallow: /go/`, `Disallow: /api/`, og
      `Sitemap: https://www.fridagene.no/sitemap.xml`.
- [ ] `https://www.fridagene.no/icon.svg` returnerer 200, type `image/svg+xml`.
- [ ] `https://www.fridagene.no/apple-icon` returnerer 200 PNG (180x180).
- [ ] `https://www.fridagene.no/opengraph-image` returnerer 200 PNG
      (1200x630).

## Nøkkelsider

- [ ] `/` — hero viser «Neste fridag i Norge», riktig dato/ukedag.
- [ ] `/neste-fridag` — viser neste offentlige helligdag.
- [ ] `/helligdager-2026` — 12 offentlige + 4 praktiske dager listet.
- [ ] `/langhelger-2026` — langhelger med riktig telling av sammenhengende
      dager.
- [ ] `/inneklemte-dager-2026` — viser inneklemte dager, beskrevet som
      vanlige arbeidsdager (ikke automatisk fri).
- [ ] `/arbeidsdager` — kalkulator regner ut arbeidsdager mellom to datoer.
- [ ] `/arbeidsdager-2026` — viser totalt antall arbeidsdager + per måned.
- [ ] `/paske-2026`, `/pinse-2026`, `/jul-2026`, `/mai-2026` — sesongsider
      viser riktige datoer.
- [ ] `/om`, `/kontakt`, `/personvern`, `/ansvarsfraskrivelse` — alle 200.
- [ ] En ukjent slug (f.eks. `/finnes-ikke`) returnerer 404 med
      hjelpsom side (snarveier til hovedsidene).

## Metadata og SEO

- [ ] Forsiden: `<link rel="canonical" href="https://www.fridagene.no">` —
      sjekk view-source.
- [ ] Forsiden: `<meta property="og:image">` peker på
      `https://www.fridagene.no/opengraph-image`.
- [ ] Forsiden: `<meta name="twitter:card" content="summary_large_image">`.
- [ ] `/helligdager-2026`: canonical = `https://www.fridagene.no/helligdager-2026`.
- [ ] Ingen vanlig side har `<meta name="robots" content="noindex">`. Bare
      `/finnes-ikke`-stil (404) skal ha noindex.

## Mobil og favicon

- [ ] Åpne forsiden på mobil — hamburger vises, åpner mobilmeny, lenker
      virker.
- [ ] Ingen horisontal scroll på 375px-bredde.
- [ ] Favicon vises i nettleserfanen (kalender + «FRI»).
- [ ] Lagring til hjemskjerm på iOS bruker apple-touch-icon (kalender-motiv).

## Innhold / regler

- [ ] `kontakt@swanecreative.no` vises **kun** på `/kontakt`. Ikke i footer,
      ikke i schema, ikke i OG-bilde.
- [ ] Julaften/nyttårsaften beskrevet som «ikke offentlig helligdag».
- [ ] Inneklemte dager beskrevet som «vanlige arbeidsdager», ikke
      automatisk fri.
- [ ] Lenker til Ukenummeret.no og Utregn.no synlige på forsiden
      («Flere nyttige verktøy») og i footer.

## GA4 (hvis aktivert)

- [ ] `NEXT_PUBLIC_GA_ID` er satt i Vercel Production.
- [ ] View-source på `https://www.fridagene.no` viser to script-tags fra
      `googletagmanager.com`.
- [ ] GA4 → «Realtime» mottar `page_view` når du klikker rundt.
- [ ] Hvis env ikke er satt: ingen GA-script i HTML, ingen feil i konsollen.

## Search Console

- [ ] Domain property for `fridagene.no` lagt til og verifisert via DNS TXT
      (Domeneshop).
- [ ] Sitemap sendt inn: `https://www.fridagene.no/sitemap.xml`. Status =
      «Suksess» innen et døgn.
- [ ] URL Inspection på `https://www.fridagene.no/` — «URL is on Google» eller
      «kan indekseres».

## Vercel-helse

- [ ] Bygg-loggen viser «Compiled successfully» og ca. 64 statiske sider.
- [ ] Functions-tab er tom — alt er statisk.
- [ ] Ingen 5xx-feil i de første timene etter deploy (Vercel Analytics).
