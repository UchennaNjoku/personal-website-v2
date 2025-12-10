/**
 * ExperienceContent Component
 * Style: Industrial / High-Tech
 */

import React from 'react';
import { ExperienceContentProps } from '@/types/experience';

const ExperienceContent: React.FC<ExperienceContentProps> = ({
  experience,
  isDarkMode
}) => {
  return (
    <div className="relative">
      {/* Main Content */}
      <div className="flex flex-col space-y-8">
        
        {/* Company Header Section */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Company Logo */}
          <div className="flex-shrink-0 p-4 border border-neutral-800 bg-neutral-900/50">
            {experience.logo}
          </div>
          
          {/* Company Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
              <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
                ACTIVE_RECORD
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              {experience.company}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-mono text-lg text-red-500">
                {experience.position}
              </h2>
              <span className="px-3 py-1 text-xs font-mono border border-neutral-700 text-neutral-400 bg-neutral-900/50">
                {experience.period}
              </span>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="font-mono text-xs text-red-500 tracking-widest uppercase">
              KEY_CONTRIBUTIONS
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-900/50 to-transparent"></div>
          </div>
          
          <div className="space-y-4">
            {experience.achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 group"
              >
                {/* Index Number */}
                <span className="font-mono text-xs text-neutral-600 mt-1 w-6">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                
                {/* Bullet Line */}
                <div className="w-[2px] h-full min-h-[24px] bg-neutral-800 group-hover:bg-red-600 transition-colors flex-shrink-0 mt-1" />
                
                {/* Achievement Text */}
                <p className="text-base md:text-lg leading-relaxed text-neutral-300 group-hover:text-white transition-colors">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-experiences (if any) */}
        {experience.subExperiences && experience.subExperiences.length > 0 && (
          <div className="border-t border-neutral-800 pt-8 space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">
                PREVIOUS_ROLES
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-red-900/50 to-transparent"></div>
            </div>
            
            {experience.subExperiences.map((subExp, index) => (
              <div key={index} className="pl-4 border-l-2 border-neutral-800 hover:border-red-900 transition-colors">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="font-mono text-lg text-white">
                    {subExp.position}
                  </h3>
                  <span className="px-2 py-1 text-xs font-mono border border-neutral-700 text-neutral-500">
                    {subExp.period}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {subExp.achievements.map((achievement, achIndex) => (
                    <div 
                      key={achIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0 bg-red-600/50" />
                      <p className="text-sm md:text-base leading-relaxed text-neutral-400">
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
