/**
 * Tests für RechnungsGenerator (Anfänger-Tool #9, Wave 3).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// jspdf + autotable mocken (browser-API-Abhängigkeit)
const mockSave = vi.fn();
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetTextColor = vi.fn();
const mockSetFont = vi.fn();
const mockLine = vi.fn();
const mockSetLineWidth = vi.fn();
const mockSplitTextToSize = vi.fn().mockReturnValue(["mock-line"]);

vi.mock("jspdf", () => ({
  default: vi.fn().mockImplementation(() => ({
    save: mockSave,
    text: mockText,
    setFontSize: mockSetFontSize,
    setTextColor: mockSetTextColor,
    setFont: mockSetFont,
    line: mockLine,
    setLineWidth: mockSetLineWidth,
    splitTextToSize: mockSplitTextToSize,
    lastAutoTable: { finalY: 200 },
  })),
}));

vi.mock("jspdf-autotable", () => ({
  default: vi.fn(),
}));

import RechnungsGenerator from "@/pages/RechnungsGenerator";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  mockSave.mockClear();
  mockText.mockClear();
  localStorage.clear();
});

describe("RechnungsGenerator — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<RechnungsGenerator />);
    expect(screen.getAllByText(/Rechnung/i).length).toBeGreaterThan(0);
  });

  it("zeigt BeginnerHero mit 4 USt-Modi-Übersicht", () => {
    renderWithRouter(<RechnungsGenerator />);
    expect(screen.getAllByText(/Erste richtige Rechnung schreiben/i).length).toBeGreaterThan(0);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Standard.*19\/7/);
    expect(html).toMatch(/§19 KU/);
    expect(html).toMatch(/§13b RC/);
    expect(html).toMatch(/§6a IGL/);
  });

  it("zeigt Glossar mit allen Pflicht-Begriffen", () => {
    renderWithRouter(<RechnungsGenerator />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/§14 UStG Pflichtangaben/);
    expect(html).toMatch(/Rechnungsnummer fortlaufend/);
    expect(html).toMatch(/Kleinunternehmer §19/);
    expect(html).toMatch(/Reverse Charge §13b/);
    expect(html).toMatch(/USt-ID vs Steuernummer/);
    expect(html).toMatch(/E-Rechnung 2025\/2026/);
  });
});

describe("RechnungsGenerator — USt-Modi", () => {
  it("Standard-Modus zeigt USt im Summen-Block (nach Eingabe)", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Default ist leer → Werte eingeben: Menge 8 × 120 € = 960 + 19% = 1.142,40 €
    const numericInputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    // Erste Menge (1) → 8, erster Einzelpreis (0) → 120
    const mengeInput = numericInputs.find((i) => i.value === "1");
    const preisInput = numericInputs.find((i) => i.value === "0");
    expect(mengeInput && preisInput).toBeTruthy();
    fireEvent.change(mengeInput!, { target: { value: "8" } });
    fireEvent.change(preisInput!, { target: { value: "120" } });
    const html = document.body.innerHTML;
    expect(html).toMatch(/19 % USt/);
    expect(html).toMatch(/182,40 €/);
  });

  it("Kleinunternehmer-Modus deaktiviert USt-Ausweis", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Buttons sind <button>-Elemente — präziser über getAllByText + role:"button" filter
    const buttons = screen.getAllByRole("button");
    const kuButton = buttons.find((b) => b.textContent?.includes("Kleinunternehmer §19 UStG"));
    expect(kuButton).toBeTruthy();
    fireEvent.click(kuButton!);
    const html = document.body.innerHTML;
    expect(html).toMatch(/§19 UStG.*Umsatz.*25k/);
  });

  it("Reverse-Charge-Modus zeigt §13b-Hinweis", () => {
    renderWithRouter(<RechnungsGenerator />);
    const buttons = screen.getAllByRole("button");
    const rcButton = buttons.find((b) => b.textContent?.includes("Reverse Charge §13b"));
    expect(rcButton).toBeTruthy();
    fireEvent.click(rcButton!);
    const html = document.body.innerHTML;
    expect(html).toMatch(/B2B.*EU/);
  });

  it("IGL §6a-Modus zeigt USt-ID-Pflicht-Hinweis", () => {
    renderWithRouter(<RechnungsGenerator />);
    const buttons = screen.getAllByRole("button");
    const iglButton = buttons.find((b) => b.textContent?.includes("Innergemeinsch. Lieferung §6a"));
    expect(iglButton).toBeTruthy();
    fireEvent.click(iglButton!);
    const html = document.body.innerHTML;
    expect(html).toMatch(/PFLICHT.*§13b.*§6a|§6a.*PFLICHT/);
  });
});

describe("RechnungsGenerator — §14 Pflichtangaben-Check", () => {
  it("zeigt §14-Checkliste mit 10 Punkten", () => {
    renderWithRouter(<RechnungsGenerator />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/§14 UStG-Pflichtangaben/);
    expect(html).toMatch(/Steuernummer oder USt-ID Sender/);
    expect(html).toMatch(/Rechnungsnummer.*fortlaufend/);
    expect(html).toMatch(/Leistungs.*Lieferdatum/);
  });

  it("bei leerem Default zeigt 'fehlen' ⚠", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Default ist leer (Sender + Kunde + Positionen leer) → Pflichten fehlen
    expect(document.body.innerHTML).toMatch(/fehlen/);
  });

  it("bei IGL-Modus ohne Kunden-USt-ID: 'fehlt' Status", () => {
    renderWithRouter(<RechnungsGenerator />);
    const buttons = screen.getAllByRole("button");
    const iglButton = buttons.find((b) => b.textContent?.includes("Innergemeinsch. Lieferung §6a"));
    fireEvent.click(iglButton!);
    const html = document.body.innerHTML;
    expect(html).toMatch(/fehlen|⚠/);
  });
});

describe("RechnungsGenerator — Positionen", () => {
  it("zeigt Spalten-Header (Artikel/Dienstleistung, Menge, Preis netto, Umsatzsteuer)", () => {
    renderWithRouter(<RechnungsGenerator />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Artikel \/ Dienstleistung/);
    expect(html).toMatch(/Preis netto \/ Einheit/);
    expect(html).toMatch(/>Umsatzsteuer</);
  });

  it("startet mit einer leeren Position (Menge 1, Preis 0)", () => {
    renderWithRouter(<RechnungsGenerator />);
    const inputs = screen.getAllByPlaceholderText(/z\.B\. Beratung/);
    expect(inputs.length).toBe(1);
    expect((inputs[0] as HTMLInputElement).value).toBe("");
  });

  it("Position hinzufügen erhöht Anzahl", () => {
    renderWithRouter(<RechnungsGenerator />);
    const before = screen.getAllByPlaceholderText(/z\.B\. Beratung/).length;
    const addBtn = screen.getByText(/Position hinzufügen/);
    fireEvent.click(addBtn);
    const after = screen.getAllByPlaceholderText(/z\.B\. Beratung/).length;
    expect(after).toBe(before + 1);
  });

  it("Mengen-Änderung passt Summe an", () => {
    renderWithRouter(<RechnungsGenerator />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    // Default: Menge 1, Preis 0 → ändere zu 10 × 120
    const mengeInput = inputs.find((i) => i.value === "1");
    const preisInput = inputs.find((i) => i.value === "0");
    fireEvent.change(mengeInput!, { target: { value: "10" } });
    fireEvent.change(preisInput!, { target: { value: "120" } });
    expect(document.body.innerHTML).toMatch(/1\.200,00 €/);
  });
});

describe("RechnungsGenerator — PDF-Export", () => {
  it("PDF-Download-Button ist im leeren Default-State disabled", () => {
    renderWithRouter(<RechnungsGenerator />);
    const btn = screen.getByText(/PDF herunterladen/);
    expect(btn.closest("button")?.disabled).toBe(true);
  });
});

describe("RechnungsGenerator — Firmen-Autosave / Reset", () => {
  it("Firmen-Profil aus localStorage wird beim Mount geladen + zurückgeschrieben", async () => {
    // Pre-seed mit Firmen-Profil
    localStorage.setItem(
      "ggh-rechnung-company-v2",
      JSON.stringify({ name: "Acme GmbH", strasse: "Musterstr. 1", plzOrt: "20095 HH" }),
    );
    renderWithRouter(<RechnungsGenerator />);
    // Gemounteter Sender-Name muss in DOM auftauchen (via Input value)
    expect(screen.getByDisplayValue("Acme GmbH")).toBeTruthy();
    // useEffect schreibt nach Mount zurück → Key bleibt, Name erhalten
    await new Promise((r) => setTimeout(r, 10));
    const saved = JSON.parse(localStorage.getItem("ggh-rechnung-company-v2")!);
    expect(saved.name).toBe("Acme GmbH");
  });

  it("'Neue Rechnung'-Button öffnet confirm-Dialog", () => {
    renderWithRouter(<RechnungsGenerator />);
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    const resetBtn = screen.getByRole("button", { name: /Neue Rechnung/ });
    fireEvent.click(resetBtn);
    expect(confirmSpy).toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it("kein 'Lokal speichern'-Button mehr (autosave ersetzt ihn)", () => {
    renderWithRouter(<RechnungsGenerator />);
    expect(screen.queryByText(/^Lokal speichern$/)).toBeNull();
  });
});

describe("RechnungsGenerator — Cross-Tool-Links", () => {
  it("verlinkt zu SchwellenCheck, USt-Rechner, Quartal-Steuer", () => {
    renderWithRouter(<RechnungsGenerator />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/schwellen-check/);
    expect(html).toMatch(/\/cockpit\/ust-rechner/);
    expect(html).toMatch(/\/cockpit\/quartals-steuer/);
  });
});
