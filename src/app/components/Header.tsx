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
                        className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} p-3 mr-4 hover:scale-110 transition-all duration-200 touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer`}
                        aria-label="Toggle Dark Mode"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636a9 9 0 1 0 12.728 0L16.773 7.227Z" />
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
                        className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} p-3 md:hidden touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 transition-transform cursor-pointer`}
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
                        className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50 rounded-sm`}
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
                        className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50 rounded-sm`}
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
                        className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50 rounded-sm`}
                        aria-label="Navigate to contact section"
                        type="button"
                    >
                        /contact
                    </button>
                </div>
                <div className='flex-1 flex justify-end'>
                    <Link href={"/resume.pdf"} locale={false} target="_blank" rel="noopener noreferrer" className={`h-fit w-fit border-2 hover:bg-[#433E0E] hover:text-[#EAEAC2] transition-all border-[#433E0E] rounded-md px-3 py-2 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#433E0E]'} cursor-pointer touch-manipulation min-h-[44px] flex items-center`}>get my resume</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={`mobile-menu-container w-full ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#EAEAC2]'} shadow-lg fixed top-16 left-0 right-0 z-[99999] rounded-md mx-4 px-4 py-2 border border-[#433E0E] transition-all duration-300 animate-in slide-in-from-top-2`}
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
                            className={`mobile-menu-item ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-4 px-4 hover:font-medium active:bg-[#433E0E] active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50`}
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
                            className={`mobile-menu-item ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-4 px-4 hover:font-medium active:bg-[#433E0E] active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50`}
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
                            className={`mobile-menu-item ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-4 px-4 hover:font-medium active:bg-[#433E0E] active:bg-opacity-20 touch-manipulation min-h-[48px] text-left rounded-md transition-all w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#433E0E] focus:ring-opacity-50`}
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
