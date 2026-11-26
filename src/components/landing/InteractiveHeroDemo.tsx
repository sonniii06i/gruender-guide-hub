import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoTrack {
  id: string;
  tab: string;
  title: string;
  subtitle: string;
  href: string;
  icon: typeof CreditCard;
  steps: { id: string; title: string; meta: string; defaultDone?: boolean }[];
  workspaceTitle: string;
  workspaceRows: { label: string; value: string; ok: boolean }[];
}

const TRACKS: DemoTrack[] = [
  {
    id: "amex",
    tab: "Amex US",
    title: "Amex US beantragen (Privat & Business)",
    subtitle: "Global Transfer aus Deutschland, echte Voraussetzungen",
    href: "/guides/amex-us-beantragen",
    icon: CreditCard,
    steps: [
      { id: "a1", title: "US-Wohnadresse + Utility-Rechnung (z. B. Cloud Residence)", meta: "ca. 300 € / Quartal", defaultDone: true },
      { id: "a2", title: "Tello US-eSIM für den Amex-Verifizierungsanruf aktivieren", meta: "Wi-Fi Calling aus DE", defaultDone: false },
      { id: "a3", title: "US-Bankkonto klären (Chase/BofA vor Ort vs. Wise-Risiko)", meta: "Bankprüfung-Check", defaultDone: false },
    ],
    workspaceTitle: "Arbeitsfenster: Amex-US-Startcheck",
    workspaceRows: [
      { label: "US-Adresse + Utility-Bill", value: "Cloud Residence bereit", ok: true },
      { label: "US-Nummer (kein VoIP)", value: "Tello eSIM aktiv", ok: true },
      { label: "Sicheres US-Konto", value: "Filialbesuch + Reisepass", ok: false },
    ],
  },
  {
    id: "webapp",
    tab: "Website & App",
    title: "Eigene Website & App live bringen",
    subtitle: "Von Domain und Impressum bis zum fertigen Launch",
    href: "/guides/eigene-app-launchen",
    icon: Smartphone,
    steps: [
      { id: "w1", title: "Ziel, Domain und klares Angebot festlegen", meta: "ca. 30 Min.", defaultDone: true },
      { id: "w2", title: "Impressum, Datenschutz & Bruttopreise einbauen", meta: "Pflicht vor Go-Live", defaultDone: false },
      { id: "w3", title: "Ersten Testkauf / App-Store-Check durchführen", meta: "Checkliste + Export", defaultDone: false },
    ],
    workspaceTitle: "Arbeitsfenster: Launch-Checkliste",
    workspaceRows: [
      { label: "Impressum & Datenschutz", value: "Vollständig verlinkt", ok: true },
      { label: "Preise brutto inkl. USt.", value: "Geprüft", ok: true },
      { label: "App-Store-Testlauf", value: "Offen", ok: false },
    ],
  },
  {
    id: "gmbh",
    tab: "GmbH & Gewerbe",
    title: "Gründung & ELSTER in Reihenfolge",
    subtitle: "Gewerbe, Fragebogen, Steuernummer ohne Behördenchaos",
    href: "/guides/einzelunternehmen-gruendung",
    icon: Building2,
    steps: [
      { id: "g1", title: "Rechtsform & U18-Sonderfall (§ 112 BGB) klären", meta: "ca. 15 Min.", defaultDone: true },
      { id: "g2", title: "GewA1-Formular im Arbeitsfenster ausfüllen", meta: "PDF direkt fertig", defaultDone: false },
      { id: "g3", title: "ELSTER-Fragebogen binnen 1 Monat senden (§ 138 AO)", meta: "Zeile für Zeile", defaultDone: false },
    ],
    workspaceTitle: "Arbeitsfenster: GewA1 & ELSTER",
    workspaceRows: [
      { label: "Gewerbeanmeldung (GewA1)", value: "PDF vorbereitet", ok: true },
      { label: "Kleinunternehmer-Check", value: "25.000 € / 100.000 €", ok: true },
      { label: "ELSTER-Übermittlung", value: "Frist: 30 Tage", ok: false },
    ],
  },
];

