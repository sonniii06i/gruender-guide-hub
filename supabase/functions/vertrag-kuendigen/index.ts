// ===================================================================
// vertrag-kuendigen — Kündigungsschaltfläche nach § 312k BGB (27.10.2026,
// Pflicht für Verbraucher-Dauerschuldverhältnisse, v. a. seit dem
// 7-Tage-für-1-€-Startangebot). Muster: vertrag-widerrufen (Spam-Relay-Schutz).
//
// Security-Review 27.10.: Ohne Identitätsprüfung könnte jeder mit einer fremden
// Adresse ein fremdes Abo in Stripe beenden. Darum zwei Schritte:
//
// POST { name, email, vertrag, art, zeitpunkt, grund?, website? }   (Erklärung)
//   1. Kündigung IMMER annehmen: Beleg in mail_events (campaign "kuendigung-beleg",
//      link "kn:<nonce>") + interne Mail an support@ – ohne Limit.
//   2. Eingeloggte Sitzung mit derselben Adresse -> Stripe sofort vormerken.
//      Sonst: Eingangsbestätigung (§ 312k Abs. 4) mit signiertem, einmaligem,
//      7 Tage gültigem Bestätigungslink an genau diese Adresse (Limits wie widerruf).
// POST { aktion: "bestaetigen", token }   (Klick auf der Seite /kuendigen/bestaetigen)
//   -> Token gegen die gespeicherte Adresse prüfen, einmalig, dann Stripe vormerken.
// POST { aktion: "eskalieren" } + Header x-kuendigung-cron (KUENDIGUNG_CRON_SECRET)
//   -> unbestätigte Kündigungen älter als 48 h einmalig an support@ (manueller Fall).
// Stripe: laufende Abos (active/trialing/past_due) -> cancel_at_period_end = true
// (Startangebot: Ende der Testphase, keine Folgezahlung). Antwort verrät nie,
// ob zur Adresse ein Abo existiert.
// ===================================================================

import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { sendMail } from "../_shared/mailSend.ts";
import { buildKuendigungEingang } from "../_shared/paketMail.ts";
import { bestaetigungErlaubt, clientIp, globalErlaubt, ipSchluessel, ipStufeAktiv, limitAdresse } from "../_shared/widerruf.ts";
import { mailVerifiziert } from "../_shared/mailBesitz.ts";
import {
  KUENDIGUNG_ARTEN, KUENDIGUNG_VERTRAEGE, LINK_GUELTIG_S, kuendbar, mailExakt, neueNonce, pruefeKuendigung,
  signiereKuendigung, tokenGueltig, zerlegeToken,
} from "../_shared/kuendigen.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const SUPPORT = "service@gruenderx.de";
const SEITE = "https://gruenderx.de";
const datumBerlin = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "long" });

// deno-lint-ignore no-explicit-any
async function stripeKuendigen(email: string): Promise<{ ende?: number; ids: string[]; fehler?: string }> {
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
  const ids: string[] = [];
  let ende: number | undefined;
  try {
    const kunden = await stripe.customers.list({ email, limit: 20 });
    // deno-lint-ignore no-explicit-any
    // Autorisierung nur über die EXAKTE Adresse (Review 27.10.): a+x@ darf nie das Abo von a@ beenden.
    const passend = kunden.data.filter((k: any) => k.email && mailExakt(k.email) === mailExakt(email));
    for (const k of passend) {
      const subs = await stripe.subscriptions.list({ customer: k.id, status: "all", limit: 20 });
      for (const s of subs.data) {
        if (!kuendbar(String(s.status))) continue;
        // deno-lint-ignore no-explicit-any
        const neu: any = s.cancel_at_period_end ? s : await stripe.subscriptions.update(s.id, { cancel_at_period_end: true });
        ids.push(s.id);
        const e = s.status === "trialing" && neu.trial_end ? neu.trial_end
          : (neu.current_period_end ?? neu.items?.data?.[0]?.current_period_end);
        if (e && (!ende || e > ende)) ende = e;
      }
    }
    return { ende, ids };
  } catch (err) {
    return { ids, fehler: (err as Error).message };
  }
}

