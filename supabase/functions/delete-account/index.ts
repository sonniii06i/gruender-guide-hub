// delete-account: DSGVO Art. 17 — löscht ALLE Daten des eingeloggten Nutzers
// und seinen Auth-Account. Server-seitiger Auth-Check; löscht nur die EIGENEN
// Zeilen (user_id === auth.user.id bzw. die bestätigte eigene E-Mail).
//
// Gesperrt, solange ein Stripe-Abo läuft (active/trialing/past_due) —
// Betreiber-Entscheidung 13.10.2026. Logik und Begründung in handler.ts.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { handleDeleteAccount } from "./handler.ts";
import type { StripeLike } from "../_shared/stripeCustomer.ts";

serve((req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );
  // Affiliate-Ledger wie in manage-affiliate / stripe-affiliate-webhook.
  const hub = createClient(
    Deno.env.get("HUB_SUPABASE_URL") || Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("HUB_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    { auth: { persistSession: false } },
  );
  const key = Deno.env.get("STRIPE_SECRET_KEY") || "";
  const stripe = key
    ? (new Stripe(key, { apiVersion: "2025-08-27.basil" }) as unknown as StripeLike)
    : null;

  // Auth, 2FA-Sperre (Runde 1), Abo-Sperre und Löschliste: handler.ts.
  return handleDeleteAccount(req, { supabase: supabase as never, hub, stripe });
});
