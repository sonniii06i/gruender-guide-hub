// ===================================================================
// stripe-affiliate-webhook (GruenderX): Affiliate-Provision je Zahlung (Satz: _shared/affiliateKonditionen.ts).
// Events: checkout.session.completed, checkout.session.expired,
//         invoice.payment_succeeded, customer.subscription.updated
//         (nur Kuendigungsbestaetigung, Schalter KUENDIGUNG_MAIL_AKTIV),
//         customer.subscription.deleted,
//         charge.refunded, charge.dispute.created/closed (Abschlusspruefung 27.10.2026:
//         Provision zurueck; schon ausgezahlt -> Gegenbuchung, verrechnet mit der naechsten Auszahlung).
// verify_jwt = false; Signaturpruefung mit STRIPE_WEBHOOK_SECRET.
// Produkt aus session.metadata.product ('gruenderx' | 'bundle', Fallback gruenderx).
// ===================================================================
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { aboStatusSchreiben } from "../_shared/aboStatus.ts";
import { sendMetaCapiEvent } from "../_shared/metaCapi.ts";
import { type Produkt } from "../_shared/campaigns.ts";
import { abTestStrecke } from "../_shared/mailSend.ts";
import { meldeVerkauf } from "../_shared/discordSales.ts";
import { kuendigungBestaetigen } from "../_shared/kuendigungMail.ts";
import { abbruchPruefen } from "../_shared/abbruchNachtrag.ts";
import { leistungsBeginn, provisionsSatz } from "../_shared/affiliateKonditionen.ts";
import { partnerSelbstkauf, provisionWiederherstellen, provisionZurueck, rechnungZurZahlung } from "../_shared/affiliateSicherung.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
// Zentraler Affiliate-Ledger = AnwaltX-Hub (Cross-Product). Fallback: lokal.
const supabase = createClient(
  Deno.env.get("HUB_SUPABASE_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("HUB_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
// Eigener Client fuer die EIGENE Datenbank. `supabase` oben zeigt bewusst auf
// den AnwaltX-Hub (gemeinsamer Affiliate-Ledger); mail_optouts schreibt aber
// mail-unsubscribe lokal, und eine Abmeldung, die woanders nachgeschlagen
// wird, wirkt nie.
const localDb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Robuste Feld-Extraktion (API-Basil hat Felder verschoben)
function subIdOf(inv: any): string | null {
  return inv.subscription || inv.parent?.subscription_details?.subscription || null;
}
function netCentsOf(inv: any): number {
  if (typeof inv.total_excluding_tax === "number") return Math.max(0, inv.total_excluding_tax);
  const tax = typeof inv.tax === "number"
    ? inv.tax
    : Array.isArray(inv.total_taxes) ? inv.total_taxes.reduce((a: number, t: any) => a + (t.amount || 0), 0) : 0;
  return Math.max(0, (inv.amount_paid ?? 0) - tax);
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("missing signature", { status: 400 });

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (err) {
    return new Response(`bad signature: ${(err as Error).message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as any;

        // Verkaufsmeldung nach Discord. Bewusst hier oben, VOR jedem `break`
        // dieses Falls: gemeldet werden soll jeder Kauf, nicht nur der mit
        // Reflink. meldeVerkauf wirft nie, der Webhook kann daran nicht kippen.
        try {
          let produkt: string | null = (s.metadata?.plan ?? s.metadata?.product ?? null) as string | null;
          try {
            const li = await stripe.checkout.sessions.listLineItems(s.id, { limit: 3 });
            produkt = li.data.map((p: any) => p.description).filter(Boolean).join(", ") || produkt;
          } catch (_e) { /* Produktname ist Kuer — der Betrag ist Pflicht */ }
          await meldeVerkauf({
            marke: "gruenderx",
            betragCent: s.amount_total,
            waehrung: s.currency,
            email: s.customer_details?.email ?? s.customer_email ?? null,
            name: s.customer_details?.name ?? null,
            produkt,
            zahlungsart: (s.payment_method_types ?? []).join(", ") || "Stripe",
            abo: s.mode === "subscription",
            quelle: "stripe-webhook",
            referenz: s.id,
          });
        } catch (e) {
          console.error("[discord] Verkaufsmeldung fehlgeschlagen:", e);
        }
        // --------------------------------------------------------------
        // Warenkorbstrecke beenden.
        //
        // DIE WICHTIGSTE ZEILE DER GANZEN STRECKE. Ohne sie bekommt
        // jemand, der gerade bezahlt hat, eine Stunde spaeter
        // "Hat etwas nicht funktioniert?" — der teuerste Fehler, den
        // eine Warenkorbstrecke machen kann.
        //
        // Es wird sowohl ueber die Session-ID als auch ueber die Adresse
        // abgeraeumt: Wer beim zweiten Anlauf eine NEUE Session erzeugt
        // und damit kauft, hat die erste, abgebrochene noch offen stehen.
        {
          const kaeufer = s.customer_details?.email ?? s.customer_email ?? null;
          const jetzt = new Date().toISOString();
          await localDb.from("cart_abandons")
            .update({ gekauft_at: jetzt }).eq("session_id", s.id);
          if (kaeufer) {
            await localDb.from("cart_abandons")
              .update({ gekauft_at: jetzt })
              .eq("email", kaeufer).is("gekauft_at", null);
          }
          console.log(`✅ Warenkorbstrecke beendet fuer ${kaeufer ?? s.id}`);
        }


        // Meta-CAPI VOR den Affiliate-Abbruechen. Vorher stand hier zuerst
        // `if (!code) break` — ohne Reflink wurde also gar nichts gemeldet,
        // und das ist der Normalfall. Serverseitig gab es damit ueberhaupt
        // keinen Kauf, obwohl genau der jetzt das Optimierungsereignis der
        // Kampagne ist.
        //
        // event_id `stripe_<session_id>`: dieselbe ID bildet /willkommen im
        // Browser. Nur dann zaehlt Meta beide Meldungen als EIN Ereignis.
        await sendMetaCapiEvent({
          event: "Purchase",
          eventId: `stripe_${s.id}`,
          value: (s.amount_total ?? 0) / 100,
          currency: (s.currency || "eur").toUpperCase(),
          eventSourceUrl: "https://gruenderx.de/willkommen",
          user: {
            email: s.customer_details?.email || s.customer_email || null,
            // fbc/fbp schreibt checkout-guest in die Metadaten — der Webhook
            // sieht keine Cookies, und fbc hebt die Event Match Quality am
            // staerksten.
            fbc: s.metadata?.fbc || null,
            fbp: s.metadata?.fbp || null,
          },
        });

        const code = (s.metadata?.affiliate_ref || "").trim();
        if (!code || !s.subscription) break;
        const aff = await affiliateByCode(code);
        if (!aff) break;
        const buyerEmail = (s.customer_details?.email || s.customer_email || "").toLowerCase();
        // Selbst-Referral (Abschlusspruefung 27.10.2026): normalisierte Mail, gleicher Kunde, gleiche Karte.
        const selbst = await partnerSelbstkauf(stripe, aff.email, buyerEmail, typeof s.customer === "string" ? s.customer : null);
        if (selbst) { console.log(`Self-referral blocked (${selbst})`); break; }
        await supabase.from("affiliate_referrals").upsert({
          affiliate_id: aff.id,
          product: s.metadata?.product || "gruenderx",
          referred_email: buyerEmail || null,
          stripe_customer_id: typeof s.customer === "string" ? s.customer : null,
          stripe_subscription_id: String(s.subscription),
          status: "active",
        }, { onConflict: "stripe_subscription_id" });
        break;
      }

      case "invoice.payment_succeeded": {
        const inv = event.data.object as any;
        const subId = subIdOf(inv);
        if (!subId) break;
        const { data: ref } = await supabase
          .from("affiliate_referrals")
          .select("id, affiliate_id, product, status, created_at, fenster_start")
          .eq("stripe_subscription_id", String(subId))
          .maybeSingle();
        if (!ref || ref.status !== "active") break;
        // Satz je Partner-Konditionen (27.10.2026, _shared/affiliateKonditionen.ts): 25 % fuer Rechnungen,
        // deren Leistungszeitraum vor Abo-Start + 12 Kalendermonaten beginnt; Bestandspartner 20 % dauerhaft.
        // Fensterstart = Abo-Start, beim ersten Mal gespeichert. Kein lesbarer Start -> keine Provision.
        const { data: aff } = await supabase.from("affiliates").select("konditionen").eq("id", ref.affiliate_id).maybeSingle();
        let fensterStart: string | null = ref.fenster_start ?? null;
        if (!fensterStart && aff?.konditionen !== "v1_20_dauerhaft") {
          try {
            const abo = await stripe.subscriptions.retrieve(String(subId));
            if (abo.start_date) {
              fensterStart = new Date(abo.start_date * 1000).toISOString();
              await supabase.from("affiliate_referrals").update({ fenster_start: fensterStart }).eq("id", ref.id).is("fenster_start", null);
            }
          } catch (e) {
            console.error(`💶 Abo-Start fuer ${subId} nicht lesbar:`, (e as Error).message);
          }
        }
        // Leistungsbeginn aus der Abo-Position, nicht inv.period_start (Viertes Security-Review).
        // Alle Positionen, bevor gewaehlt wird (Fuenftes Review): bei has_more nachladen; Fehler -> keine Provision.
        let positionen = inv.lines?.data ?? [];
        if (inv.lines?.has_more) {
          try {
            positionen = [];
            for await (const l of stripe.invoices.listLineItems(inv.id, { limit: 100 })) positionen.push(l);
          } catch (e) {
            console.error(`💶 Positionen von ${inv.id} nicht lesbar -> keine Provision:`, (e as Error).message);
            positionen = [];
          }
        }
        const rechnungAm = positionen.length ? leistungsBeginn(inv, positionen) : NaN;
        const RATE = provisionsSatz(aff?.konditionen, fensterStart, rechnungAm);
        if (RATE <= 0) {
          console.error(`💶 keine Provision fuer ${inv.id} (sub ${subId}): ` +
            (fensterStart && Number.isFinite(rechnungAm) ? "12-Monats-Fenster vorbei" : "ALARM: Abo-Start/Leistungsbeginn fehlt"));
          break;
        }
        const base = netCentsOf(inv);
        if (base <= 0) break;
        const commission = Math.round(base * RATE);
        const { error } = await supabase.from("affiliate_commissions").insert({
          affiliate_id: ref.affiliate_id,
          referral_id: ref.id,
          product: ref.product,
          stripe_invoice_id: inv.id,
          base_cents: base,
          currency: inv.currency ?? "eur",
          rate: RATE,
          commission_cents: commission,
          status: "pending",
          period_start: inv.period_start ? new Date(inv.period_start * 1000).toISOString() : null,
          period_end: inv.period_end ? new Date(inv.period_end * 1000).toISOString() : null,
        });
        if (error && !String(error.message).includes("duplicate")) throw error;
        break;
      }

      // Warenkorb-Abbruch. Stripe laesst eine unbezahlte Checkout-Session nach
      // rund 24 Stunden ablaufen und meldet das hier. Besserer Ausloeser als
      // jeder eigene Timer: Es steht fest, dass nicht gezahlt wurde, und die
      // Mailadresse liegt in der Session.
      case "checkout.session.expired": {
        const s = event.data.object as any;
        // Pruefung 18.10.2026 (_shared/abbruchNachtrag.ts): nur gruenderx.de-
        // Sessions, nie an Kunden, nie eine zweite Strecke fuer dieselbe
        // Adresse, Uhr ab echtem Abbruch statt ab Ablauf (~24 h spaeter).
        const n = await abbruchPruefen(s, localDb, stripe, {
          domain: "gruenderx.de",
          istKunde: async (mail) => {
            const { data: p } = await localDb.from("profiles").select("id").eq("email", mail).limit(5);
            const ids = (p ?? []).map((r: any) => r.id);
            if (!ids.length) return false;
            const { data } = await localDb.from("subscriptions").select("id")
              .in("user_id", ids).or("status.eq.active,comp_access.eq.true").limit(1);
            return !!(data && data.length);
          },
        });
        if (!n.ok) {
          console.log(`[abbruch] ${s.id} nicht vorgemerkt: ${n.grund}`);
          break;
        }
        const email = n.email;

        // KEIN EINWILLIGUNGS-HAEKCHEN. Bewusste Entscheidung des Betreibers
        // am 10.09.2026, nachdem die Rechtslage benannt war: § 7 Abs. 3 UWG
        // deckt nur eigene Kunden, wer abbricht hat nichts gekauft, und
        // Stripes consent_collection ist fuer deutsche Konten gesperrt. Wer
        // das hier spaeter absichern will, setzt ein Haekchen auf /checkout
        // und prueft an dieser Stelle metadata.abbruch_mail_ok === "1".
        //
        // Was als Daempfer bleibt: jede Mail traegt einen funktionierenden
        // Ein-Klick-Abmeldelink, und die Sperrliste unten wird vorher gelesen.

        // FRUEHER ging an dieser Stelle EINE Mail raus. Das Ereignis
        // kommt aber erst rund 24 Stunden nach dem Abbruch -- die
        // wirksamste Erinnerung, die in der ersten Stunde, war damit gar
        // nicht baubar.
        //
        // JETZT faehrt send-cart-series die dreistufige Strecke anhand
        // der Zeitstempel in cart_abandons; die Zeile entsteht schon
        // beim Erzeugen der Session. Hier bleibt der Nachtrag fuer
        // Sessions, die ausserhalb von create-checkout entstanden sind.
        //
        // Die Abmelde- und Sperrlisten-Pruefung steht nicht mehr hier,
        // sondern in sendCampaign() -- also unmittelbar vor jedem
        // einzelnen Versand statt einmal Tage vorher.
        const produkt: Produkt = s.metadata?.product === "bundle" ? "bundle" : "gruenderx";
        const { error: caErr } = await localDb.from("cart_abandons").upsert({
          email,
          name: s.customer_details?.name ?? null,
          session_id: s.id,
          produkt,
          intervall: s.metadata?.interval === "year" ? "year" : "month",
          variant: abTestStrecke(email, "cart"),
          created_at: n.createdAt,
        }, { onConflict: "session_id", ignoreDuplicates: true });
        console.log(caErr
          ? `[abbruch] cart_abandons FEHLER ${email}: ${caErr.message}`
          : `[abbruch] vorgemerkt: ${email} (${produkt})`);
        break;
      }

      case "customer.subscription.created": {
        // 27.10.2026: Status sofort in die eigene DB (inkl. trialing).
        console.log(`[abo-status] ${await aboStatusSchreiben(localDb, event.data.object)}`);
        break;
      }

      case "customer.subscription.updated": {
        console.log(`[abo-status] ${await aboStatusSchreiben(localDb, event.data.object)}`);
        // Kuendigungsbestaetigung (Schalter KUENDIGUNG_MAIL_AKTIV, Standard
        // aus), siehe _shared/kuendigungMail.ts. Eigene DB, wirft nie.
        await kuendigungBestaetigen(stripe, localDb, event);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await supabase.from("affiliate_referrals").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
        console.log(`[abo-status] ${await aboStatusSchreiben(localDb, sub)}`);
        await kuendigungBestaetigen(stripe, localDb, event);
        break;
      }

      case "charge.refunded": {
        // API "basil" hat charge.invoice entfernt -> Rechnung ueber invoice_payments (vorher griff das nie).
        const ch = event.data.object as any;
        const inv = await rechnungZurZahlung(stripe, ch);
        if (inv) console.log(`💶 Erstattung ${ch.id}: ${await provisionZurueck(supabase, inv, "refund")}`);
        break;
      }

      case "charge.dispute.created":
      case "charge.dispute.closed": {
        const d = event.data.object as any;
        const ch = await stripe.charges.retrieve(typeof d.charge === "string" ? d.charge : d.charge.id);
        const inv = await rechnungZurZahlung(stripe, ch);
        if (!inv) break;
        if (event.type === "charge.dispute.closed" && d.status === "won") {
          const ok = await provisionWiederherstellen(supabase, inv, ch.amount_refunded ?? 0);
          console.log(`💶 Chargeback ${d.id} gewonnen -> ${ok ? `Provision ${inv} wieder offen` : "erstattet, bleibt storniert"}`);
        } else if (event.type === "charge.dispute.created") {
          console.log(`💶 Chargeback ${d.id}: ${await provisionZurueck(supabase, inv, "dispute")}`);
        }
        break;
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response(`handler error: ${(err as Error).message}`, { status: 500 });
  }
});

async function affiliateByCode(code: string) {
  const { data } = await supabase.from("affiliates").select("id, email, status").eq("code", code).maybeSingle();
  if (!data || data.status !== "active") return null;
  return data;
}
