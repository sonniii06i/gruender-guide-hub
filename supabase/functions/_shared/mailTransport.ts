// ===================================================================
// mailTransport.ts — der Versandweg DIESER Marke.
//
// Die einzige Datei des Mail-Kits, die sich zwischen den Marken
// unterscheidet, ohne blosse Konfiguration zu sein. Grund: Die fuenf
// Marken versenden ueber drei verschiedene Wege, und der Unterschied
// ist gewachsen, nicht gewaehlt.
//
//   AnwaltX     IONOS-SMTP ueber die Function send-email-smtp
//   GruenderX   IONOS-SMTP direkt (_shared/sendMail.ts)
//   Cardsnight  Resend
//   PheroScent  Resend
//   ArbitrageX  IONOS-SMTP direkt (Python, mailer.py)
//
// Deshalb kann die Messung NICHT an Resend haengen: Sie wuerde nur zwei
// der fuenf Marken erfassen. Sie haengt am Zaehlpixel und an den
// Klicklinks (mailTrack.ts), die jeder dieser Wege gleichermassen
// transportiert.
// ===================================================================

import type { Transport } from "./mailSend.ts";
import { sendMail as smtp } from "./sendMail.ts";

/**
 * GruenderX haelt seinen SMTP-Versand bereits in _shared/sendMail.ts.
 * Hier wird er nur in die gemeinsame Form gebracht, damit mailSend.ts in
 * allen Marken dieselbe Datei sein kann.
 *
 * SMTP kennt keine Tags und gibt keine Anbieter-ID zurueck — beides
 * braucht das Kit auch nicht: Die Zuordnung laeuft ueber die eigene
 * mailId in Pixel und Klicklinks.
 */
export const transport: Transport = async (m) => {
  const unsubscribeUrl = m.headers["List-Unsubscribe"]?.replace(/^<|>$/g, "");
  const res = await smtp({
    to: m.to,
    subject: m.subject,
    text: m.text,
    html: m.html,
    unsubscribeUrl,
  });
  return { ok: res.ok, error: res.error };
};
