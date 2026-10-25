import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";
import { ZIELGRUPPEN } from "@/data/zielgruppen";
import { PLAYBOOKS } from "@/data/playbooks";

// Creator-/TikTok-Shop-Ausbau 25.10.2026: Rechenlogik der Gratis-Tools und
// Verlinkung der Zielgruppen-Landings.
const tool = (slug: string) => FREE_TOOL_BY_SLUG[slug];

describe("Influencer-Steuer-Check", () => {
  const gen = tool("influencer-steuer-check").generate;

  it("nennt Gewerbe und Monatsfrist, wenn noch nicht angemeldet", () => {
    const t = gen({ q_affiliate: true, angemeldet: "nein", alter: "18", startjahr: "ja" });
    expect(t).toContain("Gewerbe beim örtlichen Gewerbeamt anmelden");
    expect(t).toContain("innerhalb eines Monats");
    expect(t).toContain("Affiliate-Provisionen");
  });

  it("Kleinunternehmer im Startjahr nur bis 25.000 €", () => {
    expect(gen({ angemeldet: "ja", startjahr: "ja", umsatz: "20000" })).toContain("Kleinunternehmerregelung (§ 19 UStG) nutzen");
    expect(gen({ angemeldet: "ja", startjahr: "ja", umsatz: "30.000" })).toContain("über der Kleinunternehmergrenze");
  });

  it("Gewerbesteuer erst über 24.500 €", () => {
    expect(gen({ gewinn: "24000" })).not.toContain("Dann fällt Gewerbesteuer an");
    expect(gen({ gewinn: "30000" })).toContain("Dann fällt Gewerbesteuer an");
  });

  it("weist Minderjährige auf Familiengericht und TikTok-Mindestalter hin", () => {
    const t = gen({ alter: "u18" });
    expect(t).toContain("§ 112 BGB");
    expect(t).toContain("18 Jahren");
  });
});

describe("PR-Paket-Rechner", () => {
  const gen = tool("pr-paket-rechner").generate;

  it("rechnet Endpreis minus Rabatt, Rücksendung zählt nicht", () => {
    const t = gen({
      p1_name: "Kopfhörer", p1_preis: "200", p1_rabatt: "10", p1_verbleib: "behalten",
      p2_name: "Jacke", p2_preis: "150", p2_rabatt: "0", p2_verbleib: "zurueck",
      ust: "regel",
    });
    expect(t).toContain("180,00 €");
    expect(t).toContain("keine Einnahme");
    expect(t).toMatch(/Summe als Betriebseinnahme anzusetzen: 180,00 €/);
  });

  it("erklärt die Entnahme bei privater Weiternutzung", () => {
    expect(gen({ p1_name: "Kamera", p1_preis: "500", p1_verbleib: "privat", ust: "ku" })).toContain("Entnahme");
  });
});

describe("TikTok-Shop-Checkliste", () => {
  const gen = tool("tiktok-shop-checkliste").generate;

  it("ohne Handelsregister: gewerbliche Verkäufer mit Steuernummer, keine USt-IdNr-Pflicht", () => {
    const t = gen({ rolle: "haendler", alter: "18", gewerbe: "nein", form: "gewerblich" });
    expect(t).toContain("gewerbliche:r Verkäufer:in");
    expect(t).toContain("kein Führerschein");
    expect(t).not.toMatch(/USt-IdNr beim Bundeszentralamt/);
  });

  it("e.K. und GbR: USt-IdNr verlangt", () => {
    expect(gen({ rolle: "haendler", form: "ek" })).toContain("USt-IdNr beim Bundeszentralamt");
    expect(gen({ rolle: "haendler", form: "gbr" })).toContain("mehr als 25 % Anteil");
  });

  it("Produktpflichten nur für Verkäufer, WEEE nur bei Elektro", () => {
    expect(gen({ rolle: "affiliate", form: "gewerblich" })).not.toContain("LUCID");
    expect(gen({ rolle: "haendler", form: "gewerblich" })).not.toContain("WEEE");
    expect(gen({ rolle: "haendler", form: "gewerblich", p_elektro: true })).toContain("WEEE");
  });

  it("stoppt unter 18", () => {
    expect(gen({ rolle: "beides", alter: "u18" })).toContain("Mindestalter von 18 Jahren");
  });
});

describe("Zielgruppen-Landings", () => {
  const app = readFileSync(resolve(__dirname, "../App.tsx"), "utf8");
  const sitemap = readFileSync(resolve(__dirname, "../../scripts/generate-sitemap.ts"), "utf8");
  const guides = new Set(PLAYBOOKS.map((p) => p.slug));

  for (const z of ZIELGRUPPEN) {
    it(`/${z.slug} hat Route und Sitemap-Eintrag`, () => {
      expect(app).toContain(`path="/${z.slug}"`);
      expect(sitemap).toContain(`path: "/${z.slug}"`);
    });

    it(`/${z.slug}: Gratis-Tools und Guides existieren`, () => {
      for (const t of z.freeTools) expect(FREE_TOOL_BY_SLUG[t.to.slice(1)], t.to).toBeDefined();
      for (const g of z.guides.filter((g) => g.to.startsWith("/guides/"))) expect(guides.has(g.to.slice(8)), g.to).toBe(true);
    });

    it(`/${z.slug}: SEO-Längen`, () => {
      expect(z.seoTitle.length).toBeLessThanOrEqual(60);
      expect(z.seoDescription.length).toBeLessThanOrEqual(160);
    });
  }

  it("neue Gratis-Tools stehen in Route und Sitemap", () => {
    for (const slug of ["influencer-steuer-check", "tiktok-shop-checkliste", "pr-paket-rechner"]) {
      expect(app).toContain(`<FreeToolRoute slug="${slug}" />`);
      expect(sitemap).toContain(`path: "/${slug}"`);
      expect(tool(slug).seo.title.length).toBeLessThanOrEqual(60);
      expect(tool(slug).seo.description.length).toBeLessThanOrEqual(160);
    }
  });
});

describe("zahl(): deutsche Beträge", async () => {
  const { zahl } = await import("@/lib/freetools/types");
  it("liest Tausenderpunkt ohne Komma", () => {
    expect(zahl("30.000")).toBe(30000);
    expect(zahl("1.234.567")).toBe(1234567);
    expect(zahl("1.500,50 €")).toBe(1500.5);
    expect(zahl("249")).toBe(249);
    expect(zahl("12.5")).toBe(12.5);
    expect(zahl("")).toBe(0);
  });
});
