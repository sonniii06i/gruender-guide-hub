import { ArrowRight, Briefcase, Building2, Calculator, Check, Megaphone, MessageSquare, ShoppingBag } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

/**
 * Affiliate-Verkaufsseite (Digistore24-Marktplatz, 08.10.2026).
 *
 * Ziel der Digistore24-Promolinks (checkout-ds24.com/redir/<produkt>/<affiliate>).
 * Digistore24 lehnt Marktplatzeintraege ab, wenn die Verkaufsseite einen Kaufweg an
 * Digistore24 vorbei anbietet (sonst bekaeme der Affiliate keine Provision). Darum:
 * - einziger Kaufweg ist der Digistore24-Checkout, KEIN Link auf /preise, /auth oder Stripe;
 * - keine Navigation und NICHT der Landing-Footer (der verlinkt /preise), nur Rechtslinks;
 * - noindex: Inhalt doppelt sich mit der Startseite, Suchtraffic gehoert dorthin.
 * Aussagen nur aus der bestehenden Startseite (Hero/Features) uebernehmen.
 */

const DS24_GRUENDERX = "https://www.checkout-ds24.com/product/728385";
const DS24_BUNDLE = "https://www.checkout-ds24.com/product/728388";

const BEREICHE = [
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
    desc: "Welcher Anbieter passt: Lexware Office, sevDesk, LUCID, Datev, Pennylane oder Stripe Tax – inkl. Setup-Anleitung.",
  },
  {
    icon: Briefcase,
    title: "Banking, Förderungen & Versicherung",
    desc: "Geschäftskonto, passende KfW-Förderung, Berufshaftpflicht – Felix matcht dich.",
  },
  {
    icon: MessageSquare,
    title: "Felix: KI-Chat 24/7",
    desc: "Stell jederzeit deine Frage – Felix antwortet mit Quellen, nächsten Schritten und konkreten Anbieter-Empfehlungen für dein Setup.",
  },
];

const Kaufknopf = ({ href, children, variante = "primaer" }: { href: string; children: React.ReactNode; variante?: "primaer" | "sekundaer" }) => (
  <Button
    asChild
    size="lg"
    variant={variante === "sekundaer" ? "outline" : "default"}
    className={`h-12 w-full rounded-xl px-8 text-base font-semibold sm:w-auto ${variante === "primaer" ? "bg-gradient-primary hover:opacity-95" : ""}`}
  >
    <a href={href} rel="nofollow">
      {children}
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </a>
  </Button>
);

const Angebot = () => (
  <div className="relative min-h-screen bg-background">
    <Seo
      title="GründerX — KI-Gründungs-Copilot für 64,99 € / Monat"
      description="Rechtsform, steuerliche Erfassung, LUCID, WEEE, OSS, Amazon- und TikTok-Shop-Setup: Felix führt dich als KI-Co-Pilot Schritt für Schritt durch. Monatlich kündbar."
      path="/angebot"
      noindex
    />

    <header className="absolute inset-x-0 top-0 z-10">
      <div className="container flex h-16 max-w-5xl items-center gap-2 px-4">
        <Logo asImage className="h-7 w-7" />
        <span className="text-base font-semibold tracking-tight text-foreground">GründerX</span>
      </div>
    </header>

    <main>
    <section className="relative overflow-hidden border-b border-border/70 bg-hero pb-16 pt-28 md:pb-20 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        aria-hidden="true"
      />
      <div className="container relative max-w-4xl px-4 text-center">
        <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]">
          <span className="block">Gründung, Steuer &amp; Marketplace-Setup.</span>
          <span className="block text-accent-blue">In der richtigen Reihenfolge.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          Rechtsform, Fragebogen zur steuerlichen Erfassung, LUCID, WEEE, OSS, Amazon- und
          TikTok-Shop-Setup: Felix führt dich als KI-Co-Pilot Schritt für Schritt durch – in der
          Reihenfolge, in der es wirklich gebraucht wird.
        </p>
        <div className="mt-9 flex justify-center">
          <Kaufknopf href={DS24_GRUENDERX}>GründerX für 64,99 € / Monat starten</Kaufknopf>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Monatlich kündbar · Die Abbuchung erfolgt durch Digistore24
        </p>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container max-w-5xl px-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-[1.75rem]">Wobei Felix dich begleitet</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEREICHE.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-blue">
                <b.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border/70 bg-secondary/40 py-16 md:py-20">
      <div className="container max-w-5xl px-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-[1.75rem]">Dein Zugang</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border-2 border-primary bg-card p-6 shadow-soft md:p-7">
            <h3 className="text-base font-semibold">GründerX</h3>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular">
              64,99 €<span className="text-base font-normal tracking-normal text-muted-foreground"> / Monat</span>
            </p>
            <ul className="mt-6 space-y-2.5">
              {BEREICHE.map((b) => (
                <li key={b.title} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" /> {b.title}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7"><Kaufknopf href={DS24_GRUENDERX}>Jetzt starten</Kaufknopf></div>
          </div>
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card md:p-7">
            <h3 className="text-base font-semibold">Founder Bundle: GründerX + AnwaltX</h3>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular">
              99,99 €<span className="text-base font-normal tracking-normal text-muted-foreground"> / Monat</span>
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground tabular">statt 129,98 € einzeln · 23 % günstiger</p>
            <p className="mt-6 text-sm leading-relaxed">
              Alles aus GründerX plus AnwaltX, der KI-Rechtsassistent für Onlinehändler und
              Gründer — in einem Abo, monatlich kündbar.
            </p>
            <div className="mt-auto pt-7"><Kaufknopf href={DS24_BUNDLE} variante="sekundaer">Bundle starten</Kaufknopf></div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Bestellung, Zahlung und Rechnung über Digistore24 als Reseller. Die Abbuchung erfolgt durch
          Digistore24. GründerX ist keine Rechts- oder Steuerberatung; siehe{" "}
          <a href="/agb" className="underline underline-offset-2 hover:text-foreground">AGB</a>.
        </p>
      </div>
    </section>
    </main>

    <footer className="border-t border-border/70 py-8">
      <div className="container flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-sm text-muted-foreground">
        <a href="/impressum" className="hover:text-foreground">Impressum</a>
        <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
        <a href="/agb" className="hover:text-foreground">AGB</a>
        <a href="/widerruf" className="hover:text-foreground">Widerruf</a>
      </div>
    </footer>
  </div>
);

export default Angebot;
