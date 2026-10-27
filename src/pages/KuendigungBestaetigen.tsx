import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

/**
 * Zweiter Schritt der Kündigung (Security-Review 27.10.2026): Der Link aus der
 * Eingangsbestätigung führt hierher; erst der Klick auf „Kündigung bestätigen“
 * merkt das Abo in Stripe zum Periodenende vor. Kein Auslösen beim bloßen
 * Öffnen (Mail-Scanner rufen Links automatisch auf).
 */
const KuendigungBestaetigen = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<"" | "sendet" | "ok" | "fehler">("");
  const [ende, setEnde] = useState<string | null>(null);

  const bestaetigen = async () => {
    setStatus("sendet");
    const { data, error } = await supabase.functions.invoke("vertrag-kuendigen", { body: { aktion: "bestaetigen", token } });
    if (error || !data?.ok) { setStatus("fehler"); return; }
    setEnde(data.ende ?? null);
    setStatus("ok");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Kündigung bestätigen | GründerX" description="Kündigung deines GründerX-Abos bestätigen." path="/kuendigen/bestaetigen" noindex />
      <Navbar />
      <main>
        <PageHeader width="max-w-2xl" title="Kündigung bestätigen" lead={<p>Ein Klick, damit wir deine Kündigung sofort automatisch umsetzen.</p>} />
        <div className="container max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            {status === "ok" ? (
              <p role="status" className="font-medium">
                {ende ? `Erledigt: Dein Abo endet am ${ende}. Danach wird nichts mehr abgebucht.` : "Erledigt. Wir haben die Kündigung umgesetzt bzw. bestätigen dir das Vertragsende gesondert."}
              </p>
            ) : (
              <div className="space-y-4">
                <Button size="lg" onClick={bestaetigen} disabled={!token || status === "sendet"}>
                  {status === "sendet" ? "Wird bestätigt …" : "Kündigung bestätigen"}
                </Button>
                {status === "fehler" && (
                  <p role="alert" className="text-sm text-danger">
                    Der Link ist ungültig oder abgelaufen. Deine Kündigung ist trotzdem eingegangen – unser Support bearbeitet sie. Fragen an service@gruenderx.de.
                  </p>
                )}
              </div>
            )}
          </div>
          <p className="mt-6 text-sm text-muted-foreground"><Link to="/kuendigen" className="underline">Zurück zur Kündigung</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KuendigungBestaetigen;
