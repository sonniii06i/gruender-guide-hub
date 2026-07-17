import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Persistenter CTA am unteren Rand — nur mobil (md:hidden). Bleibt beim Scrollen
 * erreichbar, damit die Primär-Aktion nie mehr als einen Daumen entfernt ist.
 * Desktop hat den fixierten Navbar-CTA, daher dort ausgeblendet.
 */
export const MobileCtaBar = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-md px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
    <Link to="/auth" aria-label="Kostenlos starten">
      <Button className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow font-semibold">
        Kostenlos starten <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </Link>
  </div>
);
