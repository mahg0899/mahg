import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowUpRightFromSquare, faChartPie } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Bottom() {
    return (
        <div className="mx-auto max-w-6/10 pt-5 pb-30">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Link href="#" className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 col-span-2 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 flex items-center gap-6">
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
                <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <h1 className="text-2xs font-bold text-slate-500 uppercase tracking-widest mb-15">Soft Skills</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["Resolución de problemas", "Trabajo en equipo", "Liderazgo"].map((tag, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-semibold border border-slate-200 dark:border-slate-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="relative text-btn overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20 md:col-span-1 md:row-span-1 grid grid-cols-2 gap-4">
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
    );
}