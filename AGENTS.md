# AGENTS.md — MAHG.me

## Purpose and boundaries

MAHG.me is a Spanish-language personal portfolio and blog. It is a Next.js App Router application whose content and administration are provided by Payload CMS backed by PostgreSQL.

- Preserve the existing visual language: dark bento cards, blue accent (`--btnColor`), Spanish copy, and Font Awesome icons.
- Content is primarily managed from Payload; do not hard-code CMS content unless the task expressly calls for it.
- Do not alter generated, runtime, or user data: `payload-types.ts`, `media/`, `.next/`, `node_modules/`, `.env`, or `*.tsbuildinfo`.
- `media/` is the local Payload upload directory and is intentionally ignored by Git.

## Commands

| Command | Use |
|---|---|
| `npm run dev` | Start local development on port 3000. |
| `npm run lint` | Run ESLint across the project. |
| `npm run media:migrate:r2 -- --dry-run` | Inventory the Payload media migration without uploading. |
| `npm run media:migrate:r2` | Copy missing original Payload media to R2. |
| `npm run media:migrate:r2 -- --verify-only` | Verify that every local Payload media file exists correctly in R2. |
| `npm run build` | Create the production Next.js build; requires a reachable Payload/PostgreSQL configuration for DB-backed routes. |
| `npm run start` | Run the production build on port 3005. |
| `docker compose up -d` | Start local PostgreSQL (mapped to host port 54320). |

There is no automated test suite. Run lint after focused changes; run a production build for route, Payload configuration, or deployment changes when the database/environment is available.

## Local configuration

Required environment variables live in the root `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bentomahg
PAYLOAD_SECRET=long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxx # optional; required only to send contact form email
S3_BUCKET=mahg-media-production # production media on Cloudflare R2
S3_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=secret
S3_SECRET_ACCESS_KEY=secret
MEDIA_PUBLIC_URL=https://cdn.mahg.me
MEDIA_LOCAL_DIR=/app/media # set only for migration; must point to production media
R2_MEDIA_ENABLED=false # runtime storage flag; set true only after successful migration
R2_MEDIA_REDIRECT_ENABLED=false # Docker build arg for the legacy URL redirect
```

- The Docker Compose database uses the `mahg` / `bentomahg` database and exposes PostgreSQL on `localhost:54320`.
- Payload uploads are stored in `media/` locally. In production, complete R2 variables plus `R2_MEDIA_ENABLED=true` enable Cloudflare R2 and publish files at `cdn.mahg.me/mahg/media/`.
- Production Docker listens on port 3005. The Docker build receives DB/Payload/site variables as build arguments because some routes initialize Payload during the build. The current build configuration is intentionally adapted to the VPS/Cloudflare deployment.

## Architecture and route map

### Public site — `app/(frontend)/`

- `layout.tsx`: shared header/footer, global styles, Google fonts, and CMS-driven global metadata.
- `page.tsx`: home bento grid; fetches latest post plus featured/latest projects from Payload.
- `about/`, `contact/`, `portfolio/`: static/public-facing sections; `contact/ContactForm.tsx` posts to `/api/contact`.
- `blog/page.tsx`: published-post listing, categories and featured post.
- `blog/[slug]/page.tsx`: blog detail, rich-text rendering, related posts, table of contents, sharing, and dynamic SEO.
- `blog/[slug]/opengraph-image.tsx`: Next.js file-based OG image for an individual post.
- `components/`: only site-shell components (`header`, `footer`, `MahgLogo`).
- `globals.css`: Tailwind v4 entry point, theme tokens and Plyr overrides. `styles.css` is legacy-style CSS and is not imported by the current public layout.

### Payload CMS — `app/(payload)/` and root configuration

- `payload.config.ts`: the central Payload configuration; registers collections, the `site-settings` global, rich-text blocks, admin custom components, database adapter, `sharp`, and nested-pages plugin.
- `app/(payload)/admin/[[...segments]]/`: Payload Admin at `/admin`.
- `app/(payload)/api/`: Payload REST, GraphQL, and GraphQL playground endpoints.
- `collections/`: `Users` (authentication), `Media` (uploads), `Posts` (drafts + Lexical content), `Categories`, `Projects`, and `Pages` (nested-docs plugin).
- `globals/SiteSettings.ts`: global metadata, social cards, favicon and theme configuration.
- `components/admin/` and root `components/{Dashboard,CustomNavHeader,PreviewLink}.tsx`: Payload Admin UI registered through `payload.config.ts` or collection configuration.

