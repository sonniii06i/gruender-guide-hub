-- 27.10.2026: Abo-Abgleich Supabase <-> Stripe (/root/hq/kunden_echt.py) und Testkauf-Markierung.
-- Live bereits per db query angewendet; diese Datei dokumentiert den Stand und ist idempotent.
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS stripe_status text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS abgleich_at timestamptz;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;
ALTER TABLE public.external_entitlements ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;
