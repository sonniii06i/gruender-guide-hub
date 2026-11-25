/**
 * Gamification-Engine für GründerX (XP, Level, Tages-Streak, Meilenstein-Abzeichen).
 * Funktioniert sofort lokal im Browser/App (localStorage) und synchronisiert optional
 * mit bestehenden Playbook-Fortschritten. Alle Werte bleiben faktisch nachvollziehbar.
 */

export interface GamificationBadge {
  id: string;
  titel: string;
  kurz: string;
  freigeschaltetAm?: string;
}

export interface GamificationState {
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  completedSteps: string[];
  completedGuides: string[];
  completedQuizzes: string[];
  badges: string[];
}

export interface LevelInfo {
  level: number;
  titel: string;
  minXp: number;
  nextXp: number;
  progressPercent: number;
}

export const LEVELS: { level: number; titel: string; minXp: number }[] = [
  { level: 1, titel: "Startklar", minXp: 0 },
  { level: 2, titel: "Ideen-Prüfer", minXp: 150 },
  { level: 3, titel: "Reihenfolge-Profi", minXp: 400 },
  { level: 4, titel: "Anmelde-Ready", minXp: 750 },
  { level: 5, titel: "Steuer-Sicher", minXp: 1200 },
  { level: 6, titel: "Launch-Macher", minXp: 1800 },
  { level: 7, titel: "Marktplatz-Profi", minXp: 2600 },
  { level: 8, titel: "System-Bauer", minXp: 3600 },
  { level: 9, titel: "Skalierer", minXp: 5000 },
  { level: 10, titel: "GründerX-Meister", minXp: 7000 },
];

export const ALL_BADGES: GamificationBadge[] = [
  { id: "first_step", titel: "Erster Schritt", kurz: "Den ersten Guide-Schritt abgehakt" },
  { id: "first_guide", titel: "Erster Guide fertig", kurz: "Einen kompletten Guide bis zum Ziel durchgezogen" },
  { id: "quiz_starter", titel: "Check bestanden", kurz: "Ein interaktives Quiz abgeschlossen" },
  { id: "streak_3", titel: "3 Tage dran", kurz: "An 3 Tagen in Folge weitergearbeitet" },
  { id: "streak_7", titel: "7-Tage-Serie", kurz: "Eine ganze Woche täglich einen Schritt erledigt" },
  { id: "us_ready", titel: "US-Setup-Starter", kurz: "Einen Schritt im Amex-US- oder US-LLC-Guide erledigt" },
  { id: "five_steps", titel: "5 Schritte erledigt", kurz: "Fünf konkrete Schritte in Guides abgeschlossen" },
];

export const GAMIFICATION_EVENT = "gx-gamification-updated";

const KEY_PREFIX = "gx-gamification-v1-";

