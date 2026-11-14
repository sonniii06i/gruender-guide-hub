import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import VergleichWege from "@/pages/funnel/VergleichWege";
import { EUER_HONORAR, STBVV, VERGLEICH_STAND } from "@/data/vergleichWege";
import { formatEurCents } from "@/config/pricing";

// Vergleichsseite (Überarbeitung growth-lp 14.11.2026): Die Honorarspanne des Steuerberaters ist gerechnet,
// nicht getippt. Ändert sich die Verordnung, ändert man STBVV und die Seite zieht nach.
describe("/vergleich/gruendung-selbst-steuerberater-gruenderx", () => {
  it("rechnet die Einnahmenüberschussrechnung nach § 25 StBVV und Tabelle B", () => {
    expect(STBVV.mindestGegenstandswert).toBe(17500);
    expect(STBVV.volleGebuehrTabelleBCents).toBe(16600);
    expect(formatEurCents(EUER_HONORAR.nettoVon)).toBe("83,00 €");
    expect(formatEurCents(EUER_HONORAR.nettoBis)).toBe("498,00 €");
    expect(formatEurCents(EUER_HONORAR.bruttoVon)).toBe("98,77 €");
    expect(formatEurCents(EUER_HONORAR.bruttoBis)).toBe("592,62 €");
  });

  it("zeigt Antwort zuerst, Stand, Kostentabelle, genau eine H1 und nur /start als Kauf-CTA", () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <VergleichWege />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const text = container.textContent || "";
    expect(container.querySelectorAll("h1").length).toBe(1);
    expect(container.querySelector("h1")!.textContent).toMatch(/Nebengewerbe.*Steuerberater\?/);
    expect(text).toContain(`Stand: ${VERGLEICH_STAND.text}`);
    expect(text).toContain("83,00 € bis 498,00 € netto");
    expect(text).toContain("98,77 € bis 592,62 €");
    expect(text).toContain("Eigenes Produkt im Vergleich");
    expect(container.querySelectorAll("table").length).toBe(2);
    const ctas = Array.from(container.querySelectorAll("a[data-track]")).map((a) => a.getAttribute("href"));
    expect(ctas.length).toBe(2);
    expect(ctas.every((h) => h === "/start")).toBe(true);
    expect(text).not.toMatch(/garantiert|stressfrei|steuerfrei|Steuern sparen|Testsieger|günstiger als/i);
  });

  it("ist von Startseite, Preisseite und Footer verlinkt und steht in der Sitemap", () => {
    const pfad = "/vergleich/gruendung-selbst-steuerberater-gruenderx";
    for (const f of ["src/components/landing/Comparison.tsx", "src/pages/Preise.tsx", "src/components/landing/Footer.tsx", "scripts/generate-sitemap.ts"]) {
      expect(readFileSync(f, "utf8"), f).toContain(pfad);
    }
  });
});