### Shared UI and utilities

- Root `components/`: blog cards/filtering, rich-text renderer, media/video/gallery rendering, post utilities, and admin components. Keep server/client boundaries intact; client interactivity is deliberately contained in components such as filters, sharing, video and contact form.
- `components/RichText/index.tsx`: renderer for Payload Lexical content, including YouTube, code, uploads and image-gallery blocks defined in `payload.config.ts`.
- `lib/getSeoData.ts`: reads the `site-settings` global for root metadata.
- `lib/og-static.tsx` plus `app/api/og/static/route.tsx`: reusable static OG image generator.
- `app/api/og/[slug]/route.tsx`: dynamic OG card for posts; reads local font/logo files from `public/`.
- `utils/readingTime.ts`: blog reading-time helper.

### Other application endpoints

- `app/api/contact/route.ts`: JSON POST endpoint that validates email/message, uses an in-memory per-IP rate limiter (5 requests/hour per process), and sends with Resend.
- `app/sitemap.ts` and `app/robots.ts`: SEO metadata routes. Sitemap queries published posts at request time.
- `instrumentation.ts`: initializes Payload in the Node.js runtime.
- `scripts/migrate-media-to-r2.ts`: idempotent migration/verification utility for original media files only; run through `npm run media:migrate:r2`.
- The `media` collection intentionally has no `imageSizes`: Payload stores one original per upload, and both the Admin thumbnail and public site reuse that URL. Do not reintroduce persistent variants without an explicit storage tradeoff decision.
- Run the R2 migration on the production host with `MEDIA_LOCAL_DIR` pointing to its real persistent media volume. Never upload the development workspace's `media/` contents.
- Deploy and migrate first with both R2 flags set to `false`. After `--verify-only` succeeds, set runtime `R2_MEDIA_ENABLED=true` and build argument `R2_MEDIA_REDIRECT_ENABLED=true`, then rebuild.
- R2 migration conflicts are not overwritten by default. Inspect them first, then use `npm run media:migrate:r2 -- --overwrite` only when replacement is intended.

## Implementation conventions

- Use TypeScript and the aliases `@/*` and `@payload-config` (`payload.config.ts`).
- Use Tailwind utilities and existing CSS tokens in `app/(frontend)/globals.css`; avoid introducing a parallel styling system.
- Use `getPayload({ config })` in server-side routes/pages that query CMS data.
- Model media as Payload `Media` objects and use `getMediaSrc` from `lib/utils.ts` where existing UI does so.
- Public post reads must respect `_status: 'published'`; drafts are supported in `Posts`.
- If a change affects a Payload collection/global/block, update/re-generate `payload-types.ts` using the project’s established Payload workflow, but do not hand-edit it.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true` intentionally: production builds in the VPS/Cloudflare deployment previously failed otherwise. Do not remove or change this setting without validating the complete production build and deployment path. A successful build is therefore not proof that types are correct; treat TypeScript diagnostics and lint findings as meaningful.

## Known operational caveats

- The project currently has no migrations directory committed, while `payload.config.ts` enables `push: true`; inspect schema/deployment implications before changing collections.
- Remote images are intentionally limited in `next.config.ts` to `localhost`, `mahg.me`, `cdn.mahg.me/mahg/media/**`, and GitHub avatars. Add hosts explicitly if a task introduces remote media.
- `/api/contact` interpolates submitted fields into its HTML email. Any security hardening task should address output escaping and proxy/IP semantics together, not piecemeal.
- The repository may be owned by a different Windows SID; Git may report “dubious ownership.” Do not change global Git settings unless the user explicitly authorizes it.

## Review checklist

- Public UI: responsive at mobile, tablet and desktop widths; preserve header/footer coverage and Spanish text encoding.
- CMS changes: verify fields, admin registration/import map, collection/global use, and relationship depth.
- SEO changes: check root metadata, page canonical URLs, `sitemap.ts`, `robots.ts`, and both OG image paths.
- Deployment changes: preserve the validated VPS/Cloudflare build behavior; check `Dockerfile`, `docker-compose.yml`, required env vars, the externally managed media storage, and port 3005.
