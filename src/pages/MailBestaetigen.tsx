import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

/**
 * Adresse bestätigen (27.10.2026). Konten aus dem Kauf (claim-account) entstehen
 * mit der eingetippten Kauf-Mail; erst nach diesem Klick verbinden wir sie mit
 * bestehenden Daten zur Adresse. Bestätigt wird per Knopf, nicht beim Öffnen
 * (Mail-Scanner rufen Links automatisch auf).
 */
const MailBestaetigen = () => {
  const [params] = useSearchParams();
  const token = params.get("t") ?? "";
  const [status, setStatus] = useState<"" | "sendet" | "ok" | "fehler">("");
  const [grund, setGrund] = useState("");

  const bestaetigen = async () => {
    setStatus("sendet");
    const { data, error } = await supabase.functions.invoke("mail-verifizieren", { body: { token } });
    if (error || !data?.ok) {
      setGrund(data?.error === "abgelaufen" ? "Der Link ist abgelaufen. Fordere im Konto einen neuen an."
        : data?.error === "adresse_geaendert" ? "Die Adresse des Kontos hat sich inzwischen geändert."
        : "Der Link ist ungültig oder unvollständig.");
      setStatus("fehler");
      return;
    }
    try { await supabase.auth.refreshSession(); } catch { /* nicht eingeloggt */ }
    setStatus("ok");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title="E-Mail bestätigen | GründerX" description="E-Mail-Adresse deines GründerX-Kontos bestätigen." path="/mail-bestaetigen" noindex />
      <Navbar />
      <main>
        <PageHeader width="max-w-2xl" title="E-Mail-Adresse bestätigen" lead={<p>Ein Klick genügt – damit wissen wir, dass die Adresse dir gehört.</p>} />
        <div className="container max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
            {status === "ok" ? (
              <>
                <p role="status" className="font-medium">Danke! Deine Adresse ist bestätigt.</p>
                <Button asChild><Link to="/dashboard">Zum Dashboard</Link></Button>
              </>
            ) : status === "fehler" ? (
              <>
                <p role="alert" className="font-medium">{grund}</p>
                <Button asChild variant="outline"><Link to="/dashboard">Zum Dashboard</Link></Button>
              </>
            ) : (
              <>
                <Button onClick={bestaetigen} disabled={!token || status === "sendet"}>
                  {status === "sendet" ? "Wird bestätigt …" : "Adresse bestätigen"}
                </Button>
                {!token && <p className="text-sm text-destructive">Im Link fehlt der Bestätigungscode.</p>}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MailBestaetigen;
