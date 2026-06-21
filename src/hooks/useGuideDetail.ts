import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { PlaybookStep } from "@/data/playbooks";

/**
 * Umsetzungskritische Step-Felder, die server-seitig (Abo-gegated) nachgeladen
 * werden. Enthält auch die `description` ab Schritt 4 (die ersten 3 bleiben als
 * öffentliches SEO-Sample im Client).
 */
export type SecureStepFields = Pick<
  PlaybookStep,
  "checklist" | "fields" | "externalLinks" | "warning" | "extendedNotes" | "description"
>;

export interface GuideDetailState {
  loading: boolean;
  /** stepSlug → secure Felder. Leer, solange nicht (erfolgreich) geladen. */
  detail: Record<string, SecureStepFields>;
  /** true, wenn der Server 403 (kein aktives Abo) geliefert hat. */
  forbidden: boolean;
  error: string | null;
}

/**
 * Lädt die bezahlten Guide-Details (Checklisten, Formularfelder, Ämter-Links,
 * Warnungen, Kosten-Tipps) zur Laufzeit aus der Edge-Function `guide-detail`.
 * Diese Inhalte liegen NICHT im Client-Bundle; der Server prüft das Abo.
 */
export const useGuideDetail = (slug: string | undefined | null): GuideDetailState => {
  const [state, setState] = useState<GuideDetailState>({
    loading: !!slug,
    detail: {},
    forbidden: false,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ loading: false, detail: {}, forbidden: false, error: null });
      return;
    }
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null, forbidden: false }));
    (async () => {
      const { data, error } = await supabase.functions.invoke("guide-detail", { body: { slug } });
      if (cancelled) return;
      if (error) {
        // FunctionsHttpError → Status im context.response, 403 = kein Abo.
        const status = (error as any)?.context?.status;
        const forbidden = status === 403;
        setState({ loading: false, detail: {}, forbidden, error: forbidden ? null : (error.message ?? "error") });
        return;
      }
      const steps = (data?.steps ?? {}) as Record<string, SecureStepFields>;
      setState({ loading: false, detail: steps, forbidden: false, error: null });
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
};

/** Mischt die server-geladenen secure-Felder in einen Step. */
export const mergeStepDetail = <T extends { slug: string }>(
  step: T,
  detail: Record<string, SecureStepFields>,
): T & SecureStepFields => ({ ...step, ...(detail[step.slug] ?? {}) });
