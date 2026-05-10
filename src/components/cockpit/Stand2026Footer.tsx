import { Info, ExternalLink } from "lucide-react";

type Source = {
  label: string;
  url?: string;
};

type Props = {
  /** Welche Steuer-/Rechts-Quellen liegen der Berechnung zugrunde. */
  sources: Source[];
  /** Optional zusätzlicher Hinweis-Text spezifisch für das Tool. */
  note?: string;
  /** Stand der Daten — Default "Stand 2026". */
  stand?: string;
};

/**
 * Einheitlicher Disclaimer-Footer für alle Berechnungs-Tools.
 * Zeigt Stand, Quellen-Liste und StB-Verifizierungs-Hinweis.
 */
const Stand2026Footer = ({ sources, note, stand = "Stand 2026" }: Props) => (
  <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-4 text-[11px] leading-relaxed text-muted-foreground">
    <div className="flex items-start gap-2">
      <Info className="h-3.5 w-3.5 text-accent-blue shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1.5">
        <div>
          <span className="font-semibold text-foreground">{stand}</span> · Berechnungen sind Schätzungen
          basierend auf den unten genannten Quellen — vor steuerlich oder rechtlich relevanten
          Entscheidungen{" "}
          <span className="font-semibold text-foreground">mit Steuerberater verifizieren</span>.
          BMF-Schreiben + Gesetzeslage ändern sich kontinuierlich.
        </div>
        {note && <div>{note}</div>}
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          <span className="font-semibold text-foreground">Quellen:</span>
          {sources.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-0.5">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
                >
                  {s.label}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              ) : (
                <span>{s.label}</span>
              )}
              {i < sources.length - 1 && <span className="ml-1">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Stand2026Footer;
