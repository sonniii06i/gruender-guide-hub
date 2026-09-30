-- Rechte aller SECURITY-DEFINER-Funktionen festziehen (Sicherheitsrunde 30.09.2026)
--
-- Hintergrund: Postgres gibt EXECUTE auf neue Funktionen an PUBLIC. Eine
-- SECURITY-DEFINER-Funktion ohne REVOKE ist damit fuer anon/authenticated per
-- /rest/v1/rpc aufrufbar und laeuft mit den Rechten des Eigentuemers (RLS aus).
-- Konkret waren die Buchungs-Reminder-RPCs offen: jeder konnte Name, Mail und
-- Nachricht anstehender Termine lesen und Reminder als "gesendet" markieren.
--
-- Aufrufer-Inventur (grep in src/, supabase/functions/, scripts/, pg_cron):
--   get_bookings_needing_24h_reminder   -> nur send-booking-reminders (service_role)
--   get_bookings_needing_15min_reminder -> nur send-booking-reminders (service_role)
--   mark_reminder_sent                  -> send-booking-reminders, send-booking-confirmation (service_role)
--   match_kb_chunks                     -> nur _shared/kb-retrieval.ts + scripts/check-migration.ts (service_role)
--   redeem_code                         -> nur redeem-code (service_role), war schon gesperrt
--   cart_abandons_aufraeumen / tool_leads_aufraeumen -> nur pg_cron (postgres), waren schon gesperrt
--   Trigger-Funktionen                  -> werden nie direkt aufgerufen
--   Vom Frontend gebraucht (bleiben aufrufbar, pruefen intern):
--     get_booked_slots          (Booking.tsx, anon+auth; gibt nur Zeitpunkte zurueck)
--     set_booking_meet_link     (BookingsAdmin.tsx; prueft has_role admin)
--     get_my_token_budget       (useTokenBudget.tsx; arbeitet nur auf auth.uid())
--     admin_token_budget_overview (prueft has_role admin)
--     has_role                  (wird in RLS-Policies als Aufrufer ausgewertet -> muss aufrufbar bleiben)
--
-- Idempotent: nur REVOKE/GRANT, keine Logik-Aenderung. DO-Block ueberspringt
-- Funktionen, die es live nicht gibt.

DO $$
DECLARE
  v_sig TEXT;
  v_nur_service TEXT[] := ARRAY[
    'public.get_bookings_needing_24h_reminder()',
    'public.get_bookings_needing_15min_reminder()',
    'public.mark_reminder_sent(uuid, text)',
    'public.match_kb_chunks(vector, integer, double precision, text)',
    'public.redeem_code(text, text, uuid, timestamp with time zone)',
    'public.cart_abandons_aufraeumen()',
    'public.tool_leads_aufraeumen()',
    'public.handle_new_user()',
    'public.update_updated_at_column()',
    'public.kb_chunks_set_updated_at()',
    'public.tg_user_two_factor_touch()'
  ];
BEGIN
  FOREACH v_sig IN ARRAY v_nur_service LOOP
    IF to_regprocedure(v_sig) IS NULL THEN
      RAISE NOTICE 'uebersprungen (existiert nicht): %', v_sig;
      CONTINUE;
    END IF;
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', v_sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', v_sig);
  END LOOP;
END $$;

-- Frontend-RPCs: PUBLIC entziehen, gezielt an die Rollen geben, die sie brauchen.
-- (Die Funktionen pruefen intern auth.uid()/has_role.)
DO $$
BEGIN
  IF to_regprocedure('public.set_booking_meet_link(uuid, text)') IS NOT NULL THEN
    REVOKE ALL ON FUNCTION public.set_booking_meet_link(uuid, text) FROM PUBLIC, anon;
    GRANT EXECUTE ON FUNCTION public.set_booking_meet_link(uuid, text) TO authenticated, service_role;
  END IF;
  IF to_regprocedure('public.get_my_token_budget()') IS NOT NULL THEN
    REVOKE ALL ON FUNCTION public.get_my_token_budget() FROM PUBLIC, anon;
    GRANT EXECUTE ON FUNCTION public.get_my_token_budget() TO authenticated, service_role;
  END IF;
  IF to_regprocedure('public.admin_token_budget_overview(numeric)') IS NOT NULL THEN
    REVOKE ALL ON FUNCTION public.admin_token_budget_overview(numeric) FROM PUBLIC, anon;
    GRANT EXECUTE ON FUNCTION public.admin_token_budget_overview(numeric) TO authenticated, service_role;
  END IF;
END $$;

-- Kontrolle nach dem Ausfuehren (sollte fuer die Reminder-RPCs nur postgres/service_role zeigen):
-- SELECT p.proname, r.rolname
--   FROM pg_proc p
--   JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
--   CROSS JOIN LATERAL aclexplode(COALESCE(p.proacl, acldefault('f', p.proowner))) a
--   LEFT JOIN pg_roles r ON r.oid = a.grantee
--  WHERE p.prosecdef
--  ORDER BY 1, 2;
