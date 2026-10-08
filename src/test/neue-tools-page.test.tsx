import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { baueFinanzplanPdf } from "@/lib/finanzplanPdf";
import { BEISPIEL, rechneFinanzplan } from "@/lib/finanzplan";
import GruendungsUnterlagen from "@/pages/GruendungsUnterlagen";
import BafaBeratungCheck from "@/pages/BafaBeratungCheck";
import EinstiegsgeldRechner from "@/pages/EinstiegsgeldRechner";
import { HelmetProvider } from "react-helmet-async";
import PitchDeckGenerator from "@/pages/PitchDeckGenerator";
import HackathonStarterKit, { PHASEN } from "@/pages/HackathonStarterKit";
import { FOLIEN, elevatorPitch, leeresDeck, pruefePitch } from "@/lib/pitchDeck";
import { bauePitchPdf } from "@/lib/pitchDeckPdf";

const zeige = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Finanzplan-Generator", () => {
  it("rendert mit Beispielwerten", () => {
    zeige(<GruendungsUnterlagen />);
    expect(screen.getByText("Liquiditätsplan – 12 Monate")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Finanzplan als PDF/ })).toBeInTheDocument();
  });

  it("PDF hat 3 Seiten mit allen fünf Abschnitten", () => {
    const doc = baueFinanzplanPdf(BEISPIEL, rechneFinanzplan(BEISPIEL), "Erika Muster", "Webdesign");
    expect(doc.getNumberOfPages()).toBe(3);
    const roh = doc.output();
    for (const t of ["Kapitalbedarfsplan", "Finanzierungsplan", "Rentabilit", "Liquidit", "Lebenshaltungskosten", "Erika Muster"]) {
      expect(roh).toContain(t);
    }
  });
});

describe("BAFA-Check", () => {
  it("zeigt den Countdown bis 31.12.2026 und rechnet 1.750 € im Westen", () => {
    zeige(<BafaBeratungCheck />);
    expect(screen.getAllByText(/31\.12\.2026/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1\.750,00/).length).toBeGreaterThan(0);
  });
});

describe("Einstiegsgeld-Rechner", () => {
  it("startet mit 281,50 € pro Monat für Alleinstehende", () => {
    zeige(<EinstiegsgeldRechner />);
    expect(screen.getAllByText(/281,50/).length).toBeGreaterThan(0);
  });
});


describe("Pitch-Deck", () => {
  const beispiel = { name: "Feldwerk", kontakt: "x", folien: Object.fromEntries(FOLIEN.map((f) => [f.id, f.beispiel])) } as ReturnType<typeof leeresDeck>;
  it("leeres Deck meldet fehlende Pflichtfolien", () => {
    expect(pruefePitch(leeresDeck()).filter((h) => h.stufe === "fehlt").length).toBe(FOLIEN.filter((f) => f.pflicht).length + 1);
  });
  it("Beispiel-Deck besteht den Jury-Check", () => {
    expect(pruefePitch(beispiel).every((h) => h.stufe === "ok")).toBe(true);
  });
  it("Traction ohne Zahl und Markt ohne Quelle werden angemahnt", () => {
    const h = pruefePitch({ ...beispiel, folien: { ...beispiel.folien, traction: "viele Interessenten", markt: "riesiger Markt" } });
    expect(h.some((x) => x.folie === "traction")).toBe(true);
    expect(h.some((x) => x.folie === "markt")).toBe(true);
  });
  it("Elevator-Pitch und PDF mit 10 Folien", () => {
    expect(elevatorPitch(beispiel)).toMatch(/^Wir sind Feldwerk\./);
    expect(bauePitchPdf(beispiel).getNumberOfPages()).toBe(10);
  });
  it("Seite rendert", () => {
    zeige(<PitchDeckGenerator />);
    expect(screen.getByText("Jury-Check")).toBeInTheDocument();
  });
});

describe("Hackathon-Starter-Kit", () => {
  it("Phasen ergeben genau 3 Stunden", () => {
    expect(PHASEN.reduce((n, p) => n + p.min, 0)).toBe(180);
  });
  it("rendert mit Timer auf 03:00:00 gesamt", () => {
    render(<HelmetProvider><MemoryRouter><HackathonStarterKit /></MemoryRouter></HelmetProvider>);
    expect(screen.getByText("gesamt noch 180:00")).toBeInTheDocument();
    expect(screen.getAllByText(/kopieren/).length).toBe(5);
  });
});
