// ===================================================================
// vertrag-kuendigen — Kündigungsschaltfläche nach § 312k BGB (27.10.2026,
// Pflicht für Verbraucher-Dauerschuldverhältnisse, v. a. seit dem
// 7-Tage-für-1-€-Startangebot). Muster: vertrag-widerrufen (Spam-Relay-Schutz).
//
// POST { name, email, vertrag: "abo"|"sonstiges", art: "ordentlich"|"ausserordentlich",
//        zeitpunkt: "naechstmoeglich"|"JJJJ-MM-TT", grund?, website? }
//   1. Kündigung IMMER annehmen: Beleg in mail_events (campaign "kuendigung-beleg")
//      und interne Mail an support@ – ohne Limit.
//   2. Stufe 1 (Adresse/IP, insert-then-count) und Stufe 2 (globaler Sende-Slot)
//      wie bei vertrag-widerrufen. Nur wenn beide grün sind:
//      a) Stripe: laufende Abos (active/trialing/past_due) des Kunden mit genau dieser
//         Adresse -> cancel_at_period_end = true. Trial endet damit am Ende der
//         Testphase ohne Folgezahlung. Rückgängig machbar (support@), nie sofort gelöscht.
//      b) Eingangsbestätigung mit Datum/Uhrzeit (§ 312k Abs. 4 BGB) an die Adresse.
//      Gedrosselte Anfragen bleiben angenommen (support@ bearbeitet sie von Hand).
//   Antwort verrät nie, ob zur Adresse ein Abo existiert.
//   <- { ok: true, eingang, bestaetigung: "gesendet"|"gedrosselt"|"fehlgeschlagen" }
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { sendMail } from "../_shared/mailSend.ts";
import { buildKuendigungEingang } from "../_shared/paketMail.ts";
import { bestaetigungErlaubt, clientIp, globalErlaubt, ipSchluessel, ipStufeAktiv, limitAdresse } from "../_shared/widerruf.ts";
import { KUENDIGUNG_ARTEN, KUENDIGUNG_VERTRAEGE, kuendbar, mailNorm, pruefeKuendigung } from "../_shared/kuendigen.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const SUPPORT = "support@gruenderx.de";
const datumBerlin = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "long" });

