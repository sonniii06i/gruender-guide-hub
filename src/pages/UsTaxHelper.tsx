import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import {
  Flag,
  CalendarClock,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink,
  Info,
  ArrowRight,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Callout,
  ChoiceGroup,
  Field,
  ResultPanel,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
} from "@/components/cockpit/kit";

// ============================================================
// US-TAX-HELPER · Stand Mai 2026
// ============================================================
// Zielgruppe: DE-Gründer mit US-Entity (LLC/Corp) — welche
// US-Bundes-/State-Filings sind Pflicht, Fristen, Strafen,
// und die amtlichen Formulare zum Download.
//
// Wichtige Updates 2026:
// - CTA/BOI: Interim Final Rule (FinCEN, 21.03.2025) nimmt
//   US-INLÄNDISCHE Reporting Companies + US-Personen RAUS.
//   Nur noch AUSLÄNDISCH gegründete, in den USA registrierte
//   Entities müssen BOI melden. Eine in DE-Hand gegründete
//   US-LLC ist eine *domestic* company → BOI-befreit.
// - Form 5472 + pro-forma 1120: unverändert Pflicht für
//   foreign-owned disregarded SMLLC, Strafe weiterhin $25.000.
// - S-Corp bleibt für Non-Resident-Aliens unzulässig.
// ============================================================

type Entity = "smllc" | "mmllc" | "ccorp" | "scorp" | "ussole";
type OwnerType = "foreign" | "usperson";

interface Filing {
  form: string;
  title: string;
  who: string;
  deadline: string;
  penalty?: string;
  star?: boolean;
  doc?: { label: string; url: string };
}

interface Doc {
  form: string;
  label: string;
  url: string;
}

const ENTITIES: { key: Entity; label: string; hint: string }[] = [
  { key: "smllc", label: "Single-Member LLC (foreign-owned)", hint: "1 ausländischer Eigner, disregarded entity — der DACH-Standard." },
  { key: "mmllc", label: "Multi-Member LLC", hint: "≥2 Eigner → wird als Partnership besteuert." },
  { key: "ccorp", label: "C-Corporation", hint: "Inc. / klassische Körperschaft, 21 % Federal." },
  { key: "scorp", label: "S-Corporation", hint: "Pass-through-Körperschaft." },
  { key: "ussole", label: "US-Person / Sole Proprietor", hint: "Du bist US-Citizen/Green-Card/Resident." },
];

