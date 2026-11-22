import { describe, expect, it } from "vitest";
import {
  MODELL_OPTIONEN, PHASE_OPTIONEN, RECHTSFORM_OPTIONEN, SCHRITTE_AENDERN, SCHRITTE_NEU,
  einstieg, fehlerIn, rechtsformOption, type OnbDaten,
} from "@/lib/onboarding";
import { fahrplan, modelleVon, phaseVon, rechtsformVon } from "@/lib/startplan";

const LEER: OnbDaten = { firstName: "", lastName: "", modelle: [], phase: "", rechtsform: "" };
const VOLL: OnbDaten = { firstName: "Mara", lastName: "Beispiel", modelle: ["saas"], phase: "planning", rechtsform: "ug" };

describe("Onboarding-Optionen passen zum Fahrplan", () => {
  it("jedes Geschäftsmodell und jede Phase wird vom Fahrplan erkannt", () => {
    for (const m of MODELL_OPTIONEN) expect(modelleVon(m.id), m.id).toEqual([m.id]);
    for (const p of PHASE_OPTIONEN) expect(phaseVon(p.id), p.id).toBe(p.id);
  });

  it("jede Rechtsform außer „Noch offen“ wird erkannt", () => {
    for (const r of RECHTSFORM_OPTIONEN) {
      if (r.id === "unsure") expect(rechtsformVon(r.id)).toBeNull();
      else expect(rechtsformVon(r.id), r.id).toBe(r.id);
    }
  });

  it("jede Antwort-Kombination ergibt einen Fahrplan", () => {
    for (const m of MODELL_OPTIONEN) for (const p of PHASE_OPTIONEN) for (const r of RECHTSFORM_OPTIONEN) {
      expect(fahrplan({ business_model: m.id, founder_stage: p.id, legal_form: r.id }).length).toBeGreaterThanOrEqual(4);
    }
  });

  it("keine doppelten Kennungen", () => {
    for (const liste of [MODELL_OPTIONEN, PHASE_OPTIONEN, RECHTSFORM_OPTIONEN]) {
      expect(new Set(liste.map((o) => o.id)).size).toBe(liste.length);
    }
  });
});

describe("Prüfung je Schritt", () => {
  it("Name braucht Vor- und Nachnamen", () => {
    expect(fehlerIn("name", LEER)).toMatch(/Vornamen/);
    expect(fehlerIn("name", { ...LEER, firstName: "Mara" })).toMatch(/Nachnamen/);
    expect(fehlerIn("name", { ...LEER, firstName: "  ", lastName: "x" })).toMatch(/Vornamen/);
    expect(fehlerIn("name", VOLL)).toBeNull();
  });
  it("Auswahl-Schritte brauchen eine Auswahl, die Stammdaten nicht", () => {
    expect(fehlerIn("modell", LEER)).toBeTruthy();
    expect(fehlerIn("phase", { ...LEER, phase: "quatsch" })).toBeTruthy();
    expect(fehlerIn("rechtsform", LEER)).toBeTruthy();
    expect(fehlerIn("details", LEER)).toBeNull();
    for (const s of SCHRITTE_NEU) expect(fehlerIn(s, VOLL), s).toBeNull();
  });
});

describe("Wiedereinstieg", () => {
  it("ohne gespeicherten Stand beim Namen", () => {
    expect(einstieg(LEER, 0)).toBe("name");
    expect(einstieg(VOLL, null)).toBe("name");
  });
  it("setzt beim gespeicherten Schritt fort", () => {
    expect(einstieg(VOLL, 2)).toBe("phase");
    expect(einstieg(VOLL, 4)).toBe("details");
    expect(einstieg(VOLL, 99)).toBe("details");
  });
  it("springt nie hinter eine offene Frage", () => {
    expect(einstieg({ ...VOLL, modelle: [] }, 4)).toBe("modell");
    expect(einstieg({ ...VOLL, lastName: "" }, 3)).toBe("name");
  });
  it("Ändern fragt nur, was den Fahrplan steuert", () => {
    expect(SCHRITTE_AENDERN).toEqual(["modell", "phase", "rechtsform"]);
  });
});

describe("Rechtsform aus dem Profil", () => {
  it("Kennung und freier Text landen auf der passenden Option", () => {
    expect(rechtsformOption("ug")).toBe("ug");
    expect(rechtsformOption("UG (haftungsbeschränkt)")).toBe("ug");
    expect(rechtsformOption("Einzelunternehmer")).toBe("einzelunternehmen");
    expect(rechtsformOption("unsure")).toBe("unsure");
    expect(rechtsformOption(null)).toBe("");
  });
  it("Unbekanntes bleibt als Text erhalten", () => {
    expect(rechtsformOption("AG")).toBe("AG");
  });
});
