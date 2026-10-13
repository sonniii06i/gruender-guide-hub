// Gemeinsame Bausteine der Zwei-Faktor-Authentifizierung.
// Wird von setup-2fa, verify-2fa, verify-2fa-login, disable-2fa und
// check-2fa-status importiert.

import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { authenticator } from "npm:otplib@12.0.1";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Client mit Service-Role — user_two_factor ist anders nicht erreichbar. */
export const adminClient = (): SupabaseClient =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

/** Nutzer aus dem Bearer-Token lesen. Wirft bei fehlendem/ungueltigem Token. */
export async function requireUser(req: Request, admin: SupabaseClient) {
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new AuthError("Kein Authorization-Header", 401);
  }
  const { data, error } = await admin.auth.getUser(header.slice(7));
  if (error || !data.user) throw new AuthError("Nicht angemeldet", 401);
  return data.user;
}

export class AuthError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

// --- Backup-Codes ----------------------------------------------------------

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne I/O/0/1
const CODE_LEN = 10;
export const BACKUP_CODE_COUNT = 10;

/**
 * Erzeugt Backup-Codes aus crypto.getRandomValues.
 * Math.random() waere hier fatal: Backup-Codes umgehen den zweiten Faktor
 * vollstaendig, und Math.random() ist weder unvorhersehbar noch gleichverteilt.
 */
export function generateBackupCodes(count = BACKUP_CODE_COUNT): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = new Uint8Array(CODE_LEN);
    crypto.getRandomValues(bytes);
    // Modulo-Bias vermeiden: 256 ist kein Vielfaches von 32 -> Werte >= 248
    // nachziehen, bis sie im gleichverteilten Bereich liegen.
    let out = "";
    for (let j = 0; j < CODE_LEN; j++) {
      let b = bytes[j];
      while (b >= 248) {
        const extra = new Uint8Array(1);
        crypto.getRandomValues(extra);
        b = extra[0];
      }
      out += ALPHABET[b % ALPHABET.length];
    }
    codes.push(`${out.slice(0, 5)}-${out.slice(5)}`);
  }
  return codes;
}

/** SHA-256-Hex. Backup-Codes werden nur als Hash gespeichert. */
export async function hashCode(code: string): Promise<string> {
  const normalized = code.trim().toUpperCase().replace(/-/g, "");
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(normalized),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// --- TOTP ------------------------------------------------------------------

// Ein Zeitschritt Toleranz in beide Richtungen (=/- 30 s) gegen Uhrendrift.
authenticator.options = { window: 1, step: 30 };

export const SERVICE_NAME = "GruenderX";
export const totp = authenticator;

/** Aktueller TOTP-Zeitschritt — Grundlage des Replay-Schutzes. */
export const currentCounter = () => Math.floor(Date.now() / 1000 / 30);

// --- Sperre nach Fehlversuchen ---------------------------------------------

export const MAX_ATTEMPTS = 5;
export const LOCK_MINUTES = 15;

export interface TwoFactorRow {
  user_id: string;
  secret: string;
  enabled: boolean;
  backup_codes: string[];
  last_counter: number | null;
  failed_attempts: number;
  locked_until: string | null;
}

/** Prueft, ob das Konto gerade gesperrt ist. */
export function lockRemainingSeconds(row: TwoFactorRow): number {
  if (!row.locked_until) return 0;
  const diff = new Date(row.locked_until).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / 1000) : 0;
}

// NEBENLÄUFIGKEIT. Früher wurde der Zähler nach dem Muster Lesen-Rechnen-
// Schreiben auf einer vorher geladenen Zeile geführt: 200 parallele Requests
// lasen alle failed_attempts=0, jeder Code wurde geprüft, und die Sperre nach
// 5 Versuchen griff nie. Ebenso waren Backup-Codes parallel mehrfach nutzbar
// und ein TOTP-Zeitschritt doppelt verwendbar.
//
// Jetzt ohne neue RPC über bedingte Updates (compare-and-swap): Ein Update
// greift nur, wenn die Zeile noch den gelesenen Stand hat; `select()` liefert
// die tatsächlich geänderten Zeilen. Kommt keine zurück, war ein anderer
// Request schneller — dann wird neu gelesen bzw. abgelehnt.

const CAS_VERSUCHE = 8;

/**
 * Reserviert VOR der Code-Prüfung einen Versuch. So können parallel nie mehr
 * als MAX_ATTEMPTS Codes je Sperrfenster geprüft werden.
 * @returns locked > 0 → gesperrt (Sekunden); sonst left = verbleibende Versuche.
 */
