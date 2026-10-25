import { cn } from "@/lib/utils";
import {
  Building2,
  ShoppingBag,
  Megaphone,
  Calculator,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Rechtsform & Gründung",
    desc: "Einzelunternehmen, UG oder GmbH? Felix empfiehlt die richtige Rechtsform für dein Vorhaben und führt dich durch Gewerbeanmeldung & Fragebogen zur steuerlichen Erfassung.",
  },
  {
    icon: ShoppingBag,
    title: "Amazon Seller & Business",
    desc: "Schritt für Schritt zum Amazon Seller Account und Amazon Business Account – inkl. Verifizierung, OSS, Brand Registry und steuerlicher Anbindung.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads & Werbekonten",
    desc: "Meta Business Manager, Pixel, CAPI, Werbekonto-Limits und richtige Verknüpfung mit deinem Shop – Schritt für Schritt im Guide.",
  },
  {
    icon: Calculator,
    title: "Buchhaltung & Tools",
    desc: "Wir sagen dir, welcher Anbieter passt: Lexware Office, sevDesk, LUCID, Datev, Pennylane oder Stripe Tax – inkl. Setup-Anleitung.",
  },
  {
    icon: Briefcase,
    title: "Banking, Förderungen & Versicherung",
    desc: "Geschäftskonto bei Qonto, Holvi, Finom oder Kontist? Welche KfW-Förderung passt? Welche Berufshaftpflicht brauchst du? Felix matcht dich.",
  },
  {
    icon: MessageSquare,
    title: "Felix – KI-Chat 24/7",
    desc: "Stell jederzeit deine Frage – Felix antwortet mit Quellen, nächsten Schritten und konkreten Anbieter-Empfehlungen für dein Setup.",
  },
];

/* Bento: 6 Leistungen, 6 Zellen. Rechtsform breit (Einstiegsthema), Felix als
   hohe dunkle Kachel (das Herzstück), Banking breit unten. Mobil einspaltig. */
const LAYOUT: Record<string, string> = {
  "Rechtsform & Gründung": "lg:col-span-2 bg-accent/70 border-accent-blue/15",
  "Felix – KI-Chat 24/7": "lg:row-span-2 bg-ink text-primary-foreground border-transparent",
  "Banking, Förderungen & Versicherung": "lg:col-span-2 bg-brand-green-soft/70 border-brand-green/15",
};

const ORDER = [
  "Rechtsform & Gründung",
  "Felix – KI-Chat 24/7",
  "Amazon Seller & Business",
  "Meta Ads & Werbekonten",
  "Buchhaltung & Tools",
  "Banking, Förderungen & Versicherung",
];
const ordered = ORDER.map((t) => features.find((f) => f.title === t)!).filter(Boolean);

export const Features = () => (
  <section id="leistungen" className="border-y border-border/70 bg-secondary/50 py-14 md:py-28">
    <div className="container max-w-6xl">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent-blue">Was GründerX kann</p>
        {/* Felix bewusst entfernt: er stand hier nur dekorativ. Er tritt jetzt
            dort auf, wo er etwas tut (Hero, Problem, Guides, Seller, CTA). */}
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-primary md:text-[3rem]">
          Alles, was du zum Gründen brauchst, an einem Ort.
        </h2>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {ordered.map((f) => {
          const dark = f.title.startsWith("Felix");
          return (
            <div
              key={f.title}
              className={cn("relative flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 md:w-auto md:p-7", LAYOUT[f.title])}
            >
              <div
                className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${
                  dark ? "bg-white/10 text-brand-green-glow" : "bg-card text-accent-blue shadow-card"
                }`}
              >
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title.replace(" – ", ": ")}</h3>
              <p className={`max-w-prose text-[15px] leading-relaxed ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                {f.desc}
              </p>
              {dark && (
                <img
                  src="/mascots/felix-34-t.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={160}
                  height={197}
                  className="pointer-events-none mt-auto hidden w-40 self-end pt-6 drop-shadow-2xl lg:block"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
