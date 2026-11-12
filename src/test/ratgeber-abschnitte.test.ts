import { describe, expect, it } from "vitest";
import { nachErstemAbschnitt } from "@/lib/ratgeberAbschnitte";

describe("nachErstemAbschnitt", () => {
  it("teilt vor der zweiten H2", () => {
    const md = "Einleitung\n\n## Antwort\nText\n\n## Details\nMehr\n\n## Fazit\nEnde";
    const [a, b] = nachErstemAbschnitt(md);
    expect(a).toBe("Einleitung\n\n## Antwort\nText\n\n");
    expect(b).toBe("## Details\nMehr\n\n## Fazit\nEnde");
    expect(a + b).toBe(md);
  });
  it("ohne zweite H2 bleibt alles im ersten Teil", () => {
    expect(nachErstemAbschnitt("Nur\n## Eine\nText")).toEqual(["Nur\n## Eine\nText", ""]);
    expect(nachErstemAbschnitt("")).toEqual(["", ""]);
  });
  it("zählt ## in Codeblöcken und ### nicht", () => {
    const md = "## A\n```\n## kein Titel\n```\n### Unter\n## B\nx";
    const [a, b] = nachErstemAbschnitt(md);
    expect(b).toBe("## B\nx");
    expect(a + b).toBe(md);
  });
});
