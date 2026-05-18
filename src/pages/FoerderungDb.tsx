import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink, Filter } from "lucide-react";
import { FOERDERPROGRAMME, BUNDESLAND_NAMES, type Foerderung } from "@/data/foerderprogramme";

const TYPE_LABELS: Record<Foerderung["type"], { name: string; emoji: string; color: string }> = {
  kredit: { name: "Kredit", emoji: "💰", color: "bg-accent-blue/10 text-accent-blue" },
  zuschuss: { name: "Zuschuss", emoji: "🎁", color: "bg-emerald-500/10 text-emerald-700" },
  stipendium: { name: "Stipendium", emoji: "🎓", color: "bg-purple-500/10 text-purple-700" },
  buergschaft: { name: "Bürgschaft", emoji: "🛡️", color: "bg-amber-500/10 text-amber-700" },
  eigenkapital: { name: "Eigenkapital", emoji: "🦄", color: "bg-orange-500/10 text-orange-700" },
  steuer: { name: "Steuer-Relief", emoji: "📋", color: "bg-pink-500/10 text-pink-700" },
  accelerator: { name: "Accelerator", emoji: "🚀", color: "bg-indigo-500/10 text-indigo-700" },
};

// Country-Code → Anzeigename
const COUNTRY_LABELS: Record<string, string> = {
  DE: "🇩🇪 Deutschland",
  EU: "🇪🇺 EU",
  FR: "🇫🇷 Frankreich",
  NL: "🇳🇱 Niederlande",
  IL: "🇮🇱 Israel",
  US: "🇺🇸 USA",
  UK: "🇬🇧 UK",
  CH: "🇨🇭 Schweiz",
  SE: "🇸🇪 Schweden",
  FI: "🇫🇮 Finnland",
  NO: "🇳🇴 Norwegen",
  SG: "🇸🇬 Singapur",
  HK: "🇭🇰 Hong Kong",
  JP: "🇯🇵 Japan",
  Global: "🌍 Global",
};

