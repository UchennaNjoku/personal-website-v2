# Color System Documentation

## Overview

This project now uses a centralized, modular color system that makes it easy to test and modify colors across the entire application. All colors are defined in one place and automatically work with both light and dark modes.

## 🎨 Key Features

- **Centralized Color Management**: All colors defined in `src/styles/colors.ts`
- **Automatic Theme Switching**: Colors automatically adapt to light/dark mode
- **Type-Safe**: Full TypeScript support with autocomplete
- **Easy Testing**: Dedicated color test page at `/color-test`
- **Consistent Usage**: Standardized color names across components

## 📁 File Structure

```
src/
├── styles/
│   └── colors.ts              # Central color definitions
├── hooks/
│   └── useColors.ts           # React hook for color access
├── components/
│   └── ColorProvider.tsx      # Context provider (optional)
└── app/
    ├── globals.css            # CSS variables for Tailwind
    └── color-test/
        └── page.tsx           # Color testing page
```

## 🚀 Quick Start

### 1. Edit Colors

Open `src/styles/colors.ts` and modify any color:

```typescript
export const colors = {
  brand: {
    primary: '#433E0E',      // Change this to any color
    secondary: '#81901D',    // Change this to any color
    tertiary: '#718010',     // Change this to any color
  },
  // ... more colors
}
```

### 2. Use in Components

```typescript
import { useColors } from '@/hooks/useColors';

const MyComponent = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const colors = useColors(isDarkMode);
  
  return (
    <div style={{ color: colors.primary }}>
      {/* Or use Tailwind classes */}
      <h1 className="text-brand-primary">Title</h1>
      <p className="text-text-secondary">Description</p>
    </div>
  );
};
```

### 3. Test Changes

Visit `/color-test` in your browser to see all colors and test light/dark mode switching.

## 🎯 Available Colors

### Brand Colors
- `brand-primary`: Main brand color (#433E0E)
- `brand-secondary`: Accent brand color (#81901D)  
- `brand-tertiary`: Light brand variation (#718010)

### Accent Colors
- `accent-orange`: Orange gradient start (#C75434)
- `accent-orange-mid`: Orange gradient middle (#E67E22)
- `accent-orange-end`: Orange gradient end (#F39C12)
- `accent-success`: Success states (#10B981)
- `accent-warning`: Warning states (#F59E0B)
- `accent-error`: Error states (#EF4444)

### Semantic Colors (Theme-Aware)
- `text-primary`: Main text color
- `text-secondary`: Secondary text (with opacity)
- `text-tertiary`: Muted text
- `bg-primary`: Main background
- `bg-secondary`: Card/surface background
- `bg-tertiary`: Subtle background
- `border-primary`: Main borders
- `border-secondary`: Subtle borders

## 🛠 Usage Methods

### Method 1: Tailwind Classes (Recommended)
```jsx
<div className="bg-bg-primary text-text-primary border border-border-primary">
  <h1 className="text-brand-primary">Title</h1>
  <p className="text-text-secondary">Description</p>
</div>
```

### Method 2: useColors Hook
```jsx
const colors = useColors(isDarkMode);
return (
  <div style={{ backgroundColor: colors.bg }}>
    <h1 style={{ color: colors.brandPrimary }}>Title</h1>
  </div>
);
```

### Method 3: CSS Variables
```css
.my-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}
```

## 🎨 Gradients

Pre-defined gradients are available:

```jsx
const colors = useColors(isDarkMode);

// Use in styles
<div style={{ background: colors.gradients.orange }}>Orange Gradient</div>
<div style={{ background: colors.gradients.brand }}>Brand Gradient</div>

// Or with Tailwind
<h1 className="bg-gradient-to-r from-accent-orange via-accent-orange-mid to-accent-orange-end bg-clip-text text-transparent">
  Gradient Text
</h1>
```

## 🔧 Customization

### Adding New Colors

1. Add to `src/styles/colors.ts`:
```typescript
export const colors = {
  // ... existing colors
  custom: {
    purple: '#8B5CF6',
    pink: '#EC4899',
  }
}
```

2. Add to `tailwind.config.ts`:
```typescript
colors: {
  // ... existing colors
  'custom-purple': '#8B5CF6',
  'custom-pink': '#EC4899',
}
```

3. Use in components:
```jsx
<div className="text-custom-purple bg-custom-pink">
  Custom colors!
</div>
```

### Modifying Theme Colors

Edit the semantic colors in `src/styles/colors.ts`:

```typescript
semantic: {
  light: {
    text: {
      primary: '#000000',        // Change light mode text
      secondary: 'rgba(0,0,0,0.7)',
    },
    background: {
      primary: '#FFFFFF',        // Change light mode background
    }
  },
  dark: {
    text: {
      primary: '#FFFFFF',        // Change dark mode text
    },
    background: {
      primary: '#000000',        // Change dark mode background
    }
  }
}
```

## 🧪 Testing

1. **Visual Testing**: Visit `/color-test` to see all colors
2. **Theme Testing**: Toggle between light/dark modes
3. **Component Testing**: Check how colors look in actual components
4. **Accessibility**: Ensure sufficient contrast ratios

## 📝 Migration Notes

### Before (Hard-coded colors):
```jsx
<div className={`${isDarkMode ? 'text-[#EAEAC2]' : 'text-[#18020C]'}`}>
  Content
</div>
```

### After (Modular system):
```jsx
<div className="text-text-primary">
  Content
</div>
```

## 🎯 Benefits

1. **Single Source of Truth**: All colors in one file
2. **Easy Testing**: Change colors instantly and see results
3. **Consistent Theming**: Automatic light/dark mode support
4. **Better Maintainability**: No more hunting for hard-coded colors
5. **Type Safety**: Full TypeScript support with autocomplete
6. **Performance**: CSS variables for optimal rendering

## 🚨 Important Notes

- Always use the centralized color system instead of hard-coded hex values
- Test both light and dark modes when making changes
- Use semantic color names (text-primary) rather than specific colors when possible
- The color test page (`/color-test`) is your best friend for testing changes

## 🔗 Related Files

- `src/styles/colors.ts` - Main color definitions
- `src/hooks/useColors.ts` - React hook for color access
- `src/app/globals.css` - CSS variables for Tailwind
- `tailwind.config.ts` - Tailwind color configuration
- `src/app/color-test/page.tsx` - Color testing interface