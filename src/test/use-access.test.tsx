import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// Antworten je Tabelle; ein Test setzt sie vor dem Rendern.
let antworten: Record<string, { data: unknown; error: unknown }> = {};

vi.mock("@/integrations/supabase/client", () => {
  const builder = (table: string) => {
    const b: Record<string, unknown> = {};
    for (const m of ["select", "eq", "order", "limit"]) b[m] = () => b;
    b.maybeSingle = async () => antworten[table];
    return b;
  };
  return {
    supabase: {
      from: (t: string) => builder(t),
      functions: { invoke: vi.fn(async () => ({ data: {}, error: null })) },
    },
  };
});
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: { id: "u1" }, loading: false }) }));

import { useAccess, __resetAccessStore } from "@/hooks/useAccess";

const ok = (data: unknown) => ({ data, error: null });
const kaputt = { data: null, error: { message: "network" } };

describe("useAccess", () => {
  beforeEach(() => {
    __resetAccessStore();
    sessionStorage.clear();
    localStorage.setItem("gx-check-sub-last-run-u1", String(Date.now()));
  });
  afterEach(() => vi.useRealTimers());

  it("liefert Abo und Onboarding bei Erfolg", async () => {
    antworten = {
      user_roles: ok(null),
      subscriptions: ok({ status: "active" }),
      profiles: ok({ onboarding_completed: true }),
    };
    const { result } = renderHook(() => useAccess());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.hasActiveSub).toBe(true);
    expect(result.current.onboardingCompleted).toBe(true);
    expect(result.current.known).toBe(true);
    expect(result.current.error).toBe(false);
  });

  it("ein Abfragefehler ist KEIN 'kein Abo' / 'Onboarding offen'", async () => {
    antworten = { user_roles: ok(null), subscriptions: kaputt, profiles: ok({ onboarding_completed: true }) };
    const { result } = renderHook(() => useAccess());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe(true);
    expect(result.current.known).toBe(false); // -> AppLayout leitet nicht auf /onboarding
  });

  it("behaelt bei einem Fehler den letzten bekannten Stand", async () => {
    antworten = {
      user_roles: ok(null),
      subscriptions: ok({ status: "active" }),
      profiles: ok({ onboarding_completed: true }),
    };
    const erst = renderHook(() => useAccess());
    await waitFor(() => expect(erst.result.current.known).toBe(true));
    antworten = { user_roles: kaputt, subscriptions: kaputt, profiles: kaputt };
    await erst.result.current.refresh();
    await waitFor(() => expect(erst.result.current.error).toBe(true));
    expect(erst.result.current.hasActiveSub).toBe(true);
    expect(erst.result.current.onboardingCompleted).toBe(true);
  });

  it("mehrere Aufrufer teilen sich einen Zustand (eine Abfrage-Runde)", async () => {
    antworten = {
      user_roles: ok({ role: "admin" }),
      subscriptions: ok(null),
      profiles: ok({ onboarding_completed: true }),
    };
    const a = renderHook(() => useAccess());
    const b = renderHook(() => useAccess());
    await waitFor(() => expect(a.result.current.loading).toBe(false));
    await waitFor(() => expect(b.result.current.loading).toBe(false));
    expect(a.result.current.isAdmin).toBe(true);
    expect(b.result.current.isAdmin).toBe(true);
  });
});
