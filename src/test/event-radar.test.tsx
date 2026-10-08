import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventRadar from "@/pages/EventRadar";
import { STANDARD_EINSTELLUNGEN, istNeu, ladeRadar, passt } from "@/lib/eventRadar";
import type { GruenderEvent } from "@/data/gruenderEvents";

const ev = (o: Partial<GruenderEvent>): GruenderEvent => ({
  slug: "x", name: "KI Hackathon", veranstalter: "Test", art: "hackathon", format: "vor-ort", ort: "München", region: "BY",
  datum: "2026-10-20", url: "https://x", kurz: "", ...o,
});

describe("Event-Radar-Logik", () => {
  it("Region, Online und Stichworte", () => {
    const s = { ...STANDARD_EINSTELLUNGEN, region: "BY" };
    expect(passt(ev({}), s)).toBe(true);
    expect(passt(ev({ region: "BE", ort: "Berlin" }), s)).toBe(false);
    expect(passt(ev({ region: "online", format: "online" }), s)).toBe(true);
    expect(passt(ev({ region: "online", format: "online" }), { ...s, online: false })).toBe(false);
    expect(passt(ev({}), { ...s, stichworte: "e-commerce, ki" })).toBe(true);
    expect(passt(ev({}), { ...s, stichworte: "e-commerce" })).toBe(false);
    expect(passt(ev({}), { ...s, arten: ["netzwerk"] })).toBe(false);
  });
  it("neu = nach dem letzten Besuch entdeckt; ohne Besuch: letzte 7 Tage", () => {
    expect(istNeu(ev({ entdeckt: "2026-10-08" }), "2026-10-05", "2026-10-08")).toBe(true);
    expect(istNeu(ev({ entdeckt: "2026-10-04" }), "2026-10-05", "2026-10-08")).toBe(false);
    expect(istNeu(ev({ entdeckt: "2026-10-03" }), null, "2026-10-08")).toBe(true);
    expect(istNeu(ev({ entdeckt: "2026-09-20" }), null, "2026-10-08")).toBe(false);
    expect(istNeu(ev({}), null, "2026-10-08")).toBe(false);
  });
});

describe("Event-Radar-Seite", () => {
  beforeEach(() => localStorage.clear());
  it("Einrichten speichert Region und Merkliste im Browser", () => {
    render(<MemoryRouter><EventRadar /></MemoryRouter>);
    expect(screen.getByText("Radar speichern")).toBeInTheDocument();
    fireEvent.change(screen.getAllByRole("combobox")[0], { target: { value: "HH" } });
    fireEvent.click(screen.getByText("Radar speichern"));
    expect(ladeRadar().einstellungen?.region).toBe("HH");
    const sterne = screen.queryAllByLabelText("Merken");
    if (sterne.length) {
      fireEvent.click(sterne[0]);
      expect(ladeRadar().gemerkt.length).toBe(1);
    }
  });
});
