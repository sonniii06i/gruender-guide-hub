import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, ExternalLink, FileText, Info } from "lucide-react";

interface Props {
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
}

const FIELDS: {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
  help?: string;
  col?: 1 | 2;
  /** HTML autocomplete attribute (z.B. "given-name", "street-address") für Browser-Autofill. */
  autoComplete?: string;
  /** HTML name attribute — Browser-Autofill braucht semantische Namen. */
  name?: string;
}[] = [
  // Person — Standard-Autofill verfügbar
  { key: "g_name", name: "family-name", autoComplete: "family-name", label: "Familienname", placeholder: "Mustermann", col: 1 },
  { key: "g_geburtsname", name: "additional-name", autoComplete: "off", label: "Geburtsname (falls abweichend)", placeholder: "", col: 1 },
  { key: "g_vorname", name: "given-name", autoComplete: "given-name", label: "Vorname(n)", placeholder: "Max", col: 1 },
  { key: "g_geburtsdatum", name: "bday", autoComplete: "bday", label: "Geburtsdatum", type: "date", col: 1 },
  { key: "g_geburtsort", name: "birthplace", autoComplete: "off", label: "Geburtsort + Land", placeholder: "Berlin, Deutschland", col: 1 },
  { key: "g_staat", name: "country", autoComplete: "country-name", label: "Staatsangehörigkeit(en)", placeholder: "deutsch", col: 1 },
  { key: "g_geschlecht", name: "sex", autoComplete: "sex", label: "Geschlecht", placeholder: "männlich / weiblich / divers", col: 1 },
  { key: "g_familienstand", name: "marital-status", autoComplete: "off", label: "Familienstand", placeholder: "ledig / verheiratet / …", col: 1 },
  // Wohn-Adresse
  { key: "g_strasse", name: "street-address", autoComplete: "street-address", label: "Wohnanschrift Straße + Nr.", placeholder: "Musterweg 12", col: 2 },
  { key: "g_plz", name: "postal-code", autoComplete: "postal-code", label: "PLZ", placeholder: "10115", col: 1 },
  { key: "g_ort", name: "address-level2", autoComplete: "address-level2", label: "Wohnort", placeholder: "Berlin", col: 1 },
  { key: "g_telefon", name: "tel", autoComplete: "tel", type: "tel", label: "Telefon", placeholder: "+49 30 12345678", col: 1 },
  { key: "g_email", name: "email", autoComplete: "email", type: "email", label: "E-Mail", placeholder: "max@beispiel.de", col: 1 },
  // Betriebs-Adresse — section-business für getrennte Autofill-Speicher (von Chrome unterstützt)
  { key: "g_betr_strasse", name: "biz-street", autoComplete: "section-business street-address", label: "Betriebsanschrift Straße + Nr.", placeholder: "(falls abweichend von Wohnsitz)", col: 2 },
  { key: "g_betr_plz", name: "biz-postal", autoComplete: "section-business postal-code", label: "Betriebs-PLZ", col: 1 },
  { key: "g_betr_ort", name: "biz-city", autoComplete: "section-business address-level2", label: "Betriebs-Ort", col: 1 },
  // Tätigkeit — kein Autofill (frei-text)
  {
    key: "g_taetigkeit",
    name: "biz-activity",
    autoComplete: "off",
    label: "Genaue Tätigkeitsbeschreibung",
    placeholder: "Online-Handel mit Naturkosmetik · Eigenmarken-Produkte · Verkauf via Shopify und Amazon",
    col: 2,
    help: "Sehr wichtig: möglichst konkret beschreiben — Gewerbeamt fragt sonst nach. Mehrere Tätigkeiten? Komma-getrennt auflisten.",
  },
  { key: "g_beginn", name: "biz-start", autoComplete: "off", label: "Tag der Betriebsaufnahme", type: "date", col: 1 },
  { key: "g_anlass", name: "biz-reason", autoComplete: "off", label: "Anlass der Anmeldung", placeholder: "Neugründung / Übernahme / Umzug / Rechtsformwechsel", col: 1 },
  { key: "g_betriebsart", name: "biz-type", autoComplete: "off", label: "Betriebsart", placeholder: "Hauptniederlassung / Zweigstelle / Unselbst. Zweigstelle", col: 1 },
  { key: "g_mitarbeiter", name: "biz-employees", autoComplete: "off", label: "Anzahl Mitarbeiter (geplant)", type: "number", col: 1 },
  { key: "g_handwerk", name: "biz-handicraft", autoComplete: "off", label: "Handwerk? (Eintrag in HWK Pflicht)", placeholder: "ja / nein / Anlage A / B1 / B2", col: 1 },
  { key: "g_genehmigung", name: "biz-permit", autoComplete: "off", label: "Erlaubnispflichtig?", placeholder: "ja (z.B. §34c GewO Makler) / nein", col: 1 },
];

