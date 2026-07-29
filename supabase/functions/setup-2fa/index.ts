// Richtet TOTP fuer den angemeldeten Nutzer ein.
// Liefert QR-Code + Backup-Codes zurueck. Aktiviert wird 2FA erst, wenn der
// Nutzer ueber verify-2fa einen gueltigen Code bestaetigt hat.

import { toDataURL } from "npm:qrcode@1.5.3";
import {
  adminClient,
  AuthError,
  corsHeaders,
  generateBackupCodes,
  hashCode,
  json,
  requireUser,
  SERVICE_NAME,
  totp,
} from "../_shared/two-factor.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const admin = adminClient();
    const user = await requireUser(req, admin);

    // Bereits aktiv? Dann nicht stillschweigend ueberschreiben — sonst koennte
    // ein uebernommenes Konto den Zweitfaktor des Opfers ersetzen.
    const { data: existing } = await admin
      .from("user_two_factor")
      .select("enabled")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing?.enabled) {
      return json(
        { error: "2FA ist bereits aktiv. Zuerst deaktivieren." },
        409,
      );
    }

    const secret = totp.generateSecret();
    const otpauth = totp.keyuri(user.email ?? user.id, SERVICE_NAME, secret);

    let qrCode: string;
    try {
      qrCode = await toDataURL(otpauth, { width: 256, margin: 2 });
    } catch {
      // Fallback bewusst ohne externen QR-Dienst: das otpauth-Secret darf
      // die eigene Infrastruktur nicht verlassen. Der Client kann aus
      // otpauth_url selbst einen Code rendern.
      qrCode = "";
    }

    const backupCodes = generateBackupCodes();
    const hashed = await Promise.all(backupCodes.map(hashCode));

    const { error } = await admin.from("user_two_factor").upsert({
      user_id: user.id,
      secret,
      enabled: false,
      backup_codes: hashed,
      last_counter: null,
      failed_attempts: 0,
      locked_until: null,
      confirmed_at: null,
    });

    if (error) {
      console.error("setup-2fa upsert:", error.message);
      return json({ error: "Einrichtung fehlgeschlagen" }, 500);
    }

    // Klartext-Codes werden hier das einzige Mal ausgeliefert.
    return json({
      secret,
      otpauth_url: otpauth,
      qr_code: qrCode,
      backup_codes: backupCodes,
    });
  } catch (err) {
    if (err instanceof AuthError) return json({ error: err.message }, err.status);
    console.error("setup-2fa:", err);
    return json({ error: "Interner Fehler" }, 500);
  }
});
