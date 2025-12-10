import React, { useState, useCallback } from 'react';
import ExperienceNavigation from './ExperienceNavigation';
import ExperienceContent from './ExperienceContent';
import ExperienceTransition from './ExperienceTransition';
import { experiences } from '@/data/experiences';

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabClick = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [activeIndex, isTransitioning]);

  const currentExperience = experiences[activeIndex];

  return (
    <section className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Background Decor - The Industrial Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-grid-pattern z-0" />
      
      {/* Background Decor - Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl m-auto">
        
        {/* Header Section - Brutalist Typography */}
        <div className="mb-16 border-l-4 border-red-600 pl-6">
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-mono text-red-500 text-sm tracking-widest uppercase">
              System Log // Professional Journey
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-red-900 to-transparent"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white/90 mb-2">
            Experience<span className="text-red-600">.</span>
          </h1>
          
          <p className="font-mono text-neutral-400 max-w-lg">
            [ LOADING CAREER_DATA... ] <br />
            Explore the archival footage of my engineering contributions.
          </p>
        </div>

        {/* Content Container - Glass Steel Look */}
        <div className="relative border border-neutral-800 bg-black/40 backdrop-blur-md">
          {/* Decorative Top Bar */}
          <div className="h-8 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-900/50">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
              <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
            </div>
            <div className="text-[10px] font-mono text-neutral-500">UID: {activeIndex.toString().padStart(3, '0')}</div>
          </div>

          <div className="p-2 sm:p-8">
            <ExperienceNavigation
              activeIndex={activeIndex}
              onTabClick={handleTabClick}
              experienceCount={experiences.length}
              isDarkMode={true}
            />

            <div className="relative mt-8 min-h-[400px]">
              <ExperienceTransition
                isTransitioning={isTransitioning}
                transitionKey={activeIndex}
              >
                <ExperienceContent
                  experience={currentExperience}
                  isDarkMode={true}
                />
              </ExperienceTransition>
            </div>
          </div>
          
          {/* Decorative Corner */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-600" />
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-600" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
