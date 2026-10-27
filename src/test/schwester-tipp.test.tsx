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

  it("Shop-Guide → AnwaltX mit UTM und Founder-Set-Preis", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ aktiv: false })));
    render(<SchwesterTipp slug="dsgvo-shop" />);
    const link = screen.getByRole("link", { name: /Rechtstexte bei AnwaltX/ });
    expect(link.getAttribute("href")).toBe("https://anwaltx.de/?utm_source=gruenderx&utm_medium=schwester&utm_campaign=guide-dsgvo-shop");
    expect(screen.getByText(/Founder-Set GründerX \+ AnwaltX/)).toBeTruthy();
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("https://arbitragex.de/px/aktion/anwaltx.json", { credentials: "omit" }));
    expect(screen.queryByText(/Gerade bei/)).toBeNull();
  });

  it("zeigt die laufende Aktion der Schwester", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ aktiv: true, text: "Black Week: 50 %", code: "AXBLACK50" })));
    render(<SchwesterTipp slug="amazon-fba-launch" />);
    await waitFor(() => expect(screen.getByText(/Gerade bei ArbitrageX: Black Week: 50 %/)).toBeTruthy());
    expect(screen.getByText("AXBLACK50")).toBeTruthy();
  });
});
