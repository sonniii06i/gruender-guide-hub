// Gründer-Events-Monitor: holt aktuelle Termine aus offenen Quellen und schreibt
// src/data/gruenderEventsLive.json. Läuft täglich per GitHub Action
// (.github/workflows/sync-events.yml), lokal: `node scripts/sync-events.mjs`.
//
// Quellen (alle öffentlich, ohne Login, kein Bot-Schutz umgangen):
//   gruendungswoche  – ganzjähriger Veranstaltungskalender (BMWE), IHKs/HWKs/Gründungsbüros
//   luma             – Kalender (Claude/Cursor-Community) + Stadt-Discovery (Berlin, München, Hamburg, Frankfurt)
//   meetup           – iCal-Feeds ausgewählter Gruppen
//   hackathonhub     – Hackathons in Deutschland (schema.org-Events)
//
// Regeln:
//   - Fällt eine Quelle aus, bleiben ihre Einträge vom letzten Lauf stehen; der
//     Fehler steht im Protokoll (`quellen.<name>.fehler`). Ein Ausfall ist nie „0 Events“.
//   - Jeder Verwurf wird mit Grund gezählt (`quellen.<name>.verworfen`).
//   - Termin-Serien (gleicher Titel + Veranstalter + Ort) werden zu einem Eintrag
//     mit dem nächsten Termin und `weitereTermine` zusammengefasst.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const OUT = resolve("src/data/gruenderEventsLive.json");
const UA = "Mozilla/5.0 (compatible; GruenderX-Eventmonitor/1.0; +https://gruenderx.de/gruender-events)";
const HEUTE = new Date().toISOString().slice(0, 10);
const HORIZONT = new Date(Date.now() + 270 * 864e5).toISOString().slice(0, 10);
const DRY = process.argv.includes("--dry");

const BUNDESLAND = {
  "baden-württemberg": "BW", bayern: "BY", berlin: "BE", brandenburg: "BB", bremen: "HB", hamburg: "HH",
  hessen: "HE", "mecklenburg-vorpommern": "MV", niedersachsen: "NI", "nordrhein-westfalen": "NW",
  "rheinland-pfalz": "RP", saarland: "SL", sachsen: "SN", "sachsen-anhalt": "ST", "schleswig-holstein": "SH",
  thüringen: "TH",
};
const MONATE = { januar: 1, februar: 2, märz: 3, april: 4, mai: 5, juni: 6, juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) =>
  s
    .replace(/&shy;|­/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const text = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const norm = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9äöüß]+/g, " ").trim();
const hash = (s) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return (h >>> 0).toString(36);
};
const istBerlin = (iso) => new Date(iso).toLocaleString("sv-SE", { timeZone: "Europe/Berlin" }).slice(0, 10);

async function holen(url, { json = false, versuche = 2, minLaenge = 500 } = {}) {
  let letzter;
  for (let i = 0; i < versuche; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, Accept: json ? "application/json" : "*/*" } });
      if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
      const body = json ? await r.json() : await r.text();
      if (!json && body.length < minLaenge) throw new Error(`Leere Antwort (${body.length} B) ${url}`);
      return body;
    } catch (e) {
      letzter = e;
      await sleep(1500);
    }
  }
  throw letzter;
}

// ---------- Einordnung ----------

const RE_HACK = /hackathon|hack\b|hacklab|buildathon|hack day|hackday/i;
const RE_BUILD = /build day|build session|builders?\b|vibe.?coding|claude code|cursor|lovable|bolt\.new|replit|prototyp|workshop.*\b(ki|ai)\b|\b(ki|ai)\b.*workshop|in \d+ (stunden|hours)/i;
const RE_KONF = /summit|konferenz|conference|messe|festival|kongress|gründertag|gründungstag|unternehmertag|convention|barcamp|demo day/i;
const RE_NETZ = /stammtisch|meetup|netzwerk|networking|frühstück|breakfast|afterwork|after work|treff|pitch|community|mixer|tinkerers|founders? (night|dinner|drinks)/i;
const RE_WEB = /webinar|online-seminar|online seminar|livestream/i;

function art(titel, onlineFormat) {
  if (RE_HACK.test(titel)) return "hackathon";
  if (RE_BUILD.test(titel)) return "build";
  if (RE_KONF.test(titel)) return "konferenz";
  if (RE_WEB.test(titel) || (onlineFormat && !RE_NETZ.test(titel))) return onlineFormat ? "webinar" : "gruenderabend";
  if (RE_NETZ.test(titel)) return "netzwerk";
  // „Gründerabend & Sprechtag“ nur, wenn der Titel nach Gründungsberatung klingt – sonst Netzwerk/Meetup.
  return /gründ|existenz|sprechtag|sprechstunde|beratung|seminar|infotag|info-abend|infoabend|businessplan|förder|finanzierung|steuer|selbstständig|selbständig|nachfolge/i.test(titel)
    ? "gruenderabend"
    : "netzwerk";
}

// Luma-Discovery zeigt alles (Konzerte, Lauftreffs …) – nur Gründer/Tech/KI-Bezug übernehmen.
const RE_RELEVANT =
  /gründ|grund(er|ung)|founder|startup|start-up|entrepreneur|unternehmer|pitch|investor|\bvc\b|venture|accelerator|inkubator|incubator|hackathon|hack\b|buildathon|build (day|night|session|week)|builders?\b|\bai\b|\bki\b|künstliche intelligenz|llm|agent|claude|anthropic|openai|gpt|cursor|lovable|vibe.?coding|no.?code|saas|product hunt|demo day|tinkerers|tech (meetup|talk)/i;
const RE_IRRELEVANT = /party|konzert|concert|yoga|run club|running|gym|matcha|dinner club|wine|book club|reading party|dating|singles|art&house/i;

