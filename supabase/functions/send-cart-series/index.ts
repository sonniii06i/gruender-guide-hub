// ===================================================================
// send-cart-series — faehrt die dreistufige Warenkorbstrecke.
//
// Laeuft als Cron, stuendlich. Sucht offene Vorgaenge in cart_abandons
// und verschickt je Vorgang genau die Stufe, die faellig ist.
//
// Aufruf: POST mit dem Header x-cron-secret (Wert aus CART_CRON_SECRET).
//
// -------------------------------------------------------------------
// DIE REGELN, IN DER REIHENFOLGE IHRER WICHTIGKEIT
// -------------------------------------------------------------------
//
// 1. WER GEKAUFT HAT, BEKOMMT NICHTS. `gekauft_at` wird vom
//    Erfolgs-Webhook gesetzt und hier zuerst geprueft. Eine
//    "Du hast etwas vergessen"-Mail an jemanden, der bezahlt hat, ist
//    der teuerste Fehler dieser Strecke.
//
// 2. NUR EINE STUFE JE LAUF UND VORGANG. Laeuft der Cron nach einer
//    Stoerung mit Verspaetung, sind unter Umstaenden alle drei Stufen
//    "faellig". Drei Mails auf einmal sind eine Beschwerde, keine
//    Kampagne — es geht die hoechste faellige Stufe raus, der Rest
//    verfaellt.
//
// 3. DER MERKER WIRD ERST NACH BESTAETIGTEM VERSAND GESETZT. Am
//    10.09.2026 bekamen fuenf ArbitrageX-Kunden den Merker ohne Mail,
//    weil der Versand im Daemon-Thread lief und das Skript vorher
//    endete. Hier wird deshalb auf das Ergebnis gewartet, und nur ein
//    ok:true setzt den Zeitstempel.
//
// 4. EINE VARIANTE FUER DIE GANZE STRECKE. Wuerfelte jede Stufe neu,
//    laese derselbe Mensch erst Variante A, dann B — und die Auswertung
//    misst nichts mehr. Die Variante steht in der Zeile.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { buildCartHelp, buildCartObjections, buildCartLast } from "../_shared/campaigns.ts";
import { sendCampaign, abTestStrecke } from "../_shared/mailSend.ts";
import { BRANDING } from "../_shared/mailBrand.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-cron-secret",
};

/** Ab wann welche Stufe faellig ist, in Stunden nach dem Abbruch. */
const STUFEN = [
  { nr: 1, ab: 1, spalte: "stufe1_at", campaign: "cart1", build: buildCartHelp },
  { nr: 2, ab: 24, spalte: "stufe2_at", campaign: "cart2", build: buildCartObjections },
  { nr: 3, ab: 72, spalte: "stufe3_at", campaign: "cart3", build: buildCartLast },
] as const;

/** Aelter als das ist der Warenkorb tot — dann lieber gar nicht mehr. */
const MAX_STUNDEN = 120;

type Zeile = {
  id: string; email: string; name: string | null;
  produkt: string | null; intervall: string | null; weiter_url: string | null;
  created_at: string; variant: string;
  stufe1_at: string | null; stufe2_at: string | null; stufe3_at: string | null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const secret = Deno.env.get("CART_CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) {
    return new Response("unauthorized", { status: 401, headers: corsHeaders });
  }

  const db = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const basis = Deno.env.get("PUBLIC_BASE_URL") ?? BRANDING.url;

  const { data, error } = await db
    .from("cart_abandons")
    .select("*")
    .is("gekauft_at", null)
    .gte("created_at", new Date(Date.now() - MAX_STUNDEN * 3600_000).toISOString())
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[cart-series] Abfrage:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const zeilen = (data ?? []) as Zeile[];
  let versendet = 0, uebersprungen = 0, fehler = 0;

  for (const z of zeilen) {
    const alterStunden = (Date.now() - new Date(z.created_at).getTime()) / 3600_000;

    // Hoechste faellige Stufe, die noch nicht raus ist. Rueckwaerts, damit
    // ein verspaeteter Lauf nicht drei Mails nachholt (Regel 2).
    const faellig = [...STUFEN].reverse().find((s) =>
      alterStunden >= s.ab && !z[s.spalte as keyof Zeile]
    );
    if (!faellig) { uebersprungen++; continue; }

    // Die Variante steht in der Zeile; fehlt sie (Altbestand), wird sie
    // hier einmal deterministisch gezogen.
    const variant = z.variant ?? abTestStrecke(z.email, "cart");

    const built = faellig.build({
      // Beide Marken nehmen unterschiedliche Felder entgegen; was die
      // jeweilige Fassung nicht kennt, ignoriert sie.
      // deno-lint-ignore no-explicit-any
      ...({
        name: z.name,
        produkt: z.produkt ?? undefined,
        intervall: z.intervall ?? undefined,
        yearly: z.intervall === "year",
        baseUrl: basis,
        variant,
        unsubscribeUrl: `${basis}/abmelden?e=${encodeURIComponent(z.email)}`,
      } as any),
    });

    const res = await sendCampaign({
      to: z.email, built, campaign: faellig.campaign, variant, db,
      unsubscribeUrl: `${basis}/abmelden?e=${encodeURIComponent(z.email)}`,
    });

    if (res.ok) {
      // Merker ERST JETZT (Regel 3).
      const { error: upErr } = await db.from("cart_abandons")
        .update({ [faellig.spalte]: new Date().toISOString(), variant })
        .eq("id", z.id);
      if (upErr) {
        // Die Mail ist raus, der Merker fehlt — beim naechsten Lauf
        // ginge sie erneut raus. Laut protokollieren, damit das auffaellt.
        console.error(`[cart-series] Merker NICHT gesetzt fuer ${z.id}: ${upErr.message}`);
      }
      versendet++;
    } else if (res.reason === "optout") {
      // Abgemeldet: Stufe als erledigt markieren, damit der Vorgang
      // nicht bei jedem Lauf erneut geprueft wird.
      await db.from("cart_abandons")
        .update({ [faellig.spalte]: new Date().toISOString() }).eq("id", z.id);
      uebersprungen++;
    } else {
      console.error(`[cart-series] ${z.email} Stufe ${faellig.nr}: ${res.reason} ${res.detail ?? ""}`);
      fehler++;
    }
  }

  const bericht = { geprueft: zeilen.length, versendet, uebersprungen, fehler };
  console.log("[cart-series]", JSON.stringify(bericht));
  return new Response(JSON.stringify(bericht), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
