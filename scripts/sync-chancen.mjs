// Chancen-Monitor: Förderaufrufe, EU-Calls, Wettbewerbe, Ausschreibungen,
// Rechtsänderungen und Messen → src/data/chancenLive.json. Läuft täglich in
// der Action „Gründer-Events aktualisieren“, lokal: `node scripts/sync-chancen.mjs`.
// Quellen live geprüft am 08.10.2026 (Mac und Rechenzentrum), kein Bot-Schutz.
// Gleiche Regeln wie der Event-Monitor: Quelle tot → Einträge vom letzten Lauf
// behalten + Fehler im Protokoll; jeder Verwurf mit Grund gezählt.

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const OUT = resolve("src/data/chancenLive.json");
const UA = "Mozilla/5.0 (compatible; GruenderX-Monitor/1.0; +https://gruenderx.de)";
const HEUTE = new Date().toISOString().slice(0, 10);
const DRY = process.argv.includes("--dry");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) =>
  String(s ?? "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&shy;|­/g, "");
const text = (s) => decode(String(s ?? "").replace(/<[^>]+>/g, " ")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const deIso = (t) => [...String(t ?? "").matchAll(/(\d{1,2})\.(\d{1,2})\.(20\d\d)/g)].map(([, d, m, y]) => `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
const hash = (s) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return (h >>> 0).toString(36);
};

async function holen(url, opt = {}) {
  let letzter;
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(url, { ...opt, headers: { "User-Agent": UA, ...(opt.headers ?? {}) } });
      if (!r.ok) throw new Error(`HTTP ${r.status} ${url.slice(0, 90)}`);
      const t = await r.text();
      if (/validate\.perfdrive|captcha|x-amzn-waf/i.test(t.slice(0, 3000))) throw new Error(`Bot-Schutz ${url.slice(0, 60)}`);
      return t;
    } catch (e) {
      letzter = e;
      await sleep(1500);
    }
  }
  throw letzter;
}

const items = (xml) => xml.split(/<item[\s>]/).slice(1).map((b) => {
  const f = (tag) => decode((b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`)) ?? [])[1] ?? "").trim();
  return { title: text(f("title")), link: text(f("link")), description: f("description"), pubDate: text(f("pubDate")), raw: b };
});

// ---------- Quellen ----------

async function foerderBund(log) {
  const out = [];
  const xml = await holen("https://www.foerderinfo.bund.de/foerderinfo/de/services/rss/bekanntmachungen-alle/rssnewsfeed.xml");
  const kmu = new Set(items(await holen("https://www.foerderinfo.bund.de/foerderinfo/de/services/rss/bekanntmachungen-kmu-foerderung/rssnewsfeed.xml")).map((i) => i.link));
  for (const i of items(xml)) {
    log.roh++;
    const m = i.title.match(/\|\s*(\d{2}\.\d{2}\.\d{4})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*$/);
    const frist = m ? deIso(m[2])[0] : undefined;
    out.push({
      kategorie: "foerderung", quelle: "foerderinfo.bund.de",
      titel: i.title.replace(/\|\s*\d{2}\.\d{2}\.\d{4}.*$/, "").trim(),
      geber: "Bundesregierung (Förderberatung des Bundes)", url: i.link, frist,
      region: "bund", tags: kmu.has(i.link) ? ["KMU"] : [],
      kurz: text(i.description).slice(0, 240),
    });
  }
  return out;
}

