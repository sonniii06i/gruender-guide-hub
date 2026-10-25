// ===================================================================
// send-chancen-alarm — Wochenmail des Chancen-Alarms (montags per pg_cron,
// siehe supabase/sql/chancen-alarm-aktivieren.sql).
// Aufruf: POST mit Header x-cron-secret (CART_CRON_SECRET, wie send-tipps-strecke).
// ?trocken=1 baut alles, versendet und stempelt aber nichts.
//
// REGELN
// 1. NUR BESTÄTIGTE, NICHT BEENDETE ZEILEN (Double-Opt-in).
// 2. HÖCHSTENS EINE MAIL JE 6 TAGE und Adresse – ein doppelter Cron-Lauf schickt nichts doppelt.
// 3. NICHTS NEUES UND KEINE LETZTE CHANCE → KEINE MAIL (gezählt als „leer“).
// 4. QUELLE NICHT LESBAR → LAUF ABGEBROCHEN, nichts versendet (ein Ausfall ist kein „nichts Neues“).
// 5. MERKER (gesendet, letzter_alarm_am) ERST NACH BESTÄTIGTEM VERSAND.
// 6. OHNE ABMELDELINK KEIN VERSAND; abgemeldete Adressen beenden die Zeile.
// ===================================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { abTestStrecke, sendCampaign } from "../_shared/mailSend.ts";
import { unsubscribeUrl } from "../_shared/unsubscribe.ts";
import { auswahl, buildAlarmMail, ladeChancen } from "../_shared/chancenAlarm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-cron-secret",
};
const ABSTAND_MS = 6 * 24 * 3600_000;
/** Gemerkte IDs je Adresse begrenzen (älteste fallen raus, sind dann längst vorbei). */
const MAX_GEMERKT = 1500;

type Zeile = {
  id: string; email: string; arten: string[]; region: string; ohne_nur_frauen: boolean;
  gesendet: string[] | null; letzter_alarm_am: string | null;
};

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const secret = Deno.env.get("CART_CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) return new Response("unauthorized", { status: 401, headers: corsHeaders });
  const trocken = new URL(req.url).searchParams.get("trocken") === "1";

  const chancen = await ladeChancen();
  if (!chancen) {
    console.error("[chancen-alarm] gruender-chancen.json nicht lesbar – Lauf abgebrochen, nichts versendet");
    return json({ error: "quelle" }, 502);
  }

  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  const FUNKTIONEN = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;
  const { data, error } = await db.from("chancen_abo")
    .select("id, email, arten, region, ohne_nur_frauen, gesendet, letzter_alarm_am")
    .not("bestaetigt_am", "is", null)
    .is("beendet_am", null)
    .order("bestaetigt_am", { ascending: true })
    .limit(2000);
  if (error) {
    console.error("[chancen-alarm] Abfrage:", error.message);
    return json({ error: error.message }, 500);
  }

  const heute = new Date().toISOString().slice(0, 10);
  const zaehler = { geprueft: (data ?? []).length, versendet: 0, leer: 0, zu_frueh: 0, abgemeldet: 0, fehler: 0, chancen: chancen.length, trocken };
  for (const z of (data ?? []) as Zeile[]) {
    if (z.letzter_alarm_am && Date.now() - new Date(z.letzter_alarm_am).getTime() < ABSTAND_MS) { zaehler.zu_frueh++; continue; }
    const gesendet = z.gesendet ?? [];
    const { neu, mehrNeu, letzteChance, alleNeuIds } = auswahl(chancen, { ...z, gesendet }, heute);
    if (!neu.length && !letzteChance.length) { zaehler.leer++; continue; }

    const abmelden = await unsubscribeUrl(z.email, FUNKTIONEN);
    if (!abmelden) { console.error("[chancen-alarm] UNSUBSCRIBE_SECRET fehlt – kein Versand"); zaehler.fehler++; continue; }
    const built = buildAlarmMail({ neu, mehrNeu, letzteChance, unsubscribeUrl: abmelden });
    if (trocken) { zaehler.versendet++; continue; }

    const res = await sendCampaign({ to: z.email, built, campaign: "chancen-alarm", variant: abTestStrecke(z.email, "chancen"), db, unsubscribeUrl: abmelden });
    if (res.ok) {
      const merken = [...new Set([...gesendet, ...alleNeuIds])].slice(-MAX_GEMERKT);
      const { error: upErr } = await db.from("chancen_abo").update({ gesendet: merken, letzter_alarm_am: new Date().toISOString() }).eq("id", z.id);
      if (upErr) console.error(`[chancen-alarm] Merker NICHT gesetzt für ${z.id}: ${upErr.message}`);
      zaehler.versendet++;
    } else if (res.reason === "optout") {
      await db.from("chancen_abo").update({ beendet_am: new Date().toISOString(), beendet_grund: "abgemeldet" }).eq("id", z.id);
      zaehler.abgemeldet++;
    } else {
      console.error(`[chancen-alarm] ${z.id}: ${res.reason} ${res.detail ?? ""}`);
      zaehler.fehler++;
    }
  }
  console.log("[chancen-alarm]", JSON.stringify(zaehler));
  return json(zaehler);
});
