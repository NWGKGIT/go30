import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { progressId, title, code } = await request.json();

  if (!code?.trim()) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  // Verify ownership
  const progress = await prisma.dayProgress.findFirst({
    where: { id: progressId, user: { email: authUser.email! } },
  });

  if (!progress) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const snippet = await prisma.codeSnippet.create({
    data: { progressId, title: title ?? null, code: code.trim() },
  });

  return NextResponse.json(snippet, { status: 201 });
}
