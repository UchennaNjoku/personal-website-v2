/**
 * Tests for ExperienceContent component
 * Verifies content rendering, theme application, and data handling
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceContent from '../ExperienceContent';
import { Experience } from '@/types/experience';

// Mock experience data for testing
const mockExperience: Experience = {
  id: '00',
  company: 'Test Company',
  position: 'Software Engineer',
  period: 'Jan 2024 - Dec 2024',
  logo: <div data-testid="company-logo">Logo</div>,
  achievements: [
    'First achievement with technical details',
    'Second achievement showing impact',
    'Third achievement demonstrating skills'
  ]
};

const mockExperienceWithSub: Experience = {
  id: '01',
  company: 'Multi-Role Company',
  position: 'Senior Engineer',
  period: '2023-2024',
  logo: <div data-testid="company-logo">Logo</div>,
  achievements: [
    'Main role achievement'
  ],
  subExperiences: [
    {
      id: '01-1',
      company: 'Multi-Role Company',
      position: 'Junior Engineer',
      period: 'Jan 2023 - Jun 2023',
      logo: <div>Logo</div>,
      achievements: [
        'Sub-role achievement 1',
        'Sub-role achievement 2'
      ]
    }
  ]
};

describe('ExperienceContent', () => {
  it('renders company information correctly', () => {
    render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
      />
    );

    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Jan 2024 - Dec 2024')).toBeInTheDocument();
    expect(screen.getByTestId('company-logo')).toBeInTheDocument();
  });

  it('renders all achievements', () => {
    render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
      />
    );

    expect(screen.getByText('First achievement with technical details')).toBeInTheDocument();
    expect(screen.getByText('Second achievement showing impact')).toBeInTheDocument();
    expect(screen.getByText('Third achievement demonstrating skills')).toBeInTheDocument();
  });

  it('applies text styling correctly', () => {
    render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={true}
      />
    );

    const companyName = screen.getByText('Test Company');
    expect(companyName).toHaveClass('text-text-primary');
  });

  it('renders sub-experiences when present', () => {
    render(
      <ExperienceContent 
        experience={mockExperienceWithSub}
        isDarkMode={false}
      />
    );

    expect(screen.getByText('Junior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Jan 2023 - Jun 2023')).toBeInTheDocument();
    expect(screen.getByText('Sub-role achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Sub-role achievement 2')).toBeInTheDocument();
  });

  it('renders correct number of sections', () => {
     render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
      />
    );

    // Should only have one border-t class (for achievements section)
    // The main container has a border-t for achievements.
    // We search for elements with 'border-t' class within the container.
    // Note: ExperienceContent component structure:
    // div > div.space-y-6 >
    //   div (header)
    //   div.border-t (achievements)
    //   div.border-t (sub-experiences - optional)

    const borderElements = document.querySelectorAll('.border-t');
    expect(borderElements).toHaveLength(1);
  });
});
