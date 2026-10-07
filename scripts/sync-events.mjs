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
  return "gruenderabend";
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
        datumBis: daten[1] && daten[1] !== daten[0] ? daten[1] : undefined,
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

const LUMA_KALENDER = [
  { id: "cal-TOpA5LAFfuDeFpu", name: "Claude Community" },
  { id: "cal-BoFzAAmfdAK1Fw6", name: "Cursor Community" },
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
  return out.map(({ _land, ...e }) => e);
}

const MEETUP_GRUPPEN = [
  { slug: "claude-meetup-frankfurt", ort: "Frankfurt am Main", region: "HE" },
  { slug: "agentic-coding-meetup-hamburg", ort: "Hamburg", region: "HH" },
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
  lindau: "BY", fulda: "HE", "neu-isenburg": "HE", neubiberg: "BY", pforzheim: "BW", bremerhaven: "HB", esslingen: "BW",
  bayreuth: "BY", hof: "BY", coburg: "BY", erkelenz: "NW", "halle (saale)": "ST", rosenheim: "BY", passau: "BY",
  landshut: "BY", reutlingen: "BW", ludwigsburg: "BW", gütersloh: "NW", krefeld: "NW", mönchengladbach: "NW",
  gelsenkirchen: "NW", hamm: "NW", leverkusen: "NW", solingen: "NW", offenbach: "HE", "offenbach am main": "HE",
  hildesheim: "NI", wolfsburg: "NI", salzgitter: "NI", wilhelmshaven: "NI", zwickau: "SN", plauen: "SN", gera: "TH",
  dessau: "ST", "dessau-roßlau": "ST", wismar: "MV", stralsund: "MV", neubrandenburg: "MV", "frankfurt (oder)": "BB",
  erfurt: "TH", jena: "TH", magdeburg: "ST", halle: "ST", rostock: "MV", göttingen: "NI", braunschweig: "NI", paderborn: "NW",
};
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

const QUELLEN = { gruendungswoche: quelleGruendungswoche, luma: quelleLuma, meetup: quelleMeetup, hackathonhub: quelleHackathonhub };

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
for (const e of serien.values()) {
  const k = `${norm(e.name).slice(0, 60)}|${e.datum}`;
  if (gesehen.has(k)) {
    zaehl("Dublette über Quellen");
    continue;
  }
  gesehen.add(k);
  const { prio, _laufend, ...rest } = e;
  const slug = `${e.quelle}-${hash(e.url + e.datum)}`;
  events.push(_laufend ? { slug, ...rest, datum: undefined, datumBis: undefined } : { slug, ...rest });
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