// deno-lint-ignore no-explicit-any
async function stripeKuendigen(stripe: any, email: string): Promise<{ ende?: number; ids: string[]; fehler?: string }> {
  const ids: string[] = [];
  let ende: number | undefined;
  try {
    const kunden = await stripe.customers.list({ email, limit: 20 });
    // deno-lint-ignore no-explicit-any
    const passend = kunden.data.filter((k: any) => k.email && mailNorm(k.email) === mailNorm(email));
    for (const k of passend) {
      const subs = await stripe.subscriptions.list({ customer: k.id, status: "all", limit: 20 });
      for (const s of subs.data) {
        if (!kuendbar(String(s.status))) continue;
        const neu = s.cancel_at_period_end ? s : await stripe.subscriptions.update(s.id, { cancel_at_period_end: true });
        ids.push(s.id);
        const e = neu.trial_end && s.status === "trialing" ? neu.trial_end
          : (neu.current_period_end ?? neu.items?.data?.[0]?.current_period_end);
        if (e && (!ende || e > ende)) ende = e;
      }
    }
    return { ende, ids };
  } catch (err) {
    return { ids, fehler: (err as Error).message };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  if (typeof b.website === "string" && b.website.trim()) return json({ ok: true });

  const p = pruefeKuendigung(b);
  if (!p.ok) return json({ error: "angaben", feld: p.feld }, 400);
  const d = p.daten;
  const jetzt = new Date();
  const vertragText = KUENDIGUNG_VERTRAEGE[d.vertrag];
  const artText = KUENDIGUNG_ARTEN[d.art];
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const { ip } = clientIp(req.headers, Deno.env.get("WIDERRUF_IP_HEADER"));
  const ipKey = await ipSchluessel(ip);
  const adrKey = limitAdresse(d.email);

  // 1) Annahme – nie gedrosselt.
  const { error: belegErr } = await db.from("mail_events").insert({
    brand: "gruenderx", campaign: "kuendigung-beleg", variant: "a", recipient: d.email, event: "kuendigung",
    subject: [vertragText, artText, d.zeitpunkt, d.name, d.grund ?? ""].join(" | ").slice(0, 400),
    occurred_at: jetzt.toISOString(),
  });
  if (belegErr) console.error("❌ vertrag-kuendigen: Beleg nicht gespeichert:", belegErr.message);

  // 2) Stufe 1: Limit-Zeilen eintragen, dann zählen (eigene inklusive).
  const iso = jetzt.toISOString();
  const seit = (ms: number) => new Date(jetzt.getTime() - ms).toISOString();
  const zeile = (campaign: string, recipient: string) => ({ brand: "gruenderx", campaign, variant: "a", recipient, event: "anfrage", occurred_at: iso });
  const ipAktiv = ipStufeAktiv(Deno.env.get("WIDERRUF_IP_HEADER"));
  const { error: limErr } = await db.from("mail_events")
    .insert(ipAktiv ? [zeile("kuendigung-anfrage", adrKey), zeile("kuendigung-anfrage", ipKey)] : [zeile("kuendigung-anfrage", adrKey)]);
  const zaehle = async (campaign: string, recipient: string, ms: number) => {
    if (limErr) return null;
    const { count, error } = await db.from("mail_events").select("id", { count: "exact", head: true })
      .eq("campaign", campaign).eq("recipient", recipient).gte("occurred_at", seit(ms));
    return error ? null : (count ?? 0);
  };
  const [nAdr, nIp] = await Promise.all([
    zaehle("kuendigung-anfrage", adrKey, 86400_000),
    ipAktiv ? zaehle("kuendigung-anfrage", ipKey, 3600_000) : Promise.resolve(null),
  ]);

  let bestaetigung: "gesendet" | "gedrosselt" | "fehlgeschlagen" = "gedrosselt";
  let stripeInfo = "nicht versucht (gedrosselt)";
  let endeText: string | undefined;
  if (bestaetigungErlaubt(nAdr, nIp, ipAktiv)) {
    const { data: slot, error: slotErr } = await db.from("mail_events")
      .insert(zeile("kuendigung-sendeslot", "global")).select("id").single();
    const nSlots = slotErr ? null : await zaehle("kuendigung-sendeslot", "global", 3600_000);
    const slotFreigeben = async () => { if (slot?.id) await db.from("mail_events").delete().eq("id", slot.id); };
    if (!globalErlaubt(nSlots)) {
      await slotFreigeben();
    } else {
      if (d.vertrag === "abo") {
        const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
        const r = await stripeKuendigen(stripe, d.email);
        if (r.ende) endeText = datumBerlin(r.ende);
        stripeInfo = r.fehler ? `Fehler: ${r.fehler}` : r.ids.length ? `vorgemerkt: ${r.ids.join(", ")}` : "kein laufendes Abo zu dieser Adresse";
      } else {
        stripeInfo = "anderer Vertrag – manuell";
      }
      const kunde = await sendMail({
        to: d.email, campaign: "kuendigung-eingang", db,
        built: buildKuendigungEingang({ vertrag: vertragText, art: artText, zeitpunkt: d.zeitpunkt, eingang: jetzt, endeText }),
      });
      bestaetigung = kunde.ok ? "gesendet" : "fehlgeschlagen";
      if (!kunde.ok) { await slotFreigeben(); console.error(`❌ vertrag-kuendigen: Eingangsbestätigung fehlgeschlagen (${kunde.reason})`); }
    }
  }

  const intern = await sendMail({
    to: SUPPORT, campaign: "kuendigung-intern", db, replyTo: d.email,
    built: buildKuendigungEingang({
      vertrag: vertragText, art: artText, zeitpunkt: d.zeitpunkt, eingang: jetzt, endeText,
      intern: { name: d.name, email: d.email, grund: d.grund, stripe: `${stripeInfo}; Bestätigung: ${bestaetigung}` },
    }),
  });
  if (!intern.ok) console.error(`❌ vertrag-kuendigen: interne Mail fehlgeschlagen (${intern.reason})`);
  if (!intern.ok && belegErr) return json({ ok: false, error: "nicht_gespeichert" }, 502);
  console.log(`[kuendigung] ${d.vertrag}/${d.art} stripe=${stripeInfo.split(":")[0]} bestaetigung=${bestaetigung}`);
  return json({ ok: true, eingang: jetzt.toISOString(), bestaetigung });
});
