/**
 * Rabatt-Hinweis am Ende des Rechtsform-Tests (12.11.2026, Code FOUNDER).
 *
 *  - Der Block erscheint nur in der Ergebnisansicht, nie in den Schritten davor.
 *  - Schalter aus: kein Block und kein Rabatt-Text in dem, was prerendert wird
 *    (Startzustand des Wizards + Texte der Landing).
 *  - Die Bedingungen stehen direkt am Block.
 *  - Keine Verlosungs-, Knappheits- oder Fristwörter.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: null, loading: false }) }));
vi.mock("@/hooks/useAccess", () => ({
  useAccess: () => ({ loading: false, hasActiveSub: false, isAdmin: false }),
}));
// Der E-Mail-Dialog bleibt echt (Hinweiszeile wird geprüft); nur seine Netz-Helfer sind gestubbt.
vi.mock("@/lib/freetools/leads", () => ({
  EMAIL_PATTERN: /^\S+@\S+\.\S+$/,
  rememberToolUnlocked: vi.fn(),
  saveToolLead: vi.fn(),
  trackToolLead: vi.fn(),
  isToolUnlockedLocally: () => false,
}));
vi.mock("@/lib/freetools/tipps", () => ({ EINWILLIGUNG_TEXT: "Tipps", TIPPS_AKTIV: false, TIPPS_TOOLS: new Set(), tippsAnfordern: vi.fn() }));
vi.mock("@/components/NewsletterOptin", () => ({ OPTIN_TEXT: "Neuigkeiten per Mail", newsletterAnmelden: vi.fn() }));

import { FreeToolWizard } from "@/components/freetools/FreeToolWizard";
import { baueRechtsformConfig, rechtsformConfig } from "@/lib/freetools/rechtsform";
import {
  ERSTER_MONAT_CENTS,
  RECHTSFORM_RABATT,
  RECHTSFORM_RABATT_AKTIV,
  RECHTSFORM_RABATT_FAQ,
  RECHTSFORM_RABATT_HINWEIS,
  rabattAbzugCents,
} from "@/lib/freetools/rechtsformRabatt";
import { FOUNDER_CODE, PLANS } from "@/config/pricing";
import type { ToolConfig } from "@/lib/freetools/types";
import { FREE_TOOLS } from "@/lib/freetools";

const zeige = (config: ToolConfig) =>
  render(
    <MemoryRouter>
      <FreeToolWizard config={config} />
    </MemoryRouter>,
  );

/** Klickt den Test bis zur Ergebnisansicht durch (Pflichtfelder: Gründerzahl, Haftung). */
const durchspielen = () => {
  fireEvent.click(screen.getByLabelText("Ich gründe alleine"));
  fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
  fireEvent.click(screen.getByLabelText(/Wichtig – mein Privatvermögen/));
  fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
  fireEvent.click(screen.getByRole("button", { name: /Rechtsform-Empfehlung erstellen/ }));
};

/** Alles, was die Landing als Text ausgibt (Hero, Erklärtext, FAQ, Meta). */
const landingText = (c: ToolConfig) =>
  JSON.stringify([c.heroTitle, c.heroSubtitle, c.seoSections, c.seo, c.steps]);