// Öffentliche bzw. gemeinnützige Gründungsberatung – bei Gründungswoche bevorzugt.
const RE_OEFFENTLICH =
  /ihk|industrie- und handelskammer|handelskammer|handwerkskammer|\bhwk\b|wirtschaftsförderung|gründungsbüro|gründerbüro|gründerzentrum|gründungszentrum|startercenter|agentur für arbeit|jobcenter|hochschule|universität|\btu\b|\bfh\b|gründungsnetzwerk|sparkasse|volksbank|raiffeisen|kfw|bürgschaftsbank|nrw\.bank|l-bank|\bibb\b|förderbank|stiftung|e\. ?v\.|technologiezentrum|innovationszentrum|starthaus|\bhei\b|jumpp|gründerinnenagentur|wirtschaftsjunioren|landkreis|\bstadt\b|kreis |bezirk|ministerium|rkw|innovation hub|startup|gründerfabrik|digital hub|zollhof|unternehmertum|baystartup|founders foundation/i;

// ---------- Quellen ----------

async function quelleGruendungswoche(log) {
  const basis =
    "https://www.gruendungswoche.de/veranstaltungen/veranstaltungskalender?q=*&fq[]=cancelled_boolS:false&fq[]=type:liveevents&fq[]=inactive_boolS:false&rows=20&start=";
  const out = [];
  for (let start = 0; start < 2000; start += 20) {
    const s = await holen(basis + start);
    const bloecke = s.split('class="gew-list-partner row"').slice(1);
    if (!bloecke.length) break;
    for (const b of bloecke) {
      log.roh++;
      const href = b.match(/href="(\/veranstaltungen\/veranstaltungskalender\/detail\/[^"]+)"/)?.[1];
      const titel = text(b.match(/<h3>[\s\S]*?<span>([\s\S]*?)<\/span>/)?.[1] ?? "");
      const veranstalter = text(b.match(/<h4>([\s\S]*?)<\/h4>/)?.[1] ?? "").replace(/^Veranstalter:\s*/, "");
      const lis = [...(b.match(/<ul>([\s\S]*?)<\/ul>/)?.[1] ?? "").matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]));
      const datumsZeile = lis.find((l) => /\d{1,2}\.\s+\p{L}+\s+20\d\d/u.test(l)) ?? "";
      const daten = [...datumsZeile.matchAll(/(\d{1,2})\.\s+(\p{L}+)\s+(20\d\d)/gu)].map(
        ([, d, m, y]) => MONATE[m.toLowerCase()] && `${y}-${String(MONATE[m.toLowerCase()]).padStart(2, "0")}-${d.padStart(2, "0")}`,
      );
      const weitere = +(lis.find((l) => /kommende Termin/.test(l))?.match(/\+\s*(\d+)\s+kommende/)?.[1] ?? 0);
      const online = lis.some((l) => /Ortsungebunden|Online/i.test(l));
      // Die Stadt steht als <strong> im ersten Listenpunkt (bei Stadtstaaten gleich dem Bundesland).
      const stadt = text(b.match(/<li>\s*<strong>([\s\S]*?)<\/strong>/)?.[1] ?? "");
      const bl = lis.map((l) => BUNDESLAND[l.toLowerCase()]).find(Boolean);
      const ort = online ? "online" : stadt || (bl ? Object.keys(BUNDESLAND).find((k) => BUNDESLAND[k] === bl) : "") || "";
      if (!href || !titel || !daten[0]) {
        log.verwerfen("unlesbar");
        continue;
      }
      const oeffentlich = RE_OEFFENTLICH.test(veranstalter);
      // Kommerzielle Online-Dauerserien (z. B. „Kurzberatung“ eines Maklers mit 50 Terminen) sind keine Events.
      if (!oeffentlich && online && weitere >= 5) {
        log.verwerfen("kommerzielle Online-Serie");
        if (process.env.DEBUG) console.error(`  [verworfen] ${veranstalter} – ${titel} (+${weitere})`);
        continue;
      }
      out.push({
        quelle: "gruendungswoche",
        name: titel,
        veranstalter,
        art: art(titel, online),
        format: online ? "online" : "vor-ort",
        ort: online ? "online" : ort,
        region: online ? "online" : bl ?? "bund",
        datum: daten[0],
        // Ein zweites Datum vor dem ersten ist z. B. ein Anmeldeschluss, kein Ende.
        datumBis: daten[1] && daten[1] > daten[0] ? daten[1] : undefined,
        weitereTermine: weitere || undefined,
        url: "https://www.gruendungswoche.de" + decode(href),
        kurz: `${oeffentlich ? "Gründungsangebot" : "Veranstaltung"} von ${veranstalter}${online ? " – online" : ort ? ` in ${ort}` : ""}.`,
        prio: oeffentlich ? 2 : 1,
      });
    }
    await sleep(700);
  }
  return out;
}

