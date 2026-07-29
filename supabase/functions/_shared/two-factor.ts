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

/** Fehlversuch zaehlen und ab MAX_ATTEMPTS sperren. */
export async function registerFailure(
  admin: SupabaseClient,
  row: TwoFactorRow,
): Promise<number> {
  const attempts = row.failed_attempts + 1;
  const locked = attempts >= MAX_ATTEMPTS;
  await admin
    .from("user_two_factor")
    .update({
      failed_attempts: locked ? 0 : attempts,
      locked_until: locked
        ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString()
        : row.locked_until,
    })
    .eq("user_id", row.user_id);
  return locked ? 0 : MAX_ATTEMPTS - attempts;
}

/**
 * Prueft einen TOTP-Code inklusive Replay-Schutz.
 * Ein bereits benutzter Zeitschritt wird abgelehnt, damit ein abgefangener
 * Code innerhalb seines 30-Sekunden-Fensters nicht erneut funktioniert.
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

  await admin
    .from("user_two_factor")
    .update({ last_counter: counter, failed_attempts: 0, locked_until: null })
    .eq("user_id", row.user_id);
  return true;
}

/** Prueft einen Backup-Code und verbraucht ihn bei Erfolg. */
export async function consumeBackupCode(
  admin: SupabaseClient,
  row: TwoFactorRow,
  code: string,
): Promise<boolean> {
  const hash = await hashCode(code);
  if (!row.backup_codes.includes(hash)) return false;

  await admin
    .from("user_two_factor")
    .update({
      backup_codes: row.backup_codes.filter((c) => c !== hash),
      failed_attempts: 0,
      locked_until: null,
    })
    .eq("user_id", row.user_id);
  return true;
}
