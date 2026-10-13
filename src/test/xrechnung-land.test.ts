import { describe, it, expect } from "vitest";
import { baueXRechnung, xrWarnungen, type XrDaten } from "@/lib/xrechnung";

const d: XrDaten = {
  verkaeufer: { name: "A", strasse: "S 1", plzOrt: "10115 Berlin", steuernummer: "27/1/2", ustId: "DE123456789", iban: "DE02120300000000202051", bic: "", email: "a@b.de", telefon: "1", kontaktName: "A" },
  kunde: { name: "K", strasse: "M 5", plzOrt: "80331 München", land: "Deutschland", ustId: "", email: "k@b.de" },
  kaeuferReferenz: "",
  rechnungsnummer: "RE-1", rechnungsdatum: "2026-10-08", leistungsdatum: "2026-10-01", zahlungsziel: 14, modus: "standard",
  positionen: [{ beschreibung: "X", menge: 1, einzelpreisNetto: 100, ustSatz: 19 }],
};

const verkaeuferLand = (xml: string) =>
  xml.split("<ram:SellerTradeParty>")[1].split("</ram:SellerTradeParty>")[0].match(/<ram:CountryID>(\w+)<\/ram:CountryID>/)?.[1];

describe("XRechnung: Sitzland des Verkäufers", () => {
  it("ohne Angabe bleibt DE", () => {
    expect(verkaeuferLand(baueXRechnung(d))).toBe("DE");
  });

  it("übernimmt das angegebene Land (vorher fest DE)", () => {
    const xml = baueXRechnung({ ...d, verkaeufer: { ...d.verkaeufer, land: "Österreich", ustId: "ATU12345678" } });
    expect(verkaeuferLand(xml)).toBe("AT");
  });

  it("warnt, wenn USt-IdNr.-Präfix und Land nicht zusammenpassen", () => {
    expect(xrWarnungen(d)).toEqual([]);
    const w = xrWarnungen({ ...d, verkaeufer: { ...d.verkaeufer, land: "AT" } });
    expect(w.some((x) => x.includes("Verkäufers beginnt mit DE"))).toBe(true);
    expect(xrWarnungen({ ...d, kunde: { ...d.kunde, land: "Griechenland", ustId: "EL123456789" } })).toHaveLength(1); // GR fehlt in der Liste -> DE
    expect(xrWarnungen({ ...d, kunde: { ...d.kunde, land: "GR", ustId: "EL123456789" } })).toEqual([]);
  });
});