// Nur Calls, die sich ausdrücklich an KMU, Startups oder Gründerinnen richten – „innovation“ allein trifft jeden Forschungs-Call.
const RE_EU_RELEVANT = /\bEIC\b|\bSMEs?\b|start-?ups?|scale-?ups?|women|entrepreneur|accelerator|incubat/i;
async function euCalls(log) {
  const out = [];
  const gesehen = new Set();
  for (let seite = 1; seite <= 15; seite++) {
    const form = new FormData();
    form.append("query", new Blob([JSON.stringify({ bool: { must: [{ terms: { type: ["1", "2", "8"] } }, { terms: { status: ["31094501", "31094502"] } }] } })], { type: "application/json" }));
    form.append("languages", new Blob([JSON.stringify(["en"])], { type: "application/json" }));
    const t = await holen(`https://api.tech.ec.europa.eu/search-api/prod/rest/search?apiKey=SEDIA&text=***&pageSize=100&pageNumber=${seite}`, { method: "POST", body: form });
    const d = JSON.parse(t);
    const res = d.results ?? [];
    for (const r of res) {
      log.roh++;
      const md = r.metadata ?? {};
      const id = md.identifier?.[0] ?? r.reference;
      if (gesehen.has(id)) continue;
      gesehen.add(id);
      const fristen = (md.deadlineDate ?? []).map((x) => String(x).slice(0, 10)).filter((x) => x >= HEUTE).sort();
      if (!fristen.length) {
        log.verwerfen("Frist vorbei (Status noch offen)");
        continue;
      }
      const titel = text(md.title?.[0] ?? r.summary ?? r.content ?? "");
      const call = text(md.callTitle?.[0] ?? "");
      if (/cancel/i.test(titel)) {
        log.verwerfen("abgesagt");
        continue;
      }
      if (!RE_EU_RELEVANT.test(`${titel} ${call} ${id}`)) {
        log.verwerfen("kein KMU-/Startup-Bezug");
        continue;
      }
      out.push({
        kategorie: "eu", quelle: "EU Funding & Tenders", titel: titel || id, geber: call || "Europäische Kommission",
        url: md.url?.[0] ?? `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/${encodeURIComponent(id)}`,
        frist: fristen[0], region: "EU", tags: /\bEIC\b/.test(`${titel} ${call} ${id}`) ? ["EIC"] : [], kurz: id,
      });
    }
    if (res.length < 100) break;
    await sleep(500);
  }
  return out;
}

