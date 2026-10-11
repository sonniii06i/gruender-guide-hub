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
import { ArrowRight, Sprout, Rocket, X } from "lucide-react";
import { categoryToolCount, TOOL_COUNT } from "@/data/features";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-[hsl(var(--foreground)/0.55)] p-4 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-choice-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft animate-in zoom-in-95 duration-300 md:p-8">
        <button
          onClick={() => dismiss("close")}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-medium text-accent-blue">
            Willkommen{firstName ? `, ${firstName}` : ""}
          </p>
          <h2 id="welcome-choice-title" className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Wo stehst du gerade?
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            GründerX hat {TOOL_COUNT} Tools, von einfachen Entscheidungshilfen für Anfänger:innen bis zu Profi-Werkzeugen für Holdings und internationale Setups. Damit wir dir den passenden Einstieg zeigen:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Link
            to="/dashboard?view=themen&cat=starter"
            onClick={() => dismiss("anfaenger")}
            className="press group rounded-xl border border-accent-blue/30 bg-accent/50 p-5 text-left hover:border-accent-blue/60 hover:shadow-card"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-card text-brand-green shadow-card">
              <Sprout className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mb-1 text-base font-semibold">Komplette:r Anfänger:in</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Noch kein Gewerbe, kein Wissen über Steuern, vor der ersten Rechnung. {STARTER_COUNT} Tools, die dich von Tag 0 bis Tag 90 führen.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
              Erste Schritte zeigen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </Link>

          <button
            onClick={() => dismiss("profi")}
            className="press group rounded-xl border border-border bg-card p-5 text-left hover:border-accent-blue/40 hover:shadow-card"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-blue">
              <Rocket className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mb-1 text-base font-semibold">Schon selbstständig oder Profi</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Gewerbe läuft, Buchhaltung steht, du suchst spezielle Tools: Holdings, US-LLC, Crypto-Steuer, BWA, Amazon-USt und OSS.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
              Cockpit öffnen <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Du kannst jederzeit zwischen beiden wechseln. Die Wahl bestimmt nur den ersten Eindruck.
        </p>
      </div>
    </div>
  );
};
