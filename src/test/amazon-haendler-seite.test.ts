import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { findZielgruppe } from "@/data/zielgruppen";
import { LANDING_TOOLS } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";

// /amazon-haendler (growth-lp, 14.11.2026): Zielgruppenseite für Amazon-Händler.
// Die Tests halten fest, was die Seite verspricht: belegte Schritte mit Rechtsgrundlage,
// ein Rechenbeispiel, das der Rechner wirklich so ausgibt, und Links, die es gibt.
const z = findZielgruppe("amazon-haendler")!;
const root = resolve(__dirname, "../..");
const lies = (rel: string) => readFileSync(resolve(root, rel), "utf8");

describe("/amazon-haendler", () => {
  it("hat Antwort zuerst, Stand, Tabelle, Beispiel und Einwände", () => {
    expect(z).toBeDefined();
    expect(z.antwort!.frage.endsWith("?")).toBe(true);
    // Antwort in höchstens zwei Sätzen, eigenständig lesbar (Abkürzung „USt-IdNr.“ ist kein Satzende)
    expect(z.antwort!.text.replace(/IdNr\./g, "IdNr").split(/(?<=\.)\s/).length).toBeLessThanOrEqual(2);
    expect(z.stand!.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(z.tabelle!.zeilen.length).toBeGreaterThanOrEqual(6);
    expect(z.beispiel!.punkte.length).toBeGreaterThanOrEqual(2);
    expect(z.einwaende!.length).toBeGreaterThanOrEqual(2);
  });

  it("jeder Schritt der Tabelle nennt Zeitpunkt, Stelle, Grundlage und eine vorhandene Hilfe-Seite", () => {
    const tools = new Set(LANDING_TOOLS.map((t) => t.slug));
    const guides = new Set(PLAYBOOKS.map((p) => p.slug));
    const app = lies("src/App.tsx");
    for (const r of z.tabelle!.zeilen) {
      expect(r.wann.length, r.schritt).toBeGreaterThan(10);
      expect(r.wo.length, r.schritt).toBeGreaterThan(5);
      expect(r.grundlage.length, r.schritt).toBeGreaterThan(5);
      const to = r.hilfe.to;
      if (to.startsWith("/tools/")) expect(tools.has(to.slice(7)), to).toBe(true);
      else if (to.startsWith("/guides/")) expect(guides.has(to.slice(8)), to).toBe(true);
      else if (to.startsWith("/ratgeber/")) expect(to).toMatch(/^\/ratgeber\/[a-z0-9-]+$/);
      else expect(app, to).toContain(`path="${to}"`);
    }
  });

  it("Tools und Guides der Seite existieren", () => {
    const tools = new Set(LANDING_TOOLS.map((t) => t.slug));
    const guides = new Set(PLAYBOOKS.map((p) => p.slug));
    for (const t of z.tools) expect(tools.has(t.slug), t.slug).toBe(true);
    for (const g of z.guides.filter((g) => g.to.startsWith("/guides/"))) expect(guides.has(g.to.slice(8)), g.to).toBe(true);
  });

  it("das Rechenbeispiel entspricht dem, was der Verpackungslizenz-Rechner ausgibt", () => {
    // Tarifspannen und Untergrenze stehen in LucidWizard.tsx; ändert sie jemand, muss das Beispiel mit.
    const src = lies("src/pages/LucidWizard.tsx");
    const satz = (material: string) => {
      const m = src.match(new RegExp(`${material}: \\{[^\\n]*ratePerKg: \\{ low: ([\\d.]+), mid: ([\\d.]+), high: ([\\d.]+) \\}`));
      expect(m, material).not.toBeNull();
      return { low: Number(m![1]), high: Number(m![3]) };
    };
    const papier = satz("papier");
    const kunststoff = satz("kunststoff");
    expect(src).toContain("Math.max(75, low)");
    const spanne = (kgPapier: number, kgKunststoff: number) => ({
      low: Math.max(75, kgPapier * papier.low + kgKunststoff * kunststoff.low),
      high: Math.max(75, kgPapier * papier.high + kgKunststoff * kunststoff.high),
    });
    const klein = spanne(200, 15); // 1.000 Pakete × (200 g Karton + 15 g Folie)
    const gross = spanne(1000, 75); // 5.000 Pakete
    expect(Math.round(klein.low)).toBe(75);
    expect(Math.round(klein.high)).toBe(83);
    expect(Math.round(gross.low)).toBe(259);
    expect(Math.round(gross.high)).toBe(414);
    expect(z.beispiel!.punkte[0]).toContain("75 bis rund 83 €");
    expect(z.beispiel!.punkte[1]).toContain("259 bis 414 €");
    expect(z.beispiel!.text).toContain("200 kg");
    expect(z.beispiel!.text).toContain("15 kg");
  });

  it("nennt keinen eigenen Preis in den Daten (der kommt aus config/pricing.ts) und keine verbotenen Wörter", () => {
    const text = JSON.stringify(z);
    expect(text).not.toMatch(/64,99|649,90|99,99/);
    for (const wort of ["stressfrei", "garantiert", "steuerfrei", "Steuern sparen", "Testsieger", "Mindset"]) {
      expect(text.toLowerCase(), wort).not.toContain(wort.toLowerCase());
    }
  });

  it("Quellen sind https-Links, Gesetze zeigen auf gesetze-im-internet.de", () => {
    expect(z.quellen.length).toBeGreaterThanOrEqual(10);
    for (const q of z.quellen) {
      expect(q.url, q.label).toMatch(/^https:\/\//);
      if (q.label.startsWith("§")) expect(q.url, q.label).toContain("gesetze-im-internet.de");
    }
  });

  it("ist von der Startseite und aus dem Footer verlinkt", () => {
    expect(lies("src/components/landing/Hero.tsx")).toContain('to: "/amazon-haendler"');
    expect(lies("src/components/landing/SellerBand.tsx")).toContain('to="/amazon-haendler"');
    expect(lies("src/components/landing/Footer.tsx")).toContain('to: "/amazon-haendler"');
  });
});
