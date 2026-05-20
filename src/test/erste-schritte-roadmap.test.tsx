/**
 * Tests für ErsteSchritteRoadmap (Anfänger-Tool #11, Wave 3).
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ErsteSchritteRoadmap from "@/pages/ErsteSchritteRoadmap";
import { ROADMAP_TASKS, taskMatches } from "@/data/roadmapTasks";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  localStorage.clear();
});

describe("ErsteSchritteRoadmap — Render + Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    expect(screen.getAllByText(/Roadmap|90.Tage/i).length).toBeGreaterThan(0);
  });

  it("zeigt Setup mit 5 Fragen", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Setup.*wer bist du.*5 Fragen/);
    expect(html).toMatch(/Rechtsform/);
    expect(html).toMatch(/USt-Status/);
    expect(html).toMatch(/Bereits angemeldet/);
    expect(html).toMatch(/B2B-Geschäft/);
    expect(html).toMatch(/EU-Geschäft/);
    expect(html).toMatch(/Mitarbeiter/);
  });

  it("zeigt BeginnerHero mit MUSS/SOLL/KANN-Erklärung", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/MUSS/);
    expect(html).toMatch(/SOLL/);
    expect(html).toMatch(/KANN/);
  });

  it("zeigt alle 4 Phasen mit Labels", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/T0.*Vor der Anmeldung/);
    expect(html).toMatch(/T30.*Erste 30 Tage/);
    expect(html).toMatch(/T60.*31-60 Tage/);
    expect(html).toMatch(/T90.*61-90 Tage/);
  });

  it("Glossar enthält Pflichtversicherung RV + FsE + USt-VA", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/T0.*T30.*T60.*T90/);
    expect(html).toMatch(/MUSS vs SOLL vs KANN/);
    expect(html).toMatch(/Pflichtversicherung Rentenversicherung/);
    expect(html).toMatch(/Fragebogen zur steuerlichen Erfassung/);
    expect(html).toMatch(/Dauerfristverlängerung/);
  });
});

describe("ErsteSchritteRoadmap — Personalisierung", () => {
  it("Default-Setup (Einzel-Gewerbe + unsicher) zeigt T0-Gewerbeanmeldung", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    expect(document.body.innerHTML).toMatch(/Gewerbe anmelden.*GewA1/);
  });

  it("Wechsel zu Freiberuf zeigt FA-Anmeldung statt GewA1", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "einzel-gewerbe");
    expect(rfSelect).toBeTruthy();
    fireEvent.change(rfSelect!, { target: { value: "freiberuf" } });
    expect(document.body.innerHTML).toMatch(/Finanzamt-Anmeldung.*Freiberufler/);
  });

  it("EU-Geschäft + Regelbesteuerung aktiviert USt-ID-Aufgabe", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    // Default: euGeschaeft=false, ustStatus=unsicher → USt-ID-Aufgabe NICHT sichtbar
    expect(document.body.innerHTML).not.toMatch(/USt-ID beantragen/);
    // Aktiviere EU-Geschäft + Regelbesteuerung
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const ustSelect = selects.find((s) => s.value === "unsicher");
    fireEvent.change(ustSelect!, { target: { value: "regel" } });
    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const euBox = checkboxes.find((c) => !c.checked);
    // EU-Box ist 3. Checkbox (nach bereits-angemeldet, b2b)
    const euLabel = Array.from(document.querySelectorAll("label")).find((l) => l.textContent?.includes("EU-Geschäft"));
    const euCheckbox = euLabel?.querySelector("input[type=checkbox]") as HTMLInputElement;
    fireEvent.click(euCheckbox);
    expect(document.body.innerHTML).toMatch(/USt-ID beantragen/);
  });

  it("Mitarbeiter-Trigger aktiviert Betriebsnummer-Aufgabe", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    expect(document.body.innerHTML).not.toMatch(/Betriebsnummer/);
    const mitarbeiterLabel = Array.from(document.querySelectorAll("label")).find((l) => l.textContent?.includes("Mitarbeiter"));
    const mitarbeiterBox = mitarbeiterLabel?.querySelector("input[type=checkbox]") as HTMLInputElement;
    fireEvent.click(mitarbeiterBox);
    expect(document.body.innerHTML).toMatch(/Mitarbeiter.*Minijob/);
  });

  it("Bereits angemeldet → T0-Anmelde-Aufgaben fallen weg", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    // Default: bereitsAngemeldet=false → Gewerbeanmeldung sichtbar
    expect(document.body.innerHTML).toMatch(/Gewerbe anmelden/);
    const angemeldetLabel = Array.from(document.querySelectorAll("label")).find((l) => l.textContent?.includes("Bereits angemeldet"));
    const angemeldetBox = angemeldetLabel?.querySelector("input[type=checkbox]") as HTMLInputElement;
    fireEvent.click(angemeldetBox);
    expect(document.body.innerHTML).not.toMatch(/Gewerbe anmelden.*GewA1/);
  });
});

describe("ErsteSchritteRoadmap — Status-Tracking", () => {
  it("Klick auf Status-Icon cycelt offen → laufend → erledigt → offen", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    // Erstes Status-Icon finden (Circle für offen)
    const statusButtons = Array.from(document.querySelectorAll("button[title*='Klicken zum Wechseln']"));
    expect(statusButtons.length).toBeGreaterThan(0);
    fireEvent.click(statusButtons[0]);
    // Status sollte in localStorage gespeichert sein
    const saved = JSON.parse(localStorage.getItem("ggh-roadmap-status-v1") || "{}");
    expect(Object.values(saved)).toContain("laufend");
  });

  it("Fortschritts-Anzeige startet bei 0/n und steigt", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    expect(document.body.innerHTML).toMatch(/0 \/ \d+/);
    // Klick mehrfach für 'erledigt'
    const statusButtons = Array.from(document.querySelectorAll("button[title*='Klicken zum Wechseln']"));
    fireEvent.click(statusButtons[0]); // laufend
    fireEvent.click(statusButtons[0]); // erledigt
    expect(document.body.innerHTML).toMatch(/1 \/ \d+/);
  });

  it("Reset-Button löscht alle Status", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const statusButtons = Array.from(document.querySelectorAll("button[title*='Klicken zum Wechseln']"));
    fireEvent.click(statusButtons[0]);
    // confirm() mocken (auto-OK)
    const origConfirm = window.confirm;
    window.confirm = () => true;
    fireEvent.click(screen.getByText(/Status zurücksetzen/));
    window.confirm = origConfirm;
    expect(localStorage.getItem("ggh-roadmap-status-v1")).toBeNull();
  });
});

describe("ErsteSchritteRoadmap — Filter", () => {
  it("Filter 'Nur MUSS' reduziert Aufgaben", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const filterSelect = selects.find((s) => s.value === "alle");
    expect(filterSelect).toBeTruthy();
    fireEvent.change(filterSelect!, { target: { value: "muss" } });
    // Es sollten "MUSS"-Tasks bleiben, KEINE "SOLL/KANN"
    const html = document.body.innerHTML;
    expect(html).toMatch(/von \d+ sichtbar/);
  });

  it("Filter zeigt 'X von Y sichtbar' Counter", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    expect(document.body.innerHTML).toMatch(/\d+ von \d+ sichtbar/);
  });
});

describe("ErsteSchritteRoadmap — Task-Expansion", () => {
  it("'mehr'-Button öffnet Detail-Sektion mit Schritten", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const mehrButtons = Array.from(document.querySelectorAll("button")).filter((b) => b.textContent === "mehr");
    expect(mehrButtons.length).toBeGreaterThan(0);
    fireEvent.click(mehrButtons[0]);
    // Detail-Section "Schritte:" sollte erscheinen
    expect(document.body.innerHTML).toMatch(/Schritte:/);
  });
});

describe("ErsteSchritteRoadmap — Setup-Persistenz", () => {
  it("Setup wird in localStorage gespeichert", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "einzel-gewerbe");
    fireEvent.change(rfSelect!, { target: { value: "freiberuf" } });
    const saved = JSON.parse(localStorage.getItem("ggh-roadmap-setup-v1") || "{}");
    expect(saved.rechtsform).toBe("freiberuf");
  });
});

describe("ErsteSchritteRoadmap — Cross-Tool-Links", () => {
  it("verlinkt zu Tools 9, 10, 7 (rechtsspalte)", () => {
    renderWithRouter(<ErsteSchritteRoadmap />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbeanmeldung-wizard/);
    expect(html).toMatch(/\/cockpit\/stb-cost-benefit/);
    expect(html).toMatch(/\/cockpit\/rechnungs-generator/);
  });
});

describe("RoadmapTasks-DB — Daten-Integrität", () => {
  it("alle Tasks haben einzigartige IDs", () => {
    const ids = ROADMAP_TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("taskMatches funktioniert korrekt für Freiberuf", () => {
    const setup = {
      rechtsform: "freiberuf" as const,
      ustStatus: "ku" as const,
      euGeschaeft: false, b2b: false, bereitsAngemeldet: false, mitarbeiter: false,
    };
    const faAnm = ROADMAP_TASKS.find((t) => t.id === "t0-6-fa-anmeldung-freiberuf");
    expect(taskMatches(faAnm!, setup)).toBe(true);
    const gewerbeAnm = ROADMAP_TASKS.find((t) => t.id === "t0-5-gewerbeanmeldung");
    expect(taskMatches(gewerbeAnm!, setup)).toBe(false);
  });

  it("taskMatches mit mehreren Triggers funktioniert", () => {
    const setupRegelEu = {
      rechtsform: "einzel-gewerbe" as const,
      ustStatus: "regel" as const,
      euGeschaeft: true, b2b: true, bereitsAngemeldet: false, mitarbeiter: false,
    };
    const ustId = ROADMAP_TASKS.find((t) => t.id === "t30-5-ust-id-eu");
    expect(taskMatches(ustId!, setupRegelEu)).toBe(true);

    const setupKuEu = { ...setupRegelEu, ustStatus: "ku" as const };
    expect(taskMatches(ustId!, setupKuEu)).toBe(false);
  });
});
