import Link from "next/link";
import { ArrowRight, CalendarDays, CalendarRange, Briefcase, Sparkles, Lightbulb } from "lucide-react";
import {
  bridgeDays,
  formatNorwegianDate,
  formatNorwegianDateShort,
  formatNorwegianWeekday,
  longWeekends,
  nextPublicHoliday,
  parseIso,
  planningPicks,
  publicHolidays,
  todayInOslo,
  workdaysInYear,
  workdaysRemainingInYear,
} from "@/lib/holidays";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Hva er forskjellen på offentlig helligdag og praktisk fridag?",
    a: "Offentlig helligdag er en lovbestemt fridag som langfredag, 1. mai eller 1. juledag. Praktisk fridag er dager som julaften, nyttårsaften og påskeaften — det er ikke helligdager, men mange har likevel fri eller halv dag avhengig av arbeidsavtale.",
  },
  {
    q: "Er julaften og nyttårsaften røde dager?",
    a: "Nei. Julaften (24. desember) og nyttårsaften (31. desember) er ikke offentlige helligdager i Norge. Mange arbeidsplasser stenger likevel tidlig, men det er ikke en lovpålagt fridag.",
  },
  {
    q: "Hva er en inneklemt dag?",
    a: "En inneklemt dag er en vanlig arbeidsdag mellom en helligdag og en helg — for eksempel fredagen etter Kristi himmelfartsdag. Det er ikke en automatisk fridag, men en dag mange velger å ta fri for å lage langhelg.",
  },
  {
    q: "Hvor mange røde dager er det i Norge?",
    a: "Norge har 12 offentlige helligdager i året, inkludert nyttårsdag, dagene rundt påske, 1. og 17. mai, Kristi himmelfartsdag, pinsedagene og romjulshelligdagene.",
  },
];

