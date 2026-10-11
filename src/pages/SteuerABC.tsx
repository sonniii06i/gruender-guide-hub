/**
 * SteuerABC — Glossar mit 60+ Begriffen aus dem dt. Steuerrecht.
 *
 * Tool 4 der Anfänger-Wave (Starter-Kategorie).
 * Layout-Pattern: BeginnerHero, Such-Filter, Kategorie-Tabs, Begriff-Karten mit
 * Kurz-Definition + Detail-Block + §-Verweis + Cross-Tool-Links + Stolperfalle.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowRight, AlertTriangle } from "lucide-react";
import { Callout, EmptyState, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { type Kategorie, type GlossarBegriff, KATEGORIEN, GLOSSAR } from "@/data/steuerAbcGlossar";

const SteuerABC = () => {
  const [search, setSearch] = useState("");
  const [katFilter, setKatFilter] = useState<Kategorie | "alle">("alle");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return GLOSSAR.filter((g) => {
      if (katFilter !== "alle" && g.kategorie !== katFilter) return false;
      if (!q) return true;
      const heystack = [
        g.begriff,
        g.kurzDefinition,
        g.ausfuehrlich,
        g.paragraph || "",
        ...(g.aliases || []),
      ]
        .join(" ")
        .toLowerCase();
      return heystack.includes(q);
    });
  }, [search, katFilter]);

  const byKat = useMemo(() => {
    const m: Record<Kategorie, GlossarBegriff[]> = {
      grundbegriffe: [], rechtsformen: [], buchhaltung: [], ust: [], "sv-kv": [],
      anlagen: [], freibetraege: [], "fa-verfahren": [], international: [], investoren: [],
    };
    for (const g of filtered) m[g.kategorie].push(g);
    return m;
  }, [filtered]);

  return (
    <CockpitShell
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Steuer-ABC: 60+ Begriffe einfach erklärt"
      subtitle="Vollständiges Glossar des deutschen Steuerrechts für Anfänger:innen. Suchbar, kategorisiert, mit §-Verweisen, Beispielen und Cross-Links zu allen relevanten Tools."
    >
      {/* === BeginnerHero === */}
      <Callout tone="accent" icon={BookOpen} title="Was ist das hier?" className="mb-6">
        Du liest Begriffe wie „EÜR", „Reverse Charge §13b" oder „Anlage KAP" und verstehst nur Bahnhof?
        Dieses Glossar erklärt {GLOSSAR.length}+ deutsche Steuer-Begriffe in einfacher Sprache, mit
        §-Verweis, konkretem Beispiel und Link zum passenden Tool, wo du das berechnen oder einreichen
        kannst. Such direkt nach dem Begriff, der dich verwirrt.
      </Callout>

      {/* === Suche + Kategorie-Filter === */}
      <ToolSection className="mb-8" bodyClassName="space-y-4">
        <div className="relative">
          <label htmlFor="abc-suche" className="sr-only">Begriff suchen</label>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="abc-suche"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Begriff suchen … z.B. 'KSK', 'EÜR', 'Reverse Charge', 'Holding', 'AbgSt' …"
            className="h-12 pl-10 text-base"
            autoFocus
          />
        </div>
        {search.trim() && (
          <p className="text-sm text-muted-foreground tabular" aria-live="polite">
            {filtered.length} von {GLOSSAR.length} Treffer:innen
          </p>
        )}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Kategorie">
          <button
            type="button"
            aria-pressed={katFilter === "alle"}
            onClick={() => setKatFilter("alle")}
            className={chipCls(katFilter === "alle")}
          >
            📚 Alle ({GLOSSAR.length})
          </button>
          {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
            const count = GLOSSAR.filter((g) => g.kategorie === k).length;
            return (
              <button key={k} type="button" aria-pressed={katFilter === k} onClick={() => setKatFilter(k)} className={chipCls(katFilter === k)}>
                {KATEGORIEN[k].label} <span className="tabular opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </ToolSection>

      {/* === Begriff-Karten gruppiert nach Kategorie === */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title={`Keine Treffer für „${search}"`}
          description="Probiere einen allgemeineren Begriff oder setze den Kategorie-Filter auf „Alle“."
          className="mb-8"
        />
      ) : (
        <div className="mb-10 space-y-10">
          {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
            if (byKat[k].length === 0) return null;
            return (
              <section key={k}>
                <h2 className="mb-4 flex items-baseline gap-2 text-lg font-semibold tracking-tight">
                  {KATEGORIEN[k].label}
                  <span className="text-sm font-normal text-muted-foreground tabular">{byKat[k].length}</span>
                </h2>
                <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                  {byKat[k].map((g) => (
                    <BegriffCard key={g.begriff} g={g} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* === Cross-Links === */}
      <div className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Link to="/cockpit/gewerbe-check" className="press group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
          <span>
            <span className="block text-sm font-semibold">Brauche ich ein Gewerbe?</span>
            <span className="block text-xs text-muted-foreground">Der Einstieg für komplette Anfänger:innen</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <Link to="/cockpit/schwellen-check" className="press group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
          <span>
            <span className="block text-sm font-semibold">Side-Hustle-Schwellen-Check</span>
            <span className="block text-xs text-muted-foreground">Alle Freibeträge 2026 auf einen Blick</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <Stand2026Footer
        sources={[
          { label: "EStG (Einkommensteuergesetz)", url: "https://www.gesetze-im-internet.de/estg/" },
          { label: "UStG (Umsatzsteuergesetz)", url: "https://www.gesetze-im-internet.de/ustg_1980/" },
          { label: "GewStG (Gewerbesteuergesetz)", url: "https://www.gesetze-im-internet.de/gewstg/" },
          { label: "KStG (Körperschaftsteuergesetz)", url: "https://www.gesetze-im-internet.de/kstg_1977/" },
          { label: "AO (Abgabenordnung)", url: "https://www.gesetze-im-internet.de/ao_1977/" },
          { label: "ELSTER-Portal", url: "https://www.elster.de" },
        ]}
        note="Das Glossar deckt die wichtigsten Begriffe für Gründer:innen und Selbstständige ab. Bei rechtlich oder steuerlich kritischen Entscheidungen immer mit Steuerberater abklären, der Gesetzesstand ändert sich laufend."
      />
    </CockpitShell>
  );
};

const BegriffCard = ({ g }: { g: GlossarBegriff }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={`rounded-xl border bg-card p-4 transition-[border-color,box-shadow] md:p-5 ${expanded ? "border-accent-blue/35 shadow-card" : "border-border hover:border-accent-blue/30"}`}>
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold leading-snug">{g.begriff}</h3>
        {g.paragraph && <ToneBadge className="shrink-0 font-mono">{g.paragraph}</ToneBadge>}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{g.kurzDefinition}</p>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-border/70 pt-3 text-sm leading-relaxed">
          <p className="text-foreground/90">{g.ausfuehrlich}</p>
          {g.beispiel && (
            <div className="rounded-lg border border-info/20 bg-info-soft p-3 text-[13px]">
              <strong className="text-info">💡 Beispiel:</strong> {g.beispiel}
            </div>
          )}
          {g.warnung && (
            <div className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning-soft p-3 text-[13px]">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
              <div><strong className="text-warning">Stolperfalle:</strong> {g.warnung}</div>
            </div>
          )}
          {g.toolLinks && g.toolLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {g.toolLinks.map((t) => (
                <Link
                  key={t.route}
                  to={t.route}
                  className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/25 bg-accent px-2.5 py-1.5 text-xs font-semibold text-accent-blue transition-colors hover:border-accent-blue/50"
                >
                  {t.label} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-semibold text-accent-blue hover:underline"
      >
        {expanded ? "← Weniger" : "Mehr lesen →"}
      </button>
    </article>
  );
};

const chipCls = (active: boolean) =>
  `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
  }`;

export default SteuerABC;
