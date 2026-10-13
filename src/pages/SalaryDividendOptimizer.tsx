import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { AlertTriangle, ArrowRight, Info, SlidersHorizontal } from "lucide-react";
import { Callout, ChoiceGroup, Field, KitTable, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
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
    // SolZ-Freigrenze respektieren (ESt < 20.350 € Single → kein SolZ; 2026)
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

  const n0 = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 0 });

  return (
    <CockpitShell
      eyebrow="Salary-vs-Dividende-Optimizer"
      title="GF-Gehalt vs. Gewinnausschüttung, live durchgerechnet"
      subtitle="KSt 15 % + GewSt + SolZ vs. ESt §32a 2026 + SV-Beiträge. Berücksichtigt Teileinkünfte vs. Abgeltungssteuer + KiSt 8/9 %. 5 Gehalts-Szenarien gegenübergestellt."
    >
      <Callout tone="neutral" icon={Info} className="mb-6">
        <strong className="text-foreground">Detail-Modus.</strong> Echte ESt-Progression, SV und 5 Gehalts-Szenarien. Für den{" "}
        <strong className="text-foreground">erweiterten 7-Wege-Vergleich</strong> inklusive Holding, Pension und Tantieme:{" "}
        <Link to="/cockpit/auszahlung-optimizer" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
          Gewinn-Auszahlungs-Optimizer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </Callout>

      <ToolLayout
        inputs={
          <ToolSection icon={SlidersHorizontal} title="Deine Ausgangslage">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="GmbH-Gewinn vor GF-Gehalt (€/Jahr)" htmlFor="sd-gewinn">
                <Input
                  id="sd-gewinn"
                  type="number"
                  inputMode="decimal"
                  value={gewinnVorGehalt || ""}
                  onChange={(e) => setGewinnVorGehalt(Math.max(0, Number(e.target.value) || 0))}
                />
              </Field>
              <Field label="Eigenes GF-Gehalt (€/Jahr brutto)" htmlFor="sd-gehalt" hint="Wird als Szenario „Custom“ mitgerechnet.">
                <Input
                  id="sd-gehalt"
                  type="number"
                  inputMode="decimal"
                  value={gehaltJahresbrutto || ""}
                  onChange={(e) => setGehaltJahresbrutto(Math.max(0, Number(e.target.value) || 0))}
                />
              </Field>
              <Field label="GewSt-Hebesatz">
                <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
              </Field>
              <Field label="Kirchensteuer" htmlFor="sd-kist">
                <select id="sd-kist" value={kistSatz} onChange={(e) => setKistSatz(Number(e.target.value))} className={selectCls}>
                  <option value={0}>0 % (keine KiSt-Pflicht)</option>
                  <option value={8}>8 % (BY/BW)</option>
                  <option value={9}>9 % (übrige Länder)</option>
                </select>
              </Field>
              <Field label="Ausschüttungs-Modus" htmlFor="sd-mode" className="sm:col-span-2">
                <select id="sd-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)} className={selectCls}>
                  <option value="abgeltung">Abgeltungssteuer 25 % (Privat-Halten)</option>
                  <option value="tev">Teileinkünfte 60 % zu pers. Steuersatz (BV)</option>
                </select>
              </Field>
              <Field label="SV-Pflicht (kein beherrschender GF)" className="sm:col-span-2">
                <ChoiceGroup<boolean>
                  label="SV-Pflicht"
                  value={sozialversicherungspflichtig}
                  onChange={setSozialversicherungspflichtig}
                  options={[
                    { value: false, label: "Nein, Anteil über 50 %" },
                    { value: true, label: "Ja, Anteil unter 50 %" },
                  ]}
                />
              </Field>
              {mode === "tev" && (
                <Field label="Persönlicher Grenzsteuersatz für TEV (%)" htmlFor="sd-grenz" className="sm:col-span-2">
                  <Input
                    id="sd-grenz"
                    type="number"
                    inputMode="decimal"
                    value={grenzsatz || ""}
                    onChange={(e) => setGrenzsatz(Math.min(45, Math.max(0, Number(e.target.value) || 0)))}
                    className="max-w-xs"
                  />
                </Field>
              )}
            </div>
          </ToolSection>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker="Bestes Szenario"
            title={`${best.label}: Gehalt ${(best.gehalt / 1000).toFixed(0)}k €`}
            value={`${n0(best.total)} €`}
            valueHint="Netto-Cashflow GF gesamt pro Jahr"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.07] p-3.5">
                <p className="text-sm text-primary-foreground/70">Gehalts-Netto</p>
                <p className="mt-1 text-lg font-semibold tabular text-primary-foreground">{n0(best.gehaltNetto)} €</p>
              </div>
              <div className="rounded-xl bg-white/[0.07] p-3.5">
                <p className="text-sm text-primary-foreground/70">Netto-Ausschüttung</p>
                <p className="mt-1 text-lg font-semibold tabular text-primary-foreground">{n0(best.nettoAusschuettung)} €</p>
              </div>
            </div>
          </ResultPanel>
        }
      />

      {/* Szenarien-Vergleich */}
      <h2 className="mb-3 mt-10 text-lg font-semibold tracking-tight">Alle Szenarien im Vergleich</h2>
      <KitTable caption="Gehalts-Szenarien im Vergleich" className="mb-8">
        <thead>
          <tr>
            <th>Szenario</th>
            <th className="!text-right">Gehalt</th>
            <th className="!text-right">SV-Aufw.</th>
            <th className="!text-right">Gewinn n. Gehalt</th>
            <th className="!text-right">GmbH-Steuer</th>
            <th className="!text-right">Auss.-Steuer</th>
            <th className="!text-right">Gehalt-Netto</th>
            <th className="!text-right">Auss.-Netto</th>
            <th className="!text-right">Total Netto</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => {
            const isBest = s.label === best.label;
            return (
              <tr key={s.label} className={isBest ? "bg-success-soft" : ""}>
                <td className="whitespace-nowrap font-medium">
                  {s.label}
                  {isBest && <ToneBadge tone="success" className="ml-2">bestes</ToneBadge>}
                </td>
                <td className="whitespace-nowrap text-right">{s.gehalt.toLocaleString("de-DE")} €</td>
                <td className="whitespace-nowrap text-right text-muted-foreground">{n0(s.sv)}</td>
                <td className="whitespace-nowrap text-right">{n0(s.gewinnNachGehalt)}</td>
                <td className="whitespace-nowrap text-right text-danger">−{n0(s.gmbhSteuer)}</td>
                <td className="whitespace-nowrap text-right text-danger">−{n0(s.ausschuettungSteuer)}</td>
                <td className="whitespace-nowrap text-right text-success">{n0(s.gehaltNetto)}</td>
                <td className="whitespace-nowrap text-right text-success">{n0(s.nettoAusschuettung)}</td>
                <td className="whitespace-nowrap text-right font-semibold">{n0(s.total)} €</td>
              </tr>
            );
          })}
        </tbody>
      </KitTable>

      {/* Hinweise */}
      <ToolSection icon={AlertTriangle} title="Wichtige Stellschrauben">
        <ul className="grid gap-x-8 gap-y-4 text-sm leading-relaxed text-foreground/85 md:grid-cols-2">
          <li>
            <strong className="text-foreground">Beherrschender GF (ab 50 %):</strong> keine SV-Pflicht, kein Anspruch auf Krankengeld/ALG.
            Alternative: PKV + private RV.
          </li>
          <li>
            <strong className="text-foreground">Mindest-Gehalt für Anerkennung des GF-Vertrags:</strong> ca. 24-36k €/Jahr, sonst Risiko
            „verdeckte Gewinnausschüttung“ durch das Finanzamt. Lieber zu hoch als zu niedrig.
          </li>
          <li>
            <strong className="text-foreground">Tantieme-Regelung:</strong> zusätzlich zum Festgehalt, oft 25-50 % vom Jahresgewinn vor
            Steuern, deckelbar. Auch BA-Aufwand, mindert KSt + GewSt.
          </li>
          <li>
            <strong className="text-foreground">Pensionszusage:</strong> Pensions-Rückstellung mindert KSt heute, Auszahlung später als
            Versorgungsbezug zum pers. Steuersatz. Sinnvoll bei dauerhaft hohem GF-Einkommen. Tool:{" "}
            <Link to="/cockpit/pension-optimizer" className="font-medium text-accent-blue underline underline-offset-2">Pension-Optimizer</Link>.
          </li>
          <li>
            <strong className="text-foreground">Holding über GmbH:</strong> Bei Ausschüttung von der Tochter an die Holding sind 95 %
            steuerfrei (§8b KStG). Reinvestieren ohne Privat-Steuer = Compounding-Effekt. Tools:{" "}
            <Link to="/cockpit/holding-designer" className="font-medium text-accent-blue underline underline-offset-2">Holding-Designer</Link> und{" "}
            <Link to="/cockpit/auszahlung-optimizer" className="font-medium text-accent-blue underline underline-offset-2">Auszahlung-Optimizer</Link>.
          </li>
          <li>
            <strong className="text-foreground">TEV (Teileinkünfteverfahren):</strong> günstiger als die Abgeltungsteuer bis zu einem
            persönlichen Grenzsteuersatz von rund 41,7 % (25 % ÷ 60 %), erst recht mit Werbungskosten wie Finanzierungszinsen
            (60 % abziehbar). Bei 42 % oder 45 % ohne Werbungskosten ist die Abgeltungsteuer günstiger.
          </li>
          <li>
            <strong className="text-foreground">GewSt-Hebesatz prüfen:</strong> München 490 %, Frankfurt 460 %, Berlin 410 %, Köln 475 %.
            Bei freier Stadt-Wahl (Sitzverlegung): Hochstadt vs. Niedrigstadt 5-15k € Differenz pro 100k Gewinn.
          </li>
          <li>
            <strong className="text-foreground">Vereinfachung:</strong> ESt 2026 §32a-Formel ohne Steuerklassen, Kinderfreibetrag oder
            Sonderausgaben. Reale Berechnung kann ±10-15 % abweichen.
          </li>
        </ul>
      </ToolSection>

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
