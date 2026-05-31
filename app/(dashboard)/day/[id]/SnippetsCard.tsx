"use client";

import { useState } from "react";

interface Snippet {
  id: string;
  title: string | null;
  code: string;
}

interface Props {
  progressId: string;
  initialSnippets: Snippet[];
}

export default function SnippetsCard({ progressId, initialSnippets }: Props) {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCode, setNewCode] = useState("");
  const [saving, setSaving] = useState(false);

  async function addSnippet() {
    if (!newCode.trim()) return;
    setSaving(true);

    const res = await fetch("/api/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progressId,
        title: newTitle.trim() || null,
        code: newCode.trim(),
      }),
    });

    const data = await res.json();
    setSnippets((prev) => [...prev, data]);
    setNewTitle("");
    setNewCode("");
    setShowAdd(false);
    setSaving(false);
  }

  async function deleteSnippet(id: string) {
    await fetch(`/api/snippets/${id}`, { method: "DELETE" });
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <section className="card flex flex-col flex-1">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-surface-border flex items-center justify-between bg-surface-raised flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-text-muted">
            data_object
          </span>
          <h2 className="font-semibold text-text-primary text-sm">Snippets</h2>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="w-6 h-6 rounded-full flex items-center justify-center border border-surface-border hover:bg-surface-raised transition-colors text-text-secondary hover:text-text-primary"
          title="Add snippet"
        >
          <span className="material-symbols-outlined text-[14px]">
            {showAdd ? "close" : "add"}
          </span>
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="px-4 py-3 border-b border-surface-border bg-surface-raised flex flex-col gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title (optional)"
            className="input-base text-xs py-1.5"
          />
          <textarea
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Paste your Go code here…"
            rows={5}
            className="input-base font-mono text-xs py-1.5 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={addSnippet}
              disabled={saving || !newCode.trim()}
              className="btn-primary text-xs py-1 px-3"
            >
              {saving ? "Saving…" : "Save snippet"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="btn-ghost text-xs py-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Snippet list */}
      <div className="flex flex-col divide-y divide-surface-border overflow-y-auto max-h-[400px]">
        {snippets.length === 0 && !showAdd && (
          <div className="px-4 py-6 text-center text-text-muted text-xs">
            No snippets yet. Save Go code as you learn.
          </div>
        )}

        {snippets.map((snippet) => (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
            onDelete={deleteSnippet}
          />
        ))}
      </div>
    </section>
  );
}

function SnippetItem({
  snippet,
  onDelete,
}: {
  snippet: Snippet;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="group">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-surface-raised transition-colors"
      >
        <span className="font-mono text-xs text-text-primary">
          {snippet.title ?? "snippet.go"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(snippet.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-accent-coral p-0.5"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
          <span
            className="material-symbols-outlined text-[16px] text-text-muted transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            expand_more
          </span>
        </div>
      </button>

      {open && (
        <pre className="code-block mx-3 mb-3 rounded-lg text-2xs leading-relaxed overflow-x-auto">
          <code>{snippet.code}</code>
        </pre>
      )}
    </div>
  );
}
