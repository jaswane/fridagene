"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/neste-fridag", label: "Neste fridag" },
  { href: "/helligdager-2026", label: "Helligdager" },
  { href: "/langhelger-2026", label: "Langhelger" },
  { href: "/inneklemte-dager-2026", label: "Inneklemte" },
  { href: "/arbeidsdager", label: "Arbeidsdager" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-line/70 bg-surface/80 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          aria-label="Fridagene.no — til forsiden"
          className="flex items-center gap-2"
        >
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent"
          >
            <CalendarDays className="h-5 w-5" />
          </span>
          <span className="font-display text-lg sm:text-xl tracking-display text-ink">
            Fridagene<span className="text-accent">.no</span>
          </span>
        </Link>

        <nav
          aria-label="Hovedmeny"
          className="hidden md:flex items-center gap-2 text-sm"
        >
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href.replace(/-\d{4}$/, "")));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="chip text-sm hover:no-underline"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobilmeny"
          className="md:hidden border-t border-line bg-surface"
        >
          <ul className="site-container py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-2 rounded-lg text-ink hover:bg-accent-soft/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
