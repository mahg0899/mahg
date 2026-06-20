"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { MahgLogo } from "./MahgLogo";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="relative z-50">
            <div className="mx-auto w-11/12 xl:w-6/10 mt-4 mb-4 text-main">
                <div className="flex items-center justify-between flex-row">
                    {/* Logo */}
                    <Link href="/" className="text-xl tracking-wider font-bitcount hover:text-btn transition-all duration-300 flex flex-row items-center gap-3 group">
                        <MahgLogo className="w-10 bg-bento p-1 rounded-xl text-main group-hover:text-btn transition-colors duration-300" />
                        <span>MAHG<span className="text-main text-2xs">.me</span></span>
                    </Link>
                    <ul className="hidden md:flex flex-row gap-8 font-semibold text-2xs">
                        <li className="hover:text-btn transition-all duration-300"><Link href="/about">Sobre mí</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/portfolio">Portfolio</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/blog">Blog</Link></li>
                    </ul>
                    <ul className="hidden md:flex flex-row gap-4 items-center font-semibold text-2xs">
                        <li className="bg-btn rounded-xl px-6 py-2 hover:scale-105 transition-all duration-300 ease-in-out text-white">
                            <Link href="/contact">Contactame</Link>
                        </li>
                        <li>
                            <a href="https://github.com/mahg0899" target="_blank" rel="noopener noreferrer">
                                <Image src="https://avatars.githubusercontent.com/u/46274461?v=4" alt="GitHub" width={40} height={40} className="rounded-full border border-contrast" />
                            </a>
                        </li>
                    </ul>
                    <button onClick={toggleMenu} className="md:hidden text-2xl text-slate-400 hover:text-white transition-colors p-2">
                        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                    </button>
                </div>
            </div>
            <div className={`md:hidden absolute top-full left-0 w-full bg-bento/95 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}>
                <div className="mx-auto w-11/12 flex flex-col gap-6 font-semibold text-sm">
                    <Link href="/about" onClick={toggleMenu} className="block py-2 px-4 hover:bg-white/5 rounded-lg transition-colors">
                        Sobre mí
                    </Link>
                    <Link href="/portfolio" onClick={toggleMenu} className="block py-2 px-4 hover:bg-white/5 rounded-lg transition-colors">
                        Portfolio
                    </Link>
                    <Link href="/blog" onClick={toggleMenu} className="block py-2 px-4 hover:bg-white/5 rounded-lg transition-colors">
                        Blog
                    </Link>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex flex-col gap-4 px-4">
                        <Link href="/contact" onClick={toggleMenu} className="bg-btn text-white text-center rounded-xl px-6 py-3 hover:bg-btn/80 transition-all">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Contactame
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-contrast dark:bg-contrast my-4 opacity-50 mb-10" />
        </div>
    );
};