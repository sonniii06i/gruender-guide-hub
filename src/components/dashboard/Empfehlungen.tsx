import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock, Compass, GraduationCap, History, ListChecks, Lock, MessageSquare, Scale, Wrench, type LucideIcon } from "lucide-react";
import { CATEGORIES, type Feature } from "@/data/features";
import type { Playbook } from "@/data/playbooks";
import { empfohleneToolSlugs, empfohleneVergleiche, felixFragen, vergleichRoute, type PlanProfil } from "@/lib/startplan";
import { ANBIETER_KATEGORIEN, GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";
import { ToneBadge, type Tone } from "@/components/cockpit/kit";
import { cn } from "@/lib/utils";

/** Rahmen aller Cockpit-Karten: Kopfzeile mit Titel und optionalem Link, Inhalt darunter. */
export const Karte = ({
  titel, icon: Icon, aktion, children, className,
}: { titel: string; icon?: LucideIcon; aktion?: ReactNode; children: ReactNode; className?: string }) => (
  <section className={cn("rounded-lg border border-border bg-card", className)}>
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-4 py-3">
      <h2 className="flex items-center gap-2 text-[15px] font-semibold leading-tight">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
        {titel}
      </h2>
      {aktion}
    </div>
    {children}
  </section>
);

export const KartenLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="inline-flex items-center gap-1 text-[13px] font-medium text-accent-blue hover:underline">
    {children} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
  </Link>
);

const ALLE_FEATURES: Feature[] = CATEGORIES.flatMap((c) => c.features);
const FEATURE_NACH_SLUG = new Map(ALLE_FEATURES.map((f) => [f.slug, f]));
const FEATURE_NACH_PFAD = new Map(
  ALLE_FEATURES.filter((f) => f.route && !f.external).map((f) => [f.route!.split("?")[0], f]),
);

// ───────────────────────── Tools ─────────────────────────

