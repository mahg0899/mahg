import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className="py-10 bg-background dark:bg-background">
            <div className="mx-auto w-11/12 xl:w-6/10 flex flex-col text-center gap-4">
                <div className="flex items-center justify-center gap-4 text-slate-600">
                    <div className="h-px w-10 bg-slate-800"></div>
                    <FontAwesomeIcon icon={faInfinity} className="w-4 h-4" />
                    <div className="h-px w-10 bg-slate-800"></div>
                </div>
                <p className="text-slate-500 text-[12px] uppercase tracking-wider font-semibold">
                    © {new Date().getFullYear()} <span className="text-btn">MAHG</span>. Hecho con ♥️ con ayuda de <a href="https://fractalis.dev" target="_blank" className="text-btn">Fractalis.Dev</a>
                </p>
            </div>
        </footer>
    );
}