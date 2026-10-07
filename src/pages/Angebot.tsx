import { ArrowRight, Briefcase, Building2, Calculator, Check, Megaphone, MessageSquare, ShoppingBag } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    title: "Felix – KI-Chat 24/7",
    desc: "Stell jederzeit deine Frage – Felix antwortet mit Quellen, nächsten Schritten und konkreten Anbieter-Empfehlungen für dein Setup.",
  },
];

const Kaufknopf = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Button asChild size="lg" className="w-full sm:w-auto text-base px-8">
    <a href={href} rel="nofollow">
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </a>
  </Button>
);

const Angebot = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="GründerX — KI-Gründungs-Copilot für 64,99 € / Monat"
      description="Rechtsform, steuerliche Erfassung, LUCID, WEEE, OSS, Amazon- und TikTok-Shop-Setup: Felix führt dich als KI-Co-Pilot Schritt für Schritt durch. Monatlich kündbar."
      canonical="https://gruenderx.de/angebot"
      noindex
    />

    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2">
        <Logo asImage className="h-8 w-8" />
        <span className="font-bold text-lg text-foreground">GründerX</span>
      </div>
    </header>

    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          <span className="block">Gründung, Steuer &amp; Marketplace-Setup.</span>
          <span className="block text-accent-blue">In der richtigen Reihenfolge.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground text-balance">
          Rechtsform, Fragebogen zur steuerlichen Erfassung, LUCID, WEEE, OSS, Amazon- und
          TikTok-Shop-Setup: Felix führt dich als KI-Co-Pilot Schritt für Schritt durch – in der
          Reihenfolge, in der es wirklich gebraucht wird.
        </p>
        <div className="mt-8 flex justify-center">
          <Kaufknopf href={DS24_GRUENDERX}>GründerX für 64,99 € / Monat starten</Kaufknopf>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Monatlich kündbar · Die Abbuchung erfolgt durch Digistore24
        </p>
      </div>
    </section>

    <section className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Wobei Felix dich begleitet</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEREICHE.map((b) => (
            <Card key={b.title}>
              <CardContent className="p-5">
                <b.icon className="h-6 w-6 mb-3 text-accent-blue" />
                <div className="font-semibold">{b.title}</div>
                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <Card className="border-accent-blue">
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-accent-blue">GründerX</div>
            <div className="mt-2 text-4xl font-bold">
              64,99 €<span className="text-base font-normal text-muted-foreground"> / Monat</span>
            </div>
            <ul className="mt-5 space-y-2">
              {BEREICHE.map((b) => (
                <li key={b.title} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 mt-0.5 text-accent-blue shrink-0" /> {b.title}
                </li>
              ))}
            </ul>
            <div className="mt-6"><Kaufknopf href={DS24_GRUENDERX}>Jetzt starten</Kaufknopf></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-accent-blue">Founder Bundle — GründerX + AnwaltX</div>
            <div className="mt-2 text-4xl font-bold">
              99,99 €<span className="text-base font-normal text-muted-foreground"> / Monat</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">statt 129,98 € einzeln · 23 % günstiger</p>
            <p className="mt-5 text-sm">
              Alles aus GründerX plus AnwaltX, der KI-Rechtsassistent für Onlinehändler und
              Gründer — in einem Abo, monatlich kündbar.
            </p>
            <div className="mt-6"><Kaufknopf href={DS24_BUNDLE}>Bundle starten</Kaufknopf></div>
          </CardContent>
        </Card>
      </div>
      <p className="max-w-3xl mx-auto px-6 mt-8 text-center text-xs text-muted-foreground">
        Bestellung, Zahlung und Rechnung über Digistore24 als Reseller. Die Abbuchung erfolgt durch
        Digistore24. GründerX ist keine Rechts- oder Steuerberatung; siehe{" "}
        <a href="/agb" className="underline">AGB</a>.
      </p>
    </section>

    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
        <a href="/impressum" className="hover:text-foreground">Impressum</a>
        <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
        <a href="/agb" className="hover:text-foreground">AGB</a>
        <a href="/widerruf" className="hover:text-foreground">Widerruf</a>
      </div>
    </footer>
  </div>
);

export default Angebot;
