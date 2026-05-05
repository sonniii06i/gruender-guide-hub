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
  // Nur node-Query (Notare sind in OSM ~99% Nodes). Way/Relation würden den
  // Query 3-5x langsamer machen ohne nennenswert mehr Treffer.
  const query =
    `[out:json][timeout:12];node["office"="notary"](around:${radiusM},${lat},${lon});out 60;`;
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
      });
    }
    return notare.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
  } catch {
    return null;
  }
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

    // Default 25 km – einzelner Call. Großstadt zeigt 15-30 Notare,
    // ländlich i.d.R. 5-10. Kein Retry-Loop = halbierte Latenz.
    const notare = await findNotaresOSM(center.lat, center.lon, 25000);

    // Adresse fehlt häufig in OSM-Tags, aber lat/lon hat fast immer eine
    // Hausnummer wenn man reverse-geocoded. Bis zu 12 parallel ergänzen
    // (sub-Sekunden-Block durch Nominatim-Limit).
    if (notare && notare.length > 0) {
      const needsEnrich = notare
        .filter((n) => !n.street && n.lat !== undefined && n.lon !== undefined)
        .slice(0, 12);
      await Promise.all(
        needsEnrich.map(async (n) => {
          const addr = await reverseGeocode(n.lat!, n.lon!);
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
