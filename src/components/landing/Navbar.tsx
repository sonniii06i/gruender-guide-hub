import Logo from "@/components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Bundles", href: "#bundles" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]">
      <nav className="flex items-center justify-between rounded-full border border-border/60 bg-background/80 backdrop-blur-md px-4 md:px-6 py-2.5 shadow-soft">
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-bold text-lg tracking-tight">GründerX</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/auth?mode=signin" className="text-sm text-foreground/70 hover:text-foreground px-3">
            Anmelden
          </Link>
          <Link to="/auth?mode=signup">
            <Button className="group rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow hover:shadow-[0_15px_40px_-10px_hsl(var(--accent-blue)/0.6)] hover:-translate-y-0.5 transition-all duration-300 px-5 font-semibold">
              Registrieren
            </Button>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium"
                >
                  {l.label}
                </a>
              ))}
              <Button className="mt-4 bg-accent-blue hover:bg-accent-blue/90 text-accent-blue-foreground">
                Anmelden
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
