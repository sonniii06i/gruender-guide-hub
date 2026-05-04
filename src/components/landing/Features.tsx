import {
  Building2,
  Calculator,
  FileText,
  ShoppingBag,
  Banknote,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Gründung & Rechtsform",
    desc: "Einzelunternehmen, UG oder GmbH? Felix führt dich durch die richtige Wahl und erstellt alle Unterlagen.",
  },
  {
    icon: Calculator,
    title: "Steuern & Buchhaltung",
    desc: "USt-Voranmeldung, EÜR, Belege und Fristen. Klar erklärt, automatisiert eingereicht.",
  },
  {
    icon: FileText,
    title: "Verträge & AGB",
    desc: "Rechtssichere AGB, Datenschutzerklärung und Widerruf für deinen Shop – in Minuten generiert.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Setup",
    desc: "Amazon, Shopify, TikTok Shop: korrekte steuerliche Anbindung, OSS-Verfahren, Marktplatz-Pflichten.",
  },
  {
    icon: Banknote,
    title: "Förderungen & Banking",
    desc: "Welche Programme passen zu dir? Wir matchen dich mit Förderungen, KfW-Krediten und Geschäftskonten.",
  },
  {
    icon: MessageSquare,
    title: "KI-Chat 24/7",
    desc: "Stell jederzeit deine Frage – Felix antwortet mit Quellen, Paragrafen und nächsten Schritten.",
  },
];

export const Features = () => (
  <section id="leistungen" className="py-24 bg-secondary/40">
    <div className="container max-w-6xl">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-3">
          Leistungen
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
          Alles, was du zum Gründen brauchst –{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
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
