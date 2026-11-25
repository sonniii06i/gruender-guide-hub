import { useEffect, useState } from "react";
import { isPrerender } from "@/lib/prerender";
import { isGruenderXIosApp } from "@/lib/iosApp";
import { useAuth } from "@/hooks/useAuth";

// Aktions-Banner (HQ aktionen.py): zeigt eine aktive Aktion AUSSCHLIESSLICH auf
// öffentlichen, ausgeloggten Marketing-Seiten — NIEMALS für eingeloggte Nutzer
// oder im Dashboard / Cockpit / Lern-Studio / Checkout.
type Aktion = { aktiv: boolean; id?: number; text?: string; code?: string; url?: string };

const QUELLE = "https://arbitragex.de/px/aktion/gruenderx.json";

const COCKPIT_PRAEFIXE = [
  "/dashboard",
  "/cockpit",
  "/playbook",
  "/playbooks",
  "/felix",
  "/wizard",
  "/anbieter",
  "/community",
  "/affiliate",
  "/profile",
  "/onboarding",
  "/support",
  "/checkout",
  "/willkommen",
  "/zahlung",
  "/admin",
  "/auth",
  "/reset-password",
];

function istCockpitPfad(pathname: string): boolean {
  return COCKPIT_PRAEFIXE.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function hatLokaleSitzung(): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^sb-.*-auth-token$/.test(k) && localStorage.getItem(k)) {
        return true;
      }
    }
  } catch {
    /* Speicher gesperrt */
  }
  return false;
}

export default function AktionsBanner() {
  const { user } = useAuth();
  const [a, setA] = useState<Aktion | null>(null);
  const [kopiert, setKopiert] = useState(false);
  const [pfad, setPfad] = useState(() => (typeof window !== "undefined" ? window.location.pathname : "/"));

  // Reagiert auch auf SPA-Navigationen (pushState/popstate), da AktionsBanner über dem Router sitzen kann.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setPfad(window.location.pathname);
    window.addEventListener("popstate", sync);
    const id = window.setInterval(sync, 400);
    return () => {
      window.removeEventListener("popstate", sync);
      window.clearInterval(id);
    };
  }, []);

  const gesperrt = isGruenderXIosApp() || !!user || istCockpitPfad(pfad) || hatLokaleSitzung();

  useEffect(() => {
    if (isPrerender() || gesperrt) {
      setA(null);
      return;
    }
    let ab = false;
    fetch(QUELLE, { credentials: "omit" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Aktion | null) => {
        if (ab || !d?.aktiv) return;
        try {
          if (sessionStorage.getItem("aktion-zu") === String(d.id)) return;
        } catch {
          /* Speicher gesperrt – Banner trotzdem zeigen */
        }
        setA(d);
      })
      .catch(() => undefined);
    return () => {
      ab = true;
    };
  }, [gesperrt]);

  if (gesperrt || !a?.aktiv) return null;

  const schliessen = () => {
    try {
      sessionStorage.setItem("aktion-zu", String(a.id));
    } catch {
      /* egal */
    }
    setA(null);
  };

  return (
    <div
      role="region"
      aria-label="Aktuelle Aktion"
      className="fixed inset-x-0 bottom-0 z-50 bg-primary px-4 py-2.5 pr-12 text-center text-sm font-semibold text-primary-foreground shadow-lg"
    >
      <span>{a.text}</span>
      {a.code ? (
        <button
          type="button"
          title="Code kopieren"
          className="ml-2 rounded-md bg-background px-2 py-0.5 font-bold text-foreground"
          onClick={() => {
            navigator.clipboard?.writeText(a.code ?? "").then(() => setKopiert(true), () => undefined);
          }}
        >
          {kopiert ? "kopiert ✓" : a.code}
        </button>
      ) : null}
      {a.url ? (
        <a href={a.url} className="ml-2 underline">
          Zum Angebot
        </a>
      ) : null}
      <button
        type="button"
        aria-label="Schließen"
        onClick={schliessen}
        className="absolute right-3 top-1.5 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