// filter: true = gemischter Kalender, nur Titel mit Gründer-/Tech-Bezug übernehmen.
const LUMA_KALENDER = [
  { id: "cal-TOpA5LAFfuDeFpu", name: "Claude Community" },
  { id: "cal-BoFzAAmfdAK1Fw6", name: "Cursor Community" },
  { id: "cal-2fhmoASDoE2l7VS", name: "The Delta" },
  { id: "cal-W7N51nFcd0IF4Up", name: "AI BEAVERS" },
  { id: "cal-aF0EndfLzVcSK80", name: "AI Safety Berlin" },
  { id: "cal-XRR8W73B5CyPxoN", name: "Female Founders Breakfast" },
  { id: "cal-7sHKxsqqNNbPA7k", name: "AI Campus Berlin" },
  { id: "cal-rqDKfplmbufo7VE", name: "AI Agents Berlin" },
  { id: "cal-G1XrHlQ6y9kGdJq", name: "KI Park" },
  { id: "cal-LVB8BmFbKqgCVCi", name: "SpaceXAI Frankfurt" },
  { id: "cal-vR3QHKpu8K6AzK0", name: "Nebius Developer Community" },
  { id: "cal-xGJyiAzYfuTLpHh", name: "Startup Stuttgart e.V." },
  { id: "cal-wLV0zHxRYR9ALqa", name: "START Berlin" },
  { id: "cal-mvNH1VHlaFtSMFx", name: "LangChain" },
  { id: "cal-c9CVdKRbXTwUE0q", name: "YFN Berlin" },
  { id: "cal-SHvMoUk6rRHhfNL", name: "Aspiring Founders Meetup" },
  { id: "cal-zumjp2xAymV5GF4", name: "Silicon Allee x Fraunhofer HHI" },
  { id: "cal-jHUW3uwDRl1I7da", name: "Build & Lead Berlin" },
  { id: "cal-rMdmYCRWtrzLUwa", name: "Superteam Germany", filter: true },
  { id: "cal-Qrq7kdmcKk8qffU", name: "Munich Climate Week", filter: true },
  { id: "cal-3aH7Cvqdyre9u3j", name: "Founders Running Club" },
];
// Luma-Umkreissuche für Städte ohne eigene Discover-Seite.
const LUMA_GEO = [
  ["Köln", 50.94, 6.96], ["Düsseldorf", 51.23, 6.78], ["Essen", 51.46, 7.01], ["Stuttgart", 48.78, 9.18],
  ["Karlsruhe", 49.01, 8.4], ["Darmstadt", 49.87, 8.65], ["Mannheim", 49.49, 8.47], ["Nürnberg", 49.45, 11.08],
  ["Leipzig", 51.34, 12.37], ["Dresden", 51.05, 13.74], ["Hannover", 52.37, 9.73], ["Aachen", 50.78, 6.08], ["Münster", 51.96, 7.63],
];
const LUMA_STAEDTE = [
  { id: "discplace-gCfX0s3E9Hgo3rG", name: "Berlin" },
  { id: "discplace-P00kEGGGHNLEYGe", name: "München" },
  { id: "discplace-xZzD6rDcDK12oi7", name: "Hamburg" },
  { id: "discplace-9fJOlBTzIKNMSda", name: "Frankfurt" },
];

function lumaEintrag(x, herkunft) {
  const ev = x.event;
  const g = ev.geo_address_info ?? {};
  const de = g.localized?.de ?? {};
  const online = ev.location_type === "online" || ev.location_type === "zoom";
  const host = x.hosts?.[0]?.name ?? x.calendar?.name ?? herkunft;
  const ticket = x.ticket_info;
  return {
    quelle: "luma",
    name: ev.name.trim(),
    veranstalter: x.calendar?.name && x.calendar.name !== "Personal" ? x.calendar.name : host,
    art: art(ev.name, online),
    format: online ? "online" : "vor-ort",
    ort: online ? "online" : de.city ?? g.city ?? "",
    region: online ? "online" : g.region_short ?? de.region_short ?? "bund",
    datum: istBerlin(ev.start_at),
    datumBis: ev.end_at && istBerlin(ev.end_at) !== istBerlin(ev.start_at) ? istBerlin(ev.end_at) : undefined,
    kostenlos: ticket ? !!ticket.is_free : undefined,
    url: `https://luma.com/${ev.url}`,
    kurz: `${online ? "Online-Event" : `Event in ${de.city ?? g.city ?? "Deutschland"}`}, gelistet auf Luma${x.calendar?.name && x.calendar.name !== "Personal" ? ` (${x.calendar.name})` : ""}.`,
    prio: 1,
    _land: g.country_code,
  };
}

async function quelleLuma(log) {
  const out = [];
  const gesehen = new Set();
  for (const k of LUMA_KALENDER) {
    let cursor = "";
    try {
    for (let seite = 0; seite < 10; seite++) {
      const d = await holen(
        `https://api.lu.ma/calendar/get-items?calendar_api_id=${k.id}&period=future&pagination_limit=50${cursor ? `&pagination_cursor=${cursor}` : ""}`,
        { json: true },
      );
      for (const x of d.entries ?? []) {
        log.roh++;
        if (gesehen.has(x.event?.api_id)) continue;
        gesehen.add(x.event?.api_id);
        if (k.filter && (RE_IRRELEVANT.test(x.event?.name ?? "") || !RE_RELEVANT.test(x.event?.name ?? ""))) {
          log.verwerfen("kein Gründer-/Tech-Bezug");
          continue;
        }
        const e = lumaEintrag(x, k.name);
        if (e._land !== "DE") {
          log.verwerfen("nicht in Deutschland");
          continue;
        }
        out.push(e);
      }
      if (!d.has_more || !d.next_cursor) break;
      cursor = encodeURIComponent(d.next_cursor);
      await sleep(500);
    }
    } catch (e) {
      log.fehler.push(`Kalender ${k.name}: ${e.message}`);
    }
  }
  for (const st of LUMA_STAEDTE) {
    let cursor = "";
    try {
    for (let seite = 0; seite < 6; seite++) {
      const d = await holen(
        `https://api.lu.ma/discover/get-paginated-events?discover_place_api_id=${st.id}&pagination_limit=50${cursor ? `&pagination_cursor=${cursor}` : ""}`,
        { json: true },
      );
      for (const x of d.entries ?? []) {
        log.roh++;
        if (gesehen.has(x.event?.api_id)) continue;
        gesehen.add(x.event?.api_id);
        const name = x.event?.name ?? "";
        if (RE_IRRELEVANT.test(name) || !RE_RELEVANT.test(name)) {
          log.verwerfen("kein Gründer-/Tech-Bezug");
          continue;
        }
        const e = lumaEintrag(x, st.name);
        if (e._land && e._land !== "DE") {
          log.verwerfen("nicht in Deutschland");
          continue;
        }
        out.push(e);
      }
      if (!d.has_more || !d.next_cursor) break;
      cursor = encodeURIComponent(d.next_cursor);
      await sleep(500);
    }
    } catch (e) {
      log.fehler.push(`Stadt ${st.name}: ${e.message}`);
    }
  }
  for (const [stadt, lat, lon] of LUMA_GEO) {
    try {
      let cursor = "";
      for (let seite = 0; seite < 3; seite++) {
        const d = await holen(
          `https://api.lu.ma/discover/get-paginated-events?latitude=${lat}&longitude=${lon}&pagination_limit=50${cursor ? `&pagination_cursor=${cursor}` : ""}`,
          { json: true },
        );
        for (const x of d.entries ?? []) {
          log.roh++;
          if (gesehen.has(x.event?.api_id)) continue;
          gesehen.add(x.event?.api_id);
          const name = x.event?.name ?? "";
          if (RE_IRRELEVANT.test(name) || !RE_RELEVANT.test(name)) {
            log.verwerfen("kein Gründer-/Tech-Bezug");
            continue;
          }
          const e = lumaEintrag(x, stadt);
          if (e._land !== "DE") {
            log.verwerfen("nicht in Deutschland");
            continue;
          }
          out.push(e);
        }
        if (!d.has_more || !d.next_cursor) break;
        cursor = encodeURIComponent(d.next_cursor);
        await sleep(500);
      }
    } catch (e) {
      log.fehler.push(`Umkreis ${stadt}: ${e.message}`);
    }
  }
  return out.map(({ _land, ...e }) => e);
}

