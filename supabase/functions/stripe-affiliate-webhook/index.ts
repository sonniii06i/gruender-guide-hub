// ===================================================================
// stripe-affiliate-webhook (GruenderX): 20 % Affiliate-Provision je Zahlung.
// Events: checkout.session.completed, checkout.session.expired,
//         invoice.payment_succeeded, customer.subscription.updated,
//         customer.subscription.deleted, charge.refunded.
// Zusätzlich spiegelt der Webhook Laufzeitende und Kündigung in die lokale
// Tabelle `subscriptions` (siehe syncAboZeile) — vorher blieb ein gekündigtes
// Abo dort "active", bis der Kunde die App wieder öffnete.
// verify_jwt = false; Signaturpruefung mit STRIPE_WEBHOOK_SECRET.
// Produkt aus session.metadata.product ('gruenderx' | 'bundle', Fallback gruenderx).
// ===================================================================
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sendMetaCapiEvent } from "../_shared/metaCapi.ts";
import { type Produkt } from "../_shared/campaigns.ts";
import { abTestStrecke } from "../_shared/mailSend.ts";
import { meldeVerkauf } from "../_shared/discordSales.ts";
import { hatBereitsGekauft } from "../_shared/cartKauf.ts";
import { ilikeExakt } from "../_shared/emailMatch.ts";
import { aboSyncPatch, type AboLike, type LokaleAboZeile } from "../_shared/aboSync.ts";

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
const RATE = 0.20;

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
        //
        // Die Adresse wird normalisiert verglichen: Die Zeilen aus dem
        // expired-Handler sind kleingeschrieben, Stripe meldet die getippte
        // Schreibweise. Fuer die gekaufte Session wird zusaetzlich eine Zeile
        // MIT gekauft_at angelegt (Gast-Checkout legt vorher keine an) — so
        // erkennt der expired-Handler einer aelteren, abgebrochenen Session
        // den Kauf, auch wenn das Ereignis erst Stunden spaeter eintrifft.
        {
          const kaeuferRoh = s.customer_details?.email ?? s.customer_email ?? null;
          const kaeufer = kaeuferRoh ? String(kaeuferRoh).trim().toLowerCase() : null;
          const jetzt = new Date().toISOString();
          if (kaeufer) {
            const { error: kErr } = await localDb.from("cart_abandons").upsert({
              session_id: s.id,
              email: kaeufer,
              gekauft_at: jetzt,
            }, { onConflict: "session_id" });
            // Best effort, NICHT werfen: Ein 500 liesse Stripe das ganze Ereignis
            // wiederholen — meldeVerkauf oben postete dann jedes Mal erneut nach
            // Discord, und Meta-CAPI/Referral unten liefen erst nach einem
            // geglueckten Retry. Zusaetzlich prueft der expired-Handler per
            // hatBereitsGekauft (Konto mit Zugang) vor jeder Abbruch-Mail.
            if (kErr) console.error(`[cart] Kaufmarker fehlgeschlagen (${s.id}): ${kErr.message}`);
            const { error: aErr } = await localDb.from("cart_abandons")
              .update({ gekauft_at: jetzt })
              .ilike("email", ilikeExakt(kaeufer)).is("gekauft_at", null);
            if (aErr) console.error(`[cart] Abraeumen per Adresse fehlgeschlagen (${s.id}): ${aErr.message}`);
          } else {
            const { error: sErr } = await localDb.from("cart_abandons")
              .update({ gekauft_at: jetzt }).eq("session_id", s.id);
            if (sErr) console.error(`[cart] Abraeumen per Session fehlgeschlagen (${s.id}): ${sErr.message}`);
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
        if (buyerEmail && buyerEmail === (aff.email || "").toLowerCase()) break; // Selbst-Referral
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

        // Verlaengerung: Laufzeitende in `subscriptions` nachziehen und eine
        // im Mahnlauf entzogene Zeile wieder freischalten (aboSyncPatch).
        // Dieses Ereignis ist am Endpunkt sicher abonniert.
        const stripeSub = await stripe.subscriptions.retrieve(String(subId));
        await syncAboZeile(stripeSub as unknown as AboLike, false);

        let { data: ref } = await supabase
          .from("affiliate_referrals")
          .select("id, affiliate_id, product, status")
          .eq("stripe_subscription_id", String(subId))
          .maybeSingle();
        // Stripe garantiert keine Reihenfolge: Die erste Rechnung kommt oft VOR
        // checkout.session.completed an. Dann gab es die Referral-Zeile noch
        // nicht, und die Provision des ersten Monats ging verloren. Die
        // Zuordnung steht auch in den Abo-Metadaten (subscription_data) —
        // dieselbe Pruefung wie in checkout.session.completed.
        if (!ref) {
          const code = String(stripeSub.metadata?.affiliate_ref ?? "").trim();
          if (!code) break;
          const aff = await affiliateByCode(code);
          if (!aff) break;
          const buyerEmail = String(inv.customer_email ?? "").trim().toLowerCase();
          if (buyerEmail && buyerEmail === (aff.email || "").toLowerCase()) break; // Selbst-Referral
          const { error: upErr } = await supabase.from("affiliate_referrals").upsert({
            affiliate_id: aff.id,
            product: stripeSub.metadata?.product || "gruenderx",
            referred_email: buyerEmail || null,
            stripe_customer_id: typeof inv.customer === "string" ? inv.customer : null,
            stripe_subscription_id: String(subId),
            status: "active",
          }, { onConflict: "stripe_subscription_id", ignoreDuplicates: true });
          if (upErr) throw upErr;
          ({ data: ref } = await supabase
            .from("affiliate_referrals")
            .select("id, affiliate_id, product, status")
            .eq("stripe_subscription_id", String(subId))
            .maybeSingle());
        }
        if (!ref || ref.status !== "active") break;
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
        const email = (s.customer_details?.email || s.customer_email || "")
          .trim().toLowerCase();
        if (!email || !email.includes("@")) break;

        // Hat die Adresse inzwischen gekauft (zweite Session, Reseller, Konto
        // mit aktivem Zugang)? Dann keine Strecke. Das expired-Event kommt erst
        // ~24 h nach dem Abbruch — ein Kauf dazwischen ist der Normalfall.
        const seit = typeof s.created === "number" ? new Date(s.created * 1000).toISOString() : null;
        if (await hatBereitsGekauft(localDb, email, seit)) {
          console.log(`[abbruch] uebersprungen, bereits gekauft: ${email}`);
          break;
        }

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
        }, { onConflict: "session_id", ignoreDuplicates: true });
        console.log(caErr
          ? `[abbruch] cart_abandons FEHLER ${email}: ${caErr.message}`
          : `[abbruch] vorgemerkt: ${email} (${produkt})`);
        break;
      }

      case "customer.subscription.updated": {
        await syncAboZeile(event.data.object as unknown as AboLike, false);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await supabase.from("affiliate_referrals").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
        await syncAboZeile(sub as AboLike, true);
        break;
      }

      case "charge.refunded": {
        // Seit API basil hat die Charge kein Feld `invoice` mehr — Zahlungen
        // haengen ueber InvoicePayments an der Rechnung. `ch.invoice` war damit
        // immer undefined, und keine Provision wurde je storniert.
        const ch = event.data.object as any;
        const invoiceId = await invoiceIdOfCharge(ch);
        if (!invoiceId) break;
        const amount = Number(ch.amount ?? 0);
        const refunded = Number(ch.amount_refunded ?? 0);
        if (ch.refunded === true || (amount > 0 && refunded >= amount)) {
          const { error } = await supabase.from("affiliate_commissions").update({ status: "reversed" })
            .eq("stripe_invoice_id", invoiceId).neq("status", "paid");
          if (error) throw error;
        } else if (amount > 0 && refunded > 0) {
          // Teilerstattung: Provision anteilig kuerzen. Aus base_cents neu
          // gerechnet (amount_refunded ist kumuliert) → wiederholbar.
          const anteil = 1 - refunded / amount;
          const { data: rows, error } = await supabase.from("affiliate_commissions")
            .select("id, base_cents, rate, status")
            .eq("stripe_invoice_id", invoiceId).neq("status", "paid");
          if (error) throw error;
          for (const r of rows ?? []) {
            if (r.status === "reversed") continue;
            const neu = Math.max(0, Math.round((r.base_cents ?? 0) * anteil * Number(r.rate ?? RATE)));
            const { error: uErr } = await supabase.from("affiliate_commissions")
              .update({ commission_cents: neu }).eq("id", r.id);
            if (uErr) throw uErr;
          }
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

/** Rechnung zur Charge — basil: ueber InvoicePayments, aeltere Versionen: ch.invoice. */
type ChargeLike = {
  invoice?: string | { id?: string } | null;
  payment_intent?: string | { id?: string } | null;
};
type InvoicePaymentsApi = {
  invoicePayments: {
    list(p: { payment: { type: "payment_intent"; payment_intent: string }; limit: number }):
      Promise<{ data?: Array<{ invoice?: string | { id: string } | null }> }>;
  };
};
async function invoiceIdOfCharge(ch: ChargeLike): Promise<string | null> {
  if (typeof ch.invoice === "string") return ch.invoice;
  if (ch.invoice?.id) return String(ch.invoice.id);
  const pi = typeof ch.payment_intent === "string" ? ch.payment_intent : ch.payment_intent?.id;
  if (!pi) return null;
  const list = await (stripe as unknown as InvoicePaymentsApi).invoicePayments.list({
    payment: { type: "payment_intent", payment_intent: pi },
    limit: 1,
  });
  const inv = list?.data?.[0]?.invoice;
  return inv ? (typeof inv === "string" ? inv : String(inv.id)) : null;
}

/**
 * Spiegelt ein Stripe-Abo in die LOKALE Tabelle `subscriptions`.
 * Angefasst werden nur Zeilen, die zu genau diesem Abo gehoeren (bzw. per
 * Kunden-ID/Metadaten ohne eigenes Abo), mit source 'stripe' und ohne
 * comp_access. Was genau geschrieben wird, entscheidet aboSyncPatch
 * (_shared/aboSync.ts): Laufzeitende nachziehen, nach geglueckter Zahlung
 * wieder freischalten, bei endgueltigem Ende entziehen. past_due/paused
 * entziehen nicht (Mahnlauf — Geschaeftsentscheidung des Betreibers).
 */
async function syncAboZeile(sub: AboLike, geloescht: boolean) {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null;

  const spalten = "user_id, status, source, comp_access, stripe_subscription_id";
  let { data: rows, error } = await localDb.from("subscriptions").select(spalten).eq("stripe_subscription_id", sub.id);
  if (error) throw new Error(`subscriptions lesen: ${error.message}`);
  if (!rows?.length && customerId) {
    ({ data: rows, error } = await localDb.from("subscriptions").select(spalten).eq("stripe_customer_id", customerId));
    if (error) throw new Error(`subscriptions lesen: ${error.message}`);
  }
  const uid = sub.metadata?.supabase_user_id;
  if (!rows?.length && uid) {
    ({ data: rows, error } = await localDb.from("subscriptions").select(spalten).eq("user_id", uid));
    if (error) throw new Error(`subscriptions lesen: ${error.message}`);
  }

  for (const r of (rows ?? []) as LokaleAboZeile[]) {
    const patch = aboSyncPatch(r, sub, geloescht);
    if (!patch) continue;
    const { error: uErr } = await localDb.from("subscriptions")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("user_id", r.user_id);
    if (uErr) throw new Error(`subscriptions schreiben: ${uErr.message}`);
    console.log(`[abo-sync] ${r.user_id}: ${sub.id} ${sub.status}${geloescht ? " (geloescht)" : ""} -> ${patch.status ?? r.status}`);
  }
}

async function affiliateByCode(code: string) {
  const { data } = await supabase.from("affiliates").select("id, email, status").eq("code", code).maybeSingle();
  if (!data || data.status !== "active") return null;
  return data;
}
