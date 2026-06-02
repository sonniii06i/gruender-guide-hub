-- chat-felix nutzt jetzt den eigenen Google-Gemini-Key direkt (statt Lovable Gateway).
-- Provider-Label im Tracing-Log wechselt von 'lovable-gemini' auf 'gemini'.
-- Alter Wert bleibt erlaubt, damit historische chat_logs-Zeilen gültig bleiben.

ALTER TABLE chat_logs DROP CONSTRAINT IF EXISTS chat_logs_provider_check;

ALTER TABLE chat_logs ADD CONSTRAINT chat_logs_provider_check
  CHECK (provider IN ('gemini', 'lovable-gemini', 'anthropic-claude', 'openai-gpt', 'rejected-input', 'rejected-output'));
