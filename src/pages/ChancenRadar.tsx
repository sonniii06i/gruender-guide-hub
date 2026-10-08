import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, ExternalLink, Search } from "lucide-react";
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

const KATEGORIEN: Record<Chance["kategorie"], { name: string; emoji: string; text: string }> = {
  foerderung: { name: "Förderaufrufe", emoji: "💶", text: "Neue Förderbekanntmachungen der Bundesministerien mit Einreichungsfrist." },
  eu: { name: "EU-Calls", emoji: "🇪🇺", text: "Offene EU-Ausschreibungen für KMU und Startups – EIC Accelerator, EIT, Startup Europe." },
  wettbewerb: { name: "Wettbewerbe & Challenges", emoji: "🏆", text: "Gründerwettbewerbe mit offener Bewerbungsfrist und Preisgeld, dazu die Challenges der SPRIND." },
  ausschreibung: { name: "Aufträge der öffentlichen Hand", emoji: "📋", text: "Ausschreibungen von Bund, Ländern und Kommunen für IT, Dienstleistungen und F&E – mit Angebotsfrist und Erfüllungsort." },
  recht: { name: "Recht & Steuern", emoji: "⚖️", text: "Neue Gesetze, Verordnungen und BMF-Schreiben der letzten 45 Tage, gefiltert auf Gründer-Themen." },
  messe: { name: "Messen", emoji: "🎪", text: "Gründer-, Franchise- und Mittelstandsmessen in Deutschland." },
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
      eyebrow={`Chancen-Radar · täglich aktualisiert · Stand ${de(daten.stand.slice(0, 10))}`}
      title="Chancen-Radar: Förderung, Wettbewerbe, Aufträge"
      subtitle="Was sich für Gründer gerade lohnt: offene Förderaufrufe, EU-Calls, Wettbewerbe mit Preisgeld, Aufträge der öffentlichen Hand, neue Gesetze und Messen – mit Fristen, täglich aus amtlichen und offenen Quellen."
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(KATEGORIEN) as Chance["kategorie"][]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKat(k)}
            className={`rounded-full px-3.5 py-2 text-sm font-semibold inline-flex items-center gap-1.5 ${kat === k ? "bg-accent-blue text-primary-foreground" : "border border-border bg-card hover:bg-secondary"}`}
          >
            {KATEGORIEN[k].emoji} {KATEGORIEN[k].name} <span className="opacity-70">({anzahl(k)})</span>
            {neuAnzahl(k) > 0 && <span className="rounded-full bg-red-500 text-white text-[10px] px-1.5">{neuAnzahl(k)} neu</span>}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{KATEGORIEN[kat].text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-2 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suche: KI, Webseite, Gesundheit, Umsatzsteuer …" className="pl-9" />
        </div>
        {kat === "ausschreibung" && (
          <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Bundesland" className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Alle Bundesländer</option>
            {Object.entries(BUNDESLAND_NAMES).filter(([k2]) => k2 !== "bund").map(([k2, n]) => <option key={k2} value={k2}>{n}</option>)}
          </select>
        )}
      </div>

      <div className="space-y-2.5">
        {liste.slice(0, sichtbar).map((c) => {
          const t = c.frist ? tageBis(c.frist) : null;
          return (
            <div key={c.id} className={`rounded-xl border bg-card p-4 ${istNeu(c) ? "border-accent-blue/50" : "border-border"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={c.url} target="_blank" rel="noreferrer noopener" className="font-semibold leading-snug hover:text-accent-blue">
                    {c.titel}
                  </a>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {c.geber}
                    {land(c) && BUNDESLAND_NAMES[land(c) as string] ? ` · ${BUNDESLAND_NAMES[land(c) as string]}` : ""}
                    {c.tags.length ? ` · ${c.tags.join(" · ")}` : ""}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {istNeu(c) && <span className="rounded-full bg-accent-blue text-primary-foreground px-2 py-0.5 text-[10px] font-bold mr-1">NEU</span>}
                  {t !== null ? (
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t <= 14 ? "bg-red-500/10 text-red-700" : "bg-emerald-500/10 text-emerald-700"}`}>
                      {t <= 0 ? "Frist heute" : `noch ${t} Tage`}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{de(c.datum)}{c.datumBis ? `–${de(c.datumBis)}` : ""}</span>
                  )}
                </div>
              </div>
              {c.kurz && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{c.kurz}</p>}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px]">
                {c.frist && <span className="text-muted-foreground">Frist {de(c.frist)}</span>}
                <a href={c.url} target="_blank" rel="noreferrer noopener" className="text-accent-blue inline-flex items-center gap-1 hover:underline">Zur Quelle ({c.quelle}) <ExternalLink className="h-3 w-3" /></a>
                {(c.frist || c.datum) && (
                  <button
                    type="button"
                    className="text-accent-blue inline-flex items-center gap-1 hover:underline"
                    onClick={() => ladeIcsHerunter({ uid: c.id, titel: c.frist ? `Frist: ${c.titel}` : c.titel, start: (c.frist ?? c.datum)!, ende: c.frist ? undefined : c.datumBis, beschreibung: c.geber, url: c.url, erinnerungTage: c.frist ? 7 : 1 }, c.titel)}
                  >
                    <CalendarPlus className="h-3 w-3" /> In den Kalender
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {!liste.length && <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Gerade nichts in dieser Rubrik{suche ? " zu deiner Suche" : ""}.</div>}
      </div>
      {liste.length > sichtbar && (
        <div className="text-center mt-4">
          <Button variant="outline" onClick={() => setSichtbar((n) => n + 50)}>Weitere {Math.min(50, liste.length - sichtbar)} anzeigen</Button>
        </div>
      )}
      <div className="rounded-2xl border border-border bg-card p-4 mt-8 text-xs leading-relaxed text-muted-foreground">
        Quellen: Förderberatung des Bundes (foerderinfo.bund.de), EU Funding & Tenders Portal, fuer-gruender.de, SPRIND, service.bund.de,
        Bundesgesetzblatt, Bundesfinanzministerium, messen.de. Fristen immer beim Ausschreibenden prüfen. Passende Programme
        mit Konditionen: <Link to="/cockpit/foerderung" className="text-accent-blue hover:underline">Förder-Datenbank</Link>, Gründer-Events:{" "}
        <Link to="/cockpit/event-radar" className="text-accent-blue hover:underline">Event-Radar</Link>, Credits und Gratis-Monate von Anbietern:{" "}
        <Link to="/startup-guthaben" className="text-accent-blue hover:underline">Startup-Guthaben</Link>.
      </div>
    </CockpitShell>
  );
};

export default ChancenRadar;
