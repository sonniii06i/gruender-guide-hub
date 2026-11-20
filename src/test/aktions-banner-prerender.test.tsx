/**
 * Aktions-Banner und Prerender (Funnel-Prüfung 20.11.2026).
 *
 * Das Banner holt die aktive Aktion per fetch nach dem Mount. Im Build-Prerender
 * (echtes Chromium, scripts/prerender.mjs) kam der Abruf vor dem Abgriff zurück,
 * das Banner der Gründungswoche stand deshalb im statischen HTML von /preise,
 * /vorlagen/*, Ratgebern und Tools. Der Client rendert zuerst ohne Banner:
 * Hydration-Mismatch (React #418/#423) auf jeder dieser Seiten, und nach dem
 * Aktionsende bliebe ein abgelaufener Code im HTML stehen.
 */
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AktionsBanner from "@/components/AktionsBanner";

const w = window as { __PRERENDER__?: boolean };
const AKTION = {
  aktiv: true,
  id: 6,
  code: "GXGRUENDEN50",
  text: "Gründungswoche: 50 % auf deinen ersten Monat GründerX mit Code GXGRUENDEN50.",
  url: "https://gruenderx.de/preise",
};

describe("Aktions-Banner", () => {
  afterEach(() => {
    delete w.__PRERENDER__;
    vi.unstubAllGlobals();
    sessionStorage.clear();
  });

  it("zeigt die aktive Aktion für echte Besucher", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(AKTION) });
    vi.stubGlobal("fetch", f);
    render(<AktionsBanner />);
    expect(await screen.findByRole("region", { name: "Aktuelle Aktion" })).toHaveTextContent("GXGRUENDEN50");
    expect(f).toHaveBeenCalledTimes(1);
  });

  it("ruft im Prerender nichts ab und schreibt kein Banner ins HTML", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(AKTION) });
    vi.stubGlobal("fetch", f);
    w.__PRERENDER__ = true;
    const { container } = render(<AktionsBanner />);
    await waitFor(() => expect(container.innerHTML).toBe(""));
    await new Promise((r) => setTimeout(r, 20));
    expect(f).not.toHaveBeenCalled();
    expect(container.innerHTML).toBe("");
  });
});
