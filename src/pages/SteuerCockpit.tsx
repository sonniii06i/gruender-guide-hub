import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Calculator, PiggyBank, Info, ShoppingCart } from "lucide-react";

type LegalForm = "ein" | "ug" | "gmbh";
type UstMode = "monatlich" | "quartal" | "keine";

interface Setup {
  legalForm: LegalForm;
  ustMode: UstMode;
  dauerfrist: boolean;
  oss: boolean;
  zm: boolean;
  mitarbeiter: boolean;
}

interface Frist {
  date: string; // "DD.MM."
  title: string;
  detail?: string;
  category: "ust" | "lohn" | "kst" | "est" | "gewst" | "oss" | "zm" | "stb" | "year-end";
}

const pad = (n: number) => String(n).padStart(2, "0");
const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/** Berechnet alle Steuer-Fristen aus Setup. Termine 2026-konform. */
function buildFristen(s: Setup): Frist[] {
  const fristen: Frist[] = [];

  // ============ USt-Voranmeldung ============
  if (s.ustMode !== "keine") {
    const dfOffset = s.dauerfrist ? 1 : 0;
    if (s.ustMode === "monatlich") {
      for (let m = 0; m < 12; m++) {
        const due = (m + 1 + dfOffset) % 12;
        const yearMark = m + 1 + dfOffset >= 12 ? " (Folgejahr)" : "";
        fristen.push({
          date: `10.${pad(due + 1)}.`,
          title: `USt-VA ${MONAT[m]}${yearMark}`,
          detail: s.dauerfrist ? "Mit Dauerfristverlängerung (+1 Monat)" : undefined,
          category: "ust",
        });
      }
    } else {
      // Quartalsweise: Quartals-Ende-Monate (März/Juni/Sept/Dez)
      const quartals = [
        { end: 2, label: "Q1 (Jan–Mär)" },
        { end: 5, label: "Q2 (Apr–Jun)" },
        { end: 8, label: "Q3 (Jul–Sep)" },
        { end: 11, label: "Q4 (Okt–Dez)" },
      ];
      for (const q of quartals) {
        const due = (q.end + 1 + dfOffset) % 12;
        const yearMark = q.end + 1 + dfOffset >= 12 ? " (Folgejahr)" : "";
        fristen.push({
          date: `10.${pad(due + 1)}.`,
          title: `USt-VA ${q.label}${yearMark}`,
          detail: s.dauerfrist ? "Mit Dauerfristverlängerung (+1 Monat)" : undefined,
          category: "ust",
        });
      }
    }
  }

  // ============ Zusammenfassende Meldung (ZM) ============
  // Pflicht bei innergemeinschaftlichen B2B-Lieferungen/Sonstige Leistungen.
  // Frist: 25. des Folgemonats. Dauerfrist gilt NICHT für ZM!
  if (s.zm) {
    if (s.ustMode === "monatlich") {
      // Wenn monatlich auch ZM monatlich (eigentlich Default ist Quartalsweise, aber wenn USt monatlich → ZM monatlich)
      for (let m = 0; m < 12; m++) {
        const due = (m + 1) % 12;
        fristen.push({
          date: `25.${pad(due + 1)}.`,
          title: `ZM ${MONAT[m]}`,
          detail: "Zusammenfassende Meldung – keine Dauerfrist",
          category: "zm",
        });
      }
    } else {
      // Quartalsweise (Default für ZM)
      fristen.push({ date: "25.04.", title: "ZM Q1", detail: "Zusammenfassende Meldung – keine Dauerfrist", category: "zm" });
      fristen.push({ date: "25.07.", title: "ZM Q2", detail: "Zusammenfassende Meldung – keine Dauerfrist", category: "zm" });
      fristen.push({ date: "25.10.", title: "ZM Q3", detail: "Zusammenfassende Meldung – keine Dauerfrist", category: "zm" });
      fristen.push({ date: "25.01.", title: "ZM Q4 (Folgejahr)", detail: "Zusammenfassende Meldung – keine Dauerfrist", category: "zm" });
    }
  }

  // ============ OSS (One-Stop-Shop) ============
  // Quartalsweise, immer Monatsende, keine Dauerfrist.
  if (s.oss) {
    fristen.push({ date: "30.04.", title: "OSS-Meldung Q1", detail: "Fernverkäufe + B2C-Leistungen EU – keine Dauerfrist", category: "oss" });
    fristen.push({ date: "31.07.", title: "OSS-Meldung Q2", detail: "Fernverkäufe + B2C-Leistungen EU – keine Dauerfrist", category: "oss" });
    fristen.push({ date: "31.10.", title: "OSS-Meldung Q3", detail: "Fernverkäufe + B2C-Leistungen EU – keine Dauerfrist", category: "oss" });
    fristen.push({ date: "31.01.", title: "OSS-Meldung Q4 (Folgejahr)", detail: "Fernverkäufe + B2C-Leistungen EU – keine Dauerfrist", category: "oss" });
  }

  // ============ Lohnsteuer-Anmeldung ============
  // Nur wenn Mitarbeiter beschäftigt (egal welche Rechtsform). Keine Dauerfrist.
  if (s.mitarbeiter) {
    if (s.ustMode === "monatlich" || s.ustMode === "keine") {
      // Lohnsteuer kann monatlich/quartal/jährlich sein – wir gehen vereinfacht von monatlich aus
      for (let m = 0; m < 12; m++) {
        const due = (m + 1) % 12;
        fristen.push({
          date: `10.${pad(due + 1)}.`,
          title: `Lohnsteuer-Anmeldung ${MONAT[m]}`,
          detail: "Nur wenn Mitarbeiter – keine Dauerfrist",
          category: "lohn",
        });
      }
    } else {
      // Quartalsweise
      fristen.push({ date: "10.04.", title: "Lohnsteuer Q1", detail: "Nur wenn Mitarbeiter – keine Dauerfrist", category: "lohn" });
      fristen.push({ date: "10.07.", title: "Lohnsteuer Q2", category: "lohn" });
      fristen.push({ date: "10.10.", title: "Lohnsteuer Q3", category: "lohn" });
      fristen.push({ date: "10.01.", title: "Lohnsteuer Q4 (Folgejahr)", category: "lohn" });
    }
  }

  // ============ Körperschaftsteuer-VZ (nur GmbH/UG) ============
  if (s.legalForm === "gmbh" || s.legalForm === "ug") {
    fristen.push({ date: "10.03.", title: "KSt-Vorauszahlung Q1", category: "kst" });
    fristen.push({ date: "10.06.", title: "KSt-Vorauszahlung Q2", category: "kst" });
    fristen.push({ date: "10.09.", title: "KSt-Vorauszahlung Q3", category: "kst" });
    fristen.push({ date: "10.12.", title: "KSt-Vorauszahlung Q4", category: "kst" });
  }

  // ============ Einkommensteuer-VZ (nur Einzelunternehmen) ============
  if (s.legalForm === "ein") {
    fristen.push({ date: "10.03.", title: "ESt-Vorauszahlung Q1", category: "est" });
    fristen.push({ date: "10.06.", title: "ESt-Vorauszahlung Q2", category: "est" });
    fristen.push({ date: "10.09.", title: "ESt-Vorauszahlung Q3", category: "est" });
    fristen.push({ date: "10.12.", title: "ESt-Vorauszahlung Q4", category: "est" });
  }

  // ============ Gewerbesteuer-VZ ============
  fristen.push({ date: "15.02.", title: "Gewerbesteuer-VZ Q1", category: "gewst" });
  fristen.push({ date: "15.05.", title: "Gewerbesteuer-VZ Q2", category: "gewst" });
  fristen.push({ date: "15.08.", title: "Gewerbesteuer-VZ Q3", category: "gewst" });
  fristen.push({ date: "15.11.", title: "Gewerbesteuer-VZ Q4", category: "gewst" });

  // ============ Steuererklärung Vorjahr ============
  fristen.push({ date: "31.07.", title: "Steuererklärung Vorjahr (ohne StB)", detail: "Mit StB: 28.02. übernächstes Jahr", category: "stb" });

  // ============ Pre-Year-End ============
  fristen.push({
    date: "31.12.",
    title: "Pre-Year-End: Investitionen, Rückstellungen, Gewinnverlagerung",
    detail: "Steuer-Reduktion durch IAB, Bonuszahlungen, Vorauszahlungen",
    category: "year-end",
  });

  // Sortiere nach Datum (DD.MM.)
  return fristen.sort((a, b) => {
    const [da, ma] = a.date.split(".");
    const [db, mb] = b.date.split(".");
    if (ma !== mb) return parseInt(ma) - parseInt(mb);
    return parseInt(da) - parseInt(db);
  });
}

