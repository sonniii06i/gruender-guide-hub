-- Cron-Jobs mit x-cron-secret statt Service-Role-Key (Sicherheitsrunde 30.09.2026)
--
-- generate-blog-post und send-referral-mails verlangen jetzt den
-- Service-Role-Key ODER x-cron-secret. Der Service-Role-Weg taugt fuer pg_cron
-- nicht mehr: Seit der Key-Umstellung am 30.09.2026 kennt die Laufzeit als
-- SUPABASE_SERVICE_ROLE_KEY den neuen sb_secret-Key, der Vault-Eintrag
-- 'cron_service_role_key' enthaelt aber den alten JWT -> 401, der
-- Empfehlungsversand fiel still aus.
--
-- Deshalb wie send-weekly / send-cart-series: Header x-cron-secret aus dem
-- Vault-Eintrag 'cart_cron_secret' (= Function-Secret CART_CRON_SECRET).
-- Der Blog-Job schickt den anon-Key weiter mit, damit er auch mit der alten,
-- noch nicht neu deployten Function-Version laeuft.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    RAISE NOTICE 'pg_cron fehlt — Jobs nicht eingerichtet.';
    RETURN;
  END IF;

  PERFORM cron.schedule(
    'gruenderx-generate-blog-post',
    '0 6 * * 2,5',
    $job$
  select net.http_post(
    url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/generate-blog-post',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U',
      'x-cron-secret', coalesce(
        (select decrypted_secret from vault.decrypted_secrets
          where name = 'cart_cron_secret' limit 1), '')
    ),
    body := jsonb_build_object('source', 'cron', 'fired_at', now())
  ) as request_id;
$job$
  );

  PERFORM cron.schedule(
    'send-referral-mails',
    '30 9 * * *',
    $job$
  select net.http_post(
    url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-referral-mails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', coalesce(
        (select decrypted_secret from vault.decrypted_secrets
          where name = 'cart_cron_secret' limit 1), '')
    ),
    body := '{}'::jsonb
  ) as request_id;
$job$
  );
END $$;
