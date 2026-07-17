"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import type { PathPhase, PathMilestone } from "@/content/paths/go30";

interface Day {
  id: number;
  phase: number;
  week: number;
  title: string;
  status: string;
  xpReward: number;
}

interface Props {
  days: Day[];
  activeDay: number | null;
  phases: PathPhase[];
  milestones: PathMilestone[];
}

export default function RoadmapClient({ days, activeDay, phases, milestones }: Props) {
  const [openPhases, setOpenPhases] = useState<Set<number>>(() => {
    // Initialize from localStorage on first render only
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('roadmap-open-phases');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return new Set(parsed);
        } catch {
          // ignore
        }
      }
    }
    return new Set([1, 2, 3, 4]);
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('roadmap-open-phases', JSON.stringify([...openPhases]));
  }, [openPhases]);

  function togglePhase(phase: number) {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phase)) next.delete(phase);
      else next.add(phase);
      return next;
    });
  }

  function collapseAll() {
    setOpenPhases(new Set());
  }

  function expandAll() {
    setOpenPhases(new Set(phases.map(p => p.number)));
  }

  const allCollapsed = openPhases.size === 0;

  const milestoneMap = new Map(milestones.map(m => [m.dayNumber, m.label]));

  return (
    <div className="flex flex-col gap-5 animate-in">
      {/* Header */}
      <div className="flex items-end justify-between pb-4 border-b border-surface-border">
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">
            Curriculum Overview
          </h1>
          <p className="text-text-muted text-xs mt-0.5">
            Your {days.length}-day journey to mastering Go
          </p>
        </div>
        <button
          onClick={allCollapsed ? expandAll : collapseAll}
          className="btn-outline text-xs flex items-center gap-1.5"
        >
          {allCollapsed ? <Icons.expand_all size={14} /> : <Icons.collapse_all size={14} />}
          {allCollapsed ? "Expand All" : "Collapse All"}
        </button>
      </div>

      {/* Phases */}
      <div className="flex flex-col gap-4">
        {phases.map((phase) => {
          const phaseDays = days.filter((d) => d.phase === phase.number);
          const isOpen = openPhases.has(phase.number);
          const completedInPhase = phaseDays.filter((d) => d.status === "COMPLETE").length;

          // Group by week
          const weeks = [...new Set(phaseDays.map((d) => d.week))];

          const colorClasses: Record<string, string> = {
            'accent-blue': 'text-accent-blue bg-accent-blue-dim',
            'accent-purple': 'text-accent-purple bg-accent-purple-dim',
            'accent-amber': 'text-accent-amber bg-accent-amber-dim',
            'accent-green': 'text-accent-green bg-accent-green-dim',
          };

          return (
            <div key={phase.number} className="card overflow-hidden">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.number)}
                className="w-full bg-surface-raised px-4 py-3 flex items-center justify-between hover:bg-surface-border/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${colorClasses[phase.colorToken] ?? ''}`}>
                    P{phase.number}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold text-text-primary text-sm">
                      {phase.label}
                    </div>
                    <div className="text-text-muted text-2xs">{phase.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-text-muted text-xs">
                  <span className="font-mono">
                    {completedInPhase}/{phaseDays.length}
                  </span>
                  <Icons.expand_more
                    size={18}
                    className="transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>
              </button>

              {/* Phase content */}
              {isOpen && (
                <div className="px-4 py-3 flex flex-col gap-4">
                  {weeks.map((week) => {
                    const weekDays = phaseDays.filter((d) => d.week === week);
                    return (
                      <div key={week}>
                        <h4 className="text-2xs font-bold uppercase tracking-wider text-text-muted mb-2 pl-8">
                          Week {week}
                        </h4>
                        <div className="flex flex-col gap-0.5">
                          {weekDays.map((day) => {
                            const isToday = day.id === activeDay;
                            const isComplete = day.status === "COMPLETE";
                            const isLocked = day.status === "LOCKED";
                            const isClickable = !isLocked;

                            return (
                              <div key={day.id}>
                                <div
                                  className={`group flex items-center gap-3 px-2 py-2 rounded-lg transition-colors ${
                                    isToday
                                      ? "bg-accent-blue-dim border border-accent-blue/30"
                                      : isClickable
                                      ? "hover:bg-surface-raised cursor-pointer"
                                      : "opacity-40"
                                  }`}
                                >
                                  {/* Completion circle */}
                                  <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      isComplete
                                        ? "border-accent-green bg-accent-green"
                                        : isToday
                                        ? "border-accent-blue"
                                        : "border-surface-border"
                                    }`}
                                  >
                                    {isComplete && (
                                      <Icons.check size={11} className="text-white" fill />
                                    )}
                                  </div>

                                  {/* Day label */}
                                  <span className="font-mono text-2xs text-text-muted w-10 flex-shrink-0">
                                    Day {day.id}
                                  </span>

                                  {/* Title */}
                                  {isClickable ? (
                                    <Link
                                      href={`/day/${day.id}`}
                                      className={`flex-1 text-sm font-medium transition-colors ${
                                        isComplete
                                          ? "line-through text-text-muted"
                                          : isToday
                                          ? "text-accent-blue"
                                          : "text-text-primary group-hover:text-accent-blue"
                                      }`}
                                    >
                                      {day.title}
                                    </Link>
                                  ) : (
                                    <span className="flex-1 text-sm font-medium text-text-muted">
                                      {day.title}
                                    </span>
                                  )}

                                  {/* Status badge */}
                                  <span className="ml-auto text-2xs font-medium flex-shrink-0">
                                    {isToday && (
                                      <span className="text-accent-blue">Today</span>
                                    )}
                                    {isComplete && (
                                      <span className="text-accent-green font-mono">
                                        +{day.xpReward} XP
                                      </span>
                                    )}
                                    {isLocked && (
                                      <span className="text-text-muted">Locked</span>
                                    )}
                                  </span>
                                </div>

                                {/* Milestone banner */}
                                {milestoneMap.has(day.id) && (
                                  <div className="my-2 mx-0 px-3 py-2.5 bg-surface-raised border border-surface-border rounded-lg flex items-center gap-3">
                                    <div className="w-8 h-8 bg-surface-border rounded-lg flex items-center justify-center flex-shrink-0">
                                      <Icons.flag size={16} className="text-text-secondary" />
                                    </div>
                                    <div>
                                      <div className="text-2xs text-text-muted uppercase tracking-wider font-bold">
                                        Milestone
                                      </div>
                                      <div className="text-text-primary text-sm font-semibold">
                                        {milestoneMap.get(day.id)}
                                      </div>
                                    </div>
                                    {day.status === "COMPLETE" && (
                                      <span className="ml-auto badge-tour">Done</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
