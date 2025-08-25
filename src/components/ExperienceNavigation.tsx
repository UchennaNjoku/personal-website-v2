/**
 * ExperienceNavigation Component
 * 
 * Renders numbered tab navigation (00, 01, 02, 03, 04) for the interactive experience section.
 * Features theme-aware styling, active tab highlighting, smooth hover transitions, and keyboard navigation.
 * 
 * Requirements: 1.1, 1.3, 1.4
 */

import React, { useCallback } from 'react';
import { ExperienceNavigationProps } from '@/types/experience';

const ExperienceNavigation: React.FC<ExperienceNavigationProps> = ({
  activeIndex,
  onTabClick,
  experienceCount,
  isDarkMode
}) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : experienceCount - 1;
        onTabClick(prevIndex);
        // Focus the previous tab
        setTimeout(() => {
          const prevTab = document.getElementById(`experience-tab-${prevIndex}`);
          prevTab?.focus();
        }, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = index < experienceCount - 1 ? index + 1 : 0;
        onTabClick(nextIndex);
        // Focus the next tab
        setTimeout(() => {
          const nextTab = document.getElementById(`experience-tab-${nextIndex}`);
          nextTab?.focus();
        }, 0);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onTabClick(index);
        break;
      case 'Home':
        event.preventDefault();
        onTabClick(0);
        setTimeout(() => {
          const firstTab = document.getElementById(`experience-tab-0`);
          firstTab?.focus();
        }, 0);
        break;
      case 'End':
        event.preventDefault();
        onTabClick(experienceCount - 1);
        setTimeout(() => {
          const lastTab = document.getElementById(`experience-tab-${experienceCount - 1}`);
          lastTab?.focus();
        }, 0);
        break;
    }
  }, [onTabClick, experienceCount]);

  return (
    <nav 
      className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-8 px-4 overflow-x-auto"
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
              group relative px-4 py-3 sm:px-6 font-mono text-base sm:text-lg font-medium 
              transition-all duration-300 ease-in-out hover:scale-105 hover:transform 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              min-w-[50px] sm:min-w-[60px] min-h-[48px] flex items-center justify-center
              flex-shrink-0 touch-manipulation
              ${isActive 
                ? `${isDarkMode ? 'text-[#81901D]' : 'text-[#81901D]'} font-bold transform scale-105` 
                : `${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-60 hover:opacity-100 hover:text-[#81901D]`
              }
              ${isDarkMode 
                ? 'focus:ring-[#81901D] focus:ring-offset-[#1A1A1A]' 
                : 'focus:ring-[#81901D] focus:ring-offset-[#EAEAC2]'
              }
            `}
          >
            {tabNumber}
            
            {/* Active indicator underline with slide animation */}
            <div
              className={`
                absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ease-in-out
                ${isActive 
                  ? 'bg-[#81901D] w-full scale-x-100' 
                  : 'bg-[#81901D] w-0 scale-x-0 group-hover:w-3/4 group-hover:scale-x-100'
                }
              `}
            />
            
            {/* Hover effect background with subtle glow */}
            <div
              className={`
                absolute inset-0 rounded-lg transition-all duration-300 ease-in-out -z-10
                ${isActive 
                  ? 'bg-[#81901D] bg-opacity-10 shadow-lg shadow-[#81901D]/20' 
                  : 'bg-[#433E0E] bg-opacity-0 group-hover:bg-opacity-8 group-hover:shadow-md group-hover:shadow-[#433E0E]/10'
                }
              `}
            />
            
            {/* Focus indicator */}
            <div
              className={`
                absolute inset-0 rounded-lg border-2 transition-all duration-200 ease-in-out -z-10
                ${isActive 
                  ? 'border-[#81901D] border-opacity-30' 
                  : 'border-transparent focus-within:border-[#81901D] focus-within:border-opacity-50'
                }
              `}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default ExperienceNavigation;