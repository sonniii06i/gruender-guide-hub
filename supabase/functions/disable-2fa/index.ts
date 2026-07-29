// Schaltet 2FA ab. Verlangt einen gueltigen Code oder Backup-Code —
// sonst koennte eine uebernommene Session den Schutz einfach entfernen.

import {
  adminClient, AuthError, consumeBackupCode, corsHeaders, json,
  lockRemainingSeconds, registerFailure, requireUser,
  type TwoFactorRow, verifyTotp,
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
      return json({ error: "Zu viele Fehlversuche", retry_after_seconds: lock }, 429);
    }

    const ok = isBackup
      ? await consumeBackupCode(admin, row, token)
      : await verifyTotp(admin, row, token);

    if (!ok) {
      const left = await registerFailure(admin, row);
      return json({ error: "Code ungueltig", attempts_left: left }, 400);
    }

    // Vollstaendig entfernen statt nur enabled=false: ein zurueckgelassenes
    // Secret waere bei spaeterer Neuaktivierung ein unnoetiges Risiko.
    const { error } = await admin
      .from("user_two_factor").delete().eq("user_id", user.id);

    if (error) {
      console.error("disable-2fa delete:", error.message);
      return json({ error: "Deaktivierung fehlgeschlagen" }, 500);
    }

    const meta = { ...user.app_metadata };
    delete meta.two_factor_enabled;
    delete meta.two_factor_verified_at;
    await admin.auth.admin.updateUserById(user.id, { app_metadata: meta });

    return json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return json({ error: err.message }, err.status);
    console.error("disable-2fa:", err);
    return json({ error: "Interner Fehler" }, 500);
  }
});
