// Gründer-Events für Wochenmail und Felix.
//
// Quelle ist https://gruenderx.de/gruender-events.json – beim Build erzeugt
// aus kuratierter Liste + täglichem Monitor (scripts/export-events-json.ts).
// Hier wird nichts gepflegt, nur gelesen und gefiltert.

export type GxEvent = {
  name: string;
  veranstalter: string;
  art: string;
  format: "vor-ort" | "online" | "hybrid";
  ort: string;
  region: string;
  datum: string | null;
  datumBis: string | null;
  rhythmus: string | null;
  kostenlos: boolean | null;
  url: string;
};

export type GxFrist = {
  slug: string;
  name: string;
  veranstalter: string;
  art: string;
  region: string;
  frist?: string;
  rhythmus?: string;
  preis?: string;
  url: string;
  kurz: string;
};

export type GxDaten = { stand: string; events: GxEvent[]; fristen: GxFrist[] };

let cache: { zeit: number; daten: GxDaten } | null = null;

/** Lädt die Event-Datei, höchstens einmal pro Stunde je Isolate. Fehler → null, nie „0 Events“. */
export async function ladeEvents(basis = "https://gruenderx.de"): Promise<GxDaten | null> {
  if (cache && Date.now() - cache.zeit < 3600_000) return cache.daten;
  try {
    const r = await fetch(`${basis.replace(/\/+$/, "")}/gruender-events.json`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const daten = (await r.json()) as GxDaten;
    if (!Array.isArray(daten?.events)) throw new Error("kein events-Array");
    cache = { zeit: Date.now(), daten };
    return daten;
  } catch (e) {
    console.error("[events] gruender-events.json nicht ladbar:", (e as Error).message);
    return cache?.daten ?? null;
  }
}

export const BUNDESLAND_NAME: Record<string, string> = {
  BW: "Baden-Württemberg", BY: "Bayern", BE: "Berlin", BB: "Brandenburg", HB: "Bremen", HH: "Hamburg",
  HE: "Hessen", MV: "Mecklenburg-Vorpommern", NI: "Niedersachsen", NW: "Nordrhein-Westfalen",
  RP: "Rheinland-Pfalz", SL: "Saarland", SN: "Sachsen", ST: "Sachsen-Anhalt", SH: "Schleswig-Holstein", TH: "Thüringen",
};

// Postleitregion (erste zwei Ziffern) → überwiegendes Bundesland. An Landesgrenzen
// ungenau (z. B. 89 Ulm/Neu-Ulm), für „Events in deiner Nähe“ reicht das.
const PLZ2: Record<string, string> = {
  "01": "SN", "02": "SN", "03": "BB", "04": "SN", "06": "ST", "07": "TH", "08": "SN", "09": "SN",
  "10": "BE", "12": "BE", "13": "BE", "14": "BB", "15": "BB", "16": "BB", "17": "MV", "18": "MV", "19": "MV",
  "20": "HH", "21": "NI", "22": "HH", "23": "SH", "24": "SH", "25": "SH", "26": "NI", "27": "NI", "28": "HB", "29": "NI",
  "30": "NI", "31": "NI", "32": "NW", "33": "NW", "34": "HE", "35": "HE", "36": "HE", "37": "NI", "38": "NI", "39": "ST",
  "40": "NW", "41": "NW", "42": "NW", "44": "NW", "45": "NW", "46": "NW", "47": "NW", "48": "NW", "49": "NI",
  "50": "NW", "51": "NW", "52": "NW", "53": "NW", "54": "RP", "55": "RP", "56": "RP", "57": "NW", "58": "NW", "59": "NW",
  "60": "HE", "61": "HE", "63": "HE", "64": "HE", "65": "HE", "66": "SL", "67": "RP", "68": "BW", "69": "BW",
  "70": "BW", "71": "BW", "72": "BW", "73": "BW", "74": "BW", "75": "BW", "76": "BW", "77": "BW", "78": "BW", "79": "BW",
  "80": "BY", "81": "BY", "82": "BY", "83": "BY", "84": "BY", "85": "BY", "86": "BY", "87": "BY", "88": "BW", "89": "BY",
  "90": "BY", "91": "BY", "92": "BY", "93": "BY", "94": "BY", "95": "BY", "96": "BY", "97": "BY", "98": "TH", "99": "TH",
};

export function plzZuLand(plz?: string | null): string | null {
  const p = (plz ?? "").trim();
  return /^\d{5}$/.test(p) ? PLZ2[p.slice(0, 2)] ?? null : null;
}

const STAEDTE: Record<string, string> = {
  berlin: "BE", hamburg: "HH", münchen: "BY", munich: "BY", köln: "NW", frankfurt: "HE", stuttgart: "BW",
  düsseldorf: "NW", leipzig: "SN", dresden: "SN", hannover: "NI", nürnberg: "BY", bremen: "HB", dortmund: "NW",
  essen: "NW", karlsruhe: "BW", mannheim: "BW", münster: "NW", kiel: "SH", bonn: "NW", aachen: "NW",
  augsburg: "BY", freiburg: "BW", heidelberg: "BW", darmstadt: "HE", mainz: "RP", wiesbaden: "HE", potsdam: "BB",
  magdeburg: "ST", erfurt: "TH", rostock: "MV", saarbrücken: "SL", bielefeld: "NW", bochum: "NW", lübeck: "SH",
};

/** Ort oder Bundesland aus einer Chat-Frage („Hackathons in München?“). */
export function regionAusText(text: string): { stadt?: string; land?: string } {
  const t = text.toLowerCase();
  for (const [stadt, land] of Object.entries(STAEDTE)) if (t.includes(stadt)) return { stadt, land };
  for (const [code, name] of Object.entries(BUNDESLAND_NAME)) if (t.includes(name.toLowerCase())) return { land: code };
  return {};
}

const tagePlus = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);

