// Supabase-Client erst bei Bedarf laden (25.10.2026). Er macht ~800 KB Quelltext aus und
// wird für den ersten Seitenaufbau nicht gebraucht – nur für Login-Status, Statistik und
// Kauf. Module im Einstiegspaket (useAuth, useAccess, Tracking, Bundles, 2FA) holen ihn
// hierüber; lazy geladene Seiten dürfen weiter direkt aus ./client importieren
// (gleiche Instanz). src/test/einstieg-ohne-supabase.test.ts wacht darüber.
import type { supabase as Client } from "./client";

let laden: Promise<typeof Client> | null = null;

export const ladeSupabase = (): Promise<typeof Client> => (laden ??= import("./client").then((m) => m.supabase));
