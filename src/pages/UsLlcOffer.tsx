import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { GUIDE_COUNT, TOOL_COUNT } from "@/data/kennzahlen";
import { startGuestCheckout } from "@/utils/guestCheckout";
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
  // pay-first: Der Klick geht direkt in den Stripe-Checkout, nicht mehr auf
  // /auth. Der Preis steht am Button — ein Preis, der erst nach dem Klick
  // auftaucht, kostet Vertrauen und ist bei Meta ein Ablehnungsgrund.
  const [checkoutError, setCheckoutError] = useState(false);

  const Cta = ({ label = "Zugang freischalten", onInk = false }: { label?: string; onInk?: boolean }) => (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className={`h-12 rounded-xl px-8 text-base font-semibold ${onInk ? "bg-card text-primary hover:bg-card/90" : "bg-gradient-primary hover:opacity-95"}`}
        onClick={() => {
          setCheckoutError(false);
          startGuestCheckout("gruenderx").catch(() => setCheckoutError(true));
        }}
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
      <span className={`text-xs tabular ${onInk ? "text-primary-foreground/70" : "text-muted-foreground"}`}>64,99 € / Monat · monatlich kündbar</span>
      {checkoutError && (
        <span role="alert" className={`text-xs ${onInk ? "font-medium text-primary-foreground" : "text-danger"}`}>
          Der Checkout ließ sich nicht öffnen. Bitte noch einmal versuchen.
        </span>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background">
      {/* noindex: bezahlte Landingpages gehoeren nicht in den Index, sonst
          konkurrieren sie mit /ratgeber um dieselben Begriffe. */}
      <Seo
        title="US-LLC als Deutscher – in 30 Tagen startklar | GründerX"
        description="LLC gründen, US-Accounts eröffnen, Hersteller finden, erste Ads schalten. Geführt in der richtigen Reihenfolge, mit KI-Co-Pilot Felix."
        path="/us-llc-30-tage"
        noindex
      />

      {/* Kein globales Menü: nur die Marke, ohne Link (bezahlter Traffic, ein Weg) */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container flex h-16 max-w-5xl items-center gap-2 px-4">
          <Logo asImage className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight">GründerX</span>
        </div>
      </div>

      <main>
      {/* Hero -- wiederholt die These der Anzeige woertlich */}
      <section className="relative overflow-hidden border-b border-border/70 bg-hero pb-16 pt-28 md:pb-20 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="container relative max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
            Für deutsche E-Commerce-Gründer
          </span>

          <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.75rem]">
            <span className="block">US-LLC als Deutscher.</span>
            <span className="block text-accent-blue">In 30 Tagen startklar.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            Nicht nur die Gründung, sondern die ganze Kette bis zum ersten Verkauf:{" "}
            <strong className="font-semibold text-foreground">
              LLC, US-Accounts, Hersteller, erste Ads
            </strong>
            . Geführt in der Reihenfolge, in der die Schritte voneinander abhängen.
          </p>

          <div className="mt-9 flex justify-center">
            <Cta />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Zahlung zuerst, danach legst du dein Konto an.
          </p>
        </div>
      </section>

      {/* Die drei Saeulen -- gleiche Reihenfolge wie im Creative */}
      <section className="container max-w-5xl px-4 py-16 md:py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          Was in den 30 Tagen passiert
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {SAEULEN.map((s, i) => (
            <li key={s.titel} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-blue">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium tabular text-muted-foreground">Teil {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Warum die Reihenfolge zaehlt -- die These, ausformuliert */}
      <section className="border-y border-border/70 bg-secondary/40">
        <div className="container grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[1.75rem]">
              Das Teuerste ist nicht, was man falsch macht, sondern was man nicht wusste
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Eine LLC ohne Registered Agent verliert den Status. Ein Amazon-Konto ohne
              passende US-Bausteine wird bei der Verifizierung gestoppt. Ware ohne LUCID
              und GPSR ist in Europa abmahnfähig, sobald sie verkauft wird. Und der
              Sales-Tax-Nexus entsteht, ohne dass jemand eine Nachricht darüber schickt.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Keiner dieser Punkte ist schwer. Sie fallen nur alle in eine Reihenfolge,
              die man erst kennt, wenn man sie einmal falsch gemacht hat.
            </p>
          </div>
          <div className="self-start rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-base font-semibold">Im Zugang enthalten</h3>
            <ul className="mt-4 space-y-3">
              {[
                `${GUIDE_COUNT} Schritt-für-Schritt-Guides`,
                `${TOOL_COUNT} Rechner und Assistenten`,
                "KI-Co-Pilot Felix für Zwischenfragen",
                "Deutschland, USA und Hongkong abgedeckt",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="tabular">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Abschluss-CTA -- dasselbe Ziel, kein zweiter Weg */}
      <section className="container max-w-5xl px-4 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-center text-primary-foreground shadow-soft md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Schritt eins ist immer derselbe
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-primary-foreground/75">
              Profil anlegen, Ausgangslage angeben: Danach steht die Reihenfolge für
              deinen Fall.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta label="Jetzt freischalten" onInk />
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Pflichtangaben. Bewusst nur das Noetige. */}
      <footer className="border-t border-border">
        <div className="container max-w-3xl space-y-3 px-4 py-8 text-center text-xs leading-relaxed text-muted-foreground">
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
