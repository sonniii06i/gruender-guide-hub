import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { EmptyState, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { Brain, Trash2, Loader2, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";

interface MemoryRow {
  id: string;
  fact: string;
  category: string | null;
  confidence: number;
  last_used_at: string | null;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  business: "Business",
  tax: "Steuern",
  brand: "Brand",
  goal: "Ziele",
  preference: "Präferenzen",
  tooling: "Tools",
  allgemein: "Allgemein",
};

const CATEGORY_TONE: Record<string, Tone> = {
  business: "accent",
  tax: "success",
  brand: "info",
  goal: "warning",
  preference: "info",
  tooling: "neutral",
};

export const FelixMemoryPanel = () => {
  const { user } = useAuth();
  const [memories, setMemories] = useState<MemoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_memories" as any)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error(`Memory laden: ${error.message}`);
      return;
    }
    setMemories((data ?? []) as unknown as MemoryRow[]);
  };

  useEffect(() => {
    load();
  }, [user]);

  const deleteMemory = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from("chat_memories" as any).delete().eq("id", id);
    setDeleting(null);
    if (error) {
      toast.error(`Löschen fehlgeschlagen: ${error.message}`);
      return;
    }
    setMemories((prev) => prev.filter((m) => m.id !== id));
    toast.success("Memory gelöscht");
  };

  const deleteAll = async () => {
    if (!user) return;
    if (!confirm(`Wirklich ALLE ${memories.length} Memories löschen? Felix vergisst dann alles über dich.`)) return;
    const { error } = await supabase.from("chat_memories" as any).delete().eq("user_id", user.id);
    if (error) {
      toast.error(`Löschen fehlgeschlagen: ${error.message}`);
      return;
    }
    setMemories([]);
    toast.success("Alle Memories gelöscht");
  };

  if (loading) {
    return (
      <div className="space-y-3" aria-busy="true">
        <div className="h-24 animate-pulse rounded-2xl bg-secondary/60" />
        {[0, 1, 2].map((k) => (
          <div key={k} className="h-16 animate-pulse rounded-xl bg-secondary/40" />
        ))}
        <p className="sr-only">Memories werden geladen …</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ToolSection
        title="Was Felix über dich weiß"
        icon={Brain}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> Aktualisieren
            </Button>
            {memories.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={deleteAll}
                className="border-danger/30 text-danger hover:bg-danger-soft hover:text-danger"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Alle löschen
              </Button>
            )}
          </>
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Felix extrahiert nach jedem Chat relevante Fakten und nutzt sie für künftige Antworten. Du kannst einzelne
          Memories jederzeit löschen, Felix vergisst sie dann.
          {memories.length > 0 && (
            <>
              {" "}<strong className="font-semibold text-foreground tabular">{memories.length} Fakten gespeichert.</strong>
            </>
          )}
        </p>
      </ToolSection>

      {memories.length === 0 ? (
        <EmptyState
          icon={Info}
          title="Noch keine Memories"
          description="Felix lernt automatisch beim Chatten, du musst nichts eintragen."
        />
      ) : (
        <ul className="space-y-2">
          {memories.map((m) => {
            const cat = m.category || "allgemein";
            return (
              <li
                key={m.id}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent-blue/40"
              >
                <ToneBadge tone={CATEGORY_TONE[cat] ?? "neutral"} className="mt-0.5 shrink-0">
                  {CATEGORY_LABELS[cat] || cat}
                </ToneBadge>
                <div className="min-w-0 flex-1 text-sm">
                  {m.fact}
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground tabular">
                    <span>Sicherheit: {Math.round(m.confidence * 100)} %</span>
                    <span>Erstellt: {new Date(m.created_at).toLocaleDateString("de-DE")}</span>
                    {m.last_used_at && (
                      <span>Zuletzt genutzt: {new Date(m.last_used_at).toLocaleDateString("de-DE")}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMemory(m.id)}
                  disabled={deleting === m.id}
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-danger-soft hover:text-danger sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                  title="Memory löschen"
                  aria-label="Memory löschen"
                >
                  {deleting === m.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
