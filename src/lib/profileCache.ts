/**
 * Profil-Cache via localStorage – verhindert das "Hi Gründer → Hi Sonni"-
 * Flackern auf jeder Seite. Wird nur beim Profil-Speichern aktualisiert
 * (Event-Trigger), nicht bei jedem Page-Load.
 */

export interface CachedProfile {
  first_name: string | null;
  onboarding_completed: boolean | null;
}

export const PROFILE_CACHE_KEY = (uid: string) => `gx-profile-${uid}`;
export const PROFILE_UPDATE_EVENT = "gx:profile-updated";

export const readProfileCache = (uid: string | undefined | null): CachedProfile | null => {
  if (!uid || typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY(uid));
    return raw ? (JSON.parse(raw) as CachedProfile) : null;
  } catch {
    return null;
  }
};

export const writeProfileCache = (uid: string, profile: CachedProfile): void => {
  if (!uid || typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_CACHE_KEY(uid), JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, { detail: profile }));
  } catch {
    // ignore quota / private-mode errors
  }
};

export const clearProfileCache = (uid: string): void => {
  if (!uid || typeof window === "undefined") return;
  try {
    localStorage.removeItem(PROFILE_CACHE_KEY(uid));
  } catch {
    // ignore
  }
};
