// ===================================================================
// mail-webhook — nimmt Zustell-, Oeffnungs- und Klickereignisse von
// Resend entgegen und schreibt sie nach mail_events.
//
// Ohne diese Funktion bleibt in mail_events nur "sent" stehen, und die
// Auswertung kann nur zaehlen, was rausging — nicht, was ankam.
//
// EINRICHTUNG, beides noetig, sonst kommt nichts an:
//   1. Resend → Domain → Open Tracking und Click Tracking einschalten.
//      Ohne das sendet Resend die Ereignisse gar nicht erst.
//   2. Resend → Webhooks → Endpoint auf
//      https://<projekt>.supabase.co/functions/v1/mail-webhook
//      Ereignisse: email.delivered, email.opened, email.clicked,
//      email.bounced, email.complained
//      Das dort angezeigte Signing Secret als RESEND_WEBHOOK_SECRET setzen.
//
// Die Funktion muss OHNE JWT erreichbar sein (Resend schickt keins) —
// in config.toml steht dafuer verify_jwt = false. Die Echtheit haengt
// deshalb allein an der Signatur unten.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, svix-id, svix-timestamp, svix-signature",
};

/**
 * Prueft die Svix-Signatur, mit der Resend seine Webhooks unterschreibt.
 *
 * Warum ueberhaupt: Der Endpunkt ist oeffentlich erreichbar. Ohne
 * Pruefung koennte jeder beliebige Ereignisse einkippen und damit die
 * Auswertung faelschen — eine A/B-Entscheidung liesse sich von aussen
 * steuern.
 *
 * Der Zeitstempel wird mitgeprueft: Eine einmal mitgeschnittene, gueltig
 * signierte Nachricht soll nicht Monate spaeter erneut zaehlen.
 */
async function signaturGueltig(
  secret: string, id: string, ts: string, sig: string, body: string,
): Promise<boolean> {
  if (!id || !ts || !sig) return false;

  const alter = Math.abs(Date.now() / 1000 - Number(ts));
  if (!Number.isFinite(alter) || alter > 300) return false;   // 5 Minuten

  // Das Secret kommt als "whsec_<base64>".
  const roh = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const key = await crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(roh), (c) => c.charCodeAt(0)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${ts}.${body}`));
  const erwartet = btoa(String.fromCharCode(...new Uint8Array(mac)));

  // Der Header kann mehrere Signaturen tragen ("v1,aaa v1,bbb"), etwa
  // waehrend eines Secret-Wechsels. Eine gueltige genuegt.
  return sig.split(" ").some((teil) => {
    const wert = teil.includes(",") ? teil.split(",")[1] : teil;
    return zeitgleich(wert, erwartet);
  });
}

/** Vergleich ohne fruehen Abbruch — ein Vergleich mit === verraet ueber
 *  die Laufzeit, wie viele Zeichen stimmten. */
function zeitgleich(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** "email.opened" -> "opened" */
const kurz = (typ: string) => String(typ || "").split(".").pop() ?? "";

/** Resend liefert Tags mal als Objekt, mal als Liste von Paaren. */
// deno-lint-ignore no-explicit-any
function tag(data: any, name: string): string | null {
  const t = data?.tags;
  if (!t) return null;
  if (Array.isArray(t)) {
    const f = t.find((x) => x?.name === name);
    return f?.value ?? null;
  }
  return t[name] ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const secret = Deno.env.get("RESEND_WEBHOOK_SECRET");
  const body = await req.text();

  if (secret) {
    const ok = await signaturGueltig(
      secret,
      req.headers.get("svix-id") ?? "",
      req.headers.get("svix-timestamp") ?? "",
      req.headers.get("svix-signature") ?? "",
      body,
    );
    if (!ok) {
      console.warn("[mail-webhook] Signatur ungueltig — verworfen");
      return new Response("invalid signature", { status: 401, headers: corsHeaders });
    }
  } else {
    // Bewusst nur eine Warnung: Ein fehlendes Secret soll die
    // Einrichtung nicht blockieren, aber es darf nicht unbemerkt bleiben.
    console.warn("[mail-webhook] RESEND_WEBHOOK_SECRET fehlt — Ereignisse werden UNGEPRUEFT uebernommen");
  }

  // deno-lint-ignore no-explicit-any
  let payload: any;
  try { payload = JSON.parse(body); } catch { return new Response("bad json", { status: 400, headers: corsHeaders }); }

  const event = kurz(payload?.type);
  const data = payload?.data ?? {};
  const email_id = data?.email_id ?? data?.id ?? null;
  const recipient = Array.isArray(data?.to) ? data.to[0] : (data?.to ?? "");

  if (!event || !recipient) {
    return new Response(JSON.stringify({ ignoriert: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const db = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // Marke, Kampagne und Variante stehen in den Tags, die mailSend.ts
  // mitgeschickt hat. Fehlen sie, stammt die Mail aus einer Funktion,
  // die noch direkt bei Resend anklopft — dann bleibt das Ereignis
  // erhalten, aber als "unbekannt" auffindbar statt still verworfen.
  const row = {
    email_id,
    brand: tag(data, "brand") ?? "unbekannt",
    campaign: tag(data, "campaign") ?? "unbekannt",
    variant: tag(data, "variant") ?? "a",
    recipient,
    event,
    subject: data?.subject ?? null,
    link: data?.click?.link ?? null,
    occurred_at: payload?.created_at ?? new Date().toISOString(),
  };

  const { error } = await db.from("mail_events").insert(row);

  // 23505 = der Eindeutigkeitsschutz hat zugeschlagen: dasselbe Ereignis
  // kam ein zweites Mal. Das ist der Normalfall bei Resend-Wiederholungen
  // und beim mehrfachen Laden des Zaehlpixels, kein Fehler.
  if (error && error.code !== "23505") {
    console.error("[mail-webhook] insert:", error.message);
    // 500 damit Resend es erneut versucht.
    return new Response("db error", { status: 500, headers: corsHeaders });
  }

  // Wer sich ueber den Mailclient abmeldet, meldet sich wirklich ab.
  if (event === "complained" || event === "unsubscribed") {
    await db.from("mail_optouts").upsert(
      { email: String(recipient).toLowerCase(), reason: event },
      { onConflict: "email" },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
