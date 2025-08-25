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

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
        }`}>
          Professional Experience
        </h2>
        <p className={`text-lg ${
          isDarkMode ? 'text-[#EAEAC2] opacity-80' : 'text-[#18020C] opacity-80'
        }`}>
          Navigate through my professional journey using the numbered tabs below.
        </p>
      </div>

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
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === activeIndex
                  ? isDarkMode ? 'bg-[#81901D]' : 'bg-[#433E0E]'
                  : isDarkMode ? 'bg-[#433E0E] opacity-30' : 'bg-[#433E0E] opacity-20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;