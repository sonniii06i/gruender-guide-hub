import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CalendarPlus, ExternalLink, MapPin, Repeat, Search, Timer, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { breadcrumbSchema, faqSchema } from "@/lib/freetools/schema";
import { ladeIcsHerunter } from "@/lib/ics";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";
import {
  ART_LABELS,
  EVENT_KALENDER,
  FRIST_LABELS,
  GRUENDER_FRISTEN,
  LIVE_STAND,
  type GruenderFrist,
  aktuelleEvents,
  type EventArt,
  type GruenderEvent,
} from "@/data/gruenderEvents";

const SITE = "https://gruenderx.de";

// Grobe Gruppen für die Schnellwahl oben; die feinen Arten stehen als Badge an jeder Karte.
const GRUPPEN: { key: string; label: string; arten: EventArt[] }[] = [
  { key: "alle", label: "Alle", arten: [] },
  { key: "gruenden", label: "🏛️ IHK, HWK & Gründerabende", arten: ["gruenderabend", "webinar"] },
  { key: "netzwerk", label: "🤝 Netzwerk & Konferenzen", arten: ["netzwerk", "konferenz"] },
  { key: "bauen", label: "⚡ Hackathons & Build-Sessions", arten: ["hackathon", "build"] },
  { key: "fristen", label: "🏆 Wettbewerbe, Stipendien & Accelerator", arten: [] },
];

const FORMAT_LABEL: Record<GruenderEvent["format"], string> = {
  "vor-ort": "Vor Ort",
  online: "Online",
  hybrid: "Hybrid",
};

const regionName = (r: string) =>
  r === "online" ? "Online" : r === "bund" ? "Bundesweit" : BUNDESLAND_NAMES[r] ?? r;

const fmtTag = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });

const fmtSpanne = (e: GruenderEvent) => {
  if (!e.datum) return "";
  const von = new Date(`${e.datum}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  if (!e.datumBis || e.datumBis === e.datum) return von;
  const bis = new Date(`${e.datumBis}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  return `${von} – ${bis}`;
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
    a: "Wir prüfen jeden Eintrag gegen die Seite des Veranstalters. Termine können sich trotzdem ändern – vor der Anmeldung immer den verlinkten Veranstalter-Link öffnen. Vergangene Termine blendet die Seite automatisch aus.",
  },
];

