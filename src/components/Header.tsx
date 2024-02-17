'use client'
import { useState } from "react";

export default function Header() {

    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <nav className="bg-white border-b border-slate-400">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-evenly mx-auto p-8">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Lucas Marques</span>
                </a>
                <button onClick={handleToggleSidebar} data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="w-full md:block md:w-auto hidden" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
                        <li>
                            <a href="/blog" className="block py-2 px-3 md:p-0">Blog</a>
                        </li>
                        <li>
                            <a href="/projects" className="block py-2 px-3 md:p-0">Projetos</a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 px-3 md:p-0">Sobre</a>
                        </li>
                    </ul>
                </div>
                <div className={`${collapsed ? 'hidden' : ''} w-full`} id="navbar-hamburger">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg">
                        <li>
                            <a href="/blog" className="block py-2 px-3">Blog</a>
                        </li>
                        <li>
                            <a href="/projects" className="block py-2 px-3">Projetos</a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 px-3">Sobre</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}
