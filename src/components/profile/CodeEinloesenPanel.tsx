import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Ticket } from "lucide-react";
import { toast } from "sonner";

/**
 * Aktivierungscode einloesen.
 *
 * Woher die Codes kommen: Amazon liefert in Deutschland keine Abos digital aus
 * — dort verkauft man eine gedruckte Karte mit Code, so wie Adobe es tut.
 * Dieselben Codes stecken in Beilagen und Gutscheinen.
 *
 * Die Einloesung laeuft ausschliesslich in der Edge Function `redeem-code`:
 * Sie kennt den Hash, entscheidet den Wettlauf zweier gleichzeitiger Versuche
 * in der Datenbank und schreibt den Zugang. Hier steht nur das Formular.
 */
export const CodeEinloesenPanel = ({ onRedeemed }: { onRedeemed?: () => void }) => {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  // Abgetippt wird ohne Bindestriche, aus der Mail kopiert mit. Beides soll
  // gleich aussehen, also wird waehrend der Eingabe in Vierergruppen gesetzt.
  // Der Server normalisiert ohnehin noch einmal — das hier ist reine Optik.
  const format = (roh: string) =>
    roh.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16)
       .replace(/(.{4})(?=.)/g, "$1-");

  const einloesen = async () => {
    const sauber = code.replace(/[^A-Za-z0-9]/g, "");
    if (sauber.length < 8) {
      toast.error("Bitte den vollständigen Code eingeben.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("redeem-code", {
        body: { code: sauber },
      });
      // Die Function antwortet bei fachlichen Fehlern mit 4xx und einer
      // erklaerenden Meldung ("schon eingelöst", "kennen wir nicht"). Die
      // steckt im Body, nicht in error.message — sonst saehe der Kaeufer nur
      // "non-2xx status code" und wuesste nicht, woran es liegt.
      const meldung = (data as { error?: string } | null)?.error;
      if (meldung) { toast.error(meldung); return; }
      if (error) { toast.error("Einlösung fehlgeschlagen. Bitte später erneut versuchen."); return; }

      const bis = (data as { period_end?: string })?.period_end;
      toast.success(
        bis
          ? `Freigeschaltet bis ${new Date(bis).toLocaleDateString("de-DE")}.`
          : "Code eingelöst.",
      );
      setCode("");
      onRedeemed?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Ticket className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-bold">Aktivierungscode einlösen</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Code von einer Aktivierungskarte oder aus einem Gutschein. Der Zugang startet
        sofort und läuft ohne Kündigung aus — es entsteht kein Abo.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={code}
          onChange={(e) => setCode(format(e.target.value))}
          onKeyDown={(e) => { if (e.key === "Enter") einloesen(); }}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          className="font-mono tracking-wider sm:max-w-xs"
        />
        <Button onClick={einloesen} disabled={busy} className="rounded-full sm:w-auto">
          {busy && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
          {busy ? "Prüfe …" : "Einlösen"}
        </Button>
      </div>
    </div>
  );
};

export default CodeEinloesenPanel;
