// Baut public/forms/gewa3.pdf: amtlicher Vordruck GewA 3 (Gewerbe-Abmeldung,
// Anlage 3 GewAnzV, Fassung BGBl. 2024 I Nr. 411) mit eigenen AcroForm-Feldern
// darüber. Die Grafik bleibt unverändert, nur die Felder kommen dazu.
// Keine Felder für das, was die Behörde ausfüllt (Feld 17, Vermerke unten),
// für das weggefallene Kästchen in Feld 25/26 und für die Unterschrift (Feld 30).
// Koordinaten: Pixel im 110-dpi-Render der Seite (oben links), Umrechnung unten.
// Aufruf: node scripts/build-gewa3-pdf.mjs
import { writeFileSync } from "node:fs";
import { PDFDocument, PDFName, StandardFonts } from "pdf-lib";

const BASIS = "https://www.gesetze-im-internet.de/normengrafiken/bgbl1_2024";
const QUELLEN = [`${BASIS}/j0411-9_0040.pdf`, `${BASIS}/j0411-9_0050.pdf`];
const K = 72 / 110;

// [Feldname, x, y, Breite, Höhe, mehrzeilig?]
const TEXT = [
  [
    ["stelle", 30, 41, 248, 42, true],
    ["gemeindekennzahl", 306, 41, 263, 42],
    ["f02_register", 371, 218, 337, 16],
    ["f01_name_rechtsform", 30, 237, 678, 74, true],
    ["f03_geschaeftsbezeichnung", 30, 333, 678, 22],
    ["f04_name", 30, 401, 312, 16],
    ["f05_vornamen", 372, 401, 336, 16],
    ["f07_geburtsname", 30, 480, 238, 16],
    ["f08_geburtsdatum", 301, 480, 99, 16],
    ["f09_geburtsort", 431, 480, 277, 16],
    ["f10_andere", 348, 509, 360, 15],
    ["f11_anschrift", 30, 550, 313, 46, true],
    ["f11_telefon", 468, 531, 240, 16],
    ["f11_fax", 468, 548, 240, 16],
    ["f11_email", 468, 565, 240, 16],
    ["f11_internet", 468, 582, 240, 16],
    ["f12_zahl", 468, 626, 240, 28],
    ["f14_name", 124, 705, 584, 28],
    ["f15_anschrift", 30, 779, 313, 46, true],
    ["f15_telefon", 468, 761, 240, 16],
    ["f15_fax", 468, 778, 240, 16],
    ["f15_email", 468, 794, 240, 16],
    ["f15_internet", 468, 811, 240, 16],
    ["f16_anschrift", 30, 864, 313, 46, true],
    ["f16_telefon", 468, 829, 240, 16],
    ["f16_fax", 468, 846, 240, 16],
    ["f16_email", 468, 863, 240, 16],
    ["f16_internet", 468, 880, 240, 16],
  ],
  [
    ["f18_taetigkeit", 30, 44, 676, 273, true],
    ["f20_datum_aufgabe", 454, 338, 252, 16],
    ["f22_vollzeit", 458, 394, 52, 17],
    ["f22_teilzeit", 567, 394, 59, 17],
    ["f27_kuenftiger_name", 32, 579, 674, 16],
    ["f28_gruende", 32, 616, 674, 148, true],
    ["f29_datum", 32, 918, 99, 16],
  ],
];

// [Feldname, x, y] – Kästchen 19 × 15 Pixel
const KASTEN = [
  [
    ["f06_maennlich", 370, 441],
    ["f06_weiblich", 469, 441],
    ["f06_divers", 554, 441],
    ["f06_ohne_angabe", 668, 441],
    ["f10_deutsch", 248, 508],
    ["f13_ja", 468, 664],
    ["f13_nein", 554, 664],
    ["f13_nicht_bekannt", 667, 664],
  ],
  [
    ["f19_ja", 178, 338],
    ["f19_nein", 294, 338],
    ["f21_industrie", 294, 367],
    ["f21_handwerk", 429, 367],
    ["f21_handel", 542, 366],
    ["f21_sonstiges", 673, 367],
    ["f22_keine", 673, 395],
    ["f23_haupt", 294, 441],
    ["f23_zweig", 458, 441],
    ["f23_zweigstelle", 673, 441],
    ["f24_reise", 294, 463],
    ["f25_aufgabe", 294, 492],
    ["f25_rechtsform", 294, 514],
    ["f25_umwandlung", 674, 514],
    ["f25_gesellschafter", 294, 537],
    ["f25_uebergabe", 674, 537],
  ],
];

const ziel = await PDFDocument.create();
ziel.setTitle("Gewerbe-Abmeldung GewA 3 (Anlage 3 GewAnzV)");
for (const url of QUELLEN) {
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error(`${url}: HTTP ${antwort.status}`);
  const quelle = await PDFDocument.load(await antwort.arrayBuffer());
  const [seite] = await ziel.copyPages(quelle, [0]);
  ziel.addPage(seite);
}

const schrift = await ziel.embedFont(StandardFonts.Helvetica);
const form = ziel.getForm();
ziel.getPages().forEach((seite, i) => {
  const hoehe = seite.getHeight();
  const rahmen = { borderWidth: 0, backgroundColor: undefined, borderColor: undefined };
  for (const [name, x, y, b, h, mehrzeilig] of TEXT[i]) {
    const feld = form.createTextField(name);
    if (mehrzeilig) feld.enableMultiline();
    feld.addToPage(seite, { x: x * K, y: hoehe - (y + h) * K, width: b * K, height: h * K, font: schrift, ...rahmen });
    feld.setFontSize(8);
  }
  for (const [name, x, y] of KASTEN[i]) {
    form.createCheckBox(name).addToPage(seite, {
      x: x * K, y: hoehe - (y + 15) * K, width: 19 * K, height: 15 * K, ...rahmen,
    });
  }
});
form.updateFieldAppearances(schrift);
form.acroForm.dict.set(PDFName.of("NeedAppearances"), ziel.context.obj(false));
writeFileSync("public/forms/gewa3.pdf", await ziel.save({ updateFieldAppearances: false }));
console.log("public/forms/gewa3.pdf:", form.getFields().length, "Felder");
