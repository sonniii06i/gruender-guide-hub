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
  { label: "Tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Events", href: "/gruender-events" },
  { label: "Preise", href: "/preise" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4">
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
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/85 pl-3 pr-2 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-card/75 md:pl-4"
      >
        <Link to="/" aria-label="Zur Startseite" className="flex items-center gap-2 rounded-lg">
          <Logo asImage className="h-8 w-8" />
          <span className="text-[17px] font-semibold tracking-tight">GründerX</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-foreground/65 hover:bg-secondary/70 hover:text-foreground",
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
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/65 transition-colors hover:bg-secondary/70 hover:text-foreground"
          >
            Anmelden
          </Link>
          <Button asChild className="h-10 rounded-xl px-4 font-semibold">
            <Link to="/auth?mode=signup">
              Zugang freischalten
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl lg:hidden" aria-label="Menü öffnen">
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
                      "flex items-center justify-between border-b border-border/70 py-4 text-lg font-medium",
                      isActive && "text-accent-blue",
                    )
                  }
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </NavLink>
              ))}
              <Link to="/faq" onClick={() => setOpen(false)} className="border-b border-border/70 py-4 text-lg font-medium">
                FAQ
              </Link>
              <Link to="/kontakt" onClick={() => setOpen(false)} className="border-b border-border/70 py-4 text-lg font-medium">
                Kontakt
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2 pb-2">
              <Button asChild size="lg" className="w-full rounded-xl font-semibold">
                <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>
                  Zugang freischalten
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-xl">
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
