import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { completeDayForUser, markDayInProgress, uncompleteDayForUser } from "@/lib/gamification";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await params;
  const { dayId, completed } = await request.json();

  // Look up the Prisma user
  const user = await prisma.user.findUnique({ where: { email: authUser.email! } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get the day progress
  const dayProgress = await prisma.dayProgress.findUnique({
    where: { userId_dayId: { userId: user.id, dayId } },
    include: { curriculumDay: true, tasks: true },
  });

  if (!dayProgress) {
    return NextResponse.json({ error: "Day not found" }, { status: 404 });
  }

  if (dayProgress.status === "LOCKED") {
    return NextResponse.json({ error: "Day is locked" }, { status: 403 });
  }

  // Handle task check / uncheck
  const existing = await prisma.taskCompletion.findUnique({
    where: { progressId_taskId: { progressId: dayProgress.id, taskId } },
  });

  if (completed && !existing) {
    await prisma.taskCompletion.create({
      data: { progressId: dayProgress.id, taskId },
    });
  } else if (!completed && existing) {
    await prisma.taskCompletion.delete({
      where: { progressId_taskId: { progressId: dayProgress.id, taskId } },
    });
  }

  // Mark day IN_PROGRESS if first task
  await markDayInProgress(user.id, dayId);

  // Check if all tasks are now complete
  const allTasks = await prisma.task.findMany({ where: { dayId } });
  const completions = await prisma.taskCompletion.findMany({
    where: { progressId: dayProgress.id },
  });

  const allDone = allTasks.every((t) =>
    completions.some((c) => c.taskId === t.id)
  );

  let updatedUser = user;
  let dayComplete = dayProgress.status === "COMPLETE";
  let xpAwarded = 0;

  if (allDone && dayProgress.status !== "COMPLETE") {
    // Day just became complete
    updatedUser = await completeDayForUser(
      user.id,
      dayId,
      dayProgress.curriculumDay.xpReward
    );
    dayComplete = true;
    xpAwarded = dayProgress.curriculumDay.xpReward;
  } else if (!allDone && dayProgress.status === "COMPLETE") {
    // Day was complete, but a task was unchecked
    updatedUser = await uncompleteDayForUser(
      user.id,
      dayId,
      dayProgress.curriculumDay.xpReward
    );
    dayComplete = false;
    // We deducted XP, we don't return negative XP awarded to frontend to avoid UI confusion,
    // we just return the new absolute XP.
  }

  return NextResponse.json({
    success: true,
    dayComplete,
    xp: updatedUser.xp,
    streak: updatedUser.streak,
    xpAwarded,
  });
}
