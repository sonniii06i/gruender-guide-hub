/**
 * Tests für SchwellenCheck (Anfänger-Tool #3).
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import SchwellenCheck from "@/pages/SchwellenCheck";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("SchwellenCheck — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<SchwellenCheck />);
    expect(screen.getAllByText(/Schwellen|Freibetrag|Side-Hustle/i).length).toBeGreaterThan(0);
  });
  it("hat BeginnerHero mit 'Was ist das hier?'", () => {
    renderWithRouter(<SchwellenCheck />);
    expect(screen.getByText(/Was ist das hier/i)).toBeInTheDocument();
  });
  it("erklärt Freibetrag vs Freigrenze im Hero", () => {
    renderWithRouter(<SchwellenCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Freibetrag/);
    expect(html).toMatch(/Freigrenze/);
  });
  it("hat Glossar mit Kern-Begriffen", () => {
    renderWithRouter(<SchwellenCheck />);
    expect(screen.getAllByText(/Glossar/i).length).toBeGreaterThan(0);
    const html = document.body.innerHTML;
    expect(html).toMatch(/DAC7/);
    expect(html).toMatch(/CARF/);
    expect(html).toMatch(/Sparerpauschbetrag/);
    expect(html).toMatch(/Übungsleiter/);
  });
});

describe("SchwellenCheck — Quick-Check Einkommens-Quellen", () => {
  it("zeigt mind. 10 Einkommens-Quellen", () => {
    renderWithRouter(<SchwellenCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Privater Verkauf.*eBay/i);
    expect(html).toMatch(/Online-Handel/i);
    expect(html).toMatch(/Freelance/i);
    expect(html).toMatch(/Übungsleiter/i);
    expect(html).toMatch(/Ehrenamt/i);
    expect(html).toMatch(/Crypto-Handel/i);
    expect(html).toMatch(/Kapitalerträge/i);
    expect(html).toMatch(/Vermietung/i);
    expect(html).toMatch(/YouTube.*Twitch/i);
  });

  it("Suche filtert Quellen", () => {
    renderWithRouter(<SchwellenCheck />);
    const search = screen.getByPlaceholderText(/eBay.*Crypto.*Übungsleiter/i);
    fireEvent.change(search, { target: { value: "crypto" } });
    expect(document.body.innerHTML).toMatch(/Crypto-Handel/);
    // andere sollten weg sein
    expect(screen.queryByText(/Übungsleiter \/ Trainer/i)).toBeNull();
  });

  it("Klick auf Übungsleiter zeigt Detail-Karte", () => {
    renderWithRouter(<SchwellenCheck />);
    fireEvent.click(screen.getByText(/Übungsleiter \/ Trainer/i));
    expect(document.body.innerHTML).toMatch(/§3 Nr\. 26 EStG/);
    expect(document.body.innerHTML).toMatch(/3\.000/);
  });
});

describe("SchwellenCheck — Schwelle-Verdict mit Eingabe-Betrag", () => {
  it("Übungsleiter 2.000 € → unter Schwelle, steuerfrei", () => {
    renderWithRouter(<SchwellenCheck />);
    fireEvent.click(screen.getByText(/Übungsleiter \/ Trainer/i));
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: "2000" } });
    expect(screen.getByText(/Unter der Schwelle/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/STEUER-FREI/);
  });

  it("Übungsleiter 3.500 € → über Schwelle, Mehrbetrag versteuert", () => {
    renderWithRouter(<SchwellenCheck />);
    fireEvent.click(screen.getByText(/Übungsleiter \/ Trainer/i));
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: "3500" } });
    expect(screen.getByText(/Über der Schwelle/i)).toBeInTheDocument();
  });

  it("YouTube-Twitch: keine Freigrenze → sofortige Anmelde-Pflicht", () => {
    renderWithRouter(<SchwellenCheck />);
    fireEvent.click(screen.getByText(/YouTube.*Twitch/i));
    // "Keine Freigrenze" steht im Button-Label UND im Verdict — beide sind OK
    expect(screen.getAllByText(/Keine Freigrenze/i).length).toBeGreaterThan(0);
    expect(document.body.innerHTML).toMatch(/melde-\/anmeldepflichtig|gewerblich/i);
  });

  it("Warnung bei 85% Annäherung an Freigrenze (Crypto bei 900€)", () => {
    renderWithRouter(<SchwellenCheck />);
    fireEvent.click(screen.getByText(/Crypto-Handel/i));
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: "900" } });
    expect(document.body.innerHTML).toMatch(/du näherst dich der Freigrenze/i);
  });
});

describe("SchwellenCheck — Schwellen-Übersichts-Tabelle", () => {
  it("zeigt alle 14 Schwellen", () => {
    renderWithRouter(<SchwellenCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Grundfreibetrag ESt \(Single\)/);
    expect(html).toMatch(/12\.348/);
    expect(html).toMatch(/Sonstige Einkünfte Freigrenze/);
    expect(html).toMatch(/Übungsleiter-Pauschale/);
    expect(html).toMatch(/Ehrenamts-Pauschale/);
    expect(html).toMatch(/DAC7-Plattform-Meldung Verkäufe/);
    expect(html).toMatch(/GewSt-Freibetrag/);
    expect(html).toMatch(/24\.500/);
    expect(html).toMatch(/Sparerpauschbetrag/);
  });

  it("unterscheidet Freibetrag von Freigrenze in Übersicht", () => {
    renderWithRouter(<SchwellenCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Freigrenze ⚠/);
    expect(html).toMatch(/Freibetrag</);
  });
});

describe("SchwellenCheck — Kombinations-Hinweise", () => {
  it("zeigt 'Übungsleiter + Ehrenamt kumulierbar'", () => {
    renderWithRouter(<SchwellenCheck />);
    expect(document.body.innerHTML).toMatch(/Übungsleiter.*Ehrenamt.*kumulierbar/i);
    expect(document.body.innerHTML).toMatch(/3\.840 €/);
  });
  it("warnt vor Abfärbetheorie bei KU + Gewerbe-Mix", () => {
    renderWithRouter(<SchwellenCheck />);
    expect(document.body.innerHTML).toMatch(/Abfärbetheorie/);
  });
});

describe("SchwellenCheck — Cross-Tool-Integration", () => {
  it("verlinkt zu GewerbeCheck und FreiberufCheck", () => {
    renderWithRouter(<SchwellenCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbe-check/);
    expect(html).toMatch(/\/cockpit\/freiberuf-check/);
    expect(html).toMatch(/\/cockpit\/ust-rechner/);
  });
});
