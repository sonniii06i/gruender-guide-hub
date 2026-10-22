import {
  Briefcase, Building2, Coins, FileText, Handshake, Lock, ShoppingCart, Store, Users, type LucideIcon,
} from "lucide-react";

// Die Datendateien unter src/data/vorlagen/ nennen Icons nur beim Namen,
// damit sie ohne React/lucide in die Edge Function kopiert werden können.
const ICONS: Record<string, LucideIcon> = {
  Users, ShoppingCart, Briefcase, Handshake, Lock, Building2, Coins, Store, FileText,
};

export const kategorieIcon = (name: string): LucideIcon => ICONS[name] ?? FileText;

/** Farbverlauf je Kategorie (Kartenicon), wie `accent` der Gratis-Tools. */
export const KATEGORIE_AKZENT: Record<string, string> = {
  gesellschaft: "from-blue-600 to-indigo-600",
  kauf: "from-emerald-600 to-teal-600",
  arbeit: "from-violet-600 to-purple-600",
  dienstleistung: "from-sky-600 to-cyan-600",
  geheimhaltung: "from-slate-700 to-slate-900",
  miete: "from-amber-600 to-orange-600",
  finanzen: "from-lime-600 to-green-600",
  ecommerce: "from-rose-600 to-pink-600",
  verwaltung: "from-stone-600 to-neutral-700",
};
