import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { VORLAGEN, VORLAGEN_KATEGORIEN, VORLAGEN_HINWEIS, VORLAGEN_SLUG_RE } from "./index";

// Jede Vorlage muss vollständig und in sich stimmig sein: Die Seite rendert
// blind aus diesen Feldern, und die Bestätigungsmail kennt den Titel nur über
// den generierten Katalog in supabase/functions/_shared/vorlagenKatalog.ts.

const KATEGORIEN = new Set(VORLAGEN_KATEGORIEN.map((k) => k.key));

describe("Vorlagen-Bibliothek", () => {
  it("hat mindestens 60 Vorlagen", () => {
    expect(VORLAGEN.length).toBeGreaterThanOrEqual(60);
  });

  it("Slugs sind eindeutig und wohlgeformt", () => {
    const seen = new Set<string>();
    for (const v of VORLAGEN) {
      expect(v.slug, v.slug).toMatch(VORLAGEN_SLUG_RE);
      expect(v.slug.length, v.slug).toBeLessThanOrEqual(80);
      expect(seen.has(v.slug), `doppelter Slug ${v.slug}`).toBe(false);
      seen.add(v.slug);
    }
  });

  it("jede Kategorie hat mindestens 5 Vorlagen", () => {
    for (const k of VORLAGEN_KATEGORIEN) {
      const n = VORLAGEN.filter((v) => v.kategorie === k.key).length;
      expect(n, k.key).toBeGreaterThanOrEqual(5);
    }
  });

  it("jede Kategorie hat eine vollständige Kategorieseite", () => {
    for (const k of VORLAGEN_KATEGORIEN) {
      expect(k.seo.title, k.key).toContain("GründerX");
      expect(k.seo.title.length, k.seo.title).toBeLessThanOrEqual(60);
      expect(k.seo.description.length, k.key).toBeGreaterThanOrEqual(120);
      expect(k.seo.description.length, k.key).toBeLessThanOrEqual(170);
      expect(k.intro.length, k.key).toBeGreaterThanOrEqual(2);
      for (const p of k.intro) expect(p.split(/\s+/).length, k.key).toBeGreaterThanOrEqual(40);
      expect(k.faqs.length, k.key).toBeGreaterThanOrEqual(3);
    }
  });

  for (const v of VORLAGEN) {
    describe(v.slug, () => {
      it("Metadaten vollständig", () => {
        expect(KATEGORIEN.has(v.kategorie)).toBe(true);
        expect(v.titel.length).toBeGreaterThan(5);
        expect(v.kurz.length).toBeGreaterThan(30);
        expect(v.dateiname).toMatch(/^[A-Za-z0-9ÄÖÜäöüß_-]+$/);
        expect(v.wofuer.length).toBeGreaterThanOrEqual(3);
        expect(v.wofuer.length).toBeLessThanOrEqual(6);
        expect(v.enthaelt.length).toBeGreaterThanOrEqual(4);
        expect(v.enthaelt.length).toBeLessThanOrEqual(14);
        expect(v.hinweise.length).toBeGreaterThanOrEqual(2);
        expect(v.hinweise.length).toBeLessThanOrEqual(6);
        expect(v.faqs.length).toBeGreaterThanOrEqual(3);
        expect(v.faqs.length).toBeLessThanOrEqual(5);
        for (const f of v.faqs) {
          expect(f.q.length).toBeGreaterThan(10);
          expect(f.a.length).toBeGreaterThan(40);
        }
        expect(v.stand).toMatch(/^\d{4}-\d{2}$/);
      });

      it("SEO-Felder in Länge", () => {
        expect(v.seo.title).toContain("GründerX");
        // Google schneidet Titel bei ~60 Zeichen ab; die Seo-Komponente kürzt
        // nicht mehr, also müssen die Daten selbst kurz sein.
        expect(v.seo.title.length, v.seo.title).toBeLessThanOrEqual(60);
        expect(v.seo.description.length, v.seo.description).toBeGreaterThanOrEqual(100);
        expect(v.seo.description.length, v.seo.description).toBeLessThanOrEqual(170);
      });

      it("Ratgeber-Teil trägt die Seite", () => {
        expect(v.ratgeber.length, "Abschnitte").toBeGreaterThanOrEqual(4);
        expect(v.ratgeber.length, "Abschnitte").toBeLessThanOrEqual(8);
        let woerter = 0;
        const titel = new Set<string>();
        for (const a of v.ratgeber) {
          expect(a.titel.length, a.titel).toBeGreaterThanOrEqual(15);
          expect(a.titel.length, a.titel).toBeLessThanOrEqual(90);
          expect(titel.has(a.titel), `doppelte Überschrift ${a.titel}`).toBe(false);
          titel.add(a.titel);
          const w = a.text.trim().split(/\s+/).length;
          expect(w, `zu kurz: ${a.titel}`).toBeGreaterThanOrEqual(50);
          woerter += w;
          expect(a.text, a.titel).not.toMatch(/<[a-z]+>|\*\*|^#{1,3} |\[[^\]]+\]\(/m);
        }
        expect(woerter, "Ratgeber-Wörter gesamt").toBeGreaterThanOrEqual(450);
      });

      it("Text ist eine echte Vorlage", () => {
        expect(v.text.length).toBeGreaterThanOrEqual(1500);
        expect(v.text.trim().split("\n")[0].trim().length).toBeGreaterThan(5);
        expect(v.text.trimEnd().endsWith(VORLAGEN_HINWEIS)).toBe(true);
        const platzhalter = v.text.match(/\[[^\]\n]{2,}\]/g) ?? [];
        expect(platzhalter.length, "Platzhalter in eckigen Klammern").toBeGreaterThanOrEqual(3);
        // Kein Markdown, keine HTML-Reste: Der Text wird 1:1 in PDF und Word gesetzt.
        expect(v.text).not.toMatch(/<[a-z]+>|\*\*|^#{1,3} /m);
      });
    });
  }

  it("Katalog für die Edge Function ist aktuell (scripts/generate-vorlagen-katalog.mjs)", () => {
    const pfad = resolve(__dirname, "../../../supabase/functions/_shared/vorlagenKatalog.ts");
    expect(existsSync(pfad), "vorlagenKatalog.ts fehlt").toBe(true);
    const inhalt = readFileSync(pfad, "utf8");
    for (const v of VORLAGEN) {
      expect(inhalt, `${v.slug} fehlt im Katalog`).toContain(`"${v.slug}": ${JSON.stringify(v.titel)}`);
    }
    const eintraege = inhalt.match(/^\s+"[a-z0-9-]+": "/gm) ?? [];
    expect(eintraege.length).toBe(VORLAGEN.length);
  });
});
