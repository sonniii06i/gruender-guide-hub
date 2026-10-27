// ===================================================================
// start-angebot — eigener Stripe-Webhook fürs Startangebot „7 Tage für 1 €“
// (27.10.2026). Bewusst getrennt von stripe-affiliate-webhook, damit die
// Abo-/Provisionslogik dort unberührt bleibt.
//
//  - checkout.session.completed (metadata.angebot = start1, Gast-Checkout):
//    hatte die Mail schon ein Abo → Testphase sofort beenden (Hinweis stand
//    im Checkout: „Nur für Neukunden …“).
//  - customer.subscription.trial_will_end (3 Tage vor Ende): Erinnerung mit
//    Datum, Folgepreis und Kündigungsweg.
// Signaturpruefung mit START_ANGEBOT_WEBHOOK_SECRET.
// ===================================================================
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { START_KENNUNG, warSchonKunde } from "../_shared/startAngebot.ts";
import { buildStartEndet } from "../_shared/transaktional.ts";
import { sendMail } from "../_shared/sendMail.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const ok = (b: unknown = { received: true }) => new Response(JSON.stringify(b), { headers: { "Content-Type": "application/json" } });

const datum = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Berlin" });

serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const secret = Deno.env.get("START_ANGEBOT_WEBHOOK_SECRET") || "";
  if (!sig || !secret) return new Response("missing signature", { status: 400 });
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, secret, undefined, cryptoProvider);
  } catch (e) {
    return new Response(`bad signature: ${(e as Error).message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      if (s.metadata?.angebot !== START_KENNUNG || !s.subscription) return ok({ skip: true });
      const subId = typeof s.subscription === "string" ? s.subscription : s.subscription.id;
      const mail = s.customer_details?.email || s.customer_email || "";
      // Fehler in der Pruefung -> Fehler werfen (500), Stripe wiederholt.
      if (await warSchonKunde(stripe, mail, subId)) {
        await stripe.subscriptions.update(subId, {
          trial_end: "now",
          proration_behavior: "none",
          metadata: { angebot: START_KENNUNG, start_verweigert: "frueherer_kunde" },
        });
        console.log(`[start-angebot] ${subId}: frueherer Kunde -> Testphase beendet`);
      }
      return ok();
    }

    if (event.type === "customer.subscription.trial_will_end") {
      const sub = event.data.object as Stripe.Subscription;
      // Betreiber 27.10.2026: Erinnerung vor Testphasen-Ende AUS (Schalter START_ERINNERUNG, Standard aus) – Event nur loggen.
      if ((Deno.env.get("START_ERINNERUNG") || "aus").toLowerCase() !== "an") {
        console.log(`[start-angebot] trial_will_end ${sub.id}: Erinnerung abgeschaltet (START_ERINNERUNG=aus)`);
        return ok({ skip: true, grund: "erinnerung_aus" });
      }
      if (sub.metadata?.angebot !== START_KENNUNG || !sub.trial_end || sub.cancel_at_period_end || sub.status !== "trialing") {
        return ok({ skip: true });
      }
      const kunde = await stripe.customers.retrieve(typeof sub.customer === "string" ? sub.customer : sub.customer.id);
      const mail = (kunde as Stripe.Customer).email || "";
      const preisCent = sub.items.data[0]?.price?.unit_amount ?? 6499;
      const preis = (preisCent / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
      const m = buildStartEndet({ ende: datum(sub.trial_end), preis });
      const r = await sendMail({ to: mail, subject: m.subject, text: m.text, html: m.html });
      if (!r.ok) throw new Error(`Mail fehlgeschlagen: ${r.error}`);
      console.log(`[start-angebot] Erinnerung an ${sub.id} gesendet`);
      return ok();
    }
    return ok({ skip: true });
  } catch (e) {
    console.error("[start-angebot]", (e as Error).message);
    return new Response(`handler error: ${(e as Error).message}`, { status: 500 });
  }
});
