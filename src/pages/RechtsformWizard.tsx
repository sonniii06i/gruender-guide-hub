import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Sparkles, Info } from "lucide-react";

type Branche = "freier-beruf" | "dienstleistung" | "ecommerce" | "produktion";

interface Recommendation {
  form: string;
  reason: string;
  next?: string;
  warn?: string;
  /** Wenn Holding-Plan: zusätzlicher Aufsatz-Block */
  holdingAddon?: string;
}

const BRANCHE_LABEL: Record<Branche, string> = {
  "freier-beruf": "Freier Beruf",
  "dienstleistung": "Online-Dienstleistung",
  "ecommerce": "E-Commerce / Handel",
  "produktion": "Produktion / Werkstatt",
};

const BRANCHE_HELP: Record<Branche, string> = {
  "freier-beruf": "Berater, Designer, IT-Freelancer, Anwalt, Arzt, Journalist, Architekt, Lehrer, ...",
  "dienstleistung": "Agentur, SaaS, Coaching, B2B-Service – kein eigenes Lager",
  "ecommerce": "D2C-Shop, Amazon, Shopify – Lager + Inventory-Risiko",
  "produktion": "Werkstatt, Maschinen, eigenes Sortiment – höheres Sach- + Personenrisiko",
};

const recommend = (
  gewinn: number,
  gruender: number,
  haftung: boolean,
  branche: Branche,
  holdingPlan: boolean,
): Recommendation => {
  // ============ FREIER BERUF (keine GewSt, keine IHK) ============
  if (branche === "freier-beruf") {
    if (gruender === 1 && !haftung && gewinn < 100000) {
      return {
        form: "Einzelunternehmen (freiberuflich)",
        reason: "Freie Berufe sind keine Gewerbe → keine Gewerbesteuer, keine IHK-Pflicht, einfache EÜR. Bei Solo-Tätigkeit ohne Haftungsrisiko fast immer optimal.",
        next: "Anmeldung direkt beim Finanzamt (kein Gewerbeamt). Steuersatz: persönlicher ESt-Tarif (14–45 %, mit Splitting bei Verheirateten oft niedriger).",
      };
    }
    if (gruender > 1 && !haftung) {
      return {
        form: "Partnerschaftsgesellschaft (PartG)",
        reason: "Für Freiberufler-Teams die einfachste Form: keine GewSt, keine Notarkosten zwingend, Eintrag im Partnerschaftsregister.",
        next: "Bei Haftungsrisiko: PartG mbB (mit beschränkter Berufshaftung) prüfen – günstiger als GmbH.",
      };
    }
    if (haftung) {
      return {
        form: "PartG mbB oder GmbH",
        reason: "Bei Haftungsrisiko in freien Berufen: PartG mbB (mit Berufshaftpflicht, günstiger) oder direkt GmbH.",
        next: "PartG mbB nur für klassische freie Berufe (Anwälte, StB, Ärzte, Architekten). Sonst GmbH.",
      };
    }
    // Hoher Gewinn als Solo-Freiberufler → GmbH-Wechsel überlegen
    return {
      form: "Einzelunternehmen (freiberuflich) – noch",
      reason: `Bei ${gewinn.toLocaleString("de-DE")} € Gewinn ist Einzel weiter okay, aber GmbH-Wechsel wird interessant (Spitzensteuersatz 42–45 % vs. ~30 % GmbH).`,
      next: "Wenn du Gewinne thesaurieren willst → GmbH. Wenn du alles entnehmen willst → Einzel bleiben.",
    };
  }

  // ============ GEWERBE (mit GewSt + IHK) ============
  // Niedriger Gewinn + Solo + kein Risiko = Einzelunternehmen
  if (gewinn < 60000 && gruender === 1 && !haftung && branche !== "produktion") {
    return {
      form: "Einzelunternehmen",
      reason: "Solo-Gründung, ≤ 60k € Gewinn, niedriges Haftungsrisiko: Einzel ist meist günstiger – keine Notarkosten, keine KSt, einfache EÜR statt Bilanz, Splittingtarif bei Verheirateten.",
      next: `Gewerbeanmeldung beim Stadt-Gewerbeamt (20–60 €). Bei Wachstum > 60–80k € Gewinn → UG/GmbH wegen Steuersparmodell überlegen.`,
    };
  }

  // Mittlerer Gewinn Solo, kein Risiko = UG (Einstieg in Kapitalgesellschaft)
  if (gewinn < 100000 && gruender === 1 && !haftung && branche !== "produktion") {
    return {
      form: "UG (haftungsbeschränkt)",
      reason: "Solo + 60–100k € Gewinn + kein extremes Haftungsrisiko: UG ist guter Kompromiss zwischen Einzel und GmbH – ab 1 € Stammkapital, schnelle Gründung, Steuersatz wie GmbH (~30 %).",
      next: "25 % der Gewinne als gesetzliche Rücklage bis 25.000 € → dann automatische Umwandlung zur GmbH möglich.",
      warn: "Banken & große B2B-Kunden bevorzugen oft GmbH wegen Bonität.",
    };
  }

  // GmbH-Indikatoren: Haftung, mehrere Gründer, hoher Gewinn, Produktion, E-Commerce
  if (haftung || gruender > 1 || gewinn >= 80000 || branche === "produktion" || branche === "ecommerce") {
    const reasons: string[] = [];
    if (haftung) reasons.push("hohes Haftungsrisiko");
    if (gruender > 1) reasons.push(`${gruender} Gründer`);
    if (gewinn >= 80000) reasons.push(`Gewinn ab ${gewinn.toLocaleString("de-DE")} €`);
    if (branche === "produktion") reasons.push("Produktion / Sachschäden möglich");
    if (branche === "ecommerce") reasons.push("E-Commerce / Inventory-Risiko");

    const rec: Recommendation = {
      form: "GmbH",
      reason: `Bei ${reasons.join(", ")} ist GmbH Standard – Banken/B2B-Kunden bevorzugen sie, persönliche Haftung beschränkt, Steuer ~30 % auf Gewinn (vs. 42 %+ Spitzensteuersatz im Privatvermögen).`,
      next: "Stammkapital 25.000 € (mind. 12.500 € bei Gründung). Notarkosten + HR-Eintrag ~800–1.500 €.",
    };

    if (holdingPlan) {
      rec.holdingAddon = "Wenn du langfristig Gewinne thesaurieren oder einen Exit planst: zusätzlich eine **Holding GmbH** aufsetzen, die die Anteile der operativen GmbH hält. Ausschüttungen Operativ → Holding sind zu ~95 % steuerfrei (§ 8b KStG, effektiv ~1,5 %). Reihenfolge: erst operative GmbH gründen, später Anteile per Sachgründung in Holding einbringen (steuerneutral § 21 UmwStG, 7-Jahres-Sperrfrist!).";
    }
    return rec;
  }

  // Default: UG
  return {
    form: "UG (haftungsbeschränkt)",
    reason: "Schnell und günstig zu gründen (1 € Stammkapital), Haftungsbeschränkung – guter Allrounder.",
    next: "25 % Pflichtrücklage bis 25k € → automatische Umwandlung zur GmbH.",
  };
};