const FoerderungDb = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<Foerderung["type"] | "all">("all");
  const [filterScope, setFilterScope] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterPhase, setFilterPhase] = useState<Foerderung["phase"][number] | "all">("all");

  const filtered = useMemo(() => {
    let list = FOERDERPROGRAMME;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.zielgruppe.some((z) => z.toLowerCase().includes(q)) ||
          f.branche.some((b) => b.toLowerCase().includes(q)),
      );
    }
    if (filterType !== "all") list = list.filter((f) => f.type === filterType);
    if (filterCountry !== "all") {
      list = list.filter((f) => (f.country ?? "DE") === filterCountry);
    }
    if (filterScope !== "all") list = list.filter((f) => f.scope === filterScope);
    if (filterPhase !== "all") list = list.filter((f) => f.phase.includes(filterPhase));
    return list;
  }, [search, filterType, filterScope, filterCountry, filterPhase]);

  const allScopes = Array.from(new Set(FOERDERPROGRAMME.filter((f) => !f.country || f.country === "DE").map((f) => f.scope))).sort();
  const allCountries = Array.from(new Set(FOERDERPROGRAMME.map((f) => f.country ?? "DE"))).sort();
  const countryCount = (c: string) => FOERDERPROGRAMME.filter((f) => (f.country ?? "DE") === c).length;

  return (
    <CockpitShell
      eyebrow="Förderung-Datenbank · Stand Mai 2026"
      title="Förderprogramme international — DACH + EU + Welt"
      subtitle={`${FOERDERPROGRAMME.length}+ kuratierte Programme aus ${allCountries.length} Ländern: 🇩🇪 KfW/EXIST/INVEST/HTGF/Bundesländer · 🇪🇺 EIC/Eurostars/Innovation Fund · 🇫🇷 BPI/CIR/JEI · 🇳🇱 WBSO/Innovatiekrediet · 🇮🇱 IIA · 🇺🇸 YC/Techstars/SBIR · 🇬🇧 SEIS/EIS · 🇨🇭 Innosuisse/Venture Kick. Filter nach Land, Typ, Phase.`}
    >
      {/* Country Quick-Pills */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-3">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Land schnell wählen</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterCountry("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterCountry === "all"
                ? "bg-accent-blue text-primary-foreground"
                : "border border-border bg-card hover:bg-secondary"
            }`}
          >
            Alle ({FOERDERPROGRAMME.length})
          </button>
          {allCountries.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCountry(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                filterCountry === c
                  ? "bg-accent-blue text-primary-foreground"
                  : "border border-border bg-card hover:bg-secondary"
              }`}
            >
              {COUNTRY_LABELS[c] || c} ({countryCount(c)})
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Filter (zusätzlich)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suche: KfW, Tech-Startup, EXIST, Berlin, EIC, YC, WBSO, ..."
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Typ</Label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Alle Typen</option>
              <option value="kredit">💰 Kredit</option>
              <option value="zuschuss">🎁 Zuschuss</option>
              <option value="stipendium">🎓 Stipendium</option>
              <option value="buergschaft">🛡️ Bürgschaft</option>
              <option value="eigenkapital">🦄 Eigenkapital</option>
              <option value="steuer">📋 Steuer-Relief</option>
              <option value="accelerator">🚀 Accelerator</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">DE Bundesland</Label>
            <select
              value={filterScope}
              onChange={(e) => setFilterScope(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Alle</option>
              {allScopes.map((s) => (
                <option key={s} value={s}>
                  {BUNDESLAND_NAMES[s] || s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phase</Label>
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value as typeof filterPhase)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Alle Phasen</option>
              <option value="idee">💡 Idee</option>
              <option value="gruendung">🚀 Gründung</option>
              <option value="aufbau">📈 Aufbau (1-3 Jahre)</option>
              <option value="wachstum">🌱 Wachstum (3+ Jahre)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Treffer</Label>
            <div className="mt-1 h-10 flex items-center text-sm font-bold">
              {filtered.length} / {FOERDERPROGRAMME.length}
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3 mb-6">
        {filtered.map((f) => {
          const typeInfo = TYPE_LABELS[f.type];
          return (
            <a
              key={f.slug}
              href={f.antragUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block rounded-2xl border border-border bg-card p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="text-3xl shrink-0">{f.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1">{f.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold inline-flex items-center gap-1 ${typeInfo.color}`}
                      >
                        {typeInfo.emoji} {typeInfo.name}
                      </span>
                      <span className="rounded-full bg-blue-500/10 text-blue-700 px-2 py-0.5 text-[10px] font-semibold">
                        {COUNTRY_LABELS[f.country ?? "DE"] || f.country}
                      </span>
                      {(!f.country || f.country === "DE") && (
                        <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px]">
                          {BUNDESLAND_NAMES[f.scope] || f.scope}
                        </span>
                      )}
                      {f.phase.map((p) => (
                        <span key={p} className="rounded-full bg-secondary/70 text-muted-foreground px-2 py-0.5 text-[10px]">
                          {p === "idee" ? "💡 Idee" : p === "gruendung" ? "🚀 Gründung" : p === "aufbau" ? "📈 Aufbau" : "🌱 Wachstum"}
                        </span>
                      ))}
                      {f.successRate && (
                        <span className="rounded-full bg-red-500/10 text-red-700 px-2 py-0.5 text-[10px] font-semibold">
                          Quote: {f.successRate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground uppercase">Max. Förderung</div>
                  <div className="font-bold text-sm">{f.maxFunding}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{f.description}</p>
              {f.forDeFounder && (
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2 mb-3 text-xs">
                  <strong className="text-emerald-700">Für DE-Founder:</strong> {f.forDeFounder}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Zielgruppe</div>
                  <ul className="space-y-0.5 text-xs">
                    {f.zielgruppe.map((z, i) => (
                      <li key={i} className="text-muted-foreground">
                        · {z}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Bedingungen</div>
                  <ul className="space-y-0.5 text-xs">
                    {f.conditions.slice(0, 4).map((c, i) => (
                      <li key={i} className="text-muted-foreground">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {f.watchouts && f.watchouts.length > 0 && (
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-2 mb-2 text-xs">
                  <div className="font-semibold text-amber-700 mb-1">⚠ Watchouts:</div>
                  <ul className="space-y-0.5 text-muted-foreground list-disc pl-4">
                    {f.watchouts.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}
              {f.notes && f.notes.length > 0 && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-semibold text-foreground">Mehr Details ▾</summary>
                  <ul className="list-disc pl-4 mt-2 space-y-0.5">
                    {f.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </details>
              )}
              <div className="text-[11px] text-accent-blue mt-3 inline-flex items-center gap-1">
                Antrag stellen <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Keine Programme passen zu deinen Filtern. Versuch es mit weniger restriktiven Filtern.
          </div>
        )}
      </div>

      {/* Tipps */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
        <h3 className="font-bold text-sm mb-2">Förder-Strategie für Gründer</h3>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>
            <strong>Stack mehrere Förderungen</strong>: Bundesförderung + Bundesland-Förderung sind oft kombinierbar
            (Stipendium + Bürgschaftsbank-gestützter KfW-Kredit).
          </li>
          <li>
            <strong>EXIST → Seed-Round</strong>: Erst EXIST-Stipendium (12 Monate finanzielle Sicherheit), dann mit
            HTGF / VC-Seed-Round skalieren.
          </li>
          <li>
            <strong>Hausbank ist Schlüssel</strong>: KfW-Kredite werden über Hausbank beantragt — wähle eine
            Gründer-freundliche Bank (Volksbanken, Sparkassen mit "Gründer-Beauftragten").
          </li>
          <li>
            <strong>Bürgschaftsbank zuerst</strong>: bei wenig Eigenkapital → Bürgschaftsbank-Bürgschaft erleichtert
            jeden Bank-Kredit massiv.
          </li>
          <li>
            <strong>EIC Accelerator</strong>: für Deep-Tech und VC-fähige Startups — bis 17,5 Mio € Mix aus Grant +
            Equity, sehr kompetitiv (8-12 % Quote) aber transformativ.
          </li>
          <li>
            <strong>Beratungsförderungen nutzen</strong>: BAFA-Förderung für Unternehmensberatung (50 % bis 3.500 €)
            — finanziert StB / Anwalt / Coach.
          </li>
          <li>
            <strong>Genehmigung VOR Investition</strong>: bei zuschüssen/stipendien gilt Antrag VOR Geldausgabe.
            Rückwirkende Förderung gibt es nicht.
          </li>
          <li>
            <strong>Nicht erwähnt</strong>: regionale IHK-Programme, Inno-Gutscheine der Bundesländer (50–25k €
            für Innovations-Beratung) — auch immer einen Anruf bei lokaler IHK wert.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mt-3 text-xs leading-relaxed">
        <strong>Disclaimer:</strong> Alle Programme + Konditionen Stand Mai 2026. Förderhöhen, Zinsen, Bedingungen
        können sich ändern. Vor Antrag immer aktuelle Konditionen auf der offiziellen Programm-Seite (verlinkt) +
        ggf. Förderberater (IHK, KfW-Beauftragte) konsultieren. Größere Datenbank:{" "}
        <a
          href="https://www.foerderdatenbank.de"
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent-blue hover:underline inline-flex items-center gap-0.5"
        >
          foerderdatenbank.de <ExternalLink className="h-3 w-3" />
        </a>
        {" "}(BMWK-Datenbank, 2.500+ Programme).
      </div>
    </CockpitShell>
  );
};

export default FoerderungDb;
