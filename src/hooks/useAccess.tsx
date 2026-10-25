import { useEffect, useSyncExternalStore } from "react";
import { ladeSupabase } from "@/integrations/supabase/lazy";
import { useAuth } from "./useAuth";

interface AccessState {
  loading: boolean;
  isAdmin: boolean;
  hasActiveSub: boolean;
  onboardingCompleted: boolean;
  /**
   * true, wenn die letzte Abfrage scheiterte. Die Werte oben sind dann der
   * letzte bekannte Stand -- oder, falls es keinen gibt, KEINE Aussage.
   * Aus einem Fehler darf nie "kein Abo" oder "Onboarding offen" folgen.
   */
  error: boolean;
  /** true, sobald mindestens einmal erfolgreich gelesen wurde. */
  known: boolean;
  refresh: () => Promise<void>;
}

type Snap = Omit<AccessState, "refresh">;

// 24h Cache für die teure check-subscription Edge Function (Stripe Sync).
// Bei Tab-Switch nicht nochmal anstoßen — Stripe-Webhooks halten die DB ohnehin live.
const CHECK_SUB_CACHE_KEY = "gx-check-sub-last-run";
const CHECK_SUB_TTL_MS = 24 * 60 * 60 * 1000; // 1×/Tag wie vom User gewünscht
// Letzter erfolgreich gelesener Stand je Nutzer (nur fuer den Fehlerfall).
const SNAP_CACHE_KEY = "gx-access-snap";
const RETRY_MS = [2_000, 5_000, 15_000];
// Aelter als das: beim naechsten Einhaengen eines Gates still nachladen.
const REVALIDATE_MS = 60_000;

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

const EMPTY: Snap = {
  loading: true,
  isAdmin: false,
  hasActiveSub: false,
  onboardingCompleted: false,
  error: false,
  known: false,
};

const readCachedSnap = (userId: string): Snap | null => {
  try {
    const raw = sessionStorage.getItem(`${SNAP_CACHE_KEY}-${userId}`);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return {
      loading: false,
      isAdmin: !!v.isAdmin,
      hasActiveSub: !!v.hasActiveSub,
      onboardingCompleted: !!v.onboardingCompleted,
      error: true,
      known: true,
    };
  } catch {
    return null;
  }
};

const writeCachedSnap = (userId: string, s: Snap) => {
  try {
    sessionStorage.setItem(
      `${SNAP_CACHE_KEY}-${userId}`,
      JSON.stringify({ isAdmin: s.isAdmin, hasActiveSub: s.hasActiveSub, onboardingCompleted: s.onboardingCompleted }),
    );
  } catch {}
};

// ---------------------------------------------------------------------------
// Gemeinsamer Zustand fuer ALLE useAccess-Aufrufer (AppLayout, PaywallGate,
// AdminGate, Sidebar …). Frueher hatte jede Instanz eigene Abfragen; bei
// abgelaufenem 24h-Cache stiessen mehrere gleichzeitig check-subscription an.
// ---------------------------------------------------------------------------
const store = {
  userId: null as string | null,
  snap: { ...EMPTY, loading: false } as Snap,
  inflight: null as Promise<void> | null,
  checkSubInflight: null as Promise<unknown> | null,
  retryTimer: null as ReturnType<typeof setTimeout> | null,
  retryCount: 0,
  loadedAt: 0,
  listeners: new Set<() => void>(),
};

const emit = () => store.listeners.forEach((l) => l());
const setSnap = (patch: Partial<Snap>) => {
  store.snap = { ...store.snap, ...patch };
  emit();
};

class AccessQueryError extends Error {}

const readDb = async (userId: string) => {
  const supabase = await ladeSupabase();
  const [roleRes, subRes, profRes] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle(),
    supabase.from("subscriptions").select("status, comp_access").eq("user_id", userId).maybeSingle(),
    supabase.from("profiles").select("onboarding_completed").eq("id", userId).maybeSingle(),
  ]);
  if (roleRes.error || subRes.error || profRes.error) {
    throw new AccessQueryError(
      (roleRes.error ?? subRes.error ?? profRes.error)?.message ?? "Abfrage fehlgeschlagen",
    );
  }
  if (store.userId !== userId) return; // Nutzer hat inzwischen gewechselt
  const next: Snap = {
    loading: false,
    error: false,
    known: true,
    isAdmin: !!roleRes.data,
    hasActiveSub:
      subRes.data?.status === "active" ||
      subRes.data?.status === "trialing" ||
      !!(subRes.data as { comp_access?: boolean } | null)?.comp_access,
    onboardingCompleted: !!profRes.data?.onboarding_completed,
  };
  store.retryCount = 0;
  store.loadedAt = Date.now();
  writeCachedSnap(userId, next);
  setSnap(next);
};

