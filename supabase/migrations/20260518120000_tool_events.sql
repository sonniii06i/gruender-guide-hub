-- Tool-Funnel-Events für tiefere Analyse als reines page_views
-- z.B. "User kam in Step 1 vs. Step 5 des LUCID-Wizards"

CREATE TABLE IF NOT EXISTS public.tool_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash text NOT NULL,
  user_id uuid,
  tool text NOT NULL,           -- z.B. "lucid-wizard", "us-llc-wizard"
  event text NOT NULL,          -- z.B. "step_2_reached", "completed", "cta_clicked"
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tool_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins view tool_events"
ON public.tool_events FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_tool_events_created_at ON public.tool_events(created_at DESC);
CREATE INDEX idx_tool_events_tool_event ON public.tool_events(tool, event);
CREATE INDEX idx_tool_events_visitor ON public.tool_events(visitor_hash, tool);
