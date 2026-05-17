-- Felix-Chat Aufrüstung Step 1+2
-- Inspiration: NirDiamant/agents-towards-production (Llamafirewall + Mem0 + LangSmith-Patterns)
--
-- Step 1 (live): chat_logs — Tracing für alle Chats (Input, Output, Provider, Latency, Guards-Trigger)
-- Step 2 (vorbereitet, noch nicht live): chat_memories — persistente User-Facts zwischen Sessions

-- ==================== CHAT_LOGS (Tracing) ====================
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  conversation_id UUID,
  user_message TEXT NOT NULL,
  assistant_message TEXT,
  provider TEXT NOT NULL CHECK (provider IN ('lovable-gemini', 'anthropic-claude', 'rejected-input', 'rejected-output')),
  model TEXT,
  input_guard_triggered TEXT, -- z.B. "prompt-injection", "jailbreak", null wenn ok
  output_guard_triggered TEXT,
  latency_ms INT,
  prompt_tokens INT,
  completion_tokens INT,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_logs_user_idx ON public.chat_logs (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS chat_logs_conv_idx ON public.chat_logs (conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS chat_logs_guards_idx ON public.chat_logs (input_guard_triggered) WHERE input_guard_triggered IS NOT NULL;

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Nur Admins sehen die Logs (für Quality-Monitoring + Debugging)
DROP POLICY IF EXISTS "admins_see_chat_logs" ON public.chat_logs;
CREATE POLICY "admins_see_chat_logs"
  ON public.chat_logs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Service-Role (Edge-Function) darf schreiben (kein Policy nötig, Service-Role umgeht RLS)

-- ==================== CHAT_MEMORIES (Step 2: noch nicht live) ====================
CREATE TABLE IF NOT EXISTS public.chat_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fact TEXT NOT NULL,
  category TEXT, -- z.B. 'business', 'tax-setup', 'preference', 'goal'
  source_message_id UUID, -- optional FK zu chat_messages
  confidence REAL DEFAULT 0.7,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_memories_user_idx ON public.chat_memories (user_id, last_used_at DESC NULLS LAST);

ALTER TABLE public.chat_memories ENABLE ROW LEVEL SECURITY;

-- User darf eigene Memories sehen + löschen
DROP POLICY IF EXISTS "users_see_own_memories" ON public.chat_memories;
CREATE POLICY "users_see_own_memories"
  ON public.chat_memories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_delete_own_memories" ON public.chat_memories;
CREATE POLICY "users_delete_own_memories"
  ON public.chat_memories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
