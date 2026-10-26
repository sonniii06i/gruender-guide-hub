// ===================================================================
// paket-download — Auslieferung des Gründungspakets.
//
// Zwei Aufrufe:
//   POST { session_id }          (Danke-Seite nach Stripe)
//     -> prüft live bei Stripe: bezahlt, unser Produkt, nicht erstattet,
//        höchstens PAKET_ABRUF_TAGE alt
//     -> schickt beim ersten Mal die Bestätigungsmail (§ 312f BGB) mit Link
//     <- { link, gueltigBis }  (signiert, PAKET_LINK_STUNDEN gültig)
//   GET ?s=<session>&x=<ablauf>&sig=<hmac>   (Link aus Seite/Mail)
//     -> Signatur + Ablauf prüfen, Stripe erneut prüfen, ZIP ausliefern
//
// Die ZIP steckt als Base64 in _shared/gruendungspaketZip.ts (gebaut von
// scripts/gruendungspaket/bauen.mjs) und liegt NIE im Frontend.
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import type Stripe from "https://esm.sh/stripe@18.5.0";
import { sendMail } from "../_shared/mailSend.ts";
import { buildPaketBestaetigung } from "../_shared/paketMail.ts";
import { paketStripe, sessionPasstZumModus, type Modus } from "../_shared/paketStripe.ts";
import { SESSION_RE, downloadLink, paketLinkGueltig, paketSecret, signierePaket } from "../_shared/paketToken.ts";
import { PAKET_ABRUF_TAGE, PAKET_LINK_STUNDEN, PAKET_PRODUKT } from "../_shared/gruendungspaketTexte.ts";
import { PAKET_BASE64, PAKET_DATEINAME } from "../_shared/gruendungspaketZip.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

type Pruefung = { ok: true; session: Stripe.Checkout.Session; pi: Stripe.PaymentIntent } | { ok: false; grund: string };

async function sessionPruefen(stripe: Stripe, modus: Modus, sessionId: string): Promise<Pruefung> {
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent.latest_charge"] });
  } catch {
    return { ok: false, grund: "unbekannt" };
  }
  if (!sessionPasstZumModus(session.livemode, modus)) return { ok: false, grund: "unbekannt" };
  if (session.metadata?.produkt !== PAKET_PRODUKT) return { ok: false, grund: "produkt" };
  if (session.payment_status !== "paid") return { ok: false, grund: "nicht_bezahlt" };
  if (Date.now() - session.created * 1000 > PAKET_ABRUF_TAGE * 86400_000) return { ok: false, grund: "abgelaufen" };
  const pi = session.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null | undefined;
  if (!pi || pi.status !== "succeeded") return { ok: false, grund: "nicht_bezahlt" };
  if (charge && (charge.refunded || (charge.amount_refunded ?? 0) > 0 || charge.disputed)) return { ok: false, grund: "erstattet" };
  return { ok: true, session, pi };
}

function zipAntwort(): Response {
  const bin = Uint8Array.from(atob(PAKET_BASE64), (c) => c.charCodeAt(0));
  return new Response(bin, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${PAKET_DATEINAME}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

const fehlerSeite = (text: string, status: number) =>
  new Response(
    `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width"><title>Gründungspaket</title>` +
    `<p style="font:16px/1.5 system-ui,sans-serif;margin:40px;max-width:560px">${text}<br><br>` +
    `<a href="https://gruenderx.de/gruendungspaket">Zum Gründungspaket</a> · Fragen: support@gruenderx.de</p>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const secret = paketSecret();
  const zugang = paketStripe();
  if (!secret || !zugang) {
    console.error("❌ paket-download: Verkauf aus (PAKET_STRIPE_MODUS) oder Secret/Schlüssel fehlt");
    return req.method === "GET" ? fehlerSeite("Der Download ist gerade nicht verfügbar.", 503) : json({ error: "nicht_konfiguriert" }, 503);
  }
  const { stripe, modus } = zugang;
  const url = new URL(req.url);

  // ---------------------------------------------------------- GET: signierter Link -> ZIP
  if (req.method === "GET") {
    const s = url.searchParams.get("s") ?? "", x = Number(url.searchParams.get("x")), sig = url.searchParams.get("sig") ?? "";
    if (!(await paketLinkGueltig(s, x, sig, secret))) {
      return fehlerSeite("Dieser Download-Link ist ungültig oder abgelaufen. Öffne die Seite aus deiner Bestätigungsmail erneut – dort bekommst du einen neuen Link.", 403);
    }
    const p = await sessionPruefen(stripe, modus, s);
    if (!p.ok) return fehlerSeite(p.grund === "erstattet" ? "Dieser Kauf wurde erstattet; der Download ist deshalb gesperrt." : "Zu diesem Link gibt es keinen gültigen Kauf.", 403);
    console.log(`[paket] Download ${s}`);
    return zipAntwort();
  }

  // ---------------------------------------------------------- POST: Session -> neuer Link (+ Mail beim ersten Mal)
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const sessionId = String(body.session_id ?? "");
  if (!SESSION_RE.test(sessionId)) return json({ error: "session" }, 400);
  const p = await sessionPruefen(stripe, modus, sessionId);
  if (!p.ok) return json({ error: p.grund }, p.grund === "unbekannt" ? 404 : 403);

  const ablauf = Math.floor(Date.now() / 1000) + PAKET_LINK_STUNDEN * 3600;
  const functionsUrl = `${Deno.env.get("SUPABASE_URL")!.replace(/\/+$/, "")}/functions/v1`;
  const link = downloadLink(functionsUrl, sessionId, ablauf, await signierePaket(sessionId, ablauf, secret));
  const gueltigBis = new Date(ablauf * 1000);

  let mail = "bereits_gesendet";
  const email = p.session.customer_details?.email ?? "";
  if (!p.pi.metadata?.bestaetigung_gesendet && email) {
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const built = buildPaketBestaetigung({
      link, gueltigBis,
      danachUrl: `https://gruenderx.de/gruendungspaket/danke?session_id=${encodeURIComponent(sessionId)}`,
      betragCent: p.session.amount_total ?? 0,
      bestellnummer: p.pi.id,
      zustimmungAm: new Date(p.session.metadata?.zustimmung_am ?? p.session.created * 1000),
    });
    const res = await sendMail({ to: email, built, campaign: "gruendungspaket-kauf", db });
    if (res.ok) {
      await stripe.paymentIntents.update(p.pi.id, { metadata: { bestaetigung_gesendet: new Date().toISOString() } });
      mail = "gesendet";
    } else {
      // Kein stiller Erfolg: Seite zeigt den Link trotzdem, Mail wird beim nächsten Aufruf erneut versucht.
      console.error(`❌ paket-download: Bestätigungsmail an ${email} fehlgeschlagen: ${res.reason}`);
      mail = "fehlgeschlagen";
    }
  }
  return json({ link, gueltigBis: gueltigBis.toISOString(), mail });
});
