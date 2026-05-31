import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RoadmapClient from "./RoadmapClient";

export default async function RoadmapPage() {
  const user = await getAuthUser();


  const allProgress = await prisma.dayProgress.findMany({
    where: { userId: user.id },
    include: { curriculumDay: true },
    orderBy: { dayId: "asc" },
  });

  const activeDay =
    allProgress.find((p) => p.status === "IN_PROGRESS")?.dayId ??
    allProgress.find((p) => p.status === "AVAILABLE")?.dayId ??
    null;

  const days = allProgress.map((p) => ({
    id: p.dayId,
    phase: p.curriculumDay.phase,
    week: p.curriculumDay.week,
    title: p.curriculumDay.title,
    status: p.status as string,
    xpReward: p.curriculumDay.xpReward,
  }));

  return <RoadmapClient days={days} activeDay={activeDay} />;
}
