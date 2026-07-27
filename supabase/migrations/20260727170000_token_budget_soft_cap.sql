-- Token-Kontingent fuer GruenderX als SOFT-Limit (2026-07-27).
--
-- Schwester der gleichnamigen Migration in AnwaltX. Unterschied: AnwaltX hatte
-- mit usage_logs bereits eine Kostenerfassung, GruenderX nicht -- chat_logs
-- protokollierte nur Provider, Modell und Latenz. Ohne Kosten pro Aufruf kann
-- kein Deckel greifen, deshalb kommt die Erfassung hier zuerst.
--
-- Bewusst SOFT wie bei AnwaltX: warnen, nicht sperren. Wer drueber liegt,
-- taucht in der Admin-Liste auf.

-- ── 1. Kostenerfassung an chat_logs ────────────────────────────────────────
ALTER TABLE public.chat_logs
  ADD COLUMN IF NOT EXISTS input_tokens  integer,
  ADD COLUMN IF NOT EXISTS output_tokens integer,
  ADD COLUMN IF NOT EXISTS cost_usd      numeric(12,6);

CREATE INDEX IF NOT EXISTS chat_logs_user_created_idx
  ON public.chat_logs (user_id, created_at DESC)
  WHERE user_id IS NOT NULL;

-- ── 2. Modellpreise als Daten, nicht als Code ──────────────────────────────
-- Preise aendern sich, und ein Preis im Function-Code bedeutet: Deploy noetig,
-- und niemand sieht, welcher Satz gerade gilt. Hier steht er sichtbar und
-- korrigierbar.
--
-- WICHTIG: Nur der Anthropic-Satz ist gegen die offizielle Preisliste
-- geprueft. Die Gemini- und OpenAI-Werte sind PLATZHALTER nach bestem Wissen
-- und muessen gegen die jeweilige Preisliste verifiziert werden, bevor der
-- Deckel als belastbar gilt -- `verified` markiert das.
CREATE TABLE IF NOT EXISTS public.llm_model_pricing (
  model              text PRIMARY KEY,
  input_usd_per_1m   numeric(10,4) NOT NULL,
  output_usd_per_1m  numeric(10,4) NOT NULL,
  verified           boolean NOT NULL DEFAULT false,
  note               text,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.llm_model_pricing (model, input_usd_per_1m, output_usd_per_1m, verified, note) VALUES
  ('claude-haiku-4-5-20251001', 1.0000,  5.0000, true,  'Gegen die offizielle Anthropic-Preisliste geprueft.'),
  ('gemini-2.5-flash',          0.3000,  2.5000, false, 'PLATZHALTER - gegen Google-Preisliste pruefen.'),
  ('gpt-4o',                    2.5000, 10.0000, false, 'PLATZHALTER - gegen OpenAI-Preisliste pruefen.'),
  ('gpt-4o-mini',               0.1500,  0.6000, false, 'PLATZHALTER - gegen OpenAI-Preisliste pruefen.')
ON CONFLICT (model) DO NOTHING;

ALTER TABLE public.llm_model_pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "llm_model_pricing_admin_all" ON public.llm_model_pricing;
CREATE POLICY "llm_model_pricing_admin_all" ON public.llm_model_pricing
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── 3. Konfiguration des Deckels ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.token_budget_config (
  id                smallint PRIMARY KEY DEFAULT 1,
  monthly_limit_eur numeric(10,2) NOT NULL DEFAULT 20.00,
  usd_to_eur        numeric(10,4) NOT NULL DEFAULT 0.9200,
  warn_at_pct       smallint NOT NULL DEFAULT 80,
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT token_budget_config_singleton CHECK (id = 1),
  CONSTRAINT token_budget_config_pct CHECK (warn_at_pct BETWEEN 1 AND 100)
);

INSERT INTO public.token_budget_config (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.token_budget_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "token_budget_config_read" ON public.token_budget_config;
CREATE POLICY "token_budget_config_read" ON public.token_budget_config
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "token_budget_config_admin_write" ON public.token_budget_config;
CREATE POLICY "token_budget_config_admin_write" ON public.token_budget_config
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ── 4. Verbrauch des Aufrufers im laufenden Kalendermonat ──────────────────
CREATE OR REPLACE FUNCTION public.get_my_token_budget()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_uid          uuid := auth.uid();
  v_cfg          RECORD;
  v_period_start timestamptz;
  v_cost_usd     numeric;
  v_used_eur     numeric;
  v_pct          numeric;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('error', 'not_authenticated');
  END IF;

  SELECT * INTO v_cfg FROM public.token_budget_config c WHERE c.id = 1;
  v_period_start := date_trunc('month', now());

  SELECT COALESCE(SUM(l.cost_usd), 0) INTO v_cost_usd
  FROM public.chat_logs l
  WHERE l.user_id = v_uid AND l.created_at >= v_period_start;

  v_used_eur := ROUND(v_cost_usd * v_cfg.usd_to_eur, 2);
  v_pct := CASE WHEN v_cfg.monthly_limit_eur > 0
                THEN ROUND((v_used_eur / v_cfg.monthly_limit_eur) * 100, 1)
                ELSE 0 END;

  RETURN jsonb_build_object(
    'used_eur',     v_used_eur,
    'limit_eur',    v_cfg.monthly_limit_eur,
    'pct',          v_pct,
    'warn_at_pct',  v_cfg.warn_at_pct,
    'over_limit',   v_used_eur >= v_cfg.monthly_limit_eur,
    'should_warn',  v_pct >= v_cfg.warn_at_pct,
    'period_start', v_period_start,
    'period_end',   (v_period_start + interval '1 month')
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.get_my_token_budget() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_my_token_budget() TO authenticated;

-- ── 5. Admin-Sicht ─────────────────────────────────────────────────────────
-- OUT-Spalten sind in PL/pgSQL Variablen: jede Referenz auf gleichnamige
-- Tabellenspalten MUSS qualifiziert sein, sonst bricht die Funktion mit
-- "column reference is ambiguous" ab -- und zwar VOR der Rechtepruefung.
CREATE OR REPLACE FUNCTION public.admin_token_budget_overview(p_min_pct numeric DEFAULT 80)
RETURNS TABLE (
  user_id   uuid,
  used_eur  numeric,
  limit_eur numeric,
  pct       numeric,
  calls     bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_cfg          RECORD;
  v_period_start timestamptz := date_trunc('month', now());
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT * INTO v_cfg FROM public.token_budget_config c WHERE c.id = 1;

  RETURN QUERY
  SELECT
    l.user_id,
    ROUND(SUM(l.cost_usd) * v_cfg.usd_to_eur, 2),
    v_cfg.monthly_limit_eur,
    ROUND((SUM(l.cost_usd) * v_cfg.usd_to_eur / NULLIF(v_cfg.monthly_limit_eur, 0)) * 100, 1),
    COUNT(*)::bigint
  FROM public.chat_logs l
  WHERE l.created_at >= v_period_start AND l.user_id IS NOT NULL
  GROUP BY l.user_id, v_cfg.monthly_limit_eur
  HAVING (SUM(l.cost_usd) * v_cfg.usd_to_eur / NULLIF(v_cfg.monthly_limit_eur, 0)) * 100 >= p_min_pct
  ORDER BY 2 DESC;
END;
$function$;

REVOKE ALL ON FUNCTION public.admin_token_budget_overview(numeric) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_token_budget_overview(numeric) TO authenticated;
