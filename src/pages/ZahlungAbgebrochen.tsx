// Landeseite fuer die abgebrochene oder gescheiterte Zahlung (cancel_url).
//
// Vorher fuehrte der Abbruch auf /checkout?canceled=1 — dasselbe Formular,
// ohne ein Wort dazu, ob Geld geflossen ist. Wer unsicher war, hat entweder
// ein zweites Mal bezahlt oder aufgegeben.
import { Link, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Seo } from "@/components/Seo";

const SUPPORT = "service@gruenderx.de";

const ZahlungAbgebrochen = () => {
  const [params] = useSearchParams();
  const gescheitert = params.get("grund") === "fehler";

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <Seo
        title="Zahlung abgebrochen – GründerX"
        description="Die Zahlung wurde nicht abgeschlossen."
        path="/zahlung-abgebrochen"
        noindex
      />
      <div className="mx-auto w-full max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <XCircle className="mx-auto mb-3 h-12 w-12 text-destructive" />
            <CardTitle className="text-2xl">
              {gescheitert ? "Zahlung fehlgeschlagen" : "Zahlung abgebrochen"}
            </CardTitle>
            <CardDescription>
              {gescheitert
                ? "Die Zahlung konnte nicht ausgeführt werden — es wurde nichts abgebucht."
                : "Du hast die Zahlung abgebrochen — es wurde nichts abgebucht."}{" "}
              Dein Konto ist unverändert, du kannst es jederzeit erneut versuchen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button asChild>
                <Link to="/checkout">Erneut versuchen</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Zurück zur Startseite</Link>
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Hat etwas nicht funktioniert?{" "}
              <a
                href={`mailto:${SUPPORT}?subject=Problem%20bei%20der%20Zahlung`}
                className="underline underline-offset-4"
              >
                Schreib uns kurz
              </a>{" "}
              — wir helfen weiter.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZahlungAbgebrochen;
