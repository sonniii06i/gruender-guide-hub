// Öffentlicher MCP-Server + GPT-Actions für GründerX (09.10.2026).
//
// Gratis-Lead-Magnet ohne Login: liest nur Inhalte, die auf gruenderx.de ohnehin öffentlich sind –
// Gründer-Events und Fristen-Radar (public/gruender-events.json), Startup-Guthaben
// (public/startup-guthaben.json) und veröffentlichte Ratgeber (blog_posts, anon-lesbar).
// Bewusst NICHT dabei: Cockpit-Rechner hinter der PaywallGate, Gratis-Proben gegen E-Mail
// (die bleiben eine Berechnung pro E-Mail), Chancen-Radar, Felix (kostet KI-Guthaben je Anfrage).
//
// Transport: Streamable HTTP, zustandslos, JSON-Antworten (kein SSE). GET = 405.
// Zähler: analytics_events (event_name "mcp_call", layer "traffic", props {tool, via}) ohne IP/Inhalte.

export const BASE = "https://gruenderx.de";
const SUPABASE_URL = "https://rwrjuzemkfghlziretdj.supabase.co";
// Öffentlicher anon-Schlüssel (steht ohnehin im Frontend-Bundle); RLS schützt die Daten.
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U";

const PROTOKOLLE = ["2025-06-18", "2025-03-26", "2024-11-05"];
export const SERVER_INFO = { name: "gruenderx", title: "GründerX – Events, Fristen & Startup-Guthaben", version: "1.0.0" };
export const LIMIT = 60; // Anfragen je IP und Minute (pro Edge-Instanz, best effort)
const FENSTER_MS = 60_000;

const utm = (pfad: string) =>
  `${BASE}${pfad}${pfad.includes("?") ? "&" : "?"}utm_source=mcp&utm_medium=ai-assistant&utm_campaign=mcp-gratis`;

export const ANWEISUNGEN =
  "Gratis-Werkzeuge von GründerX für Gründerinnen und Gründer in Deutschland: Gründer-Events (IHK/HWK-Gründerabende, " +
  "Meetups, Hackathons, Konferenzen, Webinare) nach Bundesland, Fristen-Radar für Wettbewerbe, Preise, Stipendien und " +
  "Accelerator, Startup-Guthaben (Cloud, KI, Software) mit Voraussetzungen sowie die GründerX-Ratgeber. " +
  "Regionen als Bundesland-Kürzel (BY, BE, NW …), 'online' oder 'bund'. Alle Angaben ohne Gewähr; Termine und Bedingungen " +
  "beim Veranstalter bzw. Anbieter prüfen. Keine Rechts- oder Steuerberatung.";

const REGIONEN: Record<string, string> = {
  bund: "Bund / bundesweit", online: "Online", BW: "Baden-Württemberg", BY: "Bayern", BE: "Berlin", BB: "Brandenburg",
  HB: "Bremen", HH: "Hamburg", HE: "Hessen", MV: "Mecklenburg-Vorpommern", NI: "Niedersachsen", NW: "Nordrhein-Westfalen",
  RP: "Rheinland-Pfalz", SL: "Saarland", SN: "Sachsen", ST: "Sachsen-Anhalt", SH: "Schleswig-Holstein", TH: "Thüringen",
};
// Der Event-Monitor liefert vereinzelt Langformen (gemessen 09.10.: NRW, NDS).
const REGION_ALIAS: Record<string, string> = { NRW: "NW", NDS: "NI" };
const normRegion = (r: string) => {
  const t = (r || "").trim();
  const gross = t.toUpperCase();
  if (REGION_ALIAS[gross]) return REGION_ALIAS[gross];
  if (gross in REGIONEN) return gross;
  const klein = t.toLowerCase();
  if (klein === "bund" || klein === "online") return klein;
  const perName = Object.entries(REGIONEN).find(([, n]) => n.toLowerCase() === klein);
  return perName ? perName[0] : t;
};

const RO = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const REGION_SCHEMA = {
  type: "string",
  description: "Bundesland-Kürzel (BW, BY, BE, BB, HB, HH, HE, MV, NI, NW, RP, SL, SN, ST, SH, TH), 'online' oder 'bund'",
};

