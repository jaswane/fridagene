import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Brødsmuler" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-accent">
                  {c.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-ink/80">
                  {c.name}
                </span>
              )}
              {!isLast && <span aria-hidden className="text-muted/60">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
