import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentYear } from "@/lib/currentYear";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const year = getCurrentYear();
  const suggestions = [
    { href: "/", label: "Forsiden — neste fridag i Norge" },
    { href: "/neste-fridag", label: "Neste offentlige helligdag" },
    { href: `/helligdager-${year}`, label: `Helligdager ${year}` },
    { href: `/langhelger-${year}`, label: `Langhelger ${year}` },
    { href: `/inneklemte-dager-${year}`, label: `Inneklemte dager ${year}` },
    { href: "/arbeidsdager", label: "Arbeidsdager-kalkulator" },
  ];

  return (
    <div className="narrow-container py-16 sm:py-20">
      <div className="text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
          404
        </p>
        <h1 className="mt-3 font-display tracking-display text-ink text-3xl sm:text-4xl">
          Siden finnes ikke
        </h1>
        <p className="mt-3 text-muted">
          Lenken kan være feil, eller siden er flyttet.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted mb-3">
          Prøv en av disse
        </h2>
        <ul className="card divide-y divide-line/70">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block px-4 py-3 text-ink hover:bg-accent-soft/60"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-center">
        <Link href="/" className="btn-primary">
          Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}
