import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HeaderActions from "@/components/HeaderActions";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { Loader2 } from "lucide-react";

export default function AppLayout() {
  const { user, loading } = useAuth();
  const { loading: accLoading, hasActiveSub, isAdmin, onboardingCompleted } = useAccess();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading || accLoading || !user) return;
    // 1) Onboarding zuerst
    if (!onboardingCompleted && !isAdmin) {
      navigate("/onboarding", { replace: true });
      return;
    }
    // 2) Dann Paywall: aktives Abo oder Admin
    if (!hasActiveSub && !isAdmin) {
      navigate("/checkout", { replace: true });
    }
  }, [loading, accLoading, user, hasActiveSub, isAdmin, onboardingCompleted, pathname, navigate]);

  if (loading || !user || accLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent-blue" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30 px-4">
            <SidebarTrigger />
            <HeaderActions />
          </header>
          <main className="flex-1 min-h-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
