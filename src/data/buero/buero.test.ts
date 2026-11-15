import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { BUERO, BUERO_PREISE, bueroAngebote } from "./index";
import { BUERO_SLUG_RE, type BueroInhalt } from "./types";
import { LEXIKON_LINK_RE, lexikonKlartext } from "../lexikon/types";
import { partnerZiel } from "../../config/partnerLinks";
import { festeRouten } from "../../../scripts/generate-sitemap";

// Öffentliche, indexierbare Ziele: feste Sitemap-Routen plus die Ratgeber aus der eingecheckten Sitemap.
const SITEMAP = readFileSync(resolve(__dirname, "../../../public/sitemap.xml"), "utf8");
const RATGEBER = new Set([...SITEMAP.matchAll(/<loc>https:\/\/gruenderx\.de(\/ratgeber\/[^<]+)<\/loc>/g)].map((m) => m[1]));
const OEFFENTLICH = new Set([...festeRouten().map((e) => e.path), ...RATGEBER]);
const GESPERRT = /^\/(playbook|playbooks|cockpit|anbieter|dashboard|felix|wizard|admin|auth|checkout)(\/|$)/;
const istOeffentlich = (pfad: string) => OEFFENTLICH.has(pfad) && !GESPERRT.test(pfad);
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Alle Fließtexte einer Seite (ohne Produktdaten). */
function fliesstexte(inhalt: BueroInhalt): string[] {
  const out = [inhalt.antwort, inhalt.auswahl];
  for (const a of inhalt.abschnitte) {
    out.push(a.titel);
    for (const b of a.bloecke) {
      if (b.art === "liste") out.push(...b.punkte);
      else if (b.art === "tabelle") out.push(...b.kopf, ...b.zeilen.flat());
      else out.push(b.text);
    }
  }
  return out;
}

/** Alle Texte der Seite inklusive Produktkarten. */
function alleTexte(inhalt: BueroInhalt): string[] {
  const out = fliesstexte(inhalt);
  for (const p of inhalt.produkte) {
    out.push(p.name, p.rolle, p.kurz, ...p.plus, ...p.minus, ...p.daten.flatMap((d) => [d.label, d.wert]));
  }
  return out;
}

// Kodex § 7 (werbung-belegbar): Es gibt keinen eigenen Test. Diese Wörter würden einen behaupten
// oder eine Wertung ohne Beleg ausdrücken. „getestet/Test“ ist nur in der Verneinung erlaubt
// („kein eigener Test“), deshalb wird die erlaubte Wendung vor der Prüfung entfernt.
const VERBOTEN = /testsieger|preis-leistungs-sieger|im test\b|getestet|unser test|praxistest|hands-on|wir haben .{0,40}ausprobiert|sterne|bestseller|beliebtest|kundenmeinung|kundenbewertung|garantiert|gamechanger|stressfrei/i;
const ERLAUBTE_VERNEINUNG =
  /(ohne|kein(?:en|e)?) (?:eigenen? |eigene )?(?:geräte)?test|nicht (?:selbst )?getestet|wir haben kein(?:es|e|en)? [^.]{0,40}(?:ausprobiert|getestet|in der hand gehabt)/gi;
// So sagt eine Seite offen, dass kein eigener Test dahintersteht (mindestens eine dieser Wendungen in `auswahl`).
const KEIN_TEST = /(ohne|kein(?:en|e)?) (?:eigenen? |eigene )?(?:Geräte)?[Tt]est|nicht (?:selbst )?getestet|[Ww]ir haben kein(?:es|e|en)? [^.]{0,40}(?:ausprobiert|getestet|in der Hand gehabt)/;
// Preise gehören nicht in den Text: Sie kommen mit Datum aus preise.json. Das gilt auch für
// Rangaussagen zum Preis („das günstigste Gerät dieser Auswahl“): Die kippen mit dem nächsten Feed.
const PREIS_IM_TEXT = /\d\s?(€|euro\b|eur\b)|günstigste|billigste|teuerste|preiswerteste|am günstigsten|am teuersten/i;

