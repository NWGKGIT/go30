import { PrismaClient, TaskType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as never);

interface TaskSeed {
  label: string;
  type: TaskType;
  url?: string;
}

interface DaySeed {
  id: number;
  phase: number;
  week: number;
  title: string;
  description: string;
  xpReward: number;
  tasks: TaskSeed[];
}

const curriculum: DaySeed[] = [
  // ── PHASE 1: Syntax sprint ──────────────────────────────────────────────────
  {
    id: 1, phase: 1, week: 1,
    title: "Tooling + hello world + types",
    description: "Install Go, set up project structure. Basic types, variables, zero values, constants, fmt package.",
    xpReward: 100,
    tasks: [
      { label: "Go Tour: Basics 1–13", type: "TOUR", url: "https://go.dev/tour/basics/1" },
      { label: "TGPL ch.1–2", type: "BOOK" },
      { label: "Write: 5 small programs", type: "CODE" },
    ],
  },
  {
    id: 2, phase: 1, week: 1,
    title: "Control flow + functions",
    description: "for loops (only loop), if/else, switch, functions, multiple return values, named returns.",
    xpReward: 100,
    tasks: [
      { label: "Go Tour: Flow control 1–14", type: "TOUR", url: "https://go.dev/tour/flowcontrol/1" },
      { label: "TGPL ch.3", type: "BOOK" },
      { label: "Write: FizzBuzz, Fibonacci, word counter", type: "CODE" },
    ],
  },
  {
    id: 3, phase: 1, week: 1,
    title: "Arrays, slices, maps, strings",
    description: "Slice internals (len, cap, append), maps, range, string iteration.",
    xpReward: 100,
    tasks: [
      { label: "Go Tour: More types 1–18", type: "TOUR", url: "https://go.dev/tour/moretypes/1" },
      { label: "TGPL ch.4", type: "BOOK" },
      { label: "Write: frequency counter, matrix ops", type: "CODE" },
    ],
  },
  {
    id: 4, phase: 1, week: 1,
    title: "Structs, pointers, methods",
    description: "Structs, pointer vs value receivers, embedding. Go has no classes — this is how OOP is replaced.",
    xpReward: 150,
    tasks: [
      { label: "Go Tour: Methods 1–13", type: "TOUR", url: "https://go.dev/tour/methods/1" },
      { label: "Effective Go: names, commentary", type: "BOOK" },
      { label: "Write: linked list, stack using structs", type: "CODE" },
    ],
  },

  // ── PHASE 2: Core concepts ─────────────────────────────────────────────────
  {
    id: 5, phase: 2, week: 2,
    title: "Interfaces",
    description: "Implicit interfaces, io.Reader/Writer/fmt.Stringer, empty interface, type assertions, type switches.",
    xpReward: 120,
    tasks: [
      { label: "Go Tour: Interfaces 1–14", type: "TOUR", url: "https://go.dev/tour/methods/9" },
      { label: "Effective Go: interfaces", type: "BOOK" },
      { label: "Implement: custom io.Reader, Stringer", type: "CODE" },
    ],
  },
  {
    id: 6, phase: 2, week: 2,
    title: "Error handling",
    description: "error interface, custom errors, errors.Is/As, wrapping with fmt.Errorf %w.",
    xpReward: 120,
    tasks: [
      { label: "TGPL ch.5 (errors section)", type: "BOOK" },
      { label: "Effective Go: errors", type: "BOOK" },
      { label: "Write: multi-layered error chain", type: "CODE" },
    ],
  },
  {
    id: 7, phase: 2, week: 2,
    title: "Packages, modules, testing",
    description: "go mod, package structure, exported vs unexported, go test basics, table-driven tests.",
    xpReward: 120,
    tasks: [
      { label: "TGPL ch.10–11", type: "BOOK" },
      { label: "Write: test suite for your week 1 programs", type: "CODE" },
    ],
  },
  {
    id: 8, phase: 2, week: 2,
    title: "net/http client + server basics",
    description: "http.ListenAndServe, http.Handler, ServeMux, ResponseWriter, Request.",
    xpReward: 150,
    tasks: [
      { label: "go.dev/pkg/net/http docs", type: "BOOK" },
      { label: "Build: tiny HTTP server with 3 routes", type: "CODE" },
    ],
  },
  {
    id: 9, phase: 2, week: 2,
    title: "os, bufio, io — file I/O",
    description: "os.Open, bufio.Scanner, io.ReadAll, os.Args.",
    xpReward: 120,
    tasks: [
      { label: "TGPL ch.7 (I/O)", type: "BOOK" },
      { label: "Build: file word-count CLI tool", type: "CODE" },
    ],
  },
  {
    id: 10, phase: 2, week: 2,
    title: "encoding/binary, crypto/sha1, compress/zlib",
    description: "Binary read/write, hashing, compression.",
    xpReward: 120,
    tasks: [
      { label: "go.dev/pkg docs for each package", type: "BOOK" },
      { label: "Build: file hasher + compressor", type: "CODE" },
    ],
  },
  {
    id: 11, phase: 2, week: 2,
    title: "Goroutines + channels",
    description: "go keyword, channel direction, buffered vs unbuffered, select.",
    xpReward: 150,
    tasks: [
      { label: "Go Tour: Concurrency 1–9", type: "TOUR", url: "https://go.dev/tour/concurrency/1" },
      { label: "Effective Go: goroutines + channels", type: "BOOK" },
      { label: "Write: concurrent file downloader", type: "CODE" },
    ],
  },
  {
    id: 12, phase: 2, week: 2,
    title: "sync package + race conditions",
    description: "sync.Mutex, sync.WaitGroup, go run -race.",
    xpReward: 150,
    tasks: [
      { label: "TGPL ch.9", type: "BOOK" },
      { label: "Write: thread-safe counter, fan-out worker pool", type: "CODE" },
    ],
  },

  // ── PHASE 3: Codecrafters: HTTP Server ───────────────────────────────────────
  {
    id: 13, phase: 3, week: 3,
    title: "Bind a TCP socket, accept connections",
    description: "net.Listen, net.Conn, accept loop. The raw socket layer before HTTP sits on top.",
    xpReward: 200,
    tasks: [
      { label: "CC Stage 1", type: "CODE" },
      { label: "RFC 7230 — read §2–3", type: "BOOK" },
    ],
  },
  {
    id: 14, phase: 3, week: 3,
    title: "Parse HTTP/1.1 request line + headers",
    description: "bufio.Reader, manual parsing of method / path / HTTP version and header key-value pairs.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 2–3", type: "CODE" },
    ],
  },
  {
    id: 15, phase: 3, week: 3,
    title: "Write HTTP responses",
    description: "Status line, headers, body. Return 200, 404, and custom text responses correctly.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 4–5", type: "CODE" },
    ],
  },
  {
    id: 16, phase: 3, week: 3,
    title: "URL routing + path parameters",
    description: "strings.Split, route matching, extracting /echo/:str, /files/:filename style params manually.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 6–7", type: "CODE" },
    ],
  },
  {
    id: 17, phase: 3, week: 4,
    title: "Request body + POST handling",
    description: "io.ReadAll on body, Content-Length, POST /files — write to disk. Real server behavior.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 8–9", type: "CODE" },
    ],
  },
  {
    id: 18, phase: 3, week: 4,
    title: "Concurrent connections via goroutines",
    description: "go handleConn(conn) — each connection in its own goroutine. Watch it with -race.",
    xpReward: 200,
    tasks: [
      { label: "CC Stage 10", type: "CODE" },
    ],
  },
  {
    id: 19, phase: 3, week: 4,
    title: "gzip compression + Accept-Encoding",
    description: "compress/gzip, Content-Encoding header, conditional compression. Advanced but satisfying.",
    xpReward: 250,
    tasks: [
      { label: "CC Stages 11–12", type: "CODE" },
    ],
  },
  {
    id: 20, phase: 3, week: 4,
    title: "Persistent connections + keep-alive",
    description: "Connection: keep-alive, reusing the same TCP connection across multiple requests.",
    xpReward: 200,
    tasks: [
      { label: "CC Stage 13", type: "CODE" },
    ],
  },
  {
    id: 21, phase: 3, week: 4,
    title: "Refactor + journal + retrospective",
    description: "Clean up code, write a journal entry about what was hard, review how Go's stdlib helped vs hurt.",
    xpReward: 150,
    tasks: [
      { label: "Refactor code", type: "CODE" },
      { label: "Write a journal entry", type: "MILESTONE" },
    ],
  },

  // ── PHASE 4: Codecrafters: Git ─────────────────────────────────────────────
  {
    id: 22, phase: 4, week: 5,
    title: "git init — .git directory structure",
    description: "Create .git/objects, .git/refs, HEAD. Understand the object store before writing to it.",
    xpReward: 200,
    tasks: [
      { label: "CC Stage 1", type: "CODE" },
      { label: "Pro Git ch.10 (Git internals)", type: "BOOK" },
    ],
  },
  {
    id: 23, phase: 4, week: 5,
    title: "Blob objects + SHA-1 hashing",
    description: "Read/write blob objects. crypto/sha1 + compress/zlib + hex encoding = git cat-file -p.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 2–3", type: "CODE" },
    ],
  },
  {
    id: 24, phase: 4, week: 5,
    title: "Tree objects — reading directory structure",
    description: "Binary tree format, mode + name + SHA entries. encoding/binary is your friend here.",
    xpReward: 250,
    tasks: [
      { label: "CC Stages 4–5", type: "CODE" },
    ],
  },
  {
    id: 25, phase: 4, week: 5,
    title: "Write tree + hash-object",
    description: "Walk a directory, recursively build tree objects, write them to .git/objects.",
    xpReward: 250,
    tasks: [
      { label: "CC Stages 6–7", type: "CODE" },
    ],
  },
  {
    id: 26, phase: 4, week: 5,
    title: "Commit objects + git commit-tree",
    description: "Commit format: tree SHA, parent SHA, author, committer, message. Write and read commit objects.",
    xpReward: 200,
    tasks: [
      { label: "CC Stages 8–9", type: "CODE" },
    ],
  },
  {
    id: 27, phase: 4, week: 6,
    title: "Clone over HTTPS — discovery + pack files",
    description: "Smart HTTP protocol, ref discovery via info/refs, requesting pack data.",
    xpReward: 300,
    tasks: [
      { label: "CC Stages 10–11", type: "CODE" },
      { label: "Pro Git §10.6 — transfer protocols", type: "BOOK" },
    ],
  },
  {
    id: 28, phase: 4, week: 6,
    title: "Unpack packfile + checkout working tree",
    description: "Decode pack-file format, reconstruct objects, write working tree to disk. The finish line.",
    xpReward: 300,
    tasks: [
      { label: "CC Stages 12–13", type: "CODE" },
    ],
  },
  {
    id: 29, phase: 4, week: 6,
    title: "Code cleanup + error handling pass",
    description: "Go through both projects. Add proper error wrapping. Document exported functions.",
    xpReward: 150,
    tasks: [
      { label: "Effective Go: re-read data + formatting", type: "BOOK" },
      { label: "Clean up project", type: "CODE" },
    ],
  },
  {
    id: 30, phase: 4, week: 6,
    title: "Final journal + what's next",
    description: "Write your retrospective. What was harder than expected? What clicked? What's the next Go project?",
    xpReward: 500,
    tasks: [
      { label: "Write retrospective", type: "CODE" },
      { label: "Git clone ✓ complete", type: "MILESTONE" },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding curriculum days…");

  for (const day of curriculum) {
    await prisma.curriculumDay.upsert({
      where: { id: day.id },
      update: {
        phase: day.phase,
        week: day.week,
        title: day.title,
        description: day.description,
        xpReward: day.xpReward,
      },
      create: {
        id: day.id,
        phase: day.phase,
        week: day.week,
        title: day.title,
        description: day.description,
        xpReward: day.xpReward,
      },
    });

    // Upsert tasks for this day
    for (const task of day.tasks) {
      const existing = await prisma.task.findFirst({
        where: { dayId: day.id, label: task.label },
      });

      if (existing) {
        await prisma.task.update({
          where: { id: existing.id },
          data: { type: task.type, url: task.url ?? null },
        });
      } else {
        await prisma.task.create({
          data: {
            dayId: day.id,
            label: task.label,
            type: task.type,
            url: task.url ?? null,
          },
        });
      }
    }

    process.stdout.write(`  ✓ Day ${day.id}: ${day.title}\n`);
  }

  console.log("\n✅ Seed complete — 30 days loaded.");
  console.log(
    "\nNote: DayProgress records are created automatically on first login via ensureDayProgressRecords()."
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
