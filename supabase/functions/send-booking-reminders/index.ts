// send-booking-reminders
// Wird von pg_cron alle 5 Min aufgerufen.
// Findet Bookings die 24h oder 15min vor Termin sind und schickt Reminder-Emails.

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import {
  reminder24hEmail,
  reminder15minEmail,
  type BookingRow,
} from "../_shared/booking-emails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "impressum@gruenderx.de";

interface ReminderResult {
  kind: "24h" | "15min";
  bookingId: string;
  email: string;
  status: "sent" | "error";
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const password = Deno.env.get("IONOS_SMTP_PASSWORD");
    if (!password) throw new Error("IONOS_SMTP_PASSWORD not set");

    // Beide Reminder-Typen parallel laden
    const [r24, r15] = await Promise.all([
      supa.rpc("get_bookings_needing_24h_reminder"),
      supa.rpc("get_bookings_needing_15min_reminder"),
    ]);

    if (r24.error) throw new Error(`24h-RPC: ${r24.error.message}`);
    if (r15.error) throw new Error(`15min-RPC: ${r15.error.message}`);

    const due24 = (r24.data ?? []) as BookingRow[];
    const due15 = (r15.data ?? []) as BookingRow[];

    if (due24.length === 0 && due15.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0, message: "no reminders due" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.ionos.de",
        port: 465,
        tls: true,
        auth: { username: ADMIN_EMAIL, password },
      },
    });

    const results: ReminderResult[] = [];

    // 24h-Reminders
    for (const b of due24) {
      try {
        const mail = reminder24hEmail(b);
        await client.send({
          from: `GründerX <${ADMIN_EMAIL}>`,
          to: `${b.name} <${b.email}>`,
          replyTo: ADMIN_EMAIL,
          subject: mail.subject,
          content: mail.text,
          html: mail.html,
        });
        await supa.rpc("mark_reminder_sent", { p_booking_id: b.id, p_reminder_kind: "24h" });
        results.push({ kind: "24h", bookingId: b.id, email: b.email, status: "sent" });
      } catch (e) {
        console.error("24h reminder error", b.id, e);
        results.push({
          kind: "24h",
          bookingId: b.id,
          email: b.email,
          status: "error",
          error: String((e as Error)?.message ?? e),
        });
      }
    }

    // 15min-Reminders
    for (const b of due15) {
      try {
        const mail = reminder15minEmail(b);
        await client.send({
          from: `GründerX <${ADMIN_EMAIL}>`,
          to: `${b.name} <${b.email}>`,
          replyTo: ADMIN_EMAIL,
          subject: mail.subject,
          content: mail.text,
          html: mail.html,
        });
        await supa.rpc("mark_reminder_sent", { p_booking_id: b.id, p_reminder_kind: "15min" });
        results.push({ kind: "15min", bookingId: b.id, email: b.email, status: "sent" });

        // Wenn kein Meet-Link gesetzt war: Admin-Warnung
        if (!b.meet_link?.trim()) {
          try {
            await client.send({
              from: `GründerX <${ADMIN_EMAIL}>`,
              to: ADMIN_EMAIL,
              subject: `⚠️ Meet-Link fehlt für Booking ${b.id.slice(0, 8)} — Call in 15 Min!`,
              content: `Booking ${b.id} hat keinen meet_link gesetzt.\n\nUser: ${b.name} <${b.email}>\nSlot: ${b.slot_iso}\nThema: ${b.topic}\n\nJETZT manuell Meet-Link per Email an User schicken!`,
            });
          } catch (warnErr) {
            console.error("admin warning failed", warnErr);
          }
        }
      } catch (e) {
        console.error("15min reminder error", b.id, e);
        results.push({
          kind: "15min",
          bookingId: b.id,
          email: b.email,
          status: "error",
          error: String((e as Error)?.message ?? e),
        });
      }
    }

    await client.close();

    return new Response(
      JSON.stringify({
        ok: true,
        sent: results.filter((r) => r.status === "sent").length,
        errors: results.filter((r) => r.status === "error").length,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("send-booking-reminders error", e);
    return new Response(JSON.stringify({ error: String((e as Error)?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
