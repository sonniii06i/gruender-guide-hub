import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

/**
 * Widerrufsfunktion nach § 356a BGB (seit 19.06.2026 Pflicht für Verträge,
 * die über eine Online-Benutzeroberfläche geschlossen werden): erst
 * „Vertrag widerrufen“, dann Angaben, dann „Widerruf bestätigen“. Die
 * Edge Function vertrag-widerrufen schickt die Eingangsbestätigung mit
 * Inhalt, Datum und Uhrzeit (Abs. 4). Gilt für Abo und Gründungspaket.
 */
const VertragWiderrufen = () => {
  const [offen, setOffen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vertrag, setVertrag] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"" | "sendet" | "ok" | "fehler">("");
  const [eingang, setEingang] = useState("");

  const senden = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sendet");
    const { data, error } = await supabase.functions.invoke("vertrag-widerrufen", { body: { name, email, vertrag, website } });
    if (error || !data?.ok) { setStatus("fehler"); return; }
    setEingang(new Date(data.eingang).toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short" }) + " Uhr");
    setStatus("ok");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Vertrag widerrufen | GründerX"
        description="Widerrufsfunktion nach § 356a BGB: Vertrag mit GründerX online widerrufen und Eingangsbestätigung per E-Mail erhalten."
        path="/vertrag-widerrufen"
      />
      <Navbar />
      <main>
        <PageHeader width="max-w-2xl" title="Vertrag widerrufen" lead={<p>Hier widerrufst du einen Vertrag, den du online mit GründerX geschlossen hast.</p>} />
        <div className="container max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            {status === "ok" ? (
              <div role="status" className="space-y-2">
                <p className="font-medium">Dein Widerruf ist am {eingang} eingegangen.</p>
                <p className="text-sm text-muted-foreground">Die Eingangsbestätigung mit allen Angaben ist per E-Mail an {email} unterwegs.</p>
              </div>
            ) : !offen ? (
              <Button size="lg" onClick={() => setOffen(true)}>Vertrag widerrufen</Button>
            ) : (
              <form onSubmit={senden} className="space-y-4">
                <label className="block text-sm font-medium">Dein Name
                  <Input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className="mt-1" autoComplete="name" />
                </label>
                <label className="block text-sm font-medium">E-Mail-Adresse für die Eingangsbestätigung
                  <Input required type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" autoComplete="email" />
                </label>
                <label className="block text-sm font-medium">Welcher Vertrag? (z. B. „GründerX-Abo“ oder „Gründungspaket, Bestellnummer pi_…“, Kaufdatum)
                  <Input required maxLength={300} value={vertrag} onChange={(e) => setVertrag(e.target.value)} className="mt-1" />
                </label>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={website} onChange={(e) => setWebsite(e.target.value)} />
                <p className="text-sm text-muted-foreground">Erklärung: „Hiermit widerrufe ich den oben genannten Vertrag.“</p>
                <Button type="submit" size="lg" disabled={status === "sendet"}>{status === "sendet" ? "Wird gesendet …" : "Widerruf bestätigen"}</Button>
                {status === "fehler" && (
                  <p role="alert" className="text-sm text-danger">
                    Das hat nicht geklappt. Bitte versuch es erneut oder schick deinen Widerruf an support@gruenderx.de – rechtzeitig ist er, wenn du ihn vor Fristende absendest.
                  </p>
                )}
              </form>
            )}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Alles zu Fristen und Folgen: <Link to="/widerruf" className="underline">Widerrufsbelehrung</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VertragWiderrufen;
