/**
 * Vorlagen: Landung aus der Bestätigungsmail (Funnel-Prüfung 20.11.2026).
 *
 * 14.–20.11.: 21 Bestätigungen, 17 Downloads. Beide Klicks auf „Erst mal kostenloses Konto“
 * kamen vor jedem Download (einer hat die Vorlage nie geladen), und auf dem Handy lagen die
 * Download-Knöpfe unter Cookie- und Aktions-Banner. Deshalb: nach der Bestätigung zuerst der
 * Download (Hinweis direkt über den Knöpfen, Knöpfe ins Bild), der Kasten „Nächster Schritt“
 * erst nach dem ersten Download.
 */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: null }) }));
vi.mock("@/hooks/useAccess", () => ({ useAccess: () => ({ hasActiveSub: false, isAdmin: false }) }));
vi.mock("@/components/landing/Navbar", () => ({ Navbar: () => null }));
vi.mock("@/components/landing/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/vorlagen/VorlagenGateDialog", () => ({
  VorlagenGateDialog: ({ open }: { open: boolean }) => (open ? <div data-testid="tor-dialog" /> : null),
}));
vi.mock("@/components/StartAngebotButton", () => ({
  StartAngebotButton: ({ cta }: { cta: string }) => <button data-cta={cta}>7 Tage für 1 € testen</button>,
}));
vi.mock("@/lib/vorlagen/export", () => ({
  vorlageAlsPdf: vi.fn(),
  vorlageAlsText: vi.fn(),
  vorlageAlsWord: vi.fn(() => Promise.resolve()),
  vorlageKopieren: vi.fn(() => Promise.resolve(true)),
}));
vi.mock("@/lib/vorlagen/freigabe", async (orig) => ({
  ...(await orig<typeof import("@/lib/vorlagen/freigabe")>()),
  trackVorlagenFreigabe: vi.fn(),
}));

import VorlageDetail from "@/pages/VorlageDetail";
import { FREIGABE_KEY } from "@/lib/vorlagen/freigabe";

const SLUG = "gesellschafterdarlehen";
const SIG = "a".repeat(64);
const scrollSpy = vi.fn();

function zeig(pfad: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[pfad]}>
        <Routes>
          <Route path="/vorlagen/:slug" element={<VorlageDetail />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

const knopfLaden = () => screen.findByRole("button", { name: /Als Text/ });
const kasten = () => screen.queryByTestId("vorlage-weiter");

describe("Vorlage nach der Bestätigung: erst Download, dann nächster Schritt", () => {
  beforeEach(() => {
    localStorage.clear();
    scrollSpy.mockReset();
    Element.prototype.scrollIntoView = scrollSpy;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });
  afterEach(() => vi.restoreAllMocks());

  it("Landung aus der Mail: Hinweis über den Knöpfen, kein Kasten vor dem Download, Kasten danach", async () => {
    // Handy: Knöpfe unten im Bild (wie live 661–757 px bei 844 px Höhe) → werden hochgeholt
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ bottom: 757, top: 661 } as DOMRect);
    zeig(`/vorlagen/${SLUG}?freigabe=1&e=probe%40example.com&s=${SIG}`);
    await screen.findByText(/Bestätigt – wähle jetzt/);
    const laden = await knopfLaden();
    expect(laden).toHaveAttribute("data-cta", "vorlage-laden:text");
    expect(localStorage.getItem(FREIGABE_KEY)).toContain("probe@example.com");

    const knoepfe = screen.getByTestId("vorlage-knoepfe");
    expect(knoepfe).toHaveTextContent("Bestätigt – wähle jetzt Word, PDF oder Text.");
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(kasten()).toBeNull();
    expect(document.querySelector('[data-cta="vorlage-weiter:konto"]')).toBeNull();

    await act(async () => {
      fireEvent.click(laden);
    });
    expect(kasten()).not.toBeNull();
    expect(kasten()).toHaveTextContent("Nächster Schritt: die Vorlage an deinen Fall anpassen");
    expect(document.querySelector('[data-cta="vorlage-weiter:konto"]')).toHaveAttribute("href", "/auth");
    expect(document.querySelector('[data-cta="vorlage-weiter:start1"]')).not.toBeNull();
    expect(knoepfe).not.toHaveTextContent("Bestätigt – wähle jetzt");
  });

  it("Knöpfe schon oben im Bild (Desktop): kein Scrollen", async () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ bottom: 300, top: 250 } as DOMRect);
    zeig(`/vorlagen/${SLUG}?freigabe=1&e=probe%40example.com&s=${SIG}`);
    await screen.findByText(/Bestätigt – wähle jetzt/);
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("Wiederkehrend freigeschaltet: Kasten erst nach dem Download, kein Bestätigt-Hinweis", async () => {
    localStorage.setItem(FREIGABE_KEY, JSON.stringify({ email: "probe@example.com", sig: SIG, at: "2026-11-20T09:00:00Z" }));
    zeig(`/vorlagen/${SLUG}`);
    await screen.findByText("Für dich freigeschaltet");
    const laden = await knopfLaden();
    expect(laden).toHaveAttribute("data-cta", "vorlage-laden:text");
    expect(screen.queryByText(/Bestätigt – wähle jetzt/)).toBeNull();
    expect(kasten()).toBeNull();
    await act(async () => {
      fireEvent.click(laden);
    });
    expect(kasten()).not.toBeNull();
  });

  it("Ohne Freigabe: Download-Knopf öffnet das E-Mail-Tor, kein Kasten", async () => {
    zeig(`/vorlagen/${SLUG}`);
    const tor = await screen.findByRole("button", { name: /Als Text/ });
    expect(tor).toHaveAttribute("data-cta", "vorlage-tor:text");
    await act(async () => {
      fireEvent.click(tor);
    });
    expect(screen.getByTestId("tor-dialog")).toBeInTheDocument();
    expect(kasten()).toBeNull();
  });
});
