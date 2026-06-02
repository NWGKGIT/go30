import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

export default async function JournalPage() {
  const user = await getAuthUser();


  const entries = await prisma.journalEntry.findMany({
    where: {
      progress: { userId: user.id },
      content: { not: "" },
    },
    include: {
      progress: {
        include: {
          curriculumDay: true,
          snippets: { orderBy: { createdAt: "asc" } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5 animate-in">
      {/* Header */}
      <div className="flex items-baseline justify-between pb-4 border-b border-surface-border">
        <div>
          <h1 className="text-xl font-black text-text-primary tracking-tight">
            Journal
          </h1>
          <p className="text-text-muted text-xs mt-0.5">
            Your learning notes, day by day
          </p>
        </div>
        <span className="text-text-muted text-xs">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="card p-10 text-center">
          <Icons.edit_note size={36} className="text-text-muted mb-3 block mx-auto" />
          <h2 className="font-semibold text-text-primary">No journal entries yet</h2>
          <p className="text-text-secondary text-sm mt-1">
            Complete your first day and write some notes.
          </p>
        </div>
      ) : (
        /* Timeline */
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-surface-border via-surface-border to-transparent hidden md:block" />

          <div className="flex flex-col gap-4">
            {entries.map((entry) => {
              const day = entry.progress.curriculumDay;
              const date = entry.updatedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const excerpt =
                entry.content.length > 200
                  ? entry.content.slice(0, 200) + "…"
                  : entry.content;

              return (
                <div
                  key={entry.id}
                  className="md:pl-10 relative group"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-4 w-7 h-7 rounded-full bg-surface border border-surface-border items-center justify-center group-hover:border-accent-blue group-hover:text-accent-blue transition-colors z-10">
                    <Icons.edit_note size={14} className="text-text-muted group-hover:text-accent-blue" />
                  </div>

                  <Link href={`/day/${day.id}`}>
                    <article className="card p-4 hover:bg-surface-raised transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-surface-raised border border-surface-border text-text-secondary text-2xs font-bold px-2 py-0.5 rounded font-mono">
                            Day {day.id}
                          </span>
                          <span className="text-text-muted text-2xs">
                            Phase {day.phase} · Week {day.week}
                          </span>
                        </div>
                        <time className="text-text-muted text-2xs">{date}</time>
                      </div>

                      <h3 className="font-semibold text-text-primary text-sm mb-1.5">
                        {day.title}
                      </h3>

                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>

                      {/* Snippet preview */}
                      {entry.progress.snippets.length > 0 && (
                        <div className="mt-3 border border-surface-border rounded-lg overflow-hidden">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-raised border-b border-surface-border">
                            <Icons.code size={14} className="text-text-muted" />
                            <span className="font-mono text-2xs text-text-muted">
                              {entry.progress.snippets[0].title ?? "snippet.go"}
                            </span>
                            {entry.progress.snippets.length > 1 && (
                              <span className="ml-auto text-2xs text-text-muted">
                                +{entry.progress.snippets.length - 1} more
                              </span>
                            )}
                          </div>
                          <pre className="code-block rounded-none border-0 text-2xs line-clamp-3">
                            {entry.progress.snippets[0].code.slice(0, 150)}
                            {entry.progress.snippets[0].code.length > 150 && "…"}
                          </pre>
                        </div>
                      )}
                    </article>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
