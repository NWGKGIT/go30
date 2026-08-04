import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { go30Path } from "@/content/paths/go30";
import RoadmapClient from "./RoadmapClient";

export default async function RoadmapPage() {
  const user = await getAuthUser();

  const allProgress = await prisma.dayProgress.findMany({
    where: { userId: user.id },
    include: { curriculumDay: true },
    orderBy: { curriculumDay: { sortOrder: "asc" } },
  });

  const activeDay =
    allProgress.find((p) => p.status === "IN_PROGRESS")?.curriculumDay.dayNumber ??
    allProgress.find((p) => p.status === "AVAILABLE")?.curriculumDay.dayNumber ??
    null;

  const days = allProgress.map((p) => ({
    id: p.curriculumDay.dayNumber,
    phase: p.curriculumDay.phase,
    week: p.curriculumDay.week,
    title: p.curriculumDay.title,
    status: p.status as string,
    xpReward: p.curriculumDay.xpReward,
  }));

  return <RoadmapClient days={days} activeDay={activeDay} phases={go30Path.phases} milestones={go30Path.milestones} />;
}
