import { describe, expect, it } from "vitest";
import { ohneTitelzeile } from "./ratgeberMarkdown";

describe("ohneTitelzeile", () => {
  it("entfernt eine führende H1-Zeile", () => {
    expect(ohneTitelzeile("# Holding GmbH gründen 2026\n\nHast du …")).toBe("Hast du …");
    expect(ohneTitelzeile("\n# Titel\r\n\r\nText")).toBe("Text");
  });
  it("lässt H2, Fließtext und spätere H1 unverändert", () => {
    expect(ohneTitelzeile("## Worum es geht\n\nText")).toBe("## Worum es geht\n\nText");
    expect(ohneTitelzeile("Ein Geschäftskonto …\n\n# Später")).toBe("Ein Geschäftskonto …\n\n# Später");
    expect(ohneTitelzeile("#Hashtag am Anfang")).toBe("#Hashtag am Anfang");
  });
});
