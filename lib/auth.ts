import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Get the authenticated user's Prisma record.
 * Creates a User record on first login if it doesn't exist.
 * Redirects to /login if not authenticated.
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // Upsert on id (PK = Supabase UUID) so concurrent Server Component renders
  // never race on a CREATE — the second call always becomes an UPDATE.
  const user = await prisma.user.upsert({
    where: { id: authUser.id },
    update: { email: authUser.email! }, // keep email in sync
    create: {
      id: authUser.id,
      email: authUser.email!,
    },
  });

  return user;
}

/**
 * Ensure DayProgress records exist for the user.
 * Called on first-time access.
 */
export async function ensureDayProgressRecords(userId: string) {
  const existing = await prisma.dayProgress.count({ where: { userId } });
  if (existing > 0) return;

  const days = await prisma.curriculumDay.findMany({ orderBy: { id: "asc" } });

  await prisma.dayProgress.createMany({
    data: days.map((day) => ({
      userId,
      dayId: day.id,
      status: day.id === 1 ? "AVAILABLE" : "LOCKED",
    })),
    skipDuplicates: true,
  });
}
