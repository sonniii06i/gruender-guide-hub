import { describe, expect, it } from "vitest";
import { partnerUrl, PARTNER_REL } from "@/config/partnerLinks";

describe("partnerLinks (Awin, 27.10.2026)", () => {
  it("baut Awin-Deeplinks nur für angenommene Programme", () => {
    const u = partnerUrl("lexoffice", "bh-guide")!;
    expect(u).toContain("awinmid=13787");
    expect(u).toContain("awinaffid=1271427");
    expect(u).toContain("clickref=gx-bh-guide");
    expect(decodeURIComponent(u.split("ued=")[1])).toBe("https://www.lexware.de/preise/");
    expect(partnerUrl("sevdesk", "x")).toContain("awinmid=15944");
    expect(partnerUrl("candis", "x")).toBeNull();
  });
  it("kennzeichnet Partnerlinks als sponsored nofollow", () => {
    expect(PARTNER_REL).toContain("sponsored");
    expect(PARTNER_REL).toContain("nofollow");
  });
});
