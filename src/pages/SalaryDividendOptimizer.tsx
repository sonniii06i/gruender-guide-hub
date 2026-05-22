import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Label } from "@/components/ui/label";
import { TrendingUp, AlertTriangle, Info } from "lucide-react";
import {
  progressionESt as calcEst2026,
  calcSv,
  calcGmbhSteuer,
  calcAbgeltungSteuer as calcAusschuettungSteuer,
  calcTevSteuer,
  solZ,
} from "@/lib/germanTax";

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
    // SolZ-Freigrenze respektieren (ESt < 19.950 € Single → kein SolZ)
    const solz = solZ(est);
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
      {/* Cross-Link zu Auszahlung-Optimizer */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-3 mb-5 text-xs flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-accent-blue shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="text-foreground">Detail-Modus.</strong>{" "}
          Echte ESt-Progression + SV + 5 Gehalts-Szenarien. Für{" "}
          <strong className="text-foreground">erweiterten 7-Wege-Vergleich</strong>{" "}
          inkl. Holding · Pension · Tantieme:{" "}
          <Link to="/cockpit/auszahlung-optimizer" className="text-accent-blue hover:underline">
            Gewinn-Auszahlungs-Optimizer →
          </Link>
        </div>
      </div>

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
          <Label className="text-xs">GewSt-Hebesatz</Label>
          <HebesatzPicker value={hebesatz} onChange={setHebesatz} className="mt-1" />
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