const EventKarte = ({ e }: { e: GruenderEvent }) => {
  const art = ART_LABELS[e.art];
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-accent-blue/40 hover:shadow-soft transition-all">
      <div className="shrink-0 w-14 sm:w-16 rounded-xl bg-secondary/70 flex flex-col items-center justify-center py-2 text-center">
        {e.datum ? (
          <>
            <span className="text-lg sm:text-xl font-bold leading-none">{fmtTag(e.datum).split(".")[0]}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
              {fmtTag(e.datum).split(".").slice(1).join("").trim()}
            </span>
          </>
        ) : (
          <>
            <Repeat className="h-5 w-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground mt-1">laufend</span>
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base leading-snug">
          <a href={e.url} target="_blank" rel="noreferrer noopener" className="hover:text-accent-blue transition-colors">
            {e.name}
          </a>
        </h3>
        <div className="text-xs text-muted-foreground mt-0.5">{e.veranstalter}</div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${art.color}`}>
            {art.emoji} {art.name}
          </span>
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] inline-flex items-center gap-1">
            {e.format === "online" ? <Wifi className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
            {e.format === "online" ? FORMAT_LABEL.online : `${e.ort} · ${FORMAT_LABEL[e.format]}`}
          </span>
          {e.dauer && (
            <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] inline-flex items-center gap-1">
              <Timer className="h-3 w-3" /> {e.dauer}
            </span>
          )}
          {e.kostenlos === true && (
            <span className="rounded-full bg-emerald-500/10 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">kostenlos</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.kurz}</p>
        <div className="text-[11px] mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-muted-foreground">
            {e.datum ? fmtSpanne(e) : e.rhythmus}
            {e.weitereTermine ? ` · + ${e.weitereTermine} weitere Termine` : ""}
          </span>
          <a href={e.url} target="_blank" rel="noreferrer noopener" className="text-accent-blue inline-flex items-center gap-1 hover:underline">
            Zum Veranstalter <ExternalLink className="h-3 w-3" />
          </a>
          {e.datum && (
            <button
              type="button"
              onClick={() =>
                ladeIcsHerunter(
                  { uid: e.slug, titel: e.name, start: e.datum!, ende: e.datumBis, ort: e.format === "online" ? "Online" : e.ort, beschreibung: e.veranstalter, url: e.url },
                  e.name,
                )
              }
              className="text-accent-blue inline-flex items-center gap-1 hover:underline"
            >
              <CalendarPlus className="h-3 w-3" /> In den Kalender
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const FristKarte = ({ f, heute }: { f: GruenderFrist; heute: string }) => {
  const label = FRIST_LABELS[f.art];
  const tageBis = f.frist ? Math.ceil((Date.parse(f.frist) - Date.parse(heute)) / 864e5) : null;
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a href={f.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-sm leading-snug hover:text-accent-blue transition-colors">
            {f.name}
          </a>
          <div className="text-xs text-muted-foreground mt-0.5">
            {label.emoji} {label.name} · {regionName(f.region)}
            {f.preis ? ` · ${f.preis}` : ""}
          </div>
        </div>
        {tageBis !== null && tageBis >= 0 && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              tageBis <= 14 ? "bg-red-500/10 text-red-700" : "bg-emerald-500/10 text-emerald-700"
            }`}
          >
            {tageBis === 0 ? "Frist heute" : `noch ${tageBis} Tage`}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.kurz}</p>
      <div className="text-[11px] mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-muted-foreground">
          {f.frist
            ? `Frist ${new Date(`${f.frist}T12:00:00`).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}`
            : f.rhythmus}
        </span>
        <a href={f.url} target="_blank" rel="noreferrer noopener" className="text-accent-blue inline-flex items-center gap-1 hover:underline">
          Zur Ausschreibung <ExternalLink className="h-3 w-3" />
        </a>
        {f.frist && (
          <button
            type="button"
            onClick={() => ladeIcsHerunter({ uid: `frist-${f.slug}`, titel: `Bewerbungsfrist: ${f.name}`, start: f.frist!, beschreibung: f.kurz, url: f.url }, `frist-${f.slug}`)}
            className="text-accent-blue inline-flex items-center gap-1 hover:underline"
          >
            <CalendarPlus className="h-3 w-3" /> Frist in den Kalender
          </button>
        )}
      </div>
    </div>
  );
};

