import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, ExternalLink, Search, Coins, Globe2, Trophy, ClipboardList, Scale, Tent, type LucideIcon } from "lucide-react";
import { EmptyState, ToneBadge, selectCls } from "@/components/cockpit/kit";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import chancen from "@/data/chancenLive.json";
import { ladeIcsHerunter } from "@/lib/ics";
import { plzZuLand } from "@/lib/plz";
import { cn } from "@/lib/utils";

type Chance = {
  id: string;
  kategorie: "foerderung" | "eu" | "wettbewerb" | "ausschreibung" | "recht" | "messe";
  quelle: string;
  titel: string;
  geber: string;
  url: string;
  frist?: string;
  datum?: string;
  datumBis?: string;
  region: string;
  tags: string[];
  kurz: string;
  entdeckt?: string;
};

const KATEGORIEN: Record<Chance["kategorie"], { name: string; icon: LucideIcon; text: string }> = {
  foerderung: { name: "Förderaufrufe", icon: Coins, text: "Neue Förderbekanntmachungen der Bundesministerien mit Einreichungsfrist." },
  eu: { name: "EU-Calls", icon: Globe2, text: "Offene EU-Ausschreibungen für KMU und Startups: EIC Accelerator, EIT und Startup Europe." },
  wettbewerb: { name: "Wettbewerbe", icon: Trophy, text: "Gründerwettbewerbe mit offener Bewerbungsfrist und Preisgeld, dazu die Challenges der SPRIND." },
  ausschreibung: { name: "Öffentliche Aufträge", icon: ClipboardList, text: "Ausschreibungen von Bund, Ländern und Kommunen für IT, Dienstleistungen und F&E." },
  recht: { name: "Recht & Steuern", icon: Scale, text: "Neue Gesetze, Verordnungen und BMF-Schreiben der letzten 45 Tage für Gründer." },
  messe: { name: "Messen", icon: Tent, text: "Gründer-, Franchise- und Mittelstandsmessen in Deutschland." },
};

const LETZTER_BESUCH = "gx-chancen-radar-besuch";
const daten = chancen as unknown as { stand: string; eintraege: Chance[] };
const de = (iso?: string) => (iso ? iso.split("-").reverse().join(".") : "–");
const tageBis = (iso: string) => Math.ceil((Date.parse(`${iso}T12:00:00Z`) - Date.now()) / 864e5);
const land = (c: Chance) => (/^\d{5}$/.test(c.region) ? plzZuLand(c.region) : c.region);

