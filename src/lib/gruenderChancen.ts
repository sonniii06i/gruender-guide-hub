// Gründer-Chancen (25.10.2026): Wettbewerbe mit Preisgeld, Hackathons, Pitch-/Investoren-Events,
// Marketing-Events und Netzwerk-Treffen in EINER Liste – öffentlich auf /gruender-chancen, als
// public/gruender-chancen.json für den Chancen-Alarm (Mail) und den TO-DOs-Tracker.
// Die Einteilung entspricht dem Tracker im Discord (~/todo-tracker/tracker.py auf dem mini):
// Regex nur auf den Titel (Veranstalter wie „Start-up BW“ träfen sonst alles), jedes Event genau
// eine Art – Pitch vor Marketing vor Netzwerk.
import type { GruenderEvent, GruenderFrist } from "@/data/gruenderEvents";

export type ChancenArt = "wettbewerb" | "hackathon" | "pitch" | "marketing" | "netzwerk";

export const CHANCEN_ARTEN: Record<ChancenArt, { name: string; emoji: string; kurz: string }> = {
  wettbewerb: { name: "Wettbewerbe & Programme", emoji: "🏆", kurz: "Preisgeld, Investment, Stipendien, Accelerator" },
  hackathon: { name: "Hackathons", emoji: "💻", kurz: "Online mit Preisgeld und vor Ort" },
  pitch: { name: "Pitch & Investoren", emoji: "🎤", kurz: "Pitch Nights, Demo Days, VC- & Angel-Treffen" },
  marketing: { name: "Marketing & Vertrieb", emoji: "📣", kurz: "Konferenzen und Workshops zu Marketing, Social, E-Com" },
  netzwerk: { name: "Netzwerk & Konferenzen", emoji: "🤝", kurz: "Stammtische, Gründerabende, Startup-Konferenzen" },
};

export type Hackathon = {
  id: string; titel: string; url: string; ende: string; preisUsd: number;
  geldpreise: number | null; anmeldungen: number | null; ort: string; veranstalter: string; themen: string[];
};

export type Chance = {
  id: string;
  art: ChancenArt;
  titel: string;
  veranstalter: string;
  /** Sortierung: Frist bzw. Beginn; ohne Datum ans Ende. */
  sortierung: string;
  /** Bewerbungs-/Einreichungsfrist (Wettbewerbe, Hackathons). */
  frist?: string;
  /** Termin (Events, Finale). */
  datum?: string;
  datumBis?: string;
  /** Ohne Datum: wann die Bewerbung typischerweise läuft. */
  vormerken?: string;
  ort: string;
  /** Bundesland-Code, "bund", "EU" oder "online". */
  region: string;
  preis?: string;
  kurz?: string;
  kostenlos?: boolean;
  /** Richtet sich ausdrücklich nur an Frauen (Badge auf der Seite, im Alarm abwählbar). */
  nurFrauen: boolean;
  url: string;
};

const PITCH_BUEHNE = /pitch ?night|pitch ?day|public pitch|elevator pitch|ideenpitch|pitch it|pitch[- ]?(wettbewerb|competition|event|battle|abend|night)|rheinland pitch|demo ?day|investor(en)?[- ]?(day|meet|match|abend|lunch)|\bvc[- ](lunch|stammtisch|breakfast|dinner|club)|business[- ]angel|startup[- ]pitch|pitch-event/i;
const PITCH_SONST = /pitch|investor|\bvcs?\b|venture capital|funding|fundrais|finanzierungssprechtag|kapitalgeber|beteiligungskapital|crowdfunding/i;
// \bwerbung: „Bewerbung“ ist keine Werbung.
const MARKETING = /marketing|growth ?(hack|marketing|loop)|\bseo\b|\bsea\b|social[- ]media|content|branding|\bbrand|e-?commerce|onlinehandel|online-handel|amazon|tiktok|instagram|linkedin|youtube|creator|influencer|\bsales\b|vertrieb|kundengewinnung|akquise|sichtbar|newsletter|\bpr\b|pressearbeit|\bwerbung|\bads\b|performance|seller|\bsmx\b|\bomt\b|\bomr\b|\bk5\b|dmexco|d3con|campixx|markencamp|multichannel|retail|cmcx|adzine/i;
// „Gründer*innen“ (mit Stern) ist inklusiv, „Gründerinnen“ allein richtet sich an Frauen.
export const NUR_FRAUEN = /female|women|woman|frauen|gründerinnen|founderinnen|unternehmerinnen|@ ?few\b|\bfew\b|int:her|\bladies\b|weiblich|\bshe\b|\bher\b|mädchen|girls/i;
/** Branchen-Wettbewerbe, die für digitale Gründungen nicht in Frage kommen (wie im Tracker). */
const BRANCHE_FREMD = /\bmed\b|medizin|gesundheit|health|gastro|chemie|achema|biotech|schüler/i;

