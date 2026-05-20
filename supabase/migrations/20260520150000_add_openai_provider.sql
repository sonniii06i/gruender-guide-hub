-- Erlaubt 'openai-gpt' als Provider in chat_logs
-- (zusätzlicher Fallback in chat-felix Edge-Function)

ALTER TABLE chat_logs DROP CONSTRAINT IF EXISTS chat_logs_provider_check;

ALTER TABLE chat_logs ADD CONSTRAINT chat_logs_provider_check
  CHECK (provider IN ('lovable-gemini', 'anthropic-claude', 'openai-gpt', 'rejected-input', 'rejected-output'));
