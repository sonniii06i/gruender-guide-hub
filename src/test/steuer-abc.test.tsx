import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import SteuerABC from "@/pages/SteuerABC";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("SteuerABC — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<SteuerABC />);
    expect(screen.getAllByText(/Steuer-ABC|Glossar/i).length).toBeGreaterThan(0);
  });

  it("zeigt BeginnerHero", () => {
    renderWithRouter(<SteuerABC />);
    expect(screen.getByText(/Was ist das hier/i)).toBeInTheDocument();
  });

  it("hat mind. 60 Begriffe im Glossar", () => {
    renderWithRouter(<SteuerABC />);
    expect(document.body.innerHTML).toMatch(/(\d{2,3})\+\s*Begriffe|60\+/i);
    // 'Alle (XX)' Button zeigt Anzahl
    const html = document.body.innerHTML;
    const match = html.match(/📚 Alle \((\d+)\)/);
    expect(match).toBeTruthy();
    const count = parseInt(match![1]);
    expect(count).toBeGreaterThanOrEqual(60);
  });
});

describe("SteuerABC — Kategorie-Filter", () => {
  it("hat 10 Kategorien plus 'Alle'", () => {
    renderWithRouter(<SteuerABC />);
    expect(screen.getAllByText(/Steuer-Grundbegriffe/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rechtsformen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Buchhaltung/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Umsatzsteuer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sozial- & Krankenversicherung/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ESt-Anlagen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Freibeträge & Pauschalen/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Finanzamt-Verfahren/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Internationales/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Investoren & Crypto/i).length).toBeGreaterThan(0);
  });

  it("Kategorie-Filter filtert Begriffe", () => {
    renderWithRouter(<SteuerABC />);
    // Erster Treffer ist der Filter-Button
    const filterButtons = screen.getAllByText(/Investoren & Crypto/i);
    fireEvent.click(filterButtons[0]);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Abgeltungsteuer/);
    expect(html).toMatch(/FIFO/);
    // Andere Kategorien jetzt ausgefiltert
    expect(html).not.toMatch(/Anlage V/);
  });
});

describe("SteuerABC — Suche", () => {
  it("Such-Filter findet nach Begriff", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "Reverse Charge" } });
    expect(document.body.innerHTML).toMatch(/Reverse Charge/);
    expect(screen.getByText(/Treffer/i)).toBeInTheDocument();
  });

  it("Such-Filter findet via Alias (§19 = Kleinunternehmer)", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "§19" } });
    expect(document.body.innerHTML).toMatch(/Kleinunternehmer/);
  });

  it("Such-Filter findet KSt (Körperschaftsteuer)", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "KSt" } });
    expect(document.body.innerHTML).toMatch(/Körperschaftsteuer/);
  });

  it("Such-Filter findet via Beschreibung-Text", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "Holding" } });
    expect(document.body.innerHTML).toMatch(/Holding/);
  });

  it("Suche ohne Treffer zeigt freundlichen Hinweis", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "xyz-quatsch-12345" } });
    expect(screen.getByText(/Keine Treffer/i)).toBeInTheDocument();
  });
});

describe("SteuerABC — BegriffCard Detail-Expansion", () => {
  it("Klick auf 'Mehr lesen' zeigt Detail-Block", () => {
    renderWithRouter(<SteuerABC />);
    const mehrButtons = screen.getAllByText(/Mehr lesen/i);
    fireEvent.click(mehrButtons[0]);
    // Nach Klick steht 'Weniger' im selben Button
    expect(screen.getAllByText(/← Weniger/i).length).toBeGreaterThan(0);
  });

  it("zeigt Beispiel-Box bei ausgewähltem Begriff (ESt hat Beispiel)", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "Einkommensteuer (ESt)" } });
    const mehr = screen.getByText(/Mehr lesen/i);
    fireEvent.click(mehr);
    expect(document.body.innerHTML).toMatch(/💡 Beispiel/);
  });
});

describe("SteuerABC — Cross-Tool-Links", () => {
  it("verlinkt zu GewerbeCheck + SchwellenCheck", () => {
    renderWithRouter(<SteuerABC />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbe-check/);
    expect(html).toMatch(/\/cockpit\/schwellen-check/);
  });

  it("BegriffCard verlinkt zu relevantem Tool (Holding → Holding-Designer)", () => {
    renderWithRouter(<SteuerABC />);
    const search = screen.getByPlaceholderText(/Begriff suchen/i);
    fireEvent.change(search, { target: { value: "Holding-Struktur" } });
    const mehr = screen.getByText(/Mehr lesen/i);
    fireEvent.click(mehr);
    expect(document.body.innerHTML).toMatch(/\/cockpit\/holding-designer/);
  });
});

describe("SteuerABC — Inhalt Korrektheit (Stand 2026)", () => {
  it("Kern-Steuer-Begriffe sind enthalten", () => {
    renderWithRouter(<SteuerABC />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Einkommensteuer.*ESt/);
    expect(html).toMatch(/Umsatzsteuer.*USt/);
    expect(html).toMatch(/Körperschaftsteuer.*KSt/);
    expect(html).toMatch(/Gewerbesteuer.*GewSt/);
    expect(html).toMatch(/Solidaritätszuschlag.*SolZ/);
  });

  it("Rechtsform-Begriffe da", () => {
    renderWithRouter(<SteuerABC />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Einzelunternehmen/);
    expect(html).toMatch(/Freiberufler.*§18/);
    expect(html).toMatch(/UG.*haftungsbeschränkt/);
    expect(html).toMatch(/GmbH.*Gesellschaft/);
    expect(html).toMatch(/GbR/);
    expect(html).toMatch(/Holding/);
  });

  it("USt-Spezialfälle abgedeckt", () => {
    renderWithRouter(<SteuerABC />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Kleinunternehmer.*§19/);
    expect(html).toMatch(/Reverse Charge.*§13b/);
    expect(html).toMatch(/Innergemeinschaftliche Lieferung/);
    expect(html).toMatch(/OSS.*One-Stop-Shop/);
  });

  it("Investoren/Crypto-Begriffe da", () => {
    renderWithRouter(<SteuerABC />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Abgeltungsteuer/);
    expect(html).toMatch(/§23 EStG/);
    expect(html).toMatch(/FIFO/);
    expect(html).toMatch(/Vorabpauschale/);
    expect(html).toMatch(/Teilfreistellung/);
  });
});
