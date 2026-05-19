/**
 * Tests für BruttoNettoSolo (Anfänger-Tool #5, Wave 2).
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import BruttoNettoSolo from "@/pages/BruttoNettoSolo";

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("BruttoNettoSolo — Render + Anfänger-Layout", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(screen.getAllByText(/Brutto-Netto|Solo|Selbstständig/i).length).toBeGreaterThan(0);
  });

  it("zeigt BeginnerHero", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(screen.getByText(/Was ist das hier/i)).toBeInTheDocument();
  });

  it("hat Glossar einklappbar mit Kern-Begriffen", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Glossar/);
    expect(html).toMatch(/Gewinn.*Bemessungsgrundlage/);
    expect(html).toMatch(/KSK.*Künstlersozial/);
    expect(html).toMatch(/Splitting/);
  });
});

describe("BruttoNettoSolo — Berechnung", () => {
  it("Default 60k Umsatz - 15k BA → 45k Gewinn", () => {
    renderWithRouter(<BruttoNettoSolo />);
    // Step-by-Step zeigt 45.000 € als Gewinn
    expect(document.body.innerHTML).toMatch(/45\.000.*€/);
  });

  it("Umsatz-Änderung führt zu neuem Netto", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "60000");
    expect(umsatzInput).toBeTruthy();
    const before = document.body.innerHTML;
    fireEvent.change(umsatzInput!, { target: { value: "100000" } });
    // Anzeige sollte sich geändert haben
    expect(document.body.innerHTML).not.toBe(before);
    expect(document.body.innerHTML).toMatch(/100\.000.*€/);
  });

  it("Bei Freiberuf wird KEINE GewSt gezeigt", () => {
    renderWithRouter(<BruttoNettoSolo />);
    // Default ist Freiberuf
    expect(document.body.innerHTML).not.toMatch(/Gewerbesteuer.*nach §35-Anrechnung/);
  });

  it("Bei Gewerbe mit Hebesatz 500% wird GewSt-Belastung gezeigt", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "freiberuf");
    fireEvent.change(rfSelect!, { target: { value: "gewerbe" } });
    // Hebesatz auf 500% setzen — dann ist GewSt > Anrechnung
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const hebesatzInput = inputs.find((i) => i.value === "400");
    fireEvent.change(hebesatzInput!, { target: { value: "500" } });
    expect(document.body.innerHTML).toMatch(/Gewerbesteuer/);
    expect(document.body.innerHTML).toMatch(/§35-Anrechnung/);
  });

  it("Bei Gewerbe mit Hebesatz 400% ist GewSt durch §35 effektiv neutral", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const rfSelect = selects.find((s) => s.value === "freiberuf");
    fireEvent.change(rfSelect!, { target: { value: "gewerbe" } });
    // Hebesatz default 400 → §35-Anrechnung neutralisiert GewSt komplett
    // Tool zeigt dann KEINE GewSt-Row, weil gewSt = 0
    // Aber Status "Gewerbe" sollte trotzdem im UI sein
    expect(document.body.innerHTML).toMatch(/Gewerbe.*GewSt ab 24\.500/);
  });
});

describe("BruttoNettoSolo — Step-by-Step-Detail", () => {
  it("zeigt alle Rechen-Schritte: Umsatz → BA → Gewinn → ESt → Netto", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Jahres-Umsatz/);
    expect(html).toMatch(/Betriebsausgaben/);
    expect(html).toMatch(/Gewinn.*Bemessungsgrundlage/);
    expect(html).toMatch(/Einkommensteuer.*§32a/);
    expect(html).toMatch(/Netto pro Jahr/);
    expect(html).toMatch(/Netto pro Monat/);
  });

  it("zeigt SolZ-Freigrenze-Hinweis", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(document.body.innerHTML).toMatch(/Freigrenze 19\.950 € ESt/);
  });
});

describe("BruttoNettoSolo — Vergleich Angestellter", () => {
  it("zeigt Vergleichs-Sektion", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(screen.getAllByText(/Vergleich.*Angestellter/i).length).toBeGreaterThan(0);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Selbstständig.*du/);
    expect(html).toMatch(/Differenz/);
  });

  it("zeigt 30%-Faustregel-Hinweis", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(document.body.innerHTML).toMatch(/Faustregel.*30.*%.*Plus/i);
  });
});

describe("BruttoNettoSolo — KV-Varianten", () => {
  it("zeigt KV-Variante GKV-freiwillig + Zusatzbeitrag-Input", () => {
    renderWithRouter(<BruttoNettoSolo />);
    expect(document.body.innerHTML).toMatch(/GKV freiwillig.*Mindestbeitrag/);
    expect(document.body.innerHTML).toMatch(/Zusatzbeitrag.*Kasse/i);
  });

  it("Wechsel zu PKV zeigt PKV-Beitrag-Input", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const kvSelect = selects.find((s) => s.value === "gkv-freiwillig");
    fireEvent.change(kvSelect!, { target: { value: "pkv" } });
    expect(document.body.innerHTML).toMatch(/PKV-Beitrag.*Monat/);
  });

  it("KSK halbiert KV-Beitrag", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const kvSelect = selects.find((s) => s.value === "gkv-freiwillig");
    fireEvent.change(kvSelect!, { target: { value: "ksk" } });
    expect(document.body.innerHTML).toMatch(/Bund zahlt 50/);
  });
});

describe("BruttoNettoSolo — Cross-Tool-Links", () => {
  it("verlinkt zu GewerbeCheck, Quartal-Steuer und KV-Optimizer", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/\/cockpit\/gewerbe-check/);
    expect(html).toMatch(/\/cockpit\/quartals-steuer/);
    expect(html).toMatch(/\/cockpit\/kv-optimizer/);
  });
});

describe("BruttoNettoSolo — Edge-Cases", () => {
  it("0 € Umsatz crasht nicht", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "60000");
    fireEvent.change(umsatzInput!, { target: { value: "0" } });
    // Sollte nicht crashen und KV-Mindestbeitrag trotzdem zeigen
    expect(document.body.innerHTML).toMatch(/Netto pro Jahr/);
  });

  it("Sehr hoher Umsatz (200k) crasht nicht", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    const umsatzInput = inputs.find((i) => i.value === "60000");
    fireEvent.change(umsatzInput!, { target: { value: "200000" } });
    expect(document.body.innerHTML).toMatch(/200\.000/);
  });

  it("Kinderlos-Toggle ändert Netto-Berechnung", () => {
    renderWithRouter(<BruttoNettoSolo />);
    const before = document.body.innerHTML;
    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const kinderlosBox = checkboxes.find((c) => c.checked === true);
    expect(kinderlosBox).toBeTruthy();
    fireEvent.click(kinderlosBox!);
    // Netto sollte sich geändert haben (Kinderlos = höherer PV-Satz = weniger Netto)
    expect(document.body.innerHTML).not.toBe(before);
  });
});
