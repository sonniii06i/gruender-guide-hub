/**
 * Funnel-Seiten (08.11.2026): Advertorials sind als Anzeige gekennzeichnet und noindex, alle CTAs führen auf /start,
 * keine verbotenen Werbewörter (werbung-belegbar), jede Funnel-Seite nennt ihre Quellen.
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import React from "react";
import AdvFragebogen from "@/pages/funnel/AdvFragebogen";
import ListicleGruendung from "@/pages/funnel/ListicleGruendung";

const zeig = (ui: React.ReactElement) =>
  render(<HelmetProvider><MemoryRouter>{ui}</MemoryRouter></HelmetProvider>);

const VERBOTEN = /garantiert|100\s?%|risikolos|abmahnsicher|nur heute|Nr\.\s?1/i;

describe("Funnel-Advertorials", () => {
  for (const [name, Seite] of [["AdvFragebogen", AdvFragebogen], ["ListicleGruendung", ListicleGruendung]] as const) {
    it(`${name}: Anzeige-Kennzeichnung, CTA auf /start, Quellen, keine verbotenen Wörter`, () => {
      zeig(<Seite />);
      const html = document.body.innerHTML;
      expect(html).toMatch(/Anzeige/);
      const ctas = Array.from(document.querySelectorAll("a[data-track]")).map((a) => a.getAttribute("href"));
      expect(ctas.length).toBeGreaterThan(0);
      expect(ctas.every((h) => h === "/start")).toBe(true);
      expect(html).toMatch(/Quellen/);
      expect(document.body.textContent || "").not.toMatch(VERBOTEN);
    });
  }
});

describe("Funnel-Quelltexte", () => {
  it("Advertorials und /start sind noindex, die Vergleichsseite ist indexierbar", () => {
    for (const f of ["Start", "AdvFragebogen", "ListicleGruendung"]) {
      expect(readFileSync(`src/pages/funnel/${f}.tsx`, "utf8")).toMatch(/\bnoindex\b/);
    }
    expect(readFileSync("src/pages/funnel/VergleichWege.tsx", "utf8")).not.toMatch(/\bnoindex\b/);
  });

  it("/start nutzt den bestehenden Kaufweg (Startangebot) und keine erfundenen Bewertungen", () => {
    const s = readFileSync("src/pages/funnel/Start.tsx", "utf8");
    expect(s).toMatch(/StartAngebotButton/);
    expect(s).not.toMatch(/Bewertung|Sterne|★/);
    expect(s).not.toMatch(VERBOTEN);
  });

  it("Prerender und Sitemap kennen die neuen Routen", () => {
    const pre = readFileSync("scripts/prerender.mjs", "utf8");
    for (const r of ["/start", "/anzeige/fragebogen-steuerliche-erfassung", "/anzeige/gruendung-5-gruende"]) expect(pre).toContain(`"${r}"`);
    expect(readFileSync("scripts/generate-sitemap.ts", "utf8")).toContain("/vergleich/gruendung-selbst-steuerberater-gruenderx");
  });
});
