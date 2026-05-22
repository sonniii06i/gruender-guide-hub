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
import { Search, BookOpen, ExternalLink, AlertTriangle } from "lucide-react";
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
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Steuer-ABC — 60+ Begriffe einfach erklärt"
      subtitle="Vollständiges Glossar des deutschen Steuerrechts für Anfänger:innen. Suchbar, kategorisiert, mit §-Verweisen, Beispielen und Cross-Links zu allen relevanten Tools."
    >
      {/* === BeginnerHero === */}
      <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-6">
        <div className="flex items-start gap-3">
          <BookOpen className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Du liest Begriffe wie „EÜR", „Reverse Charge §13b" oder „Anlage KAP" und verstehst nur Bahnhof?
              Dieses Glossar erklärt {GLOSSAR.length}+ deutsche Steuer-Begriffe in einfacher Sprache — mit
              §-Verweis, konkretem Beispiel und Link zum passenden Tool, wo du das berechnen / einreichen
              kannst. Such direkt nach dem Begriff, der dich verwirrt.
            </p>
          </div>
        </div>
      </div>

      {/* === Suche === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Begriff suchen … z.B. 'KSK', 'EÜR', 'Reverse Charge', 'Holding', 'AbgSt' …"
            className="h-11 text-base pl-10"
            autoFocus
          />
        </div>
        {search.trim() && (
          <div className="text-[11px] text-muted-foreground mt-2">
            {filtered.length} von {GLOSSAR.length} Treffer:innen
          </div>
        )}
      </div>

      {/* === Kategorie-Filter === */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setKatFilter("alle")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            katFilter === "alle"
              ? "bg-accent-blue text-primary-foreground"
              : "bg-secondary hover:bg-accent-blue/10 border border-border"
          }`}
        >
          📚 Alle ({GLOSSAR.length})
        </button>
        {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
          const count = GLOSSAR.filter((g) => g.kategorie === k).length;
          return (
            <button
              key={k}
              onClick={() => setKatFilter(k)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                katFilter === k
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary hover:bg-accent-blue/10 border border-border"
              }`}
            >
              {KATEGORIEN[k].emoji} {KATEGORIEN[k].label} ({count})
            </button>
          );
        })}
      </div>

      {/* === Begriff-Karten gruppiert nach Kategorie === */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          Keine Treffer für „{search}". Tipp: probiere allgemeinere Begriffe, oder schau in „📚 Alle" durch.
        </div>
      ) : (
        <div className="space-y-6 mb-6">
          {(Object.keys(KATEGORIEN) as Kategorie[]).map((k) => {
            if (byKat[k].length === 0) return null;
            return (
              <section key={k}>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>{KATEGORIEN[k].emoji}</span>
                  <span>{KATEGORIEN[k].label}</span>
                  <span className="text-xs text-muted-foreground font-normal">({byKat[k].length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <Link to="/cockpit/gewerbe-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Brauche ich Gewerbe?</div>
          <div className="text-muted-foreground">Tool 1 für komplette Anfänger:innen</div>
        </Link>
        <Link to="/cockpit/schwellen-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Side-Hustle-Schwellen-Check</div>
          <div className="text-muted-foreground">Tool 3 — alle Freibeträge 2026</div>
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
        note="Glossar deckt die wichtigsten Begriffe für Gründer:innen + Selbstständige ab. Bei rechtlich/steuerlich kritischen Entscheidungen immer mit Steuerberater abklären — Gesetzes-Stand kann sich kontinuierlich ändern."
      />
    </CockpitShell>
  );
};

const BegriffCard = ({ g }: { g: GlossarBegriff }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-2xl border bg-card p-4 transition ${expanded ? "border-accent-blue/40" : "border-border hover:border-accent-blue/40"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-sm leading-tight">{g.begriff}</h3>
        {g.paragraph && (
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] font-mono shrink-0">
            {g.paragraph}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{g.kurzDefinition}</p>
      {expanded && (
        <div className="mt-2 space-y-2 text-xs leading-relaxed border-t border-border pt-2">
          <p className="text-foreground">{g.ausfuehrlich}</p>
          {g.beispiel && (
            <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-2 text-[11px]">
              <strong className="text-blue-700">💡 Beispiel:</strong> {g.beispiel}
            </div>
          )}
          {g.warnung && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/30 p-2 text-[11px] flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div><strong className="text-amber-700">Stolperfalle:</strong> {g.warnung}</div>
            </div>
          )}
          {g.toolLinks && g.toolLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {g.toolLinks.map((t) => (
                <Link
                  key={t.route}
                  to={t.route}
                  className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/40 bg-accent-blue/5 text-accent-blue px-2 py-1 text-[11px] font-semibold hover:bg-accent-blue/10"
                >
                  {t.label} <ExternalLink className="h-2.5 w-2.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-[11px] text-accent-blue hover:underline font-semibold"
      >
        {expanded ? "← Weniger" : "Mehr lesen →"}
      </button>
    </div>
  );
};

export default SteuerABC;
