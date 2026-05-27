"use client";

import { useMemo, useState } from "react";
import {
  parseIso,
  workdaysBetween,
  dateOf,
  isoDate,
  daysBetween,
} from "@/lib/holidays";

function toIsoLocal(d: Date): string {
  return isoDate(d);
}

export function WorkdaysCalculator() {
  const today = useMemo(() => {
    const now = new Date();
    return dateOf(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }, []);

  const defaultFrom = toIsoLocal(today);
  const defaultTo = toIsoLocal(dateOf(today.getUTCFullYear(), 12, 31));

  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const valid =
    /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to);
  const fromDate = valid ? parseIso(from) : null;
  const toDate = valid ? parseIso(to) : null;
  const inOrder = fromDate && toDate ? fromDate <= toDate : false;

  const workdays =
    fromDate && toDate && inOrder ? workdaysBetween(fromDate, toDate) : 0;
  const totalDays =
    fromDate && toDate && inOrder ? daysBetween(fromDate, toDate) + 1 : 0;
  const weekendDays = totalDays - workdays;
  // weekendDays inkluderer også helligdager — vi viser mer presist:
  const offDays = totalDays - workdays;

  return (
    <div className="card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="from" className="field-label">Fra dato</label>
          <input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="to" className="field-label">Til dato</label>
          <input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="field"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ResultBox label="Arbeidsdager" value={inOrder ? workdays : "—"} accent />
        <ResultBox label="Fridager (helg + helligdag)" value={inOrder ? offDays : "—"} />
        <ResultBox label="Dager totalt" value={inOrder ? totalDays : "—"} />
      </div>

      {!valid && (
        <p className="mt-4 text-sm text-warm">Velg gyldige datoer.</p>
      )}
      {valid && !inOrder && (
        <p className="mt-4 text-sm text-warm">
          «Til»-datoen må være lik eller etter «Fra»-datoen.
        </p>
      )}
      <p className="mt-4 text-xs text-muted">
        Beregnet som mandag–fredag minus de 12 norske offentlige helligdagene.
        Julaften og nyttårsaften regnes som arbeidsdager — de er ikke offisielt
        fri.
      </p>
    </div>
  );
}

function ResultBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-accent/30 bg-accentSoft/60 p-4"
          : "rounded-2xl border border-line bg-bg/40 p-4"
      }
    >
      <div className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </div>
      <div className="font-display text-3xl text-ink mt-1">{value}</div>
    </div>
  );
}