export async function reserveAttempt(
  admin: SupabaseClient,
  userId: string,
): Promise<{ locked: number; left: number }> {
  for (let i = 0; i < CAS_VERSUCHE; i++) {
    const { data: cur, error } = await admin
      .from("user_two_factor")
      .select("failed_attempts, locked_until")
      .eq("user_id", userId)
      .maybeSingle<{ failed_attempts: number; locked_until: string | null }>();
    if (error || !cur) throw new Error(`2FA-Zeile nicht lesbar: ${error?.message ?? "fehlt"}`);
    const lock = lockRemainingSeconds({ locked_until: cur.locked_until } as TwoFactorRow);
    if (lock > 0) return { locked: lock, left: 0 };

    const n = cur.failed_attempts ?? 0;
    const attempts = n + 1;
    const sperren = attempts >= MAX_ATTEMPTS;
    let q = admin
      .from("user_two_factor")
      .update({
        failed_attempts: sperren ? 0 : attempts,
        locked_until: sperren
          ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString()
          : cur.locked_until,
      })
      .eq("user_id", userId)
      .eq("failed_attempts", n);
    q = cur.locked_until === null ? q.is("locked_until", null) : q.eq("locked_until", cur.locked_until);
    const { data: hit, error: upErr } = await q.select("user_id");
    if (upErr) throw new Error(`2FA-Zähler: ${upErr.message}`);
    if (hit && hit.length) return { locked: 0, left: sperren ? 0 : MAX_ATTEMPTS - attempts };
    // anderer Request war schneller → neu lesen
  }
  // Dauerhafter Wettlauf = Angriffsmuster → wie gesperrt behandeln.
  return { locked: 60, left: 0 };
}

/** Zähler nach erfolgreicher Prüfung zurücksetzen. */
async function resetAttempts(admin: SupabaseClient, userId: string) {
  await admin
    .from("user_two_factor")
    .update({ failed_attempts: 0, locked_until: null })
    .eq("user_id", userId);
}

/**
 * Fehlversuch zaehlen und ab MAX_ATTEMPTS sperren — atomar über reserveAttempt.
 * Nur für Aufrufer, die vorher KEINEN Versuch reserviert haben.
 */
export async function registerFailure(
  admin: SupabaseClient,
  row: TwoFactorRow,
): Promise<number> {
  const r = await reserveAttempt(admin, row.user_id);
  return r.left;
}

/**
 * Prueft einen TOTP-Code inklusive Replay-Schutz.
 * Ein bereits benutzter Zeitschritt wird abgelehnt, damit ein abgefangener
 * Code innerhalb seines 30-Sekunden-Fensters nicht erneut funktioniert.
 * Der Zeitschritt wird per bedingtem Update verbraucht — zwei parallele
 * Requests mit demselben Code können nicht beide gewinnen.
 */
export async function verifyTotp(
  admin: SupabaseClient,
  row: TwoFactorRow,
  token: string,
): Promise<boolean> {
  const clean = token.replace(/\s/g, "");
  if (!/^\d{6}$/.test(clean)) return false;
  if (!totp.verify({ token: clean, secret: row.secret })) return false;

  const counter = currentCounter();
  if (row.last_counter !== null && counter <= row.last_counter) return false;

  const { data: hit, error } = await admin
    .from("user_two_factor")
    .update({ last_counter: counter, failed_attempts: 0, locked_until: null })
    .eq("user_id", row.user_id)
    .or(`last_counter.is.null,last_counter.lt.${counter}`)
    .select("user_id");
  if (error) throw new Error(`2FA-Zeitschritt: ${error.message}`);
  return !!hit?.length;
}

/** Prueft einen Backup-Code und verbraucht ihn bei Erfolg (compare-and-swap). */
export async function consumeBackupCode(
  admin: SupabaseClient,
  row: TwoFactorRow,
  code: string,
): Promise<boolean> {
  const hash = await hashCode(code);
  let codes = row.backup_codes ?? [];
  for (let i = 0; i < CAS_VERSUCHE; i++) {
    if (!codes.includes(hash)) return false;
    const rest = codes.filter((c) => c !== hash);
    // Nur schreiben, wenn die Liste noch exakt so aussieht wie gelesen
    // (Hashes sind Hex, das Array-Literal braucht kein Escaping).
    const { data: hit, error } = await admin
      .from("user_two_factor")
      .update({ backup_codes: rest, failed_attempts: 0, locked_until: null })
      .eq("user_id", row.user_id)
      .filter("backup_codes", "eq", `{${codes.join(",")}}`)
      .select("user_id");
    if (error) throw new Error(`Backup-Code: ${error.message}`);
    if (hit?.length) return true;
    const { data: cur, error: rErr } = await admin
      .from("user_two_factor")
      .select("backup_codes")
      .eq("user_id", row.user_id)
      .maybeSingle<{ backup_codes: string[] }>();
    if (rErr || !cur) return false;
    codes = cur.backup_codes ?? [];
  }
  return false;
}

export { resetAttempts };
