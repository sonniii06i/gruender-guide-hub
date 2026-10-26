// Baut das Gründungspaket 2026 (Word, PDF, Excel) aus inhalt.mjs und packt es als ZIP.
//
//   node scripts/gruendungspaket/bauen.mjs
//
// Ausgabe:
//   scripts/gruendungspaket/out/GruenderX-Gruendungspaket-2026.zip   (zum Ansehen, nicht eingecheckt)
//   supabase/functions/_shared/gruendungspaketZip.ts                 (Base64 + SHA-256 für paket-download)
//
// Die ZIP liegt nur in der Edge Function, nie im Frontend-Bundle: ausgeliefert
// wird sie ausschließlich nach bezahlter Stripe-Session über einen signierten,
// ablaufenden Link (supabase/functions/paket-download).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import {
  AlignmentType, BorderStyle, Document, Footer, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType,
} from "docx";
import { DOKUMENTE, HINWEIS, PRODUKT, QUELLEN, RECHNUNGEN, STAND } from "./inhalt.mjs";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WURZEL = path.resolve(HIER, "../..");
const OUT = path.join(HIER, "out");
const ZIEL_TS = path.join(WURZEL, "supabase/functions/_shared/gruendungspaketZip.ts");
const BLAU = "256AF4";
// Fester Zeitstempel: gleiche Eingabe -> byte-gleiche ZIP (prüfbar per SHA-256).
const ZEIT = new Date("2026-10-26T00:00:00Z");

const fuss = `${PRODUKT} · Stand ${STAND} · gruenderx.de · Arbeitshilfe, keine Steuer- oder Rechtsberatung`;

// ================================================================ DOCX
const run = (text, o = {}) => new TextRun({ text, font: "Calibri", size: o.size ?? 21, bold: o.bold, color: o.color, italics: o.italics });
const absatz = (text, o = {}) => new Paragraph({ children: [run(text, o)], spacing: { after: o.after ?? 120 }, alignment: o.align });
const rand = { style: BorderStyle.SINGLE, size: 4, color: "D0D5DD" };
const raender = { top: rand, bottom: rand, left: rand, right: rand, insideHorizontal: rand, insideVertical: rand };
const zelle = (text, o = {}) => new TableCell({
  children: [new Paragraph({ children: [run(text, { bold: o.bold, size: o.size ?? 19, color: o.color })], alignment: o.align })],
  shading: o.fill ? { fill: o.fill } : undefined,
  width: o.breite ? { size: o.breite, type: WidthType.PERCENTAGE } : undefined,
});
const tabelleDocx = (kopf, zeilen, breiten) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: raender,
  rows: [
    new TableRow({ tableHeader: true, children: kopf.map((k, i) => zelle(k, { bold: true, fill: "EEF3FE", breite: breiten?.[i] })) }),
    ...zeilen.map((z) => new TableRow({ children: z.map((c, i) => zelle(c, { breite: breiten?.[i], align: breiten && i >= z.length - 2 && /€|^\d/.test(c) ? AlignmentType.RIGHT : undefined })) })),
  ],
});

function quellenText(ids) {
  return "Quelle: " + ids.map((id) => `${QUELLEN[id].titel} – ${QUELLEN[id].url}`).join(" · ");
}

function bloeckeDocx(bloecke) {
  const out = [];
  for (const b of bloecke) {
    if (b.typ === "h") out.push(new Paragraph({ children: [run(b.text, { bold: true, size: 26, color: BLAU })], spacing: { before: 240, after: 120 } }));
    else if (b.typ === "p") out.push(absatz(b.text));
    else if (b.typ === "liste") b.punkte.forEach((t) => out.push(absatz("•  " + t, { after: 80 })));
    else if (b.typ === "check") b.punkte.forEach((t) => out.push(absatz("☐  " + t, { after: 80 })));
    else if (b.typ === "tabelle") { out.push(tabelleDocx(b.kopf, b.zeilen)); out.push(absatz("")); }
    else if (b.typ === "quelle") {
      if (b.ids.length > 3) b.ids.forEach((id) => out.push(absatz(`${QUELLEN[id].titel}: ${QUELLEN[id].url}`, { size: 17, color: "667085", after: 60 })));
      else out.push(absatz(quellenText(b.ids), { size: 16, color: "667085", italics: true }));
    }
  }
  return out;
}

