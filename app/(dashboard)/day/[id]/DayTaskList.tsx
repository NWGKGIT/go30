"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";

interface Task {
  id: string;
  label: string;
  type: string;
  url: string | null;
  completed: boolean;
}

const typeBadge: Record<string, string> = {
  BOOK: "badge-book",
  TOUR: "badge-tour",
  CODE: "badge-code",
  MILESTONE: "badge-milestone",
};

export default function DayTaskList({
  tasks: initialTasks,
  dayId,
  dayStatus,
}: {
  tasks: Task[];
  dayId: number;
  dayStatus: string;
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const router = useRouter();

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  async function toggleTask(taskId: string, isCompleted: boolean) {
    if (dayStatus === "LOCKED") return;
    const nextState = !isCompleted;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: nextState } : t))
    );

    const res = await fetch(`/api/tasks/${taskId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dayId, completed: nextState }),
    });

    if (!res.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: isCompleted } : t))
      );
      return;
    }

    const data = await res.json();
    if (data.dayComplete) {
      router.refresh();
    }
  }

  return (
    <section className="card overflow-hidden">
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-raised">
        <h2 className="font-semibold text-text-primary text-sm">Tasks</h2>
        <span className="text-text-muted text-xs font-mono">
          {completed}/{total} completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-track rounded-none h-0.5">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="divide-y divide-surface-border">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer group transition-colors ${task.completed ? "opacity-60" : "hover:bg-surface-raised"
              } ${dayStatus === "LOCKED" ? "pointer-events-none" : ""}`}
            onClick={() => toggleTask(task.id, task.completed)}
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${task.completed
                ? "bg-accent-blue border-accent-blue"
                : "border-surface-border group-hover:border-accent-blue"
                }`}
            >
              {task.completed && (
                <Icons.check size={11} className="text-white" fill />
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0 gap-0.5">
              <span
                className={`text-sm font-medium transition-colors ${task.completed
                  ? "line-through text-text-muted"
                  : "text-text-primary"
                  }`}
              >
                {task.label}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <span className={typeBadge[task.type] ?? "badge-code"}>
                {task.type}
              </span>
              {task.url && (
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-muted hover:text-accent-blue transition-colors"
                >
                  <Icons.open_in_new size={14} />
                </a>
              )}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
