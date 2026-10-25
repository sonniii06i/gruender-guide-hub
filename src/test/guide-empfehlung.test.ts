import { describe, expect, it } from "vitest";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { PLAYBOOKS } from "@/data/playbooks";

describe("Guide-Empfehlung nach Geschäftsmodell", () => {
  it("ohne Angabe wie bisher die ersten 6", () => {
    expect(empfohleneGuides(null).map((p) => p.slug)).toEqual(PLAYBOOKS.slice(0, 6).map((p) => p.slug));
  });
  it("Creator bekommt Creator- und TikTok-Shop-Guides zuerst", () => {
    const s = empfohleneGuides("creator").map((p) => p.slug);
    expect(s.slice(0, 4)).toEqual(["creator-influencer-setup", "creator-setup", "tiktok-shop-starten", "creator-tiktok-instagram"]);
    expect(s).toHaveLength(6);
  });
  it("mehrere Modelle ohne Dubletten", () => {
    const s = empfohleneGuides("creator,amazon_fba", 20).map((p) => p.slug);
    expect(new Set(s).size).toBe(s.length);
    expect(s).toContain("amazon-fba-launch");
  });
});
