import { Link } from "react-router-dom";
import { useAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Loader2 } from "lucide-react";

export const AdminGate = ({ children }: { children: React.ReactNode }) => {
  const { loading, isAdmin } = useAccess();
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-accent-blue" />
      </div>
    );
  }
  if (isAdmin) return <>{children}</>;
  return (
    <div className="container max-w-2xl py-16 px-4">
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10 text-center shadow-card">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-5">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-destructive mb-2">Admin-Only</p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Kein Zugriff</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          Diese Seite ist nur für Administratoren sichtbar.
        </p>
        <Link to="/dashboard">
          <Button size="lg" variant="ghost" className="rounded-full">Zurück zur Übersicht</Button>
        </Link>
      </div>
    </div>
  );
};
