/**
 * Vordruck GewA1: Jedes Feld, das der Wizard befüllt, muss im PDF existieren.
 * tryText/tryCheck schlucken fehlende Felder still, sonst fiele das nie auf.
 */
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";

const wizard = readFileSync("src/pages/GewerbeanmeldungWizard.tsx", "utf8");
const benutzt = [...wizard.matchAll(/try(?:Text|Check)\("([^"]+)"/g)].map((m) => m[1]);

describe("GewA1-Vordruck", () => {
  it("enthält alle Felder, die der Wizard befüllt", async () => {
    const pdf = await PDFDocument.load(readFileSync("public/forms/gewa1.pdf").toString("base64"));
    const vorhanden = new Set(pdf.getForm().getFields().map((f) => f.getName()));
    expect(benutzt.length).toBeGreaterThan(30);
    expect(benutzt.filter((n) => !vorhanden.has(n))).toEqual([]);
  });

  it("hat die Felder der geltenden Fassung und zwei Seiten", async () => {
    const pdf = await PDFDocument.load(readFileSync("public/forms/gewa1.pdf").toString("base64"));
    const form = pdf.getForm();
    expect(pdf.getPageCount()).toBe(2);
    expect(() => form.getCheckBox("f06_divers")).not.toThrow();
    expect(() => form.getCheckBox("f13_nicht_bekannt")).not.toThrow();
    expect(() => form.getTextField("f27_unfallversicherung")).not.toThrow();
  });
});
