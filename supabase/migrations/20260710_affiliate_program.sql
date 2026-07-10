-- ===================================================================
-- Affiliate-Programm (GruenderX-Ledger) — 20 % Umsatzbeteiligung,
-- wiederkehrend/lebenslang, Cash-Auszahlung manuell. Identisch zu AnwaltX.
-- product: 'gruenderx' | 'bundle' | 'anwaltx'. Identitaet ueber E-Mail + Code.
-- ===================================================================

create table if not exists public.affiliates (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  code          text not null unique,
  user_id       uuid,
  status        text not null default 'active',
  payout_name   text,
  payout_iban   text,
  created_at    timestamptz not null default now()
);
create unique index if not exists affiliates_email_key on public.affiliates (lower(email));

create table if not exists public.affiliate_referrals (
  id                     uuid primary key default gen_random_uuid(),
  affiliate_id           uuid not null references public.affiliates(id) on delete cascade,
  product                text not null,
  referred_email         text,
  stripe_customer_id     text,
  stripe_subscription_id text unique,
  status                 text not null default 'active',
  created_at             timestamptz not null default now()
);
create index if not exists aff_ref_affiliate_idx on public.affiliate_referrals (affiliate_id);

create table if not exists public.affiliate_commissions (
  id                uuid primary key default gen_random_uuid(),
  affiliate_id      uuid not null references public.affiliates(id) on delete cascade,
  referral_id       uuid references public.affiliate_referrals(id) on delete set null,
  product           text not null,
  stripe_invoice_id text unique,
  base_cents        integer not null,
  currency          text not null default 'eur',
  rate              numeric not null default 0.20,
  commission_cents  integer not null,
  status            text not null default 'pending',
  period_start      timestamptz,
  period_end        timestamptz,
  created_at        timestamptz not null default now()
);
create index if not exists aff_comm_affiliate_idx on public.affiliate_commissions (affiliate_id, status);

create table if not exists public.affiliate_payouts (
  id            uuid primary key default gen_random_uuid(),
  affiliate_id  uuid not null references public.affiliates(id) on delete cascade,
  amount_cents  integer not null,
  currency      text not null default 'eur',
  method        text not null default 'bank_transfer',
  status        text not null default 'requested',
  note          text,
  requested_at  timestamptz not null default now(),
  paid_at       timestamptz
);
create index if not exists aff_payout_affiliate_idx on public.affiliate_payouts (affiliate_id, status);

alter table public.affiliates            enable row level security;
alter table public.affiliate_referrals   enable row level security;
alter table public.affiliate_commissions enable row level security;
alter table public.affiliate_payouts     enable row level security;

drop policy if exists aff_self_read on public.affiliates;
create policy aff_self_read on public.affiliates for select
  using (user_id = auth.uid() or lower(email) = lower(coalesce(auth.jwt() ->> 'email','')));

drop policy if exists aff_ref_self_read on public.affiliate_referrals;
create policy aff_ref_self_read on public.affiliate_referrals for select
  using (affiliate_id in (select id from public.affiliates
    where user_id = auth.uid() or lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))));

drop policy if exists aff_comm_self_read on public.affiliate_commissions;
create policy aff_comm_self_read on public.affiliate_commissions for select
  using (affiliate_id in (select id from public.affiliates
    where user_id = auth.uid() or lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))));

drop policy if exists aff_payout_self_read on public.affiliate_payouts;
create policy aff_payout_self_read on public.affiliate_payouts for select
  using (affiliate_id in (select id from public.affiliates
    where user_id = auth.uid() or lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))));
