// ===================================================================
// Ein SMTP-Versand fuer alle Mails.
//
// WOZU. Bisher baute jede Funktion ihren eigenen SMTPClient auf
// (send-welcome-email, send-ticket-email, send-booking-confirmation,
// send-booking-reminders) -- vier Stellen mit derselben Hostnamen-,
// Port- und Absender-Angabe. Absender und Domain muessen zusammenpassen,
// sonst scheitert die Zustellung an SPF/DKIM; das ist genau die Sorte
// Detail, die man nicht vierfach pflegen will.
//
// IMMER MIT TEXTFASSUNG. Reine HTML-Mails landen deutlich haeufiger im
// Spam, und manche Clients zeigen nichts anderes an.
// ===================================================================
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

export const MAIL_FROM = "impressum@gruenderx.de";

export interface SendResult {
  ok: boolean;
  error?: string;
}

/** Verschickt eine Mail. Wirft nie — der Aufrufer entscheidet am Ergebnis. */
export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** Ein-Klick-Abmeldung (RFC 8058). Nur fuer Marketingmails setzen. */
  unsubscribeUrl?: string;
}): Promise<SendResult> {
  const password = Deno.env.get("IONOS_SMTP_PASSWORD");
  if (!password) return { ok: false, error: "IONOS_SMTP_PASSWORD not set" };
  if (!opts.to || !opts.to.includes("@")) return { ok: false, error: "kein Empfaenger" };

  const client = new SMTPClient({
    connection: {
      hostname: "smtp.ionos.de",
      port: 465,
      tls: true,
      auth: { username: MAIL_FROM, password },
    },
  });

  try {
    await client.send({
      from: `GründerX <${MAIL_FROM}>`,
      to: opts.to,
      subject: opts.subject,
      content: opts.text,
      html: opts.html,
      // List-Unsubscribe + One-Click: Gmail und Yahoo verlangen das seit
      // Februar 2024 bei Massenversand. Ohne die Header landet Werbung
      // schneller im Spam -- und wer abmelden will, klickt sonst auf
      // "Spam melden", was der Domain dauerhaft schadet.
      ...(opts.unsubscribeUrl
        ? {
          headers: {
            "List-Unsubscribe": `<${opts.unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        }
        : {}),
    });
    await client.close();
    return { ok: true };
  } catch (e) {
    try { await client.close(); } catch { /* Verbindung war schon tot */ }
    console.error("❌ sendMail:", (e as Error).message);
    return { ok: false, error: (e as Error).message };
  }
}
