import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

export interface TourStep {
  /** CSS-Selektor des zu markierenden Elements. Weggelassen => zentriertes Panel. */
  selector?: string;
  /** Route, zu der vor dem Schritt navigiert wird (optional). */
  route?: string;
  title: string;
  text: string;
}

interface Props {
  steps: TourStep[];
  /** localStorage-Key, damit die Tour nur einmal automatisch startet. */
  storageKey: string;
  /** Pfad, auf dem die Tour automatisch startet (Default /dashboard). */
  autoStartPath?: string;
}

const PAD = 8;

/**
 * Selbst-enthaltene Onboarding-Tour (Spotlight + Tooltip), wie im Arbitragex-Cockpit.
 * Keine externen Deps. Erneut startbar via `window.dispatchEvent(new Event("start-tour"))`.
 */
export default function OnboardingTour({ steps, storageKey, autoStartPath = "/dashboard" }: Props) {
  const [active, setActive] = useState(false);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const finish = useCallback(() => {
    setActive(false);
    setRect(null);
    try { localStorage.setItem(storageKey, "1"); } catch { /* ignore */ }
  }, [storageKey]);

  // Auto-Start einmalig
  useEffect(() => {
    let done = "1";
    try { done = localStorage.getItem(storageKey) || ""; } catch { /* ignore */ }
    if (!done && location.pathname === autoStartPath) {
      const t = setTimeout(() => { setI(0); setActive(true); }, 900);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Erneuter Start über globales Event (z. B. „?"-Button)
  useEffect(() => {
    const h = () => { setI(0); setActive(true); };
    window.addEventListener("start-tour", h);
    return () => window.removeEventListener("start-tour", h);
  }, []);

  // Ziel-Element finden (nach evtl. Navigation), Position berechnen
  useEffect(() => {
    if (!active) return;
    const step = steps[i];
    if (!step) return;
    if (step.route && step.route !== location.pathname + location.search) {
      navigate(step.route);
    }
    let tries = 0;
    const locate = () => {
      if (!step.selector) { setRect(null); return; }
      const el = document.querySelector(step.selector) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        setRect(el.getBoundingClientRect());
      } else if (tries++ < 20) {
        setTimeout(locate, 100);
      } else {
        setRect(null); // Fallback: zentriert zeigen
      }
    };
    const t = setTimeout(locate, step.route ? 350 : 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, i]);

  // Position bei Scroll/Resize aktuell halten
  useEffect(() => {
    if (!active) return;
    const step = steps[i];
    const recompute = () => {
      if (!step?.selector) return;
      const el = document.querySelector(step.selector) as HTMLElement | null;
      if (el) setRect(el.getBoundingClientRect());
    };
    window.addEventListener("scroll", recompute, true);
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute, true);
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, i]);

  if (!active || !steps.length) return null;
  const step = steps[i];
  const isFirst = i === 0;
  const isLast = i === steps.length - 1;

  // Tooltip-Position: neben/unter dem Ziel, sonst zentriert
  let tipStyle: React.CSSProperties = {
    left: "50%", top: "50%", transform: "translate(-50%,-50%)",
  };
  if (rect) {
    const vw = window.innerWidth;
    const below = rect.bottom + 12;
    const placeBelow = below + 180 < window.innerHeight;
    const left = Math.min(Math.max(rect.left, 16), vw - 360);
    tipStyle = placeBelow
      ? { left, top: rect.bottom + 14 }
      : { left, top: Math.max(16, rect.top - 200) };
  }

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "auto" }}>
      {/* Overlay + Spotlight-Loch via box-shadow */}
      {rect ? (
        <div
          className="absolute rounded-lg transition-all duration-200"
          style={{
            left: rect.left - PAD, top: rect.top - PAD,
            width: rect.width + PAD * 2, height: rect.height + PAD * 2,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
            outline: "2px solid hsl(var(--primary))",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-black/55" />
      )}

      {/* Tooltip-Panel */}
      <div
        className="absolute w-[340px] max-w-[calc(100vw-32px)] rounded-xl border border-border bg-card p-4 shadow-2xl"
        style={tipStyle}
        role="dialog"
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {i + 1} / {steps.length}
          </span>
          <button onClick={finish} aria-label="Tour schließen"
            className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-1 text-base font-semibold text-foreground">{step.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
        <div className="flex items-center justify-between">
          <button onClick={finish} className="text-xs text-muted-foreground hover:text-foreground">
            Überspringen
          </button>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button onClick={() => setI((n) => n - 1)}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">
                <ArrowLeft className="h-3.5 w-3.5" /> Zurück
              </button>
            )}
            <button
              onClick={() => (isLast ? finish() : setI((n) => n + 1))}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              {isLast ? "Fertig" : "Weiter"}
              {!isLast && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
