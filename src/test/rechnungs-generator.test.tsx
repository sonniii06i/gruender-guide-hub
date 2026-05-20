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
  it("Standard-Modus zeigt USt im Summen-Block", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Default: 8 × 120 € = 960 € + 19% = 182,40 €
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

  it("bei vollständigen Daten zeigt 'vollständig' ✅", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Default-Daten sind vollständig
    expect(document.body.innerHTML).toMatch(/vollständig/);
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
  it("Default-Position ist vorausgefüllt", () => {
    renderWithRouter(<RechnungsGenerator />);
    const inputs = screen.getAllByPlaceholderText(/Beschreibung/);
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    expect((inputs[0] as HTMLInputElement).value).toMatch(/Beratungs/);
  });

  it("Position hinzufügen erhöht Anzahl", () => {
    renderWithRouter(<RechnungsGenerator />);
    const before = screen.getAllByPlaceholderText(/Beschreibung/).length;
    const addBtn = screen.getByText(/Position hinzufügen/);
    fireEvent.click(addBtn);
    const after = screen.getAllByPlaceholderText(/Beschreibung/).length;
    expect(after).toBe(before + 1);
  });

  it("Mengen-Änderung passt Summe an", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Menge 8 → 10 → Netto 1200, USt 228, Brutto 1428
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const mengeInput = inputs.find((i) => i.value === "8");
    expect(mengeInput).toBeTruthy();
    fireEvent.change(mengeInput!, { target: { value: "10" } });
    expect(document.body.innerHTML).toMatch(/1\.200,00 €/);
  });
});

describe("RechnungsGenerator — PDF-Export", () => {
  it("PDF-Download-Button ist aktiv bei vollständigen Defaults", () => {
    renderWithRouter(<RechnungsGenerator />);
    const btn = screen.getByText(/PDF herunterladen/);
    expect(btn.closest("button")?.disabled).toBe(false);
  });

  it("PDF-Generierung ruft jspdf.save mit korrektem Filename auf", () => {
    renderWithRouter(<RechnungsGenerator />);
    const btn = screen.getByText(/PDF herunterladen/);
    fireEvent.click(btn);
    expect(mockSave).toHaveBeenCalledOnce();
    expect(mockSave).toHaveBeenCalledWith(expect.stringMatching(/RE-\d{4}-001\.pdf/));
  });
});

describe("RechnungsGenerator — Speichern / Laden", () => {
  it("Lokal speichern schreibt in localStorage", () => {
    renderWithRouter(<RechnungsGenerator />);
    const btn = screen.getByText(/Lokal speichern/);
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    fireEvent.click(btn);
    expect(localStorage.getItem("ggh-rechnung-v1")).not.toBeNull();
    alertSpy.mockRestore();
  });

  it("Reset stellt Default-Daten wieder her", () => {
    renderWithRouter(<RechnungsGenerator />);
    // Erstmal Wert ändern
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const mengeInput = inputs.find((i) => i.value === "8");
    fireEvent.change(mengeInput!, { target: { value: "99" } });
    expect(document.body.innerHTML).toMatch(/99/);
    // Reset
    fireEvent.click(screen.getByText(/^Reset$/));
    const inputsAfter = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const mengeAfter = inputsAfter.find((i) => i.value === "8");
    expect(mengeAfter).toBeTruthy();
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
