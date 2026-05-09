import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, Info, AlertTriangle } from "lucide-react";

type WayResult = {
  name: string;
  description: string;
  steuerGmbh: number;
  steuerPrivat: number;
  totalSteuer: number;
  privatNetto: number;
  effektivPct: number;
  pros: string[];
  cons: string[];
};

// KSt 15 % + SolZ 5,5 % auf KSt + GewSt (Hebesatz × 3,5 %) — auf GmbH-Gewinn
// Berechnung: KSt 15 % × 1,055 + GewSt = 15,825 % + GewSt-Anteil
function kstGewstRate(hebesatz: number): number {
  const kstSolz = 0.15 * 1.055; // = 15,825 %
  const gewst = 0.035 * (hebesatz / 100);
  return kstSolz + gewst;
}
const ABG_ST = 0.26375; // 25 % AbgSt + Soli auf Dividenden privat
const HALBEINKUENFTE = 0.6; // Teileinkünfteverfahren: 60 % steuerpflichtig
// HOLDING_RATE: §8b KStG 5 %-Schein-Dividende × KSt+GewSt+Soli ≈ 1,5 % effektiv
function holdingRate(hebesatz: number): number {
  return 0.05 * kstGewstRate(hebesatz);
}

function calculate(
  opGewinn: number,
  persoenlicherEStSatz: number,
  hatHolding: boolean,
  hebesatz: number,
  gehaltsAnteilProz: number,
): WayResult[] {
  if (opGewinn <= 0) return [];
  const eS = Math.max(0.14, Math.min(0.45, persoenlicherEStSatz));
  const KSt_PLUS_GEWST = kstGewstRate(hebesatz);
  const HOLDING_RATE = holdingRate(hebesatz);
  const gehaltsAnteil = Math.max(0, Math.min(1, gehaltsAnteilProz / 100));

  // 1) GF-Gehalt — kann nur Anteil sein (Angemessenheits-Prüfung verbietet 100 % typisch)
  const gfGehalt = opGewinn * gehaltsAnteil;
  const restNachGehalt = opGewinn - gfGehalt; // dieser Teil bleibt im Op-GmbH-Gewinn
  const sozialMax = 0; // Gesellschafter-GF > 50 % = sv-frei
  const steuerGfGehalt_Privat = gfGehalt * eS; // ESt auf Gehalt-Anteil
  const steuerGfGehalt_GmbH = restNachGehalt * KSt_PLUS_GEWST; // KSt+GewSt auf den Rest
  // Rest nach KSt: optional als Dividende ausgeschüttet → AbgSt
  const restNachGehaltKSt = restNachGehalt - steuerGfGehalt_GmbH;
  const steuerGfGehalt_Div = restNachGehaltKSt * ABG_ST;
  const totalGfGehalt = steuerGfGehalt_GmbH + steuerGfGehalt_Privat + steuerGfGehalt_Div + sozialMax;

  // 2) Standard-Dividende (Op-GmbH → Privat) ohne Holding
  const steuerDiv_GmbH = opGewinn * KSt_PLUS_GEWST;
  const restNachKSt = opGewinn - steuerDiv_GmbH;
  const steuerDiv_Privat = restNachKSt * ABG_ST;
  const totalDiv = steuerDiv_GmbH + steuerDiv_Privat;

  // 3) Teileinkünfteverfahren (für > 25 % Beteiligung freiwillig)
  // 60 % der Dividende im persönlichen ESt-Satz besteuert
  const steuerTEV_Privat = restNachKSt * HALBEINKUENFTE * eS;
  const totalTEV = steuerDiv_GmbH + steuerTEV_Privat;

  // 4) Holding-Ausschüttung (Op-GmbH → Holding-GmbH → später Privat)
  const steuerHolding = opGewinn * KSt_PLUS_GEWST + (opGewinn - opGewinn * KSt_PLUS_GEWST) * HOLDING_RATE;
  // Wenn alles in Holding bleibt: das ist die Steuer (Privat = 0 entnommen)
  const totalHolding = steuerHolding;

  // 5) Mix: 50 % thesauriert in Holding, 50 % privat entnommen via AbgSt
  const halfTo_Privat = restNachKSt * 0.5;
  const steuerMix_Privat = halfTo_Privat * ABG_ST;
  const totalMix = steuerDiv_GmbH + (restNachKSt * 0.5) * HOLDING_RATE + steuerMix_Privat;

  // 6) Pensionszusage (vereinfacht — komplex in Realität)
  // Vorteilhaft weil Rückstellungen Op-GmbH-Gewinn mindern, später als Rente versteuert
  // Vereinfacht: 30% wird als Pension reserviert, 70% wie Standard-Dividende
  const pensionAnteil = opGewinn * 0.3;
  const restNachPension = opGewinn - pensionAnteil; // 70 %
  const steuerPension_GmbH = restNachPension * KSt_PLUS_GEWST;
  const steuerPension_Privat = (restNachPension - steuerPension_GmbH) * ABG_ST;
  // Pension später mit ~25 % effektiv versteuert (Rentner-ESt-Satz)
  const steuerPension_Spaeter = pensionAnteil * 0.25;
  const totalPension = steuerPension_GmbH + steuerPension_Privat + steuerPension_Spaeter;

  // 7) Tantieme (variable Vergütung)
  // Tantieme ist ESt-pflichtig (wie Gehalt) aber mindert GmbH-Gewinn
  // Vereinfacht wie GF-Gehalt aber mit Sozialversicherungs-Aspekten
  const totalTantieme = totalGfGehalt; // identisch zu GF-Gehalt-Logik

  return [
    {
      name: `GF-Gehalt ${Math.round(gehaltsAnteil * 100)} % + Rest als Dividende`,
      description: `${Math.round(gehaltsAnteil * 100)} % als GF-Gehalt (mindert Op-GmbH-Gewinn) + ${Math.round((1 - gehaltsAnteil) * 100)} % verbleibender Gewinn → KSt+GewSt+SolZ + AbgSt auf Dividende.`,
      steuerGmbh: steuerGfGehalt_GmbH,
      steuerPrivat: steuerGfGehalt_Privat + steuerGfGehalt_Div,
      totalSteuer: totalGfGehalt,
      privatNetto: opGewinn - totalGfGehalt,
      effektivPct: (totalGfGehalt / opGewinn) * 100,
      pros: [
        "Steuer-Verschiebung von KSt+GewSt (~30 %) auf ESt (14–45 %)",
        "Sozialversicherungs-frei wenn Gesellschafter-GF > 50 %",
        "Bei niedrigem ESt-Satz < 30 %: Vorteil",
      ],
      cons: [
        "Bei Spitzensteuersatz 45 %: schlechter als reguläre Ausschüttung",
        "Verbindlich: einmal vereinbart kann GmbH ggf. nicht zahlen → vGA-Risiko",
        "Angemessenheits-Prüfung Finanzamt (Marktüblichkeit)",
      ],
    },
    {
      name: "Standard-Ausschüttung (Privat)",
      description: "Op-GmbH zahlt KSt+GewSt, Rest als Dividende mit Abgeltungssteuer 26,375 %.",
      steuerGmbh: steuerDiv_GmbH,
      steuerPrivat: steuerDiv_Privat,
      totalSteuer: totalDiv,
      privatNetto: opGewinn - totalDiv,
      effektivPct: (totalDiv / opGewinn) * 100,
      pros: [
        "Pauschal 26,375 % AbgSt — egal ob 100 k oder 10 Mio Dividenden",
        "Einfache Lösung, keine Sonder-Strukturen nötig",
        "Geld ist sofort privat verfügbar",
      ],
      cons: [
        "Insgesamt ~48–50 % Steuer (KSt + GewSt + AbgSt)",
        "Bei Reinvest: Steuer schon bezahlt → nur 50 % Reinvest-Power",
        "Keine Schachtelprivileg-Vorteile",
      ],
    },
    {
      name: "Teileinkünfteverfahren (TEV)",
      description: "Bei ≥ 25 % Beteiligung wählbar: 60 % der Dividende mit ESt-Satz statt 100 % AbgSt.",
      steuerGmbh: steuerDiv_GmbH,
      steuerPrivat: steuerTEV_Privat,
      totalSteuer: totalTEV,
      privatNetto: opGewinn - totalTEV,
      effektivPct: (totalTEV / opGewinn) * 100,
      pros: [
        `Bei niedrigem ESt-Satz (z.B. ${(eS * 100).toFixed(0)} %): nur ${(eS * 60).toFixed(1)} % effektiv auf Dividende statt 26,375 %`,
        "Werbungskosten zu 60 % abziehbar (Schuldzinsen für Anteilsfinanzierung)",
        "Mind. 25 % Beteiligung ODER 1 % + Tätigkeit",
      ],
      cons: [
        "Bei Spitzensteuersatz 45 %: 27 % effektiv → schlechter als AbgSt",
        "Komplexer in der Steuererklärung",
        "Wahl ist 5 Jahre bindend",
      ],
    },
    {
      name: "Holding-Ausschüttung (thesauriert)",
      description: "Op-GmbH → Holding-GmbH (1,5 % effektiv via §8b). Holding kann reinvestieren ohne weitere Privat-Steuer.",
      steuerGmbh: steuerDiv_GmbH,
      steuerPrivat: 0,
      totalSteuer: steuerHolding,
      privatNetto: 0,
      effektivPct: (steuerHolding / opGewinn) * 100,
      pros: [
        "**Beste Option für Reinvest**: 1,5 % statt 26,375 %",
        "Holding kann ETF/Immobilien/Beteiligungen kaufen",
        "Bei Op-GmbH-Verkauf: §8b 95 % steuerfrei",
      ],
      cons: [
        "Geld ist NICHT privat — bei Privat-Entnahme später nochmal AbgSt fällig",
        "Setup-Kosten 1.500–2.500 € + Holding-Stammkapital 25 k €",
        "Sinnvoll erst ab ~100 k €/Jahr Op-Gewinn",
      ],
    },
    {
      name: "Mix: 50 % Holding + 50 % privat",
      description: "Halb in Holding thesauriert (Reinvest), halb privat via AbgSt entnommen.",
      steuerGmbh: steuerDiv_GmbH,
      steuerPrivat: steuerMix_Privat,
      totalSteuer: totalMix,
      privatNetto: halfTo_Privat - steuerMix_Privat,
      effektivPct: (totalMix / opGewinn) * 100,
      pros: [
        "Realistische Praxis: Geld für Lifestyle + Reinvest",
        "Schachtelprivileg auf Reinvest-Anteil",
        "Flexibilität in den Folgejahren",
      ],
      cons: [
        "Komplexität (zwei Buchungs-Wege)",
        "Setup wie Standard-Holding nötig",
      ],
    },
    {
      name: "Pensionszusage",
      description: "30 % als Pension zurückgestellt — mindert Op-GmbH-Gewinn, später als Rente versteuert.",
      steuerGmbh: steuerPension_GmbH,
      steuerPrivat: steuerPension_Privat + steuerPension_Spaeter,
      totalSteuer: totalPension,
      privatNetto: opGewinn - totalPension,
      effektivPct: (totalPension / opGewinn) * 100,
      pros: [
        "Rückstellung mindert aktuell Op-GmbH-Gewinn",
        "Später Rentner-ESt typisch 20–28 % statt aktuell 42 %",
        "Insolvenzgeschützt (Pensionssicherungsverein)",
      ],
      cons: [
        "Hochkomplex — Versicherungsmathematiker + StB Pflicht",
        "Angemessenheit Finanzamt (max ~75 % letztes Aktivgehalt)",
        "Bei Verkauf Op-GmbH: schwer zu transferieren",
        "Kein Geld jetzt verfügbar",
      ],
    },
    {
      name: "Tantieme (variable Vergütung)",
      description: "Wie GF-Gehalt aber gewinnabhängig — flexibel bei guten/schlechten Jahren. Steuer-Effekt analog zu Variante 1.",
      steuerGmbh: steuerGfGehalt_GmbH,
      steuerPrivat: steuerGfGehalt_Privat + steuerGfGehalt_Div,
      totalSteuer: totalTantieme,
      privatNetto: opGewinn - totalTantieme,
      effektivPct: (totalTantieme / opGewinn) * 100,
      pros: [
        "Flexibilität: nur ausschütten wenn Gewinn da",
        "Mindert Op-GmbH-Gewinn",
        "Wie GF-Gehalt sozialversicherungsfrei wenn >50 % Anteile",
      ],
      cons: [
        "Strenge Angemessenheits-Prüfung (max 25 % vom Vorjahres-Gewinn)",
        "Bei Spitzen-ESt: schlechter als AbgSt",
        "Tantiemenvereinbarung schriftlich VOR Wirtschaftsjahr",
      ],
    },
  ];
}

