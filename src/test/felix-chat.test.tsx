/**
 * Tests für FelixChat: personalisierter Empty-State + einmaliger Disclaimer.
 * (Der Streaming-/DB-Flow wird nicht gemockt — nur der Render der Startseite.)
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// WICHTIG: stabile Referenz zurückgeben — sonst ändert sich `user` bei jedem Render,
// die [user]-Effekte feuern endlos und setMessages([]) loopt → OOM.
vi.mock("@/hooks/useAuth", () => {
  const auth = { user: { id: "u1" }, session: null };
  return { useAuth: () => auth };
});

// Chainable Supabase-Stub: alle Terminals lösen mit { data: null } auf
vi.mock("@/integrations/supabase/client", () => {
  const p = Promise.resolve({ data: null, error: null });
  const chain: any = {
    select: () => chain,
    eq: () => chain,
    order: () => p,
    maybeSingle: () => p,
    insert: () => p,
    update: () => chain,
  };
  return { supabase: { from: () => chain } };
});

import FelixChat from "@/pages/FelixChat";

const renderChat = () =>
  render(
    <MemoryRouter>
      <FelixChat />
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
});

describe("FelixChat — Empty-State", () => {
  it("begrüßt mit Vornamen aus dem Profil-Cache", () => {
    localStorage.setItem(
      "gx-profile-u1",
      JSON.stringify({ first_name: "Sonni", onboarding_completed: true }),
    );
    renderChat();
    expect(screen.getByText("Willkommen zurück, Sonni")).toBeTruthy();
    expect(screen.getByText(/Wobei kann ich dir heute helfen/)).toBeTruthy();
  });

  it("fällt ohne Namen auf neutrale Begrüßung zurück", () => {
    renderChat();
    expect(screen.getByText("Willkommen zurück")).toBeTruthy();
  });

  it("zeigt den Disclaimer genau einmal (im Footer) mit StB-Finder-Link", () => {
    renderChat();
    expect(screen.getAllByText(/Keine Steuer-\/Rechtsberatung/).length).toBe(1);
    const link = screen.getByRole("link", { name: "StB-Finder" });
    expect(link.getAttribute("href")).toBe("/cockpit/stb-finder");
  });

  it("zeigt die Vorschlags-Buttons", () => {
    renderChat();
    expect(screen.getByText(/UG oder GmbH/)).toBeTruthy();
  });
});
