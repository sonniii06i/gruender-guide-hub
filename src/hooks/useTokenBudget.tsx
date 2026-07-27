import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface TokenBudget {
  used_eur: number;
  limit_eur: number;
  pct: number;
  warn_at_pct: number;
  over_limit: boolean;
  should_warn: boolean;
  period_start: string;
  period_end: string;
}

// Liest das Token-Kontingent des eingeloggten Nutzers.
//
// Bewusst NICHT im Anfrage-Pfad des Chats: das Limit ist weich, also darf es
// eine Antwort niemals verzoegern oder blockieren. Der Hook laeuft einmal beim
// Mount und liefert nur die Anzeige.
export function useTokenBudget() {
  const { user } = useAuth();
  const [budget, setBudget] = useState<TokenBudget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setBudget(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const { data, error } = await (supabase as any).rpc("get_my_token_budget");
        if (cancelled) return;
        if (error || !data || (data as any).error) {
          setBudget(null);
        } else {
          setBudget(data as TokenBudget);
        }
      } catch {
        if (!cancelled) setBudget(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return { budget, loading };
}
