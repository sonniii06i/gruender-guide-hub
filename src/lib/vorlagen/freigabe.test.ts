import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: vi.fn() } } }));
vi.mock("@/utils/adConversions", () => ({ trackAdConversion: vi.fn() }));

import { supabase } from "@/integrations/supabase/client";
import {
  FREIGABE_KEY, freigabeAusUrl, freigabeLesen, freigabeMerken, vorlageAnfordern,
} from "./freigabe";

const SIG = "a".repeat(64);

describe("Vorlagen-Freigabe im Browser", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(supabase.functions.invoke).mockReset();
  });

  it("liest nur plausible Freigabe-Parameter aus der URL", () => {
    expect(freigabeAusUrl(`?freigabe=1&e=max%40example.de&s=${SIG}`)).toMatchObject({ email: "max@example.de", sig: SIG });
    expect(freigabeAusUrl(`?freigabe=1&e=Max%40Example.de&s=${SIG}`)?.email).toBe("max@example.de");
    expect(freigabeAusUrl(`?e=max%40example.de&s=${SIG}`)).toBeNull();
    expect(freigabeAusUrl(`?freigabe=1&e=kein-mail&s=${SIG}`)).toBeNull();
    expect(freigabeAusUrl(`?freigabe=1&e=max%40example.de&s=zu-kurz`)).toBeNull();
  });

  it("merkt und liest die Freigabe, verwirft kaputte Werte", () => {
    expect(freigabeLesen()).toBeNull();
    freigabeMerken("Max@Example.de", SIG);
    expect(freigabeLesen()).toMatchObject({ email: "max@example.de", sig: SIG });
    window.localStorage.setItem(FREIGABE_KEY, "{nicht json");
    expect(freigabeLesen()).toBeNull();
    window.localStorage.setItem(FREIGABE_KEY, JSON.stringify({ email: "x", sig: SIG }));
    expect(freigabeLesen()).toBeNull();
  });

  it("vorlageAnfordern: ungültige Adresse ohne Netzaufruf, sonst Status der Function", async () => {
    expect(await vorlageAnfordern({ email: "nix", slug: "gbr-gesellschaftsvertrag" })).toEqual({ ok: false, fehler: "email" });
    expect(supabase.functions.invoke).not.toHaveBeenCalled();

    vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({ data: { ok: true, status: "gesendet" }, error: null });
    expect(await vorlageAnfordern({ email: " Max@Example.de ", slug: "gbr-gesellschaftsvertrag" })).toEqual({ ok: true, status: "gesendet" });
    expect(supabase.functions.invoke).toHaveBeenCalledWith("vorlage-anfordern", {
      body: { email: "max@example.de", slug: "gbr-gesellschaftsvertrag", website: "" },
    });

    vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
      data: null,
      error: { context: new Response(JSON.stringify({ error: "versand" }), { status: 502 }) },
    });
    expect(await vorlageAnfordern({ email: "max@example.de", slug: "x" })).toEqual({ ok: false, fehler: "versand" });

    vi.mocked(supabase.functions.invoke).mockRejectedValueOnce(new Error("offline"));
    expect(await vorlageAnfordern({ email: "max@example.de", slug: "x" })).toEqual({ ok: false, fehler: "netz" });
  });
});
