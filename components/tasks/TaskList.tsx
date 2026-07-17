"use client";

import { useState, useOptimistic, useTransition } from "react";
import confetti from "canvas-confetti";
import { Icons } from "@/components/ui/icons";
import { toggleTask } from "@/app/actions/progress";

interface Task {
  id: string;
  label: string;
  type: string;
  url: string | null;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  dayId: string;
  dayStatus: string;
}

const typeBadge: Record<string, string> = {
  BOOK: "badge-book",
  TOUR: "badge-tour",
  CODE: "badge-code",
  MILESTONE: "badge-milestone",
};

export default function TaskList({ tasks: initialTasks, dayId, dayStatus }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  const [isPending, startTransition] = useTransition();

  const completedCount = optimisticTasks.filter((t) => t.completed).length;
  const totalCount = optimisticTasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  async function handleToggle(taskId: string, currentlyCompleted: boolean) {
    if (dayStatus === "LOCKED") return;
    const nextState = !currentlyCompleted;

    // Optimistic update
    startTransition(() => {
      setOptimisticTasks(
        optimisticTasks.map((t) => (t.id === taskId ? { ...t, completed: nextState } : t))
      );
    });

    const result = await toggleTask(taskId, dayId, nextState);

    if ('error' in result && result.error) {
      // Rollback on error
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: currentlyCompleted } : t))
      );
    } else {
      // Commit optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: nextState } : t))
      );

      // Fire confetti if day completed
      if ('dayComplete' in result && result.dayComplete) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#f43f5e"],
        });
      }
    }
  }

  return (
    <section className="card overflow-hidden">
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-raised">
        <h2 className="font-semibold text-text-primary text-sm">Tasks</h2>
        <span className="text-text-muted text-xs font-mono">
          {completedCount}/{totalCount} completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-track rounded-none h-0.5">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="divide-y divide-surface-border">
        {optimisticTasks.map((task) => (
          <label
            key={task.id}
            className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer group transition-colors ${
              task.completed ? "opacity-60" : "hover:bg-surface-raised"
            } ${dayStatus === "LOCKED" ? "pointer-events-none" : ""} ${
              isPending ? "opacity-50" : ""
            }`}
            onClick={() => handleToggle(task.id, task.completed)}
          >
            <div
              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                task.completed
                  ? "bg-accent-blue border-accent-blue"
                  : "border-surface-border group-hover:border-accent-blue"
              }`}
            >
              {task.completed && <Icons.check size={11} className="text-white" fill />}
            </div>

            <div className="flex flex-col flex-1 min-w-0 gap-0.5">
              <span
                className={`text-sm font-medium transition-colors ${
                  task.completed ? "line-through text-text-muted" : "text-text-primary"
                }`}
              >
                {task.label}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <span className={typeBadge[task.type] ?? "badge-code"}>{task.type}</span>
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
