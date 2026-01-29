import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <div>
            <div className="mx-auto max-w-6/10 mt-4 mb-4 text-main">
                <div className="flex items-center justify-between flex-row">
                    <span>
                        <Link href="/" className="text-xl tracking-wider font-bitcount hover:text-btn transition-all duration-300 flex flex-row items-center gap-3"><img src="/mahg_logo.png" alt="#" className="w-10 bg-bento p-1 rounded-xl" />MAHG</Link>
                    </span>
                    <ul className="flex flex-row gap-8 font-semibold text-2xs">
                        <li className="hover:text-btn transition-all duration-300"><Link href="/about">Sobre mí</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/portfolio">Portfolio</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/blog">Blog</Link></li>
                    </ul>
                    <ul className="flex flex-row gap-4 items-center font-semibold text-2xs">
                        <li className="bg-btn rounded-xl px-6 py-2 hover:scale-105 transition-all duration-300 ease-in-out"><a href="/contact">Contactame</a></li>
                        <li><a href="https://github.com/mahg0899" target="_blank"><img src="https://avatars.githubusercontent.com/u/46274461?v=4" alt="#" className="w-10 rounded-full border border-contrast" /></a></li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-px bg-contrast dark:bg-contrast my-4 opacity-50 mb-10" />
        </div>
    );
};