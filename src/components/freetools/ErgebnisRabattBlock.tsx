import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ErgebnisRabatt } from "@/lib/freetools/types";

// Ruhiger Rabatt-Block unter dem Ergebnis eines Gratis-Tools (zuerst: Rechtsform-Test).
// Erscheint nur in der Ergebnisansicht; die Bedingungen stehen direkt am Block
// (§ 6 Abs. 1 Nr. 3 DDG). Keine Frist, kein Countdown, kein Streichpreis.
export function ErgebnisRabattBlock({ rabatt }: { rabatt: ErgebnisRabatt }) {
  const [kopiert, setKopiert] = useState(false);

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(rabatt.code);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      // Zwischenablage gesperrt: Der Code steht lesbar daneben.
    }
  };

  return (
    <section
      aria-labelledby="ergebnis-rabatt-titel"
      data-testid="ergebnis-rabatt"
      className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
    >
      <h3 id="ergebnis-rabatt-titel" className="text-base font-semibold tracking-tight text-foreground">
        {rabatt.titel}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{rabatt.text}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span className="rounded-lg border border-border bg-secondary/50 px-3 py-2 font-mono text-sm font-semibold tracking-wide text-foreground">
          {rabatt.code}
        </span>
        <Button variant="outline" size="sm" onClick={kopieren} aria-label={`Rabattcode ${rabatt.code} kopieren`}>
          {kopiert ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-2 h-4 w-4" aria-hidden="true" />}
          {kopiert ? "Kopiert" : "Code kopieren"}
        </Button>
        <Link
          to={rabatt.ziel}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:underline"
        >
          {rabatt.zielText} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 border-t border-border/70 pt-3">
        <p className="text-xs font-semibold text-foreground">Bedingungen</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
          {rabatt.bedingungen.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
