"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";

interface DayCell {
  id: number;
  status: "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETE";
  xpEarned: number;
}

interface Props {
  days: DayCell[];
}

export default function CalendarGrid({ days }: Props) {
  const router = useRouter();

  return (
    <section className="card p-4 md:p-5">
      <h3 className="font-semibold text-text-primary text-sm mb-4 pb-3 border-b border-surface-border">
        30-Day Calendar
      </h3>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
        {days.map((day) => {
          const isClickable =
            day.status === "COMPLETE" || day.status === "IN_PROGRESS";
          const isAvailable = day.status === "AVAILABLE";

          return (
            <button
              key={day.id}
              disabled={day.status === "LOCKED"}
              onClick={() => isClickable && router.push(`/day/${day.id}`)}
              title={
                day.status === "LOCKED"
                  ? `Unlocks after Day ${day.id - 1}`
                  : `Day ${day.id}`
              }
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center relative text-xs font-mono
                transition-all duration-200
                ${day.status === "COMPLETE"
                  ? "bg-accent-green-dim border border-accent-green/40 text-accent-green cursor-pointer hover:scale-105"
                  : ""}
                ${day.status === "IN_PROGRESS"
                  ? "bg-accent-blue-dim border-2 border-accent-blue text-accent-blue cursor-pointer hover:scale-105"
                  : ""}
                ${isAvailable
                  ? "bg-surface-raised border border-surface-border text-text-secondary cursor-default"
                  : ""}
                ${day.status === "LOCKED"
                  ? "bg-surface border border-surface-border text-text-muted opacity-40 cursor-not-allowed"
                  : ""}
              `}
            >
              <span className="absolute top-1 left-1.5 text-2xs leading-none opacity-70">
                {day.id}
              </span>

              {day.status === "COMPLETE" && (
                <Icons.check size={16} className="mt-1" fill />
              )}
              {day.status === "IN_PROGRESS" && (
                <Icons.play_arrow size={16} className="mt-1 animate-pulse-slow" />
              )}
              {isAvailable && (
                <Icons.radio_button_unchecked size={16} className="mt-1" />
              )}
              {day.status === "LOCKED" && (
                <Icons.lock size={14} className="mt-1" />
              )}

              {day.status === "COMPLETE" && day.xpEarned > 0 && (
                <span className="text-2xs leading-none opacity-70 mt-0.5">
                  +{day.xpEarned}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
