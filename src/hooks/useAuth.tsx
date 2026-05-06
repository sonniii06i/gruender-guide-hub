import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
      // Bei TOKEN_REFRESHED nur Session updaten – User-Object bleibt referenz-identisch,
      // damit nachgelagerte Hooks (useAccess etc.) nicht unnötig refetchen, wenn der User
      // einfach nur den Tab gewechselt hat und Supabase den Access-Token erneuert.
      if (event === "TOKEN_REFRESHED") {
        setSession(sess);
        return;
      }
      setSession(sess);
      setUser(sess?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    // Profil-Cache des aktuellen Users löschen, damit nach Logout
    // kein "Hi <alter Name>" beim nächsten Visit kurz aufpoppt.
    if (user?.id) {
      try { localStorage.removeItem(`gx-profile-${user.id}`); } catch {}
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
