import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TokenBudgetNotice } from "@/components/TokenBudgetNotice";
import { Send, Loader2, FileText, Download, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { toast } from "sonner";
import { notifyConversationsChanged } from "@/hooks/useFelixConversations";
import { readProfileCache } from "@/lib/profileCache";
import { markValueEvent } from "@/utils/valueEvent";
import { ReferralNudge } from "@/components/ReferralNudge";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Soll ich UG oder GmbH gründen bei 80k € Gewinn?",
  "Wie funktioniert der § 8b KStG bei Holdings?",
  "Was muss ich für Amazon FBA in DE anmelden?",
  "Lohnt sich eine US-LLC für mein SaaS?",
];

// PDF-Links aus einer Felix-Antwort ziehen → unten als Datei-Anhang-Karte rendern,
// damit die PDF sichtbar "mit übergeben" wird statt nur als Text-Link.
const PDF_URL_RE = /(https?:\/\/[^\s)]+\.pdf|\/[^\s)]+\.pdf)/gi;
const extractPdfUrls = (content: string): string[] =>
  Array.from(new Set(content.match(PDF_URL_RE) ?? []));
const pdfLabel = (url: string): string => {
  if (/gewa1/i.test(url)) return "GewA1 – Gewerbeanmeldung (leeres Formular)";
  if (/gewa2/i.test(url)) return "GewA2 – Gewerbe-Ummeldung (leeres Formular)";
  if (/gewa3/i.test(url)) return "GewA3 – Gewerbe-Abmeldung (leeres Formular)";
  return url.split("/").pop()?.split("?")[0] ?? "Dokument.pdf";
};

const PdfAttachment = ({ url }: { url: string }) => (
  <a
    href={url}
    download
    target="_blank"
    rel="noopener noreferrer"
    className="group mt-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3 no-underline transition-[border-color,box-shadow] hover:border-accent-blue/40 hover:shadow-card"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger-soft text-danger">
      <FileText className="h-5 w-5" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-foreground truncate">{pdfLabel(url)}</p>
      <p className="text-xs text-muted-foreground">PDF zum Herunterladen</p>
    </div>
    <Download className="h-4 w-4 text-muted-foreground group-hover:text-accent-blue shrink-0" />
  </a>
);

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

  // Handle ?new=1: clear and remove the param. ?frage=… füllt das Eingabefeld vor
  // (z. B. Pitch-Training aus dem Pitch-Deck-Generator) – gesendet wird erst per Klick.
  const vorbelegt = params.get("frage");
  useEffect(() => {
    if (isNew || vorbelegt) {
      setMessages([]);
      setInput(vorbelegt ?? "");
      setParams({}, { replace: true });
    }
  }, [isNew, vorbelegt, setParams]);

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
        markValueEvent("felix_answer"); // echter Output → ab jetzt darf der Referral-Prompt kommen
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
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-background">
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        {loading ? (
          <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 md:px-6" aria-busy="true">
            <span className="sr-only">Chat wird geladen…</span>
            {[0, 1, 2].map((i) => (
              <div key={i} className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}>
                <div className={`h-12 animate-pulse rounded-2xl bg-secondary ${i % 2 ? "w-1/2" : "w-2/3"}`} />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-full flex-col items-center justify-center px-4 py-10 text-center">
            <img
              src="/mascots/felix-face.png"
              alt="Felix, dein KI-Gründungs-Copilot"
              width={72}
              height={72}
              className="mb-5 h-[4.5rem] w-[4.5rem] rounded-2xl border border-border bg-card object-contain p-1.5 shadow-card"
            />
            <h1 className="mb-2 text-[1.75rem] font-semibold tracking-[-0.03em] md:text-4xl">
              {firstName ? `Willkommen zurück, ${firstName}` : "Willkommen zurück"}
            </h1>
            <p className="mb-8 max-w-md text-base text-muted-foreground md:text-lg">
              Wobei kann ich dir heute helfen?
            </p>
            <div className="grid w-full max-w-2xl gap-2.5 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="press group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-left text-sm leading-relaxed hover:border-accent-blue/40 hover:shadow-card"
                >
                  <span>{s}</span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6 md:py-8">
            <h1 className="sr-only">Chat mit Felix</h1>
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <img
                    src="/mascots/felix-face.png"
                    alt="Felix"
                    width={32}
                    height={32}
                    className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-border bg-card object-contain p-0.5"
                  />
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    m.role === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-tl-md border border-border bg-card shadow-card"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <>
                      <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-accent-blue prose-li:my-0">
                        <ReactMarkdown components={mdComponents}>{m.content}</ReactMarkdown>
                      </div>
                      {extractPdfUrls(m.content).map((u) => (
                        <PdfAttachment key={u} url={u} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-start gap-2.5 justify-start">
                <img
                  src="/mascots/felix-face.png"
                  alt="Felix"
                  width={32}
                  height={32}
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-border bg-card object-contain p-0.5"
                />
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-card" role="status">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Felix denkt nach…
                </div>
              </div>
            )}
            {!streaming && messages.some((m) => m.role === "assistant") && (
              <ReferralNudge
                className="mt-6"
                headline="Hat Felix dir das gerade beantwortet?"
              />
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Kosten-Kontingent (weich). Rendert nichts unterhalb der
              Warnschwelle — ein Dauerbanner liest niemand mehr. */}
          <TokenBudgetNotice className="mb-3" />
          <div className="flex items-end gap-2 rounded-2xl border border-input bg-card p-1.5 shadow-card transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/25">
            <label htmlFor="felix-eingabe" className="sr-only">Nachricht an Felix</label>
            <Textarea
              id="felix-eingabe"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Frag Felix…"
              rows={1}
              className="max-h-32 min-h-[44px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button onClick={send} disabled={!input.trim() || streaming} size="icon" className="h-10 w-10 shrink-0 rounded-xl" aria-label="Nachricht senden">
              {streaming ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
            <span className="hidden sm:inline">Enter sendet, Shift+Enter für eine neue Zeile. </span>Felix kann Fehler machen, prüfe wichtige Infos.
            Keine Steuer-/Rechtsberatung. Für eine verbindliche Auslegung den{" "}
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
