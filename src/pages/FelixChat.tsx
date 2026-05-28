import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { notifyConversationsChanged } from "@/hooks/useFelixConversations";
import { readProfileCache } from "@/lib/profileCache";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Soll ich UG oder GmbH gründen bei 80k € Gewinn?",
  "Wie funktioniert der § 8b KStG bei Holdings?",
  "Was muss ich für Amazon FBA in DE anmelden?",
  "Lohnt sich eine US-LLC für mein SaaS?",
];

// Links in Felix-Antworten: PDFs/Dateien + externe URLs in neuem Tab öffnen
// (sonst geht der Chat verloren / PDF lädt nicht), interne App-Routen per
// React-Router-Link (kein Full-Page-Reload).
const mdComponents: Components = {
  a: ({ href, children }) => {
    const url = href ?? "";
    if (!url) return <>{children}</>;
    const isFile = url.startsWith("/forms/") || url.endsWith(".pdf");
    const isExternal = /^https?:\/\//i.test(url);
    // Datei (PDF) → direkt herunterladen, neuer Tab als Fallback
    if (isFile) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" download>
          {children}
        </a>
      );
    }
    if (isExternal) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link to={url}>{children}</Link>;
  },
};

const FelixChat = () => {
  const { user, session } = useAuth();
  const [params, setParams] = useSearchParams();
  const convId = params.get("c");
  const isNew = params.get("new");

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(
    () => readProfileCache(user?.id)?.first_name ?? null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  // Welche Conversation steckt aktuell lokal in `messages`? Verhindert, dass der
  // Load-Effekt die Nachrichten überschreibt, wenn wir die Conversation gerade
  // selbst per send() erstellt haben (sonst „verschluckt" er die erste Nachricht).
  const loadedConvRef = useRef<string | null>(null);

  // Vorname für die Begrüßung (Cache zuerst, sonst aus profiles nachladen)
  useEffect(() => {
    if (!user) return;
    const cached = readProfileCache(user.id)?.first_name;
    if (cached) {
      setFirstName(cached);
      return;
    }
    supabase
      .from("profiles")
      .select("first_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.first_name) setFirstName(data.first_name);
      });
  }, [user]);

  // Handle ?new=1: clear and remove the param
  useEffect(() => {
    if (isNew) {
      setMessages([]);
      setInput("");
      setParams({}, { replace: true });
    }
  }, [isNew, setParams]);

  // Load messages of selected conversation
  useEffect(() => {
    if (!user || !convId) {
      if (!convId) {
        setMessages([]);
        loadedConvRef.current = null;
      }
      return;
    }
    // Bereits geladen / gerade selbst bespielt (z.B. neu erstellt während send) → kein Reload,
    // sonst überschreibt das DB-Ergebnis die lokale (noch ungespeicherte) Nachricht.
    if (loadedConvRef.current === convId) return;
    setLoading(true);
    supabase
      .from("chat_messages")
      .select("role, content")
      .eq("user_id", user.id)
      .eq("conversation_id", convId)
      .order("created_at")
      .then(({ data }) => {
        setMessages((data as Msg[]) ?? []);
        loadedConvRef.current = convId;
        setLoading(false);
      });
  }, [user, convId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async () => {
    if (!input.trim() || !user || streaming) return;
    const text = input.trim();
    const userMsg: Msg = { role: "user", content: text };
    setInput("");
    setStreaming(true);

    let activeConvId = convId;
    if (!activeConvId) {
      const title = text.slice(0, 60) + (text.length > 60 ? "…" : "");
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ user_id: user.id, title, last_message_at: new Date().toISOString() })
        .select("id")
        .single();
      if (error || !data) {
        toast.error("Konnte Chat nicht erstellen");
        setStreaming(false);
        return;
      }
      activeConvId = data.id;
      // VOR setParams als „lokal bespielt" markieren → der durch den convId-Wechsel
      // ausgelöste Load-Effekt überspringt dann den Reload (kein Verschlucken).
      loadedConvRef.current = activeConvId;
      setParams({ c: activeConvId }, { replace: true });
      notifyConversationsChanged();
    }

    setMessages((p) => [...p, userMsg]);
    await supabase.from("chat_messages").insert({
      user_id: user.id,
      role: "user",
      content: userMsg.content,
      conversation_id: activeConvId,
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
          // User-JWT wenn eingeloggt → Edge-Function kann Memory laden/speichern.
          // Fallback auf Anon-Key für non-logged-in (Memory wird dann übersprungen).
          Authorization: `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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

      if (assistantSoFar && activeConvId) {
        await supabase.from("chat_messages").insert({
          user_id: user.id,
          role: "assistant",
          content: assistantSoFar,
          conversation_id: activeConvId,
        });
        await supabase
          .from("chat_conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", activeConvId);
        notifyConversationsChanged();
      }
    } catch (e) {
      console.error(e);
      toast.error("Verbindung zu Felix fehlgeschlagen");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        {loading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="mb-5">
              <Logo asImage className="h-14 w-14" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {firstName ? `Willkommen zurück, ${firstName}` : "Willkommen zurück"}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md">
              Wobei kann ich dir heute helfen?
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
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-4">
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
                      <ReactMarkdown components={mdComponents}>{m.content}</ReactMarkdown>
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

      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex gap-2 items-end">
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
            Keine Steuer-/Rechtsberatung — bei verbindlicher Auslegung{" "}
            <Link to="/cockpit/stb-finder" className="underline hover:text-foreground">
              StB-Finder
            </Link>{" "}
            konsultieren.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FelixChat;