// Radix (Checkbox im echten E-Mail-Dialog) braucht ResizeObserver; jsdom hat keinen.
class RO { observe() {} unobserve() {} disconnect() {} }
(globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver ??= RO;

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

describe("Rechtsform-Test: Rabatt-Block bei aktivem Schalter", () => {
  const an = baueRechtsformConfig(true);

  it("zeigt den Block nicht in den Schritten, erst im Ergebnis", () => {
    zeige(an);
    expect(screen.queryByTestId("ergebnis-rabatt")).toBeNull();
    expect(document.body.innerHTML).not.toContain(RECHTSFORM_RABATT.code);

    fireEvent.click(screen.getByLabelText("Ich gründe alleine"));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
    expect(screen.queryByTestId("ergebnis-rabatt")).toBeNull();
    fireEvent.click(screen.getByLabelText(/Wichtig – mein Privatvermögen/));
    fireEvent.click(screen.getByRole("button", { name: /Weiter/ }));
    expect(screen.queryByTestId("ergebnis-rabatt")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Rechtsform-Empfehlung erstellen/ }));
    expect(screen.getByText(/Fertig: Rechtsform-Empfehlung/)).toBeInTheDocument();
    const block = screen.getByTestId("ergebnis-rabatt");
    expect(block).toHaveTextContent("FOUNDER");
    expect(block).toHaveTextContent("Du weißt jetzt, welche Rechtsform passt");
    expect(block).toHaveTextContent("51,99 €");
  });

  it("zeigt das Ergebnis vor dem Rabatt und den Block ohne E-Mail-Angabe", () => {
    zeige(an);
    durchspielen();
    const ergebnis = screen.getByTestId("ergebnis-zeile");
    const block = screen.getByTestId("ergebnis-rabatt");
    expect(ergebnis).toHaveTextContent("Unsere Empfehlung für dich: UG (haftungsbeschränkt)");
    expect(ergebnis.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Das Ergebnis ist noch gesperrt (E-Mail-Tor) – der Rabatt hängt nicht daran.
    expect(screen.getAllByText(/Kostenlos freischalten/).length).toBeGreaterThan(0);
  });

  it("steht über dem Dokument mit den Vorschauzeilen und über den Knöpfen", () => {
    zeige(an);
    durchspielen();
    const block = screen.getByTestId("ergebnis-rabatt");
    const dokument = screen.getByTestId("ergebnis-dokument");
    const knopf = screen.getByRole("button", { name: /Angaben ändern/, hidden: true });
    expect(block.compareDocumentPosition(dokument) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(block.compareDocumentPosition(knopf) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("zeigt im E-Mail-Dialog die Zeile mit Code und dem Hinweis „auch ohne E-Mail“", () => {
    zeige(an);
    durchspielen();
    const zeile = screen.getByTestId("gate-hinweis");
    expect(zeile).toHaveTextContent("FOUNDER");
    expect(zeile).toHaveTextContent("51,99 €");
    expect(zeile).toHaveTextContent("64,99 €");
    expect(zeile).toHaveTextContent(/gilt auch ohne E-Mail-Adresse/);
    // Der Dialog selbst ist unverändert da: Feld und Absende-Knopf.
    expect(screen.getByLabelText("E-Mail-Adresse")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ergebnis kostenlos freischalten/ })).toBeInTheDocument();
  });

  it("nennt die Bedingungen direkt am Block", () => {
    zeige(an);
    durchspielen();
    const block = screen.getByTestId("ergebnis-rabatt");
    expect(block).toHaveTextContent("Bedingungen");
    for (const b of RECHTSFORM_RABATT.bedingungen) expect(block).toHaveTextContent(b);
    expect(block).toHaveTextContent(/erste Rechnung/);
    expect(block).toHaveTextContent(/Ein Code pro Bestellung/);
    expect(block).toHaveTextContent(/Nicht mit dem Startangebot/);
    expect(block.querySelector('a[href^="/preise"]')).not.toBeNull();
  });

  it("verschwindet wieder, wenn man zu den Angaben zurückgeht", () => {
    zeige(an);
    durchspielen();
    fireEvent.click(screen.getByRole("button", { name: /Angaben ändern/, hidden: true }));
    expect(screen.queryByTestId("ergebnis-rabatt")).toBeNull();
  });

  it("ergänzt die Landing um einen Satz und den FAQ-Eintrag", () => {
    expect(landingText(an)).toContain(RECHTSFORM_RABATT.code);
    expect(an.seoSections?.[0].body).toContain(RECHTSFORM_RABATT_HINWEIS);
    expect(an.seo.faqs.map((f) => f.q)).toContain("Bekomme ich einen Rabatt?");
  });
});

describe("Rechtsform-Test: Schalter aus", () => {
  const aus = baueRechtsformConfig(false);

  it("zeigt auch im Ergebnis keinen Block", () => {
    zeige(aus);
    durchspielen();
    expect(screen.getByText(/Fertig: Rechtsform-Empfehlung/)).toBeInTheDocument();
    expect(screen.queryByTestId("ergebnis-rabatt")).toBeNull();
    expect(screen.queryByTestId("ergebnis-zeile")).toBeNull();
    expect(screen.queryByTestId("gate-hinweis")).toBeNull();
    expect(screen.getByLabelText("E-Mail-Adresse")).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain(RECHTSFORM_RABATT.code);
  });

  it("andere Gratis-Tools haben weder Block noch Dialog-Zeile", () => {
    for (const tool of FREE_TOOLS.filter((t) => t.slug !== "rechtsform-finden")) {
      expect(tool.ergebnisRabatt, tool.slug).toBeUndefined();
      expect(tool.ergebnisZeile, tool.slug).toBeUndefined();
    }
  });

  it("hat keinen Rabatt-Text im Prerender (Startzustand + Landing-Texte)", () => {
    zeige(aus);
    expect(document.body.innerHTML).not.toMatch(/FOUNDER|20 %|Rabatt/);
    expect(landingText(aus)).not.toMatch(/FOUNDER|20 %|Rabatt/);
    expect(aus.ergebnisRabatt).toBeUndefined();
  });

  it("die ausgelieferte Konfiguration folgt dem Schalter", () => {
    expect(Boolean(rechtsformConfig.ergebnisRabatt)).toBe(RECHTSFORM_RABATT_AKTIV);
    expect(landingText(rechtsformConfig).includes(RECHTSFORM_RABATT.code)).toBe(RECHTSFORM_RABATT_AKTIV);
  });
});

describe("Rechtsform-Rabatt: Wortlaut", () => {
  const texte = [
    RECHTSFORM_RABATT.titel,
    RECHTSFORM_RABATT.text,
    ...RECHTSFORM_RABATT.bedingungen,
    RECHTSFORM_RABATT.dialogZeile,
    RECHTSFORM_RABATT_HINWEIS,
    RECHTSFORM_RABATT_FAQ.q,
    RECHTSFORM_RABATT_FAQ.a,
  ].join(" ");

  it("verspricht keinen Gewinn, keine Knappheit, keine Frist, keinen Streichpreis, nichts Exklusives", () => {
    expect(texte).not.toMatch(/gewinn|verlos|glück|nur heute|nur noch|solange|begrenzt|limitiert|endet|countdown|statt \d|exklusiv|als dank/i);
  });

  it("sagt nichts zu Jahreszugang, Founder-Set oder Neukunden (nicht gemessen)", () => {
    expect(texte).not.toMatch(/jahr|founder-set|bundle|neukund/i);
  });

  it("nutzt den Code und Satz der zentralen Preisquelle", () => {
    expect(RECHTSFORM_RABATT.code).toBe(FOUNDER_CODE.code);
    expect(RECHTSFORM_RABATT.prozent).toBe(FOUNDER_CODE.percent);
  });

  it("rechnet den ersten Monat aus dem Monatspreis, kaufmännisch gerundet", () => {
    expect(rabattAbzugCents(6499, 20)).toBe(1300); // an der Kasse gemessen: −13,00 €
    expect(rabattAbzugCents(999, 15)).toBe(150);   // 149,85 → 150
    expect(ERSTER_MONAT_CENTS).toBe(PLANS.gruenderx.grossCents - rabattAbzugCents(PLANS.gruenderx.grossCents, FOUNDER_CODE.percent));
    expect(ERSTER_MONAT_CENTS).toBe(5199);         // 51,99 €, wie an der Kasse
    expect(texte).toContain("51,99 €");
    expect(texte).toContain("64,99 €");
  });
});
