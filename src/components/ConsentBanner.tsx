import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { changeMarketingConsent, hasDecidedConsent, OPEN_CONSENT_EVENT } from "@/utils/consent";

/**
 * Einwilligungsdialog für Marketing-Cookies (Meta Pixel, Google Ads).
 *
 * Zwei Dinge sind hier keine Geschmacksfrage, sondern Vorgabe:
 *
 * 1. ABLEHNEN IST GLEICH PROMINENT. Die deutschen Aufsichtsbehörden verlangen,
 *    dass die Ablehnung genauso leicht erreichbar ist wie die Zustimmung — ein
 *    grauer Textlink neben einem grünen Knopf gilt als unwirksame Einwilligung.
 *    Beide Knöpfe sind deshalb gleich groß und stehen nebeneinander.
 *
 * 2. NICHTS LÄUFT VORHER. Es gibt keine Vorauswahl und keinen Pixel, der schon
 *    geladen wäre, während das Banner noch steht (§ 25 TDDDG). Die Pixel hängen
 *    an `onMarketingConsent` und werden erst durch den Klick nachgeladen.
 *
 * Die reine Produktanalytik (`analytics_events`) läuft unabhängig davon weiter —
 * sie sendet nichts an Dritte und braucht deshalb keine Einwilligung.
 *
 * Baugleich mit dem Banner in AnwaltX. Änderungen bitte in beiden Projekten.
 */
export const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  // Erst nach dem Mount entscheiden: `hasDecidedConsent()` liest localStorage,
  // und beim Prerendern (react-snap) gibt es das nicht. Stünde das Banner im
  // vorgerenderten HTML, sähe es jeder Crawler als Seiteninhalt.
  useEffect(() => {
    if (!hasDecidedConsent()) setVisible(true);
    // "Cookie-Einstellungen" in Footer und Datenschutz oeffnen das Banner
    // erneut -- der Widerruf muss so leicht sein wie die Zustimmung.
    const open = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!visible) return null;

  const decide = (granted: boolean) => {
    setVisible(false);
    changeMarketingConsent(granted);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Einwilligung für Marketing-Cookies"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-card/90 sm:inset-x-4 sm:bottom-4"
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue sm:flex">
            <Cookie className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Wir nutzen Cookies von Meta und Google, um zu messen, welche Anzeigen
            zu einer Registrierung führen. Ohne diese Messung können wir Werbung
            nicht sinnvoll steuern.{" "}
            <Link to="/datenschutz" className="font-medium text-foreground underline underline-offset-2 hover:text-accent-blue">
              Datenschutzerklärung
            </Link>
          </p>
        </div>

        <div className="flex w-full min-w-0 gap-2 sm:w-auto sm:shrink-0">
          <Button variant="outline" className="min-w-0 flex-1 px-3 sm:flex-none sm:px-4" onClick={() => decide(false)}>
            Nur notwendige
          </Button>
          <Button className="min-w-0 flex-1 px-3 sm:flex-none sm:px-4" onClick={() => decide(true)}>
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