const MEETUP_GRUPPEN = [
  { slug: "claude-meetup-frankfurt", ort: "Frankfurt am Main", region: "HE" },
  { slug: "agentic-coding-meetup-hamburg", ort: "Hamburg", region: "HH" },
  { slug: "berlinstartups", ort: "Berlin", region: "BE" },
  { slug: "ai-beavers", ort: "Hamburg", region: "HH" },
  { slug: "munchen-ai-machine-learning-and-computer-vision-meetup", ort: "München", region: "BY" },
  { slug: "startupschoolberlin", ort: "Berlin", region: "BE" },
  { slug: "berlin-startup-founder-101", ort: "Berlin", region: "BE" },
  { slug: "cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk", ort: "Karlsruhe", region: "BW" },
  { slug: "ai-nights-nurnberg", ort: "Nürnberg", region: "BY" },
  { slug: "global-ai-berlin", ort: "Berlin", region: "BE" },
  { slug: "Big-Data-and-AI-Saxony", ort: "Leipzig", region: "SN" },
  { slug: "tech-talk-stuttgart", ort: "Stuttgart", region: "BW" },
];

async function quelleMeetup(log) {
  const out = [];
  for (const g of MEETUP_GRUPPEN) {
    let ics;
    try {
      ics = await holen(`https://www.meetup.com/${g.slug}/events/ical/`, { minLaenge: 50 });
      if (!ics.includes("BEGIN:VCALENDAR")) throw new Error("kein iCal");
    } catch (e) {
      log.fehler.push(`${g.slug}: ${e.message}`);
      continue;
    }
    const unfold = ics.replace(/\r?\n[ \t]/g, "");
    const name = unfold.match(/X-WR-CALNAME:(.*)/)?.[1]?.trim() ?? g.slug;
    for (const ve of unfold.split("BEGIN:VEVENT").slice(1)) {
      log.roh++;
      const feld = (k) => ve.match(new RegExp(`^${k}[^:\\n]*:(.*)$`, "m"))?.[1]?.trim();
      const titel = (feld("SUMMARY") ?? "").replace(/\\,/g, ",").replace(/\\;/g, ";");
      const dt = feld("DTSTART")?.match(/(\d{4})(\d{2})(\d{2})/);
      const url = feld("URL");
      if (!titel || !dt || !url) {
        log.verwerfen("unlesbar");
        continue;
      }
      const online = /online|zoom|teams/i.test(feld("LOCATION") ?? "");
      out.push({
        quelle: "meetup",
        name: titel,
        veranstalter: name,
        art: art(titel, online),
        format: online ? "online" : "vor-ort",
        ort: online ? "online" : g.ort,
        region: online ? "online" : g.region,
        datum: `${dt[1]}-${dt[2]}-${dt[3]}`,
        url,
        kurz: `Treffen der Meetup-Gruppe ${name}.`,
        prio: 1,
      });
    }
    await sleep(500);
  }
  return out;
}

const STADT_REGION = {
  berlin: "BE", munich: "BY", münchen: "BY", hamburg: "HH", frankfurt: "HE", "frankfurt am main": "HE", cologne: "NW", köln: "NW",
  düsseldorf: "NW", dusseldorf: "NW", stuttgart: "BW", leipzig: "SN", dresden: "SN", hannover: "NI", hanover: "NI", bremen: "HB",
  nuremberg: "BY", nürnberg: "BY", karlsruhe: "BW", mannheim: "BW", heidelberg: "BW", darmstadt: "HE", aachen: "NW",
  dortmund: "NW", essen: "NW", bochum: "NW", münster: "NW", bielefeld: "NW", kiel: "SH", potsdam: "BB", garching: "BY",
  offenburg: "BW", freiburg: "BW", augsburg: "BY", würzburg: "BY", regensburg: "BY", mainz: "RP", saarbrücken: "SL",
  heilbronn: "BW", lübeck: "SH", luebeck: "SH", ulm: "BW", konstanz: "BW", tübingen: "BW", ingolstadt: "BY", bamberg: "BY",
  erlangen: "BY", wiesbaden: "HE", kassel: "HE", gießen: "HE", marburg: "HE", bonn: "NW", duisburg: "NW", wuppertal: "NW",
  siegen: "NW", kaiserslautern: "RP", trier: "RP", koblenz: "RP", oldenburg: "NI", osnabrück: "NI", lüneburg: "NI",
  flensburg: "SH", chemnitz: "SN", cottbus: "BB", greifswald: "MV", schwerin: "MV", weimar: "TH", ilmenau: "TH",
  friedrichshafen: "BW", kiel: "SH", rostock: "MV", erlangen: "BY", fürth: "BY", wolfsburg: "NI", "bad homburg": "HE",
  lindau: "BY", fulda: "HE", "neu-isenburg": "HE", neubiberg: "BY", pforzheim: "BW", bremerhaven: "HB", esslingen: "BW",
  bayreuth: "BY", hof: "BY", coburg: "BY", erkelenz: "NW", "halle (saale)": "ST", rosenheim: "BY", passau: "BY",
  landshut: "BY", reutlingen: "BW", ludwigsburg: "BW", gütersloh: "NW", krefeld: "NW", mönchengladbach: "NW",
  gelsenkirchen: "NW", hamm: "NW", leverkusen: "NW", solingen: "NW", offenbach: "HE", "offenbach am main": "HE",
  hildesheim: "NI", wolfsburg: "NI", salzgitter: "NI", wilhelmshaven: "NI", zwickau: "SN", plauen: "SN", gera: "TH",
  dessau: "ST", "dessau-roßlau": "ST", wismar: "MV", stralsund: "MV", neubrandenburg: "MV", "frankfurt (oder)": "BB",
  erfurt: "TH", jena: "TH", magdeburg: "ST", halle: "ST", rostock: "MV", göttingen: "NI", braunschweig: "NI", paderborn: "NW",
};
/** Stadt aus Freitext: „12345 Stadt“, „… - Stadt“ oder eine bekannte Stadt im Text. */
function stadtAusText(t) {
  const plz = t.match(/\b\d{5}\s+([A-ZÄÖÜ][\wäöüß.-]+(?:\s[A-ZÄÖÜ][\wäöüß.-]+)?)/);
  if (plz) return plz[1];
  const strich = t.match(/\s[-–]\s([A-ZÄÖÜ][\wäöüß.-]+)\s*$/);
  if (strich) return strich[1];
  const lc = t.toLowerCase();
  const bekannt = Object.keys(STADT_REGION).find((k) => new RegExp(`\\b${k}`).test(lc) || lc.includes(k.slice(0, 5) + "er "));
  return bekannt ? STADT_DE[bekannt] ?? bekannt[0].toUpperCase() + bekannt.slice(1) : t.slice(0, 40);
}