export const TOOLS = [
  {
    name: "search_founder_events",
    title: "Gründer-Events finden",
    description:
      "Kommende Gründer-Events in Deutschland: IHK/HWK-Gründerabende, Netzwerk-Treffen, Konferenzen, Hackathons, Build-Sessions, " +
      "Webinare. Filter nach Bundesland, Art, Format, Zeitraum und Stichwort. Finds upcoming founder events in Germany.",
    inputSchema: {
      type: "object",
      properties: {
        region: REGION_SCHEMA,
        art: { type: "string", enum: ["gruenderabend", "netzwerk", "konferenz", "hackathon", "build", "webinar"], description: "Art des Events" },
        format: { type: "string", enum: ["vor-ort", "online", "hybrid"], description: "Format" },
        from_date: { type: "string", description: "Frühestes Datum (JJJJ-MM-TT), Standard heute" },
        to_date: { type: "string", description: "Spätestes Datum (JJJJ-MM-TT)" },
        query: { type: "string", description: "Stichwort in Name, Veranstalter oder Ort, z. B. 'KI' oder 'Leipzig'" },
        free_only: { type: "boolean", description: "Nur als kostenlos gekennzeichnete Events" },
        limit: { type: "integer", minimum: 1, maximum: 25, description: "Anzahl (Standard 10)" },
      },
      additionalProperties: false,
    },
    annotations: RO,
  },
  {
    name: "list_founder_deadlines",
    title: "Fristen-Radar: Wettbewerbe, Preise, Stipendien",
    description:
      "Bewerbungsfristen für Gründungswettbewerbe, Gründerpreise, Stipendien und Accelerator-Programme in Deutschland, " +
      "nach Frist sortiert. Lists application deadlines for German startup competitions, awards, grants and accelerators.",
    inputSchema: {
      type: "object",
      properties: {
        region: REGION_SCHEMA,
        art: { type: "string", enum: ["wettbewerb", "preis", "stipendium", "accelerator"], description: "Art" },
        within_days: { type: "integer", minimum: 1, maximum: 730, description: "Nur Fristen in den nächsten N Tagen" },
      },
      additionalProperties: false,
    },
    annotations: RO,
  },
  {
    name: "search_startup_credits",
    title: "Startup-Guthaben finden",
    description:
      "Startup-Programme mit Gratis-Guthaben und Rabatten (Cloud, KI-Modelle, Hosting, Software, Marketing, Finanzen, " +
      "E-Commerce) samt Leistungen und Voraussetzungen, Angaben von den offiziellen Anbieterseiten. Optional nur Programme, " +
      "für die man nach Gründungsalter und Finanzierung infrage kommt. Finds startup credit programs.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["ki", "cloud", "hosting", "entwicklung", "software", "marketing", "finanzen", "ecommerce", "netzwerk"],
          description: "Kategorie",
        },
        query: { type: "string", description: "Stichwort, z. B. 'AWS' oder 'Datenbank'" },
        company_age_years: { type: "number", minimum: 0, maximum: 100, description: "Wie viele Jahre ist die Gründung her?" },
        has_investor: { type: "boolean", description: "Gibt es einen Investor/VC? false blendet Programme aus, die einen voraussetzen" },
      },
      additionalProperties: false,
    },
    annotations: RO,
  },
  {
    name: "read_founder_guide",
    title: "GründerX-Ratgeber lesen",
    description:
      "Ratgeber für Gründer (Rechtsformen, UG oder GmbH, Kleinunternehmer, Förderung, Steuern, E-Commerce, Versicherungen, " +
      "International). Ohne slug: Liste der Artikel, optional nach Stichwort. German founder guides.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Artikel-Slug aus der Liste (optional)" },
        query: { type: "string", description: "Stichwort für die Liste (optional)" },
      },
      additionalProperties: false,
    },
    annotations: RO,
  },
] as const;

// Kurztexte für die Promo-Seite /ki-assistent (nur belegbare Aussagen).
export const KURZ: Record<string, string> = {
  search_founder_events: "Kommende Gründer-Events nach Bundesland, Art, Format und Zeitraum, vom täglich laufenden GründerX-Event-Monitor.",
  list_founder_deadlines: "Bewerbungsfristen für Gründungswettbewerbe, Preise, Stipendien und Accelerator aus dem Fristen-Radar.",
  search_startup_credits: "Startup-Guthaben-Programme mit Leistungen und Voraussetzungen, optional gefiltert nach Gründungsalter und Investor.",
  read_founder_guide: "Die GründerX-Ratgeber im Volltext, etwa zu UG oder GmbH, Kleinunternehmerregelung, Förderung und Steuern.",
};

