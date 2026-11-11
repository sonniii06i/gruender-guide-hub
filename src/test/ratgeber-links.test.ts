import { describe, expect, it } from "vitest";
import { oeffentlichesLinkziel, VORSCHAU_ERSATZ } from "@/lib/ratgeberLinks";
import { GUIDE_MERGED_INTO } from "@/data/guideMerges";
import { LANDING_TOOLS } from "@/data/features";

describe("oeffentlichesLinkziel (Links im Ratgeber-Text)", () => {
  it("zusammengelegter Guide → Ratgeber", () => {
    expect(oeffentlichesLinkziel("/playbook/preview/einzelunternehmen-gruendung")).toBe(
      "/ratgeber/einzelunternehmen-gruenden-gewerbe-freiberufler",
    );
    expect(oeffentlichesLinkziel("/playbook/preview/holding")).toBe("/ratgeber/holding-gmbh-gruenden");
    expect(oeffentlichesLinkziel("/playbook/preview/kleinunternehmer")).toBe("/ratgeber/kleinunternehmer-2026");
  });
  it("Guide mit eigener Landing → /guides/<slug>", () => {
    expect(oeffentlichesLinkziel("/playbook/preview/ug-gruendung")).toBe("/guides/ug-gruendung");
    expect(oeffentlichesLinkziel("/playbook/preview/freiberufler-anmelden")).toBe("/guides/freiberufler-anmelden");
  });
  it("Abschnitts-Slug → Themen-Ersatz, Anker/Query fallen weg", () => {
    expect(oeffentlichesLinkziel("/playbook/preview/lucid")).toBe("/ratgeber/lucid-verpackungsregister-anmelden");
    expect(oeffentlichesLinkziel("/playbook/preview/rechnung#schritt-2")).toBe("/tools/rechnungs-generator");
    expect(oeffentlichesLinkziel("/playbook/preview/us-llc?x=1")).toBe("/ratgeber/us-llc-gruenden-deutschland");
  });
  it("kein Link auf den Artikel selbst", () => {
    expect(oeffentlichesLinkziel("/playbook/preview/us-llc", "/ratgeber/us-llc-gruenden-deutschland")).toBe(
      "/playbook/preview/us-llc",
    );
  });
  it("unbekannter Slug und alle anderen Links bleiben unverändert", () => {
    expect(oeffentlichesLinkziel("/playbook/preview/gibt-es-nicht")).toBe("/playbook/preview/gibt-es-nicht");
    for (const h of ["/tools/lucid-wizard", "/ratgeber/oss-anmeldung", "https://www.bzst.de/", "/anbieter/qonto", "#quellen", "/playbooks"]) {
      expect(oeffentlichesLinkziel(h)).toBe(h);
    }
    expect(oeffentlichesLinkziel(undefined)).toBeUndefined();
  });
  it("jedes Ersatz-Ziel ist eine öffentliche Seite", () => {
    const ratgeber = new Set(Object.values(GUIDE_MERGED_INTO).map((s) => `/ratgeber/${s}`));
    ratgeber.add("/ratgeber/lucid-verpackungsregister-anmelden");
    const tools = new Set(LANDING_TOOLS.map((t) => `/tools/${t.slug}`));
    for (const [slug, ziel] of Object.entries(VORSCHAU_ERSATZ)) {
      expect(ratgeber.has(ziel) || tools.has(ziel), `${slug} → ${ziel}`).toBe(true);
    }
  });
});
