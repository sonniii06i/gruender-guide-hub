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

    // Header — Eltern aus Mutter + Vater zusammensetzen
    const elternNamen = [answers.fg_mutter_name, answers.fg_vater_name].filter(Boolean).join(" · ");
    writeBlock(
      `${elternNamen || "[Name Eltern]"}\n${answers.fg_eltern_strasse || "[Straße]"}\n${answers.fg_eltern_plz_ort || "[PLZ Ort]"}`,
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

    // Unterschrift — manuelle 2-Spalten-Positionierung statt Spaces
    writeBlock("Mit freundlichen Grüßen", { spaceAfter: 14 });
    if (y > 268) {
      doc.addPage();
      y = 20;
    }
    const colMid = (left + right) / 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("________________________________", left, y);
    doc.text("________________________________", colMid + 5, y);
    y += 5;
    doc.setFontSize(9);
    doc.text(answers.fg_mutter_name || "Unterschrift Mutter / Sorgeberechtigte", left, y);
    doc.text(answers.fg_vater_name || "Unterschrift Vater / Sorgeberechtigter", colMid + 5, y);
    y += 8;

    // Anlagen
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    writeBlock("Anlagen / Mitbringen:", { bold: true, size: 10, spaceAfter: 2 });
    // ASCII-Bullet statt □ — das Unicode-Quadrat-Zeichen ist im Helvetica-Standard-Font nicht enthalten
    // und rendert sonst als Garbage. "[ ]" sieht aus wie Checkbox.
    [
      "[ ] Personalausweis des Kindes (Original)",
      "[ ] Personalausweise / Pässe beider Eltern bzw. Sorgeberechtigten",
      "[ ] Schriftliche Erlaubnis / Zustimmung der Sorgeberechtigten (Eltern) zum Erwerbsgeschäft",
      "[ ] Schriftliche Erlaubnis der Schule / Klassenlehrer (bestätigt: Schulbesuch nicht gefährdet)",
      "[ ] Business-Plan / Tätigkeitsbeschreibung mit Risikoanalyse",
      "[ ] ggf. Geburtsurkunde des Kindes",
      "[ ] ggf. Sorgerechtsbeschluss bei Alleinsorge",
    ].forEach((t) => writeBlock(t, { size: 9 }));

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
            <div className="font-semibold mb-1">Was du mitbringen / vorlegen musst:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li><strong>Personalausweis des Kindes</strong> (Original)</li>
              <li><strong>Personalausweise / Pässe beider Eltern</strong> bzw. Sorgeberechtigten</li>
              <li><strong>Schriftliche Erlaubnis der Sorgeberechtigten</strong> (Eltern-Zustimmung zum Erwerbsgeschäft — wird beim Antrag mit-unterschrieben)</li>
              <li><strong>Schriftliche Erlaubnis der Schule / Klassenlehrer</strong> (bestätigt: Schulbesuch nicht gefährdet, Tätigkeit altersgerecht)</li>
              <li><strong>Business-Plan / Tätigkeitsbeschreibung</strong> mit Risikoanalyse</li>
              <li>ggf. Geburtsurkunde des Kindes</li>
              <li>ggf. Sorgerechtsbeschluss bei Alleinsorge</li>
              <li><strong>0 €</strong> — das Verfahren selbst ist kostenlos (du bezahlst nur Zeit, keine Gerichtsgebühr)</li>
            </ul>
          </div>
        </div>
      </div>

      <form
        autoComplete="on"
        onSubmit={(e) => e.preventDefault()}
        className="grid sm:grid-cols-2 gap-3"
      >
        <div className="sm:col-span-2">
          <Label htmlFor="fg-amtsgericht" className="text-xs uppercase tracking-wider text-muted-foreground">
            Zuständiges Familiengericht (Amtsgericht des Kind-Wohnsitzes)
          </Label>
          <Input
            id="fg-amtsgericht"
            name="court-name"
            autoComplete="off"
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

        {/* Kind-Daten: section-child damit Browser nicht User-Daten reinfüllt */}
        <div>
          <Label htmlFor="fg-kind-name" className="text-xs uppercase tracking-wider text-muted-foreground">Vor- + Nachname Kind</Label>
          <Input id="fg-kind-name" name="child-name" autoComplete="section-child name" value={answers.fg_kind_name ?? ""} onChange={(e) => update("fg_kind_name", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-kind-bday" className="text-xs uppercase tracking-wider text-muted-foreground">Geburtsdatum Kind</Label>
          <Input id="fg-kind-bday" name="child-bday" autoComplete="section-child bday" type="date" value={answers.fg_kind_geburtsdatum ?? ""} onChange={(e) => update("fg_kind_geburtsdatum", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-kind-birthplace" className="text-xs uppercase tracking-wider text-muted-foreground">Geburtsort Kind</Label>
          <Input id="fg-kind-birthplace" name="child-birthplace" autoComplete="off" value={answers.fg_kind_geburtsort ?? ""} onChange={(e) => update("fg_kind_geburtsort", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-kind-address" className="text-xs uppercase tracking-wider text-muted-foreground">Wohnanschrift Kind (falls abweichend)</Label>
          <Input id="fg-kind-address" name="child-address" autoComplete="section-child street-address" value={answers.fg_kind_adresse ?? ""} onChange={(e) => update("fg_kind_adresse", e.target.value)} className="mt-1" placeholder="(wie Eltern)" />
        </div>

        {/* Eltern-Daten: standard Autofill (das ist meist der User selbst bzw. dessen Partner) */}
        <div>
          <Label htmlFor="fg-mutter" className="text-xs uppercase tracking-wider text-muted-foreground">Mutter (Name + Geburtsdatum)</Label>
          <Input id="fg-mutter" name="mother-name" autoComplete="off" value={answers.fg_mutter_name ?? ""} onChange={(e) => update("fg_mutter_name", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-vater" className="text-xs uppercase tracking-wider text-muted-foreground">Vater (Name + Geburtsdatum)</Label>
          <Input id="fg-vater" name="father-name" autoComplete="off" value={answers.fg_vater_name ?? ""} onChange={(e) => update("fg_vater_name", e.target.value)} className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="fg-eltern-strasse" className="text-xs uppercase tracking-wider text-muted-foreground">Anschrift Eltern</Label>
          <Input id="fg-eltern-strasse" name="street-address" autoComplete="street-address" value={answers.fg_eltern_strasse ?? ""} onChange={(e) => update("fg_eltern_strasse", e.target.value)} className="mt-1" placeholder="Straße + Nr." />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="fg-eltern-plz-ort" className="text-xs uppercase tracking-wider text-muted-foreground">PLZ + Ort Eltern</Label>
          <Input id="fg-eltern-plz-ort" name="address-line2" autoComplete="address-line2" value={answers.fg_eltern_plz_ort ?? ""} onChange={(e) => update("fg_eltern_plz_ort", e.target.value)} placeholder="PLZ Ort" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-sorgerecht" className="text-xs uppercase tracking-wider text-muted-foreground">Sorgerecht</Label>
          <Input id="fg-sorgerecht" name="custody" autoComplete="off" value={answers.fg_sorgerecht ?? ""} onChange={(e) => update("fg_sorgerecht", e.target.value)} placeholder="Beide gemeinsam / Mutter allein / …" className="mt-1" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="fg-taetigkeit" className="text-xs uppercase tracking-wider text-muted-foreground">Genaue Tätigkeit</Label>
          <Textarea
            id="fg-taetigkeit"
            name="biz-activity"
            autoComplete="off"
            value={answers.fg_taetigkeit ?? ""}
            onChange={(e) => update("fg_taetigkeit", e.target.value)}
            placeholder="z.B. Online-Verkauf von selbst hergestellten Schmuck-Produkten via Etsy und eigenem Shopify-Shop. Keine Mitarbeiter, kein physisches Lager."
            className="mt-1 min-h-[70px]"
          />
        </div>
        <div>
          <Label htmlFor="fg-beginn" className="text-xs uppercase tracking-wider text-muted-foreground">Geplanter Beginn</Label>
          <Input id="fg-beginn" name="biz-start" autoComplete="off" type="date" value={answers.fg_beginn ?? ""} onChange={(e) => update("fg_beginn", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fg-umsatz" className="text-xs uppercase tracking-wider text-muted-foreground">Voraussichtlicher Jahresumsatz</Label>
          <Input id="fg-umsatz" name="revenue" autoComplete="off" value={answers.fg_umsatz ?? ""} onChange={(e) => update("fg_umsatz", e.target.value)} placeholder="z.B. bis 5.000 €/Jahr" className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="fg-standort" className="text-xs uppercase tracking-wider text-muted-foreground">Standort</Label>
          <Input id="fg-standort" name="biz-location" autoComplete="off" value={answers.fg_standort ?? ""} onChange={(e) => update("fg_standort", e.target.value)} placeholder="Wohnanschrift / separates Büro / Coworking" className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="fg-risiko" className="text-xs uppercase tracking-wider text-muted-foreground">Risiko-Einschätzung</Label>
          <Textarea
            id="fg-risiko"
            name="risk-assessment"
            autoComplete="off"
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
          <Label htmlFor="fg-begruendung" className="text-xs uppercase tracking-wider text-muted-foreground">Begründung (optional, Standard-Text reicht)</Label>
          <Textarea
            id="fg-begruendung"
            name="reasoning"
            autoComplete="off"
            value={answers.fg_begruendung ?? ""}
            onChange={(e) => update("fg_begruendung", e.target.value)}
            placeholder="Leer lassen für Standard-Begründung mit Schulvereinbarkeit + Eltern-Mitbürgschaft."
            className="mt-1 min-h-[70px]"
          />
        </div>
      </form>

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
