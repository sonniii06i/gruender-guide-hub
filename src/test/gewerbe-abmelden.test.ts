import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { PDFDocument } from "pdf-lib";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import { GEBUEHREN, Q, brauchtGewa3, gewerbeAbmeldenConfig } from "@/lib/freetools/gewerbe-abmelden";
import {
  GEWA3_STAND,
  abmeldeWeg,
  aufbewahrungBis,
  datumLesen,
  datumText,
  gewa3Felder,
  gewa3PdfErzeugen,
  monatsfrist,
  winAnsi,
} from "@/lib/gewa3";

// Gewerbe abmelden (26.11.2026). Sollwerte aus § 14 Abs. 1 GewO, § 1 GewAnzV, den Vordrucken
// der Anlagen 1 und 3 GewAnzV (BGBl. 2024 I Nr. 411) und den Amtsseiten München, Münster,
// Berlin und Hamburg (alle am 26.11.2026 live gelesen).
// Uint8Array.from: Der Node-Buffer stammt aus einem anderen Realm als jsdom, pdf-lib prüft per instanceof.
const VORLAGE = Uint8Array.from(readFileSync(resolve(__dirname, "../../public/forms/gewa3.pdf")));
const tag = (t: string) => datumLesen(t)!;

describe("Welcher Vordruck: amtliche Fälle", () => {
  it("Aufgabe des Betriebs → GewA 3 (§ 14 Abs. 1 Satz 2 Nr. 3 GewO, § 1 Nr. 3 GewAnzV)", () => {
    const w = abmeldeWeg("aufgabe");
    expect(w.vordruck).toBe("GewA 3");
    expect(w.zusaetzlich).toBeUndefined();
    expect(w.grund).toBe("f25_aufgabe");
  });

  it("München/Münster: Umzug in eine andere Gemeinde → nur Anmeldung dort, keine Abmeldung", () => {
    const w = abmeldeWeg("umzug_andere");
    expect(w.vordruck).toBe("GewA 1");
    expect(w.zusaetzlich).toBeUndefined();
    expect(w.behoerde).toContain("neuen Gemeinde");
    expect(w.norm).toContain("§ 14 Abs. 1 Satz 3 GewO");
    expect(w.grund).toBeUndefined();
  });

  it("Berlin: Verlegung innerhalb der Gemeinde → Ummeldung mit GewA 2 (§ 14 Abs. 1 Satz 2 Nr. 1 GewO)", () => {
    expect(abmeldeWeg("umzug_gleiche").vordruck).toBe("GewA 2");
  });

  it("Neue Tätigkeit und Namensänderung → GewA 2 (§ 14 Abs. 1 Satz 2 Nr. 2 und 2a GewO)", () => {
    expect(abmeldeWeg("taetigkeit").vordruck).toBe("GewA 2");
    expect(abmeldeWeg("name").vordruck).toBe("GewA 2");
  });

  it("Hamburg: Wechsel der Rechtsform → erst abmelden (GewA 3), dann neu anmelden (GewA 1)", () => {
    const w = abmeldeWeg("rechtsform");
    expect(w.vordruck).toBe("GewA 3");
    expect(w.zusaetzlich).toBe("GewA 1");
    expect(w.grund).toBe("f25_rechtsform");
  });

  it("Feld 25/26 des GewA 3: Gesellschafteraustritt, Übergabe, Umwandlung haben eigene Kästchen", () => {
    expect(abmeldeWeg("austritt").grund).toBe("f25_gesellschafter");
    expect(abmeldeWeg("uebergabe").grund).toBe("f25_uebergabe");
    expect(abmeldeWeg("umwandlung").grund).toBe("f25_umwandlung");
  });

  it("Ruhen lassen ist keine Anzeige nach § 14 GewO → kein Vordruck, kein GewA-3-Knopf", () => {
    expect(abmeldeWeg("pause").vordruck).toBe("keiner");
    expect(brauchtGewa3({ anlass: "pause" })).toBe(false);
    expect(brauchtGewa3({ anlass: "umzug_andere" })).toBe(false);
    expect(brauchtGewa3({ anlass: "aufgabe" })).toBe(true);
  });
});

