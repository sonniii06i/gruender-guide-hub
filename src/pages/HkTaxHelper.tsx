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
  CheckCircle2,
} from "lucide-react";

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
      subtitle="Wähle dein HK-Setup — der Helper zeigt alle IRD-Filings (Profits Tax Return, Employer's Return, Business Registration) plus Companies-Registry-Pflichten, mit Fristen, Strafen und den amtlichen Formular-Quellen. Inklusive personalisierter Filing-Checkliste als PDF."
    >
      {/* Profil-Selektor */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Building2 className="h-4 w-4 text-accent-blue" /> Dein HK-Setup</h3>

        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity-Typ</label>
        <div className="grid sm:grid-cols-2 gap-2 mt-1 mb-4">
          {ENTITIES.map((e) => (
            <button key={e.key} onClick={() => { setEntity(e.key); track(`entity_${e.key}`); }}
              className={`text-left rounded-lg border p-2.5 text-sm transition ${entity === e.key ? "border-accent-blue bg-accent-blue/10 font-semibold" : "border-border hover:border-accent-blue/50"}`}>
              <div>{e.label}</div>
              <div className="text-xs text-muted-foreground font-normal mt-0.5">{e.hint}</div>
            </button>
          ))}
        </div>

        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Geschäftsjahres-Abschluss (bestimmt die PTR-Frist)</label>
        <select value={acct} onChange={(e) => setAcct(e.target.value as AcctDate)} className="mt-1 w-full rounded-lg border border-border bg-background p-2 text-sm mb-4">
          {(Object.keys(ACCT_DATES) as AcctDate[]).map((k) => <option key={k} value={k}>{ACCT_DATES[k].label}</option>)}
        </select>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={employs} onChange={(e) => setEmploys(e.target.checked)} />
            <span>Ich beschäftige Mitarbeiter / zahle Director-Gehalt</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={offshore} onChange={(e) => setOffshore(e.target.checked)} />
            <span>Ich will einen <strong>Offshore-Claim</strong> (kein HK-Quellen-Gewinn)</span>
          </label>
        </div>
      </div>

      {/* Profits-Tax-Satz-Karte */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-4 text-sm">
        <div className="flex items-start gap-3">
          <CalendarClock className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold mb-1">Profits Tax — {entityMeta.label}</h3>
            <p className="text-muted-foreground">Two-Tier-Satz: <strong>{entityMeta.rate}</strong>. HK besteuert <strong>territorial</strong> — nur in HK entstandener Gewinn ist steuerbar. {ACCT_DATES[acct].ptr}</p>
          </div>
        </div>
      </div>

      {offshore && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 mb-4 text-sm">
          <h3 className="font-bold mb-1 flex items-center gap-2 text-amber-700 dark:text-amber-400"><AlertTriangle className="h-4 w-4" /> Offshore-Claim ≠ keine Abgabe</h3>
          <p className="text-muted-foreground">
            Auch mit Offshore-Claim musst du <strong>PTR + geprüften Abschluss einreichen</strong> und den Claim aktiv begründen (Operations-Test). Das IRD stellt regelmäßig Rückfragen. Beachte zusätzlich das <strong>FSIE-Regime</strong>: passives Auslandseinkommen (Zinsen, Dividenden, IP, Veräußerungsgewinne) von MNE-Entities gilt als HK-Quelle, außer du erfüllst die Substanz-/Beteiligungs-/Nexus-Ausnahme.
          </p>
        </div>
      )}

      {/* Filing-Matrix */}
      <div className="space-y-3">
        <h2 className="text-base font-bold flex items-center gap-2"><CalendarClock className="h-4 w-4 text-accent-blue" /> Deine HK-Pflichten</h2>
        {filings.map((fi) => (
          <div key={fi.form + fi.title} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-mono font-semibold mt-0.5">{fi.form}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold flex items-center gap-1.5">
                  {fi.title}
                  {fi.star && <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" aria-label="kritisch" />}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{fi.who}</div>
                <div className="text-xs mt-1.5"><strong>Frist:</strong> {fi.deadline}</div>
                {fi.penalty && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-start gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{fi.penalty}</span>
                  </div>
                )}
                {fi.doc && (
                  <a href={fi.doc.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent-blue underline mt-1.5">
                    <FileText className="h-3.5 w-3.5" /> {fi.doc.label} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Records */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-1 flex items-center gap-2"><Info className="h-4 w-4 text-accent-blue" /> Aufbewahrung & Tax Representative</h3>
        <p className="text-muted-foreground">
          Geschäftsunterlagen <strong>7 Jahre</strong> aufbewahren (§51C IRO). Mit einem HK-<strong>Tax Representative</strong> kommst du automatisch ins <strong>Block-Extension-Scheme</strong> — sonst gilt strikt „1 Monat ab Ausstellung". Die meisten DACH-Setups nutzen einen lokalen Sekretariats-/CPA-Dienstleister (Sleek, Osome, Statrys u. a.).
        </p>
      </div>

      {/* Dokumente bereitstellen */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mt-4">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Download className="h-4 w-4 text-accent-blue" /> Dokumente & Formulare bereitstellen</h3>
        <p className="text-xs text-muted-foreground mb-3">Direkt zu den amtlichen IRD-/Companies-Registry-Quellen für dein Setup — plus deine personalisierte Filing-Checkliste als PDF.</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-3">
          {allDocs.map((d) => (
            <a key={d.url} href={d.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5 text-sm hover:border-accent-blue/50">
              <FileText className="h-4 w-4 text-accent-blue shrink-0" />
              <span className="flex-1 min-w-0 truncate">{d.label}</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </a>
          ))}
          <a href={IRD_EXT} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5 text-sm hover:border-accent-blue/50">
            <FileText className="h-4 w-4 text-accent-blue shrink-0" />
            <span className="flex-1 min-w-0 truncate">IRD: Block Extension Scheme</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          </a>
        </div>
        <button onClick={generatePdf} className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          <Download className="h-4 w-4" /> Filing-Checkliste als PDF herunterladen
        </button>
      </div>

      {/* Cross-Links */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4 text-sm">
        <h3 className="font-bold mb-2">Passt dazu</h3>
        <ul className="space-y-1">
          <li><Link to="/cockpit/hk-limited-wizard" className="text-accent-blue underline">HK-Limited Setup-Wizard (Gründung von A–Z)</Link></li>
          <li><Link to="/cockpit/us-tax-helper" className="text-accent-blue underline">US-Tax-Helper (USA-Pendant)</Link></li>
          <li><Link to="/cockpit/intl-banking" className="text-accent-blue underline">US + HK Banking-Vergleich</Link></li>
          <li><Link to="/cockpit/dba-cfc" className="text-accent-blue underline">DBA-CFC-Rechner (Hinzurechnung & DBA DE-HK)</Link></li>
        </ul>
      </div>

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
