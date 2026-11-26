import { DISCORD_INVITE_URL } from "@/config/links";
import Logo from "@/components/Logo";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  CalendarDays,
  ChevronDown,
  Target,
  Calculator,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  MessageCircle,
  MessageSquare,
  Search,
  Shield,
  Trophy,
  Users,
  Wrench,
  FileX,
  Sparkles,
} from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { useRadarZaehler } from "@/lib/eventRadar";
import { LANDING_TOOLS } from "@/data/features";
import { ANBIETER_ANZAHL } from "@/data/kennzahlen";
import { RUNDGANG_EVENT } from "@/lib/tourLage";

const ZU_KEY = "gx-sidebar-zu-v2";
const CHANCEN_BESUCH = "gx-chancen-radar-besuch";

function useZugeklappt() {
  const [zu, setZu] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(ZU_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [rundgang, setRundgang] = useState(false);
  useEffect(() => {
    const h = (e: Event) => setRundgang(!!(e as CustomEvent<boolean>).detail);
    window.addEventListener(RUNDGANG_EVENT, h);
    return () => window.removeEventListener(RUNDGANG_EVENT, h);
  }, []);
  const umschalten = (id: string) =>
    setZu((alt) => {
      const neu = alt.includes(id) ? alt.filter((x) => x !== id) : [...alt, id];
      try {
        localStorage.setItem(ZU_KEY, JSON.stringify(neu));
      } catch {
        /* ohne Speicher */
      }
      return neu;
    });
  return { zu: rundgang ? [] : zu, umschalten };
}

function useNeueChancen(pathname: string) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let vorher: string | null = null;
    try {
      vorher = localStorage.getItem(CHANCEN_BESUCH);
    } catch {
      /* ohne Speicher */
    }
    if (!vorher || pathname.startsWith("/cockpit/chancen-radar")) {
      setN(0);
      return;
    }
    let aktiv = true;
    import("@/data/chancenLive.json").then((m) => {
      const heute = new Date().toISOString().slice(0, 10);
      const eintraege = (m.default as { eintraege: { entdeckt?: string; frist?: string }[] }).eintraege;
      if (aktiv) setN(eintraege.filter((c) => c.entdeckt && c.entdeckt > vorher! && (!c.frist || c.frist >= heute)).length);
    });
    return () => {
      aktiv = false;
    };
  }, [pathname]);
  return n;
}

const STEUER_PFADE = [
  "/cockpit/steuer",
  "/cockpit/steuerkalender",
  "/cockpit/ust-voranmeldung",
  "/cockpit/anlage-euer",
  "/cockpit/quartals-steuer",
  "/cockpit/aktuell",
];

const CHANCEN_PFADE = [
  "/cockpit/chancen-radar",
  "/gruender-chancen",
  "/startup-guthaben",
  "/cockpit/foerderung",
];

const EVENT_PFADE = [
  "/gruender-events",
  "/cockpit/event-radar",
  "/community/mitgruender",
];

/**
 * Reduzierte, ruhige Lexoffice-Sidebar (10 klare Punkte statt 29):
 * Passt auf normalen Bildschirmen ohne Scrollen komplett ins Blickfeld.
 * Unterbereiche (Steuerkalender, Startup-Guthaben, Mitgründer-Börse etc.)
 * sitzen direkt als Sub-Tabs auf den jeweiligen Hub-Seiten.
 */
