import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

// Ziel von chancen-bestaetigen (Double-Opt-in des Chancen-Alarms, 25.10.2026).
const ChancenBestaetigt = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Bestätigt – dein Chancen-Alarm ist aktiv | GründerX" description="Deine E-Mail-Adresse ist bestätigt." path="/chancen-bestaetigt" noindex />
    <Navbar />
    <main className="container max-w-xl px-4 pb-24 pt-36 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent-blue" aria-hidden="true" />
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">Danke, bestätigt!</h1>
      <p className="mb-7 text-muted-foreground">
        Ab jetzt bekommst du jeden Montag eine Mail mit den neuen Gründer-Chancen zu deiner Auswahl und den Fristen der Woche.
        Jede Mail hat einen Abmeldelink.
      </p>
      <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
        <Link to="/gruender-chancen">Zu den Gründer-Chancen</Link>
      </Button>
    </main>
    <Footer />
  </div>
);

export default ChancenBestaetigt;