describe("Büro-Katalog", () => {
  it("hat eindeutige Slugs, jede Inhaltsdatei hat einen Katalog-Eintrag", () => {
    expect(new Set(BUERO.map((s) => s.slug)).size).toBe(BUERO.length);
    const dateien = readdirSync(resolve(__dirname, "inhalte")).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
    expect(dateien.sort()).toEqual(BUERO.map((s) => s.slug).sort());
  });

  it("Hub und Seiten stehen in den Sitemap-Routen (daraus entstehen Prerender und lastmod)", () => {
    expect(OEFFENTLICH.has("/buero")).toBe(true);
    for (const s of BUERO) expect(OEFFENTLICH.has(`/buero/${s.slug}`), s.slug).toBe(true);
  });

  it("Preisdatei trägt ein Datum und nur Angebote von Partnerhändlern mit Preis", () => {
    expect(BUERO_PREISE.stand).toMatch(ISO);
    for (const [ean, e] of Object.entries(BUERO_PREISE.produkte)) {
      expect(ean, "EAN").toMatch(/^\d{8,14}$/);
      for (const a of e.angebote) {
        expect(a.preis, `${ean} ${a.haendler}`).toBeGreaterThan(5);
        expect(a.url, `${ean} ${a.haendler}`).toMatch(/^https:\/\//);
        // Jeder Händlerlink muss ein Partnerlink werden, sonst fehlt das Programm in config/partnerLinks.ts.
        const z = partnerZiel(a.url, "buero-test");
        expect(z.partner, `kein Partnerprogramm für ${a.url}`).toBe(true);
        expect(decodeURIComponent(z.href.split("ued=")[1]), "Deeplink zeigt auf die Produktseite").toBe(a.url);
      }
      if (e.bild) expect(e.bild).toMatch(/^https:\/\//);
    }
  });

  for (const s of BUERO) {
    describe(s.slug, () => {
      it("Pflichtfelder, Slug-Muster, Title und Description", () => {
        expect(s.slug).toMatch(BUERO_SLUG_RE);
        expect(existsSync(resolve(__dirname, `inhalte/${s.slug}.ts`)), "Inhaltsdatei").toBe(true);
        expect(s.titel.length).toBeGreaterThanOrEqual(20);
        expect(s.titel.length).toBeLessThanOrEqual(80);
        expect(s.kurz.length, "kurz").toBeGreaterThanOrEqual(60);
        expect(s.kurz.length, "kurz").toBeLessThanOrEqual(170);
        expect(s.seo.title.length, s.seo.title).toBeLessThanOrEqual(60);
        expect(s.seo.title.length, s.seo.title).toBeGreaterThanOrEqual(30);
        expect(s.seo.title.startsWith(s.name), `Title beginnt nicht mit „${s.name}“: ${s.seo.title}`).toBe(true);
        expect(s.seo.description.length, s.seo.description).toBeGreaterThanOrEqual(120);
        expect(s.seo.description.length, s.seo.description).toBeLessThanOrEqual(160);
        expect(s.veroeffentlicht).toMatch(ISO);
        expect(s.stand).toMatch(ISO);
        expect(s.stand >= s.veroeffentlicht, "Stand vor Veröffentlichung").toBe(true);
        for (const t of [s.titel, s.kurz, s.seo.title, s.seo.description]) {
          expect(t.replace(ERLAUBTE_VERNEINUNG, ""), t).not.toMatch(VERBOTEN);
          expect(t, t).not.toMatch(PREIS_IM_TEXT);
        }
      });

      it("Geräte: 4–6, eindeutig, vollständige Daten, Datenblatt beim Hersteller, lieferbares Angebot", async () => {
        const inhalt = (await s.inhalt()).default;
        expect(inhalt.produkte.length).toBeGreaterThanOrEqual(4);
        expect(inhalt.produkte.length).toBeLessThanOrEqual(6);
        expect(new Set(inhalt.produkte.map((p) => p.id)).size, "id doppelt").toBe(inhalt.produkte.length);
        expect(new Set(inhalt.produkte.map((p) => p.ean)).size, "EAN doppelt").toBe(inhalt.produkte.length);

        expect(inhalt.vergleich.length).toBeGreaterThanOrEqual(3);
        expect(inhalt.vergleich.length).toBeLessThanOrEqual(5);

        for (const p of inhalt.produkte) {
          expect(p.id, p.id).toMatch(BUERO_SLUG_RE);
          expect(p.ean, p.name).toMatch(/^\d{8,14}$/);
          expect(p.rolle.length, `rolle ${p.name}`).toBeLessThanOrEqual(40);
          expect(p.rolle.length, `rolle ${p.name}`).toBeGreaterThanOrEqual(8);
          expect(p.kurz.length, `kurz ${p.name}`).toBeGreaterThanOrEqual(60);
          expect(p.daten.length, `daten ${p.name}`).toBeGreaterThanOrEqual(5);
          expect(p.daten.length, `daten ${p.name}`).toBeLessThanOrEqual(8);
          expect(new Set(p.daten.map((d) => d.label)).size, `Label doppelt ${p.name}`).toBe(p.daten.length);
          for (const l of inhalt.vergleich) {
            expect(p.daten.some((d) => d.label === l), `„${l}“ fehlt bei ${p.name}`).toBe(true);
          }
          expect(p.plus.length, `plus ${p.name}`).toBeGreaterThanOrEqual(2);
          expect(p.plus.length, `plus ${p.name}`).toBeLessThanOrEqual(4);
          expect(p.minus.length, `minus ${p.name}`).toBeGreaterThanOrEqual(1);
          expect(p.minus.length, `minus ${p.name}`).toBeLessThanOrEqual(3);
          // Quelle ist der Hersteller, nicht ein Händler oder Preisvergleich
          expect(p.datenblatt.url, p.name).toMatch(/^https:\/\//);
          expect(p.datenblatt.url, `Datenblatt beim Händler: ${p.name}`).not.toMatch(
            /coolblue|euronics|comspot|shifter|amazon\.|idealo|geizhals|mediamarkt|saturn|otto\.de|notebooksbilliger|cyberport|alternate/i,
          );
          // Jedes Gerät hat am Stand-Tag mindestens ein Angebot eines Partnerhändlers
          expect(bueroAngebote(p.ean).length, `kein Angebot in preise.json: ${p.name} (${p.ean})`).toBeGreaterThanOrEqual(1);
        }
        // Mehr als eine Marke, damit die Seite kein Hersteller-Prospekt ist
        expect(new Set(inhalt.produkte.map((p) => p.marke)).size, "Marken").toBeGreaterThanOrEqual(2);
      });

      it("Text: Antwort zuerst, Kaufberatung, Länge, keine Test-Behauptung, keine Preise, saubere Links", async () => {
        const inhalt = (await s.inhalt()).default;

        expect(inhalt.antwort.length).toBeGreaterThanOrEqual(150);
        expect(inhalt.antwort.length).toBeLessThanOrEqual(650);
        // Die Antwort nennt mindestens ein Gerät der Auswahl beim Namen (Modell oder Marke)
        expect(
          inhalt.produkte.some((p) => inhalt.antwort.includes(p.marke) || inhalt.antwort.includes(p.name)),
          "Antwort nennt kein Gerät",
        ).toBe(true);
        // Die Auswahl sagt offen, dass es kein eigener Test ist
        expect(inhalt.auswahl, "Hinweis auf Herstellerangaben fehlt").toMatch(/Datenbl[aä]tt|Angaben der Hersteller|Produktseiten/);
        expect(inhalt.auswahl, "Hinweis „kein eigener Test“ fehlt").toMatch(KEIN_TEST);

        expect(inhalt.abschnitte.length).toBeGreaterThanOrEqual(4);
        expect(inhalt.abschnitte.length).toBeLessThanOrEqual(6);
        const titel = inhalt.abschnitte.map((a) => a.titel);
        expect(new Set(titel).size, "doppelte Überschrift").toBe(titel.length);
        expect(titel.filter((t) => t.endsWith("?")).length, "H2 als Fragen").toBeGreaterThanOrEqual(3);
        let listenOderTabellen = 0;
        for (const a of inhalt.abschnitte) {
          expect(a.titel.length, a.titel).toBeGreaterThanOrEqual(12);
          expect(a.titel.length, a.titel).toBeLessThanOrEqual(90);
          expect(a.bloecke.length, a.titel).toBeGreaterThanOrEqual(1);
          for (const bl of a.bloecke) {
            if (bl.art === "tabelle") {
              listenOderTabellen++;
              for (const z of bl.zeilen) expect(z.length, `Tabellenzeile in ${a.titel}`).toBe(bl.kopf.length);
            }
            if (bl.art === "liste") {
              listenOderTabellen++;
              expect(bl.punkte.length, a.titel).toBeGreaterThanOrEqual(2);
            }
          }
        }
        expect(listenOderTabellen, "mindestens eine Liste oder Tabelle").toBeGreaterThanOrEqual(1);

        const woerter = fliesstexte(inhalt).map(lexikonKlartext).join(" ").trim().split(/\s+/).length;
        expect(woerter, "Wörter Fließtext").toBeGreaterThanOrEqual(850);
        expect(woerter, "Wörter Fließtext").toBeLessThanOrEqual(1500);

        for (const t of alleTexte(inhalt)) {
          const klar = lexikonKlartext(t);
          // Reiner Text: kein HTML, kein Markdown
          expect(klar, klar.slice(0, 60)).not.toMatch(/<|\*\*|^#{1,3} |\]\(|\[\[|\]\]/m);
          expect(klar.replace(ERLAUBTE_VERNEINUNG, ""), klar.slice(0, 90)).not.toMatch(VERBOTEN);
          expect(klar, `Preis im Text: ${klar.slice(0, 90)}`).not.toMatch(PREIS_IM_TEXT);
          expect(klar, `Ausrufezeichen: ${klar.slice(0, 90)}`).not.toMatch(/!/);
        }

        // Interne Links: nur öffentliche Routen, kein Link auf sich selbst
        const selbst = `/buero/${s.slug}`;
        const textLinks = fliesstexte(inhalt).flatMap((t) => [...t.matchAll(LEXIKON_LINK_RE)].map((m) => m[1]));
        for (const z of [...textLinks, ...inhalt.kontext.map((k) => k.pfad)]) {
          expect(istOeffentlich(z), `kein öffentliches Linkziel: ${z}`).toBe(true);
          expect(z, "Link auf sich selbst").not.toBe(selbst);
        }
        expect(inhalt.kontext.length, "Kontextlinks").toBeGreaterThanOrEqual(2);
        expect(inhalt.kontext.length, "Kontextlinks").toBeLessThanOrEqual(4);
        expect(new Set(inhalt.kontext.map((k) => k.pfad)).size).toBe(inhalt.kontext.length);

        const quellen = [...inhalt.produkte.map((p) => p.datenblatt.url), ...inhalt.quellen.map((q) => q.url)];
        expect(new Set(quellen).size, "Quelle doppelt").toBe(quellen.length);
        for (const q of inhalt.quellen) expect(q.url, q.titel).toMatch(/^https:\/\//);
      });
    });
  }
});