export function AppSidebar() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname, search } = useLocation();
  const { isAdmin } = useRole();
  const radar = useRadarZaehler();
  const neueChancen = useNeueChancen(pathname);
  const { zu, umschalten } = useZugeklappt();

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  const matchAny = (list: string[]) => list.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const dash = (view: string) => pathname === "/dashboard" && search.includes(`view=${view}`);

  const isSteuer = matchAny(STEUER_PFADE);
  const isChancen = matchAny(CHANCEN_PFADE);
  const isEvents = matchAny(EVENT_PFADE);
  const isKurse = pathname === "/playbooks" || pathname.startsWith("/playbook/") || dash("meine") || pathname.startsWith("/listicles");
  const isTools =
    dash("tools") ||
    dash("themen") ||
    pathname.startsWith("/wizard/") ||
    (pathname.startsWith("/cockpit/") && !isSteuer && !isChancen && !isEvents);

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-white">
      <SidebarHeader className="h-14 justify-center border-b border-border py-0">
        <Link to="/dashboard" aria-label="Zur Übersicht" className="flex items-center gap-2.5 px-2">
          <Logo asImage className="h-6 w-6 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold tracking-tight text-primary">GründerX</span>
              <span className="text-[11px] font-medium text-muted-foreground">Cockpit</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gx-scroll gap-0">
        {!collapsed && <ToolSuche onGo={closeOnMobile} />}

        {/* 6 klare Haupttabs */}
        <SidebarGroup className="py-2" data-tour="start">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <Item to="/dashboard" icon={LayoutDashboard} label="Übersicht" active={pathname === "/dashboard" && !search} />
              <Item to="/playbooks" icon={GraduationCap} label="Kurse & Guides" hint="Alle 81 Kurse" active={isKurse} dataTour="gruppe-lernen" />
              <Item to="/dashboard?view=tools" icon={Wrench} label="Tools & Rechner" hint="90 Rechner & Wizards" active={isTools} dataTour="gruppe-werkzeuge" />
              <Item to="/cockpit/steuer" icon={Calculator} label="Steuern & Fristen" hint="Steuer-Cockpit & Kalender" active={isSteuer} />
              <Item to="/anbieter" icon={Trophy} label="Anbieter-Vergleich" hint={`${ANBIETER_ANZAHL} Anbieter`} active={pathname === "/anbieter" || pathname.startsWith("/anbieter/")} />
              <Item to="/felix" icon={MessageSquare} label="Felix fragen" hint="KI-Co-Pilot & Chats" active={pathname === "/felix" || pathname.startsWith("/felix/")} />
              {isAdmin && <Item to="/admin" icon={Shield} label="Admin" active={pathname === "/admin"} />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Eine kompakte Zusatz-Gruppe (Partnerprogramm ausgeblendet) */}
        <Gruppe
          id="mehr"
          titel="Chancen & Mehr"
          zu={zu}
          umschalten={umschalten}
          collapsed={collapsed}
          badge={neueChancen + radar.neu}
        >
          <Item to="/quiz" icon={Sparkles} label="Quizze & Checks" hint="XP & Wissens-Checks" active={pathname.startsWith("/quiz") || pathname.startsWith("/umfrage")} />
          <Item to="/cockpit/chancen-radar" icon={Target} label="Chancen & Förderung" hint="Förderung, Preisgeld & Guthaben" active={isChancen} badge={neueChancen} dataTour="gruppe-geld" />
          <Item to="/gruender-events" icon={CalendarDays} label="Events & Netzwerk" hint="Events, Radar & Mitgründer" active={isEvents} badge={radar.neu} dataTour="gruppe-netzwerk" />
        </Gruppe>
      </SidebarContent>

      {/* Kompakter 2x2-Footer: spart vertikalen Platz */}
      <SidebarFooter className="border-t border-border p-2">
        {collapsed ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/support"} tooltip="Support">
                <NavLink to="/support" onClick={closeOnMobile}>
                  <LifeBuoy className="h-4 w-4" />
                  <span>Support</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <div className="grid grid-cols-2 gap-1 text-[11px] font-medium text-muted-foreground">
            <NavLink
              to="/support"
              onClick={closeOnMobile}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-primary"
            >
              <LifeBuoy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">Support</span>
            </NavLink>
            <NavLink
              to="/faq"
              onClick={closeOnMobile}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-primary"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">FAQ</span>
            </NavLink>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeOnMobile}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-primary"
            >
              <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">Discord</span>
            </a>
            <NavLink
              to="/kuendigen"
              onClick={closeOnMobile}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-primary"
            >
              <FileX className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">Kündigen</span>
            </NavLink>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

