-- Blog-Cron mit Service-Role-Key statt anon-Key (Sicherheitsrunde 30.09.2026)
--
-- generate-blog-post verlangt jetzt Service-Role-Key, x-cron-secret oder
-- einen eingeloggten Admin. Der bisherige Job schickte nur den oeffentlichen
-- anon-Key mit — er wuerde nach dem Deploy mit 403 scheitern.
-- Aufbau wie send-booking-reminders / send-referral-mails: Schluessel aus
-- dem Vault ('cron_service_role_key'), nicht im Klartext in der Migration.
--
-- Voraussetzung (einmalig, falls noch nicht vorhanden — pruefen mit
--   SELECT name FROM vault.decrypted_secrets WHERE name = 'cron_service_role_key';):
--   SELECT vault.create_secret('<SERVICE_ROLE_KEY>', 'cron_service_role_key');

DO $$
DECLARE
  v_url text := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/generate-blog-post';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    RAISE NOTICE 'pg_cron fehlt — Job nicht eingerichtet.';
    RETURN;
  END IF;

  PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname = 'gruenderx-generate-blog-post';

  PERFORM cron.schedule(
    'gruenderx-generate-blog-post',
    '0 6 * * 2,5',
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
        body := jsonb_build_object('source', 'cron', 'fired_at', now())
      ) AS request_id;
    $cron$, v_url)
  );
END $$;
