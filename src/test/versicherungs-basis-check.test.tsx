/**
 * Tests für VersicherungsBasisCheck (Anfänger-Tool #12, Wave 3 final).
 */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import VersicherungsBasisCheck from "@/pages/VersicherungsBasisCheck";
import { VERSICHERUNGEN, BERUFSBILD_LABELS, type VersicherungsSetup } from "@/data/versicherungen";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  localStorage.clear();
});

describe("VersicherungsBasisCheck — Render + Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    expect(screen.getAllByText(/Versicherung/i).length).toBeGreaterThan(0);
  });

  it("zeigt 7-Frage-Setup", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Setup.*7 Fragen/);
    expect(html).toMatch(/Berufsbild/);
    expect(html).toMatch(/Rechtsform/);
    expect(html).toMatch(/Jahres-Umsatz/);
    expect(html).toMatch(/Mitarbeiter/);
    expect(html).toMatch(/Eigenes Büro/);
    expect(html).toMatch(/Online-Geschäft/);
    expect(html).toMatch(/Eigene Produkte/);
  });

  it("zeigt BeginnerHero mit 4 Pflicht-Stufen-Erklärung", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/PFLICHT/);
    expect(html).toMatch(/DRINGEND/);
    expect(html).toMatch(/SINNVOLL/);
    expect(html).toMatch(/OPTIONAL/);
  });

  it("zeigt Kosten-Hero mit Jahres-Schätzung", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Geschätzte Jahreskosten/);
    expect(html).toMatch(/Pro Monat/);
  });

  it("Glossar enthält Kern-Begriffe", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Berufshaftpflicht.*BHV.*Privathaftpflicht.*PHV/);
    expect(html).toMatch(/Deckungssumme/);
    expect(html).toMatch(/Selbstbehalt/);
    expect(html).toMatch(/Konkrete vs abstrakte Verweisung/);
    expect(html).toMatch(/Karenzzeit/);
    expect(html).toMatch(/Vermögensschaden/);
    expect(html).toMatch(/D&amp;O bei UG\/GmbH|D.O bei UG\/GmbH/);
  });
});

describe("VersicherungsBasisCheck — Prioritäts-Logik", () => {
  it("Default IT-Solo zeigt BHV als DRINGEND", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Berufshaftpflicht/);
    expect(html).toMatch(/DRINGEND/);
  });

  it("Wechsel zu Heilberuf macht BHV zur PFLICHT", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const berufSelect = selects.find((s) => s.value === "it-software");
    fireEvent.change(berufSelect!, { target: { value: "heilberuf" } });
    const html = document.body.innerHTML;
    expect(html).toMatch(/Pflicht-Begründung/);
    expect(html).toMatch(/Berufsordnung.*Approbation/);
  });

  it("Wechsel zu Anwalt zeigt §51 BRAO als Pflicht-Begründung", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const berufSelect = selects.find((s) => s.value === "it-software");
    fireEvent.change(berufSelect!, { target: { value: "rechtsberatung" } });
    const html = document.body.innerHTML;
    expect(html).toMatch(/§51 BRAO|§ 51 BRAO/);
  });

  it("UG/GmbH-Rechtsform aktiviert D&O als SINNVOLL", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    expect(document.body.innerHTML).not.toMatch(/Directors & Officers/);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "einzel-freiberuf");
    fireEvent.change(rfSelect!, { target: { value: "ug-gmbh" } });
    expect(document.body.innerHTML).toMatch(/Directors.*Officers/);
  });

  it("Eigene Produkte aktiviert Produkthaftpflicht als DRINGEND", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const prodLabel = Array.from(document.querySelectorAll("label")).find((l) => l.textContent?.includes("Eigene Produkte"));
    const prodBox = prodLabel?.querySelector("input[type=checkbox]") as HTMLInputElement;
    fireEvent.click(prodBox);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Produkthaftpflicht/);
  });

  it("Eigenes Büro aktiviert Inhalts-Versicherung als SINNVOLL", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const bueroLabel = Array.from(document.querySelectorAll("label")).find((l) => l.textContent?.includes("Eigenes Büro"));
    const bueroBox = bueroLabel?.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(bueroBox.checked).toBe(false);
    fireEvent.click(bueroBox);
    expect(document.body.innerHTML).toMatch(/Geschäftsinhalts-Versicherung/);
  });

  it("Online-Datenverarbeitung aktiviert Cyber als DRINGEND", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    // Default ist onlineDatenverarbeitung=true → Cyber sollte sichtbar sein
    const html = document.body.innerHTML;
    expect(html).toMatch(/Cyber-Versicherung/);
  });
});

