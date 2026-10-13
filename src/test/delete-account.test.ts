import { describe, expect, it } from "vitest";
import { interpretDeleteAccountResult } from "@/lib/deleteAccount";

// Nachbau von FunctionsHttpError: Körper steckt in error.context (Response).
const httpError = (status: number, body: unknown) => ({
  name: "FunctionsHttpError",
  message: "Edge Function returned a non-2xx status code",
  context: new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }),
});

describe("interpretDeleteAccountResult", () => {
  it("erkennt die erfolgreiche Löschung", async () => {
    const r = await interpretDeleteAccountResult({ data: { ok: true, cleared: [], failed: [], kept: [] }, error: null });
    expect(r).toEqual({ kind: "deleted" });
  });

  it("zeigt bei laufendem Abo (409) die Meldung des Servers", async () => {
    const msg = "Du hast noch ein laufendes Abo. Bitte kündige es zuerst im Kundenportal.";
    const r = await interpretDeleteAccountResult({
      data: null,
      error: httpError(409, { error: "active_subscription", message: msg }),
    });
    expect(r).toEqual({ kind: "active_subscription", message: msg });
  });

  it("Teil-Löschung (500) gilt nicht als gelöscht", async () => {
    const r = await interpretDeleteAccountResult({
      data: null,
      error: httpError(500, { error: "partial_delete", message: "Nicht alle Daten konnten gelöscht werden." }),
    });
    expect(r.kind).toBe("error");
    expect((r as { message: string }).message).toContain("Nicht alle Daten");
  });

  it("fehlgeschlagene Abo-Prüfung (503) gilt nicht als gelöscht", async () => {
    const r = await interpretDeleteAccountResult({
      data: null,
      error: httpError(503, { error: "subscription_check_failed", message: "Die Abo-Prüfung ist gerade nicht möglich." }),
    });
    expect(r.kind).toBe("error");
  });

  it("Fehler ohne lesbaren Körper: Ersatzmeldung, nicht gelöscht", async () => {
    const r = await interpretDeleteAccountResult({ data: null, error: new Error("network") });
    expect(r.kind).toBe("error");
    expect((r as { message: string }).message).toMatch(/Löschen fehlgeschlagen/);
  });

  it("2xx ohne ok:true gilt nicht als gelöscht", async () => {
    const r = await interpretDeleteAccountResult({ data: { error: "x" }, error: null });
    expect(r.kind).toBe("error");
  });
});
