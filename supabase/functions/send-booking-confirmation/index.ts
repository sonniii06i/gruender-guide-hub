// send-booking-confirmation
// Wird direkt nach Booking-Insert vom Client gecallt.
// Schickt: (1) User-Email mit ICS-Anhang  (2) Admin-Notification

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import {
  buildIcs,
  confirmationEmail,
  adminNotifyEmail,
  encodeMimeSubject,
  type BookingRow,
} from "../_shared/booking-emails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * SMTP-ZUGANG, nicht Absender: IONOS laesst nur das Postfach senden, mit
 * dem man sich anmeldet. Der sichtbare Absender steht in ABSENDER.
 */
const SMTP_LOGIN = "impressum@gruenderx.de";

/** Bisheriger Name derselben Konstante — meinte immer den Zugang. */
const ADMIN_EMAIL = SMTP_LOGIN;

/**
 * Die Adresse, die der Empfaenger sieht und an der das Profilbild
 * haengt. "impressum@" stand hier, weil Zugang und Absender dieselbe
 * Konstante waren; als Absender einer Support- oder Terminmail ist das
 * die falsche Ansage. IONOS nimmt eine andere Adresse DERSELBEN Domain
 * an (geprueft am 17.09.2026 mit einem echten Versand) — eine fremde
 * Domain quittiert es mit "550 Sender address is not allowed".
 */
const ABSENDER = "service@gruenderx.de";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { bookingId } = (await req.json()) as { bookingId?: string };
    if (!bookingId) {
      return new Response(JSON.stringify({ error: "Missing bookingId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Booking laden — verifies dass die ID gültig ist + holt Daten serverseitig
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: booking, error: fetchErr } = await supa
      .from("bookings")
      .select("id, slot_iso, name, email, topic, message, meet_link, confirmation_sent_at")
      .eq("id", bookingId)
      .maybeSingle();

    if (fetchErr || !booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Idempotenz: wenn schon gesendet, nicht nochmal
    if (booking.confirmation_sent_at) {
      return new Response(JSON.stringify({ ok: true, skipped: "already_sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const password = Deno.env.get("IONOS_SMTP_PASSWORD");
    if (!password) throw new Error("IONOS_SMTP_PASSWORD not set");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.ionos.de",
        port: 465,
        tls: true,
        auth: { username: ADMIN_EMAIL, password },
      },
    });

    const b = booking as BookingRow;
    const userMail = confirmationEmail(b);
    const adminMail = adminNotifyEmail(b);
    const ics = buildIcs(b);

    // 1) User-Email mit ICS-Anhang
    await client.send({
      from: `GruenderX 1:1 <${ABSENDER}>`,
      to: `${b.name} <${b.email}>`,
      replyTo: ADMIN_EMAIL,
      subject: encodeMimeSubject(userMail.subject),
      content: userMail.text,
      html: userMail.html,
      attachments: [
        {
          contentType: "text/calendar; method=REQUEST; charset=UTF-8",
          filename: `gruenderx-call-${b.slot_iso.slice(0, 10)}.ics`,
          encoding: "text",
          content: ics,
        },
      ],
    });

    // 2) Admin-Notification
    await client.send({
      from: `GruenderX Booking <${ABSENDER}>`,
      to: ADMIN_EMAIL,
      replyTo: `${b.name} <${b.email}>`,
      subject: encodeMimeSubject(adminMail.subject),
      content: adminMail.text,
      html: adminMail.html,
    });

    await client.close();

    // Mark als gesendet
    await supa.rpc("mark_reminder_sent", {
      p_booking_id: bookingId,
      p_reminder_kind: "confirmation",
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-booking-confirmation error", e);
    return new Response(JSON.stringify({ error: String((e as Error)?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
