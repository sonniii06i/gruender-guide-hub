import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Calculator, PiggyBank } from "lucide-react";

interface Frist { date: string; title: string; tags: string[] }

const ALL_FRISTEN: Frist[] = [
  { date: "10.01.", title: "USt-Voranmeldung Dezember", tags: ["ust", "monatlich"] },
  { date: "10.01.", title: "Lohnsteuer-Anmeldung Dezember", tags: ["lohn"] },
  { date: "10.02.", title: "USt-Voranmeldung Januar", tags: ["ust", "monatlich"] },
  { date: "10.04.", title: "USt-VA Q1 (Quartalszahler)", tags: ["ust", "quartal"] },
  { date: "10.04.", title: "OSS-Meldung Q1", tags: ["oss"] },
  { date: "31.05.", title: "Steuererklärung (ohne StB)", tags: ["est", "kst"] },
  { date: "10.07.", title: "USt-VA Q2", tags: ["ust", "quartal"] },
  { date: "31.07.", title: "Steuererklärung Vorjahr (ohne StB)", tags: ["est"] },
  { date: "10.10.", title: "USt-VA Q3", tags: ["ust", "quartal"] },
  { date: "10.11.", title: "Gewerbesteuer-Vorauszahlung", tags: ["gewst"] },
  { date: "10.12.", title: "Körperschaftsteuer-VZ Q4", tags: ["kst"] },
  { date: "31.12.", title: "Pre-Year-End: Investitionen, Rückstellungen, Gewinnverlagerung", tags: ["pre-year-end"] },
];

const SteuerCockpit = () => {
  const [legalForm, setLegalForm] = useState<"ein" | "ug" | "gmbh">("gmbh");
  const [ustMode, setUstMode] = useState<"monatlich" | "quartal">("quartal");

  const fristen = useMemo(() => {
    return ALL_FRISTEN.filter((f) => {
      if (f.tags.includes("kst") && legalForm === "ein") return false;
      if (f.tags.includes("monatlich") && ustMode !== "monatlich") return false;
      if (f.tags.includes("quartal") && ustMode !== "quartal") return false;
      return true;
    });
  }, [legalForm, ustMode]);

  // IAB
  const [iabBasis, setIabBasis] = useState(80000);
  const iab = Math.min(iabBasis * 0.5, 200000);
  const iabSteuer = iab * (legalForm === "gmbh" || legalForm === "ug" ? 0.30 : 0.42);

  // Quartal
  const [umsatz, setUmsatz] = useState(60000);
  const [kosten, setKosten] = useState(28000);
  const gewinn = Math.max(0, umsatz - kosten);
  const steuersatz = legalForm === "gmbh" || legalForm === "ug" ? 0.30 : 0.35;
  const ruecklage = gewinn * steuersatz;

  return (
    <CockpitShell
      eyebrow="💰 DE-Steuer-Cockpit"
      title="Fristen, IAB & Quartals-Schätzung"
      subtitle="Personalisiert auf deine Rechtsform. Beta-Module – die finale Logik wird mit Steuerberater-Partnern verifiziert."
    >
      {/* Setup */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <h2 className="font-bold mb-4">Dein Setup</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <div className="flex gap-2 mt-2">
              {[["ein", "Einzel"], ["ug", "UG"], ["gmbh", "GmbH"]].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setLegalForm(v as typeof legalForm)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
                    legalForm === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
                  }`}
                >{l}</button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt-Voranmeldung</Label>
            <div className="flex gap-2 mt-2">
              {[["monatlich", "Monatlich"], ["quartal", "Quartal"]].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setUstMode(v as typeof ustMode)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
                    ustMode === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
                  }`}
                >{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fristen */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-accent-blue" />
          <h2 className="font-bold">Frist-Kalender {new Date().getFullYear()}</h2>
        </div>
        <div className="divide-y divide-border">
          {fristen.map((f, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-16 shrink-0 font-mono font-bold text-accent-blue">{f.date}</div>
              <div className="flex-1 text-sm">{f.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* IAB */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">IAB-Rechner</h2>
          </div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geplante Investition (€)</Label>
          <Input type="number" value={iabBasis} onChange={(e) => setIabBasis(Number(e.target.value) || 0)} className="mt-2" />
          <div className="mt-5 space-y-2 text-sm">
            <Row label="Investitionsabzugsbetrag (50 %)" value={`${iab.toLocaleString("de-DE")} €`} />
            <Row label="Steuer-Vorteil (geschätzt)" value={`${Math.round(iabSteuer).toLocaleString("de-DE")} €`} highlight />
            <p className="text-xs text-muted-foreground pt-2">Maximal 200.000 € pro Betrieb. Investition muss innerhalb 3 Jahren erfolgen.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">Quartals-Schätzung</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz Q (€)</Label>
              <Input type="number" value={umsatz} onChange={(e) => setUmsatz(Number(e.target.value) || 0)} className="mt-2" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Kosten Q (€)</Label>
              <Input type="number" value={kosten} onChange={(e) => setKosten(Number(e.target.value) || 0)} className="mt-2" />
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <Row label="Gewinn" value={`${gewinn.toLocaleString("de-DE")} €`} />
            <Row label={`Steuersatz (${(steuersatz * 100).toFixed(0)} %)`} value="" />
            <Row label="Rücklage empfohlen" value={`${Math.round(ruecklage).toLocaleString("de-DE")} €`} highlight />
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Hinweis: Dies sind orientierende Schätzungen, keine Steuerberatung. Final immer mit StB klären.
      </div>
    </CockpitShell>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${highlight ? "bg-accent text-accent-foreground" : "bg-secondary/50"}`}>
    <span className="text-muted-foreground">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

const Button2 = Button; // unused alias guard
export default SteuerCockpit;
