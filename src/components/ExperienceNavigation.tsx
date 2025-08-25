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
import './ExperienceNavigation.css';

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
      className="flex items-center justify-center space-x-3 sm:space-x-5 md:space-x-7 mb-12 px-6 py-4 overflow-x-auto scrollbar-hide"
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
              experience-tab group relative px-4 py-3 sm:px-5 sm:py-4 font-mono text-lg sm:text-xl font-medium 
              transition-all duration-500 ease-out hover:scale-105 hover:transform 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              min-w-[50px] sm:min-w-[60px] min-h-[50px] sm:min-h-[60px] 
              flex items-center justify-center flex-shrink-0 touch-manipulation
              rounded-xl backdrop-blur-sm
              ${isActive 
                ? `experience-tab-active text-[#81901D] font-bold transform scale-105 shadow-xl` 
                : `${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'} opacity-50 hover:opacity-90 hover:text-[#81901D]`
              }
              ${isDarkMode 
                ? 'focus:ring-[#81901D] focus:ring-offset-[#1A1A1A]' 
                : 'focus:ring-[#81901D] focus:ring-offset-[#EAEAC2]'
              }
            `}
          >
            {/* Number with subtle text shadow */}
            <span className={`relative z-10 ${isActive ? 'drop-shadow-sm' : ''}`}>
              {tabNumber}
            </span>
            
            {/* Active state background with gradient */}
            <div
              className={`
                absolute inset-0 rounded-xl transition-all duration-500 ease-out -z-10
                ${isActive 
                  ? `bg-gradient-to-br ${isDarkMode 
                      ? 'from-[#81901D]/15 via-[#81901D]/10 to-[#433E0E]/5' 
                      : 'from-[#81901D]/12 via-[#81901D]/8 to-[#433E0E]/3'
                    } shadow-xl shadow-[#81901D]/25 border border-[#81901D]/20` 
                  : 'bg-transparent'
                }
              `}
            />
            
            {/* Hover effect background */}
            <div
              className={`
                absolute inset-0 rounded-xl transition-all duration-300 ease-out -z-20
                ${!isActive 
                  ? `bg-gradient-to-br ${isDarkMode 
                      ? 'from-[#433E0E]/0 to-[#433E0E]/0 group-hover:from-[#433E0E]/8 group-hover:to-[#433E0E]/4' 
                      : 'from-[#433E0E]/0 to-[#433E0E]/0 group-hover:from-[#433E0E]/6 group-hover:to-[#433E0E]/3'
                    } group-hover:shadow-lg group-hover:shadow-[#433E0E]/15 group-hover:border group-hover:border-[#433E0E]/10` 
                  : ''
                }
              `}
            />
            
            {/* Subtle inner glow for active state */}
            {isActive && (
              <div
                className={`
                  absolute inset-1 rounded-lg transition-all duration-500 ease-out -z-5
                  bg-gradient-to-br ${isDarkMode 
                    ? 'from-[#81901D]/5 to-transparent' 
                    : 'from-[#81901D]/8 to-transparent'
                  }
                `}
              />
            )}
            
            {/* Focus indicator */}
            <div
              className={`
                absolute inset-0 rounded-xl border-2 transition-all duration-300 ease-out -z-30
                ${isActive 
                  ? 'border-transparent' 
                  : 'border-transparent focus-within:border-[#81901D] focus-within:border-opacity-60 focus-within:shadow-lg focus-within:shadow-[#81901D]/20'
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