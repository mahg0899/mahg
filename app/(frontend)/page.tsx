import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mahg.me'

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Frontend Developer especializado en React, Next.js y TypeScript. Explora mis proyectos, lee artículos sobre desarrollo web y conoce mi trabajo.',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Bienvenido a MAHG.me',
    description: 'Frontend Developer especializado en React, Next.js y TypeScript. Explora mis proyectos, lee artículos sobre desarrollo web y conoce mi trabajo.',
    url: baseUrl,
    images: [{ url: `${baseUrl}/api/og/static?page=home`, width: 1200, height: 630, alt: 'MAHG.me — Frontend Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bienvenido a MAHG.me',
    description: 'Frontend Developer especializado en React, Next.js y TypeScript. Explora mis proyectos, lee artículos sobre desarrollo web y conoce mi trabajo.',
    images: [`${baseUrl}/api/og/static?page=home`],
  },
}
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import { getMediaSrc, shouldBypassMediaOptimization } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  ChartPie,
  ChevronRight,
  FileText,
  Laptop,
  PenTool,
  Share2,
  Star,
} from "lucide-react";
import { siGithub, siX } from "simple-icons";
import { BrandIcon, linkedinIcon } from "@/components/BrandIcon";

const techStack = [
  { name: "Next.js", icon: "/next.svg", color: "#000000" },
  { name: "Tailwind", icon: "/tailwindcss.svg", color: "#06B6D4" },
  { name: "TypeScript", icon: "/typescript.svg", color: "#3178C6" },
  { name: "Markdown", icon: "/markdown.svg", color: "#000000" }
];

