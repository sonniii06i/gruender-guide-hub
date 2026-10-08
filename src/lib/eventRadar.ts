// Event-Radar: persönliche Auswahl aus den Gründer-Events (Region, Arten,
// Stichworte), „neu seit deinem letzten Besuch“ und Merkliste. Gespeichert
// wird nur im Browser (localStorage) – bequem, aber geräteabhängig; das steht
// auch so in der Oberfläche.

import { useEffect, useState } from "react";
import type { EventArt, GruenderEvent } from "@/data/gruenderEvents";

export type RadarEinstellungen = {
  region: string | null; // Bundesland-Code oder null = ganz Deutschland
  arten: EventArt[];
  online: boolean;
  stichworte: string; // kommagetrennt
  nurKostenlos: boolean;
};

export type RadarZustand = {
  einstellungen: RadarEinstellungen | null; // null = noch nie eingerichtet
  letzterBesuch: string | null; // ISO-Datum
  gemerkt: string[]; // Event-Slugs
};

const SCHLUESSEL = "gx-event-radar-v1";
const AENDERUNG = "gx:event-radar";

export const STANDARD_EINSTELLUNGEN: RadarEinstellungen = {
  region: null,
  arten: ["gruenderabend", "netzwerk", "konferenz", "hackathon", "build", "webinar"],
  online: true,
  stichworte: "",
  nurKostenlos: false,
};

export function ladeRadar(): RadarZustand {
  try {
    const roh = localStorage.getItem(SCHLUESSEL);
    if (roh) return { einstellungen: null, letzterBesuch: null, gemerkt: [], ...JSON.parse(roh) };
  } catch {
    /* privater Modus */
  }
  return { einstellungen: null, letzterBesuch: null, gemerkt: [] };
}

export function speichereRadar(z: RadarZustand) {
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify(z));
    window.dispatchEvent(new CustomEvent(AENDERUNG));
  } catch {
    /* ohne Speicher weiter */
  }
}

/** Passt ein Event zu den Einstellungen? Online-Events zählen überall, wenn gewünscht. */
export function passt(e: GruenderEvent, s: RadarEinstellungen): boolean {
  if (!s.arten.includes(e.art)) return false;
  if (e.format === "online") {
    if (!s.online) return false;
  } else if (s.region && e.region !== s.region) return false;
  if (s.nurKostenlos && e.kostenlos !== true) return false;
  const worte = s.stichworte.split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
  if (worte.length) {
    const text = `${e.name} ${e.veranstalter} ${e.kurz}`.toLowerCase();
    if (!worte.some((w) => text.includes(w))) return false;
  }
  return true;
}

/**
 * Neu = vom Monitor nach dem letzten Besuch gefunden. Beim allerersten Besuch ist
 * nichts „neu“ – sonst wäre der ganze Bestand markiert; ab dann zählt jeder neue Fund.
 */
export function istNeu(e: GruenderEvent, letzterBesuch: string | null, _heute: string): boolean {
  if (!e.entdeckt || !letzterBesuch) return false;
  return e.entdeckt > letzterBesuch;
}

/**
 * Zähler für Sidebar/Dashboard. Lädt die Event-Daten (~300 KB) erst nachträglich
 * per dynamic import, damit sie nicht im Hauptbundle landen; aktualisiert sich,
 * wenn das Radar geändert wird.
 */
export function useRadarZaehler(): { neu: number; eingerichtet: boolean; region: string | null } {
  const [z, setZ] = useState<RadarZustand>(() => (typeof window === "undefined" ? { einstellungen: null, letzterBesuch: null, gemerkt: [] } : ladeRadar()));
  const [events, setEvents] = useState<GruenderEvent[] | null>(null);
  useEffect(() => {
    const neuLaden = () => setZ(ladeRadar());
    window.addEventListener(AENDERUNG, neuLaden);
    window.addEventListener("storage", neuLaden);
    return () => {
      window.removeEventListener(AENDERUNG, neuLaden);
      window.removeEventListener("storage", neuLaden);
    };
  }, []);
  useEffect(() => {
    if (!z.einstellungen || events) return;
    let aktiv = true;
    import("@/data/gruenderEvents").then((m) => {
      if (aktiv) setEvents(m.aktuelleEvents(new Date().toISOString().slice(0, 10)));
    });
    return () => {
      aktiv = false;
    };
  }, [z.einstellungen, events]);
  if (!z.einstellungen) return { neu: 0, eingerichtet: false, region: null };
  const heute = new Date().toISOString().slice(0, 10);
  const neu = (events ?? []).filter((e) => e.datum && passt(e, z.einstellungen!) && istNeu(e, z.letzterBesuch, heute)).length;
  return { neu, eingerichtet: true, region: z.einstellungen.region };
}
