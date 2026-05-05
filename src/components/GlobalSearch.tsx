import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { PLAYBOOKS } from "@/data/playbooks";
import { CATEGORIES } from "@/data/features";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, ArrowRight, Clock, Wrench, GraduationCap } from "lucide-react";
import { useGuideStart } from "@/hooks/useGuideStart";

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { start } = useGuideStart();

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

  const tools = useMemo(
    () => CATEGORIES.flatMap((c) => c.features.map((f) => ({ ...f, cat: c }))),
    []
  );

  const handleGuide = (slug: string) => { setOpen(false); start(slug); };
  const goTo = (route: string) => { setOpen(false); navigate(route); };
  const askFelix = () => {
    setOpen(false);
    navigate(`/felix?q=${encodeURIComponent(q)}`);
  };

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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={q}
          onValueChange={setQ}
          placeholder="Suche nach Guide, Tool oder Thema…"
        />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Keine direkten Treffer.</p>
              <Button size="sm" onClick={askFelix} className="rounded-full gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Felix fragen zu „{q}"
              </Button>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Guides (Schritt-für-Schritt)">
            {PLAYBOOKS.map((p) => (
              <CommandItem
                key={`pb-${p.slug}`}
                value={`${p.title} ${p.tagline} guide playbook ${p.slug}`}
                onSelect={() => handleGuide(p.slug)}
                className="gap-3"
              >
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{p.tagline}</div>
                </div>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.duration}
                </span>
                <GraduationCap className="h-3.5 w-3.5 text-accent-blue" />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tools & Rechner">
            {tools.filter((t) => !!t.route).map((t) => (
              <CommandItem
                key={`tool-${t.slug}`}
                value={`${t.title} ${t.desc} ${t.cat.title} tool`}
                onSelect={() => goTo(t.route!)}
                className="gap-3"
              >
                <span className="text-base">{t.cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{t.cat.title}</div>
                </div>
                <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Aktionen">
            <CommandItem onSelect={askFelix} className="gap-2">
              <MessageSquare className="h-4 w-4 text-accent-blue" />
              Felix fragen{q ? ` zu „${q}"` : ""}
              <ArrowRight className="h-3 w-3 ml-auto" />
            </CommandItem>
            <CommandItem onSelect={() => goTo("/playbooks")} className="gap-2">
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
