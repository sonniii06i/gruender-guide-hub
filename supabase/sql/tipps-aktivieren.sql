-- Tipps-Strecke einschalten: stündlicher Versand (Minute 41). Erst NACH Freigabe der
-- Mailtexte durch den Betreiber einspielen (~/gruenderx-skripte/tipps-aktivieren.sh).
-- Ausschalten: select cron.unschedule('send-tipps-strecke');
do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'send-tipps-strecke';
  perform cron.schedule(
    'send-tipps-strecke',
    '41 * * * *',
    $job$
  select net.http_post(
    url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-tipps-strecke',
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
