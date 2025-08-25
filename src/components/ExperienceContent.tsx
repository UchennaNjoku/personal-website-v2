/**
 * ExperienceContent Component
 * Displays the content for the currently selected experience
 * Supports dark/light mode theming and maintains existing styling patterns
 */

import React from 'react';
import { ExperienceContentProps } from '@/types/experience';

const ExperienceContent: React.FC<ExperienceContentProps> = ({
  experience,
  isDarkMode
}) => {
  return (
    <div>
      <div className="flex flex-col space-y-6">
        {/* Company Header Section */}
        <div className="flex flex-row items-start w-full">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {experience.logo}
          </div>
          
          {/* Company Info */}
          <div className="flex flex-col justify-start ml-6 flex-1">
            <h1 className={`text-2xl md:text-4xl font-bold text-left ${
              isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
            }`}>
              {experience.company}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <h2 className={`text-lg md:text-xl font-semibold ${
                isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
              }`}>
                {experience.position}
              </h2>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                isDarkMode 
                  ? 'text-[#433E0E] bg-[#433E0E] bg-opacity-20' 
                  : 'text-[#433E0E] bg-[#433E0E] bg-opacity-10'
              }`}>
                {experience.period}
              </span>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`border-t pt-6 ${
          isDarkMode 
            ? 'border-[#433E0E] border-opacity-20' 
            : 'border-[#433E0E] border-opacity-20'
        }`}>
          <div className="space-y-4">
            {experience.achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3"
              >
                {/* Bullet Point */}
                <div className={`w-2 h-2 rounded-full mt-3 flex-shrink-0 ${
                  isDarkMode ? 'bg-[#81901D]' : 'bg-[#433E0E]'
                }`} />
                
                {/* Achievement Text */}
                <p className={`text-base md:text-lg leading-relaxed ${
                  isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
                }`}>
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-experiences (if any) */}
        {experience.subExperiences && experience.subExperiences.length > 0 && (
          <div className={`border-t pt-6 space-y-6 ${
            isDarkMode 
              ? 'border-[#433E0E] border-opacity-20' 
              : 'border-[#433E0E] border-opacity-20'
          }`}>
            {experience.subExperiences.map((subExp, index) => (
              <div key={index} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className={`text-lg md:text-xl font-semibold ${
                    isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
                  }`}>
                    {subExp.position}
                  </h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isDarkMode 
                      ? 'text-[#433E0E] bg-[#433E0E] bg-opacity-20' 
                      : 'text-[#433E0E] bg-[#433E0E] bg-opacity-10'
                  }`}>
                    {subExp.period}
                  </span>
                </div>
                
                <div className="space-y-3 ml-4">
                  {subExp.achievements.map((achievement, achIndex) => (
                    <div 
                      key={achIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-3.5 flex-shrink-0 ${
                        isDarkMode ? 'bg-[#81901D]' : 'bg-[#433E0E]'
                      }`} />
                      <p className={`text-base md:text-lg leading-relaxed ${
                        isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'
                      }`}>
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceContent;