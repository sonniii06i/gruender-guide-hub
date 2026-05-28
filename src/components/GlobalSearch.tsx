import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { PLAYBOOKS } from "@/data/playbooks";
import { CATEGORIES } from "@/data/features";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, ArrowRight, Clock, Wrench, GraduationCap } from "lucide-react";
import { useGuideStart } from "@/hooks/useGuideStart";

type Hit = {
  kind: "guide" | "tool";
  key: string;
  slug: string;
  route?: string;
  title: string;
  sub: string;
  emoji: string;
  meta?: string;
  haystack: string;
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Relevanz-Score: Titel-Treffer schlagen Beschreibungs-/Tagline-Treffer deutlich,
// damit z.B. "Rechnung" den Rechnungs-Generator ganz oben zeigt — egal ob Tool oder Guide.
const scoreHit = (h: Hit, query: string): number => {
  const t = h.title.toLowerCase();
  if (t === query) return 1000;
  if (t.startsWith(query)) return 800;
  if (new RegExp(`\\b${escapeRegExp(query)}`).test(t)) return 600;
  if (t.includes(query)) return 400;
  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((tok) => t.includes(tok))) return 300;
  if (h.haystack.includes(query)) return 150;
  if (tokens.length > 0 && tokens.every((tok) => h.haystack.includes(tok))) return 100;
  return 0;
};

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { start } = useGuideStart();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const allHits = useMemo<Hit[]>(() => {
    const guideHits: Hit[] = PLAYBOOKS.map((p) => ({
      kind: "guide",
      key: `pb-${p.slug}`,
      slug: p.slug,
      title: p.title,
      sub: p.tagline,
      emoji: p.emoji,
      meta: p.duration,
      haystack: `${p.title} ${p.tagline} ${p.slug}`.toLowerCase(),
    }));
    const toolHits: Hit[] = CATEGORIES.flatMap((c) =>
      c.features
        .filter((f) => !!f.route)
        .map((f) => ({
          kind: "tool" as const,
          key: `tool-${f.slug}`,
          slug: f.slug,
          route: f.route,
          title: f.title,
          sub: c.title,
          emoji: c.emoji,
          haystack: `${f.title} ${f.desc} ${c.title} ${f.slug}`.toLowerCase(),
        }))
    );
    return [...guideHits, ...toolHits];
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return allHits
      .map((h) => ({ h, s: scoreHit(h, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.h.title.localeCompare(b.h.title))
      .slice(0, 40)
      .map((x) => x.h);
  }, [q, allHits]);

  const browseGuides = useMemo(() => allHits.filter((h) => h.kind === "guide"), [allHits]);
  const browseTools = useMemo(() => allHits.filter((h) => h.kind === "tool"), [allHits]);

  const select = (h: Hit) => {
    setOpen(false);
    if (h.kind === "guide") start(h.slug);
    else if (h.route) navigate(h.route);
  };
  const askFelix = () => {
    setOpen(false);
    navigate(`/felix?q=${encodeURIComponent(q)}`);
  };

  const renderHit = (h: Hit) => (
    <CommandItem key={h.key} value={h.key} onSelect={() => select(h)} className="gap-3">
      <span className={h.kind === "guide" ? "text-xl" : "text-base"}>{h.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-sm truncate ${h.kind === "guide" ? "font-semibold" : "font-medium"}`}>{h.title}</div>
        <div className="text-[11px] text-muted-foreground truncate">{h.sub}</div>
      </div>
      {h.kind === "guide" && h.meta && (
        <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3" /> {h.meta}
        </span>
      )}
      {h.kind === "guide" ? (
        <GraduationCap className="h-3.5 w-3.5 text-accent-blue" />
      ) : (
        <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </CommandItem>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-full border border-border bg-card hover:border-accent-blue/40 hover:bg-accent/40 transition-colors text-xs text-muted-foreground min-w-[260px] md:min-w-[340px]"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Suche: US LLC, Holding, Marke, IAB…</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-secondary text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        variant="ghost"
        className="sm:hidden h-9 w-9 rounded-full"
        aria-label="Suche öffnen"
      >
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
        <CommandInput
          value={q}
          onValueChange={setQ}
          placeholder="Suche nach Guide, Tool oder Thema…"
        />
        <CommandList ref={listRef}>
          {q.trim() ? (
            results.length > 0 ? (
              <CommandGroup heading="Treffer">
                {results.map(renderHit)}
              </CommandGroup>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground">Keine direkten Treffer für „{q}" — frag unten Felix.</p>
              </div>
            )
          ) : (
            <>
              <CommandGroup heading="Guides (Schritt-für-Schritt)">
                {browseGuides.map(renderHit)}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools & Rechner">
                {browseTools.map(renderHit)}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading="Aktionen">
            <CommandItem value="action-felix" onSelect={askFelix} className="gap-2">
              <MessageSquare className="h-4 w-4 text-accent-blue" />
              Felix fragen{q ? ` zu „${q}"` : ""}
              <ArrowRight className="h-3 w-3 ml-auto" />
            </CommandItem>
            <CommandItem value="action-all-guides" onSelect={() => { setOpen(false); navigate("/playbooks"); }} className="gap-2">
              <GraduationCap className="h-4 w-4 text-accent-blue" />
              Alle Guides ansehen
              <ArrowRight className="h-3 w-3 ml-auto" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