export default function GruenderEvents() {
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
      // Online-Events passen zu jedem Bundesland: man kann von überall teilnehmen.
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
      if (region !== "all" && f.region !== region && f.region !== "bund") return false;
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
    // Die nächsten 40 Termine reichen für Rich Results; alle 300+ würden das HTML aufblähen.
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
        organizer: { "@type": "Organization", name: e.veranstalter },
        url: e.url,
      })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Gründer-Events 2026: IHK-Gründerabende, Hackathons & Meetups | GründerX"
        description="Gründer-Events in ganz Deutschland: IHK-Gründerabende, Existenzgründertage, Startup-Konferenzen, Hackathons und KI-Build-Sessions – nach Bundesland filtern, Termine direkt beim Veranstalter."
        path="/gruender-events"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-8 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> Täglich aktualisiert · Stand{" "}
            {new Date(LIVE_STAND.stand).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Gründer-Events in ganz Deutschland
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            IHK-Gründerabende und Sprechtage, Startup-Konferenzen und Meetups – und Hackathons und KI-Build-Sessions,
            bei denen du in ein paar Stunden dein erstes Tool baust. Alles an einem Ort, jeder Termin mit Link zum
            Veranstalter.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="rounded-full border border-border bg-card px-4 py-1.5">
              <strong>{aktiv.length}</strong> Events & Formate
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-1.5">
              <strong>{anzahlStaedte}</strong> Orte
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-1.5">
              <strong>{anzahlBauen}</strong> Hackathons & Build-Sessions
            </span>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Filter */}
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 sm:p-5 mb-6 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {GRUPPEN.map((g) => (
                <button
                  key={g.key}
                  onClick={() => setGruppe(g.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    gruppe === g.key ? "bg-accent-blue text-primary-foreground" : "border border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={suche}
                  onChange={(e) => setSuche(e.target.value)}
                  placeholder="Suche: München, IHK, Claude, Pitch, KI …"
                  className="pl-9 bg-background"
                />
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                aria-label="Bundesland"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">Alle Bundesländer</option>
                {regionen.map((r) => (
                  <option key={r} value={r}>
                    {BUNDESLAND_NAMES[r]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={nurKostenlos} onChange={(e) => setNurKostenlos(e.target.checked)} />
                Nur kostenlose
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={nurOnline} onChange={(e) => setNurOnline(e.target.checked)} />
                Online teilnehmen
              </label>
              <span className="ml-auto text-xs text-muted-foreground">
                {nurFristen ? `${fristen.length} Programme` : `${gefiltert.length} von ${aktiv.length}`}
              </span>
            </div>
          </div>

          {/* Fristen-Radar */}
          {(nurFristen || fristenOffen.length > 0) && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 mb-8">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <h2 className="text-lg md:text-xl font-bold">🏆 Fristen-Radar: Wettbewerbe, Stipendien & Accelerator</h2>
                {!nurFristen && (
                  <button onClick={() => setGruppe("fristen")} className="text-xs font-semibold text-accent-blue hover:underline">
                    Alle {fristen.length} Programme →
                  </button>
                )}
              </div>
              {fristenOffen.length > 0 && (
                <>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Bewerbung jetzt offen</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(nurFristen ? fristenOffen : fristenOffen.slice(0, 4)).map((f) => (
                      <FristKarte key={f.slug} f={f} heute={heute} />
                    ))}
                  </div>
                </>
              )}
              {nurFristen && fristenLaufend.length > 0 && (
                <>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-5 mb-2">
                    Laufend bewerben oder nächste Runde vormerken
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fristenLaufend.map((f) => (
                      <FristKarte key={f.slug} f={f} heute={heute} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {!nurFristen && termine.length > 0 && (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-3">Nächste Termine</h2>
              <div className="space-y-3 mb-4">
                {termine.slice(0, sichtbar).map((e, i, liste) => {
                  const neuerMonat = i === 0 || e.datum!.slice(0, 7) !== liste[i - 1].datum!.slice(0, 7);
                  return (
                    <div key={e.slug}>
                      {neuerMonat && (
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground pt-3 pb-2">
                          {monatsName(e.datum!)}
                        </h3>
                      )}
                      <EventKarte e={e} />
                    </div>
                  );
                })}
              </div>
              {termine.length > sichtbar && (
                <div className="text-center mb-10">
                  <Button variant="outline" onClick={() => setSichtbar((n) => n + SEITE * 2)}>
                    Weitere Termine anzeigen ({termine.length - sichtbar})
                  </Button>
                </div>
              )}
              {termine.length <= sichtbar && <div className="mb-10" />}
            </>
          )}

          {!nurFristen && laufend.length > 0 && (
            <>
              <h2 className="text-xl md:text-2xl font-bold mb-1">Regelmäßige Formate</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Finden laufend statt – den nächsten Termin findest du jeweils beim Veranstalter.
              </p>
              <div className="space-y-3 mb-10">
                {laufend.map((e) => (
                  <EventKarte key={e.slug} e={e} />
                ))}
              </div>
            </>
          )}

          {!nurFristen && gefiltert.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground mb-10">
              Für diese Filter gibt es gerade nichts. Nimm einen Filter heraus oder schau in die Event-Kalender unten.
            </div>
          )}

          {/* Build-Session vorbereiten */}
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 mb-10">
            <h2 className="text-lg font-bold mb-2">⚡ In 3 Stunden zum ersten Tool – so nutzt du eine Build-Session</h2>
            <p className="text-sm mb-3">
              Mit Timer und Prompt-Vorlagen:{" "}
              <Link to="/hackathon-starter-kit" className="text-accent-blue font-semibold hover:underline">Hackathon-Starter-Kit öffnen →</Link>
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Vorher (30 Min.):</strong> ein Problem in einem Satz aufschreiben, das
                du selbst hast. Prüf mit dem{" "}
                <Link to="/tools/brand-check" className="text-accent-blue hover:underline">Marken- und Domain-Check</Link>,
                ob der Name frei ist.
              </li>
              <li>
                <strong className="text-foreground">Stunde 1:</strong> nur den Kern bauen – eine Eingabe, ein Ergebnis.
                KI-Werkzeuge wie Claude, Lovable oder Cursor schreiben den Großteil des Codes.
              </li>
              <li>
                <strong className="text-foreground">Stunde 2:</strong> von drei anderen Teilnehmern ausprobieren lassen und
                das Wichtigste nachbessern.
              </li>
              <li>
                <strong className="text-foreground">Stunde 3:</strong> online stellen und einen 60-Sekunden-Pitch üben:
                Problem, Lösung, wer zahlt.
              </li>
              <li>
                <strong className="text-foreground">Danach:</strong> Wenn Leute zahlen wollen, steht die Gründung an – den
                Weg dahin zeigt dir der{" "}
                <Link to="/rechtsform-finden" className="text-accent-blue hover:underline">Rechtsform-Finder</Link>.
              </li>
            </ol>
          </div>

          {/* Abonnierbare Kalender */}
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-10">
            <h2 className="text-lg font-bold mb-1">📅 Termine automatisch im eigenen Kalender</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Abonniere den Kalender für dein Bundesland (inklusive Online-Events) oder alle Bewerbungsfristen – er
              aktualisiert sich von selbst in Google Kalender, Apple Kalender oder Outlook.
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                aria-label="Bundesland für den Kalender"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                value={region === "all" ? "" : region}
                onChange={(ev) => setRegion(ev.target.value || "all")}
              >
                <option value="">Ganz Deutschland</option>
                {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, n]) => (
                  <option key={k} value={k}>{n}</option>
                ))}
              </select>
              <a
                className="rounded-md bg-accent-blue text-primary-foreground px-3 py-2 text-sm font-semibold"
                href={`webcal://gruenderx.de/kalender/${region === "all" ? "gruender-events" : `gruender-events-${region.toLowerCase()}`}.ics`}
              >
                Events abonnieren
              </a>
              <a className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold" href="webcal://gruenderx.de/kalender/fristen.ics">
                Fristen abonnieren
              </a>
              <a
                className="text-xs text-accent-blue hover:underline"
                href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(`webcal://gruenderx.de/kalender/${region === "all" ? "gruender-events" : `gruender-events-${region.toLowerCase()}`}.ics`)}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                in Google Kalender öffnen
              </a>
            </div>
          </div>

          {/* Kalender */}
          {EVENT_KALENDER.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold mb-1">Event-Kalender, die sich lohnen</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Unser Monitor liest Gründungswoche, Luma, Meetup und hackathonhub täglich aus. Für alles Weitere: Hier
                tragen Veranstalter ihre Termine selbst ein.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVENT_KALENDER.map((k) => (
                  <a
                    key={k.url}
                    href={k.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{k.art === "build" ? "⚡" : "🏛️"}</span>
                      <span className="font-semibold text-sm flex-1">{k.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{k.kurz}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <h2 className="text-xl md:text-2xl font-bold mb-3">Häufige Fragen</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold mb-1.5">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Vom Gründerabend zur fertigen Gründung</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
              Auf dem Event bekommst du den Überblick – GründerX führt dich danach Schritt für Schritt durch
              Gewerbeanmeldung, Steuern und Förderung.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/gratis-tools">
                <Button size="lg">
                  Gratis-Tools ansehen <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/guides">
                <Button size="lg" variant="outline">Alle Guides</Button>
              </Link>
            </div>
          </div>

          <HubNav show={["tools", "guides", "ratgeber"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
