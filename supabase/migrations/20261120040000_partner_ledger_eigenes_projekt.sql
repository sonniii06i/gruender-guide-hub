-- 20.11.2026: Partner-Ledger aus dem AnwaltX-Hub ins GründerX-Projekt (AnwaltX eingestellt, Supabase-Projekt wird gelöscht).
-- Bereits per Management-API angewendet (Freigabe Betreiber 20.11.2026); idempotent.
-- manage-affiliate und stripe-affiliate-webhook nutzen ohne HUB_SUPABASE_URL/HUB_SERVICE_ROLE_KEY (entfernt) das eigene Projekt.
-- Die 2 Bestandspartner (konditionen v1_20_dauerhaft) wurden aus dem Hub übernommen.
alter table public.affiliates add column if not exists konditionen text not null default 'v2_25_12m';
alter table public.affiliates drop constraint if exists affiliates_konditionen_check;
alter table public.affiliates add constraint affiliates_konditionen_check check (konditionen = any (array['v1_20_dauerhaft'::text, 'v2_25_12m'::text]));
alter table public.affiliate_referrals add column if not exists fenster_start timestamptz;
alter table public.affiliate_commissions add column if not exists reversed_reason text;
alter table public.affiliate_commissions drop constraint if exists affiliate_commissions_reversed_reason_check;
alter table public.affiliate_commissions add constraint affiliate_commissions_reversed_reason_check check (reversed_reason is null or reversed_reason = any (array['refund'::text, 'dispute'::text]));
