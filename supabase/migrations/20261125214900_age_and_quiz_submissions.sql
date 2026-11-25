-- Altersgruppe für personalisierte Guide-Vorschläge (12–70) + Quiz-/Umfrage-Auswertung für Persona-Formung
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS age_group text;

CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  quiz_slug text NOT NULL,
  age_group text,
  primary_goal text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  result_key text,
  result_label text,
  score integer,
  reward_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Öffentliche anonyme Quiz-/Umfrage-Abgaben erlauben (keine personenbezogenen Daten erforderlich)
DROP POLICY IF EXISTS "quiz_submissions_insert_any" ON public.quiz_submissions;
CREATE POLICY "quiz_submissions_insert_any"
  ON public.quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Eigene Abgaben lesen
DROP POLICY IF EXISTS "quiz_submissions_select_own" ON public.quiz_submissions;
CREATE POLICY "quiz_submissions_select_own"
  ON public.quiz_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
