import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

/** Ja/Nein-Schalter für Prüf-Fragen im Lexoffice-Stil (null = noch nicht beantwortet). */
export const JaNein = ({ wert, setze }: { wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="inline-flex shrink-0 rounded-xl border border-border bg-secondary/50 p-0.5">
    {[true, false].map((v) => (
      <button
        key={String(v)}
        type="button"
        onClick={() => setze(v)}
        aria-pressed={wert === v}
        className={`min-h-9 rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
          wert === v
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/80 hover:text-primary"
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
  gruen: { farbe: "border-success/30 bg-success-soft", bar: "bg-success", text: "text-success", Icon: CheckCircle2 },
  gelb: { farbe: "border-warning/30 bg-warning-soft", bar: "bg-warning", text: "text-warning", Icon: AlertTriangle },
  rot: { farbe: "border-danger/30 bg-danger-soft", bar: "bg-danger", text: "text-danger", Icon: XCircle },
  offen: { farbe: "border-border bg-secondary/50", bar: "bg-primary", text: "text-muted-foreground", Icon: HelpCircle },
};

const BEFUND_ICON = {
  ok: { Icon: CheckCircle2, cls: "text-success" },
  warnung: { Icon: AlertTriangle, cls: "text-warning" },
  ausschluss: { Icon: XCircle, cls: "text-danger" },
};

export const AmpelErgebnis = ({ ampel, titel, befunde }: { ampel: Ampel; titel: Record<Ampel, string>; befunde: Befund[] }) => {
  const { farbe, bar, text, Icon } = AMPEL[ampel];
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 pl-6 md:p-6 md:pl-7 ${farbe}`} aria-live="polite">
      <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${bar}`} />
      <div className={`flex items-center gap-2.5 text-base font-bold ${text}`}>
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
  <div className="flex flex-col gap-2.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <div className="text-sm font-medium leading-relaxed text-foreground">
      {frage}
      {hilfe && <div className="mt-0.5 text-xs font-normal text-muted-foreground">{hilfe}</div>}
    </div>
    <JaNein wert={wert} setze={setze} />
  </div>
);

export const eur = (n: number, stellen = 0) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: stellen, maximumFractionDigits: stellen });
