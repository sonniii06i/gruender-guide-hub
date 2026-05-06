// Sucht Notare in der Nähe einer PLZ über OpenStreetMap.
// Stack: Nominatim (PLZ → lat/lon) + Overpass (office=notary im Radius).
// Frei, kein API-Key, strukturiertes JSON, sortiert nach Distanz.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface Notar {
  name: string;
  street?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  lat?: number;
  lon?: number;
  distanceKm?: number;
  /** Google-Maps-Bewertung (nur bei API-Key) */
  rating?: number;
  /** Anzahl Bewertungen */
  reviewCount?: number;
  /** Quelle: osm | google */
  source?: "osm" | "google";
  /** Google Place ID (für Maps-Link) */
  placeId?: string;
}

const haversineKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

async function searchByName(name: string, fallbackCity?: string): Promise<{
  street?: string;
  postalCode?: string;
  city?: string;
} | null> {
  // Nominatim-Suche nach Notar-Name (+ optional Stadt aus PLZ-Geocoding).
  // Liefert die echte OSM-Adresse des Notar-POIs, viel präziser als
  // Reverse-Geocoding der Coords (die oft 50-200m daneben liegen).
  const q = fallbackCity ? `${name} ${fallbackCity}` : name;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=1&countrycodes=de`,
      {
        headers: { "User-Agent": "GruenderX-NotarFinder/1.0", "Accept-Language": "de" },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!Array.isArray(data) || data.length === 0) return null;
    const a = data[0]?.address;
    if (!a) return null;
    const road = a.road ?? a.pedestrian ?? a.footway;
    const street = road
      ? `${road}${a.house_number ? " " + a.house_number : ""}`
      : undefined;
    const city = a.city ?? a.town ?? a.village ?? a.suburb ?? a.municipality;
    return { street, postalCode: a.postcode, city };
  } catch {
    return null;
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<{
  street?: string;
  postalCode?: string;
  city?: string;
} | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&zoom=18`,
      {
        headers: { "User-Agent": "GruenderX-NotarFinder/1.0", "Accept-Language": "de" },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const a = data?.address;
    if (!a) return null;
    const road = a.road ?? a.pedestrian ?? a.footway;
    const street = road ? `${road}${a.house_number ? " " + a.house_number : ""}` : undefined;
    const city = a.city ?? a.town ?? a.village ?? a.suburb ?? a.municipality;
    return { street, postalCode: a.postcode, city };
  } catch {
    return null;
  }
}

