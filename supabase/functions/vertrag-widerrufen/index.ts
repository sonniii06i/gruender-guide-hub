// ===================================================================
// vertrag-widerrufen — Widerrufsfunktion nach § 356a BGB (seit 19.06.2026
// Pflicht bei Online-Fernabsatzverträgen; gilt für Abo UND Gründungspaket).
//
// POST { name, email, vertrag: "abo"|"gruendungspaket"|"sonstiges",
//        bestellnummer?, kaufdatum?, website? }
//   1. Widerruf IMMER annehmen: Beleg in mail_events (campaign
//      "widerruf-beleg", event "widerruf") und interne Mail an support@ –
//      ohne jedes Limit (Security-Review 2, 26.10.2026).
//   2. Stufe 1: Limit-Zeilen (Adresse ohne Plus-Anhang, IP-Hash) eintragen,
//      DANACH zählen (eigene inklusive) -> kein TOCTOU, keine Migration.
//   3. Stufe 2: globalen Sende-Slot reservieren und zählen; Slot wird gelöscht,
//      wenn gedrosselt oder Versand scheitert -> Deckel zählt nur echte Mails.
//   4. Eingangsbestätigung (§ 356a Abs. 4 BGB) nur bei beiden Stufen grün;
//      Zähler unlesbar = gedrosselt (fail-closed nur für diese Mail, Review 3).
//   IP: nur aus WIDERRUF_IP_HEADER (gemessen vertrauenswürdig), sonst „unbekannt“.
//   <- { ok: true, eingang, bestaetigung: "gesendet"|"gedrosselt"|"fehlgeschlagen" }
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMail } from "../_shared/mailSend.ts";
import { buildWiderrufEingang } from "../_shared/paketMail.ts";
import {
  VERTRAGSARTEN, bestaetigungErlaubt, clientIp, globalErlaubt, ipProbe, ipSchluessel, limitAdresse, pruefeWiderruf,
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
  const jetzt = new Date();
  const vertragText = VERTRAGSARTEN[d.vertrag];
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const { ip, quelle } = clientIp(req.headers, Deno.env.get("WIDERRUF_IP_HEADER"));
  console.log(`[widerruf] ip-quelle ${quelle}`);
  // Messprobe (Redeploy-Skript): Wert 198.51.100.77 in allen Kandidaten-Headern mitschicken und hier
  // ablesen, welcher Header vom Gateway überschrieben wird („anders“). Loggt keine IPs.
  if (req.headers.get("x-widerruf-ip-probe") === "1") console.log(`[widerruf] ip-probe ${ipProbe(req.headers, "198.51.100.77")}`);
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

  // 2) Stufe 1: Limit-Zeilen (Adresse, IP) eintragen, DANN zählen (eigene inklusive).
  //    Fail-closed: nicht schreib-/lesbar -> Kundenmail gedrosselt (Widerruf ist schon gespeichert).
  const iso = jetzt.toISOString();
  const seit = (ms: number) => new Date(jetzt.getTime() - ms).toISOString();
  const zeile = (campaign: string, recipient: string) => ({ brand: "gruenderx", campaign, variant: "a", recipient, event: "anfrage", occurred_at: iso });
  const { error: limErr } = await db.from("mail_events").insert([zeile("widerruf-anfrage", adrKey), zeile("widerruf-anfrage", ipKey)]);
  const zaehle = async (campaign: string, recipient: string, ms: number) => {
    if (limErr) return null;
    const { count, error } = await db.from("mail_events").select("id", { count: "exact", head: true })
      .eq("campaign", campaign).eq("recipient", recipient).gte("occurred_at", seit(ms));
    return error ? null : (count ?? 0);
  };
  const [nAdr, nIp] = await Promise.all([zaehle("widerruf-anfrage", adrKey, 86400_000), zaehle("widerruf-anfrage", ipKey, 3600_000)]);

  let bestaetigung: "gesendet" | "gedrosselt" | "fehlgeschlagen" = "gedrosselt";
  let grund = "";
  if (!bestaetigungErlaubt(nAdr, nIp)) {
    grund = nAdr === null || nIp === null ? "zaehler-fehler" : "adresse-oder-ip";
  } else {
    // 3) Stufe 2 (global): Sende-Slot reservieren, zählen; über Deckel -> Slot wieder löschen.
    const { data: slot, error: slotErr } = await db.from("mail_events")
      .insert(zeile("widerruf-sendeslot", "global")).select("id").single();
    const nSlots = slotErr ? null : await zaehle("widerruf-sendeslot", "global", 3600_000);
    const slotFreigeben = async () => { if (slot?.id) await db.from("mail_events").delete().eq("id", slot.id); };
    if (!globalErlaubt(nSlots)) {
      grund = nSlots === null ? "zaehler-fehler" : "global";
      await slotFreigeben();
    } else {
      const kunde = await sendMail({
        to: d.email, campaign: "widerruf-eingang", db,
        built: buildWiderrufEingang({ vertrag: vertragText, bestellnummer: d.bestellnummer, kaufdatum: d.kaufdatum, eingang: jetzt }),
      });
      bestaetigung = kunde.ok ? "gesendet" : "fehlgeschlagen";
      if (!kunde.ok) { await slotFreigeben(); console.error(`❌ vertrag-widerrufen: Eingangsbestätigung fehlgeschlagen (${kunde.reason})`); }
    }
  }
  if (bestaetigung === "gedrosselt") console.warn(`[widerruf] Bestätigung gedrosselt (${grund}); Widerruf angenommen und an support@`);
  return json({ ok: true, eingang: jetzt.toISOString(), bestaetigung, intern: intern.ok });
});
