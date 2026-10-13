import { useAccess } from "./useAccess";

// Liest die Admin-Rolle aus dem gemeinsamen useAccess-Zustand, statt eine
// eigene user_roles-Abfrage je Komponente abzusetzen.
export const useRole = () => {
  const { isAdmin, loading } = useAccess();
  return { isAdmin, loading };
};