describe("Fristen", () => {
  it("Monatsfrist § 138 Abs. 4 AO, §§ 187, 188 BGB: gleicher Tag im Folgemonat", () => {
    // 15.03.2027 (Montag) → 15.04.2027 (Donnerstag)
    expect(datumText(monatsfrist(tag("15.03.2027")))).toBe("15.04.2027");
  });

  it("§ 188 Abs. 3 BGB: fehlt der Tag im Folgemonat, endet die Frist am Monatsletzten", () => {
    // 31.01.2028 → 29.02.2028 (Schaltjahr, Dienstag)
    expect(datumText(monatsfrist(tag("31.01.2028")))).toBe("29.02.2028");
    // 31.03.2027 → 30.04.2027 (Freitag)
    expect(datumText(monatsfrist(tag("31.03.2027")))).toBe("30.04.2027");
  });

  it("§ 108 Abs. 3 AO: Sonnabend und Sonntag schieben auf den Montag", () => {
    // 31.12.2026 → 31.01.2027 ist ein Sonntag → 01.02.2027
    expect(datumText(monatsfrist(tag("31.12.2026")))).toBe("01.02.2027");
    // 13.11.2026 → 13.12.2026 ist ein Sonntag → 14.12.2026
    expect(datumText(monatsfrist(tag("13.11.2026")))).toBe("14.12.2026");
    // 12.11.2026 → 12.12.2026 ist ein Sonnabend → 14.12.2026
    expect(datumText(monatsfrist(tag("12.11.2026")))).toBe("14.12.2026");
  });

  it("Aufbewahrung § 147 Abs. 3, 4 AO: 10/8/6 Jahre ab Schluss des Kalenderjahrs", () => {
    expect(aufbewahrungBis(tag("31.12.2026"))).toEqual({ buecher: "31.12.2036", belege: "31.12.2034", briefe: "31.12.2032" });
    expect(aufbewahrungBis(tag("01.01.2027"))).toEqual({ buecher: "31.12.2037", belege: "31.12.2035", briefe: "31.12.2033" });
  });

  it("Datumseingabe: TT.MM.JJJJ und ISO, Unsinn wird abgelehnt", () => {
    expect(datumText(tag("1.2.2027"))).toBe("01.02.2027");
    expect(datumText(tag("2027-02-01"))).toBe("01.02.2027");
    expect(datumLesen("31.02.2027")).toBeNull();
    expect(datumLesen("bald")).toBeNull();
  });
});