/** Datierte Events der nächsten `tage` Tage, Ort/Stadt zuerst, dann Bundesland, Online optional. */
export function eventsFuer(
  daten: GxDaten,
  o: { land?: string | null; stadt?: string | null; tage?: number; online?: boolean; arten?: string[]; max?: number },
): GxEvent[] {
  const heute = new Date().toISOString().slice(0, 10);
  const bis = tagePlus(heute, o.tage ?? 14);
  const stadt = o.stadt?.toLowerCase();
  const passend = daten.events.filter((e) => {
    if (!e.datum || (e.datumBis ?? e.datum) < heute || e.datum > bis) return false;
    if (o.arten?.length && !o.arten.includes(e.art)) return false;
    if (e.format === "online") return !!o.online;
    if (stadt && e.ort.toLowerCase().includes(stadt)) return true;
    return !!o.land && e.region === o.land;
  });
  const rang = (e: GxEvent) => (stadt && e.ort.toLowerCase().includes(stadt) ? 0 : e.format === "online" ? 2 : 1);
  return passend.sort((a, b) => rang(a) - rang(b) || a.datum!.localeCompare(b.datum!)).slice(0, o.max ?? 5);
}

/** Bewerbungsfristen, die in den nächsten `tage` Tagen enden (bundesweit oder im Land). */
export function fristenFuer(daten: GxDaten, o: { land?: string | null; tage?: number; max?: number }): GxFrist[] {
  const heute = new Date().toISOString().slice(0, 10);
  const bis = tagePlus(heute, o.tage ?? 30);
  return daten.fristen
    .filter((f) => f.frist && f.frist >= heute && f.frist <= bis && (f.region === "bund" || f.region === o.land))
    .sort((a, b) => a.frist!.localeCompare(b.frist!))
    .slice(0, o.max ?? 3);
}

export const datumDe = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Berlin" });
