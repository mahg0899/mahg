import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <div>
            <div className="mx-auto max-w-7xl mt-6 mb-4 text-main">
                <div className="flex items-center justify-between flex-row">
                    <span className="flex flex-row items-center gap-6">
                        <img src="/mahg_logo.png" alt="#" className="w-10" />
                        <Link href="/" className="text-xl tracking-wider font-bold">MAHG</Link>
                    </span>
                    <ul className="flex flex-row gap-10">
                        <li className="hover:text-btn transition-all duration-300"><Link href="/about">Sobre mí</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/portfolio">Portfolio</Link></li>
                        <li className="hover:text-btn transition-all duration-300"><Link href="/blog">Blog</Link></li>
                    </ul>
                    <ul className="flex flex-row gap-6 items-center">
                        <li className="bg-btn rounded-full px-6 py-2 hover:scale-105 transition-all duration-300 easy-in-o"><a href="#">Contactame</a></li>
                        <li><img src="https://avatars.githubusercontent.com/u/46274461?v=4" alt="#" className="w-10 rounded-full border border-contrast" /></li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-px bg-contrast dark:bg-contrast my-4 opacity-50 mb-10" />
        </div>
    );
};