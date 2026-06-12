# Mercy Dev Studio

A Next.js portfolio site with a Prisma/PostgreSQL backend, contact form, project CMS, admin authentication, and visitor message management.

## Quick Start

```bash
npm install
npm run db:generate
npm run db:push
npm run create-admin
npm run dev
```

Public site: `http://localhost:3000`

Admin login: `http://localhost:3000/admin/login`

## Required Environment

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
NEXTAUTH_SECRET="a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="strong-password"
ADMIN_NAME="Mercy Admin"
```

Optional email delivery:

```bash
RESEND_API_KEY="your-resend-key"
CONTACT_TO_EMAIL="you@example.com"
CONTACT_FROM_EMAIL="Mercy Dev Studio <onboarding@resend.dev>"
```

## Scripts

```bash
npm run dev          # Start local development
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Seed sample data
npm run create-admin # Create/update an admin user
```

For the full frontend/backend walkthrough and replication guide, read `IMPLEMENTATION.md`.
