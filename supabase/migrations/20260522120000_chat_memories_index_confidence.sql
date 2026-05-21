-- loadMemories() sortiert nach (confidence DESC, last_used_at DESC NULLS LAST),
-- der bisherige Index deckt nur last_used_at ab → Sequential-Scan bei jedem Chat.
-- Composite-Index passend zur Query.

CREATE INDEX IF NOT EXISTS chat_memories_user_confidence_idx
  ON public.chat_memories (user_id, confidence DESC, last_used_at DESC NULLS LAST);