const usd = (n: number) => `${n.toLocaleString("de-DE")} $`;

/** Welche Art ein Event hat – oder null, wenn es keine Chance im Sinne dieser Liste ist (Webinare, Build-Sessions). */
export function eventArt(e: Pick<GruenderEvent, "name" | "art">): ChancenArt | null {
  if (PITCH_BUEHNE.test(e.name) || PITCH_SONST.test(e.name)) return "pitch";
  if (MARKETING.test(e.name)) return "marketing";
  if (e.art === "hackathon") return "hackathon";
  if (e.art === "netzwerk" || e.art === "konferenz" || e.art === "gruenderabend") return "netzwerk";
  return null;
}

export function sammleChancen(o: { events: GruenderEvent[]; fristen: GruenderFrist[]; hackathons: Hackathon[]; heute: string }): Chance[] {
  const out: Chance[] = [];
  for (const f of o.fristen) {
    if (BRANCHE_FREMD.test(`${f.name} ${f.kurz}`)) continue;
    if (f.frist && f.frist < o.heute) continue;
    if (!f.frist && !f.rhythmus) continue;
    out.push({
      id: `frist-${f.slug}`, art: "wettbewerb", titel: f.name, veranstalter: f.veranstalter,
      sortierung: f.frist ?? "9999", frist: f.frist, datum: f.eventDatum, vormerken: f.frist ? undefined : f.rhythmus,
      ort: f.region === "online" ? "online" : f.region === "EU" ? "Europa" : f.region === "bund" ? "bundesweit" : f.region,
      region: f.region, preis: f.preis, kurz: f.kurz, nurFrauen: NUR_FRAUEN.test(`${f.name} ${f.kurz}`), url: f.url,
    });
  }
  for (const h of o.hackathons) {
    if (h.ende < o.heute) continue;
    const je = h.anmeldungen ? ` · ${usd(Math.round(h.preisUsd / h.anmeldungen))} je Anmeldung` : "";
    out.push({
      id: h.id, art: "hackathon", titel: h.titel, veranstalter: h.veranstalter, sortierung: h.ende, frist: h.ende,
      ort: h.ort === "Online" ? "online" : h.ort, region: h.ort === "Online" ? "online" : "EU",
      preis: `${usd(h.preisUsd)} Preisgeld${h.geldpreise ? ` (${h.geldpreise} Geldpreise)` : ""}`,
      kurz: `${h.anmeldungen ? `${h.anmeldungen.toLocaleString("de-DE")} Anmeldungen${je}` : ""}${h.themen.length ? ` · ${h.themen.join(", ")}` : ""}`.replace(/^ · /, ""),
      nurFrauen: NUR_FRAUEN.test(h.titel), url: h.url,
    });
  }
  for (const e of o.events) {
    if (!e.datum || (e.datumBis ?? e.datum) < o.heute) continue;
    const art = eventArt(e);
    if (!art) continue;
    out.push({
      id: `event-${e.slug}`, art, titel: e.name, veranstalter: e.veranstalter, sortierung: e.datum, datum: e.datum,
      datumBis: e.datumBis, ort: e.ort, region: e.region, kurz: e.kurz || undefined, kostenlos: e.kostenlos,
      nurFrauen: NUR_FRAUEN.test(`${e.name} ${e.veranstalter}`), url: e.url,
    });
  }
  return out.sort((a, b) => a.sortierung.localeCompare(b.sortierung) || a.titel.localeCompare(b.titel));
}

/** Passt eine Chance zur Region? Bundesweite, EU- und Online-Chancen gelten überall. */
export function passtRegion(c: Chance, region: string): boolean {
  if (!region || region === "alle") return true;
  if (region === "online") return c.region === "online";
  return c.region === region || ["bund", "EU", "online"].includes(c.region);
}
