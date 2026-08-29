-- Zugaenge, die NICHT ueber Stripe gekauft wurden.
--
-- CopeCart, Digistore24 und elopage/ablefy sind Reseller: Sie verkaufen in
-- eigenem Namen, kassieren, stellen die Rechnung und melden uns per IPN nur,
-- dass wir jemandem Zugang geben sollen. Aus so einer Meldung darf nie ein
-- Stripe-Abo werden.
--
-- Warum eine eigene Tabelle und keine Spalte in `subscriptions`:
--
--   1. Der Kauf passiert auf der Plattform, das Konto entsteht erst danach.
--      Ein Zugang ohne passenden auth.users-Eintrag ist der Normalfall --
--      `subscriptions.user_id` ist aber NOT NULL und zeigt auf auth.users.
--      Der Zugang haengt deshalb an der E-Mail und wird eingeloest, sobald
--      sich jemand damit registriert.
--
--   2. `check-subscription` synchronisiert `subscriptions` gegen Stripe und
--      setzt bei fehlendem Stripe-Abo hart status='inactive'. Alles, was in
--      dieser Tabelle steht, waere nach spaetestens 24 h wieder weg.
--
-- period_end = bis wann der Zugang laeuft. NULL = unbefristet (Einmalkauf).
CREATE TABLE IF NOT EXISTS public.external_entitlements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider    TEXT NOT NULL,                  -- copecart | digistore24 | elopage
  order_id    TEXT NOT NULL,
  email       TEXT NOT NULL,
  product_id  TEXT,
  plan        TEXT NOT NULL DEFAULT 'gruenderx',
  status      TEXT NOT NULL DEFAULT 'active', -- active | revoked
  period_end  TIMESTAMPTZ,
  -- Tatsaechlich belasteter Betrag, nicht der Listenpreis: Gutscheine der
  -- Plattform senken ihn. Die Danke-Seite meldet daraus die Conversion an
  -- Meta/Google — mit dem Listenpreis optimierte die Kampagne auf Umsatz,
  -- den es nie gab.
  amount_cents INTEGER,
  currency    TEXT NOT NULL DEFAULT 'EUR',
  last_event  TEXT,
  raw         JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Alle drei Plattformen wiederholen dieselbe Meldung, wenn die Antwort nicht
  -- ankommt. Der Schluessel macht den Retry folgenlos.
  UNIQUE (provider, order_id)
);

CREATE INDEX IF NOT EXISTS idx_external_entitlements_email
  ON public.external_entitlements (lower(email), status);

ALTER TABLE public.external_entitlements ENABLE ROW LEVEL SECURITY;

-- Kein SELECT fuer normale Nutzer: Die Tabelle enthaelt Bestell- und
-- Auszahlungsdaten fremder Kaeufer. Gelesen wird sie ausschliesslich von den
-- Edge Functions mit Service-Role, die RLS ohnehin umgehen.
CREATE POLICY "Admins view external entitlements"
  ON public.external_entitlements FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER external_entitlements_updated_at
  BEFORE UPDATE ON public.external_entitlements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Jede eingegangene IPN-Meldung roh. Zwei Gruende: Nachweis gegenueber der
-- Plattform bei Streit ueber einen Kauf, und die Feldnamen von elopage/ablefy
-- sind nicht oeffentlich dokumentiert -- der erste echte Aufruf zeigt hier, wie
-- die Nutzlast wirklich aussieht.
CREATE TABLE IF NOT EXISTS public.ipn_log (
  id         BIGSERIAL PRIMARY KEY,
  provider   TEXT,
  event      TEXT,
  order_id   TEXT,
  email      TEXT,
  ok         BOOLEAN NOT NULL DEFAULT false,
  note       TEXT,
  body       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ipn_log_created ON public.ipn_log (created_at DESC);

ALTER TABLE public.ipn_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view ipn log"
  ON public.ipn_log FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Quelle des Zugangs. 'stripe' bleibt der Standard; alles andere ist ein Kauf
-- ueber eine Reseller-Plattform und darf vom Stripe-Sync nicht abgeraeumt
-- werden. Die Spalte ist redundant zur Tabelle oben, aber sie macht den
-- Zustand direkt in `subscriptions` sichtbar -- ohne sie muesste jede Stelle,
-- die ein Abo anzeigt, zwei Tabellen kennen.
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'stripe';

COMMENT ON COLUMN public.subscriptions.source IS
  'stripe | copecart | digistore24 | elopage — Quelle des Zugangs. Nur bei ''stripe'' darf check-subscription den Status gegen Stripe herunterschreiben.';
