/**
 * Rabatt am Ende des Rechtsform-Tests (12.11.2026).
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
// Das E-Mail-Tor ist hier nicht Thema (und zieht Supabase nach).
vi.mock("@/components/freetools/EmailGateDialog", () => ({ EmailGateDialog: () => null }));

import { FreeToolWizard } from "@/components/freetools/FreeToolWizard";
import { baueRechtsformConfig, rechtsformConfig } from "@/lib/freetools/rechtsform";
import {
  RECHTSFORM_RABATT,
  RECHTSFORM_RABATT_AKTIV,
  RECHTSFORM_RABATT_FAQ,
  RECHTSFORM_RABATT_HINWEIS,
} from "@/lib/freetools/rechtsformRabatt";
import type { ToolConfig } from "@/lib/freetools/types";

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
    expect(block).toHaveTextContent("RECHTSFORM15");
    expect(block).toHaveTextContent("15 % auf deinen ersten Monat");
  });

  it("zeigt das Ergebnis vor dem Rabatt und den Block ohne E-Mail-Angabe", () => {
    zeige(an);
    durchspielen();
    const ergebnis = screen.getByText(/Unsere Empfehlung für dich/);
    const block = screen.getByTestId("ergebnis-rabatt");
    expect(ergebnis.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Das Ergebnis ist noch gesperrt (E-Mail-Tor) – der Rabatt hängt nicht daran.
    expect(screen.getAllByText(/Kostenlos freischalten/).length).toBeGreaterThan(0);
  });

  it("nennt die Bedingungen direkt am Block", () => {
    zeige(an);
    durchspielen();
    const block = screen.getByTestId("ergebnis-rabatt");
    expect(block).toHaveTextContent("Bedingungen");
    for (const b of RECHTSFORM_RABATT.bedingungen) expect(block).toHaveTextContent(b);
    expect(block).toHaveTextContent(/erste[nr]? Rechnung/);
    expect(block).toHaveTextContent(/nicht mit anderen Gutscheincodes/);
    expect(block.querySelector('a[href^="/preise"]')).not.toBeNull();
  });

  it("verschwindet wieder, wenn man zu den Angaben zurückgeht", () => {
    zeige(an);
    durchspielen();
    fireEvent.click(screen.getByRole("button", { name: /Angaben ändern/ }));
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
    expect(document.body.innerHTML).not.toContain(RECHTSFORM_RABATT.code);
  });

  it("hat keinen Rabatt-Text im Prerender (Startzustand + Landing-Texte)", () => {
    zeige(aus);
    expect(document.body.innerHTML).not.toMatch(/RECHTSFORM15|15 %|Rabatt/);
    expect(landingText(aus)).not.toMatch(/RECHTSFORM15|15 %|Rabatt/);
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
    RECHTSFORM_RABATT_HINWEIS,
    RECHTSFORM_RABATT_FAQ.q,
    RECHTSFORM_RABATT_FAQ.a,
  ].join(" ");

  it("verspricht keinen Gewinn, keine Knappheit, keine Frist, keinen Streichpreis", () => {
    expect(texte).not.toMatch(/gewinn|verlos|glück|nur heute|nur noch|solange|begrenzt|limitiert|endet|countdown|statt \d/i);
  });

  it("bleibt bei 15 % und dem festgelegten Code", () => {
    expect(RECHTSFORM_RABATT.prozent).toBe(15);
    expect(RECHTSFORM_RABATT.code).toBe("RECHTSFORM15");
  });
});
