import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({
  kicker,
  title,
  lede,
  crumbs,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="pt-8 sm:pt-10">
      {crumbs && <Breadcrumbs crumbs={crumbs} />}
      {kicker && (
        <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {kicker}
        </p>
      )}
      <h1
        className={`font-display tracking-display text-ink text-3xl sm:text-4xl ${
          kicker ? "mt-2" : "mt-5"
        }`}
      >
        {title}
      </h1>
      {lede && (
        <p className="mt-3 max-w-2xl text-ink/85 leading-relaxed">{lede}</p>
      )}
    </header>
  );
}
