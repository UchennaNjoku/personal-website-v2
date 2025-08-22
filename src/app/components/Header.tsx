"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className='bg-white w-full relative z-50'>
                <div className="flex w-full justify-between items-center m-auto max-w-8xl p-4 md:p-10">
                    <div className="flex-1 flex items-center">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-black p-2 md:hidden touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-transform"
                            aria-label="Menu"
                            aria-expanded={isMobileMenuOpen}
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex justify-center items-center space-x-6 md:space-x-10">
                        <Link href="/experience" className='text-black no-underline border-b border-transparent transition-all hover:border-current touch-manipulation min-h-[44px] flex items-center'>experience</Link>
                        <Link href="/works" className='text-black no-underline border-b border-transparent transition-all hover:border-current touch-manipulation min-h-[44px] flex items-center'>works</Link>
                        <Link href="/contact" className='text-black no-underline border-b border-transparent transition-all hover:border-current touch-manipulation min-h-[44px] flex items-center'>contact</Link>
                    </div>

                    <div className='flex-1 flex justify-end'>
                        <Link href="/resume.pdf" locale={false} target="_blank" rel="noopener noreferrer" className='border-2 hover:bg-gray-600 hover:text-white transition-all border-gray-800 rounded-md px-3 py-2 text-gray-800 touch-manipulation min-h-[44px] flex items-center'>get my resume</Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="w-full bg-white shadow-lg absolute top-full left-0 z-[9999] border-t border-gray-200 md:hidden">
                        <div className="flex flex-col px-4 py-2">
                            <Link
                                href="/experience"
                                className="text-black py-4 hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-h-[44px] text-left rounded-md transition-all flex items-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                experience
                            </Link>
                            <Link
                                href="/works"
                                className="text-black py-4 hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-h-[44px] text-left rounded-md transition-all flex items-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                works
                            </Link>
                            <Link
                                href="/contact"
                                className="text-black py-4 hover:bg-gray-50 active:bg-gray-100 touch-manipulation min-h-[44px] text-left rounded-md transition-all flex items-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                contact
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Header;
