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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileDown,
  Search,
  XCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { WZ_2008, WZ_GRUPPEN, type WzEntry, type WzGruppe } from "@/data/wz2008";

type Rechtsform = "einzel" | "gbr" | "ohg" | "kg" | "ug" | "gmbh" | "ag" | "eg" | "andere";
type Anmeldegrund = "neugruendung" | "uebernahme" | "filiale" | "wiederaufnahme" | "umzug";
type KuStatus = "ja" | "nein" | "unsicher";

type WizardData = {
  // Step 1: Person (autosaved als Personal-Profil)
  vorname: string;
  nachname: string;
  geburtsname: string;
  geschlecht: "" | "maennlich" | "weiblich";
  geburtsdatum: string;
  geburtsort: string;
  staatsangehoerigkeit: string;
  telefon: string;
  email: string;
  // Step 2: Anschrift (privat autosaved, Betrieb pro Anmeldung)
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
const LS_PERSON_KEY = "ggh-person-profile-v1";

// Welche Felder werden als "persönliches Profil" persistiert?
// Diese tippst du EINMAL und kannst sie für jede künftige Gewerbe-/
// Steuer-Aktion wiederverwenden. Der Rest (Rechtsform, Tätigkeit etc.)
// ist pro Anmeldung neu.
const PERSON_FIELDS = [
  "vorname", "nachname", "geburtsname", "geschlecht",
  "geburtsdatum", "geburtsort", "staatsangehoerigkeit",
  "telefon", "email",
  "privatStrasse", "privatPlz", "privatOrt",
] as const satisfies readonly (keyof WizardData)[];

const defaultData: WizardData = {
  vorname: "",
  nachname: "",
  geburtsname: "",
  geschlecht: "",
  geburtsdatum: "",
  geburtsort: "",
  staatsangehoerigkeit: "deutsch",
  telefon: "",
  email: "",
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
    let base = { ...defaultData };
    // Personal-Profil hat höchste Priorität (wird über Sessions hinweg geteilt)
    const savedPerson = localStorage.getItem(LS_PERSON_KEY);
    if (savedPerson) {
      try { base = { ...base, ...JSON.parse(savedPerson) }; } catch { /* ignore */ }
    }
    // Dann ggf. komplette gespeicherte Anmeldung drüberlegen
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { base = { ...base, ...JSON.parse(saved) }; } catch { /* ignore */ }
    }
    return base;
  });

  const update = <K extends keyof WizardData>(field: K, value: WizardData[K]) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  // Persönliche Daten auto-persistieren (Vorname, Nachname, Adresse etc.)
  // damit der User sie nur einmal eintippt und sie bei jeder zukünftigen
  // Gewerbeanmeldung sofort wieder da sind.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const subset: Partial<WizardData> = {};
    for (const k of PERSON_FIELDS) (subset as Record<string, unknown>)[k] = data[k];
    try { localStorage.setItem(LS_PERSON_KEY, JSON.stringify(subset)); }
    catch (e) { console.warn("Personal-Profil konnte nicht gespeichert werden:", e); }
  }, [
    data.vorname, data.nachname, data.geburtsname, data.geschlecht,
    data.geburtsdatum, data.geburtsort, data.staatsangehoerigkeit,
    data.telefon, data.email,
    data.privatStrasse, data.privatPlz, data.privatOrt,
  ]);

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
    if (!confirm("Aktuelle Anmeldung löschen? Dein Personal-Profil (Vorname/Nachname/Adresse) bleibt gespeichert.")) return;
    localStorage.removeItem(LS_KEY);
    // Behalte personal subset, setze Rest auf default zurück
    setData((d) => {
      const fresh: WizardData = { ...defaultData };
      for (const k of PERSON_FIELDS) (fresh as Record<string, unknown>)[k] = d[k];
      return fresh;
    });
    setStep(0);
  };

  // Füllt das offizielle Mustervordruck GewA1 (Anlage 1 zur GewAnzV) mit
  // den eingegebenen Daten via pdf-lib. PDF liegt in public/forms/gewa1.pdf
  // (Form-Solutions / Schwerin-Hosting der Bundes-Vorlage, ~65 benannte AcroForm-Felder).
  const generatePdf = async () => {
    try {
      const resp = await fetch("/forms/gewa1.pdf");
      if (!resp.ok) throw new Error(`PDF konnte nicht geladen werden (HTTP ${resp.status})`);
      const pdfBytes = await resp.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      const fmtDate = (iso: string) => iso ? iso.split("-").reverse().join(".") : "";
      const anschrift = (str: string, plz: string, ort: string) =>
        [str, [plz, ort].filter(Boolean).join(" ")].filter(Boolean).join(", ");

      // Robuste Helper — fehlende oder typ-falsche Felder werfen sonst.
      const tryText = (name: string, value: string) => {
        if (!value) return;
        try { form.getTextField(name).setText(value); } catch { /* missing */ }
      };
      const tryCheck = (name: string, checked: boolean) => {
        try {
          const cb = form.getCheckBox(name);
          if (checked) cb.check(); else cb.uncheck();
        } catch { /* missing */ }
      };

      const rechtsformLabel: Record<Rechtsform, string> = {
        einzel: "Einzelunternehmen", gbr: "GbR", ohg: "OHG", kg: "KG",
        ug: "UG (haftungsbeschränkt)", gmbh: "GmbH", ag: "AG", eg: "eG", andere: "",
      };
      const istKapGes = ["ug", "gmbh", "ag"].includes(data.rechtsform);
      const istEinzel = data.rechtsform === "einzel";
      const istDeutsch = data.staatsangehoerigkeit.trim().toLowerCase() === "deutsch";

      // === Felder 1-5: Firma / Rechtsform (nur bei Kap.-Ges./PersGes mit Eintrag) ===
      const firmaLabel = data.firmierung
        || (istEinzel ? `${data.vorname} ${data.nachname}`.trim() : rechtsformLabel[data.rechtsform]);
      tryText("Name mit Rechtsform", firmaLabel);

      // === Felder Person ===
      tryText("Name", data.nachname);
      tryText("Vorname(n)", data.vorname);
      tryText("Geburtsname", data.geburtsname);
      tryText("Geburtsdatum", fmtDate(data.geburtsdatum));
      tryText("Geburtsort und -land", data.geburtsort);
      tryText("Staatsangehörigkeit(en)", data.staatsangehoerigkeit);
      tryCheck("männlich", data.geschlecht === "maennlich");
      tryCheck("weiblich", data.geschlecht === "weiblich");
      tryCheck("deutsch", istDeutsch);
      tryCheck("andere", !istDeutsch && data.staatsangehoerigkeit !== "");

      // === Anschrift privat ===
      tryText("Anschrift", anschrift(data.privatStrasse, data.privatPlz, data.privatOrt));
      tryText("Telefon", data.telefon);
      tryText("E-Mail", data.email);

      // === Anschrift Betriebsstätte ===
      const betriebAdr = data.betriebsstaetteAndere
        ? anschrift(data.betriebStrasse, data.betriebPlz, data.betriebOrt)
        : anschrift(data.privatStrasse, data.privatPlz, data.privatOrt);
      tryText("Anschrift Betriebsstätte", betriebAdr);
      tryText("Telefon - geschäftlich", data.telefon);
      tryText("E-Mail - geschäftlich", data.email);

      // === Tätigkeit ===
      tryText("Angemeldete Tätigkeit", data.taetigkeit);
      tryText("Beginn der Tätigkeit", fmtDate(data.beginnDatum));

      // === Mitarbeiter ===
      tryCheck("keine Personen", data.mitarbeiterZahl === 0);
      if (data.mitarbeiterZahl > 0) {
        tryText("Personenzahl Vollzeit", String(data.mitarbeiterZahl));
      }

      // === Anmeldegrund ===
      tryCheck("ja - Neugründung", data.anmeldegrund === "neugruendung");
      tryCheck("ja - Verlegung", data.anmeldegrund === "umzug");
      tryCheck("ja - Hauptniederlassung",
        data.anmeldegrund !== "filiale" && !data.betriebsstaetteAndere);
      tryCheck("ja - Zweigniederlassung", data.anmeldegrund === "filiale");

      // === Kap.-Ges. → Geschäftsführerzahl (wenn UG/GmbH/AG, min. 1) ===
      if (istKapGes) tryText("Zahl - Geschäftsführer bzw. gesetzliche Vertreter", "1");

      // === Datum ===
      const today = new Date();
      const todayDe = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;
      tryText("heutiges Datum", todayDe);

      // Appearance-Streams für gefüllte Felder erzeugen — sonst zeigen
      // manche Reader (Preview/Firefox) leere Felder trotz korrekt
      // gesetzter Werte. updateFieldAppearances() walks alle Felder.
      form.updateFieldAppearances();
      const filled = await pdfDoc.save({ updateFieldAppearances: false });
      const blob = new Blob([filled], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GewA1-${(data.nachname || "anmeldung").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF-Erstellung fehlgeschlagen:", e);
      alert(`PDF-Erstellung fehlgeschlagen: ${e instanceof Error ? e.message : "Unbekannter Fehler"}. Bitte Seite neu laden und erneut versuchen.`);
    }
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
      subtitle="7-Step-Wizard, der das amtliche GewA1 (Mustervordruck Anlage 1 zur GewAnzV) mit deinen Daten füllt. Mit Tätigkeits-Qualitäts-Check, WZ-2008-Suche, §19 KU-Entscheidung. Persönliche Daten werden lokal gespeichert und beim nächsten Mal automatisch vorausgefüllt."
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
    <p className="text-xs text-muted-foreground mb-2">Wie sie im Personalausweis stehen. Wird vom Bürgeramt mit dem Ausweis abgeglichen.</p>
    <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 mb-3 text-[11px]">
      💾 <strong>Einmal eingeben, immer nutzen:</strong> Vorname, Nachname, Geburtsdaten und Anschrift
      werden lokal im Browser gespeichert — bei der nächsten Gewerbeanmeldung sind sie schon da.
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
        <Label className="text-xs">Geburtsname (falls abweichend)</Label>
        <Input value={data.geburtsname} onChange={(e) => update("geburtsname", e.target.value)} className="h-9 mt-1" />
      </div>
      <div>
        <Label className="text-xs">Geschlecht (GewA1)</Label>
        <select
          value={data.geschlecht}
          onChange={(e) => update("geschlecht", e.target.value as WizardData["geschlecht"])}
          className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
        >
          <option value="">— nicht angegeben —</option>
          <option value="maennlich">männlich</option>
          <option value="weiblich">weiblich</option>
        </select>
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
    <h3 className="font-bold text-sm">2. Anschrift + Kontakt</h3>
    <p className="text-xs text-muted-foreground mb-3">Privatanschrift = Wohnsitz. Betriebsstätte = wo du arbeitest (kann gleich sein).</p>
    <div className="rounded-lg bg-secondary/40 p-3 space-y-2">
      <div className="text-xs font-semibold">Privatanschrift</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input placeholder="Straße + Nr." value={data.privatStrasse} onChange={(e) => update("privatStrasse", e.target.value)} className="h-9" autoComplete="street-address" />
        <Input placeholder="PLZ" value={data.privatPlz} onChange={(e) => update("privatPlz", e.target.value)} className="h-9" autoComplete="postal-code" />
        <Input placeholder="Ort" value={data.privatOrt} onChange={(e) => update("privatOrt", e.target.value)} className="h-9" autoComplete="address-level2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input type="tel" placeholder="Telefon" value={data.telefon} onChange={(e) => update("telefon", e.target.value)} className="h-9" autoComplete="tel" />
        <Input type="email" placeholder="E-Mail" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-9" autoComplete="email" />
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
          <FileDown className="h-4 w-4 mr-2" /> Offizielles GewA1-PDF herunterladen
        </Button>
      </div>
      <div className="text-[11px] text-muted-foreground">
        Erzeugt das amtliche Mustervordruck-PDF (Anlage 1 zur GewAnzV) mit deinen Daten gefüllt.
        Felder bleiben editierbar — Anpassungen direkt im Reader möglich, danach ausdrucken & unterschreiben.
      </div>

      <div className="rounded-lg bg-blue-500/10 border border-blue-500/40 p-3 text-xs">
        <strong className="text-blue-700">Was kommt nach der Anmeldung?</strong>
        <ol className="mt-2 space-y-1 list-decimal list-inside text-muted-foreground">
          <li>Ausgefülltes GewA1 unterschreiben, persönlich im Bürgeramt einreichen ODER online via verwaltung.bund.de (Gebühr 20-65 €).</li>
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
          Dieser Wizard führt dich durch beide mit Beispielen + Suche und füllt am Ende das offizielle GewA1-PDF zum Ausdrucken und Unterschreiben.
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
