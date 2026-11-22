import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, MessageSquare } from "lucide-react";
import { fristenFuer, type FristProfil } from "@/lib/steuerFristen";
import { ladeRadar, passt, istNeu } from "@/lib/eventRadar";
import type { GruenderEvent, GruenderFrist } from "@/data/gruenderEvents";
import { ToneBadge } from "@/components/cockpit/kit";
import { stichtageZwischen } from "@/data/stichtage";

// „Diese Woche für dich“: Steuertermine (aus dem Steuerkalender-Profil), neue
// Events und Fristen (aus dem Event-Radar) in einer Kachel. Funktioniert ohne KI;
// „Mit Felix besprechen“ übergibt die Liste als vorbelegte Frage.

const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const tag = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });

type Punkt = { datum: string; text: string; link?: string; extern?: boolean; art: "steuer" | "event" | "frist" | "gesetz" };

export const DeineWoche = () => {
  const heute = new Date().toISOString().slice(0, 10);
  const [punkte, setPunkte] = useState<Punkt[] | null>(null);
  const [steuerProfil, setSteuerProfil] = useState(false);
  const [neueEvents, setNeueEvents] = useState(0);

  useEffect(() => {
    let aktiv = true;
    const liste: Punkt[] = [];
    let ksaImProfil = false;
    try {
      const roh = localStorage.getItem("gx-steuerkalender-v1");
      if (roh) {
        setSteuerProfil(true);
        const p = JSON.parse(roh) as FristProfil;
        ksaImProfil = !!p.ksa;
        for (const f of fristenFuer(p, heute, 1).fristen.filter((f) => f.datum <= plus(heute, 14)))
          liste.push({ datum: f.datum, text: f.titel, link: "/cockpit/steuerkalender", art: "steuer" });
      }
    } catch {
      /* kein Profil */
    }
    // Gesetzliche Stichtage für alle (KI-Kennzeichnung, Werte 2027, E-Rechnung, KSA).
    for (const s of stichtageZwischen(heute, plus(heute, 14)))
      if (!(ksaImProfil && s.link === "/cockpit/ksa-check")) liste.push({ datum: s.datum, text: s.titel, link: s.link, art: "gesetz" });
    const radar = ladeRadar();
    // Event-Daten erst hier nachladen (eigener Chunk).
    import("@/data/gruenderEvents").then((m) => {
      if (!aktiv) return;
      const events: GruenderEvent[] = m.aktuelleEvents(heute);
      if (radar.einstellungen) {
        const passend = events.filter((e) => e.datum && passt(e, radar.einstellungen!));
        setNeueEvents(passend.filter((e) => istNeu(e, radar.letzterBesuch, heute)).length);
        for (const e of events.filter((e) => radar.gemerkt.includes(e.slug) && e.datum && e.datum >= heute && e.datum <= plus(heute, 14)))
          liste.push({ datum: e.datum!, text: `${e.name} (gemerkt)`, link: e.url, extern: true, art: "event" });
      }
      const fristen: GruenderFrist[] = m.GRUENDER_FRISTEN.filter(
        (f) => f.frist && f.frist >= heute && f.frist <= plus(heute, 14) && (f.region === "bund" || !radar.einstellungen?.region || f.region === radar.einstellungen.region),
      );
      for (const f of fristen) liste.push({ datum: f.frist!, text: `Bewerbungsfrist: ${f.name}`, link: f.url, extern: true, art: "frist" });
      setPunkte(liste.sort((a, b) => a.datum.localeCompare(b.datum)));
    });
    return () => {
      aktiv = false;
    };
  }, [heute]);

  const felixFrage = `Das steht bei mir in den nächsten 14 Tagen an:\n${(punkte ?? []).map((p) => `- ${tag(p.datum)}: ${p.text}`).join("\n")}\n\nWas sollte ich davon zuerst erledigen, und worauf muss ich bei den Steuerterminen achten?`;

  return (
    <section className="rounded-lg border border-border bg-card" data-tour="termine">
      <div className="border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold leading-tight">
          <CalendarClock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          Die nächsten 14 Tage
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">Steuertermine, neue Gesetze, gemerkte Events und Bewerbungsfristen.</p>
      </div>
      <div className="px-4 py-1">
      {punkte === null ? (
        <div className="space-y-2 py-2" aria-busy="true">
          <span className="sr-only">Lädt…</span>
          {[0, 1].map((i) => <div key={i} className="h-5 animate-pulse rounded bg-secondary" />)}
        </div>
      ) : punkte.length ? (
        <ul className="divide-y divide-border">
          {punkte.slice(0, 6).map((p, i) => (
            <li key={i} className="py-2.5 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium tabular">{tag(p.datum)}</span>
                <ToneBadge tone={p.art === "steuer" ? "danger" : p.art === "frist" ? "warning" : p.art === "gesetz" ? "accent" : "info"} className="shrink-0">
                  {p.art === "steuer" ? "Steuer" : p.art === "frist" ? "Frist" : p.art === "gesetz" ? "Gesetz" : "Event"}
                </ToneBadge>
              </div>
              <div className="mt-1 leading-snug">
                {p.link ? (
                  p.extern ? <a href={p.link} target="_blank" rel="noreferrer noopener" className="hover:text-accent-blue hover:underline">{p.text}</a> : <Link to={p.link} className="hover:text-accent-blue hover:underline">{p.text}</Link>
                ) : (
                  <span>{p.text}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-3 text-sm text-muted-foreground">In den nächsten 14 Tagen steht nichts an.</p>
      )}
      </div>
      {((punkte && punkte.length > 0) || !steuerProfil || neueEvents > 0) && (
        <div className="flex flex-col gap-2 border-t border-border px-4 py-3 text-[13px]">
          {punkte && punkte.length > 0 && (
            <Link to={`/felix?frage=${encodeURIComponent(felixFrage)}`} className="inline-flex items-center gap-1.5 font-medium text-accent-blue hover:underline">
              <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Mit Felix besprechen
            </Link>
          )}
          {!steuerProfil && (
            <Link to="/cockpit/steuerkalender" className="inline-flex items-start gap-1.5 font-medium text-accent-blue hover:underline">
              <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Steuerkalender einrichten, dann stehen deine Termine hier
            </Link>
          )}
          {neueEvents > 0 && <Link to="/cockpit/event-radar" className="font-medium text-accent-blue hover:underline tabular">{neueEvents} neue Events im Radar</Link>}
        </div>
      )}
    </section>
  );
};
