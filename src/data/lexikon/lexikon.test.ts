import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { LEXIKON, LEXIKON_BY_SLUG, LEXIKON_THEMEN, lexikonFuerSeite } from "./index";
import { LEXIKON_SLUG_RE, lexikonKlartext, lexikonTextLinks, lexikonTexte, lexikonWortzahl } from "./types";
import { festeRouten } from "../../../scripts/generate-sitemap";

// Öffentliche, indexierbare Ziele: alle festen Sitemap-Routen (Tools, Guides,
// Vorlagen, eigene Seiten, Lexikon) plus die Ratgeber aus der eingecheckten
// public/sitemap.xml (Ratgeber liegen in der Datenbank).
const SITEMAP = readFileSync(resolve(__dirname, "../../../public/sitemap.xml"), "utf8");
const RATGEBER = new Set([...SITEMAP.matchAll(/<loc>https:\/\/gruenderx\.de(\/ratgeber\/[^<]+)<\/loc>/g)].map((m) => m[1]));
const OEFFENTLICH = new Set([...festeRouten().map((e) => e.path), ...RATGEBER]);
const GESPERRT = /^\/(playbook|playbooks|cockpit|anbieter|dashboard|felix|wizard|admin|auth|checkout)(\/|$)/;

const istOeffentlich = (pfad: string) => OEFFENTLICH.has(pfad) && !GESPERRT.test(pfad);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const VERLINKT_VON = /^\/(tools|guides|ratgeber)\/[a-z0-9-]+$/;

