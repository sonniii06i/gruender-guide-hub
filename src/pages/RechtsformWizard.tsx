import { useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertTriangle, Info, SlidersHorizontal } from "lucide-react";
import { Callout, ChoiceGroup, Field, KitTable, ResultPanel, ToolLayout, ToolSection } from "@/components/cockpit/kit";

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
      eyebrow="Rechtsform-Wizard"
      title="Welche Rechtsform passt zu deinem Setup?"
      subtitle="Beantworte 5 Fragen, wir empfehlen Einzelunternehmen, UG, GmbH oder PartG. Eine Holding ist immer ein Aufsatz auf eine GmbH, nie eigenständig."
    >
      <ToolLayout
        inputs={
          <ToolSection title="Dein Vorhaben" icon={SlidersHorizontal} bodyClassName="space-y-6">
            {/* Branche */}
            <div>
              <p className="mb-2 text-sm font-medium" id="rf-branche">Branche / Tätigkeit</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-labelledby="rf-branche">
                {(Object.keys(BRANCHE_LABEL) as Branche[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={branche === b}
                    onClick={() => setBranche(b)}
                    className={`rounded-xl border px-3.5 py-3 text-left transition-[background-color,border-color] active:translate-y-px ${
                      branche === b ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/25"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{BRANCHE_LABEL[b]}</span>
                    <span className={`mt-0.5 block text-xs leading-snug ${branche === b ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                      {BRANCHE_HELP[b]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Field
              label={<>Erwarteter Jahres-<strong>Gewinn</strong> (€)</>}
              htmlFor="rf-gewinn"
              hint="Nicht Umsatz, sondern Gewinn nach Kosten. Das ist der relevante Treiber für die Rechtsform-Wahl."
            >
              <Input id="rf-gewinn" type="number" inputMode="numeric" value={gewinn} onChange={(e) => setGewinn(Number(e.target.value) || 0)} className="tabular" />
            </Field>

            <div>
              <p className="mb-2 text-sm font-medium">Anzahl Gründer</p>
              <ChoiceGroup<number>
                label="Anzahl Gründer"
                value={gruender}
                onChange={setGruender}
                options={[1, 2, 3].map((n) => ({ value: n, label: `${n}${n === 3 ? "+" : ""}` }))}
                className="[&>button]:min-w-16 [&>button]:text-center"
              />
            </div>

            <div className="space-y-2">
              <Toggle label="Hohes Haftungsrisiko (Produkthaftung, Personenschäden, hohe Verträge)" value={haftung} onChange={setHaftung} />
              <Toggle label="Langfristig: Vermögensaufbau, Reinvestition oder Exit geplant" value={holdingPlan} onChange={setHoldingPlan} />
            </div>
          </ToolSection>
        }
        result={
          <ResultPanel variant="ink" kicker="Empfehlung" title={null}>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-3xl">{r.form}</h2>
            <p className="mt-3 leading-relaxed">{r.reason}</p>
            {r.next && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-glow" aria-hidden="true" />
                <span>{r.next}</span>
              </div>
            )}
            {r.holdingAddon && (
              <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/80" aria-hidden="true" />
                <span>{r.holdingAddon}</span>
              </div>
            )}
            {r.warn && (
              <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/15 p-3.5 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-soft" aria-hidden="true" />
                <span>{r.warn}</span>
              </div>
            )}
          </ResultPanel>
        }
      />

      {/* Direkt-Vergleich: Einzel / UG / GmbH (Holding ist Add-on, separat erklärt) */}
      <section className="mt-12" aria-labelledby="rf-vergleich">
        <h2 id="rf-vergleich" className="mb-4 text-lg font-semibold tracking-tight">Direkt-Vergleich</h2>
        <KitTable caption="Vergleich Einzelunternehmen, UG und GmbH">
          <thead>
            <tr>
              <th scope="col" className="w-28"><span className="sr-only">Merkmal</span></th>
              {VERGLEICH.map((v) => (
                <th key={v.title} scope="col" className="!text-sm !text-foreground">{v.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["steuer", "haftung", "kosten", "pros"] as const).map((k) => (
              <tr key={k}>
                <th scope="row" className="border-t border-border/70 px-3 py-2.5 text-left text-sm font-medium text-muted-foreground">{VERGLEICH_LABEL[k]}</th>
                {VERGLEICH.map((v) => (
                  <td key={v.title} className="min-w-40 font-medium">{v[k]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </KitTable>

        <div className="mt-4 space-y-3">
          <Callout tone="accent" title="Holding-Struktur ist ein Add-on, keine eigene Rechtsform">
            Eine Holding besteht immer aus zwei GmbHs: einer operativen GmbH (macht Umsatz) und einer Holding GmbH (hält die Anteile).
            Sinnvoll ab ~150k € jährlich thesaurierten Gewinn oder bei Exit-Plan, dann sind Ausschüttungen Operativ → Holding zu 95 % steuerfrei (§ 8b KStG, effektiv ~1,5 %).
            <strong> Holding alleine macht keinen Sinn.</strong>
          </Callout>

          {branche === "freier-beruf" && (
            <Callout tone="success" title="Freier Beruf = Sonderstatus">
              Freie Berufe (Katalog § 18 EStG: Ärzte, Anwälte, StB, Architekten, Designer, Journalisten, IT-Freelancer, ...) sind <strong>kein Gewerbe</strong>: keine Gewerbeanmeldung, keine Gewerbesteuer, keine IHK-Pflicht. Anmeldung direkt beim Finanzamt mit ELSTER-FsE.
              Bei Teams: <strong>PartG</strong> (Partnerschaftsgesellschaft) statt GbR, mit Eintrag im Partnerschaftsregister.
            </Callout>
          )}
        </div>
      </section>
    </CockpitShell>
  );
};

const VERGLEICH = [
  { title: "Einzelunternehmen", steuer: "14 bis 45 % (ESt)", haftung: "privat unbeschränkt", kosten: "0 € (ggf. 20 bis 60 € Gewerbeanmeldung)", pros: "schnell, billig, EÜR statt Bilanz" },
  { title: "UG (haftungsbeschränkt)", steuer: "~30 % (KSt + GewSt + Soli)", haftung: "beschränkt auf Stammkapital", kosten: "ab 300 € Notar + HR", pros: "schneller GmbH-Einstieg ab 1 €" },
  { title: "GmbH", steuer: "~30 % (KSt + GewSt + Soli)", haftung: "beschränkt auf 25k €", kosten: "ab 800 € + 25k € Stammkapital", pros: "Standard für B2B + Banken" },
];
const VERGLEICH_LABEL = { steuer: "Steuer", haftung: "Haftung", kosten: "Kosten", pros: "Stärke" } as const;

const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={value}
    onClick={() => onChange(!value)}
    className={`w-full rounded-xl border p-4 text-left transition-colors ${value ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25"}`}
  >
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium">{label}</span>
      <span className={`h-6 w-10 shrink-0 rounded-full p-0.5 transition-colors ${value ? "bg-accent-blue" : "bg-input"}`}>
        <span className={`block h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${value ? "translate-x-4" : ""}`} />
      </span>
    </div>
  </button>
);

export default RechtsformWizard;
