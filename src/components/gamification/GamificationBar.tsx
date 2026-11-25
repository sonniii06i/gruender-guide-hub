import { useEffect, useState } from "react";
import { Award, Flame, Trophy, Zap } from "lucide-react";
import {
  ALL_BADGES,
  GAMIFICATION_EVENT,
  getLevelInfo,
  readGamification,
  type GamificationState,
} from "@/lib/gamification";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function GamificationBar({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { user } = useAuth();
  const [state, setState] = useState<GamificationState>(() => readGamification(user?.id));

  useEffect(() => {
    setState(readGamification(user?.id));
    const onUpdate = () => setState(readGamification(user?.id));
    window.addEventListener(GAMIFICATION_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(GAMIFICATION_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [user?.id]);

  const lvl = getLevelInfo(state.xp);
  const badgeCount = state.badges.length;

  if (compact) {
    return (
      <div className={cn("flex flex-wrap items-center gap-2 text-xs font-semibold tabular", className)}>
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-green/30 bg-brand-green-soft px-2.5 py-1 text-brand-green">
          <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
          Lvl {lvl.level} · {lvl.titel}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-foreground">
          <Zap className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
          {state.xp} XP
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-foreground">
          <Flame className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
          {state.streak} {state.streak === 1 ? "Tag" : "Tage"}
        </span>
      </div>
    );
  }

  return (
    <section
      aria-label="Dein Lernfortschritt"
      className={cn("rounded-xl border border-border bg-card p-4 shadow-sm md:p-5", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground tabular">
            L{lvl.level}
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Dein Gründer-Level</p>
            <p className="text-base font-semibold leading-tight text-foreground">
              Level {lvl.level}: {lvl.titel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tabular">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-foreground">
            <Zap className="h-3.5 w-3.5 text-accent-blue" aria-hidden="true" />
            {state.xp} XP
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-warning-soft px-3 py-1.5 text-warning">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {state.streak} {state.streak === 1 ? "Tag Serie" : "Tage Serie"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green-soft px-3 py-1.5 text-brand-green">
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            {badgeCount} / {ALL_BADGES.length} Abzeichen
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground tabular">
          <span>Fortschritt zu Level {lvl.level + 1}</span>
          <span>{state.xp} / {lvl.nextXp} XP</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={lvl.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fortschritt zum nächsten Level"
        >
          <div
            className="h-full rounded-full bg-brand-green transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(4, lvl.progressPercent)}%` }}
          />
        </div>
      </div>

      {badgeCount > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {ALL_BADGES.filter((b) => state.badges.includes(b.id)).map((b) => (
            <span
              key={b.id}
              title={b.kurz}
              className="inline-flex items-center gap-1 rounded-md border border-brand-green/25 bg-brand-green-soft/60 px-2 py-0.5 text-[11px] font-medium text-brand-green"
            >
              <Award className="h-3 w-3" aria-hidden="true" />
              {b.titel}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
