import jsPDF from "jspdf";

// Rendert einen reinen Dokument-Text (wie von den Tool-Configs erzeugt) als
// sauberes A4-PDF – nur der Text, keine Seiten-/UI-Elemente.

function isHeading(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 90) return false;
  if (/^§\s*\d/.test(t)) return true;
  if (/^\d+\.\s/.test(t)) return true;
  if (t.endsWith(":") && t.length <= 60) return true;
  const known = ["Executive Summary", "Zusammenfassung", "Empfehlung", "Fazit"];
  return known.includes(t);
}

export function downloadDocumentPdf(text: string, filename: string): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 56;
  const usableWidth = pageWidth - margin * 2;
  const footerY = pageHeight - 30;
  let cursorY = margin;

  const ensureSpace = (h: number) => {
    if (cursorY + h <= footerY - 12) return;
    doc.addPage();
    cursorY = margin;
  };

  const rawLines = text.replace(/\r/g, "").split("\n");
  let started = false;
  let prevBlank = false;

  for (const line of rawLines) {
    const trimmed = line.trim();

    if (!started) {
      if (!trimmed) continue;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.setTextColor(20, 27, 38);
      const tl = doc.splitTextToSize(trimmed, usableWidth);
      doc.text(tl, margin, cursorY);
      cursorY += tl.length * 21 + 8;
      doc.setDrawColor(210, 216, 224);
      doc.line(margin, cursorY, pageWidth - margin, cursorY);
      cursorY += 18;
      started = true;
      prevBlank = false;
      continue;
    }

    if (!trimmed) {
      if (!prevBlank) cursorY += 9;
      prevBlank = true;
      continue;
    }
    prevBlank = false;

    const heading = isHeading(trimmed);
    doc.setFont("helvetica", heading ? "bold" : "normal");
    doc.setFontSize(heading ? 11.5 : 10);
    doc.setTextColor(heading ? 22 : 45, heading ? 29 : 50, heading ? 40 : 62);
    const lines = doc.splitTextToSize(trimmed, usableWidth);
    ensureSpace(lines.length * 13 + (heading ? 10 : 4));
    if (heading) cursorY += 5;
    doc.text(lines, margin, cursorY);
    cursorY += lines.length * 13 + (heading ? 6 : 3);
  }

  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(229, 233, 239);
    doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 165);
    doc.text("Erstellt mit GründerX · gruenderx.de", margin, footerY);
    doc.text(`Seite ${p} von ${pageCount}`, pageWidth - margin, footerY, { align: "right" });
  }

  doc.save(`${filename}.pdf`);
}
