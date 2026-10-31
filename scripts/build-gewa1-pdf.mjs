// Baut public/forms/gewa1.pdf: amtlicher Vordruck GewA1 (Anlage 1 GewAnzV,
// Fassung BGBl. 2024 I Nr. 411) mit eigenen AcroForm-Feldern darüber.
// Die Grafik bleibt unverändert, nur die Felder kommen dazu.
// Koordinaten: Pixel im 110-dpi-Render der Seite (oben links), Umrechnung unten.
// Aufruf: node scripts/build-gewa1-pdf.mjs
import { writeFileSync } from "node:fs";
import { PDFDocument, PDFName, StandardFonts } from "pdf-lib";

const BASIS = "https://www.gesetze-im-internet.de/normengrafiken/bgbl1_2024";
const QUELLEN = [`${BASIS}/j0411-9_0010.pdf`, `${BASIS}/j0411-9_0020.pdf`];
const K = 72 / 110;

// [Feldname, x, y, Breite, Höhe, mehrzeilig?]
const TEXT = [
  [
    ["stelle", 28, 40, 250, 45, true],
    ["gemeindekennzahl", 303, 40, 265, 45],
    ["f01_name_rechtsform", 28, 240, 680, 76, true],
    ["f02_register", 369, 221, 340, 17],
    ["f03_geschaeftsbezeichnung", 28, 344, 680, 28],
    ["f04_name", 28, 420, 315, 18],
    ["f05_vornamen", 369, 420, 340, 18],
    ["f07_geburtsname", 28, 498, 240, 17],
    ["f08_geburtsdatum", 297, 498, 103, 17],
    ["f09_geburtsort", 428, 498, 280, 17],
    ["f10_andere", 345, 526, 365, 18],
    ["f11_anschrift", 28, 565, 315, 50, true],
    ["f11_telefon", 466, 546, 245, 16],
    ["f11_fax", 466, 564, 245, 16],
    ["f11_email", 466, 581, 245, 16],
    ["f11_internet", 466, 598, 245, 16],
    ["f12_zahl", 466, 648, 245, 30],
    ["f14_name", 122, 725, 588, 30],
    ["f15_anschrift", 28, 803, 315, 45, true],
    ["f15_telefon", 466, 786, 245, 15],
    ["f15_fax", 466, 804, 245, 15],
    ["f15_email", 466, 821, 245, 15],
    ["f15_internet", 466, 836, 245, 13],
    ["f16_anschrift", 28, 886, 315, 36, true],
    ["f16_telefon", 466, 852, 245, 15],
    ["f16_fax", 466, 870, 245, 15],
    ["f16_email", 466, 887, 245, 15],
    ["f16_internet", 466, 903, 245, 15],
    ["f17_anschrift", 28, 955, 315, 48, true],
    ["f17_telefon", 466, 937, 245, 15],
    ["f17_fax", 466, 955, 245, 15],
    ["f17_email", 466, 972, 245, 15],
    ["f17_internet", 466, 989, 245, 15],
  ],
  [
    ["f18_taetigkeit", 148, 152, 636, 186, true],
    ["f20_beginn", 543, 356, 242, 17],
    ["f22_vollzeit", 546, 409, 54, 17],
    ["f22_teilzeit", 648, 409, 60, 17],
    ["f26_frueherer_name", 148, 582, 637, 15],
    ["f27_unfallversicherung", 146, 615, 504, 16],
    ["f27_unternehmensnummer", 146, 652, 504, 16],
    ["f28_details", 460, 726, 325, 29, true],
    ["f29_details", 460, 779, 325, 28, true],
    ["f30_details", 460, 832, 325, 29, true],
    ["f31_details", 460, 885, 325, 29, true],
    ["f32_datum", 146, 983, 98, 16],
  ],
];

// [Feldname, x, y] – Kästchen 19 × 18 Pixel
const KASTEN = [
  [
    ["f06_maennlich", 369, 457],
    ["f06_weiblich", 468, 457],
    ["f06_divers", 553, 457],
    ["f06_ohne_angabe", 666, 457],
    ["f10_deutsch", 247, 525],
    ["f13_ja", 468, 684],
    ["f13_nein", 553, 684],
    ["f13_nicht_bekannt", 666, 684],
  ],
  [
    ["f19_ja", 285, 356],
    ["f19_nein", 390, 356],
    ["f21_industrie", 390, 383],
    ["f21_handwerk", 521, 383],
    ["f21_handel", 627, 383],
    ["f21_sonstiges", 750, 383],
    ["f22_keine", 750, 408],
    ["f23_haupt", 390, 451],
    ["f23_zweig", 547, 451],
    ["f23_zweigstelle", 750, 451],
    ["f24_reise", 390, 472],
    ["f25_neugruendung", 390, 499],
    ["f25_verlegung", 750, 499],
    ["f25_rechtsform", 390, 520],
    ["f25_umwandlung", 750, 520],
    ["f25_gesellschafter", 390, 542],
    ["f25_uebernahme", 750, 542],
    ["f27_uv_unbekannt", 750, 613],
    ["f27_nr_unbekannt", 750, 651],
    ["f28_nein", 390, 708],
    ["f28_ja", 441, 708],
    ["f29_nein", 390, 761],
    ["f29_ja", 441, 761],
    ["f30_nein", 390, 814],
    ["f30_ja", 441, 814],
    ["f31_nein", 390, 867],
    ["f31_ja", 441, 867],
  ],
];

const ziel = await PDFDocument.create();
ziel.setTitle("Gewerbe-Anmeldung GewA1 (Anlage 1 GewAnzV)");
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
      x: x * K, y: hoehe - (y + 18) * K, width: 19 * K, height: 18 * K, ...rahmen,
    });
  }
});
form.updateFieldAppearances(schrift);
form.acroForm.dict.set(PDFName.of("NeedAppearances"), ziel.context.obj(false));
writeFileSync("public/forms/gewa1.pdf", await ziel.save({ updateFieldAppearances: false }));
console.log("public/forms/gewa1.pdf:", form.getFields().length, "Felder");
