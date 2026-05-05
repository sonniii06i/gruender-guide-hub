CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash text NOT NULL,
  path text NOT NULL,
  referrer text,
  country text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins view page_views"
ON public.page_views FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_visitor_day ON public.page_views(visitor_hash, created_at DESC);