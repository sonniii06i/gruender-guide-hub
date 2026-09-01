// IPN-Empfang von externen Verkaufsplattformen (CopeCart, Digistore24, elopage/ablefy).
//
// Warum es das gibt
// -----------------
// Stripe ist unser eigener Kassenweg: Wir sind Vertragspartner, wir stellen die
// Rechnung, create-checkout/check-subscription fuehren das Abo. CopeCart,
// Digistore24 und elopage sind dagegen Reseller — sie verkaufen in eigenem
// Namen, kassieren und melden uns per HTTP nur, dass wir jemandem Zugang geben
// sollen.
//
// Aus dieser Meldung darf deshalb NIE ein Stripe-Abo werden. Sie landet in
// `external_entitlements`, einer Tabelle neben dem Stripe-Zustand.
// check-subscription liest sie und laesst solche Kunden in Ruhe; ohne das
// waeren sie nach spaetestens 24 h wieder ausgesperrt (der Sync laeuft taeglich
// aus useAccess).
//
// Zugang haengt an der E-MAIL, nicht an einer user_id: Der Kauf passiert auf
// der Plattform, das Konto entsteht meist erst danach ueber die Danke-Seite.
// Existiert das Konto schon, wird `subscriptions` sofort mitgeschrieben, damit
// der Zugang ohne Umweg greift; existiert es noch nicht, holt
// check-subscription das beim ersten Login nach.
//
// Das Protokoll der Plattformen (Signaturen, Ereignisnamen) steckt in
// ../_shared/ipn.ts und ist dort getestet. Hier steht nur, was wir mit dem
// Ergebnis tun.
//
// Aufruf-URLs (im jeweiligen Verkaeufer-Backend eintragen):
//   .../functions/v1/external-billing-webhook?provider=copecart
//   .../functions/v1/external-billing-webhook?provider=digistore24
//   .../functions/v1/external-billing-webhook?provider=elopage&token=<IPN_ELOPAGE_TOKEN>
//
// Secrets (supabase secrets set ...):
//   IPN_COPECART_SECRET        CopeCart: IPN-Secret-Key
//   IPN_DIGISTORE_PASSPHRASE   Digistore24: IPN-Passphrase
//   IPN_ELOPAGE_TOKEN          elopage/ablefy: langes Zufallsgeheimnis fuer die URL
//   IPN_ELOPAGE_SECRET         elopage/ablefy: optionale HMAC-Signatur
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import {
  ack,
  canonicalProvider,
  IpnError,
  type IpnEvent,
  parseCopecart,
  parseDigistore,
  parseElopage,
  timingSafeEqual,
} from "../_shared/ipn.ts";

// Plan-Aufloesung: Was der Kunde auf der Plattform gekauft hat -> unser Plan.
// Die Produkt-IDs vergibt die jeweilige Plattform beim Anlegen des Produkts;
// bis sie hier eingetragen sind, gilt der Standardplan.
const PRODUCT_TO_PLAN: Record<string, string> = {
  // CopeCart (Stand 30.08.2026). Die ID ist der Slug aus der Produkt-URL und
  // kommt im IPN als `product_id`.
  "5188ce6d": "gruenderx",   // GründerX — KI-Gründungs-Copilot, 64,99 €
  "d46187b0": "bundle",      // Founder Bundle — GründerX + AnwaltX, 99,99 €
  // Digistore24 (Stand 01.09.2026). Dort ist die `product_id` die numerische
  // Produktnummer aus der Backend-URL, kein Slug.
  "728385": "gruenderx",     // GründerX — KI-Gründungs-Copilot, 64,99 €
  "728388": "bundle",        // Founder Bundle — GründerX + AnwaltX, 99,99 €
};
const DEFAULT_PLAN = "gruenderx";

const planFor = (productId: string | null) =>
  (productId && PRODUCT_TO_PLAN[productId]) || DEFAULT_PLAN;

