// ===================================================================
// vertrag-widerrufen — Widerrufsfunktion nach § 356a BGB (seit 19.06.2026
// Pflicht bei Online-Fernabsatzverträgen; gilt für Abo UND Gründungspaket).
//
// POST { name, email, vertrag: "abo"|"gruendungspaket"|"sonstiges",
//        bestellnummer?, kaufdatum?, website? }
//   -> Eingangsbestätigung an den Verbraucher (Vertrag, Datum/Uhrzeit,
//      § 356a Abs. 4 BGB) – ohne Freitext, neutraler Betreff
//   -> interne Mail an support@gruenderx.de mit allen Angaben inkl. Name
//   <- { ok, eingang }
//
// Missbrauchsschutz (Security-Review 26.10.2026, siehe _shared/widerruf.ts):
// Limits je Adresse (ohne Plus-Anhang), je IP-Hash und global werden in
// mail_events gezählt (dauerhaft, keine Migration). Kann die Tabelle nicht
// gelesen werden, wird NICHT gesendet (503) – die Seite verweist dann auf
// support@; rechtzeitig ist ein Widerruf, der vor Fristende abgeschickt wird.
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import { buildWiderrufEingang } from "../_shared/paketMail.ts";
import {
  LIMIT_ADRESSE_TAG, LIMIT_GLOBAL_STUNDE, LIMIT_IP_STUNDE, VERTRAGSARTEN, ipSchluessel, limitAdresse, pruefeWiderruf,
} from "../_shared/widerruf.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const SUPPORT = "support@gruenderx.de";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof b.website === "string" && b.website.trim()) return json({ ok: true });

  const p = pruefeWiderruf(b);
  if (!p.ok) return json({ error: "angaben", feld: p.feld }, 400);
  const d = p.daten;

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unbekannt";
  const ipKey = await ipSchluessel(ip);
  const adrKey = limitAdresse(d.email);
  const seit = (ms: number) => new Date(Date.now() - ms).toISOString();
  const zaehle = async (recipient: string | null, ms: number) => {
    let q = db.from("mail_events").select("id", { count: "exact", head: true })
      .eq("campaign", "widerruf-anfrage").gte("occurred_at", seit(ms));
    if (recipient) q = q.eq("recipient", recipient);
    const { count, error } = await q;
    return error ? null : (count ?? 0);
  };
  const [nAdr, nIp, nGlobal] = await Promise.all([zaehle(adrKey, 86400_000), zaehle(ipKey, 3600_000), zaehle(null, 3600_000)]);
  if (nAdr === null || nIp === null || nGlobal === null) {
    console.error("❌ vertrag-widerrufen: mail_events nicht lesbar – kein Versand");
    return json({ ok: false, error: "nicht_verfuegbar" }, 503);
  }
  // Limit-Zähler: je Anfrage zwei Zeilen (Adresse, IP); global zählt die Adress-Zeilen.
  if (nAdr >= LIMIT_ADRESSE_TAG || nIp >= LIMIT_IP_STUNDE || nGlobal / 2 >= LIMIT_GLOBAL_STUNDE) {
    return json({ ok: false, error: "zu_viele" }, 429);
  }
  const jetzt = new Date();
  const zeile = (recipient: string) => ({
    brand: "gruenderx", campaign: "widerruf-anfrage", variant: "a", recipient, event: "anfrage", occurred_at: jetzt.toISOString(),
  });
  const { error: insErr } = await db.from("mail_events").insert([zeile(adrKey), zeile(ipKey)]);
  if (insErr) {
    console.error("❌ vertrag-widerrufen: Limit-Zeile nicht geschrieben – kein Versand:", insErr.message);
    return json({ ok: false, error: "nicht_verfuegbar" }, 503);
  }

  const vertragText = VERTRAGSARTEN[d.vertrag];
  const kunde = await sendMail({
    to: d.email, campaign: "widerruf-eingang", db,
    built: buildWiderrufEingang({ vertrag: vertragText, bestellnummer: d.bestellnummer, kaufdatum: d.kaufdatum, eingang: jetzt }),
  });
  const intern = await sendMail({
    to: SUPPORT, campaign: "widerruf-intern", db, replyTo: d.email,
    built: buildWiderrufEingang({
      vertrag: vertragText, bestellnummer: d.bestellnummer, kaufdatum: d.kaufdatum, eingang: jetzt,
      intern: { name: d.name, email: d.email },
    }),
  });
  if (!kunde.ok) {
    console.error(`❌ vertrag-widerrufen: Eingangsbestätigung fehlgeschlagen (${kunde.reason}); intern ${intern.ok}`);
    return json({ ok: false, error: "mail", intern: intern.ok }, 502);
  }
  return json({ ok: true, eingang: jetzt.toISOString(), intern: intern.ok });
});
