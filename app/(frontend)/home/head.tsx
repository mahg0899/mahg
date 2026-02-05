import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const techStack = [
    {
        name: "React",
        icon: "/react.svg",
        color: "#61DAFB"
    },
    {
        name: "Next.js",
        icon: "/next.svg",
        color: "#000000"
    },
    {
        name: "Tailwind",
        icon: "/tailwindcss.svg",
        color: "#06B6D4"
    },
    {
        name: "TypeScript",
        icon: "/typescript.svg",
        color: "#3178C6"
    },
    {
        name: "Markdown",
        icon: "/markdown.svg",
        color: "#000000"
    },
    {
        name: "Wordpress",
        icon: "/wordpress.svg",
        color: "#11749E"
    }
];

export default function Head() {
    return (
        <div className="mx-auto max-w-6/10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 group">
                <div className="col-span-2 md:col-span-2 lg:col-span-3 group/item">
                    <div className="relative overflow-hidden bg-bento dark:bg-bento pt-5 pb-15 rounded-lg p-6 border border-contrast hover: transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-btn/20 rounded-full blur-[50px] -mr-8 -mt-8 transition-all duration-500 group-hover:bg-btn/30"></div>
                        <span className="text-2xs font-semibold text-btn uppercase tracking-wider mb-2 block">Frontend Developer</span>
                        <p className="text-5xl font-black font-inter leading-none drop-shadow-md">Desarrollando soluciones digitales con <span className="text-btn">precisión</span> y creatividad</p>
                        <p className="mt-6 font-semibold text-slate-500 max-w-xl">
                            Desarrollador especializado en frontend con experiencia en React, Next.js, Tailwind CSS y TypeScript.
                        </p>
                        <a href="/cv.pdf" download className="gap-2 mt-6 p-4 inline-flex items-center bg-slate-700/50 dark:bg-slate-700/50 rounded-lg px-6 py-2 hover:bg-slate-700 duration-300">
                            <FontAwesomeIcon icon={faDownload} style={{ color: "var(--text-main)", width: "15px" }} />
                            <span className="font-semibold m-2">Descargar CV</span>
                        </a>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-1">
                    <div className="bg-bento dark:bg-bento rounded-lg p-6 border border-contrast pt-5 pb-15 h-full border border-contrast hover:transition-all duration-500 hover:border-btn/50 hover:-translate-y-2 group">
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
    );
}