function dokumentDocx(titel, kinder) {
  return new Document({
    creator: "GründerX", title: titel, description: PRODUKT,
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
      footers: { default: new Footer({ children: [absatz(fuss, { size: 15, color: "98A2B3", align: AlignmentType.CENTER })] }) },
      children: [
        new Paragraph({ children: [run(titel, { bold: true, size: 36 })], spacing: { after: 80 } }),
        absatz(`${PRODUKT} · Stand ${STAND}`, { size: 18, color: "667085", after: 240 }),
        ...kinder,
      ],
    }],
  });
}

// Rechnungsvorlage: Platzhalter in eckigen Klammern, Beträge bleiben leer zum Ausfüllen.
function rechnungZeilen(art) {
  const r = RECHNUNGEN[art];
  const kopfLinks = [
    "[Dein Name / Firma]", "[Straße Hausnummer]", "[PLZ Ort]",
    art === "kleinbetrag" ? "" : "Steuernummer: [Steuernummer] oder USt-IdNr.: [USt-IdNr.]" + (art === "klein" ? " oder Kleinunternehmer-ID" : ""),
  ].filter(Boolean);
  const empfaenger = art === "kleinbetrag"
    ? ["[Name des Kunden – bei Kleinbeträgen nicht vorgeschrieben]"]
    : ["[Name des Kunden / Firma]", "[Straße Hausnummer]", "[PLZ Ort]"];
  const meta = [
    ["Rechnungsdatum", "[TT.MM.JJJJ]"],
    ...(r.nummer ? [["Rechnungsnummer", "[fortlaufend, einmalig, z. B. 2026-001]"]] : [["Rechnungsnummer (freiwillig)", "[z. B. 2026-001]"]]),
    ...(r.leistungsdatum ? [["Leistungsdatum / -zeitraum", "[TT.MM.JJJJ bzw. Zeitraum]"]] : []),
  ];
  const summen = {
    regel: [["Summe netto", "[0,00 €]"], ["zzgl. Umsatzsteuer [19 % / 7 %]", "[0,00 €]"], ["Rechnungsbetrag brutto", "[0,00 €]"]],
    klein: [["Gesamtbetrag", "[0,00 €]"]],
    kleinbetrag: [["Gesamtbetrag inkl. [19 % / 7 %] Umsatzsteuer", "[0,00 €]"]],
  }[art];
  const steuerHinweis = {
    regel: "Bei steuerfreien Leistungen statt Steuerbetrag: Hinweis auf die Steuerbefreiung angeben.",
    klein: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    kleinbetrag: "Steuersatz angeben; Entgelt und Steuerbetrag dürfen in einer Summe stehen (§ 33 UStDV).",
  }[art];
  return { r, kopfLinks, empfaenger, meta, summen, steuerHinweis };
}

function rechnungDocx(art) {
  const { r, kopfLinks, empfaenger, meta, summen, steuerHinweis } = rechnungZeilen(art);
  const kinder = [
    ...kopfLinks.map((t) => absatz(t, { after: 20, size: 19 })),
    absatz(""),
    ...empfaenger.map((t) => absatz(t, { after: 20 })),
    absatz(""),
    tabelleDocx(["Angabe", "Wert"], meta, [40, 60]),
    absatz(""),
    absatz("[Anrede], für meine Leistungen berechne ich wie folgt:"),
    tabelleDocx(["Pos.", "Bezeichnung (Menge und Art bzw. Umfang und Art der Leistung)", "Menge", "Einzelpreis", "Gesamt"],
      [["1", "[Leistung / Artikel]", "[1]", "[0,00 €]", "[0,00 €]"], ["2", "[Leistung / Artikel]", "[1]", "[0,00 €]", "[0,00 €]"]],
      [8, 50, 12, 15, 15]),
    absatz(""),
    tabelleDocx(["", "Betrag"], summen, [70, 30]),
    absatz(""),
    absatz(steuerHinweis, { bold: art === "klein" }),
    absatz("Bitte überweise den Betrag bis [Datum] auf: [Kontoinhaber], IBAN [IBAN], BIC [BIC], Verwendungszweck [Rechnungsnummer]."),
    absatz("Vielen Dank für deinen Auftrag."),
    absatz(""),
    absatz(r.untertitel, { bold: true, size: 17, color: "667085" }),
    absatz(r.fussnote, { size: 16, color: "667085" }),
    absatz(quellenText(r.quellen), { size: 15, color: "98A2B3", italics: true }),
    absatz("Diesen Kasten vor dem Versand löschen. " + HINWEIS, { size: 15, color: "98A2B3", italics: true }),
  ];
  return dokumentDocx(r.titel, kinder);
}

