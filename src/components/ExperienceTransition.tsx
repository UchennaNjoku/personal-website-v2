/**
 * ExperienceTransition Component
 * Handles smooth transitions between experience content changes
 * Simplified implementation with clean fade transitions
 */

import React, { useEffect, useState } from 'react';
import { ExperienceTransitionProps } from '@/types/experience';
import './ExperienceTransition.css';

const ExperienceTransition: React.FC<ExperienceTransitionProps> = ({
  children,
  isTransitioning,
  transitionKey
}) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    if (isTransitioning) {
      // Start fade out
      setFadeClass('fade-out');
      
      // After fade out, update content and fade in
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setFadeClass('fade-in');
      }, 150); // Quick fade out
      
      return () => clearTimeout(timeout);
    } else {
      // Not transitioning, show content immediately
      setDisplayChildren(children);
      setFadeClass('fade-in');
    }
  }, [children, isTransitioning, transitionKey]);

  return (
    <div className="experience-transition-wrapper">
      <div className={`experience-transition-content ${fadeClass}`}>
        {displayChildren}
      </div>
    </div>
  );
};

export default ExperienceTransition;