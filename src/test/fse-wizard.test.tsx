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

  it("hat alle 22 Teilseiten (Startseite 0 bis Anlagen 22)", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Angaben zur Person.*Zeilen 1-12/);
    expect(html).toMatch(/Ehegatte.*Zeilen 26-42/);
    expect(html).toMatch(/SEPA-Lastschriftmandat/);
    expect(html).toMatch(/Bisherige persönliche Verhältnisse/);
    expect(html).toMatch(/Konzern.*Beteiligungsverhältnisse/);
    expect(html).toMatch(/Freistellungsbescheinigung.*48b/);
    expect(html).toMatch(/Anlagen.*Abschluss/);
  });

  it("zeigt ~300 Felder über alle Teilseiten verteilt", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Identifikationsnummer/);
    expect(html).toMatch(/Kleinunternehmer-Regelung/);
    expect(html).toMatch(/USt-Identifikationsnummer/);
    expect(html).toMatch(/Soll.*Ist|Ist.*Versteuerung/);
    expect(html).toMatch(/Reverse Charge/);
    expect(html).toMatch(/Differenzbesteuerung/);
    expect(html).toMatch(/OSS-Verfahren|One-Stop-Shop/);
  });

  it("verlinkt zu beiden ELSTER-FsE-Formularen (Einzel + Kap.-Ges.)", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/fseeun/);
    expect(html).toMatch(/fsekapg/);
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
    fireEvent.click(screen.getByText("Privatkunden (B2C)"));
    fireEvent.click(screen.getByText("Nein"));
    expect(document.body.innerHTML).toMatch(/REGELBESTEUERUNG zwingend/);
  });
});

describe("FseWizard — Cross-Links + Final-Check", () => {
  it("verlinkt zu GewerbeanmeldungWizard, SchwellenCheck, Roadmap, BruttoNetto", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbeanmeldung-wizard/);
    expect(html).toMatch(/\/cockpit\/schwellen-check/);
    expect(html).toMatch(/\/cockpit\/erste-schritte-roadmap/);
    expect(html).toMatch(/\/cockpit\/brutto-netto-solo/);
  });

  it("zeigt Vor-Absenden-Checkliste mit Steuer-ID + KU + Lastschrift", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Steuer-ID.*dreimal|11 Stellen/);
    expect(html).toMatch(/19 KU/);
    expect(html).toMatch(/Lastschriftmandat/);
  });
});
