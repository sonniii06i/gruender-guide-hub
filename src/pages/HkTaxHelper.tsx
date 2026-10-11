import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { useTrackToolEvent } from "@/hooks/useTrackToolEvent";
import {
  Building2,
  CalendarClock,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";

// ============================================================
// HK-TAX-HELPER · Stand Mai 2026
// ============================================================
// Welche IRD-Abgaben/Filings muss eine HK-Entity machen:
// Profits Tax (Two-Tier), Profits Tax Return (BIR51/52/54),
// Employer's Return (BIR56A/IR56B), Business Registration,
// + Audit-Pflicht + Annual Return NAR1 (Companies Registry).
//
// Eckdaten 2026:
// - Two-Tier Profits Tax: Körperschaft 8,25 % bis HKD 2M /
//   16,5 % darüber. Unincorporated 7,5 % / 15 %.
// - Territorial: nur HK-Quellen-Gewinn steuerbar (Offshore-Claim).
// - FSIE: passives Auslandseinkommen von MNE-Entities gilt als
//   HK-Quelle, außer Substanz/Beteiligungs-/Nexus-Ausnahme.
// - Erste PTR ~18 Monate nach Gründung. Sonst Chargeability
//   binnen 4 Mon. nach Ende der Basisperiode anzeigen (IR6163).
// - Block-Extension nach Abschlussdatum: N / D / M-Code.
// ============================================================

type Entity = "limited" | "sole" | "partnership" | "nonres";
type AcctDate = "N" | "D" | "M";

interface Filing {
  form: string;
  title: string;
  who: string;
  deadline: string;
  penalty?: string;
  star?: boolean;
  doc?: { label: string; url: string };
}

interface Doc { form: string; label: string; url: string; }

const IRD_PT = "https://www.ird.gov.hk/eng/tax/bus_pft.htm";
const IRD_BR = "https://www.ird.gov.hk/eng/tax/bre.htm";
const IRD_ER = "https://www.ird.gov.hk/eng/tax/ere.htm";
const IRD_EXT = "https://www.ird.gov.hk/eng/ese/bes.htm";
const IRD_56 = "https://www.ird.gov.hk/eng/paf/for.htm";
const CR_NAR1 = "https://www.cr.gov.hk/en/compliance/annual-return/private-company.htm";

const ENTITIES: { key: Entity; label: string; hint: string; rate: string }[] = [
  { key: "limited", label: "HK Limited (Ltd.)", hint: "Private Limited Company — der Standard.", rate: "8,25 % bis HKD 2M / 16,5 % darüber" },
  { key: "sole", label: "Sole Proprietorship", hint: "Einzelunternehmen.", rate: "7,5 % bis HKD 2M / 15 % darüber" },
  { key: "partnership", label: "Partnership", hint: "Personengesellschaft.", rate: "7,5 % bis HKD 2M / 15 % darüber" },
  { key: "nonres", label: "Non-Resident Person", hint: "In HK steuerbares Einkommen ohne HK-Ansässigkeit.", rate: "je nach Konstellation" },
];

const ACCT_DATES: Record<AcctDate, { label: string; ptr: string }> = {
  N: { label: "N-Code · Abschluss 1. Apr – 30. Nov", ptr: "PTR-Frist regulär ~2. Mai (keine Block-Extension)." },
  D: { label: "D-Code · Abschluss 1. – 31. Dez", ptr: "PTR-Frist via Block-Extension ~15. August." },
  M: { label: "M-Code · Abschluss 1. Jan – 31. Mär", ptr: "PTR-Frist via Block-Extension ~15. November (bei Verlust ggf. bis ~31. Jan)." },
};

function buildFilings(entity: Entity, acct: AcctDate, employs: boolean, offshore: boolean): Filing[] {
  const f: Filing[] = [];

  // 1. Profits Tax Return
  const ptrForm = entity === "limited" ? "BIR51" : entity === "nonres" ? "BIR54" : "BIR52";
  f.push({
    form: ptrForm,
    title: `Profits Tax Return (${ptrForm})`,
    who: entity === "limited"
      ? "Jede HK-Körperschaft. Erste PTR wird ~18 Monate nach Gründung ausgestellt."
      : entity === "nonres"
        ? "Personen ohne HK-Ansässigkeit mit in HK steuerbarem Gewinn."
        : "Einzelunternehmen / Partnership mit Gewerbe in HK.",
    deadline: `Normal 1 Monat ab Ausstellung. ${ACCT_DATES[acct].ptr}`,
    penalty: "Verspätung/Nichtabgabe: Strafzuschläge bis HKD 10.000 + 3× der hinterzogenen Steuer (§82A IRO).",
    doc: { label: "IRD: Profits Tax / Formular-Specimen", url: IRD_PT },
    star: true,
  });

  // 2. Notification of chargeability falls keine PTR kommt
  f.push({
    form: "IR6163",
    title: "Chargeability anzeigen (wenn keine PTR ausgestellt wurde)",
    who: "Hast du steuerbaren Gewinn, aber das IRD hat (noch) keine PTR geschickt? Dann musst DU dich melden.",
    deadline: "Binnen 4 Monaten nach Ende der Basisperiode.",
    doc: { label: "IRD: Notification of Chargeability", url: IRD_PT },
  });

  // 3. Audit + Tax computation (nur Limited)
  if (entity === "limited") {
    f.push({
      form: "Audited Accounts",
      title: "Geprüfter Jahresabschluss + Tax Computation",
      who: "Jede HK-Limited muss ihre Konten von einem HK-CPA (Practising) prüfen lassen (Companies Ordinance s.405 ff.) — als Beleg zur PTR.",
      deadline: "Mit der PTR einzureichen. Dormant Companies sind ausgenommen.",
      doc: { label: "IRD: Profits Tax (Belege)", url: IRD_PT },
      star: true,
    });
  }

  // 4. Provisional Profits Tax (Hinweis als 'Filing'-Posten)
  f.push({
    form: "Provisional PT",
    title: "Provisorische Profits Tax (Vorauszahlung)",
    who: "Mit dem Final Assessment erhebt das IRD zusätzlich eine Vorauszahlung auf das Folgejahr.",
    deadline: "Lt. Notice of Assessment, meist 2 Raten (~Nov & ~April).",
    doc: { label: "IRD: Provisional Profits Tax", url: IRD_PT },
  });

  // 5. Employer's Return
  if (employs || entity === "limited") {
    f.push({
      form: "BIR56A + IR56B",
      title: "Employer's Return (auch für Director-Gehalt!)",
      who: employs
        ? "Du beschäftigst Mitarbeiter oder zahlst Director-Gehalt → jährliche Lohnmeldung."
        : "Limited mit Director-Vergütung: BIR56A wird trotzdem jährlich ausgestellt — auch 'NIL' muss abgegeben werden.",
      deadline: "Ausstellung 1. Arbeitstag im April → Abgabe binnen 1 Monat.",
      penalty: "Nichtabgabe: bis HKD 10.000 (§80 IRO).",
      doc: { label: "IRD: Employer's Return (BIR56A/IR56B)", url: IRD_ER },
      star: employs,
    });
    f.push({
      form: "IR56E / F / G",
      title: "Ad-hoc-Meldungen bei Ein-/Austritt",
      who: "IR56E bei Neueinstellung (binnen 3 Mon.), IR56F bei Ausscheiden, IR56G bei Wegzug aus HK (1 Mon. vorher, mit Money-Withholding).",
      deadline: "Ereignisbezogen.",
      doc: { label: "IRD: IR56-Formulare", url: IRD_56 },
    });
  }

  // 6. Business Registration renewal
  f.push({
    form: "BR Certificate",
    title: "Business-Registration-Zertifikat verlängern",
    who: "Jedes HK-Business braucht ein gültiges BR-Zertifikat (1- oder 3-Jahres).",
    deadline: "Jährlich/3-jährlich zum Jahrestag, Levy inklusive.",
    doc: { label: "IRD: Business Registration", url: IRD_BR },
    star: true,
  });

  // 7. Annual Return NAR1 (Companies Registry) - nur Limited
  if (entity === "limited") {
    f.push({
      form: "NAR1",
      title: "Annual Return an das Companies Registry",
      who: "Compliance (nicht Steuer): Gesellschafts-Stammdaten + Significant Controllers Register aktuell halten.",
      deadline: "Binnen 42 Tagen nach dem Gründungs-Jahrestag.",
      penalty: "Gestaffelte Strafen bis HKD 3.480 bei Verspätung.",
      doc: { label: "Companies Registry: Annual Return NAR1", url: CR_NAR1 },
    });
  }

  return f;
}

const HkTaxHelper = () => {
  const [entity, setEntity] = useState<Entity>("limited");
  const [acct, setAcct] = useState<AcctDate>("D");
  const [employs, setEmploys] = useState(false);
  const [offshore, setOffshore] = useState(false);
  const track = useTrackToolEvent("hk-tax-helper");

  const filings = useMemo(() => buildFilings(entity, acct, employs, offshore), [entity, acct, employs, offshore]);
  const entityMeta = ENTITIES.find((e) => e.key === entity)!;

  const allDocs: Doc[] = useMemo(() => {
    const seen = new Set<string>();
    const out: Doc[] = [];
    for (const fi of filings) {
      if (fi.doc && !seen.has(fi.doc.url)) { seen.add(fi.doc.url); out.push({ form: fi.form, label: fi.doc.label, url: fi.doc.url }); }
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
    line("HK-Tax Filing-Checkliste", { size: 18, bold: true, gap: 2 });
    line(`Setup: ${entityMeta.label} · ${ACCT_DATES[acct].label}${employs ? " · mit Mitarbeitern" : ""}${offshore ? " · Offshore-Claim" : ""}`, { size: 9, gap: 2 });
    line(`Profits-Tax-Satz: ${entityMeta.rate}`, { size: 9, gap: 8 });
    line("Pflichten (IRD / Companies Registry)", { size: 13, bold: true, gap: 3 });
    filings.forEach((fi) => {
      line(`[ ] ${fi.form} — ${fi.title}`, { size: 10, bold: true, gap: 1 });
      line(`Wer: ${fi.who}`, { size: 9, gap: 1 });
      line(`Frist: ${fi.deadline}`, { size: 9, gap: 1 });
      if (fi.penalty) line(`Strafe: ${fi.penalty}`, { size: 9, gap: 1 });
      if (fi.doc) line(`Formular/Quelle: ${fi.doc.url}`, { size: 8, gap: 4 });
    });
    line("Hinweis: keine Steuerberatung. Im Zweifel HK-CPA / Tax Representative. Stand Mai 2026.", { size: 8, gap: 2 });
    doc.save(`hk-tax-checklist-${entity}.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="HK-Tax-Helper"
      title="Hongkong-Steuern: welche Abgaben musst du machen?"
      subtitle="Wähle dein HK-Setup: Der Helper zeigt alle IRD-Filings (Profits Tax Return, Employer's Return, Business Registration) plus Companies-Registry-Pflichten, mit Fristen, Strafen und den amtlichen Formular-Quellen. Inklusive personalisierter Filing-Checkliste als PDF."
      actions={
        <Button onClick={generatePdf} variant="outline" className="rounded-xl">
          <Download aria-hidden="true" /> Checkliste als PDF
        </Button>
      }
    >
      <ToolLayout
        inputs={
          <ToolSection icon={Building2} title="Dein HK-Setup">
            <div className="space-y-5">
              <Field label="Entity-Typ">
                <div className="grid gap-2 sm:grid-cols-2">
                  {ENTITIES.map((e) => (
                    <button
                      key={e.key}
                      type="button"
                      aria-pressed={entity === e.key}
                      onClick={() => { setEntity(e.key); track(`entity_${e.key}`); }}
                      className={`rounded-xl border p-3 text-left text-sm transition-colors active:translate-y-px ${
                        entity === e.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/25"
                      }`}
                    >
                      <div className="font-medium">{e.label}</div>
                      <div className={`mt-0.5 text-xs ${entity === e.key ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{e.hint}</div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Geschäftsjahres-Abschluss" hint="Bestimmt die Frist für den Profits Tax Return." htmlFor="hk-acct">
                <select id="hk-acct" value={acct} onChange={(e) => setAcct(e.target.value as AcctDate)} className={selectCls}>
                  {(Object.keys(ACCT_DATES) as AcctDate[]).map((k) => <option key={k} value={k}>{ACCT_DATES[k].label}</option>)}
                </select>
              </Field>

              <div className="space-y-2">
                <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-border bg-background/60 p-3 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={employs} onChange={(e) => setEmploys(e.target.checked)} />
                  <span>Ich beschäftige Mitarbeiter oder zahle ein Director-Gehalt</span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-border bg-background/60 p-3 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={offshore} onChange={(e) => setOffshore(e.target.checked)} />
                  <span>Ich will einen <strong>Offshore-Claim</strong> (kein HK-Quellen-Gewinn)</span>
                </label>
              </div>
            </div>
          </ToolSection>
        }
        result={
          <>
            <ResultPanel variant="ink" kicker="Profits Tax" title={entityMeta.label} value={entityMeta.rate} valueHint="Two-Tier-Satz">
              <p className="text-sm leading-relaxed">
                HK besteuert <strong className="text-primary-foreground">territorial</strong>: Nur in HK entstandener Gewinn ist steuerbar. {ACCT_DATES[acct].ptr}
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70 tabular">{filings.length} Pflichten für dein Setup</p>
            </ResultPanel>
            {offshore && (
              <Callout tone="warning" title="Offshore-Claim heißt nicht: keine Abgabe">
                Auch mit Offshore-Claim musst du <strong>PTR und geprüften Abschluss einreichen</strong> und den Claim aktiv begründen
                (Operations-Test). Das IRD stellt regelmäßig Rückfragen. Beachte zusätzlich das <strong>FSIE-Regime</strong>: passives
                Auslandseinkommen (Zinsen, Dividenden, IP, Veräußerungsgewinne) von MNE-Entities gilt als HK-Quelle, außer du erfüllst
                die Substanz-, Beteiligungs- oder Nexus-Ausnahme.
              </Callout>
            )}
          </>
        }
      />

      {/* Filing-Matrix */}
      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <CalendarClock className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Deine HK-Pflichten
      </h2>
      <ol className="space-y-3">
        {filings.map((fi) => (
          <li key={fi.form + fi.title} className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <span className="w-fit shrink-0 rounded-md bg-secondary px-2 py-1 font-mono text-xs font-semibold">{fi.form}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 font-semibold">
                  {fi.title}
                  {fi.star && <ToneBadge tone="warning">kritisch</ToneBadge>}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{fi.who}</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary/60 px-3 py-2">
                    <dt className="text-xs text-muted-foreground">Frist</dt>
                    <dd className="font-medium">{fi.deadline}</dd>
                  </div>
                  {fi.penalty && (
                    <div className="rounded-lg bg-danger-soft px-3 py-2">
                      <dt className="text-xs text-danger">Strafe bei Verspätung</dt>
                      <dd className="font-medium">{fi.penalty}</dd>
                    </div>
                  )}
                </dl>
                {fi.doc && (
                  <a href={fi.doc.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline">
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" /> {fi.doc.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Records */}
        <ToolSection icon={Info} title="Aufbewahrung & Tax Representative">
          <p className="text-sm leading-relaxed text-foreground/85">
            Geschäftsunterlagen <strong>7 Jahre</strong> aufbewahren (§51C IRO). Mit einem HK-<strong>Tax Representative</strong> kommst du
            automatisch ins <strong>Block-Extension-Scheme</strong>, sonst gilt strikt „1 Monat ab Ausstellung“. Die meisten DACH-Setups nutzen
            einen lokalen Sekretariats-/CPA-Dienstleister (Sleek, Osome, Statrys u. a.).
          </p>
        </ToolSection>

        {/* Dokumente bereitstellen */}
        <ToolSection
          icon={Download}
          title="Dokumente & Formulare"
          description="Direkt zu den amtlichen IRD-/Companies-Registry-Quellen für dein Setup, plus deine Filing-Checkliste als PDF."
        >
          <div className="mb-4 grid gap-2">
            {[...allDocs.map((d) => ({ url: d.url, label: d.label })), { url: IRD_EXT, label: "IRD: Block Extension Scheme" }].map((d) => (
              <a key={d.url} href={d.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-border bg-background/60 p-2.5 text-sm transition-colors hover:border-accent-blue/40 hover:bg-card">
                <FileText className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">{d.label}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </a>
            ))}
          </div>
          <Button onClick={generatePdf} className="rounded-xl">
            <Download aria-hidden="true" /> Filing-Checkliste als PDF herunterladen
          </Button>
        </ToolSection>
      </div>

      {/* Cross-Links */}
      <ToolSection className="mt-6" title="Passt dazu" bodyClassName="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/cockpit/hk-limited-wizard", t: "HK-Limited Setup-Wizard", d: "Gründung von A bis Z" },
          { to: "/cockpit/us-tax-helper", t: "US-Tax-Helper", d: "Das USA-Pendant" },
          { to: "/cockpit/intl-banking", t: "US + HK Banking", d: "Banken im Vergleich" },
          { to: "/cockpit/dba-cfc", t: "DBA-CFC-Rechner", d: "Hinzurechnung & DBA DE-HK" },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="press group rounded-xl border border-border bg-background/60 p-3.5 hover:border-accent-blue/40 hover:bg-card">
            <span className="flex items-center justify-between gap-2 text-sm font-semibold">
              {l.t}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{l.d}</span>
          </Link>
        ))}
      </ToolSection>

      <Stand2026Footer
        sources={[
          { label: "IRD: Profits Tax", url: IRD_PT },
          { label: "IRD: Employer's Return (BIR56A/IR56B)", url: IRD_ER },
          { label: "IRD: Block Extension Scheme", url: IRD_EXT },
          { label: "IRD: Business Registration", url: IRD_BR },
          { label: "Companies Registry: Annual Return NAR1", url: CR_NAR1 },
        ]}
        note="Keine Steuerberatung. Two-Tier Profits Tax 8,25 %/16,5 % (Körperschaft) bzw. 7,5 %/15 % (unincorporated). Audit-Pflicht für jede HK-Limited. Erste PTR ~18 Mon. nach Gründung. Block-Extension nur mit Tax Representative. Im Zweifel HK-CPA. Stand Mai 2026."
      />
    </CockpitShell>
  );
};

export default HkTaxHelper;
