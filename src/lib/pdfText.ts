// Text-Teile und eingebettete Dateien eines PDFs mit pdf.js – im Browser, ohne Upload.
// pdf.js wird erst beim ersten PDF geladen (eigener Chunk), nicht mit der Seite.

import type { PdfTextTeil } from "@/lib/pdfRechnungLesen";

export type PdfInhalt = {
  teile: PdfTextTeil[];
  seitenBreite: number;
  seiten: number;
  anhaenge: { name: string; inhalt: Uint8Array }[];
};

type PdfjsModul = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

/** Kern ohne Lade-Logik; die Tests rufen ihn in Node mit dem Legacy-Build auf. */
export async function pdfInhaltMit(pdfjs: PdfjsModul, daten: Uint8Array, maxSeiten = 20): Promise<PdfInhalt> {
  const doc = await pdfjs.getDocument({ data: daten, isEvalSupported: false, useSystemFonts: false }).promise;
  try {
    const anhaenge: PdfInhalt["anhaenge"] = [];
    const roh = (await doc.getAttachments()) as Record<string, { filename?: string; content?: Uint8Array }> | null;
    for (const [schluessel, a] of Object.entries(roh ?? {})) if (a?.content) anhaenge.push({ name: a.filename || schluessel, inhalt: a.content });
    const teile: PdfTextTeil[] = [];
    let seitenBreite = 0;
    const n = Math.min(doc.numPages, maxSeiten);
    for (let s = 1; s <= n; s++) {
      const seite = await doc.getPage(s);
      seitenBreite = Math.max(seitenBreite, seite.getViewport({ scale: 1 }).width);
      const inhalt = await seite.getTextContent();
      for (const it of inhalt.items) {
        if (!("str" in it) || !it.str) continue;
        const [, , , d, e, f] = it.transform as number[];
        teile.push({ str: it.str, x: e, y: f, breite: it.width, hoehe: it.height || Math.abs(d) || 10, seite: s });
      }
    }
    return { teile, seitenBreite: seitenBreite || 595, seiten: doc.numPages, anhaenge };
  } finally {
    await doc.destroy();
  }
}

let geladen: Promise<PdfjsModul> | null = null;
const ladePdfjs = () =>
  (geladen ??= (async () => {
    const [pdfjs, worker] = await Promise.all([
      import("pdfjs-dist/legacy/build/pdf.mjs"),
      import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url"),
    ]);
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjs;
  })());

export async function pdfInhalt(daten: ArrayBuffer): Promise<PdfInhalt> {
  return pdfInhaltMit(await ladePdfjs(), new Uint8Array(daten));
}
