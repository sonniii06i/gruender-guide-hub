import { describe, expect, it } from "vitest";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import { pruefeUstIdNr, ustIdBedarf } from "@/lib/freetools/ust-idnr";

// USt-IdNr beantragen (29.10.2026). Sollwerte der Prüfziffer: VIES-REST-API der
// EU-Kommission, abgefragt am 29.10.2026 (isValid true/false je Nummer).
describe("USt-IdNr-Prüfziffer gegen VIES", () => {
  const vies_gueltig = [
    "DE143454214", "DE129274202", "DE129273398", "DE260543043", "DE811115368",
    "FR40303265045", "FR03552081317",
    "IT00743110157", "IT00488410010",
  ];
  for (const n of vies_gueltig) {
    it(`${n} (VIES gültig) → Prüfziffer ok`, () => {
      const p = pruefeUstIdNr(n);
      expect(p.formatOk).toBe(true);
      expect(p.pruefziffer).toBe("ok");
    });
  }

  it("DE143454215 (VIES ungültig) → Prüfziffer falsch", () => {
    expect(pruefeUstIdNr("DE143454215").pruefziffer).toBe("falsch");
  });
  it("IT00743110158 (letzte Ziffer verändert) → Prüfziffer falsch", () => {
    expect(pruefeUstIdNr("IT00743110158").pruefziffer).toBe("falsch");
  });
  it("FR41303265045 (Schlüssel verändert) → Prüfziffer falsch", () => {
    expect(pruefeUstIdNr("FR41303265045").pruefziffer).toBe("falsch");
  });

  it("ES: nur Format, nie ein behauptetes Ergebnis (VIES: A28015865 gültig, B12345678 ungültig)", () => {
    for (const n of ["ESA28015865", "ESA08001851", "ESB12345678"]) {
      const p = pruefeUstIdNr(n);
      expect(p.formatOk).toBe(true);
      expect(p.pruefziffer).toBe("offen");
      expect(p.text).toContain("VIES");
    }
  });

  it("toleriert Leerzeichen, Punkte und Kleinbuchstaben", () => {
    expect(pruefeUstIdNr(" de 143 454 214 ").pruefziffer).toBe("ok");
  });

  it("falsches Format und fehlender Ländercode", () => {
    expect(pruefeUstIdNr("DE12345678").formatOk).toBe(false);
    expect(pruefeUstIdNr("IT0074311015").formatOk).toBe(false);
    expect(pruefeUstIdNr("143454214").land).toBeNull();
  });
});

describe("USt-IdNr-Fahrplan", () => {
  const gen = FREE_TOOL_BY_SLUG["ust-id-beantragen"].generate;

  it("Neugründung → Fragebogen, kein zweiter Antrag", () => {
    const t = gen({ stand: "neu", form: "eu" });
    expect(t).toContain("Fragebogen zur steuerlichen Erfassung");
    expect(t).toContain("kein zweiter Antrag");
    expect(t).toContain("ausschließlich per Post");
  });

  it("mit Steuernummer → BZSt-Online-Formular und Postanschrift Saarlouis", () => {
    const t = gen({ stand: "stnr", form: "kapital" });
    expect(t).toContain("formulare-bfinv.de/ffw/action/invoke.do?id=ustid");
    expect(t).toContain("66738 Saarlouis");
  });

  it("Kleinunternehmer mit EU-Werbung: Reverse Charge, keine ZM", () => {
    const t = gen({ stand: "stnr", ku: "ja", g_einkauf_leistung: true });
    expect(t).toContain("§ 13b Abs. 5 Satz 10 UStG");
    expect(t).toContain("§ 18a Abs. 4 UStG");
    expect(t).not.toContain("Zusammenfassende Meldung beim BZSt bis zum 25. Tag");
  });

  it("Regelbesteuerte EU-Lieferung → ZM-Pflicht", () => {
    expect(gen({ stand: "stnr", ku: "nein", g_lieferung_eu: true })).toContain("Zusammenfassende Meldung beim BZSt bis zum 25. Tag");
  });

  it("kein EU-Geschäft → nicht zwingend", () => {
    expect(ustIdBedarf({}).noetig).toBe(false);
    expect(gen({ stand: "stnr" })).toContain("aktuell nicht zwingend");
  });

  it("Prüfung erscheint nur bei Eingabe und trägt den Haftungshinweis", () => {
    expect(gen({ stand: "neu" })).not.toContain("Prüfung der eingegebenen");
    const t = gen({ stand: "neu", pruefen: "DE143454215" });
    expect(t).toContain("Tippfehler");
    expect(t).toContain("ersetzt keine");
  });
});
