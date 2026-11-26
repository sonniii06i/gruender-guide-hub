import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { GlobalSearch } from "@/components/GlobalSearch";
import HeaderActions from "@/components/HeaderActions";
import { hapticSelection } from "@/lib/haptics";

interface MobileHeaderMeta {
  title: string;
  backTo?: string;
}

function resolveMobileHeader(pathname: string, search: string): MobileHeaderMeta {
  if (pathname === "/dashboard") {
    if (search.includes("view=tools")) return { title: "Tools & Rechner" };
    if (search.includes("view=themen")) return { title: "Alle Themen" };
    if (search.includes("view=meine")) return { title: "Meine Kurse" };
    return { title: "Übersicht" };
  }
  if (pathname === "/playbooks") return { title: "Kurse" };
  if (pathname.startsWith("/playbook/preview/")) return { title: "Kurs-Vorschau", backTo: "/playbooks" };
  if (pathname.startsWith("/playbook/")) return { title: "Kurs", backTo: "/playbooks" };
  if (pathname === "/felix") return { title: "Felix", backTo: "/dashboard" };
  if (pathname.startsWith("/felix/")) return { title: "Meine Chats", backTo: "/felix" };
  if (pathname === "/anbieter") return { title: "Anbieter-Vergleich" };
  if (pathname.startsWith("/anbieter/")) return { title: "Anbieter", backTo: "/anbieter" };
  if (pathname === "/quiz") return { title: "Quizze & Checks", backTo: "/dashboard" };
  if (pathname.startsWith("/quiz/")) return { title: "Kurz-Check", backTo: "/quiz" };
  if (pathname.startsWith("/cockpit/steuer") || pathname.startsWith("/cockpit/ust") || pathname.startsWith("/cockpit/anlage") || pathname.startsWith("/cockpit/quartals") || pathname.startsWith("/cockpit/aktuell")) {
    return { title: "Steuern & Fristen", backTo: "/dashboard" };
  }
  if (pathname.startsWith("/cockpit/chancen") || pathname.startsWith("/cockpit/foerderung") || pathname.startsWith("/gruender-chancen") || pathname.startsWith("/startup-guthaben")) {
    return { title: "Chancen & Förderung", backTo: "/dashboard" };
  }
  if (pathname.startsWith("/gruender-events") || pathname.startsWith("/cockpit/event-radar") || pathname.startsWith("/community")) {
    return { title: "Events & Netzwerk", backTo: "/dashboard" };
  }
  if (pathname.startsWith("/cockpit/") || pathname.startsWith("/wizard/")) {
    return { title: "Tool", backTo: "/dashboard?view=tools" };
  }
  if (pathname.startsWith("/profile")) return { title: "Mein Profil", backTo: "/dashboard" };
  if (pathname.startsWith("/support")) return { title: "Support", backTo: "/dashboard" };
  if (pathname.startsWith("/faq")) return { title: "FAQ", backTo: "/dashboard" };
  if (pathname.startsWith("/kuendigen")) return { title: "Kündigen", backTo: "/dashboard" };
  if (pathname.startsWith("/admin")) return { title: "Admin", backTo: "/dashboard" };
  return { title: "GründerX", backTo: "/dashboard" };
}

/**
 * Native iOS-/Mobile-Kopfzeile (nur < md sichtbar):
 * - Respektiert `env(safe-area-inset-top)` für Dynamic Island & Notch
 * - Zeigt auf Haupt-Tabs Logo + Screen-Titel, auf Unterseiten iOS-typisch `‹ Zurück`
 * - Keine Desktop-Sidebar- oder Tour-Icons auf dem Smartphone
 */
export function MobileTopHeader() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { title, backTo } = resolveMobileHeader(pathname, search);

  const handleBack = () => {
    hapticSelection();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(backTo ?? "/dashboard");
    }
  };

  return (
    <header
      className="sticky top-0 z-30 border-b border-border/80 bg-white/95 backdrop-blur-xl md:hidden"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="flex h-12 items-center justify-between gap-2 px-3">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {backTo ? (
            <>
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex min-h-[44px] -ml-1.5 shrink-0 items-center gap-0.5 rounded-lg px-1.5 text-[15px] font-semibold text-accent-blue transition-opacity active:opacity-60"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                <span>Zurück</span>
              </button>
              <span className="truncate text-[15px] font-bold tracking-tight text-primary">{title}</span>
            </>
          ) : (
            <Link
              to="/dashboard"
              onClick={() => hapticSelection()}
              className="inline-flex min-h-[44px] min-w-0 items-center gap-2"
            >
              <Logo asImage className="h-6 w-6 shrink-0" />
              <span className="truncate text-[17px] font-bold tracking-[-0.02em] text-primary">{title}</span>
            </Link>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <GlobalSearch />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
