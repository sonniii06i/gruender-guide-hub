
-- Playbook runs
CREATE TABLE public.playbook_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  playbook_slug text NOT NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'in_progress', -- in_progress | completed | paused
  current_step integer NOT NULL DEFAULT 0,
  total_steps integer NOT NULL,
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.playbook_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select own runs" ON public.playbook_runs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own runs" ON public.playbook_runs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own runs" ON public.playbook_runs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own runs" ON public.playbook_runs FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_runs_user ON public.playbook_runs(user_id, status);

CREATE TRIGGER set_runs_updated BEFORE UPDATE ON public.playbook_runs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Step progress (per step state + notes/data)
CREATE TABLE public.playbook_step_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.playbook_runs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  step_index integer NOT NULL,
  step_slug text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending | done | skipped
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_id, step_index)
);
ALTER TABLE public.playbook_step_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select own step" ON public.playbook_step_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own step" ON public.playbook_step_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own step" ON public.playbook_step_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own step" ON public.playbook_step_progress FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_step_run ON public.playbook_step_progress(run_id);

CREATE TRIGGER set_step_updated BEFORE UPDATE ON public.playbook_step_progress
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  kind text NOT NULL DEFAULT 'info', -- info | reminder | success | warning
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete own notifications" ON public.notifications FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_notif_user ON public.notifications(user_id, created_at DESC);

-- Chat messages (Felix)
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select own chat" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert own chat" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete own chat" ON public.chat_messages FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_chat_user ON public.chat_messages(user_id, created_at);

-- Extra profile fields (avatar, billing address)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS street text,
  ADD COLUMN IF NOT EXISTS postal_code text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS vat_id text,
  ADD COLUMN IF NOT EXISTS tax_id text;
