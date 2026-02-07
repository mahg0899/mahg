import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faClock, faDesktop, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";

export default function About() {
    return (
        <div className="mx-auto max-w-6/10 pb-15 text-main">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-4 auto-rows-[minmax(160px,auto)]">
                <div className="md:col-span-3 md:row-span-3 bento-card rounded-2xl pl-10 pt-4 pb-8 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <p className="text-3xs font-semibold text-btn uppercase tracking-wider mb-2 block pt-7">Mi historia</p>
                    <h1 className="text-5xl font-black font-inter leading-none drop-shadow-md pt-3">Busco <span className="text-btn italic">diseñar</span> y <span className="text-btn italic">desarrollar</span> soluciones innovadoras.</h1>
                    <p className="text-slate-500 mt-6 font-semibold max-w-8/10 pt-4">
                        Soy desarrollador web frontend con experiencia en diseño y desarrollo de interfaces. Mi recorrido comienza desde la curiosidad de entender como funciona realmente la tecnología y como el mundo digital funciona. Hoy en día mi interés es aprender y resolver problemas por medio de la programación.
                    </p>
                    <p className="text-slate-500 mt-6 font-semibold max-w-8/10">
                        Egresado como Lic. en Derecho por la Universidad Veracruzana, mi pasión por la programación me ha llevado a dar un cambio drastico en mi vida, como objetivo profesional es crear un puente entre las personas y las necesidades digitales que requieran. Creo fielmente que mi pasión contribuye positivamente en este mundo digital.
                    </p>
                </div>
                <div className="md:col-span-1 md:row-span-2 bento-card rounded-2xl p-6 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faDesktop} className="text-3xs justify-center shrink-0 text-btn w-3 h-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Mi setup</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: "Lenovo Ideapad Gaming 3", tag: "WORKSTATION", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                            { name: "HyperX Alloy Origins Core", tag: "PERIPHERAL", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                            { name: "VS Code / Antigravity", tag: "IDE", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                            { name: "Docmost / Figma / Linear", tag: "TOOLS", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2 px-3">
                                <span className="text-slate-200 font-semibold text-sm">{item.name}</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded border ${item.color} uppercase tracking-wider`}>
                                    {item.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-1 md:row-span-5 bento-card rounded-2xl p-6 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faClock} className="text-3xs justify-center shrink-0 text-btn w-3 h-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Experiencia</p>
                    </div>
                    <div className="relative pl-8 border-l border-slate-700/50 space-y-8 ml-2 my-4">
                        {[
                            { year: "PRESENTE", title: "Estudiante de Ciencia de Datos", desc: "Estudiante de la EBAC en la carrera de Ciencia de Datos." },
                            { year: "2023 — PRESENTE", title: "Desarrollador Freelancer", desc: "Desarrollador frontend con experiencia comprobable en NextJS, React, TypeScript, Tailwind CSS." },
                            { year: "2023 — PRESENTE", title: "Asesor Jurídico", desc: "Asesor jurídico en áreas del derecho civil, laboral y administrativo." },
                            { year: "2020 — 2022", title: "Auxiliar de Investigador", desc: "Apoyo en la investigación de temas relacionados con el derecho administrativo." },
                            { year: "2023", title: "Lic. en Derecho", desc: "Egresado por tesis de la Lic. en Derecho por la Universidad Veracruzana." },
                        ].map((item, i) => (
                            <div key={i} className="relative group/item">
                                <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <span className="text-3xs font-bold text-blue-400 uppercase tracking-widest mb-1 block">{item.year}</span>
                                <h3 className="font-bold text-main mb-2 group-hover/item:text-blue-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2 md:row-span-2 bento-card rounded-2xl p-6 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faPuzzlePiece} className="text-3xs justify-center shrink-0 text-btn w-3 h-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Intereses</p>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">3</h1>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, ipsa tenetur quo libero incidunt magnam omnis ab laboriosam esse ipsam ipsum adipisci fugiat, qui quasi assumenda quis illo? Deserunt.</p>
                </div>
                <div className="md:col-span-1 md:row-span-2 bento-card rounded-2xl p-6 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faBrain} className="text-3xs justify-center shrink-0 text-btn w-3 h-3" />
                        <p className="text-3xs font-semibold text-slate-500 uppercase tracking-wider block">Mis superpoderes</p>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">4</h1>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, ipsa tenetur quo libero incidunt magnam omnis ab laboriosam esse ipsam ipsum adipisci fugiat, qui quasi assumenda quis illo? Deserunt.</p>
                </div>
                <div className="md:col-span-3 md:row-span-2 bento-card rounded-2xl p-6 flex flex-col relative overflow-hidden group bg-bento border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <h1 className="text-4xl font-bold text-white mb-4">5</h1>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, ipsa tenetur quo libero incidunt magnam omnis ab laboriosam esse ipsam ipsum adipisci fugiat, qui quasi assumenda quis illo? Deserunt.</p>
                </div>
            </div>
        </div>
    );
}