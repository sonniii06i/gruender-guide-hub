/**
 * Tests für FseWizard (Erklär-Begleiter, kein Input-Tool).
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

import FseWizard from "@/pages/FseWizard";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  localStorage.clear();
});

describe("FseWizard — Render + Struktur", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<FseWizard />);
    expect(screen.getAllByText(/Fragebogen zur steuerlichen Erfassung/).length).toBeGreaterThan(0);
  });

  it("zeigt Hero mit 5-Jahres-KU-Warnung + 1-Monats-Frist", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/5 Jahre Bindung/);
    expect(html).toMatch(/1 Monat ab Start|1 Monat ab Tätigkeit/);
  });

  it("hat alle 10 Sektionen (A bis J)", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Allgemeine Angaben/);
    expect(html).toMatch(/Anschrift des Unternehmens/);
    expect(html).toMatch(/Bankverbindung/);
    expect(html).toMatch(/Steuerliche Beratung/);
    expect(html).toMatch(/gewerblichen \/ freiberuflichen Tätigkeit/);
    expect(html).toMatch(/Festsetzung der Vorauszahlungen/);
    expect(html).toMatch(/Gewinnermittlung/);
    expect(html).toMatch(/Lohnsteuer/);
    expect(html).toMatch(/Umsatzsteuer.*wichtigsten/);
    expect(html).toMatch(/Besondere Sachverhalte/);
  });

  it("zeigt nummerierte Felder (mind. Feld 1, 18, 28, 35)", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Steuernummer/);
    expect(html).toMatch(/Steueridentifikationsnummer/);
    expect(html).toMatch(/Kleinunternehmer-Regelung.*19/);
    expect(html).toMatch(/USt-Identifikationsnummer/);
  });

  it("verlinkt zu beiden ELSTER-FsE-Formularen (natürlich + juristisch)", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/fsegewnatp/);
    expect(html).toMatch(/fsegewjur/);
  });
});

describe("FseWizard — Empfehlungs-Widgets", () => {
  it("hat 4 Empfehlungs-Karten als klickbare Buttons", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    expect(widgetButtons.length).toBe(4);
  });

  it("Empfehlungs-Widget öffnet sich beim Klick + zeigt Fragen", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    fireEvent.click(widgetButtons[0]);
    expect(document.body.innerHTML).toMatch(/Rechtsform\?|Umsatz\?/);
  });

  it("KU-Widget: bei Umsatz >25k zeigt 'REGELBESTEUERUNG zwingend'", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    // KU-Widget ist 2. Empfehlungs-Widget (nach EÜR/Bilanz)
    fireEvent.click(widgetButtons[1]);
    fireEvent.click(screen.getByText("über 25.000 €"));
    fireEvent.click(screen.getByText("Hauptsächlich Privatkunden (B2C)"));
    fireEvent.click(screen.getByText("Nein"));
    expect(document.body.innerHTML).toMatch(/REGELBESTEUERUNG zwingend/);
  });
});

describe("FseWizard — Cross-Links + Final-Check", () => {
  it("verlinkt zu GewerbeanmeldungWizard, SchwellenCheck, Roadmap, StB", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbeanmeldung-wizard/);
    expect(html).toMatch(/\/cockpit\/schwellen-check/);
    expect(html).toMatch(/\/cockpit\/erste-schritte-roadmap/);
    expect(html).toMatch(/\/cockpit\/stb-cost-benefit/);
  });

  it("zeigt Vor-Absenden-Checkliste mit Steuer-ID + KU + Lastschrift", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Steuer-ID.*dreimal|11 Stellen/);
    expect(html).toMatch(/19 KU/);
    expect(html).toMatch(/Lastschriftmandat/);
  });
});
