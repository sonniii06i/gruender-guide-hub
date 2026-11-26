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
  CalendarClock,
  CalendarDays,
  ChevronDown,
  Radar,
  Target,
  Calculator,
  Compass,
  FileSpreadsheet,
  Flame,
  Gift,
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  ListTree,
  MessageCircle,
  MessageSquare,
  PlayCircle,
  Scale,
  Search,
  Shield,
  Trophy,
  Users,
  Wrench,
  Percent,
  FileX,
  CalendarRange,
  Sparkles,
  BookOpen,
  CreditCard,
  Zap,
} from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useAuth";
import { useRadarZaehler } from "@/lib/eventRadar";
import { LANDING_TOOLS } from "@/data/features";
import { RUNDGANG_EVENT } from "@/lib/tourLage";
import { getLevelInfo, readGamification, GAMIFICATION_EVENT } from "@/lib/gamification";

const ZU_KEY = "gx-sidebar-zu-v1";
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

export function AppSidebar() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname, search } = useLocation();
  const { isAdmin } = useRole();
  const { user } = useAuth();
  const radar = useRadarZaehler();
  const neueChancen = useNeueChancen(pathname);
  const { zu, umschalten } = useZugeklappt();
  const [gamTick, setGamTick] = useState(0);

  useEffect(() => {
    const onGam = () => setGamTick((n) => n + 1);
    window.addEventListener(GAMIFICATION_EVENT, onGam);
    return () => window.removeEventListener(GAMIFICATION_EVENT, onGam);
  }, []);

  const gam = useMemo(() => readGamification(user?.id), [user?.id, gamTick]);
  const lvl = useMemo(() => getLevelInfo(gam.xp), [gam.xp]);

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  const isActive = (route: string, exact = true) =>
    exact ? pathname === route : pathname.startsWith(route);
  const dash = (view: string) => pathname === "/dashboard" && search.includes(`view=${view}`);

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      <SidebarHeader className="h-16 justify-center border-b border-white/10 py-0">
        <Link to="/dashboard" aria-label="Zur Übersicht" className="flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Logo asImage className="h-5 w-5 brightness-0 invert" />
          </span>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold tracking-tight text-white">GründerX</span>
              <span className="text-[11px] font-medium text-[#6EE7B7]">Lern-Studio</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {!collapsed && <ToolSuche onGo={closeOnMobile} />}

        <SidebarGroup data-tour="start">
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/dashboard" icon={LayoutDashboard} label="Übersicht" active={pathname === "/dashboard" && !search} />
              <Item to="/felix" icon={MessageSquare} label="Felix fragen" hint="KI-Co-Pilot" active={pathname === "/felix"} />
              <Item to="/felix/chats" icon={ListTree} label="Meine Chats" active={pathname === "/felix/chats"} />
              {isAdmin && <Item to="/admin" icon={Shield} label="Admin" active={pathname === "/admin"} />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Gruppe id="lernen" titel="Lernen" zu={zu} umschalten={umschalten} collapsed={collapsed}>
          <Item to="/playbooks" icon={GraduationCap} label="Alle 81 Kurse" active={pathname === "/playbooks"} />
          <Item to="/playbook/preview/amex-us-beantragen" icon={CreditCard} label="Amex US Guide" hint="Privat & Business" active={pathname.includes("amex-us-beantragen")} />
          <Item to="/dashboard?view=meine" icon={PlayCircle} label="Meine Kurse" active={dash("meine")} />
          <Item to="/quiz" icon={Sparkles} label="Quizze & Checks" hint="XP & Rabatt" active={isActive("/quiz", false) || isActive("/umfrage", false)} />
          <Item to="/listicles" icon={BookOpen} label="Listicles" hint="Kompakte Übersichten" active={isActive("/listicles", false)} />
          <Item to="/dashboard?view=themen" icon={Compass} label="Themen entdecken" active={dash("themen")} />
          <Item to="/cockpit/aktuell" icon={CalendarRange} label="Was sich ändert" hint="Neu ab 2027" active={isActive("/cockpit/aktuell")} />
        </Gruppe>

        <Gruppe id="werkzeuge" titel="Werkzeuge" zu={zu} umschalten={umschalten} collapsed={collapsed}>
          <Item to="/dashboard?view=tools" icon={Wrench} label="Alle Tools & Rechner" active={dash("tools")} />
          <Item to="/wizard/rechtsform" icon={Scale} label="Rechtsform finden" active={isActive("/wizard/rechtsform", false)} />
          <Item to="/cockpit/steuer" icon={Calculator} label="Steuer-Cockpit" active={isActive("/cockpit/steuer")} />
          <Item to="/cockpit/steuerkalender" icon={CalendarClock} label="Steuer- & Fristenkalender" active={isActive("/cockpit/steuerkalender")} />
          <Item to="/cockpit/gruendungsunterlagen" icon={FileSpreadsheet} label="Finanzplan" active={isActive("/cockpit/gruendungsunterlagen")} />
          <Item to="/anbieter" icon={Trophy} label="Anbieter-Vergleich" active={isActive("/anbieter", false)} />
        </Gruppe>

        <Gruppe id="geld" titel="Geld & Chancen" zu={zu} umschalten={umschalten} collapsed={collapsed} badge={neueChancen}>
          <Item to="/cockpit/chancen-radar" icon={Target} label="Chancen-Radar" active={isActive("/cockpit/chancen-radar")} badge={neueChancen} />
          <Item to="/gruender-chancen" icon={Trophy} label="Gründer-Chancen" hint="Preisgeld & Pitch" active={isActive("/gruender-chancen")} />
          <Item to="/startup-guthaben" icon={Gift} label="Startup-Guthaben" hint="Credits & Perks" active={isActive("/startup-guthaben")} />
          <Item to="/cockpit/foerderung" icon={HandCoins} label="Förder-Datenbank" active={isActive("/cockpit/foerderung")} />
        </Gruppe>

        <Gruppe id="netzwerk" titel="Events & Netzwerk" zu={zu} umschalten={umschalten} collapsed={collapsed} badge={radar.neu}>
          <Item to="/cockpit/event-radar" icon={Radar} label="Mein Event-Radar" active={isActive("/cockpit/event-radar")} badge={radar.neu} />
          <Item to="/gruender-events" icon={CalendarDays} label="Gründer-Events" active={isActive("/gruender-events")} />
          <Item to="/community/mitgruender" icon={Users} label="Mitgründer-Börse" active={isActive("/community/mitgruender", false)} />
          <Item to="/affiliate" icon={Percent} label="Partnerprogramm" active={pathname === "/affiliate"} />
        </Gruppe>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10">
        {!collapsed && (
          <Link
            to="/quiz"
            onClick={closeOnMobile}
            className="mx-1 mb-2 block rounded-xl border border-white/12 bg-white/[0.06] p-3 transition-colors hover:bg-white/[0.11]"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-bold text-white">
                <Zap className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                Lvl {lvl.level} · {lvl.titel}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-300 tabular">
                <Flame className="h-3 w-3" aria-hidden="true" />
                {gam.streak} T
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${Math.max(8, lvl.progressPercent)}%` }} />
            </div>
            <p className="mt-1.5 flex items-center justify-between text-[11px] text-white/65 tabular">
              <span>{gam.xp} XP</span>
              <span className="font-semibold text-[#6EE7B7]">+150 XP Quiz →</span>
            </p>
          </Link>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Discord-Community">
              <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" onClick={closeOnMobile}>
                <Users className="h-4 w-4" />
                <span>Discord-Community</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/support"} tooltip="Support">
              <NavLink to="/support" onClick={closeOnMobile}>
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/kuendigen"} tooltip="Verträge hier kündigen">
              <NavLink to="/kuendigen" onClick={closeOnMobile}>
                <FileX className="h-4 w-4" />
                <span>Verträge hier kündigen</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/faq"} tooltip="FAQ">
              <NavLink to="/faq" onClick={closeOnMobile}>
                <MessageCircle className="h-4 w-4" />
                <span>FAQ</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
    <SidebarGroup className="py-1" data-tour={`gruppe-${id}`}>
      <SidebarGroupLabel asChild>
        <button
          type="button"
          onClick={() => umschalten(id)}
          aria-expanded={offen}
          className="w-full justify-between text-[11px] font-bold uppercase tracking-wider text-white/55 hover:text-white"
        >
          <span>{titel}</span>
          <span className="flex items-center gap-1.5">
            {!offen && !!badge && (
              <span className="tabular rounded-md bg-[#10B981] px-1.5 text-[10px] font-bold leading-4 text-[#042016]">
                {badge > 99 ? "99+" : badge}
              </span>
            )}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${offen ? "" : "-rotate-90"}`} />
          </span>
        </button>
      </SidebarGroupLabel>
      {offen && (
        <SidebarGroupContent>
          <SidebarMenu>{children}</SidebarMenu>
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
    <div className="px-2 pb-1 pt-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" aria-hidden="true" />
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
          className="h-9 w-full rounded-xl border border-white/15 bg-white/[0.08] pl-8 pr-10 text-[13px] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#6EE7B7] focus:bg-white/[0.12]"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-white/15 bg-white/10 px-1.5 py-px font-sans text-[10px] text-white/70">
          ⌘K
        </kbd>
      </div>
      {q.trim() && (
        <ul className="mt-1.5 overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-lift" role="listbox">
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
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  hint?: string;
  active: boolean;
  badge?: number;
}) => {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={hint ? `${label}: ${hint}` : label}
        className={
          active
            ? "rounded-xl bg-white/14 font-semibold text-white hover:bg-white/18 hover:text-white data-[active=true]:bg-white/14 data-[active=true]:text-white"
            : "rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
        }
      >
        <NavLink to={to} data-tour={to} onClick={() => { if (isMobile) setOpenMobile(false); }}>
          <Icon className={active ? "h-4 w-4 text-[#6EE7B7]" : "h-4 w-4 text-white/65"} />
          <span>{label}</span>
          {!!badge && (
            <span
              className="tabular ml-auto rounded-md bg-[#10B981] px-1.5 text-[10px] font-bold leading-4 text-[#042016]"
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
