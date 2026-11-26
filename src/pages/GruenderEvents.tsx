import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  ExternalLink,
  Landmark,
  MapPin,
  Repeat,
  Search,
  Timer,
  Trophy,
  Users,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { HubNav } from "@/components/landing/HubNav";
import { AdaptiveAppShell } from "@/components/AdaptiveAppShell";
import { selectCls } from "@/components/cockpit/kit";
import { useAuth } from "@/hooks/useAuth";
import { isPrerender } from "@/lib/prerender";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { ladeIcsHerunter } from "@/lib/ics";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import {
  ART_LABELS,
  EVENT_KALENDER,
  FRIST_LABELS,
  GRUENDER_FRISTEN,
  UEBERREGIONAL,
  LIVE_STAND,
  type GruenderFrist,
  aktuelleEvents,
  type EventArt,
  type GruenderEvent,
} from "@/data/gruenderEvents";
import { cn } from "@/lib/utils";

const SITE = "https://gruenderx.de";

function veranstalterUrl(url: string): string {
  try {
    return new URL(url).origin + "/";
  } catch {
    return url;
  }
}

const GRUPPEN: { key: string; label: string; icon?: LucideIcon; arten: EventArt[] }[] = [
  { key: "alle", label: "Alle Formate", arten: [] },
  { key: "gruenden", label: "IHK, HWK & Gründerabende", icon: Landmark, arten: ["gruenderabend", "webinar"] },
  { key: "netzwerk", label: "Netzwerk & Konferenzen", icon: Users, arten: ["netzwerk", "konferenz"] },
  { key: "bauen", label: "Hackathons & Build-Sessions", icon: Zap, arten: ["hackathon", "build"] },
  { key: "fristen", label: "Wettbewerbe & Accelerator", icon: Trophy, arten: [] },
];

const FORMAT_LABEL: Record<GruenderEvent["format"], string> = {
  "vor-ort": "Vor Ort",
  online: "Online",
  hybrid: "Hybrid",
};

const regionName = (r: string) =>
  r === "online" ? "Online" : r === "bund" ? "Bundesweit" : BUNDESLAND_NAMES[r] ?? r;

const fmtParts = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: d.toLocaleDateString("de-DE", { day: "2-digit" }),
    month: d.toLocaleDateString("de-DE", { month: "short" }).replace(".", "").toUpperCase(),
  };
};

