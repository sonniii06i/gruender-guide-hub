/**
 * Smoke-Tests für FseWizard.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// jsPDF mocken (browser-API)
const mockSave = vi.fn();
vi.mock("jspdf", () => ({
  default: vi.fn().mockImplementation(() => ({
    save: mockSave,
    text: vi.fn(),
    setFontSize: vi.fn(),
    setTextColor: vi.fn(),
    setFont: vi.fn(),
    setLineWidth: vi.fn(),
    setDrawColor: vi.fn(),
    line: vi.fn(),
    splitTextToSize: vi.fn().mockReturnValue(["mock"]),
    addPage: vi.fn(),
  })),
}));

import FseWizard from "@/pages/FseWizard";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  mockSave.mockClear();
  localStorage.clear();
});

describe("FseWizard — Render + Pre-Fill", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<FseWizard />);
    expect(screen.getAllByText(/Fragebogen zur steuerlichen Erfassung/).length).toBeGreaterThan(0);
  });

  it("zeigt Hero mit § 19 KU 5-Jahres-Warnung", () => {
    renderWithRouter(<FseWizard />);
    expect(document.body.innerHTML).toMatch(/5 Jahre Bindung/);
  });

  it("hat 8 Steps + Progress-Dots", () => {
    renderWithRouter(<FseWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    expect(dots.length).toBe(8);
  });

  it("Personal-Profil aus LS wird pre-gefüllt", () => {
    localStorage.setItem("ggh-person-profile-v1", JSON.stringify({
      vorname: "Anna", nachname: "Test", privatStrasse: "Teststr. 1", privatPlz: "20095", privatOrt: "HH",
    }));
    renderWithRouter(<FseWizard />);
    expect(screen.getByDisplayValue("Anna")).toBeTruthy();
    expect(screen.getByDisplayValue("Test")).toBeTruthy();
  });

  it("GewA1-Daten (Tätigkeit, Umsatz, KU-Status) werden übernommen", () => {
    localStorage.setItem("ggh-gewa1-v1", JSON.stringify({
      taetigkeit: "Online-Handel mit Schmuck",
      voraussichtlicherUmsatz: 30000,
      kuStatus: "nein",
      rechtsform: "einzel",
    }));
    renderWithRouter(<FseWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    // Step 3 (Tätigkeit, idx 2) öffnen
    fireEvent.click(dots[2] as HTMLElement);
    expect(screen.getByDisplayValue(/Online-Handel mit Schmuck/)).toBeTruthy();
  });
});

describe("FseWizard — KU-Empfehlung", () => {
  it("Bei Umsatz < 25k Empfehlung KU", () => {
    renderWithRouter(<FseWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[5] as HTMLElement); // Step 6 USt
    const html = document.body.innerHTML;
    // Default umsatzJahr1 = 0 → Empfehlung KU
    expect(html).toMatch(/Empfehlung für dich/);
  });
});

describe("FseWizard — Spickzettel-PDF", () => {
  it("Spickzettel-Button auf Step 8 disabled wenn Pflichten fehlen", () => {
    renderWithRouter(<FseWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[7] as HTMLElement);
    const btn = screen.getByText(/Spickzettel-PDF herunterladen/).closest("button");
    expect(btn?.disabled).toBe(true);
  });

  it("Step 8 zeigt ELSTER-Workflow-Disclaimer (Drucken, Frist)", () => {
    renderWithRouter(<FseWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[7] as HTMLElement);
    const html = document.body.innerHTML;
    expect(html).toMatch(/[Aa]usdrucken|2\. Monitor/);
    expect(html).toMatch(/1 Monat.*Tätigkeitsaufnahme|138 AO/);
  });
});
