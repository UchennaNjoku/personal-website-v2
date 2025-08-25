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
        isVisible={true}
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
        isVisible={true}
      />
    );

    expect(screen.getByText('First achievement with technical details')).toBeInTheDocument();
    expect(screen.getByText('Second achievement showing impact')).toBeInTheDocument();
    expect(screen.getByText('Third achievement demonstrating skills')).toBeInTheDocument();
  });

  it('applies dark mode styling correctly', () => {
    const { container } = render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={true}
        isVisible={true}
      />
    );

    const companyName = screen.getByText('Test Company');
    expect(companyName).toHaveClass('text-[#EAEAC2]');
  });

  it('applies light mode styling correctly', () => {
    const { container } = render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
        isVisible={true}
      />
    );

    const companyName = screen.getByText('Test Company');
    expect(companyName).toHaveClass('text-[#18020C]');
  });

  it('handles visibility state correctly', () => {
    const { container } = render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
        isVisible={false}
      />
    );

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('opacity-0');
  });

  it('shows visible content when isVisible is true', () => {
    const { container } = render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
        isVisible={true}
      />
    );

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('opacity-100');
  });

  it('renders sub-experiences when present', () => {
    render(
      <ExperienceContent 
        experience={mockExperienceWithSub}
        isDarkMode={false}
        isVisible={true}
      />
    );

    expect(screen.getByText('Junior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Jan 2023 - Jun 2023')).toBeInTheDocument();
    expect(screen.getByText('Sub-role achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Sub-role achievement 2')).toBeInTheDocument();
  });

  it('does not render sub-experiences section when not present', () => {
    render(
      <ExperienceContent 
        experience={mockExperience}
        isDarkMode={false}
        isVisible={true}
      />
    );

    // Should only have one border-t class (for achievements section)
    const borderElements = screen.getByText('Test Company').closest('div')?.querySelectorAll('.border-t');
    expect(borderElements).toHaveLength(1);
  });
});