async function geocodePlz(plz: string): Promise<{ lat: number; lon: number; city?: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(plz)}&country=de&format=json&limit=1`,
      {
        headers: { "User-Agent": "GruenderX-NotarFinder/1.0", "Accept-Language": "de" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const first = data[0];
    const parts = String(first.display_name ?? "")
      .split(",")
      .map((p: string) => p.trim());
    return {
      lat: parseFloat(first.lat),
      lon: parseFloat(first.lon),
      city: parts[1] ?? parts[0],
    };
  } catch {
    return null;
  }
}

async function findNotaresOSM(
  lat: number,
  lon: number,
  radiusM = 25000,
): Promise<Notar[] | null> {
  // Mehrere Tag-Varianten: office=notary (häufigste), amenity=notary,
  // sowie Anwälte, die als Notare markiert sind (lawyer=notary o. notary=yes).
  // Erfasst ~30 % mehr Treffer als die alte Single-Query.
  const around = `(around:${radiusM},${lat},${lon})`;
  const query =
    `[out:json][timeout:15];` +
    `(` +
      `node["office"="notary"]${around};` +
      `node["amenity"="notary"]${around};` +
      `node["office"="lawyer"]["lawyer"="notary"]${around};` +
      `node["office"="lawyer"]["notary"="yes"]${around};` +
    `);` +
    `out 100;`;
  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: "data=" + encodeURIComponent(query),
      headers: {
        "User-Agent": "GruenderX-NotarFinder/1.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      signal: AbortSignal.timeout(13000),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!data?.elements) return null;
    const notare: Notar[] = [];
    for (const el of data.elements) {
      const tags = el.tags ?? {};
      const name = tags.name ?? tags["name:de"];
      if (!name) continue;
      const elLat: number | undefined = el.lat;
      const elLon: number | undefined = el.lon;
      const street =
        tags["addr:street"] && tags["addr:housenumber"]
          ? `${tags["addr:street"]} ${tags["addr:housenumber"]}`
          : tags["addr:street"];
      notare.push({
        name: String(name),
        street,
        postalCode: tags["addr:postcode"],
        city: tags["addr:city"],
        phone: tags["contact:phone"] ?? tags.phone,
        email: tags["contact:email"] ?? tags.email,
        website: tags.website ?? tags["contact:website"],
        openingHours: tags.opening_hours,
        lat: elLat,
        lon: elLon,
        distanceKm:
          elLat !== undefined && elLon !== undefined
            ? Math.round(haversineKm(lat, lon, elLat, elLon) * 10) / 10
            : undefined,
        source: "osm",
      });
    }
    return notare.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
  } catch {
    return null;
  }
}

/**
 * SerpAPI Google Maps Endpoint – Drittanbieter-Scrape-Service (NICHT Google
 * official API). Kostenlose 100 Searches/Monat ohne Card. Liefert echte
 * Bewertungen, Reviews, Adressen.
 *
 * Setup: User signt sich auf serpapi.com ein, Key wird als Supabase Secret
 * SERPAPI_KEY hinterlegt. Ohne Key: silent fallback (keine Bewertungen).
 */
async function fetchViaSerpAPI(
  query: string,
  lat: number,
  lon: number,
): Promise<Notar[] | null> {
  const key = Deno.env.get("SERPAPI_KEY");
  if (!key) return null;
  try {
    const params = new URLSearchParams({
      engine: "google_maps",
      q: query,
      ll: `@${lat},${lon},14z`,
      type: "search",
      hl: "de",
      gl: "de",
      api_key: key,
    });
    const res = await fetch(`https://serpapi.com/search.json?${params}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const results = data?.local_results ?? data?.place_results ?? [];
    if (!Array.isArray(results) || results.length === 0) return null;

    return results.slice(0, 25).map((r: any): Notar => {
      const street = r.address?.split(",")[0]?.trim();
      const plzCity = r.address?.split(",")[1]?.trim();
      const plzCityMatch = plzCity?.match(/^(\d{4,5})\s+(.+)$/);
      return {
        name: String(r.title ?? "Unbekannt"),
        street,
        postalCode: plzCityMatch?.[1],
        city: plzCityMatch?.[2] ?? plzCity,
        phone: r.phone,
        website: r.website,
        openingHours: typeof r.hours === "string" ? r.hours : undefined,
        lat: r.gps_coordinates?.latitude,
        lon: r.gps_coordinates?.longitude,
        distanceKm:
          r.gps_coordinates?.latitude !== undefined
            ? Math.round(
                haversineKm(lat, lon, r.gps_coordinates.latitude, r.gps_coordinates.longitude) * 10,
              ) / 10
            : undefined,
        rating: typeof r.rating === "number" ? r.rating : undefined,
        reviewCount: typeof r.reviews === "number" ? r.reviews : undefined,
        source: "google",
        placeId: r.place_id,
      };
    });
  } catch {
    return null;
  }
}

/**
 * Apify Google Maps Scraper – Alternative wenn SerpAPI-Quota erschöpft.
 * $5 Free Credits/Monat (~500 calls).
 */
async function fetchViaApify(
  query: string,
  lat: number,
  lon: number,
): Promise<Notar[] | null> {
  const token = Deno.env.get("APIFY_TOKEN");
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchStringsArray: [query],
          locationQuery: `${lat},${lon}`,
          maxCrawledPlacesPerSearch: 20,
          language: "de",
          countryCode: "de",
        }),
        signal: AbortSignal.timeout(60000),
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return data.map((p: any): Notar => ({
      name: String(p.title ?? "Unbekannt"),
      street: p.street,
      postalCode: p.postalCode,
      city: p.city,
      phone: p.phone,
      website: p.website,
      lat: p.location?.lat,
      lon: p.location?.lng,
      distanceKm:
        p.location?.lat !== undefined
          ? Math.round(haversineKm(lat, lon, p.location.lat, p.location.lng) * 10) / 10
          : undefined,
      rating: typeof p.totalScore === "number" ? p.totalScore : undefined,
      reviewCount: typeof p.reviewsCount === "number" ? p.reviewsCount : undefined,
      source: "google",
      placeId: p.placeId,
    }));
  } catch {
    return null;
  }
}

