This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo

- **Production:** https://inventory-module.vercel.app
- **Development:** http://localhost:3000

### Accounts

To access the admin account, use the following credentials:

- Email: `admin@example.com`
- Password: `password`

**THIS CREDENTIAL IS ONLY VALID FOR THE [PRODUCTION DEMO](https://inventory-module.vercel.app)**

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

### Required Environment Variables

- DATABASE_URL - PostgreSQL Database URL
- BETTER_AUTH_SECRET - Authentication Secret Key (Generate One)
- BETTER_AUTH_URL - Host URL (http://localhost:3000)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Language:** TypeScript
- **Backend:** PostgreSQL ([Supabase](https://supabase.com/))
- **Authentication:** [Better Auth](https://better-auth.com/)
- **ORM:** Drizzle ORM
- **UI/Styling:** Shadcn UI Components
- **Deployment Platform:** Vercel

## Assumptions

- Category are strings, no ENUMS are specified in the requirements

## AI Usage

- **AI Tool:** GitHub Copilot
- **What I used them for:** Investigated a bug, reviewed requirements coverage and code quality, highlighting risks and improvements. Added basic testing using Vitest.
- **What I wrote:** Everything except for `/tests/*`
- **What I reviewed and modified:** `/tests/*` directory
- Almost all implementations **except for `/tests/*`** are written entirely by me