// docx schreibt Erstell-/Änderungszeit = jetzt in docProps/core.xml und in die ZIP-Einträge.
// Für eine byte-gleiche Ausgabe beides auf ZEIT setzen.
async function docxFixieren(doc) {
  const roh = await JSZip.loadAsync(await Packer.toBuffer(doc));
  const neu = new JSZip();
  const iso = ZEIT.toISOString().replace(/\.\d{3}Z$/, "Z");
  for (const name of Object.keys(roh.files).sort()) {
    const e = roh.files[name];
    if (e.dir) continue;
    let inhalt = await e.async("nodebuffer");
    if (name === "docProps/core.xml") {
      inhalt = Buffer.from(inhalt.toString("utf8").replace(/(<dcterms:(?:created|modified)[^>]*>)[^<]*(<)/g, `$1${iso}$2`));
    }
    neu.file(name, inhalt, { date: ZEIT });
  }
  return neu.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

// ================================================================ PDF
function pdfNeu(titel) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.setCreationDate(ZEIT);
  doc.setFileId(crypto.createHash("md5").update(titel).digest("hex").toUpperCase());
  const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 56;
  const s = { doc, W, H, M, y: M, breite: W - 2 * M };
  const fussZeile = () => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(152, 162, 179);
    doc.text(fuss, W / 2, H - 26, { align: "center" });
  };
  s.platz = (h) => { if (s.y + h > H - 50) { fussZeile(); doc.addPage(); s.y = M; } };
  s.text = (t, o = {}) => {
    doc.setFont("helvetica", o.bold ? "bold" : o.italic ? "italic" : "normal");
    doc.setFontSize(o.size ?? 10.5);
    const [r, g, b] = o.farbe ?? [16, 24, 40];
    doc.setTextColor(r, g, b);
    const einzug = o.einzug ?? 0;
    const zeilen = doc.splitTextToSize(t, s.breite - einzug);
    const lh = (o.size ?? 10.5) * 1.35;
    for (const z of zeilen) { s.platz(lh); doc.text(z, M + einzug, s.y + (o.size ?? 10.5)); s.y += lh; }
    s.y += o.nach ?? 6;
  };
  s.ende = () => { fussZeile(); return Buffer.from(doc.output("arraybuffer")); };
  s.text(titel, { bold: true, size: 18, nach: 2 });
  s.text(`${PRODUKT} · Stand ${STAND}`, { size: 9, farbe: [102, 112, 133], nach: 14 });
  return s;
}

function tabellePdf(s, kopf, zeilen, anteile) {
  const { doc, M } = s;
  const breiten = (anteile ?? kopf.map(() => 1 / kopf.length)).map((a) => a * s.breite);
  const zeile = (werte, fett, fuellen) => {
    doc.setFont("helvetica", fett ? "bold" : "normal"); doc.setFontSize(9);
    const teile = werte.map((w, i) => doc.splitTextToSize(String(w), breiten[i] - 8));
    const h = Math.max(...teile.map((t) => t.length)) * 12 + 8;
    s.platz(h);
    let x = M;
    teile.forEach((t, i) => {
      if (fuellen) { doc.setFillColor(238, 243, 254); doc.rect(x, s.y, breiten[i], h, "F"); }
      doc.setDrawColor(208, 213, 221); doc.rect(x, s.y, breiten[i], h);
      doc.setTextColor(16, 24, 40); doc.text(t, x + 4, s.y + 13);
      x += breiten[i];
    });
    s.y += h;
  };
  zeile(kopf, true, true);
  zeilen.forEach((z) => zeile(z, false, false));
  s.y += 10;
}

