import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import {
  ausERechnung,
  betraege,
  daten,
  geldWert,
  leseZeileAlsPosition,
  lesePdfRechnung,
  profilAus,
  summenAbgleich,
  zeilenAusText,
} from "@/lib/pdfRechnungLesen";
import { leseERechnung } from "@/lib/eRechnungLesen";
import { baueXRechnung, xrFehlend, xrSummen } from "@/lib/xrechnung";

// Tool „PDF in E-Rechnung umwandeln“ (/pdf-in-e-rechnung-umwandeln).
// 1) Rechenlogik gegen die offiziellen KoSIT-Beispielrechnungen (XRechnung-Testsuite):
//    Daten übernehmen, neu aufbauen, Summen müssen auf den Cent gleich bleiben.
// 2) Typische PDF-Rechnungen (Text, wie ihn pdf.js liefert) → Felder, Positionen, Summen.

const FIX = join(__dirname, "fixtures/xrechnung");

describe("Rechenlogik gegen offizielle KoSIT-Beispiele", () => {
  const dateien = readdirSync(FIX).filter((f) => f.endsWith(".xml"));
  const geeignet = dateien
    .map((f) => ({ f, r: leseERechnung(readFileSync(join(FIX, f), "utf8")) }))
    // ohne Zu-/Abschläge auf Belegebene und ohne Vorauszahlung: das deckt der Umwandler ab
    .filter(({ r }) => r.zuAbschlaege.length === 0 && !r.summen.vorausbezahlt && !r.summen.rundung && r.waehrung === "EUR" && r.positionen.length > 0);

  it("findet mindestens fünf geeignete offizielle Beispiele", () => {
    expect(geeignet.length).toBeGreaterThanOrEqual(5);
  });

  for (const { f, r } of geeignet) {
    it(`${f}: Netto, Steuer und Brutto bleiben gleich`, () => {
      const d = ausERechnung(r);
      const s = xrSummen(d);
      expect(s.summeNetto).toBeCloseTo(r.summen.netto, 2);
      expect(s.summeSteuer).toBeCloseTo(r.summen.steuer, 2);
      expect(s.brutto).toBeCloseTo(r.summen.brutto, 2);
      // und die neu gebaute XRechnung trägt dieselben Summen
      const neu = leseERechnung(baueXRechnung({ ...d, zahlungsziel: Number.isNaN(d.zahlungsziel) ? 0 : d.zahlungsziel }));
      expect(neu.summen.brutto).toBeCloseTo(r.summen.brutto, 2);
      expect(neu.positionen.length).toBe(r.positionen.length);
    });
  }
});