export default function HomePage() {
  const today = todayInOslo();
  const year = today.getUTCFullYear();
  const next = nextPublicHoliday(today);
  const holidays = publicHolidays(year);
  const longs = longWeekends(year).slice(0, 4);
  const bridges = bridgeDays(year);
  const workLeft = workdaysRemainingInYear(today);
  const workTotal = workdaysInYear(year);
  const planTips = planningPicks(year).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            url: SITE.url,
            name: "Fridagene.no — Helligdager, langhelger og fridager i Norge",
            description: SITE.description,
          }),
          faqSchema(FAQS),
        ]}
      />

      <section className="hero-soft border-b border-line/60">
        <div className="site-container py-12 sm:py-16">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
            Neste fridag i Norge
          </p>
          <h1 className="mt-3 font-display tracking-display text-ink text-4xl sm:text-5xl">
            {next.holiday.name}
          </h1>
          <p className="big-date text-ink mt-3">
            {formatNorwegianDate(next.date)}
          </p>
          <p className="mt-2 text-lg text-muted capitalize">
            {formatNorwegianWeekday(next.date)} ·{" "}
            <span className="normal-case">
              {next.isToday
                ? "det er i dag"
                : next.daysUntil === 1
                ? "i morgen"
                : `om ${next.daysUntil} dager`}
            </span>
          </p>

          <p className="mt-6 max-w-2xl text-ink/85 leading-relaxed">
            Se norske helligdager, røde dager, inneklemte dager og langhelger —
            enkelt forklart. Fridagene.no svarer på «når har jeg fri?» uten
            unødvendig støy.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link href="/neste-fridag" className="btn-primary">
              Neste fridag <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/fa-mest-fri-${year}`} className="btn-ghost">
              Få mest fri i {year}
            </Link>
            <Link href={`/helligdager-${year}`} className="btn-ghost">
              Helligdager {year}
            </Link>
          </div>
        </div>
      </section>

      <section className="site-container py-12 grid gap-8 md:grid-cols-2">
        <div>
          <SectionHeading
            icon={<CalendarDays className="h-4 w-4" />}
            kicker="Helligdager"
            title={`Offentlige helligdager i ${year}`}
          />
          <ul className="card divide-y divide-line/70 mt-4">
            {holidays.map((h) => {
              const d = parseIso(h.date);
              return (
                <li
                  key={h.id}
                  className="flex items-baseline gap-3 px-4 py-2.5"
                >
                  <span className="w-28 shrink-0 text-sm text-muted capitalize">
                    {formatNorwegianWeekday(d, true)} {formatNorwegianDateShort(d)}
                  </span>
                  <span className="text-ink">{h.name}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-sm">
            <Link href={`/helligdager-${year}`} className="text-accent hover:underline">
              Se hele oversikten over helligdager {year} →
            </Link>
          </p>
        </div>

        <div>
          <SectionHeading
            icon={<CalendarRange className="h-4 w-4" />}
            kicker="Langhelger"
            title={`Neste langhelger i ${year}`}
          />
          {longs.length === 0 ? (
            <p className="mt-4 text-muted">Ingen flere langhelger i år.</p>
          ) : (
            <ul className="card divide-y divide-line/70 mt-4">
              {longs.map((lw) => {
                const start = parseIso(lw.start);
                const end = parseIso(lw.end);
                return (
                  <li key={lw.start} className="px-4 py-3">
                    <div className="text-ink font-medium">
                      {formatNorwegianDateShort(start)} – {formatNorwegianDate(end)}
                    </div>
                    <div className="text-sm text-muted mt-0.5">
                      {lw.days} dager sammenhengende ·{" "}
                      {lw.includes.holidays.join(", ") || "helg"}
                      {lw.vacationDaysNeeded > 0 &&
                        ` · ${lw.vacationDaysNeeded} feriedag${lw.vacationDaysNeeded > 1 ? "er" : ""} kreves`}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-3 text-sm">
            <Link href={`/langhelger-${year}`} className="text-accent hover:underline">
              Se alle langhelger {year} →
            </Link>
          </p>
        </div>

        <div>
          <SectionHeading
            icon={<Sparkles className="h-4 w-4" />}
            kicker="Inneklemte dager"
            title={`Inneklemte dager i ${year}`}
          />
          {bridges.length === 0 ? (
            <p className="mt-4 text-muted">Ingen inneklemte dager i år.</p>
          ) : (
            <ul className="card divide-y divide-line/70 mt-4">
              {bridges.map((b) => {
                const d = parseIso(b.date);
                return (
                  <li key={b.date} className="px-4 py-3">
                    <div className="text-ink font-medium capitalize">
                      {formatNorwegianWeekday(d)} {formatNorwegianDate(d)}
                    </div>
                    <div className="text-sm text-muted mt-0.5">{b.description}</div>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-3 text-sm text-muted">
            Inneklemte dager er vanlige arbeidsdager. Mange velger å ta dem fri
            for å lage langhelg, men det er ingen lovpålagt fri.
          </p>
        </div>

        <div>
          <SectionHeading
            icon={<Briefcase className="h-4 w-4" />}
            kicker="Arbeidsdager"
            title={`Arbeidsdager igjen i ${year}`}
          />
          <div className="card mt-4 p-6">
            <div className="big-number text-ink">{workLeft}</div>
            <p className="text-muted mt-2">
              arbeidsdager igjen i {year} (av {workTotal} totalt).
            </p>
            <p className="text-sm text-muted mt-3">
              Beregnet som mandag–fredag minus offentlige helligdager. Julaften
              og nyttårsaften regnes som arbeidsdager her — de er ikke offisielt
              fri.
            </p>
            <Link
              href="/arbeidsdager"
              className="mt-5 inline-flex items-center gap-1 text-accent hover:underline"
            >
              Regn ut arbeidsdager mellom datoer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line/60">
        <div className="site-container py-12">
          <SectionHeading
            icon={<Lightbulb className="h-4 w-4" />}
            kicker="Planlegging"
            title="Få mest fri med færrest feriedager"
          />
          <p className="mt-3 max-w-2xl text-muted">
            Hvilke perioder i {year} gir mest sammenhengende fri for hver
            feriedag du bruker? Tipsene under er beregnet fra norske
            helligdager — inneklemte dager er fortsatt vanlige arbeidsdager.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {planTips.map((p) => (
              <li key={p.longWeekend.start} className="card-soft px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink font-medium">{p.label}</span>
                  <span
                    className={
                      p.vacationDays === 0
                        ? "chip-tag"
                        : "chip-tag chip-tag--practical"
                    }
                  >
                    {p.vacationDays === 0
                      ? "0 feriedager"
                      : p.vacationDays === 1
                      ? "1 feriedag"
                      : `${p.vacationDays} feriedager`}
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{p.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link
              href={`/fa-mest-fri-${year}`}
              className="text-accent hover:underline"
            >
              Se hele rangeringen for {year} →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line/60 bg-surface/60">
        <div className="site-container py-10">
          <SectionHeading kicker="Begreper" title="Hva betyr ordene?" />
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Term
              term="Offentlig helligdag"
              def="Lovbestemt fridag som 1. mai, 17. mai, langfredag og 1. juledag. Norge har 12 i året."
            />
            <Term
              term="Praktisk fridag"
              def="Dager som julaften og nyttårsaften — ikke offentlig helligdag, men mange har fri eller halv dag etter avtale."
            />
            <Term
              term="Inneklemt dag"
              def="Vanlig arbeidsdag mellom en helligdag og en helg. Ikke automatisk fri — du må ta den som feriedag."
            />
            <Term
              term="Merkedag"
              def="Tradisjonell eller kirkelig markering som ikke gir fri (f.eks. palmesøndag, allehelgensdag)."
            />
          </dl>
        </div>
      </section>

      <section className="border-t border-line/60 bg-surface/60">
        <div className="site-container py-12">
          <SectionHeading
            icon={<CalendarDays className="h-4 w-4" />}
            kicker="Høytider"
            title="Norske høytider"
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {[
              { href: `/paske-${year}`, label: `Påsken ${year}` },
              { href: `/pinse-${year}`, label: `Pinse ${year}` },
              { href: `/jul-${year}`, label: `Jul ${year}` },
              { href: `/mai-${year}`, label: `Mai ${year}` },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="card-soft px-4 py-3 hover:border-accent hover:no-underline"
              >
                <div className="text-ink font-medium">{l.label}</div>
                <div className="text-xs text-muted mt-0.5">
                  Datoer, helligdager og praktisk info
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-12">
        <SectionHeading kicker="FAQ" title="Populære spørsmål" />
        <div className="mt-4 grid gap-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card-soft px-4 py-3 open:bg-surface">
              <summary className="cursor-pointer text-ink font-medium">{f.q}</summary>
              <p className="text-muted mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-line/60">
        <div className="site-container py-10">
          <SectionHeading kicker="Søsterverktøy" title="Flere nyttige verktøy" />
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <a
                href="https://www.ukenummeret.no/"
                target="_blank"
                rel="noopener"
                className="card-soft block px-4 py-3 hover:border-accent"
              >
                <div className="text-ink font-medium">Ukenummeret.no</div>
                <div className="text-sm text-muted mt-0.5">
                  Se hvilket ukenummer det er.
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://www.utregn.no/"
                target="_blank"
                rel="noopener"
                className="card-soft block px-4 py-3 hover:border-accent"
              >
                <div className="text-ink font-medium">Utregn.no</div>
                <div className="text-sm text-muted mt-0.5">
                  Kalkulatorer og enkle utregninger.
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  kicker,
  title,
  icon,
}: {
  kicker: string;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
        {icon}
        {kicker}
      </div>
      <h2 className="mt-2 font-display tracking-display text-ink text-2xl sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function Term({ term, def }: { term: string; def: string }) {
  return (
    <div className="card-soft px-4 py-3">
      <dt className="text-ink font-medium">{term}</dt>
      <dd className="text-sm text-muted mt-1 leading-relaxed">{def}</dd>
    </div>
  );
}
