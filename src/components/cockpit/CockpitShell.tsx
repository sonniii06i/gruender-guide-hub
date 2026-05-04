import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const CockpitShell = ({ eyebrow, title, subtitle, children }: Props) => (
  <div className="min-h-screen bg-secondary/30">
    <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
      <div className="container max-w-6xl flex items-center justify-between h-16">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Cockpit
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">G</div>
          <span className="font-bold tracking-tight">GründerX</span>
        </Link>
      </div>
    </header>
    <main className="container max-w-6xl py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-2">{eyebrow}</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {children}
    </main>
  </div>
);

export default CockpitShell;