const stripeText = (r: { ids: string[]; fehler?: string }) =>
  r.fehler ? `Fehler: ${r.fehler}` : r.ids.length ? `vorgemerkt: ${r.ids.join(", ")}` : "kein laufendes Abo zu dieser Adresse";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const secret = Deno.env.get("KUENDIGUNG_SECRET") || "";
  const jetzt = new Date();

  // ---- Bestätigungslink ------------------------------------------------------
  if (b.aktion === "bestaetigen") {
    const t = zerlegeToken(String(b.token ?? ""));
    if (!t) return json({ error: "token" }, 400);
    const { data: beleg } = await db.from("mail_events").select("id, recipient, subject")
      .eq("campaign", "kuendigung-beleg").eq("link", `kn:${t.nonce}`).maybeSingle();
    if (!beleg || !(await tokenGueltig(String(b.token), beleg.recipient, secret))) return json({ error: "token" }, 400);
    // Einmalig: Bestätigung eintragen, dann zählen (eigene inklusive) -> kein Doppel.
    await db.from("mail_events").insert({ brand: "gruenderx", campaign: "kuendigung-bestaetigt", variant: "a",
      recipient: beleg.recipient, event: "bestaetigt", link: `kn:${t.nonce}`, occurred_at: jetzt.toISOString() });
    const { count } = await db.from("mail_events").select("id", { count: "exact", head: true })
      .eq("campaign", "kuendigung-bestaetigt").eq("link", `kn:${t.nonce}`);
    if ((count ?? 0) > 1) return json({ ok: true, schon: true });
    const r = await stripeKuendigen(beleg.recipient);
    await sendMail({ to: SUPPORT, campaign: "kuendigung-intern", db, replyTo: beleg.recipient,
      built: buildKuendigungEingang({ vertrag: "bestätigt per Link", art: "-", zeitpunkt: "naechstmoeglich", eingang: jetzt,
        endeText: r.ende ? datumBerlin(r.ende) : undefined,
        intern: { name: "-", email: beleg.recipient, stripe: `${stripeText(r)} (Beleg ${beleg.subject})` } }) });
    console.log(`[kuendigung] bestaetigt stripe=${stripeText(r).split(":")[0]}`);
    return json({ ok: true, ende: r.ende ? datumBerlin(r.ende) : null, fehler: !!r.fehler });
  }

  // ---- Eskalation unbestätigter Kündigungen (Cron) -------------------------------
  if (b.aktion === "eskalieren") {
    const cron = Deno.env.get("KUENDIGUNG_CRON_SECRET") || "";
    if (!cron || req.headers.get("x-kuendigung-cron") !== cron) return json({ error: "auth" }, 401);
    const grenze = new Date(jetzt.getTime() - 48 * 3600_000).toISOString();
    const { data: belege } = await db.from("mail_events").select("recipient, subject, link, occurred_at")
      .eq("campaign", "kuendigung-beleg").lt("occurred_at", grenze)
      .gte("occurred_at", new Date(jetzt.getTime() - 30 * 86400_000).toISOString()).limit(200);
    let n = 0;
    for (const x of belege ?? []) {
      if (!x.link) continue;
      const { count: best } = await db.from("mail_events").select("id", { count: "exact", head: true })
        .in("campaign", ["kuendigung-bestaetigt", "kuendigung-eskaliert"]).eq("link", x.link);
      if ((best ?? 0) > 0) continue;
      const m = await sendMail({ to: SUPPORT, campaign: "kuendigung-intern", db, replyTo: x.recipient,
        built: buildKuendigungEingang({ vertrag: "UNBESTÄTIGT nach 48 h – bitte von Hand bearbeiten", art: "-",
          zeitpunkt: "naechstmoeglich", eingang: new Date(x.occurred_at),
          intern: { name: "-", email: x.recipient, stripe: `nicht vorgemerkt (Beleg ${x.subject})` } }) });
      if (m.ok) {
        await db.from("mail_events").insert({ brand: "gruenderx", campaign: "kuendigung-eskaliert", variant: "a",
          recipient: x.recipient, event: "eskaliert", link: x.link, occurred_at: jetzt.toISOString() });
        n++;
      }
    }
    return json({ ok: true, eskaliert: n });
  }

  // ---- Erklärung ------------------------------------------------------------------
  if (typeof b.website === "string" && b.website.trim()) return json({ ok: true });
  const p = pruefeKuendigung(b);
  if (!p.ok) return json({ error: "angaben", feld: p.feld }, 400);
  const d = p.daten;
  const vertragText = KUENDIGUNG_VERTRAEGE[d.vertrag];
  const artText = KUENDIGUNG_ARTEN[d.art];
  const { ip } = clientIp(req.headers, Deno.env.get("WIDERRUF_IP_HEADER"));
  const ipKey = await ipSchluessel(ip);
  const adrKey = limitAdresse(d.email);
  const nonce = neueNonce();

  // 1) Annahme – nie gedrosselt.
  const { error: belegErr } = await db.from("mail_events").insert({
    brand: "gruenderx", campaign: "kuendigung-beleg", variant: "a", recipient: d.email, event: "kuendigung", link: `kn:${nonce}`,
    subject: [vertragText, artText, d.zeitpunkt, d.name, d.grund ?? ""].join(" | ").slice(0, 400),
    occurred_at: jetzt.toISOString(),
  });
  if (belegErr) console.error("❌ vertrag-kuendigen: Beleg nicht gespeichert:", belegErr.message);

  // 2) Eingeloggte Sitzung mit derselben Adresse -> sofort.
  let eingeloggtPasst = false;
  let sessionMail = "";
  const auth = req.headers.get("authorization") ?? "";
  if (auth.startsWith("Bearer ")) {
    const { data } = await db.auth.getUser(auth.slice(7)).catch(() => ({ data: null }));
    const mail = data?.user?.email;
    if (mail && mailVerifiziert(data?.user) && mailExakt(mail) === mailExakt(d.email)) {   // 27.10.2026: nur nachgewiesene Adresse
      eingeloggtPasst = true;
      sessionMail = mailExakt(mail);
    }
  }

  // 3) Limits (Adresse/IP, global) wie vertrag-widerrufen.
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
  let stripeInfo = "wartet auf Bestätigungslink";
  let endeText: string | undefined;
  if (eingeloggtPasst && d.vertrag === "abo") {
    const r = await stripeKuendigen(sessionMail);   // E-Mail der Sitzung, nie die eingegebene
    stripeInfo = `eingeloggt: ${stripeText(r)}`;
    if (r.ende) endeText = datumBerlin(r.ende);
    await db.from("mail_events").insert({ brand: "gruenderx", campaign: "kuendigung-bestaetigt", variant: "a",
      recipient: d.email, event: "eingeloggt", link: `kn:${nonce}`, occurred_at: iso });
  } else if (d.vertrag !== "abo") {
    stripeInfo = "anderer Vertrag – manuell";
  }
  if (bestaetigungErlaubt(nAdr, nIp, ipAktiv)) {
    const { data: slot, error: slotErr } = await db.from("mail_events")
      .insert(zeile("kuendigung-sendeslot", "global")).select("id").single();
    const nSlots = slotErr ? null : await zaehle("kuendigung-sendeslot", "global", 3600_000);
    const slotFreigeben = async () => { if (slot?.id) await db.from("mail_events").delete().eq("id", slot.id); };
    if (!globalErlaubt(nSlots)) {
      await slotFreigeben();
    } else {
      let bestaetigenUrl: string | undefined;
      if (!eingeloggtPasst && d.vertrag === "abo" && secret) {
        const token = await signiereKuendigung(nonce, Math.floor(jetzt.getTime() / 1000) + LINK_GUELTIG_S, d.email, secret);
        bestaetigenUrl = `${SEITE}/kuendigen/bestaetigen?token=${token}`;
      }
      const kunde = await sendMail({
        to: d.email, campaign: "kuendigung-eingang", db,
        built: buildKuendigungEingang({ vertrag: vertragText, art: artText, zeitpunkt: d.zeitpunkt, eingang: jetzt, endeText, bestaetigenUrl }),
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
  console.log(`[kuendigung] ${d.vertrag}/${d.art} ${stripeInfo.split(":")[0]} bestaetigung=${bestaetigung}`);
  return json({ ok: true, eingang: iso, bestaetigung });
});