serve(async (req) => {
  const url = new URL(req.url);
  const provider = canonicalProvider(url.searchParams.get("provider") ?? "");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  const raw = await req.arrayBuffer();
  const bodyText = new TextDecoder().decode(raw).slice(0, 20000);

  const log = (
    fields: { event?: string; order_id?: string; email?: string; ok: boolean; note: string },
  ) => supabase.from("ipn_log").insert({ provider, body: bodyText, ...fields });

  if (!provider) {
    return new Response(JSON.stringify({ error: "unknown_provider" }), { status: 404 });
  }

  // Grundsatz bei allen dreien: Eine Meldung, die wir zwar echt fanden, aber
  // nicht verarbeiten konnten, wird trotzdem quittiert. Sonst wiederholt die
  // Plattform sie im Minutentakt, ohne dass ein Retry je etwas aendern wuerde.
  // Eine Meldung mit falscher Signatur bekommt dagegen 401 — die soll auffallen.
  let ev: IpnEvent;
  try {
    if (provider === "copecart") {
      ev = await parseCopecart(raw, req.headers, Deno.env.get("IPN_COPECART_SECRET"), planFor);
    } else if (provider === "digistore24") {
      const form = Object.fromEntries(new URLSearchParams(bodyText)) as Record<string, string>;
      ev = await parseDigistore(form, Deno.env.get("IPN_DIGISTORE_PASSPHRASE"), planFor);
    } else {
      // elopage/ablefy signiert nicht dokumentiert: das Geheimnis steht in der
      // URL. Ohne konfiguriertes Token bleibt der Endpunkt zu, sonst waere er
      // ein offenes Tor zur Freischaltung.
      const expected = Deno.env.get("IPN_ELOPAGE_TOKEN");
      const token = url.searchParams.get("token") ?? "";
      if (!expected || !timingSafeEqual(token, expected)) {
        await log({ ok: false, note: "Token in der URL falsch/fehlt" });
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
      }
      ev = await parseElopage(raw, req.headers, Deno.env.get("IPN_ELOPAGE_SECRET"), planFor);
    }
  } catch (e) {
    const note = e instanceof Error ? e.message : String(e);
    await log({ ok: false, note });
    if (e instanceof IpnError) {
      return new Response(JSON.stringify({ error: note }), { status: 401 });
    }
    return ack(provider); // unlesbare Nutzlast: quittieren, nicht wiederholen lassen
  }

  try {
    const note = await applyEvent(supabase, ev);
    await log({ event: ev.event, order_id: ev.orderId, email: ev.email, ok: true, note });
    console.log(`[ipn/${provider}] ${note}`);
  } catch (e) {
    const note = `nicht umsetzbar: ${e instanceof Error ? e.message : String(e)}`;
    await log({ event: ev.event, order_id: ev.orderId, email: ev.email, ok: false, note });
    console.error(`[ipn/${provider}] ${note}`);
  }
  return ack(provider);
});

// deno-lint-ignore no-explicit-any
async function applyEvent(supabase: any, ev: IpnEvent): Promise<string> {
  if (ev.action === "ignore") return `${ev.event}: nichts zu tun`;
  if (!ev.orderId) throw new Error("Meldung ohne order_id");

  if (ev.action === "grant") {
    if (!ev.email.includes("@")) throw new Error("Meldung ohne brauchbare E-Mail");
    const { error } = await supabase.from("external_entitlements").upsert({
      provider: ev.provider,
      order_id: ev.orderId,
      email: ev.email,
      product_id: ev.productId,
      plan: ev.plan,
      status: "active",
      period_end: ev.periodEnd,
      amount_cents: ev.amountCents,
      currency: ev.currency,
      last_event: ev.event,
      raw: ev.raw,
      updated_at: new Date().toISOString(),
    }, { onConflict: "provider,order_id" });
    if (error) throw new Error(error.message);
    await mirrorToSubscription(supabase, ev.email, {
      plan: ev.plan,
      status: "active",
      source: ev.provider,
      current_period_end: ev.periodEnd,
    });
    return `${ev.event}: Zugang für ${ev.email} bis ${ev.periodEnd ?? "unbefristet"}`;
  }

  // Eine Kuendigung mit bekanntem Enddatum laesst den Zugang bis dahin stehen;
  // Rueckerstattung und Ruecklastschrift beenden ihn sofort.
  const patch = ev.periodEnd
    ? { period_end: ev.periodEnd, last_event: ev.event }
    : { status: "revoked", last_event: ev.event };
  const { error } = await supabase
    .from("external_entitlements")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("provider", ev.provider)
    .eq("order_id", ev.orderId);
  if (error) throw new Error(error.message);

  if (!ev.periodEnd) {
    await mirrorToSubscription(supabase, ev.email, {
      plan: "none",
      status: "canceled",
      source: ev.provider,
      current_period_end: null,
    });
    return `${ev.event}: Zugang entzogen`;
  }
  return `${ev.event}: läuft aus am ${ev.periodEnd}`;
}

/**
 * Schreibt den Zugang zusaetzlich nach `subscriptions`, wenn das Konto schon
 * existiert.
 *
 * Warum nicht nur die Entitlement-Tabelle: useAccess liest `subscriptions`
 * direkt aus der DB und rendert daraus die Paywall. Ohne diese Spiegelung saehe
 * ein Kunde, der schon eingeloggt ist, seinen frisch gekauften Zugang erst nach
 * dem naechsten check-subscription-Lauf.
 *
 * Existiert das Konto noch nicht (Normalfall: Kauf vor Registrierung), passiert
 * hier nichts — check-subscription holt es beim ersten Login nach.
 */
// deno-lint-ignore no-explicit-any
async function mirrorToSubscription(
  supabase: any,
  email: string,
  fields: Record<string, unknown>,
) {
  const userId = await findUserId(supabase, email);
  if (!userId) return;
  await supabase.from("subscriptions").upsert({
    user_id: userId,
    updated_at: new Date().toISOString(),
    ...fields,
  }, { onConflict: "user_id" });
}

/**
 * user_id zu einer E-Mail.
 *
 * Ueber `profiles` statt ueber die Admin-API: `auth.admin.listUsers()` kennt
 * keinen E-Mail-Filter und blaettert seitenweise — das findet ab ein paar
 * hundert Konten den Kaeufer nicht mehr zuverlaessig. `profiles.id` ist die
 * user_id (siehe handle_new_user), `profiles.email` die gesuchte Spalte.
 */
// deno-lint-ignore no-explicit-any
async function findUserId(supabase: any, email: string): Promise<string | null> {
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();
  return data?.id ?? null;
}