export const ToolEmpfehlungen = ({ profil, locked }: { profil: PlanProfil; locked: boolean }) => {
  const tools = empfohleneToolSlugs(profil, 6)
    .map((s) => FEATURE_NACH_SLUG.get(s))
    .filter((f): f is Feature => !!f && !!f.route);
  if (tools.length === 0) return null;
  return (
    <Karte titel="Tools für dein Vorhaben" icon={Wrench} aktion={<KartenLink to="/dashboard?view=tools">Alle {TOOL_COUNT} Tools</KartenLink>}>
      <ul className="grid sm:grid-cols-2">
        {tools.map((f, i) => (
          <li key={f.slug} className={cn("border-border", i > 0 && "border-t", i === 1 && "sm:border-t-0", i % 2 === 0 && "sm:border-r")}>
            <Link to={f.route!} className="group flex h-full items-start gap-3 px-4 py-3 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40">
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-snug">{f.title}</span>
                <span className="mt-0.5 text-[13px] leading-snug text-muted-foreground line-clamp-2">{f.desc}</span>
              </span>
              {locked ? (
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-label="Im Abo enthalten" />
              ) : (
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Karte>
  );
};

// ───────────────────────── Guides ─────────────────────────

const DIFF_TONE: Record<Playbook["difficulty"], Tone> = { Einfach: "success", Mittel: "info", Komplex: "warning" };

export const GuideEmpfehlungen = ({ guides }: { guides: Playbook[] }) => (
  <Karte titel="Guides für dein Vorhaben" icon={GraduationCap} aktion={<KartenLink to="/playbooks">Alle {GUIDE_COUNT} Guides</KartenLink>}>
    <ul className="divide-y divide-border">
      {guides.map((pb) => (
        <li key={pb.slug}>
          <Link to={`/playbook/preview/${pb.slug}`} className="group flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-lg" aria-hidden="true">{pb.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium leading-snug">{pb.title}</span>
              <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" /> {pb.duration}</span>
                <span className="inline-flex items-center gap-1 tabular"><ListChecks className="h-3 w-3" aria-hidden="true" /> {pb.steps.length} Schritte</span>
              </span>
            </span>
            <ToneBadge tone={DIFF_TONE[pb.difficulty]} className="hidden shrink-0 sm:inline-flex">{pb.difficulty}</ToneBadge>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  </Karte>
);

// ───────────────────────── Felix ─────────────────────────

export const FelixFragen = ({ profil }: { profil: PlanProfil }) => (
  <Karte titel="Frag Felix" icon={MessageSquare} aktion={<KartenLink to="/felix">Chat öffnen</KartenLink>}>
    <ul className="divide-y divide-border">
      {felixFragen(profil).map((frage) => (
        <li key={frage}>
          <Link
            to={`/felix?frage=${encodeURIComponent(frage)}`}
            className="group flex items-start gap-2.5 px-4 py-2.5 text-sm leading-snug hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
          >
            <span className="min-w-0 flex-1 text-pretty">{frage}</span>
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
    <p className="border-t border-border px-4 py-2.5 text-xs leading-relaxed text-muted-foreground">
      Die Frage landet vorausgefüllt im Chat, du kannst sie vor dem Senden anpassen.
    </p>
  </Karte>
);

// ───────────────────────── Anbieter-Vergleiche ─────────────────────────

export const VergleichTipps = ({ profil }: { profil: PlanProfil }) => (
  <Karte titel="Anbieter vergleichen" icon={Scale} aktion={<KartenLink to="/anbieter"><span aria-hidden="true">Alle {ANBIETER_KATEGORIEN}</span><span className="sr-only">Alle {ANBIETER_KATEGORIEN} Kategorien im Anbieter-Vergleich</span></KartenLink>}>
    <ul className="divide-y divide-border">
      {empfohleneVergleiche(profil).map((v) => (
        <li key={v.kategorie}>
          <Link to={vergleichRoute(v.kategorie)} className="group flex items-center gap-2.5 px-4 py-2.5 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40">
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-snug">{v.titel}</span>
              <span className="block text-[13px] leading-snug text-muted-foreground">{v.grund}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  </Karte>
);

// ───────────────────────── Mehr entdecken ─────────────────────────

const MEHR: { to: string; titel: string; text: string }[] = [
  { to: "/cockpit/foerderung", titel: "Förder-Datenbank", text: "Zuschüsse, Kredite und Programme" },
  { to: "/startup-guthaben", titel: "Startup-Guthaben", text: "Credits und Rabatte für Software" },
  { to: "/gruender-chancen", titel: "Gründer-Chancen", text: "Wettbewerbe und Preisgelder" },
  { to: "/vorlagen", titel: "Vertragsvorlagen", text: "Muster für Verträge und Schreiben" },
  { to: "/ratgeber", titel: "Ratgeber", text: "Hintergrund zu Steuern und Recht" },
];

export const MehrEntdecken = () => (
  <Karte titel="Mehr entdecken" icon={Compass}>
    <ul className="divide-y divide-border">
      {MEHR.map((m) => (
        <li key={m.to}>
          <Link to={m.to} className="group flex items-center gap-2.5 px-4 py-2.5 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40">
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium leading-snug">{m.titel}</span>
              <span className="block text-[13px] leading-snug text-muted-foreground">{m.text}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  </Karte>
);

// ───────────────────────── Zuletzt geöffnet ─────────────────────────

export const ZuletztGeoeffnet = ({ pfade }: { pfade: string[] }) => {
  const tools = pfade.map((p) => FEATURE_NACH_PFAD.get(p)).filter((f): f is Feature => !!f).slice(0, 4);
  if (tools.length === 0) return null;
  return (
    <nav aria-label="Zuletzt geöffnet" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
        <History className="h-3.5 w-3.5" aria-hidden="true" /> Zuletzt geöffnet
      </span>
      {tools.map((f) => (
        <Link
          key={f.slug}
          to={f.route!}
          className="max-w-full truncate rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 hover:border-foreground/30"
        >
          {f.title}
        </Link>
      ))}
    </nav>
  );
};
