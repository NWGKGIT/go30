import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import DayTaskList from "./DayTaskList";
import GoTourCard from "./GoTourCard";
import JournalCard from "./JournalCard";
import SnippetsCard from "./SnippetsCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DayPage({ params }: Props) {
  const { id } = await params;
  const dayId = parseInt(id, 10);

  if (isNaN(dayId) || dayId < 1 || dayId > 30) {
    notFound();
  }

  const user = await getAuthUser();


  const dayProgress = await prisma.dayProgress.findUnique({
    where: { userId_dayId: { userId: user.id, dayId } },
    include: {
      curriculumDay: { include: { tasks: true } },
      tasks: true,
      journal: true,
      snippets: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!dayProgress) notFound();

  const curriculum = dayProgress.curriculumDay;
  const tasks = curriculum.tasks.map((t) => ({
    id: t.id,
    label: t.label,
    type: t.type as string,
    url: t.url,
    completed: dayProgress.tasks.some((tc) => tc.taskId === t.id),
  }));

  const tourTask = curriculum.tasks.find((t) => t.type === "TOUR");

  const statusColors: Record<string, string> = {
    LOCKED: "text-text-muted bg-surface-raised",
    AVAILABLE: "text-text-secondary bg-surface-raised",
    IN_PROGRESS: "text-accent-blue bg-accent-blue-dim",
    COMPLETE: "text-accent-green bg-accent-green-dim",
  };

  return (
    <div className="flex flex-col gap-5 animate-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-text-muted">
        <Link href="/" className="hover:text-text-primary transition-colors">
          Dashboard
        </Link>
        <Icons.chevron_right size={14} />
        <Link
          href="/roadmap"
          className="hover:text-text-primary transition-colors"
        >
          Roadmap
        </Link>
        <Icons.chevron_right size={14} />
        <span className="text-text-primary font-medium">Day {dayId}</span>
      </nav>

      {/* Page header */}
      <header className="pb-4 border-b border-surface-border">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="badge-book text-2xs px-2 py-0.5">
            Phase {curriculum.phase}
          </span>
          <span className="text-text-muted text-2xs uppercase tracking-wider font-medium">
            Week {curriculum.week}
          </span>
          <span
            className={`ml-auto flex items-center gap-1.5 text-2xs font-semibold px-2 py-0.5 rounded-full ${
              statusColors[dayProgress.status] ?? ""
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {dayProgress.status.replace("_", " ")}
          </span>
        </div>
        <h1 className="text-lg font-black text-text-primary tracking-tight">
          Day {dayId}: {curriculum.title}
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          {curriculum.description}
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column — Tasks + Tour */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <DayTaskList
            tasks={tasks}
            dayId={dayId}
            dayStatus={dayProgress.status}
          />

          {tourTask && (
            <GoTourCard
              taskId={tourTask.id}
              url={tourTask.url ?? "https://go.dev/tour/basics/1"}
              label={tourTask.label}
              dayId={dayId}
              completed={tasks.find((t) => t.id === tourTask.id)?.completed ?? false}
            />
          )}
        </div>

        {/* Right column — Journal + Snippets */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <JournalCard
            progressId={dayProgress.id}
            initialContent={dayProgress.journal?.content ?? ""}
          />
          <SnippetsCard
            progressId={dayProgress.id}
            initialSnippets={dayProgress.snippets.map((s) => ({
              id: s.id,
              title: s.title,
              code: s.code,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
