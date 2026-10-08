import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CalendarPlus, ExternalLink, MapPin, Settings2, Sparkles, Star, Timer, Wifi } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import { ART_LABELS, FRIST_LABELS, GRUENDER_FRISTEN, aktuelleEvents, type EventArt, type GruenderEvent } from "@/data/gruenderEvents";
import { STANDARD_EINSTELLUNGEN, istNeu, ladeRadar, passt, speichereRadar, type RadarEinstellungen, type RadarZustand } from "@/lib/eventRadar";
import { baueIcs, ladeIcsHerunter } from "@/lib/ics";
import { plzZuLand } from "@/lib/plz";

const tagLabel = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "short" });
const plusTage = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);

const RadarKarte = ({ e, neu, gemerkt, merken }: { e: GruenderEvent; neu: boolean; gemerkt: boolean; merken: () => void }) => {
  const art = ART_LABELS[e.art];
  return (
    <div className={`rounded-xl border bg-card p-3 flex gap-3 ${neu ? "border-accent-blue/50 shadow-soft" : "border-border"}`}>
      <div className="w-14 shrink-0 text-center rounded-lg bg-secondary/70 py-1.5">
        <div className="text-[10px] uppercase text-muted-foreground">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short" })}</div>
        <div className="text-lg font-bold leading-none">{e.datum!.slice(8, 10)}</div>
        <div className="text-[10px] uppercase text-muted-foreground">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { month: "short" })}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <a href={e.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-sm leading-snug hover:text-accent-blue flex-1">
            {e.name}
          </a>
          {neu && <span className="shrink-0 rounded-full bg-accent-blue text-primary-foreground px-2 py-0.5 text-[10px] font-bold">NEU</span>}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1.5 text-[10px]">
          <span className={`rounded-full px-2 py-0.5 font-semibold ${art.color}`}>{art.emoji} {art.name}</span>
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 inline-flex items-center gap-1">
            {e.format === "online" ? <Wifi className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} {e.format === "online" ? "Online" : e.ort}
          </span>
          {e.dauer && <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 inline-flex items-center gap-1"><Timer className="h-3 w-3" /> {e.dauer}</span>}
          {e.kostenlos && <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 font-semibold">kostenlos</span>}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1 truncate">{e.veranstalter}</div>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button type="button" onClick={merken} aria-label={gemerkt ? "Von der Merkliste nehmen" : "Merken"} className={`p-1.5 rounded-md hover:bg-secondary ${gemerkt ? "text-amber-500" : "text-muted-foreground"}`}>
          <Star className="h-4 w-4" fill={gemerkt ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          aria-label="In den Kalender"
          onClick={() => ladeIcsHerunter({ uid: e.slug, titel: e.name, start: e.datum!, ende: e.datumBis, ort: e.format === "online" ? "Online" : e.ort, beschreibung: e.veranstalter, url: e.url }, e.name)}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground"
        >
          <CalendarPlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const EventRadar = () => {
  const { user } = useAuth();
  const heute = new Date().toISOString().slice(0, 10);
  const [z, setZ] = useState<RadarZustand>(ladeRadar);
  const [entwurf, setEntwurf] = useState<RadarEinstellungen>(z.einstellungen ?? STANDARD_EINSTELLUNGEN);
  const [einrichten, setEinrichten] = useState(!z.einstellungen);
  // Der Besuch, mit dem „neu“ verglichen wird – fest für diese Sitzung, damit die Markierung beim Lesen nicht verschwindet.
  const [vorherigerBesuch] = useState(z.letzterBesuch);
  const [sichtbar, setSichtbar] = useState<Record<string, number>>({});

  // Region beim ersten Einrichten aus der Profil-PLZ vorschlagen.
  useEffect(() => {
    if (z.einstellungen || !user) return;
    supabase.from("profiles").select("postal_code").eq("id", user.id).maybeSingle().then(({ data }) => {
      const land = plzZuLand(data?.postal_code);
      if (land) setEntwurf((x) => ({ ...x, region: x.region ?? land }));
    });
  }, [user, z.einstellungen]);

  // Besuch merken (nur wenn eingerichtet).
  useEffect(() => {
    if (!z.einstellungen || z.letzterBesuch === heute) return;
    const neu = { ...z, letzterBesuch: heute };
    speichereRadar(neu);
  }, [z, heute]);

  const alle = useMemo(() => aktuelleEvents(heute).filter((e) => e.datum), [heute]);
  const s = z.einstellungen ?? entwurf;
  const treffer = useMemo(() => alle.filter((e) => passt(e, s)).sort((a, b) => a.datum!.localeCompare(b.datum!)), [alle, s]);
  const neu = treffer.filter((e) => istNeu(e, vorherigerBesuch, heute));
  const woche = treffer.filter((e) => e.datum! <= plusTage(heute, 7));
  const spaeter = treffer.filter((e) => e.datum! > plusTage(heute, 7) && e.datum! <= plusTage(heute, 45));
  const gemerkt = alle.filter((e) => z.gemerkt.includes(e.slug));
  const fristen = GRUENDER_FRISTEN.filter((f) => f.frist && f.frist >= heute && f.frist <= plusTage(heute, 45) && (f.region === "bund" || !s.region || f.region === s.region)).sort((a, b) => a.frist!.localeCompare(b.frist!));

  const merken = (slug: string) => {
    const neuZ = { ...z, gemerkt: z.gemerkt.includes(slug) ? z.gemerkt.filter((x) => x !== slug) : [...z.gemerkt, slug] };
    setZ(neuZ);
    speichereRadar(neuZ);
  };
  const sichern = () => {
    const neuZ = { ...z, einstellungen: entwurf, letzterBesuch: z.letzterBesuch ?? heute };
    setZ(neuZ);
    speichereRadar(neuZ);
    setEinrichten(false);
  };
  const merklisteExport = () => {
    const blob = new Blob([baueIcs(gemerkt.map((e) => ({ uid: e.slug, titel: e.name, start: e.datum!, ende: e.datumBis, ort: e.format === "online" ? "Online" : e.ort, beschreibung: e.veranstalter, url: e.url, erinnerungTage: 1 })), "Meine Gründer-Events")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meine-gruender-events.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const Liste = ({ id, titel, liste, leer }: { id: string; titel: string; liste: GruenderEvent[]; leer: string }) => {
    const n = sichtbar[id] ?? 25;
    return (
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{titel} <span className="text-foreground">({liste.length})</span></h2>
        {liste.length ? (
          <>
            <div className="space-y-2">
              {liste.slice(0, n).map((e) => <RadarKarte key={e.slug} e={e} neu={istNeu(e, vorherigerBesuch, heute)} gemerkt={z.gemerkt.includes(e.slug)} merken={() => merken(e.slug)} />)}
            </div>
            {liste.length > n && (
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setSichtbar((x) => ({ ...x, [id]: n + 50 }))}>
                Weitere {Math.min(50, liste.length - n)} anzeigen
              </Button>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border p-4">{leer}</p>
        )}
      </div>
    );
  };

  return (
    <CockpitShell
      eyebrow="Event-Radar · täglich aktualisiert"
      title="Dein Event-Radar"
      subtitle="Gründerabende, Hackathons, KI-Meetups und Fristen – gefiltert auf deine Region und Interessen. Was seit deinem letzten Besuch dazugekommen ist, ist markiert."
    >
      {/* Kopf: Zusammenfassung */}
      <div className="rounded-3xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 md:p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-accent-blue text-xs font-semibold uppercase tracking-wider"><Bell className="h-4 w-4" /> {s.region ? BUNDESLAND_NAMES[s.region] : "Ganz Deutschland"}{s.online ? " + online" : ""}</div>
            <div className="text-3xl font-bold mt-1">{neu.length} neu <span className="text-base font-normal text-muted-foreground">· {treffer.length} passende Events · {fristen.length} Fristen bald</span></div>
            <p className="text-xs text-muted-foreground mt-1">
              {vorherigerBesuch
                ? `Neu seit deinem letzten Besuch am ${vorherigerBesuch.split("-").reverse().join(".")}.`
                : "Ab jetzt markiert das Radar alles, was der Monitor neu findet – beim nächsten Besuch siehst du es oben und in der Seitenleiste."}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEinrichten((x) => !x)}>
            <Settings2 className="h-4 w-4 mr-2" /> {einrichten ? "Schließen" : "Radar einstellen"}
          </Button>
        </div>

        {einrichten && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-5">
            <div>
              <Label className="text-xs">Region</Label>
              <select value={entwurf.region ?? ""} onChange={(e) => setEntwurf((x) => ({ ...x, region: e.target.value || null }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Ganz Deutschland</option>
                {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => <option key={k} value={k}>{n}</option>)}
              </select>
              <Label className="text-xs mt-3 block">Stichworte (optional, mit Komma getrennt)</Label>
              <Input value={entwurf.stichworte} onChange={(e) => setEntwurf((x) => ({ ...x, stichworte: e.target.value }))} placeholder="z. B. KI, E-Commerce, Förderung" className="mt-1" />
              <div className="flex flex-col gap-1.5 mt-3 text-sm">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={entwurf.online} onChange={(e) => setEntwurf((x) => ({ ...x, online: e.target.checked }))} /> Online-Events einbeziehen</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={entwurf.nurKostenlos} onChange={(e) => setEntwurf((x) => ({ ...x, nurKostenlos: e.target.checked }))} /> Nur kostenlose</label>
              </div>
            </div>
            <div>
              <Label className="text-xs">Was interessiert dich?</Label>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {(Object.keys(ART_LABELS) as EventArt[]).map((a) => (
                  <label key={a} className={`rounded-lg border px-2.5 py-2 text-xs cursor-pointer ${entwurf.arten.includes(a) ? "border-accent-blue bg-accent-blue/5" : "border-border"}`}>
                    <input
                      type="checkbox"
                      className="mr-1.5 align-middle"
                      checked={entwurf.arten.includes(a)}
                      onChange={(e) => setEntwurf((x) => ({ ...x, arten: e.target.checked ? [...x.arten, a] : x.arten.filter((y) => y !== a) }))}
                    />
                    {ART_LABELS[a].emoji} {ART_LABELS[a].name}
                  </label>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={sichern} disabled={!entwurf.arten.length}>Radar speichern</Button>
              <p className="text-[11px] text-muted-foreground mt-2">Die Einstellungen und deine Merkliste bleiben in diesem Browser gespeichert.</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-8">
          {neu.length > 0 && (
            <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
              <h2 className="font-bold mb-3 inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent-blue" /> Neu für dich</h2>
              <div className="space-y-2">
                {neu.slice(0, 12).map((e) => <RadarKarte key={e.slug} e={e} neu gemerkt={z.gemerkt.includes(e.slug)} merken={() => merken(e.slug)} />)}
              </div>
              {neu.length > 12 && <p className="text-xs text-muted-foreground mt-2">… und {neu.length - 12} weitere unten in der Liste.</p>}
            </div>
          )}
          <Liste id="woche" titel="Die nächsten 7 Tage" liste={woche} leer="In den nächsten 7 Tagen nichts Passendes – schau weiter unten oder erweitere dein Radar." />
          <Liste id="spaeter" titel="Danach (bis 45 Tage)" liste={spaeter} leer="Nichts Passendes im Zeitraum." />
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-sm inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-500" fill="currentColor" /> Merkliste ({gemerkt.length})</h2>
              {gemerkt.length > 0 && (
                <button type="button" onClick={merklisteExport} className="text-[11px] text-accent-blue hover:underline inline-flex items-center gap-1"><CalendarPlus className="h-3 w-3" /> alle in den Kalender</button>
              )}
            </div>
            {gemerkt.length ? (
              <ul className="space-y-1.5 text-xs">
                {gemerkt.map((e) => (
                  <li key={e.slug} className="flex gap-2">
                    <span className="w-16 shrink-0 text-muted-foreground">{tagLabel(e.datum!)}</span>
                    <a href={e.url} target="_blank" rel="noreferrer noopener" className="hover:text-accent-blue flex-1">{e.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Markiere Events mit dem Stern – sie landen hier und lassen sich gesammelt in den Kalender übernehmen.</p>
            )}
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <h2 className="font-bold text-sm mb-2">⏳ Fristen in den nächsten 45 Tagen</h2>
            {fristen.length ? (
              <ul className="space-y-2 text-xs">
                {fristen.map((f) => (
                  <li key={f.slug}>
                    <a href={f.url} target="_blank" rel="noreferrer noopener" className="font-medium hover:text-accent-blue inline-flex items-center gap-1">{f.name} <ExternalLink className="h-3 w-3" /></a>
                    <div className="text-muted-foreground">bis {f.frist!.split("-").reverse().join(".")} · {FRIST_LABELS[f.art].name}{f.preis ? ` · ${f.preis}` : ""}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Gerade keine Frist in deiner Region.</p>
            )}
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-xs space-y-2">
            <div className="font-bold text-sm">Mehr</div>
            <Link to="/gruender-events" className="block text-accent-blue hover:underline">Alle Gründer-Events & Kalender-Abos →</Link>
            <Link to="/hackathon-starter-kit" className="block text-accent-blue hover:underline">Hackathon-Starter-Kit →</Link>
            <Link to="/cockpit/pitch-deck" className="block text-accent-blue hover:underline">Pitch-Deck für Wettbewerbe →</Link>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default EventRadar;
