import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, FileX, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { AdaptiveAppShell } from "@/components/AdaptiveAppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectCls } from "@/components/cockpit/kit";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { isPrerender } from "@/lib/prerender";
import { readProfileCache } from "@/lib/profileCache";

/**
 * Kündigungsschaltfläche nach § 312k BGB: „Verträge hier kündigen“ (Footer jeder
 * Seite, ohne Login) -> Bestätigungsseite mit Art, Name, Identifizierung, Vertrag,
 * Zeitpunkt (und Grund bei außerordentlicher Kündigung) -> „jetzt kündigen“.
 * Die Edge Function vertrag-kuendigen merkt laufende Abos zum Periodenende vor
 * (Startangebot: Ende der Testphase, keine Folgezahlung) und schickt die
 * Eingangsbestätigung mit Datum und Uhrzeit (Abs. 4).
 */
const VertragKuendigen = () => {
  const { user } = useAuth();
  const inCockpit = Boolean(user) && !isPrerender();
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

  useEffect(() => {
    if (!user) return;
    if (user.email) setEmail((prev) => prev || user.email!);
    const cached = readProfileCache(user.id);
    const full = [cached?.first_name, cached?.last_name].filter(Boolean).join(" ").trim();
    if (full) setName((prev) => prev || full);
  }, [user]);

  const kuendigen = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sendet");
    const zeitpunkt = zeitpunktArt === "datum" && datum ? datum : "naechstmoeglich";
    const { data, error } = await supabase.functions.invoke("vertrag-kuendigen", {
      body: { name, email, vertrag, art, zeitpunkt, grund: art === "ausserordentlich" ? grund : "", website },
    });
    if (error || !data?.ok) {
      setStatus("fehler");
      return;
    }
    setBestaetigung(data.bestaetigung ?? "");
    setEingang(new Date(data.eingang).toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short" }) + " Uhr");
    setStatus("ok");
  };

  return (
    <AdaptiveAppShell
      eyebrow="Konto & Vertrag"
      width="max-w-3xl"
      kicker={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          <FileX className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          § 312k BGB
        </span>
      }
      title="Verträge hier kündigen"
      lead={
        <p>
          Hier kündigst du dein GründerX-Abo, auch das 7-Tage-Startangebot. Ein Login ist dafür nicht nötig.
        </p>
      }
      seo={
        <Seo
          title="Verträge hier kündigen | GründerX"
          description="Kündigungsschaltfläche nach § 312k BGB: GründerX-Abo oder Startangebot online kündigen und Eingangsbestätigung per E-Mail erhalten."
          path="/kuendigen"
        />
      }
    >
      {inCockpit && user?.email && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-brand-green/30 bg-brand-green-soft/60 p-4 text-sm text-foreground">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
          <div>
            <p className="font-semibold text-primary">Direkt-Kündigung als eingeloggtes Mitglied</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              Deine Konto-Adresse (<strong className="text-foreground">{user.email}</strong>) ist vorausgefüllt. Nach dem
              Absenden wird dein laufendes Stripe-Abo sofort zum Periodenende vorgemerkt, ohne zusätzlichen Bestätigungsklick.
            </p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white p-6 shadow-card md:p-7">
        {status === "ok" ? (
          <div role="status" className="space-y-2.5">
            <div className="flex items-center gap-2 text-brand-green">
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="font-semibold text-primary">Deine Kündigung ist am {eingang} eingegangen.</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {bestaetigung === "gesendet"
                ? `Die Eingangsbestätigung ist per E-Mail an ${email} unterwegs. Klicke darin auf „Kündigung bestätigen“, dann setzen wir sie sofort um (bist du eingeloggt, ist das schon passiert).`
                : "Wir haben sie gespeichert und bearbeiten sie. Die Bestätigungsmail konnte gerade nicht verschickt werden. Mach dir einen Screenshot dieser Seite als Beleg."}
            </p>
          </div>
        ) : (
          <form onSubmit={kuendigen} className="space-y-4">
            <label className="block text-sm font-semibold text-foreground">
              Art der Kündigung
              <select value={art} onChange={(e) => setArt(e.target.value)} className={`mt-1.5 ${selectCls}`}>
                <option value="ordentlich">Ordentliche Kündigung</option>
                <option value="ausserordentlich">Außerordentliche Kündigung (aus wichtigem Grund)</option>
              </select>
            </label>
            {art === "ausserordentlich" && (
              <label className="block text-sm font-semibold text-foreground">
                Kündigungsgrund
                <textarea
                  required
                  minLength={3}
                  maxLength={600}
                  value={grund}
                  onChange={(e) => setGrund(e.target.value)}
                  className="mt-1.5 block min-h-[90px] w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm font-normal"
                />
              </label>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-foreground">
                Dein Name
                <Input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 h-11 rounded-xl" autoComplete="name" />
              </label>
              <label className="block text-sm font-semibold text-foreground">
                E-Mail-Adresse deines Kontos bzw. Kaufs
                <Input required type="email" maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 rounded-xl" autoComplete="email" />
              </label>
            </div>
            <label className="block text-sm font-semibold text-foreground">
              Welcher Vertrag?
              <select value={vertrag} onChange={(e) => setVertrag(e.target.value)} className={`mt-1.5 ${selectCls}`}>
                <option value="abo">GründerX-Abo (auch 7-Tage-Startangebot)</option>
                <option value="sonstiges">anderer Vertrag mit GründerX</option>
              </select>
            </label>
            <fieldset className="space-y-2 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
              <legend className="px-1 font-semibold text-foreground">Zu welchem Zeitpunkt?</legend>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="zp"
                  className="h-4 w-4 accent-[hsl(var(--primary))]"
                  checked={zeitpunktArt === "naechstmoeglich"}
                  onChange={() => setZeitpunktArt("naechstmoeglich")}
                />
                zum nächstmöglichen Zeitpunkt
              </label>
              <label className="flex flex-wrap cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="zp"
                  className="h-4 w-4 accent-[hsl(var(--primary))]"
                  checked={zeitpunktArt === "datum"}
                  onChange={() => setZeitpunktArt("datum")}
                />
                zu einem bestimmten Datum
                {zeitpunktArt === "datum" && (
                  <Input type="date" required value={datum} onChange={(e) => setDatum(e.target.value)} className="h-9 w-auto rounded-lg" />
                )}
              </label>
            </fieldset>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Beim 7-Tage-Startangebot endet der Vertrag mit Ablauf der Testphase. Danach wird nichts abgebucht.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="submit" size="lg" className="press h-11 rounded-xl px-6 font-semibold" disabled={status === "sendet"}>
                {status === "sendet" ? "Wird gesendet …" : "jetzt kündigen"}
              </Button>
              {inCockpit && (
                <Link to="/profile" className="text-xs font-semibold text-accent-blue hover:underline">
                  Oder im Stripe-Abo-Portal verwalten
                </Link>
              )}
            </div>
            {status === "fehler" && (
              <p role="alert" className="text-sm font-medium text-danger">
                Das hat nicht geklappt. Bitte versuch es erneut oder schick deine Kündigung an service@gruenderx.de.
              </p>
            )}
          </form>
        )}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Du möchtest stattdessen einen Kauf widerrufen?{" "}
        <Link to="/vertrag-widerrufen" className="font-medium text-accent-blue underline underline-offset-2">
          Vertrag widerrufen
        </Link>
        .
      </p>
    </AdaptiveAppShell>
  );
};

export default VertragKuendigen;