describe("Werte aus dem PDF-Text", () => {
  it("liest Beträge deutsch und englisch, mit Währung und Minus", () => {
    expect(geldWert("1.234,56")).toBe(1234.56);
    expect(geldWert("1.234,56€")).toBe(1234.56);
    expect(geldWert("-50,00")).toBe(-50);
    expect(geldWert("1,234.56")).toBe(1234.56);
    expect(geldWert("85.00")).toBe(85);
    expect(geldWert("1.200")).toBeNull();
    expect(geldWert("2026")).toBeNull();
    expect(betraege("Gesamtbetrag  1.782,03 €")).toEqual([1782.03]);
    expect(betraege("zzgl. 19 % USt  € 284,53")).toEqual([284.53]);
  });

  it("liest Datumsangaben in den üblichen Schreibweisen", () => {
    expect(daten("Rechnungsdatum: 08.10.2026")).toEqual(["2026-10-08"]);
    expect(daten("Berlin, 8. Oktober 2026")).toEqual(["2026-10-08"]);
    expect(daten("Zeitraum 01.10.26 – 31.10.26")).toEqual(["2026-10-01", "2026-10-31"]);
    expect(daten("31.02.2026")).toEqual([]);
  });

  it("liest Positionszeilen mit Menge, Einheit, Einzelpreis und Gesamt", () => {
    expect(leseZeileAlsPosition("1  Webdesign Startseite  1 Stk  1.200,00 €  1.200,00 €")).toMatchObject({ beschreibung: "Webdesign Startseite", menge: 1, einzelpreisNetto: 1200, einheit: "C62" });
    expect(leseZeileAlsPosition("2  Pflege-Stunden  3,5 Std  85,00 €  297,50 €")).toMatchObject({ beschreibung: "Pflege-Stunden", menge: 3.5, einzelpreisNetto: 85, einheit: "HUR" });
    expect(leseZeileAlsPosition("3 Fachbuch 24,99 49,98")).toMatchObject({ beschreibung: "Fachbuch", menge: 2, einzelpreisNetto: 24.99 });
    expect(leseZeileAlsPosition("iPhone 15  1 Stk  799,00  799,00")).toMatchObject({ beschreibung: "iPhone 15", menge: 1, einzelpreisNetto: 799 });
    expect(leseZeileAlsPosition("Wartung 2026  1.200,00")).toMatchObject({ beschreibung: "Wartung 2026", menge: 1, einzelpreisNetto: 1200 });
    expect(leseZeileAlsPosition("Treuerabatt  -50,00")).toMatchObject({ beschreibung: "Treuerabatt", menge: 1, einzelpreisNetto: -50 });
    expect(leseZeileAlsPosition("Beratung  2,00  Std  60,00  19 %  120,00")).toMatchObject({ menge: 2, einzelpreisNetto: 60, ustSatz: 19, einheit: "HUR" });
  });

  it("nimmt Summen- und Bankzeilen nicht als Position", () => {
    expect(leseZeileAlsPosition("Nettobetrag  1.497,50 €")).toBeNull();
    expect(leseZeileAlsPosition("zzgl. 19 % USt  284,53 €")).toBeNull();
    expect(leseZeileAlsPosition("IBAN DE02 1203 0000 0000 2020 51")).toBeNull();
  });

  it("erkennt ZUGFeRD-Profile nach UStAE 14.1 Abs. 14 (MINIMUM und BASIC-WL sind keine E-Rechnung)", () => {
    expect(profilAus("urn:factur-x.eu:1p0:minimum").eRechnung).toBe(false);
    expect(profilAus("urn:factur-x.eu:1p0:basicwl").eRechnung).toBe(false);
    expect(profilAus("urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic").eRechnung).toBe(true);
    expect(profilAus("urn:cen.eu:en16931:2017").eRechnung).toBe(true);
    expect(profilAus("urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0").eRechnung).toBe(true);
  });
});

const WORD_RECHNUNG = `
Muster Webdesign · Hauptstraße 1 · 10115 Berlin                    Muster Webdesign
Kunde GmbH                                                         Hauptstraße 1
Marktplatz 5                                                       10115 Berlin
80331 München                                                      Tel. +49 30 1234567
                                                                   rechnung@muster.example
                                                                   Ansprechpartner: Erika Muster
Rechnung Nr. RE-2026-042                                           Rechnungsdatum: 08.10.2026
                                                                   Leistungsdatum: 01.10.2026
Pos  Beschreibung                Menge      Einzelpreis      Gesamt
1    Webdesign Startseite        1 Stk      1.200,00 €       1.200,00 €
2    Pflege-Stunden              3,5 Std    85,00 €          297,50 €
                                            Nettobetrag      1.497,50 €
                                            zzgl. 19 % USt   284,53 €
                                            Gesamtbetrag     1.782,03 €
Zahlbar innerhalb von 14 Tagen ohne Abzug.
Muster Webdesign Erika Muster     IBAN DE02 1203 0000 0000 2020 51     USt-IdNr. DE123456789
Hauptstraße 1, 10115 Berlin       BIC BYLADEM1001                      Steuernummer 27/123/45678
`;

