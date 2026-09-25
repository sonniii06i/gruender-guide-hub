import { lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ToolTrialProvider } from "@/components/freetools/ToolTrial";
import { TRIAL_TOOL_BY_SLUG } from "@/lib/freetools/trialTools";
import { useAccess } from "@/hooks/useAccess";

// Dieselben Komponenten wie im Cockpit — hier nur im ToolTrialProvider.
const TOOL_COMPONENTS = {
  "weee-check": lazy(() => import("./WeeeCheck.tsx")),
  "brand-check": lazy(() => import("./BrandCheck.tsx")),
  "lucid-wizard": lazy(() => import("./LucidWizard.tsx")),
} as const;

type TrialSlug = keyof typeof TOOL_COMPONENTS;
const isTrialSlug = (s: string): s is TrialSlug => s in TOOL_COMPONENTS;

/**
 * Öffentliche Probier-Seite /tools/:slug/gratis: eine kostenlose Nutzung ohne
 * Konto, das Ergebnis gegen die E-Mail-Adresse (siehe ToolTrial.tsx).
 *
 * noindex und nicht in der Sitemap: Die Seite ist ein Werkzeug, kein Inhalt.
 * Die beschreibende, indexierbare Seite ist /tools/:slug (Canonical dorthin).
 * Wer ein aktives Abo hat, landet direkt in der Vollversion im Cockpit.
 */
const ToolTrialPage = () => {
  const { slug = "" } = useParams();
  const tool = TRIAL_TOOL_BY_SLUG[slug];
  const { loading, hasActiveSub, isAdmin } = useAccess();

  if (!tool || !isTrialSlug(slug)) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Tool nicht gefunden | GründerX" description="Für dieses Tool gibt es keine kostenlose Probe." path={`/tools/${slug}/gratis`} noindex />
        <Navbar />
        <main className="container max-w-2xl py-24 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Keine kostenlose Probe für dieses Tool</h1>
          <Link to="/tools"><Button className="rounded-full">Alle Tools ansehen</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!loading && (hasActiveSub || isAdmin)) return <Navigate to={tool.cockpitPath} replace />;

  const ToolComponent = TOOL_COMPONENTS[slug];
  const spinner = (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-5 w-5 animate-spin text-accent-blue" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${tool.name} kostenlos testen | GründerX`}
        description={`${tool.desc} Eine kostenlose Prüfung, nur E-Mail nötig – kein Konto, keine Zahlung.`}
        path={tool.landingPath}
        noindex
      />
      <Navbar />
      <main className="pt-20 md:pt-24">
        {loading ? (
          spinner
        ) : (
          <ToolTrialProvider tool={tool}>
            <Suspense fallback={spinner}>
              <ToolComponent />
            </Suspense>
          </ToolTrialProvider>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ToolTrialPage;
