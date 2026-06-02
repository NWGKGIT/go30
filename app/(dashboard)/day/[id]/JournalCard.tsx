"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/ui/icons";

interface Props {
  progressId: string;
  initialContent: string;
}

export default function JournalCard({ progressId, initialContent }: Props) {
  const [content, setContent] = useState(initialContent);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  async function save(value: string) {
    setSaveStatus("saving");
    await fetch("/api/journal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progressId, content: value }),
    });
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent(value);
    setSaveStatus("idle");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(value), 500);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <section className="card flex flex-col h-[280px]">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-surface-border flex items-center justify-between bg-surface-raised flex-shrink-0">
        <div className="flex items-center gap-2">

          <Icons.edit_note className="text-text-muted" size={16} />
          <h2 className="font-semibold text-text-primary text-sm">Journal</h2>
        </div>
        <span
          className={`text-2xs flex items-center gap-1 transition-all ${saveStatus === "saved"
            ? "text-accent-green"
            : saveStatus === "saving"
              ? "text-text-muted"
              : "text-text-muted opacity-0"
            }`}
        >
          <Icons.sync spin={saveStatus === "saving"} size={12} className={`transition-opacity ${saveStatus === "saved" ? "opacity-100" : saveStatus === "saving" ? "opacity-100" : "opacity-0"}`} />
          {saveStatus === "saving" ? "Saving…" : "Saved"}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your notes here… What did you learn? What was tricky? Any insights?"
        className="flex-1 w-full px-4 py-3 resize-none bg-surface text-text-primary text-sm placeholder:text-text-muted focus:outline-none leading-relaxed"
      />
    </section>
  );
}
