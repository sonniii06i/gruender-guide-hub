import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface AccessState {
  loading: boolean;
  isAdmin: boolean;
  hasActiveSub: boolean;
  onboardingCompleted: boolean;
  refresh: () => Promise<void>;
}

export const useAccess = (): AccessState => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasActiveSub, setHasActiveSub] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const load = async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      // try refreshing live first (best effort)
      await supabase.functions.invoke("check-subscription").catch(() => null);
    } catch {}
    const [roleRes, subRes, profRes] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle(),
      supabase.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle(),
      supabase.from("profiles").select("onboarding_completed").eq("id", user.id).maybeSingle(),
    ]);
    setIsAdmin(!!roleRes.data);
    setHasActiveSub(subRes.data?.status === "active" || subRes.data?.status === "trialing");
    setOnboardingCompleted(!!profRes.data?.onboarding_completed);
    setLoading(false);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    load();
  }, [user, authLoading]);

  return { loading, isAdmin, hasActiveSub, onboardingCompleted, refresh: load };
};
