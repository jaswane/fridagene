import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  {
    heading: "Fridager",
    items: [
      { href: "/neste-fridag", label: "Neste fridag" },
      { href: "/helligdager-2026", label: "Helligdager 2026" },
      { href: "/helligdager-2027", label: "Helligdager 2027" },
      { href: "/helligdager-2028", label: "Helligdager 2028" },
    ],
  },
  {
    heading: "Planlegging",
    items: [
      { href: "/langhelger-2026", label: "Langhelger 2026" },
      { href: "/langhelger-2027", label: "Langhelger 2027" },
      { href: "/inneklemte-dager-2026", label: "Inneklemte 2026" },
      { href: "/inneklemte-dager-2027", label: "Inneklemte 2027" },
    ],
  },
  {
    heading: "Arbeidsdager",
    items: [
      { href: "/arbeidsdager", label: "Arbeidsdager-kalkulator" },
      { href: "/arbeidsdager-2026", label: "Arbeidsdager 2026" },
      { href: "/arbeidsdager-2027", label: "Arbeidsdager 2027" },
    ],
  },
  {
    heading: "Høytider",
    items: [
      { href: "/paske-2026", label: "Påsken 2026" },
      { href: "/pinse-2026", label: "Pinse 2026" },
      { href: "/jul-2026", label: "Jul 2026" },
      { href: "/mai-2026", label: "Mai 2026" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="site-container py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {COLS.map((col) => (
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
            © {new Date().getFullYear()} {SITE.name} · Et prosjekt fra{" "}
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
