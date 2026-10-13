/**
 * Render-Tests für Rechenlogik-Fixes Runde 2, deren Rechnung im Komponenten-State liegt.
 */
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import DbaCfcRechner from "@/pages/DbaCfcRechner";
import IabRechner from "@/pages/IabRechner";

const mit = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("DbaCfcRechner: Privatperson", () => {
  it("Schweiz privat: DBA-Satz 15 % statt Schachtel-0 % und Anrechnung nach §32d Abs. 5", () => {
    mit(<DbaCfcRechner />);
    fireEvent.change(screen.getByLabelText("Land"), { target: { value: "schweiz" } });
    fireEvent.click(screen.getByText("DE-Privatperson"));
    expect(document.body.textContent).toMatch(/Quellensteuer bei Ausschüttung \(15%\)/);
    expect(document.body.textContent).toMatch(/anrechenbare Quellensteuer \(§32d Abs\. 5 EStG\)/);
  });
});

describe("IabRechner: andere Einkünfte erhöhen das zvE", () => {
  it("Freiberufler, 40.000 € Gewinn + 60.000 € Lohn, IAB 22.500 € → Ersparnis 10.575 €", () => {
    mit(<IabRechner />);
    fireEvent.change(document.getElementById("iab-rf")!, { target: { value: "freiberuf" } });
    fireEvent.change(document.getElementById("iab-gewinn")!, { target: { value: "40000" } });
    fireEvent.change(document.getElementById("iab-andere")!, { target: { value: "60000" } });
    // zvE 100.000 → ESt 30.864, mit IAB (77.500) → 21.414; Differenz 9.450
    // SolZ mit Freigrenze: 1.251,17 − 126,62 = 1.124,55 → Ersparnis 10.574,55 ≈ 10.575 €
    expect(document.body.textContent).toMatch(/10\.575 €/);
  });
});
