import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Flame,
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
 * Interaktive Mini-Studio-Vorschau im Startseiten-Hero:
 * Besucher können direkt Tracks wechseln, Schritte abhaken (+50 XP live) und das
 * Arbeitsfenster aufklappen — statt eines statischen Screenshots.
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
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#081534]/90 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md sm:p-5"
      aria-label="Interaktive Produktvorschau GründerX Lern-Studio"
    >
      {/* Top Studio Bar: Track-Tabs + Live XP */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
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
                  "press inline-flex min-h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition-colors",
                  active
                    ? "bg-white text-[#0B1B40] shadow-sm"
                    : "bg-white/[0.07] text-white/75 hover:bg-white/15 hover:text-white",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {t.tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 px-2.5 py-1 text-[11px] font-bold text-[#6EE7B7] tabular">
            <Zap className="h-3 w-3" aria-hidden="true" />
            {xp} XP
          </span>
          <span className="hidden items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 text-[11px] font-bold text-amber-300 tabular sm:inline-flex">
            <Flame className="h-3 w-3" aria-hidden="true" />
            3 Tage
          </span>
        </div>
      </div>

      {/* Aktiver Kurs-Header */}
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 text-xs text-white/65">
          <span className="font-semibold uppercase tracking-wider text-[#6EE7B7]">Live-Vorschau · Klick zum Testen</span>
          <span className="font-semibold tabular text-white/85">{doneInTrack} von {track.steps.length} erledigt</span>
        </div>
        <p className="mt-1 text-base font-bold leading-snug text-white sm:text-lg">{track.title}</p>
        <p className="mt-0.5 text-xs text-white/65">{track.subtitle}</p>

        {/* Segmentierter Fortschrittsbalken */}
        <div className="mt-3 flex items-center gap-1.5" aria-label={`Fortschritt ${pct} Prozent`}>
          {track.steps.map((s) => (
            <span
              key={s.id}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors duration-200",
                doneMap[s.id] ? "bg-[#10B981]" : "bg-white/15",
              )}
            />
          ))}
        </div>
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
                "press flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                checked
                  ? "border-[#10B981]/45 bg-[#10B981]/12"
                  : "border-white/12 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.09]",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular transition-colors",
                  checked ? "bg-[#10B981] text-[#042016]" : "bg-white/15 text-white",
                )}
              >
                {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : idx + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-[13px] font-semibold leading-snug", checked ? "text-white/75 line-through" : "text-white")}>
                  {s.title}
                </span>
                <span className="mt-0.5 block text-[11px] text-white/55">{s.meta}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold tabular",
                  checked ? "bg-[#10B981]/25 text-[#6EE7B7]" : "bg-white/10 text-white/70",
                )}
              >
                {checked ? "+50 XP ✓" : "+50 XP"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Aufklappbares Arbeitsfenster direkt in der Demo */}
      <div className="mt-3.5 rounded-2xl border border-white/15 bg-white/[0.06] p-3">
        <button
          type="button"
          aria-expanded={workspaceOpen}
          onClick={() => setWorkspaceOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 text-left text-xs font-bold text-white"
        >
          <span className="inline-flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#6EE7B7]">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {track.workspaceTitle}
          </span>
          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#6EE7B7]">
            {workspaceOpen ? "Schließen" : "Fenster öffnen"}
          </span>
        </button>

        {workspaceOpen && (
          <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-2.5 text-xs">
            {track.workspaceRows.map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-2 rounded-lg bg-black/20 px-2.5 py-1.5">
                <span className="text-white/75">{row.label}</span>
                <span className={cn("font-semibold", row.ok ? "text-[#6EE7B7]" : "text-amber-300")}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Direkt-Link zum echten Guide */}
      <div className="mt-3.5 flex items-center justify-between gap-2 pt-1 text-xs">
        <span className="text-white/55">81 Kurse · Handy &amp; Web</span>
        <Link
          to={track.href}
          className="inline-flex items-center gap-1 font-bold text-[#6EE7B7] hover:underline"
        >
          Kompletten Guide ansehen
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
