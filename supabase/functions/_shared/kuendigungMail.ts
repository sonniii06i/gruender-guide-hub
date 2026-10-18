// ===================================================================
// kuendigungMail.ts (GruenderX) — Kuendigungsbestaetigung aus Stripe-Events.
//
// SCHALTER: Nur wenn KUENDIGUNG_MAIL_AKTIV = "1" gesetzt ist, geht eine
// Mail raus. Sonst (Standard) wird nur ins Log geschrieben, was gesendet
// wuerde — "[kuendigung] TROCKEN …". Aktivieren:
//   supabase secrets set KUENDIGUNG_MAIL_AKTIV=1 --project-ref rwrjuzemkfghlziretdj
// Voraussetzung: Der Stripe-Endpunkt von stripe-affiliate-webhook muss
// customer.subscription.updated abonniert haben (deleted ist schon drin).
//
// WANN:
//   updated  -> Kuendigung wurde GERADE vorgemerkt (vorher nicht, jetzt
//               cancel_at_period_end = true oder cancel_at gesetzt).
//   deleted  -> nur bei sofortiger Kuendigung durch den Kunden
//               (cancellation_details.reason = cancellation_requested und
//               nicht schon zum Periodenende vorgemerkt). Ende nach
//               fehlgeschlagenen Zahlungen ist keine Kuendigung: keine Mail.
//
// WELCHE MARKE: nur, was sicher GruenderX ist —
//   1. eigene Tabelle subscriptions (stripe_subscription_id oder
//      stripe_customer_id) -> profiles.email, oder
//   2. Abo-Metadatum product = gruenderx | bundle (create-checkout,
//      checkout-guest) -> Mailadresse des Stripe-Kunden.
// Sonst keine Mail.
//
// Versand und Protokoll laufen ueber die EIGENE Datenbank (localDb), nicht
// ueber den AnwaltX-Hub, an dem der Affiliate-Ledger haengt.
// Doppelschutz: "kuendigung"-Versand an dieselbe Adresse in 24 h -> nichts.
// ===================================================================
import { buildKuendigung } from "./transaktional.ts";
import { sendMail } from "./mailSend.ts";

// deno-lint-ignore no-explicit-any
type Db = { from: (t: string) => any };
// deno-lint-ignore no-explicit-any
type Any = any;

const datum = (sek: number) =>
  new Date(sek * 1000).toLocaleDateString("de-DE", {
    timeZone: "Europe/Berlin", day: "2-digit", month: "2-digit", year: "numeric",
  });

/** Liefert {ende} fuer die Mail oder undefined, wenn das Event keine Kuendigung ist. */
export function kuendigungAusEvent(event: Any): { ende: string | null } | undefined {
  const sub = event.data.object;
  if (event.type === "customer.subscription.updated") {
    const prev = (event.data.previous_attributes ?? {}) as Record<string, unknown>;
    const jetzt = sub.cancel_at_period_end === true || sub.cancel_at != null;
    const alt_cape = "cancel_at_period_end" in prev ? prev.cancel_at_period_end : sub.cancel_at_period_end;
    const alt_at = "cancel_at" in prev ? prev.cancel_at : sub.cancel_at;
    const vorher = alt_cape === true || alt_at != null;
    if (!jetzt || vorher) return undefined;
    // API "basil": current_period_end steht am Abo-Posten, nicht am Abo.
    const periodenEnde = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end;
    const ende = sub.cancel_at ?? periodenEnde;
    return { ende: ende ? datum(ende) : null };
  }
  if (event.type === "customer.subscription.deleted") {
    if (sub.cancel_at_period_end === true) return undefined;
    if (sub.cancellation_details?.reason !== "cancellation_requested") return undefined;
    return { ende: null };
  }
  return undefined;
}

async function gruenderxAdresse(stripe: Any, db: Db, sub: Any): Promise<string | null> {
  const kunde = typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
  let abo: { user_id: string } | null = null;
  {
    const { data } = await db.from("subscriptions").select("user_id")
      .eq("stripe_subscription_id", sub.id).limit(1).maybeSingle();
    abo = data;
  }
  if (!abo && kunde) {
    const { data } = await db.from("subscriptions").select("user_id")
      .eq("stripe_customer_id", kunde).limit(1).maybeSingle();
    abo = data;
  }
  if (abo?.user_id) {
    const { data: p } = await db.from("profiles").select("email").eq("id", abo.user_id).maybeSingle();
    if (p?.email) return String(p.email).trim().toLowerCase();
  }
  const produkt = String(sub.metadata?.product ?? "").toLowerCase();
  if (!["gruenderx", "bundle"].includes(produkt) || !kunde) return null;
  const c = await stripe.customers.retrieve(kunde);
  const mail = c?.deleted ? null : c?.email;
  return mail ? String(mail).trim().toLowerCase() : null;
}

/** Wirft nie — eine Dienstmail darf den Zahlungs-Webhook nicht kippen. */
export async function kuendigungBestaetigen(stripe: Any, db: Db, event: Any): Promise<void> {
  try {
    const k = kuendigungAusEvent(event);
    if (!k) return;
    const sub = event.data.object;
    const an = await gruenderxAdresse(stripe, db, sub);
    if (!an) { console.log(`[kuendigung] ${sub.id}: nicht GründerX oder ohne Adresse — keine Mail`); return; }

    if (Deno.env.get("KUENDIGUNG_MAIL_AKTIV") !== "1") {
      console.log(`[kuendigung] TROCKEN (Schalter aus): würde an ${an} senden, Ende ${k.ende ?? "sofort"} (${event.type}, ${sub.id})`);
      return;
    }

    const seit = new Date(Date.now() - 24 * 3600_000).toISOString();
    const { data: schon } = await db.from("mail_events").select("id")
      .eq("campaign", "kuendigung").eq("recipient", an).eq("event", "sent")
      .gte("occurred_at", seit).limit(1);
    if (schon && schon.length) { console.log(`[kuendigung] ${an}: schon gesendet (24 h)`); return; }

    const res = await sendMail({ to: an, built: buildKuendigung({ ende: k.ende }), campaign: "kuendigung", db });
    console.log(`[kuendigung] ${an}: ${res.ok ? "gesendet " + res.id : "FEHLER " + res.reason + " " + (res.detail ?? "")}`);
  } catch (err) {
    console.error("[kuendigung] Fehler:", err);
  }
}
