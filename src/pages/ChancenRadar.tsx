import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, ExternalLink, Search, Coins, Globe2, Trophy, ClipboardList, Scale, Tent, Radar, type LucideIcon } from "lucide-react";
import { ToolSection, EmptyState, ToneBadge, selectCls } from "@/components/cockpit/kit";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import chancen from "@/data/chancenLive.json";
import { ladeIcsHerunter } from "@/lib/ics";
import { plzZuLand } from "@/lib/plz";

// Chancen-Radar: Förderaufrufe (Bund), EU-Calls, Gründerwettbewerbe/Challenges,
// öffentliche Ausschreibungen, Rechts-/Steueränderungen und Messen – täglich
// aktualisiert von scripts/sync-chancen.mjs.

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
  eu: { name: "EU-Calls", icon: Globe2, text: "Offene EU-Ausschreibungen für KMU und Startups – EIC Accelerator, EIT, Startup Europe." },
  wettbewerb: { name: "Wettbewerbe & Challenges", icon: Trophy, text: "Gründerwettbewerbe mit offener Bewerbungsfrist und Preisgeld, dazu die Challenges der SPRIND." },
  ausschreibung: { name: "Aufträge der öffentlichen Hand", icon: ClipboardList, text: "Ausschreibungen von Bund, Ländern und Kommunen für IT, Dienstleistungen und F&E – mit Angebotsfrist und Erfüllungsort." },
  recht: { name: "Recht & Steuern", icon: Scale, text: "Neue Gesetze, Verordnungen und BMF-Schreiben der letzten 45 Tage, gefiltert auf Gründer-Themen." },
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
      .sort((a, b) => (kat === "recht" ? (b.datum ?? "").localeCompare(a.datum ?? "") : (a.frist ?? a.datum ?? "9999").localeCompare(b.frist ?? b.datum ?? "9999")));
  }, [aktuell, kat, suche, region]);

  return (
    <CockpitShell
      eyebrow={`Chancen-Radar · täglich aktualisiert, Stand ${de(daten.stand.slice(0, 10))}`}
      title="Chancen-Radar: Förderung, Wettbewerbe, Aufträge"
      subtitle="Was sich für Gründer gerade lohnt: offene Förderaufrufe, EU-Calls, Wettbewerbe mit Preisgeld, Aufträge der öffentlichen Hand, neue Gesetze und Messen, mit Fristen, täglich aus amtlichen und offenen Quellen."
    >
      <ToolSection title="Rubrik wählen" icon={Radar} description={KATEGORIEN[kat].text}>
        <div role="group" aria-label="Rubrik" className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {(Object.keys(KATEGORIEN) as Chance["kategorie"][]).map((k) => {
            const K = KATEGORIEN[k];
            const aktiv = kat === k;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={aktiv}
                onClick={() => setKat(k)}
                className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-[background-color,border-color] duration-200 active:translate-y-px ${
                  aktiv ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                <K.icon className={`mt-0.5 h-4 w-4 shrink-0 ${aktiv ? "text-brand-green-glow" : "text-accent-blue"}`} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug">{K.name}</span>
                  <span className={`mt-0.5 flex flex-wrap items-center gap-1.5 text-xs tabular ${aktiv ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                    {anzahl(k)} offen
                    {neuAnzahl(k) > 0 && (
                      <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${aktiv ? "bg-white/15 text-primary-foreground" : "bg-info-soft text-info"}`}>
                        {neuAnzahl(k)} neu
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <label htmlFor="chancen-suche" className="sr-only">Suche</label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="chancen-suche" type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suche: KI, Webseite, Gesundheit, Umsatzsteuer …" className="pl-9" />
          </div>
          {kat === "ausschreibung" && (
            <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Bundesland" className={selectCls}>
              <option value="">Alle Bundesländer</option>
              {Object.entries(BUNDESLAND_NAMES).filter(([k2]) => k2 !== "bund").map(([k2, n]) => <option key={k2} value={k2}>{n}</option>)}
            </select>
          )}
        </div>
      </ToolSection>

      <div className="mb-3 mt-8 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">{KATEGORIEN[kat].name}</h2>
        <span className="text-sm text-muted-foreground tabular">{liste.length} Treffer</span>
      </div>

      <ul className="space-y-3">
        {liste.slice(0, sichtbar).map((c) => {
          const t = c.frist ? tageBis(c.frist) : null;
          return (
            <li key={c.id} className={`rounded-xl border bg-card p-4 transition-shadow hover:shadow-card md:p-5 ${istNeu(c) ? "border-accent-blue/40" : "border-border"}`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <a href={c.url} target="_blank" rel="noreferrer noopener" className="font-semibold leading-snug hover:text-accent-blue">
                    {c.titel}
                  </a>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {c.geber}
                    {land(c) && BUNDESLAND_NAMES[land(c) as string] ? `, ${BUNDESLAND_NAMES[land(c) as string]}` : ""}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
                  {istNeu(c) && <ToneBadge tone="info">Neu</ToneBadge>}
                  {t !== null ? (
                    <ToneBadge tone={t <= 14 ? "danger" : "success"}>{t <= 0 ? "Frist heute" : `noch ${t} Tage`}</ToneBadge>
                  ) : (
                    <span className="text-xs text-muted-foreground tabular">{de(c.datum)}{c.datumBis ? ` bis ${de(c.datumBis)}` : ""}</span>
                  )}
                </div>
              </div>
              {c.kurz && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.kurz}</p>}
              {c.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                {c.frist && <span className="font-medium text-foreground tabular">Frist {de(c.frist)}</span>}
                <a href={c.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                  Zur Quelle ({c.quelle}) <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                {(c.frist || c.datum) && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline"
                    onClick={() => ladeIcsHerunter({ uid: c.id, titel: c.frist ? `Frist: ${c.titel}` : c.titel, start: (c.frist ?? c.datum)!, ende: c.frist ? undefined : c.datumBis, beschreibung: c.geber, url: c.url, erinnerungTage: c.frist ? 7 : 1 }, c.titel)}
                  >
                    <CalendarPlus className="h-3 w-3" aria-hidden="true" /> In den Kalender
                  </button>
                )}
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
          <Button variant="outline" onClick={() => setSichtbar((n) => n + 50)}>Weitere {Math.min(50, liste.length - sichtbar)} anzeigen</Button>
        </div>
      )}
      <p className="mt-10 rounded-xl border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground md:p-5">
        Quellen: Förderberatung des Bundes (foerderinfo.bund.de), EU Funding & Tenders Portal, fuer-gruender.de, SPRIND, service.bund.de,
        Bundesgesetzblatt, Bundesfinanzministerium, messen.de. Fristen immer beim Ausschreibenden prüfen. Passende Programme
        mit Konditionen: <Link to="/cockpit/foerderung" className="text-accent-blue hover:underline">Förder-Datenbank</Link>, Gründer-Events:{" "}
        <Link to="/cockpit/event-radar" className="text-accent-blue hover:underline">Event-Radar</Link>, Credits und Gratis-Monate von Anbietern:{" "}
        <Link to="/startup-guthaben" className="text-accent-blue hover:underline">Startup-Guthaben</Link>.
      </p>
    </CockpitShell>
  );
};

export default ChancenRadar;
