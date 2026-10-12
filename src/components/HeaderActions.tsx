import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, User as UserIcon, CreditCard, LogOut, Settings, Check, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

const HeaderActions = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { items, unread, markAllRead } = useNotifications();

  const handleSignOut = async () => { await signOut(); navigate("/"); };
  const initials = (user?.email ?? "?").slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-1">
      {/* Notifications */}
      <DropdownMenu onOpenChange={(o) => { if (o && unread > 0) markAllRead(); }}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg" aria-label={unread > 0 ? `Benachrichtigungen, ${unread} neu` : "Benachrichtigungen"}>
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="tabular absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white ring-2 ring-background">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-[420px] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-xl p-1.5 shadow-soft">
          <DropdownMenuLabel className="flex items-center justify-between font-semibold">
            Benachrichtigungen
            {unread > 0 && <span className="tabular text-xs font-normal text-muted-foreground">{unread} neu</span>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.length === 0 ? (
            <div className="flex flex-col items-center px-4 py-8 text-center">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold">Alles gelesen</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Neue Hinweise und Guides erscheinen hier.</p>
            </div>
          ) : [...items]
              // Neue-Guide-Ankündigungen (ungelesen) nach oben ziehen = hervorheben.
              .sort((a, b) => {
                const aFeat = a.kind === "feature" && !a.read_at ? 1 : 0;
                const bFeat = b.kind === "feature" && !b.read_at ? 1 : 0;
                return bFeat - aFeat;
              })
              .map((n) => {
                const isFeature = n.kind === "feature";
                return (
                  <DropdownMenuItem
                    key={n.id}
                    className={`flex cursor-pointer flex-col items-start gap-0.5 rounded-lg px-2.5 py-2.5 ${
                      isFeature ? "bg-accent focus:bg-accent/80" : ""
                    }`}
                    onClick={() => n.link && navigate(n.link)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {isFeature && <Sparkles className="h-3.5 w-3.5 text-accent-blue shrink-0" />}
                      <span className="flex-1 truncate text-sm font-semibold">
                        {n.title}
                      </span>
                      {!n.read_at && <span className="h-2 w-2 rounded-full bg-accent-blue shrink-0" />}
                    </div>
                    {n.body && <span className="text-xs text-muted-foreground line-clamp-2">{n.body}</span>}
                    <div className="flex items-center gap-2">
                      {isFeature && (
                        <span className="rounded-md bg-card px-1.5 text-[11px] font-semibold text-accent-blue">Neu</span>
                      )}
                      <span className="text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: de })}
                      </span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="Konto-Menü">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-primary text-xs font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 rounded-xl p-1.5 shadow-soft">
          <DropdownMenuLabel>
            <div className="truncate font-semibold">{user?.email ?? "Unbekannt"}</div>
            <div className="text-xs font-normal text-muted-foreground">Angemeldet</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/profile"><UserIcon className="h-4 w-4 mr-2" />Profil</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/profile?tab=abrechnung"><CreditCard className="h-4 w-4 mr-2" />Abrechnung</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/profile?tab=sicherheit"><Settings className="h-4 w-4 mr-2" />Einstellungen</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-danger focus:text-danger">
            <LogOut className="h-4 w-4 mr-2" />Abmelden
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderActions;
