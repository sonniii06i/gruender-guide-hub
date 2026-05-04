import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

type Recommendation = {
  form: string;
  reason: string;
  next?: string;
  warn?: string;
};

const recommend = (gewinn: number, gruender: number, haftung: boolean, holding: boolean): Recommendation => {
  if (gewinn < 30000 && gruender === 1 && !haftung) {
    return { form: "Einzelunternehmen", reason: "Bei < 30k € Gewinn, einer Person und geringem Haftungsrisiko ist Einzelunternehmen am günstigsten (keine KSt, keine Notarkosten).", next: "Bei Wachstum > 60k € Gewinn → UG/GmbH erwägen." };
  }
  if (gewinn < 80000 && !holding) {
    return { form: "UG (haftungsbeschränkt)", reason: "Schnell und günstig zu gründen (1 € Stammkapital), Haftungsbeschränkung, niedrige KSt + GewSt.", next: "25 % der Gewinne als Rücklage bis 25k € → automatische UG → GmbH-Umwandlung möglich.", warn: "Banken & B2B-Kunden bevorzugen oft GmbH." };
  }
  if (gewinn >= 80000 && !holding) {
    return { form: "GmbH", reason: "Ab ~80k € Gewinn rechnet sich die GmbH (25k € Stammkapital, ~30 % Steuer auf Gewinn vs. 42 %+ Spitzensteuersatz im Privatvermögen).", next: "Bei langfristigem Vermögensaufbau direkt Holding-Struktur planen." };
  }
  return {
    form: "Holding-Struktur (Holding GmbH + operative GmbH)",
    reason: "Optimal ab ~150k € Gewinn oder bei Plänen für Verkauf, Reinvestition, Vermögensaufbau. Gewinnausschüttung an Holding zu ~1,5 % besteuert (95 % steuerfrei nach §8b KStG).",
    next: "Reihenfolge: erst operative GmbH gründen → später Anteile per Sachgründung in Holding einbringen (steuerneutral nach §21 UmwStG).",
    warn: "7-Jahres-Sperrfrist beachten – Verkauf vorher löst Steuer aus.",
  };
};

const RechtsformWizard = () => {
  const [gewinn, setGewinn] = useState(75000);
  const [gruender, setGruender] = useState(1);
  const [haftung, setHaftung] = useState(false);
  const [holding, setHolding] = useState(false);

  const r = recommend(gewinn, gruender, haftung, holding);

  return (
    <CockpitShell
      eyebrow="🏗️ Rechtsform-Wizard"
      title="Welche Struktur passt zu deinem Setup?"
      subtitle="Beantworte 4 Fragen – wir empfehlen dir Einzel, UG, GmbH oder Holding und erklären die nächsten Schritte."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Erwarteter Jahresgewinn (€)</Label>
            <Input type="number" value={gewinn} onChange={(e) => setGewinn(Number(e.target.value) || 0)} className="mt-2" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Anzahl Gründer</Label>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setGruender(n)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${gruender === n ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"}`}>
                  {n}{n === 3 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>
          <Toggle label="Hohes Haftungsrisiko (Produkthaftung, Personenschäden, hohe Verträge)" value={haftung} onChange={setHaftung} />
          <Toggle label="Langfristig: Vermögensaufbau, Reinvestition oder Exit geplant" value={holding} onChange={setHolding} />
        </div>

        <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-glow relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent-blue/30 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Empfehlung
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{r.form}</h2>
            <p className="text-primary-foreground/90 leading-relaxed">{r.reason}</p>
            {r.next && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/15 backdrop-blur p-3 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{r.next}</span>
              </div>
            )}
            {r.warn && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-destructive/30 backdrop-blur p-3 text-sm">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{r.warn}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-4 gap-4 text-sm">
        <Compare title="Einzel" steuer="14–45 %" haftung="privat" kosten="0 €" pros="schnell, billig" />
        <Compare title="UG" steuer="~30 %" haftung="beschränkt" kosten="ab 300 €" pros="schnell, klein" />
        <Compare title="GmbH" steuer="~30 %" haftung="beschränkt" kosten="ab 800 € + 25k € Kapital" pros="Standard für B2B" />
        <Compare title="Holding" steuer="~1,5 % auf Gewinn-Weiterleitung" haftung="beschränkt" kosten="ab 1.600 €" pros="Steueroptimal" />
      </div>
    </CockpitShell>
  );
};

const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
  <button onClick={() => onChange(!value)}
    className={`w-full text-left rounded-xl border p-4 transition-colors ${value ? "border-accent-blue bg-accent" : "border-border bg-card hover:border-accent-blue/40"}`}>
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium">{label}</span>
      <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${value ? "bg-accent-blue" : "bg-secondary"}`}>
        <div className={`h-5 w-5 rounded-full bg-card transition-transform ${value ? "translate-x-4" : ""}`} />
      </div>
    </div>
  </button>
);

const Compare = ({ title, steuer, haftung, kosten, pros }: { title: string; steuer: string; haftung: string; kosten: string; pros: string }) => (
  <div className="rounded-2xl border border-border bg-card p-4">
    <div className="font-bold mb-3">{title}</div>
    <Stat label="Steuer" value={steuer} />
    <Stat label="Haftung" value={haftung} />
    <Stat label="Kosten" value={kosten} />
    <Stat label="Stärke" value={pros} />
  </div>
);
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-2 py-1.5 border-b border-border last:border-0 text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-right">{value}</span>
  </div>
);

export default RechtsformWizard;
