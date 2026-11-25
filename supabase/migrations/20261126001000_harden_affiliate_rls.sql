-- Serverseitige Härtung für Partner-Auszahlungen (26.11.2026):
-- 1. Direkte Schreibzugriffe (INSERT/UPDATE/DELETE) von anon/authenticated auf Affiliate-Tabellen sperren.
--    Alle Änderungen laufen ausschließlich über die gehärtete Edge Function `manage-affiliate` (service_role).
-- 2. Atomarer Schutz gegen doppelte Auszahlungsanfragen (Race-Condition): höchstens eine offene
--    Auszahlung (requested/approved) pro Affiliate gleichzeitig.

REVOKE INSERT, UPDATE, DELETE ON public.affiliates FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.affiliate_payouts FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.affiliate_commissions FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.affiliate_referrals FROM anon, authenticated;

CREATE UNIQUE INDEX IF NOT EXISTS affiliate_payouts_one_open_per_affiliate_idx
  ON public.affiliate_payouts (affiliate_id)
  WHERE status IN ('requested', 'approved');
