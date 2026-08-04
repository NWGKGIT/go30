"use client";

import { Icons } from "@/components/ui/icons";

interface Props {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

export default function ResourceCard({ label, url, icon }: Props) {
  return (
    <section className="card p-6 flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 bg-accent-blue-dim rounded-xl flex items-center justify-center">
        {icon || <Icons.code_blocks size={24} className="text-accent-blue" />}
      </div>
      <div>
        <h3 className="font-semibold text-text-primary text-sm mb-1">{label}</h3>
        <p className="text-text-secondary text-xs">
          Open this resource in a new tab to complete the exercise.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex items-center gap-2 text-sm"
      >
        <Icons.open_in_new size={16} />
        Open Resource
      </a>
    </section>
  );
}
