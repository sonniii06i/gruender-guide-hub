import { buildTicketEingang } from "../_shared/transaktional.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "impressum@gruenderx.de";

interface Payload {
  ticketId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    if (!body?.email || !body?.subject || !body?.message || !body?.name) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
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

    const safe = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));

    // 1) Admin notification
    await client.send({
      from: `GründerX Support <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: `${body.name} <${body.email}>`,
      subject: `[Ticket] ${body.subject}`,
      content: `Neues Ticket von ${body.name} <${body.email}>\n\nBetreff: ${body.subject}\n\n${body.message}\n\nTicket-ID: ${body.ticketId ?? "-"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#fff;color:#111">
          <h2 style="margin:0 0 12px">Neues Support-Ticket</h2>
          <p><strong>Von:</strong> ${safe(body.name)} &lt;${safe(body.email)}&gt;</p>
          <p><strong>Betreff:</strong> ${safe(body.subject)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap">${safe(body.message)}</p>
          <p style="color:#888;font-size:12px;margin-top:24px">Ticket-ID: ${safe(body.ticketId ?? "-")}</p>
        </div>`,
    });

    // 2) Bestaetigung an den Kunden — aus dem gemeinsamen Kit
    // (_shared/transaktional.ts). Die interne Meldung oben bleibt
    // schlichtes HTML: Sie geht an uns selbst, da waeren Markenrahmen und
    // Fusszeile nur im Weg.
    const kunde = buildTicketEingang({
      betreff: body.subject,
      name: body.name,
      ticketId: body.ticketId ?? null,
      antwortInnerhalb: "24 Stunden",
    });

    await client.send({
      from: `GründerX <${ADMIN_EMAIL}>`,
      to: `${body.name} <${body.email}>`,
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
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
