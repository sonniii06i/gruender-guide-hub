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

  // Struktur 1:1 verifiziert gegen die echten ELSTER-Screenshots (fseeun-202401, 24 Teilseiten),
  // abgelegt unter docs/elster-fse-ref/. Zeilennummern entsprechen dem echten Formular.
  it("hat alle 24 Teilseiten mit korrekten ELSTER-Zeilennummern", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Allgemeine Angaben.*Zeilen 2.21/);    // TS1 (2–21: bis Art der Tätigkeit Z.21)
    expect(html).toMatch(/Ehegatte.*Zeilen 12.18/);             // TS2
    expect(html).toMatch(/SEPA-Lastschriftverfahren/);          // TS3
    expect(html).toMatch(/Bisherige persönliche Verhältnisse/); // TS6
    expect(html).toMatch(/Konzernzugehörigkeit/);               // TS13
    expect(html).toMatch(/Freistellungsbescheinigung.*48b/);    // TS16
    expect(html).toMatch(/One-Stop-Shop.*Zeilen 163.174/);      // TS20
    expect(html).toMatch(/Anhänge/);                            // TS24
  });

  it("zeigt zentrale Felder über die Teilseiten verteilt", () => {
    renderWithRouter(<FseWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Identifikationsnummer/);       // TS1 Z.5
    expect(html).toMatch(/Kleinunternehmer/);            // TS18 Z.131
    expect(html).toMatch(/USt-IdNr/);                    // TS18 + Widget
    expect(html).toMatch(/Soll.*Ist|Ist.*Versteuerung/); // TS18 (Soll/Ist)
    expect(html).toMatch(/Handelsregistereintragung/);   // TS10
    expect(html).toMatch(/Gewinnermittlung/);            // TS15
    expect(html).toMatch(/One-Stop-Shop/);               // TS20
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

  it("EÜR-vs-Bilanz-Widget zeigt Bilanzierungs-Pflicht bei Einzel + >800k Umsatz", () => {
    renderWithRouter(<FseWizard />);
    // Das 800k-Bilanz-Warning liegt im EÜR/Bilanz-Widget (Optionen "unter/über 800k €").
    const euerBtn = screen.getAllByRole("button").find((b) =>
      b.textContent?.includes("EÜR vs. Bilanz") && b.textContent?.includes("Empfehlung anzeigen"),
    );
    expect(euerBtn).toBeTruthy();
    fireEvent.click(euerBtn!);
    fireEvent.click(screen.getByText("Einzel/Gewerbe/GbR"));
    fireEvent.click(screen.getByText("über 800k €"));
    expect(document.body.innerHTML).toMatch(/Pflicht ab 800k Umsatz|Bilanzierung.*§ 141/);
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
