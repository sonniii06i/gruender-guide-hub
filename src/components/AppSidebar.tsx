import Logo from "@/components/Logo";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  Calculator,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  ListTree,
  MessageCircle,
  MessageSquare,
  PlayCircle,
  Scale,
  Shield,
  Trophy,
  Users,
  Wrench,
  Receipt,
} from "lucide-react";
import { useRole } from "@/hooks/useRole";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname, search } = useLocation();
  const { isAdmin } = useRole();

  const isActive = (route: string, exact = true) =>
    exact ? pathname === route : pathname.startsWith(route);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" aria-label="Zur Startseite" className="flex items-center gap-2 px-2 py-1.5">
          <Logo asImage className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-sm">GründerX</span>
              <span className="text-[10px] text-muted-foreground">Lernplattform</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/dashboard" icon={LayoutDashboard} label="Übersicht" active={pathname === "/dashboard" && !search} />
              <Item to="/felix" icon={MessageSquare} label="Felix-Chat" active={pathname === "/felix"} />
              <Item to="/felix/chats" icon={ListTree} label="Chat-Verlauf" active={pathname === "/felix/chats"} />
              {isAdmin && <Item to="/admin" icon={Shield} label="Admin" active={pathname === "/admin"} />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Lernen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/playbooks" icon={GraduationCap} label="Alle Guides" active={isActive("/playbooks")} />
              <Item to="/dashboard?view=tools" icon={Wrench} label="Tools & Rechner" active={pathname === "/dashboard" && search.includes("view=tools")} />
              <Item to="/dashboard?view=meine" icon={PlayCircle} label="Meine Guides" active={pathname === "/dashboard" && search.includes("view=meine")} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Ressourcen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/anbieter" icon={Trophy} label="Anbieter-Vergleich" active={isActive("/anbieter")} />
              <Item to="/cockpit/steuer" icon={Calculator} label="Steuer-Cockpit" active={isActive("/cockpit/steuer")} />
              <Item to="/cockpit/amazon-buchungen" icon={Receipt} label="Amazon-Buchungen" active={isActive("/cockpit/amazon-buchungen")} />
              <Item to="/wizard/rechtsform" icon={Scale} label="Rechtsform-Wizard" active={isActive("/wizard/rechtsform")} />
              <Item to="/dashboard?view=themen" icon={Compass} label="Themen entdecken" active={pathname === "/dashboard" && search.includes("view=themen")} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="https://discord.gg/Ys9ZmBY8" target="_blank" rel="noopener noreferrer">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/support"}>
              <NavLink to="/support">
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/faq"}>
              <NavLink to="/faq">
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

const Item = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={active}>
      <NavLink to={to}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);
