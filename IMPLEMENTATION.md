# Mercy Dev Studio Implementation Guide

This app is a Next.js portfolio and admin dashboard for a freelance/dev studio. The public site shows services, projects, testimonials, contact options, and WhatsApp entry points. The backend stores projects, contact inquiries, admin users, and visitor conversations in PostgreSQL through Prisma.

## Tech Stack

- Next.js App Router for pages, layouts, API routes, and middleware.
- React client components for interactive forms and admin actions.
- Prisma ORM with PostgreSQL for database access.
- NextAuth credentials auth for admin login.
- Zod for request validation.
- Resend for optional contact form emails.
- Tailwind CSS v4 plus global CSS variables and component-level inline styles.

## Project Structure

- `src/app/page.tsx` composes the public homepage sections.
- `src/components/*` contains the public UI sections such as `Hero`, `Portfolio`, `Contact`, and `Footer`.
- `src/app/admin/*` contains protected admin pages for dashboard stats, projects, messages, and contact inquiries.
- `src/app/api/*/route.ts` contains backend API endpoints.
- `src/lib/db.ts` creates the shared Prisma client.
- `src/lib/auth.ts` defines the NextAuth credentials provider and admin-only session callbacks.
- `src/middleware.ts` protects `/admin/*` pages and redirects non-admin users to `/admin/login`.
- `prisma/schema.prisma` defines the database models.
- `prisma/seed.ts` creates sample projects and an optional admin user.
- `scripts/create-admin.ts` creates or updates an admin user from environment variables.

## Environment Variables

Create `.env` in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
NEXTAUTH_SECRET="a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"

CONTACT_TO_EMAIL="you@example.com"
CONTACT_FROM_EMAIL="Mercy Dev Studio <onboarding@resend.dev>"
RESEND_API_KEY="optional-resend-key"
```

For one-time admin creation:

```bash
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="strong-password"
ADMIN_NAME="Mercy Admin"
```

For seeding an admin with sample data:

```bash
SEED_ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="strong-password"
SEED_ADMIN_NAME="Mercy Admin"
```

## Setup Flow

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run db:generate
```

3. Push the schema to the database:

```bash
npm run db:push
```

4. Create an admin user:

```bash
npm run create-admin
```

5. Optional: seed sample projects:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the admin panel.

## Database Models

`User` stores admin accounts. Only users with `role: ADMIN` can log in.

`Project` stores portfolio entries. Public pages only show projects where `published` is `true`. Featured projects sort first.

`ContactRequest` stores contact form submissions with `UNREAD`, `READ`, or `REPLIED` status.

`Conversation` stores visitor chat threads.

`Message` stores chat messages. `isFromAdmin` identifies the message direction, while `seen` tracks whether visitor messages have been read by the admin.

## Frontend Flow

The homepage is assembled in `src/app/page.tsx`. It is marked dynamic because the `Portfolio` component reads from the database at request time.

`Contact.tsx` is a client component. It manages local form state, posts to `/api/contact`, and shows sending, success, or error states.

`Portfolio.tsx` is a server component. It queries published projects with Prisma and renders cards. This connects the public frontend directly to admin-managed data.

Admin forms such as `admin/projects/new/page.tsx` and `admin/projects/edit/page.tsx` are client components because they manage form state and send `fetch` requests to API routes.

## Backend Flow

`/api/contact` validates form input with Zod, saves the inquiry in `ContactRequest`, then sends emails through Resend if `RESEND_API_KEY` is configured. The route still succeeds locally without Resend, which makes development easier.

`/api/projects` supports public `GET` for published projects and admin-only `POST` for project creation.

`/api/projects/[id]` supports `GET`, admin-only `PUT`, and admin-only `DELETE`.

`/api/contacts/[id]` supports admin-only status updates for inquiries.

`/api/conversations` creates visitor conversations with `POST` and lists conversations for admins with `GET`.

`/api/conversations/[id]` loads a conversation, sends replies, and marks conversations resolved. Message direction is stored in `isFromAdmin`, so read status never changes which side of the chat a message appears on.

## Auth Flow

The admin login page calls `signIn('credentials')` from NextAuth. `src/lib/auth.ts` checks the submitted email and password against the `User` table with bcrypt. Login only succeeds for `ADMIN` users.

NextAuth stores the admin role and user id in the JWT. `src/middleware.ts` checks that role before allowing access to `/admin/*` pages.

## Replicating The App

To rebuild a similar app:

1. Create a Next.js App Router project.
2. Add Prisma, PostgreSQL, NextAuth, Zod, bcrypt, and Resend.
3. Define models for users, projects, contact requests, conversations, and messages.
4. Create a singleton Prisma client in `src/lib/db.ts`.
5. Add credentials auth and protect admin routes with middleware.
6. Build public server components for database-backed content.
7. Build client forms for contact, login, and admin CRUD actions.
8. Put all database writes behind API routes with Zod validation.
9. Add scripts for `db:generate`, `db:push`, `db:seed`, and `create-admin`.
10. Verify with `npm run lint` and `npm run build`.

## Verification

Current checks:

```bash
npm run lint
npm run build
```

Both commands should pass before deploying.
