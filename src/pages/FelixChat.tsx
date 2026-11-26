import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TokenBudgetNotice } from "@/components/TokenBudgetNotice";
import {
  Send,
  Loader2,
  FileText,
  Download,
  ArrowUpRight,
  Building2,
  Calculator,
  Globe2,
  ShoppingBag,
  History,
  Plus,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { toast } from "sonner";
import { notifyConversationsChanged } from "@/hooks/useFelixConversations";
import { readProfileCache } from "@/lib/profileCache";
import { markValueEvent } from "@/utils/valueEvent";
import { ReferralNudge } from "@/components/ReferralNudge";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: { tag: string; icon: typeof Building2; text: string }[] = [
  {
    tag: "Rechtsform",
    icon: Building2,
    text: "Soll ich UG oder GmbH gründen bei 80k € Gewinn?",
  },
  {
    tag: "Holding & Steuern",
    icon: Calculator,
    text: "Wie funktioniert der § 8b KStG bei Holdings?",
  },
  {
    tag: "E-Commerce",
    icon: ShoppingBag,
    text: "Was muss ich für Amazon FBA in DE anmelden?",
  },
  {
    tag: "US-Setup",
    icon: Globe2,
    text: "Lohnt sich eine US-LLC für mein SaaS?",
  },
];

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
    className="group mt-3 flex items-center gap-3 rounded-xl border border-border bg-[#F8FAFC] p-3 no-underline transition-[border-color,box-shadow] hover:border-primary/35 hover:bg-white"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger-soft text-danger">
      <FileText className="h-5 w-5" aria-hidden="true" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-foreground">{pdfLabel(url)}</p>
      <p className="text-xs text-muted-foreground">PDF zum Herunterladen</p>
    </div>
    <Download className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
  </a>
);

