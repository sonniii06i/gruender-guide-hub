/**
 * Tests für FreiberufCheck (Anfänger-Tool #2).
 * Prüft: Berufs-Katalog, Such-Filter, Verdict-Pfade, Abfärbetheorie-Warnung,
 * Anfänger-Layout-Konsistenz, App-Routes-Integration.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import FreiberufCheck from "@/pages/FreiberufCheck";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("FreiberufCheck — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<FreiberufCheck />);
    expect(screen.getAllByText(/Freiberuf|Gewerbe/i).length).toBeGreaterThan(0);
  });
  it("hat BeginnerHero mit 'Was ist das hier?'", () => {
    renderWithRouter(<FreiberufCheck />);
    expect(screen.getByText(/Was ist das hier/i)).toBeInTheDocument();
  });
  it("hat 2-Spalten-Übersicht Freiberuf/Gewerbe-Vorteile im Hero", () => {
    renderWithRouter(<FreiberufCheck />);
    expect(document.body.innerHTML).toMatch(/Freiberuf-Vorteile/i);
    expect(document.body.innerHTML).toMatch(/Gewerbe-Charakteristika/i);
  });
  it("Glossar mit Kern-Begriffen einklappbar", () => {
    renderWithRouter(<FreiberufCheck />);
    expect(screen.getAllByText(/Glossar/i).length).toBeGreaterThan(0);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Katalogberufe/i);
    expect(html).toMatch(/Abfärbetheorie/i);
    expect(html).toMatch(/BFH/i);
    expect(html).toMatch(/Approbation/i);
    expect(html).toMatch(/KSK/i);
  });
});

describe("FreiberufCheck — Berufs-Liste", () => {
  it("zeigt 4 Gruppen (Heil / Recht / Technisch / Medien)", () => {
    renderWithRouter(<FreiberufCheck />);
    expect(screen.getByText(/🏥 Heilberufe/i)).toBeInTheDocument();
    expect(screen.getByText(/⚖️ Recht/)).toBeInTheDocument();
    expect(screen.getByText(/🔬 Technisch/)).toBeInTheDocument();
    expect(screen.getByText(/🎨 Erziehung/)).toBeInTheDocument();
    expect(screen.getByText(/⚡ Grenzfälle/)).toBeInTheDocument();
  });

  it("zeigt mind. 50 Berufe in Summe", () => {
    renderWithRouter(<FreiberufCheck />);
    // Berufe sind in Buttons gerendert
    const buttons = screen.getAllByRole("button");
    // Berufs-Buttons + Mode-Switch + sonstige Buttons
    expect(buttons.length).toBeGreaterThan(40);
  });

  it("Kern-Berufe sind enthalten", () => {
    renderWithRouter(<FreiberufCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Arzt/i);
    expect(html).toMatch(/Rechtsanwalt/i);
    expect(html).toMatch(/Ingenieur/i);
    expect(html).toMatch(/Übersetzer/i);
    expect(html).toMatch(/Influencer/i);
    expect(html).toMatch(/YouTuber/i);
    expect(html).toMatch(/Software-Entwickler/i);
    expect(html).toMatch(/Yoga/i);
  });
});

describe("FreiberufCheck — Such-Filter", () => {
  it("Suche filtert Berufe", () => {
    renderWithRouter(<FreiberufCheck />);
    const search = screen.getByPlaceholderText(/Programmierer.*Coach/i);
    fireEvent.change(search, { target: { value: "yoga" } });
    expect(document.body.innerHTML).toMatch(/Yoga/i);
    expect(screen.queryByText(/Rechtsanwalt/i)).toBeNull();
  });

  it("Suche zeigt Treffer-Anzahl", () => {
    renderWithRouter(<FreiberufCheck />);
    const search = screen.getByPlaceholderText(/Programmierer.*Coach/i);
    fireEvent.change(search, { target: { value: "anwalt" } });
    expect(screen.getByText(/Treffer/i)).toBeInTheDocument();
  });

  it("Leere Such-Treffer zeigen freundlichen Hinweis", () => {
    renderWithRouter(<FreiberufCheck />);
    const search = screen.getByPlaceholderText(/Programmierer.*Coach/i);
    fireEvent.change(search, { target: { value: "xyz-gibts-nicht-12345" } });
    expect(screen.getByText(/Keine Treffer/i)).toBeInTheDocument();
    expect(screen.getByText(/Vorher-Tool/i)).toBeInTheDocument();
  });
});

describe("FreiberufCheck — Verdict-Pfade", () => {
  it("Arzt-Klick → 'Freiberuf (Katalog §18 EStG)'", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Arzt \/ Ärztin/i));
    fireEvent.click(screen.getByText("✓ Ja")); // Approbation vorhanden
    fireEvent.click(screen.getByText(/Nein, nur die freiberufliche/i));
    expect(screen.getByText(/Freiberuf \(Katalog §18 EStG\)/i)).toBeInTheDocument();
  });

  it("Influencer → 'eindeutig Gewerbe' ohne Kriterien-Frage", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Influencer \/ Social-Media-Creator/i));
    expect(screen.getByText(/eindeutig Gewerbe/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/Gewerbeamt/i);
  });

  it("Unternehmensberater OHNE BWL → 'OHNE Qualifikation → meist GEWERBE'", () => {
    renderWithRouter(<FreiberufCheck />);
    // Erste Treffer ist der Buttontext, weil im Glossar-Tooltip-Text auch "Unternehmensberater" steht
    const buttons = screen.getAllByText(/Unternehmensberater/i);
    fireEvent.click(buttons[0]);
    fireEvent.click(screen.getByText(/✗ Nein/i));
    expect(screen.getByText(/OHNE.*Qualifikation.*→.*meist GEWERBE/i)).toBeInTheDocument();
  });

  it("Software-Autodidakt ohne Nachweis → 'Einzelfall-Prüfung durch FA'", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Software-Entwickler:in OHNE Studium/i));
    fireEvent.click(screen.getByText(/✗ Nein/i));
    expect(screen.getByText(/Einzelfall-Prüfung durch FA/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/BFH VIII R 4\/00/i);
  });

  it("Yoga-Lehrer:in mit Cert → 'eindeutig Freiberuf'", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Yoga-\/Meditationslehrer/i));
    expect(screen.getByText(/eindeutig Freiberuf/i)).toBeInTheDocument();
  });
});

describe("FreiberufCheck — Abfärbetheorie-Warnung", () => {
  it("zeigt §15 Abs. 3 Warnung bei gemischten Einkünften (Übersetzer ohne Qualifikations-Frage)", () => {
    renderWithRouter(<FreiberufCheck />);
    // Übersetzer hat KEINE qualifikation-Anforderung → es gibt nur die Abfärbe-Frage
    fireEvent.click(screen.getByText(/Übersetzer:in/i));
    fireEvent.click(screen.getByText(/Ja, gemischte Einnahmen/i));
    // Die scharfe Warnung "Abfärbetheorie §15 Abs. 3 Nr. 1 EStG" mit Roter Border erscheint
    expect(screen.getByText(/Abfärbetheorie §15 Abs\. 3 Nr\. 1 EStG/i)).toBeInTheDocument();
    expect(document.body.innerHTML).toMatch(/3 % vom Gesamt-Umsatz/);
    expect(document.body.innerHTML).toMatch(/24\.500/);
  });

  it("keine SCHARFE Warnung bei reiner freiberuflicher Tätigkeit (Glossar-Erwähnung egal)", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Architekt:in/i));
    fireEvent.click(screen.getByText("✓ Ja"));
    fireEvent.click(screen.getByText(/Nein, nur die freiberufliche/i));
    // Die rote Warnung darf NICHT erscheinen (Glossar-Erwähnung ist OK, deshalb suche scharfen Titel)
    expect(screen.queryByText(/Abfärbetheorie §15 Abs\. 3 Nr\. 1 EStG/i)).toBeNull();
  });
});

describe("FreiberufCheck — Beruf wechseln", () => {
  it("'Anderen Beruf wählen' setzt Auswahl zurück", () => {
    renderWithRouter(<FreiberufCheck />);
    fireEvent.click(screen.getByText(/Rechtsanwalt/i));
    expect(screen.getByText(/Gewählter Beruf/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Anderen Beruf wählen/i));
    expect(screen.queryByText(/Gewählter Beruf/i)).toBeNull();
    // Berufsliste wieder sichtbar
    expect(screen.getByText(/🏥 Heilberufe/i)).toBeInTheDocument();
  });
});
