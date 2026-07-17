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
    desc: "Meta Business Manager, Pixel, CAPI, Werbekonto-Limits und richtige Verknüpfung mit deinem Shop – ohne Sperren beim ersten Launch.",
  },
  {
    icon: Calculator,
    title: "Buchhaltung & Tools",
    desc: "Wir sagen dir, welcher Anbieter passt: Lexware Office, sevDesk, Lucid (LucidLink), Datev, Pennylane oder Stripe Tax – inkl. Setup-Anleitung.",
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

export const Features = () => (
  <section id="leistungen" className="py-24 bg-secondary/40">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary/15 blur-3xl" />
          </div>
          <img
            src="/mascots/felix-34-t.png"
            alt="Felix, dein KI-Gründungs-Copilot, kennt jedes Tool für deine Gründung"
            loading="lazy"
            className="w-36 md:w-52 max-w-full drop-shadow-xl animate-floaty"
            style={{ animationDelay: "0.9s" }}
          />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Leistungen
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
          Alles, was du zum Gründen brauchst –{" "}
          <span className="text-gradient-primary inline-block">
            an einem Ort.
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mb-5">
              <f.icon className="h-5 w-5 text-accent-blue" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