const STADT_DE = { munich: "München", cologne: "Köln", nuremberg: "Nürnberg", hanover: "Hannover", dusseldorf: "Düsseldorf" };

async function quelleHackathonhub(log) {
  const s = await holen("https://hackathonhub.eu/hackathons/germany");
  const out = [];
  const bloecke = [...s.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const events = [];
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === "object") {
      if (o["@type"] === "Event") events.push(o);
      Object.values(o).forEach(walk);
    }
  };
  walk(bloecke);
  for (const e of events) {
    log.roh++;
    const online = /Online/.test(e.eventAttendanceMode ?? "");
    const stadtRoh = e.location?.address?.addressLocality ?? e.location?.name ?? "";
    const land = e.location?.address?.addressCountry;
    if (!online && land && land !== "DE") {
      log.verwerfen("nicht in Deutschland");
      continue;
    }
    if (/cancel/i.test(e.eventStatus ?? "")) {
      log.verwerfen("abgesagt");
      continue;
    }
    const key = stadtRoh.toLowerCase();
    out.push({
      quelle: "hackathonhub",
      name: decode(e.name),
      veranstalter: decode(e.organizer?.name ?? "hackathonhub.eu"),
      art: RE_HACK.test(e.name) || !RE_BUILD.test(e.name) ? "hackathon" : "build",
      format: online ? "online" : "vor-ort",
      ort: online ? "online" : STADT_DE[key] ?? stadtRoh,
      region: online ? "online" : STADT_REGION[key] ?? "bund",
      datum: e.startDate?.slice(0, 10),
      datumBis: e.endDate && e.endDate.slice(0, 10) !== e.startDate?.slice(0, 10) ? e.endDate.slice(0, 10) : undefined,
      kostenlos: e.offers?.price === 0 ? true : e.offers?.price > 0 ? false : undefined,
      url: e.url,
      kurz: decode((e.description ?? "").replace(/\.\.\.$/, "…")).slice(0, 220),
      prio: 1,
    });
  }
  return out;
}


// ---------- weitere Quellen (getestet 08.10.2026) ----------

const DE_DATUM = /(\d{1,2})\.(\d{1,2})\.(20\d\d)/g;
const deIso = (t) => [...(t ?? "").matchAll(DE_DATUM)].map(([, d, m, y]) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);

function eintrag(o) {
  const online = !!o.online;
  const ort = online ? "online" : (o.ort ?? "").trim();
  return {
    quelle: o.quelle,
    name: decode(o.name).replace(/\s+/g, " ").trim(),
    veranstalter: decode(o.veranstalter ?? o.quelle).trim(),
    art: o.art ?? art(o.name, online),
    format: online ? "online" : "vor-ort",
    ort,
    region: online ? "online" : o.region ?? STADT_REGION[ort.toLowerCase()] ?? "bund",
    datum: o.datum,
    datumBis: o.datumBis && o.datumBis > o.datum ? o.datumBis : undefined,
    kostenlos: o.kostenlos,
    url: o.url,
    kurz: o.kurz ?? `${online ? "Online-Event" : `Event in ${ort || "Deutschland"}`} – gelistet bei ${o.quellName ?? o.quelle}.`,
    prio: o.prio ?? 1,
  };
}

/** schema.org-Events aus allen JSON-LD-Blöcken einer Seite (auch in ItemList/@graph verschachtelt). */
function jsonLdEvents(html) {
  const out = [];
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === "object") {
      if (/Event$/.test(String(o["@type"] ?? ""))) out.push(o);
      Object.values(o).forEach(walk);
    }
  };
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      walk(JSON.parse(m[1]));
    } catch {
      /* kaputter Block – überspringen */
    }
  }
  return out;
}

