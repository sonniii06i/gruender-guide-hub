import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

/**
 * Rückkehr aus Stripe: /gruendungspaket/danke?session_id=cs_…
 * paket-download prüft die Session live bei Stripe, schickt beim ersten
 * Aufruf die Bestätigungsmail (§ 312f BGB) und gibt einen signierten Link
 * zurück, der PAKET_LINK_STUNDEN gilt. Dieselbe URL (steht in der Mail)
 * liefert 90 Tage lang jederzeit einen neuen Link.
 */
type Zustand =
  | { art: "laedt" }
  | { art: "bereit"; link: string; gueltigBis: string; mail: string }
  | { art: "fehler"; text: string };

const FEHLER: Record<string, string> = {
  nicht_bezahlt: "Die Zahlung ist noch nicht bestätigt. Lade die Seite in einer Minute neu.",
  erstattet: "Dieser Kauf wurde erstattet; der Download ist deshalb gesperrt.",
  abgelaufen: "Der Abrufzeitraum von 90 Tagen ist vorbei. Schreib uns an service@gruenderx.de.",
  session: "In diesem Link fehlt die Kaufkennung. Öffne den Link aus deiner Bestätigungsmail.",
};

const GruendungspaketDanke = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [z, setZ] = useState<Zustand>({ art: "laedt" });

  useEffect(() => {
    let aktiv = true;
    (async () => {
      const { data, error } = await supabase.functions.invoke("paket-download", { body: { session_id: sessionId } });
      if (!aktiv) return;
      if (error || !data?.link) {
        let code = "";
        try { code = (await (error as { context?: Response })?.context?.json())?.error ?? ""; } catch { /* egal */ }
        setZ({ art: "fehler", text: FEHLER[code] ?? "Zu diesem Link finden wir keinen gültigen Kauf. Schreib uns an service@gruenderx.de." });
        return;
      }
      setZ({ art: "bereit", link: data.link, gueltigBis: data.gueltigBis, mail: data.mail });
    })();
    return () => { aktiv = false; };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Danke für deinen Kauf | GründerX" description="Download deines Gründungspakets." path="/gruendungspaket/danke" noindex />
      <Navbar />
      <main>
        <PageHeader width="max-w-3xl" title="Danke! Dein Gründungspaket ist bereit." lead={<p>Starte mit der Datei „00-Uebersicht-und-Quellen.pdf“.</p>} />
        <div className="container max-w-3xl px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            {z.art === "laedt" && <p>Wir prüfen deine Zahlung …</p>}
            {z.art === "fehler" && <p role="alert" className="text-danger">{z.text}</p>}
            {z.art === "bereit" && (
              <div className="space-y-3">
                <Button asChild size="lg">
                  <a href={z.link} rel="nofollow"><Download className="mr-2 h-4 w-4" aria-hidden="true" />ZIP herunterladen</a>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Der Link gilt bis {new Date(z.gueltigBis).toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short" })} Uhr.
                  Danach öffnest du einfach diese Seite erneut (Link steht in deiner Mail) und bekommst einen neuen.
                </p>
                {z.mail === "fehlgeschlagen" && (
                  <p className="text-sm text-danger">Die Bestätigungsmail konnte noch nicht verschickt werden – wir versuchen es beim nächsten Öffnen dieser Seite erneut.</p>
                )}
              </div>
            )}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Die Rechnung kommt von Stripe per Mail. Fragen? <Link to="/kontakt" className="underline">Kontakt</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GruendungspaketDanke;
