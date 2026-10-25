import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

// Ziel von tipps-bestaetigen (Double-Opt-in der Tipps-Strecke, 25.10.2026).
const TippsBestaetigt = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Bestätigt – deine Tipps kommen | GründerX" description="Deine E-Mail-Adresse ist bestätigt." path="/tipps-bestaetigt" noindex />
    <Navbar />
    <main className="container max-w-xl px-4 pb-24 pt-36 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent-blue" aria-hidden="true" />
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">Danke, bestätigt!</h1>
      <p className="mb-7 text-muted-foreground">
        Die erste Mail mit Tipps kommt in der nächsten Stunde. Insgesamt sind es höchstens vier Mails in 10 Tagen – jede mit
        einem Abmeldelink.
      </p>
      <Button asChild size="lg" className="h-11 rounded-xl bg-gradient-primary font-semibold">
        <Link to="/gratis-tools">Weitere Gratis-Tools ansehen</Link>
      </Button>
    </main>
    <Footer />
  </div>
);

export default TippsBestaetigt;
