/**
 * Example integration of ExperienceNavigation and ExperienceContent components
 * Demonstrates how the components work together for the interactive experience section
 */

import React, { useState } from 'react';
import ExperienceNavigation from './ExperienceNavigation';
import ExperienceContent from './ExperienceContent';
import { experiences } from '@/data/experiences';

interface ExperienceContentExampleProps {
  isDarkMode?: boolean;
}

const ExperienceContentExample: React.FC<ExperienceContentExampleProps> = ({ 
  isDarkMode = true 
}) => {
  const [activeExperience, setActiveExperience] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveExperience(index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Navigation */}
      <ExperienceNavigation
        activeIndex={activeExperience}
        onTabClick={handleTabClick}
        experienceCount={experiences.length}
        isDarkMode={isDarkMode}
      />

      {/* Content */}
      <div 
        role="tabpanel"
        id={`experience-panel-${activeExperience}`}
        aria-labelledby={`experience-tab-${activeExperience}`}
        className="min-h-[400px]"
      >
        <ExperienceContent
          experience={experiences[activeExperience]}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default ExperienceContentExample;