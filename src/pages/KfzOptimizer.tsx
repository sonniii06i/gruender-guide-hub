import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Car, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

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
      // Hybrid: 0,5 % wenn elektrisch ≥ 60 km Reichweite ODER ≥ 50 km bei Anschaffung 2025+
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
    // Pendlerpauschale §9 Abs. 1 Nr. 4 EStG: ersten 20 km × 0,30 €/km, ab 21. km × 0,38 €/km (ab 2024 dauerhaft)
    const pendlerPauschale = (Math.min(20, entfernungArbeit) * 0.30 + Math.max(0, entfernungArbeit - 20) * 0.38) * arbeitstageProJahr;
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
    const privatAnteil = kmGesamtProJahr > 0 ? kmPrivatProJahr / kmGesamtProJahr : 0;
    // Geldwerter Vorteil = privater Anteil der gesamt Kfz-Kosten (inkl. AfA)
    // Vereinfacht: AfA 6 Jahre linear
    const afaProJahr = kaufpreis / 6;
    const totalKostenInklAfa = kfzKostenGesamt + afaProJahr;
    const privatKostenAnteil = totalKostenInklAfa * privatAnteil;
    // Bei E-Auto: 25 % der Privat-Kosten als geldwerter Vorteil; Hybrid: 50 %
    const adjustment = autoTyp === "elektro" && bruttolistenpreis <= 100000
      ? 0.25
      : autoTyp === "elektro" || autoTyp === "hybrid"
      ? 0.5
      : 1;
    const geldwerterVorteil = privatKostenAnteil * adjustment;
    const steuerESt = geldwerterVorteil * estSatz;
    return {
      privatAnteil,
      afaProJahr,
      totalKostenInklAfa,
      privatKostenAnteil,
      geldwerterVorteil,
      steuerESt,
    };
  }, [kmGesamtProJahr, kmPrivatProJahr, kaufpreis, kfzKostenGesamt, autoTyp, bruttolistenpreis, estSatz]);

  const gewinner = ergebnis1.nettoSteuerLast < ergebnis2.steuerESt ? "1prozent" : "fahrtenbuch";
  const ersparnisGewinner = Math.abs(ergebnis1.nettoSteuerLast - ergebnis2.steuerESt);

  return (
    <CockpitShell
      eyebrow="Kfz-Optimizer"
      title="1 %-Regel vs. Fahrtenbuch — was lohnt sich?"
      subtitle="Live-Vergleich der beiden Versteuerungs-Methoden mit deinen echten Daten. Inklusive E-Auto- + Hybrid-Bonus (0,25 % bzw. 0,5 % statt 1 %)."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Car className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Auto-Daten</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Antriebs-Typ</Label>
            <select
              value={autoTyp}
              onChange={(e) => setAutoTyp(e.target.value as typeof autoTyp)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="verbrenner">Verbrenner / Diesel</option>
              <option value="hybrid">Plug-in Hybrid</option>
              <option value="elektro">E-Auto (BEV)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bruttolistenpreis (€)</Label>
            <Input
              type="number"
              value={bruttolistenpreis}
              onChange={(e) => setBruttolistenpreis(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Wert ab Hersteller-Liste, NICHT der Rabatt-Kaufpreis (für 1%-Regel kritisch)
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tatsächlicher Kaufpreis (€)</Label>
            <Input
              type="number"
              value={kaufpreis}
              onChange={(e) => setKaufpreis(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">Für AfA-Berechnung (Fahrtenbuch)</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Entfernung Wohnung-Arbeit (km, einfach)
            </Label>
            <Input
              type="number"
              value={entfernungArbeit}
              onChange={(e) => setEntfernungArbeit(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Arbeitstage/Jahr</Label>
            <Input
              type="number"
              value={arbeitstageProJahr}
              onChange={(e) => setArbeitstageProJahr(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">ESt-Satz</Label>
            <select
              value={estSatz}
              onChange={(e) => setEstSatz(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.14}>14 %</option>
              <option value={0.24}>24 %</option>
              <option value={0.32}>32 %</option>
              <option value={0.42}>42 % (Spitzensatz)</option>
              <option value={0.45}>45 % (Reichensteuer)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inputs für Fahrtenbuch */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Fahrtenbuch-Daten (nur falls relevant)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Gesamt-km/Jahr</Label>
            <Input
              type="number"
              value={kmGesamtProJahr}
              onChange={(e) => setKmGesamtProJahr(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Davon privat (km/Jahr)</Label>
            <Input
              type="number"
              value={kmPrivatProJahr}
              onChange={(e) => setKmPrivatProJahr(Math.max(0, Math.min(kmGesamtProJahr, Number(e.target.value) || 0)))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Privat-Anteil: {((kmPrivatProJahr / Math.max(1, kmGesamtProJahr)) * 100).toFixed(1)} %
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tatsächliche Kfz-Kosten/Jahr (€)
            </Label>
            <Input
              type="number"
              value={kfzKostenGesamt}
              onChange={(e) => setKfzKostenGesamt(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">Sprit, Versicherung, Wartung, Reparaturen</div>
          </div>
        </div>
      </div>

      {/* Ergebnisse */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-card via-card to-emerald-500/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="h-5 w-5 text-emerald-700" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Empfehlung für dich
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1">
          {gewinner === "1prozent" ? "1 %-Regel" : "Fahrtenbuch"}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Du sparst {Math.round(ersparnisGewinner).toLocaleString("de-DE")} €/Jahr im Vergleich zur anderen Methode.
        </p>
        {gewinner === "fahrtenbuch" && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs">
            <AlertTriangle className="h-3 w-3 inline mr-1 text-amber-700" /> Fahrtenbuch lohnt sich nur wenn du es{" "}
            <strong>lückenlos täglich führst</strong> (Datum, Start, Ziel, Zweck, km). Sonst Aberkennung +
            Rückfall auf 1 %-Regel + Strafe.
          </div>
        )}
      </div>

      {/* Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/* 1%-Regel */}
        <div className={`rounded-2xl border p-5 ${gewinner === "1prozent" ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold">1 %-Regel</h4>
            {gewinner === "1prozent" && (
              <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                ✓ Beste
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">BLP-relevant:</span>
              <span className="font-mono">{Math.round(blpFuerRegel).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Privatnutzung 12 %/Jahr:</span>
              <span className="font-mono">{Math.round(ergebnis1.privatNutzung).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Arbeitsweg 0,03 % × {entfernungArbeit} km × 12:</span>
              <span className="font-mono">{Math.round(ergebnis1.arbeitsweg).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span className="font-semibold">Geldwerter Vorteil gesamt:</span>
              <span className="font-mono font-semibold">
                {Math.round(ergebnis1.totalGeldwerterVorteil).toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ESt darauf ({(estSatz * 100).toFixed(0)} %):</span>
              <span className="font-mono">{Math.round(ergebnis1.steuerESt).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>− Pendlerpauschale-Ersparnis:</span>
              <span className="font-mono">-{Math.round(ergebnis1.ersparnisPendler).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between border-t border-foreground/30 pt-2 text-lg font-bold">
              <span>Netto-Last:</span>
              <span className="font-mono">{Math.round(ergebnis1.nettoSteuerLast).toLocaleString("de-DE")} €</span>
            </div>
          </div>
        </div>

        {/* Fahrtenbuch */}
        <div className={`rounded-2xl border p-5 ${gewinner === "fahrtenbuch" ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card"}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold">Fahrtenbuch</h4>
            {gewinner === "fahrtenbuch" && (
              <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                ✓ Beste
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">AfA (6 Jahre):</span>
              <span className="font-mono">{Math.round(ergebnis2.afaProJahr).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">+ Kfz-Kosten:</span>
              <span className="font-mono">{kfzKostenGesamt.toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span className="font-semibold">Total inkl. AfA:</span>
              <span className="font-mono font-semibold">
                {Math.round(ergebnis2.totalKostenInklAfa).toLocaleString("de-DE")} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Privat-Anteil ({(ergebnis2.privatAnteil * 100).toFixed(1)} %):</span>
              <span className="font-mono">{Math.round(ergebnis2.privatKostenAnteil).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Geldwerter Vorteil (E/Hybrid-adjustiert):</span>
              <span className="font-mono">{Math.round(ergebnis2.geldwerterVorteil).toLocaleString("de-DE")} €</span>
            </div>
            <div className="flex justify-between border-t border-foreground/30 pt-2 text-lg font-bold">
              <span>ESt-Last:</span>
              <span className="font-mono">{Math.round(ergebnis2.steuerESt).toLocaleString("de-DE")} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spezial-Hinweise */}
      {autoTyp !== "verbrenner" && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-3 text-xs leading-relaxed">
          <CheckCircle2 className="h-3.5 w-3.5 inline text-emerald-700 mr-1" />
          <strong>E-/Hybrid-Bonus aktiv:</strong>{" "}
          {autoTyp === "elektro" && bruttolistenpreis <= 100000
            ? "BEV bis 100k BLP: nur 0,25 % statt 1 % (Riesen-Vorteil!)"
            : autoTyp === "elektro"
            ? "BEV > 100k: 0,5 % statt 1 %"
            : "Hybrid: 0,5 % statt 1 % (wenn ≥ 60 km elektrische Reichweite oder ≤ 50 g CO₂/km)"}
        </div>
      )}

      {/* Tipps */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Wahl ist 1 Jahr bindend</strong> — kann erst zum 01.01. nächsten Jahres gewechselt werden.
              </li>
              <li>
                <strong>Fahrtenbuch-Pflicht-Angaben</strong>: Datum, Kilometerstand Start + Ziel, gefahrene km,
                Zweck der Fahrt, ggf. Reise-Route, Auftraggeber. Bei Lücken oder Schätzungen → komplette
                Aberkennung durch Finanzamt.
              </li>
              <li>
                <strong>Bei unter 50 % betrieblicher Nutzung</strong>: 1 %-Regel nicht möglich (Auto gilt als
                Privatvermögen). Dann nur 0,30 €/km Pauschale für betriebliche Fahrten absetzbar.
              </li>
              <li>
                <strong>BEV bis 100k BLP</strong>: 0,25 %-Regelung gilt für Anschaffungen 2019–2030; die
                BLP-Grenze wurde für Anschaffungen ab 01.07.2025 von 70.000 € auf 100.000 € angehoben (davor 70.000 €).
                Plug-in-Hybrid braucht ≥ 60 km elektrische Reichweite (ab 2025) oder ≤ 50 g CO₂/km.
              </li>
              <li>App-Empfehlung: Vimcar, FahrtenbuchPro — automatisch via OBD2 + GPS.</li>
            </ul>
          </div>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "§6 (1) Nr. 4 EStG (1%-Regel)", url: "https://www.gesetze-im-internet.de/estg/__6.html" },
          { label: "§4 (5) Nr. 6 EStG (Fahrtenbuch)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§9 EStG (Pendlerpauschale)", url: "https://www.gesetze-im-internet.de/estg/__9.html" },
          { label: "BMF-Schreiben Kfz", url: "https://www.bundesfinanzministerium.de" },
        ]}
        note="E-Auto-Bonus 0,25 % bei BLP ≤ 100.000 € (Anschaffung ab 01.07.2025; davor ≤ 70.000 €). Hybrid-Bonus 0,5 % nur bei elektr. Reichweite ≥ 60 km (≥ 80 km ab 2025-Anschaffung). Pendlerpauschale 2026: 0,30 € (1-20 km) / 0,38 € (ab 21 km)."
      />
    </CockpitShell>
  );
};

export default KfzOptimizer;