// Die zentrale Filing-Matrix je Entity + Eigner-Typ + ECI.
function buildFilings(entity: Entity, owner: OwnerType, eci: boolean): Filing[] {
  const f: Filing[] = [];

  // EIN braucht jede Entity zuerst
  f.push({
    form: "SS-4",
    title: "EIN beantragen (Employer Identification Number)",
    who: "Jede US-Entity — Voraussetzung für alle weiteren Filings & das Bankkonto.",
    deadline: "Einmalig, vor dem ersten Filing.",
    doc: { label: "Form SS-4 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/fss4.pdf" },
    star: true,
  });

  if (entity === "smllc" && owner === "foreign") {
    f.push({
      form: "5472 + 1120 (pro forma)",
      title: "Form 5472 mit pro-forma Form 1120",
      who: "Foreign-owned disregarded SMLLC — IMMER Pflicht, auch bei 0 € Umsatz, sobald es eine 'reportable transaction' gab (z. B. Einlage des Eigners).",
      deadline: "15. April (15. Tag des 4. Monats nach Geschäftsjahresende). +6 Monate mit Form 7004.",
      penalty: "$25.000 pro fehlendem/verspätetem 5472 — die teuerste Falle für DACH-Gründer.",
      doc: { label: "Form 5472 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f5472.pdf" },
      star: true,
    });
  }

  if (entity === "smllc" && owner === "usperson") {
    f.push({
      form: "1040 + Schedule C",
      title: "Einkommen über Schedule C (disregarded → 1040)",
      who: "US-Person mit SMLLC: Gewinn läuft direkt in deine 1040.",
      deadline: "15. April.",
      doc: { label: "Schedule C (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1040sc.pdf" },
      star: true,
    });
  }

  if (entity === "mmllc") {
    f.push({
      form: "1065 + K-1",
      title: "Partnership Return + Schedule K-1 je Gesellschafter",
      who: "Multi-Member LLC = Partnership.",
      deadline: "15. März (15. Tag des 3. Monats). +6 Monate mit Form 7004.",
      penalty: "$245/Monat × Anzahl Gesellschafter für verspätete 1065.",
      doc: { label: "Form 1065 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1065.pdf" },
      star: true,
    });
    if (owner === "foreign") {
      f.push({
        form: "8804 / 8805 / 1446",
        title: "Withholding auf ECI ausländischer Gesellschafter (§1446)",
        who: "Partnership mit ausländischem Partner + US-effektiv-verbundenem Einkommen.",
        deadline: "15. März (mit 1065-Zyklus).",
        doc: { label: "Form 8804 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f8804.pdf" },
      });
    }
  }

  if (entity === "ccorp") {
    f.push({
      form: "1120",
      title: "U.S. Corporation Income Tax Return — 21 % Federal",
      who: "Jede C-Corp.",
      deadline: "15. April. +6 Monate mit Form 7004.",
      penalty: "5 %/Monat der Steuerschuld (max 25 %) bei verspäteter Abgabe.",
      doc: { label: "Form 1120 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1120.pdf" },
      star: true,
    });
    if (owner === "foreign") {
      f.push({
        form: "5472",
        title: "Form 5472 (≥25 % ausländischer Anteil)",
        who: "C-Corp mit ≥25 % ausländischem Gesellschafter — als Anlage zur 1120.",
        deadline: "Mit der 1120 (15. April).",
        penalty: "$25.000 pro fehlendem 5472.",
        doc: { label: "Form 5472 (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f5472.pdf" },
      });
    }
  }

  if (entity === "scorp") {
    f.push({
      form: "1120-S",
      title: "S-Corporation Return",
      who: "S-Corp.",
      deadline: "15. März. +6 Monate mit Form 7004.",
      doc: { label: "Form 1120-S (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1120s.pdf" },
      star: true,
    });
  }

  if (entity === "ussole") {
    f.push({
      form: "1040-ES",
      title: "Quartals-Vorauszahlungen (Estimated Tax)",
      who: "US-Person mit Selbstständigen-Einkommen — vierteljährlich vorauszahlen.",
      deadline: "15. April · 15. Juni · 15. September · 15. Januar.",
      doc: { label: "Form 1040-ES (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1040es.pdf" },
      star: true,
    });
    f.push({
      form: "Schedule SE",
      title: "Self-Employment Tax (15,3 %)",
      who: "Sozialabgaben auf Selbstständigen-Gewinn.",
      deadline: "Mit der 1040 (15. April).",
      doc: { label: "Schedule SE (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1040sse.pdf" },
    });
  }

  // ECI / 1040-NR für ausländische Eigner mit US-Geschäftstätigkeit
  if (owner === "foreign" && eci && (entity === "smllc" || entity === "mmllc")) {
    f.push({
      form: "1040-NR",
      title: "Nonresident Income Tax Return (bei ECI)",
      who: "Du hast 'Effectively Connected Income' (US-Lager im eigenen Namen, US-Mitarbeiter/Agent, US-Büro) → US-Steuerpflicht trotz DE-Wohnsitz.",
      deadline: "15. April (bzw. 15. Juni ohne US-Lohn).",
      doc: { label: "Form 1040-NR (PDF)", url: "https://www.irs.gov/pub/irs-pdf/f1040nr.pdf" },
      star: true,
    });
  }

  // W-8BEN-E: ausländische Entity, die von US-Zahlern Geld bekommt
  if (owner === "foreign") {
    f.push({
      form: "W-8BEN-E",
      title: "W-8BEN-E an deine US-Zahler geben",
      who: "KEIN IRS-Filing, sondern an Kunden/Plattformen (Amazon US, Stripe, Affiliate-Netzwerke) → verhindert/reduziert 30 % Quellensteuer per DBA DE-US.",
      deadline: "Vor der ersten US-Zahlung; alle 3 Jahre erneuern.",
      doc: { label: "Form W-8BEN-E (PDF)", url: "https://www.irs.gov/pub/irs-pdf/fw8bene.pdf" },
      star: true,
    });
  }

  // FBAR / FATCA für US-Personen
  if (owner === "usperson") {
    f.push({
      form: "FinCEN 114 (FBAR)",
      title: "Foreign Bank Account Report",
      who: "US-Person mit ausländischen Konten > $10.000 (Summe, irgendwann im Jahr).",
      deadline: "15. April (autom. Verlängerung bis 15. Oktober).",
      penalty: "Bis $10.000 (non-willful) bzw. 50 % des Kontostands (willful).",
      doc: { label: "BSA E-Filing (FBAR)", url: "https://bsaefiling.fincen.gov/main.html" },
    });
  }

  return f;
}

