/**
 * Tests für GewerbeCheck (Anfänger-Tool #1).
 * Prüft Decision-Tree-Logik, Render, User-Flow, Anfänger-Layout-Elemente.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import GewerbeCheck from "@/pages/GewerbeCheck";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("GewerbeCheck — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getAllByText(/Gewerbe|Freiberuf|Hobby/i).length).toBeGreaterThan(0);
  });

  it("zeigt BeginnerHero mit 'Was ist das hier?'", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getByText(/Was ist das hier/i)).toBeInTheDocument();
  });

  it("zeigt 3-Spalten-Übersicht Hobby/Freiberuf/Gewerbe im Hero", () => {
    renderWithRouter(<GewerbeCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/🌿\s*Hobby/);
    expect(html).toMatch(/📘\s*Freiberuf/);
    expect(html).toMatch(/🏪\s*Gewerbe/);
  });

  it("zeigt Progress-Bar bei Frage 1/4", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getByText(/Frage 1 von 4/i)).toBeInTheDocument();
  });

  it("Glossar einklappbar mit Kern-Begriffen", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getByText(/Glossar/i)).toBeInTheDocument();
    const html = document.body.innerHTML;
    expect(html).toMatch(/Freiberufler/i);
    expect(html).toMatch(/Kleingewerbe/i);
    expect(html).toMatch(/Liebhaberei/i);
    expect(html).toMatch(/Katalogberufe/i);
  });
});

describe("GewerbeCheck — Step 1 Tätigkeits-Auswahl", () => {
  it("zeigt 9 Tätigkeits-Optionen", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getByText(/Dienstleistung \/ Handel/i)).toBeInTheDocument();
    expect(screen.getByText(/Software \/ IT \/ Engineering/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Heilberufe/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Kunst \/ Schreiben \/ Musik/i)).toBeInTheDocument();
  });

  it("zeigt Badge 'Freiberuf' für Katalogberufe", () => {
    renderWithRouter(<GewerbeCheck />);
    const badges = screen.getAllByText(/^Freiberuf$/i);
    expect(badges.length).toBeGreaterThanOrEqual(4); // Heilberufe, Software, Kunst, Lehre, Recht
  });

  it("zeigt Badge 'Gewerbe' für Handel/Produktverkauf", () => {
    renderWithRouter(<GewerbeCheck />);
    const badges = screen.getAllByText(/^Gewerbe$/i);
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it("'Weiter'-Button initial disabled", () => {
    renderWithRouter(<GewerbeCheck />);
    const weiter = screen.getByRole("button", { name: /Weiter/i }) as HTMLButtonElement;
    expect(weiter.disabled).toBe(true);
  });

  it("Klick auf Tätigkeit aktiviert 'Weiter'-Button", () => {
    renderWithRouter(<GewerbeCheck />);
    const dienstleistung = screen.getByText(/Dienstleistung \/ Handel/i);
    fireEvent.click(dienstleistung);
    const weiter = screen.getByRole("button", { name: /Weiter/i }) as HTMLButtonElement;
    expect(weiter.disabled).toBe(false);
  });
});

describe("GewerbeCheck — Decision-Tree (verschiedene Pfade)", () => {
  /** Helper: kompletten Flow durchklicken bis Ergebnis */
  const completeFlow = (
    taetigkeitsText: RegExp,
    regelmaessigkeitsText: RegExp,
    gewinnabsichtsText: RegExp,
    gewinnstufenText: RegExp,
  ) => {
    renderWithRouter(<GewerbeCheck />);
    fireEvent.click(screen.getByText(taetigkeitsText));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/i }));
    fireEvent.click(screen.getByText(regelmaessigkeitsText));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/i }));
    fireEvent.click(screen.getByText(gewinnabsichtsText));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/i }));
    fireEvent.click(screen.getByText(gewinnstufenText));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/i }));
  };

  it("Pfad: Hobby (keine Gewinnabsicht) → 'Du brauchst (noch) kein Gewerbe'", () => {
    completeFlow(/Kunst \/ Schreiben \/ Musik/i, /1-3 mal im Jahr/i, /Nein, reines Hobby/i, /Unter 410 €/i);
    expect(screen.getByText(/Du brauchst \(noch\) kein Gewerbe/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/Liebhaberei/i);
  });

  it("Pfad: Software-Dev mit Gewinnabsicht → 'Du bist Freiberufler:in'", () => {
    completeFlow(/Software \/ IT \/ Engineering/i, /Hauptberuflich/i, /Ja, das soll Geld bringen/i, /Über 25\.000/i);
    expect(screen.getByText(/Du bist Freiberufler:in/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/§18.*EStG/i);
    expect(document.body.innerHTML).toMatch(/KEINE Gewerbeanmeldung/i);
  });

  it("Pfad: Produktverkauf mit Gewinnabsicht → 'Du brauchst ein Gewerbe'", () => {
    completeFlow(/Produktverkauf/i, /Hauptberuflich/i, /Ja, das soll Geld bringen/i, /Über 25\.000/i);
    expect(screen.getByText(/Du brauchst ein Gewerbe/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/Gewerbeamt/i);
    expect(document.body.innerHTML).toMatch(/IHK/i);
  });

  it("Pfad: Coaching/Beratung (unklar) → 'Status nicht eindeutig'", () => {
    completeFlow(/Coaching \/ Beratung/i, /Nebenbei/i, /Ja, das soll Geld bringen/i, /3\.000 € – 25\.000 €/);
    expect(screen.getByText(/Status nicht eindeutig/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/Finanzamt/i);
    expect(document.body.innerHTML).toMatch(/Steuerberater/i);
  });

  it("Pfad: Kunst regelmäßig mit kleiner Gewinnabsicht → Freiberuf mit Kleinunternehmer-Hinweis", () => {
    completeFlow(/Kunst \/ Schreiben \/ Musik/i, /Nebenbei/i, /Ja, das soll Geld bringen/i, /410 € – 3\.000 €/);
    expect(screen.getByText(/Du bist Freiberufler:in/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/Kleinunternehmer/i);
    expect(document.body.innerHTML).toMatch(/§19/);
  });

  it("Ergebnis enthält 'Was du jetzt tun musst'-Sektion mit nummerierten Steps", () => {
    completeFlow(/Software \/ IT \/ Engineering/i, /Hauptberuflich/i, /Ja, das soll Geld bringen/i, /Über 25\.000/i);
    expect(screen.getByText(/Was du jetzt tun musst/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/ELSTER/i);
  });

  it("'Nochmal starten' setzt Wizard zurück", () => {
    completeFlow(/Software \/ IT \/ Engineering/i, /Hauptberuflich/i, /Ja, das soll Geld bringen/i, /Über 25\.000/i);
    const reset = screen.getByRole("button", { name: /Nochmal starten/i });
    fireEvent.click(reset);
    expect(screen.getByText(/Frage 1 von 4/i)).toBeInTheDocument();
  });
});

describe("GewerbeCheck — Navigation", () => {
  it("'Zurück'-Button bei Step 1 disabled", () => {
    renderWithRouter(<GewerbeCheck />);
    const zurueck = screen.getByRole("button", { name: /Zurück/i }) as HTMLButtonElement;
    expect(zurueck.disabled).toBe(true);
  });

  it("Navigation Frage 1 → 2 → zurück → 1 funktioniert", () => {
    renderWithRouter(<GewerbeCheck />);
    expect(screen.getByText(/Frage 1 von 4/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Kunst \/ Schreiben \/ Musik/i));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/i }));
    expect(screen.getByText(/Frage 2 von 4/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Zurück/i }));
    expect(screen.getByText(/Frage 1 von 4/i)).toBeInTheDocument();
  });
});