async function quelleGdg(log) {
  const out = [];
  for (const seite of [1, 2]) {
    const d = await holen(`https://gdg.community.dev/api/event/?status=Live&page_size=500&page=${seite}`, { json: true });
    for (const e of d.results ?? []) {
      log.roh++;
      if (e.chapter?.country !== "DE") continue; // weltweite Liste – nur DE zählt überhaupt
      if (e.is_test) {
        log.verwerfen("Testevent");
        continue;
      }
      out.push(eintrag({
        quelle: "gdg", quellName: "Google Developer Groups", name: e.title, veranstalter: e.chapter?.title ?? "Google Developer Group",
        ort: STADT_DE[(e.chapter?.city ?? "").toLowerCase()] ?? e.chapter?.city ?? "", datum: istBerlin(e.start_date), datumBis: e.end_date ? istBerlin(e.end_date) : undefined, url: e.url,
        online: /online|virtual/i.test(e.event_type_title ?? ""),
      }));
    }
    if (!d.links?.next && !d.next) break;
    await sleep(500);
  }
  return out;
}

async function quelleMunichStartup(log) {
  const out = [];
  let url = `https://cms.munich-startup.de/wp-json/tribe/events/v1/events?start_date=${HEUTE}&per_page=50`;
  for (let i = 0; i < 6 && url; i++) {
    const d = await holen(url, { json: true });
    for (const e of d.events ?? []) {
      log.roh++;
      out.push(eintrag({
        quelle: "munich-startup", quellName: "Munich Startup", name: e.title, veranstalter: e.organizer?.[0]?.organizer ?? "Munich Startup",
        ort: e.venue?.city || "München", region: "BY", online: !!e.is_virtual || !e.venue?.city && /online|virtuell|webinar/i.test(e.title),
        datum: (e.start_date ?? "").slice(0, 10), datumBis: (e.end_date ?? "").slice(0, 10), url: e.url,
        kostenlos: /kostenlos|free|0 ?€/i.test(e.cost ?? "") ? true : undefined,
      }));
    }
    url = d.next_rest_url;
    await sleep(400);
  }
  return out;
}

async function quelleStartplatz(log) {
  const html = await holen("https://www.startplatz.de/events/");
  const out = [];
  const urls = new Set();
  for (const teil of html.split('<div class="event-searchable"').slice(1)) {
    log.roh++;
    const href = teil.match(/class="event-card-stretch"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*class="event-card-stretch"/);
    const link = href?.[1] ?? href?.[2];
    const titel = text(teil.match(/<h4[^>]*event-card-title[^>]*>([\s\S]*?)<\/h4>/)?.[1] ?? "");
    const loc = teil.match(/data-loc="([^"]*)"/)?.[1] ?? "";
    const datum = deIso(teil.match(/data-search="([^"]*)"/)?.[1])[0];
    if (!link || !titel || !datum) {
      log.verwerfen("unlesbar");
      continue;
    }
    const url = new URL(decode(link), "https://www.startplatz.de").href;
    if (urls.has(url)) continue; // jede Karte steht doppelt im DOM
    urls.add(url);
    out.push(eintrag({
      quelle: "startplatz", quellName: "STARTPLATZ", name: titel, veranstalter: "STARTPLATZ",
      online: loc === "online", ort: loc === "duesseldorf" ? "Düsseldorf" : "Köln", region: "NW", datum, url,
    }));
  }
  return out;
}

const US_MONAT = (t) => {
  const m = (t ?? "").match(/(\d{1,2})\/(\d{1,2})\/(20\d\d)/g) ?? [];
  return m.map((x) => {
    const [mo, d, y] = x.split("/");
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  });
};

