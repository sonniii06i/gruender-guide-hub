import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { aktuelleEvents, GRUENDER_FRISTEN, type GruenderEvent } from "@/data/gruenderEvents";
import hackathons from "@/data/hackathonsLive.json";
import { NUR_FRAUEN, eventArt, passtRegion, sammleChancen, type Hackathon } from "@/lib/gruenderChancen";
import { ALARM_TEXT, ALARM_VERSION } from "@/lib/chancenAlarm";

const fn = readFileSync(resolve(__dirname, "../../supabase/functions/_shared/chancenAlarm.ts"), "utf8");

describe("Gründer-Chancen: Einteilung", () => {
  const ev = (name: string, art: GruenderEvent["art"] = "netzwerk") => ({ name, art });
  it("Pitch vor Marketing vor Netzwerk, nur am Titel", () => {
    expect(eventArt(ev("Pitch Night Hamburg – Digital Future Edition"))).toBe("pitch");
    expect(eventArt(ev("VC Lunch Cologne #17"))).toBe("pitch");
    expect(eventArt(ev("OMR Festival 2027", "konferenz"))).toBe("marketing");
    expect(eventArt(ev("Kundengewinnung mit Social Media", "webinar"))).toBe("marketing");
    expect(eventArt(ev("Founders Running Club Hamburg"))).toBe("netzwerk");
    expect(eventArt(ev("HANSEATIC HACKATHON 2026", "hackathon"))).toBe("hackathon");
    expect(eventArt(ev("Webinar Business- und Finanzplan", "webinar"))).toBeNull();
  });
  it("„Bewerbung“ ist keine Werbung", () => {
    expect(eventArt(ev("Bewerbungsstart für das Gründungsstipendium MGZstart 2027", "webinar"))).toBeNull();
  });
  it("Nur-Frauen-Erkennung: „Gründer*innen“ mit Stern bleibt inklusiv", () => {
    expect(NUR_FRAUEN.test("Female Founders Summit Köln")).toBe(true);
    expect(NUR_FRAUEN.test("Gründerinnenfrühstück @ Female Leadership Day")).toBe(true);
    expect(NUR_FRAUEN.test("Marketing-Ideen für Gründer*innen in Baden-Württemberg")).toBe(false);
  });
  it("Region: bundesweit, EU und online gelten in jedem Land", () => {
    const c = (region: string) => ({ region }) as Parameters<typeof passtRegion>[0];
    expect(passtRegion(c("bund"), "HH")).toBe(true);
    expect(passtRegion(c("online"), "BY")).toBe(true);
    expect(passtRegion(c("BY"), "HH")).toBe(false);
    expect(passtRegion(c("BY"), "online")).toBe(false);
  });
  it("Liste: keine abgelaufene Frist, eindeutige IDs, jede mit https-Link", () => {
    const heute = "2026-10-26";
    const l = sammleChancen({ events: aktuelleEvents(heute), fristen: GRUENDER_FRISTEN, hackathons: hackathons.eintraege as Hackathon[], heute });
    expect(l.length).toBeGreaterThan(50);
    expect(new Set(l.map((c) => c.id)).size).toBe(l.length);
    for (const c of l) {
      expect(c.url).toMatch(/^https?:\/\//);
      if (c.frist) expect(c.frist >= heute).toBe(true);
    }
    // Branchenfilter gilt für Wettbewerbe (Bewerbung), nicht für Events (Hingehen).
    expect(l.some((c) => c.art === "wettbewerb" && /achema|gastro/i.test(c.titel))).toBe(false);
  });
});

describe("Chancen-Alarm: Einwilligung", () => {
  it("Version und Text gleich in Browser und Function", () => {
    expect(fn).toContain(`ALARM_VERSION = "${ALARM_VERSION}"`);
    const imFn = fn.match(/ALARM_TEXT =\s*\n?\s*("[^;]+);/)?.[1].replace(/"\s*\+\s*"/g, "").replace(/^"|"$/g, "");
    expect(imFn).toBe(ALARM_TEXT);
  });
  it("Häkchen ist nicht vorausgewählt", () => {
    const seite = readFileSync(resolve(__dirname, "../pages/GruenderChancen.tsx"), "utf8");
    expect(seite).toContain("const [einwilligung, setEinwilligung] = useState(false);");
  });
});
