import { beforeEach, describe, expect, it } from "vitest";
import { clearUserDataOnLogout } from "@/lib/logoutCleanup";

describe("Logout raeumt Tool-Daten ab", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("entfernt sensible Tool-Daten, behaelt Geraete-Einstellungen", () => {
    localStorage.setItem("ggh-rechnung-company-v2", JSON.stringify({ iban: "DE00", steuernummer: "1" }));
    localStorage.setItem("gx-pitchdeck-v1", "{}");
    localStorage.setItem("stb-handoff-state-v1", "{}");
    localStorage.setItem("gx-profile-u1", "{}");
    localStorage.setItem("marketing_consent", "false");
    localStorage.setItem("marketing_consent_decided", "true");
    localStorage.setItem("gruenderx:tool-unlocked:rechtsform", "2026-10-01");
    sessionStorage.setItem("gx-access-snap-u1", "{}");

    const entfernt = clearUserDataOnLogout();

    expect(localStorage.getItem("ggh-rechnung-company-v2")).toBeNull();
    expect(localStorage.getItem("gx-pitchdeck-v1")).toBeNull();
    expect(localStorage.getItem("stb-handoff-state-v1")).toBeNull();
    expect(localStorage.getItem("gx-profile-u1")).toBeNull();
    expect(sessionStorage.getItem("gx-access-snap-u1")).toBeNull();
    expect(localStorage.getItem("marketing_consent")).toBe("false");
    expect(localStorage.getItem("marketing_consent_decided")).toBe("true");
    expect(localStorage.getItem("gruenderx:tool-unlocked:rechtsform")).not.toBeNull();
    expect(entfernt).toContain("ggh-rechnung-company-v2");
  });
});
