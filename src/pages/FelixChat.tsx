import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Trash2, Loader2, Plus, Search, MessageSquare, MoreHorizontal, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };
type Conv = { id: string; title: string; last_message_at: string };

const SUGGESTIONS = [
  "Soll ich UG oder GmbH gründen bei 80k € Gewinn?",
  "Wie funktioniert der § 8b KStG bei Holdings?",
  "Was muss ich für Amazon FBA in DE anmelden?",
  "Lohnt sich eine US-LLC für mein SaaS?",
];

const FelixChat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conv[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load conversations
  const loadConversations = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("chat_conversations")
      .select("id, title, last_message_at")
      .eq("user_id", user.id)
      .order("last_message_at", { ascending: false });
    if (data) setConversations(data as Conv[]);
  };

  useEffect(() => {
    loadConversations();
  }, [user]);

  // Load messages of active conversation
  useEffect(() => {
    if (!user || !activeId) {
      setMessages([]);
      return;
    }
    setLoadingMsgs(true);
    supabase
      .from("chat_messages")
      .select("role, content")
      .eq("user_id", user.id)
      .eq("conversation_id", activeId)
      .order("created_at")
      .then(({ data }) => {
        setMessages((data as Msg[]) ?? []);
        setLoadingMsgs(false);
      });
  }, [user, activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const newChat = () => {
    setActiveId(null);
    setMessages([]);
    setInput("");
  };

  const send = async () => {
    if (!input.trim() || !user || streaming) return;
    const text = input.trim();
    const userMsg: Msg = { role: "user", content: text };
    setInput("");
    setStreaming(true);

    // Ensure conversation exists
    let convId = activeId;
    if (!convId) {
      const title = text.slice(0, 60) + (text.length > 60 ? "…" : "");
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ user_id: user.id, title, last_message_at: new Date().toISOString() })
        .select("id, title, last_message_at")
        .single();
      if (error || !data) {
        toast.error("Konnte Chat nicht erstellen");
        setStreaming(false);
        return;
      }
      convId = data.id;
      setActiveId(convId);
      setConversations((p) => [data as Conv, ...p]);
    }

    setMessages((p) => [...p, userMsg]);
    await supabase.from("chat_messages").insert({
      user_id: user.id,
      role: "user",
      content: userMsg.content,
      conversation_id: convId,
    });

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-felix`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 429) toast.error("Felix ist gerade überlastet. Gleich nochmal.");
        else if (resp.status === 402) toast.error("AI-Kontingent leer – Workspace-Credits aufladen.");
        else toast.error(err.error || "Fehler beim Chat");
        setStreaming(false);
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }

      if (assistantSoFar && convId) {
        await supabase.from("chat_messages").insert({
          user_id: user.id,
          role: "assistant",
          content: assistantSoFar,
          conversation_id: convId,
        });
        await supabase
          .from("chat_conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", convId);
        setConversations((p) =>
          [...p]
            .map((c) => (c.id === convId ? { ...c, last_message_at: new Date().toISOString() } : c))
            .sort((a, b) => +new Date(b.last_message_at) - +new Date(a.last_message_at))
        );
      }
    } catch (e) {
      console.error(e);
      toast.error("Verbindung zu Felix fehlgeschlagen");
    } finally {
      setStreaming(false);
    }
  };

  const deleteConv = async (id: string) => {
    if (!user) return;
    await supabase.from("chat_messages").delete().eq("user_id", user.id).eq("conversation_id", id);
    await supabase.from("chat_conversations").delete().eq("id", id);
    setConversations((p) => p.filter((c) => c.id !== id));
    if (activeId === id) newChat();
    toast.success("Chat gelöscht");
  };

  const renameConv = async (id: string) => {
    const current = conversations.find((c) => c.id === id);
    const next = window.prompt("Chat umbenennen", current?.title ?? "");
    if (!next || !next.trim()) return;
    await supabase.from("chat_conversations").update({ title: next.trim() }).eq("id", id);
    setConversations((p) => p.map((c) => (c.id === id ? { ...c, title: next.trim() } : c)));
  };

  // Search across conversation titles AND message contents
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
      const ids = new Set<string>((data ?? []).map((r: any) => r.conversation_id).filter(Boolean));
      setMatchingIds(ids);
    }, 200);
    return () => clearTimeout(handle);
  }, [search, user]);

  const filteredConvs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) => c.title.toLowerCase().includes(q) || (matchingIds && matchingIds.has(c.id))
    );
  }, [conversations, search, matchingIds]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const sameDay = d.toDateString() === today.toDateString();
    if (sameDay) return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
  };

  return (
    <CockpitShell
      eyebrow="🤖 Felix"
      title="Dein KI-Co-Founder"
      subtitle="Frag Felix alles zu Gründung, Steuern, Compliance, Marketplaces. Keine Steuer-/Rechtsberatung."
    >
      <div className="rounded-2xl border border-border bg-card flex h-[calc(100vh-260px)] min-h-[560px] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 shrink-0 border-r border-border flex-col bg-muted/30">
          <div className="p-3 border-b border-border space-y-2">
            <Button onClick={newChat} className="w-full justify-start gap-2" variant="default" size="sm">
              <Plus className="h-4 w-4" /> Neuer Chat
            </Button>
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Chats durchsuchen..."
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConvs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8 px-2">
                {search ? "Keine Treffer." : "Noch keine Chats. Starte einen!"}
              </p>
            ) : (
              <ul className="space-y-0.5">
                {filteredConvs.map((c) => (
                  <li key={c.id}>
                    <div
                      className={cn(
                        "group flex items-center gap-2 rounded-lg px-2 py-2 text-sm cursor-pointer transition-colors",
                        activeId === c.id ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                      )}
                      onClick={() => setActiveId(c.id)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm leading-tight">{c.title}</p>
                        <p className="text-[10px] text-muted-foreground">{formatDate(c.last_message_at)}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-background transition-opacity">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => renameConv(c.id)}>
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
        </aside>

        {/* Main chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile: new chat bar */}
          <div className="md:hidden flex items-center gap-2 p-2 border-b border-border">
            <Button onClick={newChat} size="sm" variant="outline" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Neu
            </Button>
            <div className="relative flex-1">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suche..."
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
            {loadingMsgs ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <Sparkles className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-1">Hi, ich bin Felix.</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md">
                  Ich helfe dir bei Rechtsform, Steuern, Compliance & Marketplaces. Stell deine Frage oder probier:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 max-w-2xl w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="rounded-xl border border-border bg-card hover:border-accent-blue/50 hover:bg-accent text-sm text-left p-3 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {m.role === "user" ? (
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-accent-blue prose-li:my-0">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {streaming && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl px-4 py-2.5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Felix denkt nach...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-border p-3 md:p-4">
            <div className="flex gap-2 items-end max-w-3xl mx-auto">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Frag Felix..."
                rows={1}
                className="resize-none min-h-[44px] max-h-32"
              />
              <Button onClick={send} disabled={!input.trim() || streaming} size="icon" className="h-11 w-11 shrink-0">
                {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Enter sendet · Shift+Enter neue Zeile · Felix kann Fehler machen, prüfe wichtige Infos.
            </p>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default FelixChat;
