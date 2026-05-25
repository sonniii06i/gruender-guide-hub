/**
 * FseWizard — "Fragebogen zur steuerlichen Erfassung (FsE) — Spickzettel"
 *
 * Anders als beim GewA1 (das gibt's als PDF) ist der FsE ein reines
 * ELSTER-Online-Formular. Dieser Wizard funktioniert daher als
 * "Spickzettel-Generator": stellt alle Pflicht-Entscheidungen in der
 * Reihenfolge wie ELSTER sie abfragt, erklärt jedes Feld + gibt
 * Default-Empfehlung, und erzeugt am Ende eine druckbare PDF die der
 * User neben ELSTER aufmachen kann zum Abschreiben.
 *
 * Pre-Fill aus:
 *  - ggh-gewa1-v1 (Tätigkeit, Beginn, voraussichtl. Umsatz, KU-Vorentscheidung)
 *  - ggh-person-profile-v1 (Vorname, Nachname, Adresse, Email, Telefon)
 *
 * Wichtigste Entscheidungen die im FsE GEBUNDEN sind:
 *  1. § 19 KU vs. Regelbesteuerung — 5 Jahre Bindung!
 *  2. EÜR vs. Bilanz — meist 1 Jahr Bindung, wechsel möglich
 *  3. Soll- vs. Ist-Versteuerung — bei <800k Umsatz Ist vorteilhafter
 *  4. USt-ID parallel beantragen — sonst später separater Antrag beim BZSt
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  FileDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import jsPDF from "jspdf";

type Rechtsform = "einzel-gewerbe" | "freiberuf" | "gbr" | "ug" | "gmbh";
type Familienstand = "ledig" | "verheiratet" | "geschieden" | "verwitwet";
type Religion = "rk" | "ev" | "keine";
type Gewinnermittlung = "euer" | "bilanz" | "unsicher";
type UstModus = "ku" | "regel" | "unsicher";
type Versteuerung = "ist" | "soll" | "unsicher";

type FseData = {
  // Step 1: Allgemein
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  steuerId: string; // 11-stellige IDNr (lebenslang)
  familienstand: Familienstand;
  religion: Religion;
  strasse: string;
  plzOrt: string;
  telefon: string;
  email: string;
  // Step 2: Bank
  iban: string;
  bic: string;
  lastschriftMandat: boolean;
  // Step 3: Tätigkeit
  rechtsform: Rechtsform;
  taetigkeit: string;
  beginnDatum: string;
  betriebStrasse: string;
  betriebPlzOrt: string;
  bisherigerBeruf: string;
  // Step 4: Einkünfte-Schätzung (für Vorauszahlungen)
  gewinnSchaetzungJahr1: number;
  einkuenfteAndere: number; // Lohn, Vermietung etc.
  // Step 5: Gewinnermittlung
  gewinnermittlung: Gewinnermittlung;
  wirtschaftsjahrAbweichend: boolean;
  // Step 6: USt
  ustModus: UstModus;
  umsatzJahr1: number;
  umsatzJahr2: number;
  versteuerung: Versteuerung;
  ustIdParallel: boolean;
  ksvMitgliedschaft: boolean;
  // Step 7: Sonstiges
  stbVollmacht: boolean;
  stbName: string;
};

const heute = () => new Date().toISOString().split("T")[0];
const LS_KEY = "ggh-fse-v1";
const LS_PERSON_KEY = "ggh-person-profile-v1";
const LS_GEWA1_KEY = "ggh-gewa1-v1";

const PERSON_FIELDS = [
  "vorname", "nachname", "geburtsdatum", "telefon", "email", "steuerId",
  "iban", "bic",
] as const satisfies readonly (keyof FseData)[];

const defaultData: FseData = {
  vorname: "", nachname: "", geburtsdatum: "",
  steuerId: "", familienstand: "ledig", religion: "keine",
  strasse: "", plzOrt: "",
  telefon: "", email: "",
  iban: "", bic: "", lastschriftMandat: false,
  rechtsform: "einzel-gewerbe",
  taetigkeit: "", beginnDatum: heute(),
  betriebStrasse: "", betriebPlzOrt: "",
  bisherigerBeruf: "",
  gewinnSchaetzungJahr1: 0, einkuenfteAndere: 0,
  gewinnermittlung: "euer", wirtschaftsjahrAbweichend: false,
  ustModus: "unsicher", umsatzJahr1: 0, umsatzJahr2: 0,
  versteuerung: "ist", ustIdParallel: false, ksvMitgliedschaft: false,
  stbVollmacht: false, stbName: "",
};

const STEP_LABELS = [
  "Allgemein", "Bank", "Tätigkeit", "Einkünfte-Schätzung",
  "Gewinnermittlung", "Umsatzsteuer", "Sonstiges", "Spickzettel",
];

const FseWizard = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FseData>(() => {
    if (typeof window === "undefined") return defaultData;
    let base = { ...defaultData };

    // 1. Personal-Profil
    const savedPerson = localStorage.getItem(LS_PERSON_KEY);
    if (savedPerson) {
      try {
        const p = JSON.parse(savedPerson) as Record<string, unknown>;
        base = {
          ...base,
          vorname: (p.vorname as string) ?? "",
          nachname: (p.nachname as string) ?? "",
          geburtsdatum: (p.geburtsdatum as string) ?? "",
          telefon: (p.telefon as string) ?? "",
          email: (p.email as string) ?? "",
          strasse: (p.privatStrasse as string) ?? "",
          plzOrt: [p.privatPlz, p.privatOrt].filter(Boolean).join(" "),
        };
      } catch { /* ignore */ }
    }

    // 2. GewA1-Wizard-Daten (Tätigkeit etc.)
    const savedGewa1 = localStorage.getItem(LS_GEWA1_KEY);
    if (savedGewa1) {
      try {
        const g = JSON.parse(savedGewa1) as Record<string, unknown>;
        base.taetigkeit = (g.taetigkeit as string) ?? base.taetigkeit;
        base.beginnDatum = (g.beginnDatum as string) ?? base.beginnDatum;
        if (typeof g.voraussichtlicherUmsatz === "number") {
          base.umsatzJahr1 = g.voraussichtlicherUmsatz;
          base.umsatzJahr2 = g.voraussichtlicherUmsatz;
        }
        if (g.kuStatus === "ja") base.ustModus = "ku";
        else if (g.kuStatus === "nein") base.ustModus = "regel";
        const rfMap: Record<string, Rechtsform> = {
          "einzel": "einzel-gewerbe", "gbr": "gbr", "ug": "ug", "gmbh": "gmbh",
        };
        if (typeof g.rechtsform === "string" && rfMap[g.rechtsform]) base.rechtsform = rfMap[g.rechtsform];
      } catch { /* ignore */ }
    }

    // 3. Eigene FsE-Daten haben Priorität
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { base = { ...base, ...JSON.parse(saved) }; } catch { /* ignore */ }
    }
    return base;
  });

  const update = <K extends keyof FseData>(field: K, value: FseData[K]) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  // Personal-Profil + IBAN persistieren (cross-tool)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const existing = JSON.parse(localStorage.getItem(LS_PERSON_KEY) ?? "{}");
      const merged: Record<string, unknown> = {
        ...existing,
        vorname: data.vorname,
        nachname: data.nachname,
        geburtsdatum: data.geburtsdatum,
        telefon: data.telefon,
        email: data.email,
        steuerId: data.steuerId,
        iban: data.iban,
        bic: data.bic,
      };
      localStorage.setItem(LS_PERSON_KEY, JSON.stringify(merged));
    } catch { /* ignore */ }
  }, [data.vorname, data.nachname, data.geburtsdatum, data.telefon, data.email,
      data.steuerId, data.iban, data.bic]);

  // FsE-Daten persistieren (eigener Key, full state)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  }, [data]);

  // Validierung pro Step
  const stepValid = useMemo(() => {
    const checks: boolean[] = [];
    checks[0] = !!(data.vorname && data.nachname && data.geburtsdatum
      && data.steuerId.replace(/\s/g, "").length === 11 && data.strasse && data.plzOrt);
    checks[1] = !!(data.iban && data.bic);
    checks[2] = data.taetigkeit.trim().length >= 20 && !!data.beginnDatum;
    checks[3] = true; // Einkünfte-Schätzung: 0 ist OK
    checks[4] = data.gewinnermittlung !== "unsicher";
    checks[5] = data.ustModus !== "unsicher" && data.versteuerung !== "unsicher";
    checks[6] = true;
    checks[7] = true;
    return checks;
  }, [data]);

  const allValid = stepValid.slice(0, 7).every(Boolean);

  const reset = () => {
    if (!confirm("FsE-Daten löschen? Dein Personal-Profil (Name/Adresse/IBAN) bleibt gespeichert.")) return;
    localStorage.removeItem(LS_KEY);
    setData((d) => {
      const fresh: FseData = { ...defaultData };
      for (const k of PERSON_FIELDS) (fresh as Record<string, unknown>)[k] = d[k];
      fresh.strasse = d.strasse;
      fresh.plzOrt = d.plzOrt;
      return fresh;
    });
    setStep(0);
  };

  // === Empfehlungs-Logik ===
  const ustEmpfehlung = useMemo<UstModus>(() => {
    // KU sinnvoll wenn: Umsatz < 25k, kein B2B mit Vorsteuer-Bedarf,
    // keine großen Investitionen geplant. Regelbesteuerung sinnvoll bei B2B
    // oder hohen Investitionen (Vorsteuer-Abzug).
    if (data.umsatzJahr1 >= 25000) return "regel";
    if (data.umsatzJahr1 >= 15000) return "unsicher"; // grenznah
    return "ku";
  }, [data.umsatzJahr1]);

  const gewinnermittlungEmpfehlung = useMemo<Gewinnermittlung>(() => {
    // Bilanz-Pflicht bei Kap.-Ges. ODER bei Gewerbe mit Umsatz > 800k / Gewinn > 80k
    if (data.rechtsform === "ug" || data.rechtsform === "gmbh") return "bilanz";
    if (data.umsatzJahr1 > 800000 || data.gewinnSchaetzungJahr1 > 80000) return "bilanz";
    return "euer";
  }, [data.rechtsform, data.umsatzJahr1, data.gewinnSchaetzungJahr1]);

  // === Spickzettel-PDF generieren ===
  const generateSpickzettel = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    let y = 18;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Spickzettel: Fragebogen zur steuerlichen Erfassung (FsE)", 15, y);
    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(
      "Druckvorlage zum Abschreiben in ELSTER. FsE ist online-only — nutze dieses Blatt parallel zum Browser.",
      15, y,
    );
    y += 5;
    doc.setDrawColor(180);
    doc.line(15, y, W - 15, y);
    y += 4;

    const section = (titel: string) => {
      if (y > 270) { doc.addPage(); y = 18; }
      y += 2;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(titel, 15, y);
      y += 4;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40);
    };

    const row = (label: string, value: string, extra?: string) => {
      if (y > 280) { doc.addPage(); y = 18; }
      doc.setTextColor(80);
      doc.text(label, 15, y);
      doc.setTextColor(0);
      const lines = doc.splitTextToSize(value || "—", W - 85);
      lines.forEach((l: string, i: number) => doc.text(l, 80, y + i * 4));
      if (extra) {
        doc.setFontSize(7);
        doc.setTextColor(120);
        doc.text(extra, 80, y + lines.length * 4 + 0.5);
        doc.setFontSize(9);
      }
      y += Math.max(5, lines.length * 4) + (extra ? 3 : 0);
    };

    const fmtDate = (iso: string) => iso ? iso.split("-").reverse().join(".") : "—";
    const eur = (n: number) => `${n.toLocaleString("de-DE")} €`;

    section("1. Allgemeine Angaben");
    row("Name, Vorname:", `${data.nachname}, ${data.vorname}`);
    row("Geburtsdatum:", fmtDate(data.geburtsdatum));
    row("Steuer-ID (11-stellig):", data.steuerId);
    row("Familienstand:", data.familienstand);
    row("Religion:", data.religion === "rk" ? "römisch-katholisch"
      : data.religion === "ev" ? "evangelisch" : "keine");
    row("Anschrift:", `${data.strasse}, ${data.plzOrt}`);
    row("Telefon / E-Mail:", `${data.telefon} / ${data.email}`);

    section("2. Bankverbindung (für Erstattungen)");
    row("IBAN:", data.iban);
    row("BIC:", data.bic);
    row("SEPA-Lastschrift-Mandat:", data.lastschriftMandat ? "JA — FA darf abbuchen" : "NEIN");

    section("3. Angaben zur Tätigkeit");
    row("Rechtsform:", data.rechtsform);
    row("Beginn der Tätigkeit:", fmtDate(data.beginnDatum));
    row("Art der Tätigkeit:", data.taetigkeit);
    row("Anschrift Betriebsstätte:", data.betriebStrasse
      ? `${data.betriebStrasse}, ${data.betriebPlzOrt}` : "wie Privatanschrift");
    row("Bisherige Tätigkeit:", data.bisherigerBeruf);

    section("4. Festsetzung der Vorauszahlungen (Schätzung Jahr 1)");
    row("Geschätzter Gewinn:", eur(data.gewinnSchaetzungJahr1),
      "ESt-/GewSt-Vorauszahlungen werden hierauf berechnet");
    row("Andere Einkünfte:", eur(data.einkuenfteAndere),
      "Lohn, Vermietung, Kapitalerträge etc.");

    section("5. Gewinnermittlung");
    row("Methode:", data.gewinnermittlung === "euer" ? "EÜR (§ 4 Abs. 3 EStG)" : "Bilanzierung (§ 4 Abs. 1 EStG)");
    row("Wirtschaftsjahr:", data.wirtschaftsjahrAbweichend ? "abweichend vom Kalenderjahr" : "Kalenderjahr");

    section("6. Umsatzsteuer");
    row("§ 19 UStG Kleinunternehmer:", data.ustModus === "ku" ? "JA — keine USt-Ausweisung" : "NEIN — Regelbesteuerung",
      data.ustModus === "ku" ? "5 Jahre Bindung an KU-Status!" : "USt-Voranmeldungen monatl./quartl. pflicht");
    row("Voraussichtl. Umsatz Jahr 1:", eur(data.umsatzJahr1));
    row("Voraussichtl. Umsatz Jahr 2:", eur(data.umsatzJahr2));
    row("Versteuerung:", data.versteuerung === "ist" ? "Ist-Versteuerung (nach Vereinnahmung)"
      : "Soll-Versteuerung (nach Vereinbarung)",
      data.versteuerung === "ist" ? "Cashflow-Vorteil: USt erst zahlen wenn Geld da" : "Standard, aber USt vorab fällig");
    row("USt-ID-Nummer beantragen:", data.ustIdParallel ? "JA, parallel mit FsE"
      : "NEIN — separat beim BZSt nachträglich",
      "EU-Geschäft → USt-ID-Pflicht");
    row("KSV-Mitgliedschaft:", data.ksvMitgliedschaft ? "JA (Künstler/Publizist)" : "NEIN");

    section("7. Steuerberatungs-Vollmacht");
    row("Vollmacht für Steuerberater:", data.stbVollmacht ? `JA — ${data.stbName}` : "NEIN");

    // Footer / Disclaimer
    if (y > 250) { doc.addPage(); y = 18; }
    y += 6;
    doc.setDrawColor(180);
    doc.line(15, y, W - 15, y);
    y += 4;
    doc.setFontSize(7);
    doc.setTextColor(120);
    const disclaimer = [
      "WICHTIG — Diese Vorlage ersetzt keine Steuerberatung. Die im Feld § 19 KU und Soll-/Ist-Versteuerung getroffene",
      "Entscheidung ist gesetzlich verbindlich (KU: 5 Jahre Bindung). Im Zweifel vor Einreichung mit StB sprechen.",
      "Pflicht-Frist: Abgabe FsE innerhalb 1 Monat nach Tätigkeitsaufnahme (§ 138 AO).",
      `Erstellt am ${new Date().toLocaleDateString("de-DE")} mit GründerX FsE-Wizard.`,
    ];
    disclaimer.forEach((line) => {
      doc.text(line, 15, y);
      y += 3;
    });

    doc.save(`fse-spickzettel-${(data.nachname || "anmeldung").toLowerCase()}.pdf`);
  };

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Fragebogen zur steuerlichen Erfassung (FsE) — Wizard"
      subtitle="Spickzettel-Generator für den ELSTER-Online-Fragebogen: alle Pflicht-Entscheidungen in der Reihenfolge wie ELSTER sie abfragt, mit Empfehlungen + Warnungen (KU 5-Jahres-Bindung!). Pre-Fill aus deinen GewA1-Daten."
    >
      <HeroBlock />

      {/* Step-Progress-Bar */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <div className="text-xs text-muted-foreground">
            Schritt {step + 1} von {STEP_LABELS.length}: <strong className="text-foreground">{STEP_LABELS[step]}</strong>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {stepValid.slice(0, 7).filter(Boolean).length} / 7 Pflicht-Steps vollständig
          </div>
        </div>
        <div className="flex gap-1.5">
          {STEP_LABELS.map((label, i) => (
            <button
              key={i}
              type="button"
              title={`Step ${i + 1}: ${label}`}
              onClick={() => setStep(i)}
              className={`flex-1 h-1.5 rounded-full transition ${
                i === step ? "bg-accent-blue"
                : stepValid[i] ? "bg-emerald-500/40 hover:bg-emerald-500/60"
                : "bg-secondary hover:bg-secondary/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step-Inhalte */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4 min-h-[400px]">
        {step === 0 && <StepAllgemein data={data} update={update} />}
        {step === 1 && <StepBank data={data} update={update} />}
        {step === 2 && <StepTaetigkeit data={data} update={update} />}
        {step === 3 && <StepEinkuenfte data={data} update={update} />}
        {step === 4 && <StepGewinnermittlung data={data} update={update} empfehlung={gewinnermittlungEmpfehlung} />}
        {step === 5 && <StepUst data={data} update={update} empfehlung={ustEmpfehlung} />}
        {step === 6 && <StepSonstiges data={data} update={update} />}
        {step === 7 && <StepSpickzettel data={data} stepValid={stepValid} allValid={allValid} onGenerate={generateSpickzettel} />}
      </div>

      {/* Nav-Buttons */}
      <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
        <Button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
        </Button>
        <div className="flex gap-2">
          <Button onClick={reset} variant="ghost" size="sm" className="text-xs">Reset</Button>
          <Button
            onClick={() => setStep(Math.min(STEP_LABELS.length - 1, step + 1))}
            disabled={step === STEP_LABELS.length - 1}
            size="sm"
          >
            Weiter <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Cross-Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/gewerbeanmeldung-wizard" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Gewerbeanmeldung-Wizard</div>
          <div className="text-muted-foreground">GewA1 vor FsE ausfüllen</div>
        </Link>
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Schwellen-Check (KU-Grenzen)</div>
          <div className="text-muted-foreground">25k/100k §19 KU verstehen</div>
        </Link>
        <Link to="/cockpit/erste-schritte-roadmap" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">90-Tage-Roadmap →</div>
          <div className="text-muted-foreground">Was kommt nach dem FsE</div>
        </Link>
      </div>

      <Glossar />

      <Stand2026Footer
        sources={[
          { label: "ELSTER FsE (natürliche Person)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewnatp" },
          { label: "ELSTER FsE (juristische Person)", url: "https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewjur" },
          { label: "§ 138 AO (Anzeigepflicht 1 Monat)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
          { label: "§ 19 UStG (Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "§ 4 Abs. 3 EStG (EÜR)", url: "https://www.gesetze-im-internet.de/estg/__4.html" },
          { label: "§ 20 UStG (Ist-Versteuerung)", url: "https://www.gesetze-im-internet.de/ustg_1980/__20.html" },
        ]}
        note="Stand 2026: KU-Grenze 25.000 € Vorjahres-Umsatz / 100.000 € Prognose Folgejahr (Reform 2025). Ist-Versteuerung möglich bis 800.000 € Umsatz/Jahr (§ 20 UStG). Die im FsE getroffene KU-Entscheidung bindet dich 5 Jahre. Im Zweifel mit StB sprechen vor Abgabe."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Hero + Sub-Components
// ============================================================================

const HeroBlock = () => (
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Spickzettel-Generator für ELSTER</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Anders als das GewA1 ist der Fragebogen zur steuerlichen Erfassung (FsE)
          ein <strong>ELSTER-Online-Formular</strong>, kein PDF zum Befüllen. Dieser Wizard fragt
          alle Pflicht-Entscheidungen in der Reihenfolge ab wie ELSTER sie abfragt,
          erklärt jedes Feld + gibt eine Empfehlung. Am Ende:
          <strong> druckbarer Spickzettel zum Abschreiben</strong> in ELSTER.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
          <div className="rounded-lg bg-red-500/10 p-2 border border-red-500/30">
            <strong className="text-red-700">⚠ § 19 KU</strong>
            <div className="text-muted-foreground mt-0.5">5 Jahre Bindung</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/30">
            <strong className="text-amber-700">⚠ Frist</strong>
            <div className="text-muted-foreground mt-0.5">1 Monat ab Tätigkeit</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/30">
            <strong className="text-emerald-700">✅ Pre-Fill</strong>
            <div className="text-muted-foreground mt-0.5">aus GewA1-Wizard</div>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-2 border border-blue-500/30">
            <strong className="text-blue-700">📄 Output</strong>
            <div className="text-muted-foreground mt-0.5">PDF-Spickzettel</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

type StepProps = { data: FseData; update: <K extends keyof FseData>(f: K, v: FseData[K]) => void };

const StepAllgemein = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">1. Allgemeine Angaben</h3>
    <p className="text-xs text-muted-foreground mb-2">Persönliche Daten + Steuer-ID. Name/Adresse werden aus Personal-Profil vorausgefüllt.</p>
    <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 text-[11px] mb-3">
      💡 <strong>Steuer-ID:</strong> 11-stellige IDNr (nicht Steuernummer!), steht auf dem Schreiben des BZSt das du nach Geburt/Anmeldung bekommen hast.
      Verloren? Online beim BZSt neu anfordern (kostenlos, ~6 Wochen Postlaufzeit).
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Vorname *</Label>
        <Input value={data.vorname} onChange={(e) => update("vorname", e.target.value)} className="h-9 mt-1" autoComplete="given-name" />
      </div>
      <div>
        <Label className="text-xs">Nachname *</Label>
        <Input value={data.nachname} onChange={(e) => update("nachname", e.target.value)} className="h-9 mt-1" autoComplete="family-name" />
      </div>
      <div>
        <Label className="text-xs">Geburtsdatum *</Label>
        <Input type="date" value={data.geburtsdatum} onChange={(e) => update("geburtsdatum", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Steuer-ID (11-stellig) *</Label>
        <Input value={data.steuerId} onChange={(e) => update("steuerId", e.target.value)} className="h-9 mt-1" placeholder="z.B. 12 345 678 901" />
      </div>
      <div>
        <Label className="text-xs">Familienstand</Label>
        <select value={data.familienstand} onChange={(e) => update("familienstand", e.target.value as Familienstand)}
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
          <option value="ledig">ledig</option>
          <option value="verheiratet">verheiratet</option>
          <option value="geschieden">geschieden</option>
          <option value="verwitwet">verwitwet</option>
        </select>
      </div>
      <div>
        <Label className="text-xs">Religion (für KiSt)</Label>
        <select value={data.religion} onChange={(e) => update("religion", e.target.value as Religion)}
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
          <option value="keine">keine (0 % KiSt)</option>
          <option value="rk">römisch-katholisch (8/9 % KiSt)</option>
          <option value="ev">evangelisch (8/9 % KiSt)</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs">Straße + Nr. *</Label>
        <Input value={data.strasse} onChange={(e) => update("strasse", e.target.value)} className="h-9 mt-1" autoComplete="street-address" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs">PLZ + Ort *</Label>
        <Input value={data.plzOrt} onChange={(e) => update("plzOrt", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Telefon</Label>
        <Input type="tel" value={data.telefon} onChange={(e) => update("telefon", e.target.value)} className="h-9 mt-1" autoComplete="tel" />
      </div>
      <div>
        <Label className="text-xs">E-Mail</Label>
        <Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-9 mt-1" autoComplete="email" />
      </div>
    </div>
  </div>
);

const StepBank = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">2. Bankverbindung</h3>
    <p className="text-xs text-muted-foreground mb-2">
      Für Steuer-Erstattungen + ggf. SEPA-Lastschrift für Vorauszahlungen.
      Idealerweise das Geschäftskonto (saubere Trennung).
    </p>
    <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 text-[11px] mb-3">
      💡 Wenn du noch kein Geschäftskonto hast: geht im FsE auch dein Privatkonto, später änderbar.
      Empfehlung: Geschäftskonto BEVOR du FsE einreichst — dann gehst du 1x durch.
      <Link to="/anbieter?cat=Banking%20DE" className="ml-1 underline text-accent-blue">Banking-Anbieter vergleichen →</Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2">
        <Label className="text-xs">IBAN *</Label>
        <Input value={data.iban} onChange={(e) => update("iban", e.target.value)} className="h-9 mt-1" placeholder="DE12 3456 7890 1234 5678 90" />
      </div>
      <div>
        <Label className="text-xs">BIC *</Label>
        <Input value={data.bic} onChange={(e) => update("bic", e.target.value)} className="h-9 mt-1" placeholder="GENODEF1HH1" />
      </div>
      <div className="flex items-center gap-2 pt-5">
        <input type="checkbox" id="lastschrift" checked={data.lastschriftMandat}
          onChange={(e) => update("lastschriftMandat", e.target.checked)} className="h-4 w-4" />
        <Label htmlFor="lastschrift" className="text-xs cursor-pointer">SEPA-Lastschrift-Mandat erteilen</Label>
      </div>
    </div>
    <div className="rounded-lg bg-secondary/40 p-3 text-[11px] mt-3">
      <strong>SEPA-Lastschrift JA</strong> = FA bucht Steuern + Vorauszahlungen automatisch ab.
      Vorteil: keine Verspätungen, kein Säumniszuschlag. Nachteil: weniger Cashflow-Kontrolle.
      Empfehlung: <strong>JA</strong>, separates Geschäftskonto mit Puffer.
    </div>
  </div>
);

const StepTaetigkeit = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">3. Angaben zur Tätigkeit</h3>
    <p className="text-xs text-muted-foreground mb-2">
      Aus dem Gewerbeanmeldung-Wizard übernommen (falls vorhanden). Beschreibung muss konkret sein —
      "Online-Handel" reicht NICHT, "Online-Handel mit Damen-Sportbekleidung über Shopify" schon.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Rechtsform</Label>
        <select value={data.rechtsform} onChange={(e) => update("rechtsform", e.target.value as Rechtsform)}
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm">
          <option value="einzel-gewerbe">Einzelunternehmen (Gewerbe)</option>
          <option value="freiberuf">Freiberufler:in §18 EStG</option>
          <option value="gbr">GbR</option>
          <option value="ug">UG (haftungsbeschränkt)</option>
          <option value="gmbh">GmbH</option>
        </select>
      </div>
      <div>
        <Label className="text-xs">Beginn der Tätigkeit *</Label>
        <Input type="date" value={data.beginnDatum} onChange={(e) => update("beginnDatum", e.target.value)} className="h-9 mt-1" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs">Beschreibung der Tätigkeit * (min. 20 Zeichen)</Label>
        <textarea value={data.taetigkeit} onChange={(e) => update("taetigkeit", e.target.value)}
          rows={3} className="mt-1 w-full rounded-md border border-input bg-background p-2 text-sm"
          placeholder="z.B. Online-Handel mit selbst hergestelltem Schmuck (Silberschmuck, Vertrieb via Shopify, Etsy und Wochenmärkte in Hamburg)" />
        <div className="text-[10px] text-muted-foreground mt-1">
          {data.taetigkeit.length} / 20+ Zeichen
          {data.taetigkeit.length >= 20 ? " ✓" : " — bitte konkreter"}
        </div>
      </div>
      <div>
        <Label className="text-xs">Anschrift Betriebsstätte (falls anders als Privat)</Label>
        <Input value={data.betriebStrasse} onChange={(e) => update("betriebStrasse", e.target.value)}
          className="h-9 mt-1" placeholder="Straße + Nr. — leer = wie Privatanschrift" />
      </div>
      <div>
        <Label className="text-xs">PLZ + Ort Betrieb</Label>
        <Input value={data.betriebPlzOrt} onChange={(e) => update("betriebPlzOrt", e.target.value)}
          className="h-9 mt-1" placeholder="leer = wie Privat" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs">Bisherige berufliche Tätigkeit</Label>
        <Input value={data.bisherigerBeruf} onChange={(e) => update("bisherigerBeruf", e.target.value)}
          className="h-9 mt-1" placeholder="z.B. Angestellter Web-Entwickler bis 03/2026" />
      </div>
    </div>
  </div>
);

const StepEinkuenfte = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">4. Festsetzung der Vorauszahlungen</h3>
    <p className="text-xs text-muted-foreground mb-2">
      Das FA berechnet hieraus deine quartalsweisen Vorauszahlungen (ESt + ggf. GewSt).
      <strong> Realistisch schätzen!</strong> Zu hoch = unnötig viel Kapital gebunden.
      Zu niedrig = später Nachzahlung + Zinsen.
    </p>
    <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 text-[11px] mb-3">
      💡 Faustregel Jahr 1: Eher konservativ schätzen (z.B. 50–70 % vom Optimismus-Zielwert).
      Das FA passt nach 1. Steuererklärung automatisch an.
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Geschätzter Gewinn Jahr 1 (€)</Label>
        <NumberField value={data.gewinnSchaetzungJahr1} onChange={(n) => update("gewinnSchaetzungJahr1", n)} min={0} className="h-9 mt-1" />
        <div className="text-[10px] text-muted-foreground mt-1">Umsatz minus Betriebsausgaben</div>
      </div>
      <div>
        <Label className="text-xs">Andere Einkünfte Jahr 1 (€)</Label>
        <NumberField value={data.einkuenfteAndere} onChange={(n) => update("einkuenfteAndere", n)} min={0} className="h-9 mt-1" />
        <div className="text-[10px] text-muted-foreground mt-1">Lohn, Vermietung, Kapital etc.</div>
      </div>
    </div>
    <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-[11px]">
      <strong>Vorauszahlungen werden nur festgesetzt wenn:</strong> Jahressteuer voraussichtlich ≥ 400 € (§ 37 EStG).
      Bei niedrigem Gewinn passiert erstmal nichts — Steuer erst nach Veranlagung.
    </div>
  </div>
);

const StepGewinnermittlung = ({ data, update, empfehlung }: StepProps & { empfehlung: Gewinnermittlung }) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">5. Gewinnermittlung</h3>
    <p className="text-xs text-muted-foreground mb-2">
      Wie ermittelst du deinen Gewinn? EÜR = einfache Einnahmen-Überschuss-Rechnung (für Kleine).
      Bilanz = doppelte Buchführung (für Kap.-Ges. Pflicht, sonst freiwillig).
    </p>
    <div className="space-y-2">
      <Label className="text-xs">Methode *</Label>
      {([
        { v: "euer", titel: "EÜR (§ 4 Abs. 3 EStG)", desc: "Einnahmen-Überschuss-Rechnung. Default für Einzel/Freiberuf mit Umsatz < 800k € und Gewinn < 80k €. Einfacher, weniger Buchhaltungsaufwand." },
        { v: "bilanz", titel: "Bilanzierung (§ 4 Abs. 1 EStG)", desc: "Doppelte Buchführung. PFLICHT bei UG/GmbH/AG/eG. Bei Einzel/Gewerbe wenn Umsatz > 800k oder Gewinn > 80k. Freiwillig auch früher möglich." },
        { v: "unsicher", titel: "Noch unsicher", desc: "→ Diesen Schritt mit StB besprechen vor FsE-Abgabe." },
      ] as const).map((opt) => {
        const isEmpfehlung = opt.v === empfehlung;
        return (
          <label key={opt.v} className={`flex items-start gap-2 text-xs cursor-pointer rounded-lg border p-3 ${
            data.gewinnermittlung === opt.v ? "border-accent-blue bg-accent-blue/10"
            : "border-border hover:border-accent-blue/40"
          }`}>
            <input type="radio" name="gewinn" checked={data.gewinnermittlung === opt.v}
              onChange={() => update("gewinnermittlung", opt.v)} className="h-4 w-4 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold flex items-center gap-1.5">
                {opt.titel}
                {isEmpfehlung && (
                  <span className="text-[9px] uppercase rounded-full bg-emerald-500/20 text-emerald-700 px-1.5 py-0.5 font-bold">Empfehlung für dich</span>
                )}
              </div>
              <div className="text-muted-foreground mt-0.5">{opt.desc}</div>
            </div>
          </label>
        );
      })}
    </div>
    <div className="flex items-center gap-2 mt-3">
      <input type="checkbox" id="wjAbw" checked={data.wirtschaftsjahrAbweichend}
        onChange={(e) => update("wirtschaftsjahrAbweichend", e.target.checked)} className="h-4 w-4" />
      <Label htmlFor="wjAbw" className="text-xs cursor-pointer">Abweichendes Wirtschaftsjahr (z.B. 01.07.–30.06.)</Label>
    </div>
    <div className="text-[10px] text-muted-foreground -mt-1">
      Selten gewünscht — meist Kalenderjahr 01.01.–31.12. Bei Wechsel zwingend Zustimmung des FA.
    </div>
  </div>
);

const StepUst = ({ data, update, empfehlung }: StepProps & { empfehlung: UstModus }) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">6. Umsatzsteuer — die wichtigsten Entscheidungen</h3>
    <div className="rounded-lg bg-red-500/10 border-2 border-red-500/40 p-3 text-[11px]">
      ⚠ <strong>Achtung:</strong> Die § 19 KU-Wahl bindet dich <strong>5 Jahre</strong>. Genau überlegen!
      Bei B2B-Kunden meist Regelbesteuerung sinnvoll (sonst kein Vorsteuer-Abzug).
    </div>

    <div className="space-y-2 mt-3">
      <Label className="text-xs">§ 19 UStG Kleinunternehmer-Regelung? *</Label>
      {([
        { v: "ku", titel: "JA — § 19 KU nutzen (keine USt-Ausweisung)", desc: "Vorteil: keine USt-VA, einfachere Rechnungen, B2C-tauglich. Nachteil: kein Vorsteuer-Abzug bei Anschaffungen. Voraussetzung: Vorjahres-Umsatz < 25k UND Folgejahr-Prognose < 100k." },
        { v: "regel", titel: "NEIN — Regelbesteuerung (mit USt)", desc: "USt-VA monatlich/quartalsweise. Vorsteuer-Abzug möglich. Empfehlung bei: B2B-Kunden, hohen Investitionen, Umsatz nahe 25k." },
        { v: "unsicher", titel: "Noch unsicher — mit StB besprechen", desc: "Bei großen Investitionen ist Regelbesteuerung oft besser auch unter 25k." },
      ] as const).map((opt) => {
        const isEmpfehlung = opt.v === empfehlung;
        return (
          <label key={opt.v} className={`flex items-start gap-2 text-xs cursor-pointer rounded-lg border p-3 ${
            data.ustModus === opt.v ? "border-accent-blue bg-accent-blue/10"
            : "border-border hover:border-accent-blue/40"
          }`}>
            <input type="radio" name="ust" checked={data.ustModus === opt.v}
              onChange={() => update("ustModus", opt.v)} className="h-4 w-4 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold flex items-center gap-1.5">
                {opt.titel}
                {isEmpfehlung && (
                  <span className="text-[9px] uppercase rounded-full bg-emerald-500/20 text-emerald-700 px-1.5 py-0.5 font-bold">Empfehlung für dich</span>
                )}
              </div>
              <div className="text-muted-foreground mt-0.5">{opt.desc}</div>
            </div>
          </label>
        );
      })}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      <div>
        <Label className="text-xs">Voraussichtl. Umsatz Jahr 1 (€)</Label>
        <NumberField value={data.umsatzJahr1} onChange={(n) => update("umsatzJahr1", n)} min={0} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Voraussichtl. Umsatz Jahr 2 (€)</Label>
        <NumberField value={data.umsatzJahr2} onChange={(n) => update("umsatzJahr2", n)} min={0} className="h-9 mt-1" />
      </div>
    </div>

    {data.umsatzJahr1 >= 25000 && data.ustModus === "ku" && (
      <div className="rounded-lg bg-red-500/15 border border-red-500/40 p-2 text-[11px] text-red-700 mt-2">
        <AlertCircle className="inline h-3 w-3 mr-1" />
        Geschätzter Umsatz ≥ 25.000 € → § 19 KU nicht möglich! Wähle Regelbesteuerung.
      </div>
    )}

    <div className="border-t pt-3 mt-3">
      <Label className="text-xs">Versteuerungs-Methode *</Label>
      <div className="space-y-2 mt-2">
        {([
          { v: "ist", titel: "Ist-Versteuerung (nach Vereinnahmung)", desc: "USt wird erst fällig wenn der Kunde gezahlt hat. CASHFLOW-Vorteil. Möglich bei Umsatz < 800k oder Freiberuf (immer). EMPFEHLUNG." },
          { v: "soll", titel: "Soll-Versteuerung (nach Vereinbarung)", desc: "USt wird fällig im Monat der Rechnungsstellung — egal ob Kunde gezahlt hat. Pflicht für Kap.-Ges. > 800k Umsatz." },
          { v: "unsicher", titel: "Noch unsicher", desc: "→ Mit StB besprechen, Standard für Solo ist Ist." },
        ] as const).map((opt) => (
          <label key={opt.v} className={`flex items-start gap-2 text-xs cursor-pointer rounded-lg border p-2 ${
            data.versteuerung === opt.v ? "border-accent-blue bg-accent-blue/10"
            : "border-border hover:border-accent-blue/40"
          }`}>
            <input type="radio" name="verst" checked={data.versteuerung === opt.v}
              onChange={() => update("versteuerung", opt.v)} className="h-4 w-4 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">{opt.titel}</div>
              <div className="text-muted-foreground text-[10px] mt-0.5">{opt.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>

    <div className="border-t pt-3 mt-3 space-y-2">
      <label className="flex items-start gap-2 text-xs cursor-pointer">
        <input type="checkbox" checked={data.ustIdParallel}
          onChange={(e) => update("ustIdParallel", e.target.checked)} className="h-4 w-4 mt-0.5" />
        <div>
          <div className="font-semibold">USt-ID-Nummer parallel beantragen</div>
          <div className="text-muted-foreground text-[10px]">Pflicht für EU-Geschäft. Sonst später separat beim BZSt — dauert 2–4 Wochen.</div>
        </div>
      </label>
      <label className="flex items-start gap-2 text-xs cursor-pointer">
        <input type="checkbox" checked={data.ksvMitgliedschaft}
          onChange={(e) => update("ksvMitgliedschaft", e.target.checked)} className="h-4 w-4 mt-0.5" />
        <div>
          <div className="font-semibold">KSV-Mitgliedschaft (Künstlersozialkasse)</div>
          <div className="text-muted-foreground text-[10px]">Nur für selbstständige Künstler/Publizisten. Bund zahlt 50 % der GKV+RV-Beiträge.</div>
        </div>
      </label>
    </div>
  </div>
);

const StepSonstiges = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">7. Sonstiges (Steuerberater-Vollmacht)</h3>
    <p className="text-xs text-muted-foreground mb-2">
      Hast du einen Steuerberater? Wenn ja, kannst du ihm hier direkt eine Bekanntgabe-Vollmacht erteilen —
      dann bekommt er alle Bescheide vom FA parallel zu dir.
    </p>
    <label className="flex items-start gap-2 text-xs cursor-pointer rounded-lg border border-border bg-card p-3">
      <input type="checkbox" checked={data.stbVollmacht}
        onChange={(e) => update("stbVollmacht", e.target.checked)} className="h-4 w-4 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold">Bekanntgabe-Vollmacht für Steuerberater erteilen</div>
        <div className="text-muted-foreground text-[10px] mt-0.5">FA sendet Bescheide direkt an den StB.</div>
      </div>
    </label>
    {data.stbVollmacht && (
      <div>
        <Label className="text-xs">StB Name + Kanzlei</Label>
        <Input value={data.stbName} onChange={(e) => update("stbName", e.target.value)} className="h-9 mt-1"
          placeholder="z.B. Müller Steuerberatung GmbH, Hamburg" />
      </div>
    )}
    <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-[11px] mt-3">
      💡 Wenn du noch keinen StB hast: <Link to="/cockpit/stb-cost-benefit" className="underline text-accent-blue">StB-Cost-Benefit-Check</Link> hilft bei der Entscheidung.
    </div>
  </div>
);

const StepSpickzettel = ({ data, stepValid, allValid, onGenerate }: {
  data: FseData; stepValid: boolean[]; allValid: boolean; onGenerate: () => void;
}) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">8. Spickzettel + ELSTER-Einreichung</h3>

    {!allValid && (
      <div className="rounded-lg bg-amber-500/10 border border-amber-500/40 p-3 text-xs">
        <strong className="text-amber-700">⚠ Es fehlen noch Pflicht-Eingaben:</strong>
        <ul className="mt-1 ml-4 list-disc text-muted-foreground">
          {stepValid.slice(0, 7).map((ok, i) => !ok && (
            <li key={i}>Step {i + 1}: {STEP_LABELS[i]}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs space-y-2">
      <div className="font-semibold text-emerald-700 flex items-center gap-1">
        <CheckCircle2 className="h-4 w-4" /> Deine wichtigsten Entscheidungen (Zusammenfassung):
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-[11px]">
        <SummaryRow label="USt-Status" value={data.ustModus === "ku" ? "§ 19 KU (5 Jahre Bindung!)"
          : data.ustModus === "regel" ? "Regelbesteuerung" : "⚠ noch unsicher"} />
        <SummaryRow label="Versteuerung" value={data.versteuerung === "ist" ? "Ist-Versteuerung"
          : data.versteuerung === "soll" ? "Soll-Versteuerung" : "⚠ noch unsicher"} />
        <SummaryRow label="Gewinnermittlung" value={data.gewinnermittlung === "euer" ? "EÜR"
          : data.gewinnermittlung === "bilanz" ? "Bilanz" : "⚠ noch unsicher"} />
        <SummaryRow label="USt-ID parallel?" value={data.ustIdParallel ? "JA" : "NEIN"} />
        <SummaryRow label="Geschätzter Gewinn Jahr 1" value={`${data.gewinnSchaetzungJahr1.toLocaleString("de-DE")} €`} />
        <SummaryRow label="Geschätzter Umsatz Jahr 1" value={`${data.umsatzJahr1.toLocaleString("de-DE")} €`} />
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <Button onClick={onGenerate} disabled={!allValid}
        className="bg-emerald-700 hover:bg-emerald-800 text-white">
        <FileDown className="h-4 w-4 mr-2" /> Spickzettel-PDF herunterladen
      </Button>
      <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewnatp"
        target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary/40">
        <ExternalLink className="h-4 w-4" /> ELSTER FsE öffnen (natürliche Person)
      </a>
      <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/fsegewjur"
        target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-secondary/40">
        <ExternalLink className="h-4 w-4" /> ELSTER FsE öffnen (jur. Person)
      </a>
    </div>

    <div className="rounded-lg bg-amber-500/10 border-2 border-amber-500/50 p-3 text-xs space-y-2 mt-3">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="text-amber-800">Workflow nach Download:</strong>
          <ol className="mt-1.5 space-y-1 list-decimal list-inside text-foreground/90">
            <li>Spickzettel-PDF ausdrucken oder als 2. Monitor öffnen.</li>
            <li>ELSTER-Konto erstellen falls noch nicht vorhanden (kostenlos, dauert 2–4 Wochen wegen Aktivierungs-Brief!).</li>
            <li>ELSTER → Formulare → "Fragebogen zur steuerlichen Erfassung" (passender Typ).</li>
            <li>Felder 1:1 vom Spickzettel abschreiben — Reihenfolge stimmt.</li>
            <li>Vor Absenden nochmal alles prüfen — besonders § 19 KU (5-Jahres-Bindung) + Soll/Ist!</li>
            <li>Absenden. Steuernummer kommt 2–6 Wochen später per Post.</li>
          </ol>
          <div className="text-[11px] text-muted-foreground mt-2 italic">
            Pflicht-Frist: Abgabe innerhalb 1 Monat ab Tätigkeitsaufnahme (§ 138 AO).
            Verspätung kann zu Verspätungszuschlag führen.
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 rounded bg-card/50 px-2 py-1">
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-mono font-semibold">{value}</span>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — FsE-Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { b: "FsE (Fragebogen zur steuerlichen Erfassung)", e: "Pflicht-Online-Formular bei ELSTER, das jeder Selbstständige innerhalb 1 Monat nach Tätigkeitsaufnahme abgeben muss (§ 138 AO). Hier teilt das FA dir deine Steuernummer zu und legt Vorauszahlungen + USt-Status fest. 100 % digital, kein Papier-Versand." },
        { b: "Steuer-ID vs. Steuernummer", e: "Steuer-ID (IDNr) = 11-stellige LEBENSLANGE Nummer vom BZSt, bekommst du bei Geburt oder als Zuwanderer. Steuernummer = vom Wohnsitz-FA zugeteilt, ändert sich bei Umzug. Im FsE brauchst du die Steuer-ID; die Steuernummer KOMMT NACH der FsE-Abgabe." },
        { b: "§ 19 UStG Kleinunternehmer (Reform 2025)", e: "Wahl-Recht (kein Zwang!): Wenn Vorjahres-Umsatz < 25.000 € UND Folgejahr-Prognose < 100.000 €. Vorteil: keine USt-Ausweisung, keine USt-VA. Nachteil: kein Vorsteuer-Abzug. ⚠ 5 Jahre Bindung an die getroffene Wahl — danach Wechsel zur Regelbesteuerung möglich." },
        { b: "EÜR vs. Bilanzierung", e: "EÜR (Einnahmen-Überschuss-Rechnung, § 4 Abs. 3 EStG) = einfache Zufluss/Abfluss-Rechnung. Pflicht für Bilanz: Kap.-Ges. (UG/GmbH/AG) IMMER, Gewerbe ab 800k Umsatz/80k Gewinn (§ 141 AO), Freiberuf NIE. EÜR ist deutlich weniger Aufwand." },
        { b: "Soll- vs. Ist-Versteuerung", e: "Soll = USt fällig im Monat der Rechnungsstellung. Ist = USt fällig erst nach Vereinnahmung (Kunde hat gezahlt). Ist hat Cashflow-Vorteil, möglich bei Umsatz < 800k (§ 20 UStG) oder Freiberuf (immer). Standard-Empfehlung für Solo: Ist." },
        { b: "Vorauszahlungen ESt + GewSt", e: "Quartalsweise (10.3, 10.6, 10.9, 10.12), basierend auf der im FsE angegebenen Gewinn-Schätzung. Werden nach erster Steuererklärung automatisch angepasst. Festsetzung erst ab voraussichtlicher Jahressteuer ≥ 400 € (§ 37 EStG)." },
        { b: "USt-ID parallel beantragen", e: "Im FsE direkt mit ankreuzen — dann kommt USt-ID gleichzeitig mit Steuernummer. Sonst musst du sie später separat beim BZSt beantragen (2–4 Wochen Wartezeit). Pflicht für EU-Geschäft (B2B + B2C-Plattformen), sonst optional." },
        { b: "Bekanntgabe-Vollmacht StB", e: "Im FsE kannst du deinem Steuerberater eine Bekanntgabe-Vollmacht erteilen. Dann sendet das FA alle Bescheide direkt an den StB statt an dich. Praktisch: StB sieht Fristen sofort. Nachteil: du musst aktiv anrufen für Status." },
        { b: "Pflicht-Frist 1 Monat", e: "Du musst den FsE innerhalb 1 Monat ab Tätigkeitsaufnahme einreichen (§ 138 AO). Verspätung kann zu Verspätungszuschlag führen. Tipp: am gleichen Tag wie Gewerbeanmeldung schon vorbereiten, FA-Schreiben kommt eh erst 2-4 Wochen später." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default FseWizard;
