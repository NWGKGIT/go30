import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { progressId, content } = await request.json();

  // Verify the progress belongs to this user
  const progress = await prisma.dayProgress.findFirst({
    where: { id: progressId, user: { email: authUser.email! } },
  });

  if (!progress) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const entry = await prisma.journalEntry.upsert({
    where: { progressId },
    update: { content },
    create: { progressId, content },
  });

  return NextResponse.json(entry);
}