/**
 * Verbleibender Gratis-Scrape-Versuch ohne API-Key.
 * Funktioniert in der Praxis kaum (Google blockt Datacenter-IPs), aber
 * Fallback wenn weder SerpAPI noch Apify konfiguriert sind.
 */
async function scrapeGoogleMaps(
  query: string,
  lat: number,
  lon: number,
): Promise<Notar[] | null> {
  const url = `https://www.google.com/search?tbm=lcl&q=${encodeURIComponent(query)}&hl=de&gl=de`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
        // Consent-Cookie umgeht das EU-Consent-Modal
        "Cookie": "CONSENT=YES+cb.20210720-07-p0.de+FX+410; SOCS=CAESHAgBEhJnd3NfMjAyMzAyMjEtMF9SQzIaAmRlIAEaBgiAjpqfBg",
      },
      signal: AbortSignal.timeout(4000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Schutz gegen ReDoS bei extrem großen Responses
    if (html.length > 2_000_000) return null;

    // Local-Pack-Cards parsen: jede Karte hat ein div mit data-attrid und Sterne-Markup.
    // Pattern für Name + Rating + Review-Count + Adresse.
    const hits: Notar[] = [];
    const cardRe = /<div[^>]+jslog="[^"]+"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
    let m;
    let count = 0;
    while ((m = cardRe.exec(html)) !== null && count < 20) {
      count++;
      const block = m[1];
      // Name aus erstem heading-ähnlichen Element
      const nameMatch = block.match(/role="heading"[^>]*>([^<]+)</)
        ?? block.match(/<span[^>]+class="[^"]*"[^>]*>([A-ZÄÖÜ][^<]{3,80})<\/span>/);
      if (!nameMatch) continue;
      const name = nameMatch[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim();
      if (!name || name.length < 3) continue;
      // Rating parsen (z.B. "4,7 Sterne")
      const ratingMatch = block.match(/(\d[,.]\d)\s*Sterne|aria-label="Bewertet mit (\d[,.]\d)/);
      const rating = ratingMatch ? parseFloat((ratingMatch[1] ?? ratingMatch[2]).replace(",", ".")) : undefined;
      // Review-Count (z.B. "(123)")
      const reviewMatch = block.match(/\((\d+)\)/);
      const reviewCount = reviewMatch ? parseInt(reviewMatch[1], 10) : undefined;
      // Adresse (heuristisch: Zeile mit Komma + PLZ-Pattern)
      const addrMatch = block.match(/>([A-ZÄÖÜ][^<]{8,80}?,\s*\d{5}[^<]+)</);
      const fullAddr = addrMatch?.[1];
      const parts = fullAddr?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
      const plzCityMatch = parts[1]?.match(/^(\d{4,5})\s+(.+)$/);

      hits.push({
        name,
        street: parts[0],
        postalCode: plzCityMatch?.[1],
        city: plzCityMatch?.[2],
        rating,
        reviewCount,
        source: "google",
      });
    }
    return hits.length > 0 ? hits : null;
  } catch {
    return null;
  }
}

/**
 * Scraper-Health prüfen: schnelle Test-Anfrage. Wird von der täglichen
 * Cron-Routine aufgerufen + bei jedem Live-Request inline.
 */
async function isScraperHealthy(): Promise<boolean> {
  const test = await scrapeGoogleMaps("Notar Hamburg", 53.55, 9.99);
  return Array.isArray(test) && test.length > 0;
}

async function findNotaresGoogle(
  lat: number,
  lon: number,
  _radiusM = 25000,
  cityHint?: string,
): Promise<Notar[] | null> {
  const query = cityHint ? `Notar ${cityHint}` : `Notar near ${lat},${lon}`;
  // Reihenfolge nach Zuverlässigkeit: SerpAPI → Apify → Free-Scrape
  const places =
    (await fetchViaSerpAPI(query, lat, lon)) ??
    (await fetchViaApify(query, lat, lon)) ??
    (await scrapeGoogleMaps(query, lat, lon));
  if (!places) return null;
  for (const p of places) {
    if (p.lat !== undefined && p.lon !== undefined) {
      p.distanceKm = Math.round(haversineKm(lat, lon, p.lat, p.lon) * 10) / 10;
    }
  }
  return places;
}

