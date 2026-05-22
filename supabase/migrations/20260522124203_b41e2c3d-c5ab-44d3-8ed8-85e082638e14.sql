
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Idempotent: drop existing schedule if present
DO $$
DECLARE
  jid bigint;
BEGIN
  SELECT jobid INTO jid FROM cron.job WHERE jobname = 'gruenderx-generate-blog-post';
  IF jid IS NOT NULL THEN
    PERFORM cron.unschedule(jid);
  END IF;
END $$;

SELECT cron.schedule(
  'gruenderx-generate-blog-post',
  '0 6 * * 2,5',
  $cmd$
  SELECT net.http_post(
    url := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/generate-blog-post',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cmp1emVta2ZnaGx6aXJldGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTYxMjcsImV4cCI6MjA5MzQ5MjEyN30.2zNrmQwqHyrrhhetpdOjEWbFZ9FZIh8X0KLE4wFYr6U'
    ),
    body := jsonb_build_object('source', 'cron', 'fired_at', now())
  );
  $cmd$
);
