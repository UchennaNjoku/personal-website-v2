"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header"
import StickyCursor from "@/components/StickyCursor";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "./components/Footer";

export default function Home() {

  const experienceRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enhanced function to scroll to a ref with improved accuracy and browser compatibility
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    try {
      if (ref.current) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
        const targetPosition = Math.max(0, elementPosition - headerHeight - 20);

        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, targetPosition);
        }
      }
    } catch (error) {
      console.error('Error in scrollToRef:', error);
    }
  };

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize dark mode (default to dark for industrial theme)
  useEffect(() => {
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
  }, []);

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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('mobile-menu-open');
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.classList.remove('mobile-menu-open');
      };
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <StickyCursor />
      <main className="bg-black relative w-full overflow-x-hidden">
        
        {/* Global Industrial Grid Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.08] bg-grid-pattern z-0" />

        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          scrollToRef={scrollToRef}
          experienceRef={experienceRef}
          worksRef={worksRef}
          contactRef={contactRef}
        />

        {/* Hero Section */}
        <section className="relative flex flex-col m-auto justify-center min-h-screen px-4 py-10 md:py-0 md:h-screen max-w-6xl text-white">
          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red-900/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-4">
              <span className="font-mono text-red-500 text-sm tracking-widest uppercase">
                [ SYSTEM_INIT // PORTFOLIO_V2.0 ]
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl m-0 leading-tight font-black tracking-tight">
              <span className="text-white">Hi,</span>
              <span role="img" className='waveanim ml-2' aria-label="wave">👋🏼</span>
              <br />
              <span className="text-white">I&apos;m </span>
              <span className="text-red-500">Uchenna Njoku</span>
              <span className="text-neutral-600">.</span>
              <br />
              <span className="text-neutral-400">I build things</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">with code.</span>
            </h1>
            
            <p className="mt-8 font-mono text-neutral-500 max-w-lg">
              Software engineer driven by curiosity, precision, and a love for solving complex problems.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="font-mono text-xs text-neutral-600 mb-2 tracking-widest">SCROLL_DOWN</span>
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-500">
                <path d="M12 5V19M12 19L7 14M12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Corner Decorations */}
          <div className="absolute top-20 right-8 w-8 h-8 border-t-2 border-r-2 border-red-600/30" />
          <div className="absolute bottom-20 left-8 w-8 h-8 border-b-2 border-l-2 border-red-600/30" />
        </section>

        {/* Experience Section */}
        <div id="experience" ref={experienceRef}>
          <ExperienceSection isDarkMode={isDarkMode} />
        </div>

        {/* Works Section */}
        <section id="works" ref={worksRef} className="relative py-24 px-4 md:px-8 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl m-auto">
            {/* Header */}
            <div className="mb-16 border-l-4 border-red-600 pl-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="font-mono text-red-500 text-sm tracking-widest uppercase">
                  Project Archive // Selected Works
                </span>
                <div className="h-[1px] w-24 bg-gradient-to-r from-red-900 to-transparent"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white/90 mb-2">
                Works<span className="text-red-600">.</span>
              </h1>
              <p className="font-mono text-neutral-400 max-w-lg">
                [ LOADING PROJECT_DATA... ]<br />
                A collection of engineering projects and experiments.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6">
              {/* Project 01 */}
              <div className="group relative border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-red-900/50 transition-all duration-300">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-6xl md:text-7xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors">01</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">VolSurf-CPP - Volatility Surface Engine</h2>
                      <p className="text-neutral-400 mb-4 font-mono text-sm">
                        High-performance, arbitrage-free volatility surface engine in C++17 with Python bindings (pybind11), featuring multi-threaded implied volatility solvers and constrained spline fitting using OpenMP.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">C++17</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">Python</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">OpenMP</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">QuantLib</span>
                      </div>
                      <div className="flex gap-6">
                        <Link data-sticky href="#" className="font-mono text-sm text-red-500 hover:text-red-400 transition-colors">
                          [ VIEW_PROJECT ]
                        </Link>
                        <Link data-sticky href="#" className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                          [ GITHUB ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 02 */}
              <div className="group relative border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-red-900/50 transition-all duration-300">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-6xl md:text-7xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors">02</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">WildTrack - Mobile Attendance System</h2>
                      <p className="text-neutral-400 mb-4 font-mono text-sm">
                        Comprehensive mobile attendance tracking system leveraging NFC technology for secure, contactless check-ins in educational institutions.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">React Native</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">Supabase</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">NFC</span>
                      </div>
                      <div className="flex gap-6">
                        <Link data-sticky href="#" className="font-mono text-sm text-red-500 hover:text-red-400 transition-colors">
                          [ VIEW_PROJECT ]
                        </Link>
                        <Link data-sticky href="#" className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                          [ GITHUB ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 03 */}
              <div className="group relative border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-red-900/50 transition-all duration-300">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-6xl md:text-7xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors">03</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Thriv - Personal Fitness Companion</h2>
                      <p className="text-neutral-400 mb-4 font-mono text-sm">
                        Comprehensive mobile fitness application with personalized workout plans, nutrition tracking, and progress monitoring. Real-time data sync and social features.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">React Native</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">Firebase</span>
                      </div>
                      <div className="flex gap-6">
                        <Link data-sticky href="https://thriv-app.vercel.app/" className="font-mono text-sm text-red-500 hover:text-red-400 transition-colors">
                          [ VIEW_PROJECT ]
                        </Link>
                        <Link data-sticky href="https://github.com/UchennaNjoku/Thriv" className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                          [ GITHUB ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 04 */}
              <div className="group relative border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-red-900/50 transition-all duration-300">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-6xl md:text-7xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors">04</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Munchies Recipes</h2>
                      <p className="text-neutral-400 mb-4 font-mono text-sm">
                        Recipe web app that helps you find the perfect recipe for any meal. Leverages the Spoonacular API for comprehensive recipe data.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">React</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">TailwindCSS</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">Spoonacular API</span>
                      </div>
                      <div className="flex gap-6">
                        <Link data-sticky href="https://munchies-recipes.vercel.app/" className="font-mono text-sm text-red-500 hover:text-red-400 transition-colors">
                          [ VIEW_PROJECT ]
                        </Link>
                        <Link data-sticky href="https://github.com/UchennaNjoku/munchies-recipes" className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                          [ GITHUB ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 05 */}
              <div className="group relative border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-red-900/50 transition-all duration-300">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-6xl md:text-7xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors">05</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Sentinel Staffing</h2>
                      <p className="text-neutral-400 mb-4 font-mono text-sm">
                        Redesigned web application portal for Sentinel Staffing Solutions. Modern, responsive design with improved user experience.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">React</span>
                        <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-400">TailwindCSS</span>
                      </div>
                      <div className="flex gap-6">
                        <Link data-sticky href="https://sentinel-staffing.vercel.app/" className="font-mono text-sm text-red-500 hover:text-red-400 transition-colors">
                          [ VIEW_PROJECT ]
                        </Link>
                        <Link data-sticky href="https://github.com/UchennaNjoku/sentinel-staffing" className="font-mono text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                          [ GITHUB ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="relative py-24 px-4 md:px-8 border-t border-neutral-800">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-red-950/10 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl m-auto text-center">
            <div className="mb-8">
              <span className="font-mono text-red-500 text-sm tracking-widest uppercase">
                [ ESTABLISH_CONNECTION ]
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              Get in touch<span className="text-red-600">.</span>
              <span className="contact-anim ml-2">📬</span>
            </h2>
            
            <p className="font-mono text-neutral-400 max-w-xl mx-auto mb-12">
              I am always eager for new opportunities and collaborations. 
              Feel free to reach out via the following channels.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <Link data-sticky href="https://www.linkedin.com/in/uchennanjoku/" className="group font-mono text-neutral-400 hover:text-red-500 transition-colors">
                <span className="border-b border-transparent group-hover:border-red-500 pb-1">LinkedIn</span>
              </Link>
              <Link data-sticky href="https://github.com/UchennaNjoku" className="group font-mono text-neutral-400 hover:text-red-500 transition-colors">
                <span className="border-b border-transparent group-hover:border-red-500 pb-1">GitHub</span>
              </Link>
              <Link data-sticky href="mailto:uchenna.c.njoku@gmail.com" className="group font-mono text-neutral-400 hover:text-red-500 transition-colors">
                <span className="border-b border-transparent group-hover:border-red-500 pb-1">Gmail</span>
              </Link>
              <Link data-sticky href="#" className="group font-mono text-neutral-400 hover:text-red-500 transition-colors">
                <span className="border-b border-transparent group-hover:border-red-500 pb-1">+1 (559) 776-2242</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
