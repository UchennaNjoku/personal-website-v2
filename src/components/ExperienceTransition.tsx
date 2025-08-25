/**
 * ExperienceTransition Component
 * Handles smooth transitions between experience content changes
 * Implements fade in/out animations with consistent layout dimensions
 * Optimized for performance using CSS transforms and GPU acceleration
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ExperienceTransitionProps } from '@/types/experience';
import './ExperienceTransition.css';

const ExperienceTransition: React.FC<ExperienceTransitionProps> = ({
  children,
  isTransitioning,
  transitionKey
}) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure content height to maintain consistent layout
  const measureHeight = useCallback(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContainerHeight(height);
    }
  }, []);

  // Handle content transitions
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check if content has actually changed
    const hasContentChanged = transitionKey !== currentKey;
    
    if (isTransitioning && hasContentChanged) {
      // Measure current height before transition
      measureHeight();
      
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, update content and fade in
      timeoutRef.current = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentKey(transitionKey);
        
        // Small delay to ensure DOM update, then fade in
        requestAnimationFrame(() => {
          setIsVisible(true);
          // Reset height after transition completes
          setTimeout(() => {
            setContainerHeight(undefined);
          }, 300);
        });
      }, 200); // 200ms fade out duration
    } else if (!isTransitioning) {
      // Not transitioning, show content immediately
      setDisplayChildren(children);
      setCurrentKey(transitionKey);
      setIsVisible(true);
      setContainerHeight(undefined);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [children, isTransitioning, transitionKey, currentKey, measureHeight]);

  // Measure height on mount and when content changes
  useEffect(() => {
    measureHeight();
  }, [displayChildren, measureHeight]);

  return (
    <div 
      className="experience-transition-wrapper relative w-full"
      style={{
        minHeight: containerHeight ? `${containerHeight}px` : '400px',
        height: containerHeight ? `${containerHeight}px` : 'auto'
      }}
    >
      {/* Main content container with consistent dimensions */}
      <div 
        ref={contentRef}
        className={`
          experience-transition-content
          absolute inset-0 w-full
          ${isVisible ? 'fade-in opacity-100' : 'fade-out opacity-0'}
        `}
      >
        {displayChildren}
      </div>
      
      {/* Loading overlay during transition */}
      {isTransitioning && !isVisible && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="experience-transition-loading w-1 h-1 bg-current opacity-20 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ExperienceTransition;