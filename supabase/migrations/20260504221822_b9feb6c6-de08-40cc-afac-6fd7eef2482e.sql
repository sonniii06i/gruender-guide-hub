
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users see own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact tickets
CREATE TABLE public.contact_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can submit ticket" ON public.contact_tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "user sees own tickets" ON public.contact_tickets
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update tickets" ON public.contact_tickets
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete tickets" ON public.contact_tickets
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER contact_tickets_updated
BEFORE UPDATE ON public.contact_tickets
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ticket messages
CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.contact_tickets(id) ON DELETE CASCADE,
  author_id UUID,
  author_role TEXT NOT NULL DEFAULT 'customer',
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "see ticket messages" ON public.ticket_messages
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.contact_tickets t WHERE t.id = ticket_id AND t.user_id = auth.uid())
  );

CREATE POLICY "admin replies" ON public.ticket_messages
  FOR INSERT WITH CHECK (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.contact_tickets t WHERE t.id = ticket_id AND t.user_id = auth.uid())
  );

CREATE INDEX idx_ticket_messages_ticket ON public.ticket_messages(ticket_id);
CREATE INDEX idx_contact_tickets_status ON public.contact_tickets(status);

-- Make buttkesonni11@gmail.com admin + confirm email
INSERT INTO public.user_roles (user_id, role)
VALUES ('6edf3b22-4cab-4680-8266-7c47e9934294', 'admin')
ON CONFLICT DO NOTHING;

UPDATE auth.users SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE id = '6edf3b22-4cab-4680-8266-7c47e9934294';