const RechtsformWizard = () => {
  const [gewinn, setGewinn] = useState(75000);
  const [gruender, setGruender] = useState(1);
  const [haftung, setHaftung] = useState(false);
  const [holdingPlan, setHoldingPlan] = useState(false);
  const [branche, setBranche] = useState<Branche>("dienstleistung");

  const r = recommend(gewinn, gruender, haftung, branche, holdingPlan);

  return (
    <CockpitShell
      eyebrow="🏗️ Rechtsform-Wizard"
      title="Welche Rechtsform passt zu deinem Setup?"
      subtitle="Beantworte 5 Fragen – wir empfehlen Einzel, UG, GmbH oder PartG. Holding ist immer ein Aufsatz auf eine GmbH, nie eigenständig."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          {/* Branche */}
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Branche / Tätigkeit</Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(BRANCHE_LABEL) as Branche[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBranche(b)}
                  className={`text-left rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    branche === b ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div>{BRANCHE_LABEL[b]}</div>
                  <div className={`text-[10px] font-normal mt-0.5 ${branche === b ? "opacity-80" : "text-muted-foreground"}`}>
                    {BRANCHE_HELP[b]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gewinn */}
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Erwarteter Jahres-<strong>Gewinn</strong> (€)</Label>
            <Input type="number" value={gewinn} onChange={(e) => setGewinn(Number(e.target.value) || 0)} className="mt-2" />
            <p className="text-[11px] text-muted-foreground mt-1">Nicht Umsatz – Gewinn nach Kosten. Das ist der relevante Treiber für die Rechtsform-Wahl.</p>
          </div>

          {/* Gründer */}
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
          <Toggle label="Langfristig: Vermögensaufbau, Reinvestition oder Exit geplant" value={holdingPlan} onChange={setHoldingPlan} />
        </div>

        {/* Empfehlung */}
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
            {r.holdingAddon && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-white/20 backdrop-blur p-3 text-sm">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{r.holdingAddon}</span>
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

      {/* Compare-Cards: Einzel / UG / GmbH (Holding ist Add-on, separat erklärt) */}
      <div className="mt-8">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Direkt-Vergleich</div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <Compare title="Einzelunternehmen" steuer="14–45 % (ESt)" haftung="privat unbeschränkt" kosten="0 € (ggf. 20–60 € Gewerbeanmeldung)" pros="schnell, billig, EÜR statt Bilanz" />
          <Compare title="UG (haftungsbeschränkt)" steuer="~30 % (KSt + GewSt + Soli)" haftung="beschränkt auf Stammkapital" kosten="ab 300 € Notar + HR" pros="schneller GmbH-Einstieg ab 1 €" />
          <Compare title="GmbH" steuer="~30 % (KSt + GewSt + Soli)" haftung="beschränkt auf 25k €" kosten="ab 800 € + 25k € Stammkapital" pros="Standard für B2B + Banken" />
        </div>

        {/* Holding-Erklärung als separater Block */}
        <div className="mt-4 rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent-blue mt-0.5 shrink-0" />
            <div>
              <div className="font-bold mb-1">Holding-Struktur ist ein Add-on, keine eigene Rechtsform</div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                Eine Holding besteht IMMER aus zwei GmbHs: einer operativen GmbH (macht Umsatz) und einer Holding GmbH (hält die Anteile).
                Sinnvoll ab ~150k € jährlich thesaurierten Gewinn oder bei Exit-Plan – dann sind Ausschüttungen Operativ → Holding zu 95 % steuerfrei (§ 8b KStG, effektiv ~1,5 %).
                <strong> Holding alleine macht keinen Sinn.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Freier-Beruf-Erklärung */}
        {branche === "freier-beruf" && (
          <div className="mt-3 rounded-2xl border border-success/30 bg-success/5 p-5">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-success mt-0.5 shrink-0" />
              <div>
                <div className="font-bold mb-1">Freier Beruf = Sonderstatus</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Freie Berufe (Katalog § 18 EStG: Ärzte, Anwälte, StB, Architekten, Designer, Journalisten, IT-Freelancer, ...) sind <strong>kein Gewerbe</strong>: keine Gewerbeanmeldung, keine Gewerbesteuer, keine IHK-Pflicht. Anmeldung direkt beim Finanzamt mit ELSTER-FsE.
                  Bei Teams: <strong>PartG</strong> (Partnerschaftsgesellschaft) statt GbR – mit Eintrag im Partnerschaftsregister.
                </div>
              </div>
            </div>
          </div>
        )}
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
