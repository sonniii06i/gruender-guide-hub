import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/cockpit/kit";
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
    // % und _ sind ILIKE-Platzhalter → escapen, damit nach dem Zeichen selbst gesucht wird
    const q = search.trim().replace(/[\\%_]/g, (c) => `\\${c}`);
    let abgebrochen = false;
    const handle = setTimeout(async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("conversation_id")
        .eq("user_id", user.id)
        .ilike("content", `%${q}%`)
        .not("conversation_id", "is", null)
        .limit(500);
      // Ältere Antworten dürfen eine neuere Suche nicht überschreiben
      if (abgebrochen) return;
      setMatchingIds(new Set<string>((data ?? []).map((r: any) => r.conversation_id).filter(Boolean)));
    }, 200);
    return () => {
      abgebrochen = true;
      clearTimeout(handle);
    };
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
    const { error } = await supabase.from("chat_conversations").update({ title: next.trim() }).eq("id", id);
    if (error) {
      toast.error("Umbenennen fehlgeschlagen. Bitte erneut versuchen.");
      return;
    }
    notifyConversationsChanged();
  };

  const deleteConv = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Diesen Chat wirklich löschen?")) return;
    // Erst die Konversation löschen: scheitert das (RLS, Netz), ist noch nichts verloren.
    const { error: convError } = await supabase.from("chat_conversations").delete().eq("id", id);
    if (convError) {
      toast.error("Chat konnte nicht gelöscht werden. Bitte erneut versuchen.");
      return;
    }
    const { error: msgError } = await supabase.from("chat_messages").delete().eq("user_id", user.id).eq("conversation_id", id);
    notifyConversationsChanged();
    if (msgError) {
      toast.error("Chat entfernt, aber die Nachrichten konnten nicht vollständig gelöscht werden. Bitte später erneut versuchen.");
      return;
    }
    toast.success("Chat gelöscht");
  };

  return (
    <div className="container max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pt-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-7">
        <div>
          <p className="text-sm font-medium text-accent-blue">Felix</p>
          <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] md:text-[2.25rem]">Deine Chats</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Alle Gespräche mit Felix, durchsuchbar und jederzeit fortsetzbar.
          </p>
        </div>
        <Button onClick={() => navigate("/felix?new=1")} className="gap-1.5">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Neuer Chat
        </Button>
      </header>

      <div className="relative mb-6">
        <label htmlFor="chats-suche" className="sr-only">Chats durchsuchen</label>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="chats-suche"
          type="search"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Chats durchsuchen (Titel und Inhalt)…"
          className="h-11 pl-9"
        />
      </div>

      {loading ? (
        <ul className="divide-y divide-border/70 rounded-2xl border border-border bg-card" aria-busy="true">
          <li className="sr-only">Chats werden geladen…</li>
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="space-y-2 px-5 py-4">
              <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
            </li>
          ))}
        </ul>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={search ? "Keine Treffer" : "Noch keine Chats"}
          description={search ? "Kein Chat enthält diesen Begriff im Titel oder Text." : "Stell Felix deine erste Frage, zum Beispiel zur Rechtsform oder zur Umsatzsteuer."}
          action={!search && (
            <Button onClick={() => navigate("/felix?new=1")} className="gap-1.5">
              <Plus className="h-4 w-4" aria-hidden="true" /> Neuer Chat
            </Button>
          )}
        />
      ) : (
        <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          {filtered.map((c) => (
            <li key={c.id} className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40">
              <button
                onClick={() => navigate(`/felix?c=${c.id}`)}
                className="flex-1 min-w-0 text-left"
              >
                <p className="truncate font-medium">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground tabular">{formatDate(c.last_message_at)}</p>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label={`Aktionen für ${c.title}`} className="rounded-lg p-2 text-muted-foreground transition-[opacity,background-color] hover:bg-secondary hover:text-foreground focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
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
