-- Bookings: 1:1-Berater-Termine
-- Mini-Calendly: User wählt Slot + Topic, Founder bekommt Email-Notification

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  slot_iso TIMESTAMPTZ NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'done')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_slot_iso_idx ON public.bookings (slot_iso);
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings (user_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings (status);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Authenticated User darf eigenen Booking-Datensatz einfügen
DROP POLICY IF EXISTS "auth_can_insert_own_bookings" ON public.bookings;
CREATE POLICY "auth_can_insert_own_bookings"
  ON public.bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User darf eigene Bookings sehen (alle Felder)
DROP POLICY IF EXISTS "auth_can_see_own_bookings" ON public.bookings;
CREATE POLICY "auth_can_see_own_bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- User darf eigene Bookings stornieren
DROP POLICY IF EXISTS "auth_can_cancel_own_bookings" ON public.bookings;
CREATE POLICY "auth_can_cancel_own_bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- SECURITY DEFINER Function: gibt nur slot_iso aller aktiver Bookings zurück
-- Damit kann jeder authentifizierte User belegte Slots sehen, ohne PII zu leaken
CREATE OR REPLACE FUNCTION public.get_booked_slots()
RETURNS TABLE(slot_iso TIMESTAMPTZ)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT b.slot_iso
  FROM public.bookings b
  WHERE b.status IN ('pending', 'confirmed')
    AND b.slot_iso > now();
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_booked_slots() TO anon;