const CATEGORY_COLOR: Record<Frist["category"], string> = {
  ust: "bg-accent-blue/10 text-accent-blue",
  lohn: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  kst: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  est: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  gewst: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  oss: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  zm: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  stb: "bg-secondary text-foreground",
  "year-end": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
};

const CATEGORY_LABEL: Record<Frist["category"], string> = {
  ust: "USt",
  lohn: "Lohnst.",
  kst: "KSt",
  est: "ESt",
  gewst: "GewSt",
  oss: "OSS",
  zm: "ZM",
  stb: "Erklärung",
  "year-end": "Year-End",
};

const SteuerCockpit = () => {
  const [legalForm, setLegalForm] = useState<LegalForm>("gmbh");
  const [ustMode, setUstMode] = useState<UstMode>("quartal");
  const [dauerfrist, setDauerfrist] = useState(false);
  const [oss, setOss] = useState(false);
  const [zm, setZm] = useState(false);
  const [mitarbeiter, setMitarbeiter] = useState(false);

  const fristen = useMemo(
    () => buildFristen({ legalForm, ustMode, dauerfrist, oss, zm, mitarbeiter }),
    [legalForm, ustMode, dauerfrist, oss, zm, mitarbeiter],
  );

  // IAB — clamp auf [0, ∞) gegen negative Eingaben + cap bei 200k
  const [iabBasis, setIabBasis] = useState(80000);
  const iabBasisClamped = Math.max(0, iabBasis);
  const iab = Math.min(iabBasisClamped * 0.5, 200000);
  const iabSteuer = iab * (legalForm === "gmbh" || legalForm === "ug" ? 0.30 : 0.42);

  // Quartal: Brutto/Netto-Logik
  const [eingabeBrutto, setEingabeBrutto] = useState(false);
  const [umsatz, setUmsatz] = useState(60000);
  const [kosten, setKosten] = useState(28000);
  const istKU = ustMode === "keine";
  const umsatzNetto = istKU || !eingabeBrutto ? umsatz : Math.round(umsatz / 1.19);
  const kostenNetto = istKU || !eingabeBrutto ? kosten : Math.round(kosten / 1.19);
  const ustVerbindlichkeit = istKU || !eingabeBrutto ? 0 : Math.round((umsatz - kosten) - (umsatzNetto - kostenNetto));
  const gewinn = Math.max(0, umsatzNetto - kostenNetto);
  const steuersatz = legalForm === "gmbh" || legalForm === "ug" ? 0.30 : 0.35;
  const ruecklage = gewinn * steuersatz;

  return (
    <CockpitShell
      eyebrow="💰 DE-Steuer-Cockpit"
      title="Fristen, IAB & Quartals-Schätzung"
      subtitle="Personalisiert auf deine Konstellation – Toggles unten setzen, Fristen aktualisieren sich live."
    >
      {/* Setup */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <h2 className="font-bold mb-4">Dein Setup</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <div className="flex gap-2 mt-2">
              {[["ein", "Einzel"], ["ug", "UG"], ["gmbh", "GmbH"]].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setLegalForm(v as LegalForm)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
                    legalForm === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
                  }`}
                >{l}</button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt-Voranmeldung</Label>
            <div className="flex gap-2 mt-2">
              {[["monatlich", "Monatlich"], ["quartal", "Quartal"], ["keine", "Keine (KU)"]].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setUstMode(v as UstMode)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold ${
                    ustMode === v ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
                  }`}
                >{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggle-Reihe für Erweiterungen */}
        <div className="grid sm:grid-cols-2 gap-3">
          <Toggle
            checked={dauerfrist}
            onChange={setDauerfrist}
            label="Dauerfristverlängerung"
            help="USt-VA-Frist verschiebt sich um 1 Monat. 1/11-Sondervorauszahlung Pflicht."
            disabled={ustMode === "keine"}
          />
          <Toggle
            checked={oss}
            onChange={setOss}
            label="OSS-Verfahren (EU-B2C)"
            help="One-Stop-Shop für Fernverkäufe in andere EU-Länder. Quartal-Meldung."
          />
          <Toggle
            checked={zm}
            onChange={setZm}
            label="Zusammenfassende Meldung (ZM)"
            help="Pflicht bei innergemeinschaftlichen B2B-Lieferungen / sonstigen Leistungen. 25. des Folgemonats, KEINE Dauerfrist."
          />
          <Toggle
            checked={mitarbeiter}
            onChange={setMitarbeiter}
            label="Mitarbeiter beschäftigt"
            help="Aktiviert Lohnsteuer-Anmeldung. Auch bei Einzelunternehmen relevant – ohne MA: keine Lohnsteuer."
          />
        </div>
      </div>

      {/* Fristen */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">Frist-Kalender {new Date().getFullYear()}</h2>
          </div>
          <div className="text-xs text-muted-foreground">
            {fristen.length} Termine · sortiert nach Datum
          </div>
        </div>

        {dauerfrist && ustMode !== "keine" && (
          <div className="flex items-start gap-2 rounded-lg bg-accent-blue/10 border border-accent-blue/30 p-3 mb-4 text-xs">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent-blue" />
            <span>
              <strong>Dauerfristverlängerung aktiv:</strong> USt-VA-Termine sind +1 Monat verschoben. Q4 wird also erst am <strong>10.02.</strong> (statt 10.01.) fällig. Sondervorauszahlung 1/11 wird im Februar fällig.
            </span>
          </div>
        )}

        <div className="divide-y divide-border">
          {fristen.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className="w-16 shrink-0 font-mono font-bold text-accent-blue">{f.date}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase tracking-wider rounded-md px-1.5 py-0.5 font-bold ${CATEGORY_COLOR[f.category]}`}>
                    {CATEGORY_LABEL[f.category]}
                  </span>
                  <span className="text-sm font-medium">{f.title}</span>
                </div>
                {f.detail && (
                  <div className="text-[11px] text-muted-foreground mt-0.5">{f.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {fristen.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Keine Fristen konfiguriert – Setup oben anpassen.
          </div>
        )}
      </div>

      {/* IAB + Quartals-Schätzung */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">IAB-Rechner</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            <strong>Investitionsabzugsbetrag (§ 7g EStG):</strong> Du kannst bis zu 50 % einer geplanten Investition (binnen 3 Jahren) <em>vorab</em> als Betriebsausgabe ansetzen und damit deinen aktuellen Gewinn (und Steuerlast) reduzieren. Sinnvoll z.&nbsp;B. für geplante Geschäftsfahrzeuge, Maschinen, Lager-Equipment oder IT-Hardware.
          </p>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geplante Investition in 3 Jahren (€)</Label>
          <Input type="number" value={iabBasis} onChange={(e) => setIabBasis(Number(e.target.value) || 0)} className="mt-2" />
          <div className="mt-5 space-y-2 text-sm">
            <Row label="IAB-Vorab-Abzug (50 %)" value={`${iab.toLocaleString("de-DE")} €`} />
            <Row label="Steuer-Ersparnis heute" value={`${Math.round(iabSteuer).toLocaleString("de-DE")} €`} highlight />
            <p className="text-[11px] text-muted-foreground pt-2">
              Max. 200.000 € pro Betrieb. Voraussetzungen: Gewinn &lt; 200k €/Jahr (für Einzel/PersGes) oder Bilanzsumme &lt; 235k € (KapGes). Wird die Investition nicht binnen 3 Jahren getätigt: rückwirkend auflösen + Verzinsung.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="h-5 w-5 text-accent-blue" />
            <h2 className="font-bold">Quartals-Schätzung</h2>
          </div>

          {/* Brutto/Netto-Toggle (bei Kleinunternehmer keine USt → ausgeblendet) */}
          {!istKU && (
            <div className="flex gap-1 mb-3 p-1 rounded-lg bg-secondary">
              <button
                onClick={() => setEingabeBrutto(false)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  !eingabeBrutto ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >Netto</button>
              <button
                onClick={() => setEingabeBrutto(true)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  eingabeBrutto ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >Brutto (inkl. 19 %)</button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Umsatz Q ({istKU ? "€" : eingabeBrutto ? "brutto" : "netto"})
              </Label>
              <Input type="number" value={umsatz} onChange={(e) => setUmsatz(Number(e.target.value) || 0)} className="mt-2" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Kosten Q ({istKU ? "€" : eingabeBrutto ? "brutto" : "netto"})
              </Label>
              <Input type="number" value={kosten} onChange={(e) => setKosten(Number(e.target.value) || 0)} className="mt-2" />
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            {!istKU && eingabeBrutto && (
              <>
                <Row label="Netto-Umsatz" value={`${umsatzNetto.toLocaleString("de-DE")} €`} />
                <Row label="Netto-Kosten" value={`${kostenNetto.toLocaleString("de-DE")} €`} />
                <Row label="USt-Schuld (ca.)" value={`${ustVerbindlichkeit.toLocaleString("de-DE")} €`} />
              </>
            )}
            <Row label="Gewinn (netto)" value={`${gewinn.toLocaleString("de-DE")} €`} />
            <Row label={`Steuer-Rücklage (${(steuersatz * 100).toFixed(0)} %)`} value={`${Math.round(ruecklage).toLocaleString("de-DE")} €`} highlight />
          </div>
        </div>
      </div>

      {/* Amazon-Buchhaltung-Hinweis */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-accent-blue text-primary-foreground p-2 shrink-0">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold mb-1">Amazon-Verkäufer mit PayJoe oder Taxdoo?</div>
            <div className="text-sm text-muted-foreground leading-relaxed mb-3">
              Amazon-FBA-Buchhaltung ist Spezialthema – die meisten Steuerberater kennen die FBA-Spezifika nicht (Lagerumlagerungen zwischen EU-Lagern, OSS vs. lokale Registrierung, VCS-Reports, Auszahlungs-Splits, MwSt.-Trennung pro Marktplatz, B2B-Reverse-Charge). Wir helfen bei:
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 mb-3 list-disc pl-5">
              <li>Korrekter Verbuchung von Amazon-Auszahlungen (PayJoe / Taxdoo / Amainvoice)</li>
              <li>OSS-Setup vs. lokale UStID in EU-Lagerländern (PL, CZ, IT, ES, FR)</li>
              <li>Stock-Movement-Verbuchung (Sachspende vs. Lagerumlagerung)</li>
              <li>Integration mit lexoffice / sevDesk / DATEV (DATEV-Export aus PayJoe)</li>
              <li>Empfehlungen für FBA-erfahrene StB in deinem Bundesland</li>
            </ul>
            <div className="rounded-xl bg-accent-blue/10 border border-accent-blue/30 p-3 mb-3 text-xs leading-relaxed">
              <span className="font-semibold">Neu:</span> Komplette Liste aller PayJoe/Lexoffice
              Amazon-Buchungstexte (AMA-SG-DE, AMA-BG-IT, AUSZ-DE, MZNFS, FBAFees etc.) mit SKR03/04-Konto,
              USt-Behandlung und Live-Lookup-Tool.
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/cockpit/amazon-buchungen" className="rounded-full bg-accent-blue text-primary-foreground px-4 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity">
                Buchungs-Codes nachschlagen →
              </Link>
              <Link to="/felix" className="rounded-full border border-accent-blue/40 text-accent-blue px-4 py-1.5 text-xs font-semibold hover:bg-accent-blue/10 transition-colors">
                Felix fragen →
              </Link>
              <Link to="/kontakt" className="rounded-full border border-border text-foreground px-4 py-1.5 text-xs font-semibold hover:bg-secondary/50 transition-colors">
                Setup-Call buchen →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Hinweis: Orientierende Schätzungen, keine Steuerberatung. Final immer mit StB klären.
        Termine 2026 ohne Wochenend-/Feiertags-Verschiebung – fällt ein Termin auf Sa/So/Feiertag, ist der nächste Werktag maßgeblich.
      </div>
    </CockpitShell>
  );
};

const Toggle = ({ checked, onChange, label, help, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; help: string; disabled?: boolean }) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
    className={`text-left rounded-xl border p-3 transition-all ${
      disabled ? "opacity-40 cursor-not-allowed border-border bg-card" :
      checked ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30" : "border-border bg-card hover:border-accent-blue/40"
    }`}
  >
    <div className="flex items-start gap-2">
      <div className={`w-9 h-5 rounded-full transition-colors shrink-0 mt-0.5 ${checked ? "bg-accent-blue" : "bg-secondary"}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mt-0.5 ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{help}</div>
      </div>
    </div>
  </button>
);

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${highlight ? "bg-accent text-accent-foreground" : "bg-secondary/50"}`}>
    <span className="text-muted-foreground">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default SteuerCockpit;
