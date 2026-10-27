import { describe, it, expect, beforeEach } from "vitest";
import { checkoutAttribution } from "@/utils/checkoutAttribution";

// Freigabe #65 (27.10.2026): UTM + Einstiegsseite gehen an jeden Checkout.
describe("checkoutAttribution", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("nimmt UTM aus der aktuellen URL vor dem First Touch", () => {
    localStorage.setItem("gx_first_touch", JSON.stringify({ utm_source: "alt", landing_path: "/ratgeber/x" }));
    window.history.replaceState({}, "", "/preise?utm_source=anwaltx&utm_campaign=generator");
    const a = checkoutAttribution();
    expect(a.utm_source).toBe("anwaltx");
    expect(a.utm_campaign).toBe("generator");
    expect(a.landing).toBe("/ratgeber/x");
  });

  it("fällt auf den First Touch zurück und liefert sonst undefined", () => {
    expect(checkoutAttribution().utm_source).toBeUndefined();
    localStorage.setItem("gx_first_touch", JSON.stringify({ utm_source: "delta", utm_medium: "schwester" }));
    expect(checkoutAttribution()).toMatchObject({ utm_source: "delta", utm_medium: "schwester" });
  });
});
