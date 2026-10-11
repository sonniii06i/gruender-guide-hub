import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

/** Ja/Nein-Schalter für Prüf-Fragen (null = noch nicht beantwortet). */
export const JaNein = ({ wert, setze }: { wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="flex gap-1.5 shrink-0">
    {[true, false].map((v) => (
      <button
        key={String(v)}
        type="button"
        onClick={() => setze(v)}
        aria-pressed={wert === v}
        className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors active:translate-y-px ${
          wert === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
        }`}
      >
        {v ? "Ja" : "Nein"}
      </button>
    ))}
  </div>
);

export type Ampel = "gruen" | "gelb" | "rot" | "offen";
export type Befund = { stufe: "ok" | "warnung" | "ausschluss"; text: string; quelle: string };

const AMPEL = {
  gruen: { farbe: "border-success/30 bg-success-soft", text: "text-success", Icon: CheckCircle2 },
  gelb: { farbe: "border-warning/30 bg-warning-soft", text: "text-warning", Icon: AlertTriangle },
  rot: { farbe: "border-danger/30 bg-danger-soft", text: "text-danger", Icon: XCircle },
  offen: { farbe: "border-border bg-secondary/50", text: "text-muted-foreground", Icon: HelpCircle },
};

const BEFUND_ICON = {
  ok: { Icon: CheckCircle2, cls: "text-success" },
  warnung: { Icon: AlertTriangle, cls: "text-warning" },
  ausschluss: { Icon: XCircle, cls: "text-danger" },
};

export const AmpelErgebnis = ({ ampel, titel, befunde }: { ampel: Ampel; titel: Record<Ampel, string>; befunde: Befund[] }) => {
  const { farbe, text, Icon } = AMPEL[ampel];
  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${farbe}`} aria-live="polite">
      <div className={`flex items-center gap-2 text-base font-semibold ${text}`}>
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="text-foreground">{titel[ampel]}</span>
      </div>
      {befunde.length > 0 && (
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-foreground">
          {befunde.map((b, i) => {
            const B = BEFUND_ICON[b.stufe];
            return (
              <li key={i} className="flex gap-2.5">
                <B.Icon className={`mt-0.5 h-4 w-4 shrink-0 ${B.cls}`} aria-label={b.stufe === "ok" ? "erfüllt" : b.stufe === "warnung" ? "Warnung" : "Ausschluss"} />
                <span>
                  {b.text} <span className="text-muted-foreground">({b.quelle})</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const FrageZeile = ({ frage, hilfe, wert, setze }: { frage: string; hilfe?: string; wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
    <div className="text-sm leading-relaxed">
      {frage}
      {hilfe && <div className="mt-0.5 text-xs text-muted-foreground">{hilfe}</div>}
    </div>
    <JaNein wert={wert} setze={setze} />
  </div>
);

export const eur = (n: number, stellen = 0) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: stellen, maximumFractionDigits: stellen });