const STATES: Record<string, { name: string; note: string }> = {
  DE: { name: "Delaware", note: "Franchise Tax LLC $300 flat, fällig 1. Juni · Registered Agent ~$50–300/Jahr · kein State Income Tax bei No-ECI." },
  WY: { name: "Wyoming", note: "Annual Report License Tax min. $60, fällig am 1. des Gründungs-Monats · kein State Income Tax · günstigster Unterhalt." },
  NM: { name: "New Mexico", note: "Kein Annual Report, keine jährliche LLC-Gebühr · sehr wartungsarm." },
  FL: { name: "Florida", note: "Annual Report $138,75, fällig 1. Mai · Strafe $400 bei Verspätung · kein State Income Tax (natürl. Pers.)." },
  WeBuild: { name: "Anderer Staat", note: "Prüfe Franchise/Annual-Report-Pflicht + ggf. State Corporate Income Tax beim Secretary of State." },
};

const UsTaxHelper = () => {
  const [entity, setEntity] = useState<Entity>("smllc");
  const [owner, setOwner] = useState<OwnerType>("foreign");
  const [eci, setEci] = useState(false);
  const [state, setState] = useState<string>("DE");
  const track = useTrackToolEvent("us-tax-helper");

  const filings = useMemo(() => buildFilings(entity, owner, eci), [entity, owner, eci]);

  const allDocs: Doc[] = useMemo(() => {
    const seen = new Set<string>();
    const out: Doc[] = [];
    for (const fi of filings) {
      if (fi.doc && !seen.has(fi.doc.url)) {
        seen.add(fi.doc.url);
        out.push({ form: fi.form, label: fi.doc.label, url: fi.doc.url });
      }
    }
    return out;
  }, [filings]);

  const generatePdf = async () => {
    track("download_checklist");
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    const line = (text: string, opts: { size?: number; bold?: boolean; gap?: number } = {}) => {
      const { size = 10, bold = false, gap = 5 } = opts;
      if (y > 280) { doc.addPage(); y = 20; }
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const wrapped = doc.splitTextToSize(text, 178);
      doc.text(wrapped, 15, y);
      y += wrapped.length * (size * 0.45) + gap;
    };
    line("US-Tax Filing-Checkliste", { size: 18, bold: true, gap: 2 });
    const eLabel = ENTITIES.find((e) => e.key === entity)?.label ?? entity;
    line(`Setup: ${eLabel} · ${owner === "foreign" ? "ausländischer Eigner" : "US-Person"}${eci ? " · ECI (US-Steuerpflicht)" : ""} · ${STATES[state]?.name}`, { size: 9, gap: 8 });
    line("Bundes-Pflichten (IRS)", { size: 13, bold: true, gap: 3 });
    filings.forEach((fi) => {
      line(`[ ] ${fi.form} — ${fi.title}`, { size: 10, bold: true, gap: 1 });
      line(`Wer: ${fi.who}`, { size: 9, gap: 1 });
      line(`Frist: ${fi.deadline}`, { size: 9, gap: 1 });
      if (fi.penalty) line(`Strafe: ${fi.penalty}`, { size: 9, gap: 1 });
      if (fi.doc) line(`Formular: ${fi.doc.url}`, { size: 8, gap: 4 });
    });
    y += 2;
    line("State-Pflichten", { size: 13, bold: true, gap: 3 });
    line(`${STATES[state]?.name}: ${STATES[state]?.note}`, { size: 9, gap: 4 });
    line("Hinweis: keine Steuerberatung. Im Zweifel US-CPA / Enrolled Agent. Stand Mai 2026.", { size: 8, gap: 2 });
    doc.save(`us-tax-checklist-${entity}-${state}.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="US-Tax-Helper"
      title="US-Steuern: welche Abgaben musst du machen?"
      subtitle="Wähle dein US-Setup. Der Helper zeigt dir alle Pflicht-Filings beim IRS und im Bundesstaat, mit Fristen, Strafen und den amtlichen Formularen zum Download. Dazu eine persönliche Filing-Checkliste als PDF."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection title="Dein US-Setup" icon={Flag}>
            <div className="space-y-5">
              <Field label="Entity-Typ">
                <ChoiceGroup<Entity>
                  label="Entity-Typ"
                  value={entity}
                  onChange={(v) => { setEntity(v); track(`entity_${v}`); }}
                  className="grid grid-cols-1 sm:grid-cols-2"
                  options={ENTITIES.map((e) => ({ value: e.key, label: e.label, hint: e.hint }))}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Eigner-Typ">
                  <ChoiceGroup<OwnerType>
                    label="Eigner-Typ"
                    value={owner}
                    onChange={setOwner}
                    className="grid grid-cols-2"
                    options={[
                      { value: "foreign", label: "Ausländisch (DACH)" },
                      { value: "usperson", label: "US-Person" },
                    ]}
                  />
                </Field>
                <Field label="Bundesstaat" htmlFor="ustax-state">
                  <select id="ustax-state" value={state} onChange={(e) => setState(e.target.value)} className={selectCls}>
                    {Object.entries(STATES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                  </select>
                </Field>
              </div>

              {owner === "foreign" && (entity === "smllc" || entity === "mmllc") && (
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition-colors ${
                    eci ? "border-accent-blue/40 bg-accent" : "border-border bg-card hover:border-foreground/25"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={eci}
                    onChange={(e) => setEci(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                  />
                  <span className="leading-relaxed">
                    <span className="block font-medium">Ich habe ECI (Effectively Connected Income)</span>
                    <span className="block text-muted-foreground">
                      US-Lager im eigenen Namen, US-Mitarbeiter/abhängiger Agent oder US-Büro: dann besteht echte
                      US-Einkommensteuerpflicht.
                    </span>
                  </span>
                </label>
              )}
            </div>
          </ToolSection>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Deine Bundes-Pflichten (IRS)"
              title={ENTITIES.find((e) => e.key === entity)?.label}
              value={`${filings.length} Filings`}
              valueHint={`${filings.filter((f) => f.star).length} davon kritisch · State: ${STATES[state]?.name}`}
            >
              <div className="flex flex-wrap gap-1.5">
                {filings.map((fi) => (
                  <span
                    key={fi.form + fi.title}
                    className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-xs text-primary-foreground"
                  >
                    {fi.form}
                  </span>
                ))}
              </div>
              <Button onClick={generatePdf} size="lg" className="mt-5 w-full rounded-xl bg-white text-primary hover:bg-white/90">
                <Download /> Filing-Checkliste als PDF
              </Button>
            </ResultPanel>
            {scorpWarn(entity, owner)}
          </>
        }
      />

      {/* Filing-Matrix */}
      <ToolSection
        title="Deine Bundes-Pflichten (IRS)"
        description="Mit Frist, Strafe und amtlichem Formular"
        icon={CalendarClock}
        className="mb-6"
      >
        <ul className="space-y-3">
          {filings.map((fi) => (
            <li key={fi.form + fi.title} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <span className="w-fit shrink-0 rounded-md bg-secondary px-2 py-1 font-mono text-xs font-semibold">{fi.form}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{fi.title}</p>
                    {fi.star && <ToneBadge tone="warning">kritisch</ToneBadge>}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{fi.who}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Frist:</span> {fi.deadline}
                  </p>
                  {fi.penalty && (
                    <p className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> <span>{fi.penalty}</span>
                    </p>
                  )}
                  {fi.doc && (
                    <a
                      href={fi.doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue underline-offset-4 hover:underline"
                    >
                      <FileText className="h-4 w-4" aria-hidden="true" /> {fi.doc.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ToolSection>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* State */}
        <ToolSection title={`State-Pflichten: ${STATES[state]?.name}`} icon={Info}>
          <p className="text-sm leading-relaxed text-muted-foreground">{STATES[state]?.note}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Sales Tax separat prüfen:</span> Umsatzsteuer-Nexus entsteht unabhängig vom Sitz durch Umsatz-/Transaktions-Schwellen (Wayfair).{" "}
            <Link to="/cockpit/sales-tax-nexus" className="inline-flex items-center gap-1 font-medium text-accent-blue underline-offset-4 hover:underline">
              Sales-Tax-Nexus-Check <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </ToolSection>

        {/* BOI / CTA */}
        <Callout tone="success" title="BOI / Corporate Transparency Act: Entwarnung 2025" className="p-5">
          Seit der <strong>FinCEN Interim Final Rule vom 21.03.2025</strong> sind <strong>US-inländisch gegründete</strong> Reporting Companies (also auch deine in den USA gegründete LLC, egal ob in DACH-Hand) sowie US-Personen von der <strong>BOI-Meldung befreit</strong>. Melden müssen nur noch <em>ausländisch</em> gegründete Entities, die zur Geschäftstätigkeit in einem US-Bundesstaat registriert sind. Für die typische DACH-US-LLC also <strong>keine BOI-Pflicht</strong> mehr.
        </Callout>
      </div>

      {/* Dokumente bereitstellen */}
      <ToolSection
        title="Dokumente und Formulare"
        description="Alle für dein Setup nötigen amtlichen IRS-Formulare, dazu deine persönliche Filing-Checkliste als PDF."
        icon={Download}
        className="mb-6"
        actions={
          <Button onClick={generatePdf}>
            <Download /> Checkliste als PDF
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {allDocs.map((d) => (
            <a
              key={d.url}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-sm transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-card"
            >
              <FileText className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{d.label}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          ))}
        </div>
      </ToolSection>

      {/* Cross-Links */}
      <ToolSection title="Passt dazu" icon={Compass} className="mb-6">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { to: "/cockpit/us-llc-wizard", l: "US-LLC Setup-Wizard (Gründung von A bis Z)" },
            { to: "/cockpit/sales-tax-nexus", l: "Sales-Tax-Nexus-Check (46 Staaten + DC)" },
            { to: "/cockpit/hk-tax-helper", l: "HK-Tax-Helper (Hongkong-Pendant)" },
            { to: "/cockpit/dba-cfc", l: "DBA-CFC-Rechner (Hinzurechnung & Quellensteuer DE)" },
          ].map((x) => (
            <Link
              key={x.to}
              to={x.to}
              className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-accent-blue/40"
            >
              {x.l}
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </ToolSection>

      <Stand2026Footer
        sources={[
          { label: "IRS: Form 5472 (Foreign-owned U.S. DE)", url: "https://www.irs.gov/forms-pubs/about-form-5472" },
          { label: "IRS: Form 1120 / 1065 / 1040-NR", url: "https://www.irs.gov/forms-instructions" },
          { label: "IRS: W-8BEN-E", url: "https://www.irs.gov/forms-pubs/about-form-w-8-ben-e" },
          { label: "FinCEN: BOI Interim Final Rule (21.03.2025)", url: "https://www.fincen.gov/boi" },
          { label: "FinCEN: BSA E-Filing (FBAR)", url: "https://bsaefiling.fincen.gov/main.html" },
        ]}
        note="Keine Steuerberatung. Foreign-owned SMLLC: Form 5472 + pro-forma 1120 weiterhin Pflicht, Strafe $25.000. BOI für US-domestic companies seit 21.03.2025 ausgesetzt. S-Corp für Non-Resident-Aliens unzulässig. Im Zweifel US-CPA / Enrolled Agent. Stand Mai 2026."
      />
    </CockpitShell>
  );
};

// S-Corp-Warnung wenn ausländischer Eigner
function scorpWarn(entity: Entity, owner: OwnerType) {
  if (entity !== "scorp" || owner !== "foreign") return null;
  return (
    <Callout tone="danger" title="S-Corp ist für dich nicht zulässig">
      Eine S-Corporation darf <strong>keine</strong> Non-Resident-Alien-Gesellschafter haben (§1361 IRC). Als DACH-Gründer ohne US-Steueransässigkeit kommt nur C-Corp, LLC oder (als US-Person) S-Corp in Frage. Wähle ein anderes Setup.
    </Callout>
  );
}

export default UsTaxHelper;
