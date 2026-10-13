import { describe, expect, it } from "vitest";
import {
  berlinSlotIso,
  easterSunday,
  isGermanNationalHoliday,
  nextBerlinWorkdays,
} from "@/lib/berlinTime";

describe("Berliner Termin-Slots", () => {
  it("10:00 Berlin im Winter ist 09:00 UTC, im Sommer 08:00 UTC", () => {
    expect(berlinSlotIso({ y: 2026, m: 1, d: 15 }, 10)).toBe("2026-01-15T09:00:00.000Z");
    expect(berlinSlotIso({ y: 2026, m: 7, d: 15 }, 10)).toBe("2026-07-15T08:00:00.000Z");
  });

  it("stimmt an den Tagen der Zeitumstellung", () => {
    // 29.03.2026: Sommerzeit ab 02:00
    expect(berlinSlotIso({ y: 2026, m: 3, d: 29 }, 10)).toBe("2026-03-29T08:00:00.000Z");
    // 25.10.2026: Winterzeit ab 03:00
    expect(berlinSlotIso({ y: 2026, m: 10, d: 25 }, 10)).toBe("2026-10-25T09:00:00.000Z");
  });

  it("kennt Ostern und bundesweite Feiertage", () => {
    expect(easterSunday(2026)).toEqual({ y: 2026, m: 4, d: 5 });
    expect(isGermanNationalHoliday({ y: 2026, m: 4, d: 3 })).toBe(true); // Karfreitag
    expect(isGermanNationalHoliday({ y: 2026, m: 10, d: 3 })).toBe(true);
    expect(isGermanNationalHoliday({ y: 2026, m: 10, d: 13 })).toBe(false);
  });

  it("liefert Werktage nach Berliner Datum, auch wenn es anderswo schon morgen ist", () => {
    // 23:30 UTC am Freitag 16.10.2026 = 01:30 Samstag in Berlin
    const tage = nextBerlinWorkdays(2, Date.UTC(2026, 9, 16, 23, 30));
    expect(tage[0]).toEqual({ y: 2026, m: 10, d: 19 });
    expect(tage[1]).toEqual({ y: 2026, m: 10, d: 20 });
  });
});
