import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Trash2, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const FelixChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("chat_messages").select("role, content").eq("user_id", user.id).order("created_at")
      .then(({ data }) => { if (data) setMessages(data as Msg[]); });
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async () => {
    if (!input.trim() || !user || streaming) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setStreaming(true);
    await supabase.from("chat_messages").insert({ user_id: user.id, role: "user", content: userMsg.content });

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
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
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch { buf = line + "\n" + buf; break; }
        }
      }

      if (assistantSoFar) {
        await supabase.from("chat_messages").insert({ user_id: user.id, role: "assistant", content: assistantSoFar });
      }
    } catch (e) {
      console.error(e);
      toast.error("Verbindung zu Felix fehlgeschlagen");
    } finally {
      setStreaming(false);
    }
  };

  const clear = async () => {
    if (!user) return;
    await supabase.from("chat_messages").delete().eq("user_id", user.id);
    setMessages([]);
    toast.success("Chat geleert");
  };

  const SUGGESTIONS = [
    "Soll ich UG oder GmbH gründen bei 80k € Gewinn?",
    "Wie funktioniert der § 8b KStG bei Holdings?",
    "Was muss ich für Amazon FBA in DE anmelden?",
    "Lohnt sich eine US-LLC für mein SaaS?",
  ];

  return (
    <CockpitShell
      eyebrow="🤖 Felix"
      title="Dein KI-Co-Founder"
      subtitle="Frag Felix alles zu Gründung, Steuern, Compliance, Marketplaces. Keine Steuer-/Rechtsberatung."
    >
      <div className="rounded-2xl border border-border bg-card flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 ? (
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
                  <button key={s} onClick={() => setInput(s)}
                    className="rounded-xl border border-border bg-card hover:border-accent-blue/50 hover:bg-accent text-sm text-left p-3 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}>
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
          <div className="flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Frag Felix..."
              rows={1}
              className="resize-none min-h-[44px] max-h-32"
            />
            <Button onClick={send} disabled={!input.trim() || streaming} size="icon" className="h-11 w-11 shrink-0">
              {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
            {messages.length > 0 && (
              <Button onClick={clear} variant="ghost" size="icon" className="h-11 w-11 shrink-0" title="Chat leeren">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">Enter sendet · Shift+Enter neue Zeile · Felix kann Fehler machen, prüfe wichtige Infos.</p>
        </div>
      </div>
    </CockpitShell>
  );
};

export default FelixChat;
