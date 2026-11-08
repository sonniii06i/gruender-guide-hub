-- ANGEWENDET 08.11.2026 per db query (Betreiber-Freigabe „alle Lücken lösen“).
--
-- Befund: pg_cron-Job 1 „send-booking-reminders“ scheitert seit 15.05.2026 bei jedem Lauf
-- (51.026 Fehlschlaege bis 08.11.2026 19:40 UTC, „URL using bad/illegal format“): In der URL steht ein
-- Zeilenumbruch („send-bo⏎oking-reminders“). Termin-Erinnerungen (24 h / 15 min) wurden darum nie versendet.
-- Die Function nimmt seit 08.11.2026 nur noch Service-Role oder x-cron-secret (CART_CRON_SECRET) an.
--
-- Folge der Anwendung: Ab dem naechsten 5-Minuten-Lauf gehen ECHTE Erinnerungsmails an Kunden mit Terminen
-- im 24-h- bzw. 15-min-Fenster (erstmals seit Mai). Stand bei Anwendung: 0 faellige Buchungen (einzige Buchung 15.05., vergangen),
-- Probelauf 200 „no reminders due“.
DO $$
DECLARE j bigint;
BEGIN
  SELECT jobid INTO j FROM cron.job WHERE jobname = 'send-booking-reminders';
  IF j IS NULL THEN
    RAISE NOTICE 'Job send-booking-reminders nicht gefunden – nichts geaendert';
    RETURN;
  END IF;
  PERFORM cron.alter_job(j, command := $cmd$
    SELECT net.http_post(
      url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-booking-reminders',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cart_cron_secret' LIMIT 1)
      ),
      body := '{}'::jsonb
    ) AS request_id;
  $cmd$);
END $$;