async function quelleStartupCityHamburg(log) {
  const html = await holen("https://startupcity.hamburg/news-events/events");
  const out = [];
  const urls = new Set();
  for (const m of html.matchAll(/<a[^>]+href="(\/news-events\/events\/[^"#?]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const inhalt = m[2];
    const daten = US_MONAT(text(inhalt.match(/<div[^>]*uppercase[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? ""));
    const titel = text(inhalt.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");
    if (!daten[0] || !titel) continue; // Teaser-Links ohne Datum
    log.roh++;
    const url = `https://startupcity.hamburg${m[1]}`;
    if (urls.has(url)) continue;
    urls.add(url);
    out.push(eintrag({ quelle: "startupcity-hamburg", quellName: "Startup City Hamburg", name: titel, veranstalter: "Startup City Hamburg", ort: "Hamburg", region: "HH", datum: daten[0], datumBis: daten[1], url }));
  }
  return out;
}

async function quelleStartupBw(log) {
  const html = await holen("https://www.startupbw.de/events-wettbewerbe/landesweiter-veranstaltungskalender");
  const out = [];
  for (const teil of html.split('class="event-title"').slice(1)) {
    log.roh++;
    const titel = text(teil.match(/^[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? "");
    const daten = deIso(teil.match(/Datum:\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/)?.[1]);
    const link = teil.match(/href="([^"]*landesweiter-veranstaltungskalender\/veranstaltung\/[^"]+)"/)?.[1];
    if (!titel || !daten[0] || !link) {
      log.verwerfen("unlesbar");
      continue;
    }
    out.push(eintrag({
      quelle: "startup-bw", quellName: "Start-up BW", name: titel, veranstalter: "Start-up BW (Landeskalender)", ort: "Baden-Württemberg", region: "BW",
      online: /online|webinar|virtuell/i.test(titel), datum: daten[0], datumBis: daten[1], url: new URL(decode(link), "https://www.startupbw.de").href,
    }));
  }
  return out;
}

async function quelleStarthubHessen(log) {
  const out = [];
  const urls = new Set();
  for (let seite = 1; seite <= 4; seite++) {
    const html = await holen(`https://www.starthub-hessen.de/de/events/?&page=${seite}`);
    const teile = html.split(/<a href="(\/de\/events\/[^"]+\/)"/);
    let neu = 0;
    for (let i = 1; i < teile.length; i += 2) {
      const url = `https://www.starthub-hessen.de${teile[i]}`;
      const block = teile[i + 1] ?? "";
      const titel = text(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? "");
      const datum = deIso(block.match(/<span[^>]*>\s*(\d{1,2}\.\d{1,2}\.20\d\d)/)?.[1])[0];
      if (!titel || !datum || urls.has(url)) continue;
      urls.add(url);
      log.roh++;
      neu++;
      out.push(eintrag({ quelle: "starthub-hessen", quellName: "StartHub Hessen", name: titel, veranstalter: "StartHub Hessen", ort: "Hessen", region: "HE", online: /online|webinar/i.test(titel), datum, url }));
    }
    if (!neu) break;
    await sleep(400);
  }
  return out;
}

async function quelleStartupverband(log) {
  const html = await holen("https://www.startupverband.de/events/");
  const out = [];
  for (const m of html.matchAll(/<a href="(\/events\/[^"]+)" title="([^"]*)" class="([^"]*)" data-monat="(\d{4}-\d{2}-\d{2})"[^>]*>([\s\S]*?)<\/a>/g)) {
    log.roh++;
    if (/past/.test(m[3])) continue;
    // Format: „18:30 Uhr, Digital Hub Logistics - Hamburg“ / „…, 18055 Rostock“ / „11:00 Uhr, Online“
    const info = text(m[5].match(/class="info_left"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "").replace(/^\d{1,2}:\d{2}\s*Uhr,?\s*/, "");
    const online = /online|livestream/i.test(info);
    const ort = online ? "online" : stadtAusText(info);
    out.push(eintrag({ quelle: "startupverband", quellName: "Startup-Verband", name: m[2], veranstalter: "Startup-Verband", online, ort, datum: m[4], url: `https://www.startupverband.de${m[1]}` }));
  }
  return out;
}

async function quelleJsonLdSeiten(log, quelle, quellName, urls, nurRelevant) {
  const out = [];
  for (const u of urls) {
    try {
      const html = await holen(u);
      for (const e of jsonLdEvents(html)) {
        log.roh++;
        const adr = e.location?.address ?? {};
        const land = adr.addressCountry?.name ?? adr.addressCountry;
        const online = /Online/.test(e.eventAttendanceMode ?? "") || e.location?.["@type"] === "VirtualLocation";
        if (!online && land && !/^(DE|Deutschland|Germany)$/i.test(String(land))) {
          log.verwerfen("nicht in Deutschland");
          continue;
        }
        if (nurRelevant && !RE_RELEVANT.test(e.name ?? "")) {
          log.verwerfen("kein Gründer-/Tech-Bezug");
          continue;
        }
        if (!e.startDate || !e.url || !e.name) {
          log.verwerfen("unlesbar");
          continue;
        }
        const stadt = adr.addressLocality || (typeof e.location?.name === "string" ? stadtAusText(e.location.name) : "");
        // Eventbrite liefert dasselbe Event unter .com/.co.uk/.ie – auf .de vereinheitlichen.
        const url = String(e.url).replace(/^https:\/\/www\.eventbrite\.[a-z.]+\/e\//, "https://www.eventbrite.de/e/").replace(/\?.*$/, "");
        out.push(eintrag({
          quelle, quellName, name: e.name, veranstalter: e.organizer?.name ?? quellName, online, ort: STADT_DE[stadt.toLowerCase()] ?? stadt,
          datum: String(e.startDate).slice(0, 10), datumBis: e.endDate ? String(e.endDate).slice(0, 10) : undefined, url,
          kostenlos: e.offers?.price === 0 || e.isAccessibleForFree === true ? true : undefined,
        }));
      }
    } catch (err) {
      log.fehler.push(`${u}: ${err.message}`);
    }
    await sleep(600);
  }
  if (!out.length && log.fehler.length === urls.length) throw new Error(log.fehler.join("; "));
  return out;
}

const quelleDevEvents = (log) =>
  quelleJsonLdSeiten(log, "dev-events", "dev.events", ["https://dev.events/EU/DE?page=1", "https://dev.events/EU/DE?page=2", "https://dev.events/EU/DE/ai"], true);
const quelleEventbrite = (log) =>
  quelleJsonLdSeiten(log, "eventbrite", "Eventbrite", [
    "https://www.eventbrite.de/d/germany/hackathon/",
    "https://www.eventbrite.de/d/germany--berlin/startup/",
    "https://www.eventbrite.de/d/germany--munich/k%C3%BCnstliche-intelligenz/",
    "https://www.eventbrite.de/d/germany--hamburg/startup/",
    "https://www.eventbrite.de/d/germany/gr%C3%BCnder/",
  ], true);
const quelleKiCommunities = (log) =>
  quelleJsonLdSeiten(log, "ki-communities", "appliedAI / AI Tinkerers", [
    "https://www.appliedai.de/en/events",
    ...["berlin", "munich", "hamburg", "cologne", "dusseldorf", "karlsruhe"].map((c) => `https://${c}.aitinkerers.org/`),
  ], false);

const QUELLEN = {
  gruendungswoche: quelleGruendungswoche,
  luma: quelleLuma,
  meetup: quelleMeetup,
  hackathonhub: quelleHackathonhub,
  gdg: quelleGdg,
  "munich-startup": quelleMunichStartup,
  startplatz: quelleStartplatz,
  "startupcity-hamburg": quelleStartupCityHamburg,
  "startup-bw": quelleStartupBw,
  "starthub-hessen": quelleStarthubHessen,
  startupverband: quelleStartupverband,
  "dev-events": quelleDevEvents,
  // eventbrite: quelleEventbrite – sperrt Rechenzentrums-IPs (GitHub und Hetzner: HTTP 405,
  // Mac: 200, getestet 08.10.2026). Nicht umgehen; nur sinnvoll über einen Lauf vom Mac mini.
  "ki-communities": quelleKiCommunities,
};

// ---------- Lauf ----------

const alt = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { events: [], quellen: {} };
const protokoll = {};
let alle = [];

for (const [name, fn] of Object.entries(QUELLEN)) {
  const log = { roh: 0, fehler: [], verworfen: {}, verwerfen: (g) => (log.verworfen[g] = (log.verworfen[g] ?? 0) + 1) };
  try {
    const roh = await fn(log);
    if (!roh.length) throw new Error(`0 Einträge bei ${log.roh} Rohzeilen – Seitenaufbau geändert?`);
    alle.push(...roh);
    // Teilausfälle (einzelne Gruppe/Stadt) bleiben ok, stehen aber im Protokoll.
    protokoll[name] = { ok: true, roh: log.roh, verworfen: log.verworfen, ...(log.fehler.length ? { teilfehler: log.fehler } : {}) };
  } catch (e) {
    // Quelle tot → Einträge vom letzten Lauf behalten, Fehler sichtbar machen.
    const behalten = (alt.events ?? []).filter((x) => x.quelle === name);
    alle.push(...behalten);
    protokoll[name] = {
      ok: false,
      fehler: String(e.message ?? e),
      behaltenVomLetztenLauf: behalten.length,
      letzterErfolg: alt.quellen?.[name]?.letzterErfolg ?? null,
    };
  }
  if (protokoll[name].ok) protokoll[name].letzterErfolg = new Date().toISOString();
}

// Bundesland aus der Stadt nachtragen, wo eine Quelle keins liefert.
for (const e of alle) {
  if (e.region !== "bund" || e.format === "online") continue;
  const k = e.ort.toLowerCase().trim();
  e.region = STADT_REGION[k] ?? STADT_REGION[k.replace(/\s*\(.*\)$/, "")] ?? STADT_REGION[k.split(/[ ,/]/)[0]] ?? "bund";
}

// Zeitfenster, Serien zusammenfassen, Dubletten über Quellen hinweg entfernen.
const gesamtVerworfen = {};
const zaehl = (g) => (gesamtVerworfen[g] = (gesamtVerworfen[g] ?? 0) + 1);
alle = alle.filter((e) => {
  if (e.datumBis && e.datumBis < e.datum) delete e.datumBis;
  const ende = e.datumBis ?? e.datum;
  if (!e.datum || ende < HEUTE) return zaehl("vorbei"), false;
  if (e.datum > HORIZONT) return zaehl("mehr als 9 Monate voraus"), false;
  return true;
});
// Dauerangebote (z. B. „20.11.2023 – 31.12.2031“, offene Sprechstunden über Monate)
// sind keine Termine: ohne Datum als laufendes Angebot führen, sonst stünden sie
// mit einem Startdatum aus der Vergangenheit ganz oben.
const tage = (a, b) => (Date.parse(b) - Date.parse(a)) / 864e5;
for (const e of alle) {
  if (e.datumBis && tage(e.datum, e.datumBis) > 14) {
    const bis = new Date(`${e.datumBis}T12:00:00Z`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
    e.rhythmus = `laufendes Angebot bis ${bis}`;
    e._laufend = true;
    zaehl("Dauerangebot (ohne Termin geführt)");
  }
}
alle.sort((a, b) => a.datum.localeCompare(b.datum) || b.prio - a.prio);

const serien = new Map();
for (const e of alle) {
  const k = `${norm(e.name)}|${norm(e.veranstalter)}|${norm(e.ort)}`;
  const s = serien.get(k);
  if (s) {
    s.weitereTermine = Math.max((s.weitereTermine ?? 0) + 1, e.weitereTermine ?? 0);
    zaehl("Serientermin zusammengefasst");
  } else serien.set(k, { ...e });
}
const gesehen = new Set();
const events = [];
const altEntdeckt = new Map((alt.events ?? []).filter((x) => x.entdeckt).map((x) => [x.slug, x.entdeckt]));
for (const e of serien.values()) {
  const k = `${norm(e.name).slice(0, 60)}|${e.datum}`;
  if (gesehen.has(k)) {
    zaehl("Dublette über Quellen");
    continue;
  }
  gesehen.add(k);
  const { prio, _laufend, ...rest } = e;
  const slug = `${e.quelle}-${hash(e.url + e.datum)}`;
  // Wann der Monitor das Event zuerst gesehen hat – Grundlage für „neu“ im Event-Radar.
  // Altbestand ohne Feld bekommt den Stand des letzten Laufs, damit nicht alles auf einmal „neu“ ist.
  const entdeckt = altEntdeckt.get(slug) ?? (altEntdeckt.size ? HEUTE : (alt.stand ?? new Date().toISOString()).slice(0, 10));
  events.push(_laufend ? { slug, ...rest, datum: undefined, datumBis: undefined, entdeckt } : { slug, ...rest, entdeckt });
}

const ergebnis = {
  stand: new Date().toISOString(),
  quellen: protokoll,
  verworfen: gesamtVerworfen,
  anzahl: events.length,
  events,
};

const zusammenfassung = Object.entries(protokoll)
  .map(([n, p]) => (p.ok ? `${n}: ok (${p.roh} roh)${p.teilfehler ? ` – Teilfehler: ${p.teilfehler.join("; ")}` : ""}` : `${n}: FEHLER ${p.fehler} – ${p.behaltenVomLetztenLauf} behalten`))
  .join("\n");
console.log(`${events.length} Events (${HEUTE} bis ${HORIZONT})\n${zusammenfassung}\nVerworfen: ${JSON.stringify(gesamtVerworfen)}`);
for (const [n, p] of Object.entries(protokoll)) if (p.verworfen) console.log(`  ${n} verworfen: ${JSON.stringify(p.verworfen)}`);

// Unveränderte Events → Datei nicht anfassen, sonst gäbe es jeden Tag einen
// Commit samt Neubau nur wegen des Zeitstempels.
const gleich = JSON.stringify(alt.events ?? []) === JSON.stringify(events);
const fehlerGeaendert = JSON.stringify(Object.values(alt.quellen ?? {}).map((p) => p.ok)) !== JSON.stringify(Object.values(protokoll).map((p) => p.ok));
if (DRY) console.log("Trockenlauf – nichts geschrieben.");
else if (gleich && !fehlerGeaendert) console.log("Keine Änderung – Datei bleibt unverändert.");
else writeFileSync(OUT, JSON.stringify(ergebnis, null, 1) + "\n");
// Exitcode ≠ 0, wenn alle Quellen ausgefallen sind – dann soll die Action rot werden.
if (Object.values(protokoll).every((p) => !p.ok)) process.exit(1);
