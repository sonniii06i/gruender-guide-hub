import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const CATEGORY_COLORS: Record<string, string> = {
  business: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  tax: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  brand: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  goal: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  preference: "bg-pink-500/10 text-pink-700 border-pink-500/20",
  tooling: "bg-slate-500/10 text-slate-700 border-slate-500/20",
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
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-card p-5">
        <div className="flex items-start gap-3">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent-blue/15 shrink-0">
            <Brain className="h-5 w-5 text-accent-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base mb-1">Was Felix über dich weiß</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Felix extrahiert nach jedem Chat relevante Fakten und nutzt sie für zukünftige
              Antworten. Du kannst jederzeit einzelne Memories löschen — Felix vergisst sie dann.
              {memories.length > 0 && (
                <>
                  {" "}<strong className="text-foreground">{memories.length} Memories gespeichert.</strong>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {memories.length === 0
            ? "Noch keine Memories — chatte mit Felix, dann lernt er dich kennen."
            : `${memories.length} Fakten gespeichert`}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          {memories.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={deleteAll}
              className="text-red-700 hover:bg-red-500/10 border-red-500/30"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Alle löschen
            </Button>
          )}
        </div>
      </div>

      {memories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          <Info className="h-8 w-8 mx-auto mb-3 opacity-40" />
          Felix lernt automatisch beim Chatten — keine manuelle Eingabe nötig.
        </div>
      ) : (
        <div className="space-y-2">
          {memories.map((m) => {
            const cat = m.category || "allgemein";
            return (
              <div
                key={m.id}
                className="rounded-xl border border-border bg-card p-3 flex items-start gap-3 group hover:border-accent-blue/40 transition-colors"
              >
                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${
                    CATEGORY_COLORS[cat] || CATEGORY_COLORS.tooling
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </Badge>
                <div className="flex-1 text-sm">
                  {m.fact}
                  <div className="text-[10px] text-muted-foreground mt-1 flex gap-3">
                    <span>Confidence: {Math.round(m.confidence * 100)}%</span>
                    <span>Erstellt: {new Date(m.created_at).toLocaleDateString("de-DE")}</span>
                    {m.last_used_at && (
                      <span>Zuletzt genutzt: {new Date(m.last_used_at).toLocaleDateString("de-DE")}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteMemory(m.id)}
                  disabled={deleting === m.id}
                  className="opacity-0 group-hover:opacity-100 text-red-700 hover:bg-red-500/10 p-1.5 rounded transition-opacity"
                  title="Memory löschen"
                >
                  {deleting === m.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
