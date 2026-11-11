import { describe, expect, it } from "vitest";
import vercel from "../../vercel.json";
import { TRIAL_TOOL_BY_SLUG, TRIAL_TOOLS } from "@/lib/freetools/trialTools";
import { istEinbettung } from "@/lib/einbettung";

// Top-1-Programm 11.11.2026: Verpackungslizenz-Rechner frei + einbettbar, Rest unverändert.
describe("LUCID frei und einbettbar", () => {
  it("nur der LUCID-Wizard ist frei", () => {
    expect(TRIAL_TOOL_BY_SLUG["lucid-wizard"].frei).toBe(true);
    expect(TRIAL_TOOLS.filter((t) => t.frei).map((t) => t.slug)).toEqual(["lucid-wizard"]);
  });

  it("erkennt nur Pfade unter /einbetten/", () => {
    expect(istEinbettung("/einbetten/verpackungslizenz-rechner")).toBe(true);
    expect(istEinbettung("/tools/lucid-wizard")).toBe(false);
    expect(istEinbettung("/einbettenxyz")).toBe(false);
  });

  it("Header: nur /einbetten/ ohne X-Frame-Options, Rest bleibt SAMEORIGIN", () => {
    const hs = (vercel as { headers: { source: string; headers: { key: string; value: string }[] }[] }).headers;
    const rest = hs.find((h) => h.source === "/((?!einbetten/).*)")!;
    const einb = hs.find((h) => h.source === "/einbetten/(.*)")!;
    const wert = (h: typeof rest, k: string) => h.headers.find((x) => x.key === k)?.value;
    expect(wert(rest, "X-Frame-Options")).toBe("SAMEORIGIN");
    expect(wert(rest, "Content-Security-Policy")).toBe("frame-ancestors 'self'");
    expect(wert(einb, "X-Frame-Options")).toBeUndefined();
    expect(wert(einb, "Content-Security-Policy")).toBe("frame-ancestors *");
    expect(wert(einb, "Strict-Transport-Security")).toBe(wert(rest, "Strict-Transport-Security"));
  });
});
