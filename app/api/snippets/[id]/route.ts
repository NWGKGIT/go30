import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership via relation chain
  const snippet = await prisma.codeSnippet.findFirst({
    where: {
      id,
      progress: { user: { email: authUser.email! } },
    },
  });

  if (!snippet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.codeSnippet.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
