/**
 * Funnel-Lauf 27.11.2026: drei Fehlerklassen, je ein Wächter.
 *
 *  1. Seit dem 25.11.2026 (Commit 2eb0e9b) sind Vorlagen, Checks und Generatoren ohne E-Mail-Tor frei.
 *     Über 15 öffentliche Seiten kündigten das Tor trotzdem weiter an (Fließtext, FAQ, Meta-Beschreibung,
 *     JSON-LD). Solange alle Tore offen sind, darf kein Seitentext eine E-Mail-Pflicht oder eine
 *     Begrenzung auf eine Nutzung versprechen.
 *  2. Ausgeloggte Besucher auf Mitglieder-Seiten landeten kommentarlos auf dem Formular von /auth
 *     (46 Umleitungen seit 26.10., kein Konto). AppLayout nennt jetzt die Seite, /auth erklärt die Wand.
 *  3. Kein Beliebtheits-Etikett an Kauf-Optionen ohne Beleg (werbung-belegbar).
 */
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { globSync, readFileSync } from "node:fs";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: null, loading: false }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: {} } }));
vi.mock("@/utils/analytics", () => ({ trackSignup: { started: vi.fn(), completed: vi.fn(), ssoClicked: vi.fn() } }));
vi.mock("@/utils/guestCheckout", () => ({ startGuestCheckout: vi.fn() }));
vi.mock("@/utils/adConversions", () => ({ trackAdConversion: vi.fn() }));
vi.mock("@/components/StartAngebotButton", () => ({ StartAngebotButton: () => null }));
vi.mock("@/lib/iosApp", () => ({ isGruenderXIosApp: () => false }));

import Auth from "@/pages/Auth";
import { TRIAL_TOOLS } from "@/lib/freetools/trialTools";

const quelltexte = (muster: string) =>
  (globSync as (p: string) => string[])(muster).filter((d) => !/\.test\.|\/test\//.test(d));

/** Kommentare zählen nicht: Dort darf die Geschichte des Tors stehen bleiben. */
const ohneKommentare = (q: string) => q.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|\s)\/\/.*$/gm, " ");

describe("Texte versprechen kein E-Mail-Tor, das es nicht gibt", () => {
  // Wer ein Tor wieder einschaltet, passt zuerst die Texte an und dann diese Vorbedingung.
  it("Vorbedingung: alle Tore sind offen", () => {
    expect(TRIAL_TOOLS.every((t) => t.frei)).toBe(true);
    for (const d of quelltexte("src/lib/freetools/*.ts")) {
      expect(ohneKommentare(readFileSync(d, "utf8")), d).not.toMatch(/\bgated:\s*true\b/);
    }
    expect(readFileSync("src/pages/VorlageDetail.tsx", "utf8")).toMatch(/const offen = true;/);
  });

  const TOR = new RegExp(
    [
      "gegen\\s+(deine\\s+|die\\s+|eine\\s+)?(bestätigte\\s+)?E-Mail",
      "nur E-Mail nötig",
      "nur E-Mail\\.",
      "E-Mail(-Adresse)?\\s+bestätigen,\\s+(dann|danach)",
      "bestätigst\\s+(einmal\\s+)?deine\\s+E-Mail",
      "gibst\\s+(einmal\\s+)?deine\\s+E-Mail",
      "E-Mail angeben,",
      "1 kostenlose[rs]? (Nutzung|Prüfung|Check|Checkliste|Berechnung|Umwandlung)",
      "1 (Nutzung|Prüfung|Umwandlung|Berechnung) kostenlos",
      "je einmal (kostenlos|nutzen)",
      "einmal kostenlos",
      "eine (Nutzung|Prüfung|Berechnung|Umwandlung) kostenlos",
    ].join("|"),
    "i",
  );
  // Rechtstext: ändert nur der Betreiber. VorlageDetail: stillgelegter Zweig hinter `offen`.
  const AUSNAHMEN = ["src/pages/Datenschutz.tsx", "src/pages/VorlageDetail.tsx"];

  it("Seiten, Daten und Generator-Texte nennen weder E-Mail-Pflicht noch eine einzige Gratis-Nutzung", () => {
    const dateien = [
      ...quelltexte("src/pages/**/*.{ts,tsx}"),
      ...quelltexte("src/data/**/*.{ts,tsx}"),
      ...quelltexte("src/lib/freetools/*.ts"),
      ...quelltexte("src/components/landing/**/*.tsx"),
    ].filter((d) => !AUSNAHMEN.includes(d));
    expect(dateien.length).toBeGreaterThan(100);
    const funde = dateien.flatMap((d) =>
      ohneKommentare(readFileSync(d, "utf8"))
        .split("\n")
        .filter((z) => TOR.test(z))
        .map((z) => `${d}: ${z.trim().slice(0, 140)}`),
    );
    expect(funde).toEqual([]);
  });

  // llms.txt lesen KI-Assistenten (ChatGPT ist die größte Quelle der Vorlagen-Besucher). Sie nannte das
  // Tor am 27.11. noch in zwei Überschriften und neun Zeilen.
  it("llms.txt und index.html nennen das Tor ebenfalls nicht", () => {
    for (const d of ["public/llms.txt", "index.html"]) {
      const funde = readFileSync(d, "utf8")
        .split("\n")
        .filter((z) => TOR.test(z))
        .map((z) => `${d}: ${z.trim().slice(0, 140)}`);
      expect(funde).toEqual([]);
    }
  });
});

