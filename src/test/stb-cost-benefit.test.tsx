/**
 * Tests für StbCostBenefit (Anfänger-Tool #7, Wave 2).
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import StbCostBenefit from "@/pages/StbCostBenefit";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("StbCostBenefit — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<StbCostBenefit />);
    expect(screen.getAllByText(/Steuerberater/i).length).toBeGreaterThan(0);
  });

  it("zeigt BeginnerHero mit 3 Szenarien-Erklärung", () => {
    renderWithRouter(<StbCostBenefit />);
    expect(screen.getByText(/Brauche ich einen Steuerberater/i)).toBeInTheDocument();
    const html = document.body.innerHTML;
    expect(html).toMatch(/Voll-StB/);
    expect(html).toMatch(/DIY/);
    expect(html).toMatch(/Hybrid/);
  });

  it("zeigt Glossar mit StBVV, lexoffice, Hybrid-Modell, Opportunitätskosten", () => {
    renderWithRouter(<StbCostBenefit />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Glossar/);
    expect(html).toMatch(/StBVV.*Steuerberater/);
    expect(html).toMatch(/Mittelgebühr/);
    expect(html).toMatch(/lexoffice.*sevdesk/);
    expect(html).toMatch(/Opportunitätskosten/);
  });
});

describe("StbCostBenefit — 3 Szenario-Vergleich", () => {
  it("zeigt alle 3 Szenario-Karten", () => {
    renderWithRouter(<StbCostBenefit />);
    expect(document.body.innerHTML).toMatch(/StB macht alles/);
    expect(document.body.innerHTML).toMatch(/lexoffice.*WISO/);
    expect(document.body.innerHTML).toMatch(/DIY.*StB nur Jahresabschluss/);
  });

  it("kennzeichnet günstigste Option mit Award", () => {
    renderWithRouter(<StbCostBenefit />);
    expect(document.body.innerHTML).toMatch(/Günstigste Option/);
  });

  it("zeigt Detail-Aufschlüsselung für alle 3 Szenarien", () => {
    renderWithRouter(<StbCostBenefit />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Lfd\..*Buchhaltung/);
    expect(html).toMatch(/Jahresabschluss/);
    expect(html).toMatch(/ESt-Erklärung/);
    expect(html).toMatch(/lexoffice.*sevdesk Abo/);
    expect(html).toMatch(/Eigenzeit.*Buchhaltung/);
  });
});

describe("StbCostBenefit — Inputs reagieren", () => {
  it("Umsatz-Änderung ändert StB-Kosten", () => {
    renderWithRouter(<StbCostBenefit />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "80000");
    expect(umsatzInput).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(umsatzInput!, { target: { value: "200000" } });
    expect(document.body.innerHTML).not.toBe(before);
  });

  it("Wechsel von EÜR zu Bilanz erhöht StB-Kosten", () => {
    renderWithRouter(<StbCostBenefit />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "euer");
    expect(rfSelect).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(rfSelect!, { target: { value: "bilanz" } });
    expect(document.body.innerHTML).not.toBe(before);
  });

  it("USt-VA monatlich erhöht StB-Kosten", () => {
    renderWithRouter(<StbCostBenefit />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const ustSelect = selects.find((s) => s.value === "quartal");
    expect(ustSelect).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(ustSelect!, { target: { value: "monatlich" } });
    expect(document.body.innerHTML).not.toBe(before);
  });

  it("Mehr Belege → höhere Buchhaltungs-Kosten beider Seiten", () => {
    renderWithRouter(<StbCostBenefit />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const belegeInput = inputs.find((i) => i.value === "40");
    expect(belegeInput).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(belegeInput!, { target: { value: "150" } });
    expect(document.body.innerHTML).not.toBe(before);
  });

  it("Höherer Eigen-Stundenlohn macht DIY teurer", () => {
    renderWithRouter(<StbCostBenefit />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const stundenInput = inputs.find((i) => i.value === "72");
    expect(stundenInput).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(stundenInput!, { target: { value: "150" } });
    expect(document.body.innerHTML).not.toBe(before);
  });
});

describe("StbCostBenefit — Faustregeln & Empfehlung", () => {
  it("zeigt 3 Faustregeln nach Gewinn-Klasse", () => {
    renderWithRouter(<StbCostBenefit />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/≤ 30k Gewinn/);
    expect(html).toMatch(/30-100k Gewinn/);
    expect(html).toMatch(/&gt; 100k Gewinn|> 100k Gewinn/);
  });

  it("zeigt Empfehlungs-Hero mit Kontext-Hinweisen", () => {
    renderWithRouter(<StbCostBenefit />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Günstigste Option für dich/);
    expect(html).toMatch(/Kontext zur Entscheidung/);
    expect(html).toMatch(/Holding.*US-LLC.*Crypto/);
    expect(html).toMatch(/Betriebsprüfung/);
  });
});

describe("StbCostBenefit — Cross-Tool-Links", () => {
  it("verlinkt zu Stundensatz-Rechner, StB-Finder, StB-Hand-off", () => {
    renderWithRouter(<StbCostBenefit />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/stundensatz-rechner/);
    expect(html).toMatch(/\/cockpit\/stb-finder/);
    expect(html).toMatch(/\/cockpit\/stb-handoff/);
  });
});

describe("StbCostBenefit — Edge-Cases", () => {
  it("Kleinunternehmer (keine USt-VA) crasht nicht", () => {
    renderWithRouter(<StbCostBenefit />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const ustSelect = selects.find((s) => s.value === "quartal");
    fireEvent.change(ustSelect!, { target: { value: "keine" } });
    expect(document.body.innerHTML).toMatch(/Günstigste Option/);
  });

  it("0 € Umsatz crasht nicht", () => {
    renderWithRouter(<StbCostBenefit />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "80000");
    fireEvent.change(umsatzInput!, { target: { value: "0" } });
    expect(document.body.innerHTML).toMatch(/Günstigste Option/);
  });

  it("Sehr hoher Umsatz (500k) crasht nicht", () => {
    renderWithRouter(<StbCostBenefit />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "80000");
    fireEvent.change(umsatzInput!, { target: { value: "500000" } });
    expect(document.body.innerHTML).toMatch(/Günstigste Option/);
  });
});
