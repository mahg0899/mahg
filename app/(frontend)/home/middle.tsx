import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faPenRuler, faShareNodes, faArrowRight, faFileLines, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";

export default async function Middle() {
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

    return (
        <div className="mx-auto max-w-6/10 pt-5">
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
                <Link href="/portfolio" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg border border-main/25 hover:border-btn/50 transition-all duration-300 hover:-translate-y-2 group col-span-2 hover:shadow-lg shadow-btn/20 flex flex-col">
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
    );
}