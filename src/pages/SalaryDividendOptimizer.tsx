import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, AlertTriangle } from "lucide-react";

// ESt 2026 §32a (vereinfacht)
const calcEst2026 = (zvE: number) => {
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.floor((932.3 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return Math.floor((176.64 * z + 2397) * z + 1015.13);
  }
  if (zvE <= 277825) return Math.floor(0.42 * zvE - 10911.92);
  return Math.floor(0.45 * zvE - 19246.67);
};

// Sozialversicherungs-Beiträge GF (DE 2026 ungefähr) – TOTAL Arbeitnehmer + Arbeitgeber
// Pflicht: KV ~16,5%, RV 18,6%, AV 2,6%, PV 3,4-3,6% (kinderlos +0,6%)
// BBG 2026: KV/PV ~5.512,50 €/Mon = 66.150 €/J, RV/AV West 8.050 €/Mon = 96.600 €/J
const SV_BBG_KV_J = 66150;
const SV_BBG_RV_J = 96600;
const SV_QUOTE_KV_PV = 0.205; // gesamt KV+PV (Stand 2026, kinderlos +0,6%)
const SV_QUOTE_RV_AV = 0.212; // RV+AV
const calcSv = (jBrutto: number, sozialversicherungspflichtig: boolean) => {
  if (!sozialversicherungspflichtig) return 0;
  const kvBasis = Math.min(jBrutto, SV_BBG_KV_J);
  const rvBasis = Math.min(jBrutto, SV_BBG_RV_J);
  return kvBasis * SV_QUOTE_KV_PV + rvBasis * SV_QUOTE_RV_AV;
};

// GmbH: KSt 15 + SolZ 5,5 % auf KSt + GewSt (Hebesatz)
const calcGmbhSteuer = (gewinn: number, hebesatz: number) => {
  if (gewinn <= 0) return { kst: 0, solz: 0, gewst: 0, total: 0 };
  const kst = gewinn * 0.15;
  const solz = kst * 0.055;
  const gewst = gewinn * 0.035 * (hebesatz / 100); // Messzahl 3,5 % × Hebesatz
  return { kst, solz, gewst, total: kst + solz + gewst };
};

// Privat-Ausschüttung: Abgeltungssteuer 25 % + SolZ 5,5 % + ggf. KiSt 8/9 %
const calcAusschuettungSteuer = (brutto: number, kistSatz: number) => {
  const kapErtragSteuer = brutto * 0.25;
  const solz = kapErtragSteuer * 0.055;
  const kist = kapErtragSteuer * (kistSatz / 100);
  return { kapErtragSteuer, solz, kist, total: kapErtragSteuer + solz + kist };
};

// Teileinkünfteverfahren (TEV) — 60 % der Ausschüttung als Eink. aus Gewerbe/Kapital
// Voraussetzung: ≥1 % Beteiligung + Antrag (i.d.R. wenn Anteile im Betriebsvermögen sind oder Antrag gestellt wird)
const calcTevSteuer = (brutto: number, persoenlicherSatz: number, kistSatz: number) => {
  const tevBemessung = brutto * 0.6;
  const est = tevBemessung * (persoenlicherSatz / 100);
  const solz = est * 0.055;
  const kist = est * (kistSatz / 100);
  return { tevBemessung, est, solz, kist, total: est + solz + kist };
};

type Mode = "abgeltung" | "tev";

const SalaryDividendOptimizer = () => {
  const [gewinnVorGehalt, setGewinnVorGehalt] = useState(200000);
  const [gehaltJahresbrutto, setGehaltJahresbrutto] = useState(80000);
  const [hebesatz, setHebesatz] = useState(400);
  const [kistSatz, setKistSatz] = useState(0); // 0/8/9 %
  const [sozialversicherungspflichtig, setSozialversicherungspflichtig] = useState(false);
  const [mode, setMode] = useState<Mode>("abgeltung");
  const [grenzsatz, setGrenzsatz] = useState(45); // für TEV

  const calcScenario = (gehalt: number) => {
    const sv = calcSv(gehalt, sozialversicherungspflichtig);
    // Aus Sicht GmbH: Gehalt + AG-Anteil-SV mindern Gewinn
    const agSvAnteil = sv / 2; // ungefähr 50/50 split
    const gehaltsAufwand = gehalt + agSvAnteil;
    const gewinnNachGehalt = Math.max(0, gewinnVorGehalt - gehaltsAufwand);

    // Gewinn der GmbH wird besteuert
    const gmbhSteuer = calcGmbhSteuer(gewinnNachGehalt, hebesatz);
    const gewinnNachSteuer = gewinnNachGehalt - gmbhSteuer.total;

    // Voll-Ausschüttung
    const auss =
      mode === "abgeltung"
        ? calcAusschuettungSteuer(gewinnNachSteuer, kistSatz)
        : calcTevSteuer(gewinnNachSteuer, grenzsatz, kistSatz);
    const nettoAusschuettung = gewinnNachSteuer - auss.total;

    // GF-Gehalt-Netto
    const anSv = sv / 2;
    const zvE = Math.max(0, gehalt - anSv); // vereinfacht: AN-SV reduziert zvE
    const est = calcEst2026(zvE);
    const solz = est * 0.055;
    const kist = est * (kistSatz / 100);
    const gehaltNetto = gehalt - anSv - est - solz - kist;

    return {
      gehalt,
      sv,
      gehaltsAufwand,
      gewinnNachGehalt,
      gmbhSteuer: gmbhSteuer.total,
      gewinnNachSteuer,
      ausschuettungSteuer: auss.total,
      nettoAusschuettung,
      gehaltNetto,
      total: gehaltNetto + nettoAusschuettung,
      // Diagnostics
      kst: gmbhSteuer.kst,
      gewst: gmbhSteuer.gewst,
      solzGmbh: gmbhSteuer.solz,
      anSv,
      est,
    };
  };

  const scenarios = useMemo(() => {
    const variants = [
      { label: "Min-Gehalt (24k)", gehalt: 24000 },
      { label: "Niedrig-Gehalt (60k)", gehalt: 60000 },
      { label: "Mittel-Gehalt (100k)", gehalt: 100000 },
      { label: "Hoch-Gehalt (150k)", gehalt: 150000 },
      { label: "Custom-Gehalt", gehalt: gehaltJahresbrutto },
    ];
    return variants.map((v) => ({ ...v, ...calcScenario(v.gehalt) }));
  }, [gewinnVorGehalt, gehaltJahresbrutto, hebesatz, kistSatz, sozialversicherungspflichtig, mode, grenzsatz]);

  const best = useMemo(() => {
    return [...scenarios].sort((a, b) => b.total - a.total)[0];
  }, [scenarios]);

  return (
    <CockpitShell
      eyebrow="Salary-vs-Dividende-Optimizer"
      title="GF-Gehalt vs. Gewinnausschüttung – live durchgerechnet"
      subtitle="KSt 15 % + GewSt + SolZ vs. ESt §32a 2026 + SV-Beiträge. Berücksichtigt Teileinkünfte vs. Abgeltungssteuer + KiSt 8/9 %. 5 Gehalts-Szenarien gegenübergestellt."
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div>
          <Label className="text-xs">GmbH-Gewinn vor GF-Gehalt (€/Jahr)</Label>
          <Input
            type="number"
            value={gewinnVorGehalt || ""}
            onChange={(e) => setGewinnVorGehalt(Math.max(0, Number(e.target.value) || 0))}
            className="h-9 text-sm mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">GewSt-Hebesatz (z.B. 400 = München)</Label>
          <Input
            type="number"
            value={hebesatz || ""}
            onChange={(e) => setHebesatz(Math.max(200, Number(e.target.value) || 200))}
            className="h-9 text-sm mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Kirchensteuer (% — 0/8/9)</Label>
          <select
            value={kistSatz}
            onChange={(e) => setKistSatz(Number(e.target.value))}
            className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
          >
            <option value={0}>0 % (kein KiSt-Pflicht)</option>
            <option value={8}>8 % (BY/BW)</option>
            <option value={9}>9 % (Rest)</option>
          </select>
        </div>

        <div>
          <Label className="text-xs">Custom-GF-Gehalt (€/Jahr brutto)</Label>
          <Input
            type="number"
            value={gehaltJahresbrutto || ""}
            onChange={(e) => setGehaltJahresbrutto(Math.max(0, Number(e.target.value) || 0))}
            className="h-9 text-sm mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Ausschüttungs-Modus</Label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
          >
            <option value="abgeltung">Abgeltungssteuer 25 % (Privat-Halten)</option>
            <option value="tev">Teileinkünfte 60 % zu pers. Steuersatz (BV)</option>
          </select>
        </div>
        <div>
          <Label className="text-xs">SV-Pflicht (kein beherrschender GF)</Label>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {[
              { v: false, l: "Nein (>50 %)" },
              { v: true, l: "Ja (<50 %)" },
            ].map((o) => (
              <button
                key={String(o.v)}
                onClick={() => setSozialversicherungspflichtig(o.v)}
                className={`h-9 rounded-md border text-xs transition-colors ${
                  sozialversicherungspflichtig === o.v
                    ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                    : "border-border hover:bg-secondary"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {mode === "tev" && (
          <div className="md:col-span-3">
            <Label className="text-xs">Persönlicher Grenzsteuersatz für TEV (%)</Label>
            <Input
              type="number"
              value={grenzsatz || ""}
              onChange={(e) => setGrenzsatz(Math.min(45, Math.max(0, Number(e.target.value) || 0)))}
              className="h-9 text-sm mt-1 max-w-xs"
            />
          </div>
        )}
      </div>

      {/* Best-Szenario */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mb-6">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-700 mb-1">Bestes Szenario</div>
            <h3 className="font-bold text-base">{best.label} → Gehalt {(best.gehalt / 1000).toFixed(0)}k €</h3>
            <div className="text-xs text-muted-foreground mt-1">
              Netto-Cashflow GF gesamt: <strong className="text-emerald-700">{best.total.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €</strong>
              {" "}(Gehalts-Netto {best.gehaltNetto.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € +
              Netto-Ausschüttung {best.nettoAusschuettung.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €)
            </div>
          </div>
        </div>
      </div>

      {/* Szenarien-Vergleich */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary text-[10px] uppercase tracking-wider">
              <tr>
                <th className="text-left p-2.5">Szenario</th>
                <th className="text-right p-2.5">Gehalt</th>
                <th className="text-right p-2.5">SV-Aufw.</th>
                <th className="text-right p-2.5">Gewinn n. Gehalt</th>
                <th className="text-right p-2.5">GmbH-Steuer</th>
                <th className="text-right p-2.5">Auss.-Steuer</th>
                <th className="text-right p-2.5">Gehalt-Netto</th>
                <th className="text-right p-2.5">Auss.-Netto</th>
                <th className="text-right p-2.5">Total Netto</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => {
                const isBest = s.label === best.label;
                return (
                  <tr key={s.label} className={`border-t border-border ${isBest ? "bg-emerald-500/5" : ""}`}>
                    <td className="p-2.5 font-semibold">
                      {s.label}
                      {isBest && <span className="ml-1 text-emerald-700">★</span>}
                    </td>
                    <td className="p-2.5 text-right font-mono">{s.gehalt.toLocaleString("de-DE")} €</td>
                    <td className="p-2.5 text-right font-mono text-muted-foreground">{s.sv.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono">{s.gewinnNachGehalt.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono text-red-700">−{s.gmbhSteuer.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono text-red-700">−{s.ausschuettungSteuer.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono text-emerald-700">{s.gehaltNetto.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono text-emerald-700">{s.nettoAusschuettung.toLocaleString("de-DE", { maximumFractionDigits: 0 })}</td>
                    <td className="p-2.5 text-right font-mono font-bold">{s.total.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-2">Wichtige Stellschrauben</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Beherrschender GF (≥50 %)</strong>: keine SV-Pflicht, kein Anspruch auf Krankengeld/ALG.
                Alternative: PKV + private RV.
              </li>
                <li>
                <strong>Mindest-Gehalt für Anerkennung GF-Vertrag</strong>: ca. 24-36k €/Jahr, sonst Risiko
                "verdeckte Gewinnausschüttung" durch Finanzamt — lieber zu hoch als zu niedrig.
              </li>
              <li>
                <strong>Tantieme-Regelung</strong>: zusätzlich zu Festgehalt, oft 25-50 % vom Jahres-Gewinn
                vor Steuern, deckelbar. Auch BA-Aufwand → mindert KSt + GewSt.
              </li>
              <li>
                <strong>Pensionszusage</strong>: Pensions-Rückstellung mindert KSt heute, Auszahlung später als
                Versorgungsbezug zu pers. Steuersatz. Sinnvoll bei dauerhaft hohem GF-Einkommen.
                Tool: <a href="/cockpit/pension-optimizer" className="text-accent-blue underline">Pension-Optimizer</a>.
              </li>
              <li>
                <strong>Holding über GmbH</strong>: bei Ausschüttung von Tochter an Holding sind 95 %
                steuerfrei (§8b KStG). Reinvestieren ohne Privat-Steuer = Compounding-Effekt.
                Tool: <a href="/cockpit/holding-designer" className="text-accent-blue underline">Holding-Designer</a> +
                <a href="/cockpit/auszahlung-optimizer" className="text-accent-blue underline"> Auszahlung-Optimizer</a>.
              </li>
              <li>
                <strong>TEV (Teileinkünfteverfahren)</strong>: nur Vorteil bei pers. Grenzsteuersatz unter
                ~32-35 %. Bei 42 % oder 45 % schlechter als Abgeltungssteuer.
              </li>
              <li>
                <strong>GewSt-Hebesatz prüfen</strong>: München 490 %, Frankfurt 460 %, Berlin 410 %, Köln 475 %.
                Bei freier Stadt-Wahl (Sitzverlegung): Hochstadt vs. Niedrigstadt 5-15k € Differenz pro 100k Gewinn.
              </li>
              <li>
                <strong>Vereinfachung</strong>: ESt 2026 §32a-Formel ohne Steuerklassen, Kinderfreibetrag oder
                Sonderausgaben. Reale Berechnung kann ±10-15 % abweichen.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "§32a EStG (Tarif)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "§3 Nr. 40 EStG (TEV)", url: "https://www.gesetze-im-internet.de/estg/__3.html" },
          { label: "§20 EStG (KapErtrag)", url: "https://www.gesetze-im-internet.de/estg/__20.html" },
          { label: "BBG 2026 (BMAS)", url: "https://www.bmas.de" },
        ]}
        note="ESt nutzt §32a 2026 Progressionsformel (echte Berechnung, keine Spitzensatz-Vereinfachung). SV-Beiträge auf BBG-Cap geklappt."
      />
    </CockpitShell>
  );
};

export default SalaryDividendOptimizer;
