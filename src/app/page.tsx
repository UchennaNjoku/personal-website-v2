"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import Footer from "./components/Footer";
import GMLogo from "./gm.png";
import Munchies_Tablet from "./Munchies_Tablet.png";
import Cisco from "./cisco.png";
import ThrivMockup from "./ThrivMockup.png";
import Sentinel_Desktop from "./Sentinel_Desktop.png";
import GoldmanLogo from "./goldman.png";
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






export default function Home() {

  const experienceRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Function to scroll to a ref with explicit typing
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = ref.current.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
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

  return (
    <>
      <StickyCursor />
      <main className={`${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#EAEAC2]'} relative w-full overflow-x-hidden transition-colors duration-300`}>
        <header className='w-full absolute top-0 p-4 md:p-10'>
          <div className="flex w-full justify-between items-center m-auto max-w-8xl">
            <div className="flex-1 flex items-center">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} p-2 mr-4 hover:scale-110 transition-all duration-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center`}
                aria-label="Toggle Dark Mode"
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
                onClick={() => {
                  // Create mobile menu toggle function
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                  }
                }}
                className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} p-2 md:hidden touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center`}
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex justify-center items-center space-x-6 md:space-x-10">
              <button data-sticky onClick={() => scrollToRef(experienceRef)} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current`}>/experience</button>
              <button data-sticky onClick={() => scrollToRef(worksRef)} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current`}>/works</button>
              <button data-sticky onClick={() => scrollToRef(contactRef)} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} data-sticky font-normal hover:font-medium no-underline border-b border-transparent transition-all hover:border-current`}>/contact</button>
            </div>
            <div className='flex-1 flex justify-end'>
              <Link href={"/resume.pdf"} locale={false} target="_blank" rel="noopener noreferrer" className={`h-fit w-fit border-2 hover:bg-[#433E0E] hover:text-[#EAEAC2] transition-all border-[#433E0E] rounded-md px-3 py-2 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#433E0E]'} cursor-pointer touch-manipulation min-h-[44px] flex items-center`}>get my resume</Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className={`hidden w-full ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#EAEAC2]'} shadow-md absolute top-16 left-0 z-50 rounded-md mx-auto px-4 py-2 border border-[#433E0E] transition-colors duration-300`}>
            <div className="flex flex-col space-y-4 py-4">
              <button onClick={() => {
                scrollToRef(experienceRef);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
              }} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-3 hover:font-medium touch-manipulation min-h-[44px] text-left`}>/experience</button>
              <button onClick={() => {
                scrollToRef(worksRef);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
              }} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-3 hover:font-medium touch-manipulation min-h-[44px] text-left`}>/works</button>
              <button onClick={() => {
                scrollToRef(contactRef);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
              }} className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} font-normal py-3 hover:font-medium touch-manipulation min-h-[44px] text-left`}>/contact</button>
            </div>
          </div>
        </header>
        <section className={`flex flex-col m-auto justify-center min-h-screen px-4 py-10 md:py-0 md:h-screen max-w-5xl ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} transition-colors duration-300 relative`}>
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl m-0 leading-tight"><b>Hi,</b><span role="img" className='waveanim' aria-label="sheep">👋🏼</span> <b>I&apos;m</b> <b>Uchenna Njoku</b>, <span className="bg-gradient-to-r from-[#C75434] via-[#E67E22] to-[#F39C12] bg-clip-text text-transparent gradient-animate"><b>I build things </b></span><span className="bg-gradient-to-r from-[#81901D] to-[#718010] bg-clip-text text-transparent gradient-animate"><b>with code.</b></span></h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <p className={`text-sm mb-2  ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>scroll to explore</p>
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

          <div ref={experienceRef} className="flex flex-col">
            <div className="flex flex-col space-y-8">
              {/* About me - smaller, less prominent */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl m-0 mb-4">I&apos;m a software engineer based in Daytona Beach, Florida</h2>
                <p className="text-base md:text-lg lg:text-xl m-0 opacity-80">I have a knack for full-stack development, clean design patterns, human-computer interactions, and everything in between. I&apos;m quietly confident, naturally curious, and perpetually improving my chops one problem at a time!</p>
              </div>

              {/* Work experience - more prominent */}
              <div className="experience-highlight">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#433E0E] to-[#81901D] bg-clip-text text-transparent">Experience</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#433E0E]' : 'bg-[#433E0E]'} animate-pulse`}></div>
                    <span className={`text-sm ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-70`}>click to explore</span>
                  </div>
                </div>
                <div className="space-y-6">

                  <div className="group">
                    <Drawer>
                      <DrawerTrigger>
                        <div className="flex flex-col w-full min-h-[120px] p-4 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                          <div className="flex flex-row items-start w-full h-full">
                            <Image src={GoldmanLogo} alt="Goldman Sachs" width={64} height={64} className="rounded-lg" />
                            <div className="flex flex-col justify-start ml-6 flex-1 text-left">
                              <h1 className="text-2xl md:text-4xl font-bold text-left">Goldman Sachs</h1>
                              <p className="text-sm md:text-base opacity-70 mb-2 text-left">Software Engineer Intern • 2025</p>
                              <div data-sticky className={`flex flex-row items-center w-fit h-fit ${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} group-hover:text-[#81901D] transition-colors`}>
                                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
                                <p className="text-sm ml-1 font-medium">explore details</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>
                            <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">
                              <Image src={GoldmanLogo} alt="Goldman Sachs" width={50} height={50} className="rounded-lg" />
                              <h1 className="text-3xl">
                                Goldman Sachs
                              </h1>
                            </div>
                          </DrawerTitle>
                          <DrawerDescription>
                            <div className="flex flex-col items-center p-5">
                              <div className="border-b pb-6 mb-6 w-full">
                                <h2 className="text-xl md:text-2xl font-semibold flex items-center">
                                  <span>Software Engineer Intern</span>
                                  <span className="ml-auto text-sm text-[#433E0E]">Summer 2024</span>
                                </h2>
                                <div className="text-sm md:text-lg px-4 md:px-16 mt-4 space-y-2">
                                  <p>Developed a secure, scalable CSV report generation and download system for the Payroll Tax Calculator using Spring Boot, AWS ECS Fargate, Lambda, S3, and Aurora PostgreSQL.</p>
                                  <p>Implemented dynamic Java-based formatting and zero-knowledge password encryption, cutting processing time by 60% and ensuring full audit compliance.</p>
                                  <p>Led full-stack implementation of a U.S. Tax Reciprocity Rules Engine, designing OpenAPI-driven REST APIs and an accessible React + TypeScript UI for managing multi-state income tax exemptions.</p>
                                  <p>Eliminated 95% of manual entries and reduced compliance errors to zero for managing 46,000 employees across 30+ countries.</p>
                                </div>
                              </div>
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose>
                            <Button variant="outline">Close Window</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>

                  <div className="group">
                    <Drawer>
                      <DrawerTrigger>
                        <div className="flex flex-col w-full min-h-[120px] p-4 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                          <div className="flex flex-row items-start w-full h-full">
                            <svg width="64px" height="64px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Amazon-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-601.000000, -560.000000)"> <g id="Amazon" transform="translate(601.000000, 560.000000)"> <path d="M25.4026553,25.9595294 C24.660417,27.4418824 23.3876054,28.3962353 22.0103725,28.7181176 C21.8015298,28.7181176 21.4826213,28.8225882 21.1637129,28.8225882 C18.835399,28.8225882 17.458166,27.0211765 17.458166,24.3727059 C17.458166,20.9788235 19.4703937,19.392 22.0103725,18.6465882 C23.3876054,18.3303529 24.9793255,18.2230588 26.5682233,18.2230588 L26.5682233,19.4964706 C26.5682233,21.9331765 26.6726447,23.8390588 25.4026553,25.9595294 L25.4026553,25.9595294 Z M26.5682233,13.3524706 C25.1909904,13.4569412 23.5992703,13.5614118 22.0103725,13.7703529 C19.574815,14.0922353 17.1392576,14.5157647 15.1298521,15.4701176 C11.2098182,17.0597647 8.55977364,20.4508235 8.55977364,25.4287059 C8.55977364,31.6856471 12.5842289,34.8621176 17.6726531,34.8621176 C19.3659723,34.8621176 20.7432053,34.6475294 22.0103725,34.3341176 C24.0282445,33.696 25.7187415,32.5298824 27.7309692,30.4094118 C28.8965372,31.9990588 29.2182679,32.7444706 31.2276733,34.4385882 C31.7582467,34.6475294 32.28882,34.6475294 32.7093276,34.3341176 C33.9821392,33.2724706 36.208854,31.3637647 37.3715998,30.3049412 C37.9021732,29.8814118 37.7977518,29.2432941 37.4760212,28.7181176 C36.3132753,27.2329412 35.1448851,25.9595294 35.1448851,23.0992941 L35.1448851,13.5614118 C35.1448851,9.53505882 35.4666157,5.82494118 32.5004849,3.072 C30.0649275,0.849882353 26.2493149,0 23.2831841,0 L22.0103725,0 C16.6115064,0.313411765 10.8937319,2.64564706 9.61809814,9.32329412 C9.40643324,10.1731765 10.0442501,10.4894118 10.4675799,10.5938824 L16.3998415,11.3364706 C17.0348362,11.2291765 17.3537447,10.6983529 17.458166,10.1731765 C17.9859172,7.84094118 19.8937235,6.67482353 22.0103725,6.46023529 L22.4365245,6.46023529 C23.7093361,6.46023529 25.086569,6.99105882 25.8259851,8.05270588 C26.6726447,9.32329412 26.5682233,11.0202353 26.5682233,12.5054118 L26.5682233,13.3524706 L26.5682233,13.3524706 Z" fill="#343B45"> </path> <path d="M47.9943556,35.9463529 L47.9943556,35.9435294 C47.971778,35.4437647 47.8673567,35.0625882 47.658514,34.7463529 L47.6359364,34.7152941 L47.6105366,34.6842353 C47.3988717,34.4527059 47.1956734,34.3651765 46.9755419,34.2691765 C46.3179696,34.0150588 45.3612442,33.8795294 44.2097872,33.8767059 C43.382883,33.8767059 42.4713128,33.9557647 41.5540982,34.1562353 L41.551276,34.0941176 L40.6284171,34.4018824 L40.6114839,34.4103529 L40.0893771,34.5797647 L40.0893771,34.6023529 C39.47696,34.8564706 38.9209869,35.1727059 38.4045245,35.5482353 C38.0827939,35.7882353 37.8175072,36.1072941 37.8033962,36.5957647 C37.7949296,36.8611765 37.9303952,37.1661176 38.1533489,37.3468235 C38.3763025,37.5275294 38.6359448,37.5896471 38.8645429,37.5896471 C38.9181647,37.5896471 38.9689643,37.5868235 39.0141194,37.5783529 L39.0592746,37.5755294 L39.093141,37.5698824 C39.5446928,37.4738824 40.2022651,37.4089412 40.9727253,37.3016471 C41.6331198,37.2282353 42.3330251,37.1745882 42.9397978,37.1745882 C43.368772,37.1717647 43.7554132,37.2028235 44.0206999,37.2592941 C44.1533432,37.2875294 44.2521202,37.3214118 44.3057419,37.3496471 C44.3254973,37.3552941 44.3396083,37.3637647 44.3480749,37.3694118 C44.3593637,37.4061176 44.3762969,37.5021176 44.3734747,37.6348235 C44.3791191,38.1430588 44.164632,39.0861176 43.8683012,40.0065882 C43.5804369,40.9270588 43.2304843,41.8503529 42.999064,42.4630588 C42.94262,42.6042353 42.9059314,42.7595294 42.9059314,42.9289412 C42.900287,43.1745882 43.0018862,43.4738824 43.2163733,43.6715294 C43.425216,43.8691765 43.696147,43.9482353 43.9219229,43.9482353 L43.9332117,43.9482353 C44.2718756,43.9454118 44.5597398,43.8098824 44.8080933,43.6150588 C47.1505182,41.5087059 47.9661336,38.1430588 48,36.2484706 L47.9943556,35.9463529 Z M41.0489247,38.8658824 C40.8090378,38.8630588 40.5635065,38.9195294 40.3349084,39.0268235 C40.0780883,39.1284706 39.8156239,39.2470588 39.5672704,39.3515294 L39.2032068,39.504 L38.7290774,39.6931765 L38.7290774,39.6988235 C33.5785648,41.7882353 28.16841,43.0136471 23.1618295,43.1209412 C22.9783866,43.1265882 22.7921215,43.1265882 22.614323,43.1265882 C14.7403887,43.1322353 8.31706456,39.4785882 1.83729642,35.8785882 C1.61152053,35.76 1.37727804,35.6978824 1.15150215,35.6978824 C0.860815683,35.6978824 0.561662624,35.808 0.344353327,36.0112941 C0.12704403,36.2174118 -0.00277710907,36.5138824 4.50895989e-05,36.816 C-0.00277710907,37.2084706 0.208887791,37.5698824 0.505218651,37.8042353 C6.58705678,43.0870588 13.25309,47.9943529 22.2192152,48 C22.3941915,48 22.57199,47.9943529 22.7497885,47.9915294 C28.453452,47.8644706 34.902176,45.936 39.9087564,42.7905882 L39.9398006,42.7708235 C40.5945507,42.3783529 41.2493008,41.9322353 41.8673623,41.4381176 C42.2511813,41.1529412 42.516468,40.7068235 42.516468,40.2437647 C42.4995348,39.4221176 41.8024517,38.8658824 41.0489247,38.8658824 Z" id="Fill-237" fill="#FF9A00"> </path> </g> </g> </g> </g></svg>
                            <div className="flex flex-col justify-start ml-6 flex-1 text-left">
                              <h1 className="text-2xl md:text-4xl font-bold text-left">Amazon (AWS)</h1>
                              <p className="text-sm md:text-base opacity-70 mb-2 text-left">Software Engineer Intern • 2023-2024</p>
                              <div data-sticky className={`flex flex-row items-center w-fit h-fit ${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} group-hover:text-[#81901D] transition-colors`}>
                                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
                                <p className="text-sm ml-1 font-medium">explore details</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>
                            <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">

                              <svg width="50px" height="50px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Amazon-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-601.000000, -560.000000)"> <g id="Amazon" transform="translate(601.000000, 560.000000)"> <path d="M25.4026553,25.9595294 C24.660417,27.4418824 23.3876054,28.3962353 22.0103725,28.7181176 C21.8015298,28.7181176 21.4826213,28.8225882 21.1637129,28.8225882 C18.835399,28.8225882 17.458166,27.0211765 17.458166,24.3727059 C17.458166,20.9788235 19.4703937,19.392 22.0103725,18.6465882 C23.3876054,18.3303529 24.9793255,18.2230588 26.5682233,18.2230588 L26.5682233,19.4964706 C26.5682233,21.9331765 26.6726447,23.8390588 25.4026553,25.9595294 L25.4026553,25.9595294 Z M26.5682233,13.3524706 C25.1909904,13.4569412 23.5992703,13.5614118 22.0103725,13.7703529 C19.574815,14.0922353 17.1392576,14.5157647 15.1298521,15.4701176 C11.2098182,17.0597647 8.55977364,20.4508235 8.55977364,25.4287059 C8.55977364,31.6856471 12.5842289,34.8621176 17.6726531,34.8621176 C19.3659723,34.8621176 20.7432053,34.6475294 22.0103725,34.3341176 C24.0282445,33.696 25.7187415,32.5298824 27.7309692,30.4094118 C28.8965372,31.9990588 29.2182679,32.7444706 31.2276733,34.4385882 C31.7582467,34.6475294 32.28882,34.6475294 32.7093276,34.3341176 C33.9821392,33.2724706 36.208854,31.3637647 37.3715998,30.3049412 C37.9021732,29.8814118 37.7977518,29.2432941 37.4760212,28.7181176 C36.3132753,27.2329412 35.1448851,25.9595294 35.1448851,23.0992941 L35.1448851,13.5614118 C35.1448851,9.53505882 35.4666157,5.82494118 32.5004849,3.072 C30.0649275,0.849882353 26.2493149,0 23.2831841,0 L22.0103725,0 C16.6115064,0.313411765 10.8937319,2.64564706 9.61809814,9.32329412 C9.40643324,10.1731765 10.0442501,10.4894118 10.4675799,10.5938824 L16.3998415,11.3364706 C17.0348362,11.2291765 17.3537447,10.6983529 17.458166,10.1731765 C17.9859172,7.84094118 19.8937235,6.67482353 22.0103725,6.46023529 L22.4365245,6.46023529 C23.7093361,6.46023529 25.086569,6.99105882 25.8259851,8.05270588 C26.6726447,9.32329412 26.5682233,11.0202353 26.5682233,12.5054118 L26.5682233,13.3524706 L26.5682233,13.3524706 Z" fill="#343B45"> </path> <path d="M47.9943556,35.9463529 L47.9943556,35.9435294 C47.971778,35.4437647 47.8673567,35.0625882 47.658514,34.7463529 L47.6359364,34.7152941 L47.6105366,34.6842353 C47.3988717,34.4527059 47.1956734,34.3651765 46.9755419,34.2691765 C46.3179696,34.0150588 45.3612442,33.8795294 44.2097872,33.8767059 C43.382883,33.8767059 42.4713128,33.9557647 41.5540982,34.1562353 L41.551276,34.0941176 L40.6284171,34.4018824 L40.6114839,34.4103529 L40.0893771,34.5797647 L40.0893771,34.6023529 C39.47696,34.8564706 38.9209869,35.1727059 38.4045245,35.5482353 C38.0827939,35.7882353 37.8175072,36.1072941 37.8033962,36.5957647 C37.7949296,36.8611765 37.9303952,37.1661176 38.1533489,37.3468235 C38.3763025,37.5275294 38.6359448,37.5896471 38.8645429,37.5896471 C38.9181647,37.5896471 38.9689643,37.5868235 39.0141194,37.5783529 L39.0592746,37.5755294 L39.093141,37.5698824 C39.5446928,37.4738824 40.2022651,37.4089412 40.9727253,37.3016471 C41.6331198,37.2282353 42.3330251,37.1745882 42.9397978,37.1745882 C43.368772,37.1717647 43.7554132,37.2028235 44.0206999,37.2592941 C44.1533432,37.2875294 44.2521202,37.3214118 44.3057419,37.3496471 C44.3254973,37.3552941 44.3396083,37.3637647 44.3480749,37.3694118 C44.3593637,37.4061176 44.3762969,37.5021176 44.3734747,37.6348235 C44.3791191,38.1430588 44.164632,39.0861176 43.8683012,40.0065882 C43.5804369,40.9270588 43.2304843,41.8503529 42.999064,42.4630588 C42.94262,42.6042353 42.9059314,42.7595294 42.9059314,42.9289412 C42.900287,43.1745882 43.0018862,43.4738824 43.2163733,43.6715294 C43.425216,43.8691765 43.696147,43.9482353 43.9219229,43.9482353 L43.9332117,43.9482353 C44.2718756,43.9454118 44.5597398,43.8098824 44.8080933,43.6150588 C47.1505182,41.5087059 47.9661336,38.1430588 48,36.2484706 L47.9943556,35.9463529 Z M41.0489247,38.8658824 C40.8090378,38.8630588 40.5635065,38.9195294 40.3349084,39.0268235 C40.0780883,39.1284706 39.8156239,39.2470588 39.5672704,39.3515294 L39.2032068,39.504 L38.7290774,39.6931765 L38.7290774,39.6988235 C33.5785648,41.7882353 28.16841,43.0136471 23.1618295,43.1209412 C22.9783866,43.1265882 22.7921215,43.1265882 22.614323,43.1265882 C14.7403887,43.1322353 8.31706456,39.4785882 1.83729642,35.8785882 C1.61152053,35.76 1.37727804,35.6978824 1.15150215,35.6978824 C0.860815683,35.6978824 0.561662624,35.808 0.344353327,36.0112941 C0.12704403,36.2174118 -0.00277710907,36.5138824 4.50895989e-05,36.816 C-0.00277710907,37.2084706 0.208887791,37.5698824 0.505218651,37.8042353 C6.58705678,43.0870588 13.25309,47.9943529 22.2192152,48 C22.3941915,48 22.57199,47.9943529 22.7497885,47.9915294 C28.453452,47.8644706 34.902176,45.936 39.9087564,42.7905882 L39.9398006,42.7708235 C40.5945507,42.3783529 41.2493008,41.9322353 41.8673623,41.4381176 C42.2511813,41.1529412 42.516468,40.7068235 42.516468,40.2437647 C42.4995348,39.4221176 41.8024517,38.8658824 41.0489247,38.8658824 Z" id="Fill-237" fill="#FF9A00"> </path> </g> </g> </g> </g></svg>
                              <h1 className="text-3xl">
                                Amazon
                              </h1>
                            </div>
                          </DrawerTitle>
                          <DrawerDescription>
                            <div className="flex flex-col items-center p-5">

                              <div className="border-b pb-6 mb-6">
                                <h2 className="text-xl md:text-2xl font-semibold flex items-center">
                                  <span>Software Engineer Intern</span>
                                  <span className="ml-auto text-sm text-[#433E0E]">May 2024 - August 2024</span>
                                </h2>
                                <div className="text-sm md:text-lg px-4 md:px-16 mt-4 space-y-2">
                                  <p>Led the Local Compute Infrastructure (LCI) Bootloader Rollout project to streamline and automate deployment processes across 500+ global network sites.</p>
                                  <p>Developed a comprehensive release and deployment pipeline for new bootloader versions and PXE artifacts, reducing failures by 20% and projected to decrease system downtime by 30%.</p>
                                  <p>Created and implemented testing environments for bootloader validation, improving reliability of the global network infrastructure.</p>
                                </div>
                              </div>

                              <div>
                                <h2 className="text-xl md:text-2xl font-semibold flex items-center">
                                  <span>Software Engineer Intern</span>
                                  <span className="ml-auto text-sm text-[#433E0E]">May 2023 - August 2023</span>
                                </h2>
                                <div className="text-sm md:text-lg px-4 md:px-16 mt-4 space-y-2">
                                  <p>Architected the migration process of the internal AWS Network host generation workflow with automated pipelines, leveraging AWS Services such as CloudFormation, CloudWatch, AWS Lambda, and Cloud Development Kit, increasing site build speed by 40%.</p>
                                  <p>Increased robustness of 450+ AWS Network Centres which run over 1 million external services, resulting in increased reliability and manageability, implementing these changes using Typescript, Java, and Python.</p>
                                  <p>Assisted in network host initialization and maintenance processes, implementing status checkers to allow for ease of tracking in a user friendly interface to monitor metrics.</p>
                                </div>
                              </div>
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose>
                            <Button variant="outline">Close Window</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <div className="group">
                    <Drawer>
                      <DrawerTrigger>
                        <div className="flex flex-col w-full min-h-[120px] p-4 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                          <div className="flex flex-row items-start w-full h-full">
                            <Image src={Cisco} alt="Cisco" width={64} height={64} />
                            <div className="flex flex-col justify-start ml-6 flex-1 text-left">
                              <h1 className="text-2xl md:text-4xl font-bold text-left">Cisco</h1>
                              <p className="text-sm md:text-base opacity-70 mb-2 text-left">Software Engineer Intern • 2025</p>
                              <div data-sticky className={`flex flex-row items-center w-fit h-fit ${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} group-hover:text-[#81901D] transition-colors`}>
                                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
                                <p className="text-sm ml-1 font-medium">explore details</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>
                            <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">
                              <Image src={Cisco} alt="Cisco" width={56} height={56} />
                              <h1 className="text-3xl">
                                Cisco
                              </h1>
                            </div>
                          </DrawerTitle>
                          <DrawerDescription>
                            <div className="flex flex-col items-center p-5">
                              <div className="border-b pb-6 mb-6 w-full">
                                <h2 className="text-xl md:text-2xl font-semibold flex items-center">
                                  <span>Software Engineer Intern</span>
                                  <span className="ml-auto text-sm text-[#433E0E]">January 2025 - April 2025</span>
                                </h2>
                                <div className="text-sm md:text-lg px-4 md:px-16 mt-4 space-y-2">
                                  <p>Worked with the Maintenance Window Service team to build resilient systems for scheduled network maintenance across Cisco&apos;s global infrastructure.</p>
                                  <p>Spearheaded the refactoring of data ingestion systems to future-proof workflows and simplify modification processes as part of broader migration efforts within the organization.</p>
                                  <p>Implemented improved error handling and monitoring for critical maintenance window operations, resulting in 15% reduction in failed maintenance events.</p>
                                  <p>Collaborated with cross-functional teams to design flexible APIs that accommodate evolving data structures while maintaining backward compatibility.</p>
                                </div>
                              </div>
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose>
                            <Button variant="outline">Close Window</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <div className="group">
                    <Drawer>
                      <DrawerTrigger>
                        <div className="flex flex-col w-full min-h-[120px] p-4 rounded-lg border border-[#433E0E] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]">
                          <div className="flex flex-row items-start w-full h-full">
                            <Image src={GMLogo} alt="GM" width={64} height={64} />
                            <div className="flex flex-col justify-start ml-6 flex-1 text-left">
                              <h1 className="text-2xl md:text-4xl font-bold text-left">General Motors</h1>
                              <p className="text-sm md:text-base opacity-70 mb-2 text-left">EV Challenge Winner • 2023</p>
                              <div data-sticky className={`flex flex-row items-center w-fit h-fit ${isDarkMode ? 'text-[#433E0E]' : 'text-[#433E0E]'} group-hover:text-[#81901D] transition-colors`}>
                                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="currentColor"></path> </g></svg>
                                <p className="text-sm ml-1 font-medium">explore details</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>
                            <div className="flex flex-row w-screen items-center justify-center p-4 space-x-3">
                              <Image src={GMLogo} alt="GM" width={56} height={56} />
                              <h1 className="text-3xl">
                                General Motors EcoCAR EV Challenge
                              </h1>
                            </div>
                          </DrawerTitle>
                          <DrawerDescription>
                            <div className="flex flex-col items-center p-5">

                              <h2 className="text-xl md:text-2xl font-semibold">
                                Software Engineer (Connected and Autonomous Vehicles (CAVS))
                              </h2>
                              <div className="text-sm md:text-lg px-4 md:px-16 mt-4 space-y-2">
                                Engineered advanced vehicle control algorithms using MathWorks MATLAB and Simulink, enhancing vehicle performance and energy efficiency, utilising dSPACE for simulations in order to validate strategy implementations.
                                <br />Refined vast datasets from onboard sensors, applying Fourier and Wavelet transforms for noise reduction, leveraging Principal Component Analysis and t-distributed stochastic neighbour embedding (t-SNE) for data parsing with machine learning predictive models to glean insights into vehicle health and energy consumption.
                                <br />Implementing efficiency-oriented solutions and innovations to address the challenges inherent in electric vehicles over the four-year EcoCar EV competition as part of the Connected and Autonomous Vehicles (CAVS) subteam.
                              </div>
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <DrawerClose>
                            <Button variant="outline">Close Window</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </div>
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

        <section ref={worksRef} className={`py-16 flex flex-col m-auto justify-center mb-20 md:mb-48 ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} px-4 transition-colors duration-300 relative`}>
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

          <div className="flex flex-col md:flex-row max-w-5xl m-auto justify-between md:mt-8 gap-4">
            <div className="mt-8 md:mt-16">
              <Image src={ThrivMockup} className="w-full h-auto" width={1000} height={600} alt="Thriv" />
            </div>
            <div className="mt-6 md:mt-32 w-full flex flex-col md:items-end">
              <h1 className="text-[#433E0E] font-black text-5xl md:text-7xl">01</h1>
              <h1 className={`text-3xl md:text-5xl font-medium ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'}`}>Thriv</h1>
              <p className="text-lg md:text-xl font-regular w-full md:w-4/5">your personal fitness companion designed to help you dial in your fitness goals.</p>
              <p className="text-lg md:text-xl  font-regular w-full md:w-4/5">in development using React Native and Firebase<br /></p>
              <div className="flex flex-row justify-start w-full md:w-4/5">
                <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
                  <Link href={"https://thriv-app.vercel.app/"}> View Project</Link>
                </Button>
                <Button data-sticky variant="outline" className="mt-5 ml-3 h-fit w-fit">
                  <Link href={"https://github.com/UchennaNjoku/Thriv"}>See Github</Link>
                </Button>
              </div>
            </div>
          </div>


          <div className="flex flex-col md:flex-row max-w-5xl m-auto justify-between md:mt-8 gap-4">
            <div className="mt-6 md:mt-32 w-full md:py-14">
              <h1 className="text-[#433E0E] font-black text-5xl md:text-7xl">02</h1>
              <h1 className={`text-3xl md:text-5xl font-medium ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'}`}>Munchies Recipes</h1>
              <p className="text-lg md:text-xl font-regular w-full md:w-4/5">A recipe web application that helps you find the perfect recipe for any meal</p>
              <p className="text-lg md:text-xl font-regular w-full md:w-4/5">- Developed using React and TailwindCSS<br />- Leveraging the Spoonacular API to get results</p>
              <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
                <Link href={"https://munchies-recipes.vercel.app/"}> View Project</Link>
              </Button>
              <Button data-sticky variant="outline" className="h-fit w-fit mt-5 ml-3">
                <Link href={"https://github.com/UchennaNjoku/munchies-recipes"}>See Github</Link>
              </Button>
            </div>
            <div className="mt-8 md:mt-16">
              <Image src={Munchies_Tablet} className="w-full h-auto" width={1000} height={600} alt="Munchies" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-w-5xl m-auto justify-between md:mt-8 gap-4">
            <div className="mt-8 md:mt-16">
              <Image src={Sentinel_Desktop} className="w-full h-auto" width={900} height={500} alt="Sentinel Staffing" />
            </div>
            <div className="mt-6 md:mt-32 w-full flex flex-col md:items-end">
              <h1 className="text-[#433E0E] font-black text-7xl">03</h1>
              <h1 className={`text-3xl md:text-5xl font-medium ${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'}`}>Sentinel Staffing</h1>
              <p className="text-lg md:text-xl font-regular w-full md:w-4/5 mt-3">Redesigned the web application portal for Sentinel Staffing Solutions. Developed using React and TailwindCSS</p>
              <div className="flex flex-row justify-start w-full md:w-4/5">
                <Button data-sticky variant="outline" className="h-fit w-fit mt-5">
                  <Link href={"https://sentinel-staffing.vercel.app/"}> View Project</Link>
                </Button>
                <Button data-sticky variant="outline" className="h-fit w-fit mt-5 ml-3">
                  <Link href={"https://github.com/UchennaNjoku/sentinel-staffing"}>See Github</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator to Contact */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
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


        <footer ref={contactRef} className="bg-[#433E0E] rounded-t-3xl text-[#EAEAC2] pt-20 md:pt-36">
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
            <p className="text-xs text-[#EAEAC2]">© 2024 Uchenna Njoku. All rights reserved.</p>
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

      </main>
    </>
  );
}