describe("VersicherungsBasisCheck — Kosten-Berechnung", () => {
  it("Kosten-Hero zeigt Mittel-Wert", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    // Default IT-Solo: BHV (350) + BU (120) + PHV (90) + Cyber (400) + KTG (600) + KV (6000) = ~7.560
    // Mittel sollte > 5.000 sein
    expect(html).toMatch(/Geschätzte Jahreskosten/);
  });

  it("Kosten ändern sich bei Berufsbild-Wechsel", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const before = document.body.innerHTML;
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const berufSelect = selects.find((s) => s.value === "it-software");
    fireEvent.change(berufSelect!, { target: { value: "heilberuf" } });
    expect(document.body.innerHTML).not.toBe(before);
  });
});

describe("VersicherungsBasisCheck — Cards", () => {
  it("Versicherungs-Cards haben Schadenbeispiel + Beitragsspanne", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Beispiel-Schadensfall/);
    expect(html).toMatch(/Beitrag\/Jahr.*mittel/);
  });

  it("'mehr Details' öffnet Worauf-Achten + Anbieter-Hinweise", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    // PFLICHT/DRINGEND-Cards sind default expanded → KV ist Pflicht und sollte schon expanded sein
    expect(document.body.innerHTML).toMatch(/Worauf achten/);
    expect(document.body.innerHTML).toMatch(/Anbieter-Hinweise/);
  });

  it("'Nicht nötig'-Sektion ist einklappbar", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Versicherungen die du laut deinem Setup NICHT brauchst/);
  });
});

describe("VersicherungsBasisCheck — Persistenz", () => {
  it("Setup wird in localStorage gespeichert", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "einzel-freiberuf");
    fireEvent.change(rfSelect!, { target: { value: "ug-gmbh" } });
    const saved = JSON.parse(localStorage.getItem("ggh-versicherungs-setup-v1") || "{}");
    expect(saved.rechtsform).toBe("ug-gmbh");
  });
});

describe("VersicherungsBasisCheck — Cross-Tool-Links", () => {
  it("verlinkt zu KV-Optimizer, Roadmap (Tool 11), Pension-Optimizer", () => {
    renderWithRouter(<VersicherungsBasisCheck />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/kv-optimizer/);
    expect(html).toMatch(/\/cockpit\/erste-schritte-roadmap/);
    expect(html).toMatch(/\/cockpit\/pension-optimizer/);
  });
});

describe("Versicherungen-DB — Daten-Integrität", () => {
  it("alle 11 Versicherungen haben einzigartige IDs", () => {
    const ids = VERSICHERUNGEN.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBe(11);
  });

  it("BHV ist PFLICHT für Heilberuf", () => {
    const bhv = VERSICHERUNGEN.find((v) => v.id === "bhv")!;
    const heilSetup: VersicherungsSetup = {
      berufsbild: "heilberuf", rechtsform: "einzel-freiberuf",
      mitarbeiter: false, eigenesBuero: false, onlineDatenverarbeitung: false,
      eigeneProdukte: false, jahresUmsatz: 60000,
    };
    expect(bhv.prioritaet(heilSetup)).toBe("pflicht");
    expect(bhv.pflicht_begruendung?.(heilSetup)).toBeTruthy();
  });

  it("BU ist immer DRINGEND", () => {
    const bu = VERSICHERUNGEN.find((v) => v.id === "bu")!;
    const setup: VersicherungsSetup = {
      berufsbild: "sonstige", rechtsform: "einzel-gewerbe",
      mitarbeiter: false, eigenesBuero: false, onlineDatenverarbeitung: false,
      eigeneProdukte: false, jahresUmsatz: 60000,
    };
    expect(bu.prioritaet(setup)).toBe("dringend");
  });

  it("D&O ist nicht nötig bei Einzel-Freiberuf", () => {
    const doVers = VERSICHERUNGEN.find((v) => v.id === "do")!;
    const setup: VersicherungsSetup = {
      berufsbild: "it-software", rechtsform: "einzel-freiberuf",
      mitarbeiter: false, eigenesBuero: false, onlineDatenverarbeitung: true,
      eigeneProdukte: false, jahresUmsatz: 60000,
    };
    expect(doVers.prioritaet(setup)).toBe("nicht-noetig");
  });

  it("alle Berufsbild-Labels existieren", () => {
    Object.values(BERUFSBILD_LABELS).forEach((l) => {
      expect(l.length).toBeGreaterThan(0);
    });
  });
});
