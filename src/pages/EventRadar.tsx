import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bell, CalendarPlus, CalendarSearch, ExternalLink, Hourglass, MapPin, Settings2, Sparkles, Star, Timer, Wifi } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState, Field, ToneBadge, ToolSection, selectCls } from "@/components/cockpit/kit";
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
    <div className={`flex gap-3 rounded-xl border bg-card p-3 transition-[border-color,box-shadow] hover:shadow-card sm:gap-4 sm:p-4 ${neu ? "border-accent-blue/40" : "border-border"}`}>
      <div className="w-14 shrink-0 rounded-lg bg-secondary/70 py-1.5 text-center">
        <div className="text-[11px] text-muted-foreground">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short" })}</div>
        <div className="text-lg font-semibold leading-tight tabular">{e.datum!.slice(8, 10)}</div>
        <div className="text-[11px] text-muted-foreground">{new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { month: "short" })}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <a href={e.url} target="_blank" rel="noreferrer noopener" className="flex-1 text-sm font-semibold leading-snug hover:text-accent-blue">
            {e.name}
          </a>
          {neu && <ToneBadge tone="accent" className="shrink-0">Neu</ToneBadge>}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-md bg-accent px-1.5 py-0.5 font-medium text-accent-foreground">{art.name}</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-muted-foreground">
            {e.format === "online" ? <Wifi className="h-3 w-3" aria-hidden="true" /> : <MapPin className="h-3 w-3" aria-hidden="true" />} {e.format === "online" ? "Online" : e.ort}
          </span>
          {e.dauer && (
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-muted-foreground">
              <Timer className="h-3 w-3" aria-hidden="true" /> {e.dauer}
            </span>
          )}
          {e.kostenlos && <ToneBadge tone="success">kostenlos</ToneBadge>}
        </div>
        <div className="mt-1.5 truncate text-xs text-muted-foreground">{e.veranstalter}</div>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        <button
          type="button"
          onClick={merken}
          aria-label={gemerkt ? "Von der Merkliste nehmen" : "Merken"}
          className={`rounded-md p-1.5 transition-colors hover:bg-secondary ${gemerkt ? "text-warning" : "text-muted-foreground"}`}
        >
          <Star className="h-4 w-4" fill={gemerkt ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          aria-label="In den Kalender"
          onClick={() => ladeIcsHerunter({ uid: e.slug, titel: e.name, start: e.datum!, ende: e.datumBis, ort: e.format === "online" ? "Online" : e.ort, beschreibung: e.veranstalter, url: e.url }, e.name)}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
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
      <section>
        <h2 className="mb-3 flex items-baseline gap-2 text-base font-semibold tracking-tight">
          {titel} <span className="text-sm font-normal text-muted-foreground tabular">{liste.length}</span>
        </h2>
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
          <EmptyState icon={CalendarSearch} title="Keine Treffer" description={leer} className="py-8" />
        )}
      </section>
    );
  };

  return (
    <CockpitShell
      eyebrow="Event-Radar · täglich aktualisiert"
      title="Dein Event-Radar"
      subtitle="Gründerabende, Hackathons, KI-Meetups und Fristen, gefiltert auf deine Region und Interessen. Was seit deinem letzten Besuch dazugekommen ist, ist markiert."
      actions={
        <Button variant="outline" onClick={() => setEinrichten((x) => !x)}>
          <Settings2 className="h-4 w-4" /> {einrichten ? "Schließen" : "Radar einstellen"}
        </Button>
      }
    >
      {/* Kopf: Zusammenfassung */}
      <section className="mb-6 rounded-2xl border border-border bg-card shadow-card" aria-live="polite">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="bg-card p-5">
            <p className="flex items-center gap-1.5 text-sm font-medium text-accent-blue">
              <Bell className="h-4 w-4" aria-hidden="true" /> {s.region ? BUNDESLAND_NAMES[s.region] : "Ganz Deutschland"}
              {s.online ? " + online" : ""}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {vorherigerBesuch
                ? `Neu seit deinem letzten Besuch am ${vorherigerBesuch.split("-").reverse().join(".")}.`
                : "Ab jetzt markiert das Radar alles, was der Monitor neu findet. Beim nächsten Besuch siehst du es oben und in der Seitenleiste."}
            </p>
          </div>
          {[
            { n: neu.length, l: "neu" },
            { n: treffer.length, l: "passende Events" },
            { n: fristen.length, l: "Fristen bald" },
          ].map((k) => (
            <div key={k.l} className="bg-card p-5">
              <div className="text-3xl font-semibold tracking-tight tabular">{k.n}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{k.l}</div>
            </div>
          ))}
        </div>

        {einrichten && (
          <div className="grid grid-cols-1 gap-6 border-t border-border p-5 md:grid-cols-2 md:p-6">
            <div className="space-y-4">
              <Field label="Region" htmlFor="radar-region">
                <select id="radar-region" value={entwurf.region ?? ""} onChange={(e) => setEntwurf((x) => ({ ...x, region: e.target.value || null }))} className={selectCls}>
                  <option value="">Ganz Deutschland</option>
                  {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => <option key={k} value={k}>{n}</option>)}
                </select>
              </Field>
              <Field label="Stichworte" hint="Optional, mit Komma getrennt." htmlFor="radar-stichworte">
                <Input id="radar-stichworte" value={entwurf.stichworte} onChange={(e) => setEntwurf((x) => ({ ...x, stichworte: e.target.value }))} placeholder="z. B. KI, E-Commerce, Förderung" />
              </Field>
              <div className="flex flex-col gap-2 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={entwurf.online} onChange={(e) => setEntwurf((x) => ({ ...x, online: e.target.checked }))} /> Online-Events einbeziehen</label>
                <label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={entwurf.nurKostenlos} onChange={(e) => setEntwurf((x) => ({ ...x, nurKostenlos: e.target.checked }))} /> Nur kostenlose</label>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium">Was interessiert dich?</p>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {(Object.keys(ART_LABELS) as EventArt[]).map((a) => (
                  <label
                    key={a}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${entwurf.arten.includes(a) ? "border-primary bg-accent" : "border-border hover:border-foreground/20"}`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[hsl(var(--primary))]"
                      checked={entwurf.arten.includes(a)}
                      onChange={(e) => setEntwurf((x) => ({ ...x, arten: e.target.checked ? [...x.arten, a] : x.arten.filter((y) => y !== a) }))}
                    />
                    {ART_LABELS[a].name}
                  </label>
                ))}
              </div>
              <Button className="mt-4 w-full" onClick={sichern} disabled={!entwurf.arten.length}>Radar speichern</Button>
              <p className="mt-2 text-xs text-muted-foreground">Die Einstellungen und deine Merkliste bleiben in diesem Browser gespeichert.</p>
            </div>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="min-w-0 space-y-10">
          {neu.length > 0 && (
            <section className="rounded-2xl border border-accent-blue/25 bg-accent/50 p-4 sm:p-5">
              <h2 className="mb-3 inline-flex items-center gap-2 text-base font-semibold"><Sparkles className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Neu für dich</h2>
              <div className="space-y-2">
                {neu.slice(0, 12).map((e) => <RadarKarte key={e.slug} e={e} neu gemerkt={z.gemerkt.includes(e.slug)} merken={() => merken(e.slug)} />)}
              </div>
              {neu.length > 12 && <p className="mt-2 text-xs text-muted-foreground">… und {neu.length - 12} weitere unten in der Liste.</p>}
            </section>
          )}
          <Liste id="woche" titel="Die nächsten 7 Tage" liste={woche} leer="In den nächsten 7 Tagen nichts Passendes. Schau weiter unten oder erweitere dein Radar." />
          <Liste id="spaeter" titel="Danach (bis 45 Tage)" liste={spaeter} leer="Nichts Passendes im Zeitraum." />
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-20">
          <ToolSection
            title={`Merkliste (${gemerkt.length})`}
            icon={Star}
            actions={
              gemerkt.length > 0 ? (
                <Button variant="ghost" size="sm" onClick={merklisteExport}>
                  <CalendarPlus className="h-4 w-4" /> Alle in den Kalender
                </Button>
              ) : undefined
            }
            bodyClassName="p-4 md:p-5"
          >
            {gemerkt.length ? (
              <ul className="space-y-2 text-sm">
                {gemerkt.map((e) => (
                  <li key={e.slug} className="flex gap-2">
                    <span className="w-20 shrink-0 text-xs text-muted-foreground tabular">{tagLabel(e.datum!)}</span>
                    <a href={e.url} target="_blank" rel="noreferrer noopener" className="flex-1 hover:text-accent-blue">{e.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Markiere Events mit dem Stern. Sie landen hier und lassen sich gesammelt in den Kalender übernehmen.</p>
            )}
          </ToolSection>
          <ToolSection title="Fristen in den nächsten 45 Tagen" icon={Hourglass} bodyClassName="p-4 md:p-5">
            {fristen.length ? (
              <ul className="space-y-3 text-sm">
                {fristen.map((f) => (
                  <li key={f.slug}>
                    <a href={f.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium hover:text-accent-blue">{f.name} <ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
                    <div className="text-xs text-muted-foreground">bis {f.frist!.split("-").reverse().join(".")} · {FRIST_LABELS[f.art].name}{f.preis ? ` · ${f.preis}` : ""}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Gerade keine Frist in deiner Region.</p>
            )}
          </ToolSection>
          <ToolSection title="Mehr" bodyClassName="space-y-2 p-4 text-sm md:p-5">
            <Link to="/gruender-events" className="flex items-center justify-between font-medium text-accent-blue hover:underline">Alle Gründer-Events & Kalender-Abos <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            <Link to="/hackathon-starter-kit" className="flex items-center justify-between font-medium text-accent-blue hover:underline">Hackathon-Starter-Kit <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            <Link to="/cockpit/pitch-deck" className="flex items-center justify-between font-medium text-accent-blue hover:underline">Pitch-Deck für Wettbewerbe <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </ToolSection>
        </aside>
      </div>
    </CockpitShell>
  );
};

export default EventRadar;