function bloeckePdf(s, bloecke) {
  for (const b of bloecke) {
    if (b.typ === "h") { s.y += 6; s.text(b.text, { bold: true, size: 13, farbe: [37, 106, 244] }); }
    else if (b.typ === "p") s.text(b.text);
    else if (b.typ === "liste") b.punkte.forEach((t) => s.text("•  " + t, { einzug: 6, nach: 3 }));
    else if (b.typ === "check") b.punkte.forEach((t) => s.text("[  ]  " + t, { einzug: 6, nach: 4 }));
    else if (b.typ === "tabelle") tabellePdf(s, b.kopf, b.zeilen);
    else if (b.typ === "quelle") {
      if (b.ids.length > 3) b.ids.forEach((id) => s.text(`${QUELLEN[id].titel}: ${QUELLEN[id].url}`, { size: 8.5, farbe: [102, 112, 133], nach: 3 }));
      else s.text(quellenText(b.ids), { size: 8, italic: true, farbe: [102, 112, 133], nach: 8 });
    }
  }
}

function rechnungPdf(art) {
  const { r, kopfLinks, empfaenger, meta, summen, steuerHinweis } = rechnungZeilen(art);
  const s = pdfNeu(r.titel);
  kopfLinks.forEach((t) => s.text(t, { nach: 0, size: 9.5 }));
  s.y += 12;
  empfaenger.forEach((t) => s.text(t, { nach: 0 }));
  s.y += 12;
  tabellePdf(s, ["Angabe", "Wert"], meta, [0.4, 0.6]);
  s.text("[Anrede], für meine Leistungen berechne ich wie folgt:");
  tabellePdf(s, ["Pos.", "Bezeichnung (Menge und Art bzw. Umfang und Art der Leistung)", "Menge", "Einzelpreis", "Gesamt"],
    [["1", "[Leistung / Artikel]", "[1]", "[0,00 €]", "[0,00 €]"], ["2", "[Leistung / Artikel]", "[1]", "[0,00 €]", "[0,00 €]"]],
    [0.08, 0.5, 0.12, 0.15, 0.15]);
  tabellePdf(s, ["", "Betrag"], summen, [0.7, 0.3]);
  s.text(steuerHinweis, { bold: art === "klein" });
  s.text("Bitte überweise den Betrag bis [Datum] auf: [Kontoinhaber], IBAN [IBAN], BIC [BIC], Verwendungszweck [Rechnungsnummer].");
  s.text("Vielen Dank für deinen Auftrag.", { nach: 18 });
  s.text(r.untertitel, { bold: true, size: 8.5, farbe: [102, 112, 133], nach: 2 });
  s.text(r.fussnote, { size: 8, farbe: [102, 112, 133] });
  s.text(quellenText(r.quellen), { size: 7.5, italic: true, farbe: [152, 162, 179] });
  return s.ende();
}

// ================================================================ XLSX (SpreadsheetML von Hand, keine Zusatzbibliothek)
const xmlEsc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const spalte = (i) => String.fromCharCode(65 + i);