export default async function Home() {

  const payload = await getPayload({ config });
  const latestPosts = await payload.find({
    collection: "posts",
    where: {
      _status: { equals: "published" }
    },
    sort: "-publishedAt",
    limit: 1,
  });
  const latestPost = latestPosts.docs[0];

  const featuredProjects = await payload.find({
    collection: "projects",
    where: {
      isFeatured: { equals: true }
    },
    limit: 1,
  });
  const featuredProject = featuredProjects.docs[0];

  const latestProjects = await payload.find({
    collection: "projects",
    sort: "-createdAt",
    limit: 2,
  });

  let latestProject = latestProjects.docs[0];

  if (featuredProject && latestProject && featuredProject.id === latestProject.id) {
    latestProject = latestProjects.docs[1] || null;
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-11/12 xl:w-6/10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 group/item">
            <div className="bento-card group pt-5 pb-15 p-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-btn/20 rounded-full blur-[50px] -mr-8 -mt-8 transition-all duration-500 group-hover:bg-btn/30"></div>
              <span className="text-2xs font-semibold text-btn uppercase tracking-wider mb-2 block">Asesor Jurídico y Desarrollador</span>
              <h1 className="text-3xl md:text-5xl font-black font-inter leading-none drop-shadow-md">Asesorando con <span className="text-btn">valor</span> y desarrollando con <span className="text-btn">creatividad</span></h1>
              <p className="mt-6 font-semibold text-slate-500 max-w-xl">
                Asesor jurídico y desarrollador con enfoque en la resolución de problemas de manera eficiente y precisa. Buscando brindas las mejores soluciones para cada caso.
              </p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="bento-card group p-6 pt-5 pb-15 h-full">
              <p className="text-3xs font-bold uppercase mb-2 font-inter tracking-wider text-slate-500">Stack Tecnológico</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-4xs font-semibold">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="flex min-w-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-transparent bg-contrast/50 px-1 py-3 text-center transition-all duration-300 hover:border-btn hover:bg-contrast"
                  >
                    <div
                      className="size-5 shrink-0"
                      style={{
                        backgroundColor: tech.color,
                        maskImage: `url(${tech.icon})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskImage: `url(${tech.icon})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <span className="max-w-full leading-tight whitespace-nowrap">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 xl:w-6/10 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bento-card group p-6">
            <h3 className="text-2xs font-bold text-slate-500 uppercase tracking-widest mb-6">Lo que hago</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-btn">
                  <Laptop className="size-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Desarrollo Web</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Aplicaciones, sitios web, landing pages.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-btn">
                  <PenTool className="size-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Diseño de Interfaces</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Maquetación y diseño de interfaces para aplicaciones y sitios web.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-btn">
                  <Share2 className="size-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Asesoramiento Jurídico</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Resolución de dudas y acompañamiento jurídico para tus proyectos.</p>
                </div>
              </div>
            </div>
          </div>

          {latestProject ? (
            <Link href="/portfolio" className="bento-card group col-span-1 md:col-span-2 lg:col-span-2 flex flex-col">
              <div className="h-48 w-full bg-contrast overflow-hidden relative">
                {latestProject.banner && typeof latestProject.banner !== "string" && (
                  <Image src={getMediaSrc((latestProject.banner as Media).url)} alt={latestProject.title} fill sizes="(max-width: 768px) 100vw, 50vw" unoptimized={shouldBypassMediaOptimization((latestProject.banner as Media).url)} className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                {!latestProject.banner && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <Laptop className="text-slate-600 size-16 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-btn/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-btn transition-colors">{latestProject.title}</h3>
                  <ArrowUpRight className="text-btn size-4" />
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {latestProject.description}
                </p>
                <div className="mt-auto flex gap-2">
                  {latestProject.techStack?.map((t: any, i: number) => (
                    <span key={i} className="bg-contrast text-btn text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-main/25">
                      {t.tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/portfolio" className="bento-card group col-span-1 md:col-span-2 lg:col-span-2 flex flex-col">
              <div className="h-48 w-full bg-contrast overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Laptop className="text-slate-600 size-16 opacity-20" />
                </div>
                <div className="absolute inset-0 bg-btn/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-btn transition-colors">Lorem ipsum dolor sit amet</h3>
                  <ArrowUpRight className="text-btn size-4" />
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
                <div className="mt-auto flex gap-2">
                  {["LOREM", "LOREM", "LOREM"].map((tag, i) => (
                    <span key={i} className="bg-contrast text-btn text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-main/25">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )}
          {latestPost ? (
            <Link href={`/blog/${latestPost.slug}`} className="bento-card group p-6 flex flex-col justify-between h-full min-h-[240px]">
              <span className="bg-contrast text-white text-[10px] font-bold px-3 py-1 rounded w-fit mb-4 uppercase tracking-wider backdrop-blur-sm self-start">
                Último Blog
              </span>
              <h3 className="text-xl font-extrabold text-white leading-tight mb-4 line-clamp-3">
                {latestPost.title}
              </h3>
              <div className="flex items-end justify-between mt-auto w-full">
                <span className="text-slate-500 text-xs font-semibold">
                  {new Date(latestPost.publishedAt || Date.now()).toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <div className="relative flex items-center justify-center">
                  <div className="absolute flex items-center justify-center">
                    <FileText className="text-slate-800 size-40 opacity-50 rotate-12 -translate-x-10 -translate-y-6 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-110" />
                  </div>
                  <div className="relative z-10 flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="text-btn size-4" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bento-card group p-6 flex items-center justify-center">
              <p className="text-slate-500 text-sm">No hay post disponibles😔</p>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto w-11/12 xl:w-6/10 pt-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProject ? (
            <Link href="/portfolio" className="bento-card group p-6 col-span-1 md:col-span-3 lg:col-span-2 flex items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-contrast to-background border border-main/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                {featuredProject.banner && typeof featuredProject.banner !== "string" && (
                  <Image src={getMediaSrc((featuredProject.banner as Media).url)} alt={featuredProject.title} fill sizes="96px" unoptimized={shouldBypassMediaOptimization((featuredProject.banner as Media).url)} className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                {!featuredProject.banner && <ChartPie className="text-btn size-8 opacity-80" />}
                <div className="absolute inset-0 bg-btn/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-btn/10 p-1 rounded-full w-4 h-4 flex items-center justify-center">
                    <Star className="text-btn size-2" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Proyecto Destacado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-btn transition-colors">
                    {featuredProject.title}
                  </h3>
                  <ArrowUpRight className="text-white group-hover:text-btn transition-colors size-4" />
                </div>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>
            </Link>
          ) : (
            <Link href="/portfolio" className="bento-card group p-6 col-span-1 md:col-span-3 lg:col-span-2 flex items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-contrast to-background border border-main/25 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <ChartPie className="text-btn size-8 opacity-80" />
                <div className="absolute inset-0 bg-btn/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-btn/10 p-1 rounded-full w-4 h-4 flex items-center justify-center">
                    <Star className="text-btn size-2" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Proyecto Destacado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-btn transition-colors">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <ArrowUpRight className="text-white group-hover:text-btn transition-colors size-4" />
                </div>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
              </div>
            </Link>
          )}
          <div className="bento-card group p-6 md:col-span-2 lg:col-span-1">
            <p className="text-2xs font-bold text-slate-500 uppercase tracking-widest mb-15">Soft Skills</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Resolución de problemas", "Trabajo en equipo", "Liderazgo"].map((tag, i) => (
                <span key={i} className="text-[10px] bg-contrast px-2 py-1 rounded font-semibold border border-main/25">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bento-card group text-btn p-6 col-span-1 md:col-span-1 row-span-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center border-r border-main/25">
              <p className="text-2xl font-black text-primary">3+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Años</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-black text-primary">20+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Proyectos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 xl:w-6/10 pt-35 pb-15">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bento-card group pt-10 pb-10 p-6 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">¿Comenzamos un proyecto?</h2>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">Si tienes alguna idea en mente o necesitas ayuda con algún proyecto, no dudes en contactarme.</p>
              </div>
              <div className="flex justify-end items-center">
                <Link href="/contact" className="btn-primary mt-4">
                  Contactarme
                  <ChevronRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bento-card group p-6 col-span-1 md:col-span-1 flex flex-col justify-center gap-8">
            <h2 className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Conecta</h2>
            <div className="flex items-center justify-center gap-8">
              <a href="https://www.linkedin.com/in/mahg0899/" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-btn/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <BrandIcon icon={linkedinIcon} className="relative z-10 text-slate-600 group-hover/icon:text-btn transition-colors size-8" />
              </a>
              <a href="https://github.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <BrandIcon icon={siGithub} className="relative z-10 text-slate-600 group-hover/icon:text-white transition-colors size-8" />
              </a>
              <a href="https://x.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <BrandIcon icon={siX} className="relative z-10 text-slate-600 group-hover/icon:text-sky-400 transition-colors size-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
