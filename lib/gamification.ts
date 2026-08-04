import { prisma } from "@/lib/prisma";

/**
 * Award XP and update streak when a day is completed.
 * Returns the updated user.
 */
export async function completeDayForUser(
  userId: string,
  dayId: string,
  xpReward: number
) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let newStreak = user.streak;

  if (user.lastActive) {
    const last = new Date(
      user.lastActive.getFullYear(),
      user.lastActive.getMonth(),
      user.lastActive.getDate()
    );
    const diffDays = Math.round(
      (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Same day — streak unchanged
      newStreak = user.streak;
    } else if (diffDays === 1) {
      // Consecutive day — increment
      newStreak = user.streak + 1;
    } else {
      // Gap — reset
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  // Update user XP + streak
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      xp: user.xp + xpReward,
      streak: newStreak,
      lastActive: now,
    },
  });

  // Mark current day COMPLETE
  const dayProgress = await prisma.dayProgress.update({
    where: { userId_dayId: { userId, dayId } },
    data: {
      status: "COMPLETE",
      completedAt: now,
      xpEarned: xpReward,
    },
    include: { curriculumDay: true },
  });

  // Unlock next day if it exists
  const nextDay = await prisma.curriculumDay.findFirst({
    where: {
      pathSlug: dayProgress.curriculumDay.pathSlug,
      dayNumber: dayProgress.curriculumDay.dayNumber + 1,
    },
  });

  if (nextDay) {
    const nextProgress = await prisma.dayProgress.findUnique({
      where: { userId_dayId: { userId, dayId: nextDay.id } },
    });

    if (nextProgress && nextProgress.status === 'LOCKED') {
      await prisma.dayProgress.update({
        where: { id: nextProgress.id },
        data: { status: "AVAILABLE" },
      });
    }
  }

  return updatedUser;
}

/**
 * Mark a day as IN_PROGRESS when the first task is checked.
 */
export async function markDayInProgress(userId: string, dayId: string) {
  const progress = await prisma.dayProgress.findUnique({
    where: { userId_dayId: { userId, dayId } },
  });

  if (progress && progress.status === "AVAILABLE") {
    await prisma.dayProgress.update({
      where: { userId_dayId: { userId, dayId } },
      data: { status: "IN_PROGRESS" },
    });
  }
}

/**
 * Revert a completed day. Subtracts XP (floor at 0) and sets status to IN_PROGRESS.
 * Relocks the next day if it hasn't been started.
 */
export async function uncompleteDayForUser(
  userId: string,
  dayId: string,
  xpReward: number
) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  // Update user XP (never below 0)
  const newXp = Math.max(0, user.xp - xpReward);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { xp: newXp },
  });

  // Revert current day to IN_PROGRESS and remove completedAt/xpEarned
  const dayProgress = await prisma.dayProgress.update({
    where: { userId_dayId: { userId, dayId } },
    data: {
      status: "IN_PROGRESS",
      completedAt: null,
      xpEarned: 0,
    },
    include: { curriculumDay: true },
  });

  // Check the next day
  const nextDay = await prisma.curriculumDay.findFirst({
    where: {
      pathSlug: dayProgress.curriculumDay.pathSlug,
      dayNumber: dayProgress.curriculumDay.dayNumber + 1,
    },
  });

  if (nextDay) {
    const nextDayProgress = await prisma.dayProgress.findUnique({
      where: { userId_dayId: { userId, dayId: nextDay.id } },
      include: { tasks: true },
    });

    // If next day is completely untouched, lock it again
    if (nextDayProgress && nextDayProgress.status === "AVAILABLE" && nextDayProgress.tasks.length === 0) {
      await prisma.dayProgress.update({
        where: { id: nextDayProgress.id },
        data: { status: "LOCKED" },
      });
    }
  }

  return updatedUser;
}