class Eingabefehler extends Error {}

// --- Daten (pro Instanz 10 Minuten gecacht) ---------------------------------------------------
type Cache = { t: number; d: unknown };
const CACHE: Record<string, Cache> = {};
async function holeJson<T>(url: string, init?: RequestInit): Promise<T> {
  const c = CACHE[url];
  if (c && Date.now() - c.t < 600_000) return c.d as T;
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`Datenquelle ${new URL(url).pathname} antwortet ${r.status}`);
  const d = (await r.json()) as T;
  CACHE[url] = { t: Date.now(), d };
  return d;
}

type Ev = { name: string; veranstalter: string; art: string; format: string; ort: string; region: string; datum: string | null; datumBis: string | null; rhythmus: string | null; kostenlos: boolean | null; url: string };
type Fr = { slug: string; name: string; veranstalter: string; art: string; region: string; frist?: string; eventDatum?: string; rhythmus?: string; preis?: string; url: string; kurz: string };
type EvDatei = { stand: string; events: Ev[]; fristen: Fr[] };
type Perk = { slug: string; name: string; anbieter: string; kategorie: string; wert: string; leistungen: string[]; voraussetzungen: string[]; vcNoetig: boolean | "teilweise" | null; gruendungMaxJahre: number | null; url: string; hinweis?: string; geprueft?: string; status?: string | null };
type PerkDatei = { stand: string; kategorien: Record<string, { name: string }>; perks: Perk[] };

