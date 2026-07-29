// Liefert nur den Status — niemals Secret oder Backup-Code-Hashes.

import {
  adminClient, AuthError, corsHeaders, json, requireUser,
} from "../_shared/two-factor.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const admin = adminClient();
    const user = await requireUser(req, admin);

    const { data } = await admin
      .from("user_two_factor")
      .select("enabled, confirmed_at, backup_codes")
      .eq("user_id", user.id)
      .maybeSingle();

    return json({
      enabled: data?.enabled === true,
      confirmed_at: data?.confirmed_at ?? null,
      // Nur die Anzahl, nicht die Codes selbst.
      backup_codes_remaining: data?.backup_codes?.length ?? 0,
    });
  } catch (err) {
    if (err instanceof AuthError) return json({ error: err.message }, err.status);
    console.error("check-2fa-status:", err);
    return json({ error: "Interner Fehler" }, 500);
  }
});
