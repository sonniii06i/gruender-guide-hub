import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Calendar, Calculator, Info, Wallet } from "lucide-react";
import {
  Callout,
  Field,
  KitTable,
  ResultPanel,
  ResultRow,
  StatTile,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";

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

// ESt/KSt-Vorauszahlungen: 10.3., 10.6., 10.9., 10.12. (§37 Abs. 1 EStG, §31 KStG)
// GewSt-Vorauszahlungen: 15.2., 15.5., 15.8., 15.11. (§19 Abs. 1 GewStG)
const TERMINE = [
  { quartal: "Q1", datum: "10. März", gewstDatum: "15. Februar", monthIdx: 2 },
  { quartal: "Q2", datum: "10. Juni", gewstDatum: "15. Mai", monthIdx: 5 },
  { quartal: "Q3", datum: "10. September", gewstDatum: "15. August", monthIdx: 8 },
  { quartal: "Q4", datum: "10. Dezember", gewstDatum: "15. November", monthIdx: 11 },
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
      // GewSt-Anrechnung §35 EStG: 4,0 × Messbetrag (seit 2020 2. CoronaStHiG, vorher 3,8)
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

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
  const diffKritisch = Math.abs(differenz) > proQuartal * 0.5;

  return (
    <CockpitShell
      eyebrow="Quartals-Steuerschätzung"
      title="Vorauszahlungs-Plan ESt + KSt + GewSt + SolZ"
      subtitle="Was musst du zu den Vorauszahlungsterminen zurücklegen (ESt/KSt 10.3., 10.6., 10.9., 10.12.; GewSt 15.2., 15.5., 15.8., 15.11.)? Mit Soll-Ist-Abgleich gegen bisherige Vorauszahlungen und Empfehlung für einen Anpassungsantrag, wenn deine Schätzung stark abweicht."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Vorauszahlungs-Termine 2026" icon={Calendar} description="Wähle das aktuelle Quartal für den Soll-Ist-Abgleich.">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {TERMINE.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={aktuelleQuartal === i}
                    onClick={() => setAktuelleQuartal(i)}
                    className={`rounded-xl border p-3 text-left transition-colors active:translate-y-px ${
                      aktuelleQuartal === i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-foreground/25"
                    }`}
                  >
                    <span className={`block text-xs ${aktuelleQuartal === i ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{t.quartal}</span>
                    <span className="block text-sm font-semibold">{t.datum}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Aktuelles Quartal: <strong className="font-semibold text-foreground">{TERMINE[aktuelleQuartal].quartal}</strong> · Soll-Vorauszahlung kumuliert:{" "}
                <strong className="font-semibold text-foreground tabular">{eur(sollBisJetzt)}</strong>
              </p>
            </ToolSection>

            <ToolSection title="Deine Daten" icon={Calculator}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Rechtsform" htmlFor="qs-rechtsform" className="sm:col-span-2">
                  <select
                    id="qs-rechtsform"
                    value={rechtsform}
                    onChange={(e) => setRechtsform(e.target.value as Rechtsform)}
                    className={selectCls}
                  >
                    <option value="einzel">Einzelunternehmen / e.K. (ESt + GewSt + SolZ)</option>
                    <option value="freiberuf">Freiberufler (nur ESt + SolZ)</option>
                    <option value="ug">UG (KSt + GewSt + SolZ)</option>
                    <option value="gmbh">GmbH (KSt + GewSt + SolZ)</option>
                  </select>
                </Field>
                <Field label="Erwarteter Jahresgewinn (€)" htmlFor="qs-gewinn" hint="Hochrechnung deines Gewinns für das Jahr (auf Basis BWA + Trend)">
                  <Input
                    id="qs-gewinn"
                    type="number"
                    value={erwarteterJahresgewinn}
                    onChange={(e) => setErwarteterJahresgewinn(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                {(rechtsform === "einzel" || rechtsform === "freiberuf") && (
                  <Field label="Andere Einkünfte (€)" htmlFor="qs-andere" hint="z. B. Lohn, Vermietung, Kapital">
                    <Input
                      id="qs-andere"
                      type="number"
                      value={andereEinkuenfte}
                      onChange={(e) => setAndereEinkuenfte(Math.max(0, Number(e.target.value) || 0))}
                      className="tabular"
                    />
                  </Field>
                )}
                {rechtsform !== "freiberuf" && (
                  <Field label="GewSt-Hebesatz (%)">
                    <HebesatzPicker value={hebesatzGewSt} onChange={setHebesatzGewSt} />
                  </Field>
                )}
                <Field
                  label="Bisher geleistete Vorauszahlungen (€)"
                  htmlFor="qs-bisher"
                  hint="Summe aller bereits gezahlten VZ, aus FA-Bescheid und Quartalszahlungen kumuliert"
                  className="sm:col-span-2"
                >
                  <Input
                    id="qs-bisher"
                    type="number"
                    value={bisherigeVZ}
                    onChange={(e) => setBisherigeVZ(Math.max(0, Number(e.target.value) || 0))}
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
              kicker="Geschätzte Jahressteuer"
              title="Auf deinen erwarteten Jahresgewinn"
              value={eur(jahresSteuer.total)}
              valueHint={`~${ruecklageProzent.toFixed(1)} % des Gewinns`}
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Pro Quartal", v: eur(proQuartal), h: "25 % der Jahressteuer" },
                  { l: "Monatliche Rücklage", v: eur(monatsRuecklage), h: "Steuer-Sparkonto-Rate" },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                    <div className="mt-0.5 text-xs text-primary-foreground/55">{k.h}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            <StatTile
              emphasis
              tone={ueberzahlt ? "success" : diffKritisch ? "danger" : "neutral"}
              label={ueberzahlt ? "Überzahlt" : "Differenz Soll-Ist"}
              value={`${ueberzahlt ? "+" : ""}${eur(Math.abs(differenz))}`}
              hint={ueberzahlt ? "Überzahlt gegenüber dem Soll-Stand" : "Noch nachzuzahlen bis zum aktuellen Quartal"}
            />

            <ResultPanel title="Steuer-Aufschlüsselung Jahr" className="shadow-card">
              <div className="divide-y divide-border/70">
                {jahresSteuer.eSt > 0 && <ResultRow label="ESt" value={eur(jahresSteuer.eSt)} />}
                {jahresSteuer.kSt > 0 && <ResultRow label="KSt 15 %" value={eur(jahresSteuer.kSt)} />}
                {jahresSteuer.gewSt > 0 && <ResultRow label="GewSt" hint={`Hebesatz ${hebesatzGewSt} %`} value={eur(jahresSteuer.gewSt)} />}
                {jahresSteuer.solz > 0 && <ResultRow label="SolZ 5,5 %" value={eur(jahresSteuer.solz)} />}
                <ResultRow strong label="Summe" value={eur(jahresSteuer.total)} />
              </div>
            </ResultPanel>
          </>
        }
      />

      {diffKritisch && (
        <Callout
          tone={ueberzahlt ? "success" : "warning"}
          className="mb-6"
          title={
            ueberzahlt
              ? "Du hast überzahlt: Anpassungsantrag empfohlen"
              : "Achtung: Die Vorauszahlungen reichen nicht, eine Nachzahlung droht"
          }
        >
          {ueberzahlt ? (
            <>
              Deine bisherigen Vorauszahlungen ({bisherigeVZ.toLocaleString("de-DE")} €) liegen
              deutlich über dem Soll ({Math.round(sollBisJetzt).toLocaleString("de-DE")} €). Stelle
              einen <strong>Antrag auf Herabsetzung der Vorauszahlungen</strong> beim FA: Formular
              "Antrag auf Herabsetzung" oder formloses Schreiben mit aktueller Gewinn-Prognose.
            </>
          ) : (
            <>
              Bei Status quo ergibt sich eine Nachzahlung von ~
              <strong>{Math.round(jahresSteuer.total - bisherigeVZ - proQuartal * verbleibendQuartale).toLocaleString("de-DE")} €</strong>{" "}
              bei der Steuererklärung. Optionen: 1) Vorauszahlung in den verbleibenden{" "}
              {verbleibendQuartale} Quartalen erhöhen auf{" "}
              <strong>~{Math.round(restPro).toLocaleString("de-DE")} €</strong> pro Quartal, 2)
              Anpassungsantrag beim FA stellen mit aktueller höherer Gewinn-Prognose.
            </>
          )}
        </Callout>
      )}

      <ToolSection title="Quartals-Plan" icon={Wallet} className="mb-6">
        <KitTable caption="Vorauszahlungen je Quartal">
          <thead>
            <tr>
              <th>Quartal</th>
              <th>Termin ESt/KSt</th>
              <th>Termin GewSt</th>
              <th className="!text-right">Quartals-VZ</th>
              <th className="!text-right">davon GewSt</th>
              <th className="!text-right">Kumuliert</th>
              <th className="!text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {TERMINE.map((t, i) => {
              const istVergangen = i < aktuelleQuartal;
              const istAktuell = i === aktuelleQuartal;
              const sollKumuliert = proQuartal * (i + 1);
              return (
                <tr key={i} className={istAktuell ? "bg-accent/60" : undefined}>
                  <td className="font-semibold">{t.quartal}</td>
                  <td className="whitespace-nowrap text-muted-foreground">{t.datum}</td>
                  <td className="whitespace-nowrap text-muted-foreground">{t.gewstDatum}</td>
                  <td className="text-right">{eur(proQuartal)}</td>
                  <td className="text-right">{eur(jahresSteuer.gewSt / 4)}</td>
                  <td className="text-right">{eur(sollKumuliert)}</td>
                  <td className="text-right">
                    {istVergangen && <ToneBadge tone="success">vergangen</ToneBadge>}
                    {istAktuell && <ToneBadge tone="accent">aktuell</ToneBadge>}
                    {!istAktuell && !istVergangen && <ToneBadge tone="neutral">offen</ToneBadge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </KitTable>
      </ToolSection>

      <ToolSection title="Pflichten und Tipps" icon={Info} className="mb-6">
        <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Vorauszahlungs-Festsetzung:</strong> FA setzt jährlich 4 Quartals-VZ basierend auf
            der letzten ESt-/KSt-Festsetzung fest. Ohne Anpassung läuft das automatisch.
          </li>
          <li>
            <strong className="text-foreground">Fristen:</strong> ESt/KSt am 10.3., 10.6., 10.9. und 10.12.; die Gewerbesteuer an die Gemeinde am 15.2., 15.5., 15.8. und 15.11. (§19 Abs. 1 GewStG). Bei Fristversäumnis
            1 % Säumniszuschlag pro angefangenem Monat (§240 AO).
          </li>
          <li>
            <strong className="text-foreground">Anpassungs-Antrag:</strong> formloses Schreiben oder ELSTER-Formular, wenn dein Gewinn
            deutlich abweicht. FA passt dann VZ an (rückwirkend ab Beginn des Wirtschaftsjahres).
          </li>
          <li>
            <strong className="text-foreground">Solidaritätszuschlag-Freigrenze 2026:</strong> ab ~20.350 € ESt (Single) + 5,5 % Soli
            (Single). Familien-Splitting / Verheiratete: doppelte Grenze.
          </li>
          <li>
            <strong className="text-foreground">GewSt-Anrechnung §35 EStG:</strong> bei Einzelunternehmer wird GewSt mit 4,0 ×
            Messbetrag auf ESt angerechnet (seit 2020 erhöht von 3,8). Bei Hebesatz ≤ 400 % effektiv
            neutral. Bei Berlin (410%) / München (490%) bleibt Restbelastung.
          </li>
          <li>
            <strong className="text-foreground">Pre-Year-End:</strong> ab Q4 mit dem{" "}
            <a href="/cockpit/pre-year-end" className="font-medium text-accent-blue hover:underline">
              Pre-Year-End-Check
            </a>{" "}
            IAB + Investitionen + Boni vorziehen und so die Jahressteuer (und damit die VZ im nächsten Jahr) senken.
          </li>
          <li>
            <strong className="text-foreground">Steuer-Sparkonto:</strong> Empfehlung Tagesgeld bei Trade Republic / ING-DiBa /
            Hausbank: separates Konto strikt für Steuer-Rücklagen, monatlich{" "}
            <strong className="text-foreground tabular">{eur(monatsRuecklage)}</strong> reservieren.
          </li>
          <li>
            <strong className="text-foreground">Ist-Steuer vs. Schätzung:</strong> Bei großen Abweichungen (&gt; 50 % vom Soll)
            drohen nach der Veranlagung eine hohe Nachzahlung auf einen Schlag und Nachzahlungszinsen (§233a AO, 0,15 % pro Monat
            ab dem 15. Monat nach Jahresende). Ein Anpassungsantrag verteilt die Last und schont die Liquidität.
          </li>
        </ul>
      </ToolSection>

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
