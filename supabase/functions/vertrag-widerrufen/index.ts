// ===================================================================
// vertrag-widerrufen — Widerrufsfunktion nach § 356a BGB (seit 19.06.2026
// Pflicht bei Online-Fernabsatzverträgen; gilt für Abo UND Gründungspaket).
//
// POST { name, email, vertrag: "abo"|"gruendungspaket"|"sonstiges",
//        bestellnummer?, kaufdatum?, website? }
//   1. Widerruf IMMER annehmen: Beleg in mail_events (campaign
//      "widerruf-beleg", event "widerruf") und interne Mail an support@ –
//      ohne jedes Limit (Security-Review 2, 26.10.2026).
//   2. Limit-Zeilen eintragen (Adresse ohne Plus-Anhang, IP-Hash), DANACH
//      zählen (eigene Zeile inklusive) -> kein TOCTOU, keine Migration.
//   3. Eingangsbestätigung an den Verbraucher (§ 356a Abs. 4 BGB) nur, wenn
//      die Zähler im Limit sind; ohne Freitext, neutraler Betreff.
//   <- { ok: true, eingang, bestaetigung: "gesendet"|"gedrosselt"|"fehlgeschlagen" }
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import { buildWiderrufEingang } from "../_shared/paketMail.ts";
import { VERTRAGSARTEN, bestaetigungErlaubt, clientIp, ipSchluessel, limitAdresse, pruefeWiderruf } from "../_shared/widerruf.ts";

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
  const jetzt = new Date();
  const vertragText = VERTRAGSARTEN[d.vertrag];
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const { ip, quelle } = clientIp(req.headers);
  console.log(`[widerruf] ip-quelle ${quelle}`);
  const ipKey = await ipSchluessel(ip);
  const adrKey = limitAdresse(d.email);

  // 1) Annahme – nie gedrosselt.
  const beleg = {
    brand: "gruenderx", campaign: "widerruf-beleg", variant: "a", recipient: d.email, event: "widerruf",
    subject: [vertragText, d.bestellnummer ?? "", d.kaufdatum ?? "", d.name].join(" | ").slice(0, 400),
    occurred_at: jetzt.toISOString(),
  };
  const { error: belegErr } = await db.from("mail_events").insert(beleg);
  if (belegErr) console.error("❌ vertrag-widerrufen: Beleg nicht gespeichert (Mail an support@ ist der Beleg):", belegErr.message);
  const intern = await sendMail({
    to: SUPPORT, campaign: "widerruf-intern", db, replyTo: d.email,
    built: buildWiderrufEingang({
      vertrag: vertragText, bestellnummer: d.bestellnummer, kaufdatum: d.kaufdatum, eingang: jetzt,
      intern: { name: d.name, email: d.email },
    }),
  });
  if (!intern.ok) console.error(`❌ vertrag-widerrufen: interne Mail fehlgeschlagen (${intern.reason})`);
  if (!intern.ok && belegErr) {
    // Nirgends festgehalten -> nicht „ok“ melden; die Seite verweist auf support@ (rechtzeitig = vor Fristende abgeschickt).
    return json({ ok: false, error: "nicht_gespeichert" }, 502);
  }

  // 2) Limit-Zeilen eintragen, dann zählen (inkl. eigener Zeile).
  const zeile = (recipient: string) => ({
    brand: "gruenderx", campaign: "widerruf-anfrage", variant: "a", recipient, event: "anfrage", occurred_at: jetzt.toISOString(),
  });
  const { error: limErr } = await db.from("mail_events").insert([zeile(adrKey), zeile(ipKey)]);
  const seit = (ms: number) => new Date(jetzt.getTime() - ms).toISOString();
  const zaehle = async (recipient: string | null, ms: number) => {
    if (limErr) return null;
    let q = db.from("mail_events").select("id", { count: "exact", head: true })
      .eq("campaign", "widerruf-anfrage").gte("occurred_at", seit(ms));
    q = recipient ? q.eq("recipient", recipient) : q.like("recipient", "ip:%");   // global: eine IP-Zeile je Anfrage
    const { count, error } = await q;
    return error ? null : (count ?? 0);
  };
  const [nAdr, nIp, nGlobal] = await Promise.all([zaehle(adrKey, 86400_000), zaehle(ipKey, 3600_000), zaehle(null, 3600_000)]);
  if (nAdr === null || nIp === null || nGlobal === null) console.error("❌ vertrag-widerrufen: Limit-Zähler nicht lesbar – Bestätigung wird trotzdem gesendet");

  // 3) Bestätigung an den Verbraucher – die einzige gedrosselte Mail.
  let bestaetigung: "gesendet" | "gedrosselt" | "fehlgeschlagen" = "gedrosselt";
  if (bestaetigungErlaubt(nAdr, nIp, nGlobal)) {
    const kunde = await sendMail({
      to: d.email, campaign: "widerruf-eingang", db,
      built: buildWiderrufEingang({ vertrag: vertragText, bestellnummer: d.bestellnummer, kaufdatum: d.kaufdatum, eingang: jetzt }),
    });
    bestaetigung = kunde.ok ? "gesendet" : "fehlgeschlagen";
    if (!kunde.ok) console.error(`❌ vertrag-widerrufen: Eingangsbestätigung fehlgeschlagen (${kunde.reason})`);
  } else {
    console.warn(`[widerruf] Bestätigung gedrosselt (Adresse ${nAdr}, IP ${nIp}, global ${nGlobal}); Widerruf angenommen`);
  }
  return json({ ok: true, eingang: jetzt.toISOString(), bestaetigung, intern: intern.ok });
});
