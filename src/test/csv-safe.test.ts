import { describe, expect, it } from "vitest";
import { csvCell, neutralizeCsvFormula } from "@/lib/csvSafe";

describe("CSV-Formel-Injektion", () => {
  it("entschaerft Formel-Anfaenge", () => {
    expect(neutralizeCsvFormula('=HYPERLINK("http://x","y")')).toBe(`'=HYPERLINK("http://x","y")`);
    expect(neutralizeCsvFormula("+cmd|' /C calc'!A0")).toBe("'+cmd|' /C calc'!A0");
    expect(neutralizeCsvFormula("@SUM(A1)")).toBe("'@SUM(A1)");
    expect(neutralizeCsvFormula("-2+3")).toBe("'-2+3");
    expect(neutralizeCsvFormula("\t=1")).toBe("'\t=1");
  });

  it("laesst Zahlen und normale Texte unveraendert", () => {
    expect(neutralizeCsvFormula("-12,50")).toBe("-12,50");
    expect(neutralizeCsvFormula("+3.5")).toBe("+3.5");
    expect(neutralizeCsvFormula("Muster GmbH")).toBe("Muster GmbH");
    expect(neutralizeCsvFormula(null)).toBe("");
  });

  it("csvCell quotet und verdoppelt Anfuehrungszeichen", () => {
    expect(csvCell('Er sagte "hi"')).toBe('"Er sagte ""hi"""');
    expect(csvCell("=1+1")).toBe(`"'=1+1"`);
  });
});
