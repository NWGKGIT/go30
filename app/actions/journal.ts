'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

/**
 * Update or create a journal entry
 */
export async function updateJournal(progressId: string, content: string) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: 'Unauthorized' };
  }

  try {
    // Verify ownership
    const progress = await prisma.dayProgress.findFirst({
      where: { id: progressId, userId: authUser.id },
    });

    if (!progress) {
      return { error: 'Not found' };
    }

    const entry = await prisma.journalEntry.upsert({
      where: { progressId },
      update: { content },
      create: { progressId, content },
    });

    revalidatePath('/journal');

    return { success: true, entry };
  } catch (error) {
    console.error('updateJournal error:', error);
    return { error: 'Failed to save journal entry' };
  }
}
