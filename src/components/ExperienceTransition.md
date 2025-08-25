# ExperienceTransition Component

## Overview

The `ExperienceTransition` component provides smooth fade in/out animations between content changes while maintaining consistent layout dimensions. It's specifically designed for the interactive experience navigation feature but can be used for any content that needs smooth transitions.

## Features

- **Smooth Animations**: 200ms fade out + 300ms fade in for optimal user experience
- **Layout Consistency**: Maintains container dimensions during transitions to prevent jarring shifts
- **Performance Optimized**: Uses CSS transforms and GPU acceleration for smooth animations
- **Accessibility**: Includes loading indicators and proper transition states
- **Flexible**: Can wrap any React content that needs transition animations

## Props

```typescript
interface ExperienceTransitionProps {
  children: React.ReactNode;           // Content to be transitioned
  isTransitioning: boolean;            // Whether a transition is currently active
  transitionKey?: string | number;     // Optional key to force re-render on content change
}
```

## Usage

### Basic Usage

```tsx
import ExperienceTransition from './ExperienceTransition';

const MyComponent = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [content, setContent] = useState('Initial content');

  const handleContentChange = (newContent: string) => {
    setIsTransitioning(true);
    setContent(newContent);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <ExperienceTransition
      isTransitioning={isTransitioning}
      transitionKey={content}
    >
      <div>{content}</div>
    </ExperienceTransition>
  );
};
```

### With Experience Components

```tsx
import ExperienceTransition from './ExperienceTransition';
import ExperienceContent from './ExperienceContent';

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <ExperienceTransition
      isTransitioning={isTransitioning}
      transitionKey={activeIndex}
    >
      <ExperienceContent
        experience={experiences[activeIndex]}
        isDarkMode={true}
        isVisible={!isTransitioning}
      />
    </ExperienceTransition>
  );
};
```

## Animation Timing

The component uses a two-phase animation:

1. **Fade Out**: 200ms - Current content fades out
2. **Content Update**: Immediate - DOM content is updated
3. **Fade In**: 300ms - New content fades in

Total transition time: **500ms**

## Performance Optimizations

- **Hardware Acceleration**: Uses `transform: translateZ(0)` for GPU acceleration
- **CSS Classes**: Leverages CSS transitions instead of JavaScript animations
- **Will-Change**: Optimizes for opacity changes during transitions
- **Backface Visibility**: Hidden to prevent rendering artifacts
- **Height Management**: Measures and maintains consistent container height

## CSS Classes

The component uses these CSS classes for styling:

- `.experience-transition-wrapper`: Main container with overflow handling
- `.experience-transition-content`: Content wrapper with transition styles
- `.fade-in`: Applied when content is becoming visible
- `.fade-out`: Applied when content is becoming hidden
- `.experience-transition-loading`: Loading indicator animation

## Accessibility

- Provides visual loading indicators during transitions
- Maintains focus management (content remains focusable)
- Preserves screen reader accessibility during transitions
- Uses semantic HTML structure

## Browser Support

- Modern browsers with CSS transform support
- Graceful degradation for older browsers (no animation, immediate content swap)
- Optimized for mobile devices with touch interactions

## Requirements Satisfied

This component satisfies the following requirements from the spec:

- **2.1**: Smooth content transitions between experiences
- **2.2**: Consistent layout dimensions during transitions  
- **2.3**: Animation timing within 300-500ms for optimal UX

## Integration Notes

- Works seamlessly with existing `ExperienceContent` and `ExperienceNavigation` components
- Maintains theme compatibility (dark/light mode)
- Preserves existing styling and layout patterns
- Can be easily integrated into the main page component