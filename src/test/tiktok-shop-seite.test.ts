import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { findZielgruppe } from "@/data/zielgruppen";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import { TRIAL_TOOLS } from "@/lib/freetools/trialTools";
import { LANDING_TOOLS } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";

// /tiktok-shop (growth-lp, 21.11.2026): Zielgruppenseite für TikTok-Shop-Händler mit eigener oder eingekaufter Ware.
// Die Tests halten fest, was die Seite verspricht: Antwort zuerst, Kontotyp je Rechtsform, Schritte mit
// Rechtsgrundlage, ein nachgerechnetes Provisionsbeispiel und Links, die es gibt.
const z = findZielgruppe("tiktok-shop")!;
const root = resolve(__dirname, "../..");
const lies = (rel: string) => readFileSync(resolve(root, rel), "utf8");
const euro = (n: number) => n.toFixed(2).replace(".", ",");

describe("/tiktok-shop", () => {
  const tools = new Set(LANDING_TOOLS.map((t) => t.slug));
  const guides = new Set(PLAYBOOKS.map((p) => p.slug));
  const app = lies("src/App.tsx");
  const gibtEs = (to: string) => {
    if (to.startsWith("/tools/")) expect(tools.has(to.slice(7)), to).toBe(true);
    else if (to.startsWith("/guides/")) expect(guides.has(to.slice(8)), to).toBe(true);
    else if (to.startsWith("/ratgeber/")) expect(to).toMatch(/^\/ratgeber\/[a-z0-9-]+$/);
    else expect(app, to).toContain(`path="${to}"`);
  };

  it("hat Antwort zuerst, Stand, Fall-Tabelle, Schritt-Tabelle, Beispiel und Einwände", () => {
    expect(z).toBeDefined();
    expect(z.antwort!.frage.endsWith("?")).toBe(true);
    // Antwort in höchstens zwei Sätzen („USt-IdNr.“ und „e. K.“ sind keine Satzenden)
    const saetze = z.antwort!.text.replace(/IdNr\./g, "IdNr").replace(/e\. K\./g, "eK").split(/(?<=\.)\s/);
    expect(saetze.length).toBeLessThanOrEqual(2);
    expect(z.stand!.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(z.tabelle!.zeilen.length).toBeGreaterThanOrEqual(6);
    expect(z.beispiel!.punkte.length).toBeGreaterThanOrEqual(2);
    expect(z.einwaende!.length).toBeGreaterThanOrEqual(2);
    expect(z.heading).toBe(`${z.heroTitle} ${z.heroAccent}`);
  });

  it("Fall-Tabelle: vier Rechtsformen, jede Zeile so breit wie der Kopf, mit Stand und Quelle im Fuß", () => {
    const f = z.faelle!;
    expect(f.zeilen.length).toBe(4);
    for (const r of f.zeilen) {
      expect(r.length, r[0]).toBe(f.kopf.length);
      for (const c of r) expect(c.length, r[0]).toBeGreaterThan(2);
    }
    expect(new Set(f.zeilen.map((r) => r[0])).size).toBe(4);
    expect(f.fuss).toContain("Stand 11.11.2026");
    // Die Zuordnung zu deutschen Rechtsformen ist unsere, das steht dabei.
    expect(f.fuss).toContain("die Zuordnung in der ersten Spalte ist unsere");
    gibtEs(f.link!.to);
  });

  it("jeder Schritt nennt Zeitpunkt, Stelle, Grundlage und eine vorhandene Hilfe-Seite", () => {
    for (const r of z.tabelle!.zeilen) {
      expect(r.wann.length, r.schritt).toBeGreaterThan(10);
      expect(r.wo.length, r.schritt).toBeGreaterThan(5);
      expect(r.grundlage.length, r.schritt).toBeGreaterThan(5);
      gibtEs(r.hilfe.to);
    }
  });

  it("Gratis-Tools, Tools, Guides und Beispiel-Link existieren", () => {
    for (const t of z.freeTools) expect(FREE_TOOL_BY_SLUG[t.to.slice(1)] ?? TRIAL_TOOLS.find((x) => x.landingPath === t.to), t.to).toBeDefined();
    for (const t of z.tools) expect(tools.has(t.slug), t.slug).toBe(true);
    for (const g of z.guides.filter((g) => g.to.startsWith("/guides/"))) expect(guides.has(g.to.slice(8)), g.to).toBe(true);
    for (const r of z.ratgeber.filter((r) => !r.to.startsWith("/ratgeber/"))) gibtEs(r.to);
    gibtEs(z.beispiel!.link.to);
  });

  it("das Provisionsbeispiel ist richtig gerechnet", () => {
    // Sätze laut TikTok Shop EU-Kommissionsrichtlinie (Stand 28.01.2026): 9 %, Elektronik 7 %, neue Verkäufer 4 %.
    const basis = 24.99 + 3.99;
    expect(euro(basis)).toBe("28,98");
    const p = z.beispiel!.punkte;
    expect(z.beispiel!.titel).toContain("24,99 €");
    expect(z.beispiel!.text).toContain("3,99 €");
    expect(z.beispiel!.text).toContain("28,98 €");
    expect(p[0]).toContain(`${euro(basis * 0.09)} €`);
    expect(euro(basis * 0.09)).toBe("2,61");
    expect(p[1]).toContain(`${euro(basis * 0.07)} €`);
    expect(p[2]).toContain(`${euro(basis * 0.04)} €`);
    expect(p[3]).toContain(`rund ${Math.round(basis * 0.09 * 100)} €`);
    expect(p[3]).toContain(`rund ${Math.round(basis * 0.04 * 100)} €`);
    expect(z.beispiel!.hinweis).toContain("Stand 28.01.2026");
  });

  it("nennt keinen eigenen Preis in den Daten, keine verbotenen Wörter und die Meldegrenze nie verkürzt", () => {
    const text = JSON.stringify(z);
    expect(text).not.toMatch(/64,99|649,90|99,99/);
    for (const wort of ["stressfrei", "garantiert", "steuerfrei", "Steuern sparen", "Testsieger", "Mindset", "24/7", "kostenlos beim Bundeszentralamt"]) {
      expect(text.toLowerCase(), wort).not.toContain(wort.toLowerCase());
    }
    // Stimme GründerX: „30 Verkäufe“ steht nie ohne die 2.000 € im selben Satz.
    const felder = [z.lead, z.urgency, ...z.outcomes, ...z.faq.map((f) => f.a), ...z.einwaende!.map((e) => e.a), ...z.tabelle!.zeilen.map((r) => r.grundlage)];
    for (const f of felder) if (/30 Verk/.test(f)) expect(f, f).toMatch(/2\.000\s€/);
  });

  it("Quellen sind https-Links, Gesetze zeigen auf gesetze-im-internet.de, TikTok-Quellen tragen ihren Stand", () => {
    expect(z.quellen.length).toBeGreaterThanOrEqual(10);
    for (const q of z.quellen) {
      expect(q.url, q.label).toMatch(/^https:\/\//);
      if (q.label.startsWith("§")) expect(q.url, q.label).toContain("gesetze-im-internet.de");
      if (q.url.includes("seller-de.tiktok.com")) expect(q.label, q.label).toMatch(/Stand \d{2}\.\d{2}\.\d{4}/);
    }
    expect(new Set(z.quellen.map((q) => q.url)).size).toBe(z.quellen.length);
  });

  it("ist von der Startseite, aus dem Footer und aus der Checkliste verlinkt", () => {
    expect(lies("src/components/landing/Hero.tsx")).toContain('"/tiktok-shop"');
    expect(lies("src/components/landing/Footer.tsx")).toContain('"/tiktok-shop"');
    expect(FREE_TOOL_BY_SLUG["tiktok-shop-checkliste"].links!.some((l) => l.to === "/tiktok-shop")).toBe(true);
  });

  it("die Checkliste nennt das geltende Verpackungsrecht", () => {
    const t = FREE_TOOL_BY_SLUG["tiktok-shop-checkliste"].generate({ rolle: "haendler", alter: "18", gewerbe: "nein", form: "kapital" });
    expect(t).toContain("VerpackDG");
    expect(t).not.toMatch(/VerpackG\b/);
    expect(t).toContain("an die Steuerbehörden");
  });
});
