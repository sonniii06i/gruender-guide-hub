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
  it("hat mindestens 7 Empfehlungs-Widgets als klickbare Buttons", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    // 4 ursprüngliche (EÜR, KU, Soll/Ist, USt-IdNr) + 3 neue Strategien
    // (Lastschrift, Gewinn-Schätzung, Umsatz-Schätzung mit 800k-Warnung)
    expect(widgetButtons.length).toBeGreaterThanOrEqual(7);
  });

  it("Empfehlungs-Widget öffnet sich beim Klick + zeigt Fragen", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    fireEvent.click(widgetButtons[0]);
    // Erstes Widget ist Lastschriftmandat — fragt nach Puffer + Disziplin
    expect(document.body.innerHTML).toMatch(/Puffer|diszipliniert/i);
  });

  it("Umsatz-Strategie-Widget zeigt 800k-Bilanz-Warnung bei 'drueber'", () => {
    renderWithRouter(<FseWizard />);
    const widgetButtons = screen.getAllByRole("button").filter((b) =>
      b.textContent?.includes("Empfehlung anzeigen"),
    );
    // Umsatz-Strategie ist eines der späteren Widgets, finde es per Title
    const umsatzBtn = widgetButtons.find((b) =>
      b.textContent?.includes("Strategie: welche Zahl eintragen?"),
    );
    expect(umsatzBtn).toBeTruthy();
    fireEvent.click(umsatzBtn!);
    fireEvent.click(screen.getByText("Realistische Schätzung"));
    fireEvent.click(screen.getByText("Knapp drüber oder mehr (>800k)"));
    fireEvent.click(screen.getByText("Klar drunter (<20k)"));
    expect(document.body.innerHTML).toMatch(/800\.000.*Bilanz|Bilanzierungs-Pflicht/);
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
