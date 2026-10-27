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
 * Kündigungsschaltfläche nach § 312k BGB: „Verträge hier kündigen“ (Footer jeder
 * Seite, ohne Login) -> Bestätigungsseite mit Art, Name, Identifizierung, Vertrag,
 * Zeitpunkt (und Grund bei außerordentlicher Kündigung) -> „jetzt kündigen“.
 * Die Edge Function vertrag-kuendigen merkt laufende Abos zum Periodenende vor
 * (Startangebot: Ende der Testphase, keine Folgezahlung) und schickt die
 * Eingangsbestätigung mit Datum und Uhrzeit (Abs. 4).
 */
const VertragKuendigen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vertrag, setVertrag] = useState("abo");
  const [art, setArt] = useState("ordentlich");
  const [zeitpunktArt, setZeitpunktArt] = useState("naechstmoeglich");
  const [datum, setDatum] = useState("");
  const [grund, setGrund] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"" | "sendet" | "ok" | "fehler">("");
  const [bestaetigung, setBestaetigung] = useState("");
  const [eingang, setEingang] = useState("");

  const kuendigen = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sendet");
    const zeitpunkt = zeitpunktArt === "datum" && datum ? datum : "naechstmoeglich";
    const { data, error } = await supabase.functions.invoke("vertrag-kuendigen", {
      body: { name, email, vertrag, art, zeitpunkt, grund: art === "ausserordentlich" ? grund : "", website },
    });
    if (error || !data?.ok) { setStatus("fehler"); return; }
    setBestaetigung(data.bestaetigung ?? "");
    setEingang(new Date(data.eingang).toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short" }) + " Uhr");
    setStatus("ok");
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Verträge hier kündigen | GründerX"
        description="Kündigungsschaltfläche nach § 312k BGB: GründerX-Abo oder Startangebot online kündigen und Eingangsbestätigung per E-Mail erhalten."
        path="/kuendigen"
      />
      <Navbar />
      <main>
        <PageHeader width="max-w-2xl" title="Verträge hier kündigen" lead={<p>Hier kündigst du dein GründerX-Abo – auch das 7-Tage-Startangebot. Ein Login ist nicht nötig.</p>} />
        <div className="container max-w-2xl px-4 py-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            {status === "ok" ? (
              <div role="status" className="space-y-2">
                <p className="font-medium">Deine Kündigung ist am {eingang} eingegangen.</p>
                <p className="text-sm text-muted-foreground">
                  {bestaetigung === "gesendet"
                    ? `Die Eingangsbestätigung ist per E-Mail an ${email} unterwegs. Klicke darin auf „Kündigung bestätigen“, dann setzen wir sie sofort um (bist du eingeloggt, ist das schon passiert).`
                    : "Wir haben sie gespeichert und bearbeiten sie. Die Bestätigungsmail konnte gerade nicht verschickt werden – mach dir einen Screenshot dieser Seite als Beleg."}
                </p>
              </div>
            ) : (
              <form onSubmit={kuendigen} className="space-y-4">
                <label className="block text-sm font-medium">Art der Kündigung
                  <select value={art} onChange={(e) => setArt(e.target.value)} className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="ordentlich">Ordentliche Kündigung</option>
                    <option value="ausserordentlich">Außerordentliche Kündigung (aus wichtigem Grund)</option>
                  </select>
                </label>
                {art === "ausserordentlich" && (
                  <label className="block text-sm font-medium">Kündigungsgrund
                    <textarea required minLength={3} maxLength={600} value={grund} onChange={(e) => setGrund(e.target.value)} className="mt-1 block min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </label>
                )}
                <label className="block text-sm font-medium">Dein Name
                  <Input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className="mt-1" autoComplete="name" />
                </label>
                <label className="block text-sm font-medium">E-Mail-Adresse deines Kontos bzw. Kaufs (für die Zuordnung und die Eingangsbestätigung)
                  <Input required type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" autoComplete="email" />
                </label>
                <label className="block text-sm font-medium">Welcher Vertrag?
                  <select value={vertrag} onChange={(e) => setVertrag(e.target.value)} className="mt-1 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="abo">GründerX-Abo (auch 7-Tage-Startangebot)</option>
                    <option value="sonstiges">anderer Vertrag mit GründerX</option>
                  </select>
                </label>
                <fieldset className="space-y-2 text-sm">
                  <legend className="font-medium">Zu welchem Zeitpunkt?</legend>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="zp" checked={zeitpunktArt === "naechstmoeglich"} onChange={() => setZeitpunktArt("naechstmoeglich")} />
                    zum nächstmöglichen Zeitpunkt
                  </label>
                  <label className="flex flex-wrap items-center gap-2">
                    <input type="radio" name="zp" checked={zeitpunktArt === "datum"} onChange={() => setZeitpunktArt("datum")} />
                    zu einem bestimmten Datum
                    {zeitpunktArt === "datum" && (
                      <Input type="date" required value={datum} onChange={(e) => setDatum(e.target.value)} className="h-9 w-auto" />
                    )}
                  </label>
                </fieldset>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={website} onChange={(e) => setWebsite(e.target.value)} />
                <p className="text-sm text-muted-foreground">
                  Beim 7-Tage-Startangebot endet der Vertrag mit Ablauf der Testphase – es wird danach nichts abgebucht.
                </p>
                <Button type="submit" size="lg" disabled={status === "sendet"}>{status === "sendet" ? "Wird gesendet …" : "jetzt kündigen"}</Button>
                {status === "fehler" && (
                  <p role="alert" className="text-sm text-danger">
                    Das hat nicht geklappt. Bitte versuch es erneut oder schick deine Kündigung an service@gruenderx.de.
                  </p>
                )}
              </form>
            )}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Du möchtest stattdessen einen Kauf widerrufen? <Link to="/vertrag-widerrufen" className="underline">Vertrag widerrufen</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VertragKuendigen;
