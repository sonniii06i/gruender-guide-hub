// ===================================================================
// vorlage-anfordern — Schritt 1 des Double-Opt-in der Vorlagen-Bibliothek.
//
// POST { email, slug, website? }  (website = Honigtopf, bleibt leer)
//   -> legt/aktualisiert die Zeile in vorlagen_leads
//   -> schickt die Bestaetigungsmail mit signiertem Link
//   <- { ok: true, status: "gesendet" | "bereits_gesendet" | "limit" }
//
// WARUM EINE EIGENE TABELLE und nicht tool_leads: Dort steht eine Adresse,
// die jemand eingetippt hat. Hier steht eine Adresse, deren Inhaber den
// Link geklickt hat — das ist ein anderer Datensatz mit anderem Wert
// und anderer Loeschfrist (unbestaetigt 30 Tage, siehe Migration).
//
// MISSBRAUCH. Jeder kann hier fremde Adressen eintippen. Die Mail
// traegt deshalb keinen Nutzertext (nur den Titel aus dem Katalog),
// je Adresse hoechstens eine Mail alle 2 Minuten und 5 am Tag, und der
// Honigtopf faengt simple Bots ab. Fremde Slugs werden abgelehnt.
// ===================================================================
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import { vorlageTitel } from "../_shared/vorlagenKatalog.ts";
import {
  EMAIL_RE, SLUG_RE, bestaetigungsLink, buildVorlagenBestaetigung,
  normalisiere, signiereVorlagenMail, vorlagenSecret,
} from "../_shared/vorlagenMail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MIN_ABSTAND_MS = 2 * 60 * 1000;
const MAX_MAILS_TAG = 5;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  let body: { email?: string; slug?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const email = normalisiere(String(body.email ?? ""));
  const slug = String(body.slug ?? "").trim();
  if (!EMAIL_RE.test(email) || email.length > 320) return json({ error: "email" }, 400);
  if (!SLUG_RE.test(slug) || slug.length > 80) return json({ error: "slug" }, 400);
  const titel = vorlageTitel(slug);
  if (!titel) return json({ error: "unbekannte_vorlage" }, 404);

  // Honigtopf: Menschen sehen das Feld nicht. Wer es fuellt, bekommt
  // ein freundliches "ok" und sonst nichts.
  if (body.website && String(body.website).trim()) return json({ ok: true, status: "gesendet" });

  const secret = vorlagenSecret();
  if (!secret) {
    console.error("❌ vorlage-anfordern: weder VORLAGEN_SECRET noch UNSUBSCRIBE_SECRET gesetzt");
    return json({ error: "nicht_konfiguriert" }, 500);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: zeile, error: leseFehler } = await supabase
    .from("vorlagen_leads")
    .select("id, bestaetigt_am, letzte_mail_am, mails_heute, mails_tag, anfragen")
    .eq("email", email)
    .maybeSingle();
  if (leseFehler) {
    console.error("❌ vorlage-anfordern lesen:", leseFehler.message);
    return json({ error: "db" }, 500);
  }

  const jetzt = new Date();
  const heute = jetzt.toISOString().slice(0, 10);
  const mailsHeute = zeile && zeile.mails_tag === heute ? Number(zeile.mails_heute ?? 0) : 0;

  // Zeile anlegen oder Anfrage zaehlen — VOR dem Versand, damit der Lead
  // auch dann da ist, wenn SMTP gerade klemmt.
  if (!zeile) {
    const { error } = await supabase.from("vorlagen_leads").insert({
      email, erste_vorlage: slug, letzte_vorlage: slug, anfragen: 1, letzte_anfrage_am: jetzt.toISOString(),
    });
    if (error) {
      console.error("❌ vorlage-anfordern anlegen:", error.message);
      return json({ error: "db" }, 500);
    }
  } else {
    await supabase.from("vorlagen_leads").update({
      letzte_vorlage: slug, anfragen: Number(zeile.anfragen ?? 0) + 1, letzte_anfrage_am: jetzt.toISOString(),
    }).eq("id", zeile.id);
  }

  if (zeile?.letzte_mail_am && jetzt.getTime() - new Date(zeile.letzte_mail_am).getTime() < MIN_ABSTAND_MS) {
    return json({ ok: true, status: "bereits_gesendet" });
  }
  if (mailsHeute >= MAX_MAILS_TAG) {
    console.warn(`[vorlagen] Tageslimit fuer ${email} erreicht`);
    return json({ ok: true, status: "limit" });
  }

  const sig = await signiereVorlagenMail(email, secret);
  const functionsUrl = `${Deno.env.get("SUPABASE_URL")!.replace(/\/+$/, "")}/functions/v1`;
  const link = bestaetigungsLink(functionsUrl, email, slug, sig);
  const built = buildVorlagenBestaetigung({ titel, link, bereitsBestaetigt: Boolean(zeile?.bestaetigt_am) });

  const res = await sendMail({
    to: email,
    built,
    campaign: zeile?.bestaetigt_am ? "vorlage-link" : "vorlage-doi",
    db: supabase,
  });
  if (!res.ok) {
    console.error("❌ vorlage-anfordern Versand:", res.reason, res.detail ?? "");
    return json({ error: "versand" }, 502);
  }

  await supabase.from("vorlagen_leads").update({
    letzte_mail_am: jetzt.toISOString(),
    mails_tag: heute,
    mails_heute: mailsHeute + 1,
  }).eq("email", email);

  return json({ ok: true, status: "gesendet" });
});
