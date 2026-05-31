# go30

A 30-day gamified learning tracker designed to guide you through Go fundamentals and advanced backend systems via the Codecrafters curriculum.

## Features
- **30-Day Curriculum**: Progress through syntax, core concepts, and build a full HTTP server and Git implementation from scratch.
- **Gamification**: Earn XP, build daily streaks, and unlock days consecutively as you complete tasks.
- **Journal & Snippets**: Integrated daily journaling with debounced auto-save, and a code snippet manager to store learnings.
- **Dashboard & Roadmap**: Visual progress tracking via a 30-day calendar and collapsible curriculum tree.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database ORM**: Prisma 7 + PostgreSQL (via pg adapter)
- **Authentication**: Supabase Auth (SSR)
- **Styling**: Tailwind CSS v4

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

3. **Database Setup & Seeding:**
   Push the schema to your database and load the 30-day curriculum:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to create an account and begin your journey.

## License
MIT
