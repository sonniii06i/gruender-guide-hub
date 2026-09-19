// Aktivierungscode einloesen.
//
// Der Weg dahinter: Amazon liefert in Deutschland keine Abos digital aus, also
// verkauft man dort eine gedruckte Karte mit Code — so macht es auch Adobe
// ("12 Monate Subscription Karte"). Dieselben Codes taugen als Beilage,
// Gutschein oder Messegeschenk.
//
// Was hier NICHT passiert: ein Stripe-Abo anlegen. Der Code erzeugt eine Zeile
// in `external_entitlements` mit provider='code' — genau wie ein Kauf ueber
// CopeCart oder Digistore24. check-subscription liest diese Tabelle
// anbieterneutral, deshalb greift der Zugang ohne weitere Sonderfaelle und der
// Stripe-Sync raeumt ihn nicht ab.
//
// amount_cents bleibt leer: Der Umsatz ist auf der Plattform entstanden, auf
// der die Karte verkauft wurde. Wuerde hier ein Betrag stehen, meldete die
// Danke-Seite eine Conversion, die es an dieser Stelle nie gab.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/**
 * Karte -> Datenbankschluessel.
 *
 * Auf der Karte steht der Code mit Bindestrichen (ANWX-7K3M-9QP2-4HTD), weil
 * er sonst nicht abzuschreiben ist. Getippt wird er mit Leerzeichen, in
 * Kleinbuchstaben, mit oder ohne Trennung — all das muss denselben Hash
 * ergeben. Deshalb: alles ausser A-Z und 2-9 faellt weg.
 */
async function hashCode(input: string): Promise<{ hash: string; normal: string }> {
  const normal = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const bytes = new TextEncoder().encode(normal);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { hash, normal };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    // Eingeloest wird immer auf ein bestehendes Konto. Ohne Login gaebe es
    // keine E-Mail, an der der Zugang haengen koennte — und der Code waere
    // verbraucht, ohne dass jemand etwas davon haette.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Bitte zuerst anmelden." }, 401);
    const { data: userData, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (authError || !userData.user?.email) {
      return json({ error: "Bitte zuerst anmelden." }, 401);
    }
    const user = userData.user;

    const { code } = await req.json().catch(() => ({ code: "" }));
    if (typeof code !== "string" || code.trim().length < 8) {
      return json({ error: "Bitte den vollständigen Code eingeben." }, 400);
    }

    const { hash } = await hashCode(code);

    // Ein laufendes Abo darf ein Code nicht anfassen.
    //
    // Ohne diese Sperre passierte zweierlei auf einmal: `current_period_end`
    // wuerde auf heute+30 Tage gesetzt und damit ein laengeres Abo verkuerzt,
    // und `source` spraenge auf 'code' — woraufhin check-subscription Stripe
    // gar nicht mehr fragt und der zahlende Kunde nach Ablauf der 30 Tage
    // ausgesperrt waere. Der Code bleibt in diesem Fall unangetastet und
    // behaelt seinen Wert.
    const jetzt = Date.now();
    const { data: bestehend } = await supabase
      .from("subscriptions")
      .select("status, source, current_period_end, plan")
      .eq("user_id", user.id)
      .maybeSingle();
    const laeuftNoch = bestehend?.status === "active"
      && (!bestehend.current_period_end || new Date(bestehend.current_period_end).getTime() > jetzt);
    if (laeuftNoch && bestehend?.source !== "code") {
      return json({
        error: "Dein Zugang läuft bereits über ein Abo. Der Code bleibt gültig —"
          + " löse ihn ein, sobald das Abo endet.",
      }, 409);
    }

    // Beim zweiten Code haengt die Laufzeit hinten an, statt sie zu ersetzen.
    // Alles andere waere bei zwei gekauften Karten ein stiller Verlust.
    const basis = laeuftNoch && bestehend?.current_period_end
      ? new Date(bestehend.current_period_end).getTime()
      : jetzt;

    // Die Datenbankfunktion entscheidet den Wettlauf: Sie markiert den Code
    // und liefert nur dann eine Zeile, wenn er vorher wirklich 'unused' war.
    const { data: rows, error: rpcError } = await supabase
      .rpc("redeem_code", { p_code_hash: hash, p_email: user.email, p_user_id: user.id });
    if (rpcError) throw new Error(rpcError.message);

    const hit = Array.isArray(rows) ? rows[0] : rows;
    if (!hit) {
      // Kein Treffer heisst dreierlei. Der Unterschied ist fuer den Kaeufer
      // wichtig ("schon benutzt" ist etwas anderes als "vertippt"), und
      // Erraten scheidet bei rund 5,3e17 Moeglichkeiten als Angriff aus.
      const { data: known } = await supabase
        .from("redemption_codes")
        .select("status, redeemed_at")
        .eq("code_hash", hash)
        .maybeSingle();
      if (!known) return json({ error: "Diesen Code kennen wir nicht. Bitte Schreibweise prüfen." }, 404);
      if (known.status === "revoked") return json({ error: "Dieser Code wurde gesperrt." }, 409);
      return json({
        error: "Dieser Code wurde bereits eingelöst"
          + (known.redeemed_at ? ` (am ${new Date(known.redeemed_at).toLocaleDateString("de-DE")})` : "")
          + ".",
      }, 409);
    }

    const periodEnd = new Date(basis + hit.days * 24 * 60 * 60 * 1000).toISOString();

    const { error: entError } = await supabase.from("external_entitlements").upsert({
      provider: "code",
      order_id: hit.code_id,
      email: user.email,
      product_id: null,
      plan: hit.plan,
      status: "active",
      period_end: periodEnd,
      amount_cents: null,
      currency: "EUR",
      last_event: "code_redeemed",
      raw: { code_tail: hit.code_tail, redeemed_by: user.id },
      updated_at: new Date().toISOString(),
    }, { onConflict: "provider,order_id" });
    if (entError) throw new Error(entError.message);

    // Sofort sichtbar machen: useAccess rendert die Paywall aus `subscriptions`.
    // Ohne diese Zeile saehe der gerade eingeloggte Kaeufer seinen Zugang erst
    // nach dem naechsten check-subscription-Lauf.
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      plan: hit.plan,
      status: "active",
      source: "code",
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

    console.log(`[redeem-code] ${user.email} -> ${hit.plan} bis ${periodEnd} (…${hit.code_tail})`);
    return json({ ok: true, plan: hit.plan, period_end: periodEnd });
  } catch (e) {
    console.error("[redeem-code]", e);
    return json({ error: "Einlösung fehlgeschlagen. Bitte später erneut versuchen." }, 500);
  }
});
