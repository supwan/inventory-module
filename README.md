This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup Process

This project uses [Bun](https://bun.com/) as a package manager instead of NPM

```bash
# 1: install dependecies
bun install

# 2: push schema to the database, Supabase (Postgresql) was used in this project
bunx drizzle-kit push

# 3: run next.js development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Language:** TypeScript
- **Backend:** PostgreSQL ([Supabase](https://supabase.com/))
- **UI/Styling:** Shadcn UI Components
- **ORM:** Drizzle ORM

## Assumptions

- No rate limiting required for this demo
- Category are strings, no ENUMS are specified in the requirements
- Designed for desktops instead of mobile

## AI Usage

**This codebase is 95% handwritten entirely without the help of AI Tools.**

- **AI Tool:** GitHub Copilot
- **What you used them for:** Implementing basic testing
- I reviewed and modified `/test` directory. Everything else is written by me without the help of AI Tools
