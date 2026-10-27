import { Link } from "react-router-dom";
import { useAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import { stripEmoji } from "@/components/cockpit/kit";
import { CANCEL_NOTE, PLANS, formatEurCents } from "@/config/pricing";
import { StartAngebotButton } from "@/components/StartAngebotButton";
import { ArrowRight, Check, Lock, WifiOff, MessageSquare, Scale, Calculator, Receipt, ShoppingCart, Globe2, BookOpen } from "lucide-react";

// Nutzen aus dem echten Leistungsumfang (pricing.ts / SOLO_CONTENTS), hier nur kurz gefasst.
const NUTZEN = [
  { icon: MessageSquare, titel: "Felix, dein KI-Co-Pilot", text: "Unbegrenzt im Chat zu Gründung, Steuern und Marketplaces" },
  { icon: Scale, titel: "Gründung", text: "Rechtsform-Wizard, Gewerbeanmeldung, Erste-Schritte-Roadmap" },
  { icon: Calculator, titel: "Steuer-Cockpit", text: "USt-Voranmeldung, Anlage EÜR, Quartals-Steuerschätzung, Fristen" },
  { icon: Receipt, titel: "Belege & Buchhaltung", text: "Rechnungs-Generator, Reisekosten, Kfz-Optimizer" },
  { icon: ShoppingCart, titel: "E-Commerce", text: "Amazon-Erstattungen, Marge-Tracker, Shop-Profit-Rechner" },
  { icon: Globe2, titel: "International", text: "US-LLC- und HK-Wizard, Tax-Helper, DBA-Rechner" },
];

const KUENDIGUNG = CANCEL_NOTE.split(",")[0];

export const PaywallGate = ({ children, title = "Premium-Feature" }: { children: React.ReactNode; title?: string }) => {
  const { loading, hasActiveSub, isAdmin, error, known, refresh } = useAccess();
  if (loading) {
    return (
      <div className="container max-w-4xl px-4 py-12" aria-busy="true" aria-label="Zugang wird geprüft …">
        <div className="animate-pulse space-y-4 rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="h-11 w-11 rounded-xl bg-secondary" />
          <div className="h-4 w-32 rounded bg-secondary" />
          <div className="h-7 w-2/3 rounded bg-secondary" />
          <div className="h-4 w-full max-w-md rounded bg-secondary" />
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <div className="h-16 rounded-xl bg-secondary" />
            <div className="h-16 rounded-xl bg-secondary" />
          </div>
        </div>
      </div>
    );
  }
  if (hasActiveSub || isAdmin) return <>{children}</>;
  // Abfrage gescheitert und kein bekannter Stand: Das ist KEIN "kein Abo".
  if (error && !known) return <AccessErrorState onRetry={refresh} />;

  const monat = PLANS.gruenderx;
  const jahr = PLANS["gruenderx-year"];
  const kicker = stripEmoji(title) || "Premium-Feature";

  return (
    <div className="container max-w-4xl px-4 py-10 md:py-14">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid md:grid-cols-[1.35fr_1fr]">
          {/* Nutzen */}
          <div className="p-6 sm:p-8">
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-accent-blue/20 bg-accent text-accent-blue">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mb-1.5 text-sm font-medium text-accent-blue">{kicker}</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.7rem] sm:leading-tight">
              Schalte alle Tools und Guides frei
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Mit einem aktiven Abo bekommst du Zugriff auf alle Rechner, Wizards, Anbieter-Vergleiche
              und kannst Guides Schritt für Schritt durchgehen.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {NUTZEN.map(({ icon: Icon, titel, text }) => (
                <li key={titel} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{titel}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Dazu Gründungs-Guides, Playbooks und der Anbieter-Vergleich.
            </p>
          </div>

          {/* Preis */}
          <div className="flex flex-col border-t border-border bg-secondary/40 p-6 sm:p-8 md:border-l md:border-t-0">
            <p className="text-sm font-semibold">GründerX-Zugang</p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="tabular text-4xl font-semibold tracking-tight">{formatEurCents(monat.grossCents)}</span>
              <span className="text-sm text-muted-foreground">pro Monat</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">inkl. MwSt.</p>
            <p className="mt-3 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
              Oder jährlich: <span className="tabular font-semibold text-foreground">{formatEurCents(jahr.grossCents)}</span> pro Jahr
              {jahr.anchorCents && (
                <> statt <span className="tabular line-through">{formatEurCents(jahr.anchorCents)}</span></>
              )}
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {[KUENDIGUNG, "Sofort im Browser nutzbar", "Alle Tools, Guides und Felix"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-2 md:mt-auto md:pt-6">
              <StartAngebotButton />
              <Button asChild size="lg" variant="outline" className="press h-11 w-full gap-2 rounded-xl font-semibold">
                <Link to="/checkout">
                  Direkt Plan wählen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-11 w-full rounded-xl">
                <Link to="/dashboard">Zurück zur Übersicht</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Zugang konnte nicht geprueft werden (Netz-/Serverfehler). */
export const AccessErrorState = ({ onRetry }: { onRetry: () => Promise<void> | void }) => (
  <div className="container max-w-2xl px-4 py-16" role="alert">
    <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
      <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
        <WifiOff className="h-5 w-5" aria-hidden="true" />
      </span>
      <h1 className="text-xl font-semibold">Verbindung prüfen</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Wir konnten deinen Zugang gerade nicht prüfen. Das liegt meist an der Verbindung –
        dein Abo ist davon nicht betroffen.
      </p>
      <Button className="mt-5" onClick={() => void onRetry()}>Erneut versuchen</Button>
    </div>
  </div>
);
