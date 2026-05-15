-- Booking-Reminders: 24h-vor + 15min-vor Email
-- Erweiterung der bookings-Tabelle + pg_cron-Job, der alle 5 Min die Reminder-Function pollt

-- 1) Spalten für Reminder-Tracking + Meet-Link
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS meet_link TEXT,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_24h_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_15min_sent_at TIMESTAMPTZ;

-- Index für effiziente Reminder-Suche
CREATE INDEX IF NOT EXISTS bookings_reminder_lookup_idx
  ON public.bookings (slot_iso)
  WHERE status IN ('pending', 'confirmed');

-- 2) Admin-only RPC: Meet-Link für eine Buchung setzen
CREATE OR REPLACE FUNCTION public.set_booking_meet_link(p_booking_id UUID, p_meet_link TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Nur Admins dürfen meet_link setzen';
  END IF;

  UPDATE public.bookings
  SET meet_link = p_meet_link
  WHERE id = p_booking_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_booking_meet_link(UUID, TEXT) TO authenticated;

-- 3) RPC für Reminder-Function: alle Bookings die 24h-Mail brauchen
-- Window: slot_iso liegt zwischen 23.5h und 24.5h in der Zukunft
CREATE OR REPLACE FUNCTION public.get_bookings_needing_24h_reminder()
RETURNS TABLE(
  id UUID,
  slot_iso TIMESTAMPTZ,
  name TEXT,
  email TEXT,
  topic TEXT,
  message TEXT,
  meet_link TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id, b.slot_iso, b.name, b.email, b.topic, b.message, b.meet_link
  FROM public.bookings b
  WHERE b.status IN ('pending', 'confirmed')
    AND b.reminder_24h_sent_at IS NULL
    AND b.slot_iso BETWEEN now() + interval '23 hours 30 minutes'
                       AND now() + interval '24 hours 30 minutes';
$$;

-- RPC für 15-min-Reminder
-- Window: slot_iso liegt zwischen 10min und 20min in der Zukunft
CREATE OR REPLACE FUNCTION public.get_bookings_needing_15min_reminder()
RETURNS TABLE(
  id UUID,
  slot_iso TIMESTAMPTZ,
  name TEXT,
  email TEXT,
  topic TEXT,
  message TEXT,
  meet_link TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.id, b.slot_iso, b.name, b.email, b.topic, b.message, b.meet_link
  FROM public.bookings b
  WHERE b.status IN ('pending', 'confirmed')
    AND b.reminder_15min_sent_at IS NULL
    AND b.slot_iso BETWEEN now() + interval '10 minutes'
                       AND now() + interval '20 minutes';
$$;

-- RPC zum Markieren als gesendet (idempotent)
CREATE OR REPLACE FUNCTION public.mark_reminder_sent(p_booking_id UUID, p_reminder_kind TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_reminder_kind = '24h' THEN
    UPDATE public.bookings SET reminder_24h_sent_at = now() WHERE id = p_booking_id;
  ELSIF p_reminder_kind = '15min' THEN
    UPDATE public.bookings SET reminder_15min_sent_at = now() WHERE id = p_booking_id;
  ELSIF p_reminder_kind = 'confirmation' THEN
    UPDATE public.bookings SET confirmation_sent_at = now() WHERE id = p_booking_id;
  ELSE
    RAISE EXCEPTION 'Unbekannter reminder_kind: %', p_reminder_kind;
  END IF;
END;
$$;

-- 4) pg_cron + pg_net Extensions aktivieren
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 5) Cron-Job: ruft Reminder-Edge-Function alle 5 Min
-- Service-Key muss in Vault liegen (Schlüssel-Name: 'cron_service_role_key')
-- Falls Vault nicht genutzt, hardcode Service-Key — aber bitte rotieren falls geleakt
DO $$
DECLARE
  v_service_key TEXT;
  v_url TEXT := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-booking-reminders';
BEGIN
  -- Versuch: Vault auslesen
  BEGIN
    SELECT decrypted_secret INTO v_service_key
    FROM vault.decrypted_secrets
    WHERE name = 'cron_service_role_key'
    LIMIT 1;
  EXCEPTION WHEN OTHERS THEN
    v_service_key := NULL;
  END;

  -- Falls Vault leer: Cron-Job ohne Auth registrieren (Edge-Function muss dann CRON_SECRET prüfen)
  -- → User legt Vault-Secret nach: select vault.create_secret('SERVICE_ROLE_HIER', 'cron_service_role_key');

  -- Alten Job wegräumen falls schon registriert
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-booking-reminders') THEN
    PERFORM cron.unschedule('send-booking-reminders');
  END IF;

  PERFORM cron.schedule(
    'send-booking-reminders',
    '*/5 * * * *',
    format($cron$
      SELECT net.http_post(
        url := %L,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || COALESCE(
            (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cron_service_role_key' LIMIT 1),
            ''
          )
        ),
        body := '{}'::jsonb
      ) AS request_id;
    $cron$, v_url)
  );
END $$;
