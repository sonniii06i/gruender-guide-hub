import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Plus, Search, MessageSquare, MoreHorizontal, Pencil, Trash2, ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";

export function FelixChatsGroup() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();
  const { conversations } = useFelixConversations();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const activeId = pathname === "/felix" ? params.get("c") : null;
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
    if (sameDay) return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "Gestern";
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
  };

  const newChat = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    navigate("/felix?new=1");
  };

  const openChat = (id: string) => navigate(`/felix?c=${id}`);

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
    if (activeId === id) navigate("/felix?new=1");
    toast.success("Chat gelöscht");
  };

  if (collapsed) return null;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="py-0">
        <SidebarGroupLabel asChild>
          <div className="flex w-full items-center gap-2">
            <CollapsibleTrigger className="flex flex-1 items-center gap-2 hover:text-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="flex-1 text-left truncate">Felix-Chat</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <button
              onClick={newChat}
              title="Neuer Chat"
              className="p-1 rounded hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Chats durchsuchen..."
                  className="pl-7 h-7 text-xs bg-sidebar-accent/40 border-sidebar-border"
                />
              </div>
            </div>
            <div className="max-h-[40vh] overflow-y-auto px-1 pb-2">
              {filtered.length === 0 ? (
                <p className="text-[11px] text-muted-foreground text-center py-4 px-2">
                  {search ? "Keine Treffer." : "Noch keine Chats."}
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {filtered.map((c) => (
                    <li key={c.id}>
                      <div
                        onClick={() => openChat(c.id)}
                        className={cn(
                          "group/item flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs cursor-pointer transition-colors",
                          activeId === c.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="truncate leading-tight">{c.title}</p>
                          <p className="text-[9px] text-muted-foreground">{formatDate(c.last_message_at)}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <button className="opacity-0 group-hover/item:opacity-100 p-0.5 rounded hover:bg-background transition-opacity">
                              <MoreHorizontal className="h-3 w-3" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => renameConv(c.id, c.title)}>
                              <Pencil className="h-3.5 w-3.5 mr-2" /> Umbenennen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteConv(c.id)} className="text-destructive">
                              <Trash2 className="h-3.5 w-3.5 mr-2" /> Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