describe("GewA 3: Feldbelegung und PDF", () => {
  const lena = {
    anlass: "aufgabe",
    datum: "31.12.2026",
    rechtsform: "einzel",
    name: "Muster",
    vornamen: "Lena",
    geschlecht: "w",
    geburtsdatum: "03.05.1994",
    geburtsort: "Köln, Deutschland",
    staat: "deutsch",
    wohn_strasse: "Musterweg 1",
    wohn_plzort: "50667 Köln",
    niederlassung: "haupt",
    betrieb_wie_wohnung: true,
    taetigkeit: "Onlinehandel mit Sportartikeln",
    nebenerwerb: "ja",
    betriebsart: "handel",
    beschaeftigte: "nein",
    firma: "darf nicht ins Formular",
    zahl_vertreter: "2",
  };

  it("Einzelunternehmerin im Nebenerwerb: Felder 1, 2, 12, 14 und 16 bleiben leer", () => {
    const f = gewa3Felder(lena);
    for (const leer of ["f01_name_rechtsform", "f02_register", "f12_zahl", "f14_name", "f16_anschrift", "f27_kuenftiger_name"]) {
      expect(f.text[leer]).toBeUndefined();
    }
    expect(f.text.f20_datum_aufgabe).toBe("31.12.2026");
    expect(f.text.f15_anschrift).toBe(f.text.f11_anschrift);
    expect(f.kreuze).toEqual(expect.arrayContaining(["f06_weiblich", "f10_deutsch", "f19_ja", "f21_handel", "f22_keine", "f23_haupt", "f25_aufgabe"]));
    expect(f.kreuze.filter((k) => k.startsWith("f25_"))).toEqual(["f25_aufgabe"]);
    expect(f.vereinfacht).toEqual([]);
  });

  it("UG beim Rechtsformwechsel: Feld 1, 2, 12, 27 gefüllt, Kästchen „Wechsel der Rechtsform“", () => {
    const f = gewa3Felder({
      ...lena,
      anlass: "rechtsform",
      rechtsform: "ug_gmbh",
      firma: "Muster Handels UG (haftungsbeschränkt)",
      register: "Amtsgericht Köln, HRB 12345",
      zahl_vertreter: "1",
      oeffentliche_hand: "nein",
      nachfolger: "Muster Handels GmbH",
    });
    expect(f.text.f01_name_rechtsform).toBe("Muster Handels UG (haftungsbeschränkt)");
    expect(f.text.f02_register).toBe("Amtsgericht Köln, HRB 12345");
    expect(f.text.f12_zahl).toBe("1");
    expect(f.text.f27_kuenftiger_name).toBe("Muster Handels GmbH");
    expect(f.kreuze).toContain("f25_rechtsform");
    expect(f.kreuze).toContain("f13_nein");
  });

  it("Zeichen außerhalb der PDF-Schrift werden vereinfacht und gemeldet, Umlaute und ß bleiben", () => {
    expect(winAnsi("Müller-Weiß")).toEqual({ text: "Müller-Weiß", geaendert: false });
    const w = winAnsi("Yıldız Wałęsa");
    expect(w.geaendert).toBe(true);
    expect(w.text).toMatch(/^[\x20-\x7e -ÿ]+$/);
    expect(gewa3Felder({ ...lena, name: "Wałęsa" }).vereinfacht).toEqual(["4"]);
  });

  it("jeder Feldname der Belegung existiert im gebauten Vordruck", async () => {
    const pdf = await PDFDocument.load(VORLAGE);
    const namen = new Set(pdf.getForm().getFields().map((f) => f.getName()));
    expect(namen.size).toBe(59);
    const alles = gewa3Felder({
      ...lena,
      rechtsform: "ug_gmbh",
      anlass: "uebergabe",
      register: "HRB 1",
      geschaeftsbezeichnung: "Laden",
      geburtsname: "Alt",
      staat: "andere",
      staat_andere: "polnisch",
      telefon: "0221 1234",
      email: "lena@example.org",
      oeffentliche_hand: "unbekannt",
      niederlassung: "zweig",
      vertreter: "Muster, Max",
      betrieb_wie_wohnung: false,
      betrieb_strasse: "Ladenstraße 2",
      betrieb_plzort: "50667 Köln",
      haupt_strasse: "Hauptstraße 3",
      haupt_plzort: "80331 München",
      beschaeftigte: "ja",
      vollzeit: "2",
      teilzeit: "1",
      nachfolger: "Max Muster",
      gruende: "Alter",
    });
    for (const n of [...Object.keys(alles.text), ...alles.kreuze]) expect(namen.has(n), n).toBe(true);
    expect(alles.text.f22_vollzeit).toBe("2");
    expect(alles.text.f16_anschrift).toContain("80331 München");
  });

  it("ausgefülltes PDF: Werte stehen in den Feldern, Datum und Unterschrift bleiben frei", async () => {
    const bytes = await gewa3PdfErzeugen(lena, VORLAGE);
    const form = (await PDFDocument.load(bytes)).getForm();
    expect(form.getTextField("f04_name").getText()).toBe("Muster");
    expect(form.getTextField("f18_taetigkeit").getText()).toBe("Onlinehandel mit Sportartikeln");
    expect(form.getTextField("f20_datum_aufgabe").getText()).toBe("31.12.2026");
    expect(form.getTextField("f29_datum").getText()).toBeUndefined();
    expect(form.getCheckBox("f25_aufgabe").isChecked()).toBe(true);
    expect(form.getCheckBox("f25_rechtsform").isChecked()).toBe(false);
    expect(form.getCheckBox("f19_ja").isChecked()).toBe(true);
    expect(form.getCheckBox("f19_nein").isChecked()).toBe(false);
  });

  it("der Vordruck ist das amtliche Muster 2024 (zwei Seiten, 468 × 681 pt), kein Verlagsformular", async () => {
    const pdf = await PDFDocument.load(VORLAGE);
    expect(pdf.getPageCount()).toBe(2);
    const { width, height } = pdf.getPage(0).getSize();
    expect(Math.round(width)).toBe(468);
    expect(Math.round(height)).toBe(681);
    expect(pdf.getForm().hasXFA()).toBe(false);
  });
});

