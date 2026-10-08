import { describe, it, expect } from "vitest";
import { drittletzterBankarbeitstag, feiertage, fristenFuer, ostern, verschiebe, type FristProfil } from "@/lib/steuerFristen";

const basis: FristProfil = {
  rechtsform: "einzel", ust: "quartal", dauerfrist: false, ekVorauszahlung: true, gewstVorauszahlung: true,
  mitarbeiter: "keine", lohnsteuer: "monat", zm: "keine", steuerberater: false, gruendungsjahr: 2024,
};

describe("Feiertage und § 108 AO", () => {
  it("Ostern 2026 = 05.04., 2027 = 28.03.", () => {
    expect(ostern(2026).toISOString().slice(0, 10)).toBe("2026-04-05");
    expect(ostern(2027).toISOString().slice(0, 10)).toBe("2027-03-28");
    expect(feiertage(2027).has("2027-05-17")).toBe(true); // Pfingstmontag
  });
  it("verschiebt wie im Recherchebericht berechnet", () => {
    expect(verschiebe("2026-10-10")).toBe("2026-10-12");
    expect(verschiebe("2027-05-15")).toBe("2027-05-18");
    expect(verschiebe("2026-10-25")).toBe("2026-10-26");
    expect(verschiebe("2027-02-28")).toBe("2027-03-01");
    expect(verschiebe("2027-07-31")).toBe("2027-08-02");
    expect(verschiebe("2026-12-10")).toBe("2026-12-10");
  });
  it("SV-Termine 2026/2027 (drittletzter Bankarbeitstag)", () => {
    expect([1, 2, 3, 12].map((m) => drittletzterBankarbeitstag(2026, m))).toEqual(["2026-01-28", "2026-02-25", "2026-03-27", "2026-12-28"]);
    expect([3, 6].map((m) => drittletzterBankarbeitstag(2027, m))).toEqual(["2027-03-25", "2027-06-28"]);
  });
});

describe("Fristenkalender", () => {
  it("Quartalszahler: USt 3. Quartal 2026 am 12.10.2026, GewSt 16.11.2026, ESt 10.12.2026", () => {
    const f = fristenFuer(basis, "2026-10-08").fristen;
    expect(f.find((x) => x.titel.includes("3. Quartal 2026"))?.datum).toBe("2026-10-12");
    expect(f.find((x) => x.art === "gewst")?.datum).toBe("2026-11-16");
    expect(f.find((x) => x.art === "est")?.datum).toBe("2026-12-10");
  });
  it("Steuererklärung 2026 ohne Berater: 02.08.2027; mit Berater 2025: 01.03.2027", () => {
    expect(fristenFuer(basis, "2026-10-08").fristen.find((x) => x.titel.startsWith("Steuererklärungen 2026"))?.datum).toBe("2027-08-02");
    expect(fristenFuer({ ...basis, steuerberater: true }, "2026-10-08").fristen.find((x) => x.titel.startsWith("Steuererklärungen 2025"))?.datum).toBe("2027-03-01");
  });
  it("Freiberufler ohne GewSt, Kleinunternehmer ohne USt", () => {
    const f = fristenFuer({ ...basis, rechtsform: "freiberufler", ust: "kleinunternehmer" }, "2026-10-08").fristen;
    expect(f.some((x) => x.art === "gewst" || x.art === "ust")).toBe(false);
  });
  it("Neugründer 2026 muss 2027 monatlich anmelden", () => {
    const r = fristenFuer({ ...basis, gruendungsjahr: 2026 }, "2026-10-08", 15);
    expect(r.fristen.some((x) => x.titel === "USt-Voranmeldung Januar 2027")).toBe(true);
    expect(r.hinweise.some((h) => h.includes("Neugründer"))).toBe(true);
  });
  it("Dauerfristverlängerung verschiebt um einen Monat", () => {
    const f = fristenFuer({ ...basis, ust: "monat", dauerfrist: true }, "2026-10-08").fristen;
    expect(f.find((x) => x.titel === "USt-Voranmeldung September 2026")?.datum).toBe("2026-11-10");
  });
});
