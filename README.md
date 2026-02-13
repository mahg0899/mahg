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

Built with ♥️ by [**MAHG**](https://mahg.me) @ [**Fractalis**](https://fractalis.dev)

</div>
