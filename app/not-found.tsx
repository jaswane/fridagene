import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="narrow-container py-20 text-center">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-display tracking-display text-ink text-3xl sm:text-4xl">
        Siden finnes ikke
      </h1>
      <p className="mt-3 text-muted">
        Lenken kan være feil, eller siden er flyttet.
      </p>
      <p className="mt-6">
        <Link href="/" className="btn-primary">
          Gå til forsiden
        </Link>
      </p>
    </div>
  );
}
