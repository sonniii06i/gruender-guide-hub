import { useGuideStart } from "@/hooks/useGuideStart";
import { useAuth } from "@/hooks/useAuth";
import type { Playbook } from "@/data/playbooks";
import { readGamification } from "@/lib/gamification";
import { CourseCoverCard } from "@/components/CourseCoverCard";

/**
 * Eingeloggte Masterclass-/Udemy-Kurskarte für Dashboard & Playbooks:
 * Nutzt das visuelle CourseCoverCard-System mit Themen-Cover, Live-Fortschritt und Direktstart.
 */
export const GuideCard = ({ pb, compact = false }: { pb: Playbook; compact?: boolean }) => {
  const { start, starting } = useGuideStart();
  const { user } = useAuth();
  const isStarting = starting === pb.slug;

  const gam = readGamification(user?.id);
  const doneSteps = gam.completedSteps.filter((k) => k.startsWith(`${pb.slug}:`)).length;
  const isCompleted = gam.completedGuides.includes(pb.slug) || (pb.steps.length > 0 && doneSteps >= pb.steps.length);

  return (
    <CourseCoverCard
      slug={pb.slug}
      title={pb.title}
      subtitle={pb.outcome}
      duration={pb.duration}
      difficulty={pb.difficulty}
      stepsCount={pb.steps.length}
      to={`/playbook/preview/${pb.slug}`}
      onStart={() => start(pb.slug)}
      starting={isStarting}
      doneSteps={doneSteps}
      completed={isCompleted}
      compact={compact}
      badgeText={pb.slug === "amex-us-beantragen" ? "Neu · US & Amex" : undefined}
    />
  );
};
