-- GründerX RAG Layer — Felix-Chat Wissensbasis
-- Inspiration: AnwaltX-Pattern (anwaltx_chunks + match_anwaltx_chunks)
--
-- Quellen-Content liegt aktuell statisch in src/data/*.ts (~23.700 LOC).
-- Diese Tabelle hält dieselben Items als embeddable Chunks, damit chat-felix
-- pro User-Message top-K Chunks per cosine-similarity ziehen kann.

-- ==================== Extension ====================
CREATE EXTENSION IF NOT EXISTS vector;

-- ==================== KB_CHUNKS Tabelle ====================
CREATE TABLE IF NOT EXISTS public.kb_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Welche src/data/-Datei kam der Chunk her
  -- z.B. 'playbook', 'stb', 'labor', 'foerderprogramm', 'visa', 'holding',
  --      'ip_box', 'us_credit_card', 'versicherung', 'ecom_category',
  --      'eu_alternative', 'wz2008', 'tool', 'real_structure_example',
  --      'stb_gruppe', 'roadmap_task'
  source TEXT NOT NULL,

  -- Slug/ID innerhalb der Quelle (z.B. Playbook-Slug, StB-Name-Slug)
  source_id TEXT NOT NULL,

  -- Human-readable Titel (für Citation in Felix-Antworten)
  title TEXT NOT NULL,

  -- Eigentlicher Embeddable-Content (Markdown-ähnlich, ~200-2000 Tokens)
  content TEXT NOT NULL,

  -- Metadata: Route, Kategorie, Tags, alles was beim Retrieval helfen kann
  -- z.B. { "route": "/cockpit/holding-designer", "category": "steuer", "tags": [...] }
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- OpenAI text-embedding-3-small → 1536 Dimensionen
  embedding vector(1536),

  -- SHA-256 des Content — für inkrementelles Re-Embedding (skip wenn unverändert)
  content_hash TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Ein Chunk pro (source, source_id) — upsert-fähig
  UNIQUE (source, source_id)
);

-- ==================== Indices ====================

-- IVFFlat für approximate cosine-similarity (lists=100 ist gut bei <10k Rows;
-- bei mehr Daten später auf hnsw upgraden)
CREATE INDEX IF NOT EXISTS kb_chunks_embedding_idx
  ON public.kb_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS kb_chunks_source_idx ON public.kb_chunks (source);
CREATE INDEX IF NOT EXISTS kb_chunks_metadata_gin_idx ON public.kb_chunks USING gin (metadata);

-- ==================== Trigger: updated_at ====================
CREATE OR REPLACE FUNCTION public.kb_chunks_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS kb_chunks_updated_at ON public.kb_chunks;
CREATE TRIGGER kb_chunks_updated_at
  BEFORE UPDATE ON public.kb_chunks
  FOR EACH ROW
  EXECUTE FUNCTION public.kb_chunks_set_updated_at();

-- ==================== RLS ====================
ALTER TABLE public.kb_chunks ENABLE ROW LEVEL SECURITY;

-- KB-Content ist nicht geheim (kommt aus dem Frontend-Bundle) —
-- jeder eingeloggte User darf lesen
DROP POLICY IF EXISTS "authenticated_read_kb_chunks" ON public.kb_chunks;
CREATE POLICY "authenticated_read_kb_chunks"
  ON public.kb_chunks
  FOR SELECT
  TO authenticated
  USING (true);

-- Anon-User auch (Felix-Chat kann ohne Login genutzt werden)
DROP POLICY IF EXISTS "anon_read_kb_chunks" ON public.kb_chunks;
CREATE POLICY "anon_read_kb_chunks"
  ON public.kb_chunks
  FOR SELECT
  TO anon
  USING (true);

-- Schreiben nur via Service-Role (Embedding-Skript) — RLS bypassed automatisch

-- ==================== RPC: match_kb_chunks ====================
-- Cosine-similarity Top-K Retrieval mit optionalem Source-Filter
CREATE OR REPLACE FUNCTION public.match_kb_chunks(
  query_embedding vector(1536),
  match_count INT DEFAULT 5,
  match_threshold FLOAT DEFAULT 0.0,
  source_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  source TEXT,
  source_id TEXT,
  title TEXT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.source,
    kc.source_id,
    kc.title,
    kc.content,
    kc.metadata,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM public.kb_chunks kc
  WHERE kc.embedding IS NOT NULL
    AND (source_filter IS NULL OR kc.source = source_filter)
    AND 1 - (kc.embedding <=> query_embedding) >= match_threshold
  ORDER BY kc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RPC darf von authenticated + anon (Felix-Chat) aufgerufen werden
GRANT EXECUTE ON FUNCTION public.match_kb_chunks(vector, INT, FLOAT, TEXT) TO authenticated, anon;
