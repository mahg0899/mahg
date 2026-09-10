<div align="center">

# 🧩 MAHG.me

**Personal website, portfolio & blog — built with Next.js 16 and Payload CMS 3.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3-blue?style=flat-square)](https://payloadcms.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[**🌐 Live Site →**](https://mahg.me)

</div>

---

## ✨ Features

- 🎨 **Bento Grid Design** — Modern UI with glassmorphism and micro-animations
- 📝 **Blog** with Lexical rich text editor, auto-generated table of contents & dynamic SEO
- 💼 **Project Portfolio** with banners, tech stack tags and external links
- 📬 **Contact Form** with email delivery via [Resend](https://resend.com)
- 🔍 **Global SEO Settings** configurable from the admin panel (Open Graph, favicon, meta tags)
- 📅 **Cal.com Integration** for scheduling video calls
- 🛡️ **Full Admin Panel** powered by Payload CMS
- 🐳 **Dockerized** and ready to deploy with [Dokploy](https://dokploy.com/)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **CMS** | Payload CMS 3 |
| **Database** | PostgreSQL 15 |
| **Styling** | Tailwind CSS 4 |
| **Language** | TypeScript 5 |
| **Icons** | Font Awesome 7 |
| **Email** | Resend |
| **Deployment** | Docker + Dokploy |

---

## 📁 Project Structure

```
bentomahg/
├── app/
│   ├── (frontend)/          # Public-facing pages
│   │   ├── page.tsx         # Home (bento grid)
│   │   ├── blog/            # Blog with dynamic posts
│   │   ├── portfolio/       # Project showcase
│   │   ├── about/           # About me
│   │   ├── contact/         # Contact form
│   │   └── components/      # Header, Footer
│   ├── (payload)/           # Payload CMS admin panel
│   └── api/                 # API routes (contact, etc.)
├── collections/             # Payload schemas (Posts, Projects, etc.)
├── globals/                 # Global config (SEO, Site Settings)
├── lib/                     # Utilities (getSeoData, etc.)
├── Dockerfile               # Production image
└── payload.config.ts        # Payload configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** 15+ (or Docker to run it locally)

### 1. Clone & Install

```bash
git clone https://github.com/mahg0899/bentomahg.git
cd bentomahg
npm install --legacy-peer-deps
```

### 2. Environment Variables

Create a `.env` file at the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bentomahg

# Payload CMS
PAYLOAD_SECRET=your_secret_here

# Site URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (optional — for the contact form)
RESEND_API_KEY=re_xxxxxxxx
```

### 3. Start the Database (optional, with Docker)

```bash
docker compose up -d
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

---

## 🐳 Docker Deployment

The project includes a multi-stage `Dockerfile` optimized for production:

```bash
docker build -t bentomahg .
docker run -p 3005:3005 --env-file .env bentomahg
```

### Cloudflare R2 media

Production can store public Payload uploads in Cloudflare R2 while development keeps using the local `media/` directory. Configure all of these variables together; a partial configuration is rejected:

```env
S3_BUCKET=mahg-media-production
S3_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
MEDIA_PUBLIC_URL=https://cdn.mahg.me
MEDIA_LOCAL_DIR=/app/media
R2_MEDIA_ENABLED=false
R2_MEDIA_REDIRECT_ENABLED=false
```

Run the migration on the production host, with `MEDIA_LOCAL_DIR` pointing to the existing production media volume. The development workspace's `media/` directory is ignored by Git and must not be uploaded as production data.

```bash
# Preview the inventory without writing to R2
npm run media:migrate:r2 -- --dry-run

# Upload missing objects; existing matching objects are verified
npm run media:migrate:r2

# Confirm that the complete local inventory is available in R2
npm run media:migrate:r2 -- --verify-only
```

The migration preserves filenames and writes only original Payload media beneath `mahg/media/`. Payload does not generate persistent image variants; the Admin and public site reuse the original. Conflicting remote objects are never replaced unless the command is run explicitly with `--overwrite`.

Keep both R2 flags disabled for the first deployment, run the migration against the production media volume, and require a successful `--verify-only` pass. Then set runtime `R2_MEDIA_ENABLED=true` and build argument `R2_MEDIA_REDIRECT_ENABLED=true` before rebuilding; this activates R2 storage and the permanent redirect from legacy `/api/media/file/*` URLs without exposing R2 credentials during the build.

### Required Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Secret key for Payload CMS |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL |
| `NEXT_PUBLIC_SITE_URL` | Site URL (used for SEO) |
| `RESEND_API_KEY` | Resend API key (for contact emails) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with ♥️ by [**MAHG**](https://mahg.me)

</div>
