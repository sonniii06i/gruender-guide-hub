import { Link } from "react-router-dom";
import { BookA } from "lucide-react";
import { lexikonFuerSeite, lexikonPfad } from "@/data/lexikon";

/**
 * Kasten „Begriffe im Lexikon“ auf Bestandsseiten (Tool-, Guide-, Ratgeberseiten).
 * Welche Seite welche Begriffe zeigt, steht im Katalog (`verlinktVon`). Ohne
 * Treffer rendert die Komponente nichts.
 */
export function LexikonVerweise({ pfad, className = "mt-14" }: { pfad: string; className?: string }) {
  const begriffe = lexikonFuerSeite(pfad);
  if (begriffe.length === 0) return null;
  return (
    <section className={className} aria-labelledby="lexikon-verweise">
      <h2 id="lexikon-verweise" className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <BookA className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Begriffe im Lexikon
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {begriffe.map((b) => (
          <Link
            key={b.slug}
            to={lexikonPfad(b.slug)}
            className="press group rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40 hover:shadow-card"
          >
            <p className="mb-1 text-sm font-semibold leading-snug">{b.begriff}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{b.kurz}</p>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-sm">
        <Link to="/lexikon" className="font-semibold text-accent-blue hover:underline">
          Alle Begriffe im Gründer-Lexikon
        </Link>
      </p>
    </section>
  );
}

export default LexikonVerweise;
