"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import Footer from "./components/Footer";
import Header from "./components/Header"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import StickyCursor from "@/components/StickyCursor";
import ExperienceSection from "@/components/ExperienceSection";

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
        // Dynamically calculate header height for accuracy
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;

        // Get element position relative to document using getBoundingClientRect for accuracy
        const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = Math.max(0, elementPosition - headerHeight - 20); // Extra padding and ensure non-negative

        // Check for smooth scrolling support and provide fallback
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback for older browsers
          window.scrollTo(0, targetPosition);
        }

        // Development mode debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`Scrolling to section with header height: ${headerHeight}px, target position: ${targetPosition}px`);
        }
      } else {
        // Fallback to hash-based navigation if ref is not available
        const sectionId = ref === experienceRef ? 'experience' :
          ref === worksRef ? 'works' :
            ref === contactRef ? 'contact' : null;

        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const targetPosition = Math.max(0, elementPosition - headerHeight - 20);

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            if (process.env.NODE_ENV === 'development') {
              console.log(`Fallback: Scrolled to section ${sectionId} using getElementById`);
            }
          } else {
            // Last resort: try hash navigation
            window.location.hash = sectionId;
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Fallback: Used hash navigation for section ${sectionId}`);
            }
          }
        } else {
          // Development mode warning for missing refs
          if (process.env.NODE_ENV === 'development') {
            console.warn('ScrollToRef called but ref.current is null and no fallback section ID found');
          }
        }
      }
    } catch (error) {
      // Error handling for any unexpected issues
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in scrollToRef:', error);
      }

      // Try basic hash navigation as last resort
      const sectionId = ref === experienceRef ? 'experience' :
        ref === worksRef ? 'works' :
          ref === contactRef ? 'contact' : null;

      if (sectionId) {
        try {
          window.location.hash = sectionId;
        } catch (hashError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Even hash navigation failed:', hashError);
          }
        }
      }
    }
  };

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize dark mode from localStorage (default to dark mode)
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) {
      // First time visitor - default to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on escape key and manage body scroll
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
      <main className={`${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#EAEAC2]'} relative w-full overflow-x-hidden transition-colors duration-300`}>

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
        <section className={`flex flex-col m-auto justify-center min-h-screen px-4 py-10 md:py-0 md:h-screen max-w-5xl ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} transition-colors duration-300 relative`}>
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl m-0 leading-tight"><b>Hi,</b><span role="img" className='waveanim' aria-label="sheep">👋🏼</span> <b>I&apos;m</b> <b>Uchenna Njoku</b>, <span className="bg-gradient-to-r from-[#C75434] via-[#E67E22] to-[#F39C12] bg-clip-text text-transparent gradient-animate"><b>I build things </b></span><span className="bg-gradient-to-r from-[#81901D] to-[#718010] bg-clip-text text-transparent gradient-animate"><b>with code.</b></span></h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <p className={`text-sm mb-2  ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>see what I&apos;ve done</p>
            <div className="scroll-indicator">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} scroll-glow`}
              >
                <path
                  d="M12 5V19M12 19L7 14M12 19L17 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>

        <section className={`flex flex-col min-h-screen m-auto justify-center px-4 py-10 md:py-0 md:h-screen max-w-5xl ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} transition-colors duration-300 relative`}>

          <div id="experience" ref={experienceRef} className="flex flex-col">
            <div className="flex flex-col space-y-8">
              {/* About me - smaller, less prominent */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl m-0 mb-4">I&apos;m a software engineer driven by curiosity, precision, and a love for solving complex problems.</h2>
                <p className="text-base md:text-lg lg:text-xl m-0 opacity-80">I enjoy applying clean design patterns and elegant solutions</p>
              </div>

              {/* Work experience - more prominent */}
              <ExperienceSection isDarkMode={isDarkMode} />
            </div>
          </div>

      {/* Scroll Indicator to Works */}
      <div className="mt-32 flex flex-col items-center">
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>see my work</p>
        <div className="scroll-indicator">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} scroll-glow`}
          >
            <path
              d="M12 5V19M12 19L7 14M12 19L17 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>

        <section id="works" ref={worksRef} className={`py-16 flex flex-col m-auto justify-center mb-20 md:mb-48 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} px-4 transition-colors duration-300 relative`}>
          <div className="w-full max-w-5xl m-auto mb-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#433E0E] to-[#81901D] bg-clip-text text-transparent">My Work</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#433E0E]' : 'bg-[#433E0E]'} animate-pulse`}></div>
                <span className={`text-sm ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>projects I&apos;ve built</span>
              </div>
            </div>
            <p className="text-lg md:text-xl opacity-80">Some stuff I&apos;ve worked on 👨🏽‍💻</p>
          </div>

          <div className="max-w-5xl m-auto mt-8">
            <div className="group">
              <div className="flex flex-col w-full min-h-[160px] p-6 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-start w-full h-full gap-6">
                  <div className="flex-shrink-0">
                    <h1 className="text-[#433E0E] font-black text-5xl md:text-6xl">01</h1>
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} mb-2`}>VolSurf-CPP - Volatility Surface Engine</h1>
                    <p className="text-sm md:text-base opacity-70 mb-3">Developed a high-performance, arbitrage-free volatility surface engine in C++17 with Python bindings (pybind11), featuring multi-threaded implied volatility solvers and constrained spline fitting using OpenMP.</p>
                    <p className="text-sm md:text-base opacity-70 mb-4">Automated option pricing research pipeline with QuantLib-benchmarked pricers, data ingestion from Yahoo Finance & Polygon.io, and interactive 3D surface visualization dashboards using Plotly and Streamlit</p>
                    <div className="flex flex-row gap-6">
                      <Link data-sticky href={"#"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        View Project
                      </Link>
                      <Link data-sticky href={"#"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        See Github
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl m-auto mt-8">
            <div className="group">
              <div className="flex flex-col w-full min-h-[160px] p-6 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-start w-full h-full gap-6">
                  <div className="flex-shrink-0">
                    <h1 className="text-[#433E0E] font-black text-5xl md:text-6xl">02</h1>
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} mb-2`}>WildTrack - Mobile Attendance System</h1>
                    <p className="text-sm md:text-base opacity-70 mb-3">A comprehensive mobile attendance tracking system leveraging NFC technology for secure, contactless check-ins in educational institutions.</p>
                    <p className="text-sm md:text-base opacity-70 mb-4">Built with React Native, Supabase, and NFC integration to prevent proxy attendance and streamline class management for educators</p>
                    <div className="flex flex-row gap-6">
                      <Link data-sticky href={"#"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        View Project
                      </Link>
                      <Link data-sticky href={"#"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        See Github
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl m-auto mt-8">
            <div className="group">
              <div className="flex flex-col w-full min-h-[160px] p-6 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-start w-full h-full gap-6">
                  <div className="flex-shrink-0">
                    <h1 className="text-[#433E0E] font-black text-5xl md:text-6xl">03</h1>
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} mb-2`}>Thriv - Personal Fitness Companion</h1>
                    <p className="text-sm md:text-base opacity-70 mb-3">A comprehensive mobile fitness application designed to help users achieve their health and wellness goals through personalized workout plans, nutrition tracking, and progress monitoring.</p>
                    <p className="text-sm md:text-base opacity-70 mb-4">Built with React Native and Firebase, featuring real-time data synchronization, custom workout builder, meal planning tools, and social features for community engagement and motivation</p>
                    <div className="flex flex-row gap-6">
                      <Link data-sticky href={"https://thriv-app.vercel.app/"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        View Project
                      </Link>
                      <Link data-sticky href={"https://github.com/UchennaNjoku/Thriv"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        See Github
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl m-auto mt-8">
            <div className="group">
              <div className="flex flex-col w-full min-h-[160px] p-6 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-start w-full h-full gap-6">
                  <div className="flex-shrink-0">
                    <h1 className="text-[#433E0E] font-black text-5xl md:text-6xl">04</h1>
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} mb-2`}>Munchies Recipes</h1>
                    <p className="text-sm md:text-base opacity-70 mb-3">The recipe web app that helps you find the perfect recipe for any meal</p>
                    <p className="text-sm md:text-base opacity-70 mb-4">Developed using React and TailwindCSS, leveraging the Spoonacular API to get results</p>
                    <div className="flex flex-row gap-6">
                      <Link data-sticky href={"https://munchies-recipes.vercel.app/"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        View Project
                      </Link>
                      <Link data-sticky href={"https://github.com/UchennaNjoku/munchies-recipes"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        See Github
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl m-auto mt-8">
            <div className="group">
              <div className="flex flex-col w-full min-h-[160px] p-6 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row items-start w-full h-full gap-6">
                  <div className="flex-shrink-0">
                    <h1 className="text-[#433E0E] font-black text-5xl md:text-6xl">05</h1>
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} mb-2`}>Sentinel Staffing</h1>
                    <p className="text-sm md:text-base opacity-70 mb-4">Redesigned the web application portal for Sentinel Staffing Solutions. Developed using React and TailwindCSS</p>
                    <div className="flex flex-row gap-6">
                      <Link data-sticky href={"https://sentinel-staffing.vercel.app/"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        View Project
                      </Link>
                      <Link data-sticky href={"https://github.com/UchennaNjoku/sentinel-staffing"} className="text-sm md:text-base underline hover:no-underline hover:text-[#81901D] transition-all duration-200 cursor-pointer">
                        See Github
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator to Contact */}
          <div className="flex flex-col items-center mt-8">
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>let&apos;s connect</p>
            <div className="scroll-indicator">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} scroll-glow`}
              >
                <path
                  d="M12 5V19M12 19L7 14M12 19L17 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </section>

        <footer id="contact" ref={contactRef} className="bg-[#433E0E] rounded-t-3xl text-[#EAEAC2] pt-12 md:pt-36">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">Get in touch! <span className="contact-anim">📬</span></h2>
              <p className="mx-auto max-w-[600px] text-[#EAEAC2] text-sm md:text-base lg:text-lg xl:text-xl/relaxed">
                I am always eager for new opportunities and collaborations. Feel free to reach out to me via the following platforms.
              </p>
            </div>

            <div className="flex flex-wrap w-full justify-center gap-6 md:gap-12 mt-12 md:mt-24 mb-6 px-4">
              <Link data-sticky className="text-[#EAEAC2] h-fit w-fit hover:text-white" href="https://www.linkedin.com/in/uchennanjoku/">
                LinkedIn
              </Link>
              <Link data-sticky className="text-[#EAEAC2] h-fit w-fit hover:text-white" href="https://github.com/UchennaNjoku">
                GitHub
              </Link>
              <Link data-sticky className="text-[#EAEAC2] h-fit w-fit hover:text-white" href="mailto:uchenna.c.njoku@gmail.com">
                Gmail
              </Link>
              <Link data-sticky className="text-[#EAEAC2] h-fit w-fit hover:text-white" href="#">
                +1 (559) 776-2242
              </Link>
            </div>
          </div>
          <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-[#EAEAC2]">© 2025 Uchenna Njoku. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </footer>

      </main >
    </>
  );
}