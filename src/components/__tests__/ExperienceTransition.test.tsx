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

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    // Check for parent having fade-in class
    expect(content.parentElement).toHaveClass('fade-in');
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

    // Content wrapper should have fade-out class
    const contentElement1 = screen.getByTestId('content-1');
    expect(contentElement1.parentElement).toHaveClass('fade-out');

    // Fast-forward through fade out
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const contentElement2 = screen.getByTestId('content-2');
    expect(contentElement2).toBeInTheDocument();
    expect(contentElement2.parentElement).toHaveClass('fade-in');
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
