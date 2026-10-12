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
    <CommandItem key={h.key} value={h.key} onSelect={() => select(h)} className="gap-3 rounded-lg py-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-base" aria-hidden="true">{h.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm font-medium">{h.title}</div>
        <div className="text-[11px] text-muted-foreground truncate">{h.sub}</div>
      </div>
      {h.kind === "guide" && h.meta && (
        <span className="tabular hidden items-center gap-1 text-[11px] text-muted-foreground md:inline-flex">
          <Clock className="h-3 w-3" aria-hidden="true" /> {h.meta}
        </span>
      )}
      {h.kind === "guide" ? (
        <GraduationCap className="h-3.5 w-3.5 shrink-0 text-accent-blue" aria-label="Guide" />
      ) : (
        <Wrench className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-label="Tool" />
      )}
    </CommandItem>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden h-9 min-w-[260px] items-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] text-muted-foreground shadow-sm transition-colors hover:border-accent-blue/40 hover:text-foreground sm:flex md:min-w-[340px]"
        aria-label="Suche öffnen"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="flex-1 text-left">Guides und Tools durchsuchen …</span>
        <kbd className="hidden items-center gap-0.5 rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 font-sans text-[10px] md:inline-flex">
          ⌘K
        </kbd>
      </button>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        variant="ghost"
        className="h-9 w-9 rounded-lg sm:hidden"
        aria-label="Suche öffnen"
      >
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
        <CommandInput
          value={q}
          onValueChange={setQ}
          placeholder="Guide, Tool oder Thema suchen …"
        />
        <CommandList ref={listRef}>
          {q.trim() ? (
            results.length > 0 ? (
              <CommandGroup heading="Treffer">
                {results.map(renderHit)}
              </CommandGroup>
            ) : (
              <div className="flex flex-col items-center px-6 py-8 text-center">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold">Keine Treffer für „{q}“</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Frag unten Felix, er findet den passenden Weg.</p>
              </div>
            )
          ) : (
            <>
              <CommandGroup heading="Guides, Schritt für Schritt">
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
            <CommandItem value="action-felix" onSelect={askFelix} className="gap-2 rounded-lg py-2">
              <MessageSquare className="h-4 w-4 text-accent-blue" aria-hidden="true" />
              Felix fragen{q ? ` zu „${q}"` : ""}
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            </CommandItem>
            <CommandItem value="action-all-guides" onSelect={() => { setOpen(false); navigate("/playbooks"); }} className="gap-2 rounded-lg py-2">
              <GraduationCap className="h-4 w-4 text-accent-blue" aria-hidden="true" />
              Alle Guides ansehen
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
