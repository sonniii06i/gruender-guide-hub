import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { cn } from "@/lib/utils";
import {
  Callout,
  ChoiceGroup,
  EmptyState,
  Field,
  KitTable,
  ResultPanel,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";
import { Calculator, ArrowRight, Scale, ChevronDown, Plus, Minus } from "lucide-react";
import {
  kstGewstRate,
  holdingRate,
  ABG_ST,
  TEV_QUOTE as HALBEINKUENFTE,
  progressionESt,
  SOLZ_RATE,
} from "@/lib/germanTax";

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

  // 1) GF-Gehalt — Anteil. Wichtig: ESt über Progression (nicht pauschal Spitzensatz).
  const gfGehalt = opGewinn * gehaltsAnteil;
  const restNachGehalt = opGewinn - gfGehalt;
  const sozialMax = 0; // Gesellschafter-GF > 50 % = sv-frei
  // Echte progressive ESt auf das Gehalt + SolZ. Annahme: keine sonstigen Einkünfte beim GF.
  const estAufGehalt = progressionESt(gfGehalt);
  const steuerGfGehalt_Privat = estAufGehalt * (1 + SOLZ_RATE);
  const steuerGfGehalt_GmbH = restNachGehalt * KSt_PLUS_GEWST;
  const restNachGehaltKSt = restNachGehalt - steuerGfGehalt_GmbH;
  const steuerGfGehalt_Div = restNachGehaltKSt * ABG_ST;
  const totalGfGehalt = steuerGfGehalt_GmbH + steuerGfGehalt_Privat + steuerGfGehalt_Div + sozialMax;

  // 2) Standard-Dividende (Op-GmbH → Privat) ohne Holding
  const steuerDiv_GmbH = opGewinn * KSt_PLUS_GEWST;
  const restNachKSt = opGewinn - steuerDiv_GmbH;
  const steuerDiv_Privat = restNachKSt * ABG_ST;
  const totalDiv = steuerDiv_GmbH + steuerDiv_Privat;

  // 3) Teileinkünfteverfahren (für > 25 % Beteiligung oder berufliche Tätigkeit ≥ 1 % freiwillig)
  // 60 % der Dividende im persönlichen ESt-Satz besteuert, 40 % steuerfrei. SolZ on top.
  const steuerTEV_Privat = restNachKSt * HALBEINKUENFTE * eS * (1 + SOLZ_RATE);
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
        "Erdienenszeit min. 10 Jahre + 3 Jahre Probezeit für beherrschende GGF (BFH-Rspr.) — Pension nur sinnvoll wenn Alter < 57",
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

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
  const pctTxt = (n: number) => `${n.toFixed(1).replace(".", ",")} %`;
  const fett = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return (
    <CockpitShell
      eyebrow="Steuern & Optimierung · Auszahlung"
      title="Wie ziehst du Gewinn am steuereffizientesten raus?"
      subtitle="Sieben Wege, Gewinn aus deiner GmbH zu holen, mit konkreter Steuerberechnung: GF-Gehalt, Standard-Dividende, Teileinkünfteverfahren, Holding, Mix, Pensionszusage und Tantieme."
    >
      <Callout tone="accent" title="Übersichts-Modus" className="mb-6">
        Sieben Wege im Vergleich, mit wählbarem Spitzensteuersatz. Für die präzise Aufteilung zwischen Gehalt und Dividende
        mit echter Progression, Sozialversicherung und Kirchensteuer:{" "}
        <Link to="/cockpit/salary-dividende" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
          Gehalt-oder-Dividende-Optimizer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </Callout>

      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection title="Deine Situation" icon={Calculator}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Gewinn der operativen GmbH (€ pro Jahr)" htmlFor="ao-gewinn" className="sm:col-span-2">
                <Input
                  id="ao-gewinn"
                  type="number"
                  value={opGewinn}
                  onChange={(e) => setOpGewinn(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <Field label="Persönlicher Spitzensteuersatz" htmlFor="ao-est">
                <select id="ao-est" value={eStSatz} onChange={(e) => setEStSatz(Number(e.target.value))} className={selectCls}>
                  <option value={0.14}>14 % (geringes Einkommen)</option>
                  <option value={0.24}>24 % (mittel)</option>
                  <option value={0.32}>32 % (gut verdienend)</option>
                  <option value={0.42}>42 % (Spitzensatz ab ~62k)</option>
                  <option value={0.45}>45 % (Reichensteuer ab ~278k)</option>
                </select>
              </Field>
              <div className="space-y-1.5">
                <p className="text-sm font-medium">Holding vorhanden?</p>
                <ChoiceGroup<boolean>
                  label="Holding vorhanden"
                  className="grid grid-cols-2"
                  value={hatHolding}
                  onChange={setHatHolding}
                  options={[
                    { value: true, label: "Ja" },
                    { value: false, label: "Nein" },
                  ]}
                />
              </div>
              <Field label="Gewerbesteuer-Hebesatz (%)">
                <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
              </Field>
              <Field
                label="GF-Gehalt in Variante 1 (% vom Gewinn)"
                htmlFor="ao-gehalt"
                hint="Marktüblich 30 bis 50 %. 100 % wäre unangemessen (Risiko verdeckter Gewinnausschüttung)."
              >
                <Input
                  id="ao-gehalt"
                  type="number"
                  value={gehaltsAnteil}
                  onChange={(e) => setGehaltsAnteil(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="tabular"
                />
              </Field>
            </div>
          </ToolSection>
        }
        result={
          best ? (
            <ResultPanel
              variant="ink"
              kicker="Steuerlich beste Variante für dich"
              title={best.name}
              value={pctTxt(best.effektivPct)}
              valueHint="effektive Gesamtsteuer auf den Gewinn"
            >
              <p className="mb-4 text-sm leading-relaxed text-primary-foreground/75">{best.description}</p>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Steuern gesamt", v: eur(best.totalSteuer) },
                  { l: "Privat netto", v: eur(best.privatNetto) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>
          ) : (
            <EmptyState
              icon={Calculator}
              title="Noch kein Gewinn eingetragen"
              description="Trage den Jahresgewinn deiner GmbH ein, dann vergleichen wir alle Auszahlungswege."
            />
          )
        }
      />

      {sorted.length > 0 && (
        <>
          <ToolSection
            title={`Alle ${sorted.length} Auszahlungswege im Vergleich`}
            description={hatHolding ? undefined : "Ohne Holding sind die Holding- und Mix-Varianten ausgeblendet."}
            icon={Scale}
            className="mb-6"
            bodyClassName="p-0 md:p-0"
          >
            <KitTable caption="Vergleich der Auszahlungswege" className="rounded-none border-0 [contain:paint] [&_th]:whitespace-nowrap">
              <thead>
                <tr>
                  <th>Weg</th>
                  <th className="!text-right">GmbH-Steuer</th>
                  <th className="!text-right">Privat-Steuer</th>
                  <th className="!text-right">Privat netto</th>
                  <th className="!text-right">Effektiv</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r, i) => (
                  <tr key={r.name} className={i === 0 ? "bg-success-soft/50" : undefined}>
                    <td className="min-w-[13rem]">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">
                          {i + 1}
                        </span>
                        <span className="font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-right">{eur(r.steuerGmbh)}</td>
                    <td className="whitespace-nowrap text-right">{eur(r.steuerPrivat)}</td>
                    <td className="whitespace-nowrap text-right">{eur(r.privatNetto)}</td>
                    <td
                      className={cn(
                        "whitespace-nowrap text-right font-semibold",
                        i === 0 ? "text-success" : i === sorted.length - 1 && sorted.length > 1 ? "text-danger" : "",
                      )}
                    >
                      {pctTxt(r.effektivPct)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </KitTable>
          </ToolSection>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sorted.map((r, i) => {
              const beste = i === 0;
              const schlechteste = i === sorted.length - 1 && sorted.length > 1;
              return (
                <article
                  key={r.name}
                  className={cn(
                    "rounded-2xl border bg-card p-5 shadow-card",
                    beste ? "border-success/30" : schlechteste ? "border-danger/25" : "border-border",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <ToneBadge tone="neutral" className="tabular">Platz {i + 1}</ToneBadge>
                        {beste && <ToneBadge tone="success">Beste</ToneBadge>}
                        {schlechteste && <ToneBadge tone="danger">Schlechteste</ToneBadge>}
                      </div>
                      <h3 className="mt-2 text-base font-semibold leading-snug">{r.name}</h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-muted-foreground">Effektivsatz</p>
                      <p className="text-xl font-semibold tabular">{pctTxt(r.effektivPct)}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  <details className="group mt-3 text-sm [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center gap-1 border-t border-border/70 pt-3 font-medium text-muted-foreground hover:text-foreground">
                      Vor- und Nachteile
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1.5 font-medium text-success">Vorteile</p>
                        <ul className="space-y-1.5 text-muted-foreground">
                          {r.pros.map((p, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <Plus className="mt-1 h-3 w-3 shrink-0 text-success" aria-hidden="true" />
                              <span dangerouslySetInnerHTML={{ __html: fett(p) }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1.5 font-medium text-danger">Nachteile</p>
                        <ul className="space-y-1.5 text-muted-foreground">
                          {r.cons.map((c, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <Minus className="mt-1 h-3 w-3 shrink-0 text-danger" aria-hidden="true" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        </>
      )}

      <Callout tone="warning" title="Vereinfachte Modellrechnung" className="mb-6">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Annahmen: Gesellschafter-Geschäftsführer mit mindestens 50 % Anteilen (sozialversicherungsfrei). KSt und GewSt
            nach deinem Hebesatz, Solidaritätszuschlag enthalten.
          </li>
          <li>Pensionszusage stark vereinfacht, in der Praxis versicherungsmathematisch komplex.</li>
          <li>AStG, vGA-Risiken und Angemessenheitsprüfungen sind nicht modelliert und können das Ergebnis deutlich ändern.</li>
          <li>In der Praxis ist ein Mix aus zwei bis drei Wegen üblich, z. B. Mindestgehalt, Tantieme und Rest in die Holding.</li>
          <li>Die konkrete Strategie immer mit der Steuerberatung durchrechnen.</li>
        </ul>
      </Callout>

      <Stand2026Footer
        sources={[
          { label: "§32a EStG (Tarif)", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
          { label: "§8b KStG (Schachtelprivileg)", url: "https://www.gesetze-im-internet.de/kstg_1977/__8b.html" },
          { label: "§3 Nr. 40 EStG (TEV)", url: "https://www.gesetze-im-internet.de/estg/__3.html" },
          { label: "§20 EStG (KapErtrag)", url: "https://www.gesetze-im-internet.de/estg/__20.html" },
          { label: "BMF-Schreiben", url: "https://www.bundesfinanzministerium.de" },
        ]}
        note="Berechnungen sind vereinfacht (keine echte ESt-Progression — nutze Spitzensatz-Auswahl). Pension-Variante stark abstrahiert; bei Pensionszusage Versicherungsmathematiker Pflicht."
      />
    </CockpitShell>
  );
};

export default AuszahlungOptimizer;
