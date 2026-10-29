/**
 * GewerbeanmeldungWizard — "Gewerbeanmeldung GewA1 vorbereiten"
 *
 * Tool 10 der Anfänger-Wave (Starter-Kategorie, Wave 3).
 *
 * 8-Step-Wizard durch die Eingabe-Felder des amtlichen GewA1-Formulars:
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
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, Field, ResultPanel, ToneBadge, ToolLayout, selectCls, type Tone } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  CircleDashed,
  AlertCircle,
  HelpCircle,
  FileDown,
  Search,
  XCircle,
  Check,
  Save,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  HardDrive,
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
  /** Zahl der Geschäftsführer/gesetzlichen Vertreter (nur Kap.-Ges.) */
  gfAnzahl: number;
  // Step 4: Tätigkeit (Klartext)
  taetigkeit: string;
  // Step 5: WZ 2008
  wzCode: string;
  // Step 6: Beginn + KU
  beginnDatum: string;
  mitarbeiterZahl: number;
  kuStatus: KuStatus;
  voraussichtlicherUmsatz: number;
  // Step 7: Behörden-Status (Erlaubnis / Handwerk / Aufenthalt) — alle optional
  erlaubnisStatus: "" | "ja" | "nein";
  erlaubnisDetails: string;
  handwerkskarteStatus: "" | "ja" | "nein";
  handwerkskarteDetails: string;
  aufenthaltStatus: "" | "ja" | "nein";
  aufenthaltDetails: string;
  aufenthaltAuflagenStatus: "" | "ja" | "nein";
  aufenthaltAuflagenDetails: string;
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
  gfAnzahl: 1,
  taetigkeit: "",
  wzCode: "",
  beginnDatum: heute,
  mitarbeiterZahl: 0,
  kuStatus: "unsicher",
  voraussichtlicherUmsatz: 25000,
  // Sensible Defaults für Felder 28-31:
  // - 28 Erlaubnis nein → ~90 % der Tätigkeiten erlaubnisfrei
  // - 29 Handwerkskarte nein → ~95 % der Gründungen kein zulassungspfl. Handwerk
  // - 30 Aufenthaltsgenehmigung leer → User soll bewusst entscheiden (default
  //   wird auf "nein" gesetzt sobald Staatsangehörigkeit deutsch ist, siehe UI)
  // - 31 Auflagen leer → nur relevant wenn 30 = ja
  erlaubnisStatus: "nein",
  erlaubnisDetails: "",
  handwerkskarteStatus: "nein",
  handwerkskarteDetails: "",
  aufenthaltStatus: "",
  aufenthaltDetails: "",
  aufenthaltAuflagenStatus: "",
  aufenthaltAuflagenDetails: "",
};

const STEP_LABELS = [
  "Person",
  "Anschrift",
  "Rechtsform",
  "Tätigkeit",
  "Branche (WZ)",
  "Beginn + §19",
  "Behörden-Status",
  "Zusammenfassung",
];

const GewerbeanmeldungWizard = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(() => {
    if (typeof window === "undefined") return defaultData;
    let base = { ...defaultData };
    // Personal-Profil hat höchste Priorität (wird über Sessions hinweg geteilt)
    // localStorage kann werfen (Safari privat, blockierter Speicher) → nie die Seite abstürzen lassen
    try {
      const savedPerson = localStorage.getItem(LS_PERSON_KEY);
      if (savedPerson) base = { ...base, ...JSON.parse(savedPerson) };
    } catch { /* ignore */ }
    // Dann ggf. komplette gespeicherte Anmeldung drüberlegen
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) base = { ...base, ...JSON.parse(saved) };
    } catch { /* ignore */ }
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
    checks[4] = true; // WZ-Code ist Hilfsinfo: das GewA1 hat kein WZ-Feld, das Amt vergibt den Schlüssel selbst
    checks[5] = !!(data.beginnDatum && data.kuStatus);
    checks[6] = true; // Behörden-Status: alle Felder optional
    checks[7] = true;
    return checks;
  }, [data]);

  const allValid = stepValid.every(Boolean);

  const saveLocal = () => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); }
    catch (e) { console.warn("Anmeldung konnte nicht lokal gespeichert werden:", e); }
  };

  const reset = () => {
    if (!confirm("Aktuelle Anmeldung löschen? Dein Personal-Profil (Vorname/Nachname/Adresse) bleibt gespeichert.")) return;
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
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
      // setFontSize(10) verhindert dass updateFieldAppearances() die Werte mit
      // Default-Riesengröße rendert (Original-PDF hatte Auto-Size = 0 was
      // pdf-lib nicht zuverlässig auflöst).
      const tryText = (name: string, value: string) => {
        if (!value) return;
        try {
          const tf = form.getTextField(name);
          tf.setText(value);
          tf.setFontSize(10);
        } catch { /* missing or wrong type */ }
      };
      const tryCheck = (name: string, checked: boolean) => {
        try {
          const cb = form.getCheckBox(name);
          if (checked) cb.check(); else cb.uncheck();
        } catch { /* missing */ }
      };

      const istKapGes = ["ug", "gmbh", "ag"].includes(data.rechtsform);
      const istEingetragen = istKapGes || ["eg", "ohg", "kg"].includes(data.rechtsform);
      const istDeutsch = data.staatsangehoerigkeit.trim().toLowerCase() === "deutsch";

      // === Feld 1: "Im Handels-/Genossenschafts-/Vereinsregister eingetragener Name" ===
      // NUR ausfüllen wenn tatsächlich eingetragen (Kap.-Ges., OHG/KG, eG) UND
      // der User eine Firmierung angegeben hat. Einzelunternehmer haben keinen
      // Registereintrag — Feld bleibt leer, damit nicht der Privatname versehentlich
      // als "Firmenname" landet.
      if (istEingetragen && data.firmierung) {
        tryText("Name mit Rechtsform", data.firmierung);
      }

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
      // Wiederaufnahme nach Abmeldung ist auf dem GewA1 eine Neuerrichtung
      tryCheck("ja - Neugründung", data.anmeldegrund === "neugruendung" || data.anmeldegrund === "wiederaufnahme");
      tryCheck("ja - Verlegung", data.anmeldegrund === "umzug");
      tryCheck("ja - Erbfolge, Kauf, Pacht", data.anmeldegrund === "uebernahme");
      // Haupt-/Zweigniederlassung hängt nicht davon ab, ob die Betriebsstätte an einer anderen Adresse liegt
      tryCheck("ja - Hauptniederlassung", data.anmeldegrund !== "filiale");
      tryCheck("ja - Zweigniederlassung", data.anmeldegrund === "filiale");

      // === Kap.-Ges. → Geschäftsführerzahl (wenn UG/GmbH/AG, min. 1) ===
      if (istKapGes) tryText("Zahl - Geschäftsführer bzw. gesetzliche Vertreter", String(Math.max(1, data.gfAnzahl || 1)));

      // === Felder 28-31: Erlaubnis / Handwerk / Aufenthalt / Auflagen ===
      tryCheck("ja - Erlaubnis liegt vor", data.erlaubnisStatus === "ja");
      tryCheck("nein - Erlaubnis liegt nicht vor", data.erlaubnisStatus === "nein");
      if (data.erlaubnisStatus === "ja") tryText("Erlaubnis - Ausstellungsdatum und Behörde", data.erlaubnisDetails);

      tryCheck("ja - Handwerkskarte liegt vor", data.handwerkskarteStatus === "ja");
      tryCheck("nein - keine Handwerkskarte", data.handwerkskarteStatus === "nein");
      if (data.handwerkskarteStatus === "ja") tryText("Ausstellungsdatum und Handwerkskammer", data.handwerkskarteDetails);

      // Bei Deutschen ist Feld 30 automatisch "nein" — sie brauchen
      // keine Aufenthaltsgenehmigung. Sonst nimm den User-Wert.
      const aufenthaltEffectiv = istDeutsch ? "nein" : data.aufenthaltStatus;
      tryCheck("ja - Aufenthaltsgenehmigung liegt vor", aufenthaltEffectiv === "ja");
      tryCheck("nein - keine Aufenthaltsgenehmigung", aufenthaltEffectiv === "nein");
      if (aufenthaltEffectiv === "ja") tryText("Ausstellungsdatum und Behörde", data.aufenthaltDetails);

      // Feld 31 nur relevant wenn 30 = ja. Bei "nein" (egal ob explizit oder
      // auto-deutsch) auch Feld 31 auf "nein" setzen damit Reader nicht leer.
      const auflagenEffectiv = aufenthaltEffectiv === "ja" ? data.aufenthaltAuflagenStatus : "nein";
      tryCheck("ja - enthält Auflagen oder Beschränkungen", auflagenEffectiv === "ja");
      tryCheck("nein - keine Auflagen oder Beschränkungen", auflagenEffectiv === "nein");
      if (auflagenEffectiv === "ja") tryText("Auflagen oder Beschränkungen", data.aufenthaltAuflagenDetails);

      // === Datum ===
      const today = new Date();
      const todayDe = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;
      tryText("heutiges Datum", todayDe);

      // Appearance-Streams für gefüllte Felder erzeugen — sonst zeigen
      // manche Reader (Preview/Firefox) leere Felder trotz korrekt
      // gesetzter Werte. updateFieldAppearances() walks alle Felder.
      form.updateFieldAppearances();
      const filled = await pdfDoc.save({ updateFieldAppearances: false });
      const blob = new Blob([filled as BlobPart], { type: "application/pdf" });
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


  const erledigt = stepValid.filter(Boolean).length;

  return (
    <CockpitShell
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Gewerbeanmeldung-Wizard"
      subtitle="Acht kurze Schritte, am Ende steht das amtliche GewA1 (Mustervordruck Anlage 1 zur GewAnzV) mit deinen Daten gefüllt. Mit Qualitäts-Check für die Tätigkeit, WZ-2008-Suche und Entscheidungshilfe zu § 19 UStG. Persönliche Daten bleiben lokal in deinem Browser gespeichert."
    >
      <BeginnerHero />

      {/* === Fortschritt === */}
      <nav aria-label="Schritte der Gewerbeanmeldung" className="mb-6">
        <ol className="grid grid-cols-4 gap-x-2 gap-y-3 sm:grid-cols-8">
          {STEP_LABELS.map((label, i) => {
            const current = i === step;
            const done = stepValid[i] && !current;
            const offen = !stepValid[i] && i < step;
            return (
              <li key={label} className="min-w-0" aria-current={current ? "step" : undefined}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  title={`Step ${i + 1}: ${label} ${stepValid[i] ? "✓" : ""}`}
                  className="group block w-full rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-colors",
                      current ? "bg-accent-blue" : done ? "bg-success" : offen ? "bg-warning" : "bg-border group-hover:bg-foreground/20",
                    )}
                  />
                  <span className="mt-2 flex items-center gap-1.5 text-sm">
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular",
                        current && "bg-accent-blue text-primary-foreground",
                        done && "bg-success text-primary-foreground",
                        offen && "bg-warning-soft text-warning",
                        !current && !done && !offen && "border border-border text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={cn("hidden truncate lg:inline", current ? "font-medium text-foreground" : "text-muted-foreground")}>
                      {label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <ToolLayout
        className="mb-8"
        inputs={
          <section className="rounded-2xl border border-border bg-card shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-5 py-3 md:px-6">
              <p className="text-sm text-muted-foreground">
                Schritt {step + 1} von {STEP_LABELS.length}: <strong className="font-medium text-foreground">{STEP_LABELS[step]}</strong>
              </p>
              {(step === STEP_LABELS.length - 1 ? allValid : stepValid[step]) ? (
                <ToneBadge tone="success">Vollständig</ToneBadge>
              ) : (
                <ToneBadge tone="neutral">Pflichtfelder offen</ToneBadge>
              )}
            </div>

            <div className="p-5 md:p-6">
              {step === 0 && <StepPerson data={data} update={update} />}
              {step === 1 && <StepAnschrift data={data} update={update} />}
              {step === 2 && <StepRechtsform data={data} update={update} />}
              {step === 3 && <StepTaetigkeit data={data} update={update} qualitaet={taetigkeitsQualitaet} />}
              {step === 4 && <StepBranche data={data} update={update} />}
              {step === 5 && <StepBeginn data={data} update={update} />}
              {step === 6 && <StepBehoerden data={data} update={update} />}
              {step === 7 && <StepZusammenfassung data={data} stepValid={stepValid} allValid={allValid} onGeneratePdf={generatePdf} />}
            </div>

            {/* === Navigation === */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 px-5 py-4 md:px-6">
              <Button onClick={() => setStep(Math.max(0, step - 1))} variant="outline" disabled={step === 0}>
                <ChevronLeft aria-hidden="true" /> Zurück
              </Button>
              <div className="order-3 -mb-1 flex w-full flex-wrap justify-center gap-1 border-t border-border/50 pt-2">
                <Button onClick={saveLocal} variant="ghost" size="sm">
                  <Save aria-hidden="true" /> Zwischenspeichern
                </Button>
                <Button onClick={reset} variant="ghost" size="sm" className="text-danger hover:text-danger">
                  <RotateCcw aria-hidden="true" /> Neu beginnen
                </Button>
              </div>
              <Button onClick={() => setStep(Math.min(STEP_LABELS.length - 1, step + 1))} disabled={step === STEP_LABELS.length - 1}>
                Weiter <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          </section>
        }
        result={
          <>
            <ResultPanel
              kicker="Dein Stand"
              title={allValid ? "Bereit für das GewA1-PDF" : "Noch nicht vollständig"}
              value={`${erledigt} von ${STEP_LABELS.length}`}
              valueHint="Schritte vollständig ausgefüllt"
            >
              <ul className="divide-y divide-border/70">
                {STEP_LABELS.map((label, i) => (
                  <li key={label} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span className={cn("flex min-w-0 items-center gap-2", i === step ? "font-medium text-foreground" : "text-foreground/80")}>
                      <span className="w-4 shrink-0 text-xs text-muted-foreground tabular">{i + 1}</span>
                      <span className="truncate">{label}</span>
                    </span>
                    {stepValid[i] ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-label="vollständig" />
                    ) : (
                      <CircleDashed className="h-4 w-4 shrink-0 text-muted-foreground" aria-label="offen" />
                    )}
                  </li>
                ))}
              </ul>
            </ResultPanel>

            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/cockpit/gewerbe-check"
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">Brauche ich ein Gewerbe?</span>
                  <span className="block text-sm text-muted-foreground">Vorab klären, ob die Anmeldung überhaupt nötig ist.</span>
                </span>
              </Link>
              <Link
                to="/cockpit/schwellen-check"
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">Kleinunternehmer-Schwellen</span>
                  <span className="block text-sm text-muted-foreground">Grenzen 25.000 € und 100.000 € ab 2025/2026.</span>
                </span>
              </Link>
            </div>
          </>
        }
      />

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§14 GewO (Gewerbeanzeige)", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
          { label: "WZ 2008 — Statistisches Bundesamt", url: "https://www.destatis.de/DE/Methoden/Klassifikationen/Gueter-Wirtschaftsklassifikationen/klassifikation-wz-2008.html" },
          { label: "Online-Gewerbeanmeldung (Bundesportal)", url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99050012104000" },
          { label: "GewA1-Mustervordruck (Anlage 1 GewAnzV)", url: "https://www.gesetze-im-internet.de/gewanzv_2014/anlage_1.html" },
        ]}
        note="GewA1 ist bundeseinheitlich, aber Gebühr (15-65 €) variiert pro Stadt. Bearbeitung in Bürgeramt oder online (verwaltung.bund.de). Nach Aufnahme der Tätigkeit musst du den Fragebogen zur steuerlichen Erfassung (FsE) innerhalb eines Monats selbst und unaufgefordert über ELSTER einreichen (§138 Abs. 1b, Abs. 4 AO) — dort wird § 19 KU festgelegt. Bei erlaubnispflichtigen Gewerben (Gastronomie, Makler, Sicherheit, Spielhalle, etc.) brauchst du ZUSÄTZLICH Erlaubnis vor Anmeldung."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Step Components
// ============================================================================
type StepProps = { data: WizardData; update: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void };

const RECHTSFORM_LABEL: Record<Rechtsform, string> = {
  einzel: "Einzelunternehmen",
  gbr: "GbR",
  ohg: "OHG",
  kg: "KG",
  ug: "UG (haftungsbeschränkt)",
  gmbh: "GmbH",
  ag: "AG",
  eg: "eG",
  andere: "Andere",
};
const ANMELDEGRUND_LABEL: Record<Anmeldegrund, string> = {
  neugruendung: "Neugründung",
  uebernahme: "Übernahme",
  filiale: "Filiale / Zweigniederlassung",
  wiederaufnahme: "Wiederaufnahme",
  umzug: "Verlegung aus anderer Gemeinde",
};

const StepHead = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="mb-5">
    <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
    {children && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>}
  </div>
);

const Pflicht = () => <span className="text-muted-foreground" aria-hidden="true"> *</span>;

const StepPerson = ({ data, update }: StepProps) => (
  <div>
    <StepHead title="1. Persönliche Daten">Wie sie im Personalausweis stehen. Das Bürgeramt gleicht sie mit dem Ausweis ab.</StepHead>
    <Callout tone="info" icon={HardDrive} className="mb-5">
      <strong className="font-semibold text-foreground">Einmal eingeben, immer nutzen:</strong> Vorname, Nachname, Geburtsdaten
      und Anschrift werden lokal im Browser gespeichert. Bei der nächsten Gewerbeanmeldung sind sie schon da.
    </Callout>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field label={<>Vorname<Pflicht /></>} htmlFor="gw-vorname">
        <Input id="gw-vorname" value={data.vorname} onChange={(e) => update("vorname", e.target.value)} autoComplete="given-name" />
      </Field>
      <Field label={<>Nachname<Pflicht /></>} htmlFor="gw-nachname">
        <Input id="gw-nachname" value={data.nachname} onChange={(e) => update("nachname", e.target.value)} autoComplete="family-name" />
      </Field>
      <Field label="Geburtsname" hint="Nur falls abweichend" htmlFor="gw-geburtsname">
        <Input id="gw-geburtsname" value={data.geburtsname} onChange={(e) => update("geburtsname", e.target.value)} />
      </Field>
      <Field label="Geschlecht" hint="Wird im GewA1 abgefragt" htmlFor="gw-geschlecht">
        <select
          id="gw-geschlecht"
          value={data.geschlecht}
          onChange={(e) => update("geschlecht", e.target.value as WizardData["geschlecht"])}
          className={selectCls}
        >
          <option value="">nicht angegeben</option>
          <option value="maennlich">männlich</option>
          <option value="weiblich">weiblich</option>
        </select>
      </Field>
      <Field label={<>Geburtsdatum<Pflicht /></>} htmlFor="gw-geburtsdatum">
        <Input id="gw-geburtsdatum" type="date" value={data.geburtsdatum} onChange={(e) => update("geburtsdatum", e.target.value)} />
      </Field>
      <Field label={<>Geburtsort<Pflicht /></>} htmlFor="gw-geburtsort">
        <Input id="gw-geburtsort" value={data.geburtsort} onChange={(e) => update("geburtsort", e.target.value)} />
      </Field>
      <Field
        className="md:col-span-2"
        label={<>Staatsangehörigkeit<Pflicht /></>}
        hint="Bei Nicht-EU-Bürgern: Aufenthaltstitel und Erlaubnis zur Selbstständigkeit im Bürgeramt vorlegen."
        htmlFor="gw-staat"
      >
        <Input id="gw-staat" value={data.staatsangehoerigkeit} onChange={(e) => update("staatsangehoerigkeit", e.target.value)} />
      </Field>
    </div>
    <p className="mt-5 text-xs text-muted-foreground">* Pflichtfeld</p>
  </div>
);

const StepAnschrift = ({ data, update }: StepProps) => (
  <div>
    <StepHead title="2. Anschrift und Kontakt">Privatanschrift ist dein Wohnsitz. Die Betriebsstätte ist der Ort, an dem du arbeitest (oft dieselbe Adresse).</StepHead>
    <fieldset className="rounded-xl border border-border bg-secondary/30 p-4">
      <legend className="px-1 text-sm font-semibold">Privatanschrift</legend>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
        <Field label={<>Straße und Hausnummer<Pflicht /></>} htmlFor="gw-p-str">
          <Input id="gw-p-str" placeholder="Straße + Nr." value={data.privatStrasse} onChange={(e) => update("privatStrasse", e.target.value)} autoComplete="street-address" />
        </Field>
        <Field label={<>PLZ<Pflicht /></>} htmlFor="gw-p-plz">
          <Input id="gw-p-plz" placeholder="PLZ" inputMode="numeric" value={data.privatPlz} onChange={(e) => update("privatPlz", e.target.value)} autoComplete="postal-code" />
        </Field>
        <Field label={<>Ort<Pflicht /></>} htmlFor="gw-p-ort">
          <Input id="gw-p-ort" placeholder="Ort" value={data.privatOrt} onChange={(e) => update("privatOrt", e.target.value)} autoComplete="address-level2" />
        </Field>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Telefon" htmlFor="gw-tel">
          <Input id="gw-tel" type="tel" placeholder="Telefon" value={data.telefon} onChange={(e) => update("telefon", e.target.value)} autoComplete="tel" />
        </Field>
        <Field label="E-Mail" htmlFor="gw-mail">
          <Input id="gw-mail" type="email" placeholder="E-Mail" value={data.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
        </Field>
      </div>
    </fieldset>

    <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm transition-colors hover:border-foreground/25 has-[:checked]:border-accent-blue/40 has-[:checked]:bg-accent">
      <input
        type="checkbox"
        checked={data.betriebsstaetteAndere}
        onChange={(e) => update("betriebsstaetteAndere", e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
      />
      <span>Die Betriebsstätte hat eine andere Adresse als die Privatanschrift</span>
    </label>

    {data.betriebsstaetteAndere && (
      <fieldset className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
        <legend className="px-1 text-sm font-semibold">Betriebsstätte</legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
          <Field label={<>Straße und Hausnummer<Pflicht /></>} htmlFor="gw-b-str">
            <Input id="gw-b-str" placeholder="Straße + Nr." value={data.betriebStrasse} onChange={(e) => update("betriebStrasse", e.target.value)} />
          </Field>
          <Field label={<>PLZ<Pflicht /></>} htmlFor="gw-b-plz">
            <Input id="gw-b-plz" placeholder="PLZ" inputMode="numeric" value={data.betriebPlz} onChange={(e) => update("betriebPlz", e.target.value)} />
          </Field>
          <Field label={<>Ort<Pflicht /></>} htmlFor="gw-b-ort">
            <Input id="gw-b-ort" placeholder="Ort" value={data.betriebOrt} onChange={(e) => update("betriebOrt", e.target.value)} />
          </Field>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Bei Co-Working oder virtueller Adresse: Es muss eine tatsächlich genutzte Räumlichkeit sein, das Finanzamt prüft das.
        </p>
      </fieldset>
    )}
  </div>
);

const StepRechtsform = ({ data, update }: StepProps) => (
  <div>
    <StepHead title="3. Rechtsform und Anmeldegrund">
      Rund 90 % der Solo-Selbstständigen starten als Einzelunternehmen: kein Stammkapital, einfache Anmeldung.
    </StepHead>
    <div className="space-y-4">
      <Field label={<>Rechtsform<Pflicht /></>} htmlFor="gw-rechtsform">
        <select id="gw-rechtsform" value={data.rechtsform} onChange={(e) => update("rechtsform", e.target.value as Rechtsform)} className={selectCls}>
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
      </Field>
      <Field label={<>Anmeldegrund<Pflicht /></>} htmlFor="gw-grund">
        <select id="gw-grund" value={data.anmeldegrund} onChange={(e) => update("anmeldegrund", e.target.value as Anmeldegrund)} className={selectCls}>
          <option value="neugruendung">Neugründung</option>
          <option value="uebernahme">Übernahme eines bestehenden Betriebs</option>
          <option value="filiale">Filiale / Zweigniederlassung</option>
          <option value="wiederaufnahme">Wiederaufnahme nach Pause</option>
          <option value="umzug">Verlegung aus anderer Gemeinde</option>
        </select>
      </Field>
      <Field
        label="Firmierung"
        htmlFor="gw-firma"
        hint="Optional, bei UG und GmbH Pflicht. Einzelunternehmen: Vor- und Nachname, gern mit Branche. UG/GmbH: muss die Rechtsform enthalten."
      >
        <Input id="gw-firma" value={data.firmierung} onChange={(e) => update("firmierung", e.target.value)} placeholder="z.B. 'Max Mustermann Beratung'" />
      </Field>
      {["ug", "gmbh", "ag"].includes(data.rechtsform) && (
        <Field label="Zahl der Geschäftsführer bzw. gesetzlichen Vertreter" htmlFor="gw-gf">
          <Input
            id="gw-gf"
            type="number"
            min={1}
            value={data.gfAnzahl}
            onChange={(e) => update("gfAnzahl", Math.max(1, Number(e.target.value) || 1))}
          />
        </Field>
      )}
    </div>
  </div>
);

const QUALI_TONE: Record<string, Tone> = { gut: "success", ausreichend: "warning", unzureichend: "danger" };

const StepTaetigkeit = ({ data, update, qualitaet }: StepProps & { qualitaet: { len: number; woerter: number; ok: boolean; issues: string[]; qualitaet: string } }) => (
  <div>
    <StepHead title="4. Tätigkeitsbeschreibung">
      Das wichtigste Feld im GewA1. Beschreibe so genau wie möglich, was du wie und an wen verkaufst, sonst fragt das Finanzamt nach.
    </StepHead>

    {/* Beispiele */}
    <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-danger/25 bg-danger-soft p-4 text-sm">
        <p className="flex items-center gap-1.5 font-semibold text-danger">
          <XCircle className="h-4 w-4" aria-hidden="true" /> Zu ungenau
        </p>
        <ul className="mt-2 space-y-1 text-foreground/80">
          <li>„Onlinehandel"</li>
          <li>„Beratung"</li>
          <li>„Dienstleistungen"</li>
          <li>„IT"</li>
        </ul>
      </div>
      <div className="rounded-xl border border-success/25 bg-success-soft p-4 text-sm">
        <p className="flex items-center gap-1.5 font-semibold text-success">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> So passt es
        </p>
        <ul className="mt-2 space-y-1.5 text-foreground/80">
          <li>„Onlinehandel mit Sportbekleidung, Sportzubehör und Nahrungsergänzungsmitteln über eigenen Shop und Amazon Marketplace"</li>
          <li>„Unternehmensberatung im Bereich Online-Marketing für KMU"</li>
          <li>„Erstellung von Web-Anwendungen und Mobile-Apps für gewerbliche Kunden"</li>
        </ul>
      </div>
    </div>

    <Field label={<>Beschreibung<Pflicht /></>} htmlFor="gw-taetigkeit">
      <textarea
        id="gw-taetigkeit"
        value={data.taetigkeit}
        onChange={(e) => update("taetigkeit", e.target.value)}
        rows={4}
        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm shadow-[0_1px_2px_hsl(var(--primary)/0.04)] transition-[border-color,box-shadow] focus:border-ring focus:outline-none focus:ring-[3px] focus:ring-ring/25"
        placeholder="z.B. Onlinehandel mit Naturkosmetik, Hautpflegeprodukten und ergänzenden Wellness-Artikeln über eigenen Webshop und Marktplätze (Amazon, Etsy)"
      />
    </Field>
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
      <ToneBadge tone={QUALI_TONE[qualitaet.qualitaet] ?? "neutral"}>Qualität: {qualitaet.qualitaet.toUpperCase()}</ToneBadge>
      <span className="text-xs text-muted-foreground tabular">{qualitaet.len} Zeichen · {qualitaet.woerter} Wörter</span>
    </div>
    {qualitaet.issues.length > 0 && (
      <ul className="mt-3 space-y-1.5 rounded-xl border border-warning/25 bg-warning-soft p-4">
        {qualitaet.issues.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" /> <span>{i}</span>
          </li>
        ))}
      </ul>
    )}
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
    <div>
      <StepHead title="5. Branchenschlüssel WZ 2008">
        Die 5-stellige WZ-2008-Klassifikation (optional). Das GewA1 hat kein eigenes Feld dafür, das Gewerbeamt ordnet den Schlüssel
        selbst zu; der Code hilft dir aber bei der Tätigkeitsbeschreibung und im FsE. Hier steht eine Auswahl der häufigsten Schlüssel.
      </StepHead>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            aria-label="WZ-Schlüssel suchen"
            placeholder="Suche (z.B. 'Versandhandel', 'Programmierung', '70.22')"
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            className="pl-9"
          />
        </div>
        <select aria-label="Gruppe" value={gruppe} onChange={(e) => setGruppe(e.target.value as WzGruppe | "alle")} className={selectCls}>
          <option value="alle">Alle Gruppen</option>
          {WZ_GRUPPEN.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {aktuell && (
        <div className="mt-4 rounded-xl border border-success/25 bg-success-soft p-4 text-sm">
          <p className="flex items-start gap-2 font-semibold">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            <span>Ausgewählt: <span className="font-mono tabular">{aktuell.code}</span>, {aktuell.label}</span>
          </p>
          <p className="mt-1 pl-6 text-muted-foreground">Beispiele: {aktuell.beispiele.join(" · ")}</p>
        </div>
      )}

      <p className="mt-4 mb-2 text-xs text-muted-foreground tabular">{gefiltert.length} Einträge</p>
      <div className="max-h-96 divide-y divide-border/70 overflow-y-auto rounded-xl border border-border bg-card">
        {gefiltert.map((w) => {
          const aktiv = data.wzCode === w.code;
          return (
            <button
              key={w.code}
              type="button"
              aria-pressed={aktiv}
              onClick={() => update("wzCode", w.code)}
              className={cn(
                "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-secondary/50",
                aktiv && "bg-success-soft hover:bg-success-soft",
              )}
            >
              <span className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <span className="min-w-0">
                  <span className="font-mono font-semibold text-accent-blue tabular">{w.code}</span>
                  <span className="ml-2 font-medium">{w.label}</span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{w.gruppe}</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{w.beispiele.join(" · ")}</span>
            </button>
          );
        })}
        {gefiltert.length === 0 && (
          <EmptyState
            icon={Search}
            className="m-3 border-0 bg-transparent py-8"
            title="Keine Treffer"
            description="Versuche einen anderen Suchbegriff oder wähle „Alle Gruppen“."
          />
        )}
      </div>
    </div>
  );
};

const KU_OPTIONEN: { v: KuStatus; titel: string; text: string }[] = [
  { v: "ja", titel: "Ja, § 19 KU nutzen", text: "Empfohlen bei B2C (Endverbraucher), niedrigem Anschaffungs-Aufwand und Umsatz unter Grenze." },
  { v: "nein", titel: "Nein, Regelbesteuerung", text: "Empfohlen bei B2B-Geschäft (Kunden brauchen USt-Beleg) oder hohem Vorsteuer-Volumen." },
  { v: "unsicher", titel: "Noch unsicher", text: "Im FsE (Fragebogen zur steuerlichen Erfassung) entscheiden. Den reichst du innerhalb eines Monats nach Start selbst über ELSTER ein (§138 Abs. 1b AO)." },
];

const StepBeginn = ({ data, update }: StepProps) => (
  <div>
    <StepHead title="6. Beginn der Tätigkeit und § 19 UStG">
      Das Datum darf in der Vergangenheit liegen (rückwirkende Anmeldung ist möglich, das Finanzamt prüft).
    </StepHead>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field label={<>Beginn der Tätigkeit<Pflicht /></>} htmlFor="gw-beginn">
        <Input id="gw-beginn" type="date" value={data.beginnDatum} onChange={(e) => update("beginnDatum", e.target.value)} />
      </Field>
      <Field label="Anzahl Mitarbeitende" hint="Ohne dich selbst">
        <NumberField value={data.mitarbeiterZahl} onChange={(n) => update("mitarbeiterZahl", n)} min={0} aria-label="Anzahl Mitarbeitende" />
      </Field>
    </div>

    <div className="mt-6 rounded-xl border border-accent-blue/20 bg-accent/60 p-4 md:p-5">
      <h3 className="text-base font-semibold">§ 19 UStG Kleinunternehmer: deine Entscheidung</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Bleibt dein Umsatz im Gründungsjahr <strong className="font-medium text-foreground">bis 25.000 €</strong> (in Folgejahren: Vorjahr bis
        25.000 € und laufendes Jahr bis 100.000 €, bei Überschreiten sofortiger Wegfall), kannst du die Kleinunternehmerregelung nutzen
        (§ 19 UStG n. F.). Vorteil: keine USt auf Rechnungen, keine USt-Voranmeldung. Nachteil: kein Vorsteuerabzug. An 5 Jahre gebunden
        bist du nur, wenn du auf die Regelung <em>verzichtest</em> (§ 19 Abs. 3 UStG).
      </p>
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium">Möchtest du § 19 UStG nutzen?<Pflicht /></legend>
        <div className="grid grid-cols-1 gap-2">
          {KU_OPTIONEN.map((opt) => (
            <label
              key={opt.v}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-colors hover:border-foreground/25 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
            >
              <input
                type="radio"
                name="kuStatus"
                checked={data.kuStatus === opt.v}
                onChange={() => update("kuStatus", opt.v)}
                className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
              />
              <span>
                <span className="block font-medium">{opt.titel}</span>
                <span className="mt-0.5 block text-muted-foreground">{opt.text}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field className="mt-4" label="Voraussichtlicher Jahresumsatz (€)">
        <NumberField value={data.voraussichtlicherUmsatz} onChange={(n) => update("voraussichtlicherUmsatz", n)} min={0} aria-label="Voraussichtlicher Jahresumsatz in Euro" />
      </Field>
      {data.voraussichtlicherUmsatz > 25000 && data.kuStatus === "ja" && (
        <Callout tone="warning" className="mt-3">
          Bei über 25.000 € Umsatz funktioniert KU nicht. Wähle „Nein“ oder prüfe deine Prognose.
        </Callout>
      )}
    </div>
  </div>
);

const StepBehoerden = ({ data, update }: StepProps) => {
  const istDeutsch = data.staatsangehoerigkeit.trim().toLowerCase() === "deutsch";
  return (
    <div>
      <StepHead title="7. Erlaubnisse und Behörden-Status (Felder 28 bis 31)">
        Alle Felder sind optional, nur ausfüllen, wenn sie zutreffen. Betrifft erlaubnispflichtige Tätigkeiten (Gaststätte, Bewachung,
        Makler, Versicherungsvermittlung usw.), Handwerksbetriebe und Nicht-EU-Bürger.
      </StepHead>

      <div className="space-y-3">
        {/* Feld 28: Erlaubnis */}
        <ErlaubnisBlock
          nr={28}
          title="Liegt eine Erlaubnis vor?"
          hint="Nur falls deine Tätigkeit erlaubnispflichtig ist (z.B. GastG, BewachV, Makler §34c GewO)."
          status={data.erlaubnisStatus}
          onStatus={(s) => update("erlaubnisStatus", s)}
          details={data.erlaubnisDetails}
          onDetails={(v) => update("erlaubnisDetails", v)}
          detailsPlaceholder="Wenn ja: Ausstellungsdatum und erteilende Behörde"
        />

        {/* Feld 29: Handwerkskarte */}
        <ErlaubnisBlock
          nr={29}
          title="Liegt eine Handwerkskarte vor? (nur Handwerksbetriebe)"
          hint="Nur relevant für zulassungspflichtige Handwerksberufe (Anlage A HwO, z.B. Maurer, Elektriker, Friseur)."
          status={data.handwerkskarteStatus}
          onStatus={(s) => update("handwerkskarteStatus", s)}
          details={data.handwerkskarteDetails}
          onDetails={(v) => update("handwerkskarteDetails", v)}
          detailsPlaceholder="Wenn ja: Ausstellungsdatum und Name der Handwerkskammer"
        />

        {/* Feld 30: Aufenthaltsgenehmigung, nur für Nicht-Deutsche */}
        {!istDeutsch && data.staatsangehoerigkeit !== "" && (
          <>
            <ErlaubnisBlock
              nr={30}
              title="Liegt eine Aufenthaltsgenehmigung vor?"
              hint="Pflichtfeld für Nicht-EU-Bürger. EU/EWR-Bürger: nicht erforderlich."
              status={data.aufenthaltStatus}
              onStatus={(s) => update("aufenthaltStatus", s)}
              details={data.aufenthaltDetails}
              onDetails={(v) => update("aufenthaltDetails", v)}
              detailsPlaceholder="Wenn ja: Ausstellungsdatum und erteilende Behörde"
            />

            {/* Feld 31: Auflagen, nur wenn 30 = ja */}
            {data.aufenthaltStatus === "ja" && (
              <ErlaubnisBlock
                nr={31}
                title="Enthält die Aufenthaltsgenehmigung Auflagen oder Beschränkungen?"
                hint="z.B. eingeschränkte Erwerbserlaubnis, Sperrfristen, regionale Beschränkungen."
                status={data.aufenthaltAuflagenStatus}
                onStatus={(s) => update("aufenthaltAuflagenStatus", s)}
                details={data.aufenthaltAuflagenDetails}
                onDetails={(v) => update("aufenthaltAuflagenDetails", v)}
                detailsPlaceholder="Wenn ja: welche Auflagen / Beschränkungen"
              />
            )}
          </>
        )}
      </div>

      {istDeutsch && (
        <p className="mt-4 text-sm text-muted-foreground">
          Die Felder 30 und 31 (Aufenthaltsgenehmigung) entfallen, für deutsche Staatsangehörige sind sie nicht erforderlich.
        </p>
      )}
    </div>
  );
};

const ErlaubnisBlock = ({
  nr, title, hint, status, onStatus, details, onDetails, detailsPlaceholder,
}: {
  nr: number;
  title: string;
  hint: string;
  status: "" | "ja" | "nein";
  onStatus: (s: "" | "ja" | "nein") => void;
  details: string;
  onDetails: (v: string) => void;
  detailsPlaceholder: string;
}) => (
  <fieldset className="rounded-xl border border-border bg-card p-4">
    <legend className="sr-only">Feld {nr}: {title}</legend>
    <div className="flex items-start gap-3">
      <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-secondary px-1.5 text-xs font-semibold text-muted-foreground tabular">
        {nr}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{hint}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {([["ja", "ja"], ["nein", "nein"], ["", "nicht angegeben"]] as const).map(([v, l]) => (
            <label
              key={l}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground/25 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
            >
              <input type="radio" name={`erlaubnis-${nr}`} checked={status === v} onChange={() => onStatus(v)} className="sr-only" />
              <span>{l}</span>
            </label>
          ))}
        </div>
        {status === "ja" && (
          <Input
            value={details}
            onChange={(e) => onDetails(e.target.value)}
            placeholder={detailsPlaceholder}
            aria-label={detailsPlaceholder}
            className="mt-3"
          />
        )}
      </div>
    </div>
  </fieldset>
);

const StepZusammenfassung = ({ data, stepValid, allValid, onGeneratePdf }: { data: WizardData; stepValid: boolean[]; allValid: boolean; onGeneratePdf: () => void }) => {
  const wzEntry = WZ_2008.find((w) => w.code === data.wzCode);

  return (
    <div className="space-y-5">
      <StepHead title="8. Zusammenfassung und PDF">Prüfe deine Angaben. Mit dem Knopf unten füllst du das amtliche GewA1 aus.</StepHead>

      {!allValid && (
        <Callout tone="warning" title="Es fehlen noch Eingaben in einigen Steps.">
          Bitte vervollständige sie zuerst:
          <ul className="mt-1.5 list-inside list-disc">
            {stepValid.map((v, i) => !v && <li key={i}>Step {i + 1}: {STEP_LABELS[i]}</li>)}
          </ul>
        </Callout>
      )}

      <div className="grid grid-cols-1 gap-3">
        <SummaryGroup title="1. Person">
          <SummaryRow label="Name" value={`${data.vorname} ${data.nachname}`.trim()} />
          <SummaryRow label="Geburt" value={data.geburtsdatum || data.geburtsort ? `${data.geburtsdatum} in ${data.geburtsort}` : ""} />
          <SummaryRow label="Staatsangehörigkeit" value={data.staatsangehoerigkeit} />
        </SummaryGroup>
        <SummaryGroup title="2. Anschrift">
          <SummaryRow label="Privat" value={data.privatStrasse || data.privatOrt ? `${data.privatStrasse}, ${data.privatPlz} ${data.privatOrt}` : ""} />
          <SummaryRow label="Betrieb" value={data.betriebsstaetteAndere ? `${data.betriebStrasse}, ${data.betriebPlz} ${data.betriebOrt}` : "wie Privat"} />
        </SummaryGroup>
        <SummaryGroup title="3. Rechtsform">
          <SummaryRow label="Form" value={RECHTSFORM_LABEL[data.rechtsform] ?? data.rechtsform} />
          <SummaryRow label="Grund" value={ANMELDEGRUND_LABEL[data.anmeldegrund] ?? data.anmeldegrund} />
          {data.firmierung && <SummaryRow label="Firmierung" value={data.firmierung} />}
        </SummaryGroup>
        <SummaryGroup title="4. Tätigkeit">
          {data.taetigkeit ? (
            <p className="text-sm leading-relaxed text-foreground/85">„{data.taetigkeit}“</p>
          ) : (
            <p className="text-sm text-muted-foreground">Noch keine Beschreibung</p>
          )}
        </SummaryGroup>
        <SummaryGroup title="5. WZ 2008">
          <SummaryRow label="Code" value={`${data.wzCode}${wzEntry ? `, ${wzEntry.label}` : ""}`} />
        </SummaryGroup>
        <SummaryGroup title="6. Beginn und § 19">
          <SummaryRow label="Beginn" value={data.beginnDatum} />
          <SummaryRow label="Mitarbeitende" value={String(data.mitarbeiterZahl)} />
          <SummaryRow label="§ 19 UStG" value={data.kuStatus === "ja" ? "Ja, KU nutzen" : data.kuStatus === "nein" ? "Nein, Regelbesteuerung" : "Noch unsicher (im FsE entscheiden)"} />
          <SummaryRow label="Prognose Umsatz" value={`${data.voraussichtlicherUmsatz.toLocaleString("de-DE")} €`} />
        </SummaryGroup>
      </div>

      <div>
        <Button onClick={onGeneratePdf} disabled={!allValid} size="lg" className="h-auto min-h-11 w-full whitespace-normal rounded-xl bg-gradient-primary py-2.5 sm:w-auto">
          <FileDown aria-hidden="true" /> Offizielles GewA1-PDF herunterladen
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Erzeugt das amtliche Mustervordruck-PDF (Anlage 1 zur GewAnzV) mit deinen Daten. Die Felder bleiben im Reader editierbar.
        </p>
      </div>

      <Callout tone="warning" title="Wichtig: Das machst du nach dem Download">
        <ol className="mt-1 list-inside list-decimal space-y-1">
          <li>PDF im Reader öffnen, alle Werte gegenprüfen (Felder bleiben editierbar).</li>
          <li><strong className="font-medium text-foreground">Ausdrucken</strong> auf Papier.</li>
          <li><strong className="font-medium text-foreground">Eigenhändig unterschreiben</strong> (Feld „Unterschrift" am Ende der Seite 2). Ohne Unterschrift ungültig.</li>
          <li><strong className="font-medium text-foreground">Beim Gewerbeamt einreichen</strong>, persönlich im Bürgeramt/Ordnungsamt deiner Stadt oder per Post.
            Gebühr: 15 bis 65 € (je nach Stadt). Ausweis mitbringen.</li>
          <li>Manche Städte bieten auch Online-Einreichung an (verwaltung.bund.de / Servicekonto deines Landes).</li>
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">
          Hinweis: Das GewA1 geht ans <strong className="font-medium text-foreground">Gewerbeamt</strong>, NICHT ans Amtsgericht.
          Das Amtsgericht ist nur für den Handelsregister-Eintrag bei UG/GmbH/AG zuständig (separater Vorgang beim Notar). Bei
          Einzelunternehmen und GbR ist kein Amtsgericht beteiligt.
        </p>
      </Callout>

      <Callout tone="info" title="Was kommt nach der Anmeldung?">
        <ol className="mt-1 list-inside list-decimal space-y-1">
          <li>Ausgefülltes GewA1 unterschreiben, persönlich im Bürgeramt einreichen oder online über verwaltung.bund.de (Gebühr 15-65 €).</li>
          <li>Innerhalb eines Monats nach Start den Fragebogen zur steuerlichen Erfassung (FsE) selbst über ELSTER einreichen (§138 Abs. 1b AO), er wird nicht zugeschickt.</li>
          <li>Im FsE: Entscheidung § 19 KU oder Regelbesteuerung (5 Jahre Bindung nur beim Verzicht auf die KU).</li>
          <li>Steuernummer und ggf. USt-ID werden zugeteilt.</li>
          <li>IHK-/HwK-Mitgliedschaft automatisch (Beitrag erst ab Gewinn über 5.200 €).</li>
          <li>Geschäftskonto eröffnen, Berufshaftpflicht prüfen, erste Rechnung mit dem Rechnungs-Tool schreiben.</li>
        </ol>
      </Callout>
    </div>
  );
};

const SummaryGroup = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-xl border border-border bg-secondary/30 p-4", className)}>
    <h3 className="text-sm font-semibold">{title}</h3>
    <div className="mt-2 space-y-1.5">{children}</div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] sm:grid-cols-[10.5rem_minmax(0,1fr)] gap-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={cn("min-w-0 break-words", value ? "font-medium" : "text-muted-foreground")}>{value || "fehlt"}</span>
  </div>
);

const BeginnerHero = () => (
  <Callout tone="accent" icon={Lightbulb} title="Gewerbeanmeldung GewA1, schrittweise vorbereitet" className="mb-6 p-5">
    <p>
      Das amtliche GewA1-Formular ist nicht kompliziert, aber zwei Felder verwirren Anfänger regelmäßig: die{" "}
      <strong className="font-medium text-foreground">Tätigkeitsbeschreibung</strong> (zu allgemein führt zu Rückfragen vom
      Finanzamt) und der <strong className="font-medium text-foreground">WZ-2008-Branchenschlüssel</strong> (5-stellig, oft
      geraten). Der Wizard führt dich mit Beispielen und Suche durch beide und füllt am Ende das offizielle GewA1-PDF zum
      Ausdrucken und Unterschreiben.
    </p>
    <p className="mt-2">
      Vorab klären: Ist es wirklich ein Gewerbe und kein Freiberuf?{" "}
      <Link to="/cockpit/gewerbe-check" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
        Gewerbe-Check öffnen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </p>
  </Callout>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {[
        { b: "GewA1-Formular", e: "Bundeseinheitliches Formular zur Anzeige eines Gewerbes nach § 14 GewO. Online (verwaltung.bund.de bzw. Portal deines Landes) oder im Bürgeramt/Gewerbeamt. Gebühr 15-65 € (stadt-abhängig). Anmeldung MUSS bei oder kurz nach Aufnahme der Tätigkeit erfolgen — rückwirkend bis ~6 Monate ok, dann Bußgeld möglich." },
        { b: "WZ 2008 Branchenschlüssel", e: "5-stellige Klassifikation der Wirtschaftszweige (Ausgabe 2008) vom Statistischen Bundesamt. Beispiele: 47.91.1 = Versandhandel Textilien, 62.01.0 = Programmierungstätigkeiten, 70.22.0 = Unternehmensberatung. Im GewA1 zu wählen. Wenn falsch: FA korrigiert später, kein Drama." },
        { b: "Tätigkeitsbeschreibung", e: "Pflicht-Klartext-Feld im GewA1. So GENAU wie möglich. Schlecht: 'Onlinehandel'. Gut: 'Onlinehandel mit Sportbekleidung, Sportzubehör und Nahrungsergänzungsmitteln über eigenen Shop und Amazon Marketplace'. Faustregel: Antwort auf 'WAS verkaufst du WIE und an WEN'. Auch Nebentätigkeiten mit erfassen (Definition wird sonst zu eng)." },
        { b: "Einzelunternehmen vs UG/GmbH", e: "Einzel = einfachste Form, kein Stammkapital, Anmeldung nur GewA1. UG = ab 1 € Stammkapital, Notar nötig (300-800 €), Eintrag Handelsregister. GmbH = 25k Stammkapital, Notar (~1.500 €). Für >90 % der Solo-Selbstständigen reicht Einzel — UG/GmbH sinnvoll bei: Haftungs-Risiko, Investor-Eintritt, Erbschaftsplanung." },
        { b: "FsE: Fragebogen zur steuerlichen Erfassung", e: "Musst du innerhalb eines Monats nach Aufnahme der Tätigkeit selbst und unaufgefordert über ELSTER einreichen (§138 Abs. 1b, Abs. 4 AO), er kommt nicht per Post. Dort: § 19 KU festlegen, Anlage S/G, voraussichtliche Einkünfte, USt-Vorauszahlungen. Empfehlung: nicht raten — beim FA nachfragen oder Tool 5 (Brutto-Netto) + Tool 7 (StB) konsultieren." },
        { b: "IHK / HwK-Mitgliedschaft", e: "Automatisch bei Gewerbeanmeldung. IHK = Industrie- und Handelskammer (Handel, Service). HwK = Handwerkskammer (handwerkliche Tätigkeit, ggf. Meister-Pflicht). Beitrag: Grundbeitrag ~40-150 €/Jahr ab Gewinn > 5.200 €, plus Umlage 0,2-0,5 % vom Gewinn. Befreiung für Neugründer 2 Jahre möglich." },
        { b: "Erlaubnispflichtige Gewerbe", e: "Manche Gewerbe brauchen ZUSÄTZLICHE Erlaubnis VOR Anmeldung: Gastronomie (§ 2 GastG bzw. Landes-Gaststättengesetz), Makler (§ 34c GewO), Sicherheit (§ 34a), Spielhalle, Bewachung, Pfandleiher. Ohne Erlaubnis = Ordnungswidrigkeit. Bei IT/Beratung/Handel meist keine Erlaubnis nötig." },
        { b: "§ 19 UStG Kleinunternehmer-Optierung", e: "Im FsE wählst du: KU (keine USt) oder Regelbesteuerung. Voraussetzung KU (Reform 2025): Vorjahres-Umsatz ≤ 25.000 € und Umsatz im laufenden Jahr ≤ 100.000 € (bei Überschreiten sofortiger Wegfall); im Gründungsjahr ≤ 25.000 €. 5 Jahre Bindung nur beim Verzicht auf die KU (§ 19 Abs. 3 UStG). Vorteil KU: keine USt-VA, simple Rechnung. Nachteil: kein Vorsteuer-Abzug. Tool 3 hat Detail-Schwellen, Tool 9 die Rechnungs-Logik." },
      ].map((g) => (
        <div key={g.b} className="py-3.5 text-sm">
          <dt className="font-semibold text-foreground">{g.b}</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{g.e}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default GewerbeanmeldungWizard;