describe("Typische PDF-Rechnungen", () => {
  it("Word-Rechnung mit Absenderzeile: alle Felder, Positionen und Summen", () => {
    const v = lesePdfRechnung(zeilenAusText(WORD_RECHNUNG));
    const d = v.daten;
    expect(d.rechnungsnummer).toBe("RE-2026-042");
    expect(d.rechnungsdatum).toBe("2026-10-08");
    expect(d.leistungsdatum).toBe("2026-10-01");
    expect(d.zahlungsziel).toBe(14);
    expect(d.verkaeufer).toMatchObject({ name: "Muster Webdesign", strasse: "Hauptstraße 1", plzOrt: "10115 Berlin", ustId: "DE123456789", steuernummer: "27/123/45678", bic: "BYLADEM1001", email: "rechnung@muster.example", telefon: "+49 30 1234567", kontaktName: "Erika Muster" });
    expect(d.verkaeufer.iban.replace(/\s/g, "")).toBe("DE02120300000000202051");
    expect(d.kunde).toMatchObject({ name: "Kunde GmbH", strasse: "Marktplatz 5", plzOrt: "80331 München" });
    expect(d.positionen).toHaveLength(2);
    expect(d.positionen.map((p) => p.ustSatz)).toEqual([19, 19]);
    expect(v.summen).toMatchObject({ netto: 1497.5, ust: 284.53, brutto: 1782.03 });
    const a = summenAbgleich(d, v.summen);
    expect(a.geprueft).toBe(true);
    expect(a.ok).toBe(true);
    // Nur die Käufer-E-Mail fehlt (steht auf Papierrechnungen fast nie)
    expect(xrFehlend(d)).toEqual(["E-Mail des Kunden (elektronische Adresse)"]);
  });

  it("zwei Steuersätze, Leistungszeitraum, Skonto und Bestellnummer", () => {
    const text = `
Buchladen Erika Muster e.K. | Bahnhofstr. 7 | 50667 Köln
Schule am Park
Verwaltung
Parkweg 3
50667 Köln
Rechnung RE-77/2026
Datum: 12.11.2026
Ihre Bestellnummer: B-2026-118
Leistungszeitraum: 01.10.2026 - 31.10.2026
Pos.  Artikel                     Anzahl   Preis     USt    Betrag
1     Lehrbuch Mathematik 7         20 Stk   18,69     7 %    373,80
2     Einbandservice                20 Stk   2,50      19 %   50,00
Summe netto                                                    423,80
USt 7 % auf 373,80                                             26,17
USt 19 % auf 50,00                                             9,50
Rechnungsbetrag                                                459,47
Zahlbar bis 26.11.2026. Bei Zahlung bis 19.11.2026 gewähren wir 2 % Skonto.
Kreissparkasse Köln  IBAN DE89 3704 0044 0532 0130 00  Steuernr. 214/5678/1234  info@buchladen-muster.example  Telefon 0221 123456
`;
    const v = lesePdfRechnung(zeilenAusText(text));
    const d = v.daten;
    expect(d.rechnungsnummer).toBe("RE-77/2026");
    expect(d.rechnungsdatum).toBe("2026-11-12");
    expect(d.leistungszeitraum).toEqual({ von: "2026-10-01", bis: "2026-10-31" });
    expect(d.leistungsdatum).toBe("");
    expect(d.zahlungsziel).toBe(14);
    expect(d.zahlungsbedingungen).toContain("2 % Skonto");
    expect(d.kaeuferReferenz).toBe("B-2026-118");
    expect(d.verkaeufer).toMatchObject({ name: "Buchladen Erika Muster e.K.", strasse: "Bahnhofstr. 7", plzOrt: "50667 Köln", steuernummer: "214/5678/1234" });
    expect(d.kunde.name).toBe("Schule am Park");
    expect(d.kunde.plzOrt).toBe("50667 Köln");
    expect(d.positionen.map((p) => [p.menge, p.einzelpreisNetto, p.ustSatz])).toEqual([[20, 18.69, 7], [20, 2.5, 19]]);
    expect(v.summen).toMatchObject({ netto: 423.8, ust: 35.67, brutto: 459.47 });
    expect(summenAbgleich(d, v.summen).ok).toBe(true);
  });

  it("Kleinunternehmer nach § 19 UStG ohne Steuerausweis", () => {
    const text = `
Max Muster Fotografie, Lindenallee 2, 04109 Leipzig
Agentur Blau GmbH
Ringstraße 10
04103 Leipzig
Rechnung Nr. 2026-015                         Datum 03.11.2026
Leistungsdatum entspricht Rechnungsdatum.
Beschreibung                       Menge    Einzelpreis    Gesamt
Fotoshooting Produktbilder         4 Std    95,00          380,00
Bildbearbeitung                    12 Stk   8,50           102,00
Gesamtbetrag                                                482,00
Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
Zahlbar sofort ohne Abzug.  IBAN DE75 5121 0800 1245 1261 99  max@muster-foto.example
`;
    const v = lesePdfRechnung(zeilenAusText(text));
    const d = v.daten;
    expect(d.modus).toBe("kleinunternehmer");
    expect(d.leistungsdatum).toBe("2026-11-03");
    expect(d.zahlungsziel).toBe(0);
    expect(d.verkaeufer).toMatchObject({ name: "Max Muster Fotografie", strasse: "Lindenallee 2", plzOrt: "04109 Leipzig" });
    expect(d.positionen.map((p) => [p.menge, p.einheit, p.ustSatz])).toEqual([[4, "HUR", 0], [12, "C62", 0]]);
    expect(v.summen.brutto).toBe(482);
    const a = summenAbgleich(d, v.summen);
    expect(a.ok).toBe(true);
    expect(baueXRechnung({ ...d, kunde: { ...d.kunde, email: "buchhaltung@blau.example" } })).toContain("<ram:CategoryCode>E</ram:CategoryCode>");
  });

  it("Bruttopreise werden in Netto umgerechnet und gegen das PDF abgeglichen", () => {
    const text = `
Rechnung Nr. 4711                                  Datum: 02.11.2026
Artikel                     Menge   Einzelpreis   Gesamt
Kaffeemaschine              1       119,00        119,00
Entkalker                   2       11,90         23,80
Gesamtbetrag (brutto)                                142,80
enthaltene MwSt. 19 %                                 22,80
Nettobetrag                                          120,00
`;
    const v = lesePdfRechnung(zeilenAusText(text));
    expect(v.bruttopreise).toBe(true);
    expect(v.daten.positionen.map((p) => p.einzelpreisNetto)).toEqual([100, 10]);
    expect(summenAbgleich(v.daten, v.summen).ok).toBe(true);
  });

  it("blockiert, wenn die Positionen nicht zum PDF passen", () => {
    const v = lesePdfRechnung(zeilenAusText(WORD_RECHNUNG));
    const falsch = { ...v.daten, positionen: v.daten.positionen.slice(0, 1) };
    const a = summenAbgleich(falsch, v.summen);
    expect(a.ok).toBe(false);
    expect(a.punkte.find((p) => p.name === "Brutto")).toMatchObject({ pdf: 1782.03, xml: 1428, ok: false });
  });

  it("Reverse Charge (§ 13b UStG) wird erkannt", () => {
    const text = `
Muster Bau GmbH · Werkstraße 4 · 28195 Bremen
Hoch & Tief GmbH
Kaiserallee 1
76133 Karlsruhe
Rechnung Nr. RC-2026-9                 Datum: 10.11.2026
Leistung                       Menge   Einzelpreis   Gesamt
Trockenbauarbeiten Halle 2     1       8.400,00      8.400,00
Nettobetrag                                           8.400,00
Steuerschuldnerschaft des Leistungsempfängers (§ 13b UStG).
Ihre USt-IdNr. DE811907980        Unsere USt-IdNr. DE123456789
`;
    const v = lesePdfRechnung(zeilenAusText(text));
    expect(v.daten.modus).toBe("reverse-charge");
    expect(v.daten.kunde.ustId).toBe("DE811907980");
    expect(v.daten.verkaeufer.ustId).toBe("DE123456789");
    expect(v.daten.positionen[0]).toMatchObject({ menge: 1, einzelpreisNetto: 8400, ustSatz: 0 });
  });
});