const heute = () => new Date().toISOString().slice(0, 10);
const datumDe = (iso?: string | null) => (iso ? iso.split("-").reverse().join(".") : "");
const str = (a: Record<string, unknown>, k: string) => (typeof a[k] === "string" ? (a[k] as string).trim() : "");
const isoOk = (v: string, k: string) => {
  if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) throw new Eingabefehler(`'${k}' bitte als JJJJ-MM-TT angeben`);
  return v;
};
const zahl = (a: Record<string, unknown>, k: string, min: number, max: number) => {
  const v = a[k];
  if (v === undefined || v === null || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
  if (!Number.isFinite(n) || n < min || n > max) throw new Eingabefehler(`'${k}' muss zwischen ${min} und ${max} liegen`);
  return n;
};

const fuss = (pfad: string) =>
  `\n\nAngaben ohne Gewähr, bitte beim Veranstalter bzw. Anbieter prüfen. Mehr auf GründerX: ${utm(pfad)}\n` +
  `Alle Gründer-Tools (Gründungszuschuss, Finanzplan, Rechtsform, Steuern) im GründerX-Cockpit: ${utm("/preise")}`;

type Ergebnis = [string, Record<string, unknown>];

async function tEvents(a: Record<string, unknown>, origin: string): Promise<Ergebnis> {
  const d = await holeJson<EvDatei>(`${origin}/gruender-events.json`);
  const region = str(a, "region") ? normRegion(str(a, "region")) : "";
  const art = str(a, "art"), format = str(a, "format"), q = str(a, "query").toLowerCase();
  const von = isoOk(str(a, "from_date"), "from_date") || heute();
  const bis = isoOk(str(a, "to_date"), "to_date");
  const limit = zahl(a, "limit", 1, 25) ?? 10;
  const treffer = d.events
    .filter((e) => e.datum && (e.datumBis || e.datum) >= von && (!bis || e.datum <= bis))
    .filter((e) => !region || normRegion(e.region) === region || (region !== "online" && e.region === "bund"))
    .filter((e) => !art || e.art === art)
    .filter((e) => !format || e.format === format)
    .filter((e) => !a.free_only || e.kostenlos === true)
    .filter((e) => !q || `${e.name} ${e.veranstalter} ${e.ort}`.toLowerCase().includes(q))
    .sort((x, y) => (x.datum! < y.datum! ? -1 : 1));
  const liste = treffer.slice(0, Math.floor(limit)).map((e) => ({
    name: e.name, organizer: e.veranstalter, type: e.art, format: e.format, city: e.ort,
    region: normRegion(e.region), date: e.datum, date_end: e.datumBis, free: e.kostenlos, url: e.url,
  }));
  const kopf = liste.length
    ? `${treffer.length} passende Events${treffer.length > liste.length ? `, die nächsten ${liste.length}` : ""}:`
    : "Keine passenden Events gefunden. Tipp: Filter lockern (z. B. ohne Art oder mit 'online').";
  const zeilen = liste.map((e) =>
    `- ${datumDe(e.date)}${e.date_end && e.date_end !== e.date ? `–${datumDe(e.date_end)}` : ""}: ${e.name} (${e.organizer}, ${e.city}, ${e.format}` +
    `${e.free === true ? ", kostenlos" : e.free === false ? ", kostenpflichtig" : ""}) ${e.url}`);
  return [`${kopf}\n${zeilen.join("\n")}${fuss("/gruender-events")}`, { total: treffer.length, events: liste, data_as_of: d.stand }];
}

async function tFristen(a: Record<string, unknown>, origin: string): Promise<Ergebnis> {
  const d = await holeJson<EvDatei>(`${origin}/gruender-events.json`);
  const region = str(a, "region") ? normRegion(str(a, "region")) : "";
  const art = str(a, "art");
  const tage = zahl(a, "within_days", 1, 730);
  const h = heute();
  const grenze = tage ? new Date(Date.now() + tage * 86_400_000).toISOString().slice(0, 10) : "";
  const liste = d.fristen
    .filter((f) => !f.frist || f.frist >= h)
    .filter((f) => !grenze || (f.frist && f.frist <= grenze))
    .filter((f) => !region || normRegion(f.region) === region || f.region === "bund")
    .filter((f) => !art || f.art === art)
    .sort((x, y) => (x.frist || "9999") < (y.frist || "9999") ? -1 : 1)
    .map((f) => ({ name: f.name, organizer: f.veranstalter, type: f.art, region: f.region, deadline: f.frist ?? null,
      event_date: f.eventDatum ?? null, cycle: f.rhythmus ?? null, prize: f.preis ?? null, summary: f.kurz, url: f.url }));
  const zeilen = liste.map((f) =>
    `- ${f.deadline ? `Frist ${datumDe(f.deadline)}` : f.cycle ?? "Frist offen"}: ${f.name} (${f.organizer}, ${REGIONEN[f.region] ?? f.region})` +
    `${f.prize ? `, Preis: ${f.prize}` : ""}. ${f.summary} ${f.url}`);
  const txt = liste.length ? `${liste.length} offene Fristen:\n${zeilen.join("\n")}` : "Keine offenen Fristen für diese Filter.";
  return [txt + fuss("/gruender-events"), { deadlines: liste }];
}

async function tGuthaben(a: Record<string, unknown>, origin: string): Promise<Ergebnis> {
  const d = await holeJson<PerkDatei>(`${origin}/startup-guthaben.json`);
  const kat = str(a, "category"), q = str(a, "query").toLowerCase();
  const alter = zahl(a, "company_age_years", 0, 100);
  const investor = typeof a.has_investor === "boolean" ? a.has_investor : undefined;
  const liste = d.perks
    .filter((p) => !kat || p.kategorie === kat)
    .filter((p) => !q || `${p.name} ${p.anbieter} ${p.wert} ${p.leistungen.join(" ")}`.toLowerCase().includes(q))
    .filter((p) => alter === undefined || p.gruendungMaxJahre == null || alter <= Math.ceil(p.gruendungMaxJahre))
    .filter((p) => investor !== false || p.vcNoetig !== true)
    .map((p) => ({ name: p.name, provider: p.anbieter, category: d.kategorien[p.kategorie]?.name ?? p.kategorie, value: p.wert,
      benefits: p.leistungen, requirements: p.voraussetzungen, needs_investor: p.vcNoetig, max_company_age_years: p.gruendungMaxJahre,
      note: p.hinweis ?? null, checked: p.geprueft ?? null, url: p.url }));
  const zeilen = liste.map((p) =>
    `- ${p.name} (${p.provider}, ${p.category}): ${p.value}${p.needs_investor === "teilweise" ? " (höhere Stufen nur mit Investor/Accelerator)" : ""}. ` +
    `Voraussetzungen: ${p.requirements.join("; ")}. ${p.url}`);
  const txt = liste.length ? `${liste.length} Programme:\n${zeilen.join("\n")}` : "Kein passendes Programm gefunden.";
  return [txt + fuss("/startup-guthaben"), { programs: liste, data_as_of: d.stand }];
}

type Post = { slug: string; title: string; excerpt: string; category: string; body_md?: string; published_at?: string };
async function tRatgeber(a: Record<string, unknown>): Promise<Ergebnis> {
  const kopf = { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` };
  const slug = str(a, "slug");
  if (!slug) {
    const posts = await holeJson<Post[]>(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title,excerpt,category&status=eq.published&order=published_at.desc&limit=100`,
      { headers: kopf });
    const q = str(a, "query").toLowerCase();
    const liste = posts
      .filter((p) => !q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q))
      .map((p) => ({ slug: p.slug, title: p.title, summary: p.excerpt, category: p.category, url: utm(`/ratgeber/${p.slug}`) }));
    if (!liste.length) return [`Kein Artikel zu '${q}'. Alle Ratgeber: ${utm("/ratgeber")}`, { articles: [] }];
    return [liste.map((p) => `${p.slug}: ${p.title} – ${p.summary}`).join("\n"), { articles: liste }];
  }
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) throw new Eingabefehler("Ungültiger slug. Ohne slug aufrufen, um die Liste zu bekommen.");
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,title,excerpt,body_md,published_at&status=eq.published&slug=eq.${slug}&limit=1`,
    { headers: kopf });
  if (!r.ok) throw new Error(`Ratgeber nicht erreichbar (${r.status})`);
  const p = ((await r.json()) as Post[])[0];
  if (!p) throw new Eingabefehler("Unbekannter Artikel. Ohne slug aufrufen, um die Liste zu bekommen.");
  const url = utm(`/ratgeber/${p.slug}`);
  return [`# ${p.title}\n${url}\n\n${p.body_md ?? p.excerpt}`, { slug: p.slug, title: p.title, url, published_at: p.published_at ?? null }];
}

