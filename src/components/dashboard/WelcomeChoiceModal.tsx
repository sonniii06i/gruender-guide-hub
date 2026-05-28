/**
 * WelcomeChoiceModal — Dezentes Welcome-Modal nach dem ersten Login mit aktivem Abo.
 *
 * Fragt einmalig: "Anfänger oder Fortgeschritten?" und leitet
 * Anfänger:innen direkt zur Starter-Kategorie. Anschluss-Modus
 * (Profi) zeigt nichts und schließt.
 *
 * Gating: erscheint nur, wenn `eligible` true ist (= aktives Abo). Dedup
 * über localStorage-Flag — kein Server-State, keine DB-Migration nötig.
 * Bewusst NICHT mit Onboarding.tsx gekoppelt, weil das ein anderer Flow
 * ist (5-Step Profil-Setup).
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Rocket, X } from "lucide-react";
import { categoryToolCount } from "@/data/features";

const LS_KEY = "ggh-welcome-choice-v1";
const STARTER_COUNT = categoryToolCount("starter");

export const WelcomeChoiceModal = ({
  firstName,
  eligible,
}: {
  firstName?: string | null;
  eligible: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Erst zeigen, wenn der User ein aktives Abo hat (= erster Login als Abonnent).
    if (!eligible) return;
    // Und nur einmalig — danach merkt sich das localStorage-Flag die Wahl.
    const seen = localStorage.getItem(LS_KEY);
    if (!seen) {
      // Kurze Verzögerung damit Dashboard erstmal rendert
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [eligible]);

  const dismiss = (choice: "anfaenger" | "profi" | "close") => {
    localStorage.setItem(LS_KEY, JSON.stringify({ choice, ts: Date.now() }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-card border border-border shadow-glow p-6 md:p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={() => dismiss("close")}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition"
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-blue mb-2">
            Willkommen{firstName ? `, ${firstName}` : ""}!
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Wo stehst du gerade?
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Wir haben 40+ Tools — von Anfänger:innen-freundlichen Decision-Trees bis zu Profi-Werkzeugen für Holdings &amp; internationale Setups. Damit wir dir den passenden Einstieg zeigen:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            to="/dashboard?view=themen&cat=starter"
            onClick={() => dismiss("anfaenger")}
            className="group rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 hover:border-purple-500 hover:shadow-soft transition-all text-left"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Sprout className="h-6 w-6 text-purple-700" />
            </div>
            <div className="font-bold text-base mb-1">Komplette:r Anfänger:in</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Noch kein Gewerbe / kein Wissen über Steuern / vor der ersten Rechnung. {STARTER_COUNT} Tools, die dich von Tag 0 bis Tag 90 führen.
            </p>
            <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-purple-700">
              → Erste Schritte zeigen
            </div>
          </Link>

          <button
            onClick={() => dismiss("profi")}
            className="group rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 via-card to-card p-5 hover:border-accent-blue hover:shadow-soft transition-all text-left"
          >
            <div className="h-12 w-12 rounded-xl bg-accent-blue/15 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Rocket className="h-6 w-6 text-accent-blue" />
            </div>
            <div className="font-bold text-base mb-1">Schon Selbstständig / Profi</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Gewerbe läuft, Buchhaltung steht, Suche nach speziellen Tools: Holdings, US-LLC, Crypto-Steuer, BWA, Amazon-USt-OSS.
            </p>
            <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-accent-blue">
              → Cockpit öffnen
            </div>
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground text-center mt-5">
          Du kannst jederzeit zwischen beiden wechseln — die Wahl bestimmt nur den ersten Eindruck.
        </p>
      </div>
    </div>
  );
};
