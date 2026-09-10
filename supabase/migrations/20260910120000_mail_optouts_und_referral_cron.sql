-- ===================================================================
-- Marketing-Mails: Widerspruchsliste + taeglicher Empfehlungs-Job.
--
-- WOZU DIE TABELLE. § 7 Abs. 3 UWG erlaubt Werbung per Mail an eigene
-- Kunden fuer eigene, aehnliche Ware ohne separate Einwilligung -- aber
-- nur, wenn der Kunde bei JEDER Mail widersprechen kann. Ausserdem
-- verlangen Gmail und Yahoo seit Februar 2024 List-Unsubscribe mit
-- One-Click (RFC 8058). Beides braucht eine Stelle, an der der
-- Widerspruch landet.
--
-- Die Adresse ist der Schluessel, NICHT die user_id: Wer den Kauf
-- abbricht, hat pay-first bedingt noch gar kein Konto -- genau der
-- bekommt aber die Warenkorb-Abbruch-Mail.
--
-- Ohne diese Tabelle senden weder der Webhook noch der Cron-Job (beide
-- brechen bewusst ab, statt ohne Widerspruchsweg zu werben).
-- ===================================================================

CREATE TABLE IF NOT EXISTS public.mail_optouts (
  email       text PRIMARY KEY,
  source      text,               -- 'one_click' | 'link' | 'manuell'
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mail_optouts ENABLE ROW LEVEL SECURITY;

-- Keine Policy fuer anon/authenticated: Die Liste ist eine Sperrliste und
-- geht niemanden im Browser etwas an. Geschrieben und gelesen wird sie
-- ausschliesslich von Edge Functions mit dem Service-Role-Key, der RLS
-- ohnehin umgeht.

COMMENT ON TABLE public.mail_optouts IS
  'Widerspruch gegen Marketingmails (§ 7 UWG / RFC 8058). Nur Service-Role.';

-- -------------------------------------------------------------------
-- Taeglicher Empfehlungs-Job, 09:30 UTC.
--
-- Einmal taeglich genuegt: Die Mail ist nicht eilig, und der Merker
-- steht in den Stripe-Metadaten des Abos -- ein ausgefallener Lauf holt
-- die Kohorte am naechsten Tag nach, statt sie zu verlieren.
--
-- Aufbau wie bei send-booking-reminders: Schluessel aus dem Vault, damit
-- er nicht in der Migration steht.
-- -------------------------------------------------------------------
DO $$
DECLARE
  v_url text := 'https://rwrjuzemkfghlziretdj.supabase.co/functions/v1/send-referral-mails';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    RAISE NOTICE 'pg_cron fehlt — Job nicht eingerichtet.';
    RETURN;
  END IF;

  PERFORM cron.unschedule('send-referral-mails')
  WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-referral-mails');

  PERFORM cron.schedule(
    'send-referral-mails',
    '30 9 * * *',
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
