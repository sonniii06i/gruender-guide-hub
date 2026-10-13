import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { NumberField } from "@/components/ui/number-field";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, PiggyBank, ShoppingCart, Settings2, Sparkles, ArrowRight } from "lucide-react";
import { Callout, ChoiceGroup, EmptyState, Field, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { progressionESt, kstGewstRate, grenzSteuerSatz, SOLZ_RATE, IAB_GEWINN_GRENZE } from "@/lib/germanTax";

type LegalForm = "ein" | "ug" | "gmbh";
type UstMode = "monatlich" | "quartal" | "keine";

interface Setup {
  legalForm: LegalForm;
  ustMode: UstMode;
  dauerfrist: boolean;
  oss: boolean;
  zm: boolean;
  mitarbeiter: boolean;
  /** Lohnsteuer des Vorjahres (bei Neugründung: aufs Jahr hochgerechnete erste Monate) */
  lstVorjahr: number;
}

/** §41a Abs. 2 EStG: Anmeldungszeitraum der Lohnsteuer nach der Vorjahres-Lohnsteuer. */
// eslint-disable-next-line react-refresh/only-export-components
export function lohnsteuerRhythmus(lstVorjahr: number): "monatlich" | "quartal" | "jaehrlich" {
  if (lstVorjahr > 5000) return "monatlich";
  if (lstVorjahr > 1080) return "quartal";
  return "jaehrlich";
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
    // Rhythmus hängt an der Lohnsteuer des Vorjahres (§41a Abs. 2 EStG), nicht an der Umsatzsteuer
    const rhythmus = lohnsteuerRhythmus(s.lstVorjahr);
    if (rhythmus === "jaehrlich") {
      fristen.push({ date: "10.01.", title: "Lohnsteuer-Jahresanmeldung (Folgejahr)", detail: "Vorjahres-Lohnsteuer bis 1.080 € – keine Dauerfrist", category: "lohn" });
    } else if (rhythmus === "monatlich") {
      for (let m = 0; m < 12; m++) {
        const due = (m + 1) % 12;
        fristen.push({
          date: `10.${pad(due + 1)}.`,
          title: `Lohnsteuer-Anmeldung ${MONAT[m]}`,
          detail: "Vorjahres-Lohnsteuer über 5.000 € – keine Dauerfrist",
          category: "lohn",
        });
      }
    } else {
      // Quartalsweise
      fristen.push({ date: "10.04.", title: "Lohnsteuer Q1", detail: "Vorjahres-Lohnsteuer 1.080–5.000 € – keine Dauerfrist", category: "lohn" });
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

const CATEGORY_TONE: Record<Frist["category"], Tone> = {
  ust: "accent",
  lohn: "info",
  kst: "neutral",
  est: "neutral",
  gewst: "warning",
  oss: "info",
  zm: "success",
  stb: "neutral",
  "year-end": "warning",
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
  const [lstVorjahr, setLstVorjahr] = useState(6000);

  const fristen = useMemo(
    () => buildFristen({ legalForm, ustMode, dauerfrist, oss, zm, mitarbeiter, lstVorjahr }),
    [legalForm, ustMode, dauerfrist, oss, zm, mitarbeiter, lstVorjahr],
  );

  // IAB §7g — mit Voraussetzungs-Check
  const [iabBasis, setIabBasis] = useState(80000);
  const [iabGewinnVor, setIabGewinnVor] = useState(150000);
  const [hebesatz, setHebesatz] = useState(400);
  const iabBasisClamped = Math.max(0, iabBasis);
  const iabKapGes = legalForm === "gmbh" || legalForm === "ug";
  // §7g Abs. 1 Satz 2 Nr. 1 EStG (seit JStG 2020): einheitlich Gewinn ≤ 200.000 € für alle Rechtsformen
  const iabEligible = iabGewinnVor <= IAB_GEWINN_GRENZE;
  const iab = iabEligible ? Math.min(iabBasisClamped * 0.5, 200000) : 0;
  const iabKstGewSt = kstGewstRate(hebesatz);
  const iabSteuer = iab * (iabKapGes ? iabKstGewSt : (grenzSteuerSatz(iabGewinnVor - iab / 2) * (1 + SOLZ_RATE)));

  // Quartal: Brutto/Netto + echte Steuerberechnung
  const [eingabeBrutto, setEingabeBrutto] = useState(false);
  const [umsatz, setUmsatz] = useState(60000);
  const [kosten, setKosten] = useState(28000);
  const istKU = ustMode === "keine";
  const umsatzNetto = istKU || !eingabeBrutto ? umsatz : Math.round(umsatz / 1.19);
  const kostenNetto = istKU || !eingabeBrutto ? kosten : Math.round(kosten / 1.19);
  const ustVerbindlichkeit = istKU || !eingabeBrutto ? 0 : Math.round((umsatz - kosten) - (umsatzNetto - kostenNetto));
  const gewinn = Math.max(0, umsatzNetto - kostenNetto);
  // Echte Steuerlast statt Pauschal-30%/35%
  const gewinnHochgerechnet = gewinn * 4; // Q→Jahr-Hochrechnung als Schätzung
  const ruecklage = (() => {
    if (iabKapGes) {
      return gewinn * iabKstGewSt; // KSt+GewSt+SolZ effektiv
    }
    const estJahr = progressionESt(gewinnHochgerechnet) * (1 + SOLZ_RATE);
    const gewStMessbetrag = Math.max(0, gewinnHochgerechnet - 24500) * 0.035;
    const gewStJahr = gewStMessbetrag * (hebesatz / 100);
    // §35 EStG-Anrechnung bis Faktor 4,0
    const anrechnung = Math.min(gewStJahr, gewStMessbetrag * 4.0);
    const totalJahr = estJahr + Math.max(0, gewStJahr - anrechnung);
    return totalJahr / 4; // zurück auf Quartal
  })();
  const steuersatz = gewinn > 0 ? ruecklage / gewinn : 0;

  return (
    <CockpitShell
      eyebrow="DE-Steuer-Cockpit"
      title="Fristen, IAB & Quartals-Schätzung"
      subtitle="Personalisiert auf deine Konstellation: Setup unten wählen, die Fristen aktualisieren sich live."
    >
      <ToolSection title="Dein Setup" icon={Settings2} className="mb-6" description="Rechtsform, USt-Rhythmus und Sonderfälle bestimmen deinen Frist-Kalender.">
        <div className="mb-5 grid gap-5 sm:grid-cols-2">
          <Field label="Rechtsform">
            <ChoiceGroup<LegalForm>
              label="Rechtsform"
              value={legalForm}
              onChange={setLegalForm}
              options={[
                { value: "ein", label: "Einzel" },
                { value: "ug", label: "UG" },
                { value: "gmbh", label: "GmbH" },
              ]}
            />
          </Field>
          <Field label="USt-Voranmeldung">
            <ChoiceGroup<UstMode>
              label="USt-Voranmeldung"
              value={ustMode}
              onChange={setUstMode}
              options={[
                { value: "monatlich", label: "Monatlich" },
                { value: "quartal", label: "Quartal" },
                { value: "keine", label: "Keine (KU)" },
              ]}
            />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
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
            help="Pflicht bei innergemeinschaftlichen B2B-Lieferungen und sonstigen Leistungen. 25. des Folgemonats, keine Dauerfrist."
          />
          <Toggle
            checked={mitarbeiter}
            onChange={setMitarbeiter}
            label="Mitarbeiter beschäftigt"
            help="Aktiviert die Lohnsteuer-Anmeldung. Auch bei Einzelunternehmen relevant; ohne Mitarbeiter keine Lohnsteuer."
          />
          {mitarbeiter && (
            <Field label="Lohnsteuer im Vorjahr (€)" hint="Bei Neugründung: Lohnsteuer des ersten Monats × 12. Über 5.000 € monatlich, über 1.080 € vierteljährlich, sonst jährlich (§41a Abs. 2 EStG).">
              <NumberField value={lstVorjahr} onChange={setLstVorjahr} min={0} aria-label="Lohnsteuer im Vorjahr in Euro" />
            </Field>
          )}
        </div>
      </ToolSection>

      <ToolSection
        title={`Frist-Kalender ${new Date().getFullYear()}`}
        icon={Calendar}
        className="mb-6"
        actions={<span className="text-sm text-muted-foreground tabular">{fristen.length} Termine, nach Datum sortiert</span>}
      >
        {dauerfrist && ustMode !== "keine" && (
          <Callout tone="info" title="Dauerfristverlängerung aktiv" className="mb-4">
            USt-VA-Termine sind um 1 Monat verschoben. Q4 wird also erst am <strong>10.02.</strong> (statt 10.01.) fällig.
            Die Sondervorauszahlung 1/11 wird im Februar fällig.
          </Callout>
        )}

        {fristen.length === 0 ? (
          <EmptyState icon={Calendar} title="Keine Fristen konfiguriert" description="Passe dein Setup oben an." />
        ) : (
          <ol className="divide-y divide-border/70 rounded-xl border border-border">
            {fristen.map((f, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-3 sm:items-center">
                <span className="w-14 shrink-0 text-sm font-semibold text-accent-blue tabular">{f.date}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToneBadge tone={CATEGORY_TONE[f.category]}>{CATEGORY_LABEL[f.category]}</ToneBadge>
                    <span className="text-sm font-medium">{f.title}</span>
                  </div>
                  {f.detail && <p className="mt-0.5 text-xs text-muted-foreground">{f.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </ToolSection>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <ToolSection title="IAB-Rechner" icon={Calculator}>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Investitionsabzugsbetrag (§ 7g EStG):</strong> Du kannst bis zu 50 % einer geplanten Investition (binnen 3 Jahren) <em>vorab</em> als Betriebsausgabe ansetzen und damit deinen aktuellen Gewinn (und Steuerlast) reduzieren. Sinnvoll z.&nbsp;B. für geplante Geschäftsfahrzeuge, Maschinen, Lager-Equipment oder IT-Hardware.
          </p>
          <div className="space-y-4">
            <Field label="Geplante Investition in 3 Jahren (€)">
              <NumberField value={iabBasis} onChange={setIabBasis} min={0} aria-label="Geplante Investition in Euro" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Gewinn vor IAB (€/Jahr)">
                <NumberField value={iabGewinnVor} onChange={setIabGewinnVor} min={0} aria-label="Gewinn vor IAB in Euro pro Jahr" />
              </Field>
              <Field label="GewSt-Hebesatz (%)">
                <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
              </Field>
            </div>
          </div>

          {!iabEligible && (
            <Callout tone="warning" title="IAB nicht möglich" className="mt-4">
              {`Gewinn ${iabGewinnVor.toLocaleString("de-DE")} € > 200.000 €`}
            </Callout>
          )}

          <div className="mt-5 space-y-2 text-sm">
            <Row label="IAB-Vorab-Abzug (50 %)" value={`${iab.toLocaleString("de-DE")} €`} />
            <Row label="Steuer-Ersparnis heute" value={`${Math.round(iabSteuer).toLocaleString("de-DE")} €`} highlight />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Max. 200.000 € pro Betrieb. Voraussetzung 2026: Gewinn vor IAB ≤ 200.000 €/Jahr, für alle Rechtsformen gleich (die Bilanzsummen-Grenze ist seit dem JStG 2020 abgeschafft). Bei Nicht-Investition binnen 3 Jahren: rückwirkende Auflösung + Nachzahlungszinsen 0,15 % pro Monat (1,8 % p.a., §233a i. V. m. §238 Abs. 1 AO).
          </p>
        </ToolSection>

        <ToolSection title="Quartals-Schätzung" icon={PiggyBank}>
          {/* Brutto/Netto-Umschalter (bei Kleinunternehmer keine USt, daher ausgeblendet) */}
          {!istKU && (
            <Field label="Eingabe" className="mb-4">
              <ChoiceGroup<boolean>
                label="Eingabe netto oder brutto"
                size="sm"
                value={eingabeBrutto}
                onChange={setEingabeBrutto}
                options={[
                  { value: false, label: "Netto" },
                  { value: true, label: "Brutto (inkl. 19 %)" },
                ]}
              />
            </Field>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Umsatz im Quartal (${istKU ? "€" : eingabeBrutto ? "brutto" : "netto"})`}>
              <NumberField value={umsatz} onChange={setUmsatz} min={0} aria-label="Umsatz im Quartal in Euro" />
            </Field>
            <Field label={`Kosten im Quartal (${istKU ? "€" : eingabeBrutto ? "brutto" : "netto"})`}>
              <NumberField value={kosten} onChange={setKosten} min={0} aria-label="Kosten im Quartal in Euro" />
            </Field>
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
        </ToolSection>
      </div>

      <ToolSection
        title="Amazon-Verkäufer mit PayJoe oder Taxdoo?"
        icon={ShoppingCart}
        className="mb-6"
        description="Amazon-FBA-Buchhaltung ist ein Spezialthema: Die meisten Steuerberater kennen die FBA-Spezifika nicht (Lagerumlagerungen zwischen EU-Lagern, OSS vs. lokale Registrierung, VCS-Reports, Auszahlungs-Splits, MwSt.-Trennung pro Marktplatz, B2B-Reverse-Charge)."
      >
        <p className="mb-2 text-sm font-medium">Wir helfen bei:</p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Korrekter Verbuchung von Amazon-Auszahlungen (PayJoe / Taxdoo / Amainvoice)</li>
          <li>OSS-Setup vs. lokale UStID in EU-Lagerländern (PL, CZ, IT, ES, FR)</li>
          <li>Stock-Movement-Verbuchung (Sachspende vs. Lagerumlagerung)</li>
          <li>Integration mit lexoffice / sevDesk / DATEV (DATEV-Export aus PayJoe)</li>
          <li>Empfehlungen für FBA-erfahrene StB in deinem Bundesland</li>
        </ul>
        <Callout tone="accent" icon={Sparkles} className="mb-4">
          <span className="font-semibold text-foreground">Neu:</span> Komplette Liste aller PayJoe/Lexoffice
          Amazon-Buchungstexte (AMA-SG-DE, AMA-BG-IT, AUSZ-DE, MZNFS, FBAFees etc.) mit SKR03/04-Konto,
          USt-Behandlung und Live-Lookup-Tool.
        </Callout>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to="/cockpit/amazon-buchungen">
              Buchungs-Codes nachschlagen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/felix">Felix fragen</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/kontakt">Setup-Call buchen</Link>
          </Button>
        </div>
      </ToolSection>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Hinweis: Orientierende Schätzungen, keine Steuerberatung. Final immer mit StB klären.
        Termine 2026 ohne Wochenend- und Feiertagsverschiebung: Fällt ein Termin auf Sa/So/Feiertag, ist der nächste Werktag maßgeblich.
      </p>
    </CockpitShell>
  );
};

const Toggle = ({ checked, onChange, label, help, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; help: string; disabled?: boolean }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
    className={`rounded-xl border p-3.5 text-left transition-colors ${
      disabled ? "cursor-not-allowed border-border bg-card opacity-50" :
      checked ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25"
    }`}
  >
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`} aria-hidden="true">
        <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{help}</span>
      </span>
    </div>
  </button>
);

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${highlight ? "border border-accent-blue/20 bg-accent" : "bg-secondary/60"}`}>
    <span className={highlight ? "font-medium text-foreground" : "text-muted-foreground"}>{label}</span>
    <span className={`font-semibold tabular ${highlight ? "text-accent-blue" : ""}`}>{value}</span>
  </div>
);

export default SteuerCockpit;
