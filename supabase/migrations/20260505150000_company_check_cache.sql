-- Cache für Firmenname-Suchen (NorthData / Handelsregister).
-- Reduziert externe Requests drastisch und entkoppelt User von Source-Rate-Limits.
CREATE TABLE public.company_check_cache (
  query_key text PRIMARY KEY,
  query_raw text NOT NULL,
  data jsonb NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_company_check_cache_fetched_at ON public.company_check_cache(fetched_at DESC);

-- Tabelle wird nur aus Edge Function (service_role) geschrieben/gelesen.
ALTER TABLE public.company_check_cache ENABLE ROW LEVEL SECURITY;

-- Authentifizierte Nutzer dürfen lesen (für direkten Read-Through, falls jemals nötig).
CREATE POLICY "authenticated read cache" ON public.company_check_cache
  FOR SELECT TO authenticated USING (true);