const HANDLER: Record<string, (a: Record<string, unknown>, origin: string) => Promise<Ergebnis>> = {
  search_founder_events: tEvents,
  list_founder_deadlines: tFristen,
  search_startup_credits: tGuthaben,
  read_founder_guide: (a) => tRatgeber(a),
};
export const TOOL_NAMEN = Object.keys(HANDLER);

// --- Infrastruktur ------------------------------------------------------------------------------
const ZUGRIFFE = new Map<string, number[]>();
export function gedrosselt(req: Request): boolean {
  const ip = (req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0] || "?").trim();
  const jetzt = Date.now();
  if (ZUGRIFFE.size > 5000) ZUGRIFFE.clear();
  const z = (ZUGRIFFE.get(ip) ?? []).filter((t) => t > jetzt - FENSTER_MS);
  z.push(jetzt);
  ZUGRIFFE.set(ip, z);
  return z.length > LIMIT;
}
export const _drosselLeeren = () => ZUGRIFFE.clear();

export async function zaehlen(tool: string, via: "mcp" | "gpt"): Promise<void> {
  // Ohne IP und ohne Eingaben: nur Werkzeugname und Weg. Darf den Aufruf nie kippen.
  try {
    const tag = heute();
    const schreiben = fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
      method: "POST",
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ event_name: "mcp_call", layer: "traffic", anon_id: `mcp-server-${via}`, session_id: `mcp-${tag}`,
        path: via === "mcp" ? "/mcp" : `/api/gpt/${tool}`, utm_source: "mcp", utm_medium: via, props: { tool, via } }),
    });
    await Promise.race([schreiben, new Promise((r) => setTimeout(r, 1500))]);
  } catch { /* Zählen ist Nebensache */ }
}

