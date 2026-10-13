import { describe, expect, it } from "vitest";
import { needsSecondFactor, sessionLoginMs } from "@/lib/twoFactorGate";
import { istChunkFehler } from "@/lib/chunkReload";
import { ticketNimmtAntwortenAn } from "@/lib/tickets";

const b64url = (o: unknown) =>
  btoa(JSON.stringify(o)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const jwt = (claims: unknown) => `${b64url({ alg: "HS256" })}.${b64url(claims)}.sig`;

const LOGIN = Date.parse("2026-10-13T08:00:00Z");
const token = jwt({ sub: "u1", amr: [{ method: "password", timestamp: LOGIN / 1000 }] });

describe("Zweiter Faktor haengt an der Session, nicht am Seitenzustand", () => {
  it("liest den Anmeldezeitpunkt aus amr", () => {
    expect(sessionLoginMs(token)).toBe(LOGIN);
    expect(sessionLoginMs("kaputt")).toBeNull();
    expect(sessionLoginMs(null)).toBeNull();
  });

  it("ohne aktives 2FA: kein Riegel", () => {
    expect(needsSecondFactor({ app_metadata: {} }, token)).toBe(false);
    expect(needsSecondFactor(null, token)).toBe(false);
  });

  it("2FA aktiv, nie bestaetigt: Riegel (z. B. nach Reload oder Direktaufruf /dashboard)", () => {
    expect(needsSecondFactor({ app_metadata: { two_factor_enabled: true } }, token)).toBe(true);
  });

  it("Bestaetigung VOR dieser Anmeldung zaehlt nicht", () => {
    const u = { app_metadata: { two_factor_enabled: true, two_factor_verified_at: "2026-10-12T08:00:00Z" } };
    expect(needsSecondFactor(u, token)).toBe(true);
  });

  it("Bestaetigung NACH dieser Anmeldung oeffnet", () => {
    const u = { app_metadata: { two_factor_enabled: true, two_factor_verified_at: "2026-10-13T08:00:30Z" } };
    expect(needsSecondFactor(u, token)).toBe(false);
  });

  it("ohne amr faellt es auf last_sign_in_at zurueck; ohne beides wird gefragt", () => {
    const u = { app_metadata: { two_factor_enabled: true, two_factor_verified_at: "2026-10-13T08:00:30Z" } };
    expect(needsSecondFactor({ ...u, last_sign_in_at: "2026-10-13T08:00:00Z" }, null)).toBe(false);
    expect(needsSecondFactor({ ...u, last_sign_in_at: "2026-10-13T09:00:00Z" }, null)).toBe(true);
    expect(needsSecondFactor(u, null)).toBe(true);
  });
});

describe("Session, in der 2FA eingeschaltet wurde", () => {
  const u = { app_metadata: { two_factor_enabled: true } };

  it("Aktivierung NACH dieser Anmeldung: kein erneuter Code (verify-2fa setzt kein verified_at)", () => {
    expect(needsSecondFactor(u, token, "2026-10-13T08:20:00Z")).toBe(false);
  });

  it("Anmeldung NACH der Aktivierung muss weiter durch den zweiten Faktor", () => {
    expect(needsSecondFactor(u, token, "2026-10-12T08:00:00Z")).toBe(true);
  });

  it("ohne Aktivierungszeit oder Anmeldezeit wird gefragt", () => {
    expect(needsSecondFactor(u, token, null)).toBe(true);
    expect(needsSecondFactor(u, token, "kaputt")).toBe(true);
    expect(needsSecondFactor(u, null, "2026-10-13T08:20:00Z")).toBe(true);
  });
});

describe("Ticket-Rueckfragen nur zu laufenden Tickets", () => {
  it("offen und in Bearbeitung nehmen Antworten an, geloest/geschlossen nicht", () => {
    expect(ticketNimmtAntwortenAn("open")).toBe(true);
    expect(ticketNimmtAntwortenAn("in_progress")).toBe(true);
    expect(ticketNimmtAntwortenAn("resolved")).toBe(false);
    expect(ticketNimmtAntwortenAn("closed")).toBe(false);
    expect(ticketNimmtAntwortenAn(undefined)).toBe(false);
  });
});

describe("Chunk-Ladefehler nach Deploy", () => {
  it("erkennt typische Meldungen", () => {
    expect(istChunkFehler(new TypeError("Failed to fetch dynamically imported module: https://x/assets/a.js"))).toBe(true);
    expect(istChunkFehler(new Error("Importing a module script failed."))).toBe(true);
    expect(istChunkFehler(new Error("x is undefined"))).toBe(false);
  });
});
