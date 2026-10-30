import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Filter, Landmark, Gift, GraduationCap, ShieldCheck, TrendingUp, Receipt, Rocket, Lightbulb, ChevronDown, type LucideIcon } from "lucide-react";
import { Callout, EmptyState, Field, ToneBadge, ToolSection, selectCls, toneSoft, toneText, type Tone } from "@/components/cockpit/kit";
import { FOERDERPROGRAMME, BUNDESLAND_NAMES, type Foerderung } from "@/data/foerderprogramme";

const TYPE_LABELS: Record<Foerderung["type"], { name: string; Icon: LucideIcon; tone: Tone }> = {
  kredit: { name: "Kredit", Icon: Landmark, tone: "accent" },
  zuschuss: { name: "Zuschuss", Icon: Gift, tone: "success" },
  stipendium: { name: "Stipendium", Icon: GraduationCap, tone: "info" },
  buergschaft: { name: "Bürgschaft", Icon: ShieldCheck, tone: "warning" },
  eigenkapital: { name: "Eigenkapital", Icon: TrendingUp, tone: "accent" },
  steuer: { name: "Steuer-Relief", Icon: Receipt, tone: "neutral" },
  accelerator: { name: "Accelerator", Icon: Rocket, tone: "info" },
};

const PHASE_LABELS: Record<Foerderung["phase"][number], string> = {
  idee: "Idee",
  gruendung: "Gründung",
  aufbau: "Aufbau",
  wachstum: "Wachstum",
};

