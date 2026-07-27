-- First-Party-Event-Tracking (2026-07-27), Schwester der gleichnamigen Tabelle
-- in AnwaltX. Gleiches Schema, damit beide Produkte mit derselben Auswertung
-- lesbar bleiben; Admin-Pruefung hier aber ueber has_role(), weil GruenderX
-- user_roles nutzt und kein admin_users hat.
--
-- Bewusst kein GA4/PostHog: Produktanalytik in der eigenen DB braucht kein
-- Consent-Banner (keine Weitergabe an Dritte), Daten bleiben hier, Auswertung
-- per SQL.
--
-- Ergaenzt das Bestehende, ersetzt es nicht: track-pageview zaehlt weiter
-- Seitenaufrufe, valueEvent.ts steuert weiter den Referral-Nudge. Diese Tabelle
-- beantwortet die Fragen, die beide nicht beantworten koennen -- Aktivierung,
-- Retention, Monetarisierung, Referral ueber die Zeit.

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id              bigserial PRIMARY KEY,
  created_at      timestamptz NOT NULL DEFAULT now(),

  event_name      text NOT NULL,
  layer           text NOT NULL,

  user_id         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  anon_id         text NOT NULL,
  session_id      text NOT NULL,

  path            text,

  utm_source           text,
  utm_medium           text,
  utm_campaign         text,
  utm_content          text,
  referrer             text,
  landing_page         text,
  first_touch_channel  text,
  self_reported_source text,

  experiment_id   text,
  variant_id      text,

  props           jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT analytics_events_layer_check CHECK (layer IN (
    'traffic','signup','activation','retention','monetization','referral','content','experiment'
  )),
  CONSTRAINT analytics_events_name_len CHECK (char_length(event_name) BETWEEN 1 AND 64),
  CONSTRAINT analytics_events_anon_len CHECK (char_length(anon_id) BETWEEN 8 AND 64),
  CONSTRAINT analytics_events_session_len CHECK (char_length(session_id) BETWEEN 8 AND 64),
  CONSTRAINT analytics_events_props_size CHECK (pg_column_size(props) <= 4096)
);

CREATE INDEX IF NOT EXISTS analytics_events_created_idx  ON public.analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS analytics_events_name_idx     ON public.analytics_events (event_name, created_at DESC);
CREATE INDEX IF NOT EXISTS analytics_events_user_idx     ON public.analytics_events (user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS analytics_events_anon_idx     ON public.analytics_events (anon_id, created_at DESC);
CREATE INDEX IF NOT EXISTS analytics_events_source_idx   ON public.analytics_events (utm_source, utm_campaign, created_at DESC) WHERE utm_source IS NOT NULL;

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "analytics_events_insert_all" ON public.analytics_events;
CREATE POLICY "analytics_events_insert_all" ON public.analytics_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "analytics_events_admin_select" ON public.analytics_events;
CREATE POLICY "analytics_events_admin_select" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

REVOKE UPDATE, DELETE ON public.analytics_events FROM anon, authenticated;

COMMENT ON TABLE public.analytics_events IS
  'First-Party-Produktanalytik. Schreiben: jeder. Lesen: nur Admins (has_role).';
