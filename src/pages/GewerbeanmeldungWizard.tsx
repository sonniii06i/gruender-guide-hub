/**
 * GewerbeanmeldungWizard — "Gewerbeanmeldung GewA1 vorbereiten"
 *
 * Tool 10 der Anfänger-Wave (Starter-Kategorie, Wave 3).
 *
 * 7-Step-Wizard durch die Eingabe-Felder des amtlichen GewA1-Formulars:
 *  1. Persönliche Daten
 *  2. Anschrift (Privat + Betriebsstätte)
 *  3. Rechtsform + Anmeldegrund
 *  4. Tätigkeit (Klartext mit Live-Qualitäts-Check)
 *  5. WZ-2008-Branchenschlüssel (durchsuchbar)
 *  6. Beginn + KU-Optierung §19 UStG
 *  7. Zusammenfassung + PDF-Download
 *
 * Tool generiert KEIN amtliches GewA1-PDF (das müsste das Original-Behörden-
 * Formular sein), sondern eine **Vorbereitungs-Übersicht** zum Abschreiben
 * ins Online-Formular oder zum Mitbringen ins Bürgeramt.
 *
 * Quellen:
 *  - § 14 GewO (Anzeigepflicht)
 *  - GewA1-Formular: bundeseinheitlich, online z.B. service.bund.de
 *  - WZ 2008: Statistisches Bundesamt
 */
import { useMemo, useState } from "react";
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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileDown,
  Search,
  XCircle,
} from "lucide-react";
import jsPDF from "jspdf";
import { WZ_2008, WZ_GRUPPEN, type WzEntry, type WzGruppe } from "@/data/wz2008";

type Rechtsform = "einzel" | "gbr" | "ohg" | "kg" | "ug" | "gmbh" | "ag" | "eg" | "andere";
type Anmeldegrund = "neugruendung" | "uebernahme" | "filiale" | "wiederaufnahme" | "umzug";
type KuStatus = "ja" | "nein" | "unsicher";

type WizardData = {
  // Step 1: Person
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  geburtsort: string;
  staatsangehoerigkeit: string;
  // Step 2: Anschrift
  privatStrasse: string;
  privatPlz: string;
  privatOrt: string;
  betriebsstaetteAndere: boolean;
  betriebStrasse: string;
  betriebPlz: string;
  betriebOrt: string;
  // Step 3: Rechtsform + Grund
  rechtsform: Rechtsform;
  anmeldegrund: Anmeldegrund;
  firmierung: string;
  // Step 4: Tätigkeit (Klartext)
  taetigkeit: string;
  // Step 5: WZ 2008
  wzCode: string;
  // Step 6: Beginn + KU
  beginnDatum: string;
  mitarbeiterZahl: number;
  kuStatus: KuStatus;
  voraussichtlicherUmsatz: number;
};

const heute = new Date().toISOString().split("T")[0];
const LS_KEY = "ggh-gewa1-v1";

const defaultData: WizardData = {
  vorname: "",
  nachname: "",
  geburtsdatum: "",
  geburtsort: "",
  staatsangehoerigkeit: "deutsch",
  privatStrasse: "",
  privatPlz: "",
  privatOrt: "",
  betriebsstaetteAndere: false,
  betriebStrasse: "",
  betriebPlz: "",
  betriebOrt: "",
  rechtsform: "einzel",
  anmeldegrund: "neugruendung",
  firmierung: "",
  taetigkeit: "",
  wzCode: "",
  beginnDatum: heute,
  mitarbeiterZahl: 0,
  kuStatus: "unsicher",
  voraussichtlicherUmsatz: 25000,
};

const STEP_LABELS = [
  "Person",
  "Anschrift",
  "Rechtsform",
  "Tätigkeit",
  "Branche (WZ)",
  "Beginn + §19",
  "Zusammenfassung",
];

