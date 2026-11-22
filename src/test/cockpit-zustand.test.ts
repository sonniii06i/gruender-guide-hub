import { describe, expect, it } from "vitest";
import { abgleichen } from "@/lib/cockpitZustand";
import { tourPanelLage } from "@/lib/tourLage";
import { behalteBeimLogout } from "@/lib/logoutCleanup";

const zeile = (haken: string[]) => ({ plan_abgehakt: haken, rundgang_gesehen_am: null });

describe("Fahrplan-Haken: Abgleich Gerät und Konto", () => {
  it("arbeitet lokal weiter, wenn die Abfrage scheitert, und lädt nichts hoch", () => {
    expect(abgleichen(["a"], undefined, { abgeglichen: true, offen: false })).toEqual({ haken: ["a"], hochladen: false });
  });

  it("führt beim ersten Abgleich eines Geräts beide Stände zusammen", () => {
    const r = abgleichen(["a", "b"], zeile(["b", "c"]), { abgeglichen: false, offen: false });
    expect([...r.haken].sort()).toEqual(["a", "b", "c"]);
    expect(r.hochladen).toBe(true);
  });

  it("lädt beim ersten Abgleich nichts hoch, wenn das Konto schon alles kennt", () => {
    expect(abgleichen(["a"], zeile(["a", "b"]), { abgeglichen: false, offen: false })).toEqual({ haken: ["a", "b"], hochladen: false });
  });

  it("legt für ein Konto ohne Zeile keine leere Zeile an", () => {
    expect(abgleichen([], null, { abgeglichen: false, offen: false })).toEqual({ haken: [], hochladen: false });
  });

  it("übernimmt danach den Stand des Kontos, auch wenn dort ein Haken entfernt wurde", () => {
    expect(abgleichen(["a", "b"], zeile(["a"]), { abgeglichen: true, offen: false })).toEqual({ haken: ["a"], hochladen: false });
  });

  it("lässt lokale Änderungen gewinnen, die noch nicht angekommen sind", () => {
    expect(abgleichen(["a", "b"], zeile(["a"]), { abgeglichen: true, offen: true })).toEqual({ haken: ["a", "b"], hochladen: true });
  });

  it("verwirft Unbrauchbares und Doppeltes", () => {
    const r = abgleichen(["a", "a", "", 5 as unknown as string], zeile([]), { abgeglichen: true, offen: true });
    expect(r.haken).toEqual(["a"]);
  });
});

describe("Logout behält den Fahrplan-Stand vollständig", () => {
  it("behält Liste und Abgleich-Marken zusammen, damit kein alter Stand wieder auflebt", () => {
    for (const k of ["gx-startplan-v1-u1", "gx-startplan-offen-v1-u1", "gx-startplan-abgleich-v1-u1", "ggh-tour-done-v1"]) {
      expect(behalteBeimLogout(k)).toBe(true);
    }
    expect(behalteBeimLogout("gx-startplan-fremd")).toBe(false);
  });
});

describe("Rundgang: Lage des Erklärfelds", () => {
  const feld = { width: 360, height: 220 };
  const desktop = { width: 1440, height: 900 };
  const handy = { width: 390, height: 844 };
  const imBild = (l: { left: number; top: number }, sicht: { width: number; height: number }) => {
    expect(l.left).toBeGreaterThanOrEqual(12);
    expect(l.top).toBeGreaterThanOrEqual(12);
    expect(l.left + Math.min(feld.width, sicht.width - 24)).toBeLessThanOrEqual(sicht.width - 12 + 0.01);
    expect(l.top + feld.height).toBeLessThanOrEqual(sicht.height - 12 + 0.01);
  };

  it("steht ohne Ziel in der Mitte", () => {
    expect(tourPanelLage(null, feld, desktop)).toEqual({ left: 540, top: 340 });
  });

  it("steht unter dem Ziel, wenn Platz ist", () => {
    const l = tourPanelLage({ left: 300, top: 100, width: 600, height: 200 }, feld, desktop);
    expect(l).toEqual({ left: 300, top: 314 });
  });

  it("weicht nach oben aus, wenn unten kein Platz ist", () => {
    const l = tourPanelLage({ left: 300, top: 600, width: 600, height: 250 }, feld, desktop);
    expect(l.top).toBe(600 - 14 - 220);
    imBild(l, desktop);
  });

  it("stellt sich neben eine hohe Stelle, statt sie zu verdecken", () => {
    const l = tourPanelLage({ left: 1054, top: 237, width: 352, height: 427 }, { width: 360, height: 265 }, desktop);
    expect(l).toEqual({ left: 1054 - 14 - 360, top: 237 });
  });

  it("steht rechts neben einer Stelle in der Seitenleiste", () => {
    const l = tourPanelLage({ left: 8, top: 300, width: 240, height: 180 }, feld, desktop, true);
    expect(l).toEqual({ left: 262, top: 300 });
  });

  it("bleibt bei einem Ziel am rechten Rand im Bild", () => {
    imBild(tourPanelLage({ left: 1330, top: 10, width: 100, height: 36 }, feld, desktop), desktop);
  });

  it("dockt auf dem Handy an den Rand gegenüber der Stelle", () => {
    const schmal = { width: 366, height: 220 };
    const oben = tourPanelLage({ left: 16, top: 80, width: 358, height: 200 }, schmal, handy, true);
    const unten = tourPanelLage({ left: 16, top: 600, width: 358, height: 200 }, schmal, handy);
    expect(oben).toEqual({ left: 12, top: 844 - 220 - 12 });
    expect(unten).toEqual({ left: 12, top: 12 });
  });
});
