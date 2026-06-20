# AGENTS.md

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Next.js production build |
| `npm run start` | Production server on port 3005 |
| `npm run lint` | ESLint validation |

## Key Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bentomahg
PAYLOAD_SECRET=your_secret_here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxx  # optional, for contact form
```

## Architecture

- **Framework**: Next.js 16 (App Router) + Payload CMS 3
- **Database**: PostgreSQL (15+)
- **Entry points**:
  - Frontend: `app/(frontend)/` route group
  - Admin: `app/(payload)/` route group → `/admin`
  - API: `app/api/`
- **Collections** (Payload schemas): `collections/` → Posts, Projects, Media, Categories, Pages, Users
- **Globals**: `globals/SiteSettings.ts`
- **Utilities**: `lib/getSeoData.ts`, `lib/utils.ts`

## Quirks & Gotchas

- **TypeScript**: `next.config.ts` has `ignoreBuildErrors: true` — type errors won't block builds
- **Payload**: Wrapped with `withPayload()` in `next.config.ts`
- **Path alias**: Use `@payload-config` to import `payload.config.ts`
- **Uploads**: Server actions allow 250MB body size (videos)
- **Docker**: Production runs on port 3005 (see `npm run start`)
- **No tests**: Project has no test suite configured

## Tech Stack

- Next.js 16.1.6
- Payload CMS 3.76.1
- PostgreSQL + @payloadcms/db-postgres
- Tailwind CSS 4
- React 19.2.3
- TypeScript 5
- Resend (email)
- Font Awesome 7

## Database

Start PostgreSQL with Docker: `docker compose up -d`

## Useful Paths

- Site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Contact API: `app/api/contact/route.ts`