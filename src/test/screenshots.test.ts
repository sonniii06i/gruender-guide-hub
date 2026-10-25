import { describe, expect, it } from "vitest";
import { existsSync } from "fs";
import { resolve } from "path";
import { SCREENS, TOOL_SCREEN, KATEGORIE_SCREEN } from "@/data/screenshots";
import { ZIELGRUPPEN } from "@/data/zielgruppen";

// Jede Bildangabe muss auf eine echte Datei in public/ zeigen – sonst zeigt der
// Rahmen auf der Live-Seite ein kaputtes Bild (Prerender merkt das nicht).
const pub = (p: string) => resolve(__dirname, "../../public", p.replace(/^\//, ""));

describe("App-Screenshots", () => {
  for (const [key, s] of Object.entries(SCREENS)) {
    it(`${key}: Dateien vorhanden, Maße und Alt-Text gesetzt`, () => {
      expect(existsSync(pub(s.gross)), s.gross).toBe(true);
      expect(existsSync(pub(s.klein)), s.klein).toBe(true);
      expect(s.breite).toBeGreaterThan(0);
      expect(s.hoehe).toBeGreaterThan(0);
      expect(s.alt.length).toBeGreaterThan(20);
    });
  }
  it("Mappings zeigen auf bekannte Screenshots", () => {
    for (const k of [...Object.values(TOOL_SCREEN), ...Object.values(KATEGORIE_SCREEN), ...ZIELGRUPPEN.map((z) => z.screen)]) {
      expect(SCREENS[k], k).toBeDefined();
    }
  });
});
