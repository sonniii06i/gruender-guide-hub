import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { hasDecidedConsent, setMarketingConsent } from "@/utils/consent";

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
  }, []);

  if (!visible) return null;

  const decide = (granted: boolean) => {
    setMarketingConsent(granted);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Einwilligung für Marketing-Cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/90"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Wir nutzen Cookies von Meta und Google, um zu messen, welche Anzeigen
          zu einer Registrierung führen. Ohne diese Messung können wir Werbung
          nicht sinnvoll steuern.{" "}
          <Link to="/datenschutz" className="font-medium text-primary underline underline-offset-2">
            Datenschutzerklärung
          </Link>
        </p>

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
