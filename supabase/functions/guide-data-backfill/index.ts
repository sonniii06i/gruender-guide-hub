// guide-data-backfill: verschlüsselt bestehende Klartext-Zeilen in
// playbook_step_progress nachträglich (einmalig nach Aktivierung von
// GUIDE_ENC_KEY). Nur für Admins. Idempotent: bereits verschlüsselte Zeilen
// werden übersprungen.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const ENC_PREFIX = "__enc:";
const toB64 = (bytes: Uint8Array) => {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(s);
};
const fromB64 = (b64: string) => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
async function loadKey(): Promise<CryptoKey> {
  const b64 = Deno.env.get("GUIDE_ENC_KEY");
  if (!b64) throw new Error("GUIDE_ENC_KEY not set");
  const raw = fromB64(b64);
  if (raw.length !== 32) throw new Error("GUIDE_ENC_KEY must be 32 bytes (base64)");
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
async function encryptStr(key: CryptoKey, plaintext: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext)));
  const buf = new Uint8Array(iv.length + ct.length);
  buf.set(iv);
  buf.set(ct, iv.length);
  return toB64(buf);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "").trim();
    if (!token) return json({ error: "unauthorized" }, 401);
    const { data: userData, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !userData.user) return json({ error: "unauthorized" }, 401);

    // Nur Admins dürfen den Backfill auslösen.
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) return json({ error: "forbidden" }, 403);

    const key = await loadKey();

    const { data: rows } = await supabase.from("playbook_step_progress").select("id, data, notes");
    let encrypted = 0;
    let skipped = 0;
    for (const r of rows ?? []) {
      const isDataEnc = r.data && typeof r.data === "object" && typeof (r.data as any).__enc === "string";
      const isNotesEnc = typeof r.notes === "string" && r.notes.startsWith(ENC_PREFIX);
      if (isDataEnc && (r.notes == null || isNotesEnc)) {
        skipped++;
        continue;
      }
      const newData = isDataEnc ? r.data : { __enc: await encryptStr(key, JSON.stringify(r.data ?? {})) };
      const newNotes =
        r.notes == null ? null : isNotesEnc ? r.notes : ENC_PREFIX + (await encryptStr(key, String(r.notes)));
      await supabase.from("playbook_step_progress").update({ data: newData, notes: newNotes }).eq("id", r.id);
      encrypted++;
    }
    return json({ ok: true, encrypted, skipped, total: rows?.length ?? 0 });
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
