import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { RUNDGANG_EVENT, tourPanelLage, type Kasten } from "@/lib/tourLage";

export interface TourStep {
  /** CSS-Selektor der Stelle, die gezeigt wird. Ohne Selektor steht das Feld in der Mitte. */
  selector?: string;
  /** Die Stelle liegt in der Seitenleiste: auf dem Handy wird dafür das Menü geöffnet. */
  menue?: boolean;
  title: string;
  text: string;
}

interface Props {
  steps: TourStep[];
  /** true = Rundgang einmal von selbst beginnen (erster Besuch im Cockpit). */
  autoStart: boolean;
  /** Seite, auf der der Rundgang läuft. */
  pfad?: string;
  /** Rundgang beendet oder übersprungen. */
  onEnde: () => void;
}

interface Gezeigt {
  i: number;
  kasten: Kasten | null;
  /** Wohin gerendert wird: auf dem Handy bei Menü-Stationen in das geöffnete Menü, sonst in den Body. */
  behaelter: HTMLElement;
}

const RAND = 6;
/** Höhe der klebenden Kopfzeile plus Luft für den Rahmen. */
const KOPFZEILE = 72;
const MENUE_SHEET = '[data-sidebar="sidebar"][data-mobile="true"]';
const wenigBewegung = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const kastenVon = (el: Element): Kasten => {
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
};

/** Hohe Stelle auf kleinem Schirm: Rahmen endet vor dem Feld, statt darunter zu verschwinden. */
function rahmenNebenFeld(k: Kasten | null, lage: { left: number; top: number; hoehe: number } | null): Kasten | null {
  if (!k || !lage || window.innerWidth >= 640) return k;
  const feldUnten = lage.top + lage.hoehe;
  if (lage.top > k.top && lage.top < k.top + k.height + RAND) {
    return { ...k, height: Math.max(48, lage.top - 10 - RAND - k.top) };
  }
  if (lage.top <= k.top && feldUnten > k.top - RAND) {
    const oben = feldUnten + 10 + RAND;
    return { ...k, top: oben, height: Math.max(48, k.top + k.height - oben) };
  }
  return k;
}

/**
 * Rundgang durchs Cockpit: dunkelt die Seite ab, zeigt nacheinander die Stellen,
 * die man kennen muss, und erklärt jede in einem Satz. Ohne fremde Bibliothek.
 * Neu starten: `window.dispatchEvent(new Event("start-tour"))`.
 */
