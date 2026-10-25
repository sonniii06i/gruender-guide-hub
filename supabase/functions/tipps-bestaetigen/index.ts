// ===================================================================
// tipps-bestaetigen — Schritt 2 des Double-Opt-in der Tipps-Strecke.
//
// GET ?e=<adresse>&t=<tool-slug>&s=<signatur>
//   -> prüft die Signatur, setzt bestaetigt_am (einmalig)
//   -> 302 auf /tipps-bestaetigt
// Die erste Strecken-Mail verschickt der nächste Lauf von send-tipps-strecke.
// Nur Zeilen, die tipps-anfordern angelegt hat, werden bestätigt: ohne
// gespeicherte Einwilligungsversion keine Einwilligung.
// ===================================================================
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { EMAIL_RE, SITE, normalisiere, tippsSecret, tippsSignaturGueltig } from "../_shared/tippsStrecke.ts";

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${title} · GründerX</title></head>
<body style="margin:0;background:#f4f6fb;font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1f2937">
<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:32px;box-shadow:0 2px 14px rgba(15,23,42,.07)">
  <div style="font:800 20px/1 inherit;color:#0c2a6e">GründerX</div>
  <h1 style="font-size:21px;margin:22px 0 10px">${title}</h1>
  <div style="color:#4b5563">${body}</div>
  <p style="margin-top:26px"><a href="${SITE}/gratis-tools" style="color:#256af4;font-weight:600">Zu den Gratis-Tools</a></p>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const email = normalisiere(url.searchParams.get("e") || "");
  const sig = (url.searchParams.get("s") || "").trim();

  const secret = tippsSecret();
  if (!secret) {
    console.error("❌ tipps-bestaetigen: kein Secret gesetzt");
    return page("Das hat gerade nicht geklappt", "Bitte versuch es in ein paar Minuten noch einmal.", 500);
  }
  if (!EMAIL_RE.test(email) || !sig) {
    return page("Link unvollständig", "Der Bestätigungslink war nicht vollständig. Kopier ihn bitte komplett aus der Mail.", 400);
  }
  if (!(await tippsSignaturGueltig(email, sig, secret))) {
    return page("Link ungültig", "Dieser Link gehört nicht zu dieser Adresse.", 400);
  }

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db.from("tipps_abo").select("id, bestaetigt_am").eq("email", email).maybeSingle();
  if (error) {
    console.error("❌ tipps-bestaetigen lesen:", error.message);
    return page("Das hat gerade nicht geklappt", "Bitte versuch es in ein paar Minuten noch einmal.", 500);
  }
  if (!data) {
    return page("Anfrage abgelaufen",
      "Zu dieser Adresse liegt keine offene Anfrage (mehr) vor. Unbestätigte Anfragen löschen wir nach 30 Tagen.", 404);
  }
  if (!data.bestaetigt_am) {
    const { error: upErr } = await db.from("tipps_abo").update({ bestaetigt_am: new Date().toISOString() }).eq("id", data.id);
    if (upErr) {
      console.error("❌ tipps-bestaetigen speichern:", upErr.message);
      return page("Das hat gerade nicht geklappt", "Bitte klick den Link in ein paar Minuten noch einmal.", 500);
    }
  }
  return new Response(null, { status: 302, headers: { Location: `${SITE}/tipps-bestaetigt`, "Cache-Control": "no-store" } });
});