/**
 * Helle, interaktive Produkt-Vorschau im Studyflix-/Udemy-/Lexoffice-Stil:
 * Besucher testen direkt Themen, haken echte Schritte ab und klappen das Arbeitsfenster auf.
 */
export const InteractiveHeroDemo = () => {
  const [trackId, setTrackId] = useState<string>("amex");
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({ a1: true, w1: true, g1: true });
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];
  const doneInTrack = track.steps.filter((s) => doneMap[s.id]).length;
  const totalDone = Object.values(doneMap).filter(Boolean).length;
  const xp = 100 + totalDone * 50;
  const pct = Math.round((doneInTrack / track.steps.length) * 100);

  const toggleStep = (id: string) => {
    setDoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
      aria-label="Interaktive Produktvorschau GründerX"
    >
      {/* Kopfzeile mit Themen-Tabs + XP */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/50 px-4 py-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Beispiel-Kurse">
          {TRACKS.map((t) => {
            const Icon = t.icon;
            const active = t.id === track.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTrackId(t.id);
                  setWorkspaceOpen(false);
                }}
                className={cn(
                  "press inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors",
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-foreground/80 ring-1 ring-border hover:text-primary",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {t.tab}
              </button>
            );
          })}
        </div>

        <span className="inline-flex items-center gap-1 rounded-md bg-brand-green-soft px-2.5 py-1 text-xs font-semibold text-brand-green tabular">
          <Zap className="h-3.5 w-3.5" aria-hidden="true" />
          {xp} XP
        </span>
      </div>

      {/* Kurs-Inhalt */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-brand-green">Interaktive Vorschau (klickbar)</span>
          <span className="font-semibold text-foreground tabular">{doneInTrack} von {track.steps.length} erledigt</span>
        </div>
        <p className="mt-1 text-base font-bold leading-snug text-primary sm:text-lg">{track.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{track.subtitle}</p>

        {/* Fortschrittsbalken */}
        <div className="mt-3 flex items-center gap-1.5" aria-label={`Fortschritt ${pct} Prozent`}>
          {track.steps.map((s) => (
            <span
              key={s.id}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors duration-200",
                doneMap[s.id] ? "bg-brand-green" : "bg-secondary",
              )}
            />
          ))}
        </div>

        {/* Klickbare Schritt-Karten */}
        <div className="mt-4 space-y-2">
          {track.steps.map((s, idx) => {
            const checked = Boolean(doneMap[s.id]);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleStep(s.id)}
                className={cn(
                  "press flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                  checked
                    ? "border-brand-green/35 bg-brand-green-soft/60"
                    : "border-border bg-white hover:border-primary/35 hover:bg-secondary/40",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular transition-colors",
                    checked ? "bg-brand-green text-white" : "bg-secondary text-primary",
                  )}
                >
                  {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : idx + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-[13px] font-semibold leading-snug", checked ? "text-muted-foreground line-through" : "text-foreground")}>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">{s.meta}</span>
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold tabular",
                    checked ? "bg-brand-green-soft text-brand-green" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {checked ? "+50 XP ✓" : "+50 XP"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Aufklappbares Arbeitsfenster */}
        <div className="mt-3.5 rounded-xl border border-border bg-secondary/45 p-3">
          <button
            type="button"
            aria-expanded={workspaceOpen}
            onClick={() => setWorkspaceOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 text-left text-xs font-semibold text-primary"
          >
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-border">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {track.workspaceTitle}
            </span>
            <span className="rounded-lg border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-accent-blue">
              {workspaceOpen ? "Schließen" : "Fenster öffnen"}
            </span>
          </button>

          {workspaceOpen && (
            <ul className="mt-3 space-y-1.5 border-t border-border pt-2.5 text-xs">
              {track.workspaceRows.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-border/70">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={cn("font-semibold", row.ok ? "text-brand-green" : "text-warning")}>
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Direkt-Link */}
        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">81 Kurse · Handy &amp; Web</span>
          <Link
            to={track.href}
            className="inline-flex items-center gap-1 font-semibold text-accent-blue hover:underline"
          >
            Kompletten Guide ansehen
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
