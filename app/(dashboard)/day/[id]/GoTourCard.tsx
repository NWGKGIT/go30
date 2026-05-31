"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  taskId: string;
  url: string;
  label: string;
  dayId: number;
  completed: boolean;
}

export default function GoTourCard({ taskId, url, label, dayId, completed }: Props) {
  const [iframeOk, setIframeOk] = useState<boolean | null>(null); // null = loading
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [canMark, setCanMark] = useState(completed);
  const [marked, setMarked] = useState(completed);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFocusedRef = useRef(false);

  const THRESHOLD = 60; // 60 seconds

  // Iframe load detection
  function handleIframeLoad() {
    setIframeOk(true);
  }

  function handleIframeError() {
    setIframeOk(false);
  }

  // Fallback: if no load event in 5s, show fallback
  useEffect(() => {
    if (completed) return;
    const timer = setTimeout(() => {
      if (iframeOk === null) setIframeOk(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [completed, iframeOk]);

  // Track focus time on iframe
  useEffect(() => {
    if (!iframeOk || completed) return;

    function onBlur() {
      // Window lost focus — likely because iframe took it
      if (document.activeElement === iframeRef.current) {
        isFocusedRef.current = true;
        intervalRef.current = setInterval(() => {
          setFocusSeconds((s) => {
            const next = s + 1;
            if (next >= THRESHOLD) {
              setCanMark(true);
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
            return next;
          });
        }, 1000);
      }
    }

    function onFocus() {
      isFocusedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [iframeOk, completed]);

  async function handleMark() {
    if (marked) return;
    setMarked(true);

    await fetch(`/api/tasks/${taskId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dayId }),
    });
  }

  const progressPct = Math.min((focusSeconds / THRESHOLD) * 100, 100);
  const timeStr = `${focusSeconds}s / ${THRESHOLD}s`;

  return (
    <section className="card flex flex-col overflow-hidden min-h-[420px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between bg-surface-raised">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-accent-blue">
            terminal
          </span>
          <h2 className="font-semibold text-text-primary text-sm">Go Tour</h2>
        </div>

        {!completed && (
          <div className="flex items-center gap-2">
            {!canMark ? (
              <div className="flex items-center gap-1.5 text-text-muted text-2xs font-mono bg-surface-raised border border-surface-border px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-coral animate-pulse" />
                {timeStr}
              </div>
            ) : (
              <button
                onClick={handleMark}
                disabled={marked}
                className="btn-primary text-2xs py-1 px-2.5 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                Mark done
              </button>
            )}
          </div>
        )}

        {completed && (
          <span className="flex items-center gap-1 text-accent-green text-2xs font-semibold">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            Completed
          </span>
        )}
      </div>

      {/* Timer bar */}
      {!completed && focusSeconds > 0 && (
        <div className="progress-track rounded-none h-0.5">
          <div
            className="h-full bg-accent-green rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 relative">
        {/* Try iframe first */}
        {iframeOk !== false && (
          <iframe
            ref={iframeRef}
            src={url}
            title={label}
            className={`w-full h-full min-h-[360px] border-0 ${iframeOk ? "block" : "hidden"}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {/* Fallback card */}
        {iframeOk === false && (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-4 min-h-[360px]">
            <div className="w-12 h-12 bg-accent-blue-dim rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-accent-blue text-[24px]">
                code_blocks
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-sm mb-1">
                {label}
              </h3>
              <p className="text-text-secondary text-xs">
                The Go Tour can&apos;t be embedded here. Open it in a new tab
                to complete the exercises, then mark it done.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
              Open Go Tour
            </a>
            {!completed && (
              <button
                onClick={handleMark}
                disabled={marked}
                className="text-text-muted text-xs hover:text-text-primary transition-colors underline"
              >
                {marked ? "Marked as done ✓" : "I&apos;ve completed these exercises"}
              </button>
            )}
          </div>
        )}

        {/* Loading state */}
        {iframeOk === null && !completed && (
          <div className="flex items-center justify-center h-full min-h-[360px]">
            <span className="material-symbols-outlined text-[24px] text-text-muted animate-spin">
              progress_activity
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