const GewerbeanmeldungWizard = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(() => {
    if (typeof window === "undefined") return defaultData;
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { return { ...defaultData, ...JSON.parse(saved) }; } catch { return defaultData; }
    }
    return defaultData;
  });

  const update = <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  // === Step-Validierung ===
  const stepValid = useMemo(() => {
    const checks: boolean[] = [];
    checks[0] = !!(data.vorname && data.nachname && data.geburtsdatum && data.geburtsort && data.staatsangehoerigkeit);
    checks[1] = !!(data.privatStrasse && data.privatPlz && data.privatOrt
      && (!data.betriebsstaetteAndere || (data.betriebStrasse && data.betriebPlz && data.betriebOrt)));
    checks[2] = !!(data.rechtsform && data.anmeldegrund);
    checks[3] = data.taetigkeit.trim().length >= 30; // Mindest-Qualität
    checks[4] = !!data.wzCode;
    checks[5] = !!(data.beginnDatum && data.kuStatus);
    checks[6] = true;
    return checks;
  }, [data]);

  const allValid = stepValid.every(Boolean);

  const saveLocal = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  };

  const reset = () => {
    if (confirm("Alle Eingaben löschen?")) {
      localStorage.removeItem(LS_KEY);
      setData(defaultData);
      setStep(0);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    let y = 20;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Gewerbeanmeldung – Vorbereitung GewA1", 20, y);
    y += 8;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Diese Übersicht dient zur Vorbereitung. Trage die Daten ins amtliche GewA1-Formular ein (online oder Bürgeramt).", 20, y);
    y += 8;
    doc.line(20, y, W - 20, y);
    y += 6;

    // Helper für Sektion
    const sektion = (title: string, rows: Array<[string, string]>) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(title, 20, y);
      y += 5;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60);
      rows.forEach(([k, v]) => {
        if (!v) return;
        const split = doc.splitTextToSize(v, W - 90);
        doc.text(k, 20, y);
        split.forEach((line: string, i: number) => doc.text(line, 75, y + i * 4));
        y += Math.max(5, split.length * 4);
        if (y > 280) { doc.addPage(); y = 20; }
      });
      y += 3;
    };

    const rechtsformText: Record<Rechtsform, string> = {
      einzel: "Einzelunternehmen", gbr: "GbR", ohg: "OHG", kg: "KG",
      ug: "UG (haftungsbeschränkt)", gmbh: "GmbH", ag: "AG", eg: "eG", andere: "Andere",
    };
    const anmeldegrundText: Record<Anmeldegrund, string> = {
      neugruendung: "Neugründung", uebernahme: "Übernahme", filiale: "Filiale/Zweigniederlassung",
      wiederaufnahme: "Wiederaufnahme", umzug: "Verlegung",
    };
    const kuText: Record<KuStatus, string> = {
      ja: "Ja, ich nutze § 19 UStG (Kleinunternehmer)",
      nein: "Nein, Regelbesteuerung gewählt",
      unsicher: "Noch unsicher (im FsE entscheiden)",
    };
    const wzEntry = WZ_2008.find((w) => w.code === data.wzCode);

    sektion("1. Person", [
      ["Name:", `${data.vorname} ${data.nachname}`],
      ["Geburtsdatum:", data.geburtsdatum.split("-").reverse().join(".")],
      ["Geburtsort:", data.geburtsort],
      ["Staatsangehörigkeit:", data.staatsangehoerigkeit],
    ]);

    sektion("2. Anschrift", [
      ["Privat:", `${data.privatStrasse}, ${data.privatPlz} ${data.privatOrt}`],
      ["Betriebsstätte:", data.betriebsstaetteAndere
        ? `${data.betriebStrasse}, ${data.betriebPlz} ${data.betriebOrt}`
        : "wie Privatanschrift"],
    ]);

    sektion("3. Rechtsform + Anmeldung", [
      ["Rechtsform:", rechtsformText[data.rechtsform]],
      ["Anmeldegrund:", anmeldegrundText[data.anmeldegrund]],
      ["Firmierung:", data.firmierung || "(nicht erforderlich bei Einzel)"],
    ]);

    sektion("4. Tätigkeit (Klartext)", [
      ["Beschreibung:", data.taetigkeit],
    ]);

    sektion("5. Branchenschlüssel WZ 2008", [
      ["Code:", data.wzCode],
      ["Bezeichnung:", wzEntry?.label || "—"],
    ]);

    sektion("6. Beginn + § 19 UStG", [
      ["Beginn der Tätigkeit:", data.beginnDatum.split("-").reverse().join(".")],
      ["Mitarbeiterzahl:", String(data.mitarbeiterZahl)],
      ["KU-Optierung:", kuText[data.kuStatus]],
      ["Voraussichtlicher Jahres-Umsatz:", `${data.voraussichtlicherUmsatz.toLocaleString("de-DE")} €`],
    ]);

    // Hinweise
    if (y > 250) { doc.addPage(); y = 20; }
    y += 5;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Wichtige nächste Schritte", 20, y);
    y += 5;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    const naechsteSchritte = [
      "1. GewA1-Formular ausfüllen (online: service.bund.de oder Bürgeramt).",
      "2. Gebühr 20-65 € (Land+Stadt-abhängig) zahlen.",
      "3. Innerhalb von 4 Wochen kommt der Fragebogen zur steuerlichen Erfassung (FsE) vom Finanzamt.",
      "4. Im FsE entscheidest du final über § 19 KU oder Regelbesteuerung (5-Jahres-Bindung).",
      "5. Steuernummer + ggf. USt-ID werden zugeteilt.",
      "6. Bei IHK/HwK automatische Mitgliedschaft (Beitrag ab Gewinn > 5.200 €).",
      "7. Geschäftskonto eröffnen (empfohlen, aber bei Einzel rechtlich nicht zwingend).",
      "8. Berufshaftpflicht prüfen (je nach Tätigkeit Pflicht oder dringend empfohlen).",
    ];
    naechsteSchritte.forEach((s) => {
      const split = doc.splitTextToSize(s, W - 40);
      doc.text(split, 20, y);
      y += split.length * 4;
    });

    doc.save(`gewerbeanmeldung-${data.nachname || "vorbereitung"}.pdf`);
  };

  // === Tätigkeits-Qualitäts-Check ===
  const taetigkeitsQualitaet = useMemo(() => {
    const text = data.taetigkeit.trim();
    const len = text.length;
    const woerter = text.split(/\s+/).filter(Boolean).length;
    const issues: string[] = [];

    if (len < 30) issues.push("Zu kurz — mindestens 30 Zeichen, besser 80-150 Zeichen mit konkreten Produkten/Dienstleistungen.");
    if (woerter < 5) issues.push("Mindestens 5 Wörter empfohlen.");
    if (/^(handel|online|service|verkauf|dienstleistung)$/i.test(text)) {
      issues.push("Zu generisch. Das FA wird nachfragen 'Handel mit was?' — konkret werden!");
    }
    if (!/\bmit\b|\bvon\b|\bfür\b|\büber\b|\bsowie\b/.test(text.toLowerCase())) {
      issues.push("Tipp: Verbindungs-Wörter wie 'mit', 'von', 'für' geben Struktur (z.B. 'Onlinehandel mit X über Plattform Y').");
    }

    return {
      len,
      woerter,
      ok: issues.length === 0 && len >= 30,
      issues,
      qualitaet: issues.length === 0 && len >= 50 ? "gut" : issues.length === 0 && len >= 30 ? "ausreichend" : "unzureichend",
    };
  }, [data.taetigkeit]);

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Gewerbeanmeldung-Wizard"
      subtitle="7-Step-Vorbereitung für das amtliche GewA1-Formular. Mit Tätigkeits-Qualitäts-Check, WZ-2008-Branchenschlüssel-Suche, §19 KU-Entscheidung und PDF-Vorbereitung zum Mitbringen ins Bürgeramt."
    >
      <BeginnerHero />

      {/* === Progress === */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="text-xs text-muted-foreground">Schritt {step + 1} von {STEP_LABELS.length}: <strong className="text-foreground">{STEP_LABELS[step]}</strong></div>
          <div className="flex gap-1">
            {STEP_LABELS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-2 w-8 rounded-full transition ${
                  i === step ? "bg-accent-blue"
                  : stepValid[i] ? "bg-emerald-500"
                  : i < step ? "bg-amber-500" : "bg-secondary"
                }`}
                title={`Step ${i + 1}: ${STEP_LABELS[i]} ${stepValid[i] ? "✓" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* === Step Content === */}
        <div className="min-h-[400px]">
          {step === 0 && <StepPerson data={data} update={update} />}
          {step === 1 && <StepAnschrift data={data} update={update} />}
          {step === 2 && <StepRechtsform data={data} update={update} />}
          {step === 3 && <StepTaetigkeit data={data} update={update} qualitaet={taetigkeitsQualitaet} />}
          {step === 4 && <StepBranche data={data} update={update} />}
          {step === 5 && <StepBeginn data={data} update={update} />}
          {step === 6 && <StepZusammenfassung data={data} stepValid={stepValid} allValid={allValid} onGeneratePdf={generatePdf} />}
        </div>

        {/* === Navigation === */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <Button onClick={() => setStep(Math.max(0, step - 1))} variant="outline" disabled={step === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Zurück
          </Button>
          <div className="flex gap-2">
            <Button onClick={saveLocal} variant="ghost" size="sm" className="text-xs">Zwischenspeichern</Button>
            <Button onClick={reset} variant="ghost" size="sm" className="text-xs text-red-700">Reset</Button>
          </div>
          <Button
            onClick={() => setStep(Math.min(STEP_LABELS.length - 1, step + 1))}
            disabled={step === STEP_LABELS.length - 1}
            className="bg-accent-blue text-white hover:bg-accent-blue/90"
          >
            Weiter <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <Link to="/cockpit/gewerbe-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Brauche ich Gewerbe? (Tool 1)</div>
          <div className="text-muted-foreground">Vorab klären: ist überhaupt nötig?</div>
        </Link>
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">KU-Schwellen (Tool 3) →</div>
          <div className="text-muted-foreground">25k/100k Grenze 2025/2026</div>
        </Link>
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§14 GewO (Gewerbeanzeige)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
          { label: "WZ 2008 — Statistisches Bundesamt", url: "https://www.destatis.de/DE/Methoden/Klassifikationen/Gueter-Wirtschaftsklassifikationen/Downloads/klassifikation-wz-2008.pdf" },
          { label: "Online-Gewerbeanmeldung Service.Bund.de", url: "https://verwaltung.bund.de" },
          { label: "Bürgerservice / GewA1-Formular", url: "https://www.einheitlicher-ansprechpartner.eu" },
        ]}
        note="GewA1 ist bundeseinheitlich, aber Gebühr (20-65 €) variiert pro Stadt. Bearbeitung in Bürgeramt oder online (verwaltung.bund.de). Nach Anmeldung kommt automatisch Fragebogen zur steuerlichen Erfassung (FsE) vom Finanzamt — dort wird § 19 KU finalisiert. Bei erlaubnispflichtigen Gewerben (Gastronomie, Makler, Sicherheit, Spielhalle, etc.) brauchst du ZUSÄTZLICH Erlaubnis vor Anmeldung."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Step Components
// ============================================================================
type StepProps = { data: WizardData; update: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void };

const StepPerson = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">1. Persönliche Daten</h3>
    <p className="text-xs text-muted-foreground mb-3">Wie sie im Personalausweis stehen. Wird vom Bürgeramt mit dem Ausweis abgeglichen.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Vorname *</Label>
        <Input value={data.vorname} onChange={(e) => update("vorname", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Nachname *</Label>
        <Input value={data.nachname} onChange={(e) => update("nachname", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Geburtsdatum *</Label>
        <Input type="date" value={data.geburtsdatum} onChange={(e) => update("geburtsdatum", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Geburtsort *</Label>
        <Input value={data.geburtsort} onChange={(e) => update("geburtsort", e.target.value)} className="h-9 mt-1" />
      </div>
      <div className="md:col-span-2">
        <Label className="text-xs">Staatsangehörigkeit *</Label>
        <Input value={data.staatsangehoerigkeit} onChange={(e) => update("staatsangehoerigkeit", e.target.value)} className="h-9 mt-1" />
        <div className="text-[10px] text-muted-foreground mt-1">Bei nicht-EU-Bürgern: Aufenthaltstitel + Selbstständigkeits-Erlaubnis im Bürgeramt zeigen.</div>
      </div>
    </div>
  </div>
);

const StepAnschrift = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">2. Anschrift</h3>
    <p className="text-xs text-muted-foreground mb-3">Privatanschrift = Wohnsitz. Betriebsstätte = wo du arbeitest (kann gleich sein).</p>
    <div className="rounded-lg bg-secondary/40 p-3 space-y-2">
      <div className="text-xs font-semibold">Privatanschrift</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input placeholder="Straße + Nr." value={data.privatStrasse} onChange={(e) => update("privatStrasse", e.target.value)} className="h-9" />
        <Input placeholder="PLZ" value={data.privatPlz} onChange={(e) => update("privatPlz", e.target.value)} className="h-9" />
        <Input placeholder="Ort" value={data.privatOrt} onChange={(e) => update("privatOrt", e.target.value)} className="h-9" />
      </div>
    </div>
    <label className="flex items-center gap-2 text-xs cursor-pointer">
      <input type="checkbox" checked={data.betriebsstaetteAndere} onChange={(e) => update("betriebsstaetteAndere", e.target.checked)} className="h-4 w-4" />
      <span>Betriebsstätte ist eine andere Adresse als die Privatanschrift</span>
    </label>
    {data.betriebsstaetteAndere && (
      <div className="rounded-lg bg-secondary/40 p-3 space-y-2">
        <div className="text-xs font-semibold">Betriebsstätte</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input placeholder="Straße + Nr." value={data.betriebStrasse} onChange={(e) => update("betriebStrasse", e.target.value)} className="h-9" />
          <Input placeholder="PLZ" value={data.betriebPlz} onChange={(e) => update("betriebPlz", e.target.value)} className="h-9" />
          <Input placeholder="Ort" value={data.betriebOrt} onChange={(e) => update("betriebOrt", e.target.value)} className="h-9" />
        </div>
        <div className="text-[10px] text-muted-foreground">Bei Co-Working/virtueller Adresse: muss eine GENUTZTE Räumlichkeit sein (FA prüft).</div>
      </div>
    )}
  </div>
);

const StepRechtsform = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">3. Rechtsform + Anmeldegrund</h3>
    <p className="text-xs text-muted-foreground mb-3">90 % der Solo-Selbstständigen = Einzelunternehmen (keine Stammkapital, einfache Anmeldung).</p>
    <div>
      <Label className="text-xs">Rechtsform *</Label>
      <select value={data.rechtsform} onChange={(e) => update("rechtsform", e.target.value as Rechtsform)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
        <option value="einzel">Einzelunternehmen (Empfohlen für Solo)</option>
        <option value="gbr">GbR (Gesellschaft bürgerlichen Rechts, 2+ Personen)</option>
        <option value="ohg">OHG (Offene Handelsgesellschaft, ins Handelsregister)</option>
        <option value="kg">KG (Kommanditgesellschaft)</option>
        <option value="ug">UG (haftungsbeschränkt, Mini-GmbH, ab 1 € Stammkapital)</option>
        <option value="gmbh">GmbH (25.000 € Stammkapital)</option>
        <option value="ag">AG (Aktiengesellschaft, 50.000 € Grundkapital)</option>
        <option value="eg">eG (Eingetragene Genossenschaft)</option>
        <option value="andere">Andere</option>
      </select>
    </div>
    <div>
      <Label className="text-xs">Anmeldegrund *</Label>
      <select value={data.anmeldegrund} onChange={(e) => update("anmeldegrund", e.target.value as Anmeldegrund)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
        <option value="neugruendung">Neugründung</option>
        <option value="uebernahme">Übernahme eines bestehenden Betriebs</option>
        <option value="filiale">Filiale / Zweigniederlassung</option>
        <option value="wiederaufnahme">Wiederaufnahme nach Pause</option>
        <option value="umzug">Verlegung aus anderer Gemeinde</option>
      </select>
    </div>
    <div>
      <Label className="text-xs">Firmierung (optional, bei UG/GmbH Pflicht)</Label>
      <Input value={data.firmierung} onChange={(e) => update("firmierung", e.target.value)} placeholder="z.B. 'Max Mustermann Beratung'" className="h-9 mt-1" />
      <div className="text-[10px] text-muted-foreground mt-1">
        Einzel: optional, aber sinnvoll. Format: Vor- und Nachname + ggf. Branche. UG/GmbH: muss Rechtsform enthalten.
      </div>
    </div>
  </div>
);

const StepTaetigkeit = ({ data, update, qualitaet }: StepProps & { qualitaet: { len: number; woerter: number; ok: boolean; issues: string[]; qualitaet: string } }) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">4. Tätigkeitsbeschreibung</h3>
    <p className="text-xs text-muted-foreground mb-3">
      Wichtigstes Feld im GewA1. <strong>So genau wie möglich beschreiben</strong> — sonst fragt das FA nach.
    </p>

    {/* Beispiele */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="rounded-lg bg-red-500/5 border border-red-500/30 p-3 text-xs">
        <div className="flex items-center gap-1 font-semibold text-red-700 mb-1">
          <XCircle className="h-3 w-3" /> Schlecht
        </div>
        <ul className="text-muted-foreground space-y-1">
          <li>• „Onlinehandel"</li>
          <li>• „Beratung"</li>
          <li>• „Dienstleistungen"</li>
          <li>• „IT"</li>
        </ul>
      </div>
      <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/30 p-3 text-xs">
        <div className="flex items-center gap-1 font-semibold text-emerald-700 mb-1">
          <CheckCircle2 className="h-3 w-3" /> Gut
        </div>
        <ul className="text-muted-foreground space-y-1">
          <li>• „Onlinehandel mit Sportbekleidung, Sportzubehör und Nahrungsergänzungsmitteln über eigenen Shop und Amazon Marketplace"</li>
          <li>• „Unternehmensberatung im Bereich Online-Marketing für KMU"</li>
          <li>• „Erstellung von Web-Anwendungen und Mobile-Apps für gewerbliche Kunden"</li>
        </ul>
      </div>
    </div>

    <div>
      <Label className="text-xs">Beschreibung *</Label>
      <textarea
        value={data.taetigkeit}
        onChange={(e) => update("taetigkeit", e.target.value)}
        rows={4}
        className="mt-1 w-full rounded-md border border-input bg-background p-2 text-sm"
        placeholder="z.B. Onlinehandel mit Naturkosmetik, Hautpflegeprodukten und ergänzenden Wellness-Artikeln über eigenen Webshop und Marktplätze (Amazon, Etsy)"
      />
      <div className="flex items-center justify-between text-[11px] mt-1">
        <span className={`font-semibold ${
          qualitaet.qualitaet === "gut" ? "text-emerald-700"
          : qualitaet.qualitaet === "ausreichend" ? "text-amber-700"
          : "text-red-700"
        }`}>
          Qualität: {qualitaet.qualitaet.toUpperCase()}
        </span>
        <span className="text-muted-foreground">{qualitaet.len} Zeichen · {qualitaet.woerter} Wörter</span>
      </div>
      {qualitaet.issues.length > 0 && (
        <ul className="mt-2 space-y-1">
          {qualitaet.issues.map((i) => (
            <li key={i} className="flex items-start gap-1 text-[11px] text-amber-700">
              <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" /> <span>{i}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const StepBranche = ({ data, update }: StepProps) => {
  const [suche, setSuche] = useState("");
  const [gruppe, setGruppe] = useState<WzGruppe | "alle">("alle");

  const gefiltert = useMemo(() => {
    const q = suche.toLowerCase().trim();
    return WZ_2008.filter((w) => {
      if (gruppe !== "alle" && w.gruppe !== gruppe) return false;
      if (!q) return true;
      return w.label.toLowerCase().includes(q)
        || w.code.includes(q)
        || w.beispiele.some((b) => b.toLowerCase().includes(q));
    });
  }, [suche, gruppe]);

  const aktuell = WZ_2008.find((w) => w.code === data.wzCode);

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm">5. Branchenschlüssel WZ 2008</h3>
      <p className="text-xs text-muted-foreground mb-3">
        5-stellige WZ-2008-Klassifikation. Beste-Schätzung reicht — FA kann später korrigieren.
        Hier eine Auswahl der häufigsten für Solo-Selbstständige.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
          <Input placeholder="Suche (z.B. 'Versandhandel', 'Programmierung', '70.22')" value={suche} onChange={(e) => setSuche(e.target.value)} className="h-9 pl-8" />
        </div>
        <select value={gruppe} onChange={(e) => setGruppe(e.target.value as WzGruppe | "alle")} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
          <option value="alle">Alle Gruppen</option>
          {WZ_GRUPPEN.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {aktuell && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs">
          <div className="font-semibold text-emerald-700">✅ Ausgewählt: {aktuell.code} — {aktuell.label}</div>
          <div className="text-muted-foreground mt-1">Beispiele: {aktuell.beispiele.join(" · ")}</div>
        </div>
      )}

      <div className="max-h-80 overflow-y-auto rounded-lg border border-border bg-card divide-y divide-border">
        {gefiltert.map((w) => (
          <button
            key={w.code}
            onClick={() => update("wzCode", w.code)}
            className={`w-full text-left p-2 text-xs hover:bg-secondary/50 transition ${data.wzCode === w.code ? "bg-emerald-500/10" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
              <div className="min-w-0">
                <span className="font-mono font-semibold text-accent-blue">{w.code}</span>
                <span className="ml-2 font-medium">{w.label}</span>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{w.gruppe}</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{w.beispiele.join(" · ")}</div>
          </button>
        ))}
        {gefiltert.length === 0 && (
          <div className="p-4 text-xs text-muted-foreground text-center">
            Keine Treffer. Versuche einen anderen Suchbegriff oder wähle "Alle Gruppen".
          </div>
        )}
      </div>
    </div>
  );
};

const StepBeginn = ({ data, update }: StepProps) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">6. Beginn der Tätigkeit + § 19 UStG</h3>
    <p className="text-xs text-muted-foreground mb-3">Datum darf in der Vergangenheit liegen (rückwirkende Anmeldung möglich, FA prüft).</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Beginn der Tätigkeit *</Label>
        <Input type="date" value={data.beginnDatum} onChange={(e) => update("beginnDatum", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Anzahl Mitarbeiter (ohne dich)</Label>
        <NumberField value={data.mitarbeiterZahl} onChange={(n) => update("mitarbeiterZahl", n)} min={0} className="h-9 mt-1" />
      </div>
    </div>

    <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
      <h4 className="font-bold text-sm mb-2">§ 19 UStG Kleinunternehmer — Entscheidung</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Wenn dein Umsatz im 1. Jahr <strong>{"<"} 25.000 €</strong> bleibt (und prognostiziert {"<"} 100.000 € im Folgejahr): KU-Option.
        Vorteil: keine USt-Ausweisung, keine USt-VA. Nachteil: kein Vorsteuer-Abzug (Anschaffungen ohne USt-Erstattung). 5 Jahre Bindung.
      </p>
      <div className="space-y-2">
        <Label className="text-xs">Möchtest du § 19 UStG nutzen? *</Label>
        {(["ja", "nein", "unsicher"] as KuStatus[]).map((opt) => (
          <label key={opt} className="flex items-start gap-2 text-xs cursor-pointer rounded-lg border border-border p-2 hover:border-accent-blue">
            <input
              type="radio"
              name="kuStatus"
              checked={data.kuStatus === opt}
              onChange={() => update("kuStatus", opt)}
              className="h-4 w-4 mt-0.5"
            />
            <div>
              <strong>
                {opt === "ja" ? "Ja, § 19 KU nutzen" : opt === "nein" ? "Nein, Regelbesteuerung" : "Noch unsicher"}
              </strong>
              <div className="text-muted-foreground">
                {opt === "ja" ? "Empfohlen bei B2C (Endverbraucher), niedrigem Anschaffungs-Aufwand und Umsatz unter Grenze."
                  : opt === "nein" ? "Empfohlen bei B2B-Geschäft (Kunden brauchen USt-Beleg) oder hohem Vorsteuer-Volumen."
                  : "Im FsE (Fragebogen zur steuerlichen Erfassung) entscheiden — kommt 4 Wochen nach Anmeldung."}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-3">
        <Label className="text-xs">Voraussichtlicher Jahres-Umsatz (€)</Label>
        <NumberField value={data.voraussichtlicherUmsatz} onChange={(n) => update("voraussichtlicherUmsatz", n)} min={0} className="h-9 mt-1" />
        {data.voraussichtlicherUmsatz > 25000 && data.kuStatus === "ja" && (
          <div className="text-[11px] text-amber-700 mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> ⚠ Bei {">"} 25k € Umsatz funktioniert KU nicht. Wähle "Nein" oder reduziere Prognose.
          </div>
        )}
      </div>
    </div>
  </div>
);

const StepZusammenfassung = ({ data, stepValid, allValid, onGeneratePdf }: { data: WizardData; stepValid: boolean[]; allValid: boolean; onGeneratePdf: () => void }) => {
  const wzEntry = WZ_2008.find((w) => w.code === data.wzCode);

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm">7. Zusammenfassung & PDF</h3>

      {!allValid && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/40 p-3 text-xs">
          ⚠ Es fehlen noch Eingaben in einigen Steps. Bitte vervollständige sie zuerst.
          <ul className="mt-1 list-disc list-inside">
            {stepValid.map((v, i) => !v && <li key={i}>Step {i + 1}: {STEP_LABELS[i]}</li>)}
          </ul>
        </div>
      )}

      <div className="rounded-lg bg-card border border-border p-4 text-xs space-y-3">
        <SummaryGroup title="1. Person">
          <SummaryRow label="Name" value={`${data.vorname} ${data.nachname}`} />
          <SummaryRow label="Geburt" value={`${data.geburtsdatum} in ${data.geburtsort}`} />
          <SummaryRow label="Staatsangehörigkeit" value={data.staatsangehoerigkeit} />
        </SummaryGroup>
        <SummaryGroup title="2. Anschrift">
          <SummaryRow label="Privat" value={`${data.privatStrasse}, ${data.privatPlz} ${data.privatOrt}`} />
          <SummaryRow label="Betrieb" value={data.betriebsstaetteAndere ? `${data.betriebStrasse}, ${data.betriebPlz} ${data.betriebOrt}` : "wie Privat"} />
        </SummaryGroup>
        <SummaryGroup title="3. Rechtsform">
          <SummaryRow label="Form" value={data.rechtsform} />
          <SummaryRow label="Grund" value={data.anmeldegrund} />
          {data.firmierung && <SummaryRow label="Firmierung" value={data.firmierung} />}
        </SummaryGroup>
        <SummaryGroup title="4. Tätigkeit">
          <div className="text-xs italic bg-secondary/40 p-2 rounded">"{data.taetigkeit}"</div>
        </SummaryGroup>
        <SummaryGroup title="5. WZ 2008">
          <SummaryRow label="Code" value={`${data.wzCode}${wzEntry ? ` — ${wzEntry.label}` : ""}`} />
        </SummaryGroup>
        <SummaryGroup title="6. Beginn + § 19">
          <SummaryRow label="Beginn" value={data.beginnDatum} />
          <SummaryRow label="Mitarbeiter" value={String(data.mitarbeiterZahl)} />
          <SummaryRow label="§ 19 UStG" value={data.kuStatus === "ja" ? "Ja, KU nutzen" : data.kuStatus === "nein" ? "Nein, Regelbesteuerung" : "Noch unsicher (im FsE entscheiden)"} />
          <SummaryRow label="Prognose Umsatz" value={`${data.voraussichtlicherUmsatz.toLocaleString("de-DE")} €`} />
        </SummaryGroup>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onGeneratePdf} disabled={!allValid} className="bg-emerald-700 hover:bg-emerald-800 text-white">
          <FileDown className="h-4 w-4 mr-2" /> Vorbereitungs-PDF herunterladen
        </Button>
      </div>

      <div className="rounded-lg bg-blue-500/10 border border-blue-500/40 p-3 text-xs">
        <strong className="text-blue-700">Was kommt nach der Anmeldung?</strong>
        <ol className="mt-2 space-y-1 list-decimal list-inside text-muted-foreground">
          <li>GewA1 online (verwaltung.bund.de) oder beim Bürgeramt einreichen (Gebühr 20-65 €).</li>
          <li>Nach 2-4 Wochen kommt automatisch der Fragebogen zur steuerlichen Erfassung (FsE) vom Finanzamt.</li>
          <li>Im FsE: finale Entscheidung § 19 KU / Regelbesteuerung (5 Jahre Bindung!).</li>
          <li>Steuernummer + ggf. USt-ID werden zugeteilt.</li>
          <li>IHK-/HwK-Mitgliedschaft automatisch (Beitrag erst ab Gewinn {">"} 5.200 €).</li>
          <li>Geschäftskonto eröffnen, Berufshaftpflicht prüfen, erste Rechnung mit Tool 9.</li>
        </ol>
      </div>
    </div>
  );
};

const SummaryGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <div className="font-semibold text-foreground mb-1">{title}</div>
    <div className="space-y-1">{children}</div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <span className="text-muted-foreground w-32 shrink-0">{label}:</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);

const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Gewerbeanmeldung GewA1 — schrittweise vorbereitet</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Das amtliche GewA1-Formular ist nicht kompliziert, aber 2 Felder verwirren Anfänger systematisch:
          (1) <strong>Tätigkeitsbeschreibung</strong> — zu generisch führt zu Nachfrage vom FA;
          (2) <strong>WZ-2008-Branchenschlüssel</strong> — 5-stellige Klassifikation, oft falsch geraten.
          Dieser Wizard führt dich durch beide mit Beispielen + Suche und gibt am Ende eine Vorbereitungs-PDF zum Mitbringen.
        </p>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 text-[11px]">
          <strong className="text-amber-700">⚠ Vorab klären:</strong> Bist du sicher dass es Gewerbe ist und nicht Freiberuf?
          {" "}<Link to="/cockpit/gewerbe-check" className="underline text-accent-blue">→ Tool 1: Brauche ich Gewerbe?</Link>
        </div>
      </div>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { b: "GewA1-Formular", e: "Bundeseinheitliches Formular zur Anzeige eines Gewerbes nach § 14 GewO. Online (service.bund.de / verwaltung.bund.de) oder im Bürgeramt/Gewerbeamt. Gebühr 20-65 € (stadt-abhängig). Anmeldung MUSS bei oder kurz nach Aufnahme der Tätigkeit erfolgen — rückwirkend bis ~6 Monate ok, dann Bußgeld möglich." },
        { b: "WZ 2008 Branchenschlüssel", e: "5-stellige Klassifikation der Wirtschaftszweige (Ausgabe 2008) vom Statistischen Bundesamt. Beispiele: 47.91.1 = Versandhandel Textilien, 62.01.0 = Programmierungstätigkeiten, 70.22.0 = Unternehmensberatung. Im GewA1 zu wählen. Wenn falsch: FA korrigiert später, kein Drama." },
        { b: "Tätigkeitsbeschreibung", e: "Pflicht-Klartext-Feld im GewA1. So GENAU wie möglich. Schlecht: 'Onlinehandel'. Gut: 'Onlinehandel mit Sportbekleidung, Sportzubehör und Nahrungsergänzungsmitteln über eigenen Shop und Amazon Marketplace'. Faustregel: Antwort auf 'WAS verkaufst du WIE und an WEN'. Auch Nebentätigkeiten mit erfassen (Definition wird sonst zu eng)." },
        { b: "Einzelunternehmen vs UG/GmbH", e: "Einzel = einfachste Form, kein Stammkapital, Anmeldung nur GewA1. UG = ab 1 € Stammkapital, Notar nötig (300-800 €), Eintrag Handelsregister. GmbH = 25k Stammkapital, Notar (~1.500 €). Für >90 % der Solo-Selbstständigen reicht Einzel — UG/GmbH sinnvoll bei: Haftungs-Risiko, Investor-Eintritt, Erbschaftsplanung." },
        { b: "FsE — Fragebogen zur steuerlichen Erfassung", e: "Kommt 2-4 Wochen NACH Gewerbeanmeldung automatisch vom Finanzamt. Dort: § 19 KU finalisieren, Anlage S/G, voraussichtliche Einkünfte, USt-Vorauszahlungen. Muss via ELSTER abgegeben werden. Empfehlung: nicht raten — beim FA nachfragen oder Tool 5 (Brutto-Netto) + Tool 7 (StB) konsultieren." },
        { b: "IHK / HwK-Mitgliedschaft", e: "Automatisch bei Gewerbeanmeldung. IHK = Industrie- und Handelskammer (Handel, Service). HwK = Handwerkskammer (handwerkliche Tätigkeit, ggf. Meister-Pflicht). Beitrag: Grundbeitrag ~40-150 €/Jahr ab Gewinn > 5.200 €, plus Umlage 0,2-0,5 % vom Gewinn. Befreiung für Neugründer 2 Jahre möglich." },
        { b: "Erlaubnispflichtige Gewerbe", e: "Manche Gewerbe brauchen ZUSÄTZLICHE Erlaubnis VOR Anmeldung: Gastronomie (§ 4 GastG), Makler (§ 34c GewO), Sicherheit (§ 34a), Spielhalle, Bewachung, Pfandleiher. Ohne Erlaubnis = Ordnungswidrigkeit. Bei IT/Beratung/Handel meist keine Erlaubnis nötig." },
        { b: "§ 19 UStG Kleinunternehmer-Optierung", e: "Im FsE wählst du: KU (keine USt) oder Regelbesteuerung. Voraussetzung KU: Vorjahres-Umsatz < 25.000 € + prognostiziert < 100.000 € (Reform 2025). Bindung 5 Jahre (Verzicht nur einmal). Vorteil KU: keine USt-VA, simple Rechnung. Nachteil: kein Vorsteuer-Abzug. Tool 3 hat Detail-Schwellen, Tool 9 die Rechnungs-Logik." },
      ].map((g) => (
        <div key={g.b} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.b}</div>
          <div className="text-muted-foreground">{g.e}</div>
        </div>
      ))}
    </div>
  </details>
);

export default GewerbeanmeldungWizard;
