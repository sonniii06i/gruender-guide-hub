// Landeseite fuer die abgebrochene oder gescheiterte Zahlung (cancel_url).
//
// Vorher fuehrte der Abbruch auf /checkout?canceled=1 — dasselbe Formular,
// ohne ein Wort dazu, ob Geld geflossen ist. Wer unsicher war, hat entweder
// ein zweites Mal bezahlt oder aufgegeben.
import { Link, useSearchParams } from "react-router-dom";
import { XCircle, CircleSlash, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KontoRahmen, kontoCta } from "@/components/KontoRahmen";
import { Seo } from "@/components/Seo";

const SUPPORT = "service@gruenderx.de";

const ZahlungAbgebrochen = () => {
  const [params] = useSearchParams();
  const gescheitert = params.get("grund") === "fehler";

  return (
    <>
      <Seo
        title="Zahlung abgebrochen – GründerX"
        description="Die Zahlung wurde nicht abgeschlossen."
        path="/zahlung-abgebrochen"
        noindex
      />
      <KontoRahmen
        icon={gescheitert ? XCircle : CircleSlash}
        tone={gescheitert ? "danger" : "neutral"}
        title={gescheitert ? "Zahlung fehlgeschlagen" : "Zahlung abgebrochen"}
        subtitle={
          gescheitert
            ? "Die Zahlung konnte nicht ausgeführt werden. Es wurde nichts abgebucht."
            : "Du hast die Zahlung abgebrochen. Es wurde nichts abgebucht."
        }
        footer={
          <>
            Hat etwas nicht funktioniert?{" "}
            <a
              href={`mailto:${SUPPORT}?subject=Problem%20bei%20der%20Zahlung`}
              className="font-medium text-foreground/80 underline underline-offset-4"
            >
              Schreib uns kurz
            </a>
            , wir helfen weiter.
          </>
        }
      >
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
          <p>Dein Konto ist unverändert. Du kannst es jederzeit erneut versuchen.</p>
        </div>
        <div className="grid gap-2">
          <Button asChild size="lg" className={kontoCta}>
            <Link to="/checkout">Erneut versuchen</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 rounded-xl">
            <Link to="/">Zurück zur Startseite</Link>
          </Button>
        </div>
      </KontoRahmen>
    </>
  );
};

export default ZahlungAbgebrochen;
