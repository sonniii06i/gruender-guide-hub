import { lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SearchX } from "lucide-react";
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
        <main className="container max-w-xl px-4 pb-24 pt-36 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-blue">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">Keine kostenlose Probe für dieses Tool</h1>
          <p className="mt-3 text-muted-foreground">Alle Tools mit Beschreibung und den kostenlosen Proben findest du in der Übersicht.</p>
          <Button asChild size="lg" className="mt-7 h-11 rounded-xl bg-gradient-primary font-semibold">
            <Link to="/tools">Alle Tools ansehen</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!loading && (hasActiveSub || isAdmin)) return <Navigate to={tool.cockpitPath} replace />;

  const ToolComponent = TOOL_COMPONENTS[slug];
  const spinner = (
    <div className="container max-w-5xl px-4 py-10" role="status" aria-live="polite">
      <span className="sr-only">Tool wird geladen …</span>
      <div className="animate-pulse space-y-4" aria-hidden="true">
        <div className="h-4 w-32 rounded bg-secondary" />
        <div className="h-9 w-2/3 max-w-md rounded-lg bg-secondary" />
        <div className="h-4 w-full max-w-xl rounded bg-secondary" />
        <div className="grid gap-4 pt-4 md:grid-cols-[1fr_340px]">
          <div className="h-72 rounded-2xl border border-border bg-card" />
          <div className="h-48 rounded-2xl bg-secondary" />
        </div>
      </div>
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
