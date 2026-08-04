'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

/**
 * Toggle a task completion and update day status/XP/streak atomically
 */
export async function toggleTask(taskId: string, dayId: string, completed: boolean) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: 'Unauthorized' };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Get user by Supabase ID
      const user = await tx.user.findUniqueOrThrow({ where: { id: authUser.id } });

      // Get day progress
      const dayProgress = await tx.dayProgress.findUnique({
        where: { userId_dayId: { userId: user.id, dayId } },
        include: {
          curriculumDay: { include: { tasks: { orderBy: { sortOrder: 'asc' } } } },
          tasks: true,
        },
      });

      if (!dayProgress) {
        throw new Error('Day not found');
      }

      if (dayProgress.status === 'LOCKED') {
        throw new Error('Day is locked');
      }

      // Toggle task completion
      const existing = await tx.taskCompletion.findUnique({
        where: { progressId_taskId: { progressId: dayProgress.id, taskId } },
      });

      if (completed && !existing) {
        await tx.taskCompletion.create({
          data: { progressId: dayProgress.id, taskId },
        });
      } else if (!completed && existing) {
        await tx.taskCompletion.delete({
          where: { progressId_taskId: { progressId: dayProgress.id, taskId } },
        });
      }

      // Mark day IN_PROGRESS if first task
      if (dayProgress.status === 'AVAILABLE' && completed) {
        await tx.dayProgress.update({
          where: { id: dayProgress.id },
          data: { status: 'IN_PROGRESS' },
        });
      }

      // Check if all tasks are now complete
      const allTasks = dayProgress.curriculumDay.tasks;
      const completions = await tx.taskCompletion.findMany({
        where: { progressId: dayProgress.id },
      });

      const allDone = allTasks.every((t) => completions.some((c) => c.taskId === t.id));

      let updatedUser = user;
      let dayComplete = dayProgress.status === 'COMPLETE';
      let xpAwarded = 0;

      if (allDone && dayProgress.status !== 'COMPLETE') {
        // Day just became complete — award XP and update streak
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let newStreak = user.streak;

        if (user.lastActive) {
          const last = new Date(
            user.lastActive.getFullYear(),
            user.lastActive.getMonth(),
            user.lastActive.getDate()
          );
          const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays === 0) {
            newStreak = user.streak;
          } else if (diffDays === 1) {
            newStreak = user.streak + 1;
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            xp: user.xp + dayProgress.curriculumDay.xpReward,
            streak: newStreak,
            lastActive: now,
          },
        });

        await tx.dayProgress.update({
          where: { id: dayProgress.id },
          data: {
            status: 'COMPLETE',
            completedAt: now,
            xpEarned: dayProgress.curriculumDay.xpReward,
          },
        });

        // Unlock next day
        const nextDay = await tx.curriculumDay.findFirst({
          where: {
            pathSlug: dayProgress.curriculumDay.pathSlug,
            dayNumber: dayProgress.curriculumDay.dayNumber + 1,
          },
        });

        if (nextDay) {
          const nextProgress = await tx.dayProgress.findUnique({
            where: { userId_dayId: { userId: user.id, dayId: nextDay.id } },
          });

          if (nextProgress && nextProgress.status === 'LOCKED') {
            await tx.dayProgress.update({
              where: { id: nextProgress.id },
              data: { status: 'AVAILABLE' },
            });
          }
        }

        dayComplete = true;
        xpAwarded = dayProgress.curriculumDay.xpReward;
      } else if (!allDone && dayProgress.status === 'COMPLETE') {
        // Day was complete, but a task was unchecked — revert
        const newXp = Math.max(0, user.xp - dayProgress.curriculumDay.xpReward);

        updatedUser = await tx.user.update({
          where: { id: user.id },
          data: { xp: newXp },
        });

        await tx.dayProgress.update({
          where: { id: dayProgress.id },
          data: {
            status: 'IN_PROGRESS',
            completedAt: null,
            xpEarned: 0,
          },
        });

        // Relock next day if it hasn't been started
        const nextDay = await tx.curriculumDay.findFirst({
          where: {
            pathSlug: dayProgress.curriculumDay.pathSlug,
            dayNumber: dayProgress.curriculumDay.dayNumber + 1,
          },
        });

        if (nextDay) {
          const nextProgress = await tx.dayProgress.findUnique({
            where: { userId_dayId: { userId: user.id, dayId: nextDay.id } },
          });

          if (nextProgress && nextProgress.status === 'AVAILABLE') {
            const nextCompletions = await tx.taskCompletion.count({
              where: { progressId: nextProgress.id },
            });

            if (nextCompletions === 0) {
              await tx.dayProgress.update({
                where: { id: nextProgress.id },
                data: { status: 'LOCKED' },
              });
            }
          }
        }

        dayComplete = false;
      }

      return {
        success: true,
        dayComplete,
        xp: updatedUser.xp,
        streak: updatedUser.streak,
        xpAwarded,
        dayNumber: dayProgress.curriculumDay.dayNumber,
      };
    });

    revalidatePath('/');
    revalidatePath(`/day/${result.dayNumber}`);
    revalidatePath('/roadmap');

    return result;
  } catch (error) {
    console.error('toggleTask error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to toggle task' };
  }
}
