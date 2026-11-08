-- NACHTRAG 08.11.2026 zu 20260727170000_token_budget_soft_cap.sql (Betreiber-Freigabe „alle Lücken lösen“).
-- Die Juli-Migration lag im Ordner, war in Prod aber nie angewendet (chat_logs ohne input_tokens/output_tokens/cost_usd,
-- logChat wich auf prompt_tokens/completion_tokens aus). Am 08.11. per db query angewendet, dazu:
-- 1) Preise der Modelle, die chat-felix heute nutzt (_shared/llm.ts: claude-opus-5-5, Klein claude-haiku-5-5);
--    Quelle Anthropic-Preisliste (Stand 06.10.2026), Haiku 5.5 gilt bis 100K Eingabe-Tokens.
--    Ohne diese Zeilen bliebe cost_usd fuer jede Felix-Antwort leer und der Deckel zaehlte nichts.
-- 2) EXECUTE nicht ueber PUBLIC (REVOKE FROM anon allein laesst den PUBLIC-Grant stehen).
INSERT INTO public.llm_model_pricing (model, input_usd_per_1m, output_usd_per_1m, verified, note) VALUES
  ('claude-opus-5-5',   4.0000, 20.0000, true, 'Anthropic-Preisliste, Stand 06.10.2026.'),
  ('claude-sonnet-5-5', 2.0000, 10.0000, true, 'Anthropic-Preisliste, Stand 06.10.2026.'),
  ('claude-haiku-5-5',  0.1000,  0.5000, true, 'Anthropic-Preisliste, Stand 06.10.2026 (Eingabe bis 100K Tokens).')
ON CONFLICT (model) DO NOTHING;

REVOKE EXECUTE ON FUNCTION public.get_my_token_budget() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_token_budget_overview(numeric) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_token_budget() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_token_budget_overview(numeric) TO authenticated, service_role;
