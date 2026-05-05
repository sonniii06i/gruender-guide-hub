import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, MessageSquare, MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useFelixConversations, notifyConversationsChanged } from "@/hooks/useFelixConversations";
import { toast } from "sonner";

export default function FelixChatsOverview() {
  const { user } = useAuth();
  const { conversations, loading } = useFelixConversations();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [matchingIds, setMatchingIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (!user || !search.trim()) {
      setMatchingIds(null);
      return;
    }
    const q = search.trim();
    const handle = setTimeout(async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("conversation_id")
        .eq("user_id", user.id)
        .ilike("content", `%${q}%`)
        .not("conversation_id", "is", null)
        .limit(500);
      setMatchingIds(new Set<string>((data ?? []).map((r: any) => r.conversation_id).filter(Boolean)));
    }, 200);
    return () => clearTimeout(handle);
  }, [search, user]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) => c.title.toLowerCase().includes(q) || (matchingIds && matchingIds.has(c.id))
    );
  }, [conversations, search, matchingIds]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) return "Heute, " + d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "Gestern";
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" });
  };

  const renameConv = async (id: string, currentTitle: string) => {
    const next = window.prompt("Chat umbenennen", currentTitle);
    if (!next || !next.trim()) return;
    await supabase.from("chat_conversations").update({ title: next.trim() }).eq("id", id);
    notifyConversationsChanged();
  };

  const deleteConv = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Diesen Chat wirklich löschen?")) return;
    await supabase.from("chat_messages").delete().eq("user_id", user.id).eq("conversation_id", id);
    await supabase.from("chat_conversations").delete().eq("id", id);
    notifyConversationsChanged();
    toast.success("Chat gelöscht");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Deine Chats</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Alle Gespräche mit Felix – durchsuchbar und jederzeit fortsetzbar.
          </p>
        </div>
        <Button onClick={() => navigate("/felix?new=1")} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Neuer Chat
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Chats durchsuchen (Titel und Inhalt)..."
          className="pl-9 h-11"
        />
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">{search ? "Keine Treffer." : "Noch keine Chats. Starte einen neuen!"}</p>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {filtered.map((c) => (
            <li key={c.id} className="group flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors">
              <button
                onClick={() => navigate(`/felix?c=${c.id}`)}
                className="flex-1 min-w-0 text-left"
              >
                <p className="font-medium truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(c.last_message_at)}</p>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 p-2 rounded hover:bg-background transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => renameConv(c.id, c.title)}>
                    <Pencil className="h-3.5 w-3.5 mr-2" /> Umbenennen
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteConv(c.id)} className="text-destructive">
                    <Trash2 className="h-3.5 w-3.5 mr-2" /> Löschen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
