import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { baueFinanzplanPdf } from "@/lib/finanzplanPdf";
import { BEISPIEL, rechneFinanzplan } from "@/lib/finanzplan";
import GruendungsUnterlagen from "@/pages/GruendungsUnterlagen";
import BafaBeratungCheck from "@/pages/BafaBeratungCheck";
import EinstiegsgeldRechner from "@/pages/EinstiegsgeldRechner";

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