describe("Fahrplan-Text", () => {
  const gen = gewerbeAbmeldenConfig.generate;

  it("Aufgabe: Vordruck, Fristen, Belegung, Gebühren, Checkliste und Pflichthinweis", () => {
    const t = gen({ anlass: "aufgabe", datum: "31.12.2026", rechtsform: "einzel", name: "Muster", vornamen: "Lena", taetigkeit: "Onlinehandel", niederlassung: "haupt", ust: "regel", oss: true, lucid: true });
    expect(t).toContain("Vordruck: GewA 3");
    expect(t).toContain("zum 31.12.2026");
    expect(t).toContain("spätestens 01.02.2027");
    expect(t).toContain("bis zu 1.000 Euro");
    expect(t).toContain("Feld 20 (Datum der Betriebsaufgabe): 31.12.2026");
    expect(t).toContain("[x] Feld 25/26: Vollständige Aufgabe");
    expect(t).toContain("München: 35 Euro");
    expect(t).toContain("Buchungsbelege aus 2026 mindestens bis 31.12.2034");
    expect(t).toContain("UStAE 2.6 Abs. 6");
    expect(t).toContain("One-Stop-Shop");
    expect(t).toContain("§ 6 Abs. 1 Satz 2 VerpackDG");
    expect(t).not.toContain("stiftung ear");
    expect(t).not.toContain("§ 9 VerpackG");
    expect(t).toContain("Keine Rechts- oder Steuerberatung");
  });

  it("Kleinunternehmer bekommen keine Monatsfrist für die USt-Erklärung genannt (§ 19 Abs. 1 Satz 2 UStG)", () => {
    const t = gen({ anlass: "aufgabe", datum: "30.06.2027", rechtsform: "einzel", ust: "klein", niederlassung: "haupt" });
    expect(t).toContain("§ 19 Abs. 1 Satz 2 UStG");
    expect(t).not.toContain("§ 18 Abs. 3 Satz 2 UStG");
  });

  it("Umzug in eine andere Gemeinde: kein GewA 3, Verweis auf GewA 1 Feld 25 und die Regel seit 1. November 2025", () => {
    const t = gen({ anlass: "umzug_andere", datum: "01.03.2027", rechtsform: "einzel" });
    expect(t).toContain("Vordruck: GewA 1");
    expect(t).toContain("Verlegung des Betriebs aus einem anderen Meldebezirk");
    expect(t).toContain("1. November 2025");
    expect(t).not.toContain("3. So ist dein GewA 3 ausgefüllt");
    expect(t).not.toContain("5. Danach erledigen");
  });

  it("UG: Hinweis auf Auflösung, Gläubigeraufruf und Sperrjahr statt bloßer Abmeldung", () => {
    const t = gen({ anlass: "aufgabe", datum: "31.12.2026", rechtsform: "ug_gmbh", niederlassung: "haupt" });
    expect(t).toContain("§ 65 GmbHG");
    expect(t).toContain("§ 73 Abs. 1 GmbHG");
    expect(t).toContain("gesetzlichen Vertreter");
  });

  it("Pause: kein Vordruck, keine Frist, keine erfundene Ruhend-Meldung", () => {
    const t = gen({ anlass: "pause", rechtsform: "einzel" });
    expect(t).toContain("Vordruck: keiner");
    expect(t).not.toContain("Geldbuße");
  });

  it("ohne gültiges Datum rechnet der Fahrplan keine Frist aus", () => {
    const t = gen({ anlass: "aufgabe", datum: "irgendwann", rechtsform: "einzel", niederlassung: "haupt" });
    expect(t).toContain("kein gültiges Datum");
    expect(t).not.toMatch(/spätestens \d{2}\.\d{2}\.\d{4}/);
  });
});

