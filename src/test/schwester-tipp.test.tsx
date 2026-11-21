import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SchwesterTipp, { schwesterZiel } from "@/components/SchwesterTipp";

// Schwester-Marken-Tipp 27.10.2026: nur belegte Paare, UTM je Guide, Aktion der Schwester nur wenn aktiv
describe("SchwesterTipp", () => {
  afterEach(() => vi.restoreAllMocks());

  it("zeigt nichts bei Guides ohne belegten Kaufmoment", () => {
    expect(schwesterZiel("holding")).toBeNull();
    const { container } = render(<SchwesterTipp slug="holding" />);
    expect(container.innerHTML).toBe("");
  });

  it("Shop-Guides zeigen keinen AnwaltX-Tipp mehr (AnwaltX eingestellt, Founder-Set raus 20.11.2026)", () => {
    for (const slug of ["dsgvo-shop", "shopify-launch", "brand-owner-d2c-setup", "kaufland-launch", "tiktok-shop-launch", "tiktok-shop-starten"]) {
      expect(schwesterZiel(slug)).toBeNull();
    }
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { container } = render(<SchwesterTipp slug="dsgvo-shop" />);
    expect(container.innerHTML).toBe("");
    expect(container.textContent).not.toMatch(/AnwaltX|Founder-Set/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("Amazon-Guide → ArbitrageX mit UTM", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ aktiv: false })));
    render(<SchwesterTipp slug="amazon-fba-launch" />);
    const link = screen.getByRole("link", { name: /ArbitrageX ansehen/ });
    expect(link.getAttribute("href")).toBe("https://arbitragex.de/?utm_source=gruenderx&utm_medium=schwester&utm_campaign=guide-amazon-fba-launch");
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("https://arbitragex.de/px/aktion/arbitragex.json", { credentials: "omit" }));
    expect(screen.queryByText(/Gerade bei/)).toBeNull();
  });

  it("zeigt die laufende Aktion der Schwester", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ aktiv: true, text: "Black Week: 50 %", code: "AXBLACK50" })));
    render(<SchwesterTipp slug="amazon-fba-launch" />);
    await waitFor(() => expect(screen.getByText(/Gerade bei ArbitrageX: Black Week: 50 %/)).toBeTruthy());
    expect(screen.getByText("AXBLACK50")).toBeTruthy();
  });
});
