import jsPDF from "jspdf";
import { FOLIEN, punkte, type PitchDeck } from "./pitchDeck";

// 16:9-Folien (254 × 142,9 mm), Standardschrift Helvetica (WinAnsi):
// Zeichen außerhalb davon (Emojis, typografisches Minus) werden ersetzt.
const W = 254;
const H = 142.875;
const DUNKEL: [number, number, number] = [15, 23, 42];
const AKZENT: [number, number, number] = [37, 99, 235];

const sauber = (s: string) =>
  s
    .replace(/[−–—]/g, "-")
    .replace(/[“”„]/g, '"')
    .replace(/[‘’‚]/g, "'")
    .replace(/[^\u0000-ÿ€]/g, "");

export function bauePitchPdf(d: PitchDeck): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: [W, H], orientation: "landscape" });
  const folien = FOLIEN.filter((f) => f.id === "titel" || (d.folien[f.id] ?? "").trim());
  folien.forEach((f, i) => {
    if (i > 0) doc.addPage([W, H], "landscape");
    if (f.id === "titel") {
      doc.setFillColor(...DUNKEL);
      doc.rect(0, 0, W, H, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(34);
      doc.text(sauber(d.name || "Unser Vorhaben"), 20, 62);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(15);
      doc.text(doc.splitTextToSize(sauber(d.folien.titel || ""), W - 40), 20, 76);
      doc.setFontSize(10);
      doc.setTextColor(180, 190, 210);
      if (d.kontakt) doc.text(sauber(d.kontakt), 20, H - 16);
      return;
    }
    doc.setFillColor(...AKZENT);
    doc.rect(0, 0, 6, H, "F");
    doc.setTextColor(...DUNKEL);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(sauber(f.titel), 20, 26);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    let y = 44;
    for (const p of punkte(d.folien[f.id])) {
      const zeilen = doc.splitTextToSize(sauber(p), W - 52);
      doc.setFillColor(...AKZENT);
      doc.circle(23, y - 1.6, 1.2, "F");
      doc.text(zeilen, 28, y);
      y += zeilen.length * 7 + 5;
      if (y > H - 14) break;
    }
    doc.setFontSize(8);
    doc.setTextColor(140, 150, 165);
    doc.text(`${sauber(d.name)}  ·  ${i + 1}/${folien.length}`, W - 14, H - 8, { align: "right" });
  });
  return doc;
}
