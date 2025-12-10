/**
 * ExperienceNavigation Component
 * Style: Industrial / High-Tech
 */

import React, { useCallback } from 'react';
import { ExperienceNavigationProps } from '@/types/experience';
import './ExperienceNavigation.css';

const ExperienceNavigation: React.FC<ExperienceNavigationProps> = ({
  activeIndex,
  onTabClick,
  experienceCount,
  isDarkMode
}) => {
  // Handle keyboard navigation (kept logic, updated visual refs)
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : experienceCount - 1;
        onTabClick(prevIndex);
        setTimeout(() => document.getElementById(`experience-tab-${prevIndex}`)?.focus(), 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = index < experienceCount - 1 ? index + 1 : 0;
        onTabClick(nextIndex);
        setTimeout(() => document.getElementById(`experience-tab-${nextIndex}`)?.focus(), 0);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onTabClick(index);
        break;
    }
  }, [onTabClick, experienceCount]);

  return (
    <nav 
      className="flex items-center justify-start space-x-1 sm:space-x-2 mb-12 px-2 py-4 overflow-x-auto scrollbar-hide border-b border-neutral-800/50"
      role="tablist"
      aria-label="Experience navigation"
    >
      {Array.from({ length: experienceCount }, (_, index) => {
        const isActive = index === activeIndex;
        const tabNumber = index.toString().padStart(2, '0');
        
        return (
          <button
            key={index}
            role="tab"
            aria-selected={isActive}
            aria-controls={`experience-panel-${index}`}
            id={`experience-tab-${index}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabClick(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`
              group relative px-6 py-4 font-mono text-lg font-bold tracking-widest
              transition-all duration-300 ease-out
              min-w-[80px] sm:min-w-[100px] 
              flex flex-col items-center justify-center flex-shrink-0
              border border-transparent
              rounded-sm outline-none
              ${isActive 
                ? 'text-white' 
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/30'
              }
            `}
          >
            {/* The Tab Number */}
            <span className="relative z-10 text-xs text-neutral-500 mb-1 opacity-70">CASE_FILE</span>
            <span className={`relative z-10 text-xl ${isActive ? 'text-red-500 shadow-red-500/50 drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]' : ''}`}>
              {tabNumber}
            </span>

            {/* Active Indicator Line (The "Laser" effect) */}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_-2px_10px_rgba(220,20,60,0.8)]" />
            )}
            
            {/* Passive Hover Border */}
            <div className={`absolute inset-0 border border-neutral-800 transition-opacity duration-300 ${isActive ? 'opacity-100 border-red-900/30 bg-red-950/10' : 'opacity-0 group-hover:opacity-100'}`} />

            {/* Corner Accents (Technical markers) */}
            {isActive && (
              <>
                <div className="absolute top-0 left-0 w-1 h-1 bg-red-500" />
                <div className="absolute top-0 right-0 w-1 h-1 bg-red-500" />
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default ExperienceNavigation;
