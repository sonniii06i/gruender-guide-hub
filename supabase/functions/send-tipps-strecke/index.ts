// ===================================================================
// send-tipps-strecke — fährt die Tipps-Strecke (4 Mails über 9 Tage).
//
// Läuft als Cron, stündlich (erst nach Freigabe der Texte eingeschaltet).
// Aufruf: POST mit Header x-cron-secret (CART_CRON_SECRET, wie send-cart-series).
// ?trocken=1 baut alles, versendet und stempelt aber nichts.
//
// REGELN
// 1. NUR BESTÄTIGTE ZEILEN (Double-Opt-in). Ohne bestaetigt_am nichts.
// 2. KUNDEN BEKOMMEN NICHTS. Hat die Adresse ein aktives Abo, endet die
//    Strecke (beendet_grund = 'kunde').
// 3. NUR EINE STUFE JE LAUF, die höchste fällige; Verpasstes verfällt.
// 4. MERKER ERST NACH BESTÄTIGTEM VERSAND (Lehre aus cart-series 10.09.2026).
// 5. OHNE ABMELDELINK KEIN VERSAND.
// ===================================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { sendCampaign, abTestStrecke } from "../_shared/mailSend.ts";
import { unsubscribeUrl } from "../_shared/unsubscribe.ts";
import { MAX_STUNDEN, STUFEN, TOOL_STRECKE, buildTippsMail, type Strecke } from "../_shared/tippsStrecke.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-cron-secret",
};

type Zeile = {
  id: string; email: string; tool_slug: string; strecke: Strecke; variant: string | null;
  bestaetigt_am: string; stufe1_at: string | null; stufe2_at: string | null; stufe3_at: string | null; stufe4_at: string | null;
};

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const secret = Deno.env.get("CART_CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) return new Response("unauthorized", { status: 401, headers: corsHeaders });
  const trocken = new URL(req.url).searchParams.get("trocken") === "1";

  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  const FUNKTIONEN = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;

  const { data, error } = await db.from("tipps_abo")
    .select("id, email, tool_slug, strecke, variant, bestaetigt_am, stufe1_at, stufe2_at, stufe3_at, stufe4_at")
    .not("bestaetigt_am", "is", null)
    .is("beendet_am", null)
    .order("bestaetigt_am", { ascending: true })
    .limit(300);
  if (error) {
    console.error("[tipps] Abfrage:", error.message);
    return json({ error: error.message }, 500);
  }
  const zeilen = (data ?? []) as Zeile[];

  // Aktive Abos je Adresse (Regel 2): profiles.email ↔ subscriptions.user_id.
  const adressen = [...new Set(zeilen.map((z) => z.email))];
  const kunden = new Set<string>();
  if (adressen.length) {
    const { data: profile, error: pErr } = await db.from("profiles").select("id, email").in("email", adressen);
    if (pErr) {
      console.error("[tipps] Kundenabgleich nicht möglich – Lauf abgebrochen:", pErr.message);
      return json({ error: "kundenabgleich" }, 500);
    }
    const ids = (profile ?? []).map((p: { id: string }) => p.id);
    if (ids.length) {
      const { data: abos, error: aErr } = await db.from("subscriptions").select("user_id, status, comp_access").in("user_id", ids);
      if (aErr) {
        console.error("[tipps] Abo-Abgleich nicht möglich – Lauf abgebrochen:", aErr.message);
        return json({ error: "aboabgleich" }, 500);
      }
      const aktiv = new Set((abos ?? []).filter((a: { status: string; comp_access: boolean }) =>
        a.comp_access || ["active", "trialing", "past_due"].includes(a.status)).map((a: { user_id: string }) => a.user_id));
      for (const p of profile ?? []) if (aktiv.has(p.id) && p.email) kunden.add(String(p.email).toLowerCase());
    }
  }

  const zaehler = { geprueft: zeilen.length, versendet: 0, kunde: 0, abgelaufen: 0, nichts_faellig: 0, abgemeldet: 0, fehler: 0, trocken };
  const beenden = async (id: string, grund: string) => {
    if (!trocken) await db.from("tipps_abo").update({ beendet_am: new Date().toISOString(), beendet_grund: grund }).eq("id", id);
  };

  for (const z of zeilen) {
    const tool = TOOL_STRECKE[z.tool_slug];
    if (kunden.has(z.email)) { await beenden(z.id, "kunde"); zaehler.kunde++; continue; }
    const stunden = (Date.now() - new Date(z.bestaetigt_am).getTime()) / 3600_000;
    if (stunden > MAX_STUNDEN || !tool) { await beenden(z.id, tool ? "abgelaufen" : "unbekanntes_tool"); zaehler.abgelaufen++; continue; }

    const faellig = [...STUFEN].reverse().find((s) => stunden >= s.ab && !z[s.spalte as keyof Zeile]);
    if (!faellig) { zaehler.nichts_faellig++; continue; }

    const abmelden = await unsubscribeUrl(z.email, FUNKTIONEN);
    if (!abmelden) { console.error("[tipps] UNSUBSCRIBE_SECRET fehlt – kein Versand"); zaehler.fehler++; continue; }
    const variant = z.variant ?? abTestStrecke(z.email, "tipps");
    const built = buildTippsMail({ strecke: z.strecke, nr: faellig.nr, toolName: tool.name, unsubscribeUrl: abmelden });
    if (trocken) { zaehler.versendet++; continue; }

    const res = await sendCampaign({ to: z.email, built, campaign: `tipps-${z.strecke}-${faellig.nr}`, variant, db, unsubscribeUrl: abmelden });
    if (res.ok) {
      const update: Record<string, string> = { [faellig.spalte]: new Date().toISOString(), variant };
      if (faellig.nr === 4) { update.beendet_am = new Date().toISOString(); update.beendet_grund = "fertig"; }
      const { error: upErr } = await db.from("tipps_abo").update(update).eq("id", z.id);
      if (upErr) console.error(`[tipps] Merker NICHT gesetzt für ${z.id}: ${upErr.message}`);
      zaehler.versendet++;
    } else if (res.reason === "optout") {
      await beenden(z.id, "abgemeldet");
      zaehler.abgemeldet++;
    } else {
      console.error(`[tipps] ${z.id} Stufe ${faellig.nr}: ${res.reason} ${res.detail ?? ""}`);
      zaehler.fehler++;
    }
  }
  console.log("[tipps]", JSON.stringify(zaehler));
  return json(zaehler);
});
