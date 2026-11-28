import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import ToolLanding from "@/pages/ToolLanding";
import { TOOL_TIEFE } from "@/data/toolTiefe";
import { TOOL_COPY as toolCopy } from "@/data/landingCopy.tools";

// Tool-Seite /tools/gewerbeanmeldung-wizard als Textseite (growth-lp 28.11.2026, Top-1-Programm Punkt 3).
const SLUG = "gewerbeanmeldung-wizard";
const t = TOOL_TIEFE[SLUG];

const seite = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/tools/${SLUG}`]}>
        <Suspense fallback={<p>lädt</p>}>
          <Routes>
            <Route path="/tools/:slug" element={<ToolLanding />} />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("/tools/gewerbeanmeldung-wizard", () => {
  it("hat Daten mit Stand, Quellen auf Primärseiten und ehrlichem Preis", () => {
    expect(t).toBeTruthy();
    expect(t.stand.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(t.quellen.length).toBeGreaterThanOrEqual(8);
    expect(t.quellen.every((q) => q.href.startsWith("https://"))).toBe(true);
    const preis = t.einwaende.punkte.find((p) => /kostet/.test(p.q))!.a;
    expect(preis).toContain("64,99 €");
    expect(preis).toContain("inklusive Umsatzsteuer");
    expect(preis).toContain("Amtsgebühren");
    const alles = JSON.stringify(t);
    expect(alles).not.toMatch(/garantiert|rechtssicher|Steuerberatung inklusive|Testsieger|Nr\. ?1|tausende Gründer/i);
  });

  it("Titel und Beschreibung halten die Längen des Indexierungs-Standards", () => {
    const c = toolCopy[SLUG];
    expect(c.seoTitle.length).toBeLessThanOrEqual(60);
    expect(c.seoDescription.length).toBeGreaterThanOrEqual(120);
    expect(c.seoDescription.length).toBeLessThanOrEqual(160);
    expect(JSON.stringify(c)).not.toMatch(/WZ-2008-Branchenschlüssel für deine/);
  });

  it("zeigt Antwort zuerst, Stand, Feld-Tabelle, Quellen und genau eine H1", async () => {
    const { container } = seite();
    await waitFor(() => expect(container.querySelector("h1")).toBeTruthy(), { timeout: 5000 });
    expect(container.querySelectorAll("h1").length).toBe(1);
    expect(container.querySelector("h1")!.textContent).toBe(t.h1);
    const text = container.textContent || "";
    expect(text).toContain(t.antwort.frage);
    expect(text).toContain(`Stand: ${t.stand.text}`);
    for (const feld of ["18 · Angemeldete Tätigkeit", "19 · Nebenerwerb", "21 · Art des Betriebes"]) expect(text).toContain(feld);
    expect(text).toContain("innerhalb dreier Tage");
    expect(text).toContain("5.200 €");
    expect(container.querySelector('a[href="/forms/gewa1.pdf"]')).toBeTruthy();
    expect(container.querySelectorAll('a[href^="https://www.gesetze-im-internet.de/"]').length).toBeGreaterThanOrEqual(7);
  });

  it("setzt Titel, Canonical und JSON-LD mit WebPage (Stand, Autor) und allen Fragen", async () => {
    seite();
    await waitFor(() => expect(document.title).toBe(toolCopy[SLUG].seoTitle), { timeout: 5000 });
    const canon = document.head.querySelectorAll('link[rel="canonical"]');
    expect(canon.length).toBe(1);
    expect(canon[0].getAttribute("href")).toBe(`https://gruenderx.de/tools/${SLUG}`);
    const ld = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]')).flatMap((s) => {
      const j = JSON.parse(s.textContent || "null");
      return Array.isArray(j) ? j : [j];
    });
    const web = ld.find((x) => x["@type"] === "WebPage");
    expect(web.dateModified).toBe(t.stand.iso);
    expect(web.author.name).toBe("Sonni Buttke");
    const faq = ld.find((x) => x["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBe(t.faq.length + 1);
    expect(ld.find((x) => x["@type"] === "SoftwareApplication").offers.price).toBe("64.99");
  });
});
