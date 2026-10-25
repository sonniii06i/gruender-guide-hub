import FreeToolPage from "./FreeToolPage";
import { FREE_TOOL_BY_SLUG } from "@/lib/freetools";

// Lädt die Gratis-Tool-Konfigurationen erst mit der Route (25.10.2026). Vorher importierte
// App.tsx FREE_TOOL_BY_SLUG direkt; damit landeten alle Generator-Texte im Einstiegs-Paket jeder Seite.
const FreeToolRoute = ({ slug }: { slug: string }) => <FreeToolPage config={FREE_TOOL_BY_SLUG[slug]} />;

export default FreeToolRoute;
