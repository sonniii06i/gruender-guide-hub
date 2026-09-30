-- Support-Tickets absichern (Sicherheitsrunde 30.09.2026)
--
-- 1) contact_tickets INSERT hatte WITH CHECK (true): jeder konnte Tickets im
--    Namen fremder Nutzer (beliebige user_id) anlegen, die dann in deren
--    Support-Ansicht auftauchten. Jetzt: user_id NULL (Gast) oder eigene.
-- 2) Gaeste/Kunden setzen status/priority nicht selbst.
-- 3) Laengengrenzen (NOT VALID: Altbestand bleibt unangetastet).
-- 4) mail_sent_at: send-ticket-email verschickt je Ticket genau einmal.
-- 5) ticket_messages.author_role wurde vom Client gesetzt — ein Kunde konnte
--    als "admin" antworten. Jetzt setzt ein Trigger Rolle und Autor.
--
-- Aufrufer: Kontakt.tsx (insert, anon+auth, user_id = eigene oder null),
-- Admin.tsx (Admin-Antwort mit author_role 'admin', Status-Update),
-- Support.tsx (nur lesen), delete-account (service_role), send-ticket-email
-- (service_role). Alle bleiben kompatibel.

-- 1) Insert-Policy
DROP POLICY IF EXISTS "anyone can submit ticket" ON public.contact_tickets;
CREATE POLICY "anyone can submit ticket" ON public.contact_tickets
  FOR INSERT
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- 4) Versandmarke
ALTER TABLE public.contact_tickets
  ADD COLUMN IF NOT EXISTS mail_sent_at TIMESTAMPTZ;

-- 3) Laengengrenzen
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_tickets_laengen') THEN
    ALTER TABLE public.contact_tickets
      ADD CONSTRAINT contact_tickets_laengen CHECK (
        char_length(name) <= 200
        AND char_length(email) <= 254
        AND char_length(subject) <= 300
        AND char_length(message) <= 10000
      ) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ticket_messages_laenge') THEN
    ALTER TABLE public.ticket_messages
      ADD CONSTRAINT ticket_messages_laenge CHECK (char_length(body) <= 20000) NOT VALID;
  END IF;
END $$;

-- 2) Felder, die nur Admins/Service setzen
CREATE OR REPLACE FUNCTION public.tg_contact_tickets_schutz()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER  -- bewusst: current_user muss die aufrufende Rolle sein
SET search_path = public
AS $$
BEGIN
  -- service_role/postgres und Admins duerfen alles
  IF current_user IN ('postgres', 'service_role', 'supabase_admin')
     OR coalesce(auth.role(), '') = 'service_role'
     OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.status       := 'open';
    NEW.priority     := 'normal';
    NEW.mail_sent_at := NULL;
    NEW.created_at   := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_tickets_schutz ON public.contact_tickets;
CREATE TRIGGER contact_tickets_schutz
  BEFORE INSERT ON public.contact_tickets
  FOR EACH ROW EXECUTE FUNCTION public.tg_contact_tickets_schutz();

-- 5) author_role/author_id serverseitig
CREATE OR REPLACE FUNCTION public.tg_ticket_messages_rolle()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER  -- bewusst: current_user muss die aufrufende Rolle sein
SET search_path = public
AS $$
BEGIN
  -- Service-Rolle (Functions, SQL-Editor) setzt Werte selbst.
  IF current_user IN ('postgres', 'service_role', 'supabase_admin')
     OR coalesce(auth.role(), '') = 'service_role' THEN
    RETURN NEW;
  END IF;

  NEW.author_id := auth.uid();
  IF auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin') THEN
    NEW.author_role := 'admin';
  ELSE
    NEW.author_role := 'customer';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ticket_messages_rolle ON public.ticket_messages;
CREATE TRIGGER ticket_messages_rolle
  BEFORE INSERT OR UPDATE ON public.ticket_messages
  FOR EACH ROW EXECUTE FUNCTION public.tg_ticket_messages_rolle();