const DEFAULT_STATE: GamificationState = {
  xp: 0,
  streak: 0,
  lastActiveDay: null,
  completedSteps: [],
  completedGuides: [],
  completedQuizzes: [],
  badges: [],
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function readGamification(userId?: string | null): GamificationState {
  const key = `${KEY_PREFIX}${userId || "guest"}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<GamificationState>;
    return {
      xp: Number(parsed.xp) || 0,
      streak: Number(parsed.streak) || 0,
      lastActiveDay: parsed.lastActiveDay ?? null,
      completedSteps: Array.isArray(parsed.completedSteps) ? parsed.completedSteps : [],
      completedGuides: Array.isArray(parsed.completedGuides) ? parsed.completedGuides : [],
      completedQuizzes: Array.isArray(parsed.completedQuizzes) ? parsed.completedQuizzes : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function writeGamification(state: GamificationState, userId?: string | null): void {
  const key = `${KEY_PREFIX}${userId || "guest"}`;
  try {
    localStorage.setItem(key, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(GAMIFICATION_EVENT, { detail: state }));
  } catch {
    /* localStorage blockiert */
  }
}

function updateStreak(state: GamificationState): { streak: number; lastActiveDay: string } {
  const today = todayIso();
  if (state.lastActiveDay === today) {
    return { streak: Math.max(1, state.streak), lastActiveDay: today };
  }
  if (state.lastActiveDay === yesterdayIso()) {
    return { streak: state.streak + 1, lastActiveDay: today };
  }
  return { streak: 1, lastActiveDay: today };
}

function evaluateBadges(state: GamificationState): string[] {
  const set = new Set(state.badges);
  if (state.completedSteps.length >= 1) set.add("first_step");
  if (state.completedSteps.length >= 5) set.add("five_steps");
  if (state.completedGuides.length >= 1) set.add("first_guide");
  if (state.completedQuizzes.length >= 1) set.add("quiz_starter");
  if (state.streak >= 3) set.add("streak_3");
  if (state.streak >= 7) set.add("streak_7");
  if (state.completedSteps.some((s) => s.startsWith("amex-us-beantragen:") || s.startsWith("us-llc:"))) {
    set.add("us_ready");
  }
  return [...set];
}

export function awardStepXp(
  guideSlug: string,
  stepSlug: string,
  opts?: { userId?: string | null; bonusXp?: number; guideCompleted?: boolean },
): { state: GamificationState; earnedXp: number; newBadges: string[] } {
  const prev = readGamification(opts?.userId);
  const key = `${guideSlug}:${stepSlug}`;
  const already = prev.completedSteps.includes(key);
  let earnedXp = already ? 0 : 100;
  if (opts?.bonusXp) earnedXp += opts.bonusXp;

  const completedSteps = already ? prev.completedSteps : [...prev.completedSteps, key];
  const completedGuides =
    opts?.guideCompleted && !prev.completedGuides.includes(guideSlug)
      ? [...prev.completedGuides, guideSlug]
      : prev.completedGuides;

  if (opts?.guideCompleted && !prev.completedGuides.includes(guideSlug)) {
    earnedXp += 250;
  }

  const streakInfo = updateStreak(prev);
  const draft: GamificationState = {
    ...prev,
    xp: prev.xp + earnedXp,
    streak: streakInfo.streak,
    lastActiveDay: streakInfo.lastActiveDay,
    completedSteps,
    completedGuides,
  };
  const badges = evaluateBadges(draft);
  const newBadges = badges.filter((b) => !prev.badges.includes(b));
  const next: GamificationState = { ...draft, badges };
  writeGamification(next, opts?.userId);
  return { state: next, earnedXp, newBadges };
}

export function awardQuizXp(
  quizSlug: string,
  userId?: string | null,
): { state: GamificationState; earnedXp: number; newBadges: string[] } {
  const prev = readGamification(userId);
  const already = prev.completedQuizzes.includes(quizSlug);
  const earnedXp = already ? 25 : 150;
  const completedQuizzes = already ? prev.completedQuizzes : [...prev.completedQuizzes, quizSlug];
  const streakInfo = updateStreak(prev);
  const draft: GamificationState = {
    ...prev,
    xp: prev.xp + earnedXp,
    streak: streakInfo.streak,
    lastActiveDay: streakInfo.lastActiveDay,
    completedQuizzes,
  };
  const badges = evaluateBadges(draft);
  const newBadges = badges.filter((b) => !prev.badges.includes(b));
  const next: GamificationState = { ...draft, badges };
  writeGamification(next, userId);
  return { state: next, earnedXp, newBadges };
}

export function getLevelInfo(xp: number): LevelInfo {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? { ...LEVELS[i], minXp: LEVELS[i].minXp + 1000 };
    }
  }
  const span = Math.max(1, next.minXp - current.minXp);
  const progressPercent = Math.min(100, Math.round(((xp - current.minXp) / span) * 100));
  return {
    level: current.level,
    titel: current.titel,
    minXp: current.minXp,
    nextXp: next.minXp,
    progressPercent,
  };
}
