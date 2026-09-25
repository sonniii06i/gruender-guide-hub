import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Gift, Lock, Sparkles, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailGateDialog } from "./EmailGateDialog";
import { isToolUnlockedLocally } from "@/lib/freetools/leads";
import type { TrialTool } from "@/lib/freetools/trialTools";
import { PRO_MONTH_GROSS_CENTS, formatEurCents } from "@/config/pricing";

/**
 * Eine kostenlose Nutzung ohne Konto für ein Cockpit-Tool.
 *
 * Die Tool-Seiten (WeeeCheck, BrandCheck, LucidWizard) laufen unverändert im
 * Cockpit. Nur auf der öffentlichen Probier-Seite (/tools/:slug/gratis) liegen
 * sie in diesem Provider; dann gilt:
 *
 *   fresh  → Tool läuft, das Ergebnis liegt hinter dem E-Mail-Tor
 *   open   → E-Mail angegeben, Ergebnis sichtbar (nur in dieser Sitzung)
 *   spent  → die kostenlose Nutzung ist verbraucht, Hinweis auf das Abo
 *
 * Gemerkt wird die Freischaltung pro Tool im localStorage
 * (`gruenderx:tool-unlocked:<slug>`); beim nächsten Besuch gilt „spent".
 */
type Phase = "fresh" | "open" | "spent";

interface ToolTrialApi {
  tool: TrialTool;
  phase: Phase;
  /** Vor jeder neuen Abfrage/Auswertung aufrufen. false = nicht ausführen. */
  beforeRun: () => boolean;
  requestUnlock: () => void;
}

const ToolTrialContext = createContext<ToolTrialApi | null>(null);

/** null im Cockpit (Vollzugriff), sonst die Probier-Steuerung. */
export const useToolTrial = () => useContext(ToolTrialContext);

export function ToolTrialProvider({ tool, children }: { tool: TrialTool; children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() => (isToolUnlockedLocally(tool.slug) ? "spent" : "fresh"));
  const [gateOpen, setGateOpen] = useState(false);

  const beforeRun = useCallback(() => {
    if (phase === "fresh") return true;
    setPhase("spent");
    toast(`Deine kostenlose Nutzung von „${tool.name}" ist aufgebraucht.`, {
      description: "Mit dem GründerX-Abo nutzt du das Tool unbegrenzt.",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  }, [phase, tool.name]);

  const requestUnlock = useCallback(() => setGateOpen(true), []);

  const api = useMemo(() => ({ tool, phase, beforeRun, requestUnlock }), [tool, phase, beforeRun, requestUnlock]);

  return (
    <ToolTrialContext.Provider value={api}>
      <div className="container max-w-6xl px-4 md:px-6 pt-6">
        {phase === "spent" ? (
          <TrialUpsell tool={tool} variant="spent" />
        ) : (
          <div className="flex items-start gap-2 rounded-xl border border-accent-blue/30 bg-accent-blue/5 px-4 py-3 text-sm">
            <Gift className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
            <span>
              <strong>1 kostenlose Prüfung, nur E-Mail nötig.</strong> Kein Konto, keine Zahlung. Unbegrenzt
              nutzt du „{tool.name}" mit dem{" "}
              <Link to="/preise" className="text-accent-blue underline">
                GründerX-Abo
              </Link>
              .
            </span>
          </div>
        )}
      </div>
      {children}
      <EmailGateDialog
        open={gateOpen}
        onOpenChange={setGateOpen}
        slug={tool.slug}
        resultName={`${tool.name}-Ergebnis`}
        singleUse
        onUnlocked={() => {
          setGateOpen(false);
          setPhase("open");
        }}
      />
    </ToolTrialContext.Provider>
  );
}

/**
 * Umschließt den Ergebnisbereich eines Tools. Ohne Provider (Cockpit) wird
 * das Ergebnis unverändert gezeigt.
 */
export function TrialResult({ children }: { children: ReactNode }) {
  const trial = useToolTrial();
  if (!trial) return <>{children}</>;
  if (trial.phase === "open") {
    return (
      <>
        {children}
        <div className="mt-6">
          <TrialUpsell tool={trial.tool} variant="after" />
        </div>
      </>
    );
  }
  if (trial.phase === "fresh") return <LockedResult onUnlock={trial.requestUnlock} name={trial.tool.name} />;
  return (
    <div className="mt-5">
      <TrialUpsell tool={trial.tool} variant="spent" />
    </div>
  );
}

function LockedResult({ onUnlock, name }: { onUnlock: () => void; name: string }) {
  // Das Tor öffnet sich einmal von selbst, sobald ein Ergebnis da ist.
  useEffect(() => {
    onUnlock();
  }, [onUnlock]);

  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-6 md:p-8 text-center shadow-card">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Lock className="h-6 w-6 text-primary" />
      </div>
      <p className="text-lg font-semibold">Dein Ergebnis ist fertig</p>
      <p className="mx-auto mt-1 mb-4 max-w-md text-sm text-muted-foreground">
        Gib deine E-Mail-Adresse an und sieh dir das Ergebnis von „{name}" sofort an. Kein Konto, keine
        Zahlung.
      </p>
      <Button onClick={onUnlock} className="rounded-full">
        <Unlock className="mr-2 h-4 w-4" /> Ergebnis kostenlos freischalten
      </Button>
    </div>
  );
}

/**
 * Hinweis auf das Abo — nach der Nutzung („after") oder wenn sie verbraucht ist („spent").
 * `noun`: „Prüfung" bei den Checks, „Nutzung" bei den Generatoren.
 */
export function TrialUpsell({
  tool,
  variant,
  noun = "Prüfung",
}: {
  tool: Pick<TrialTool, "name">;
  variant: "after" | "spent";
  noun?: "Prüfung" | "Nutzung";
}) {
  return (
    <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">
            {variant === "after"
              ? `Das war deine kostenlose ${noun}.`
              : `Deine kostenlose Nutzung von „${tool.name}" ist aufgebraucht.`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Unbegrenzt nutzt du „{tool.name}" und alle anderen Tools, Wizards und Guides mit dem GründerX-Abo –
            ab {formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. 19 % USt., jederzeit zum Ende der
            Abrechnungsperiode kündbar.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/preise">
              <Button className="rounded-full bg-gradient-primary hover:opacity-95">Preise &amp; Leistungen</Button>
            </Link>
            <Link to="/auth?mode=signin">
              <Button variant="ghost" className="rounded-full">
                Schon Kunde? Anmelden
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
