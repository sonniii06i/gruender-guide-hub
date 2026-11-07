import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import { elsterEmpfehlung, elsterZugangConfig, STICK_PREIS } from "@/lib/freetools/elster-zugang";

// ELSTER-Zertifikat beantragen (07.11.2026). Sollwerte aus der ELSTER-Hilfe
// „Registrierung“ und dem ELSTER-FAQ (beide 07.11.2026 live gelesen), der
// Klickanleitung des LfSt Rheinland-Pfalz (Stand 09/2025) und dem
// Zertifikatsleitfaden Mein Unternehmenskonto (12/2024).
describe("ELSTER-Kontotyp nach ELSTER-Hilfe", () => {
  it("Einzelunternehmer ohne Angestellte → Privatperson mit IdNr (ELSTER-Hilfe, Kontotypen)", () => {
    const e = elsterEmpfehlung({ wer: "solo", idnr: "ja" });
    expect(e.kontotyp).toBe("privatperson");
    expect(e.merkmal).toBe("steuerliche Identifikationsnummer");
    expect(e.gruende.join(" ")).toContain("keine Angestellten beschäftigen");
  });

  it("Nebengewerbe ohne Steuernummer braucht keinen Umweg: IdNr reicht für den Fragebogen", () => {
    const e = elsterEmpfehlung({ wer: "solo", idnr: "ja", stnr: "nein" });
    expect(e.kontotyp).toBe("privatperson");
    expect(e.spaeter).toBeUndefined();
  });

  it("GmbH mit Steuernummer → Organisation, Brief an die Finanzamts-Adresse", () => {
    const e = elsterEmpfehlung({ wer: "gesellschaft", stnr: "ja" });
    expect(e.kontotyp).toBe("organisation");
    expect(e.merkmal).toBe("Steuernummer der Organisation");
    expect(e.identitaet).toBe("brief");
    expect(e.dauer).toContain("5 Werktage");
    expect(e.dauer).toContain("Finanzamt");
    expect(e.hinweise.join(" ")).toContain("keine Bescheinigungen");
  });

  it("Organisation bekommt keine Online-Identitätsprüfung versprochen, auch wenn es eilt", () => {
    const e = elsterEmpfehlung({ wer: "gesellschaft", stnr: "ja", tempo: "sofort", ausweis: "ja" });
    expect(e.identitaet).toBe("brief");
  });

  it("Gesellschaft ohne Steuernummer → Registrierung nur mit E-Mail, nur Fragebogen, nur Zertifikatsdatei, kein Brief", () => {
    const e = elsterEmpfehlung({ wer: "gesellschaft", stnr: "nein", geraet: "handy" });
    expect(e.kontotyp).toBe("email");
    expect(e.login).toBe("Zertifikatsdatei");
    expect(e.identitaet).toBe("email");
    expect(e.gruende.join(" ")).toContain("Fragebogen zur steuerlichen Erfassung");
    expect(e.spaeter).toContain("Identifikation mit Steuernummer");
  });

  it("Einzelunternehmer mit Angestellten: mit Steuernummer Organisation (ELStAM), ohne zuerst Privatperson", () => {
    expect(elsterEmpfehlung({ wer: "solo_ma", stnr: "ja" }).kontotyp).toBe("organisation");
    const e = elsterEmpfehlung({ wer: "solo_ma", stnr: "nein", idnr: "ja" });
    expect(e.kontotyp).toBe("privatperson");
    expect(e.spaeter).toContain("Für eine Organisation");
  });

  it("ohne IdNr und ohne Steuernummer → E-Mail-Registrierung plus Hinweis auf identifikationsmerkmal.de", () => {
    const e = elsterEmpfehlung({ wer: "solo", idnr: "nein" });
    expect(e.kontotyp).toBe("email");
    expect(e.hinweise.join(" ")).toContain("identifikationsmerkmal.de");
  });
});

describe("Login-Option und Identitätsprüfung", () => {
  it("Smartphone → ElsterSecure (ohne Zertifikat), PC → Zertifikatsdatei (3 Jahre)", () => {
    expect(elsterEmpfehlung({ wer: "solo", geraet: "handy" }).login).toBe("ElsterSecure");
    expect(elsterEmpfehlung({ wer: "solo", geraet: "beides" }).login).toBe("ElsterSecure");
    const pc = elsterEmpfehlung({ wer: "solo", geraet: "pc" });
    expect(pc.login).toBe("Zertifikatsdatei");
    expect(pc.hinweise.join(" ")).toContain("3 Jahre");
  });

  it("Sicherheitsstick nur auf Wunsch, mit belegtem Preis", () => {
    const e = elsterEmpfehlung({ wer: "solo", geraet: "handy", stick: true });
    expect(e.login).toBe("Sicherheitsstick");
    expect(e.hinweise.join(" ")).toContain(STICK_PREIS);
    expect(STICK_PREIS).toBe("61,42 € inkl. MwSt.");
  });

  it("eilig + Personalausweis → online am selben Tag; ohne Ausweis → Brief mit Hinweis", () => {
    const online = elsterEmpfehlung({ wer: "privat", tempo: "sofort", ausweis: "ja" });
    expect(online.identitaet).toBe("online");
    expect(online.dauer).toContain("selben Tag");
    const brief = elsterEmpfehlung({ wer: "privat", tempo: "sofort", ausweis: "nein" });
    expect(brief.identitaet).toBe("brief");
    expect(brief.hinweise.join(" ")).toContain("Online-Identitätsprüfung");
  });
});