describe("Lexikon-Katalog", () => {
  it("hat eindeutige Slugs und Begriffe, jede Themengruppe ist bekannt", () => {
    expect(new Set(LEXIKON.map((b) => b.slug)).size).toBe(LEXIKON.length);
    expect(new Set(LEXIKON.map((b) => b.begriff)).size).toBe(LEXIKON.length);
    const themen = new Set(LEXIKON_THEMEN.map((t) => t.key));
    for (const b of LEXIKON) expect(themen.has(b.thema), b.slug).toBe(true);
  });

  it("jede Inhaltsdatei hat einen Katalog-Eintrag", () => {
    const dateien = readdirSync(resolve(__dirname, "inhalte")).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
    expect(dateien.sort()).toEqual(LEXIKON.map((b) => b.slug).sort());
  });

  it("Hub und Begriffe stehen in Sitemap-Routen (daraus entstehen Prerender und lastmod)", () => {
    expect(OEFFENTLICH.has("/lexikon")).toBe(true);
    for (const b of LEXIKON) expect(OEFFENTLICH.has(`/lexikon/${b.slug}`), b.slug).toBe(true);
  });

  for (const b of LEXIKON) {
    describe(b.slug, () => {
      it("Pflichtfelder, Slug-Muster, Title und Description", () => {
        expect(b.slug).toMatch(LEXIKON_SLUG_RE);
        expect(existsSync(resolve(__dirname, `inhalte/${b.slug}.ts`)), "Inhaltsdatei").toBe(true);
        expect(b.begriff.length).toBeGreaterThanOrEqual(3);
        expect(b.kurz.length, "kurz").toBeGreaterThanOrEqual(60);
        expect(b.kurz.length, "kurz").toBeLessThanOrEqual(170);
        expect(b.seo.title.length, b.seo.title).toBeLessThanOrEqual(60);
        expect(b.seo.title.length, b.seo.title).toBeGreaterThanOrEqual(30);
        // Der Begriff steht vorn: Title beginnt mit dem ersten Wort des Begriffs (oder seiner Abkürzung in Klammern).
        const erstesWort = b.begriff.split(/[\s(/]/)[0];
        const abk = b.begriff.match(/\(([^)]+)\)/)?.[1];
        expect(
          b.seo.title.startsWith(erstesWort) || (!!abk && b.seo.title.startsWith(abk)),
          `Title beginnt nicht mit dem Begriff: ${b.seo.title}`,
        ).toBe(true);
        expect(b.seo.description.length, b.seo.description).toBeGreaterThanOrEqual(120);
        expect(b.seo.description.length, b.seo.description).toBeLessThanOrEqual(160);
        expect(b.veroeffentlicht).toMatch(ISO);
        expect(b.stand).toMatch(ISO);
        expect(b.stand >= b.veroeffentlicht, "Stand vor Veröffentlichung").toBe(true);
        expect(b.stand <= new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10), "Stand in der Zukunft").toBe(true);
      });

      it("mindestens zwei Bestandsseiten verlinken den Begriff", () => {
        expect(b.verlinktVon.length).toBeGreaterThanOrEqual(2);
        expect(new Set(b.verlinktVon).size).toBe(b.verlinktVon.length);
        for (const p of b.verlinktVon) {
          expect(p, p).toMatch(VERLINKT_VON);
          expect(istOeffentlich(p), `keine öffentliche Route: ${p}`).toBe(true);
          expect(lexikonFuerSeite(p).some((x) => x.slug === b.slug)).toBe(true);
        }
      });

      it("Inhalt: Definition, Fragen-H2, Beispiel, Länge, Links, Quellen", async () => {
        const inhalt = (await b.inhalt()).default;

        // Definition: eigenständig, 1–2 Sätze, ohne Link-Auszeichnung
        expect(inhalt.definition).not.toMatch(/\[\[/);
        expect(inhalt.definition.length).toBeGreaterThanOrEqual(120);
        expect(inhalt.definition.length).toBeLessThanOrEqual(420);

        // Aufbau
        expect(inhalt.abschnitte.length).toBeGreaterThanOrEqual(5);
        expect(inhalt.abschnitte.length).toBeLessThanOrEqual(9);
        const titel = inhalt.abschnitte.map((a) => a.titel);
        expect(new Set(titel).size, "doppelte Überschrift").toBe(titel.length);
        expect(titel.filter((t) => t.endsWith("?")).length, "H2 als Fragen").toBeGreaterThanOrEqual(3);
        expect(titel.some((t) => /Beispiel/.test(t)), "Abschnitt „Beispiel“").toBe(true);
        expect(titel.some((t) => /Fehler|Missverständnisse/.test(t)), "Abschnitt „Typische Fehler“").toBe(true);
        for (const a of inhalt.abschnitte) {
          expect(a.titel.length, a.titel).toBeGreaterThanOrEqual(12);
          expect(a.titel.length, a.titel).toBeLessThanOrEqual(90);
          expect(a.bloecke.length, a.titel).toBeGreaterThanOrEqual(1);
          for (const bl of a.bloecke) {
            if (bl.art === "tabelle") for (const z of bl.zeilen) expect(z.length, `Tabellenzeile in ${a.titel}`).toBe(bl.kopf.length);
            if (bl.art === "liste") expect(bl.punkte.length, a.titel).toBeGreaterThanOrEqual(2);
          }
        }
        // Das Beispiel ist als Beispiel gekennzeichnet.
        expect(lexikonTexte(inhalt).some((t) => /Beispiel \(frei gewählt/.test(t) || /frei gewählte Beispiele/.test(t)), "Beispiel-Kennzeichnung").toBe(true);

        // Länge: 700–1.200 Wörter Substanz
        const woerter = lexikonWortzahl(inhalt);
        expect(woerter, "Wörter").toBeGreaterThanOrEqual(700);
        expect(woerter, "Wörter").toBeLessThanOrEqual(1300);

        // Reiner Text: kein HTML, kein Markdown, kein "<" (JSON-LD und Prerender)
        for (const t of lexikonTexte(inhalt)) {
          const klar = lexikonKlartext(t);
          expect(klar, klar.slice(0, 60)).not.toMatch(/<|\*\*|^#{1,3} |\]\(|\[\[|\]\]/m);
        }

        // Interne Links: nur öffentliche Routen, kein Link auf sich selbst
        const selbst = `/lexikon/${b.slug}`;
        const ziele = [...lexikonTextLinks(inhalt), ...inhalt.kontext.map((k) => k.pfad)];
        for (const z of ziele) {
          expect(istOeffentlich(z), `kein öffentliches Linkziel: ${z}`).toBe(true);
          expect(z, "Link auf sich selbst").not.toBe(selbst);
        }
        expect(inhalt.kontext.length, "Kontextlinks").toBeGreaterThanOrEqual(2);
        expect(inhalt.kontext.length, "Kontextlinks").toBeLessThanOrEqual(4);
        expect(new Set(inhalt.kontext.map((k) => k.pfad)).size).toBe(inhalt.kontext.length);
        for (const k of inhalt.kontext) {
          expect(k.pfad.startsWith("/lexikon/"), "Kontextlink zeigt aus dem Lexikon hinaus").toBe(false);
          expect(k.label.length).toBeGreaterThanOrEqual(8);
          expect(k.text.length).toBeGreaterThanOrEqual(20);
        }

        // Verwandte Begriffe: vorhanden, existieren, nicht der Begriff selbst
        expect(inhalt.verwandt.length, "verwandt").toBeGreaterThanOrEqual(2);
        expect(inhalt.verwandt.length, "verwandt").toBeLessThanOrEqual(6);
        expect(new Set(inhalt.verwandt).size).toBe(inhalt.verwandt.length);
        for (const s of inhalt.verwandt) {
          expect(LEXIKON_BY_SLUG[s], `verwandter Begriff fehlt: ${s}`).toBeTruthy();
          expect(s).not.toBe(b.slug);
        }

        // Quellen: https, eindeutig
        expect(inhalt.quellen.length, "Quellen").toBeGreaterThanOrEqual(2);
        expect(new Set(inhalt.quellen.map((q) => q.url)).size).toBe(inhalt.quellen.length);
        for (const q of inhalt.quellen) {
          expect(q.url, q.url).toMatch(/^https:\/\/[^\s<>"]+$/);
          expect(q.titel.length, q.titel).toBeGreaterThanOrEqual(8);
        }
      });
    });
  }

  it("jeder Begriff wird von mindestens zwei anderen Begriffen als verwandt genannt", async () => {
    const eingehend: Record<string, number> = Object.fromEntries(LEXIKON.map((b) => [b.slug, 0]));
    for (const b of LEXIKON) for (const s of (await b.inhalt()).default.verwandt) eingehend[s] = (eingehend[s] ?? 0) + 1;
    const zuWenig = Object.entries(eingehend).filter(([, n]) => n < 2).map(([s, n]) => `${s}: ${n}`);
    expect(zuWenig).toEqual([]);
  });
});

describe("Lexikon-Einbindung", () => {
  const lies = (p: string) => readFileSync(resolve(__dirname, "../../..", p), "utf8");
  it("Routen stehen in App.tsx, Hub ist im Footer verlinkt", () => {
    const app = lies("src/App.tsx");
    expect(app).toContain('path="/lexikon"');
    expect(app).toContain('path="/lexikon/:slug"');
    expect(lies("src/components/landing/Footer.tsx")).toContain('to: "/lexikon"');
  });
  it("Tool-, Guide- und Ratgeberseiten zeigen den Kasten „Begriffe im Lexikon“", () => {
    for (const p of ["src/pages/ToolLanding.tsx", "src/pages/GuideLanding.tsx", "src/pages/RatgeberPost.tsx"]) {
      expect(lies(p), p).toContain("<LexikonVerweise");
    }
  });
  it("JSON-LD escapt „<“", () => {
    expect(lies("src/components/Seo.tsx")).toContain('.replace(/</g, "\\\\u003c")');
  });
});
