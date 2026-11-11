import { lazy, Suspense } from "react";
import { Seo } from "@/components/Seo";
import { ToolTrialProvider } from "@/components/freetools/ToolTrial";
import { TRIAL_TOOL_BY_SLUG } from "@/lib/freetools/trialTools";

const LucidWizard = lazy(() => import("./LucidWizard.tsx"));

/**
 * Einbettbarer Verpackungslizenz-Rechner (11.11.2026, Top-1-Programm, Betreiber „Frei + einbettbar“).
 * Läuft im iframe fremder Websites: ohne Navigation, Banner, Tracking und Werbe-Pixel (App.tsx prüft
 * istEinbettung), noindex mit Canonical auf /tools/lucid-wizard. Der Quellenlink im Einbettcode liegt
 * außerhalb des iframes; hier unten steht zusätzlich eine sichtbare Quellenangabe.
 */
const EinbettenLucid = () => {
  const tool = TRIAL_TOOL_BY_SLUG["lucid-wizard"];
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Verpackungslizenz-Rechner · GründerX"
        description="Lizenzkosten für Verpackungen schätzen und passende duale Systeme vergleichen – kostenlos und ohne Anmeldung."
        path="/tools/lucid-wizard"
        noindex
      />
      <main className="px-3 py-4 sm:px-4">
        <p className="mx-auto mb-4 max-w-4xl text-sm font-semibold">Verpackungslizenz-Rechner: Kosten schätzen und duale Systeme vergleichen</p>
        <ToolTrialProvider tool={tool} ohneHinweis>
          <Suspense fallback={<p className="mx-auto max-w-4xl text-sm text-muted-foreground">Rechner wird geladen …</p>}>
            <LucidWizard rahmen={false} />
          </Suspense>
        </ToolTrialProvider>
        <p className="mx-auto mt-6 max-w-4xl text-xs text-muted-foreground">
          Verpackungslizenz-Rechner von{" "}
          <a href="https://gruenderx.de/tools/lucid-wizard?utm_source=einbettung&utm_medium=rechner" target="_blank" rel="noopener" className="underline">
            GründerX
          </a>{" "}
          · kostenlos, ohne Anmeldung. Keine Rechts- oder Steuerberatung.
        </p>
      </main>
    </div>
  );
};

export default EinbettenLucid;
