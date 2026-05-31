"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

interface Task {
  id: string;
  label: string;
  type: string;
  url: string | null;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  dayId: number;
  dayStatus: string;
}

const typeBadge: Record<string, string> = {
  BOOK: "badge-book",
  TOUR: "badge-tour",
  CODE: "badge-code",
  MILESTONE: "badge-milestone",
};

const typeLabel: Record<string, string> = {
  BOOK: "Book",
  TOUR: "Tour",
  CODE: "Code",
  MILESTONE: "Milestone",
};

export default function TaskList({ tasks: initialTasks, dayId, dayStatus }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  async function toggleTask(taskId: string, currentlyCompleted: boolean) {
    if (dayStatus === "LOCKED") return;
    const nextState = !currentlyCompleted;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: nextState } : t))
    );

    const res = await fetch(`/api/tasks/${taskId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dayId, completed: nextState }),
    });

    if (!res.ok) {
      // Rollback on error
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: currentlyCompleted } : t))
      );
      return;
    }

    const data = await res.json();

    // If day is now complete, fire confetti then refresh
    if (data.dayComplete) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#f43f5e"],
      });
      startTransition(() => router.refresh());
    }
  }

  return (
    <section className="card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-raised">
        <h2 className="font-semibold text-text-primary text-sm">Today&apos;s Tasks</h2>
        <span className="text-text-muted text-xs">
          {completedCount}/{totalCount} done
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-track rounded-none h-0.5">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Task items */}
      <div className="divide-y divide-surface-border">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`flex items-start gap-3 px-4 py-3 cursor-pointer group transition-colors ${
              task.completed
                ? "opacity-60"
                : "hover:bg-surface-raised"
            } ${dayStatus === "LOCKED" ? "pointer-events-none" : ""}`}
            onClick={() => toggleTask(task.id, task.completed)}
          >
            {/* Checkbox */}
            <div
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                task.completed
                  ? "bg-accent-blue border-accent-blue"
                  : "border-surface-border group-hover:border-accent-blue"
              }`}
            >
              {task.completed && (
                <span className="material-symbols-outlined text-white text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              )}
            </div>

            {/* Label */}
            <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
              <span
                className={`text-sm font-medium transition-colors ${
                  task.completed
                    ? "line-through text-text-muted"
                    : "text-text-primary group-hover:text-accent-blue"
                }`}
              >
                {task.label}
              </span>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={typeBadge[task.type] ?? "badge-code"}>
                  {typeLabel[task.type] ?? task.type}
                </span>
                {task.url && (
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-muted hover:text-accent-blue transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      open_in_new
                    </span>
                  </a>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
