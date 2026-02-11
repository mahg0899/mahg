import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faLaptopCode,
  faPenRuler,
  faShareNodes,
  faArrowRight,
  faFileLines,
  faArrowUpRightFromSquare,
  faStar,
  faChartPie,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const techStack = [
  { name: "React", icon: "/react.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "/next.svg", color: "#000000" },
  { name: "Tailwind", icon: "/tailwindcss.svg", color: "#06B6D4" },
  { name: "TypeScript", icon: "/typescript.svg", color: "#3178C6" },
  { name: "Markdown", icon: "/markdown.svg", color: "#000000" },
  { name: "Wordpress", icon: "/wordpress.svg", color: "#11749E" }
];

export default async function Home() {
  // Data Fetching
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
            <div className="relative overflow-hidden bg-bento dark:bg-bento pt-5 pb-15 rounded-lg p-10 border border-main/25 hover: transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-btn/20 rounded-full blur-[50px] -mr-8 -mt-8 transition-all duration-500 group-hover:bg-btn/30"></div>
              <span className="text-2xs font-semibold text-btn uppercase tracking-wider mb-2 block">Frontend Developer</span>
              <p className="text-3xl md:text-5xl font-black font-inter leading-none drop-shadow-md">Desarrollando soluciones digitales con <span className="text-btn">precisión</span> y creatividad</p>
              <p className="mt-6 font-semibold text-slate-500 max-w-xl">
                Desarrollador especializado en frontend con experiencia en React, Next.js, Tailwind CSS y TypeScript.
              </p>
              <a href="/cv.pdf" download className="gap-2 mt-6 p-4 inline-flex items-center bg-slate-700/50 dark:bg-slate-700/50 rounded-lg px-6 py-2 hover:bg-slate-700 duration-300">
                <FontAwesomeIcon icon={faDownload} style={{ color: "var(--text-main)", width: "15px" }} />
                <span className="font-semibold m-2">Descargar CV</span>
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 pt-5 pb-15 h-full border border-contrast hover:transition-all duration-500 hover:border-btn/50 hover:-translate-y-2 group">
              <h1 className="text-3xs font-bold uppercase mb-2 font-inter tracking-wider text-slate-500">Tech Stack</h1>
              <div className="grid grid-cols-2 gap-3 mt-6 text-3xs font-semibold">
                {techStack.map((tech, index) => (
                  <span key={index} className="px-2 py-1 pt-4 pb-4 rounded-xl bg-slate-700/50 col-span-1 text-center flex items-center justify-start gap-2 hover:scale-105 transition-all duration-300 border border-transparent hover:border-btn hover:bg-slate-700 ">
                    <div className="w-5 h-5 shrink-0" style={{ backgroundColor: tech.color, maskImage: `url(${tech.icon})`, maskSize: "contain", maskRepeat: "no-repeat", WebkitMaskImage: `url(${tech.icon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 xl:w-6/10 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover: transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
            <h3 className="text-2xs font-bold text-slate-500 uppercase tracking-widest mb-6">Servicios</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-400">
                  <FontAwesomeIcon icon={faLaptopCode} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Front-end Dev</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Apps responsivas y de gran desempeño</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-400">
                  <FontAwesomeIcon icon={faPenRuler} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Diseños UI/UX</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Interfaces intuitivas y de alta calidad</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-400">
                  <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Integración de APIs</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Conexión fluida y eficiente</p>
                </div>
              </div>
            </div>
          </div>

          {latestProject ? (
            <Link href="/portfolio" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group col-span-1 md:col-span-2 lg:col-span-2 hover:shadow-lg shadow-btn/20 flex flex-col">
              <div className="h-48 w-full bg-slate-800 overflow-hidden relative">
                {latestProject.banner && typeof latestProject.banner !== "string" && (
                  <img src={(latestProject.banner as Media).url || ""} alt={latestProject.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                {!latestProject.banner && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                    <FontAwesomeIcon icon={faLaptopCode} className="text-slate-600 text-6xl opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{latestProject.title}</h3>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-blue-500 w-4 h-4" />
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {latestProject.description}
                </p>
                <div className="mt-auto flex gap-2">
                  {latestProject.techStack?.map((t: any, i: number) => (
                    <span key={i} className="bg-slate-800 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700/50">
                      {t.tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/portfolio" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group col-span-1 md:col-span-2 lg:col-span-2 hover:shadow-lg shadow-btn/20 flex flex-col">
              <div className="h-48 w-full bg-slate-800 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLaptopCode} className="text-slate-600 text-6xl opacity-20" />
                </div>
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Lorem ipsum dolor sit amet</h3>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-blue-500 w-4 h-4" />
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
                <div className="mt-auto flex gap-2">
                  {["LOREM", "LOREM", "LOREM"].map((tag, i) => (
                    <span key={i} className="bg-slate-800 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )}
          {latestPost ? (
            <Link href={`/blog/${latestPost.slug}`} className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 flex flex-col justify-between h-full min-h-[240px]">
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
                    <FontAwesomeIcon icon={faFileLines} className="text-slate-800 w-40 h-40 opacity-50 rotate-12 -translate-x-10 -translate-y-6 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-110" />
                  </div>
                  <div className="relative z-10 flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={faArrowRight} className="text-blue-500 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 flex items-center justify-center hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
              <p className="text-slate-500 text-sm">No hay post disponibles😔</p>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto w-11/12 xl:w-6/10 pt-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProject ? (
            <Link href="/portfolio" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 col-span-1 md:col-span-3 lg:col-span-2 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 flex items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                {featuredProject.banner && typeof featuredProject.banner !== "string" && (
                  <img src={(featuredProject.banner as Media).url || ""} alt={featuredProject.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                {!featuredProject.banner && <FontAwesomeIcon icon={faChartPie} className="text-blue-500 text-3xl opacity-80" />}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500/10 p-1 rounded-full w-4 h-4 flex items-center justify-center">
                    <FontAwesomeIcon icon={faStar} className="text-blue-400 text-[8px]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Proyecto Destacado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {featuredProject.title}
                  </h3>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-white group-hover:text-blue-500 transition-colors w-4 h-4" />
                </div>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>
            </Link>
          ) : (
            <Link href="/portfolio" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 col-span-1 md:col-span-3 lg:col-span-2 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 flex items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <FontAwesomeIcon icon={faChartPie} className="text-blue-500 text-3xl opacity-80" />
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500/10 p-1 rounded-full w-4 h-4 flex items-center justify-center">
                    <FontAwesomeIcon icon={faStar} className="text-blue-400 text-[8px]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Proyecto Destacado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-white group-hover:text-blue-500 transition-colors w-4 h-4" />
                </div>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
              </div>
            </Link>
          )}
          <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 md:col-span-2 lg:col-span-1">
            <h1 className="text-2xs font-bold text-slate-500 uppercase tracking-widest mb-15">Soft Skills</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Resolución de problemas", "Trabajo en equipo", "Liderazgo"].map((tag, i) => (
                <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-semibold border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative text-btn overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 col-span-1 md:col-span-1 row-span-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center border-r border-slate-200 dark:border-[#3b4754]">
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
          <div className="pt-10 pb-10 relative col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">¿Comenzamos un proyecto?</h1>
                <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">Si tienes alguna idea en mente o necesitas ayuda con algún proyecto, no dudes en contactarme.</p>
              </div>
              <div className="flex justify-end items-center">
                <Link href="/contact" className="mt-4 bg-btn hover:bg-btn/80 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-btn/25 hover:-translate-y-0.5 flex items-center gap-2">
                  Contactarme
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 col-span-1 md:col-span-1 flex flex-col justify-center gap-8">
            <h2 className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Conecta</h2>
            <div className="flex items-center justify-center gap-8">
              <a href="https://www.linkedin.com/in/mahg0899/" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <FontAwesomeIcon icon={faLinkedin} className="relative z-10 text-slate-600 group-hover/icon:text-blue-500 transition-colors text-3xl" />
              </a>
              <a href="https://github.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <FontAwesomeIcon icon={faGithub} className="relative z-10 text-slate-600 group-hover/icon:text-white transition-colors text-3xl" />
              </a>
              <a href="https://x.com/mahg0899" className="group/icon relative flex flex-col items-center" target="_blank">
                <span className="absolute -inset-4 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></span>
                <FontAwesomeIcon icon={faXTwitter} className="relative z-10 text-slate-600 group-hover/icon:text-sky-400 transition-colors text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
