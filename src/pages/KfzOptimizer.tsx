import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Callout, ChoiceGroup, Field, ResultPanel, ResultRow, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import { Car, AlertTriangle, BookOpen, Percent } from "lucide-react";

const KSt_GEWST = 0.30;

const KfzOptimizer = () => {
  // Auto-Daten
  const [bruttolistenpreis, setBruttolistenpreis] = useState(50000);
  const [kaufpreis, setKaufpreis] = useState(45000);
  const [entfernungArbeit, setEntfernungArbeit] = useState(15); // km einfach
  const [arbeitstageProJahr, setArbeitstageProJahr] = useState(220);
  const [estSatz, setEstSatz] = useState(0.42);
  const [autoTyp, setAutoTyp] = useState<"verbrenner" | "hybrid" | "elektro">("verbrenner");

  // Tatsächliche Nutzung (für Fahrtenbuch)
  const [kmGesamtProJahr, setKmGesamtProJahr] = useState(20000);
  const [kmPrivatProJahr, setKmPrivatProJahr] = useState(8000);

  // Tatsächliche Kfz-Kosten/Jahr
  const [kfzKostenGesamt, setKfzKostenGesamt] = useState(8000);

  // BLP für 1%-Regel anpassen je Antrieb (BEV: BLP × 0,25 wenn ≤ 100k, sonst × 0,5)
  const blpFuerRegel = useMemo(() => {
    if (autoTyp === "elektro") {
      // §6 Abs 1 Nr 4 EStG: bei BEV bis 100k BLP nur 0,25 % statt 1 %
      // (Grenze seit Anschaffung ab 01.07.2025 von 70k auf 100k angehoben, Investitionssofortprogramm)
      return bruttolistenpreis <= 100000 ? bruttolistenpreis * 0.25 : bruttolistenpreis * 0.5;
    }
    if (autoTyp === "hybrid") {
      // Hybrid: 0,5 % wenn rein-elektr. WLTP-Reichweite ≥ 80 km (Anschaffung ab 2025) ODER ≤ 50 g CO₂/km
      return bruttolistenpreis * 0.5;
    }
    return bruttolistenpreis;
  }, [bruttolistenpreis, autoTyp]);

  // 1%-Regel
  const ergebnis1 = useMemo(() => {
    // Privatnutzung: 1 % BLP/Monat = 12 % BLP/Jahr (bzw. 0,25/0,5 % bei E/Hybrid)
    const privatNutzung = (blpFuerRegel * 12) / 100;
    // Fahrten Wohnung-Arbeit: 0,03 % BLP × Entfernung × 12 Monate
    const arbeitsweg = (bruttolistenpreis * 0.0003 * entfernungArbeit * 12);
    const arbeitswegBlpAdj = autoTyp === "elektro" && bruttolistenpreis <= 100000
      ? arbeitsweg * 0.25
      : autoTyp === "elektro" || autoTyp === "hybrid"
      ? arbeitsweg * 0.5
      : arbeitsweg;
    const totalGeldwerterVorteil = privatNutzung + arbeitswegBlpAdj;
    // Steuer auf geldwerten Vorteil
    const steuerESt = totalGeldwerterVorteil * estSatz;
    // Werbungskostenpauschale Pendler-Pauschale (bei 1%-Regel zusätzlich abziehbar)
    // Entfernungspauschale §9 Abs. 1 S. 3 Nr. 4 EStG: ab 2026 einheitlich 0,38 €/km ab dem 1. km
    // (Steueränderungsgesetz 2025; vorher Staffel 0,30 € für km 1–20 / 0,38 € ab km 21)
    const pendlerPauschale = entfernungArbeit * 0.38 * arbeitstageProJahr;
    const ersparnisPendler = pendlerPauschale * estSatz;
    const nettoSteuerLast = steuerESt - ersparnisPendler;
    return {
      privatNutzung,
      arbeitsweg: arbeitswegBlpAdj,
      totalGeldwerterVorteil,
      steuerESt,
      pendlerPauschale,
      ersparnisPendler,
      nettoSteuerLast: Math.max(0, nettoSteuerLast),
    };
  }, [blpFuerRegel, bruttolistenpreis, entfernungArbeit, estSatz, autoTyp, arbeitstageProJahr]);

  // Fahrtenbuch
  const ergebnis2 = useMemo(() => {
    // E-Auto/Hybrid: nur AfA bzw. Leasing wird gekürzt (§6 Abs. 1 Nr. 4 Satz 3 Nr. 3 EStG), nicht die übrigen Kosten
    const adjustment = autoTyp === "elektro" && bruttolistenpreis <= 100000
      ? 0.25
      : autoTyp === "elektro" || autoTyp === "hybrid"
      ? 0.5
      : 1;
    // Vereinfacht: AfA 6 Jahre linear
    const afaProJahr = kaufpreis / 6;
    const totalKostenInklAfa = kfzKostenGesamt + afaProJahr * adjustment;
    // Fahrten Wohnung–Arbeit werden wie bei der 1 %-Regel mit erfasst (mit tatsächlichen km-Kosten)
    const arbeitswegKm = entfernungArbeit * 2 * arbeitstageProJahr;
    const privatAnteil = kmGesamtProJahr > 0 ? Math.min(1, (kmPrivatProJahr + arbeitswegKm) / kmGesamtProJahr) : 0;
    const privatKostenAnteil = totalKostenInklAfa * privatAnteil;
    const geldwerterVorteil = privatKostenAnteil;
    const steuerESt = geldwerterVorteil * estSatz;
    // Entfernungspauschale in beiden Methoden gleich abziehen
    const pendlerPauschale = entfernungArbeit * 0.38 * arbeitstageProJahr;
    const ersparnisPendler = pendlerPauschale * estSatz;
    const nettoSteuerLast = Math.max(0, steuerESt - ersparnisPendler);
    return {
      privatAnteil,
      afaProJahr,
      totalKostenInklAfa,
      privatKostenAnteil,
      geldwerterVorteil,
      steuerESt,
      ersparnisPendler,
      nettoSteuerLast,
    };
  }, [kmGesamtProJahr, kmPrivatProJahr, kaufpreis, kfzKostenGesamt, autoTyp, bruttolistenpreis, estSatz, entfernungArbeit, arbeitstageProJahr]);

  const gewinner = ergebnis1.nettoSteuerLast < ergebnis2.nettoSteuerLast ? "1prozent" : "fahrtenbuch";
  const ersparnisGewinner = Math.abs(ergebnis1.nettoSteuerLast - ergebnis2.nettoSteuerLast);

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;

  return (
    <CockpitShell
      eyebrow="Kfz-Optimizer"
      title="1 %-Regel oder Fahrtenbuch: was lohnt sich?"
      subtitle="Live-Vergleich der beiden Versteuerungs-Methoden mit deinen echten Daten. Inklusive E-Auto- und Hybrid-Bonus (0,25 % bzw. 0,5 % statt 1 %)."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Auto-Daten" icon={Car}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Antriebs-Typ" className="sm:col-span-2">
                  <ChoiceGroup<"verbrenner" | "hybrid" | "elektro">
                    label="Antriebs-Typ"
                    value={autoTyp}
                    onChange={setAutoTyp}
                    options={[
                      { value: "verbrenner", label: "Verbrenner / Diesel", hint: "1 %" },
                      { value: "hybrid", label: "Plug-in Hybrid", hint: "0,5 %" },
                      { value: "elektro", label: "E-Auto (BEV)", hint: "0,25 % bis 100k BLP" },
                    ]}
                  />
                </Field>
                <Field label="Bruttolistenpreis (€)" htmlFor="kfz-blp" hint="Wert laut Herstellerliste, NICHT der Rabatt-Kaufpreis (für die 1 %-Regel entscheidend).">
                  <Input
                    id="kfz-blp"
                    type="number"
                    value={bruttolistenpreis}
                    onChange={(e) => setBruttolistenpreis(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Tatsächlicher Kaufpreis (€)" htmlFor="kfz-kauf" hint="Für die AfA-Berechnung (Fahrtenbuch).">
                  <Input
                    id="kfz-kauf"
                    type="number"
                    value={kaufpreis}
                    onChange={(e) => setKaufpreis(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Entfernung Wohnung-Arbeit (km, einfach)" htmlFor="kfz-km">
                  <Input
                    id="kfz-km"
                    type="number"
                    value={entfernungArbeit}
                    onChange={(e) => setEntfernungArbeit(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Arbeitstage pro Jahr" htmlFor="kfz-tage">
                  <Input
                    id="kfz-tage"
                    type="number"
                    value={arbeitstageProJahr}
                    onChange={(e) => setArbeitstageProJahr(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Persönlicher Steuersatz" htmlFor="kfz-est" className="sm:col-span-2">
                  <select id="kfz-est" value={estSatz} onChange={(e) => setEstSatz(Number(e.target.value))} className={selectCls}>
                    <option value={0.14}>14 %</option>
                    <option value={0.24}>24 %</option>
                    <option value={0.32}>32 %</option>
                    <option value={0.42}>42 % (Spitzensatz)</option>
                    <option value={0.45}>45 % (Reichensteuer)</option>
                  </select>
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="Fahrtenbuch-Daten" description="Nur nötig, wenn du das Fahrtenbuch in Betracht ziehst." icon={BookOpen}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Gesamt-km pro Jahr" htmlFor="kfz-gesamt">
                  <Input
                    id="kfz-gesamt"
                    type="number"
                    value={kmGesamtProJahr}
                    onChange={(e) => setKmGesamtProJahr(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field
                  label="Davon privat (km pro Jahr, ohne Weg zur Arbeit)"
                  htmlFor="kfz-privat"
                  hint={`Privat-Anteil inkl. Arbeitsweg: ${(ergebnis2.privatAnteil * 100).toFixed(1)} %`}
                >
                  <Input
                    id="kfz-privat"
                    type="number"
                    value={kmPrivatProJahr}
                    onChange={(e) => setKmPrivatProJahr(Math.max(0, Math.min(kmGesamtProJahr, Number(e.target.value) || 0)))}
                    className="tabular"
                  />
                </Field>
                <Field
                  label="Tatsächliche Kfz-Kosten pro Jahr (€)"
                  htmlFor="kfz-kosten"
                  hint="Sprit, Versicherung, Wartung, Reparaturen."
                  className="sm:col-span-2"
                >
                  <Input
                    id="kfz-kosten"
                    type="number"
                    value={kfzKostenGesamt}
                    onChange={(e) => setKfzKostenGesamt(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Empfehlung für dich"
              title={gewinner === "1prozent" ? "1 %-Regel" : "Fahrtenbuch"}
              value={eur(ersparnisGewinner)}
              valueHint="pro Jahr gespart im Vergleich zur anderen Methode"
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Netto-Last 1 %-Regel", v: eur(ergebnis1.nettoSteuerLast) },
                  { l: "Netto-Last Fahrtenbuch", v: eur(ergebnis2.nettoSteuerLast) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            {gewinner === "fahrtenbuch" && (
              <Callout tone="warning" title="Nur mit lückenlosem Fahrtenbuch">
                Das Fahrtenbuch lohnt sich nur, wenn du es <strong>lückenlos täglich führst</strong> (Datum, Start, Ziel, Zweck, km).
                Sonst drohen Aberkennung, Rückfall auf die 1 %-Regel und Strafe.
              </Callout>
            )}

            {autoTyp !== "verbrenner" && (
              <Callout tone="success" title="E-/Hybrid-Bonus aktiv">
                {autoTyp === "elektro" && bruttolistenpreis <= 100000
                  ? "BEV bis 100k BLP: nur 0,25 % statt 1 % (Riesen-Vorteil!)"
                  : autoTyp === "elektro"
                  ? "BEV über 100k: 0,5 % statt 1 %"
                  : "Hybrid: 0,5 % statt 1 % (wenn ≥ 80 km elektr. WLTP-Reichweite bei Anschaffung ab 2025 oder ≤ 50 g CO₂/km)"}
              </Callout>
            )}
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ToolSection
          title="1 %-Regel"
          icon={Percent}
          className={gewinner === "1prozent" ? "border-success/40" : undefined}
          actions={gewinner === "1prozent" ? <ToneBadge tone="success">Beste Wahl</ToneBadge> : undefined}
        >
          <div className="divide-y divide-border/70">
            <ResultRow label="Relevanter Bruttolistenpreis" value={eur(blpFuerRegel)} />
            <ResultRow label="Privatnutzung 12 % pro Jahr" value={eur(ergebnis1.privatNutzung)} />
            <ResultRow label={`Arbeitsweg 0,03 % × ${entfernungArbeit} km × 12`} value={eur(ergebnis1.arbeitsweg)} />
            <ResultRow label="Geldwerter Vorteil gesamt" value={eur(ergebnis1.totalGeldwerterVorteil)} strong />
            <ResultRow label={`ESt darauf (${(estSatz * 100).toFixed(0)} %)`} value={eur(ergebnis1.steuerESt)} />
            <ResultRow label="Ersparnis Pendlerpauschale" value={`−${eur(ergebnis1.ersparnisPendler)}`} tone="success" />
            <ResultRow label="Netto-Last" value={eur(ergebnis1.nettoSteuerLast)} strong />
          </div>
        </ToolSection>

        <ToolSection
          title="Fahrtenbuch"
          icon={BookOpen}
          className={gewinner === "fahrtenbuch" ? "border-success/40" : undefined}
          actions={gewinner === "fahrtenbuch" ? <ToneBadge tone="success">Beste Wahl</ToneBadge> : undefined}
        >
          <div className="divide-y divide-border/70">
            <ResultRow label={autoTyp === "verbrenner" ? "AfA (6 Jahre)" : "AfA (6 Jahre, E/Hybrid-gekürzt)"} value={eur(ergebnis2.totalKostenInklAfa - kfzKostenGesamt)} />
            <ResultRow label="+ Kfz-Kosten" value={`${kfzKostenGesamt.toLocaleString("de-DE")} €`} />
            <ResultRow label="Gesamt inkl. AfA" value={eur(ergebnis2.totalKostenInklAfa)} strong />
            <ResultRow label={`Privat-Anteil inkl. Arbeitsweg (${(ergebnis2.privatAnteil * 100).toFixed(1)} %)`} value={eur(ergebnis2.privatKostenAnteil)} />
            <ResultRow label="ESt auf Privatanteil" value={eur(ergebnis2.steuerESt)} />
            <ResultRow label="– Pendlerpauschale-Ersparnis" value={`−${eur(ergebnis2.ersparnisPendler)}`} />
            <ResultRow label="Netto-Last" value={eur(ergebnis2.nettoSteuerLast)} strong />
          </div>
        </ToolSection>
      </div>

      <Callout tone="warning" title="Wichtig" icon={AlertTriangle} className="mb-6">
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <strong>Die Wahl ist 1 Jahr bindend</strong>, wechseln kannst du erst zum 01.01. des nächsten Jahres.
          </li>
          <li>
            <strong>Pflichtangaben im Fahrtenbuch</strong>: Datum, Kilometerstand bei Start und Ziel, gefahrene km, Zweck der Fahrt,
            ggf. Reiseroute und Auftraggeber. Bei Lücken oder Schätzungen erkennt das Finanzamt das Fahrtenbuch komplett ab.
          </li>
          <li>
            <strong>Unter 50 % betrieblicher Nutzung</strong> ist die 1 %-Regel nicht möglich (das Auto gilt als Privatvermögen). Dann
            sind nur 0,30 €/km Pauschale für betriebliche Fahrten absetzbar.
          </li>
          <li>
            <strong>BEV bis 100k BLP</strong>: Die 0,25 %-Regelung gilt für Anschaffungen 2019 bis 2030; die BLP-Grenze wurde für
            Anschaffungen ab 01.07.2025 von 70.000 € auf 100.000 € angehoben. Plug-in-Hybride brauchen ≥ 80 km elektrische
            WLTP-Reichweite (Anschaffung ab 2025; 60 km galt 2022 bis 2024) oder ≤ 50 g CO₂/km.
          </li>
          <li>App-Empfehlung: Vimcar, FahrtenbuchPro, automatisch per OBD2 und GPS.</li>
        </ul>
      </Callout>

      <Stand2026Footer
        sources={[
          { label: "§6 (1) Nr. 4 EStG (1%-Regel)", url: "https://www.gesetze-im-internet.de/estg/__6.html" },
          { label: "§4 (5) Nr. 6 EStG (Fahrtenbuch)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§9 EStG (Pendlerpauschale)", url: "https://www.gesetze-im-internet.de/estg/__9.html" },
          { label: "BMF-Schreiben Kfz", url: "https://www.bundesfinanzministerium.de" },
        ]}
        note="E-Auto-Bonus 0,25 % bei BLP ≤ 100.000 € (Anschaffung ab 01.07.2025; davor ≤ 70.000 €). Hybrid-Bonus 0,5 % nur bei elektr. WLTP-Reichweite ≥ 80 km (Anschaffung ab 2025; 60 km 2022–2024) oder ≤ 50 g CO₂/km. Entfernungspauschale 2026: einheitlich 0,38 €/km ab dem 1. km."
      />
    </CockpitShell>
  );
};

export default KfzOptimizer;
