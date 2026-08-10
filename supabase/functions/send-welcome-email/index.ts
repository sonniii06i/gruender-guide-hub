// Begrüßungsmail nach dem Kauf.
//
// WARUM ES DIE FUNKTION BRAUCHT: Vor pay-first lief die Registrierung über
// `supabase.auth.signUp`, und Supabase verschickte selbst eine
// Bestätigungsmail. Seit `claim-account` das Konto per Admin-API mit
// `email_confirm: true` anlegt, verschickt Supabase gar nichts mehr — ein
// zahlender Kunde bekam also weder Beleg noch Zugangshinweis. Es entstand
// dabei kein Fehler; es passierte schlicht nichts, und genau deshalb wäre es
// lange unbemerkt geblieben.
//
// Versand über IONOS-SMTP wie bei send-ticket-email und
// send-booking-confirmation — dieselbe Absenderadresse, damit die Zustellung
// nicht an einer neuen, nicht verifizierten Domain scheitert.

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "impressum@gruenderx.de";

interface Payload {
  email: string;
  firstName?: string;
  plan?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    if (!body?.email || !body.email.includes("@")) {
      return new Response(JSON.stringify({ error: "email fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const password = Deno.env.get("IONOS_SMTP_PASSWORD");
    if (!password) throw new Error("IONOS_SMTP_PASSWORD not set");

    const safe = (s: string) =>
      s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));

    const anrede = body.firstName ? `Hallo ${safe(body.firstName)},` : "Hallo,";
    const plan = safe(body.plan || "GründerX");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.ionos.de",
        port: 465,
        tls: true,
        auth: { username: ADMIN_EMAIL, password },
      },
    });

    await client.send({
      from: `GründerX <${ADMIN_EMAIL}>`,
      to: body.email,
      subject: "Dein Zugang zu GründerX ist bereit",
      content:
        `${body.firstName ? `Hallo ${body.firstName},` : "Hallo,"}\n\n` +
        `deine Zahlung ist eingegangen und dein Zugang (${body.plan || "GründerX"}) steht bereit.\n\n` +
        `Anmelden: https://gruenderx.de/auth\n` +
        `Deine Anmelde-Adresse ist genau die, an die diese Mail ging.\n\n` +
        `Rechnungen und Kündigung findest du im Kundenportal unter „Abo verwalten".\n` +
        `Das Abo ist monatlich kündbar.\n\n` +
        `Fragen? Einfach auf diese Mail antworten.\n\nGründerX`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#fff;color:#111">
          <h2 style="margin:0 0 16px">Dein Zugang steht bereit</h2>
          <p>${anrede}</p>
          <p>deine Zahlung ist eingegangen, dein Zugang <strong>${plan}</strong> ist freigeschaltet.</p>
          <p style="margin:24px 0">
            <a href="https://gruenderx.de/auth"
               style="background:#111;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block">
              Jetzt anmelden
            </a>
          </p>
          <p style="color:#555;font-size:14px">
            Deine Anmelde-Adresse ist genau die, an die diese Mail ging.
            Rechnungen und Kündigung findest du im Kundenportal unter „Abo verwalten“ —
            das Abo ist monatlich kündbar.
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
          <p style="color:#888;font-size:12px">Fragen? Antworte einfach auf diese Mail.</p>
        </div>`,
    });

    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("❌ send-welcome-email:", (e as Error).message);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