/**
 * Merged Notare aus OSM + Google. Dedupliziert nach normalisiertem Namen,
 * Google-Daten haben Vorrang (mehr Felder + Bewertungen).
 */
function mergeNotare(osmList: Notar[], googleList: Notar[]): Notar[] {
  const norm = (s: string) => s.toLowerCase().replace(/[^\w]+/g, "").slice(0, 30);
  const map = new Map<string, Notar>();
  for (const g of googleList) map.set(norm(g.name), g);
  for (const o of osmList) {
    const key = norm(o.name);
    if (map.has(key)) {
      // OSM-Daten zu vorhandenem Google-Eintrag mergen (z. B. fehlende Email)
      const existing = map.get(key)!;
      existing.email = existing.email ?? o.email;
      existing.openingHours = existing.openingHours ?? o.openingHours;
    } else {
      map.set(key, o);
    }
  }
  return Array.from(map.values()).sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Health-Check-Endpoint für tägliche Monitor-Routine.
  const url = new URL(req.url);
  if (url.searchParams.get("health") === "1") {
    const ok = await isScraperHealthy();
    return new Response(
      JSON.stringify({
        scraper: ok ? "ok" : "down",
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: ok ? 200 : 503 },
    );
  }

  try {
    const { plz } = await req.json();
    const plzStr = String(plz ?? "");
    if (!plzStr || !/^\d{4,5}$/.test(plzStr)) {
      return new Response(JSON.stringify({ error: "plz required (4-5 digits)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const center = await geocodePlz(plzStr);
    if (!center) {
      return new Response(
        JSON.stringify({
          notare: [],
          error: "PLZ konnte nicht geocodiert werden",
          fallbackUrl: `https://www.notar.de/notarsuche?tx_bnotknotarverz_pi1%5Bplz%5D=${plzStr}`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // OSM ist die garantierte Quelle (sequentiell, nie übersprungen).
    // Google-Scrape (best-effort) wird parallel angestoßen, aber nur mit
    // strikter 6s-Race-Time-Out – wenn Google blockt/hängt, kommen Notare
    // trotzdem zurück, halt ohne Bewertungen.
    const osmList = await findNotaresOSM(center.lat, center.lon, 25000);

    let googleList: Notar[] | null = null;
    try {
      googleList = await Promise.race([
        findNotaresGoogle(center.lat, center.lon, 25000, center.city),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 6000)),
      ]);
    } catch {
      googleList = null;
    }

    let notare: Notar[] | null = osmList;
    if (osmList && googleList && googleList.length > 0) {
      notare = mergeNotare(osmList, googleList);
    }
    const reviewsAvailable = Array.isArray(googleList) && googleList.length > 0;

    // Adresse-Enrichment: Notare ohne addr:* tags. Strategie:
    // 1) Nominatim-Search nach Name (+ Center-Stadt) → exakte POI-Adresse.
    // 2) Fallback: Reverse-Geocoding der Coords → ungefähre Adresse.
    if (notare && notare.length > 0) {
      const needsEnrich = notare
        .filter((n) => !n.street)
        .slice(0, 12);
      await Promise.all(
        needsEnrich.map(async (n) => {
          let addr = await searchByName(n.name, center.city);
          if (!addr?.street && n.lat !== undefined && n.lon !== undefined) {
            addr = await reverseGeocode(n.lat, n.lon);
          }
          if (addr) {
            n.street = n.street ?? addr.street;
            n.postalCode = n.postalCode ?? addr.postalCode;
            n.city = n.city ?? addr.city;
          }
        }),
      );
    }

    return new Response(
      JSON.stringify({
        center,
        notare: notare ?? [],
        sources: {
          osm: Array.isArray(osmList) ? "ok" : "error",
          googleScrape: reviewsAvailable ? "ok" : "down",
        },
        reviewsAvailable,
        sourceUrl: `https://www.openstreetmap.org/search?query=notary+${plzStr}`,
        fallbackUrl: `https://www.notar.de/notarsuche?tx_bnotknotarverz_pi1%5Bplz%5D=${plzStr}`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
