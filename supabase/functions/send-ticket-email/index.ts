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
        port: 587,
        tls: false,
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

    // 2) User confirmation
    await client.send({
      from: `GründerX <${ADMIN_EMAIL}>`,
      to: `${body.name} <${body.email}>`,
      subject: `Wir haben deine Anfrage erhalten: ${body.subject}`,
      content: `Hallo ${body.name},\n\ndanke für deine Nachricht. Wir melden uns innerhalb von 24h.\n\nDeine Anfrage:\n${body.message}\n\nViele Grüße\nDein GründerX Team`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;color:#111">
          <h2 style="margin:0 0 12px">Danke für deine Anfrage, ${safe(body.name)}!</h2>
          <p>Wir haben dein Ticket erhalten und melden uns in der Regel innerhalb von 24 Stunden.</p>
          <div style="background:#f6f7f9;border-radius:12px;padding:16px;margin:16px 0">
            <p style="margin:0 0 8px"><strong>Betreff:</strong> ${safe(body.subject)}</p>
            <p style="margin:0;white-space:pre-wrap;color:#444">${safe(body.message)}</p>
          </div>
          <p style="color:#666;font-size:14px">Viele Grüße<br/>Dein GründerX Team</p>
        </div>`,
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
