import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Grid() {
    return (
        <div className="mx-auto max-w-6/10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 group">
                <div className="col-span-2 md:col-span-2 lg:col-span-2 group/item">
                    <div className="bg-contrast dark:bg-contrast/40 rounded-lg p-6 border border-contrast">
                        <span className="text-2xs font-semibold text-btn uppercase tracking-wider mb-2 block">Frontend Developer</span>
                        <p className="text-4xl font-extrabold font-inter tracking-tighter leading-none max-w-2xl">Desarrollando soluciones digitales con <span className="text-btn">precisión</span> y creatividad</p>
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
                    <div className="bg-contrast dark:bg-contrast/40 rounded-lg p-6 border border-contrast">
                        <h1 className="text-2xl font-bold">About Me</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}