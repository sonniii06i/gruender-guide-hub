import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { NumberField } from "@/components/ui/number-field";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, PiggyBank, ShoppingCart, Settings2, Sparkles, ArrowRight, CalendarClock, TrendingDown } from "lucide-react";
import { Callout, ChoiceGroup, EmptyState, Field, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { kstGewstRate, IAB_GEWINN_GRENZE } from "@/lib/germanTax";
import { einzelSteuer } from "@/lib/einzelSteuer";
import { cn } from "@/lib/utils";

type LegalForm = "ein" | "ug" | "gmbh";
type UstMode = "monatlich" | "quartal" | "keine";

interface Setup {
  legalForm: LegalForm;
  ustMode: UstMode;
  dauerfrist: boolean;
  oss: boolean;
  zm: boolean;
  zmMonatlich: boolean;
  mitarbeiter: boolean;
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
  day: string;
  monthIdx: number; // 0..11
  title: string;
  detail?: string;
  category: "ust" | "lohn" | "kst" | "est" | "gewst" | "oss" | "zm" | "stb" | "year-end";
}

const pad = (n: number) => String(n).padStart(2, "0");
const MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const MONAT_KURZ = ["JAN", "FEB", "MÄR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"];

const mkFrist = (
  day: number,
  monthIdx: number,
  title: string,
  category: Frist["category"],
  detail?: string,
): Frist => ({
  date: `${pad(day)}.${pad(monthIdx + 1)}.`,
  day: pad(day),
  monthIdx,
  title,
  detail,
  category,
});

/** Berechnet alle Steuer-Fristen aus Setup. Termine 2026-konform. */
function buildFristen(s: Setup): Frist[] {
  const fristen: Frist[] = [];

  if (s.ustMode !== "keine") {
    const dfOffset = s.dauerfrist ? 1 : 0;
    if (s.ustMode === "monatlich") {
      for (let m = 0; m < 12; m++) {
        const due = (m + 1 + dfOffset) % 12;
        const yearMark = m + 1 + dfOffset >= 12 ? " (Folgejahr)" : "";
        fristen.push(
          mkFrist(
            10,
            due,
            `USt-VA ${MONAT[m]}${yearMark}`,
            "ust",
            s.dauerfrist ? "Mit Dauerfristverlängerung (+1 Monat)" : undefined,
          ),
        );
      }
    } else {
      const quartals = [
        { end: 2, label: "Q1 (Jan bis Mär)" },
        { end: 5, label: "Q2 (Apr bis Jun)" },
        { end: 8, label: "Q3 (Jul bis Sep)" },
        { end: 11, label: "Q4 (Okt bis Dez)" },
      ];
      for (const q of quartals) {
        const due = (q.end + 1 + dfOffset) % 12;
        const yearMark = q.end + 1 + dfOffset >= 12 ? " (Folgejahr)" : "";
        fristen.push(
          mkFrist(
            10,
            due,
            `USt-VA ${q.label}${yearMark}`,
            "ust",
            s.dauerfrist ? "Mit Dauerfristverlängerung (+1 Monat)" : undefined,
          ),
        );
      }
    }
  }

  if (s.zm) {
    if (s.zmMonatlich) {
      for (let m = 0; m < 12; m++) {
        const due = (m + 1) % 12;
        fristen.push(mkFrist(25, due, `ZM ${MONAT[m]}`, "zm", "Zusammenfassende Meldung, keine Dauerfrist"));
      }
    } else {
      fristen.push(mkFrist(25, 3, "ZM Q1", "zm", "Zusammenfassende Meldung, keine Dauerfrist"));
      fristen.push(mkFrist(25, 6, "ZM Q2", "zm", "Zusammenfassende Meldung, keine Dauerfrist"));
      fristen.push(mkFrist(25, 9, "ZM Q3", "zm", "Zusammenfassende Meldung, keine Dauerfrist"));
      fristen.push(mkFrist(25, 0, "ZM Q4 (Folgejahr)", "zm", "Zusammenfassende Meldung, keine Dauerfrist"));
    }
  }

  if (s.oss) {
    fristen.push(mkFrist(30, 3, "OSS-Meldung Q1", "oss", "Fernverkäufe + B2C-Leistungen EU, keine Dauerfrist"));
    fristen.push(mkFrist(31, 6, "OSS-Meldung Q2", "oss", "Fernverkäufe + B2C-Leistungen EU, keine Dauerfrist"));
    fristen.push(mkFrist(31, 9, "OSS-Meldung Q3", "oss", "Fernverkäufe + B2C-Leistungen EU, keine Dauerfrist"));
    fristen.push(mkFrist(31, 0, "OSS-Meldung Q4 (Folgejahr)", "oss", "Fernverkäufe + B2C-Leistungen EU, keine Dauerfrist"));
  }

  if (s.mitarbeiter) {
    const rhythmus = lohnsteuerRhythmus(s.lstVorjahr);
    if (rhythmus === "jaehrlich") {
      fristen.push(mkFrist(10, 0, "Lohnsteuer-Jahresanmeldung (Folgejahr)", "lohn", "Vorjahres-Lohnsteuer bis 1.080 €, keine Dauerfrist"));
    } else if (rhythmus === "monatlich") {
      for (let m = 0; m < 12; m++) {
        const due = (m + 1) % 12;
        fristen.push(mkFrist(10, due, `Lohnsteuer-Anmeldung ${MONAT[m]}`, "lohn", "Vorjahres-Lohnsteuer über 5.000 €, keine Dauerfrist"));
      }
    } else {
      fristen.push(mkFrist(10, 3, "Lohnsteuer Q1", "lohn", "Vorjahres-Lohnsteuer 1.080 bis 5.000 €, keine Dauerfrist"));
      fristen.push(mkFrist(10, 6, "Lohnsteuer Q2", "lohn"));
      fristen.push(mkFrist(10, 9, "Lohnsteuer Q3", "lohn"));
      fristen.push(mkFrist(10, 0, "Lohnsteuer Q4 (Folgejahr)", "lohn"));
    }
  }

  if (s.legalForm === "gmbh" || s.legalForm === "ug") {
    fristen.push(mkFrist(10, 2, "KSt-Vorauszahlung Q1", "kst"));
    fristen.push(mkFrist(10, 5, "KSt-Vorauszahlung Q2", "kst"));
    fristen.push(mkFrist(10, 8, "KSt-Vorauszahlung Q3", "kst"));
    fristen.push(mkFrist(10, 11, "KSt-Vorauszahlung Q4", "kst"));
  }

  if (s.legalForm === "ein") {
    fristen.push(mkFrist(10, 2, "ESt-Vorauszahlung Q1", "est"));
    fristen.push(mkFrist(10, 5, "ESt-Vorauszahlung Q2", "est"));
    fristen.push(mkFrist(10, 8, "ESt-Vorauszahlung Q3", "est"));
    fristen.push(mkFrist(10, 11, "ESt-Vorauszahlung Q4", "est"));
  }

  fristen.push(mkFrist(15, 1, "Gewerbesteuer-VZ Q1", "gewst"));
  fristen.push(mkFrist(15, 4, "Gewerbesteuer-VZ Q2", "gewst"));
  fristen.push(mkFrist(15, 7, "Gewerbesteuer-VZ Q3", "gewst"));
  fristen.push(mkFrist(15, 10, "Gewerbesteuer-VZ Q4", "gewst"));

  fristen.push(mkFrist(31, 6, "Steuererklärung Vorjahr (ohne StB)", "stb", "Mit StB: 28.02. übernächstes Jahr"));
  fristen.push(
    mkFrist(
      31,
      11,
      "Pre-Year-End: Investitionen, Rückstellungen, Gewinnverlagerung",
      "year-end",
      "Steuer-Reduktion durch IAB, Bonuszahlungen, Vorauszahlungen",
    ),
  );

  return fristen.sort((a, b) => {
    if (a.monthIdx !== b.monthIdx) return a.monthIdx - b.monthIdx;
    return parseInt(a.day, 10) - parseInt(b.day, 10);
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
  const [zmMonatlich, setZmMonatlich] = useState(false);
  const [mitarbeiter, setMitarbeiter] = useState(false);
  const [lstVorjahr, setLstVorjahr] = useState(6000);
  const [katFilter, setKatFilter] = useState<string>("alle");

  const fristen = useMemo(
    () => buildFristen({ legalForm, ustMode, dauerfrist, oss, zm, zmMonatlich, mitarbeiter, lstVorjahr }),
    [legalForm, ustMode, dauerfrist, oss, zm, zmMonatlich, mitarbeiter, lstVorjahr],
  );

  // Nächste anstehende Frist ab heute ermitteln
  const naechsteFrist = useMemo(() => {
    if (!fristen.length) return null;
    const now = new Date();
    const curMonth = now.getMonth();
    const curDay = now.getDate();
    return (
      fristen.find((f) => f.monthIdx > curMonth || (f.monthIdx === curMonth && parseInt(f.day, 10) >= curDay)) ??
      fristen[0]
    );
  }, [fristen]);

  const sichtbareFristen = useMemo(
    () => (katFilter === "alle" ? fristen : fristen.filter((f) => f.category === katFilter)),
    [fristen, katFilter],
  );

  // IAB §7g
  const [iabBasis, setIabBasis] = useState(80000);
  const [iabGewinnVor, setIabGewinnVor] = useState(150000);
  const [hebesatz, setHebesatz] = useState(400);
  const iabBasisClamped = Math.max(0, iabBasis);
  const iabKapGes = legalForm === "gmbh" || legalForm === "ug";
  const iabEligible = iabGewinnVor <= IAB_GEWINN_GRENZE;
  const iab = iabEligible ? Math.min(iabBasisClamped * 0.5, 200000) : 0;
  const iabKstGewSt = kstGewstRate(hebesatz);
  const iabSteuer = iabKapGes
    ? iab * iabKstGewSt
    : einzelSteuer({ gewinn: iabGewinnVor, hebesatz, gewerbe: true }).total -
      einzelSteuer({ gewinn: iabGewinnVor - iab, hebesatz, gewerbe: true }).total;

  // Quartal
  const [eingabeBrutto, setEingabeBrutto] = useState(false);
  const [umsatz, setUmsatz] = useState(60000);
  const [kosten, setKosten] = useState(28000);
  const istKU = ustMode === "keine";
  const umsatzNetto = istKU || !eingabeBrutto ? umsatz : Math.round(umsatz / 1.19);
  const kostenNetto = istKU || !eingabeBrutto ? kosten : Math.round(kosten / 1.19);
  const ustVerbindlichkeit = istKU || !eingabeBrutto ? 0 : Math.round((umsatz - kosten) - (umsatzNetto - kostenNetto));
  const gewinn = Math.max(0, umsatzNetto - kostenNetto);
  const gewinnHochgerechnet = gewinn * 4;
  const ruecklage = (() => {
    if (iabKapGes) return gewinn * iabKstGewSt;
    return einzelSteuer({ gewinn: gewinnHochgerechnet, hebesatz, gewerbe: true }).total / 4;
  })();
  const steuersatz = gewinn > 0 ? ruecklage / gewinn : 0;
  const verbleibend = Math.max(0, gewinn - ruecklage);
  const ruecklagePct = gewinn > 0 ? Math.min(100, Math.round((ruecklage / gewinn) * 100)) : 0;

  return (
    <CockpitShell
      eyebrow="Steuern & Fristen"
      title="Steuer-Cockpit"
      subtitle="Deine Fristen, geschätzte Quartals-Rücklage und IAB-Steuerersparnis auf einen Blick. Alles reagiert live auf dein Setup."
      tabs={[
        { label: "Steuer-Cockpit", to: "/cockpit/steuer" },
        { label: "Steuerkalender", to: "/cockpit/steuerkalender" },
        { label: "USt-Voranmeldung", to: "/cockpit/ust-voranmeldung" },
        { label: "Anlage EÜR", to: "/cockpit/anlage-euer" },
        { label: "Neu ab 2027", to: "/cockpit/aktuell" },
      ]}
      actions={
        <Button asChild size="sm" variant="outline" className="rounded-xl bg-white font-semibold">
          <Link to="/cockpit/steuerkalender">
            <Calendar className="mr-1.5 h-4 w-4 text-primary" aria-hidden="true" />
            Als Kalender (.ics) exportieren
          </Link>
        </Button>
      }
    >
      {/* Revolut × Lexoffice Top-KPI-Leiste */}
      <section aria-label="Steuer-Überblick" className="mb-6 grid gap-3.5 md:grid-cols-3">
        <div className="rounded-2xl border border-primary bg-primary p-5 text-white shadow-soft">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-green-glow">Nächste Frist</p>
            <CalendarClock className="h-4 w-4 text-white/75" aria-hidden="true" />
          </div>
          {naechsteFrist ? (
            <>
              <p className="mt-2 text-2xl font-bold tracking-tight tabular">{naechsteFrist.date}</p>
              <p className="mt-1 truncate text-sm font-medium text-white/90">{naechsteFrist.title}</p>
              <p className="mt-2 text-xs text-white/70 tabular">{fristen.length} Termine im Jahr für dein Setup</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-white/80">Keine Fristen konfiguriert</p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quartals-Rücklage</p>
            <PiggyBank className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-primary tabular">
            {Math.round(ruecklage).toLocaleString("de-DE")} €
          </p>
          <p className="mt-1 text-xs text-muted-foreground tabular">
            ca. {(steuersatz * 100).toFixed(0)} % auf {gewinn.toLocaleString("de-DE")} € Quartalsgewinn
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${ruecklagePct}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">IAB-Steuerersparnis (§ 7g)</p>
            <TrendingDown className="h-4 w-4 text-brand-green" aria-hidden="true" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-brand-green tabular">
            {iabEligible ? `${Math.round(iabSteuer).toLocaleString("de-DE")} €` : "0 €"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground tabular">
            {iabEligible
              ? `bei ${iab.toLocaleString("de-DE")} € Vorab-Abzug (50 %)`
              : `Gewinn über 200.000 € Grenze`}
          </p>
          <Link to="/cockpit/iab-rechner" className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline">
            Detail-IAB-Rechner <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ToolSection title="Dein Steuer-Setup" icon={Settings2} className="mb-6" description="Rechtsform, USt-Rhythmus und Sonderfälle passen Fristen und Schätzung sofort an.">
        <div className="mb-5 grid gap-5 sm:grid-cols-2">
          <Field label="Rechtsform">
            <ChoiceGroup<LegalForm>
              label="Rechtsform"
              value={legalForm}
              onChange={setLegalForm}
              options={[
                { value: "ein", label: "Einzelunternehmen" },
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
            help="USt-VA-Frist verschiebt sich um 1 Monat. Bei monatlicher Abgabe 1/11-Sondervorauszahlung (fällig 10.02.)."
            disabled={ustMode === "keine"}
          />
          <Toggle
            checked={oss}
            onChange={setOss}
            label="OSS-Verfahren (EU-B2C)"
            help="One-Stop-Shop für Fernverkäufe in andere EU-Länder. Quartals-Meldung zum Monatsende."
          />
          <Toggle
            checked={zm}
            onChange={setZm}
            label="Zusammenfassende Meldung (ZM)"
            help="Pflicht bei innergemeinschaftlichen B2B-Leistungen. Bis zum 25. nach Meldezeitraum, keine Dauerfrist."
          />
          {zm && (
            <Toggle
              checked={zmMonatlich}
              onChange={setZmMonatlich}
              label="ZM monatlich (> 50.000 €/Quartal)"
              help="Monatlich bei innergemeinschaftlichen Warenlieferungen über 50.000 € im Quartal (§ 18a Abs. 1 UStG)."
            />
          )}
          <Toggle
            checked={mitarbeiter}
            onChange={setMitarbeiter}
            label="Mitarbeiter beschäftigt"
            help="Aktiviert die Lohnsteuer-Anmeldung je nach Vorjahres-Lohnsteuer (§ 41a Abs. 2 EStG)."
          />
          {mitarbeiter && (
            <Field label="Lohnsteuer im Vorjahr" hint="Über 5.000 € monatlich, über 1.080 € quartalsweise, sonst jährlich.">
              <NumberField value={lstVorjahr} onChange={setLstVorjahr} min={0} suffix="€" aria-label="Lohnsteuer im Vorjahr in Euro" />
            </Field>
          )}
        </div>
      </ToolSection>

      {/* Frist-Kalender im Revolut-Timeline-Stil */}
      <ToolSection
        title={`Frist-Kalender ${new Date().getFullYear()}`}
        icon={Calendar}
        className="mb-6"
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "alle", label: `Alle (${fristen.length})` },
              { id: "ust", label: "USt" },
              { id: "gewst", label: "GewSt" },
              { id: iabKapGes ? "kst" : "est", label: iabKapGes ? "KSt" : "ESt" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={katFilter === tab.id}
                onClick={() => setKatFilter(tab.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                  katFilter === tab.id
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground ring-1 ring-border hover:text-primary",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        }
      >
        {dauerfrist && ustMode !== "keine" && (
          <Callout tone="info" title="Dauerfristverlängerung aktiv" className="mb-4">
            USt-VA-Termine sind um 1 Monat verschoben.
            {ustMode === "quartal" && <> Q4 wird also erst am <strong>10.02.</strong> (statt 10.01.) fällig.</>}
            {ustMode === "monatlich" && <> Die Sondervorauszahlung 1/11 wird am <strong>10.02.</strong> fällig.</>}
          </Callout>
        )}

        {sichtbareFristen.length === 0 ? (
          <EmptyState icon={Calendar} title="Keine Fristen in diesem Filter" description="Wähle oben „Alle“ oder passe dein Setup an." />
        ) : (
          <ol className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border bg-white">
            {sichtbareFristen.map((f, i) => (
              <li key={`${f.date}-${f.title}-${i}`} className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-secondary/30">
                <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-[#F8FAFC] py-1.5 text-center">
                  <span className="text-[10px] font-bold tracking-wider text-muted-foreground">{MONAT_KURZ[f.monthIdx]}</span>
                  <span className="text-base font-bold leading-tight text-primary tabular">{f.day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{f.title}</span>
                    <span className="text-xs font-medium text-muted-foreground tabular">({f.date})</span>
                  </div>
                  {f.detail && <p className="mt-0.5 text-xs text-muted-foreground">{f.detail}</p>}
                </div>
                <ToneBadge tone={CATEGORY_TONE[f.category]} className="shrink-0">
                  {CATEGORY_LABEL[f.category]}
                </ToneBadge>
              </li>
            ))}
          </ol>
        )}
      </ToolSection>

      {/* Quartals-Schätzung & IAB nebeneinander */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <ToolSection title="Quartals-Schätzung" icon={PiggyBank}>
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
            <Field label={`Umsatz im Quartal (${istKU ? "netto" : eingabeBrutto ? "brutto" : "netto"})`}>
              <NumberField value={umsatz} onChange={setUmsatz} min={0} suffix="€" aria-label="Umsatz im Quartal in Euro" />
            </Field>
            <Field label={`Kosten im Quartal (${istKU ? "netto" : eingabeBrutto ? "brutto" : "netto"})`}>
              <NumberField value={kosten} onChange={setKosten} min={0} suffix="€" aria-label="Kosten im Quartal in Euro" />
            </Field>
          </div>

          {/* Visuelle Aufteilung */}
          {gewinn > 0 && (
            <div className="mt-5 rounded-xl border border-border bg-[#F8FAFC] p-3.5">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold tabular">
                <span className="text-brand-green">Bleibt nach Steuern: {Math.round(verbleibend).toLocaleString("de-DE")} €</span>
                <span className="text-primary">Rücklage: {ruecklagePct} %</span>
              </div>
              <div className="flex h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="bg-brand-green transition-[width] duration-300" style={{ width: `${100 - ruecklagePct}%` }} />
                <div className="bg-primary transition-[width] duration-300" style={{ width: `${ruecklagePct}%` }} />
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2 text-sm">
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

        <ToolSection title="IAB-Rechner (§ 7g EStG)" icon={Calculator}>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Bis zu 50 % einer geplanten Investition (binnen 3 Jahren) vorab als Betriebsausgabe ansetzen und aktuelle
            Steuerlast senken.
          </p>
          <div className="space-y-4">
            <Field label="Geplante Investition in 3 Jahren">
              <NumberField value={iabBasis} onChange={setIabBasis} min={0} suffix="€" aria-label="Geplante Investition in Euro" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Gewinn vor IAB (pro Jahr)">
                <NumberField value={iabGewinnVor} onChange={setIabGewinnVor} min={0} suffix="€" aria-label="Gewinn vor IAB in Euro pro Jahr" />
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
            Max. 200.000 € pro Betrieb. Voraussetzung 2026: Gewinn vor IAB ≤ 200.000 €/Jahr. Bei Nicht-Investition
            binnen 3 Jahren: rückwirkende Auflösung + Zinsen 0,15 %/Monat (§ 233a AO).
          </p>
        </ToolSection>
      </div>

      <ToolSection
        title="Amazon-Verkäufer mit PayJoe oder Taxdoo?"
        icon={ShoppingCart}
        className="mb-6"
        description="Amazon-FBA-Buchhaltung hat eigene Spielregeln: EU-Lagerumlagerungen, OSS vs. lokale USt-ID, Auszahlungs-Splits und B2B-Reverse-Charge."
      >
        <Callout tone="accent" icon={Sparkles} className="mb-4">
          <span className="font-semibold text-foreground">Live-Lookup:</span> Komplette Liste aller PayJoe-/Lexware-Office
          Amazon-Buchungstexte (AMA-SG-DE, AMA-BG-IT, AUSZ-DE, MZNFS, FBAFees etc.) mit SKR03/04-Konto und USt-Behandlung.
        </Callout>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" className="rounded-xl">
            <Link to="/cockpit/amazon-buchungen">
              Buchungs-Codes nachschlagen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-xl">
            <Link to="/felix">Felix fragen</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-xl">
            <Link to="/cockpit/stb-finder">StB-Finder</Link>
          </Button>
        </div>
      </ToolSection>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Hinweis: Orientierende Schätzungen, keine Steuerberatung. Termine 2026 ohne Wochenend- und Feiertagsverschiebung:
        Für feiertagsgenaue Termine samt .ics-Kalender-Export nutze den{" "}
        <Link to="/cockpit/steuerkalender" className="font-semibold text-accent-blue hover:underline">
          Steuerkalender
        </Link>
        .
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
    className={cn(
      "rounded-xl border p-3.5 text-left transition-colors",
      disabled
        ? "cursor-not-allowed border-border bg-white opacity-50"
        : checked
          ? "border-primary/40 bg-accent/50"
          : "border-border bg-white hover:border-primary/30",
    )}
  >
    <div className="flex items-start gap-3">
      <span className={cn("mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full transition-colors", checked ? "bg-primary" : "bg-border")} aria-hidden="true">
        <span className={cn("h-4 w-4 rounded-full bg-white shadow transition-transform", checked ? "translate-x-[18px]" : "translate-x-0.5")} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{help}</span>
      </span>
    </div>
  </button>
);

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className={cn("flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5", highlight ? "border border-primary/20 bg-accent/60" : "bg-secondary/50")}>
    <span className={highlight ? "font-semibold text-primary" : "text-muted-foreground"}>{label}</span>
    <span className={cn("font-bold tabular", highlight ? "text-primary" : "text-foreground")}>{value}</span>
  </div>
);

export default SteuerCockpit;
