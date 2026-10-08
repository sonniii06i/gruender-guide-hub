import { AlertTriangle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";

/** Ja/Nein-Schalter für Prüf-Fragen (null = noch nicht beantwortet). */
export const JaNein = ({ wert, setze }: { wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="flex gap-1.5 shrink-0">
    {[true, false].map((v) => (
      <button
        key={String(v)}
        type="button"
        onClick={() => setze(v)}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold border transition-colors ${
          wert === v ? "bg-accent-blue text-primary-foreground border-accent-blue" : "border-border bg-background hover:bg-secondary"
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
  gruen: { farbe: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700", Icon: CheckCircle2 },
  gelb: { farbe: "border-amber-500/40 bg-amber-500/5 text-amber-700", Icon: AlertTriangle },
  rot: { farbe: "border-red-500/40 bg-red-500/5 text-red-700", Icon: XCircle },
  offen: { farbe: "border-border bg-secondary/40 text-muted-foreground", Icon: HelpCircle },
};

export const AmpelErgebnis = ({ ampel, titel, befunde }: { ampel: Ampel; titel: Record<Ampel, string>; befunde: Befund[] }) => {
  const { farbe, Icon } = AMPEL[ampel];
  return (
    <div className={`rounded-2xl border p-5 ${farbe}`}>
      <div className="flex items-center gap-2 font-bold">
        <Icon className="h-5 w-5" /> {titel[ampel]}
      </div>
      <ul className="mt-3 space-y-2 text-xs text-foreground">
        {befunde.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0">{b.stufe === "ok" ? "✅" : b.stufe === "warnung" ? "⚠️" : "⛔"}</span>
            <span>
              {b.text} <span className="text-muted-foreground">({b.quelle})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const FrageZeile = ({ frage, hilfe, wert, setze }: { frage: string; hilfe?: string; wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="flex items-start justify-between gap-3 py-3">
    <div className="text-sm">
      {frage}
      {hilfe && <div className="text-[11px] text-muted-foreground mt-0.5">{hilfe}</div>}
    </div>
    <JaNein wert={wert} setze={setze} />
  </div>
);

export const eur = (n: number, stellen = 0) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: stellen, maximumFractionDigits: stellen });
