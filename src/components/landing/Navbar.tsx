import Logo from "@/components/Logo";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* Hauptnavigation der öffentlichen Seiten. Vorher zeigte "Über uns" auf den
   Anker /#ueber-uns, den es auf der Startseite nicht mehr gibt (toter Link).
   Jetzt: die Hub-Seiten, die es wirklich gibt. Kontakt und FAQ stehen im Footer. */
const links = [
  { label: "Guides", href: "/guides" },
  { label: "Quizze", href: "/quiz" },
  { label: "Listicles", href: "/listicles" },
  { label: "Gratis-Tools", href: "/gratis-tools" },
  { label: "Tools", href: "/tools" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Preise", href: "/preise" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-border bg-card">
      {/* Skip-Link: springt zum ersten <main> der Seite (alle öffentlichen Seiten haben eins). */}
      <a
        href="#inhalt"
        onClick={(e) => {
          const main = document.querySelector("main");
          if (!main) return;
          e.preventDefault();
          main.setAttribute("tabindex", "-1");
          main.focus();
        }}
        className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Zum Inhalt springen
      </a>
      <nav
        aria-label="Hauptnavigation"
        className="container flex h-14 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <Link to="/" aria-label="Zur Startseite" className="flex items-center gap-2 rounded-lg">
          <Logo asImage className="h-8 w-8" />
          <span className="text-base font-semibold">GründerX</span>
        </Link>

        <div className="hidden items-center lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                cn(
                  "relative flex h-14 items-center px-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:bg-primary"
                    : "text-foreground/70 hover:text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            to="/auth?mode=signin"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            Anmelden
          </Link>
          <Button asChild className="h-9 px-4 font-semibold">
            <Link to="/auth?mode=signup">
              Kostenlos starten
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-11 w-11 lg:hidden" aria-label="Menü öffnen">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[85vw] max-w-sm flex-col">
            <SheetTitle className="sr-only">Menü</SheetTitle>
            <div className="mt-8 flex flex-col">
              {links.map((l) => (
                <NavLink
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between border-b border-border py-3.5 text-base font-medium",
                      isActive && "font-semibold text-primary",
                    )
                  }
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </NavLink>
              ))}
              <Link to="/faq" onClick={() => setOpen(false)} className="border-b border-border py-3.5 text-base font-medium">
                FAQ
              </Link>
              <Link to="/kontakt" onClick={() => setOpen(false)} className="border-b border-border py-3.5 text-base font-medium">
                Kontakt
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2 pb-2">
              <Button asChild size="lg" className="w-full font-semibold">
                <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>
                  Kostenlos starten
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/auth?mode=signin" onClick={() => setOpen(false)}>
                  Anmelden
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
