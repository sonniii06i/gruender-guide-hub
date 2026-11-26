import Logo from "@/components/Logo";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Guides", href: "/guides" },
  { label: "Quizze", href: "/quiz" },
  { label: "Listicles", href: "/listicles" },
  { label: "Gratis-Tools", href: "/gratis-tools" },
  { label: "Tools", href: "/tools" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Preise", href: "/preise" },
];

/**
 * Klarer, deckend weißer Header im Studyflix- / Udemy- / Lexoffice-Stil:
 * Immer 100 % deckend weiß mit scharfer 1px-Linie und kontrastreicher Navy-Tinte,
 * ohne Transparenz- oder Blur-Spielereien.
 */
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-border bg-white text-foreground">
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
        className="container flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <Link to="/" aria-label="Zur Startseite" className="flex shrink-0 items-center gap-2.5 rounded-lg">
          <Logo asImage className="h-7 w-7" />
          <span className="text-[17px] font-bold tracking-tight text-primary">GründerX</span>
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
                    ? "bg-accent font-semibold text-primary"
                    : "text-foreground/75 hover:bg-secondary hover:text-primary",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/auth?mode=signin"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            Anmelden
          </Link>
          <Button
            asChild
            className="press h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/auth?mode=signup" className="inline-flex items-center gap-1.5">
              Kostenlos starten
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-lg text-foreground hover:bg-secondary lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[86vw] max-w-sm flex-col border-l border-border bg-white text-foreground">
            <SheetTitle className="flex items-center gap-2.5 text-primary">
              <Logo asImage className="h-6 w-6" />
              GründerX
            </SheetTitle>
            <div className="mt-6 flex flex-col">
              {links.map((l) => (
                <NavLink
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-12 items-center justify-between border-b border-border py-3 text-base font-medium",
                      isActive ? "font-semibold text-primary" : "text-foreground/85",
                    )
                  }
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </NavLink>
              ))}
              <Link
                to="/faq"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-border py-3 text-base font-medium text-foreground/80"
              >
                FAQ
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-border py-3 text-base font-medium text-foreground/80"
              >
                Kontakt
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2.5 pb-2 pt-6">
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>
                  Kostenlos starten
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl"
              >
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
