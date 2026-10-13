// guide-data: einziges Tor für die sensiblen Guide-Step-Daten (Steuer-ID,
// Adressen, Gesellschafter-PII in playbook_step_progress.data + notes).
//
// - Prüft Authentifizierung + Eigentümerschaft des Runs server-seitig.
// - Verschlüsselt `data` + `notes` mit einem Server-Key (AES-256-GCM), SOBALD
//   das Secret GUIDE_ENC_KEY gesetzt ist. Ohne Key → transparenter Passthrough
//   (Plaintext), damit der Rollout nichts bricht.
// - `load` entschlüsselt verschlüsselte Felder, reicht Plaintext-Altzeilen durch
//   (decrypt-or-passthrough) → gemischter Zustand während der Migration ok.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { zweiterFaktorOffen, zweiFaktorAntwort } from "../_shared/zweiFaktor.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const ENC_PREFIX = "__enc:"; // notes-Marker
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

let keyPromise: Promise<CryptoKey | null> | null = null;
function getKey(): Promise<CryptoKey | null> {
  if (keyPromise) return keyPromise;
  keyPromise = (async () => {
    const b64 = Deno.env.get("GUIDE_ENC_KEY");
    if (!b64) return null;
    const raw = fromB64(b64);
    if (raw.length !== 32) throw new Error("GUIDE_ENC_KEY must be 32 bytes (base64)");
    return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
  })();
  return keyPromise;
}

async function encryptStr(key: CryptoKey, plaintext: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext)));
  const buf = new Uint8Array(iv.length + ct.length);
  buf.set(iv);
  buf.set(ct, iv.length);
  return toB64(buf);
}
async function decryptStr(key: CryptoKey, b64: string): Promise<string> {
  const buf = fromB64(b64);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0, 12) }, key, buf.slice(12));
  return new TextDecoder().decode(pt);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    // Auth
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "").trim();
    if (!token) return json({ error: "unauthorized" }, 401);
    const { data: userData, error: authErr } = await supabase.auth.getUser(token);
    if (authErr || !userData.user) return json({ error: "unauthorized" }, 401);
    if (zweiterFaktorOffen(userData.user, token)) return zweiFaktorAntwort(corsHeaders);
    const userId = userData.user.id;

    const body = await req.json().catch(() => ({}));
    const action = body?.action;
    const runId = body?.run_id;
    if (!runId) return json({ error: "missing run_id" }, 400);

    // Ownership: der Run muss dem eingeloggten Nutzer gehören.
    const { data: run } = await supabase
      .from("playbook_runs")
      .select("id, user_id")
      .eq("id", runId)
      .maybeSingle();
    if (!run || run.user_id !== userId) return json({ error: "forbidden" }, 403);

    const key = await getKey();

    if (action === "load") {
      const { data: rows, error: loadErr } = await supabase.from("playbook_step_progress").select("*").eq("run_id", runId);
      // Lesefehler nie als "keine Daten" melden — der Client würde leere
      // Felder anzeigen und beim nächsten Speichern echte Eingaben überschreiben.
      if (loadErr) {
        console.error("guide-data load:", loadErr.message);
        return json({ error: "load_failed" }, 500);
      }
      const out = [];
      for (const r of rows ?? []) {
        let data = r.data;
        let notes = r.notes;
        // data: { __enc: "<b64>" } → entschlüsseln; sonst Plaintext durchreichen.
        if (key && data && typeof data === "object" && typeof (data as any).__enc === "string") {
          data = JSON.parse(await decryptStr(key, (data as any).__enc));
        }
        if (key && typeof notes === "string" && notes.startsWith(ENC_PREFIX)) {
          notes = await decryptStr(key, notes.slice(ENC_PREFIX.length));
        }
        out.push({ ...r, data, notes });
      }
      return json({ rows: out });
    }

    if (action === "save") {
      const stepIndex = Number(body.step_index);
      if (!Number.isInteger(stepIndex) || stepIndex < 0 || stepIndex > 10_000) {
        return json({ error: "invalid step_index" }, 400);
      }
      const plaintextData = body.data ?? {};
      const plaintextNotes = body.notes ?? null;

      let storedData: unknown = plaintextData;
      let storedNotes: string | null = plaintextNotes;
      if (key) {
        storedData = { __enc: await encryptStr(key, JSON.stringify(plaintextData)) };
        storedNotes = plaintextNotes == null ? null : ENC_PREFIX + (await encryptStr(key, String(plaintextNotes)));
      }

      const record = {
        run_id: runId,
        user_id: userId,
        step_index: stepIndex,
        step_slug: body.step_slug,
        status: body.status,
        data: storedData,
        notes: storedNotes,
        completed_at: body.completed_at ?? null,
      };

      // Atomar per Upsert auf UNIQUE(run_id, step_index). Vorher: erst lesen,
      // dann update/insert — beide Ergebnisse unausgewertet, Antwort immer
      // ok:true. Parallele Saves verletzten die Unique-Bedingung still, und
      // Eingaben (Steuer-ID, Gesellschafterdaten) gingen unbemerkt verloren.
      const { error: saveErr } = await supabase
        .from("playbook_step_progress")
        .upsert(record, { onConflict: "run_id,step_index" });
      if (saveErr) {
        console.error("guide-data save:", saveErr.message);
        return json({ error: "save_failed" }, 500);
      }
      return json({ ok: true, encrypted: !!key });
    }

    return json({ error: "unknown action" }, 400);
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
