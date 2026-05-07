import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Download, ExternalLink, Info } from "lucide-react";

interface Props {
  answers: Record<string, string>;
  setAnswers: (a: Record<string, string>) => void;
}

export const FamiliengerichtForm = ({ answers, setAnswers }: Props) => {
  const update = (key: string, val: string) => setAnswers({ ...answers, [key]: val });

  const downloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 20;
    const right = 190;
    let y = 20;

    const writeBlock = (text: string, opts?: { bold?: boolean; size?: number; spaceAfter?: number }) => {
      doc.setFontSize(opts?.size ?? 10);
      doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, right - left);
      lines.forEach((line: string) => {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, left, y);
        y += (opts?.size ?? 10) * 0.45 + 1;
      });
      y += opts?.spaceAfter ?? 2;
    };

    // Header
    writeBlock(
      `${answers.fg_eltern_name || "[Name Eltern]"}\n${answers.fg_eltern_strasse || "[Straße]"}\n${answers.fg_eltern_plz_ort || "[PLZ Ort]"}`,
      { size: 10 },
    );
    y += 4;
    writeBlock(`An das Familiengericht\nbeim Amtsgericht ${answers.fg_amtsgericht || "[zuständiger Wohnsitz-AG]"}`, { size: 10 });
    y += 4;
    writeBlock(`Ort, Datum: ${answers.fg_eltern_plz_ort?.split(" ").pop() || "[Ort]"}, ${new Date().toLocaleDateString("de-DE")}`, { size: 10 });
    y += 6;

    // Betreff
    writeBlock(
      "Antrag auf familiengerichtliche Genehmigung des selbständigen Betriebs eines Erwerbsgeschäftes durch das minderjährige Kind",
      { bold: true, size: 11, spaceAfter: 4 },
    );
    writeBlock(
      `(§§ 1643 Abs. 1, 112 BGB i.V.m. §§ 1822 Nr. 3, 5, 8, 11 BGB a.F. bzw. § 1852 BGB n.F.)`,
      { size: 9, spaceAfter: 6 },
    );

    // Anrede + Antrag
    writeBlock("Sehr geehrte Damen und Herren,", { spaceAfter: 4 });
    writeBlock(
      `wir, die unterzeichnenden gesetzlichen Vertreter (Eltern), beantragen hiermit die familiengerichtliche Genehmigung gemäß § 112 BGB für den selbständigen Betrieb eines Erwerbsgeschäftes durch unser minderjähriges Kind.`,
      { spaceAfter: 6 },
    );

    // Daten Kind
    writeBlock("1. Angaben zum minderjährigen Kind", { bold: true, size: 11, spaceAfter: 3 });
    writeBlock(`Vor- und Nachname: ${answers.fg_kind_name || "[…]"}`);
    writeBlock(`Geburtsdatum: ${answers.fg_kind_geburtsdatum || "[…]"}`);
    writeBlock(`Geburtsort: ${answers.fg_kind_geburtsort || "[…]"}`);
    writeBlock(`Wohnanschrift: ${answers.fg_kind_adresse || "[wie Eltern]"}`, { spaceAfter: 4 });

    // Angaben Eltern
    writeBlock("2. Angaben zu den gesetzlichen Vertretern", { bold: true, size: 11, spaceAfter: 3 });
    writeBlock(`Mutter: ${answers.fg_mutter_name || "[Name + Geburtsdatum + ggf. Geburtsname]"}`);
    writeBlock(`Vater: ${answers.fg_vater_name || "[Name + Geburtsdatum + ggf. Geburtsname]"}`);
    writeBlock(`Anschrift: ${answers.fg_eltern_strasse || "[…]"}, ${answers.fg_eltern_plz_ort || "[…]"}`);
    writeBlock(
      `Sorgerecht: ${answers.fg_sorgerecht || "Beide Eltern gemeinsam"}`,
      { spaceAfter: 4 },
    );

    // Geplantes Geschäft
    writeBlock("3. Geplantes Erwerbsgeschäft", { bold: true, size: 11, spaceAfter: 3 });
    writeBlock(`Tätigkeit: ${answers.fg_taetigkeit || "[genaue Beschreibung der Tätigkeit]"}`, { spaceAfter: 2 });
    writeBlock(`Geplanter Beginn: ${answers.fg_beginn || "[Datum]"}`);
    writeBlock(`Voraussichtlicher Jahresumsatz: ${answers.fg_umsatz || "[geschätzt EUR]"}`);
    writeBlock(`Geplanter Standort: ${answers.fg_standort || "[Wohnanschrift / separates Büro]"}`, { spaceAfter: 2 });
    writeBlock(`Risiko-Einschätzung: ${answers.fg_risiko || "[z.B. Geringes Risiko – keine Lager-/Personal-Verbindlichkeiten, max. monatlicher Verlust auf eigenes Taschengeld begrenzt]"}`, {
      spaceAfter: 6,
    });

    // Begründung
    writeBlock("4. Begründung", { bold: true, size: 11, spaceAfter: 3 });
    writeBlock(
      answers.fg_begruendung ||
        "Das Kind hat bereits in den vergangenen Monaten erfolgreiche praktische Erfahrungen in der geplanten Tätigkeit gesammelt (siehe Anlage). Die geplante Tätigkeit ist altersgerecht durchführbar, mit dem Schulbesuch vereinbar und dient dem Aufbau wirtschaftlicher Selbstständigkeit. Die Eltern unterstützen das Vorhaben aktiv und übernehmen Mitbürgschaft für eventuelle Verbindlichkeiten. Eine Gefährdung des Kindeswohls ist nicht erkennbar.",
      { spaceAfter: 4 },
    );

    // Verzicht
    writeBlock("5. Erklärung", { bold: true, size: 11, spaceAfter: 3 });
    writeBlock(
      "Wir versichern, dass alle Angaben wahrheitsgemäß sind. Wir nehmen zur Kenntnis, dass die Genehmigung das Kind im Umfang des Erwerbsgeschäfts geschäftsfähig macht (§ 112 BGB), Rechtsgeschäfte außerhalb dieses Bereichs jedoch weiterhin der Zustimmung der Eltern bedürfen.",
      { spaceAfter: 8 },
    );

    // Unterschrift
    writeBlock("Mit freundlichen Grüßen", { spaceAfter: 12 });
    writeBlock("________________________________   ________________________________");
    writeBlock(`${answers.fg_mutter_name || "Mutter"}                    ${answers.fg_vater_name || "Vater"}`, { size: 9, spaceAfter: 4 });

    // Anlagen
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    writeBlock("Anlagen:", { bold: true, size: 10, spaceAfter: 2 });
    [
      "□ Geburtsurkunde des Kindes",
      "□ Personalausweise / Pässe der Eltern (Kopie)",
      "□ ggf. Sorgerechtsbeschluss",
      "□ Tätigkeitsbeschreibung mit Risikoanalyse (separates Dokument empfohlen)",
      "□ Schulzeugnis (zur Bestätigung dass Schulbesuch nicht gefährdet)",
      "□ ggf. Einverständniserklärung der Schule",
    ].forEach((t) => writeBlock(t, { size: 9 }));

    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Disclaimer: Mustervorlage. Konkrete Formulierungen / Anforderungen variieren je Familiengericht. Im Zweifel mit einem Fachanwalt für Familienrecht klären — der Antrag entscheidet über die Geschäftsfähigkeit deines Kindes im Erwerbsbereich.",
      left,
      y,
      { maxWidth: right - left },
    );

    doc.save(`familiengericht-antrag-${(answers.fg_kind_name || "kind").toLowerCase().replace(/[^a-z0-9]/g, "-")}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Rechtlicher Rahmen:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong>§ 112 BGB:</strong> Familiengericht kann Minderjährigen für selbständigen Betrieb eines
                Erwerbsgeschäfts ermächtigen → Kind ist im Geschäftsbereich beschränkt geschäftsfähig.
              </li>
              <li>
                <strong>§§ 1643, 1822 Nr. 3 BGB</strong> (alt) bzw. <strong>§ 1852 BGB</strong> (nF):
                gerichtliche Genehmigung der Eltern-Entscheidung erforderlich.
              </li>
              <li>
                <strong>Pflicht-Vorlage beim Gewerbeamt:</strong> ohne diese Genehmigung verweigert das
                Gewerbeamt die Anmeldung.
              </li>
              <li>
                Zuständig: Familiengericht beim <strong>Amtsgericht des Wohnsitzes</strong> des Kindes (nicht der
                Eltern, falls abweichend).
              </li>
              <li>
                Kosten: <strong>0 € (kostenlos)</strong> · Bearbeitungszeit 4–12 Wochen für Termin + Beschluss zur Vollgeschäftsfähigkeit (§112 BGB).
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Was du brauchst:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Geburtsurkunde des Kindes (Original oder beglaubigte Kopie)</li>
              <li>Personalausweise / Pässe beider Eltern</li>
              <li>Bei Alleinsorge: Sorgerechtsbeschluss</li>
              <li>Tätigkeitsbeschreibung mit Risikoanalyse</li>
              <li>Schulzeugnis (zeigt: Schulbesuch nicht gefährdet)</li>
              <li>Ggf. Einverständniserklärung der Schule</li>
              <li>0 € — das Verfahren ist kostenlos (du bezahlst nur Zeit, keine Gerichtsgebühr)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Zuständiges Familiengericht (Amtsgericht des Kind-Wohnsitzes)
          </Label>
          <Input
            value={answers.fg_amtsgericht ?? ""}
            onChange={(e) => update("fg_amtsgericht", e.target.value)}
            placeholder="z.B. München oder Berlin-Tempelhof-Kreuzberg"
            className="mt-1"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            Suche unter{" "}
            <a
              href="https://www.justiz.de/gerichte_und_behoerden/index.php"
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent-blue inline-flex items-center gap-0.5 hover:underline"
            >
              justiz.de Gerichts-Verzeichnis <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vor- + Nachname Kind</Label>
          <Input value={answers.fg_kind_name ?? ""} onChange={(e) => update("fg_kind_name", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geburtsdatum Kind</Label>
          <Input type="date" value={answers.fg_kind_geburtsdatum ?? ""} onChange={(e) => update("fg_kind_geburtsdatum", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geburtsort Kind</Label>
          <Input value={answers.fg_kind_geburtsort ?? ""} onChange={(e) => update("fg_kind_geburtsort", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Wohnanschrift Kind (falls abweichend)</Label>
          <Input value={answers.fg_kind_adresse ?? ""} onChange={(e) => update("fg_kind_adresse", e.target.value)} className="mt-1" placeholder="(wie Eltern)" />
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Mutter (Name + Geburtsdatum)</Label>
          <Input value={answers.fg_mutter_name ?? ""} onChange={(e) => update("fg_mutter_name", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vater (Name + Geburtsdatum)</Label>
          <Input value={answers.fg_vater_name ?? ""} onChange={(e) => update("fg_vater_name", e.target.value)} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Anschrift Eltern</Label>
          <Input value={answers.fg_eltern_strasse ?? ""} onChange={(e) => update("fg_eltern_strasse", e.target.value)} className="mt-1" placeholder="Straße + Nr." />
        </div>
        <div className="sm:col-span-2">
          <Input value={answers.fg_eltern_plz_ort ?? ""} onChange={(e) => update("fg_eltern_plz_ort", e.target.value)} placeholder="PLZ Ort" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sorgerecht</Label>
          <Input value={answers.fg_sorgerecht ?? ""} onChange={(e) => update("fg_sorgerecht", e.target.value)} placeholder="Beide gemeinsam / Mutter allein / …" className="mt-1" />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Genaue Tätigkeit</Label>
          <Textarea
            value={answers.fg_taetigkeit ?? ""}
            onChange={(e) => update("fg_taetigkeit", e.target.value)}
            placeholder="z.B. Online-Verkauf von selbst hergestellten Schmuck-Produkten via Etsy und eigenem Shopify-Shop. Keine Mitarbeiter, kein physisches Lager."
            className="mt-1 min-h-[70px]"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geplanter Beginn</Label>
          <Input type="date" value={answers.fg_beginn ?? ""} onChange={(e) => update("fg_beginn", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Voraussichtlicher Jahresumsatz</Label>
          <Input value={answers.fg_umsatz ?? ""} onChange={(e) => update("fg_umsatz", e.target.value)} placeholder="z.B. bis 5.000 €/Jahr" className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Standort</Label>
          <Input value={answers.fg_standort ?? ""} onChange={(e) => update("fg_standort", e.target.value)} placeholder="Wohnanschrift / separates Büro / Coworking" className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Risiko-Einschätzung</Label>
          <Textarea
            value={answers.fg_risiko ?? ""}
            onChange={(e) => update("fg_risiko", e.target.value)}
            placeholder="Geringes Risiko – keine Lager- oder Personal-Verbindlichkeiten, kein Wareneinkauf > 500 € ohne Eltern-Freigabe, max. monatlicher Verlust auf Taschengeld begrenzt."
            className="mt-1 min-h-[70px]"
          />
          <div className="text-[10px] text-muted-foreground mt-1">
            Sehr wichtig — das Familiengericht prüft besonders, ob Verlust-Risiken für das Kind angemessen begrenzt
            sind.
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Begründung (optional, Standard-Text reicht)</Label>
          <Textarea
            value={answers.fg_begruendung ?? ""}
            onChange={(e) => update("fg_begruendung", e.target.value)}
            placeholder="Leer lassen für Standard-Begründung mit Schulvereinbarkeit + Eltern-Mitbürgschaft."
            className="mt-1 min-h-[70px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <a
          href="https://www.justiz.de/gerichte_und_behoerden/index.php"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary"
        >
          Familiengericht finden <ExternalLink className="h-3 w-3" />
        </a>
        <button
          onClick={downloadPDF}
          className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"
        >
          <Download className="h-3.5 w-3.5" /> Antrag-PDF generieren
        </button>
      </div>
    </div>
  );
};
