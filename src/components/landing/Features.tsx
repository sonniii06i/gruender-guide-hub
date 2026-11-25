import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DISCORD_INVITE_URL } from "@/config/links";
import {
  Building2,
  Globe,
  ShoppingBag,
  Calculator,
  CreditCard,
  MessageSquare,
  RefreshCw,
  Users,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Rechtsform, Gewerbe & Finanzamt",
    desc: "Einzelunternehmen, UG oder GmbH? Wir zeigen dir Haftung, Kosten und Aufwand direkt nebeneinander und führen dich Feld für Feld durch Gewerbeanmeldung und ELSTER-Fragebogen. Die Entscheidung triffst du.",
    to: "/guides/gewerbeanmeldung-schritt-fuer-schritt",
    chip: "Start in DE",
  },
  {
    icon: MessageSquare,
    title: "Felix, dein KI-Begleiter im Cockpit",
    desc: "Wenn du an einem Formular, einer Frist oder einem Begriff hängst, stellst du deine Frage direkt im Chat. Felix antwortet mit Quellen, nächsten Schritten und passenden Anbietern für deinen Fall.",
    to: "/tools/ki-assistent",
    chip: "Direkt im Guide",
  },
  {
    icon: Globe,
    title: "Webseite, App & erstes Angebot",
    desc: "Vom leeren Blatt zur ersten eigenen Webseite oder App: Domain, Impressum, Bezahlstrecke, SEO und Sichtbarkeit für Google und KI-Suche in klaren, kurzen Schritten.",
    to: "/webseite-und-app",
    chip: "Von 12 bis 70",
  },
  {
    icon: ShoppingBag,
    title: "Online-Shop, Amazon & Creator",
    desc: "Schritt für Schritt zum Shopify-Store, Amazon Seller Account oder Creator-Setup inklusive Verpackungsregister LUCID, OSS, Brand Registry und Buchhaltungs-Anbindung.",
    to: "/amazon-fba-gruender",
    chip: "E-Commerce",
  },
  {
    icon: Calculator,
    title: "Buchhaltung, Rechnungen & Fristen",
    desc: "Wir vergleichen Lexware Office, sevDesk, Accountable, Qonto und Finom ehrlich nebeneinander. Dazu bekommst du deinen persönlichen Steuerkalender und den Rechnungs-Generator.",
    to: "/tools/steuerkalender",
    chip: "Ordnung",
  },
  {
    icon: CreditCard,
    title: "US-LLC, Amex US & internationales Setup",
    desc: "Klare Anleitungen für US-LLC, Non-Resident Banking, Cloud Residence, Tello eSIM, Global Transfer und US Business Amex inklusive ehrlicher Risiko-Hinweise.",
    to: "/us-setup",
    chip: "US & Global",
  },
];

const LAYOUT: Record<string, string> = {
  "Rechtsform, Gewerbe & Finanzamt": "lg:col-span-2",
  "Felix, dein KI-Begleiter im Cockpit": "lg:row-span-2 bg-ink text-primary-foreground border-transparent",
  "US-LLC, Amex US & internationales Setup": "lg:col-span-2",
};

export const Features = () => (
  <section id="leistungen" className="border-y border-border bg-background py-14 md:py-20">
    <div className="container max-w-6xl px-4">
      <div className="mb-8 max-w-2xl md:mb-10">
        <p className="mb-2.5 inline-flex items-center rounded-full border border-border bg-card px-3 py-0.5 text-[12.5px] font-semibold text-primary shadow-sm">
          Was in GründerX steckt
        </p>
        <h2 className="text-balance text-2xl font-semibold leading-[1.14] tracking-[-0.02em] text-primary md:text-[2.125rem]">
          Vom ersten Klick bis zum fertigen Setup. Alles an einem Ort.
        </h2>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {features.map((f) => {
          const dark = f.title.startsWith("Felix");
          return (
            <Link
              key={f.title}
              to={f.to}
              className={cn(
                "press group relative flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/35 md:w-auto",
                LAYOUT[f.title],
              )}
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    dark ? "bg-primary-foreground/15 text-primary-foreground" : "bg-secondary text-primary",
                  )}
                >
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    dark ? "bg-brand-green text-brand-green-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {f.chip}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold leading-snug">{f.title}</h3>
              <p
                className={cn(
                  "max-w-prose text-[15px] leading-relaxed",
                  dark ? "text-primary-foreground/80" : "text-muted-foreground",
                )}
              >
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
                  className="pointer-events-none mt-auto hidden w-36 self-end pt-6 lg:block"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="flex gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="mb-1 text-base font-semibold">Laufend geprüft statt veraltet</h3>
            <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
              Keine Anleitungen von vor drei Jahren: Wir prüfen Guides, Grenzwerte, Förderprogramme und Anbieterpreise
              regelmäßig gegen Gesetze und Primärquellen und passen an, was sich ändert.
            </p>
          </div>
        </div>
        <div className="flex gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Users className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="mb-1 text-base font-semibold">Gründer-Feeds im Discord</h3>
            <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground">
              Im{" "}
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-blue underline-offset-4 hover:underline"
              >
                GründerX-Discord
              </a>{" "}
              laufen Gründer-Events, Fristen-Radar und Startup-Guthaben als Feed, und du stellst deine Fragen direkt im
              Server.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
