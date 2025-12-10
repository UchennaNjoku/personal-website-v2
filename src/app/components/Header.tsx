"use client";
import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
    experienceRef: React.RefObject<HTMLDivElement>;
    worksRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({
    isDarkMode,
    toggleDarkMode,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    scrollToRef,
    experienceRef,
    worksRef,
    contactRef
}) => {
    return (
        <header className='w-full fixed top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800/50'>
            <div className="flex w-full justify-between items-center m-auto max-w-7xl px-4 md:px-8 py-4">
                {/* Logo / Brand */}
                <div className="flex items-center">
                    <span className="font-mono text-red-500 text-sm tracking-widest">
                        UN<span className="text-neutral-600">_</span>DEV
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <button 
                        data-sticky 
                        onClick={() => scrollToRef(experienceRef)}
                        className="font-mono text-sm text-neutral-400 hover:text-red-500 transition-colors tracking-wider"
                    >
                        /EXPERIENCE
                    </button>
                    <button 
                        data-sticky 
                        onClick={() => scrollToRef(worksRef)}
                        className="font-mono text-sm text-neutral-400 hover:text-red-500 transition-colors tracking-wider"
                    >
                        /WORKS
                    </button>
                    <button 
                        data-sticky 
                        onClick={() => scrollToRef(contactRef)}
                        className="font-mono text-sm text-neutral-400 hover:text-red-500 transition-colors tracking-wider"
                    >
                        /CONTACT
                    </button>
                </div>

                {/* Right Side Actions */}
                <div className='flex items-center space-x-4'>
                    {/* Resume Button */}
                    <Link 
                        href="/resume.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hidden sm:flex items-center px-4 py-2 border border-red-600 text-red-500 font-mono text-sm hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                        [ RESUME ]
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-neutral-800 bg-black/95 backdrop-blur-md">
                    <div className="flex flex-col p-4 space-y-1">
                        <button
                            onClick={() => {
                                scrollToRef(experienceRef);
                                setIsMobileMenuOpen(false);
                            }}
                            className="font-mono text-sm text-neutral-400 hover:text-red-500 hover:bg-neutral-900/50 py-3 px-4 text-left transition-all border-l-2 border-transparent hover:border-red-600"
                        >
                            /EXPERIENCE
                        </button>
                        <button
                            onClick={() => {
                                scrollToRef(worksRef);
                                setIsMobileMenuOpen(false);
                            }}
                            className="font-mono text-sm text-neutral-400 hover:text-red-500 hover:bg-neutral-900/50 py-3 px-4 text-left transition-all border-l-2 border-transparent hover:border-red-600"
                        >
                            /WORKS
                        </button>
                        <button
                            onClick={() => {
                                scrollToRef(contactRef);
                                setIsMobileMenuOpen(false);
                            }}
                            className="font-mono text-sm text-neutral-400 hover:text-red-500 hover:bg-neutral-900/50 py-3 px-4 text-left transition-all border-l-2 border-transparent hover:border-red-600"
                        >
                            /CONTACT
                        </button>
                        <Link 
                            href="/resume.pdf" 
                            target="_blank" 
                            className="font-mono text-sm text-red-500 py-3 px-4 text-left border border-red-600 mt-2 hover:bg-red-600 hover:text-white transition-all"
                        >
                            [ DOWNLOAD_RESUME ]
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[-1] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
