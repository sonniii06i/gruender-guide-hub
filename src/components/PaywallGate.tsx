import { Link } from "react-router-dom";
import { useAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, Loader2 } from "lucide-react";

export const PaywallGate = ({ children, title = "Premium-Feature" }: { children: React.ReactNode; title?: string }) => {
  const { loading, hasActiveSub, isAdmin } = useAccess();
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-accent-blue" />
      </div>
    );
  }
  if (hasActiveSub || isAdmin) return <>{children}</>;
  return (
    <div className="container max-w-2xl py-16 px-4">
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10 text-center shadow-card">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground mb-5 shadow-glow">
          <Lock className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-blue mb-2">{title}</p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Schalte alle Tools & Guides frei</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
          Mit einem aktiven Abo bekommst du Zugriff auf alle Rechner, Wizards, Anbieter-Vergleiche
          und kannst Guides Schritt für Schritt durchgehen.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Link to="/checkout">
            <Button size="lg" className="rounded-full gap-2 bg-gradient-primary hover:opacity-95">
              <Sparkles className="h-4 w-4" /> Plan wählen
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="ghost" className="rounded-full">Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
