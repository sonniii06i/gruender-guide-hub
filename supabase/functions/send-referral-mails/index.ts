// ===================================================================
// send-referral-mails — Empfehlungsmail sieben Tage nach dem Kauf.
//
// Von pg_cron einmal taeglich aufgerufen, wie send-booking-reminders.
//
// WARUM DER MERKER IN STRIPE STEHT UND NICHT BEI UNS.
// Der Job laeuft taeglich; ohne Merker bekaeme derselbe Kunde die Mail jeden
// Tag erneut. Ein Zeitfenster ("genau am siebten Tag") waere der einfache
// Weg, aber dann verliert ein einziger ausgefallener Lauf eine ganze
// Tageskohorte fuer immer. Also: Merker in den Metadaten des Abos
// (`referral_mail_sent`). Stripe kennt das Abo ohnehin, der Merker
// ueberlebt jeden Neustart, und es braucht keine eigene Tabelle.
//
// DER MERKER WIRD ERST NACH BESTAETIGTEM VERSAND GESETZT. Genau das ist bei
// ArbitrageX am 10.09.2026 schiefgegangen: fuenf Nutzer bekamen den
// "verschickt"-Merker, waehrend der Versand im Hintergrund-Thread abgeraeumt
// wurde. Hier wird auf sendMail() gewartet und nur bei ok:true gemerkt.
//
// AB_DATUM ist die Untergrenze. Ohne sie bekaeme beim ersten Lauf jeder
// Bestandskunde die Mail gleichzeitig -- eine Welle, die niemand bestellt
// hat und die der Domain-Reputation schadet.
// ===================================================================
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { buildReferral, type Produkt } from "../_shared/campaigns.ts";
import { sendMail } from "../_shared/sendMail.ts";
import { unsubscribeUrl } from "../_shared/unsubscribe.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2025-08-27.basil",
});
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SITE = "https://gruenderx.de";
const FUNCTIONS_URL = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;
const NACH_TAGEN = 7;
const FLAG = "referral_mail_sent";
/** Kein Bestandskunden-Schwall beim ersten Lauf. */
const AB_DATUM = Date.parse(Deno.env.get("REFERRAL_START_DATE") || "2026-09-10T00:00:00Z") / 1000;

Deno.serve(async (req) => {
  const dryRun = new URL(req.url).searchParams.get("dry_run") === "1";
  const bis = Math.floor(Date.now() / 1000) - NACH_TAGEN * 86400;
  const ab = Math.max(AB_DATUM, bis - 60 * 86400); // 60 Tage Rueckschau genuegt

  let geprueft = 0, gesendet = 0, uebersprungen = 0;
  const fehler: string[] = [];

  try {
    // Ohne UNSUBSCRIBE_SECRET gibt es keinen funktionierenden Widerspruchsweg.
    // Dann gar nicht senden: § 7 Abs. 3 UWG verlangt den bei JEDER Mail.
    if (!Deno.env.get("UNSUBSCRIBE_SECRET")) {
      return Response.json(
        { ok: false, error: "UNSUBSCRIBE_SECRET fehlt — ohne Abmeldeweg kein Versand" },
        { status: 500 },
      );
    }

    for await (const sub of stripe.subscriptions.list({
      status: "all",
      created: { gte: ab, lte: bis },
      expand: ["data.customer"],
      limit: 100,
    })) {
      geprueft++;
      if (!["active", "trialing"].includes(sub.status)) { uebersprungen++; continue; }
      if (sub.metadata?.[FLAG]) { uebersprungen++; continue; }

      const customer = sub.customer as Stripe.Customer | string;
      const email = typeof customer === "string"
        ? null
        : (customer.email || "").trim().toLowerCase();
      if (!email) { uebersprungen++; continue; }

      // Wer widersprochen hat, bekommt keine Werbung mehr — und der Merker
      // wird gesetzt, damit er auch morgen nicht wieder geprueft wird.
      const { data: out, error: outErr } = await supabase
        .from("mail_optouts").select("email").eq("email", email).maybeSingle();
      // Sperrliste nicht lesbar -> nicht senden. Lieber eine Mail zu wenig als
      // eine an jemanden, der ausdruecklich widersprochen hat.
      if (outErr) {
        fehler.push(`${email}: Sperrliste nicht lesbar (${outErr.message})`);
        continue;
      }
      if (out) {
        uebersprungen++;
        if (!dryRun) {
          await stripe.subscriptions.update(sub.id, { metadata: { [FLAG]: "optout" } });
        }
        continue;
      }

      const produkt: Produkt = sub.metadata?.product === "bundle" ? "bundle" : "gruenderx";
      const name = typeof customer === "string" ? null : (customer.name || null);
      // Nur der Vorname — "Hallo Sonni Buttke GmbH," liest sich wie Serienpost.
      const vorname = (name || "").trim().split(/\s+/)[0] || null;

      if (dryRun) {
        console.log(`[referral] WUERDE senden an ${email} (${produkt})`);
        gesendet++;
        continue;
      }

      const abmelden = await unsubscribeUrl(email, FUNCTIONS_URL);
      const mail = buildReferral({
        name: vorname,
        produkt,
        baseUrl: SITE,
        unsubscribeUrl: abmelden,
      });
      const res = await sendMail({
        to: email,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        unsubscribeUrl: abmelden,
      });

      if (res.ok) {
        // Erst jetzt merken. Schlaegt das Setzen fehl, bekaeme der Kunde die
        // Mail morgen ein zweites Mal -- das ist das kleinere Uebel gegenueber
        // einem Merker ohne Mail.
        await stripe.subscriptions.update(sub.id, {
          metadata: { [FLAG]: String(Math.floor(Date.now() / 1000)) },
        });
        gesendet++;
        console.log(`[referral] -> ${email}`);
      } else {
        fehler.push(`${email}: ${res.error}`);
        console.error(`[referral] FEHLER ${email}: ${res.error}`);
      }
    }

    return Response.json({ ok: true, dryRun, geprueft, gesendet, uebersprungen, fehler });
  } catch (e) {
    console.error("❌ send-referral-mails:", (e as Error).message);
    return Response.json(
      { ok: false, error: (e as Error).message, geprueft, gesendet, fehler },
      { status: 500 },
    );
  }
});
