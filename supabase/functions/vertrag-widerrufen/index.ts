// ===================================================================
// vertrag-widerrufen — Widerrufsfunktion nach § 356a BGB (seit 19.06.2026
// Pflicht bei Online-Fernabsatzverträgen; gilt für Abo UND Gründungspaket).
//
// POST { name, email, vertrag, website? }
//   -> Eingangsbestätigung an den Verbraucher (Inhalt + Datum/Uhrzeit,
//      § 356a Abs. 4 BGB) und Kopie an support@gruenderx.de
//   <- { ok, eingang }
//
// Gespeichert wird nichts in der Datenbank: Beleg sind die beiden Mails
// (mailSend archiviert jede Mail zusätzlich im HQ). Missbrauchsbremse:
// je Instanz höchstens 3 Erklärungen je Adresse und Stunde; der Text der
// Mail ist neutral und trägt keinen frei formulierten Nutzertext außer
// Name und Vertragsangabe (beide gekürzt und escaped).
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import { buildWiderrufEingang } from "../_shared/paketMail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const SUPPORT = "support@gruenderx.de";
const bremse = new Map<string, number[]>();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof b.website === "string" && b.website.trim()) return json({ ok: true });

  const name = String(b.name ?? "").trim().slice(0, 120);
  const email = String(b.email ?? "").trim().toLowerCase().slice(0, 320);
  const vertrag = String(b.vertrag ?? "").trim().slice(0, 300);
  if (!name || !vertrag || !EMAIL_RE.test(email)) return json({ error: "angaben" }, 400);

  const jetzt = Date.now();
  const liste = (bremse.get(email) ?? []).filter((t) => jetzt - t < 3600_000);
  if (liste.length >= 3) return json({ error: "zu_viele" }, 429);
  bremse.set(email, [...liste, jetzt]);

  const eingang = new Date(jetzt);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const built = buildWiderrufEingang({ name, email, vertrag, eingang });
  const kunde = await sendMail({ to: email, built, campaign: "widerruf-eingang", db });
  const intern = await sendMail({
    to: SUPPORT, campaign: "widerruf-intern", db, replyTo: email,
    built: { ...built, subject: `Widerruf eingegangen: ${name} – ${vertrag.slice(0, 60)}` },
  });
  if (!kunde.ok) {
    console.error(`❌ vertrag-widerrufen: Eingangsbestätigung an ${email} fehlgeschlagen (${kunde.reason}); intern ${intern.ok}`);
    return json({ ok: false, error: "mail", intern: intern.ok }, 502);
  }
  return json({ ok: true, eingang: eingang.toISOString(), intern: intern.ok });
});
