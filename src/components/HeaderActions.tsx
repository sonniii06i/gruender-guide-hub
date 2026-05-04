import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, User as UserIcon, CreditCard, LogOut, Settings, Check } from "lucide-react";
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
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 max-h-[400px] overflow-y-auto">
          <DropdownMenuLabel className="flex items-center justify-between">
            Benachrichtigungen
            {unread > 0 && <span className="text-xs text-muted-foreground font-normal">{unread} neu</span>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              <Check className="h-6 w-6 mx-auto mb-2 opacity-40" />
              Alles erledigt!
            </div>
          ) : items.map((n) => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5 cursor-pointer"
              onClick={() => n.link && navigate(n.link)}>
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm font-semibold flex-1 truncate">{n.title}</span>
                {!n.read_at && <span className="h-2 w-2 rounded-full bg-accent-blue shrink-0" />}
              </div>
              {n.body && <span className="text-xs text-muted-foreground line-clamp-2">{n.body}</span>}
              <span className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: de })}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="font-semibold truncate">{user?.email ?? "—"}</div>
            <div className="text-xs text-muted-foreground font-normal">Eingeloggt</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/profile"><UserIcon className="h-4 w-4 mr-2" />Profil</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/profile?tab=abrechnung"><CreditCard className="h-4 w-4 mr-2" />Abrechnung</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/profile?tab=sicherheit"><Settings className="h-4 w-4 mr-2" />Einstellungen</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
            <LogOut className="h-4 w-4 mr-2" />Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderActions;
