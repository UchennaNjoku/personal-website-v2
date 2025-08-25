/**
 * ExperienceSection Component
 * Complete experience section with navigation, content, and smooth transitions
 * Demonstrates integration of ExperienceTransition with other components
 */

import React, { useState, useCallback } from 'react';
import ExperienceNavigation from './ExperienceNavigation';
import ExperienceContent from './ExperienceContent';
import ExperienceTransition from './ExperienceTransition';
import { experiences } from '@/data/experiences';
import { useColors } from '@/hooks/useColors';

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const colors = useColors(isDarkMode);

  const handleTabClick = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning) return;

    // Start transition
    setIsTransitioning(true);

    // Update active index immediately for navigation UI
    setActiveIndex(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Simplified timing: 150ms fade out + 150ms fade in
  }, [activeIndex, isTransitioning]);

  const currentExperience = experiences[activeIndex];

  return (
    <section className="py-16 flex flex-col m-auto justify-center mb-20 md:mb-48 text-text-primary px-4 transition-colors duration-300 relative">
      <div className="w-full max-w-5xl m-auto mb-12">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">/experience</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
            <span className="text-sm text-text-secondary">my career!</span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-text-secondary">explore my professional journey 👣</p>
      </div>

      <div className="max-w-5xl m-auto mt-8">
        {/* Experience Navigation */}
        <div className="mb-8">
          <ExperienceNavigation
            activeIndex={activeIndex}
            onTabClick={handleTabClick}
            experienceCount={experiences.length}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Experience Content with Smooth Transitions */}
        <div className="relative">
          <ExperienceTransition
            isTransitioning={isTransitioning}
            transitionKey={activeIndex}
          >
            <ExperienceContent
              experience={currentExperience}
              isDarkMode={isDarkMode}
            />
          </ExperienceTransition>
        </div>

        {/* Optional: Progress indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {experiences.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === activeIndex
                  ? 'bg-brand-secondary' 
                  : 'bg-brand-primary opacity-30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;