// Country-Code → Anzeigename
const COUNTRY_LABELS: Record<string, string> = {
  DE: "Deutschland",
  EU: "EU",
  FR: "Frankreich",
  NL: "Niederlande",
  IL: "Israel",
  US: "USA",
  UK: "UK",
  CH: "Schweiz",
  SE: "Schweden",
  FI: "Finnland",
  NO: "Norwegen",
  SG: "Singapur",
  HK: "Hong Kong",
  JP: "Japan",
  Global: "Global",
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

  const filterAktiv = filterType !== "all" || filterScope !== "all" || filterCountry !== "all" || filterPhase !== "all" || search.trim() !== "";
  const zuruecksetzen = () => {
    setSearch("");
    setFilterType("all");
    setFilterScope("all");
    setFilterCountry("all");
    setFilterPhase("all");
  };

  return (
    <CockpitShell
      eyebrow="Förderung-Datenbank · Stand Mai 2026"
      title="Förderprogramme international: DACH, EU und weltweit"
      subtitle={`${FOERDERPROGRAMME.length} kuratierte Programme aus ${allCountries.length} Ländern: KfW, EXIST, INVEST, HTGF und Bundesländer, EU (EIC, Eurostars), Frankreich, Niederlande, Israel, USA, UK, Schweiz und mehr. Filter nach Land, Typ und Phase.`}
    >
      <ToolSection title="Programme filtern" icon={Filter} className="mb-6" actions={filterAktiv ? <Button variant="ghost" size="sm" onClick={zuruecksetzen}>Filter zurücksetzen</Button> : undefined}>
        <div className="space-y-5">
          <div className="relative">
            <label htmlFor="foerder-suche" className="sr-only">Programme durchsuchen</label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="foerder-suche"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suche: KfW, Tech-Startup, EXIST, Berlin, EIC, YC, WBSO …"
              className="pl-9"
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Land</p>
            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:flex-wrap">
              {[{ c: "all", label: "Alle", n: FOERDERPROGRAMME.length }, ...allCountries.map((c) => ({ c, label: COUNTRY_LABELS[c] || c, n: countryCount(c) }))].map((x) => (
                <button
                  key={x.c}
                  type="button"
                  aria-pressed={filterCountry === x.c}
                  onClick={() => setFilterCountry(x.c)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    filterCountry === x.c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-foreground/25 hover:text-foreground"
                  }`}
                >
                  {x.label}
                  <span className={`text-xs tabular ${filterCountry === x.c ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{x.n}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Typ" htmlFor="foerder-typ">
              <select id="foerder-typ" value={filterType} onChange={(e) => setFilterType(e.target.value as typeof filterType)} className={selectCls}>
                <option value="all">Alle Typen</option>
                {Object.entries(TYPE_LABELS).map(([k, t]) => <option key={k} value={k}>{t.name}</option>)}
              </select>
            </Field>
            <Field label="Bundesland (DE)" htmlFor="foerder-land">
              <select id="foerder-land" value={filterScope} onChange={(e) => setFilterScope(e.target.value)} className={selectCls}>
                <option value="all">Alle</option>
                {allScopes.map((s) => (
                  <option key={s} value={s}>
                    {BUNDESLAND_NAMES[s] || s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Phase" htmlFor="foerder-phase">
              <select id="foerder-phase" value={filterPhase} onChange={(e) => setFilterPhase(e.target.value as typeof filterPhase)} className={selectCls}>
                <option value="all">Alle Phasen</option>
                <option value="idee">Idee</option>
                <option value="gruendung">Gründung</option>
                <option value="aufbau">Aufbau (1 bis 3 Jahre)</option>
                <option value="wachstum">Wachstum (ab 3 Jahren)</option>
              </select>
            </Field>
          </div>
        </div>
      </ToolSection>

      <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
        <span className="font-semibold text-foreground tabular">{filtered.length}</span> von <span className="tabular">{FOERDERPROGRAMME.length}</span> Programmen
      </p>

      <ul className="mb-8 space-y-3">
        {filtered.map((f) => {
          const typeInfo = TYPE_LABELS[f.type];
          return (
            <li key={f.slug} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-[border-color,box-shadow] hover:border-accent-blue/30 hover:shadow-soft md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-3.5">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneSoft(typeInfo.tone)}`}>
                    <typeInfo.Icon className={`h-5 w-5 ${toneText(typeInfo.tone)}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold leading-snug">
                      <a href={f.antragUrl} target="_blank" rel="noreferrer noopener" className="hover:text-accent-blue">
                        {f.name}
                      </a>
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <ToneBadge tone={typeInfo.tone}>{typeInfo.name}</ToneBadge>
                      <ToneBadge>{COUNTRY_LABELS[f.country ?? "DE"] || f.country}</ToneBadge>
                      {(!f.country || f.country === "DE") && <ToneBadge>{BUNDESLAND_NAMES[f.scope] || f.scope}</ToneBadge>}
                      {f.phase.map((p) => (
                        <ToneBadge key={p}>{PHASE_LABELS[p]}</ToneBadge>
                      ))}
                      {f.successRate && <ToneBadge tone="warning">Quote: {f.successRate}</ToneBadge>}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xs text-muted-foreground">Max. Förderung</p>
                  <p className="font-semibold tabular">{f.maxFunding}</p>
                </div>
              </div>
              <p className="mt-4 max-w-[75ch] text-sm leading-relaxed text-foreground/80">{f.description}</p>
              {f.forDeFounder && (
                <Callout tone="success" icon={false} className="mt-3 py-2.5 text-[13px]">
                  <strong className="font-semibold text-foreground">Für DE-Founder:</strong> {f.forDeFounder}
                </Callout>
              )}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-1.5 text-sm font-medium">Zielgruppe</h3>
                  <ul className="list-disc space-y-0.5 pl-4 text-[13px] text-muted-foreground marker:text-border">
                    {f.zielgruppe.map((z, i) => <li key={i}>{z}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-1.5 text-sm font-medium">Bedingungen</h3>
                  <ul className="list-disc space-y-0.5 pl-4 text-[13px] text-muted-foreground marker:text-border">
                    {f.conditions.slice(0, 4).map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
              {f.watchouts && f.watchouts.length > 0 && (
                <Callout tone="warning" title="Darauf achten" className="mt-4 py-3 text-[13px]">
                  <ul className="list-disc space-y-0.5 pl-4">
                    {f.watchouts.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </Callout>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
                {f.notes && f.notes.length > 0 ? (
                  <details className="group text-[13px] text-muted-foreground">
                    <summary className="cursor-pointer list-none font-medium text-foreground hover:text-accent-blue [&::-webkit-details-marker]:hidden">
                      Mehr Details <ChevronDown className="inline h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-2 list-disc space-y-0.5 pl-4">
                      {f.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                  </details>
                ) : <span />}
                <a href={f.antragUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                  Antrag stellen <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      {filtered.length === 0 && (
        <EmptyState
          icon={Search}
          title="Keine Programme passen zu deinen Filtern"
          description="Nimm einen Filter heraus oder such nach einem allgemeineren Begriff."
          action={<Button variant="outline" onClick={zuruecksetzen}>Filter zurücksetzen</Button>}
          className="mb-8"
        />
      )}

      <ToolSection title="Förder-Strategie für Gründer" icon={Lightbulb}>
        <ul className="grid gap-x-8 gap-y-3 text-sm leading-relaxed text-foreground/80 md:grid-cols-2">
          {[
            ["Mehrere Förderungen kombinieren", "Bundes- und Landesförderung sind oft kombinierbar, etwa Stipendium plus KfW-Kredit mit Bürgschaftsbank."],
            ["EXIST, dann Seed-Runde", "Erst EXIST-Stipendium (12 Monate finanzielle Sicherheit), dann mit HTGF oder VC-Seed-Runde skalieren."],
            ["Die Hausbank ist der Schlüssel", "KfW-Kredite werden über die Hausbank beantragt. Wähle eine gründerfreundliche Bank (Volksbanken, Sparkassen mit Gründer-Beauftragten)."],
            ["Bürgschaftsbank zuerst", "Bei wenig Eigenkapital erleichtert eine Bürgschaft der Bürgschaftsbank jeden Bankkredit deutlich."],
            ["EIC Accelerator", "Für Deep-Tech und VC-fähige Startups: Zuschuss unter 2,5 Mio. € plus 1 bis 10 Mio. € Beteiligung, sehr kompetitiv (Ende 2024: 71 von 1.211 Vollanträgen, rund 6 %)."],
            ["Beratungsförderung nutzen", "BAFA-Förderung des unternehmerischen Know-hows bezuschusst Unternehmensberatung zu wirtschaftlichen, finanziellen, personellen und organisatorischen Fragen. Bemessungsgrundlage höchstens 3.500 € Beratungskosten, Zuschuss je nach Region 50 % (alte Bundesländer, Berlin und Region Leipzig) oder 80 % (neue Bundesländer ohne Region Leipzig sowie Regionen Lüneburg und Trier). Die Richtlinie läuft bis 31.12.2026. Überwiegende Rechts- und Steuerberatung ist ausdrücklich nicht förderfähig."],
            ["Antrag vor der Investition", "Bei Zuschüssen und Stipendien gilt: Antrag vor der Geldausgabe. Rückwirkende Förderung gibt es nicht."],
            ["Regionale Programme", "Regionale IHK-Programme und Innovationsgutscheine der Länder für Innovationsberatung sind hier nicht aufgeführt; ein Anruf bei der IHK lohnt sich."],
          ].map(([t, d]) => (
            <li key={t}>
              <strong className="font-semibold text-foreground">{t}.</strong> {d}
            </li>
          ))}
        </ul>
      </ToolSection>

      <Callout tone="warning" title="Stand Mai 2026" className="mt-6">
        Förderhöhen, Zinsen und Bedingungen können sich ändern. Vor dem Antrag immer die aktuellen Konditionen auf der offiziellen
        Programm-Seite (verlinkt) prüfen und ggf. Förderberater (IHK, KfW-Beauftragte) fragen. Größere Datenbank:{" "}
        <a href="https://www.foerderdatenbank.de" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 text-accent-blue hover:underline">
          foerderdatenbank.de <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>{" "}
        (Datenbank des BMWE, 2.500+ Programme).
      </Callout>
    </CockpitShell>
  );
};

export default FoerderungDb;
