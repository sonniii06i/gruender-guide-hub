import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Check, Megaphone, PackageSearch } from "lucide-react";

/**
 * Anzeigen-Landingpage für die Meta-Kampagne "US-LLC in 30 Tagen"
 * (Route /us-llc-30-tage, Thesenpapier 06-thesen-und-angebot.md).
 *
 * BEWUSST KEINE SEO-SEITE. /ratgeber und /tools sind für Google gebaut — viele
 * Abschnitte, Querverweise, verwandte Artikel. Für bezahlten Traffic ist jeder
 * zusätzliche Link ein Ausgang. Hier gilt: ein Versprechen, ein Weg, keine
 * globale Navigation.
 *
 * WICHTIG ZUR EHRLICHKEIT DES VERSPRECHENS: Die drei Säulen unten sind keine
 * Marketing-Behauptung, sondern bilden vorhandene Playbooks ab —
 * "US-LLC gründen (Wyoming / Delaware / New Mexico)", "US-Accounts als
 * Deutscher", "Lieferanten-Sourcing (Alibaba / 1688 / Made-in-China)" und
 * "Meta Ads Manager: Setup bis zur ersten Kampagne". Wer die Seite ändert,
 * prüft vorher, ob der Inhalt noch existiert.
 *
 * Die 30 Tage beziehen sich ausdrücklich auf die EIGENEN Schritte, nicht auf
 * Bearbeitungszeiten von Behörden oder Banken — die sind nicht steuerbar, und
 * ein Versprechen darüber wäre nicht haltbar.
 */

const SAEULEN = [
  {
    icon: Building2,
    titel: "Die LLC selbst",
    text: "Bundesstaat wählen, Name prüfen und reservieren, Registered Agent und US-Mailing-Adresse buchen, EIN beantragen, Banking über Payoneer, Wise oder Mercury. Dazu die Fragen, die Deutsche zusätzlich betreffen: Sales-Tax-Nexus, Estimated Tax und die Abgrenzung zur deutschen Steuerpflicht.",
  },
  {
    icon: PackageSearch,
    titel: "Produkt & Hersteller",
    text: "Produktrecherche vor allem anderen, danach Lieferanten-Sourcing über Alibaba, 1688 und Made-in-China — inklusive der Compliance-Basics, die in Europa sonst nachträglich teuer werden: EORI, EAN, LUCID, GPSR.",
  },
  {
    icon: Megaphone,
    titel: "Accounts & erste Ads",
    text: "US-Accounts als Deutscher: Amazon, Amex, TikTok Shop. Danach der Werbeanzeigenmanager von der Einrichtung bis zur ersten Conversion-Kampagne, dazu Google Ads mit Merchant Center und Search Console.",
  },
];

const UsLlcOffer = () => {
  const Cta = ({ label = "Kostenlos starten" }: { label?: string }) => (
    <Link to="/auth">
      <Button size="lg" className="rounded-full h-14 px-10 text-base font-semibold shadow-glow">
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* noindex: bezahlte Landingpages gehoeren nicht in den Index, sonst
          konkurrieren sie mit /ratgeber um dieselben Begriffe. */}
      <Seo
        title="US-LLC als Deutscher – in 30 Tagen startklar | GründerX"
        description="LLC gründen, US-Accounts eröffnen, Hersteller finden, erste Ads schalten. Geführt in der richtigen Reihenfolge, mit KI-Co-Pilot Felix."
        path="/us-llc-30-tage"
        noindex
      />

      {/* Hero -- wiederholt die These der Anzeige woertlich */}
      <section className="relative bg-hero pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" aria-hidden="true">
          <div className="absolute top-16 left-1/4 h-96 w-96 rounded-full bg-accent-blue/20 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
        </div>

        <div className="container max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green-soft px-4 py-1.5 text-sm font-semibold text-brand-green">
            Für deutsche E-Commerce-Gründer
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.12] tracking-tight text-balance">
            <span className="block">US-LLC als Deutscher.</span>
            <span className="block text-accent-blue">In 30 Tagen startklar.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground text-balance">
            Nicht nur die Gründung — die ganze Kette bis zum ersten Verkauf:{" "}
            <strong className="text-foreground">
              LLC, US-Accounts, Hersteller, erste Ads
            </strong>
            . Geführt in der Reihenfolge, in der die Schritte voneinander abhängen.
          </p>

          <div className="mt-9 flex justify-center">
            <Cta />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Kostenlos starten · ab 64,99 €/Monat, monatlich kündbar
          </p>
        </div>
      </section>

      {/* Die drei Saeulen -- gleiche Reihenfolge wie im Creative */}
      <section className="container max-w-5xl py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
          Was in den 30 Tagen passiert
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SAEULEN.map((s) => (
            <Card key={s.titel} className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10">
                  <s.icon className="h-5 w-5 text-accent-blue" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Warum die Reihenfolge zaehlt -- die These, ausformuliert */}
      <section className="border-y border-border bg-muted/30">
        <div className="container max-w-3xl py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-balance">
            Das Teuerste ist nicht, was man falsch macht — sondern was man nicht wusste
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Eine LLC ohne Registered Agent verliert den Status. Ein Amazon-Konto ohne
            passende US-Bausteine wird bei der Verifizierung gestoppt. Ware ohne LUCID
            und GPSR ist in Europa abmahnfähig, sobald sie verkauft wird. Und der
            Sales-Tax-Nexus entsteht, ohne dass jemand eine Nachricht darüber schickt.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Keiner dieser Punkte ist schwer. Sie fallen nur alle in eine Reihenfolge,
            die man erst kennt, wenn man sie einmal falsch gemacht hat.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "78 Schritt-für-Schritt-Guides",
              "80+ Rechner und Assistenten",
              "KI-Co-Pilot Felix für Zwischenfragen",
              "Deutschland, USA und Hongkong abgedeckt",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Abschluss-CTA -- dasselbe Ziel, kein zweiter Weg */}
      <section className="container max-w-2xl py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Schritt eins ist immer derselbe
        </h2>
        <p className="mt-4 text-muted-foreground">
          Profil anlegen, Ausgangslage angeben — danach steht die Reihenfolge für
          deinen Fall.
        </p>
        <div className="mt-8 flex justify-center">
          <Cta label="Jetzt kostenlos starten" />
        </div>
      </section>

      {/* Pflichtangaben. Bewusst nur das Noetige. */}
      <footer className="border-t border-border">
        <div className="container max-w-3xl py-8 text-center text-xs text-muted-foreground space-y-3">
          <p>
            Die 30 Tage beziehen sich auf die von dir durchführbaren Schritte.
            Bearbeitungszeiten von Behörden, Banken und Marktplätzen sind davon
            unabhängig. GründerX leistet keine Steuer- oder Rechtsberatung.
          </p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/impressum" className="underline underline-offset-2 hover:text-foreground">Impressum</Link>
            <Link to="/datenschutz" className="underline underline-offset-2 hover:text-foreground">Datenschutz</Link>
            <Link to="/agb" className="underline underline-offset-2 hover:text-foreground">AGB</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UsLlcOffer;
