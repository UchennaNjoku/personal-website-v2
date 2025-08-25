/**
 * ExperienceTransition Component Tests
 * Tests for smooth transition animations and layout consistency
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceTransition from '../ExperienceTransition';

// Mock requestAnimationFrame for testing
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

describe('ExperienceTransition', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders children immediately when not transitioning', () => {
    render(
      <ExperienceTransition isTransitioning={false}>
        <div data-testid="content">Test Content</div>
      </ExperienceTransition>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toHaveClass('opacity-100');
  });

  it('maintains consistent layout dimensions during transition', () => {
    const { container } = render(
      <ExperienceTransition isTransitioning={true} transitionKey="test-1">
        <div data-testid="content">Test Content</div>
      </ExperienceTransition>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('min-height: 400px');
  });

  it('handles transition state changes correctly', async () => {
    const { rerender } = render(
      <ExperienceTransition isTransitioning={false} transitionKey="test-1">
        <div data-testid="content-1">Content 1</div>
      </ExperienceTransition>
    );

    // Initial content should be visible
    expect(screen.getByTestId('content-1')).toBeInTheDocument();

    // Start transition with new content
    rerender(
      <ExperienceTransition isTransitioning={true} transitionKey="test-2">
        <div data-testid="content-2">Content 2</div>
      </ExperienceTransition>
    );

    // Content should start fading out
    const contentElement = screen.getByTestId('content-1');
    expect(contentElement).toHaveClass('opacity-0');

    // Fast-forward through fade out
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // New content should appear after transition
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('content-2')).toBeInTheDocument();
  });

  it('applies performance optimizations', () => {
    const { container } = render(
      <ExperienceTransition isTransitioning={true}>
        <div data-testid="content">Test Content</div>
      </ExperienceTransition>
    );

    const contentWrapper = container.querySelector('[data-testid="content"]')?.parentElement;
    expect(contentWrapper).toHaveStyle('transform: translateZ(0)');
    expect(contentWrapper).toHaveStyle('backface-visibility: hidden');
    expect(contentWrapper).toHaveStyle('perspective: 1000');
  });

  it('shows loading indicator during transition', () => {
    render(
      <ExperienceTransition isTransitioning={true}>
        <div data-testid="content">Test Content</div>
      </ExperienceTransition>
    );

    // Should show loading indicator when transitioning and not visible
    const loadingIndicator = document.querySelector('.animate-pulse');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('cleans up timeouts on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(
      <ExperienceTransition isTransitioning={true}>
        <div>Test Content</div>
      </ExperienceTransition>
    );

    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});