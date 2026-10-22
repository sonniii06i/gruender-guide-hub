// Download-Formate der Vorlagen: PDF (jsPDF, wie die Gratis-Tools), Word
// (.docx über das Paket `docx`, erst beim Klick geladen — es ist groß und
// die meisten laden nur ein Format) und reiner Text.

import { downloadDocumentPdf } from "@/lib/freetools/pdf";

const istUeberschrift = (zeile: string): boolean => {
  const t = zeile.trim();
  if (!t || t.length > 90) return false;
  if (/^§\s*\d/.test(t)) return true;
  if (/^(Anlage|Artikel|Art\.)\s*\d/i.test(t)) return true;
  if (/^\d+\.\s/.test(t) && t.length <= 70 && !/[.;,]$/.test(t)) return true;
  return false;
};

const dateiSpeichern = (blob: Blob, dateiname: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dateiname;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export function vorlageAlsPdf(text: string, dateiname: string): void {
  // downloadDocumentPdf hängt ".pdf" selbst an.
  downloadDocumentPdf(text, dateiname);
}

export function vorlageAlsText(text: string, dateiname: string): void {
  dateiSpeichern(new Blob([text.replace(/\r?\n/g, "\r\n")], { type: "text/plain;charset=utf-8" }), `${dateiname}.txt`);
}

export async function vorlageAlsWord(text: string, dateiname: string): Promise<void> {
  const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } = await import("docx");
  const zeilen = text.replace(/\r/g, "").split("\n");
  const absaetze: InstanceType<typeof Paragraph>[] = [];
  let titelGesetzt = false;

  for (const zeile of zeilen) {
    const t = zeile.trimEnd();
    if (!titelGesetzt) {
      if (!t.trim()) continue;
      absaetze.push(new Paragraph({ text: t.trim(), heading: HeadingLevel.TITLE, alignment: AlignmentType.LEFT, spacing: { after: 240 } }));
      titelGesetzt = true;
      continue;
    }
    if (!t.trim()) {
      absaetze.push(new Paragraph({ text: "", spacing: { after: 60 } }));
      continue;
    }
    if (istUeberschrift(t)) {
      absaetze.push(new Paragraph({ text: t.trim(), heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 } }));
      continue;
    }
    // Unterschriftslinien bleiben Monospace-ähnlich erhalten; sonst Fließtext.
    const einzug = t.match(/^(\s+)/)?.[1].length ?? 0;
    absaetze.push(
      new Paragraph({
        children: [new TextRun({ text: t.trim(), size: 22 })],
        spacing: { after: 80, line: 300 },
        indent: einzug ? { left: Math.min(einzug, 8) * 180 } : undefined,
      }),
    );
  }

  absaetze.push(
    new Paragraph({
      children: [new TextRun({ text: "Erstellt mit GründerX · gruenderx.de/vorlagen", size: 16, color: "8C96A5" })],
      spacing: { before: 400 },
    }),
  );

  const doc = new Document({
    creator: "GründerX",
    title: dateiname.replace(/-/g, " "),
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", run: { size: 36, bold: true, color: "0C2A6E" } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, color: "141B26" } },
      ],
    },
    sections: [{ properties: { page: { margin: { top: 1134, bottom: 1134, left: 1247, right: 1134 } } }, children: absaetze }],
  });
  const blob = await Packer.toBlob(doc);
  dateiSpeichern(blob, `${dateiname}.docx`);
}

export async function vorlageKopieren(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
