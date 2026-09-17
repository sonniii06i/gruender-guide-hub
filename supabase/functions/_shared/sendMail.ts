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
import { BRANDING } from "./mailBrand.ts";

/**
 * Der SMTP-ZUGANG. Das ist eine Zugangskennung, kein Absender: IONOS
 * laesst nur das Postfach senden, mit dem man sich anmeldet (fremde
 * Adressen quittiert es mit "550 Sender address is not allowed").
 * Wer den Absender aendern will, aendert deshalb NICHT diese Zeile.
 */
export const SMTP_LOGIN = "impressum@gruenderx.de";

/**
 * Bisheriger Name derselben Konstante. Blieb erhalten, weil andere
 * Dateien ihn importieren — er meinte aber immer den Zugang.
 */
export const MAIL_FROM = SMTP_LOGIN;

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
  /** Abweichender Absender. Ohne Angabe gilt BRANDING.defaultFrom. */
  from?: string;
}): Promise<SendResult> {
  const password = Deno.env.get("IONOS_SMTP_PASSWORD");
  if (!password) return { ok: false, error: "IONOS_SMTP_PASSWORD not set" };
  if (!opts.to || !opts.to.includes("@")) return { ok: false, error: "kein Empfaenger" };

  const client = new SMTPClient({
    connection: {
      hostname: "smtp.ionos.de",
      port: 465,
      tls: true,
      auth: { username: SMTP_LOGIN, password },
    },
  });

  try {
    await client.send({
      // Der Absender kommt aus der Markendatei, nicht aus der
      // Zugangskennung. Vorher stand hier der Login selbst — dadurch
      // war BRANDING.defaultFrom fuer diesen Versandweg wirkungslos,
      // und jede Mail ging als impressum@ raus, egal was dort stand.
      from: opts.from ?? BRANDING.defaultFrom,
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
