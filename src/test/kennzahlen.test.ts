import { describe, it, expect } from "vitest";
import { PROVIDERS } from "@/data/anbieter";
import { ANBIETER_ANZAHL, ANBIETER_KATEGORIEN, TOOL_COUNT } from "@/data/kennzahlen";
import { LANDING_TOOLS } from "@/data/features";

describe("Werbe-Kennzahlen stimmen mit den Datenquellen überein", () => {
  it("Anbieter-Anzahl", () => {
    expect(ANBIETER_ANZAHL).toBe(PROVIDERS.length);
  });
  it("Anbieter-Kategorien", () => {
    expect(ANBIETER_KATEGORIEN).toBe(new Set(PROVIDERS.map((p) => p.category)).size);
  });
  it("Tool-Anzahl", () => {
    expect(TOOL_COUNT).toBe(LANDING_TOOLS.length);
  });
});
