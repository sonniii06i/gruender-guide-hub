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

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#091636]/92 text-white backdrop-blur-md">
      <a
        href="#inhalt"
        onClick={(e) => {
          const main = document.querySelector("main");
          if (!main) return;
          e.preventDefault();
          main.setAttribute("tabindex", "-1");
          main.focus();
        }}
        className="sr-only rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-[#042016] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Zum Inhalt springen
      </a>
      <nav
        aria-label="Hauptnavigation"
        className="container flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <Link to="/" aria-label="Zur Startseite" className="group flex items-center gap-2.5 rounded-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/15">
            <Logo asImage className="h-6 w-6 brightness-0 invert" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-white">GründerX</span>
            <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-white/60 sm:inline">
              Lern-Studio
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.05] p-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-white text-[#0B1B40] font-semibold shadow-sm"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
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
            className="rounded-xl px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Anmelden
          </Link>
          <Button
            asChild
            className="press h-10 rounded-xl bg-[#10B981] px-4 text-sm font-bold text-[#042016] shadow-sm hover:bg-[#34D399]"
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
              className="h-11 w-11 rounded-xl text-white hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[86vw] max-w-sm flex-col border-l border-white/10 bg-[#091636] text-white">
            <SheetTitle className="flex items-center gap-2.5 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Logo asImage className="h-5 w-5 brightness-0 invert" />
              </span>
              GründerX Lern-Studio
            </SheetTitle>
            <div className="mt-6 flex flex-col">
              {links.map((l) => (
                <NavLink
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-base font-medium",
                      isActive ? "font-semibold text-[#6EE7B7]" : "text-white/85",
                    )
                  }
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4 text-white/45" />
                </NavLink>
              ))}
              <Link
                to="/faq"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-base font-medium text-white/80"
              >
                FAQ
                <ArrowRight className="h-4 w-4 text-white/45" />
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-base font-medium text-white/80"
              >
                Kontakt
                <ArrowRight className="h-4 w-4 text-white/45" />
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2.5 pb-2 pt-6">
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-xl bg-[#10B981] font-bold text-[#042016] hover:bg-[#34D399]"
              >
                <Link to="/auth?mode=signup" onClick={() => setOpen(false)}>
                  Kostenlos starten
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
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
