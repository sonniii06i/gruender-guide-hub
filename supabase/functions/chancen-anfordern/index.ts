// ===================================================================
// chancen-anfordern — Schritt 1 des Double-Opt-in des Chancen-Alarms.
//
// POST { email, arten[], region, ohneNurFrauen, version, website? }  (website = Honigtopf)
//   -> legt/aktualisiert die Zeile in chancen_abo (Auswahl + Einwilligungsversion)
//   -> schickt die Bestätigungsmail mit signiertem Link
//   <- { ok: true, status: "gesendet" | "bereits_bestaetigt" | "bereits_gesendet" | "limit" }
//
// Wer schon bestätigt ist, ändert mit einer neuen Anfrage nur seine Auswahl (ohne neue Mail).
// Missbrauch wie bei tipps-anfordern: keine Nutzertexte in der Mail,
// höchstens eine Mail alle 2 Minuten und 3 am Tag je Adresse.
// ===================================================================
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import {
  ALARM_VERSION, ARTEN, EMAIL_RE, REGION_RE, alarmSecret, bestaetigungsLink, buildAlarmBestaetigung,
  normalisiere, signiereAlarm,
} from "../_shared/chancenAlarm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const MIN_ABSTAND_MS = 2 * 60 * 1000;
const MAX_MAILS_TAG = 3;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let body: { email?: string; arten?: unknown; region?: string; ohneNurFrauen?: boolean; version?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }
  const email = normalisiere(String(body.email ?? ""));
  if (!EMAIL_RE.test(email) || email.length > 320) return json({ error: "email" }, 400);
  const arten = [...new Set(Array.isArray(body.arten) ? body.arten.map(String) : [])];
  if (!arten.length || arten.some((a) => !(ARTEN as readonly string[]).includes(a))) return json({ error: "arten" }, 400);
  const region = String(body.region ?? "alle");
  if (!REGION_RE.test(region)) return json({ error: "region" }, 400);
  const ohneNurFrauen = body.ohneNurFrauen === true;
  // Nur die Textversion, die diese Function kennt, gilt als Einwilligung.
  if (String(body.version ?? "") !== ALARM_VERSION) return json({ error: "version" }, 409);
  if (body.website && String(body.website).trim()) return json({ ok: true, status: "gesendet" });

  const secret = alarmSecret();
  if (!secret) {
    console.error("❌ chancen-anfordern: weder TIPPS_SECRET noch UNSUBSCRIBE_SECRET gesetzt");
    return json({ error: "nicht_konfiguriert" }, 500);
  }
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  const { data: zeile, error: leseFehler } = await db
    .from("chancen_abo")
    .select("id, bestaetigt_am, beendet_am, letzte_mail_am, mails_heute, mails_tag")
    .eq("email", email)
    .maybeSingle();
  if (leseFehler) {
    console.error("❌ chancen-anfordern lesen:", leseFehler.message);
    return json({ error: "db" }, 500);
  }
  // Wer schon bestätigt hat, bekommt keine zweite Bestätigungsmail – nur die Auswahl wird übernommen.
  // Eine beendete Zeile (abgemeldet) wird erst mit neuem Klick wieder aktiv.
  if (zeile?.bestaetigt_am && !zeile.beendet_am) {
    await db.from("chancen_abo").update({ arten, region, ohne_nur_frauen: ohneNurFrauen }).eq("id", zeile.id);
    return json({ ok: true, status: "bereits_bestaetigt" });
  }

  const jetzt = new Date();
  const heute = jetzt.toISOString().slice(0, 10);
  const mailsHeute = zeile && zeile.mails_tag === heute ? Number(zeile.mails_heute ?? 0) : 0;

  if (!zeile) {
    const { error } = await db.from("chancen_abo").insert({
      email, arten, region, ohne_nur_frauen: ohneNurFrauen, einwilligung_version: ALARM_VERSION,
      angefordert_am: jetzt.toISOString(),
    });
    if (error) {
      console.error("❌ chancen-anfordern anlegen:", error.message);
      return json({ error: "db" }, 500);
    }
  } else {
    await db.from("chancen_abo").update({
      arten, region, ohne_nur_frauen: ohneNurFrauen, einwilligung_version: ALARM_VERSION,
      angefordert_am: jetzt.toISOString(), bestaetigt_am: null, beendet_am: null, beendet_grund: null,
    }).eq("id", zeile.id);
  }

  if (zeile?.letzte_mail_am && jetzt.getTime() - new Date(zeile.letzte_mail_am).getTime() < MIN_ABSTAND_MS) {
    return json({ ok: true, status: "bereits_gesendet" });
  }
  if (mailsHeute >= MAX_MAILS_TAG) return json({ ok: true, status: "limit" });

  const sig = await signiereAlarm(email, secret);
  const functionsUrl = `${Deno.env.get("SUPABASE_URL")!.replace(/\/+$/, "")}/functions/v1`;
  const built = buildAlarmBestaetigung({ arten, link: bestaetigungsLink(functionsUrl, email, sig) });
  const res = await sendMail({ to: email, built, campaign: "chancen-doi", db });
  if (!res.ok) {
    console.error("❌ chancen-anfordern Versand:", res.reason, res.detail ?? "");
    return json({ error: "versand" }, 502);
  }
  await db.from("chancen_abo").update({
    letzte_mail_am: jetzt.toISOString(), mails_tag: heute, mails_heute: mailsHeute + 1,
  }).eq("email", email);
  return json({ ok: true, status: "gesendet" });
});
