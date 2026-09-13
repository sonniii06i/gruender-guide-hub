// ===================================================================
// mail-track — nimmt Zaehlpixel-Aufrufe und Klicks entgegen.
//
// Zwei Wege, eine Funktion:
//   ?o=<daten>&k=<signatur>   Zaehlpixel  -> schreibt "opened", liefert GIF
//   ?c=<daten>&k=<signatur>   Klicklink   -> schreibt "clicked", leitet um
//
// Muss ohne JWT erreichbar sein (verify_jwt = false in config.toml):
// Der Aufruf kommt aus einem Mailprogramm, nicht aus der App.
//
// GRUNDREGEL: Diese Funktion darf NIE einen Fehler zurueckgeben, der den
// Nutzer stehen laesst. Ein kaputtes Pixel liefert trotzdem ein GIF, ein
// Klick landet trotzdem am Ziel. Die Messung ist das Nebenprodukt, nicht
// der Zweck — wer das umdreht, baut eine Mail, deren Links ausfallen,
// sobald die Datenbank klemmt.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// 1x1 transparentes GIF.
const GIF = Uint8Array.from(atob(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
), (c) => c.charCodeAt(0));

const gifAntwort = () =>
  new Response(GIF, {
    headers: {
      "Content-Type": "image/gif",
      // Ohne das laedt Gmails Zwischenspeicher einmal und nie wieder.
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
    },
  });

const enc = new TextEncoder();

async function signaturStimmt(daten: string, sig: string): Promise<boolean> {
  const secret = Deno.env.get("MAIL_TRACK_SECRET") ?? "";
  if (!secret) return false;
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(daten));
  const erwartet = btoa(String.fromCharCode(...new Uint8Array(mac)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "").slice(0, 24);
  if (sig.length !== erwartet.length) return false;
  let d = 0;
  for (let i = 0; i < sig.length; i++) d |= sig.charCodeAt(i) ^ erwartet.charCodeAt(i);
  return d === 0;
}

// deno-lint-ignore no-explicit-any
function lesen(daten: string): any {
  const b64 = daten.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(atob(b64))));
}

Deno.serve(async (req) => {
  const u = new URL(req.url);
  const pixelDaten = u.searchParams.get("o");
  const klickDaten = u.searchParams.get("c");
  const sig = u.searchParams.get("k") ?? "";
  const daten = pixelDaten ?? klickDaten;

  if (!daten) return gifAntwort();

  // deno-lint-ignore no-explicit-any
  let p: any = null;
  const echt = await signaturStimmt(daten, sig);
  if (echt) { try { p = lesen(daten); } catch { p = null; } }

  // Ein Klick mit ungueltiger Signatur wird NICHT weitergeleitet: Sonst
  // waere das hier ein offener Weiterleiter, den jeder fuer beliebige
  // Ziele unter der eigenen Domain missbrauchen kann.
  if (!echt || !p) {
    if (klickDaten) {
      return Response.redirect(Deno.env.get("MAIL_TRACK_FALLBACK") ?? "https://example.invalid", 302);
    }
    return gifAntwort();
  }

  const ziel: string | null = p.u ?? null;

  // Erst umleiten, dann protokollieren waere schoener, geht in einer
  // Function aber nicht — deshalb: protokollieren mit Zeitlimit, damit
  // eine haengende Datenbank den Klick nicht ausbremst.
  try {
    const db = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    await Promise.race([
      db.from("mail_events").insert({
        email_id: p.m ?? null,
        brand: p.b ?? "unbekannt",
        campaign: p.c ?? "unbekannt",
        variant: p.v ?? "a",
        recipient: p.r ?? "",
        event: klickDaten ? "clicked" : "opened",
        link: ziel,
        occurred_at: new Date().toISOString(),
      }),
      new Promise((r) => setTimeout(r, 2000)),
    ]);
  } catch (err) {
    console.error("[mail-track]", err);
  }

  if (klickDaten && ziel && /^https?:\/\//.test(ziel)) {
    return Response.redirect(ziel, 302);
  }
  return gifAntwort();
});
