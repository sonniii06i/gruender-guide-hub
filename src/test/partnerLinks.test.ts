import { describe, expect, it } from "vitest";
import { hatPartnerlink, linksAusMarkdown, partnerUrl, partnerZiel, PARTNER_REL } from "@/config/partnerLinks";
import { PROVIDERS } from "@/data/anbieter";
import { BIZ_CARDS } from "@/data/businessCreditCards";
import { STARTUP_PERKS } from "@/data/startupPerks";

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

describe("partnerZiel (zentral über den Hostnamen, 15.11.2026)", () => {
  it("stellt Links auf Partner-Domains um, auch mit www und Unterseite", () => {
    const lex = partnerZiel("https://lexoffice.de", "anbieter");
    expect(lex.partner).toBe(true);
    expect(lex.href).toContain("awinmid=13787");
    expect(lex.href).toContain("clickref=gx-anbieter");
    // Lexware leitet immer auf die Standard-Zielseite, sevDesk auf die verlinkte Unterseite
    expect(decodeURIComponent(lex.href.split("ued=")[1])).toBe("https://www.lexware.de/preise/");
    const sev = partnerZiel("https://www.sevdesk.de/buchhaltungssoftware/", "ratgeber");
    expect(sev.partner).toBe(true);
    expect(decodeURIComponent(sev.href.split("ued=")[1])).toBe("https://www.sevdesk.de/buchhaltungssoftware/");
  });
  it("lässt Anbieter ohne Programm, interne und kaputte Adressen unverändert", () => {
    expect(partnerZiel("https://candis.io", "x")).toEqual({ href: "https://candis.io", partner: false });
    expect(partnerZiel("/preise", "x")).toEqual({ href: "/preise", partner: false });
    expect(partnerZiel("kein link", "x").partner).toBe(false);
    expect(partnerZiel(undefined, "x")).toEqual({ href: "", partner: false });
    // Fremde Domain, die nur so ähnlich heißt, ist kein Partner
    expect(partnerZiel("https://notsevdesk.de/x", "x").partner).toBe(false);
    expect(partnerZiel("https://sevdesk.de.example.com/x", "x").partner).toBe(false);
  });
  it("erkennt fertige Empfehlungslinks aus den Daten und kennzeichnet sie, ohne sie zu ändern", () => {
    const shopify = PROVIDERS.find((p) => p.slug === "shopify")!;
    expect(partnerZiel(shopify.url, "anbieter")).toEqual({ href: shopify.url, partner: true });
    const amex = BIZ_CARDS.find((c) => c.id === "amex-business-gold")!;
    expect(partnerZiel(amex.url, "geschaeftskarten")).toEqual({ href: amex.url, partner: true });
  });
  it("lässt Quellenangaben im Fließtext stehen, wenn das Ziel sonst verloren ginge", () => {
    const quelle = "https://www.lexware.de/wissen/gruendung/steuernummer-beantragen/";
    // Lexware reicht keine Deeplinks durch → eine bestimmte Unterseite bleibt überall unverändert
    expect(partnerZiel(quelle, "anbieter")).toEqual({ href: quelle, partner: false });
    // Regression 15.11.2026: Startup-Guthaben „Lexware Gründeredition“ darf nicht auf die Preisseite führen
    const perk = STARTUP_PERKS.find((x) => x.slug === "lexware-gruenderedition")!;
    expect(partnerZiel(perk.url, "startup-guthaben")).toEqual({ href: perk.url, partner: false });
    // sevDesk reicht Deeplinks durch → auf Vergleichsseiten bleibt das Ziel, die Kennzeichnung kommt dazu
    const tief = partnerZiel("https://sevdesk.de/funktionen/rechnungsprogramm/", "anbieter-direkt");
    expect(tief.partner).toBe(true);
    expect(decodeURIComponent(tief.href.split("ued=")[1])).toBe("https://sevdesk.de/funktionen/rechnungsprogramm/");
    expect(partnerZiel(quelle, "ratgeber", undefined, { zielErhalten: true })).toEqual({ href: quelle, partner: false });
    // Start- und Preisseite sind Anbieter-Verweise, keine Quellen
    expect(partnerZiel("https://www.lexware.de/preise/", "ratgeber", undefined, { zielErhalten: true }).partner).toBe(true);
    // Auch bei sevDesk (Deeplink möglich) bleibt ein Fachartikel eine Quelle
    expect(partnerZiel("https://sevdesk.de/ratgeber/x/y/", "ratgeber", undefined, { zielErhalten: true }).partner).toBe(false);
    expect(partnerZiel("https://sevdesk.de/preise/", "ratgeber", undefined, { zielErhalten: true }).partner).toBe(true);
    expect(hatPartnerlink([quelle], { zielErhalten: true })).toBe(false);
  });
  it("Qonto (PartnerStack): fester Empfehlungslink für Start- und Preisseite, sonst unverändert", () => {
    const link = "https://partnerships.qonto.com/z685bcx8hsrj";
    expect(partnerZiel("https://qonto.com/de", "bankvergleich")).toEqual({ href: link, partner: true });
    expect(partnerZiel("https://qonto.com/de/pricing", "geschaeftskarten")).toEqual({ href: link, partner: true });
    expect(partnerUrl("qonto", "anbieter")).toBe(link);
    // Ratgeber-Fließtext: Verweis auf die Startseite wird Partnerlink, ein Fachartikel bleibt Quelle
    expect(partnerZiel("https://qonto.com/de", "ratgeber", undefined, { zielErhalten: true }).partner).toBe(true);
    const artikel = "https://qonto.com/de/blog/unternehmensgruendung/geschaeftskonto";
    expect(partnerZiel(artikel, "anbieter")).toEqual({ href: artikel, partner: false });
  });
  it("meldet, ob eine Liste Partnerlinks enthält (Hinweiszeile)", () => {
    expect(hatPartnerlink(["https://candis.io", "https://sevdesk.de"])).toBe(true);
    expect(hatPartnerlink(["https://candis.io", null, undefined])).toBe(false);
  });
  it("liest externe Linkziele aus Markdown", () => {
    expect(linksAusMarkdown("a [x](https://sevdesk.de/preise/) b [y](/ratgeber/z) c [z](https://qonto.com/de).")).toEqual([
      "https://sevdesk.de/preise/",
      "https://qonto.com/de",
    ]);
  });
  it("jeder Anbieter mit Partnerprogramm hat eine gültige Ziel-URL", () => {
    for (const p of PROVIDERS) {
      const z = partnerZiel(p.url, "anbieter", p.slug);
      expect(z.href, p.slug).toMatch(/^https:\/\//);
    }
  });
});
