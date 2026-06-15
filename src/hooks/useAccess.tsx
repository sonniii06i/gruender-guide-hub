import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface AccessState {
  loading: boolean;
  isAdmin: boolean;
  hasActiveSub: boolean;
  onboardingCompleted: boolean;
  refresh: () => Promise<void>;
}

// 24h Cache für die teure check-subscription Edge Function (Stripe Sync).
// Bei Tab-Switch nicht nochmal anstoßen — Stripe-Webhooks halten die DB ohnehin live.
const CHECK_SUB_CACHE_KEY = "gx-check-sub-last-run";
const CHECK_SUB_TTL_MS = 24 * 60 * 60 * 1000; // 1×/Tag wie vom User gewünscht

const shouldRunCheckSub = (userId: string): boolean => {
  try {
    const raw = localStorage.getItem(`${CHECK_SUB_CACHE_KEY}-${userId}`);
    if (!raw) return true;
    const last = parseInt(raw, 10);
    return !isFinite(last) || Date.now() - last > CHECK_SUB_TTL_MS;
  } catch {
    return true;
  }
};

const markCheckSubRun = (userId: string) => {
  try {
    localStorage.setItem(`${CHECK_SUB_CACHE_KEY}-${userId}`, String(Date.now()));
  } catch {}
};

export const useAccess = (): AccessState => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasActiveSub, setHasActiveSub] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  // Verhindert dass useAccess für die gleiche user.id mehrfach lädt —
  // Supabase-Sessions können neue User-Objects produzieren mit gleicher ID.
  const loadedForUserId = useRef<string | null>(null);

  const load = async (forceCheckSub = false) => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    if (forceCheckSub || shouldRunCheckSub(user.id)) {
      try {
        await supabase.functions.invoke("check-subscription").catch(() => null);
        markCheckSubRun(user.id);
      } catch {}
    }
    const [roleRes, subRes, profRes] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle(),
      supabase.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle(),
      supabase.from("profiles").select("onboarding_completed").eq("id", user.id).maybeSingle(),
    ]);
    setIsAdmin(!!roleRes.data);
    setHasActiveSub(subRes.data?.status === "active" || subRes.data?.status === "trialing");
    setOnboardingCompleted(!!profRes.data?.onboarding_completed);
    setLoading(false);
    loadedForUserId.current = user.id;
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      loadedForUserId.current = null;
      setLoading(false);
      return;
    }
    // Bereits für diese user.id geladen → nicht erneut.
    if (loadedForUserId.current === user.id) return;
    // Nach Checkout-Return (success_url=/dashboard?checkout=success) Stripe-Sync ERZWINGEN,
    // damit das frisch bezahlte Abo sofort greift und nicht am 24h-Cache hängen bleibt.
    const justCheckedOut = new URLSearchParams(window.location.search).get("checkout") === "success";
    load(justCheckedOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, authLoading]);

  // refresh() forciert immer eine frische Stripe-Sync (z.B. nach Checkout-Return).
  return { loading, isAdmin, hasActiveSub, onboardingCompleted, refresh: () => load(true) };
};
