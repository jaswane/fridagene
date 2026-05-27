import { Info } from "lucide-react";

export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="card-soft mt-8 px-4 py-3 flex gap-3 text-sm text-muted">
      <Info aria-hidden className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
      <p>
        {children ??
          "Arbeidstid og fridager kan variere etter tariff, arbeidsavtale og arbeidsgiver. Fridagene.no viser offentlige helligdager og praktiske planleggingstips."}
      </p>
    </aside>
  );
}
