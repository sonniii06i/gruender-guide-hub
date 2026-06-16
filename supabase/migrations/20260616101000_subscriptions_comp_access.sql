-- Comp-/Test-Freischaltung: manueller Zugang, der vom Stripe-Sync (check-subscription)
-- nie überschrieben wird. comp_access=true => voller Zugriff, unabhängig vom Stripe-Status.
alter table public.subscriptions
  add column if not exists comp_access boolean not null default false;
