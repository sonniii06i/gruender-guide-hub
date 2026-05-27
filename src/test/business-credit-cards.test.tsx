/**
 * Tests für BusinessCreditCards (/cockpit/geschaeftskreditkarten):
 * Render, Hero mit Amex-Referral-CTAs, Segment-Switcher, Filter, Panels.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

import BusinessCreditCards from "@/pages/BusinessCreditCards";
import { BIZ_CARDS, AMEX_REFERRAL, SEGMENT_META } from "@/data/businessCreditCards";

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <BusinessCreditCards />
      </MemoryRouter>
    </HelmetProvider>,
  );

// Anzahl Karten im Grid = Anzahl "Zur Anbieter-Seite"-Links (Hero-CTAs heißen anders)
const cardCount = () => screen.queryAllByText("Zur Anbieter-Seite").length;

const segCount = (seg: string) => BIZ_CARDS.filter((c) => c.segment === seg).length;

describe("BusinessCreditCards — Render & Hero", () => {
  it("rendert ohne Crash mit Titel", () => {
    renderPage();
    expect(screen.getByText(/Geschäftskreditkarten-Vergleich für Gründer/)).toBeTruthy();
  });

  it("zeigt Amex-Empfehlungs-Hero mit Gold + Platinum CTAs", () => {
    renderPage();
    expect(screen.getByText("Amex Gold beantragen")).toBeTruthy();
    expect(screen.getByText("Amex Platinum beantragen")).toBeTruthy();
  });

  it("Gold-CTA verlinkt exakt auf den Gold-Referral-Link", () => {
    renderPage();
    const a = screen.getByText("Amex Gold beantragen").closest("a");
    expect(a?.getAttribute("href")).toBe(AMEX_REFERRAL.gold);
    expect(a?.getAttribute("href")).toContain("ref=sONNIBIJNE");
  });

  it("Platinum-CTA verlinkt exakt auf den Platinum-Referral-Link", () => {
    renderPage();
    const a = screen.getByText("Amex Platinum beantragen").closest("a");
    expect(a?.getAttribute("href")).toBe(AMEX_REFERRAL.platinum);
    expect(a?.getAttribute("href")).toContain("ref=sONNIB8uIi");
  });

  it("CTAs öffnen in neuem Tab mit rel=noopener", () => {
    renderPage();
    const a = screen.getByText("Amex Gold beantragen").closest("a");
    expect(a?.getAttribute("target")).toBe("_blank");
    expect(a?.getAttribute("rel")).toContain("noopener");
  });
});

describe("BusinessCreditCards — Segmente & Filter", () => {
  // Filter/Segment-Texte tauchen auch als Karten-Badges auf → gezielt den Button greifen
  const btn = (name: string | RegExp) => screen.getByRole("button", { name });

  it("zeigt initial das Solo-Segment", () => {
    renderPage();
    expect(cardCount()).toBe(segCount("solo"));
  });

  it("Klick auf 'Alle X Karten' zeigt alle Karten", () => {
    renderPage();
    fireEvent.click(btn(`Alle ${BIZ_CARDS.length} Karten`));
    expect(cardCount()).toBe(BIZ_CARDS.length);
  });

  it("Segment-Switcher wechselt zu Team", () => {
    renderPage();
    fireEvent.click(btn(new RegExp(SEGMENT_META.team.label)));
    expect(cardCount()).toBe(segCount("team"));
  });

  it("Filter 'Nur SCHUFA-frei' schließt Amex & Moss aus", () => {
    renderPage();
    fireEvent.click(btn(`Alle ${BIZ_CARDS.length} Karten`));
    fireEvent.click(btn("Nur SCHUFA-frei"));
    const expected = BIZ_CARDS.filter((c) => !c.schufa).length;
    expect(cardCount()).toBe(expected);
    // Amex Basic (nur im Grid, nicht im Hero) darf nicht mehr da sein
    expect(screen.queryByText("Amex Business (Basic/Green)")).toBeNull();
  });

  it("Filter '0 €-Einstieg' zeigt nur Free-Tier-Karten", () => {
    renderPage();
    fireEvent.click(btn(`Alle ${BIZ_CARDS.length} Karten`));
    fireEvent.click(btn("0 €-Einstieg"));
    expect(cardCount()).toBe(BIZ_CARDS.filter((c) => c.hasFreeTier).length);
  });

  it("Filter 'Native DATEV' + 'Solo ab Tag 1' kombinieren sich", () => {
    renderPage();
    fireEvent.click(btn(`Alle ${BIZ_CARDS.length} Karten`));
    fireEvent.click(btn("Native DATEV"));
    fireEvent.click(btn("Solo ab Tag 1"));
    const expected = BIZ_CARDS.filter((c) => c.datevNative && c.soloDayOne).length;
    expect(cardCount()).toBe(expected);
    expect(expected).toBeGreaterThan(0);
  });
});

describe("BusinessCreditCards — Panels", () => {
  it("Entscheidungs-Hilfe lässt sich aufklappen", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Welche Karte für welchen Gründer-Typ/));
    expect(screen.getAllByText(/Bootstrap-Solo/).length).toBeGreaterThan(0);
  });

  it("Karten-Typen-Panel lässt sich aufklappen", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Charge vs\. Debit vs\. Kreditkarte vs\. Prepaid/));
    expect(screen.getAllByText(/Charge-Card/).length).toBeGreaterThan(0);
  });
});