const fmtSpanne = (e: GruenderEvent) => {
  if (!e.datum) return "";
  const von = new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  if (!e.datumBis || e.datumBis === e.datum) return von;
  const bis = new Date(`${e.datumBis}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  return `${von} bis ${bis}`;
};

const SEITE = 30;

const monatsName = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { month: "long", year: "numeric" });

const faqs = [
  {
    q: "Was passiert auf einem IHK-Gründerabend?",
    a: "Die IHK stellt in ein bis zwei Stunden die Grundlagen der Gründung vor: Gewerbeanmeldung, Rechtsform, Steuern, Versicherungen und Förderung. Danach gibt es meist Zeit für Fragen und Austausch mit anderen Gründern. Die meisten Termine sind kostenlos, eine Anmeldung ist aber fast immer nötig.",
  },
  {
    q: "Brauche ich für einen Hackathon Programmierkenntnisse?",
    a: "Nicht zwingend. Teams brauchen auch Leute für Idee, Design, Pitch und Markt. Bei KI-Build-Sessions mit Werkzeugen wie Claude, Lovable oder Cursor kommen auch Einsteiger in wenigen Stunden zu einem lauffähigen Prototyp.",
  },
  {
    q: "Wie aktuell sind die Termine?",
    a: "Wir prüfen jeden Eintrag gegen die Seite des Veranstalters. Termine können sich trotzdem ändern, daher vor der Anmeldung immer den verlinkten Veranstalter-Link öffnen. Vergangene Termine blendet die Seite automatisch aus.",
  },
];

const EventKarte = ({ e }: { e: GruenderEvent }) => {
  const art = ART_LABELS[e.art];
  const parts = e.datum ? fmtParts(e.datum) : null;
  return (
    <article className="group flex min-w-0 gap-4 rounded-2xl border border-border bg-white p-4 shadow-card transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-soft sm:p-5">
      <div className="flex h-16 w-14 shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-white text-center sm:w-16">
        {parts ? (
          <>
            <span className="bg-primary py-0.5 text-[10px] font-bold tracking-wider text-white">{parts.month}</span>
            <span className="flex flex-1 items-center justify-center text-xl font-bold leading-none text-primary tabular">
              {parts.day}
            </span>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center bg-secondary/50 px-1">
            <Repeat className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="mt-1 text-[10px] font-semibold text-muted-foreground">laufend</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="break-words text-[15px] font-bold leading-snug text-primary [overflow-wrap:anywhere] sm:text-base">
              <a href={e.url} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-accent-blue">
                {e.name}
              </a>
            </h3>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">{e.veranstalter}</p>
          </div>
          {e.kostenlos === true && (
            <span className="shrink-0 rounded-md bg-brand-green-soft px-2 py-0.5 text-[11px] font-bold text-brand-green">
              Kostenlos
            </span>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-semibold">
          <span className="rounded-md bg-accent px-2 py-0.5 text-primary">{art.name}</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-medium text-muted-foreground">
            {e.format === "online" ? <Wifi className="h-3 w-3" aria-hidden="true" /> : <MapPin className="h-3 w-3" aria-hidden="true" />}
            {e.format === "online" ? FORMAT_LABEL.online : `${e.ort} · ${FORMAT_LABEL[e.format]}`}
          </span>
          {e.dauer && (
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-medium text-muted-foreground">
              <Timer className="h-3 w-3" aria-hidden="true" /> {e.dauer}
            </span>
          )}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{e.kurz}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border/60 pt-2.5 text-xs">
          <span className="font-medium text-foreground/80">
            {e.datum ? fmtSpanne(e) : e.rhythmus}
            {e.weitereTermine ? ` · +${e.weitereTermine} weitere` : ""}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            {e.datum && (
              <button
                type="button"
                onClick={() =>
                  ladeIcsHerunter(
                    {
                      uid: e.slug,
                      titel: e.name,
                      start: e.datum!,
                      ende: e.datumBis,
                      ort: e.format === "online" ? "Online" : e.ort,
                      beschreibung: e.veranstalter,
                      url: e.url,
                    },
                    e.name,
                  )
                }
                className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary"
              >
                <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" /> Kalender
              </button>
            )}
            <a
              href={e.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline"
            >
              Zum Veranstalter <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const FristKarte = ({ f, heute }: { f: GruenderFrist; heute: string }) => {
  const label = FRIST_LABELS[f.art];
  const tageBis = f.frist ? Math.ceil((Date.parse(f.frist) - Date.parse(heute)) / 864e5) : null;
  const dringend = tageBis !== null && tageBis <= 14;
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-white p-4 pl-5 shadow-card transition-colors hover:border-primary/35">
      <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-1", dringend ? "bg-danger" : "bg-brand-green")} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a href={f.url} target="_blank" rel="noreferrer noopener" className="text-sm font-bold leading-snug text-primary hover:text-accent-blue">
            {f.name}
          </a>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            {label.name} · {regionName(f.region)}
            {f.preis ? ` · ${f.preis}` : ""}
          </p>
        </div>
        {tageBis !== null && tageBis >= 0 && (
          <span
            className={cn(
              "shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold tabular",
              dringend ? "bg-danger-soft text-danger" : "bg-brand-green-soft text-brand-green",
            )}
          >
            {tageBis === 0 ? "Heute" : `noch ${tageBis} Tage`}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.kurz}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-2 text-[11px]">
        <span className="font-medium text-foreground/80">
          {f.frist
            ? `Frist ${new Date(`${f.frist}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}`
            : f.rhythmus}
        </span>
        <div className="ml-auto flex items-center gap-3">
          {f.frist && (
            <button
              type="button"
              onClick={() => ladeIcsHerunter({ uid: `frist-${f.slug}`, titel: `Bewerbungsfrist: ${f.name}`, start: f.frist!, beschreibung: f.kurz, url: f.url }, `frist-${f.slug}`)}
              className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary"
            >
              <CalendarPlus className="h-3 w-3" aria-hidden="true" /> Kalender
            </button>
          )}
          <a href={f.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline">
            Ausschreibung <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default function GruenderEvents() {
  const { user } = useAuth();
  const inCockpit = Boolean(user) && !isPrerender();
  const heute = new Date().toISOString().slice(0, 10);
  const [gruppe, setGruppe] = useState("alle");
  const [region, setRegion] = useState("all");
  const [nurKostenlos, setNurKostenlos] = useState(false);
  const [nurOnline, setNurOnline] = useState(false);
  const [suche, setSuche] = useState("");
  const [sichtbar, setSichtbar] = useState(SEITE);
  useEffect(() => setSichtbar(SEITE), [gruppe, region, nurKostenlos, nurOnline, suche]);

  const aktiv = useMemo(() => aktuelleEvents(heute), [heute]);

  const gefiltert = useMemo(() => {
    const arten = GRUPPEN.find((g) => g.key === gruppe)?.arten ?? [];
    const q = suche.trim().toLowerCase();
    return aktiv.filter((e) => {
      if (arten.length && !arten.includes(e.art)) return false;
      if (region !== "all" && e.region !== region && e.format !== "online") return false;
      if (nurKostenlos && e.kostenlos !== true) return false;
      if (nurOnline && e.format === "vor-ort") return false;
      if (q && ![e.name, e.veranstalter, e.ort, e.kurz].some((s) => s.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [aktiv, gruppe, region, nurKostenlos, nurOnline, suche]);

  const fristen = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return GRUENDER_FRISTEN.filter((f) => {
      if (region !== "all" && f.region !== region && !UEBERREGIONAL.includes(f.region)) return false;
      if (q && ![f.name, f.veranstalter, f.kurz].some((s) => s.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [region, suche]);
  const fristenOffen = fristen.filter((f) => f.frist && f.frist >= heute).sort((a, b) => a.frist!.localeCompare(b.frist!));
  const fristenLaufend = fristen.filter((f) => !f.frist || f.frist < heute);
  const nurFristen = gruppe === "fristen";

  const termine = gefiltert.filter((e) => e.datum).sort((a, b) => a.datum!.localeCompare(b.datum!));
  const laufend = gefiltert.filter((e) => !e.datum);

  const regionen = Array.from(new Set(aktiv.map((e) => e.region)))
    .filter((r) => BUNDESLAND_NAMES[r] && r !== "bund")
    .sort((a, b) => BUNDESLAND_NAMES[a].localeCompare(BUNDESLAND_NAMES[b]));
  const anzahlStaedte = new Set(aktiv.filter((e) => e.format !== "online").map((e) => e.ort)).size;
  const anzahlBauen = aktiv.filter((e) => e.art === "hackathon" || e.art === "build").length;

  const jsonLd = [
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Gründer-Events", url: `${SITE}/gruender-events` },
    ]),
    faqSchema(faqs),
    ...aktiv
      .filter((e) => e.datum)
      .sort((a, b) => a.datum!.localeCompare(b.datum!))
      .slice(0, 40)
      .map((e) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        name: e.name,
        description: e.kurz,
        startDate: e.datum,
        endDate: e.datumBis ?? e.datum,
        eventAttendanceMode:
          e.format === "online"
            ? "https://schema.org/OnlineEventAttendanceMode"
            : e.format === "hybrid"
              ? "https://schema.org/MixedEventAttendanceMode"
              : "https://schema.org/OfflineEventAttendanceMode",
        location:
          e.format === "online"
            ? { "@type": "VirtualLocation", url: e.url }
            : { "@type": "Place", name: e.ort, address: { "@type": "PostalAddress", addressLocality: e.ort, addressCountry: "DE" } },
        image: `${SITE}/og-image.png`,
        eventStatus: "https://schema.org/EventScheduled",
        organizer: { "@type": "Organization", name: e.veranstalter, url: veranstalterUrl(e.url) },
        performer: { "@type": "Organization", name: e.veranstalter },
        ...(e.kostenlos === true && {
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: e.url,
            validFrom: e.entdeckt ?? LIVE_STAND.stand,
          },
        }),
        url: e.url,
      })),
  ];

  return (
    <AdaptiveAppShell
      eyebrow={`Events & Netzwerk · Stand ${new Date(LIVE_STAND.stand).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}`}
      width="max-w-5xl"
      tabs={[
        { label: "Gründer-Events", to: "/gruender-events" },
        { label: "Mein Event-Radar", to: "/cockpit/event-radar" },
        { label: "Mitgründer-Börse", to: "/community/mitgruender" },
      ]}
      seo={
        <Seo
          title="Gründer-Events 2026: IHK-Gründerabende, Hackathons & Meetups"
          description="Gründer-Events in ganz Deutschland: IHK-Gründerabende, Existenzgründertage, Startup-Konferenzen, Hackathons und KI-Build-Sessions nach Bundesland gefiltert."
          path="/gruender-events"
          jsonLd={jsonLd}
        />
      }
      kicker={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          <CalendarDays className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" /> Täglich aktualisiert
        </span>
      }
      title="Gründer-Events & Netzwerk"
      lead={
        <p>
          IHK-Gründerabende, Startup-Konferenzen, Meetups, Hackathons und KI-Build-Sessions in ganz Deutschland. Jeder
          Termin direkt mit Veranstalter-Link und Kalender-Export.
        </p>
      }
    >
      <div className="space-y-8">
        {/* Kompakte 3er-Kennzahlen im Revolut-Stil */}
        <dl className="grid grid-cols-3 gap-3">
          {[
            { n: aktiv.length, l: "Aktive Events" },
            { n: anzahlStaedte, l: "Städte & Online" },
            { n: anzahlBauen, l: "Hackathons & Builds" },
          ].map((k) => (
            <div key={k.l} className="rounded-2xl border border-border bg-white px-4 py-3.5 shadow-card sm:px-5">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k.l}</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight text-primary tabular">{k.n}</dd>
            </div>
          ))}
        </dl>

        {/* Aufgeräumte Revolut-Filterkarte */}
        <section aria-label="Events filtern" className="rounded-2xl border border-border bg-white p-4 shadow-card sm:p-5">
          <div className="flex flex-wrap gap-1.5">
            {GRUPPEN.map((g) => {
              const Icon = g.icon;
              const active = gruppe === g.key;
              return (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setGruppe(g.key)}
                  aria-pressed={active}
                  className={cn(
                    "press inline-flex min-h-9 items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary/60 text-foreground/80 hover:bg-accent hover:text-primary",
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                  {g.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={suche}
                onChange={(e) => setSuche(e.target.value)}
                placeholder="Suche: München, IHK, KI, Pitch, E-Commerce …"
                className="h-11 rounded-xl bg-secondary/35 pl-10 focus:bg-white"
              />
            </div>
            <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Bundesland" className={selectCls}>
              <option value="all">Alle Bundesländer</option>
              {regionen.map((r) => (
                <option key={r} value={r}>
                  {BUNDESLAND_NAMES[r]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-4 border-t border-border/60 pt-3 text-xs font-medium text-foreground">
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={nurKostenlos} onChange={(e) => setNurKostenlos(e.target.checked)} />
              Nur kostenlose
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={nurOnline} onChange={(e) => setNurOnline(e.target.checked)} />
              Online teilnehmen
            </label>
            <span className="ml-auto text-xs font-semibold text-muted-foreground tabular">
              {nurFristen ? `${fristen.length} Programme` : `${gefiltert.length} von ${aktiv.length} Events`}
            </span>
          </div>
        </section>

        {/* Bewerbungsfristen (sauber hell statt gelber Warnwand) */}
        {(nurFristen || fristenOffen.length > 0) && (
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-bold text-primary sm:text-lg">
                <Trophy className="h-4 w-4 text-brand-green" aria-hidden="true" />
                Fristen-Radar: Wettbewerbe &amp; Accelerator
              </h2>
              {!nurFristen && (
                <button type="button" onClick={() => setGruppe("fristen")} className="text-xs font-semibold text-accent-blue hover:underline">
                  Alle {fristen.length} Programme ansehen →
                </button>
              )}
            </div>
            {fristenOffen.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(nurFristen ? fristenOffen : fristenOffen.slice(0, 4)).map((f) => (
                  <FristKarte key={f.slug} f={f} heute={heute} />
                ))}
              </div>
            )}
            {nurFristen && fristenLaufend.length > 0 && (
              <>
                <h3 className="pt-3 text-sm font-semibold text-muted-foreground">Laufend bewerben</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {fristenLaufend.map((f) => (
                    <FristKarte key={f.slug} f={f} heute={heute} />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {!nurFristen && termine.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight text-primary">Nächste Termine</h2>
            <div className="space-y-3">
              {termine.slice(0, sichtbar).map((e, i, liste) => {
                const neuerMonat = i === 0 || e.datum!.slice(0, 7) !== liste[i - 1].datum!.slice(0, 7);
                return (
                  <div key={e.slug}>
                    {neuerMonat && (
                      <h3 className="pb-2 pt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {monatsName(e.datum!)}
                      </h3>
                    )}
                    <EventKarte e={e} />
                  </div>
                );
              })}
            </div>
            {termine.length > sichtbar && (
              <div className="pt-2 text-center">
                <Button variant="outline" className="rounded-xl bg-white" onClick={() => setSichtbar((n) => n + SEITE * 2)}>
                  Weitere Termine anzeigen ({termine.length - sichtbar})
                </Button>
              </div>
            )}
          </section>
        )}

        {!nurFristen && laufend.length > 0 && (
          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-primary">Regelmäßige Formate</h2>
              <p className="text-sm text-muted-foreground">Finden laufend statt, den nächsten Termin findest du beim Veranstalter.</p>
            </div>
            <div className="space-y-3">
              {laufend.map((e) => (
                <EventKarte key={e.slug} e={e} />
              ))}
            </div>
          </section>
        )}

        {!nurFristen && gefiltert.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">
            Für diese Filter gibt es gerade nichts. Nimm einen Filter heraus oder schau in die Event-Kalender unten.
          </div>
        )}

        {/* Abonnierbare Kalender */}
        <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-primary">
            <CalendarPlus className="h-4 w-4 text-accent-blue" aria-hidden="true" />
            Termine automatisch im eigenen Kalender
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Abonniere den Kalender für dein Bundesland (inkl. Online-Events) oder alle Bewerbungsfristen für Google, Apple oder Outlook.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              aria-label="Bundesland für den Kalender"
              className="h-10 rounded-xl border border-input bg-white px-3 text-sm font-medium"
              value={region === "all" ? "" : region}
              onChange={(ev) => setRegion(ev.target.value || "all")}
            >
              <option value="">Ganz Deutschland</option>
              {Object.entries(BUNDESLAND_NAMES)
                .filter(([k]) => k !== "bund")
                .map(([k, n]) => (
                  <option key={k} value={k}>
                    {n}
                  </option>
                ))}
            </select>
            <a
              className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary/90 sm:text-sm"
              href={`webcal://gruenderx.de/kalender/${region === "all" ? "gruender-events" : `gruender-events-${region.toLowerCase()}`}.ics`}
            >
              Events abonnieren
            </a>
            <a
              className="inline-flex h-10 items-center rounded-xl border border-border bg-white px-4 text-xs font-semibold text-foreground transition-colors hover:bg-secondary sm:text-sm"
              href="webcal://gruenderx.de/kalender/fristen.ics"
            >
              Fristen abonnieren
            </a>
            <a
              className="text-xs font-semibold text-accent-blue hover:underline"
              href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(`webcal://gruenderx.de/kalender/${region === "all" ? "gruender-events" : `gruender-events-${region.toLowerCase()}`}.ics`)}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              in Google Kalender öffnen
            </a>
          </div>
        </section>

        {/* Event-Kalender-Quellen */}
        {EVENT_KALENDER.length > 0 && (
          <section className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-primary">Weitere Event-Quellen</h2>
              <p className="text-xs text-muted-foreground">
                Unser Monitor liest täglich 14 Quellen aus, darunter IHK-Kalender, Luma, Meetup, Google Developer Groups und Eventbrite.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {EVENT_KALENDER.map((k) => (
                <a
                  key={k.url}
                  href={k.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group rounded-2xl border border-border bg-white p-4 shadow-card transition-colors hover:border-primary/35"
                >
                  <div className="flex items-center gap-2">
                    {k.art === "build" ? (
                      <Zap className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                    ) : (
                      <Landmark className="h-4 w-4 text-primary" aria-hidden="true" />
                    )}
                    <span className="flex-1 text-sm font-bold text-primary">{k.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{k.kurz}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {!inCockpit && (
          <>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-primary">Häufige Fragen</h2>
              <div className="space-y-2.5">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-border bg-white p-5 shadow-card">
                    <h3 className="text-sm font-bold text-primary">{f.q}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-2xl border-2 border-primary bg-white p-7 text-center shadow-soft">
              <h2 className="text-xl font-bold text-primary">Vom Gründerabend zur fertigen Gründung</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Auf dem Event bekommst du den Überblick. GründerX führt dich danach Schritt für Schritt durch
                Gewerbeanmeldung, Steuern und Förderung.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl">
                  <Link to="/gratis-tools">
                    Gratis-Tools ansehen <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link to="/guides">Alle Guides</Link>
                </Button>
              </div>
            </div>

            <HubNav show={["tools", "guides", "ratgeber"]} />
          </>
        )}
      </div>
    </AdaptiveAppShell>
  );
}
