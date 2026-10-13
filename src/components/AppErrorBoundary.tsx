import { Component, ErrorInfo, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { einmalNeuLaden, istChunkFehler } from "@/lib/chunkReload";

interface State {
  error: Error | null;
}

/**
 * Letztes Netz fuer Render-Fehler: statt einer weissen Seite eine Meldung
 * mit Neu-laden-Knopf. Chunk-Ladefehler loesen einmalig einen Reload aus.
 */
class ErrorBoundaryInner extends Component<{ children: ReactNode; resetKey: string }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: { resetKey: string }) {
    // Navigation auf eine andere Seite setzt den Fehlerzustand zurueck.
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("AppErrorBoundary:", error, info.componentStack);
    if (istChunkFehler(error)) einmalNeuLaden();
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold">Da ist etwas schiefgelaufen</h1>
          <p className="text-sm text-muted-foreground">
            {istChunkFehler(this.state.error)
              ? "Es gibt eine neue Version von GründerX. Bitte lade die Seite neu."
              : "Die Seite konnte nicht angezeigt werden. Lade sie neu oder geh zurück zur Startseite."}
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Neu laden
            </button>
            <a
              href="/"
              className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-secondary"
            >
              Zur Startseite
            </a>
          </div>
        </div>
      </div>
    );
  }
}

/** Fehlergrenze, die sich bei einem Seitenwechsel zuruecksetzt. */
export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <ErrorBoundaryInner resetKey={pathname}>{children}</ErrorBoundaryInner>;
}
