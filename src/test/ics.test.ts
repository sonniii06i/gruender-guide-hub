import { describe, it, expect } from "vitest";
import { baueIcs } from "@/lib/ics";

describe("iCalendar", () => {
  const ics = baueIcs(
    [{ uid: "a", titel: "Gründerabend, IHK; Leipzig", start: "2026-10-21", ende: "2026-10-22", ort: "Leipzig", beschreibung: "x".repeat(200), url: "https://example.org" }],
    "Test",
    new Date("2026-10-08T10:00:00Z"),
  );
  it("ganztägig, Ende exklusiv am Folgetag", () => {
    expect(ics).toContain("DTSTART;VALUE=DATE:20261021");
    expect(ics).toContain("DTEND;VALUE=DATE:20261023");
  });
  it("escapet Komma und Semikolon, CRLF, Zeilen ≤ 75 Oktette", () => {
    expect(ics).toContain(String.raw`SUMMARY:Gründerabend\, IHK\; Leipzig`);
    expect(ics.includes("\r\n")).toBe(true);
    for (const z of ics.split("\r\n")) expect(new TextEncoder().encode(z).length).toBeLessThanOrEqual(75);
  });
  it("Ende vor Start wird ignoriert", () => {
    const x = baueIcs([{ uid: "b", titel: "t", start: "2026-11-18", ende: "2026-11-16" }], "T");
    expect(x).toContain("DTEND;VALUE=DATE:20261119");
  });
});
