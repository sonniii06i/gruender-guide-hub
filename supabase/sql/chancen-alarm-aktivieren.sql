-- Chancen-Alarm einschalten: Wochenmail jeden Montag 06:15 UTC (07:15 Winterzeit / 08:15 Sommerzeit).
-- Erst NACH Migration 20261025180000_chancen_abo.sql und Deploy von chancen-anfordern,
-- chancen-bestaetigen, send-chancen-alarm einspielen; danach CHANCEN_ALARM_AKTIV = true.
-- Ausschalten: select cron.unschedule('send-chancen-alarm');
do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'send-chancen-alarm';
  perform cron.schedule(
    'send-chancen-alarm',
    '15 6 * * 1',
    $job$
  select net.http_post(
    url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-chancen-alarm',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', coalesce(
        (select decrypted_secret from vault.decrypted_secrets where name = 'cart_cron_secret' limit 1), '')
    ),
    body := jsonb_build_object('source', 'cron', 'fired_at', now())
  ) as request_id;
$job$
  );
end $$;
