// Verifizierungsmail verschicken (claim-account + mail-verifizieren, 27.10.2026).
// Setzt app_metadata.mail_verifiziert=false und den Sendezeitpunkt; siehe mailBesitz.ts.
import { verifyToken } from "./mailBesitz.ts";
import { buildMailVerifizieren } from "./transaktional.ts";
import { sendMail } from "./sendMail.ts";

// deno-lint-ignore no-explicit-any
type Any = any;

export async function verifizierungSenden(admin: Any, user: Any): Promise<boolean> {
  if (!user?.email) return false;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const token = await verifyToken(key, user.id, user.email);
  const m = buildMailVerifizieren({ link: `https://gruenderx.de/mail-bestaetigen?t=${encodeURIComponent(token)}` });
  const r = await sendMail({ to: user.email, subject: m.subject, text: m.text, html: m.html });
  if (!r.ok) console.error("❌ Verifizierungsmail:", r.error);
  await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...(user.app_metadata ?? {}), mail_verifiziert: false, mail_verify_gesendet_at: new Date().toISOString() },
  });
  return r.ok;
}
