import { describe, expect, it } from "vitest";
import { ankerId, textBloecke } from "./ratgeberText";

describe("textBloecke", () => {
  it("trennt Absätze an Leerzeilen und fasst Zeilenumbrüche zusammen", () => {
    const b = textBloecke("Erster Satz.\nZweiter Satz.\n\nNeuer Absatz.");
    expect(b).toEqual([
      { art: "absatz", text: "Erster Satz. Zweiter Satz." },
      { art: "absatz", text: "Neuer Absatz." },
    ]);
  });

  it("macht aus „- “-Zeilen eine Liste, auch mitten im Absatz", () => {
    const b = textBloecke("Das muss rein:\n- Name\n- Sitz\nUnd danach weiter.");
    expect(b).toEqual([
      { art: "absatz", text: "Das muss rein:" },
      { art: "liste", zeilen: ["Name", "Sitz"] },
      { art: "absatz", text: "Und danach weiter." },
    ]);
  });

  it("ignoriert leere Eingaben", () => {
    expect(textBloecke("")).toEqual([]);
    expect(textBloecke("\n\n  \n")).toEqual([]);
  });
});

describe("ankerId", () => {
  it("bildet stabile Anker mit Umlauten", () => {
    expect(ankerId("Was muss in einen GbR-Vertrag?")).toBe("was-muss-in-einen-gbr-vertrag");
    expect(ankerId("Kündigung & Abfindung")).toBe("kuendigung-abfindung");
  });
});
