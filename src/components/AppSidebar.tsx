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
} from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { useRadarZaehler } from "@/lib/eventRadar";
import { LANDING_TOOLS } from "@/data/features";

// Seitenleiste nach der Gründer-Reise: Start → Lernen → Werkzeuge → Geld & Chancen
// → Community. Gruppen lassen sich zuklappen (gemerkt im Browser), oben eine
// Schnellsuche über alle Tools (Tastenkürzel ⌘K / Strg+K).

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
  return { zu, umschalten };
}

// Neue Chancen seit dem letzten Besuch im Chancen-Radar (Daten erst nachladen, nicht im Haupt-Bundle).
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
  const radar = useRadarZaehler();
  const neueChancen = useNeueChancen(pathname);
  const { zu, umschalten } = useZugeklappt();

  // Auf Mobile schließt das Sidebar-Sheet automatisch, sobald ein Eintrag geklickt wird.
  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  const isActive = (route: string, exact = true) =>
    exact ? pathname === route : pathname.startsWith(route);
  const dash = (view: string) => pathname === "/dashboard" && search.includes(`view=${view}`);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center py-0 border-b border-sidebar-border">
        <Link to="/" aria-label="Zur Startseite" className="flex items-center gap-2 px-2">
          <Logo asImage className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-sm">GründerX</span>
              <span className="text-[10px] text-muted-foreground">Dein Gründer-Cockpit</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {!collapsed && <ToolSuche onGo={closeOnMobile} />}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/dashboard" icon={LayoutDashboard} label="Übersicht" active={pathname === "/dashboard" && !search} />
              <Item to="/felix" icon={MessageSquare} label="Felix fragen" hint="KI-Gründungsberater" active={pathname === "/felix"} />
              <Item to="/felix/chats" icon={ListTree} label="Meine Chats" active={pathname === "/felix/chats"} />
              {isAdmin && <Item to="/admin" icon={Shield} label="Admin" active={pathname === "/admin"} />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Gruppe id="lernen" titel="Lernen" zu={zu} umschalten={umschalten} collapsed={collapsed}>
          <Item to="/playbooks" icon={GraduationCap} label="Alle Guides" active={isActive("/playbooks", false)} />
          <Item to="/dashboard?view=meine" icon={PlayCircle} label="Meine Guides" active={dash("meine")} />
          <Item to="/dashboard?view=themen" icon={Compass} label="Themen entdecken" active={dash("themen")} />
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

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Discord-Community">
              <a href="https://discord.gg/Ys9ZmBY8" target="_blank" rel="noopener noreferrer" onClick={closeOnMobile}>
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
  // Eingeklappte Seitenleiste zeigt nur Symbole – dann immer alle Einträge.
  const offen = collapsed || !zu.includes(id);
  return (
    <SidebarGroup className="py-1">
      <SidebarGroupLabel asChild>
        <button type="button" onClick={() => umschalten(id)} aria-expanded={offen} className="w-full justify-between hover:text-sidebar-foreground">
          <span>{titel}</span>
          <span className="flex items-center gap-1.5">
            {!offen && !!badge && <span className="rounded-full bg-accent-blue text-primary-foreground px-1.5 text-[10px] font-bold leading-4">{badge > 99 ? "99+" : badge}</span>}
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

const normal = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

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
    <div className="px-2 pt-3 pb-1">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
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
          className="h-8 w-full rounded-md border border-sidebar-border bg-background pl-8 pr-10 text-xs outline-none focus:ring-2 focus:ring-accent-blue/40"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-sidebar-border px-1 text-[9px] text-muted-foreground">⌘K</kbd>
      </div>
      {q.trim() && (
        <ul className="mt-1 rounded-md border border-sidebar-border bg-background py-1 shadow-sm" role="listbox">
          {treffer.map((t, i) => (
            <li key={t.slug} role="option" aria-selected={i === aktiv}>
              <button
                type="button"
                onMouseEnter={() => setAktiv(i)}
                onClick={() => geh(t.route!)}
                className={`w-full px-2.5 py-1.5 text-left text-xs leading-snug ${i === aktiv ? "bg-secondary" : ""}`}
              >
                <span className="font-medium">{t.title}</span>
                <span className="block text-[10px] text-muted-foreground truncate">{t.categoryTitle}</span>
              </button>
            </li>
          ))}
          {!treffer.length && <li className="px-2.5 py-1.5 text-xs text-muted-foreground">Kein Tool gefunden – frag Felix.</li>}
        </ul>
      )}
    </div>
  );
};

const Item = ({ to, icon: Icon, label, hint, active, badge }: { to: string; icon: React.ElementType; label: string; hint?: string; active: boolean; badge?: number }) => {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={hint ? `${label} – ${hint}` : label}>
        <NavLink to={to} data-tour={to} onClick={() => { if (isMobile) setOpenMobile(false); }}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
          {!!badge && (
            <span className="ml-auto rounded-full bg-accent-blue text-primary-foreground px-1.5 text-[10px] font-bold leading-4" aria-label={`${badge} neu`}>
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
