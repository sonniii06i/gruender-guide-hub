import { createContext, startTransition, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { ladeSupabase } from "@/integrations/supabase/lazy";
import { clearUserDataOnLogout } from "@/lib/logoutCleanup";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aktiv = true;
    let abmelden: (() => void) | undefined;
    void ladeSupabase().then((supabase) => {
      if (!aktiv) return;
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
        // Bei TOKEN_REFRESHED nur Session updaten – User-Object bleibt referenz-identisch,
        // damit nachgelagerte Hooks (useAccess etc.) nicht unnötig refetchen, wenn der User
        // einfach nur den Tab gewechselt hat und Supabase den Access-Token erneuert.
        if (event === "TOKEN_REFRESHED") {
          startTransition(() => setSession(sess));
          return;
        }
        // INITIAL_SESSION feuert direkt nach dem Mount – gleiche Begründung wie unten.
        startTransition(() => {
          setSession(sess);
          setUser(sess?.user ?? null);
        });
      });

      supabase.auth.getSession().then(({ data: { session: sess } }) => {
        // Als Transition: Die erste Sitzungsauflösung landet oft, während eine
        // lazy geladene Seite noch hydriert. Ein normales Update auf die noch
        // nicht hydrierte Suspense-Grenze verwirft deren Server-HTML (#421);
        // eine Transition wartet, bis die Grenze hydriert ist.
        startTransition(() => {
          setSession(sess);
          setUser(sess?.user ?? null);
          setLoading(false);
        });
      });
      abmelden = () => subscription.unsubscribe();
    });

    return () => {
      aktiv = false;
      abmelden?.();
    };
  }, []);

  const signOut = async () => {
    const supabase = await ladeSupabase();
    await supabase.auth.signOut();
    // Alle Tool-Daten (u. a. IBAN/Steuernummer im Rechnungs-Generator) und den
    // Profil-Cache entfernen -- auf geteilten Rechnern sah sie sonst der
    // naechste Nutzer. Siehe lib/logoutCleanup.
    clearUserDataOnLogout();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
