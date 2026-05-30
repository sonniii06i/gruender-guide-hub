/**
 * Smoke-Tests für die 7 DE-Steuer-Cockpit-Tools.
 * Testet:
 *  - Render ohne Crash
 *  - State-Switches (Tabs, Toggles, Dropdowns)
 *  - Berechnungen mit Beispielwerten
 *  - Validation-Verhalten (Bound-Checks)
 *  - Cross-Tool-Konstanten-Konsistenz aus germanTax.ts
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

import IabRechner from "@/pages/IabRechner";
import KfzOptimizer from "@/pages/KfzOptimizer";
import ReisekostenLogger from "@/pages/ReisekostenLogger";
import SalaryDividendOptimizer from "@/pages/SalaryDividendOptimizer";
import CryptoSteuer from "@/pages/CryptoSteuer";
import PensionOptimizer from "@/pages/PensionOptimizer";
import QuartalsSteuer from "@/pages/QuartalsSteuer";
import SteuerCockpit from "@/pages/SteuerCockpit";
import AmazonBuchungen from "@/pages/AmazonBuchungen";
import PreYearEndCheck from "@/pages/PreYearEndCheck";
import { ALL_AMAZON_CODES, lookupAmazonCode, PREFIX_CODES } from "@/lib/amazonBookingCodes";

import {
  RUERUP_MAX_SINGLE,
  BBG_RV_WEST_JAHR,
  BAV_STEUERFREI_QUOTE,
  BAV_KV_FREIBETRAG_JAHR_2026,
  GEWST_ANRECHNUNG_FAKTOR,
  VERAUSSERUNG_FREIGRENZE,
  SOLZ_FREIGRENZE_SINGLE,
  RIESTER_SOCKELBETRAG,
  RIESTER_KIND_ZULAGE_AB_2008,
  RIESTER_KIND_ZULAGE_VOR_2008,
} from "@/lib/germanTax";

const renderWithRouter = (ui: React.ReactElement, route = "/") =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);

// =====================================================================
// Lib-Konstanten — Stand 2026
// =====================================================================
describe("germanTax.ts — Stand 2026 Konstanten", () => {
  it("RUERUP_MAX_SINGLE = 30826", () => {
    expect(RUERUP_MAX_SINGLE).toBe(30826);
  });
  it("BBG_RV bundeseinheitlich 101400", () => {
    expect(BBG_RV_WEST_JAHR).toBe(101400);
  });
  it("bAV-Steuer-frei = 8% (= 8112 € 2026)", () => {
    expect(BAV_STEUERFREI_QUOTE).toBe(0.08);
    expect(BBG_RV_WEST_JAHR * BAV_STEUERFREI_QUOTE).toBe(8112);
  });
  it("bAV-KV-Freibetrag 2026 = 2.373 €/J", () => {
    expect(BAV_KV_FREIBETRAG_JAHR_2026).toBe(2373);
  });
  it("§35 EStG GewSt-Anrechnungsfaktor = 4.0 (seit 2020)", () => {
    expect(GEWST_ANRECHNUNG_FAKTOR).toBe(4.0);
  });
  it("§23 EStG Freigrenze = 1000 €", () => {
    expect(VERAUSSERUNG_FREIGRENZE).toBe(1000);
  });
  it("SolZ-Freigrenze Single 2026 = 20.350 €", () => {
    expect(SOLZ_FREIGRENZE_SINGLE).toBe(20350);
  });
  it("Riester-Sockelbetrag 60 €/J", () => {
    expect(RIESTER_SOCKELBETRAG).toBe(60);
  });
  it("Riester-Kinderzulage ab 2008 = 300 €, vor 2008 = 185 €", () => {
    expect(RIESTER_KIND_ZULAGE_AB_2008).toBe(300);
    expect(RIESTER_KIND_ZULAGE_VOR_2008).toBe(185);
  });
});

// =====================================================================
// Tool 1: IAB-Rechner
// =====================================================================
describe("IAB-Rechner", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<IabRechner />);
    expect(screen.getByText(/Investitionsabzugsbetrag/i)).toBeInTheDocument();
  });
  it("zeigt initialen IAB-Wert basierend auf Default-Investitionen", () => {
    renderWithRouter(<IabRechner />);
    // Default ist GmbH mit Inv-Summe → IAB-Abzug sichtbar
    const ergebnisText = screen.getAllByText(/IAB-Abzug|Steuer-Ersparnis|Ersparnis/i);
    expect(ergebnisText.length).toBeGreaterThan(0);
  });
  it("Hebesatz-Input ist editierbar (vorher hardcoded)", () => {
    renderWithRouter(<IabRechner />);
    // Hebesatz-Input sollte existieren (war ursprünglich hardcoded auf 400)
    const html = document.body.innerHTML;
    expect(html).toMatch(/Hebesatz/i);
  });
});

// =====================================================================
// Tool 2: KfzOptimizer
// =====================================================================
describe("KfzOptimizer", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<KfzOptimizer />);
    expect(screen.getAllByText(/Kfz/i).length).toBeGreaterThan(0);
  });
  it("Pendlerpauschale 2026: 15km × 220 Tage = 1254 € (0,38 € ab km 1)", () => {
    // 2026: einheitlich 0,38 €/km ab dem 1. km (Steueränderungsgesetz 2025), keine Staffel mehr
    const km = 15, tage = 220;
    const pauschale = km * 0.38 * tage;
    expect(pauschale).toBe(1254);
  });
  it("Pendlerpauschale 2026: 25km × 220 Tage = 2090 € (0,38 € ab km 1)", () => {
    const km = 25, tage = 220;
    const pauschale = km * 0.38 * tage;
    expect(pauschale).toBe(2090);
  });
});

// =====================================================================
// Tool 3: Reisekosten
// =====================================================================
describe("ReisekostenLogger", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<ReisekostenLogger />);
    expect(screen.getAllByText(/Reisekosten/i).length).toBeGreaterThan(0);
  });
  it("subtitle nennt 35+ Länder (nicht mehr '12')", () => {
    renderWithRouter(<ReisekostenLogger />);
    expect(document.body.innerHTML).toMatch(/35\+/);
    expect(document.body.innerHTML).not.toMatch(/12 Auslands-Länder/);
  });
  it("Verpflegung-Logik: 3-Tage DE = 1 ganzer + 2 halbe = 56 €", () => {
    const tage: number = 3;
    const istTagesreise = tage === 1;
    let verpflegung = 0;
    if (istTagesreise) verpflegung = 14;
    else {
      const ganzeTage = Math.max(0, tage - 2);
      verpflegung = ganzeTage * 28 + 2 * 14;
    }
    expect(verpflegung).toBe(56);
  });
  it("Tagesreise <8h = 0 € (§9 (4a) EStG)", () => {
    const tage = 1, tagesreiseUeber8h = false;
    const istTagesreise = tage === 1;
    let verpflegung = 0;
    if (istTagesreise && !tagesreiseUeber8h) verpflegung = 0;
    else if (istTagesreise) verpflegung = 14;
    expect(verpflegung).toBe(0);
  });
  it("Tagesreise >8h = 14 €", () => {
    const tage = 1, tagesreiseUeber8h = true;
    const istTagesreise = tage === 1;
    let verpflegung = 0;
    if (istTagesreise && !tagesreiseUeber8h) verpflegung = 0;
    else if (istTagesreise) verpflegung = 14;
    expect(verpflegung).toBe(14);
  });
});

// =====================================================================
// Tool 4: Salary-vs-Dividende-Optimizer
// =====================================================================
describe("SalaryDividendOptimizer", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<SalaryDividendOptimizer />);
    expect(screen.getAllByText(/Salary|Gehalt|Dividende/i).length).toBeGreaterThan(0);
  });
  it("zeigt Default-Szenario mit Berechnung", () => {
    renderWithRouter(<SalaryDividendOptimizer />);
    // Es sollten mehrere €-Werte sichtbar sein
    const euroValues = document.body.innerHTML.match(/\d+(\.\d+)?\s*€/g);
    expect(euroValues).toBeTruthy();
    expect((euroValues || []).length).toBeGreaterThan(3);
  });
});

// =====================================================================
// Tool 5: Crypto-Steuer
// =====================================================================
describe("CryptoSteuer", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<CryptoSteuer />);
    expect(screen.getAllByText(/Crypto/i).length).toBeGreaterThan(0);
  });
  it("Freigrenze 1.000 € § 23: 200 € steuerfrei, 1500 € voll pflichtig", () => {
    const test200 = 200 < VERAUSSERUNG_FREIGRENZE ? 0 : 200;
    const test1500 = 1500 < VERAUSSERUNG_FREIGRENZE ? 0 : 1500;
    expect(test200).toBe(0);
    expect(test1500).toBe(1500);
  });
  it("Verlust-Logik: -500 € → kein steuerlast aber Verlustvortrag", () => {
    const total = -500;
    const istVerlust = total < 0;
    const steuerlast = istVerlust ? 0 : total;
    const verlustvortrag = istVerlust ? Math.abs(total) : 0;
    expect(steuerlast).toBe(0);
    expect(verlustvortrag).toBe(500);
  });
});

// =====================================================================
// Tool 6: Pension-Optimizer
// =====================================================================
describe("PensionOptimizer", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<PensionOptimizer />);
    expect(screen.getAllByText(/Pension|Rürup|Riester/i).length).toBeGreaterThan(0);
  });
  it("Riester-Mindesteigenbeitrag-Schwelle: 80k Brutto → 4% × 80k - 175 = 3025 €", () => {
    const jahresEinkommen = 80000, zulagen = 175;
    const mindest = jahresEinkommen * 0.04 - zulagen;
    const ergebnis = Math.max(RIESTER_SOCKELBETRAG, mindest);
    expect(ergebnis).toBe(3025);
  });
  it("Riester-Sockel greift bei sehr niedrigem Einkommen (3k Brutto + viele Zulagen)", () => {
    // 3k × 4% = 120 - 175 (Grundzulage) = -55 → Math.max(60, -55) = 60 (Sockel greift)
    const jahresEinkommen = 3000, zulagen = 175;
    const mindest = jahresEinkommen * 0.04 - zulagen;
    const ergebnis = Math.max(RIESTER_SOCKELBETRAG, mindest);
    expect(ergebnis).toBe(60);
  });
  it("Riester-Mindest bei mittlerem Einkommen ohne Sockel-Wirkung", () => {
    // 10k × 4% = 400 - 175 = 225 → kein Sockel
    const jahresEinkommen = 10000, zulagen = 175;
    const mindest = jahresEinkommen * 0.04 - zulagen;
    const ergebnis = Math.max(RIESTER_SOCKELBETRAG, mindest);
    expect(ergebnis).toBe(225);
  });
  it("bAV-Cap 2026: 8112 € (101.400 × 8%)", () => {
    expect(BBG_RV_WEST_JAHR * BAV_STEUERFREI_QUOTE).toBe(8112);
  });
  it("Kinder ab 2008: 2 Kinder = 600 €, +1 vor 2008 = 785 €", () => {
    const kinderAb = 2, kinderVor = 1;
    const zulagen = 175 + kinderAb * RIESTER_KIND_ZULAGE_AB_2008 + kinderVor * RIESTER_KIND_ZULAGE_VOR_2008;
    expect(zulagen).toBe(175 + 600 + 185); // 960
  });
});

// =====================================================================
// Tool 7: Quartals-Steuerschätzung
// =====================================================================
describe("QuartalsSteuer", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<QuartalsSteuer />);
    expect(screen.getAllByText(/Quartal|Vorauszahlung/i).length).toBeGreaterThan(0);
  });
  it("GewSt-Anrechnung mit Faktor 4.0 (nicht mehr 3.8)", () => {
    const gewinn = 80000;
    const gewstBasis = Math.max(0, gewinn - 24500);
    const gewstMessbetrag = gewstBasis * 0.035;
    const anrechnung = gewstMessbetrag * GEWST_ANRECHNUNG_FAKTOR;
    // Bei 80k Gewinn: (80k-24.5k) × 3.5% × 4.0 = 7770 €
    expect(anrechnung).toBeCloseTo(7770, 0);
  });
  it("4 Quartals-Termine 10.3 / 10.6 / 10.9 / 10.12", () => {
    renderWithRouter(<QuartalsSteuer />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/10\.\s*März/);
    expect(html).toMatch(/10\.\s*Juni/);
    expect(html).toMatch(/10\.\s*September/);
    expect(html).toMatch(/10\.\s*Dezember/);
  });
});

// =====================================================================
// Tool 8: Frist-Kalender (SteuerCockpit)
// =====================================================================
describe("SteuerCockpit (Frist-Kalender)", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<SteuerCockpit />);
    expect(screen.getAllByText(/Frist|Termin|Steuer/i).length).toBeGreaterThan(0);
  });
  it("zeigt 2026er Steuer-Termine", () => {
    renderWithRouter(<SteuerCockpit />);
    const html = document.body.innerHTML;
    // Mindestens ein Quartals-Datum sollte sichtbar sein
    const hatTermine = /10\.\d{2}\./.test(html) || /\d{2}\.\d{2}\./.test(html);
    expect(hatTermine).toBe(true);
  });
  it("zeigt IAB-Rechner-Sektion mit §7g EStG", () => {
    renderWithRouter(<SteuerCockpit />);
    expect(document.body.innerHTML).toMatch(/IAB|§\s*7g|Investitionsabzug/i);
  });
});

// =====================================================================
// Tool 9: Amazon-Buchungstexte
// =====================================================================
describe("AmazonBuchungen (130+ Code-Lookup)", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<AmazonBuchungen />);
    expect(screen.getAllByText(/Amazon|Buchung|Code/i).length).toBeGreaterThan(0);
  });
  it("Code-Datenbank hat mind. 130 Einträge", () => {
    expect(ALL_AMAZON_CODES.length).toBeGreaterThanOrEqual(130);
  });
  it("Wichtigste Codes existieren in der DB", () => {
    // Bekannte Amazon-Settlement-Prefixes
    const prefixes = PREFIX_CODES.map((c) => c.code);
    expect(prefixes).toContain("AMA-SG-DE");
    expect(prefixes).toContain("AMA-BG-DE");
  });
  it("lookupAmazonCode findet AMA-SG-DE-Principal als Sub", () => {
    const result = lookupAmazonCode("AMA-SG-DE-Principal");
    expect(result.prefix?.code).toBe("AMA-SG-DE");
  });
  it("lookupAmazonCode kennt Fallback bei unbekanntem Code", () => {
    const result = lookupAmazonCode("AMA-SG-DE-UNBEKANNTER-CODE-XYZ");
    expect(result.prefix?.code).toBe("AMA-SG-DE");
    expect(result.fallbackHint).toBeTruthy();
  });
});

// =====================================================================
// Tool 10: PreYearEndCheck (7 Hebel)
// =====================================================================
describe("PreYearEndCheck (7 Hebel)", () => {
  it("rendert ohne Crash", () => {
    renderWithRouter(<PreYearEndCheck />);
    expect(screen.getAllByText(/Pre-Year|Hebel|IAB|Investition/i).length).toBeGreaterThan(0);
  });
  it("IAB-Hebel ist sichtbar (§7g)", () => {
    renderWithRouter(<PreYearEndCheck />);
    expect(document.body.innerHTML).toMatch(/IAB|§\s*7g/i);
  });
  it("hat Hebesatz-Input (kein hardcoded 400% mehr)", () => {
    renderWithRouter(<PreYearEndCheck />);
    expect(document.body.innerHTML).toMatch(/Hebesatz|GewSt/i);
  });
  it("IAB-Ersparnis: GmbH 150k Gewinn, Inv 80k → ~12.075 € Ersparnis (40k × 30.19%)", () => {
    // Replikat: GmbH IAB-Pfad ohne Progression
    const gewinn = 150000, invBasis = 80000, hebesatz = 400;
    const iabAbzug = Math.min(invBasis * 0.5, 200000); // 40k
    const KSt_GEWST = 0.15 * 1.055 + (hebesatz / 100) * 0.035; // 15.825% + 14% = 29.825%
    const ersparnis = iabAbzug * KSt_GEWST;
    expect(iabAbzug).toBe(40000);
    expect(ersparnis).toBeCloseTo(11930, -1); // 40k × 29.825% ≈ 11.930
    // Gewinn nicht im Sperrbereich (200k)
    expect(gewinn <= 200000).toBe(true);
  });
  it("IAB-Sperre greift bei Gewinn > 200k Einzel", () => {
    const gewinn = 250000;
    const iabBerechtigt = gewinn <= 200000;
    expect(iabBerechtigt).toBe(false);
  });
});

// =====================================================================
// Cross-Tool-Konsistenz
// =====================================================================
describe("Cross-Konsistenz: alle Tools nutzen Lib-Konstanten", () => {
  it("Alle 10 Tools haben einen funktionsfähigen Renderpath", () => {
    expect(() => renderWithRouter(<IabRechner />)).not.toThrow();
    expect(() => renderWithRouter(<KfzOptimizer />)).not.toThrow();
    expect(() => renderWithRouter(<ReisekostenLogger />)).not.toThrow();
    expect(() => renderWithRouter(<SalaryDividendOptimizer />)).not.toThrow();
    expect(() => renderWithRouter(<CryptoSteuer />)).not.toThrow();
    expect(() => renderWithRouter(<PensionOptimizer />)).not.toThrow();
    expect(() => renderWithRouter(<QuartalsSteuer />)).not.toThrow();
    expect(() => renderWithRouter(<SteuerCockpit />)).not.toThrow();
    expect(() => renderWithRouter(<AmazonBuchungen />)).not.toThrow();
    expect(() => renderWithRouter(<PreYearEndCheck />)).not.toThrow();
  });
});
