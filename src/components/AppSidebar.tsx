import Logo from "@/components/Logo";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CATEGORIES, STATUS_LABEL, type FeatureStatus } from "@/data/features";
import { ChevronRight, LayoutDashboard, MessageSquare, Rocket, User } from "lucide-react";

const STATUS_DOT: Record<FeatureStatus, string> = {
  live: "bg-success",
  beta: "bg-accent-blue",
  soon: "bg-muted-foreground/40",
  planned: "bg-muted-foreground/25",
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const activeCat = params.get("cat");

  const isActive = (route?: string) => !!route && pathname === route;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold tracking-tight text-sm">GründerX</span>
              <span className="text-[10px] text-muted-foreground">Cockpit</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Item to="/dashboard" icon={LayoutDashboard} label="Übersicht" active={pathname === "/dashboard" && !activeCat} />
              <Item to="/playbooks" icon={Rocket} label="Playbooks" active={pathname.startsWith("/playbooks") || pathname.startsWith("/playbook/")} />
              <Item to="/felix" icon={MessageSquare} label="Felix-Chat" active={pathname === "/felix"} />
              <Item to="/profile" icon={User} label="Profil" active={pathname === "/profile"} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const hasActive = cat.features.some((f) => isActive(f.route));
          const catActive = activeCat === cat.slug && pathname === "/dashboard";
          return (
            <Collapsible key={cat.slug} defaultOpen={catActive || hasActive} className="group/collapsible">
              <SidebarGroup className="py-0">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center gap-2 hover:text-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="flex-1 text-left truncate">{cat.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={catActive} size="sm">
                          <NavLink to={`/dashboard?cat=${cat.slug}`}>
                            <span className="text-base leading-none">{cat.emoji}</span>
                            <span className="text-xs font-semibold">Alle Features</span>
                          </NavLink>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          {cat.features.map((f) => {
                            const inner = (
                              <>
                                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[f.status]}`} />
                                <span className="truncate flex-1">{f.title}</span>
                                {(f.status === "beta" || f.status === "live") && (
                                  <span className="text-[9px] font-bold uppercase text-accent-blue">{STATUS_LABEL[f.status]}</span>
                                )}
                              </>
                            );
                            return (
                              <SidebarMenuSubItem key={f.slug}>
                                {f.route ? (
                                  <SidebarMenuSubButton asChild isActive={isActive(f.route)}>
                                    <NavLink to={f.route}>{inner}</NavLink>
                                  </SidebarMenuSubButton>
                                ) : (
                                  <SidebarMenuSubButton className="cursor-not-allowed opacity-60">{inner}</SidebarMenuSubButton>
                                )}
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
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
