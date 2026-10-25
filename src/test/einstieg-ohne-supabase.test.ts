import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Diese Module landen im Einstiegspaket jeder Seite. Ein statischer Import des
// Supabase-Clients zöge ~800 KB Quelltext in jeden ersten Seitenaufruf und kostet
// mobil messbar LCP (PSI, 25.10.2026). Sie holen den Client über ladeSupabase().
const EINSTIEG = [
  "src/hooks/useAuth.tsx",
  "src/hooks/useAccess.tsx",
  "src/hooks/useTrackPageview.tsx",
  "src/utils/analytics.ts",
  "src/components/landing/Bundles.tsx",
  "src/components/auth/TwoFactorGate.tsx",
  "src/components/auth/TwoFactorPrompt.tsx",
];

describe("Einstiegspaket ohne Supabase-Client", () => {
  it.each(EINSTIEG)("%s importiert den Client nicht statisch", (datei) => {
    const quelle = readFileSync(datei, "utf8");
    expect(quelle).not.toMatch(/^import\s+(?!type\b)[^;]*["']@\/integrations\/supabase\/client["']/m);
    expect(quelle).not.toMatch(/^import\s+(?!type\b)[^;]*["']@supabase\/supabase-js["']/m);
  });
});