/** check-subscription genau einmal gleichzeitig (Stripe-Sync). */
const runCheckSub = (userId: string) => {
  if (!store.checkSubInflight) {
    store.checkSubInflight = ladeSupabase()
      .then((supabase) => supabase.functions.invoke("check-subscription"))
      .then(() => markCheckSubRun(userId))
      .catch(() => null)
      .finally(() => { store.checkSubInflight = null; });
  }
  return store.checkSubInflight;
};

const scheduleRetry = (userId: string) => {
  if (store.retryTimer || store.retryCount >= RETRY_MS.length) return;
  const wait = RETRY_MS[store.retryCount++];
  store.retryTimer = setTimeout(() => {
    store.retryTimer = null;
    if (store.userId === userId) void loadAccess(userId, false);
  }, wait);
};

const loadAccess = (userId: string, forceCheckSub: boolean): Promise<void> => {
  if (store.inflight && !forceCheckSub) return store.inflight;
  const run = (async () => {
    if (!store.snap.known) setSnap({ loading: true });
    try {
      if (forceCheckSub) {
        // Erst Stripe syncen (kein Paywall-Flackern), DANN lesen.
        await runCheckSub(userId);
        await readDb(userId);
      } else {
        // Schnell: sofort aus der DB rendern; den teuren Stripe-Sync im Hintergrund nachziehen.
        await readDb(userId);
        if (shouldRunCheckSub(userId)) {
          void runCheckSub(userId).then(() => readDb(userId)).catch(() => {});
        }
      }
    } catch (e) {
      if (store.userId !== userId) return;
      console.warn("useAccess: Abfrage fehlgeschlagen", e);
      // Letzten bekannten Stand behalten; sonst den aus dieser Browser-Sitzung.
      const fallback = store.snap.known ? store.snap : readCachedSnap(userId);
      setSnap({ ...(fallback ?? store.snap), loading: false, error: true });
      scheduleRetry(userId);
    }
  })().finally(() => {
    if (store.inflight === run) store.inflight = null;
  });
  store.inflight = run;
  return run;
};

const switchUser = (userId: string | null) => {
  if (store.userId === userId) return;
  store.userId = userId;
  store.inflight = null;
  store.retryCount = 0;
  if (store.retryTimer) { clearTimeout(store.retryTimer); store.retryTimer = null; }
  store.snap = userId ? { ...EMPTY } : { ...EMPTY, loading: false };
  emit();
  if (userId) void loadAccess(userId, false);
};

/**
 * Nach einer Aenderung (Onboarding gespeichert, Zahlung bestaetigt) den
 * gemeinsamen Zustand neu lesen. Mit patch wird der bekannte Wert sofort
 * gesetzt, damit z. B. AppLayout nicht zurueck auf /onboarding leitet.
 */
export const invalidateAccess = (patch?: Partial<Pick<Snap, "hasActiveSub" | "onboardingCompleted">>) => {
  const userId = store.userId;
  if (!userId) return Promise.resolve();
  if (patch) setSnap(patch);
  store.inflight = null;
  return loadAccess(userId, false);
};

const subscribe = (l: () => void) => {
  store.listeners.add(l);
  return () => { store.listeners.delete(l); };
};
const getSnap = () => store.snap;

/** Nur fuer Tests: Zustand zuruecksetzen. */
export const __resetAccessStore = () => {
  if (store.retryTimer) clearTimeout(store.retryTimer);
  store.userId = null;
  store.inflight = null;
  store.checkSubInflight = null;
  store.retryTimer = null;
  store.retryCount = 0;
  store.loadedAt = 0;
  store.snap = { ...EMPTY, loading: false };
  emit();
};

export const useAccess = (): AccessState => {
  const { user, loading: authLoading } = useAuth();
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  const userId = user?.id ?? null;

  useEffect(() => {
    if (authLoading) return;
    switchUser(userId);
    // Ein neu eingehaengtes Gate mit altem Stand: still nachladen (ohne
    // Ladezustand, der bekannte Stand bleibt bis dahin sichtbar).
    if (userId && store.snap.known && Date.now() - store.loadedAt > REVALIDATE_MS) {
      void loadAccess(userId, false);
    }
  }, [userId, authLoading]);

  // Solange Auth noch laedt oder der Store noch fuer einen anderen Nutzer
  // steht, gilt "laedt" -- nie ein veralteter Stand.
  const stale = authLoading || store.userId !== userId;
  const effective: Snap = stale ? { ...EMPTY, loading: authLoading || !!userId } : snap;

  return {
    ...effective,
    // refresh() forciert immer eine frische Stripe-Sync (z.B. nach Checkout-Return).
    refresh: () => (userId ? loadAccess(userId, true) : Promise.resolve()),
  };
};