describe("ELSTER-Zugangs-Fahrplan (Text)", () => {
  const gen = FREE_TOOL_BY_SLUG["elster-zertifikat-beantragen"].generate;

  it("Neuregistrierung Solo: Schritte, Fragebogen-Frist (§ 138 AO) und interne Links", () => {
    const t = gen({ situation: "neu", wer: "solo", idnr: "ja", geraet: "handy" });
    expect(t).not.toContain("Zugangserneuerung statt Neuregistrierung");
    expect(t).toContain("Schritt 1:");
    expect(t).toContain("QR-Code");
    expect(t).toContain("§ 138 Abs. 1b und Abs. 4 AO");
    expect(t).toContain("/tools/fse-wizard");
    expect(t).toContain("/ust-id-beantragen");
    expect(t).toContain("portal@elster.de");
  });

  it("Zertifikatsdatei: Passwortregel 10–128, nicht öffnen, zweiter Schritt Login", () => {
    const t = gen({ situation: "neu", wer: "solo", geraet: "pc" });
    expect(t).toContain("10 bis 128 Zeichen");
    expect(t).toContain("Nicht per Doppelklick öffnen");
    expect(t).toContain("Erster Login mit Zertifikatsdatei");
  });

  it("verloren / abgelaufen / Passwort → Zugangserneuerung mit Fehlercode 080005207", () => {
    for (const situation of ["verloren", "abgelaufen", "passwort"]) {
      const t = gen({ situation, wer: "solo" });
      expect(t).toContain("Zugangserneuerung statt Neuregistrierung");
      expect(t).toContain("080005207");
    }
    expect(gen({ situation: "abgelaufen", wer: "solo" })).toContain("3 Jahre");
    expect(gen({ situation: "verloren", wer: "solo" })).toContain("sperren");
  });

  it("Brief-Weg nennt Aktivierungsseite und Frist der Aktivierungsdaten", () => {
    const t = gen({ situation: "neu", wer: "gesellschaft", stnr: "ja", geraet: "pc" });
    expect(t).toContain("elster.de/eportal/aktivierung");
    expect(t).toContain("genannte Frist");
    expect(t).toContain("Mein Unternehmenskonto");
  });

  it("nur private Steuererklärung → kein Fragebogen-To-do", () => {
    const t = gen({ situation: "neu", wer: "privat" });
    expect(t).not.toContain("/tools/fse-wizard");
    expect(t).toContain("Bescheinigungen abrufen");
  });

  it("trägt Quellenblock mit Stand und Haftungshinweis", () => {
    const t = gen({ wer: "solo" });
    expect(t).toContain("Quellen (Stand 07.11.2026)");
    expect(t).toContain("ersetzt keine");
  });
});

describe("Gate-Vorgaben des Tools-Agenten (statisch)", () => {
  const c = elsterZugangConfig;
  it("Title 30–65 Zeichen mit Keyword, H1 mit Keyword", () => {
    expect(c.seo.title.length).toBeGreaterThanOrEqual(30);
    expect(c.seo.title.length).toBeLessThanOrEqual(65);
    for (const kw of ["ELSTER", "Zertifikat", "beantragen"]) {
      expect(c.seo.title).toContain(kw);
      expect(c.heroTitle).toContain(kw);
    }
  });
  it("≥ 600 Wörter Erklärtext, ≥ 3 FAQ, ≥ 5 interne Links, Quellen mit Stand", () => {
    const worte = (c.seoSections ?? []).flatMap((x) => x.body).join(" ").split(/\s+/).length;
    expect(worte).toBeGreaterThanOrEqual(600);
    expect(c.seo.faqs.length).toBeGreaterThanOrEqual(3);
    expect((c.links ?? []).length).toBeGreaterThanOrEqual(5);
    expect((c.quellen ?? []).length).toBeGreaterThanOrEqual(5);
    expect(c.stand).toBe("07.11.2026");
    expect(c.format).toBe("anleitung");
  });
  it("Route, Sitemap und Footer kennen den Slug", () => {
    const root = resolve(__dirname, "../..");
    expect(readFileSync(resolve(root, "src/App.tsx"), "utf8")).toContain(`slug="${c.slug}"`);
    expect(readFileSync(resolve(root, "scripts/generate-sitemap.ts"), "utf8")).toContain(`"/${c.slug}"`);
    expect(readFileSync(resolve(root, "src/components/landing/Footer.tsx"), "utf8")).toContain(`/${c.slug}`);
  });
});
