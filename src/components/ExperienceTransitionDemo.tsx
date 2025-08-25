/**
 * ExperienceTransitionDemo Component
 * Demo component to test the ExperienceTransition functionality
 * Shows how to integrate the transition wrapper with experience content
 */

import React, { useState } from 'react';
import ExperienceTransition from './ExperienceTransition';
import ExperienceContent from './ExperienceContent';
import { experiences } from '@/data/experiences';

const ExperienceTransitionDemo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDarkMode] = useState(true); // For demo purposes

  const handleTabClick = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Total transition time (200ms out + 300ms in)
  };

  const currentExperience = experiences[activeIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Experience Transition Demo
      </h2>
      
      {/* Simple navigation for demo */}
      <div className="flex space-x-4 mb-8">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            disabled={isTransitioning}
            className={`
              px-4 py-2 rounded font-mono text-sm
              transition-colors duration-200
              ${activeIndex === index 
                ? 'bg-[#81901D] text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {String(index).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Experience content with transition wrapper */}
      <ExperienceTransition
        isTransitioning={isTransitioning}
        transitionKey={activeIndex}
      >
        <ExperienceContent
          experience={currentExperience}
          isDarkMode={isDarkMode}
        />
      </ExperienceTransition>
      
      {/* Transition status indicator */}
      <div className="mt-4 text-sm text-gray-400">
        Status: {isTransitioning ? 'Transitioning...' : 'Ready'}
      </div>
    </div>
  );
};

export default ExperienceTransitionDemo;