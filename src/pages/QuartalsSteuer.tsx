import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Calculator,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Wallet,
} from "lucide-react";

import {
  progressionESt,
  solZ as solZAuf,
  KST_RATE as KSt,
  SOLZ_RATE,
  GEWST_MESSZAHL,
  GEWST_FREIBETRAG_NATUERLICH,
  GEWST_ANRECHNUNG_FAKTOR,
} from "@/lib/germanTax";

type Rechtsform = "einzel" | "freiberuf" | "ug" | "gmbh";

// Quartals-Termine (10.3, 10.6, 10.9, 10.12)
const TERMINE = [
  { quartal: "Q1", datum: "10. März", monthIdx: 2 },
  { quartal: "Q2", datum: "10. Juni", monthIdx: 5 },
  { quartal: "Q3", datum: "10. September", monthIdx: 8 },
  { quartal: "Q4", datum: "10. Dezember", monthIdx: 11 },
];

const QuartalsSteuer = () => {
  const [rechtsform, setRechtsform] = useState<Rechtsform>("gmbh");
  const [erwarteterJahresgewinn, setErwarteterJahresgewinn] = useState(120000);
  const [andereEinkuenfte, setAndereEinkuenfte] = useState(0);
  const [bisherigeVZ, setBisherigeVZ] = useState(0);
  const [hebesatzGewSt, setHebesatzGewSt] = useState(400); // Standard-Hebesatz
  const [aktuelleQuartal, setAktuelleQuartal] = useState(2); // Q3 default

  // Steuer-Berechnung Jahresbasis
  const jahresSteuer = useMemo(() => {
    if (rechtsform === "einzel" || rechtsform === "freiberuf") {
      const zvE = Math.max(0, erwarteterJahresgewinn + andereEinkuenfte);
      const eSt = progressionESt(zvE);
      const solz = solZAuf(eSt);
      // GewSt nur bei Einzelunternehmer mit Gewerbe (Freiberuf gewerbesteuerfrei)
      const gewstBasis = Math.max(0, erwarteterJahresgewinn - GEWST_FREIBETRAG_NATUERLICH);
      const gewstMessbetrag = gewstBasis * GEWST_MESSZAHL;
      const gewstHebesatz = (hebesatzGewSt / 100) * gewstMessbetrag;
      // GewSt-Anrechnung §35 EStG: 3,8x Messbetrag
      const gewstAnrechnung = Math.min(gewstMessbetrag * GEWST_ANRECHNUNG_FAKTOR, eSt);
      const gewstEffektiv = rechtsform === "freiberuf" ? 0 : Math.max(0, gewstHebesatz - gewstAnrechnung);
      return {
        eSt,
        solz,
        gewSt: gewstEffektiv,
        kSt: 0,
        total: eSt + solz + gewstEffektiv,
      };
    }
    // GmbH/UG
    const kSt = erwarteterJahresgewinn * KSt;
    const solz = kSt * SOLZ_RATE;
    const gewstMessbetrag = erwarteterJahresgewinn * GEWST_MESSZAHL;
    const gewstHebesatz = (hebesatzGewSt / 100) * gewstMessbetrag;
    return {
      eSt: 0,
      solz,
      gewSt: gewstHebesatz,
      kSt,
      total: kSt + solz + gewstHebesatz,
    };
  }, [rechtsform, erwarteterJahresgewinn, andereEinkuenfte, hebesatzGewSt]);

  // Vorauszahlungs-Quartal: jeweils 25 % der Jahressteuer
  const proQuartal = useMemo(() => jahresSteuer.total / 4, [jahresSteuer.total]);

  // Bereits geleistet vs. Soll bis aktuelles Quartal
  const sollBisJetzt = useMemo(() => proQuartal * (aktuelleQuartal + 1), [proQuartal, aktuelleQuartal]);
  const differenz = sollBisJetzt - bisherigeVZ;
  const ueberzahlt = differenz < 0;

  // Verbleibende Quartale
  const verbleibendQuartale = 3 - aktuelleQuartal;
  const restPro = verbleibendQuartale > 0 ? Math.max(0, jahresSteuer.total - bisherigeVZ - proQuartal) / verbleibendQuartale : 0;

  // Cashflow / Rücklage Empfehlung
  const monatsRuecklage = jahresSteuer.total / 12;
  const ruecklageProzent = (jahresSteuer.total / Math.max(1, erwarteterJahresgewinn)) * 100;

  return (
    <CockpitShell
      eyebrow="Quartals-Steuerschätzung"
      title="Vorauszahlungs-Plan ESt + KSt + GewSt + SolZ"
      subtitle="Was musst du am 10.3 / 10.6 / 10.9 / 10.12 zurücklegen? Mit Soll-Ist-Abgleich gegen bisherige Vorauszahlungen + Anpassungs-Antrag-Empfehlung wenn deine Schätzung stark abweicht."
    >
      {/* Termine-Strip */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Vorauszahlungs-Termine 2026</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TERMINE.map((t, i) => (
            <button
              key={i}
              onClick={() => setAktuelleQuartal(i)}
              className={`rounded-lg border p-3 text-left transition-all ${
                aktuelleQuartal === i
                  ? "border-accent-blue bg-accent-blue/10"
                  : "border-border bg-card hover:border-accent-blue/40"
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.quartal}</div>
              <div className="font-bold text-sm text-foreground">{t.datum}</div>
            </button>
          ))}
        </div>
        <div className="text-[11px] text-muted-foreground mt-2">
          Aktuelles Quartal: <strong className="text-foreground">{TERMINE[aktuelleQuartal].quartal}</strong> ·{" "}
          Soll-Vorauszahlung kumuliert: <strong className="text-foreground">{Math.round(sollBisJetzt).toLocaleString("de-DE")} €</strong>
        </div>
      </div>

      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Daten</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select
              value={rechtsform}
              onChange={(e) => setRechtsform(e.target.value as Rechtsform)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="einzel">Einzelunternehmen / e.K. (ESt + GewSt + SolZ)</option>
              <option value="freiberuf">Freiberufler (nur ESt + SolZ)</option>
              <option value="ug">UG (KSt + GewSt + SolZ)</option>
              <option value="gmbh">GmbH (KSt + GewSt + SolZ)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Erwarteter Jahresgewinn (€)
            </Label>
            <Input
              type="number"
              value={erwarteterJahresgewinn}
              onChange={(e) => setErwarteterJahresgewinn(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Hochrechnung deines Gewinns für das Jahr (auf Basis BWA + Trend)
            </div>
          </div>
        </div>

        {(rechtsform === "einzel" || rechtsform === "freiberuf") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Andere Einkünfte (€) — z.B. Lohn, V+V, Kapital
              </Label>
              <Input
                type="number"
                value={andereEinkuenfte}
                onChange={(e) => setAndereEinkuenfte(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1"
              />
            </div>
            {rechtsform === "einzel" && (
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  GewSt-Hebesatz (in %)
                </Label>
                <Input
                  type="number"
                  value={hebesatzGewSt}
                  onChange={(e) => setHebesatzGewSt(Math.max(200, Number(e.target.value) || 400))}
                  className="mt-1"
                />
                <div className="text-[10px] text-muted-foreground mt-1">
                  Berlin 410 % · München 490 % · Hamburg 470 % · Frankfurt 460 % · ländlich oft 350-380 %
                </div>
              </div>
            )}
          </div>
        )}

        {(rechtsform === "ug" || rechtsform === "gmbh") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                GewSt-Hebesatz (in %)
              </Label>
              <Input
                type="number"
                value={hebesatzGewSt}
                onChange={(e) => setHebesatzGewSt(Math.max(200, Number(e.target.value) || 400))}
                className="mt-1"
              />
              <div className="text-[10px] text-muted-foreground mt-1">
                Berlin 410 · München 490 · Hamburg 470 · Frankfurt 460 · ländlich 350-380
              </div>
            </div>
          </div>
        )}

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Bisher geleistete Vorauszahlungen (€) — Summe aller bereits gezahlten VZ
          </Label>
          <Input
            type="number"
            value={bisherigeVZ}
            onChange={(e) => setBisherigeVZ(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            Aus FA-Bescheid + bereits geleisteten Quartals-Zahlungen kumuliert
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue font-semibold mb-1">
            Geschätzte Jahressteuer
          </div>
          <div className="text-3xl font-bold text-foreground">
            {Math.round(jahresSteuer.total).toLocaleString("de-DE")} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            ~{ruecklageProzent.toFixed(1)} % des Gewinns
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
            Pro Quartal
          </div>
          <div className="text-3xl font-bold text-foreground">
            {Math.round(proQuartal).toLocaleString("de-DE")} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">25 % der Jahressteuer</div>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
            Monatliche Rücklage
          </div>
          <div className="text-3xl font-bold text-foreground">
            {Math.round(monatsRuecklage).toLocaleString("de-DE")} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">Steuer-Sparkonto-Rate</div>
        </div>
        <div
          className={`rounded-2xl border p-4 ${
            ueberzahlt
              ? "border-emerald-500/30 bg-emerald-500/5"
              : Math.abs(differenz) > proQuartal * 0.5
              ? "border-red-500/30 bg-red-500/5"
              : "border-border bg-card"
          }`}
        >
          <div
            className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${
              ueberzahlt ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
            }`}
          >
            {ueberzahlt ? "Überzahlt" : "Differenz Soll-Ist"}
          </div>
          <div className="text-3xl font-bold text-foreground">
            {ueberzahlt ? "+" : ""}
            {Math.round(Math.abs(differenz)).toLocaleString("de-DE")} €
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            {ueberzahlt ? "Überzahlt vs. Soll-Stand" : "Du musst noch nachzahlen bis Q-Stand"}
          </div>
        </div>
      </div>

      {/* Quartal-Plan */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-accent-blue" />
          Quartals-Plan
        </h3>
        <div className="space-y-2">
          {TERMINE.map((t, i) => {
            const istVergangen = i < aktuelleQuartal;
            const istAktuell = i === aktuelleQuartal;
            const sollKumuliert = proQuartal * (i + 1);
            return (
              <div
                key={i}
                className={`grid grid-cols-4 gap-3 items-center text-xs rounded-lg p-3 ${
                  istAktuell
                    ? "bg-accent-blue/10 border border-accent-blue/30"
                    : istVergangen
                    ? "bg-secondary/30"
                    : "bg-secondary/10"
                }`}
              >
                <div>
                  <div className="font-semibold text-foreground">{t.quartal}</div>
                  <div className="text-[10px] text-muted-foreground">{t.datum}</div>
                </div>
                <div className="text-muted-foreground">
                  Quartal-VZ:{" "}
                  <strong className="text-foreground">{Math.round(proQuartal).toLocaleString("de-DE")} €</strong>
                </div>
                <div className="text-muted-foreground">
                  Kumuliert:{" "}
                  <strong className="text-foreground">{Math.round(sollKumuliert).toLocaleString("de-DE")} €</strong>
                </div>
                <div className="text-right">
                  {istVergangen && <span className="text-emerald-700 dark:text-emerald-400">vergangen</span>}
                  {istAktuell && <span className="text-accent-blue font-semibold">aktuell</span>}
                  {!istAktuell && !istVergangen && <span className="text-muted-foreground">offen</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Steuer-Aufschlüsselung */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Steuer-Aufschlüsselung Jahr</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {jahresSteuer.eSt > 0 && (
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">ESt</div>
              <div className="text-lg font-bold text-foreground">
                {Math.round(jahresSteuer.eSt).toLocaleString("de-DE")} €
              </div>
            </div>
          )}
          {jahresSteuer.kSt > 0 && (
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">KSt 15 %</div>
              <div className="text-lg font-bold text-foreground">
                {Math.round(jahresSteuer.kSt).toLocaleString("de-DE")} €
              </div>
            </div>
          )}
          {jahresSteuer.gewSt > 0 && (
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">GewSt</div>
              <div className="text-lg font-bold text-foreground">
                {Math.round(jahresSteuer.gewSt).toLocaleString("de-DE")} €
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Hebesatz {hebesatzGewSt} %</div>
            </div>
          )}
          {jahresSteuer.solz > 0 && (
            <div className="rounded-lg bg-secondary/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">SolZ 5,5 %</div>
              <div className="text-lg font-bold text-foreground">
                {Math.round(jahresSteuer.solz).toLocaleString("de-DE")} €
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Anpassungs-Empfehlung */}
      {Math.abs(differenz) > proQuartal * 0.5 && (
        <div
          className={`rounded-2xl border p-5 mb-6 ${
            ueberzahlt
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-amber-500/30 bg-amber-500/5"
          }`}
        >
          <div className="flex items-start gap-2">
            {ueberzahlt ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-sm text-foreground mb-1">
                {ueberzahlt
                  ? "Du hast überzahlt — Anpassungs-Antrag empfohlen"
                  : "Achtung: Vorauszahlungen reichen nicht — Nachzahlung droht"}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {ueberzahlt ? (
                  <>
                    Deine bisherigen Vorauszahlungen ({bisherigeVZ.toLocaleString("de-DE")} €) liegen
                    deutlich über dem Soll ({Math.round(sollBisJetzt).toLocaleString("de-DE")} €). Stelle
                    einen <strong>Antrag auf Herabsetzung der Vorauszahlungen</strong> beim FA — Formular
                    "Antrag auf Herabsetzung" oder formloses Schreiben mit aktueller Gewinn-Prognose.
                  </>
                ) : (
                  <>
                    Bei Status quo ergibt sich eine Nachzahlung von ~
                    <strong>{Math.round(jahresSteuer.total - bisherigeVZ - proQuartal * verbleibendQuartale).toLocaleString("de-DE")} €</strong>{" "}
                    bei der Steuer-Erklärung. Optionen: 1) Vorauszahlung in den verbleibenden{" "}
                    {verbleibendQuartale} Quartalen erhöhen auf{" "}
                    <strong>~{Math.round(restPro).toLocaleString("de-DE")} €</strong> pro Quartal, 2)
                    Anpassungs-Antrag beim FA stellen mit aktueller höherer Gewinn-Prognose.
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pflicht-Hinweise */}
      <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-foreground mb-2">Pflichten + Tipps:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>Vorauszahlungs-Festsetzung:</strong> FA setzt jährlich 4 Quartals-VZ basierend auf
                der letzten ESt-/KSt-Festsetzung fest. Ohne Anpassung läuft das automatisch.
              </li>
              <li>
                <strong>Frist:</strong> immer 10. des Monats (10.3, 10.6, 10.9, 10.12) — bei Fristversäumnis
                1 % Säumniszuschlag pro angefangenem Monat (§240 AO).
              </li>
              <li>
                <strong>Anpassungs-Antrag:</strong> formloses Schreiben oder ELSTER-Formular wenn dein Gewinn
                deutlich abweicht. FA passt dann VZ an (rückwirkend ab Beginn des Wirtschaftsjahres).
              </li>
              <li>
                <strong>Solidaritätszuschlag-Freigrenze 2026:</strong> ab ~19.950 € ESt + 5,5 % Soli
                (Single). Familien-Splitting / Verheiratete: doppelte Grenze.
              </li>
              <li>
                <strong>GewSt-Anrechnung §35 EStG:</strong> bei Einzelunternehmer wird GewSt mit 3,8 ×
                Messbetrag auf ESt angerechnet — bei Hebesatz ≤ 380 % effektiv neutral.
              </li>
              <li>
                <strong>Pre-Year-End:</strong> ab Q4 mit{" "}
                <a href="/cockpit/pre-year-end" className="text-accent-blue underline">
                  Pre-Year-End-Check
                </a>{" "}
                IAB + Investitionen + Boni vorziehen → Jahres-Steuer (und damit nächstes Jahr VZ) senken.
              </li>
              <li>
                <strong>Steuer-Sparkonto:</strong> Empfehlung Tagesgeld bei Trade Republic / ING-DiBa /
                Hausbank — separates Konto strikt für Steuer-Rücklagen, monatlich{" "}
                <strong>{Math.round(monatsRuecklage).toLocaleString("de-DE")} €</strong> reservieren.
              </li>
              <li>
                <strong>Ist-Steuer vs. Schätzung:</strong> bei großen Abweichungen (&gt; 50 % vom Soll)
                droht Steuer-Strafe wegen "leichtfertiger Steuerverkürzung" (§378 AO) — daher Anpassungs-
                Antrag stellen, nicht ignorieren.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Stand2026Footer
        sources={[
          { label: "§37 EStG (Vorauszahlung)", url: "https://www.gesetze-im-internet.de/estg/__37.html" },
          { label: "§31 KStG (KSt-Vorauszahlung)", url: "https://www.gesetze-im-internet.de/kstg_1977/__31.html" },
          { label: "§19 GewStG (GewSt-Vorauszahlung)", url: "https://www.gesetze-im-internet.de/gewstg/__19.html" },
          { label: "§240 AO (Säumniszuschlag)", url: "https://www.gesetze-im-internet.de/ao_1977/__240.html" },
        ]}
        note="Schätzung basiert auf erwartetem Jahresgewinn. Bei stark schwankendem Geschäft: konservativ rechnen + Quartals-Update via Anpassungs-Antrag beim FA."
      />
    </CockpitShell>
  );
};

export default QuartalsSteuer;
