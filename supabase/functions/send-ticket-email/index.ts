import { buildTicketEingang } from "../_shared/transaktional.ts";
import { SMTPClient } from "../_shared/smtp.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { esc } from "../_shared/mailLayout.ts";
import { einzeilig } from "../_shared/authGuard.ts";

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

interface Payload {
  ticketId?: string;
}

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Hoechstens so viele Tickets je Absenderadresse pro Stunde loesen Mails aus. */
const MAX_TICKETS_PRO_STUNDE = 3;
/** Nur frisch angelegte Tickets — alte IDs lassen sich nicht erneut "abfeuern". */
const MAX_ALTER_MIN = 15;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // SICHERHEIT: Frueher kamen Empfaenger, Name, Betreff und Text aus dem
    // Request-Body — bei verify_jwt = false ein offenes Mail-Relay mit
    // unserem Absender. Jetzt zaehlt nur noch die Ticket-ID; alle Werte
    // werden serverseitig aus contact_tickets geladen, und nur ein frisch
    // angelegtes Ticket loest genau einmal Mails aus.
    const body = (await req.json().catch(() => ({}))) as Payload;
    const ticketId = String(body?.ticketId ?? "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ticketId)) {
      return json({ error: "ticketId fehlt" }, 400);
    }

    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: t, error: tErr } = await supa
      .from("contact_tickets")
      .select("id, name, email, subject, message, created_at")
      .eq("id", ticketId)
      .maybeSingle();
    if (tErr) throw new Error(`Ticket laden: ${tErr.message}`);
    if (!t) return json({ error: "Ticket nicht gefunden" }, 404);

    const alterMin = (Date.now() - new Date(t.created_at).getTime()) / 60000;
    if (!(alterMin >= -1 && alterMin <= MAX_ALTER_MIN)) {
      return json({ error: "Ticket zu alt" }, 409);
    }

    // Genau einmal je Ticket. mail_sent_at kommt mit Migration
    // 20260930120000; bis sie eingespielt ist, faellt die Sperre weg,
    // Alters- und Mengengrenze greifen trotzdem.
    const { data: claim, error: cErr } = await supa
      .from("contact_tickets")
      .update({ mail_sent_at: new Date().toISOString() } as never)
      .eq("id", ticketId)
      .is("mail_sent_at", null)
      .select("id");
    if (!cErr && (!claim || claim.length === 0)) {
      return json({ ok: true, skipped: "bereits versendet" });
    }
    if (cErr) console.warn("mail_sent_at nicht verfuegbar:", cErr.message);

    const email = einzeilig(t.email, 254).toLowerCase();
    if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) {
      return json({ error: "ungueltige Adresse" }, 400);
    }

    // Mengengrenze je Adresse (Tickets der letzten Stunde, dieses mitgezaehlt).
    const seit = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await supa
      .from("contact_tickets")
      .select("id", { count: "exact", head: true })
      .eq("email", t.email)
      .gte("created_at", seit);
    if ((count ?? 0) > MAX_TICKETS_PRO_STUNDE) {
      console.warn("send-ticket-email: Mengengrenze erreicht", ticketId);
      return json({ ok: true, skipped: "rate_limit" });
    }

    const name = einzeilig(t.name, 100).replace(/[<>"]/g, "") || "Kunde";
    const subject = einzeilig(t.subject, 150);
    const message = String(t.message ?? "").slice(0, 5000);

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

    const safe = esc;

    // 1) Admin notification
    await client.send({
      from: `GründerX Support <${ABSENDER}>`,
      to: ADMIN_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: `[Ticket] ${subject}`,
      content: `Neues Ticket von ${name} <${email}>\n\nBetreff: ${subject}\n\n${message}\n\nTicket-ID: ${ticketId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#fff;color:#111">
          <h2 style="margin:0 0 12px">Neues Support-Ticket</h2>
          <p><strong>Von:</strong> ${safe(name)} &lt;${safe(email)}&gt;</p>
          <p><strong>Betreff:</strong> ${safe(subject)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap">${safe(message)}</p>
          <p style="color:#888;font-size:12px;margin-top:24px">Ticket-ID: ${safe(ticketId)}</p>
        </div>`,
    });

    // 2) Bestaetigung an den Kunden — aus dem gemeinsamen Kit
    // (_shared/transaktional.ts). Die interne Meldung oben bleibt
    // schlichtes HTML: Sie geht an uns selbst, da waeren Markenrahmen und
    // Fusszeile nur im Weg.
    const kunde = buildTicketEingang({
      betreff: subject,
      name,
      ticketId,
      antwortInnerhalb: "24 Stunden",
    });

    await client.send({
      from: `GründerX <${ABSENDER}>`,
      to: `${name} <${email}>`,
      subject: kunde.subject,
      content: kunde.text,
      html: kunde.html,
    });

    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-ticket-email error", e);
    return new Response(JSON.stringify({ error: "Versand fehlgeschlagen" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