describe("Mitglieder-Wand auf /auth", () => {
  const zeig = (state?: unknown) =>
    render(
      <MemoryRouter initialEntries={[{ pathname: "/auth", state }]}>
        <Auth />
      </MemoryRouter>,
    );

  it("AppLayout nennt /auth die Seite, außer nach einem Logout", () => {
    const q = readFileSync("src/layouts/AppLayout.tsx", "utf8");
    expect(q).toMatch(/navigate\("\/auth", \{ replace: true, state: warAngemeldet\.current \? undefined : \{ wand: pathname \} \}\)/);
  });

  it("zeigt den Hinweis mit Anmelden, Preisen und Gratis-Tools, wenn die Umleitung von einer Mitglieder-Seite kam", () => {
    zeig({ wand: "/cockpit/gewerbe-check" });
    const hinweis = screen.getByTestId("auth-wand");
    expect(hinweis.textContent).toMatch(/Mitgliederbereich/);
    const ziele = Array.from(hinweis.querySelectorAll("[data-cta]")).map((e) => e.getAttribute("data-cta"));
    expect(ziele).toEqual(["auth-wand:anmelden", "auth-wand:preise", "auth-wand:gratis-tools"]);
    expect(hinweis.querySelector('a[href="/preise"]')).not.toBeNull();
    expect(hinweis.querySelector('a[href="/gratis-tools"]')).not.toBeNull();
    // Kein Versprechen, dass das kostenlose Konto die Seite öffnet.
    expect(hinweis.textContent).not.toMatch(/kostenlos(es)? Konto|freischalten/i);
  });

  it("zeigt ohne Umleitung und bei fremdem State keinen Hinweis", () => {
    const { unmount } = zeig();
    expect(screen.queryByTestId("auth-wand")).toBeNull();
    unmount();
    zeig({ wand: "https://example.org" });
    expect(screen.queryByTestId("auth-wand")).toBeNull();
  });
});

describe("Kauf-Optionen ohne unbelegte Beliebtheit", () => {
  it("Anmeldung, Preise, Kasse und Landing-Bausteine nennen nichts „meistgewählt“ oder „Bestseller“", () => {
    const dateien = [
      "src/pages/Auth.tsx",
      "src/pages/Preise.tsx",
      "src/pages/Checkout.tsx",
      "src/components/PaywallGate.tsx",
      ...quelltexte("src/components/landing/**/*.tsx"),
      ...quelltexte("src/pages/funnel/**/*.tsx"),
    ];
    for (const d of dateien) {
      expect(ohneKommentare(readFileSync(d, "utf8")), d).not.toMatch(
        /meistgewählt|meistgekauft|meist gekauft|bestseller|am häufigsten gewählt|beliebtest/i,
      );
    }
  });
});