async function wettbewerbe(log) {
  const out = [];
  const html = await holen("https://www.fuer-gruender.de/gruenderwettbewerb/datenbank/");
  for (const teil of html.split('<a class="competition').slice(1)) {
    log.roh++;
    const href = teil.match(/href="([^"]+)"/)?.[1];
    const name = text(teil.match(/headline--2">([\s\S]*?)</)?.[1] ?? teil.match(/class="name">([\s\S]*?)</)?.[1] ?? "");
    const frist = deIso(teil.match(/Ende der Bewerbungsfrist:<\/div>\s*<div class="value">\s*([\d.]+)/)?.[1])[0];
    if (!href || !name) {
      log.verwerfen("unlesbar");
      continue;
    }
    if (!frist || frist < HEUTE) {
      log.verwerfen("keine offene Frist");
      continue;
    }
    const preis = text(teil.match(/Preisgeld insgesamt:?<\/div>\s*<div class="value">([\s\S]*?)<\/div>/)?.[1] ?? "");
    const tags = [...teil.matchAll(/<div class="tag[^"]*">([\s\S]*?)<\/div>/g)].map((m) => text(m[1]));
    out.push({
      kategorie: "wettbewerb", quelle: "fuer-gruender.de", titel: name, geber: "Gründungswettbewerb", url: new URL(href, "https://www.fuer-gruender.de").href,
      frist, region: tags.at(-1) && !/bundesweit/i.test(tags.at(-1)) ? tags.at(-1) : "bund", tags: preis ? [preis] : [], kurz: preis ? `Preisgeld insgesamt ${preis}` : "",
    });
  }
  // SPRIND Challenges (Bundesagentur für Sprunginnovationen), Status „Offen für Einreichungen“.
  try {
    const d = JSON.parse(await holen("https://cms.system.sprind.org/api/challenges?pagination[pageSize]=100&populate=*"));
    for (const c of d.data ?? []) {
      log.roh++;
      const a = c.attributes ?? {};
      const status = (a.category?.data ?? []).find((x) => x.attributes?.type === "state")?.attributes?.tag_de ?? "";
      if (!/offen/i.test(status)) {
        log.verwerfen("SPRIND: nicht offen");
        continue;
      }
      const freitext = JSON.stringify(a).slice(0, 20000);
      const mon = { januar: 1, februar: 2, märz: 3, april: 4, mai: 5, juni: 6, juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12 };
      const m = freitext.match(/bis zum (\d{1,2})\.\s*(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)(?:\s+(20\d\d))?/i);
      let frist;
      if (m) {
        const jahr = m[3] ?? (mon[m[2].toLowerCase()] * 100 + +m[1] >= +HEUTE.slice(5, 7) * 100 + +HEUTE.slice(8, 10) ? HEUTE.slice(0, 4) : String(+HEUTE.slice(0, 4) + 1));
        frist = `${jahr}-${String(mon[m[2].toLowerCase()]).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
      }
      out.push({
        kategorie: "wettbewerb", quelle: "SPRIND", titel: text(a.headline_short_de || a.headline_de || a.slug_de), geber: "SPRIND – Bundesagentur für Sprunginnovationen",
        url: `https://www.sprind.org/de/challenges/${a.slug_de ?? ""}`, frist, region: "bund", tags: [a.is_funken ? "Funke" : "Challenge"], kurz: text(a.meta_description_de ?? "").slice(0, 240),
      });
    }
  } catch (e) {
    log.fehler.push(`SPRIND: ${e.message}`);
  }
  return out;
}

const AUSSCHREIBUNG_FILTER = [
  ["leistung-informationstechnik", "IT"],
  ["leistung-dienstleistungen", "Dienstleistung"],
  ["leistung-forschungundentwicklung", "F&E"],
];
async function ausschreibungen(log) {
  const out = [];
  const gesehen = new Set();
  for (const [kat, label] of AUSSCHREIBUNG_FILTER) {
    try {
      const xml = await holen(`https://www.service.bund.de/Content/DE/Ausschreibungen/Suche/Formular.html?nn=4641482&type=rss&resultsPerPage=100&sortOrder=dateOfIssue_dt+desc&jobsrss=true&cl2Categories_LeistungenErzeugnisse=${kat}`);
      for (const i of items(xml)) {
        log.roh++;
        if (gesehen.has(i.link)) continue;
        gesehen.add(i.link);
        const desc = text(i.description);
        const frist = deIso(desc.match(/Angebotsfrist:?\s*([\d.]+)/)?.[1])[0];
        if (!frist || frist < HEUTE) {
          log.verwerfen("keine offene Angebotsfrist");
          continue;
        }
        const ort = desc.match(/Erfüllungsort:?\s*(\d{5})?\s*([^,;]{2,40})/);
        const stelle = desc.match(/Vergabestelle:?\s*([^,;]{2,80})/)?.[1]?.trim();
        out.push({
          kategorie: "ausschreibung", quelle: "service.bund.de", titel: i.title, geber: stelle ?? "Öffentlicher Auftraggeber", url: i.link,
          frist, region: ort?.[1] ?? "bund", tags: [label], kurz: ort ? `Erfüllungsort: ${[ort[1], ort[2]].filter(Boolean).join(" ").trim()}` : "",
        });
      }
    } catch (e) {
      log.fehler.push(`${label}: ${e.message}`);
    }
    await sleep(500);
  }
  if (!out.length && log.fehler.length === AUSSCHREIBUNG_FILTER.length) throw new Error(log.fehler.join("; "));
  return out;
}

const RE_RECHT = /umsatzsteuer|\bust\b|kleinunternehm|e-rechnung|rechnung|einkommensteuer|körperschaft|gewerbe|gmbh|handelsgesetz|bürokratie|existenzgründ|selbstständ|selbständ|sozialversicherung|rentenversicherung|mindestlohn|abgabenordnung|steuer|minijob|geringfügig|scheinselbst|statusfeststellung|insolvenz|unternehmens|mittelstand|start-?up/i;
async function recht(log) {
  const out = [];
  const bgbl = await holen("https://www.recht.bund.de/rss/feeds/rss_bgbl-1.xml?nn=211452");
  const grenze = new Date(Date.now() - 45 * 864e5).toISOString().slice(0, 10);
  for (const i of items(bgbl)) {
    log.roh++;
    const datum = i.pubDate.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datum) || datum < grenze) {
      log.verwerfen("älter als 45 Tage");
      continue;
    }
    if (!RE_RECHT.test(i.title)) {
      log.verwerfen("kein Gründer-Bezug");
      continue;
    }
    const fundstelle = text(i.raw.match(/<[^>]*fundstelle[^>]*>([\s\S]*?)<\//)?.[1] ?? "");
    out.push({ kategorie: "recht", quelle: "Bundesgesetzblatt", titel: i.title, geber: fundstelle || "BGBl. I", url: i.link, datum, region: "bund", tags: ["Gesetz/Verordnung"], kurz: "" });
  }
  const bmf = await holen("https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Steuern/RSSSteuern.xml");
  for (const i of items(bmf)) {
    log.roh++;
    const d = new Date(i.pubDate);
    const datum = isNaN(+d) ? HEUTE : d.toISOString().slice(0, 10);
    if (datum < grenze) {
      log.verwerfen("älter als 45 Tage");
      continue;
    }
    if (!RE_RECHT.test(`${i.title} ${text(i.description)}`)) {
      log.verwerfen("kein Gründer-Bezug");
      continue;
    }
    out.push({ kategorie: "recht", quelle: "Bundesfinanzministerium", titel: i.title, geber: "BMF", url: i.link, datum, region: "bund", tags: [/schreiben/i.test(i.title) ? "BMF-Schreiben" : "Steuern"], kurz: text(i.description).slice(0, 240) });
  }
  return out;
}

const NICHT_DE = /wien|zürich|zurich|basel|bern|salzburg|graz|linz|innsbruck|luzern|genf|st\.? gallen|wels|hagenberg|dornbirn|klagenfurt|bregenz|villach|st\.? pölten|leoben|steyr|winterthur|lausanne|lugano|zug\b|schaffhausen|chur|vaduz|bozen|luxemburg|brüssel|wien|amsterdam|paris|london|mailand|barcelona|madrid|prag|warschau|kopenhagen|dubai|las vegas|new york|singapur/i;
const MESSE_LISTEN = ["/de/1052/branche/existenzgruendung", "/de/1068/branche/franchising"];
async function messen(log) {
  const out = [];
  const urls = new Set();
  for (const liste of MESSE_LISTEN) {
    for (let seite = 1; seite <= 30; seite++) {
      const html = await holen(`https://www.messen.de${liste}?page=${seite}`);
      const karten = html.split('<h3 class="min-w-0 grow').slice(1);
      if (!karten.length) break;
      let neu = 0;
      for (const k of karten) {
        const href = k.match(/href="(\/de\/\d+\/[^"]+\/info)"/)?.[1];
        const titel = text(k.match(/<a[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? "");
        const z = text(k.slice(0, 6000).replace(/<[^>]+>/g, "|"));
        const termin = deIso(z.match(/Termin:[|\s]*([^|]{8,40})/)?.[1]);
        const ort = (z.match(/Ort:[|\s]*([^|,]{2,50})/)?.[1] ?? "").trim();
        if (!href || !titel || !termin[0] || urls.has(href)) continue;
        urls.add(href);
        neu++;
        log.roh++;
        if (NICHT_DE.test(`${ort} ${href}`)) {
          log.verwerfen("nicht in Deutschland");
          continue;
        }
        // Die Rubrik „Existenzgründung“ ist überwiegend Berufs-/Bildungsmessen – nur Messen mit Gründer-/Business-Bezug.
        const beschreibung = z.split("Termin:")[0];
        if (/karriere|job|ausbildung|studium|studien|recruit|bildung|berufs|schul|azubi|\bmba\b|auf in die welt|abi\b|einstieg|praktik|master|\buni|firmenkontakt|absolvent|meeting/i.test(beschreibung)) {
          log.verwerfen("Karriere-/Bildungsmesse");
          continue;
        }
        if (!/gründ|grund|start-?up|franchis|unternehm|selbst|existenz|business|e-?commerce|händler|handel|marketing|vertrieb|digital|innovation|investor|mittelstand|nachfolge|frauen|messe für/i.test(beschreibung)) {
          log.verwerfen("kein Gründer-/Business-Bezug");
          continue;
        }
        if ((termin[1] ?? termin[0]) < HEUTE) {
          log.verwerfen("vorbei");
          continue;
        }
        out.push({ kategorie: "messe", quelle: "messen.de", titel, geber: "Messe", url: `https://www.messen.de${href}`, datum: termin[0], datumBis: termin[1], region: "bund", tags: [ort].filter(Boolean), kurz: ort ? `in ${ort}` : "" });
      }
      if (!neu) break;
      await sleep(600);
    }
  }
  return out;
}

const QUELLEN = { "foerderung-bund": foerderBund, "eu-calls": euCalls, wettbewerbe, ausschreibungen, recht, messen };

// ---------- Lauf ----------
const alt = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { eintraege: [], quellen: {} };
const protokoll = {};
let alle = [];
for (const [name, fn] of Object.entries(QUELLEN)) {
  const log = { roh: 0, fehler: [], verworfen: {}, verwerfen: (g) => (log.verworfen[g] = (log.verworfen[g] ?? 0) + 1) };
  try {
    const roh = await fn(log);
    if (!roh.length && log.roh === 0) throw new Error("0 Rohzeilen – Seitenaufbau geändert?");
    alle.push(...roh.map((e) => ({ ...e, _q: name })));
    protokoll[name] = { ok: true, roh: log.roh, uebernommen: roh.length, verworfen: log.verworfen, ...(log.fehler.length ? { teilfehler: log.fehler } : {}), letzterErfolg: new Date().toISOString() };
  } catch (e) {
    const behalten = (alt.eintraege ?? []).filter((x) => x._q === name);
    alle.push(...behalten);
    protokoll[name] = { ok: false, fehler: String(e.message ?? e), behaltenVomLetztenLauf: behalten.length, letzterErfolg: alt.quellen?.[name]?.letzterErfolg ?? null };
  }
}

const altEntdeckt = new Map((alt.eintraege ?? []).map((x) => [x.id, x.entdeckt]));
const gesehen = new Set();
const eintraege = [];
for (const e of alle) {
  const id = `${e._q}-${hash(e.url + (e.frist ?? e.datum ?? ""))}`;
  if (gesehen.has(id)) continue;
  gesehen.add(id);
  if (e.frist && e.frist < HEUTE) continue;
  eintraege.push({ id, ...e, entdeckt: altEntdeckt.get(id) ?? (alt.eintraege?.length ? HEUTE : (alt.stand ?? new Date().toISOString()).slice(0, 10)) });
}
eintraege.sort((a, b) => (a.frist ?? a.datum ?? "9999").localeCompare(b.frist ?? b.datum ?? "9999"));

const zaehl = Object.fromEntries(Object.keys(QUELLEN).map((q) => [q, eintraege.filter((e) => e._q === q).length]));
console.log(`${eintraege.length} Chancen ${JSON.stringify(zaehl)}`);
for (const [n, p] of Object.entries(protokoll))
  console.log(`  ${n}: ${p.ok ? `ok (${p.roh} roh, ${p.uebernommen} übernommen)` : `FEHLER ${p.fehler} – ${p.behaltenVomLetztenLauf} behalten`} ${p.verworfen ? JSON.stringify(p.verworfen) : ""}${p.teilfehler ? ` Teilfehler: ${p.teilfehler.join("; ")}` : ""}`);

const gleich = JSON.stringify((alt.eintraege ?? []).map(({ entdeckt, ...x }) => x)) === JSON.stringify(eintraege.map(({ entdeckt, ...x }) => x));
const okGleich = JSON.stringify(Object.values(alt.quellen ?? {}).map((p) => p.ok)) === JSON.stringify(Object.values(protokoll).map((p) => p.ok));
if (DRY) console.log("Trockenlauf – nichts geschrieben.");
else if (gleich && okGleich) console.log("Keine Änderung.");
else writeFileSync(OUT, JSON.stringify({ stand: new Date().toISOString(), quellen: protokoll, anzahl: eintraege.length, eintraege }, null, 1) + "\n");
if (Object.values(protokoll).every((p) => !p.ok)) process.exit(1);
