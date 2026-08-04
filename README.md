# go30

A gamified learning tracker designed to guide you through Go fundamentals and advanced backend systems via the Codecrafters curriculum.

## Features
- **Pluggable Curriculum**: Content-pack architecture allows updating the curriculum without breaking user progress
- **Gamification**: Earn XP, build daily streaks, and unlock days consecutively as you complete tasks
- **Journal & Snippets**: Integrated daily journaling with debounced auto-save and error handling, plus a code snippet manager
- **Dashboard & Roadmap**: Visual progress tracking via calendar and collapsible phase-based curriculum tree with localStorage persistence

## Tech Stack
- **Framework**: Next.js 16 (App Router) with Server Actions
- **Database ORM**: Prisma 7 + PostgreSQL (via pg adapter)
- **Authentication**: Supabase Auth (SSR)
- **Styling**: Tailwind CSS v4
- **Fonts**: Next.js Font Optimization (Inter + JetBrains Mono)

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/NWGKGIT/GoPlan.git
   cd GoPlan
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root with your Supabase credentials and database URLs:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   DATABASE_URL=your_pooled_connection_string
   DIRECT_URL=your_direct_connection_string
   ```

3. **Database Setup & Path Sync:**
   Push the schema to your database and sync the curriculum:
   ```bash
   npx prisma db push
   npm run path:sync
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to create an account and begin your journey.

## Curriculum Management

The curriculum is defined in `content/paths/go30.ts` as a versioned content pack. Each day and task has a stable slug for identity, while labels and descriptions can be freely edited.

**To update the curriculum:**
1. Edit `content/paths/go30.ts`
2. Run `npm run path:sync` to sync changes to the database
3. The sync script validates slugs, maintains user progress, and reports any orphaned completions

**Content pack structure:**
- Phases define major learning blocks with colors and descriptions
- Days contain tasks with stable slugs (`day-01`, `day-01/tour-basics`)
- Milestones mark significant achievements (end of phases, etc.)

## License
MIT
