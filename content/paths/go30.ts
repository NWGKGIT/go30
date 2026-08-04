/**
 * Go 30-Day Learning Path
 *
 * This is the single source of truth for the curriculum.
 * - Slugs are stable identifiers — labels/descriptions/ordering can change freely
 * - Phases and milestones are defined here, not hardcoded in UI components
 * - Edit this file, then run `npm run path:sync` to update the database
 */

export interface PathTask {
  slug: string;
  label: string;
  type: 'BOOK' | 'TOUR' | 'CODE' | 'MILESTONE';
  url?: string;
}

export interface PathDay {
  slug: string;
  dayNumber: number;
  phase: number;
  week: number;
  title: string;
  description: string;
  xpReward: number;
  tasks: PathTask[];
}

export interface PathPhase {
  number: number;
  label: string;
  description: string;
  colorToken: string; // CSS variable name from globals.css
  dayRange: [number, number]; // inclusive
}

export interface PathMilestone {
  dayNumber: number;
  label: string;
}

export interface PathDefinition {
  slug: string;
  version: string;
  title: string;
  description: string;
  phases: PathPhase[];
  milestones: PathMilestone[];
  days: PathDay[];
}

export const go30Path: PathDefinition = {
  slug: 'go-30',
  version: '1.0.0',
  title: '30-Day Go Learning Journey',
  description: 'A comprehensive path from Go syntax to building HTTP servers and Git implementations via Codecrafters.',

  phases: [
    {
      number: 1,
      label: 'Syntax Sprint',
      description: 'Days 1–4 · Language fundamentals',
      colorToken: 'accent-blue',
      dayRange: [1, 4],
    },
    {
      number: 2,
      label: 'Core Concepts',
      description: 'Days 5–12 · Interfaces, concurrency, standard library',
      colorToken: 'accent-purple',
      dayRange: [5, 12],
    },
    {
      number: 3,
      label: 'HTTP Server Project',
      description: 'Days 13–21 · Build an HTTP/1.1 server from scratch',
      colorToken: 'accent-amber',
      dayRange: [13, 21],
    },
    {
      number: 4,
      label: 'Git Implementation',
      description: 'Days 22–30 · Build Git internals and clone protocol',
      colorToken: 'accent-green',
      dayRange: [22, 30],
    },
  ],

  milestones: [
    { dayNumber: 4, label: 'Syntax Complete — Structs & Methods' },
    { dayNumber: 12, label: 'Concurrency Mastery — Goroutines & Channels' },
    { dayNumber: 21, label: 'HTTP Server Complete — Codecrafters' },
    { dayNumber: 30, label: 'Git Implementation Complete — Final Retrospective' },
  ],

  days: [
    // ── PHASE 1: Syntax Sprint (Days 1–4) ──────────────────────────────────────
    {
      slug: 'day-01',
      dayNumber: 1,
      phase: 1,
      week: 1,
      title: 'Tooling + hello world + types',
      description: 'Install Go, set up project structure. Basic types, variables, zero values, constants, fmt package.',
      xpReward: 100,
      tasks: [
        { slug: 'tour-basics', label: 'Go Tour: Basics 1–13', type: 'TOUR', url: 'https://go.dev/tour/basics/1' },
        { slug: 'tgpl-ch1-2', label: 'TGPL ch.1–2', type: 'BOOK' },
        { slug: 'code-programs', label: 'Write: 5 small programs', type: 'CODE' },
      ],
    },
    {
      slug: 'day-02',
      dayNumber: 2,
      phase: 1,
      week: 1,
      title: 'Control flow + functions',
      description: 'for loops (only loop), if/else, switch, functions, multiple return values, named returns.',
      xpReward: 100,
      tasks: [
        { slug: 'tour-flow', label: 'Go Tour: Flow control 1–14', type: 'TOUR', url: 'https://go.dev/tour/flowcontrol/1' },
        { slug: 'tgpl-ch3', label: 'TGPL ch.3', type: 'BOOK' },
        { slug: 'code-exercises', label: 'Write: FizzBuzz, Fibonacci, word counter', type: 'CODE' },
      ],
    },
    {
      slug: 'day-03',
      dayNumber: 3,
      phase: 1,
      week: 1,
      title: 'Arrays, slices, maps, strings',
      description: 'Slice internals (len, cap, append), maps, range, string iteration.',
      xpReward: 100,
      tasks: [
        { slug: 'tour-types', label: 'Go Tour: More types 1–18', type: 'TOUR', url: 'https://go.dev/tour/moretypes/1' },
        { slug: 'tgpl-ch4', label: 'TGPL ch.4', type: 'BOOK' },
        { slug: 'code-collections', label: 'Write: frequency counter, matrix ops', type: 'CODE' },
      ],
    },
    {
      slug: 'day-04',
      dayNumber: 4,
      phase: 1,
      week: 1,
      title: 'Structs, pointers, methods',
      description: 'Structs, pointer vs value receivers, embedding. Go has no classes — this is how OOP is replaced.',
      xpReward: 150,
      tasks: [
        { slug: 'tour-methods', label: 'Go Tour: Methods 1–13', type: 'TOUR', url: 'https://go.dev/tour/methods/1' },
        { slug: 'effective-go-names', label: 'Effective Go: names, commentary', type: 'BOOK', url: 'https://go.dev/doc/effective_go#names' },
        { slug: 'code-data-structures', label: 'Write: linked list, stack using structs', type: 'CODE' },
      ],
    },

    // ── PHASE 2: Core Concepts (Days 5–12) ─────────────────────────────────────
    {
      slug: 'day-05',
      dayNumber: 5,
      phase: 2,
      week: 2,
      title: 'Interfaces',
      description: 'Implicit interfaces, io.Reader/Writer/fmt.Stringer, empty interface, type assertions, type switches.',
      xpReward: 120,
      tasks: [
        { slug: 'tour-interfaces', label: 'Go Tour: Interfaces 1–14', type: 'TOUR', url: 'https://go.dev/tour/methods/9' },
        { slug: 'effective-go-interfaces', label: 'Effective Go: interfaces', type: 'BOOK', url: 'https://go.dev/doc/effective_go#interfaces' },
        { slug: 'code-interfaces', label: 'Implement: custom io.Reader, Stringer', type: 'CODE' },
      ],
    },
    {
      slug: 'day-06',
      dayNumber: 6,
      phase: 2,
      week: 2,
      title: 'Error handling',
      description: 'error interface, custom errors, errors.Is/As, wrapping with fmt.Errorf %w.',
      xpReward: 120,
      tasks: [
        { slug: 'tgpl-ch5-errors', label: 'TGPL ch.5 (errors section)', type: 'BOOK' },
        { slug: 'effective-go-errors', label: 'Effective Go: errors', type: 'BOOK', url: 'https://go.dev/doc/effective_go#errors' },
        { slug: 'code-errors', label: 'Write: multi-layered error chain', type: 'CODE' },
      ],
    },
    {
      slug: 'day-07',
      dayNumber: 7,
      phase: 2,
      week: 2,
      title: 'Packages, modules, testing',
      description: 'go mod, package structure, exported vs unexported, go test basics, table-driven tests.',
      xpReward: 120,
      tasks: [
        { slug: 'tgpl-ch10-11', label: 'TGPL ch.10–11', type: 'BOOK' },
        { slug: 'code-tests', label: 'Write: test suite for your week 1 programs', type: 'CODE' },
      ],
    },
    {
      slug: 'day-08',
      dayNumber: 8,
      phase: 2,
      week: 2,
      title: 'net/http client + server basics',
      description: 'http.ListenAndServe, http.Handler, ServeMux, ResponseWriter, Request.',
      xpReward: 150,
      tasks: [
        { slug: 'net-http-docs', label: 'go.dev/pkg/net/http docs', type: 'BOOK', url: 'https://pkg.go.dev/net/http' },
        { slug: 'code-http-server', label: 'Build: tiny HTTP server with 3 routes', type: 'CODE' },
      ],
    },
    {
      slug: 'day-09',
      dayNumber: 9,
      phase: 2,
      week: 2,
      title: 'os, bufio, io — file I/O',
      description: 'os.Open, bufio.Scanner, io.ReadAll, os.Args.',
      xpReward: 120,
      tasks: [
        { slug: 'tgpl-ch7-io', label: 'TGPL ch.7 (I/O)', type: 'BOOK' },
        { slug: 'code-file-io', label: 'Build: file word-count CLI tool', type: 'CODE' },
      ],
    },
    {
      slug: 'day-10',
      dayNumber: 10,
      phase: 2,
      week: 2,
      title: 'encoding/binary, crypto/sha1, compress/zlib',
      description: 'Binary read/write, hashing, compression.',
      xpReward: 120,
      tasks: [
        { slug: 'pkg-docs', label: 'go.dev/pkg docs for each package', type: 'BOOK', url: 'https://pkg.go.dev/' },
        { slug: 'code-hasher', label: 'Build: file hasher + compressor', type: 'CODE' },
      ],
    },
    {
      slug: 'day-11',
      dayNumber: 11,
      phase: 2,
      week: 3,
      title: 'Goroutines + channels',
      description: 'go keyword, channel direction, buffered vs unbuffered, select.',
      xpReward: 150,
      tasks: [
        { slug: 'tour-concurrency', label: 'Go Tour: Concurrency 1–9', type: 'TOUR', url: 'https://go.dev/tour/concurrency/1' },
        { slug: 'effective-go-goroutines', label: 'Effective Go: goroutines + channels', type: 'BOOK', url: 'https://go.dev/doc/effective_go#goroutines' },
        { slug: 'code-downloader', label: 'Write: concurrent file downloader', type: 'CODE' },
      ],
    },
    {
      slug: 'day-12',
      dayNumber: 12,
      phase: 2,
      week: 3,
      title: 'sync package + race conditions',
      description: 'sync.Mutex, sync.WaitGroup, go run -race.',
      xpReward: 150,
      tasks: [
        { slug: 'tgpl-ch9', label: 'TGPL ch.9', type: 'BOOK' },
        { slug: 'code-sync', label: 'Write: thread-safe counter, fan-out worker pool', type: 'CODE' },
      ],
    },

    // ── PHASE 3: HTTP Server Project (Days 13–21) ──────────────────────────────
    {
      slug: 'day-13',
      dayNumber: 13,
      phase: 3,
      week: 3,
      title: 'Bind a TCP socket, accept connections',
      description: 'net.Listen, net.Conn, accept loop. The raw socket layer before HTTP sits on top.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-1', label: 'CC Stage 1', type: 'CODE' },
        { slug: 'rfc-7230', label: 'RFC 7230 — read §2–3', type: 'BOOK', url: 'https://datatracker.ietf.org/doc/html/rfc7230' },
      ],
    },
    {
      slug: 'day-14',
      dayNumber: 14,
      phase: 3,
      week: 3,
      title: 'Parse HTTP/1.1 request line + headers',
      description: 'bufio.Reader, manual parsing of method / path / HTTP version and header key-value pairs.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-2-3', label: 'CC Stages 2–3', type: 'CODE' },
      ],
    },
    {
      slug: 'day-15',
      dayNumber: 15,
      phase: 3,
      week: 3,
      title: 'Write HTTP responses',
      description: 'Status line, headers, body. Return 200, 404, and custom text responses correctly.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-4-5', label: 'CC Stages 4–5', type: 'CODE' },
      ],
    },
    {
      slug: 'day-16',
      dayNumber: 16,
      phase: 3,
      week: 3,
      title: 'URL routing + path parameters',
      description: 'strings.Split, route matching, extracting /echo/:str, /files/:filename style params manually.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-6-7', label: 'CC Stages 6–7', type: 'CODE' },
      ],
    },
    {
      slug: 'day-17',
      dayNumber: 17,
      phase: 3,
      week: 4,
      title: 'Request body + POST handling',
      description: 'io.ReadAll on body, Content-Length, POST /files — write to disk. Real server behavior.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-8-9', label: 'CC Stages 8–9', type: 'CODE' },
      ],
    },
    {
      slug: 'day-18',
      dayNumber: 18,
      phase: 3,
      week: 4,
      title: 'Concurrent connections via goroutines',
      description: 'go handleConn(conn) — each connection in its own goroutine. Watch it with -race.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-10', label: 'CC Stage 10', type: 'CODE' },
      ],
    },
    {
      slug: 'day-19',
      dayNumber: 19,
      phase: 3,
      week: 4,
      title: 'gzip compression + Accept-Encoding',
      description: 'compress/gzip, Content-Encoding header, conditional compression. Advanced but satisfying.',
      xpReward: 250,
      tasks: [
        { slug: 'cc-stage-11-12', label: 'CC Stages 11–12', type: 'CODE' },
      ],
    },
    {
      slug: 'day-20',
      dayNumber: 20,
      phase: 3,
      week: 4,
      title: 'Persistent connections + keep-alive',
      description: 'Connection: keep-alive, reusing the same TCP connection across multiple requests.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-stage-13', label: 'CC Stage 13', type: 'CODE' },
      ],
    },
    {
      slug: 'day-21',
      dayNumber: 21,
      phase: 3,
      week: 4,
      title: 'Refactor + journal + retrospective',
      description: 'Clean up code, write a journal entry about what was hard, review how Go stdlib helped vs hurt.',
      xpReward: 150,
      tasks: [
        { slug: 'refactor', label: 'Refactor code', type: 'CODE' },
        { slug: 'journal', label: 'Write a journal entry', type: 'MILESTONE' },
      ],
    },

    // ── PHASE 4: Git Implementation (Days 22–30) ───────────────────────────────
    {
      slug: 'day-22',
      dayNumber: 22,
      phase: 4,
      week: 5,
      title: 'git init — .git directory structure',
      description: 'Create .git/objects, .git/refs, HEAD. Understand the object store before writing to it.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-git-stage-1', label: 'CC Stage 1', type: 'CODE' },
        { slug: 'pro-git-ch10', label: 'Pro Git ch.10 (Git internals)', type: 'BOOK', url: 'https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain' },
      ],
    },
    {
      slug: 'day-23',
      dayNumber: 23,
      phase: 4,
      week: 5,
      title: 'Blob objects + SHA-1 hashing',
      description: 'Read/write blob objects. crypto/sha1 + compress/zlib + hex encoding = git cat-file -p.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-git-stage-2-3', label: 'CC Stages 2–3', type: 'CODE' },
      ],
    },
    {
      slug: 'day-24',
      dayNumber: 24,
      phase: 4,
      week: 5,
      title: 'Tree objects — reading directory structure',
      description: 'Binary tree format, mode + name + SHA entries. encoding/binary is your friend here.',
      xpReward: 250,
      tasks: [
        { slug: 'cc-git-stage-4-5', label: 'CC Stages 4–5', type: 'CODE' },
      ],
    },
    {
      slug: 'day-25',
      dayNumber: 25,
      phase: 4,
      week: 5,
      title: 'Write tree + hash-object',
      description: 'Walk a directory, recursively build tree objects, write them to .git/objects.',
      xpReward: 250,
      tasks: [
        { slug: 'cc-git-stage-6-7', label: 'CC Stages 6–7', type: 'CODE' },
      ],
    },
    {
      slug: 'day-26',
      dayNumber: 26,
      phase: 4,
      week: 5,
      title: 'Commit objects + git commit-tree',
      description: 'Commit format: tree SHA, parent SHA, author, committer, message. Write and read commit objects.',
      xpReward: 200,
      tasks: [
        { slug: 'cc-git-stage-8-9', label: 'CC Stages 8–9', type: 'CODE' },
      ],
    },
    {
      slug: 'day-27',
      dayNumber: 27,
      phase: 4,
      week: 6,
      title: 'Clone over HTTPS — discovery + pack files',
      description: 'Smart HTTP protocol, ref discovery via info/refs, requesting pack data.',
      xpReward: 300,
      tasks: [
        { slug: 'cc-git-stage-10-11', label: 'CC Stages 10–11', type: 'CODE' },
        { slug: 'pro-git-transfer', label: 'Pro Git §10.6 — transfer protocols', type: 'BOOK', url: 'https://git-scm.com/book/en/v2/Git-Internals-Transfer-Protocols' },
      ],
    },
    {
      slug: 'day-28',
      dayNumber: 28,
      phase: 4,
      week: 6,
      title: 'Unpack packfile + checkout working tree',
      description: 'Decode pack-file format, reconstruct objects, write working tree to disk. The finish line.',
      xpReward: 300,
      tasks: [
        { slug: 'cc-git-stage-12-13', label: 'CC Stages 12–13', type: 'CODE' },
      ],
    },
    {
      slug: 'day-29',
      dayNumber: 29,
      phase: 4,
      week: 6,
      title: 'Code cleanup + error handling pass',
      description: 'Go through both projects. Add proper error wrapping. Document exported functions.',
      xpReward: 150,
      tasks: [
        { slug: 'effective-go-review', label: 'Effective Go: re-read data + formatting', type: 'BOOK', url: 'https://go.dev/doc/effective_go' },
        { slug: 'cleanup', label: 'Clean up project', type: 'CODE' },
      ],
    },
    {
      slug: 'day-30',
      dayNumber: 30,
      phase: 4,
      week: 6,
      title: 'Final journal + what\'s next',
      description: 'Write your retrospective. What was harder than expected? What clicked? What is the next Go project?',
      xpReward: 500,
      tasks: [
        { slug: 'retrospective', label: 'Write retrospective', type: 'CODE' },
        { slug: 'complete', label: 'Git clone ✓ complete', type: 'MILESTONE' },
      ],
    },
  ],
};
