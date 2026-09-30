-- Buchungen absichern (Sicherheitsrunde 30.09.2026)
--
-- Die UPDATE-Policy "auth_can_cancel_own_bookings" hatte keine Spalten-
-- beschraenkung: ein Nutzer konnte an seiner Buchung ALLES aendern —
-- slot_iso (fremde Slots blockieren), status 'confirmed', meet_link,
-- reminder_*_sent_at, email (Reminder-Mails an beliebige Adressen).
-- Und beim INSERT kam die E-Mail ungeprueft vom Client.
--
-- Jetzt per Trigger (gilt nicht fuer service_role/postgres/Admins):
--   INSERT: email = Adresse aus dem JWT, status = 'pending',
--           Versand-/Meet-Felder leer.
--   UPDATE: nur status -> 'cancelled'; jede andere Aenderung wird abgelehnt.
--
-- Aufrufer: Booking.tsx (insert mit user_id = auth.uid(), status pending),
-- BookingsAdmin.tsx (nur lesen + RPC set_booking_meet_link, SECURITY DEFINER
-- -> laeuft als Eigentuemer, bleibt erlaubt), send-booking-confirmation /
-- send-booking-reminders (service_role). Alle kompatibel.

CREATE OR REPLACE FUNCTION public.tg_bookings_schutz()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER  -- bewusst: current_user muss die aufrufende Rolle sein
SET search_path = public
AS $$
DECLARE
  v_mail TEXT;
BEGIN
  IF current_user IN ('postgres', 'service_role', 'supabase_admin')
     OR coalesce(auth.role(), '') = 'service_role'
     OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    v_mail := nullif(trim(coalesce(auth.jwt() ->> 'email', '')), '');
    IF v_mail IS NULL THEN
      RAISE EXCEPTION 'Buchung nur mit bestaetigter Konto-Adresse moeglich'
        USING ERRCODE = '42501';
    END IF;
    NEW.email                  := lower(v_mail);
    NEW.status                 := 'pending';
    NEW.meet_link              := NULL;
    NEW.confirmation_sent_at   := NULL;
    NEW.reminder_24h_sent_at   := NULL;
    NEW.reminder_15min_sent_at := NULL;
    NEW.created_at             := now();
    RETURN NEW;
  END IF;

  -- UPDATE durch den Nutzer selbst: nur Stornieren
  IF NEW.status IS DISTINCT FROM 'cancelled'
     OR (to_jsonb(NEW) - 'status') IS DISTINCT FROM (to_jsonb(OLD) - 'status') THEN
    RAISE EXCEPTION 'Nur Stornieren (status = cancelled) ist erlaubt'
      USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bookings_schutz ON public.bookings;
CREATE TRIGGER bookings_schutz
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.tg_bookings_schutz();

-- Policy zusaetzlich enger: Zielzustand muss 'cancelled' sein.
DROP POLICY IF EXISTS "auth_can_cancel_own_bookings" ON public.bookings;
CREATE POLICY "auth_can_cancel_own_bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'cancelled');