export const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id",
};
export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS, ...extra } });

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };
const ok = (id: unknown, result: unknown) => ({ jsonrpc: "2.0", id, result });
const err = (id: unknown, code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

export async function werkzeug(name: string, args: Record<string, unknown>, origin: string): Promise<{ text: string; data?: Record<string, unknown>; fehler?: boolean }> {
  const fn = HANDLER[name];
  try {
    const [text, data] = await fn(args, origin);
    return { text, data };
  } catch (e) {
    if (e instanceof Eingabefehler) return { text: `Eingabe prüfen: ${e.message}`, fehler: true };
    return { text: `Datenquelle gerade nicht erreichbar, bitte später erneut versuchen. (${(e as Error).message})`, fehler: true };
  }
}

async function eine(msg: Rpc, origin: string): Promise<unknown | null> {
  if (!msg || typeof msg !== "object" || msg.jsonrpc !== "2.0") return err(null, -32600, "Invalid Request");
  const { method, id } = msg;
  if (method === undefined || !("id" in msg)) return null; // Notification oder Client-Antwort
  const params = msg.params ?? {};
  if (typeof params !== "object" || Array.isArray(params)) return err(id, -32602, "params muss ein Objekt sein");
  switch (method) {
    case "initialize": {
      await zaehlen("initialize", "mcp");
      const gew = params.protocolVersion as string;
      return ok(id, { protocolVersion: PROTOKOLLE.includes(gew) ? gew : PROTOKOLLE[0], capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO, instructions: ANWEISUNGEN });
    }
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, { tools: TOOLS });
    case "resources/list":
      return ok(id, { resources: [] });
    case "resources/templates/list":
      return ok(id, { resourceTemplates: [] });
    case "prompts/list":
      return ok(id, { prompts: [] });
    case "tools/call": {
      const name = params.name as string;
      const args = (params.arguments ?? {}) as Record<string, unknown>;
      if (!HANDLER[name]) return err(id, -32602, `Unbekanntes Werkzeug: ${name}`);
      if (typeof args !== "object" || Array.isArray(args)) return err(id, -32602, "arguments muss ein Objekt sein");
      await zaehlen(name, "mcp");
      const r = await werkzeug(name, args, origin);
      return ok(id, { content: [{ type: "text", text: r.text }], ...(r.data ? { structuredContent: r.data } : {}), isError: !!r.fehler });
    }
    default:
      return err(id, -32601, `Methode nicht unterstützt: ${method}`);
  }
}

export async function mcpAntwort(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") {
    return json({ hinweis: "MCP-Endpunkt (Streamable HTTP). In ChatGPT oder Claude als Connector mit dieser URL eintragen.",
      anleitung: `${BASE}/ki-assistent` }, 405, { Allow: "POST, OPTIONS" });
  }
  if (gedrosselt(req)) return json(err(null, -32000, "Zu viele Anfragen, bitte kurz warten"), 429);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(err(null, -32700, "Parse error"), 400);
  }
  const origin = new URL(req.url).origin;
  if (Array.isArray(body)) {
    if (!body.length) return json(err(null, -32600, "Invalid Request"), 400);
    const antworten = (await Promise.all(body.slice(0, 20).map((m) => eine(m as Rpc, origin)))).filter((x) => x !== null);
    return antworten.length ? json(antworten) : new Response(null, { status: 202, headers: CORS });
  }
  const a = await eine(body as Rpc, origin);
  return a === null ? new Response(null, { status: 202, headers: CORS }) : json(a);
}

// --- GPT-Actions (OpenAPI) ------------------------------------------------------------------------
export function openapi() {
  const paths: Record<string, unknown> = {};
  for (const t of TOOLS) {
    paths[`/api/gpt/${t.name}`] = {
      post: {
        operationId: t.name, summary: t.title, description: t.description.slice(0, 300), "x-openai-isConsequential": false,
        requestBody: { required: true, content: { "application/json": { schema: t.inputSchema } } },
        responses: { "200": { description: "Ergebnis", content: { "application/json": { schema: { type: "object",
          properties: { text: { type: "string" }, data: { type: "object" }, error: { type: "string" } } } } } } },
      },
    };
  }
  return { openapi: "3.1.0", info: { title: "GründerX – Events, Fristen & Startup-Guthaben", version: SERVER_INFO.version, description: ANWEISUNGEN },
    servers: [{ url: BASE }], paths };
}

export async function gptAntwort(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const u = new URL(req.url);
  // Vercel-Rewrite /api/gpt/:name -> /api/gpt?name=:name; lokal/Tests auch direkt über den Pfad.
  const name = u.searchParams.get("name") || u.pathname.split("/").pop() || "";
  if (name === "openapi.json") return json(openapi());
  if (req.method !== "POST") return json({ error: "POST erwartet" }, 405, { Allow: "POST, OPTIONS" });
  if (gedrosselt(req)) return json({ error: "Zu viele Anfragen, bitte kurz warten" }, 429);
  if (!HANDLER[name]) return json({ error: "Unbekanntes Werkzeug" }, 404);
  let args: unknown = {};
  try {
    args = await req.json();
  } catch {
    args = {};
  }
  if (!args || typeof args !== "object" || Array.isArray(args)) return json({ error: "JSON-Objekt erwartet" }, 400);
  await zaehlen(name, "gpt");
  const r = await werkzeug(name, args as Record<string, unknown>, new URL(req.url).origin);
  return r.fehler ? json({ error: r.text }, 400) : json({ text: r.text, data: r.data });
}