function blatt(zeilen, breiten) {
  // zeilen: Array von Arrays; Zelle = string | number | {f: Formel} | {t: Text, s: Stil}
  const rows = zeilen.map((z, ri) => `<row r="${ri + 1}">` + z.map((c, ci) => {
    const ref = `${spalte(ci)}${ri + 1}`;
    if (c === null || c === undefined || c === "") return "";
    if (typeof c === "number") return `<c r="${ref}" s="2"><v>${c}</v></c>`;
    if (typeof c === "object" && c.f) return `<c r="${ref}" s="${c.s ?? 2}"><f>${xmlEsc(c.f)}</f></c>`;
    const t = typeof c === "object" ? c.t : c;
    const s = typeof c === "object" ? c.s ?? 0 : 0;
    return `<c r="${ref}" t="inlineStr" s="${s}"><is><t xml:space="preserve">${xmlEsc(t)}</t></is></c>`;
  }).join("") + "</row>").join("");
  const cols = breiten ? `<cols>${breiten.map((b, i) => `<col min="${i + 1}" max="${i + 1}" width="${b}" customWidth="1"/>`).join("")}</cols>` : "";
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetViews><sheetView workbookViewId="0"><pane ySplit="3" topLeftCell="A4" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>` +
    `${cols}<sheetData>${rows}</sheetData></worksheet>`;
}

async function trackerXlsx() {
  const K = (t) => ({ t, s: 1 });               // Kopf fett
  const T = (t) => ({ t, s: 3 });               // Titel
  const H = (t) => ({ t, s: 4 });               // Hinweis grau
  const rechnungen = [
    [T("Rechnungsausgang " + new Date(ZEIT).getFullYear())],
    [H("Eine Zeile je Rechnung. Kleinunternehmer: USt-Satz 0 eintragen. Stand " + STAND + ".")],
    [K("Nr."), K("Datum"), K("Kunde"), K("Leistung"), K("Netto €"), K("USt-Satz %"), K("USt €"), K("Brutto €"), K("Bezahlt am"), K("E-Rechnung? (ja/nein)")],
    ...Array.from({ length: 60 }, (_, i) => {
      const r = i + 4;
      return ["", "", "", "", "", "", { f: `IF(E${r}="","",ROUND(E${r}*F${r}/100,2))` }, { f: `IF(E${r}="","",E${r}+G${r})` }, "", ""];
    }),
    ["", "", "", K("Summe"), { f: "SUM(E4:E63)" }, "", { f: "SUM(G4:G63)" }, { f: "SUM(H4:H63)" }],
  ];
  const grenze = [
    [T("Kleinunternehmer-Grenzen (§ 19 Abs. 1 UStG)")],
    [H("Vorjahr höchstens 25.000 €, laufendes Jahr höchstens 100.000 € Gesamtumsatz. Quelle: " + QUELLEN.ustg19.url)],
    [K("Monat"), K("Umsatz €"), K("kumuliert €"), K("Status")],
    ...["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"].map((m, i) => {
      const r = i + 4;
      return [m, "", { f: `SUM($B$4:B${r})` }, { t: "", s: 0 }];
    }).map((z, i) => { const r = i + 4; z[3] = { f: `IF(C${r}>100000,"über 100.000 € – Regelbesteuerung prüfen",IF(C${r}>25000,"über 25.000 € – ab nächstem Jahr keine Kleinunternehmer",""))`, s: 0 }; return z; }),
    [],
    [K("Gesamtumsatz Vorjahr €"), ""],
    [K("Vorjahr unter 25.000 €?"), { f: `IF(B17="","",IF(B17<=25000,"ja","nein – Kleinunternehmerregelung nicht möglich"))`, s: 0 }],
  ];
  const fristen = [
    [T("Fristen der Gründung")],
    [H("Daten selbst eintragen; Fristen laut Quelle. Keine Gewähr für Sonderfälle.")],
    [K("Schritt"), K("Frist laut Gesetz"), K("Quelle"), K("Ereignis-Datum"), K("Spätestens bis"), K("Erledigt am")],
    ["Gewerbeanmeldung", "gleichzeitig mit Beginn", QUELLEN.gewo14.url, "", { f: `IF(D4="","",D4)`, s: 5 }, ""],
    ["Fragebogen zur steuerlichen Erfassung", "innerhalb eines Monats", QUELLEN.ao138.url, "", { f: `IF(D5="","",EDATE(D5,1))`, s: 5 }, ""],
    ["Rechnung an Unternehmen", "innerhalb von sechs Monaten nach Leistung", QUELLEN.ustg14.url, "", { f: `IF(D6="","",EDATE(D6,6))`, s: 5 }, ""],
    ["Übergang E-Rechnung (PDF/Papier noch erlaubt)", "Leistungen bis 31.12.2026", QUELLEN.ustg27.url, "", "", ""],
    ["Übergang E-Rechnung bis 800.000 € Vorjahresumsatz", "Leistungen bis 31.12.2027", QUELLEN.ustg27.url, "", "", ""],
  ];
  const blaetter = [["Rechnungen", blatt(rechnungen, [8, 12, 24, 30, 12, 11, 11, 12, 12, 18])],
    ["Kleinunternehmer", blatt(grenze, [26, 14, 14, 52])], ["Fristen", blatt(fristen, [44, 34, 60, 15, 15, 13])]];

  const zip = new JSZip();
  const opt = { date: ZEIT };
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${blaetter.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`, opt);
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`, opt);
  zip.file("xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${blaetter.map(([n], i) => `<sheet name="${n}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><calcPr fullCalcOnLoad="1"/></workbook>`, opt);
  zip.file("xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${blaetter.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${blaetter.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`, opt);
  // Stile: 0 normal, 1 Kopf fett blau hinterlegt, 2 Zahl #,##0.00, 3 Titel groß fett, 4 Hinweis grau kursiv, 5 Datum
  zip.file("xl/styles.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="DD.MM.YYYY"/></numFmts><fonts count="4"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="14"/><color rgb="FF256AF4"/><name val="Calibri"/></font><font><i/><sz val="10"/><color rgb="FF667085"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEEF3FE"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="6"><xf/><xf fontId="1" fillId="2" applyFont="1" applyFill="1"/><xf numFmtId="4" applyNumberFormat="1"/><xf fontId="2" applyFont="1"/><xf fontId="3" applyFont="1"/><xf numFmtId="164" applyNumberFormat="1"/></cellXfs></styleSheet>`, opt);
  blaetter.forEach(([, xml], i) => zip.file(`xl/worksheets/sheet${i + 1}.xml`, xml, opt));
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

// ================================================================ Lauf
async function main() {
  const paket = new JSZip();
  const dateien = [];
  for (const d of DOKUMENTE) {
    for (const f of d.formate) {
      let buf;
      if (d.rechnung) buf = f === "docx" ? await docxFixieren(rechnungDocx(d.rechnung)) : rechnungPdf(d.rechnung);
      else if (d.tracker) buf = await trackerXlsx();
      else if (f === "docx") buf = await docxFixieren(dokumentDocx(d.titel, [...bloeckeDocx(d.bloecke), absatz(""), absatz(HINWEIS, { size: 16, color: "667085", italics: true })]));
      else { const s = pdfNeu(d.titel); bloeckePdf(s, d.bloecke); s.y += 8; s.text(HINWEIS, { size: 8, italic: true, farbe: [102, 112, 133] }); buf = s.ende(); }
      const name = `${d.datei}.${f}`;
      paket.file(name, buf, { date: ZEIT });
      dateien.push({ name, bytes: buf.length });
    }
  }
  paket.file("LIESMICH.txt", `${PRODUKT}\nStand ${STAND}\n\nStarte mit 00-Uebersicht-und-Quellen.pdf.\n\n${HINWEIS}\n\nFragen: support@gruenderx.de\n`, { date: ZEIT });
  const zip = await paket.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 9 } });
  const sha = crypto.createHash("sha256").update(zip).digest("hex");
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "GruenderX-Gruendungspaket-2026.zip"), zip);
  fs.writeFileSync(ZIEL_TS,
    "// GENERIERT von scripts/gruendungspaket/bauen.mjs – nicht von Hand ändern.\n" +
    `// ${PRODUKT}, Stand ${STAND}, ${dateien.length} Dateien, ${zip.length} Bytes.\n` +
    `export const PAKET_DATEINAME = "GruenderX-Gruendungspaket-2026.zip";\n` +
    `export const PAKET_SHA256 = "${sha}";\n` +
    `export const PAKET_DATEIEN = ${JSON.stringify(dateien.map((d) => d.name))};\n` +
    `export const PAKET_BASE64 =\n  "${zip.toString("base64")}";\n`);
  console.log(JSON.stringify({ dateien, zipBytes: zip.length, sha256: sha }, null, 1));
}

main().catch((e) => { console.error(e); process.exit(1); });
