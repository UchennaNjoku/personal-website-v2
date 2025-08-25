/**
 * Demo component to test ExperienceContent integration
 * This component demonstrates the ExperienceContent component with real data
 */

import React, { useState } from 'react';
import ExperienceContent from './ExperienceContent';
import { experiences } from '@/data/experiences';

const ExperienceContentDemo: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-[#EAEAC2]'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Controls */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-[#433E0E] text-[#EAEAC2] hover:bg-[#433E0E] hover:bg-opacity-20' 
                : 'border-[#433E0E] text-[#18020C] hover:bg-[#433E0E] hover:bg-opacity-10'
            }`}
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
          
          <div className="flex gap-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`px-3 py-1 rounded text-sm font-mono transition-colors ${
                  currentIndex === index
                    ? isDarkMode 
                      ? 'bg-[#81901D] text-[#EAEAC2]' 
                      : 'bg-[#433E0E] text-[#EAEAC2]'
                    : isDarkMode
                      ? 'bg-[#433E0E] bg-opacity-20 text-[#EAEAC2] hover:bg-opacity-40'
                      : 'bg-[#433E0E] bg-opacity-10 text-[#18020C] hover:bg-opacity-20'
                }`}
              >
                {String(index).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Content */}
        <div className="bg-opacity-50 rounded-lg p-6">
          <ExperienceContent
            experience={experiences[currentIndex]}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Debug Info */}
        <div className={`mt-8 p-4 rounded-lg text-sm ${
          isDarkMode 
            ? 'bg-[#433E0E] bg-opacity-20 text-[#EAEAC2]' 
            : 'bg-[#433E0E] bg-opacity-10 text-[#18020C]'
        }`}>
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>Current Experience: {experiences[currentIndex].id} - {experiences[currentIndex].company}</p>
          <p>Dark Mode: {isDarkMode ? 'Enabled' : 'Disabled'}</p>
          <p>Achievements Count: {experiences[currentIndex].achievements.length}</p>
          <p>Has Sub-experiences: {experiences[currentIndex].subExperiences ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceContentDemo;