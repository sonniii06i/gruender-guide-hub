import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle2, Copy, Download, FileText, Info, Plus, Sparkles, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Answers = Record<string, any>;

type Person = {
  vorname?: string;
  nachname?: string;
  geburtsdatum?: string;
  geburtsort?: string;
  adresse?: string;
  beruf?: string;
  familienstand?: string;
  anteilEur?: string;
  einlageArt?: "bar" | "sache";
  sacheinlageBeschreibung?: string;
};

type Geschaeftsfuehrer = {
  name?: string;
  istGesellschafter?: "ja" | "nein";
  vertretung?: "einzel" | "gesamt";
  befreiung181?: "ja" | "nein";
};

const FAMILIENSTAND_OPTIONS = [
  "ledig",
  "verheiratet (Zugewinngemeinschaft)",
  "verheiratet (Gütertrennung)",
  "verheiratet (Gütergemeinschaft)",
  "geschieden",
  "verwitwet",
];

const formatEur = (v: string | undefined) => {
  const n = parseInt(v ?? "0", 10);
  if (!n) return "";
  return n.toLocaleString("de-DE") + " €";
};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function NotarPreparation({
  answers,
  setAnswers,
  companyName,
  onCompanyNameChange,
}: {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  /** Geteilter Firmenname aus dem Run-Kontext (cross-step). */
  companyName: string;
  /** Callback, der den geteilten Firmennamen ändert (sync zu Step 1). */
  onCompanyNameChange: (v: string) => void;
}) {
  const a = answers;
  const set = (key: string, value: any) => setAnswers({ ...a, [key]: value });

  // Firmenname ist die geteilte Quelle (runCtx.company_name).
  // Bidirektional editierbar – Änderung hier syncs auch zu Step 1.
  const firmenname = companyName;

  const persons: Person[] = a.persons ?? [{}];
  const gfs: Geschaeftsfuehrer[] = a.gfs ?? [{}];
  const stammkapital = a.stammkapital ?? "25000";

  const totalAnteile = persons.reduce(
    (sum, p) => sum + (parseInt(p.anteilEur ?? "0", 10) || 0),
    0,
  );
  const stammkapitalNum = parseInt(stammkapital, 10) || 0;
  // Disclaimer nur wenn beide Werte > 0 (sonst nervt's beim Eingeben).
  const anteileBothEntered = totalAnteile > 0 && stammkapitalNum > 0;
  const anteileMatch = totalAnteile === stammkapitalNum;

  // KI-Enhance für Unternehmensgegenstand
  const [enhancing, setEnhancing] = useState(false);
  const enhanceGegenstand = async () => {
    const text = String(a.gegenstand ?? "").trim();
    if (text.length < 5) {
      toast.error("Erst kurz beschreiben, dann verfeinern lassen");
      return;
    }
    setEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke("enhance-text", {
        body: { text, kind: "unternehmensgegenstand" },
      });
      if (error || !data?.enhanced) {
        toast.error("Konnte gerade nicht verfeinern – nochmal versuchen");
      } else {
        set("gegenstand", data.enhanced);
        toast.success("Formulierung verfeinert");
      }
    } finally {
      setEnhancing(false);
    }
  };

  // Musterprotokoll-Eligibility
  const eligibleMusterprotokoll =
    persons.length <= 3 &&
    gfs.length === 1 &&
    persons.every((p) => p.einlageArt !== "sache") &&
    a.holding !== "ja";

  const updatePerson = (i: number, patch: Partial<Person>) => {
    const next = [...persons];
    next[i] = { ...next[i], ...patch };
    set("persons", next);
  };
  const addPerson = () => set("persons", [...persons, {}]);
  const removePerson = (i: number) => set("persons", persons.filter((_, idx) => idx !== i));

  const updateGf = (i: number, patch: Partial<Geschaeftsfuehrer>) => {
    const next = [...gfs];
    next[i] = { ...next[i], ...patch };
    set("gfs", next);
  };
  const addGf = () => set("gfs", [...gfs, {}]);
  const removeGf = (i: number) => set("gfs", gfs.filter((_, idx) => idx !== i));

  const summary = useMemo(() => buildSummary({ ...a, firmenname, stammkapital, persons, gfs }), [
    a,
    firmenname,
    stammkapital,
    persons,
    gfs,
  ]);

  const copy = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Zusammenfassung kopiert");
  };
  const download = async () => {
    // Dynamic import damit jsPDF nicht im Initial-Bundle landet
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const writeLine = (text: string, opts: { size?: number; bold?: boolean; gap?: number } = {}) => {
      const { size = 10, bold = false, gap = 4 } = opts;
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text || " ", maxWidth);
      for (const line of lines) {
        if (y + size + gap > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += size + gap;
      }
    };

    // Header
    writeLine("Notartermin-Vorbereitung – GmbH-Gründung", { size: 18, bold: true, gap: 6 });
    writeLine(`Stand: ${new Date().toLocaleDateString("de-DE")}`, { size: 10, gap: 12 });

    // Sektion 1: Firma
    writeLine("FIRMA", { size: 13, bold: true, gap: 8 });
    writeLine(`Firmenname:           ${a.firmenname || firmenname || "(noch offen)"}`);
    writeLine(`Sitz:                 ${a.firmensitzStadt || "—"}`);
    writeLine(`Geschäftsadresse:     ${a.firmensitzAdresse || "—"}`);
    writeLine(`Geschäftsjahr:        ${a.gjahr === "abweichend" ? `abweichend (Start ${a.gjahrStart || "?"})` : a.gjahr === "kalender" ? "Kalenderjahr" : "—"}`, { gap: 8 });
    writeLine("Unternehmensgegenstand:", { bold: true });
    writeLine(a.gegenstand || "—", { gap: 14 });

    // Sektion 2: Stammkapital
    writeLine("STAMMKAPITAL", { size: 13, bold: true, gap: 8 });
    writeLine(`Gesamt:               ${formatEur(a.stammkapital) || "—"}`);
    writeLine(`Bei Gründung einzahlbar: ${formatEur(a.einzahlung) || "—"}`, { gap: 14 });

    // Sektion 3: Gesellschafter
    writeLine(`GESELLSCHAFTER (${persons.length})`, { size: 13, bold: true, gap: 8 });
    persons.forEach((p, i) => {
      writeLine(`[${i + 1}] ${[p.vorname, p.nachname].filter(Boolean).join(" ") || "(Name fehlt)"}`, { bold: true });
      writeLine(`     geboren: ${p.geburtsdatum || "—"} in ${p.geburtsort || "—"}`);
      writeLine(`     Adresse: ${p.adresse || "—"}`);
      writeLine(`     Beruf: ${p.beruf || "—"}`);
      writeLine(`     Familienstand: ${p.familienstand || "—"}`);
      writeLine(`     Anteil: ${formatEur(p.anteilEur) || "—"} (${p.einlageArt === "sache" ? "Sacheinlage" : "Bareinlage"})`);
      if (p.einlageArt === "sache" && p.sacheinlageBeschreibung) {
        writeLine(`     Sacheinlage: ${p.sacheinlageBeschreibung}`);
      }
      y += 4;
    });

    // Sektion 4: Geschäftsführung
    writeLine(`GESCHÄFTSFÜHRUNG (${gfs.length})`, { size: 13, bold: true, gap: 8 });
    gfs.forEach((g, i) => {
      writeLine(`[${i + 1}] ${g.name || "(Name fehlt)"}`, { bold: true });
      writeLine(`     ${g.istGesellschafter === "ja" ? "Gesellschafter-GF" : g.istGesellschafter === "nein" ? "Fremd-GF" : "—"}`);
      writeLine(`     Vertretung: ${g.vertretung === "einzel" ? "Einzelvertretung" : g.vertretung === "gesamt" ? "Gesamtvertretung" : "—"}`);
      writeLine(`     Befreiung § 181 BGB: ${g.befreiung181 === "ja" ? "Ja" : g.befreiung181 === "nein" ? "Nein" : "—"}`);
      y += 4;
    });

    // Sektion 5: Holding (optional)
    if (a.holding === "ja") {
      writeLine("HOLDING", { size: 13, bold: true, gap: 8 });
      writeLine(`Holding-Name:    ${a.holdingName || "—"}`);
      writeLine(`Sitz:            ${a.holdingSitz || "—"}`);
      writeLine(`HRB:             ${a.holdingHrb || "—"}`, { gap: 14 });
    }

    // Sektion 6: Optionale Klauseln
    const optionals: [string, string][] = [
      ["Vorkaufsrecht", a.vorkauf],
      ["Wettbewerbsverbot Gesellschafter", a.wettbewerb],
      ["Beirat / Aufsichtsrat", a.beirat],
      ["Schiedsklausel", a.schieds],
    ].filter(([, v]) => v === "ja") as [string, string][];
    if (optionals.length) {
      writeLine("VEREINBARTE OPTIONALE KLAUSELN", { size: 13, bold: true, gap: 8 });
      optionals.forEach(([k]) => writeLine(`• ${k}`));
      y += 8;
    }

    // Footer
    writeLine("─".repeat(60), { gap: 8 });
    writeLine("Bitte um Rückmeldung zu offenen Punkten und Terminvorschlag.", { size: 10 });
    writeLine("Erstellt mit GründerX – Notartermin-Vorbereitungs-Modul", { size: 8, gap: 0 });

    const filename = `notar-vorbereitung-${(firmenname || "gmbh").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${todayIso()}.pdf`;
    doc.save(filename);
  };

  /**
   * Erzeugt eine DSGVO Art. 13 Information für jede:n Mit-Gesellschafter:in.
   * Erfüllt die in der Datenschutzerklärung §3.2 versprochene Mustervorlage.
   */
  const downloadGesellschafterInfo = async () => {
    const eligible = persons.filter((p) => p.vorname || p.nachname);
    if (eligible.length === 0) {
      toast.error("Mindestens 1 Gesellschafter mit Name eingeben");
      return;
    }
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;

    eligible.forEach((p, idx) => {
      if (idx > 0) doc.addPage();
      let y = margin;

      const writeLine = (text: string, opts: { size?: number; bold?: boolean; gap?: number } = {}) => {
        const { size = 10, bold = false, gap = 4 } = opts;
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text || " ", maxWidth);
        for (const line of lines) {
          if (y + size + gap > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += size + gap;
        }
      };

      const fullName = [p.vorname, p.nachname].filter(Boolean).join(" ");

      writeLine("Information zur Datenverarbeitung", { size: 18, bold: true, gap: 6 });
      writeLine("nach Art. 13 / 14 DSGVO", { size: 11, gap: 14 });

      writeLine(`Sehr geehrte/r ${fullName || "Gesellschafter:in"},`, { gap: 12 });
      writeLine(
        `im Rahmen der geplanten Gründung der ${firmenname || "(Firmenname noch offen)"} verarbeiten wir personenbezogene Daten von Ihnen. Mit dieser Information kommen wir der Pflicht nach Art. 13 / 14 DSGVO nach.`,
        { gap: 14 },
      );

      writeLine("1. Verantwortlicher", { bold: true, size: 11, gap: 6 });
      writeLine("Verantwortlicher i. S. d. Art. 4 Nr. 7 DSGVO ist die Person/Gesellschaft, die diese Vorbereitung durchführt:", { gap: 4 });
      writeLine(`  • Initiator (Sie als Mit-Gesellschafter:in werden hierüber informiert)`, { gap: 8 });
      writeLine("  Eingabe der Daten in die Vorbereitungs-Plattform durch:", { gap: 4 });
      writeLine(`  ${eligible[0]?.vorname && eligible[0]?.nachname ? [eligible[0].vorname, eligible[0].nachname].join(" ") : "(Initiator-Name)"}`, { gap: 4 });
      writeLine("  Adresse: bitte beim Initiator erfragen.", { gap: 14 });

      writeLine("2. Verarbeitete Datenkategorien", { bold: true, size: 11, gap: 6 });
      writeLine("Folgende Daten werden im Rahmen der Notartermin-Vorbereitung erfasst und gespeichert:", { gap: 6 });
      writeLine(`  • Name, Vorname:           ${fullName || "—"}`);
      writeLine(`  • Geburtsdatum:            ${p.geburtsdatum || "—"}`);
      writeLine(`  • Geburtsort:              ${p.geburtsort || "—"}`);
      writeLine(`  • Wohnanschrift:           ${p.adresse || "—"}`);
      writeLine(`  • Beruf:                   ${p.beruf || "—"}`);
      writeLine(`  • Familienstand:           ${p.familienstand || "—"}`);
      writeLine(`  • Anteil am Stammkapital:  ${formatEur(p.anteilEur) || "—"}`);
      writeLine(`  • Art der Einlage:         ${p.einlageArt === "sache" ? "Sacheinlage" : p.einlageArt === "bar" ? "Bareinlage" : "—"}`, { gap: 14 });

      writeLine("3. Zweck der Verarbeitung", { bold: true, size: 11, gap: 6 });
      writeLine(
        `Die Daten werden ausschließlich für die Vorbereitung des Notartermins zur Beurkundung des Gesellschaftsvertrags (geplante ${firmenname || "GmbH"}) und die anschließende Anmeldung beim Handelsregister verarbeitet. Das ist nach deutschem Recht für die Gründung einer GmbH zwingend erforderlich (§§ 2, 7 GmbHG, § 8 GmbHG i. V. m. § 12 HGB).`,
        { gap: 14 },
      );

      writeLine("4. Rechtsgrundlage", { bold: true, size: 11, gap: 6 });
      writeLine(
        "Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung / vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung aus GmbHG / HGB).",
        { gap: 14 },
      );

      writeLine("5. Empfänger der Daten", { bold: true, size: 11, gap: 6 });
      writeLine("Die Daten werden an folgende Stellen weitergegeben:", { gap: 4 });
      writeLine("  • Notar/Notarin (zur Beurkundung des Gesellschaftsvertrags)");
      writeLine("  • Amtsgericht / Handelsregister (zur Eintragung)");
      writeLine("  • Steuerberater:in (falls einbezogen)");
      writeLine("  • Bank (für Stammkapital-Konto und Bestätigung)");
      writeLine("  • GründerX (Sonni Buttke, Pinguinweg 18, 22527 Hamburg) als technischer Auftragsverarbeiter (Art. 28 DSGVO)", { gap: 14 });

      writeLine("6. Speicherort & Speicherdauer", { bold: true, size: 11, gap: 6 });
      writeLine("Speicherort: Supabase-Datenbank in der EU (Frankfurt am Main).", { gap: 4 });
      writeLine(
        "Speicherdauer: bis zur erfolgreichen HR-Eintragung der GmbH. Im Anschluss gelten die handels- und steuerrechtlichen Aufbewahrungsfristen (§ 257 HGB / § 147 AO – bis zu 10 Jahre für Gründungsurkunden).",
        { gap: 14 },
      );

      writeLine("7. Ihre Rechte", { bold: true, size: 11, gap: 6 });
      writeLine("Sie haben jederzeit das Recht auf:", { gap: 4 });
      writeLine("  • Auskunft (Art. 15 DSGVO)");
      writeLine("  • Berichtigung (Art. 16 DSGVO)");
      writeLine("  • Löschung (Art. 17 DSGVO) – soweit keine gesetzliche Aufbewahrungspflicht entgegensteht");
      writeLine("  • Einschränkung der Verarbeitung (Art. 18 DSGVO)");
      writeLine("  • Datenübertragbarkeit (Art. 20 DSGVO)");
      writeLine("  • Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)");
      writeLine("  • Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)", { gap: 14 });

      writeLine("8. Kontakt", { bold: true, size: 11, gap: 6 });
      writeLine("Anfragen zu Ihren Rechten richten Sie bitte an den Initiator dieser Vorbereitung (siehe Ziffer 1) oder an:", { gap: 4 });
      writeLine("GründerX – Datenschutz");
      writeLine("E-Mail: datenschutz@gründerx.de", { gap: 14 });

      writeLine(`Datum: ${new Date().toLocaleDateString("de-DE")}`, { gap: 14 });

      writeLine("─".repeat(70), { gap: 6 });
      writeLine("Hinweis: Diese Information wurde maschinell mit den im GründerX-Notar-Modul erfassten Daten erzeugt. Bitte vor Weitergabe auf Vollständigkeit und Korrektheit prüfen.", { size: 8 });
    });

    const filename = `dsgvo-info-mitgesellschafter-${(firmenname || "gmbh").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${todayIso()}.pdf`;
    doc.save(filename);
    toast.success(`PDF mit ${eligible.length} Information${eligible.length > 1 ? "en" : ""} erstellt`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-3 text-sm">
        <Info className="h-4 w-4 text-accent-blue mt-0.5 shrink-0" />
        <div>
          <strong>Wichtig:</strong> Den Vertrag setzt der Notar auf. Du sammelst hier nur die Eckdaten, damit
          er deinen Termin effizient vorbereiten kann. Du kannst jederzeit zurück und ergänzen –
          alle Antworten werden gespeichert.
        </div>
      </div>

      {/* Block 1: Firma */}
      <Section title="1. Firma & Sitz">
        <Grid>
          <Field label="Firmenname (mit Rechtsform 'GmbH')" help="Synchronisiert mit Schritt 1 – Änderung wirkt sofort in beide Richtungen." full required>
            <Input
              value={firmenname}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              placeholder="z. B. Müller Digital GmbH"
            />
          </Field>
          <Field label="Firmensitz (Stadt)" required>
            <Input
              value={a.firmensitzStadt ?? ""}
              onChange={(e) => set("firmensitzStadt", e.target.value)}
              placeholder="z. B. Hamburg"
              required
            />
          </Field>
          <Field label="Geschäftsadresse" required>
            <Input
              value={a.firmensitzAdresse ?? ""}
              onChange={(e) => set("firmensitzAdresse", e.target.value)}
              placeholder="Straße + Nr., PLZ, Ort"
              required
            />
          </Field>
          <FieldWithAction
            label="Unternehmensgegenstand"
            full
            help="Konkret formulieren – das Registergericht prüft das. Floskeln wie 'Beratung allgemein' werden oft abgelehnt. Tipp: erst grob hinschreiben, dann auf den ✨ klicken."
            action={
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={enhanceGegenstand}
                disabled={enhancing || !String(a.gegenstand ?? "").trim()}
              >
                {enhancing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-accent-blue" />}
                <span className="ml-1.5">KI-Verfeinern</span>
              </Button>
            }
          >
            <Textarea
              value={a.gegenstand ?? ""}
              onChange={(e) => set("gegenstand", e.target.value)}
              rows={3}
              placeholder="z. B. Entwicklung und Vertrieb von Software für Onlineshops…"
            />
          </FieldWithAction>
          <Field label="Geschäftsjahr">
            <Radio
              name="gjahr"
              value={a.gjahr ?? ""}
              onChange={(v) => set("gjahr", v)}
              options={[
                { value: "kalender", label: "Kalenderjahr (1.1. – 31.12.)" },
                { value: "abweichend", label: "Abweichend (z. B. 1.7. – 30.6.)" },
              ]}
            />
          </Field>
          {a.gjahr === "abweichend" && (
            <Field label="Abweichendes Geschäftsjahr (Start)">
              <Input value={a.gjahrStart ?? ""} onChange={(e) => set("gjahrStart", e.target.value)} placeholder="z. B. 1. Juli" />
            </Field>
          )}
        </Grid>
      </Section>

      {/* Block 2: Stammkapital */}
      <Section title="2. Stammkapital">
        <Grid>
          <Field label="Stammkapital (€)" help="Mindestens 25.000 €. Mehr ist möglich (z. B. 50.000 € für bessere Bonität).">
            <Input type="number" min={25000} step={1000} value={stammkapital} onChange={(e) => set("stammkapital", e.target.value)} />
          </Field>
          <FieldWithAction
            label="Bei Gründung einzuzahlen (€)"
            help="Bei Bargründung mind. 50 % des Stammkapitals (≥ 12.500 €). Bei Sachgründung 100 %."
            action={
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" size="sm" variant="ghost" className="h-7 px-2">
                    <Info className="h-3.5 w-3.5 text-accent-blue" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 text-xs leading-relaxed space-y-2">
                  <div className="font-semibold text-sm">Wie viel muss eingezahlt sein?</div>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Bargründung:</strong> mind. 50 % des Stammkapitals (also ≥ 12.500 € bei 25k Stammkapital). Rest bleibt als Forderung der GmbH gegen Gesellschafter.</li>
                    <li><strong>Sachgründung:</strong> 100 % der Sacheinlage muss bei Gründung erbracht sein – plus Sachgründungsbericht.</li>
                    <li><strong>Pro Gesellschafter:</strong> mind. 25 % seiner eigenen Stammeinlage (auch wenn andere mehr einzahlen).</li>
                  </ul>
                  <div className="font-semibold text-sm pt-2">Wann muss das Geld da sein?</div>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>Vor</strong> der Handelsregister-Anmeldung. Reihenfolge: Notartermin → Geschäftskonto → Einzahlung → Bestätigung an Notar → HR-Anmeldung.</li>
                    <li>Notar braucht eine Bank-Bestätigung als PDF/Brief, dass das Geld auf dem GmbH-Konto liegt.</li>
                    <li>Vor HR-Eintrag: nicht ausgeben außer für Gründungskosten.</li>
                  </ul>
                </PopoverContent>
              </Popover>
            }
          >
            <Input type="number" value={a.einzahlung ?? "12500"} onChange={(e) => set("einzahlung", e.target.value)} />
          </FieldWithAction>
        </Grid>
      </Section>

      {/* Block 3: Gesellschafter */}
      <Section title={`3. Gesellschafter (${persons.length})`}>
        <div className="space-y-4">
          {persons.map((p, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Gesellschafter {i + 1}</div>
                {persons.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removePerson(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Grid>
                <Field label="Vorname">
                  <Input value={p.vorname ?? ""} onChange={(e) => updatePerson(i, { vorname: e.target.value })} />
                </Field>
                <Field label="Nachname">
                  <Input value={p.nachname ?? ""} onChange={(e) => updatePerson(i, { nachname: e.target.value })} />
                </Field>
                <Field label="Geburtsdatum">
                  <Input type="date" value={p.geburtsdatum ?? ""} onChange={(e) => updatePerson(i, { geburtsdatum: e.target.value })} />
                </Field>
                <Field label="Geburtsort">
                  <Input value={p.geburtsort ?? ""} onChange={(e) => updatePerson(i, { geburtsort: e.target.value })} />
                </Field>
                <Field label="Wohnanschrift" full>
                  <Input value={p.adresse ?? ""} onChange={(e) => updatePerson(i, { adresse: e.target.value })} placeholder="Straße + Nr., PLZ, Ort" />
                </Field>
                <Field label="Beruf">
                  <Input value={p.beruf ?? ""} onChange={(e) => updatePerson(i, { beruf: e.target.value })} />
                </Field>
                <Field label="Familienstand" help="Wichtig wegen Zugewinngemeinschaft – bei Verheirateten oft Zustimmung des Ehepartners nötig.">
                  <Select value={p.familienstand ?? ""} onChange={(v) => updatePerson(i, { familienstand: v })} options={FAMILIENSTAND_OPTIONS} />
                </Field>
                <Field label="Anteil (€)">
                  <Input type="number" value={p.anteilEur ?? ""} onChange={(e) => updatePerson(i, { anteilEur: e.target.value })} />
                </Field>
                <Field label="Art der Einlage">
                  <Radio
                    name={`einlage-${i}`}
                    value={p.einlageArt ?? ""}
                    onChange={(v) => updatePerson(i, { einlageArt: v as "bar" | "sache" })}
                    options={[
                      { value: "bar", label: "Bar (Geldeinlage)" },
                      { value: "sache", label: "Sacheinlage (Gegenstand)" },
                    ]}
                  />
                </Field>
                {p.einlageArt === "sache" && (
                  <Field label="Sacheinlage beschreiben" full help="Pflicht: Sachgründungsbericht beim Notar. Wert nachweisbar (Gutachten, Marktwert). Beispiele: Maschinen, Anteile, Fahrzeug, IP/Marke.">
                    <Textarea value={p.sacheinlageBeschreibung ?? ""} onChange={(e) => updatePerson(i, { sacheinlageBeschreibung: e.target.value })} rows={2} />
                  </Field>
                )}
              </Grid>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addPerson}>
            <Plus className="h-4 w-4 mr-1" /> Gesellschafter hinzufügen
          </Button>

          {anteileBothEntered && (
            <div className={`text-xs rounded-lg p-3 ${anteileMatch ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              Summe Anteile: {formatEur(String(totalAnteile))} / Stammkapital: {formatEur(stammkapital)}
              {!anteileMatch && " – muss übereinstimmen!"}
            </div>
          )}

          {/* DSGVO-Info-Generator – nur sinnvoll wenn min. 1 Gesellschafter mit Name */}
          {persons.some((p) => p.vorname || p.nachname) && (
            <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/5 p-3 space-y-2">
              <div className="text-xs leading-relaxed">
                <strong>DSGVO-Pflicht:</strong> Du verarbeitest hier personenbezogene Daten von
                Mit-Gesellschafter:innen. Nach Art. 13 / 14 DSGVO musst du sie darüber
                informieren. Wir generieren dir eine fertige Vorlage als PDF (1 Seite pro Person).
              </div>
              <Button type="button" variant="outline" size="sm" onClick={downloadGesellschafterInfo}>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                DSGVO-Info für {persons.filter((p) => p.vorname || p.nachname).length} Gesellschafter herunterladen
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* Block 4: Geschäftsführer */}
      <Section title={`4. Geschäftsführung (${gfs.length})`}>
        <div className="space-y-4">
          {gfs.map((g, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Geschäftsführer {i + 1}</div>
                {gfs.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeGf(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Grid>
                <Field label="Name (Vor- + Nachname)" full>
                  <Input value={g.name ?? ""} onChange={(e) => updateGf(i, { name: e.target.value })} />
                </Field>
                <Field label="Ist auch Gesellschafter?">
                  <Radio
                    name={`gf-gesell-${i}`}
                    value={g.istGesellschafter ?? ""}
                    onChange={(v) => updateGf(i, { istGesellschafter: v as "ja" | "nein" })}
                    options={[
                      { value: "ja", label: "Ja" },
                      { value: "nein", label: "Nein (Fremd-GF)" },
                    ]}
                  />
                </Field>
                <Field label="Vertretungsbefugnis" help="Bei einem GF nicht relevant. Bei mehreren: Einzelvertretung = jeder GF darf alleine. Gesamtvertretung = nur gemeinsam.">
                  <Radio
                    name={`gf-vertret-${i}`}
                    value={g.vertretung ?? ""}
                    onChange={(v) => updateGf(i, { vertretung: v as "einzel" | "gesamt" })}
                    options={[
                      { value: "einzel", label: "Einzelvertretung" },
                      { value: "gesamt", label: "Gesamtvertretung" },
                    ]}
                  />
                </Field>
                <Field label="Befreiung von § 181 BGB?" help="Erlaubt Insichgeschäfte (z. B. GF schließt Vertrag mit eigener GmbH ab). Bei Holding-Strukturen i. d. R. JA.">
                  <Radio
                    name={`gf-181-${i}`}
                    value={g.befreiung181 ?? ""}
                    onChange={(v) => updateGf(i, { befreiung181: v as "ja" | "nein" })}
                    options={[
                      { value: "ja", label: "Ja" },
                      { value: "nein", label: "Nein" },
                    ]}
                  />
                </Field>
              </Grid>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addGf}>
            <Plus className="h-4 w-4 mr-1" /> Geschäftsführer hinzufügen
          </Button>
        </div>
      </Section>

      {/* Block 5: Holding */}
      <Section title="5. Holding-Struktur">
        <Grid>
          <Field label="Werden Anteile von einer Holding gehalten?" full help="Wenn ja: §21 UmwStG-Sperrfrist 7 Jahre beachten – Verkauf/Umstrukturierung in dieser Zeit löst rückwirkend Steuer aus.">
            <Radio
              name="holding"
              value={a.holding ?? ""}
              onChange={(v) => set("holding", v)}
              options={[
                { value: "nein", label: "Nein, Privatpersonen halten Anteile" },
                { value: "ja", label: "Ja, eine Holding GmbH ist Gesellschafter" },
                { value: "spaeter", label: "Vielleicht später (klassisch gründen)" },
              ]}
            />
          </Field>
          {a.holding === "ja" && (
            <>
              <Field label="Name der Holding GmbH" full>
                <Input value={a.holdingName ?? ""} onChange={(e) => set("holdingName", e.target.value)} />
              </Field>
              <Field label="Sitz der Holding">
                <Input value={a.holdingSitz ?? ""} onChange={(e) => set("holdingSitz", e.target.value)} />
              </Field>
              <Field label="HRB-Nr. der Holding">
                <Input value={a.holdingHrb ?? ""} onChange={(e) => set("holdingHrb", e.target.value)} placeholder="z. B. HRB 12345 (Amtsgericht Hamburg)" />
              </Field>
            </>
          )}
        </Grid>
      </Section>

      {/* Block 6: Optionale Klauseln */}
      <Section title="6. Optionale Vertragsklauseln (mehr als 1 Gesellschafter)" hint="Bei Solo-Gründung meist irrelevant – kann beim Notar besprochen werden.">
        <Grid>
          <Field label="Vorkaufsrecht der Gesellschafter">
            <Radio
              name="vorkauf"
              value={a.vorkauf ?? ""}
              onChange={(v) => set("vorkauf", v)}
              options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
            />
          </Field>
          <Field label="Wettbewerbsverbot für Gesellschafter">
            <Radio
              name="wettbewerb"
              value={a.wettbewerb ?? ""}
              onChange={(v) => set("wettbewerb", v)}
              options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
            />
          </Field>
          <Field label="Beirat / Aufsichtsrat" help="Bei kleiner GmbH (<500 Mitarbeiter) freiwillig.">
            <Radio
              name="beirat"
              value={a.beirat ?? ""}
              onChange={(v) => set("beirat", v)}
              options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
            />
          </Field>
          <Field label="Schiedsklausel statt ordentlicher Gerichte">
            <Radio
              name="schieds"
              value={a.schieds ?? ""}
              onChange={(v) => set("schieds", v)}
              options={[{ value: "ja", label: "Ja" }, { value: "nein", label: "Nein" }]}
            />
          </Field>
        </Grid>
      </Section>

      {/* Branching Result: Musterprotokoll vs. Satzung */}
      <div className={`rounded-xl border p-4 ${eligibleMusterprotokoll ? "border-success/40 bg-success/5" : "border-accent-blue/40 bg-accent-blue/5"}`}>
        <div className="flex items-start gap-2">
          <CheckCircle2 className={`h-5 w-5 mt-0.5 shrink-0 ${eligibleMusterprotokoll ? "text-success" : "text-accent-blue"}`} />
          <div className="text-sm">
            <strong>{eligibleMusterprotokoll ? "Musterprotokoll möglich" : "Eigene Satzung erforderlich"}</strong>
            <div className="text-muted-foreground mt-1">
              {eligibleMusterprotokoll
                ? "Bis 3 Gesellschafter, 1 Geschäftsführer, nur Bareinlage, keine Holding → Musterprotokoll spart 200–400 € Notarkosten."
                : "Mehr als 3 Gesellschafter / mehrere GF / Sacheinlage / Holding → eigene Satzung mit Notar erforderlich."}
            </div>
          </div>
        </div>
      </div>

      {/* Zusammenfassung */}
      <Section title="✓ Zusammenfassung für den Notar">
        <Textarea value={summary} readOnly rows={14} className="font-mono text-xs" />
        <div className="flex gap-2 mt-3">
          <Button onClick={copy} variant="outline">
            <Copy className="h-4 w-4 mr-1" /> Kopieren
          </Button>
          <Button onClick={download}>
            <Download className="h-4 w-4 mr-1" /> Als PDF herunterladen
          </Button>
        </div>
      </Section>
    </div>
  );
}

// ============== Helper-Komponenten ==============

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    {hint && <div className="text-xs text-muted-foreground mb-3">{hint}</div>}
    {children}
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid sm:grid-cols-2 gap-3">{children}</div>
);

const Field = ({ label, help, full, required, children }: { label: string; help?: string; full?: boolean; required?: boolean; children: React.ReactNode }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <div className="mt-1">{children}</div>
    {help && <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{help}</div>}
  </div>
);

const FieldWithAction = ({ label, help, full, required, action, children }: { label: string; help?: string; full?: boolean; required?: boolean; action: React.ReactNode; children: React.ReactNode }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <div className="flex items-center justify-between gap-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {action}
    </div>
    <div className="mt-1">{children}</div>
    {help && <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{help}</div>}
  </div>
);

const Radio = ({ name, value, onChange, options }: { name: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
  <div className="flex flex-col gap-1.5">
    {options.map((o) => (
      <label key={o.value} className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={(e) => onChange(e.target.value)} className="accent-accent-blue" />
        {o.label}
      </label>
    ))}
  </div>
);

const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
    <option value="">– bitte wählen –</option>
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);

// ============== Summary-Generator ==============

function buildSummary(a: Answers & { persons: Person[]; gfs: Geschaeftsfuehrer[] }): string {
  const lines: string[] = [];
  lines.push(`Notartermin-Vorbereitung – GmbH-Gründung`);
  lines.push(`Stand: ${new Date().toLocaleDateString("de-DE")}`);
  lines.push("=".repeat(60));
  lines.push("");

  lines.push("FIRMA");
  lines.push(`  Firmenname:           ${a.firmenname || "(noch offen)"}`);
  lines.push(`  Sitz:                 ${a.firmensitzStadt || "—"}`);
  lines.push(`  Geschäftsadresse:     ${a.firmensitzAdresse || "—"}`);
  lines.push(`  Unternehmensgegenstand:`);
  lines.push(`  ${(a.gegenstand || "—").split("\n").map((l) => "    " + l).join("\n    ").trim()}`);
  lines.push(`  Geschäftsjahr:        ${a.gjahr === "abweichend" ? `abweichend (Start ${a.gjahrStart || "?"})` : a.gjahr === "kalender" ? "Kalenderjahr" : "—"}`);
  lines.push("");

  lines.push("STAMMKAPITAL");
  lines.push(`  Gesamt:               ${formatEur(a.stammkapital) || "—"}`);
  lines.push(`  Bei Gründung:         ${formatEur(a.einzahlung) || "—"}`);
  lines.push("");

  lines.push(`GESELLSCHAFTER (${a.persons.length})`);
  a.persons.forEach((p, i) => {
    lines.push(`  [${i + 1}] ${[p.vorname, p.nachname].filter(Boolean).join(" ") || "(Name fehlt)"}`);
    lines.push(`      geboren: ${p.geburtsdatum || "—"} in ${p.geburtsort || "—"}`);
    lines.push(`      Adresse: ${p.adresse || "—"}`);
    lines.push(`      Beruf: ${p.beruf || "—"}, Familienstand: ${p.familienstand || "—"}`);
    lines.push(`      Anteil: ${formatEur(p.anteilEur) || "—"} (${p.einlageArt === "sache" ? "Sacheinlage" : "Bareinlage"})`);
    if (p.einlageArt === "sache" && p.sacheinlageBeschreibung) {
      lines.push(`      Sacheinlage: ${p.sacheinlageBeschreibung}`);
    }
  });
  lines.push("");

  lines.push(`GESCHÄFTSFÜHRUNG (${a.gfs.length})`);
  a.gfs.forEach((g, i) => {
    lines.push(`  [${i + 1}] ${g.name || "(Name fehlt)"}`);
    lines.push(`      ${g.istGesellschafter === "ja" ? "Gesellschafter-GF" : g.istGesellschafter === "nein" ? "Fremd-GF" : "—"}`);
    lines.push(`      Vertretung: ${g.vertretung === "einzel" ? "Einzelvertretung" : g.vertretung === "gesamt" ? "Gesamtvertretung" : "—"}`);
    lines.push(`      Befreiung § 181 BGB: ${g.befreiung181 === "ja" ? "Ja" : g.befreiung181 === "nein" ? "Nein" : "—"}`);
  });
  lines.push("");

  if (a.holding === "ja") {
    lines.push("HOLDING");
    lines.push(`  Holding-Name:         ${a.holdingName || "—"}`);
    lines.push(`  Sitz:                 ${a.holdingSitz || "—"}`);
    lines.push(`  HRB:                  ${a.holdingHrb || "—"}`);
    lines.push("");
  }

  const optionals = [
    ["Vorkaufsrecht", a.vorkauf],
    ["Wettbewerbsverbot Gesellschafter", a.wettbewerb],
    ["Beirat / Aufsichtsrat", a.beirat],
    ["Schiedsklausel", a.schieds],
  ].filter(([, v]) => v === "ja");
  if (optionals.length) {
    lines.push("VEREINBARTE OPTIONALE KLAUSELN");
    optionals.forEach(([k]) => lines.push(`  • ${k}`));
    lines.push("");
  }

  lines.push("=".repeat(60));
  lines.push("Bitte um Rückmeldung zu offenen Punkten und Terminvorschlag.");
  return lines.join("\n");
}
