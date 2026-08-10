// ===================================================================
// Konto zur bezahlten Checkout-Session anlegen — Schritt 2 von pay-first.
// Baugleich zu AnwaltX; wer eine der beiden ändert, ändert beide.
//
// AUFRUF IN ZWEI STUFEN:
//   { sessionId }            -> { status: "new" | "exists" | "unpaid", email }
//   { sessionId, password }  -> { status: "created" | "exists", email }
//
// WARUM DIE E-MAIL NICHT VOM CLIENT KOMMT: `check-subscription` findet den
// Stripe-Kunden über `customers.list({ email })`. Ein Tippfehler im Formular
// erzeugte sonst ein Konto, das dauerhaft als unbezahlt gilt, obwohl Geld
// geflossen ist. Sie wird deshalb ausschließlich aus der Stripe-Session gelesen.
// ===================================================================

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRODUCT_TO_PLAN: Record<string, string> = {
  gruenderx: "GründerX",
  bundle: "Founder Bundle",
};

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const toSafe = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 120) : undefined;
};

async function userIdByEmail(admin: any, email: string): Promise<string | null> {
  const adminApi = admin.auth.admin as {
    getUserByEmail?: (e: string) => Promise<{ data: { user: { id: string } | null }; error: unknown }>;
  };
  if (typeof adminApi.getUserByEmail === "function") {
    const { data } = await adminApi.getUserByEmail(email);
    return data?.user?.id ?? null;
  }
  const perPage = 200;
  for (let page = 1; page <= 25; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const users = data?.users ?? [];
    const hit = users.find((u: any) => u.email?.toLowerCase() === email);
    if (hit) return hit.id;
    if (users.length < perPage) break;
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
  if (!allowRequest(ip)) return json({ error: "Zu viele Anfragen.", code: "rate_limited" }, 429);

  try {
    const { sessionId, password, firstName, lastName, company } = await req.json();
    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      return json({ error: "Ungültige Session.", code: "invalid_session" }, 400);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });
    // Unbekannte Session-ID ist ein Client-Fehler, kein Serverfehler. Ohne
    // eigenes catch meldet die Seite "interner Fehler", und der Kunde sucht
    // den Fehler bei seiner Zahlung statt beim Link.
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (e) {
      console.error("⚠️ Session nicht abrufbar:", (e as Error).message);
      return json({ error: "Diese Zahlung ist uns nicht bekannt.", code: "invalid_session" }, 400);
    }

    const paid = session.payment_status === "paid" ||
      session.payment_status === "no_payment_required";
    if (!paid) return json({ status: "unpaid", code: "not_paid" }, 402);

    const email = (session.customer_details?.email || session.customer_email || "")
      .toLowerCase().trim();
    if (!email.includes("@")) {
      return json({ error: "Keine E-Mail in der Zahlung.", code: "no_email" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const existingId = await userIdByEmail(admin, email);

    // Der tatsächlich belastete Betrag, nicht der Listenpreis: Gutscheincodes
    // (SONNI/FOUNDER) senken ihn. Meldet der Browser stattdessen 64,99 €,
    // optimiert die Kampagne auf einen Umsatz, den es nie gab.
    const amount = (session.amount_total ?? 0) / 100;
    const currency = (session.currency || "eur").toUpperCase();

    if (typeof password !== "string" || password.length === 0) {
      return json({ status: existingId ? "exists" : "new", email, amount, currency });
    }
    if (existingId) return json({ status: "exists", email, amount, currency });
    if (password.length < 8) {
      return json({ error: "Passwort zu kurz.", code: "weak_password" }, 400);
    }

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Bezahlt ist bezahlt — eine Bestätigungsmail hier kostet nur Conversion.
      user_metadata: {
        first_name: toSafe(firstName),
        last_name: toSafe(lastName),
        company_name: toSafe(company),
        signup_flow: "pay_first",
      },
    });

    if (error || !data.user) {
      const lowered = (error?.message || "").toLowerCase();
      if (lowered.includes("already") || lowered.includes("duplicate")) {
        return json({ status: "exists", email, amount, currency });
      }
      console.error("❌ createUser:", error?.message);
      return json({ error: "Konto konnte nicht angelegt werden.", code: "create_failed" }, 500);
    }

    const userId = data.user.id;
    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
    const product = (session.metadata?.product as string) || "gruenderx";

    let periodEnd: string | null = null;
    let subscriptionId: string | null = null;
    try {
      if (session.subscription) {
        subscriptionId = String(session.subscription);
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        periodEnd = new Date(sub.current_period_end * 1000).toISOString();
      }
    } catch (e) {
      console.error("⚠️ Subscription nicht lesbar:", (e as Error).message);
    }

    // Abo sofort schreiben, damit das Dashboard nicht erst nach dem naechsten
    // check-subscription-Lauf freischaltet.
    const { error: subError } = await admin.from("subscriptions").upsert({
      user_id: userId,
      plan: PRODUCT_TO_PLAN[product] ?? "GründerX",
      status: "active",
      stripe_customer_id: customerId ?? null,
      stripe_subscription_id: subscriptionId,
      current_period_end: periodEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (subError) console.error("⚠️ subscriptions upsert:", subError.message);

    // Rechnungsdaten aus dem Checkout ins Profil uebernehmen. Ohne das muesste
    // der frisch bezahlte Kunde sie im Onboarding ein zweites Mal eintippen.
    const addr = session.customer_details?.address;
    const { error: profileError } = await admin.from("profiles").upsert({
      id: userId,
      first_name: toSafe(firstName) ?? null,
      last_name: toSafe(lastName) ?? null,
      company_name: toSafe(company) ?? null,
      street: addr?.line1 ?? null,
      postal_code: addr?.postal_code ?? null,
      city: addr?.city ?? null,
      country: addr?.country ?? "DE",
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });
    if (profileError) console.error("⚠️ profiles upsert:", profileError.message);

    if (customerId) {
      try {
        await stripe.customers.update(customerId, {
          metadata: { supabase_user_id: userId, flow: "pay_first" },
        });
      } catch (e) {
        console.error("⚠️ customer.update:", (e as Error).message);
      }
    }

    // Begruessungsmail anstossen.
    //
    // Vor pay-first verschickte Supabase selbst eine Bestaetigungsmail, weil
    // die Registrierung ueber signUp lief. Seit das Konto per Admin-API mit
    // email_confirm angelegt wird, verschickt Supabase nichts mehr — der
    // zahlende Kunde bekaeme also weder Beleg noch Zugangshinweis.
    //
    // Scheitert der Mailserver, ist das Konto trotzdem da: Der Fehler wird
    // geloggt, aber nicht an den Client durchgereicht.
    try {
      const res = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-welcome-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({
          email,
          firstName: toSafe(firstName),
          plan: PRODUCT_TO_PLAN[product] ?? "GründerX",
        }),
      });
      if (!res.ok) console.error("⚠️ Begruessungsmail abgelehnt:", res.status, await res.text());
    } catch (e) {
      console.error("⚠️ Begruessungsmail nicht angestossen:", (e as Error).message);
    }

    console.log(`✅ Konto aus bezahlter Session angelegt: ${email}`);
    return json({ status: "created", email, userId, amount, currency });
  } catch (error) {
    console.error("❌ claim-account:", (error as Error).message);
    return json({ error: "Interner Fehler.", code: "internal_error" }, 500);
  }
});