const ChancenRadar = () => {
  const [kat, setKat] = useState<Chance["kategorie"]>("foerderung");
  const [suche, setSuche] = useState("");
  const [region, setRegion] = useState("");
  const [sichtbar, setSichtbar] = useState(30);
  const [vorher] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LETZTER_BESUCH);
    } catch {
      return null;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(LETZTER_BESUCH, new Date().toISOString().slice(0, 10));
    } catch {
      /* ohne Speicher */
    }
  }, []);
  useEffect(() => setSichtbar(30), [kat, suche, region]);

  const heute = new Date().toISOString().slice(0, 10);
  const aktuell = useMemo(() => daten.eintraege.filter((c) => !c.frist || c.frist >= heute), [heute]);
  const istNeu = (c: Chance) => !!vorher && !!c.entdeckt && c.entdeckt > vorher;
  const anzahl = (k: Chance["kategorie"]) => aktuell.filter((c) => c.kategorie === k).length;
  const neuAnzahl = (k: Chance["kategorie"]) => aktuell.filter((c) => c.kategorie === k && istNeu(c)).length;

  const liste = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return aktuell
      .filter((c) => c.kategorie === kat)
      .filter((c) => !region || kat !== "ausschreibung" || land(c) === region)
      .filter((c) => !q || [c.titel, c.geber, c.kurz, c.tags.join(" ")].some((s) => s.toLowerCase().includes(q)))
      .sort((a, b) =>
        kat === "recht"
          ? (b.datum ?? "").localeCompare(a.datum ?? "")
          : (a.frist ?? a.datum ?? "9999").localeCompare(b.frist ?? b.datum ?? "9999"),
      );
  }, [aktuell, kat, suche, region]);

  const baldCount = useMemo(
    () => aktuell.filter((c) => c.frist && tageBis(c.frist) >= 0 && tageBis(c.frist) <= 14).length,
    [aktuell],
  );

  return (
    <CockpitShell
      eyebrow={`Chancen & Förderung · Stand ${de(daten.stand.slice(0, 10))}`}
      title="Chancen-Radar: Förderung, Wettbewerbe & Aufträge"
      subtitle="Offene Förderaufrufe, EU-Calls, Wettbewerbe mit Preisgeld, öffentliche Aufträge und neue Gesetze mit Fristen aus amtlichen Quellen."
      tabs={[
        { label: "Chancen-Radar", to: "/cockpit/chancen-radar" },
        { label: "Gründer-Chancen", to: "/gruender-chancen" },
        { label: "Startup-Guthaben", to: "/startup-guthaben" },
        { label: "Förder-Datenbank", to: "/cockpit/foerderung" },
      ]}
    >
      {/* Kompakte 3er-KPI-Leiste im Revolut-Stil */}
      <dl className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-white px-4 py-3.5 shadow-card sm:px-5">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Aktuell offen</dt>
          <dd className="mt-1 text-2xl font-bold text-primary tabular">{aktuell.length}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-white px-4 py-3.5 shadow-card sm:px-5">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Frist ≤ 14 Tage</dt>
          <dd className="mt-1 text-2xl font-bold text-danger tabular">{baldCount}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-white px-4 py-3.5 shadow-card sm:px-5">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">In dieser Rubrik</dt>
          <dd className="mt-1 text-2xl font-bold text-brand-green tabular">{liste.length}</dd>
        </div>
      </dl>

      {/* Ruhige Revolut-Rubriken- & Such-Karte */}
      <section aria-label="Rubrik und Suche" className="mb-6 rounded-2xl border border-border bg-white p-4 shadow-card sm:p-5">
        <div role="group" aria-label="Rubrik" className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:pb-0">
          {(Object.keys(KATEGORIEN) as Chance["kategorie"][]).map((k) => {
            const K = KATEGORIEN[k];
            const aktiv = kat === k;
            const nNeu = neuAnzahl(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={aktiv}
                onClick={() => setKat(k)}
                className={cn(
                  "press inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-[13px]",
                  aktiv
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary/60 text-foreground/80 hover:bg-accent hover:text-primary",
                )}
              >
                <K.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{K.name}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[11px] tabular",
                    aktiv ? "bg-white/20 text-white" : "bg-white text-muted-foreground",
                  )}
                >
                  {anzahl(k)}
                </span>
                {nNeu > 0 && (
                  <span className="rounded-md bg-brand-green px-1.5 py-0.5 text-[10px] font-bold text-white tabular">
                    +{nNeu}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{KATEGORIEN[kat].text}</p>

        <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <label htmlFor="chancen-suche" className="sr-only">Suche</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="chancen-suche"
              type="search"
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              placeholder="Suche: KI, Webseite, Gesundheit, Umsatzsteuer …"
              className="h-11 rounded-xl bg-secondary/35 pl-10 focus:bg-white"
            />
          </div>
          {kat === "ausschreibung" && (
            <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Bundesland" className={selectCls}>
              <option value="">Alle Bundesländer</option>
              {Object.entries(BUNDESLAND_NAMES)
                .filter(([k2]) => k2 !== "bund")
                .map(([k2, n]) => (
                  <option key={k2} value={k2}>
                    {n}
                  </option>
                ))}
            </select>
          )}
        </div>
      </section>

      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-base font-bold tracking-tight text-primary sm:text-lg">{KATEGORIEN[kat].name}</h2>
        <span className="text-xs font-semibold text-muted-foreground tabular">{liste.length} Treffer</span>
      </div>

      <ul className="space-y-3">
        {liste.slice(0, sichtbar).map((c) => {
          const t = c.frist ? tageBis(c.frist) : null;
          const dringend = t !== null && t <= 14;
          return (
            <li
              key={c.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-white p-4 pl-5 shadow-card transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-soft md:p-5 md:pl-6",
                istNeu(c) ? "border-primary/40" : "border-border",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-1",
                  dringend ? "bg-danger" : c.frist ? "bg-brand-green" : "bg-primary/40",
                )}
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <a href={c.url} target="_blank" rel="noreferrer noopener" className="text-[15px] font-bold leading-snug text-primary hover:text-accent-blue">
                    {c.titel}
                  </a>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                    {c.geber}
                    {land(c) && BUNDESLAND_NAMES[land(c) as string] ? ` · ${BUNDESLAND_NAMES[land(c) as string]}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
                  {istNeu(c) && <ToneBadge tone="info">Neu</ToneBadge>}
                  {t !== null ? (
                    <span
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-[11px] font-bold tabular",
                        dringend ? "bg-danger-soft text-danger" : "bg-brand-green-soft text-brand-green",
                      )}
                    >
                      {t <= 0 ? "Frist heute" : `noch ${t} Tage`}
                    </span>
                  ) : (
                    <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground tabular">
                      {de(c.datum)}
                      {c.datumBis ? ` bis ${de(c.datumBis)}` : ""}
                    </span>
                  )}
                </div>
              </div>
              {c.kurz && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.kurz}</p>}
              {c.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border/60 pt-2.5 text-xs">
                {c.frist && <span className="font-semibold text-foreground tabular">Frist {de(c.frist)}</span>}
                <div className="ml-auto flex flex-wrap items-center gap-3">
                  {(c.frist || c.datum) && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary"
                      onClick={() =>
                        ladeIcsHerunter(
                          {
                            uid: c.id,
                            titel: c.frist ? `Frist: ${c.titel}` : c.titel,
                            start: (c.frist ?? c.datum)!,
                            ende: c.frist ? undefined : c.datumBis,
                            beschreibung: c.geber,
                            url: c.url,
                            erinnerungTage: c.frist ? 7 : 1,
                          },
                          c.titel,
                        )
                      }
                    >
                      <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" /> Kalender
                    </button>
                  )}
                  <a href={c.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
                    Zur Quelle ({c.quelle}) <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!liste.length && (
        <EmptyState
          icon={Search}
          title={`Gerade nichts in dieser Rubrik${suche ? " zu deiner Suche" : ""}.`}
          description="Nimm den Suchbegriff heraus oder wechsle die Rubrik. Die Liste wird täglich aktualisiert."
        />
      )}

      {liste.length > sichtbar && (
        <div className="mt-5 text-center">
          <Button variant="outline" className="rounded-xl bg-white" onClick={() => setSichtbar((n) => n + 50)}>
            Weitere {Math.min(50, liste.length - sichtbar)} anzeigen
          </Button>
        </div>
      )}

      <p className="mt-8 rounded-2xl border border-border bg-white p-4 text-xs leading-relaxed text-muted-foreground md:p-5">
        Quellen: Förderberatung des Bundes (foerderinfo.bund.de), EU Funding &amp; Tenders Portal, fuer-gruender.de, SPRIND,
        service.bund.de, Bundesgesetzblatt, Bundesfinanzministerium, messen.de. Fristen immer beim Ausschreibenden prüfen.
        Passende Programme mit Konditionen:{" "}
        <Link to="/cockpit/foerderung" className="font-semibold text-accent-blue hover:underline">
          Förder-Datenbank
        </Link>
        , Credits und Gratis-Monate von Anbietern:{" "}
        <Link to="/startup-guthaben" className="font-semibold text-accent-blue hover:underline">
          Startup-Guthaben
        </Link>
        .
      </p>
    </CockpitShell>
  );
};

export default ChancenRadar;