export const GewA1Form = ({ answers, setAnswers }: Props) => {
  const completeness = useMemo(() => {
    const required = ["g_name", "g_vorname", "g_geburtsdatum", "g_geburtsort", "g_staat", "g_strasse", "g_plz", "g_ort", "g_taetigkeit", "g_beginn"];
    const filled = required.filter((k) => answers[k]?.trim()).length;
    return { filled, total: required.length, pct: Math.round((filled / required.length) * 100) };
  }, [answers]);

  const update = (key: string, val: string) => setAnswers({ ...answers, [key]: val });

  const downloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 15;
    const right = 195;
    let y = 18;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Vorbereitung Gewerbeanmeldung (GewA 1)", left, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Erstellt mit GründerX · alle Daten zum Mitbringen / ins Online-Portal kopieren", left, y);
    y += 8;
    doc.setTextColor(0);
    doc.setLineWidth(0.3);
    doc.line(left, y, right, y);
    y += 8;

    const section = (title: string) => {
      if (y > 260) {
        doc.addPage();
        y = 18;
      }
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(title, left, y);
      y += 5;
    };
    const row = (label: string, value: string) => {
      if (y > 270) {
        doc.addPage();
        y = 18;
      }
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(label + ":", left, y);
      doc.setFont("helvetica", "normal");
      const text = value || "—";
      const split = doc.splitTextToSize(text, 110);
      doc.text(split, left + 60, y);
      y += Math.max(5, split.length * 4);
    };

    section("1. Angaben zur Person");
    row("Familienname", answers.g_name || "");
    row("Geburtsname", answers.g_geburtsname || "");
    row("Vorname(n)", answers.g_vorname || "");
    row("Geburtsdatum", answers.g_geburtsdatum || "");
    row("Geburtsort + Land", answers.g_geburtsort || "");
    row("Staatsangehörigkeit", answers.g_staat || "");
    row("Geschlecht", answers.g_geschlecht || "");
    row("Familienstand", answers.g_familienstand || "");
    y += 3;

    section("2. Wohnanschrift");
    row("Straße + Nr.", answers.g_strasse || "");
    row("PLZ + Ort", `${answers.g_plz || ""} ${answers.g_ort || ""}`.trim());
    row("Telefon", answers.g_telefon || "");
    row("E-Mail", answers.g_email || "");
    y += 3;

    section("3. Betriebsanschrift");
    row("Straße + Nr.", answers.g_betr_strasse || "(wie Wohnanschrift)");
    row("PLZ + Ort", `${answers.g_betr_plz || ""} ${answers.g_betr_ort || ""}`.trim() || "(wie Wohnanschrift)");
    y += 3;

    section("4. Tätigkeit");
    row("Genaue Tätigkeit", answers.g_taetigkeit || "");
    row("Beginn", answers.g_beginn || "");
    row("Anlass", answers.g_anlass || "Neugründung");
    row("Betriebsart", answers.g_betriebsart || "Hauptniederlassung");
    row("Mitarbeiter", answers.g_mitarbeiter || "0");
    y += 3;

    section("5. Spezial");
    row("Handwerk?", answers.g_handwerk || "nein");
    row("Erlaubnispflichtig?", answers.g_genehmigung || "nein");
    y += 5;

    // Mitbringen-Box
    if (y > 220) {
      doc.addPage();
      y = 18;
    }
    doc.setFillColor(245, 250, 255);
    doc.rect(left, y, right - left, 50, "F");
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Mitbringen zum Gewerbeamt:", left + 3, y);
    y += 5;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    [
      "• Personalausweis oder Reisepass (Original)",
      "• Bei Nicht-EU: Aufenthaltstitel mit Erwerbserlaubnis",
      "• Bei reglementierten Tätigkeiten: zusätzliche Erlaubnis (z.B. §34c GewO)",
      "• Bei Handwerk: ggf. Eintragung in Handwerksrolle",
      "• 20–60 € Gebühr (Bar / EC-Karte)",
      "• Bei minderjährigen Gründern (U18): Familiengericht-Genehmigung (separater PDF-Antrag)",
    ].forEach((t) => {
      doc.text(t, left + 3, y);
      y += 4;
    });

    y += 8;
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Disclaimer: Vorbereitungs-Dokument. Die offizielle Anmeldung erfolgt über das Gewerbeamt deiner Stadt (online oder vor Ort). " +
        "Tipp: viele Bundesländer erlauben Online-Gewerbeanmeldung über service.berlin.de, hamburg.de, muenchen.de etc. — dort die hier erfassten Daten kopieren.",
      left,
      y,
      { maxWidth: right - left },
    );

    doc.save(`gewa1-vorbereitung-${(answers.g_name || "anmeldung").toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">So funktioniert's:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Trage deine Daten unten ein (kannst du jederzeit zurückkommen, wird gespeichert).</li>
              <li>"Vorbereitungs-PDF erstellen" → strukturiertes PDF mit allen Daten + Mitbring-Liste.</li>
              <li>
                Beim Online-Portal deiner Stadt einfach Daten kopieren — oder Print &amp; mitnehmen zum Gewerbeamt.
              </li>
              <li>
                Das offizielle GewA1-Formular der Stadt findest du in Step "Gewerbeamt-Termin". Dieses Tool ersetzt die
                Datensammlung, nicht die offizielle Anmeldung.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form
        autoComplete="on"
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-3"
      >
        {FIELDS.map((f) => (
          <div key={f.key} className={f.col === 2 ? "sm:col-span-2" : ""}>
            <Label htmlFor={`gewa-${f.key}`} className="text-xs uppercase tracking-wider text-muted-foreground">
              {f.label}
            </Label>
            <Input
              id={`gewa-${f.key}`}
              name={f.name ?? f.key}
              autoComplete={f.autoComplete ?? "off"}
              type={f.type ?? "text"}
              value={answers[f.key] ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="mt-1"
            />
            {f.help && <div className="text-[10px] text-muted-foreground mt-1 leading-snug">{f.help}</div>}
          </div>
        ))}
      </form>

      <div className="flex items-center justify-between gap-3 flex-wrap rounded-xl bg-secondary/40 p-4">
        <div>
          <div className="text-sm font-semibold">
            {completeness.filled} / {completeness.total} Pflichtfelder · {completeness.pct} %
          </div>
          <div className="text-xs text-muted-foreground">PDF kannst du auch unvollständig erstellen.</div>
        </div>
        <div className="flex gap-2">
          <a
            href="https://www.bmwk.de/Redaktion/DE/Artikel/Existenzgruendung/gewerbeanmeldung.html"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary"
          >
            <FileText className="h-3.5 w-3.5" /> Offizielles GewA1 (BMWK) <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Vorbereitungs-PDF erstellen
          </button>
        </div>
      </div>
    </div>
  );
};
