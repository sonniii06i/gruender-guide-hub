// Zweiter Schritt beim Anmelden: bestaetigt den Zweitfaktor nach dem Passwort.
//
// Wichtig: Diese Funktion verlangt einen gueltigen Bearer-Token, also eine
// Session, die bereits aus einer erfolgreichen Passwort-Anmeldung stammt.
// Eine Variante, die nur eine E-Mail-Adresse entgegennimmt, waere angreifbar —
// wer die Adresse kennt, koennte den Zweitfaktor allein bedienen.

import {
  adminClient,
  AuthError,
  consumeBackupCode,
  corsHeaders,
  json,
  lockRemainingSeconds,
  registerFailure,
  requireUser,
  type TwoFactorRow,
  verifyTotp,
} from "../_shared/two-factor.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const admin = adminClient();
    const user = await requireUser(req, admin);
    const body = await req.json().catch(() => ({}));
    const token: string = body.token ?? "";
    const isBackup: boolean = body.is_backup_code === true;

    if (!token) return json({ error: "Code fehlt" }, 400);

    const { data: row } = await admin
      .from("user_two_factor")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle<TwoFactorRow>();

    if (!row?.enabled) return json({ error: "2FA ist nicht aktiv" }, 400);

    const lock = lockRemainingSeconds(row);
    if (lock > 0) {
      return json(
        { error: "Zu viele Fehlversuche", retry_after_seconds: lock },
        429,
      );
    }

    const ok = isBackup
      ? await consumeBackupCode(admin, row, token)
      : await verifyTotp(admin, row, token);

    if (!ok) {
      const left = await registerFailure(admin, row);
      return json({ error: "Code ungueltig", attempts_left: left }, 400);
    }

    // Zeitstempel in app_metadata — der Client kann ihn lesen, aber nicht
    // faelschen. Das Frontend gibt die App erst danach frei.
    await admin.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.app_metadata,
        two_factor_verified_at: new Date().toISOString(),
      },
    });

    const remaining = isBackup
      ? row.backup_codes.length - 1
      : row.backup_codes.length;

    // verified wird vom bestehenden Frontend geprueft, success vom neuen.
    return json({ success: true, verified: true, backup_codes_remaining: remaining });
  } catch (err) {
    if (err instanceof AuthError) return json({ error: err.message }, err.status);
    console.error("verify-2fa-login:", err);
    return json({ error: "Interner Fehler" }, 500);
  }
});
