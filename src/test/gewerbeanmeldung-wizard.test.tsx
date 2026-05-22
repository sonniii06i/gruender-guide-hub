/**
 * Tests für GewerbeanmeldungWizard (Anfänger-Tool #10, Wave 3).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// jspdf mocken
const mockSave = vi.fn();
vi.mock("jspdf", () => ({
  default: vi.fn().mockImplementation(() => ({
    save: mockSave,
    text: vi.fn(), setFontSize: vi.fn(), setTextColor: vi.fn(), setFont: vi.fn(),
    line: vi.fn(), setLineWidth: vi.fn(), addPage: vi.fn(),
    splitTextToSize: vi.fn().mockReturnValue(["mock"]),
  })),
}));

import GewerbeanmeldungWizard from "@/pages/GewerbeanmeldungWizard";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  mockSave.mockClear();
  localStorage.clear();
});

describe("GewerbeanmeldungWizard — Render + Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    expect(screen.getAllByText(/Gewerbeanmeldung/i).length).toBeGreaterThan(0);
  });

  it("startet auf Step 1 (Person)", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    expect(document.body.innerHTML).toMatch(/Schritt 1 von 7/);
    expect(document.body.innerHTML).toMatch(/Persönliche Daten/);
  });

  it("zeigt Progress-Bar mit 7 Steps", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Schritt 1 von 7/);
  });

  it("zeigt BeginnerHero mit Tätigkeits-Hinweis + GewerbeCheck-Link", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/GewA1.*schrittweise vorbereitet/);
    expect(html).toMatch(/\/cockpit\/gewerbe-check/);
  });

  it("zeigt Glossar mit Kern-Begriffen", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/GewA1-Formular/);
    expect(html).toMatch(/WZ 2008/);
    expect(html).toMatch(/FsE.*Fragebogen zur steuerlichen Erfassung/);
    expect(html).toMatch(/IHK.*HwK/);
    expect(html).toMatch(/Erlaubnispflichtige/);
  });
});

describe("GewerbeanmeldungWizard — Navigation", () => {
  it("Weiter-Button bringt zu Step 2", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const weiter = screen.getByText(/Weiter/);
    fireEvent.click(weiter);
    expect(document.body.innerHTML).toMatch(/Schritt 2 von 7/);
  });

  it("Progress-Dots sind klickbar (direkt zu Step)", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    expect(dots.length).toBe(7);
    fireEvent.click(dots[3] as HTMLElement);
    expect(document.body.innerHTML).toMatch(/Schritt 4 von 7/);
  });

  it("Zurück-Button funktioniert", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    fireEvent.click(screen.getByText(/Weiter/));
    fireEvent.click(screen.getByText(/Weiter/));
    expect(document.body.innerHTML).toMatch(/Schritt 3 von 7/);
    fireEvent.click(screen.getByText(/Zurück/));
    expect(document.body.innerHTML).toMatch(/Schritt 2 von 7/);
  });
});

describe("GewerbeanmeldungWizard — Steps", () => {
  it("Step 1: Vor-/Nachname-Inputs funktionieren", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs.length).toBeGreaterThan(0);
    fireEvent.change(inputs[0], { target: { value: "Max" } });
    expect((inputs[0] as HTMLInputElement).value).toBe("Max");
  });

  it("Step 3: Rechtsform-Dropdown wechselbar", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    // Navigation zu Step 3
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[2] as HTMLElement);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    expect(selects.length).toBeGreaterThan(0);
    fireEvent.change(selects[0], { target: { value: "gmbh" } });
    expect(selects[0].value).toBe("gmbh");
  });

  it("Step 4: Tätigkeits-Qualität reagiert auf Input-Länge", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[3] as HTMLElement);
    // Anfangs leer → unzureichend
    expect(document.body.innerHTML).toMatch(/UNZUREICHEND/);
    const textareas = document.querySelectorAll("textarea") as NodeListOf<HTMLTextAreaElement>;
    fireEvent.change(textareas[0], { target: { value: "Onlinehandel mit Sportbekleidung und Sportzubehör über eigenen Shop und Marketplace" } });
    expect(document.body.innerHTML).toMatch(/GUT/);
  });

  it("Step 5: WZ-2008-Suche filtert Einträge", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[4] as HTMLElement);
    const searchInput = screen.getByPlaceholderText(/Suche/);
    fireEvent.change(searchInput, { target: { value: "Programmierung" } });
    expect(document.body.innerHTML).toMatch(/62\.01\.0/);
  });

  it("Step 5: WZ-Auswahl per Klick speichert Code", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[4] as HTMLElement);
    // Default: zeige alle, finde einen Eintrag und klicke
    const wzButtons = document.querySelectorAll("button");
    const wzButton = Array.from(wzButtons).find((b) => b.textContent?.includes("62.01.0"));
    expect(wzButton).toBeTruthy();
    fireEvent.click(wzButton!);
    expect(document.body.innerHTML).toMatch(/Ausgewählt.*62\.01\.0/);
  });

  it("Step 6: KU-Status Radio-Buttons wechselbar", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[5] as HTMLElement);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(3);
    fireEvent.click(radios[0]);
    expect((radios[0] as HTMLInputElement).checked).toBe(true);
  });

  it("Step 6: Warnung bei Umsatz>25k und KU=Ja", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[5] as HTMLElement);
    // KU = ja wählen
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    fireEvent.click(radios[0]); // "ja"
    // Umsatz hochsetzen
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "25000");
    fireEvent.change(umsatzInput!, { target: { value: "50000" } });
    expect(document.body.innerHTML).toMatch(/funktioniert KU nicht|KU funktioniert nicht/);
  });
});

describe("GewerbeanmeldungWizard — PDF + Speichern", () => {
  it("PDF-Button auf Step 7 ist disabled bei unvollständigen Steps", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[6] as HTMLElement);
    // Alle Steps leer → Button disabled
    const pdfBtn = screen.getByText(/Offizielles GewA1-PDF herunterladen/).closest("button");
    expect(pdfBtn?.disabled).toBe(true);
  });

  it("Step 1 zeigt Autosave-Hinweis für persönliche Daten", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Einmal eingeben.*immer nutzen/);
  });

  it("Personal-Profil aus localStorage wird beim Mount geladen", () => {
    localStorage.setItem(
      "ggh-person-profile-v1",
      JSON.stringify({ vorname: "Max", nachname: "Mustermann" }),
    );
    renderWithRouter(<GewerbeanmeldungWizard />);
    expect(screen.getByDisplayValue("Max")).toBeTruthy();
    expect(screen.getByDisplayValue("Mustermann")).toBeTruthy();
  });

  it("Zusammenfassung listet fehlende Steps", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const dots = document.querySelectorAll("button[title^='Step']");
    fireEvent.click(dots[6] as HTMLElement);
    expect(document.body.innerHTML).toMatch(/Es fehlen noch Eingaben/);
  });

  it("Zwischenspeichern schreibt in localStorage", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: "Max" } });
    fireEvent.click(screen.getByText(/Zwischenspeichern/));
    const saved = localStorage.getItem("ggh-gewa1-v1");
    expect(saved).not.toBeNull();
    expect(JSON.parse(saved!).vorname).toBe("Max");
  });
});

describe("GewerbeanmeldungWizard — Cross-Tool-Links", () => {
  it("verlinkt zu GewerbeCheck + SchwellenCheck", () => {
    renderWithRouter(<GewerbeanmeldungWizard />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbe-check/);
    expect(html).toMatch(/\/cockpit\/schwellen-check/);
  });
});
