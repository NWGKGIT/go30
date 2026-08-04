'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

/**
 * Create a new code snippet
 */
export async function createSnippet(progressId: string, code: string, title?: string) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: 'Unauthorized' };
  }

  if (!code?.trim()) {
    return { error: 'Code is required' };
  }

  try {
    // Verify ownership
    const progress = await prisma.dayProgress.findFirst({
      where: { id: progressId, userId: authUser.id },
    });

    if (!progress) {
      return { error: 'Not found' };
    }

    const snippet = await prisma.codeSnippet.create({
      data: {
        progressId,
        title: title ?? null,
        code: code.trim(),
      },
    });

    revalidatePath(`/day/[id]`, 'page');

    return { success: true, snippet };
  } catch (error) {
    console.error('createSnippet error:', error);
    return { error: 'Failed to create snippet' };
  }
}

/**
 * Delete a code snippet
 */
export async function deleteSnippet(snippetId: string) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { error: 'Unauthorized' };
  }

  try {
    // Verify ownership
    const snippet = await prisma.codeSnippet.findFirst({
      where: {
        id: snippetId,
        progress: { userId: authUser.id },
      },
    });

    if (!snippet) {
      return { error: 'Not found' };
    }

    await prisma.codeSnippet.delete({ where: { id: snippetId } });

    revalidatePath(`/day/[id]`, 'page');

    return { success: true };
  } catch (error) {
    console.error('deleteSnippet error:', error);
    return { error: 'Failed to delete snippet' };
  }
}
