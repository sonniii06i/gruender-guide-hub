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
 * Google Places API – Nearby Search nach Notaren mit Bewertungen.
 * Liefert nur Daten wenn GOOGLE_MAPS_API_KEY gesetzt ist (Lovable Secret /
 * Supabase env var). Ohne Key wird OSM-Only zurückgegeben.
 */
async function findNotaresGoogle(
  lat: number,
  lon: number,
  radiusM = 25000,
): Promise<Notar[] | null> {
  const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
  if (!key) return null;
  try {
    // Places API (New) – Text Search ist mächtiger als Nearby für Notare
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location," +
          "places.rating,places.userRatingCount,places.nationalPhoneNumber," +
          "places.websiteUri,places.regularOpeningHours.weekdayDescriptions",
      },
      body: JSON.stringify({
        textQuery: "Notar",
        languageCode: "de",
        regionCode: "DE",
        locationBias: {
          circle: {
            center: { latitude: lat, longitude: lon },
            radius: Math.min(radiusM, 50000),
          },
        },
        maxResultCount: 20,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!data?.places || !Array.isArray(data.places)) return null;

    return data.places.map((p: any): Notar => {
      const loc = p.location ?? {};
      const elLat = typeof loc.latitude === "number" ? loc.latitude : undefined;
      const elLon = typeof loc.longitude === "number" ? loc.longitude : undefined;
      const fullAddr: string = p.formattedAddress ?? "";
      // Heuristik: "Strasse Nr, PLZ Stadt, Land" splitten
      const parts = fullAddr.split(",").map((s: string) => s.trim()).filter(Boolean);
      const plzCityMatch = parts[1]?.match(/^(\d{4,5})\s+(.+)$/);
      return {
        name: String(p.displayName?.text ?? "Unbekannt"),
        street: parts[0],
        postalCode: plzCityMatch?.[1],
        city: plzCityMatch?.[2],
        phone: p.nationalPhoneNumber,
        website: p.websiteUri,
        openingHours: p.regularOpeningHours?.weekdayDescriptions?.join("; "),
        lat: elLat,
        lon: elLon,
        distanceKm:
          elLat !== undefined && elLon !== undefined
            ? Math.round(haversineKm(lat, lon, elLat, elLon) * 10) / 10
            : undefined,
        rating: typeof p.rating === "number" ? p.rating : undefined,
        reviewCount: typeof p.userRatingCount === "number" ? p.userRatingCount : undefined,
        source: "google",
        placeId: p.id,
      };
    });
  } catch {
    return null;
  }
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

    // OSM + Google parallel – mehr Treffer + Google-Bewertungen wenn API-Key da.
    const [osmList, googleList] = await Promise.all([
      findNotaresOSM(center.lat, center.lon, 25000),
      findNotaresGoogle(center.lat, center.lon, 25000),
    ]);
    let notare: Notar[] | null = null;
    if (osmList && googleList) notare = mergeNotare(osmList, googleList);
    else notare = googleList ?? osmList;

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
        source: "openstreetmap",
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
