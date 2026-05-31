"use client";

import Link from "next/link";
import { useState } from "react";

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
}

const PHASE_INFO: Record<number, { label: string; desc: string; color: string }> = {
  1: { label: "Phase 1", desc: "Syntax Sprint · Days 1–7", color: "text-accent-blue bg-accent-blue-dim" },
  2: { label: "Phase 2", desc: "Core Concepts · Days 8–14", color: "text-accent-purple bg-accent-purple-dim" },
  3: { label: "Phase 3", desc: "Standard Library · Days 15–21", color: "text-accent-amber bg-accent-amber-dim" },
  4: { label: "Phase 4", desc: "Projects · Days 22–30", color: "text-accent-green bg-accent-green-dim" },
};

// Milestone days (end of each phase)
const MILESTONES: Record<number, string> = {
  7: "Milestone 1 · CLI Task Manager",
  14: "Milestone 2 · REST API",
  21: "Milestone 3 · Concurrent Scraper",
  30: "Milestone 4 · Full Codecrafters Project",
};

export default function RoadmapClient({ days, activeDay }: Props) {
  const phases = [1, 2, 3, 4];
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([1, 2, 3, 4]));

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
    setOpenPhases(new Set([1, 2, 3, 4]));
  }

  const allCollapsed = openPhases.size === 0;

  return (
    <div className="flex flex-col gap-5 animate-in">
      {/* Header */}
      <div className="flex items-end justify-between pb-4 border-b border-surface-border">
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">
            Curriculum Overview
          </h1>
          <p className="text-text-muted text-xs mt-0.5">
            Your 30-day journey to mastering Go
          </p>
        </div>
        <button
          onClick={allCollapsed ? expandAll : collapseAll}
          className="btn-outline text-xs flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[14px]">
            {allCollapsed ? "expand_all" : "collapse_all"}
          </span>
          {allCollapsed ? "Expand All" : "Collapse All"}
        </button>
      </div>

      {/* Phases */}
      <div className="flex flex-col gap-4">
        {phases.map((phase) => {
          const phaseDays = days.filter((d) => d.phase === phase);
          const info = PHASE_INFO[phase];
          const isOpen = openPhases.has(phase);
          const completedInPhase = phaseDays.filter((d) => d.status === "COMPLETE").length;

          // Group by week
          const weeks = [...new Set(phaseDays.map((d) => d.week))];

          return (
            <div key={phase} className="card overflow-hidden">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase)}
                className="w-full bg-surface-raised px-4 py-3 flex items-center justify-between hover:bg-surface-border/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${info.color}`}>
                    P{phase}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold text-text-primary text-sm">
                      {info.label}
                    </div>
                    <div className="text-text-muted text-2xs">{info.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-text-muted text-xs">
                  <span className="font-mono">
                    {completedInPhase}/{phaseDays.length}
                  </span>
                  <span
                    className="material-symbols-outlined text-[18px] transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    expand_more
                  </span>
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
                                      <span
                                        className="material-symbols-outlined text-white text-[11px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                      >
                                        check
                                      </span>
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

                                {/* Milestone banner after last day of phase */}
                                {MILESTONES[day.id] && (
                                  <div className="my-2 mx-0 px-3 py-2.5 bg-surface-raised border border-surface-border rounded-lg flex items-center gap-3">
                                    <div className="w-8 h-8 bg-surface-border rounded-lg flex items-center justify-center flex-shrink-0">
                                      <span className="material-symbols-outlined text-[16px] text-text-secondary">
                                        flag
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-2xs text-text-muted uppercase tracking-wider font-bold">
                                        Milestone
                                      </div>
                                      <div className="text-text-primary text-sm font-semibold">
                                        {MILESTONES[day.id]}
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
