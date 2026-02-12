```
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFigma } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { ensureUrl } from '@/lib/utils'
import type { Media } from "@/payload-types";

export const dynamic = 'force-dynamic'

};

export default async function Portfolio() {
    const payload = await getPayload({ config });
    const projects = await payload.find({
        collection: "projects",
        sort: "-createdAt",
        limit: 100,
    });

    return (
        <div className="min-h-screen py-10">
            <div className="mx-auto w-11/12 xl:w-6/10">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black font-inter text-white mb-4 drop-shadow-md">
                        Mis <span className="text-btn">Proyectos</span>
                    </h1>
                    <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
                        Una selección de los trabajos que he realizado, desde aplicaciones web completas hasta librerías open source.
                    </p>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {projects.docs.map((project, index) => {
                        const bannerUrl = project.banner && typeof project.banner !== "string" ? (project.banner as Media).url : null;
                        const link = ensureUrl(project.websiteLink || project.githubLink) || "#";
                        const githubUrl = ensureUrl(project.githubLink);
                        const figmaUrl = ensureUrl(project.figmaLink);

                        return (
                            <div key={project.id} className="break-inside-avoid mb-6 group bg-bento border border-slate-700/50 rounded-2xl overflow-hidden hover:border-btn/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-btn/10 transition-all duration-300 flex flex-col">
                                <div className="relative">
                                    {bannerUrl ? (
                                        <img
                                            src={bannerUrl}
                                            alt={project.title}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-48 flex items-center justify-center bg-slate-800/50">
                                            <FontAwesomeIcon icon={faLaptopCode} className="text-3xl text-slate-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300"></div>
                                </div>
                                <div className="p-6 flex flex-col">
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h2>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack?.map((t: any, i: number) => (
                                                <span
                                                    key={i}
                                                    className="bg-slate-900/80 border border-slate-700/50 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
                                                >
                                                    {t.tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0 pt-0.5">
                                            {githubUrl ? (
                                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="Ver Código en GitHub">
                                                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                                                </a>
                                            ) : (
                                                <div className="text-slate-700 cursor-not-allowed" title="Código no disponible públicamente">
                                                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                                                </div>
                                            )}

                                            {figmaUrl ? (
                                                <a href={figmaUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#F24E1E] transition-colors" title="Ver Diseño en Figma">
                                                    <FontAwesomeIcon icon={faFigma} className="w-5 h-5" />
                                                </a>
                                            ) : (
                                                <div className="text-slate-700 cursor-not-allowed" title="Diseño no disponible públicamente">
                                                    <FontAwesomeIcon icon={faFigma} className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-4">
                                        {project.description}
                                    </p>
                                    <Link
                                        href={link}
                                        target="_blank"
                                        className="w-full bg-slate-800/50 text-white font-bold py-3 rounded-xl border border-slate-700/50 hover:border-btn active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn text-sm"
                                    >
                                        Ver Detalles
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="w-3 h-3 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all"
                                        />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {projects.docs.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                        <FontAwesomeIcon icon={faLaptopCode} className="text-6xl text-slate-700 mb-6 w-20 h-20 mx-auto" />
                        <p className="text-xl text-slate-400 font-medium">
                            No hay proyectos publicados aún.
                        </p>
                    </div>
                )}
                <div className="mt-16 flex flex-col items-center gap-4">
                    <div className="hidden animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-btn"></div>
                    <div className="text-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 opacity-50">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                            Fin de los proyectos
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}