const mdComponents: Components = {
  a: ({ href, children }) => {
    const url = href ?? "";
    if (!url) return <>{children}</>;
    const isFile = url.startsWith("/forms/") || url.endsWith(".pdf");
    const isExternal = /^https?:\/\//i.test(url);
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
  const [fehler, setFehler] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string | null>(
    () => readProfileCache(user?.id)?.first_name ?? null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadedConvRef = useRef<string | null>(null);
  const liveConvRef = useRef<string | null>(convId);
  const sendTokenRef = useRef(0);

  useEffect(() => {
    if (liveConvRef.current !== convId) {
      liveConvRef.current = convId;
      sendTokenRef.current++;
      setStreaming(false);
    }
  }, [convId]);

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

  const vorbelegt = params.get("frage");
  useEffect(() => {
    if (isNew || vorbelegt) {
      setMessages([]);
      setInput(vorbelegt ?? "");
      setParams({}, { replace: true });
    }
  }, [isNew, vorbelegt, setParams]);

  useEffect(() => {
    if (!user || !convId) {
      if (!convId) {
        setMessages([]);
        loadedConvRef.current = null;
      }
      return;
    }
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

  const copyAnswer = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1800);
      },
      () => undefined,
    );
  };

  const send = async (overrideText?: string) => {
    const raw = (overrideText ?? input).trim();
    if (!raw || !user || streaming) return;
    const userMsg: Msg = { role: "user", content: raw };
    const token = ++sendTokenRef.current;
    const restoreInput = () => setInput((cur) => (cur ? cur : raw));
    setInput("");
    setStreaming(true);
    setFehler(null);

    let activeConvId = convId;
    if (!activeConvId) {
      const title = raw.slice(0, 60) + (raw.length > 60 ? "…" : "");
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({ user_id: user.id, title, last_message_at: new Date().toISOString() })
        .select("id")
        .single();
      if (error || !data) {
        toast.error("Konnte Chat nicht erstellen");
        restoreInput();
        setStreaming(false);
        return;
      }
      activeConvId = data.id;
      loadedConvRef.current = activeConvId;
      liveConvRef.current = activeConvId;
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
    const sichtbar = () => liveConvRef.current === activeConvId;
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      if (!sichtbar()) return;
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
          Authorization: `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        console.error("chat-felix:", resp.status, err);
        const text =
          resp.status === 429
            ? "Felix ist gerade überlastet. Deine Frage steht wieder im Eingabefeld. Schick sie gleich noch einmal ab."
            : "Felix ist gerade nicht erreichbar. Deine Frage steht wieder im Eingabefeld. Versuch es in ein paar Minuten noch einmal. Tools, Guides und der Steuerkalender funktionieren weiter.";
        toast.error(resp.status === 429 ? "Felix ist gerade überlastet." : "Felix ist gerade nicht erreichbar.");
        if (sichtbar()) {
          setFehler(text);
          restoreInput();
        }
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
        markValueEvent("felix_answer");
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
      if (sichtbar() && !assistantSoFar) {
        setFehler("Die Verbindung zu Felix ist abgebrochen. Deine Frage steht wieder im Eingabefeld. Schick sie noch einmal ab.");
        restoreInput();
      }
    } finally {
      if (sendTokenRef.current === token) setStreaming(false);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-background">
      {/* Ruhige Revolut × Lexoffice Assistenten-Kopfzeile */}
      <div className="border-b border-border bg-white px-4 py-2.5 md:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative">
              <img
                src="/mascots/felix-face-192.webp"
                alt="Felix"
                width={34}
                height={34}
                className="h-8 w-8 rounded-xl border border-border bg-secondary/50 object-contain p-0.5"
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-primary">Felix</p>
              <p className="truncate text-[11px] font-medium text-muted-foreground">
                KI-Co-Pilot · kennt dein Profil &amp; alle 81 Kurse
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {messages.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setParams({ new: "1" })}
                className="h-8 gap-1.5 rounded-lg px-2.5 text-xs font-semibold"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Neuer Chat</span>
              </Button>
            )}
            <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted-foreground hover:text-primary">
              <Link to="/felix/chats">
                <History className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Verlauf</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Nachrichten-Canvas */}
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
          <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-4 py-10 text-center md:px-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-white p-2 shadow-card">
              <img
                src="/mascots/felix-face-192.webp"
                alt="Felix, dein KI-Gründungs-Copilot"
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-[-0.025em] text-primary sm:text-3xl">
              {firstName ? `Willkommen zurück, ${firstName}` : "Willkommen zurück"}
            </h1>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground sm:text-base">
              Wobei kann ich dir heute helfen?
            </p>

            <div className="mt-7 grid w-full gap-2.5 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.text}
                    type="button"
                    onClick={() => setInput(s.text)}
                    className="press group flex flex-col justify-between gap-2 rounded-2xl border border-border bg-white p-4 text-left shadow-card transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-soft"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
                        <Icon className="h-3 w-3" aria-hidden="true" />
                        {s.tag}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm font-medium leading-snug text-foreground">{s.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6 md:px-6 md:py-8">
            <h1 className="sr-only">Chat mit Felix</h1>
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <img
                    src="/mascots/felix-face-192.webp"
                    alt="Felix"
                    width={32}
                    height={32}
                    className="mt-0.5 h-8 w-8 shrink-0 rounded-xl border border-border bg-white object-contain p-0.5 shadow-sm"
                  />
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[82%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-white shadow-sm"
                      : "group max-w-[88%] rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3.5 shadow-card"
                  }
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                  ) : (
                    <>
                      <div className="prose prose-sm max-w-none text-foreground prose-headings:font-bold prose-headings:text-primary prose-strong:text-foreground prose-a:font-medium prose-a:text-accent-blue prose-li:my-0.5">
                        <ReactMarkdown components={mdComponents}>{m.content}</ReactMarkdown>
                      </div>
                      {extractPdfUrls(m.content).map((u) => (
                        <PdfAttachment key={u} url={u} />
                      ))}
                      <div className="mt-2.5 flex justify-end border-t border-border/50 pt-2">
                        <button
                          type="button"
                          onClick={() => copyAnswer(m.content, i)}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                        >
                          {copiedIdx === i ? (
                            <>
                              <Check className="h-3 w-3 text-brand-green" aria-hidden="true" /> Kopiert
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" aria-hidden="true" /> Kopieren
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {streaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-start justify-start gap-2.5">
                <img
                  src="/mascots/felix-face-192.webp"
                  alt="Felix"
                  width={32}
                  height={32}
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-xl border border-border bg-white object-contain p-0.5 shadow-sm"
                />
                <div
                  className="inline-flex items-center gap-2 rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-card"
                  role="status"
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" aria-hidden="true" /> Felix denkt nach…
                </div>
              </div>
            )}
            {fehler && !streaming && (
              <div
                role="alert"
                className="ml-10 rounded-2xl rounded-tl-md border border-warning/35 bg-warning-soft px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                {fehler}
              </div>
            )}
            {!streaming && messages.some((m) => m.role === "assistant") && (
              <ReferralNudge className="mt-6" headline="Hat Felix dir das gerade beantwortet?" />
            )}
          </div>
        )}
      </div>

      {/* Moderner schwebender Composer */}
      <div className="border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3 md:px-6 md:py-4">
          <TokenBudgetNotice className="mb-3" />
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-[#F8FAFC] p-1.5 shadow-sm transition-[border-color,box-shadow,background-color] focus-within:border-primary/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
            <label htmlFor="felix-eingabe" className="sr-only">
              Nachricht an Felix
            </label>
            <Textarea
              id="felix-eingabe"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Frag Felix zu Steuern, Rechtsform, Shop oder US-Setup …"
              rows={1}
              className="max-h-36 min-h-[44px] resize-none border-0 bg-transparent px-3 py-2.5 text-sm shadow-none focus-visible:ring-0"
            />
            <Button
              onClick={() => void send()}
              disabled={!input.trim() || streaming}
              size="icon"
              className="press h-10 w-10 shrink-0 rounded-xl bg-primary text-white hover:bg-primary/90"
              aria-label="Nachricht senden"
            >
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
            <span className="hidden sm:inline">Enter sendet, Shift+Enter für eine neue Zeile. </span>
            Felix kann Fehler machen, prüfe wichtige Infos. Keine Steuer-/Rechtsberatung. Für eine verbindliche Auslegung den{" "}
            <Link to="/cockpit/stb-finder" className="font-medium underline hover:text-primary">
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
