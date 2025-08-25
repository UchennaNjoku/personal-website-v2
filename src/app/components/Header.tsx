"use client";
import React from 'react';
import Link from 'next/link';
import { useColors } from '@/hooks/useColors';

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
    const colors = useColors(isDarkMode);

    return (
        <header className='w-full absolute top-0 p-4 md:p-10'>
            <div className="flex w-full justify-between items-center m-auto max-w-8xl">
                <div className="flex-1 flex items-center">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDarkMode();
                        }}
                        className="text-text-primary p-3 mr-4 hover:scale-110 transition-all duration-200 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
                        aria-label="Toggle Dark Mode"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
                        className="text-text-primary p-3 md:hidden touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                        aria-label="Menu"
                        aria-expanded={isMobileMenuOpen}
                        type="button"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
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
                <div className="hidden md:flex justify-center items-center space-x-6 md:space-x-10">
                    <button 
                        data-sticky 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToRef(experienceRef);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                scrollToRef(experienceRef);
                            }
                        }}
                        className="text-text-primary font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 rounded-sm"
                        aria-label="Navigate to experience section"
                        type="button"
                    >
                        /experience
                    </button>
                    <button 
                        data-sticky 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToRef(worksRef);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                scrollToRef(worksRef);
                            }
                        }}
                        className="text-text-primary font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 rounded-sm"
                        aria-label="Navigate to works section"
                        type="button"
                    >
                        /works
                    </button>
                    <button 
                        data-sticky 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToRef(contactRef);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                scrollToRef(contactRef);
                            }
                        }}
                        className="text-text-primary font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 rounded-sm"
                        aria-label="Navigate to contact section"
                        type="button"
                    >
                        /contact
                    </button>
                </div>
                <div className='flex-1 flex justify-end'>
                    <Link href={"/resume.pdf"} locale={false} target="_blank" rel="noopener noreferrer" className="h-fit w-fit border-2 hover:bg-brand-primary hover:text-bg-primary transition-all border-brand-primary rounded-md px-3 py-2 text-brand-primary cursor-pointer touch-manipulation min-h-[44px] flex items-center">get my resume</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-container w-full bg-bg-primary shadow-lg fixed top-16 left-0 right-0 z-[99999] rounded-md mx-4 px-4 py-2 border border-brand-primary transition-all duration-300 animate-in slide-in-from-top-2"
                    style={{ touchAction: 'manipulation' }}>
                    <div className="flex flex-col space-y-2 py-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollToRef(experienceRef);
                                setIsMobileMenuOpen(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToRef(experienceRef);
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                            className="mobile-menu-item text-text-primary font-normal py-4 px-4 hover:font-medium active:bg-brand-primary active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
                            type="button"
                            aria-label="Navigate to experience section"
                            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        >
                            /experience
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollToRef(worksRef);
                                setIsMobileMenuOpen(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToRef(worksRef);
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                            className="mobile-menu-item text-text-primary font-normal py-4 px-4 hover:font-medium active:bg-brand-primary active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
                            type="button"
                            aria-label="Navigate to works section"
                            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        >
                            /works
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollToRef(contactRef);
                                setIsMobileMenuOpen(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToRef(contactRef);
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                            className="mobile-menu-item text-text-primary font-normal py-4 px-4 hover:font-medium active:bg-brand-primary active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
                            type="button"
                            aria-label="Navigate to contact section"
                            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        >
                            /contact
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[99998] md:hidden"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMobileMenuOpen(false);
                    }}
                    style={{ touchAction: 'manipulation' }}
                />
            )}
        </header>
    );
};

export default Header;