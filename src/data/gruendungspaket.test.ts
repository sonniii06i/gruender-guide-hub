// Gründungspaket 2026 (26.10.2026): Produktseite, Paketinhalt und gebaute ZIP
// dürfen nicht auseinanderlaufen; jede Quelle ist amtlich; die Texte des
// Pakets landen nie im Frontend-Bundle.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PAKET_DOKUMENTE, PAKET_QUELLEN, PAKET_STAND } from "./gruendungspaket";
import { DOKUMENTE, QUELLEN, RECHNUNGEN, STAND } from "../../scripts/gruendungspaket/inhalt.mjs";
import { PAKET_DATEIEN } from "../../supabase/functions/_shared/gruendungspaketZip";
import { PAKET_PREIS_CENT, ZUSTIMMUNG_TEXT, KENNTNIS_TEXT } from "../../supabase/functions/_shared/gruendungspaketTexte";

const AMTLICH = /^https:\/\/(www\.)?(gesetze-im-internet\.de|bundesfinanzministerium\.de|elster\.de|bzst\.de)\//;

describe("Gründungspaket", () => {
  it("Seite und Paket nennen dieselben Dokumente, Titel und Formate", () => {
    expect(PAKET_DOKUMENTE.map((d) => [d.datei, d.titel, d.formate])).toEqual(
      DOKUMENTE.map((d: { datei: string; titel: string; formate: string[] }) => [d.datei, d.titel, d.formate]),
    );
    expect(PAKET_STAND).toBe(STAND);
  });

  it("die gebaute ZIP enthält genau diese Dateien (sonst: node scripts/gruendungspaket/bauen.mjs)", () => {
    const soll = DOKUMENTE.flatMap((d: { datei: string; formate: string[] }) => d.formate.map((f) => `${d.datei}.${f}`));
    expect(PAKET_DATEIEN).toEqual(soll);
  });

  it("jede Quelle ist amtlich und auf der Seite gelistet", () => {
    const seite = new Set(PAKET_QUELLEN.map((q) => q.url));
    for (const q of Object.values(QUELLEN) as Array<{ url: string }>) {
      expect(q.url).toMatch(AMTLICH);
      expect(seite.has(q.url)).toBe(true);
    }
    for (const q of PAKET_QUELLEN) expect(q.url).toMatch(AMTLICH);
  });

  it("jeder Block mit Rechtsaussage verweist auf vorhandene Quellen", () => {
    for (const d of DOKUMENTE as Array<{ bloecke?: Array<{ typ: string; ids?: string[] }> }>) {
      for (const b of d.bloecke ?? []) if (b.typ === "quelle") for (const id of b.ids ?? []) expect(QUELLEN).toHaveProperty(id);
    }
    for (const r of Object.values(RECHNUNGEN) as Array<{ quellen: string[] }>) for (const id of r.quellen) expect(QUELLEN).toHaveProperty(id);
  });

  it("Preis 29 € und beide Widerrufserklärungen getrennt", () => {
    expect(PAKET_PREIS_CENT).toBe(2900);
    expect(ZUSTIMMUNG_TEXT).toMatch(/ausdrücklich zu/);
    expect(KENNTNIS_TEXT).toMatch(/Widerrufsrecht verliere/);
  });

  it("kein Frontend-Code importiert die Paket-Texte", () => {
    const treffer: string[] = [];
    const lauf = (dir: string) => {
      for (const n of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, n.name);
        if (n.isDirectory()) lauf(p);
        else if (/\.(ts|tsx)$/.test(n.name) && !n.name.endsWith(".test.ts")) {
          const s = fs.readFileSync(p, "utf8");
          if (/(from|import\()\s*["'][^"']*(gruendungspaket\/inhalt|gruendungspaketZip)/.test(s)) treffer.push(p);
        }
      }
    };
    lauf(path.resolve(__dirname, ".."));
    expect(treffer).toEqual([]);
  });
});
