import { describe, expect, it } from "vitest";
import vercel from "../../vercel.json";

// 12.11.2026: Schrägstrich am Ende -> 308 auf die kanonische URL. Sicherheitsbefund: „/(.*)/“ -> „/$1“ machte aus
// //evil.com/ die Weiterleitung //evil.com (offene Weiterleitung). Der erfasste Pfad darf nie mit / oder \ beginnen.
const regel = (vercel as { redirects: { source: string; destination: string }[] }).redirects.find((r) =>
  r.destination === "/:pfad",
);

function ziel(pfad: string): string | null {
  const m = regel!.source.match(/^\/:pfad\((.*)\)\/$/);
  const re = new RegExp("^/(" + m![1] + ")/$");
  const t = pfad.match(re);
  return t ? "/" + t[1] : null;
}

describe("Schrägstrich-Weiterleitung", () => {
  it("leitet echte Pfade auf die Form ohne Schrägstrich", () => {
    expect(regel).toBeDefined();
    expect(ziel("/ratgeber/ug-oder-gmbh/")).toBe("/ratgeber/ug-oder-gmbh");
    expect(ziel("/vorlagen/")).toBe("/vorlagen");
  });
  it("Startseite bleibt unberührt", () => {
    expect(ziel("/")).toBeNull();
  });
  it("keine offene Weiterleitung auf fremde Hosts", () => {
    expect(ziel("//evil.com/")).toBeNull();
    expect(ziel("/\\evil.com/")).toBeNull();
    expect(ziel("///evil.com/")).toBeNull();
    for (const p of ["/a//b/", "/x/"]) expect(ziel(p)!.startsWith("//")).toBe(false);
  });
});
