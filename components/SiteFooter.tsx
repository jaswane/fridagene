import Link from "next/link";
import { SITE } from "@/lib/site";

function buildColumns(year: number) {
  return [
    {
      heading: "Fridager",
      items: [
        { href: "/neste-fridag", label: "Neste fridag" },
        { href: `/helligdager-${year}`, label: `Helligdager ${year}` },
        { href: `/helligdager-${year + 1}`, label: `Helligdager ${year + 1}` },
        { href: `/helligdager-${year + 2}`, label: `Helligdager ${year + 2}` },
      ],
    },
    {
      heading: "Planlegging",
      items: [
        { href: `/langhelger-${year}`, label: `Langhelger ${year}` },
        { href: `/langhelger-${year + 1}`, label: `Langhelger ${year + 1}` },
        { href: `/inneklemte-dager-${year}`, label: `Inneklemte ${year}` },
        { href: `/inneklemte-dager-${year + 1}`, label: `Inneklemte ${year + 1}` },
      ],
    },
    {
      heading: "Arbeidsdager",
      items: [
        { href: "/arbeidsdager", label: "Arbeidsdager-kalkulator" },
        { href: `/arbeidsdager-${year}`, label: `Arbeidsdager ${year}` },
        { href: `/arbeidsdager-${year + 1}`, label: `Arbeidsdager ${year + 1}` },
      ],
    },
    {
      heading: "Høytider",
      items: [
        { href: `/paske-${year}`, label: `Påsken ${year}` },
        { href: `/pinse-${year}`, label: `Pinse ${year}` },
        { href: `/jul-${year}`, label: `Jul ${year}` },
        { href: `/mai-${year}`, label: `Mai ${year}` },
      ],
    },
  ];
}

const SISTER_TOOLS = [
  {
    href: "https://www.ukenummeret.no/",
    label: "Ukenummeret.no",
    blurb: "Hvilket ukenummer er det?",
  },
  {
    href: "https://www.utregn.no/",
    label: "Utregn.no",
    blurb: "Kalkulatorer og enkle utregninger",
  },
];

export function SiteFooter({ currentYear }: { currentYear: number }) {
  const cols = buildColumns(currentYear);

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="site-container py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {cols.map((col) => (
          <div key={col.heading}>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted mb-3">
              {col.heading}
            </h3>
            <ul className="space-y-2 text-sm">
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="text-ink hover:text-accent">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="site-container py-6">
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted mb-3">
            Flere nyttige verktøy
          </h3>
          <ul className="flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm">
            {SISTER_TOOLS.map((t) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener"
                  className="text-ink hover:text-accent"
                >
                  <span className="font-medium">{t.label}</span>
                  <span className="text-muted"> — {t.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="site-container py-6 text-xs text-muted flex flex-col gap-2 items-center text-center">
          <div className="font-display text-base text-ink">
            Fridagene<span className="text-accent">.no</span>
          </div>
          <nav aria-label="Sekundærmeny" className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            <Link href="/om" className="hover:text-accent">Om</Link>
            <Link href="/kontakt" className="hover:text-accent">Kontakt</Link>
            <Link href="/personvern" className="hover:text-accent">Personvern</Link>
            <Link href="/ansvarsfraskrivelse" className="hover:text-accent">Ansvarsfraskrivelse</Link>
          </nav>
          <p className="max-w-xl">
            © {currentYear} {SITE.name} · Et prosjekt fra{" "}
            <a
              href={SITE.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent"
            >
              Swane Creative
            </a>
            . Innholdet er generell veiledning. Arbeidstid og fridager kan
            variere etter tariff, arbeidsavtale og arbeidsgiver.
          </p>
        </div>
      </div>
    </footer>
  );
}