const AuszahlungOptimizer = () => {
  const [opGewinn, setOpGewinn] = useState(250000);
  const [eStSatz, setEStSatz] = useState(0.42);
  const [hatHolding, setHatHolding] = useState(true);
  const [hebesatz, setHebesatz] = useState(400);
  const [gehaltsAnteil, setGehaltsAnteil] = useState(40); // % vom Gewinn als Gehalt — Default 40 % marktüblich

  const allResults = useMemo(
    () => calculate(opGewinn, eStSatz, hatHolding, hebesatz, gehaltsAnteil),
    [opGewinn, eStSatz, hatHolding, hebesatz, gehaltsAnteil],
  );
  // Wenn keine Holding vorhanden: Holding- + Mix-Wege ausblenden (sonst irreführend)
  const results = useMemo(
    () => (hatHolding ? allResults : allResults.filter((r) => !r.name.includes("Holding") && !r.name.includes("Mix"))),
    [allResults, hatHolding],
  );
  const sorted = [...results].sort((a, b) => a.totalSteuer - b.totalSteuer);
  const best = sorted[0];

  return (
    <CockpitShell
      eyebrow="Auszahlung-Optimizer"
      title="Wie ziehst du Gewinn am steuer-effizientesten raus?"
      subtitle="Vergleich von 7 Auszahlungs-Wegen aus deiner GmbH: GF-Gehalt · Standard-Dividende · Teileinkünfteverfahren · Holding · Mix · Pensionszusage · Tantieme. Mit konkreten Steuer-Berechnungen."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Situation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Op-GmbH-Gewinn (€/Jahr)</Label>
            <Input
              type="number"
              value={opGewinn}
              onChange={(e) => setOpGewinn(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Persönl. ESt-Satz (Spitzensatz)
            </Label>
            <select
              value={eStSatz}
              onChange={(e) => setEStSatz(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.14}>14 % (geringes Einkommen)</option>
              <option value={0.24}>24 % (mittel)</option>
              <option value={0.32}>32 % (gut verdienend)</option>
              <option value={0.42}>42 % (Spitzensatz ab ~62k)</option>
              <option value={0.45}>45 % (Reichensteuer ab ~278k)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Holding vorhanden?</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatHolding(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    hatHolding === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Erweiterte Stellschrauben */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 border-t border-accent-blue/20 pt-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              GewSt-Hebesatz (in %)
            </Label>
            <Input
              type="number"
              value={hebesatz}
              onChange={(e) => setHebesatz(Math.max(200, Number(e.target.value) || 400))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Berlin 410 · München 490 · Hamburg 470 · Frankfurt 460 · ländlich oft 350-380
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              GF-Gehalt-Anteil bei Variante 1 (in % vom Gewinn)
            </Label>
            <Input
              type="number"
              value={gehaltsAnteil}
              onChange={(e) => setGehaltsAnteil(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Marktüblich 30-50 %. 100 % wäre Angemessenheits-Verstoß (vGA-Risiko).
            </div>
          </div>
        </div>
      </div>

      {/* Best Recommendation */}
      {best && (
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-card via-card to-emerald-500/5 p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Steuer-Optimale Variante für dich
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1">{best.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{best.description}</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-secondary/40 p-3">
              <div className="text-[10px] text-muted-foreground uppercase">Total Steuer</div>
              <div className="text-lg font-bold">{Math.round(best.totalSteuer).toLocaleString("de-DE")} €</div>
            </div>
            <div className="rounded-lg bg-secondary/40 p-3">
              <div className="text-[10px] text-muted-foreground uppercase">Privat netto</div>
              <div className="text-lg font-bold">
                {Math.round(best.privatNetto).toLocaleString("de-DE")} €
              </div>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <div className="text-[10px] text-emerald-700 uppercase">Effektivsatz</div>
              <div className="text-lg font-bold text-emerald-700">{best.effektivPct.toFixed(1)} %</div>
            </div>
          </div>
        </div>
      )}

      {/* All Options Compared */}
      <h3 className="text-base font-bold mb-3">Alle 7 Auszahlungs-Wege im Vergleich</h3>
      <div className="space-y-3 mb-6">
        {sorted.map((r, i) => (
          <div
            key={r.name}
            className={`rounded-2xl border p-5 ${
              i === 0
                ? "border-emerald-500/40 bg-emerald-500/5"
                : i === sorted.length - 1
                ? "border-red-500/30 bg-red-500/5"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] font-bold">
                    #{i + 1}
                  </span>
                  <span className="font-bold">{r.name}</span>
                  {i === 0 && (
                    <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                      ✓ Beste
                    </span>
                  )}
                  {i === sorted.length - 1 && sorted.length > 1 && (
                    <span className="rounded-full bg-red-500/10 text-red-700 px-2 py-0.5 text-[10px] font-semibold">
                      ⚠ Schlechteste
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase">Effektivsatz</div>
                <div className="text-xl font-bold">{r.effektivPct.toFixed(1)} %</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">GmbH-Steuer</div>
                <div className="font-mono text-xs font-semibold">
                  {Math.round(r.steuerGmbh).toLocaleString("de-DE")} €
                </div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Privat-Steuer</div>
                <div className="font-mono text-xs font-semibold">
                  {Math.round(r.steuerPrivat).toLocaleString("de-DE")} €
                </div>
              </div>
              <div className="rounded-lg bg-secondary/40 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Privat netto</div>
                <div className="font-mono text-xs font-semibold">
                  {Math.round(r.privatNetto).toLocaleString("de-DE")} €
                </div>
              </div>
            </div>
            <details className="text-xs">
              <summary className="cursor-pointer font-semibold text-muted-foreground">
                Pros / Cons ▾
              </summary>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">
                    + Vorteile
                  </div>
                  <ul className="space-y-0.5 text-muted-foreground">
                    {r.pros.map((p, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: "· " + p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">
                    − Nachteile
                  </div>
                  <ul className="space-y-0.5 text-muted-foreground">
                    {r.cons.map((c, j) => (
                      <li key={j}>· {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig (vereinfachte Modellrechnung):</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                Annahmen: Gesellschafter-GF mit ≥ 50 % Anteilen (sv-frei). KSt+GewSt-Hebesatz ~30 % (Bundesdurchschnitt).
                Soli-Zuschlag inkludiert.
              </li>
              <li>
                Pensionszusage stark vereinfacht — in Realität versicherungsmathematisch komplex.
              </li>
              <li>
                §AStG, vGA-Risiken, Angemessenheits-Prüfungen NICHT modelliert — können je nach Setup signifikant
                ändern.
              </li>
              <li>
                Real: Mix von 2-3 Wegen typisch (z.B. Mindest-Gehalt + Tantieme + Rest in Holding).
              </li>
              <li>Konkrete Strategie immer mit StB durchrechnen.</li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default AuszahlungOptimizer;
