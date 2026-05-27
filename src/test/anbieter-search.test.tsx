/**
 * Tests für Anbieter-Vergleich: Suche + Kategorie-Filter.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

import Anbieter, { PROVIDERS } from "@/pages/Anbieter";
import AnbieterDetail from "@/pages/AnbieterDetail";

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

const resultCount = () => {
  // Header-Zeile: "... (N Anbieter)"
  const h2 = screen.getByRole("heading", { level: 2 });
  const m = within(h2).getByText(/\(\d+ Anbieter\)/).textContent ?? "";
  return parseInt(m.match(/\((\d+)/)?.[1] ?? "-1", 10);
};

describe("Anbieter — Suche", () => {
  it("zeigt initial alle Provider", () => {
    renderWithRouter(<Anbieter />);
    expect(resultCount()).toBe(PROVIDERS.length);
  });

  it("filtert Ergebnisse beim Tippen in die Suche", () => {
    renderWithRouter(<Anbieter />);
    const input = screen.getByPlaceholderText(/suchen/i);
    fireEvent.change(input, { target: { value: "stripe" } });
    const n = resultCount();
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(PROVIDERS.length);
  });

  it("Suche crasht nicht bei Query (alle Provider haben pros/cons/tagline)", () => {
    renderWithRouter(<Anbieter />);
    const input = screen.getByPlaceholderText(/suchen/i);
    // Query, das viele Provider durchläuft → würde bei undefined .join() crashen
    fireEvent.change(input, { target: { value: "a" } });
    expect(resultCount()).toBeGreaterThan(0);
  });

  it("zeigt Leer-Zustand bei No-Match", () => {
    renderWithRouter(<Anbieter />);
    const input = screen.getByPlaceholderText(/suchen/i);
    fireEvent.change(input, { target: { value: "zzzqxnonexistent" } });
    expect(resultCount()).toBe(0);
    expect(screen.getByText(/Keine Anbieter gefunden/)).toBeTruthy();
  });

  it("sucht global, auch wenn via ?cat=-Link eine Kategorie vorgewählt ist", () => {
    // Reinkommen mit vorgewählter Banking-DE-Kategorie (wie von Feature-Cards verlinkt)
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/anbieter?cat=Banking+DE"]}>
          <Anbieter />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const input = screen.getByPlaceholderText(/suchen/i);
    // "amex" ist Kreditkarten, NICHT Banking DE → darf nicht durch Scope verschluckt werden
    fireEvent.change(input, { target: { value: "amex" } });
    expect(resultCount()).toBeGreaterThan(0);
  });
});

describe("Anbieter — Kreditkarten-Kategorie", () => {
  it("hat mindestens eine Kreditkarten-Kategorie-Provider", () => {
    const kk = PROVIDERS.filter((p) => p.category === "Kreditkarten");
    expect(kk.length).toBeGreaterThan(0);
  });

  it("rendert den Kreditkarten-Kategorie-Button", () => {
    renderWithRouter(<Anbieter />);
    expect(screen.getAllByText("Kreditkarten").length).toBeGreaterThan(0);
  });
});

describe("AnbieterDetail — neue Kreditkarten-Provider rendern ohne Crash", () => {
  const renderDetail = (slug: string) =>
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/anbieter/${slug}`]}>
          <Routes>
            <Route path="/anbieter/:slug" element={<AnbieterDetail />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

  // Auch die mit fehlenden LEGAL_URLS/FULL_DESCRIPTIONS (Crash-Risiko-Kandidaten)
  ["amex-business-gold", "amex-business-platinum", "pleo", "moss", "payhawk", "spendesk"].forEach(
    (slug) => {
      it(`Detailseite /${slug} rendert (Name + CTA)`, () => {
        renderDetail(slug);
        const p = PROVIDERS.find((x) => x.slug === slug)!;
        expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
        // CTA-Link "Zum Anbieter" muss auf p.url zeigen
        const ctas = screen.getAllByText("Zum Anbieter");
        const href = ctas[0].closest("a")?.getAttribute("href");
        expect(href).toBe(p.url);
      });
    },
  );

  it("Amex-Gold-Detailseite verlinkt auf den Referral-Link", () => {
    renderDetail("amex-business-gold");
    const href = screen.getAllByText("Zum Anbieter")[0].closest("a")?.getAttribute("href");
    expect(href).toContain("ref=sONNIBIJNE");
  });
});
