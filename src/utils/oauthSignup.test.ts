import { describe, expect, it } from "vitest";
import { istFrischesOAuthKonto } from "./oauthSignup";

describe("istFrischesOAuthKonto", () => {
  const jetzt = Date.parse("2026-11-10T18:26:30Z");
  it("erkennt ein gerade angelegtes Google-Konto (Fall 10.11.)", () => {
    expect(istFrischesOAuthKonto({ id: "a", created_at: "2026-11-10T18:26:20Z", app_metadata: { provider: "google" } }, jetzt)).toBe(true);
  });
  it("ignoriert Passwort-Konten (die zaehlt /auth selbst)", () => {
    expect(istFrischesOAuthKonto({ id: "a", created_at: "2026-11-10T18:26:00Z", app_metadata: { provider: "email" } }, jetzt)).toBe(false);
  });
  it("ignoriert aeltere Konten beim normalen Login", () => {
    expect(istFrischesOAuthKonto({ id: "a", created_at: "2026-10-27T20:30:59Z", app_metadata: { provider: "google" } }, jetzt)).toBe(false);
  });
  it("ohne created_at oder mit Zukunftsdatum nie", () => {
    expect(istFrischesOAuthKonto({ id: "a", app_metadata: { provider: "google" } }, jetzt)).toBe(false);
    expect(istFrischesOAuthKonto({ id: "a", created_at: "2026-11-10T19:00:00Z", app_metadata: { provider: "google" } }, jetzt)).toBe(false);
  });
});