export default function OnboardingTour({ steps, autoStart, pfad = "/dashboard", onEnde }: Props) {
  const [aktiv, setAktiv] = useState(false);
  const [i, setI] = useState(0);
  const [gezeigt, setGezeigt] = useState<Gezeigt | null>(null);
  const [lage, setLage] = useState<{ left: number; top: number; hoehe: number } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, openMobile, setOpenMobile, state, setOpen } = useSidebar();
  const panel = useRef<HTMLDivElement>(null);
  const richtung = useRef<1 | -1>(1);
  const selbstGeoeffnet = useRef(false);
  const gestartet = useRef(false);
  // Aktuelle Werte für Effekte, die nicht bei jeder Änderung neu laufen sollen.
  const menue = useRef({ isMobile, openMobile, state });
  menue.current = { isMobile, openMobile, state };

  const beenden = useCallback(() => {
    setAktiv(false);
    setGezeigt(null);
    setLage(null);
    if (menue.current.isMobile) setOpenMobile(false);
    else if (selbstGeoeffnet.current) setOpen(false);
    selbstGeoeffnet.current = false;
    onEnde();
  }, [onEnde, setOpen, setOpenMobile]);

  const starten = useCallback(() => {
    richtung.current = 1;
    setI(0);
    setGezeigt(null);
    setAktiv(true);
  }, []);

  // Seitenleiste klappt während des Rundgangs alle Gruppen auf.
  useEffect(() => {
    if (!aktiv) return;
    window.dispatchEvent(new CustomEvent(RUNDGANG_EVENT, { detail: true }));
    return () => { window.dispatchEvent(new CustomEvent(RUNDGANG_EVENT, { detail: false })); };
  }, [aktiv]);

  // Erster Besuch: einmal von selbst, kurz nachdem das Cockpit steht.
  useEffect(() => {
    if (!autoStart || gestartet.current) return;
    gestartet.current = true;
    const t = setTimeout(starten, 700);
    return () => clearTimeout(t);
  }, [autoStart, starten]);

  // Erneut über das Fragezeichen in der Kopfzeile. Von anderen Seiten aus erst ins Cockpit.
  useEffect(() => {
    const h = () => {
      if (window.location.pathname !== pfad || window.location.search) navigate(pfad);
      window.scrollTo({ top: 0 });
      setTimeout(starten, 350);
    };
    window.addEventListener("start-tour", h);
    return () => window.removeEventListener("start-tour", h);
  }, [navigate, pfad, starten]);

  // Wer mitten im Rundgang die Seite wechselt, hat ihn verlassen.
  useEffect(() => {
    if (aktiv && location.pathname !== pfad) beenden();
  }, [aktiv, location.pathname, pfad, beenden]);

  // Station vorbereiten: Menü öffnen oder schließen, Stelle suchen, in den Blick holen.
  useEffect(() => {
    if (!aktiv) return;
    const step = steps[i];
    if (!step) return;
    const m = menue.current;
    let wartezeit = 60;
    if (m.isMobile) {
      const soll = !!step.menue;
      if (m.openMobile !== soll) {
        // Das Feld zieht um (Seite <-> Menü): bis das Menü steht, nur abdunkeln.
        setGezeigt(null);
        setLage(null);
        setOpenMobile(soll);
        wartezeit = soll ? 560 : 340; // Ein- und Ausfahren des Menüs abwarten
      }
    } else if (step.menue && m.state === "collapsed") {
      setOpen(true);
      selbstGeoeffnet.current = true;
      wartezeit = 260;
    }

    let abgebrochen = false;
    let versuche = 0;
    let timer: ReturnType<typeof setTimeout>;
    const behaelter = (): HTMLElement =>
      (menue.current.isMobile && step.menue ? document.querySelector<HTMLElement>(MENUE_SHEET) : null) ?? document.body;
    const suchen = () => {
      if (abgebrochen) return;
      if (!step.selector) {
        setGezeigt({ i, kasten: null, behaelter: document.body });
        return;
      }
      const el = Array.from(document.querySelectorAll<HTMLElement>(step.selector)).find((e) => e.getClientRects().length > 0);
      if (el) {
        const hoch = el.getBoundingClientRect().height > window.innerHeight * (window.innerWidth < 640 ? 0.3 : 0.6);
        el.scrollIntoView({ block: hoch ? "start" : "center", behavior: "auto" });
        // Die Kopfzeile klebt oben: Stellen auf der Seite nicht darunter schieben.
        if (!step.menue && !el.closest("header")) {
          const oben = el.getBoundingClientRect().top;
          if (oben < KOPFZEILE) window.scrollBy({ top: oben - KOPFZEILE, behavior: "auto" });
        }
        // Einen Frame warten, bis das Scrollen sitzt.
        requestAnimationFrame(() => { if (!abgebrochen) setGezeigt({ i, kasten: kastenVon(el), behaelter: behaelter() }); });
      } else if (versuche++ < 25) {
        timer = setTimeout(suchen, 80);
      } else {
        // Stelle gibt es hier nicht (z. B. Admin-Ansicht): Station auslassen.
        const naechste = i + richtung.current;
        if (naechste >= 0 && naechste < steps.length) setI(naechste);
        else setGezeigt({ i, kasten: null, behaelter: document.body });
      }
    };
    timer = setTimeout(suchen, wartezeit);
    return () => { abgebrochen = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aktiv, i]);

  // Rahmen bei Scrollen und Größenänderung nachführen.
  useEffect(() => {
    if (!aktiv || !gezeigt) return;
    const sel = steps[gezeigt.i]?.selector;
    if (!sel) return;
    const nach = () => {
      const el = Array.from(document.querySelectorAll<HTMLElement>(sel)).find((e) => e.getClientRects().length > 0);
      if (el) setGezeigt((g) => (g ? { ...g, kasten: kastenVon(el) } : g));
    };
    window.addEventListener("scroll", nach, true);
    window.addEventListener("resize", nach);
    return () => {
      window.removeEventListener("scroll", nach, true);
      window.removeEventListener("resize", nach);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aktiv, gezeigt?.i]);

  // Feld neben die Stelle setzen, sobald seine Größe feststeht.
  useLayoutEffect(() => {
    if (!gezeigt || !panel.current) return;
    const p = panel.current.getBoundingClientRect();
    setLage({ ...tourPanelLage(gezeigt.kasten, { width: p.width, height: p.height }, { width: window.innerWidth, height: window.innerHeight }, !!steps[gezeigt.i]?.menue), hoehe: p.height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gezeigt]);

  // Neue Station: Fokus ins Feld, damit Tastatur und Screenreader dort weitermachen.
  const steht = lage !== null;
  useEffect(() => {
    if (!gezeigt || !steht) return;
    panel.current?.focus({ preventScroll: true });
    // Das Handy-Menü gibt den Fokus beim Schließen an seinen Auslöser zurück: einmal nachfassen.
    const t = setTimeout(() => {
      if (panel.current && !panel.current.contains(document.activeElement)) panel.current.focus({ preventScroll: true });
    }, 450);
    return () => clearTimeout(t);
  }, [gezeigt?.i, steht]); // eslint-disable-line react-hooks/exhaustive-deps

  const weiter = useCallback(() => {
    richtung.current = 1;
    setI((n) => {
      if (n >= steps.length - 1) { queueMicrotask(beenden); return n; }
      return n + 1;
    });
  }, [steps.length, beenden]);
  const zurueck = useCallback(() => {
    richtung.current = -1;
    setI((n) => Math.max(0, n - 1));
  }, []);

  useEffect(() => {
    if (!aktiv) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); beenden(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); weiter(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); zurueck(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      // Fokus bleibt im Feld, solange der Rundgang läuft.
      const ziele = Array.from(panel.current.querySelectorAll<HTMLElement>("button"));
      if (!ziele.length) return;
      const erstes = ziele[0];
      const letztes = ziele[ziele.length - 1];
      const drin = panel.current.contains(document.activeElement);
      if (e.shiftKey && (!drin || document.activeElement === erstes || document.activeElement === panel.current)) { e.preventDefault(); letztes.focus(); }
      else if (!e.shiftKey && (!drin || document.activeElement === letztes)) { e.preventDefault(); erstes.focus(); }
    };
    window.addEventListener("keydown", taste, true);
    return () => window.removeEventListener("keydown", taste, true);
  }, [aktiv, beenden, weiter, zurueck]);

  if (!aktiv || !steps.length) return null;

  // Bis die erste Stelle gefunden ist, nur abdunkeln: so springt nichts.
  if (!gezeigt) return createPortal(<div className="fixed inset-0 z-[9999] bg-black/55" aria-hidden="true" />, document.body);

  const step = steps[gezeigt.i];
  const erste = gezeigt.i === 0;
  const letzte = gezeigt.i === steps.length - 1;
  const k = rahmenNebenFeld(gezeigt.kasten, lage);
  const ruhig = wenigBewegung();

  return createPortal(
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "auto" }}>
      {k ? (
        <div
          aria-hidden="true"
          className={ruhig ? "absolute rounded-lg" : "absolute rounded-lg transition-[left,top,width,height] duration-200 ease-out"}
          style={{
            left: k.left - RAND, top: k.top - RAND, width: k.width + RAND * 2, height: k.height + RAND * 2,
            boxShadow: "0 0 0 200vmax rgba(0,0,0,0.55)",
            outline: "2px solid hsl(var(--primary))",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      )}

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rundgang-titel"
        aria-describedby="rundgang-text"
        tabIndex={-1}
        className="fixed w-[360px] max-w-[calc(100vw-24px)] rounded-lg border border-border bg-card p-4 text-left text-foreground shadow-2xl outline-none transition-opacity duration-150 ease-out motion-reduce:transition-none sm:p-5"
        style={lage ? { left: lage.left, top: lage.top } : { left: 12, top: 12, opacity: 0, pointerEvents: "none" }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground tabular">
            {erste ? "Rundgang" : `Station ${gezeigt.i} von ${steps.length - 1}`}
          </p>
          <button
            type="button"
            onClick={beenden}
            aria-label="Rundgang schließen"
            className="-mr-2 -mt-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-9 sm:w-9"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {!erste && (
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
            <div className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out motion-reduce:transition-none" style={{ width: `${(gezeigt.i / (steps.length - 1)) * 100}%` }} />
          </div>
        )}
        <h2 id="rundgang-titel" className="mt-3 text-base font-semibold leading-snug text-balance">{step.title}</h2>
        <p id="rundgang-text" className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{step.text}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          {erste ? (
            <>
              <Button type="button" variant="ghost" onClick={beenden} className="min-h-11 sm:min-h-9">Später</Button>
              <Button type="button" onClick={weiter} className="min-h-11 sm:min-h-9">Rundgang starten <ArrowRight aria-hidden="true" /></Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={zurueck} className="min-h-11 sm:min-h-9"><ArrowLeft aria-hidden="true" /> Zurück</Button>
              <Button type="button" onClick={weiter} className="min-h-11 sm:min-h-9">
                {letzte ? "Fertig" : <>Weiter <ArrowRight aria-hidden="true" /></>}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>,
    gezeigt.behaelter.isConnected ? gezeigt.behaelter : document.body,
  );
}
