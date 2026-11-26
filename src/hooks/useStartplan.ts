import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ladeHaken, liesLokal, speichereHaken } from "@/lib/cockpitZustand";
import { fahrplan, istErledigt, rechtsformVon, type PlanProfil, type PlanSchritt, type PlanSignale } from "@/lib/startplan";

/**
 * Zustand des Fahrplans: Schritte aus dem Profil, erledigt entweder erkannt
 * (Rechtsform im Profil, Steuerkalender eingerichtet, Guide abgeschlossen) oder
 * von Hand abgehakt. Die Haken liegen je Konto in der Tabelle `cockpit_zustand`
 * und gelten auf jedem Gerät; der localStorage liefert nur den ersten Anstrich.
 */
const steuerkalenderDa = (): boolean => {
  try {
    return typeof window !== "undefined" && !!localStorage.getItem("gx-steuerkalender-v1");
  } catch {
    return false;
  }
};

interface Lauf { id: string; playbook_slug: string; status: string }

export function useStartplan(profil: PlanProfil, enabled = true) {
  const { user } = useAuth();
  const uid = enabled ? user?.id : undefined;
  const [abgehakt, setAbgehakt] = useState<string[]>(() => liesLokal(uid));
  const [laeufe, setLaeufe] = useState<Lauf[]>([]);
  const [steuerkalender] = useState(steuerkalenderDa);

  useEffect(() => {
    setAbgehakt(liesLokal(uid));
    if (!uid) return;
    let aktiv = true;
    void ladeHaken(uid).then((haken) => { if (aktiv) setAbgehakt(haken); });
    return () => { aktiv = false; };
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    let aktiv = true;
    supabase.from("playbook_runs")
      .select("id, playbook_slug, status")
      .eq("user_id", uid)
      .order("last_activity_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { if (aktiv) setLaeufe((data ?? []) as Lauf[]); });
    return () => { aktiv = false; };
  }, [uid]);

  const { business_model, founder_stage, legal_form } = profil;
  const schritte = useMemo(
    () => fahrplan({ business_model, founder_stage, legal_form }),
    [business_model, founder_stage, legal_form],
  );

  const signale: PlanSignale = useMemo(() => ({
    rechtsformGewaehlt: !!rechtsformVon(legal_form),
    steuerkalenderEingerichtet: steuerkalender,
    guidesFertig: laeufe.filter((l) => l.status === "completed").map((l) => l.playbook_slug),
    abgehakt,
  }), [legal_form, steuerkalender, laeufe, abgehakt]);

  /** Slug -> Kennung des jüngsten offenen Laufs (zum Fortsetzen). */
  const laufend = useMemo(() => {
    const m: Record<string, string> = {};
    for (const l of laeufe) if (l.status !== "completed" && !m[l.playbook_slug]) m[l.playbook_slug] = l.id;
    return m;
  }, [laeufe]);

  const umschalten = useCallback((id: string) => {
    setAbgehakt((alt) => {
      const neu = alt.includes(id) ? alt.filter((x) => x !== id) : [...alt, id];
      // Sofort sichtbar, im Hintergrund aufs Konto. Scheitert das Speichern, bleibt
      // der Stand auf diesem Gerät und geht beim nächsten Laden noch einmal hoch.
      if (uid) void speichereHaken(uid, neu);
      return neu;
    });
  }, [uid]);

  const offen = schritte.filter((s) => !istErledigt(s, signale));
  const naechster: PlanSchritt | undefined = offen[0];

  return { schritte, signale, laufend, umschalten, naechster, erledigt: schritte.length - offen.length };
}
