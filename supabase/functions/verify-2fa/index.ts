// Bestaetigt die Einrichtung: prueft den ersten Code und schaltet 2FA scharf.

import {
  adminClient,
  AuthError,
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
    const { token } = await req.json().catch(() => ({ token: "" }));

    if (!token) return json({ error: "Code fehlt" }, 400);

    const { data: row } = await admin
      .from("user_two_factor")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle<TwoFactorRow>();

    if (!row) return json({ error: "2FA wurde nicht eingerichtet" }, 400);

    const lock = lockRemainingSeconds(row);
    if (lock > 0) {
      return json(
        { error: "Zu viele Fehlversuche", retry_after_seconds: lock },
        429,
      );
    }

    if (!(await verifyTotp(admin, row, token))) {
      const left = await registerFailure(admin, row);
      return json({ error: "Code ungueltig", attempts_left: left }, 400);
    }

    const { error } = await admin
      .from("user_two_factor")
      .update({ enabled: true, confirmed_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (error) {
      console.error("verify-2fa enable:", error.message);
      return json({ error: "Aktivierung fehlgeschlagen" }, 500);
    }

    // app_metadata ist fuer den Client nicht schreibbar und eignet sich
    // deshalb als vertrauenswuerdiger Marker fuer den Login-Flow.
    await admin.auth.admin.updateUserById(user.id, {
      app_metadata: { ...user.app_metadata, two_factor_enabled: true },
    });

    return json({ success: true });
  } catch (err) {
    if (err instanceof AuthError) return json({ error: err.message }, err.status);
    console.error("verify-2fa:", err);
    return json({ error: "Interner Fehler" }, 500);
  }
});
