/**
 * TypeScript interfaces for Experience data model
 * Used for the interactive experience navigation feature
 */

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  logo: React.ReactNode | string;
  achievements: string[];
  subExperiences?: Experience[];
}

export interface ExperienceNavigationProps {
  activeIndex: number;
  onTabClick: (index: number) => void;
  experienceCount: number;
  isDarkMode: boolean;
}

export interface ExperienceContentProps {
  experience: Experience;
  isDarkMode: boolean;
}

export interface ExperienceTransitionProps {
  children: React.ReactNode;
  isTransitioning: boolean;
  transitionKey?: string | number; // Optional key to force re-render on content change
}