const Gruppe = ({
  id,
  titel,
  zu,
  umschalten,
  collapsed,
  badge,
  children,
}: {
  id: string;
  titel: string;
  zu: string[];
  umschalten: (id: string) => void;
  collapsed: boolean;
  badge?: number;
  children: React.ReactNode;
}) => {
  const offen = collapsed || !zu.includes(id);
  return (
    <SidebarGroup className="border-t border-border/70 py-2" data-tour={`gruppe-${id}`}>
      <SidebarGroupLabel asChild>
        <button
          type="button"
          onClick={() => umschalten(id)}
          aria-expanded={offen}
          className="h-7 w-full justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          <span>{titel}</span>
          <span className="flex items-center gap-1.5">
            {!offen && !!badge && (
              <span className="tabular rounded-md bg-brand-green px-1.5 text-[10px] font-bold leading-4 text-white">
                {badge > 99 ? "99+" : badge}
              </span>
            )}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${offen ? "" : "-rotate-90"}`} />
          </span>
        </button>
      </SidebarGroupLabel>
      {offen && (
        <SidebarGroupContent>
          <SidebarMenu className="gap-0.5">{children}</SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
};

const normal = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const ToolSuche = ({ onGo }: { onGo: () => void }) => {
  const [q, setQ] = useState("");
  const [aktiv, setAktiv] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", taste);
    return () => window.removeEventListener("keydown", taste);
  }, []);

  const treffer = useMemo(() => {
    const woerter = normal(q).split(/\s+/).filter(Boolean);
    if (!woerter.length) return [];
    return LANDING_TOOLS.map((t) => {
      const titel = normal(t.title);
      const alles = `${titel} ${normal(t.desc)} ${normal(t.categoryTitle)}`;
      if (!woerter.every((w) => alles.includes(w))) return null;
      return { t, punkte: woerter.filter((w) => titel.includes(w)).length * 10 + (titel.startsWith(woerter[0]) ? 5 : 0) };
    })
      .filter((x): x is { t: (typeof LANDING_TOOLS)[number]; punkte: number } => !!x)
      .sort((a, b) => b.punkte - a.punkte)
      .slice(0, 7)
      .map((x) => x.t);
  }, [q]);

  const geh = (route: string) => {
    navigate(route);
    setQ("");
    ref.current?.blur();
    onGo();
  };

  return (
    <div className="px-2 pb-1 pt-2.5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          ref={ref}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setAktiv(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setAktiv((i) => Math.min(i + 1, treffer.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setAktiv((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && treffer[aktiv]?.route) {
              geh(treffer[aktiv].route!);
            } else if (e.key === "Escape") {
              setQ("");
            }
          }}
          placeholder="Tool suchen …"
          aria-label="Tool suchen"
          className="h-9 w-full rounded-lg border border-border bg-secondary/55 pl-8 pr-9 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:bg-white"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-white px-1 py-px font-sans text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      {q.trim() && (
        <ul className="mt-1.5 overflow-hidden rounded-xl border border-border bg-white p-1 text-foreground shadow-soft" role="listbox">
          {treffer.map((t, i) => (
            <li key={t.slug} role="option" aria-selected={i === aktiv}>
              <button
                type="button"
                onMouseEnter={() => setAktiv(i)}
                onClick={() => geh(t.route!)}
                className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] leading-snug transition-colors ${i === aktiv ? "bg-secondary" : ""}`}
              >
                <span className="font-semibold text-foreground">{t.title}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{t.categoryTitle}</span>
              </button>
            </li>
          ))}
          {!treffer.length && (
            <li className="px-2.5 py-2 text-xs leading-relaxed text-muted-foreground">
              Kein Tool gefunden. Frag Felix, er hilft dir weiter.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const Item = ({
  to,
  icon: Icon,
  label,
  hint,
  active,
  badge,
  dataTour,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  hint?: string;
  active: boolean;
  badge?: number;
  dataTour?: string;
}) => {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem data-tour={dataTour}>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={hint ? `${label}: ${hint}` : label}
        className={
          active
            ? "h-9 rounded-lg bg-accent font-semibold text-primary hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
            : "h-9 rounded-lg text-foreground/80 hover:bg-secondary hover:text-primary"
        }
      >
        <NavLink to={to} data-tour={to} onClick={() => { if (isMobile) setOpenMobile(false); }}>
          <Icon className={active ? "h-4 w-4 text-primary" : "h-4 w-4 text-muted-foreground"} />
          <span className="text-[13.5px]">{label}</span>
          {!!badge && (
            <span
              className="tabular ml-auto rounded-md bg-brand-green px-1.5 text-[10px] font-bold leading-4 text-white"
              aria-label={`${badge} neu`}
            >
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
