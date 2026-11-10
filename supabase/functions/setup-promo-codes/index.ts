// STILLGELEGT 10.11.2026 (Sicherheitsaudit, Betreiber „richte alles perfekt ein“).
// Grund: Wegwerf-Setup (Stripe-Coupon 20 % + Codes SONNI/FOUNDER), laut eigenem Kommentar nach dem Setup zu entfernen; Schutz nur hart codiertes Token.
// Die Function war deployt, lag aber nicht im Repo. Original: supabase/functions_archiv/setup-promo-codes/.
// Antwortet nur noch 410 Gone, tut nichts. Rueckweg: Original aus dem Archiv deployen.
Deno.serve(() =>
  new Response(JSON.stringify({ error: "gone", function: "setup-promo-codes" }), {
    status: 410,
    headers: { "Content-Type": "application/json" },
  })
);
