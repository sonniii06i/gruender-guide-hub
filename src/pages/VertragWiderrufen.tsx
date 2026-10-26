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
  const [vertrag, setVertrag] = useState("abo");
  const [bestellnummer, setBestellnummer] = useState("");
  const [kaufdatum, setKaufdatum] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"" | "sendet" | "ok" | "fehler">("");
  const [bestaetigung, setBestaetigung] = useState("");
  const [eingang, setEingang] = useState("");

  const senden = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sendet");
    const { data, error } = await supabase.functions.invoke("vertrag-widerrufen", { body: { name, email, vertrag, bestellnummer, kaufdatum, website } });
    if (error || !data?.ok) { setStatus("fehler"); return; }
    setBestaetigung(data.bestaetigung ?? "");
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
                <p className="text-sm text-muted-foreground">
                  {bestaetigung === "gesendet"
                    ? `Die Eingangsbestätigung ist per E-Mail an ${email} unterwegs.`
                    : "Wir haben ihn gespeichert. Die Bestätigungsmail konnte gerade nicht verschickt werden – mach dir einen Screenshot dieser Seite als Beleg."}
                </p>
              </div>
            ) : !offen ? (
              <Button size="lg" onClick={() => setOffen(true)}>Vertrag widerrufen</Button>
            ) : (
              <form onSubmit={senden} className="space-y-4">
                <label className="block text-sm font-medium">Dein Name
                  <Input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className="mt-1" autoComplete="name" />
                </label>
                <label className="block text-sm font-medium">E-Mail-Adresse für die Eingangsbestätigung
                  <Input required type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" autoComplete="email" />
                </label>
                <label className="block text-sm font-medium">Welcher Vertrag?
                  <select value={vertrag} onChange={(e) => setVertrag(e.target.value)} className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="abo">GründerX-Abo</option>
                    <option value="gruendungspaket">Gründungspaket 2026 (Download)</option>
                    <option value="sonstiges">anderer Vertrag mit GründerX</option>
                  </select>
                </label>
                <label className="block text-sm font-medium">Bestellnummer (optional, steht in deiner Bestätigungsmail, z. B. pi_… oder sub_…)
                  <Input maxLength={90} pattern="(pi|cs_live|cs_test|sub|in|ch)_[A-Za-z0-9_]{6,80}" value={bestellnummer} onChange={(e) => setBestellnummer(e.target.value.trim())} className="mt-1" />
                </label>
                <label className="block text-sm font-medium">Kaufdatum (optional)
                  <Input type="date" value={kaufdatum} onChange={(e) => setKaufdatum(e.target.value)} className="mt-1" />
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