describe("Seite: SEO, Quellen, Links", () => {
  const c = gewerbeAbmeldenConfig;
  const stamm = (t: string) => ["gewerb", "abmeld", "formul"].every((w) => t.toLowerCase().includes(w));

  it("ist registriert und ohne E-Mail-Tor", () => {
    expect(FREE_TOOL_BY_SLUG["gewerbe-abmelden"]).toBe(c);
    expect(c.gated).not.toBe(true);
    expect(c.ergebnisRabatt).toBeUndefined();
  });

  it("Keyword in Title (30–60) und H1, Description 120–160", () => {
    expect(c.seo.title.length).toBeGreaterThanOrEqual(30);
    expect(c.seo.title.length).toBeLessThanOrEqual(60);
    expect(stamm(c.seo.title)).toBe(true);
    expect(stamm(c.heroTitle)).toBe(true);
    expect(c.seo.description.length).toBeGreaterThanOrEqual(120);
    expect(c.seo.description.length).toBeLessThanOrEqual(160);
  });

  it("mindestens 800 Wörter Erklärtext, FAQ ≥ 5, Stand sichtbar", () => {
    const text = [
      ...c.kurzantwort!.text,
      ...c.seoSections!.flatMap((x) => [x.heading, ...x.body, ...(x.tabelle?.zeilen.flat() ?? [])]),
    ].join(" ");
    const woerter = text.split(/\s+/).length;
    expect(woerter).toBeGreaterThanOrEqual(800);
    expect(woerter).toBeLessThanOrEqual(1700);
    expect(c.seo.faqs.length).toBeGreaterThanOrEqual(5);
    expect(c.stand).toBe(GEWA3_STAND);
    expect(c.badge).toContain(GEWA3_STAND);
  });

  it("interne Links: ≥ 5, kanonisch, Ziele stehen in der Sitemap-Liste", () => {
    const sitemap = readFileSync(resolve(__dirname, "../../scripts/generate-sitemap.ts"), "utf8");
    const live = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
    expect(c.links!.length).toBeGreaterThanOrEqual(5);
    for (const l of c.links!) {
      expect(l.to).not.toContain("?");
      expect(live.includes(`<loc>https://gruenderx.de${l.to}</loc>`), l.to).toBe(true);
    }
    expect(sitemap).toContain('"/gewerbe-abmelden"');
  });

  it("Quellen: nur https, keine doppelt, jede Gebühr mit Amtsseite", () => {
    const urls = c.quellen!.map((q) => q.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) expect(u.startsWith("https://")).toBe(true);
    for (const g of GEBUEHREN) expect(urls).toContain(g.url);
    expect(urls).toContain(Q.gewo14);
    expect(urls).toContain(Q.anlage3);
  });

  it("verspricht nichts, was das Tool nicht hält", () => {
    const alles = JSON.stringify({ ...c, steps: undefined, icon: undefined }).toLowerCase();
    for (const tabu of ["abmahnsicher", "rechtssicher", "garantiert", "§ 9 verpackg"]) expect(alles).not.toContain(tabu);
    expect(c.kurzantwort!.fussnote).toContain("nicht eine Behörde");
  });

  it("der leere Vordruck liegt dort, wohin die Seite verlinkt", () => {
    expect(c.downloads![0].href).toBe("/forms/gewa3.pdf");
    expect(existsSync(resolve(__dirname, "../../public/forms/gewa3.pdf"))).toBe(true);
  });
});
