import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { ibanGueltig, leseERechnung, pruefeERechnung } from "@/lib/eRechnungLesen";
import { baueXRechnung } from "@/lib/xrechnung";

// Offizielle KoSIT-Testsuite (XRechnung 3.0.2, 2026-08-31), Ordner „standard“.
const ordner = join(__dirname, "fixtures/xrechnung");
const dateien = readdirSync(ordner).filter((f) => f.endsWith(".xml"));

describe("E-Rechnung lesen – KoSIT-Testsuite", () => {
  it("enthält Beispiele", () => expect(dateien.length).toBeGreaterThan(10));
  it.each(dateien)("%s", (f) => {
    const r = leseERechnung(readFileSync(join(ordner, f), "utf8"));
    expect(r.nummer).not.toBe("");
    expect(r.verkaeufer.name).not.toBe("");
    expect(r.positionen.length).toBeGreaterThan(0);
    expect(r.summen.zahlbar).not.toBeNaN();
    // Die offiziellen Beispiele sind gültig – unsere Rechenprüfung darf nichts beanstanden.
    const fehler = pruefeERechnung(r).filter((p) => !p.ok && !p.text.startsWith("IBAN"));
    expect(fehler.map((p) => p.text)).toEqual([]);
  });
});

describe("E-Rechnung lesen – eigener Export", () => {
  it("liest die eigene XRechnung zurück", () => {
    const xml = baueXRechnung({
      verkaeufer: { name: "A", strasse: "S 1", plzOrt: "10115 Berlin", steuernummer: "", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "", email: "a@b.de", telefon: "1", kontaktName: "A" },
      kunde: { name: "K", strasse: "M", plzOrt: "80331 München", land: "DE", ustId: "", email: "k@b.de" },
      kaeuferReferenz: "PO-1", rechnungsnummer: "RE-9", rechnungsdatum: "2026-10-08", leistungsdatum: "2026-10-01", zahlungsziel: 14, modus: "standard",
      positionen: [{ beschreibung: "X", menge: 2, einzelpreisNetto: 50, ustSatz: 19 }],
    });
    const r = leseERechnung(xml);
    expect(r.nummer).toBe("RE-9");
    expect(r.summen.zahlbar).toBe(119);
    expect(r.faellig).toBe("2026-10-22");
    expect(r.kaeuferReferenz).toBe("PO-1");
    expect(pruefeERechnung(r).every((p) => p.ok)).toBe(true);
  });
  it("lehnt Nicht-XML und fremde Formate verständlich ab", () => {
    expect(() => leseERechnung("kein xml")).toThrow(/kein gültiges XML/);
    expect(() => leseERechnung("<foo/>")).toThrow(/Unbekanntes Format/);
  });
  it("IBAN-Prüfziffer", () => {
    expect(ibanGueltig("DE02 1203 0000 0000 2020 51")).toBe(true);
    expect(ibanGueltig("DE02120300000000202052")).toBe(false);
  });
});
