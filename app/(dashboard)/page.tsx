import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


import TaskList from "@/components/dashboard/TaskList";
import CalendarGrid from "@/components/dashboard/CalendarGrid";

export default async function DashboardPage() {
  const user = await getAuthUser();


  // Get all day progress records with curriculum data
  const allProgress = await prisma.dayProgress.findMany({
    where: { userId: user.id },
    include: {
      curriculumDay: { include: { tasks: true } },
      tasks: true,
    },
    orderBy: { dayId: "asc" },
  });

  // Find the active day (IN_PROGRESS first, then first AVAILABLE)
  const activeProgress =
    allProgress.find((p) => p.status === "IN_PROGRESS") ??
    allProgress.find((p) => p.status === "AVAILABLE");

  const completedDays = allProgress.filter((p) => p.status === "COMPLETE");
  const daysRemaining = 30 - completedDays.length;

  // Build task list for today
  const todayTasks =
    activeProgress?.curriculumDay.tasks.map((task) => ({
      id: task.id,
      label: task.label,
      type: task.type,
      url: task.url,
      completed: activeProgress.tasks.some((tc) => tc.taskId === task.id),
    })) ?? [];

  // Build calendar data
  const calendarDays = allProgress.map((p) => ({
    id: p.dayId,
    status: p.status as "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETE",
    xpEarned: p.xpEarned,
  }));

  return (
    <div className="flex flex-col gap-5 animate-in">
      {/* Page header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-text-muted text-xs mt-0.5">
            Your daily learning hub
          </p>
        </div>
        <span className="text-text-muted text-xs font-mono">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon="local_fire_department"
          iconColor="text-accent-coral"
          label="Streak"
          value={`${user.streak}`}
          unit="days"
        />
        <StatCard
          icon="military_tech"
          iconColor="text-accent-purple"
          label="Total XP"
          value={user.xp.toLocaleString()}
        />
        <StatCard
          icon="check_circle"
          iconColor="text-accent-green"
          label="Days Done"
          value={`${completedDays.length}`}
          unit="/30"
        />
        <StatCard
          icon="calendar_month"
          iconColor="text-accent-blue"
          label="Remaining"
          value={`${daysRemaining}`}
          unit="days"
        />
      </div>

      {/* Today's day card */}
      {activeProgress ? (
        <section className="card overflow-hidden">
          {/* Day header */}
          <div className="px-4 md:px-5 py-4 border-b border-surface-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xs font-bold uppercase tracking-widest text-text-muted">
                Day {activeProgress.dayId}
              </span>
              <span className="w-1 h-1 rounded-full bg-surface-border" />
              <span className="text-2xs text-text-muted">
                Phase {activeProgress.curriculumDay.phase} · Week{" "}
                {activeProgress.curriculumDay.week}
              </span>
            </div>
            <h2 className="text-base font-bold text-text-primary">
              {activeProgress.curriculumDay.title}
            </h2>
            <p className="text-text-secondary text-xs mt-1">
              {activeProgress.curriculumDay.description}
            </p>
          </div>

          {/* Task list */}
          <TaskList
            tasks={todayTasks}
            dayId={activeProgress.dayId}
            dayStatus={activeProgress.status}
          />
        </section>
      ) : (
        <div className="card p-8 text-center">
          <span className="material-symbols-outlined text-4xl text-accent-green mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>
            emoji_events
          </span>
          <h2 className="font-bold text-text-primary text-lg">
            All 30 days complete! 🎉
          </h2>
          <p className="text-text-secondary text-sm mt-2">
            You&apos;ve finished the entire Go curriculum. Incredible work.
          </p>
        </div>
      )}

      {/* Calendar */}
      <CalendarGrid days={calendarDays} />
    </div>
  );
}

function StatCard({
  icon,
  iconColor,
  label,
  value,
  unit,
}: {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="card p-3 md:p-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-text-muted">
        <span
          className={`material-symbols-outlined text-[16px] ${iconColor}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        <span className="text-2xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black text-text-primary">{value}</span>
        {unit && (
          <span className="text-text-muted text-xs font-medium">{unit}</span>
        )}
      </div>
    </div>
  );
}
